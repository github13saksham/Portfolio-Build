import { useState, useRef, useEffect, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/home/Navbar";
import {
	FileText, Upload, Sparkles, LayoutTemplate, Monitor,
	CheckCircle2, Link as LinkIcon, Loader2, Globe, Smartphone, Download, RefreshCw
} from "lucide-react";
import { callGemini, getApiKey } from "@/utils/gemini";

// ─── Theme definitions ───────────────────────────────────────────────────────
const THEMES = [
	{ id: 'modern',   name: 'Modern Pro',       desc: 'Dark slate header',          swatch: 'from-slate-800 to-slate-900',          accent: '#6366f1', headerBg: '#1e293b',                                   pageBg: '#f8fafc', bodyText: '#1e293b', isDark: false },
	{ id: 'creative', name: 'Creative Studio',   desc: 'Purple gradient, bold',      swatch: 'from-purple-600 to-indigo-600',        accent: '#7c3aed', headerBg: 'linear-gradient(135deg,#7c3aed,#4f46e5)',  pageBg: '#faf5ff', bodyText: '#1e1b4b', isDark: false },
	{ id: 'midnight', name: 'Midnight Dark',     desc: 'Full dark, indigo glow',     swatch: 'from-[#0f172a] to-[#1e1b4b]',         accent: '#818cf8', headerBg: '#0f172a',                                   pageBg: '#0f172a', bodyText: '#e2e8f0', isDark: true  },
	{ id: 'minimal',  name: 'Clean Minimal',     desc: 'White & grey, elegant',      swatch: 'from-white to-slate-100 border border-slate-200', accent: '#334155', headerBg: '#ffffff', pageBg: '#ffffff', bodyText: '#1e293b', isDark: false },
	{ id: 'ocean',    name: 'Ocean Breeze',      desc: 'Sky blue, fresh feel',       swatch: 'from-sky-500 to-blue-600',             accent: '#0ea5e9', headerBg: 'linear-gradient(135deg,#0ea5e9,#2563eb)',  pageBg: '#f0f9ff', bodyText: '#0c4a6e', isDark: false },
	{ id: 'gold',     name: 'Royal Gold',        desc: 'Amber gradient, executive',  swatch: 'from-amber-500 to-yellow-500',         accent: '#d97706', headerBg: 'linear-gradient(135deg,#d97706,#b45309)',  pageBg: '#fffbeb', bodyText: '#1c1917', isDark: false },
];

// ─── Smart resume parser ────────────────────────────────────────────────────
interface ParsedResume {
	name: string;
	title: string;
	email: string;
	phone: string;
	linkedin: string;
	github: string;
	location: string;
	summary: string;
	skills: string[];
	experience: { role: string; company: string; period: string; bullets: string[] }[];
	education: { degree: string; school: string; year: string }[];
	projects: { name: string; desc: string }[];
	certifications: string[];
}

function parseResume(raw: string): ParsedResume {
	let normalized = raw.replace(/(EXPERIENCE|EDUCATION|SKILLS|SUMMARY|PROFILE|OBJECTIVE|WORK EXPERIENCE|EMPLOYMENT|CERTIFICATIONS|PROJECTS)\b/g, '\n$1\n');
	const lines = normalized.split(/\n/).map(l => l.trim()).filter(Boolean);
	const text = raw;

	const email    = (text.match(/[\w.+%-]+@[\w.-]+\.[a-z]{2,}/i) || [])[0] || '';
	const phone    = (text.match(/(\+?\d[\d\s()\-]{7,14}\d)/) || [])[0]?.trim() || '';
	const linkedin = (text.match(/linkedin\.com\/in\/([\w-]+)/i) || [])[1] || '';
	const github   = (text.match(/github\.com\/([\w-]+)/i) || [])[1] || '';
	// Very strict location regex to avoid picking up names or skills like "JavaScript, SQL"
	// Require trailing zip code or known state abbreviations next to a city
	const locationMatch = text.match(/\b([A-Z][a-zA-Z\s]+,\s*(?:NY|CA|TX|WA|IL|PA|OH|GA|NC|MI|NJ|VA|WA|AZ|MA|IN|TN|MO|MD|WI|MN|CO|AL|SC|LA|KY|OR|OK|CT|UT|IA|NV|AR|MS|KS|NM|NE|ID|WV|HI|NH|ME|MT|RI|DE|SD|ND|AK|VT|WY|Delhi|Mumbai|Bangalore|Hyderabad|Chennai|Kolkata|Pune|Ahmedabad|Jaipur|Surat)\b\s*(?:\d{5,6})?)/i);
	const location = locationMatch ? locationMatch[0] : '';

	const SECTION_RX = /^(SUMMARY|PROFILE|OBJECTIVE|EXPERIENCE|WORK EXPERIENCE|EMPLOYMENT|EDUCATION|SKILLS|TECHNICAL SKILLS|CERTIFICATIONS|CERTIFICATES|PROJECTS|LANGUAGES|INTERESTS)(?:\s*:|\s*[-–]|\s*$)/i;
	
	const sections: Record<string, string[]> = {};
	let currentSection = '_header';
	sections['_header'] = [];

	for (const line of lines) {
		const match = line.match(SECTION_RX);
		if (match) {
			currentSection = match[1].toUpperCase().trim();
			sections[currentSection] = [];
			const restOfLine = line.replace(SECTION_RX, '').trim();
			if (restOfLine) sections[currentSection].push(restOfLine);
		} else {
			(sections[currentSection] = sections[currentSection] || []).push(line);
		}
	}

	const headerLines = sections['_header'] || [];
	const NAME_RX = /^[A-Z][a-z]+(?:\s+[A-Z][a-z]*){1,3}$/;
	let name = headerLines.find(l => NAME_RX.test(l) && l.length < 40 && !l.includes('@')) || '';
	if (!name && headerLines.length > 0 && headerLines[0].length < 40) name = headerLines[0];
	if (!name) name = 'Your Name';

	const titleCandidates = headerLines.filter(l =>
		l !== name && !l.includes('@') && !l.match(/^\+?\d/) &&
		!l.match(/^https?:/) && !l.match(/linkedin|github/i) &&
		l.length > 4 && l.length < 100
	);
	const title = titleCandidates[0] || '';

	const summaryLines = (sections['SUMMARY'] || []).concat(sections['PROFILE'] || []).concat(sections['OBJECTIVE'] || []);
	let summary = summaryLines.join(' ').slice(0, 1000);

	const skillSectionLines = (sections['SKILLS'] || []).concat(sections['TECHNICAL SKILLS'] || []).concat(sections['LANGUAGES'] || []);
	const skills = skillSectionLines.join(' , ')
		.split(/[,|•·\n/]+/)
		.map(s => s.replace(/^[\s\-–:]+/, '').trim())
		.filter(s => s.length > 1 && s.length < 40 && !/languages|frameworks|tools|databases|skills/i.test(s))
		.slice(0, 24);

	const expLines = (sections['EXPERIENCE'] || []).concat(sections['WORK EXPERIENCE'] || []).concat(sections['EMPLOYMENT'] || []);
	const experience: ParsedResume['experience'] = [];
	let currentExp: ParsedResume['experience'][0] | null = null;
	for (const l of expLines) {
		const isPeriod = /\b(19|20)\d{2}\b/.test(l) && l.length < 40;
		const isBullet = /^[•\-–*]/.test(l) || (currentExp && l.length > 50 && !/^[A-Z]{2,}/.test(l));
		if (!isBullet && !isPeriod && l.length < 80) {
			if (currentExp && !currentExp.company) { currentExp.company = l; }
			else {
				if (currentExp) experience.push(currentExp);
				currentExp = { role: l, company: '', period: '', bullets: [] };
			}
		} else if (isPeriod && currentExp && !currentExp.period) {
			currentExp.period = l;
		} else if (currentExp) {
			currentExp.bullets.push(l.replace(/^[•\-–*]\s*/, ''));
		}
	}
	if (currentExp) experience.push(currentExp);

	const eduLines = sections['EDUCATION'] || [];
	const education: ParsedResume['education'] = [];
	let currentEdu: ParsedResume['education'][0] | null = null;
	for (const l of eduLines) {
		const isPeriod = /\b(19|20)\d{2}\b/.test(l) && l.length < 40;
		if (l.length < 80 && !isPeriod) {
			if (currentEdu) education.push(currentEdu);
			currentEdu = { degree: l, school: '', year: '' };
		} else if (isPeriod && currentEdu) { currentEdu.year = l; }
		else if (currentEdu && !currentEdu.school && l.length < 80) { currentEdu.school = l; }
	}
	if (currentEdu) education.push(currentEdu);

	// Projects
	const projLines = sections['PROJECTS'] || [];
	const projects: ParsedResume['projects'] = [];
	let currentProj: ParsedResume['projects'][0] | null = null;
	for (const l of projLines) {
		const isBullet = /^[•\-–*]/.test(l) || l.length > 60;
		if (!isBullet && l.length < 80) {
			if (currentProj) projects.push(currentProj);
			currentProj = { name: l, desc: '' };
		} else if (currentProj) {
			currentProj.desc += (currentProj.desc ? ' ' : '') + l.replace(/^[•\-–*]\s*/, '');
		}
	}
	if (currentProj) projects.push(currentProj);

	const certifications = ((sections['CERTIFICATIONS'] || []).concat(sections['CERTIFICATES'] || []))
		.filter(l => l.length > 4 && l.length < 120).slice(0, 6);

	// ── Deep Fallback for Headless Resumes ──
	if (experience.length === 0 && education.length === 0 && projects.length === 0 && summary === '') {
		const leftover = headerLines.filter(l => l !== name && l !== title && !l.includes('@') && !l.match(/^\+?\d/));
		
		let tempSummary = '';
		
		for (let i = 0; i < leftover.length; i++) {
			const l = leftover[i].trim();
			if (!l) continue;
			
			const textLower = l.toLowerCase();
			if (textLower.match(/school|college|university|cbse|aisse|class xii|class x|b\.tech|bachelor|degree\b/)) {
				// Education block
				education.push({ 
					degree: l.replace(/\b(19|20)\d{2}.*/, '').replace(/[-–]+$/, '').trim(), 
					school: '', 
					year: (l.match(/\b(19|20)\d{2}\b/g) || []).join('-') 
				});
			} else if (textLower.match(/built\b|developed\b|designed\b|created\b|implemented\b|system\b|using cnn\b|app\b|website\b|project\b/)) {
				// Project block
				const rawName = l.replace(/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+\d{4}\b/i, '')
								 .replace(/[-–]+$/, '').trim();
				let desc = '';
				// Grab next line if it looks like a description (long, starts with verb)
				if (leftover[i+1] && leftover[i+1].length > 40 && !leftover[i+1].toLowerCase().match(/school|cbse|aisse/)) {
					desc = leftover[++i];
				}
				projects.push({ name: rawName, desc });
			} else {
				// Extract sneaky skills from long lines if they look like lists
				if (l.match(/Languages:|Technologies:|Tools:/i)) {
					const foundSkills = l.split(/[:,]/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 20);
					skills.push(...foundSkills);
				} else {
					tempSummary += l + ' ';
				}
			}
		}
		
		if (tempSummary.trim().length > 0) summary = tempSummary.trim().slice(0, 1000);
	}

	return { name, title, email, phone, linkedin, github, location, summary, skills, experience, education, projects, certifications };
}

// ─── AI Parser (Uses Gemini API via centralized utility) ────────────────────
async function aiParseResume(text: string): Promise<ParsedResume | null> {
	const apiKey = getApiKey();
	if (!apiKey) return null;
	try {
		const prompt = `You are a resume parser. Extract the following text into JSON exactly matching this structure. Return ONLY JSON, no markdown.
{
  "name": "string",
  "title": "string",
  "email": "string",
  "phone": "string",
  "linkedin": "string",
  "github": "string",
  "location": "string",
  "summary": "string",
  "skills": ["string"],
  "experience": [{ "role": "string", "company": "string", "period": "string", "bullets": ["string"] }],
  "education": [{ "degree": "string", "school": "string", "year": "string" }],
  "projects": [{ "name": "string", "desc": "string" }],
  "certifications": ["string"]
}
Text:
${text.slice(0, 4000)}`;

		const responseText = await callGemini(prompt);
		if (!responseText) return null;
		
		const cleanJsonStr = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
		const parsed = JSON.parse(cleanJsonStr);
		return {
			name: parsed.name || 'Your Name',
			title: parsed.title || '',
			email: parsed.email || '',
			phone: parsed.phone || '',
			linkedin: parsed.linkedin || '',
			github: parsed.github || '',
			location: parsed.location || '',
			summary: parsed.summary || '',
			skills: Array.isArray(parsed.skills) ? parsed.skills : [],
			experience: Array.isArray(parsed.experience) ? parsed.experience : [],
			education: Array.isArray(parsed.education) ? parsed.education : [],
			projects: Array.isArray(parsed.projects) ? parsed.projects : [],
			certifications: Array.isArray(parsed.certifications) ? parsed.certifications : []
		};
	} catch (err) {
		console.error("AI Parse failed", err);
		return null;
	}
}

// ─── HTML generator ──────────────────────────────────────────────────────────
function generateWebsite(parsed: ParsedResume, theme: typeof THEMES[0]): string {
	const { name, title, email, phone, linkedin, github, location, summary, skills, experience, education, projects, certifications } = parsed;
	const isDark = theme.isDark;
	const headerBg = theme.headerBg.includes('gradient') ? `background: ${theme.headerBg}` : `background-color: ${theme.headerBg}`;
	const headerText = (theme.id === 'minimal') ? theme.bodyText : '#ffffff';
	const sectionBorderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)';
	const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.025)';

	const expHtml = (experience || []).slice(0, 5).map(e => `
		<div class="card exp-card">
			<div class="exp-header">
				<div>
					<div class="exp-role">${e.role || 'Role'}</div>
					<div class="exp-company">${e.company || ''}</div>
				</div>
				${e.period ? `<div class="exp-period">${e.period}</div>` : ''}
			</div>
			${e.bullets && e.bullets.length ? `<ul class="bullets">${e.bullets.slice(0, 4).map(b => `<li>${b}</li>`).join('')}</ul>` : ''}
		</div>`).join('');

	const eduHtml = (education || []).slice(0, 4).map(e => `
		<div class="card edu-card">
			<div class="edu-degree">${e.degree}</div>
			${e.school ? `<div class="edu-school">${e.school}</div>` : ''}
			${e.year   ? `<div class="edu-year">${e.year}</div>` : ''}
		</div>`).join('');

	const projHtml = (projects || []).slice(0, 6).map(p => `
		<div class="card proj-card">
			<div class="edu-degree" style="color:var(--accent);">${p.name}</div>
			${p.desc ? `<div class="summary-text" style="margin-top:0.5rem;font-size:0.85rem;">${p.desc}</div>` : ''}
		</div>`).join('');

	const skillsHtml = (skills || []).map(s => `<span class="skill">${s}</span>`).join('');

	const certHtml = (certifications || []).map(c => `<div class="cert-item">🏅 ${c}</div>`).join('');

	const contactLinks = [
		email    ? `<a href="mailto:${email}"    class="contact-chip">✉ ${email}</a>` : '',
		phone    ? `<span class="contact-chip">📞 ${phone}</span>` : '',
		linkedin ? `<a href="https://linkedin.com/in/${linkedin}" target="_blank" class="contact-chip">in ${linkedin}</a>` : '',
		github   ? `<a href="https://github.com/${github}"        target="_blank" class="contact-chip">⌥ ${github}</a>` : '',
		location ? `<span class="contact-chip">📍 ${location}</span>` : '',
	].filter(Boolean).join('');

	return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:${theme.pageBg};color:${theme.bodyText};line-height:1.7;font-size:15px;-webkit-font-smoothing:antialiased}

/* ── HEADER ── */
.site-header{${headerBg};color:${headerText};padding:4.5rem 2rem 3.5rem;position:relative;overflow:hidden}
.site-header::before{content:'';position:absolute;top:-80px;right:-80px;width:350px;height:350px;border-radius:50%;background:rgba(255,255,255,.06);pointer-events:none}
.site-header::after{content:'';position:absolute;bottom:-100px;left:-60px;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,.04);pointer-events:none}
.header-inner{max-width:860px;margin:0 auto;text-align:center;position:relative;z-index:1}
.avatar{width:96px;height:96px;border-radius:50%;${isDark ? 'background:rgba(255,255,255,.12);border:3px solid rgba(255,255,255,.2)' : theme.id==='minimal' ? 'background:#e2e8f0;border:3px solid #cbd5e1;color:#334155' : 'background:rgba(255,255,255,.18);border:3px solid rgba(255,255,255,.3)'};display:flex;align-items:center;justify-content:center;font-size:2.4rem;font-weight:800;margin:0 auto 1.4rem;color:${theme.id==='minimal'?'#334155':'white'}}
.site-name{font-size:clamp(2rem,5vw,3.2rem);font-weight:900;letter-spacing:-0.04em;margin-bottom:.4rem;color:${headerText}}
.site-title{font-size:1.05rem;font-weight:500;opacity:.75;margin-bottom:1.8rem;color:${headerText};letter-spacing:.02em}
.contact-chips{display:flex;flex-wrap:wrap;gap:.55rem;justify-content:center}
.contact-chip{padding:.35rem .9rem;border-radius:99px;font-size:.78rem;font-weight:600;text-decoration:none;transition:all .2s;cursor:pointer;
  ${theme.id==='minimal' ? 'background:#f1f5f9;border:1px solid #e2e8f0;color:#334155' : 'background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.2);color:'+headerText}}
.contact-chip:hover{${theme.id==='minimal'?'background:#e2e8f0':'background:rgba(255,255,255,.25)'}}

/* ── LAYOUT ── */
.page-body{max-width:1000px;margin:0 auto;padding:3rem 1.5rem;display:grid;grid-template-columns:1fr 290px;gap:3rem}
@media(max-width:720px){.page-body{grid-template-columns:1fr;padding:2rem 1rem}}

/* ── SECTION ── */
.section{margin-bottom:2.8rem}
.section-label{font-size:.68rem;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:${theme.accent};margin-bottom:1.1rem;padding-bottom:.5rem;border-bottom:2px solid ${theme.accent}}
.summary-text{font-size:.92rem;line-height:1.85;opacity:.88}

/* ── EXPERIENCE CARDS ── */
.card{border-radius:14px;border:1px solid ${sectionBorderColor};padding:1.3rem 1.5rem;margin-bottom:1rem;background:${cardBg};transition:box-shadow .2s}
.card:hover{box-shadow:0 4px 20px rgba(0,0,0,.07)}
.exp-header{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap;margin-bottom:.6rem}
.exp-role{font-weight:700;font-size:.97rem;color:${theme.bodyText}}
.exp-company{font-size:.83rem;color:${theme.accent};font-weight:600;margin-top:.1rem}
.exp-period{font-size:.75rem;font-weight:600;padding:.25rem .7rem;border-radius:99px;background:${isDark?'rgba(255,255,255,.07)':'rgba(0,0,0,.05)'};white-space:nowrap;flex-shrink:0;color:${isDark?'#94a3b8':'#64748b'}}
.bullets{list-style:none;padding:0;margin:.5rem 0 0}
.bullets li{font-size:.83rem;line-height:1.65;opacity:.8;padding:.2rem 0 .2rem 1.1rem;position:relative}
.bullets li::before{content:'▸';position:absolute;left:0;color:${theme.accent};font-size:.7rem;top:.35rem}

/* ── EDUCATION ── */
.edu-card{}
.edu-degree{font-weight:700;font-size:.9rem}
.edu-school{font-size:.82rem;color:${theme.accent};margin-top:.15rem;font-weight:600}
.edu-year{font-size:.75rem;opacity:.55;margin-top:.15rem}

/* ── SIDEBAR ── */
.sidebar{}
.sidebar-block{border-radius:16px;border:1px solid ${sectionBorderColor};padding:1.4rem;margin-bottom:1.4rem;background:${cardBg}}

/* ── SKILLS ── */
.skills-wrap{display:flex;flex-wrap:wrap;gap:.45rem}
.skill{font-size:.75rem;font-weight:700;padding:.3rem .75rem;border-radius:8px;background:${isDark?`rgba(${hexToRgb(theme.accent)},.15)`:'rgba(0,0,0,.05)'};color:${theme.accent};border:1px solid ${isDark?`rgba(${hexToRgb(theme.accent)},.3)`:'rgba(0,0,0,.08)'};letter-spacing:.01em}

/* ── CERTIFICATIONS ── */
.cert-item{font-size:.82rem;padding:.45rem 0;border-bottom:1px solid ${sectionBorderColor};opacity:.85}
.cert-item:last-child{border-bottom:none}

/* ── FOOTER ── */
.site-footer{text-align:center;padding:2.5rem 1rem;font-size:.75rem;opacity:.35;border-top:1px solid ${sectionBorderColor}}

/* ── NAV BAR ── */
.top-nav{position:sticky;top:0;z-index:100;backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);background:${isDark?'rgba(15,23,42,.85)':'rgba(255,255,255,.85)'};border-bottom:1px solid ${sectionBorderColor};padding:.75rem 1.5rem;display:flex;justify-content:space-between;align-items:center}
.nav-name{font-weight:800;font-size:.9rem;color:${theme.accent}}
.nav-links{display:flex;gap:1.5rem}
.nav-link{font-size:.8rem;font-weight:600;opacity:.65;text-decoration:none;color:${theme.bodyText};transition:opacity .2s}
.nav-link:hover{opacity:1;color:${theme.accent}}
</style>
</head>
<body>

<!-- Sticky nav -->
<nav class="top-nav">
  <span class="nav-name">${name}</span>
  <div class="nav-links">
    ${summary     ? '<a href="#about"           class="nav-link">About</a>'           : ''}
    ${experience?.length ? '<a href="#experience"  class="nav-link">Experience</a>'  : ''}
    ${projects?.length    ? '<a href="#projects"    class="nav-link">Projects</a>'    : ''}
    ${education?.length  ? '<a href="#education"   class="nav-link">Education</a>'   : ''}
    ${skills?.length     ? '<a href="#skills"      class="nav-link">Skills</a>'      : ''}
  </div>
</nav>

<!-- Header hero -->
<header class="site-header">
  <div class="header-inner">
    <div class="avatar">${name.charAt(0).toUpperCase()}</div>
    <h1 class="site-name">${name}</h1>
    ${title ? `<p class="site-title">${title}</p>` : ''}
    <div class="contact-chips">${contactLinks}</div>
  </div>
</header>

<!-- Main body -->
<div class="page-body">

  <!-- Left / main column -->
  <main>
    ${summary ? `
    <section class="section" id="about">
      <div class="section-label">About</div>
      <p class="summary-text">${summary}</p>
    </section>` : ''}

    ${experience?.length ? `
    <section class="section" id="experience">
      <div class="section-label">Experience</div>
      ${expHtml}
    </section>` : ''}

    ${projects?.length ? `
    <section class="section" id="projects">
      <div class="section-label">Projects</div>
      ${projHtml}
    </section>` : ''}

    ${education?.length ? `
    <section class="section" id="education">
      <div class="section-label">Education</div>
      ${eduHtml}
    </section>` : ''}

    ${certifications?.length ? `
    <section class="section" id="certs">
      <div class="section-label">Certifications</div>
      <div class="card">${certHtml}</div>
    </section>` : ''}
  </main>

  <!-- Right sidebar -->
  <aside class="sidebar">
    ${skills.length ? `
    <div class="sidebar-block" id="skills">
      <div class="section-label">Skills</div>
      <div class="skills-wrap">${skillsHtml}</div>
    </div>` : ''}

    <div class="sidebar-block">
      <div class="section-label">Contact</div>
      <div style="font-size:.82rem;line-height:2.2">
        ${email    ? `<div>✉ <a href="mailto:${email}" style="color:${theme.accent};text-decoration:none;font-weight:600">${email}</a></div>` : ''}
        ${phone    ? `<div>📞 ${phone}</div>` : ''}
        ${linkedin ? `<div>in <a href="https://linkedin.com/in/${linkedin}" style="color:${theme.accent};text-decoration:none;font-weight:600" target="_blank">${linkedin}</a></div>` : ''}
        ${github   ? `<div>⌥ <a href="https://github.com/${github}" style="color:${theme.accent};text-decoration:none;font-weight:600" target="_blank">${github}</a></div>` : ''}
        ${location ? `<div>📍 ${location}</div>` : ''}
      </div>
    </div>
  </aside>

</div>

<footer class="site-footer">Generated by ResumeBuilder Pro · ${new Date().getFullYear()}</footer>

</body>
</html>`;
}

// tiny helper so we can do rgba() from hex
function hexToRgb(hex: string): string {
	const r = parseInt(hex.slice(1,3),16);
	const g = parseInt(hex.slice(3,5),16);
	const b = parseInt(hex.slice(5,7),16);
	return `${r},${g},${b}`;
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function PdfToPortfolio() {
	const [file, setFile]                   = useState<File | null>(null);
	const [selectedTheme, setSelectedTheme] = useState('modern');
	const [isDragActive, setIsDragActive]   = useState(false);
	const [isProcessing, setIsProcessing]   = useState(false);
	const [websiteHtml, setWebsiteHtml]     = useState<string | null>(null);
	const [parsedData, setParsedData]       = useState<ParsedResume | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const theme = THEMES.find(t => t.id === selectedTheme)!;

	// Load PDF.js once
	useEffect(() => {
		if ((window as any).pdfjsLib) return;
		const s = document.createElement('script');
		s.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
		s.onload = () => {
			(window as any).pdfjsLib.GlobalWorkerOptions.workerSrc =
				'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
		};
		document.head.appendChild(s);
	}, []);

	// Re-render website when theme changes (if already parsed)
	useEffect(() => {
		if (parsedData) setWebsiteHtml(generateWebsite(parsedData, theme));
	}, [selectedTheme]); // eslint-disable-line

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const f = e.target.files?.[0] || null;
		setFile(f); setWebsiteHtml(null); setParsedData(null);
	};
	const handleDrag = (e: React.DragEvent) => {
		e.preventDefault(); e.stopPropagation();
		setIsDragActive(e.type === 'dragenter' || e.type === 'dragover');
	};
	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault(); e.stopPropagation(); setIsDragActive(false);
		const f = e.dataTransfer.files[0];
		if (f?.type === 'application/pdf') { setFile(f); setWebsiteHtml(null); setParsedData(null); }
		else alert('Please drop a valid PDF file.');
	};

	const handleGenerate = async () => {
		if (!file) return;
		setIsProcessing(true);
		try {
			const arrayBuffer = await file.arrayBuffer();
			let rawText = '';
			const pdfjs = (window as any).pdfjsLib;
			if (pdfjs) {
				const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
				for (let i = 1; i <= Math.min(pdf.numPages, 8); i++) {
					const page = await pdf.getPage(i);
					const content = await page.getTextContent();
					// Preserve line breaks by grouping by y position
					const items = content.items as any[];
					let lastY = -1;
					for (const item of items) {
						const y = item.transform?.[5] ?? 0;
						if (lastY !== -1 && Math.abs(y - lastY) > 5) rawText += '\n';
						rawText += item.str;
						lastY = y;
					}
					rawText += '\n';
				}
			} else {
				rawText = file.name.replace('.pdf','');
			}

			const apiKey = getApiKey();
			let parsed = apiKey ? await aiParseResume(rawText) : null;
			
			if (!parsed || parsed.skills.length === 0) {
				console.log("AI Parse failed or returned early, using heuristic parser");
				parsed = parseResume(rawText);
			}

			setParsedData(parsed);
			setWebsiteHtml(generateWebsite(parsed, theme));
		} catch (err) {
			console.error(err);
			const parsed = parseResume(file.name.replace('.pdf',''));
			setParsedData(parsed);
			setWebsiteHtml(generateWebsite(parsed, theme));
		} finally {
			setIsProcessing(false);
		}
	};

	const handleDownload = () => {
		if (!websiteHtml) return;
		const blob = new Blob([websiteHtml], { type: 'text/html' });
		const a = Object.assign(document.createElement('a'), {
			href: URL.createObjectURL(blob),
			download: `${file?.name?.replace('.pdf','') || 'portfolio'}.html`,
		});
		a.click(); URL.revokeObjectURL(a.href);
	};

	const showResult = !!websiteHtml;

	return (
		<div className="min-h-screen bg-white dark:bg-[#0a0a0a] font-sans text-[#0a0a0a] dark:text-[#fafafa] transition-colors duration-200 overflow-x-hidden">

			<Navbar />

			<main className="px-5 sm:px-8 pb-24 pt-24 max-w-7xl mx-auto">

				{/* ── Hero ── */}
				<div className="mb-12">
					<p className="text-[#4f46e5] text-xs font-semibold uppercase tracking-widest mb-3">PDF → Portfolio</p>
					<h1 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-4 tracking-tight">
						Resume PDF to a live website
					</h1>
					<p className="text-[#737373] dark:text-[#a3a3a3] text-sm max-w-lg">
						Upload your PDF — we parse every detail and instantly build a fully responsive, downloadable portfolio.
					</p>
				</div>

				{/* ── Steps indicator ── */}
				<div className="flex items-center gap-3 mb-10 text-sm font-semibold">
					{['Upload PDF', 'Pick Theme', 'Generate'].map((s, i) => (
						<div key={s} className="flex items-center gap-3">
							<div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-xs ${
								(i===0 && file) || (i===1) || (i===2 && showResult)
									? 'bg-[#0a0a0a] dark:bg-[#fafafa] text-white dark:text-[#0a0a0a] border-[#0a0a0a] dark:border-[#fafafa]'
									: 'bg-white dark:bg-[#141414] border-[#e5e5e5] dark:border-[#262626] text-[#a3a3a3]'
							}`}>
								<span className="w-4 h-4 rounded-full bg-current/20 flex items-center justify-center text-[10px] font-bold shrink-0">{i+1}</span>
								{s}
							</div>
							{i < 2 && <div className="w-5 h-px bg-[#e5e5e5] dark:bg-[#262626]" />}
						</div>
					))}
				</div>

				{/* ── Main 2-column panel ── */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">

					{/* Left: Upload + action */}
					<motion.div className="lg:col-span-7 space-y-6" initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ delay:.1 }}>

						{/* Drop zone */}
						<div
							onClick={() => fileInputRef.current?.click()}
							onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}
							className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 flex flex-col items-center justify-center min-h-[340px] text-center transition-all duration-200
							${isDragActive
								? 'border-[#4f46e5] bg-[#4f46e5]/5'
								: file
									? 'border-[#0a0a0a] dark:border-[#fafafa] bg-[#f5f5f5] dark:bg-[#1a1a1a]'
									: 'border-[#e5e5e5] dark:border-[#262626] bg-white dark:bg-[#141414] hover:border-[#a3a3a3] dark:hover:border-[#404040]'
							}`}
						>
							<input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} className="sr-only" />

							<div className={`w-16 h-16 rounded-xl mb-5 flex items-center justify-center transition-all ${
								file 
									? 'bg-[#0a0a0a] dark:bg-[#fafafa]' 
									: 'bg-[#f5f5f5] dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#262626]'
							}`}>
								{file 
									? <CheckCircle2 className="w-8 h-8 text-white dark:text-[#0a0a0a]" /> 
									: <Upload className="w-8 h-8 text-[#a3a3a3]" />
								}
							</div>

							{file ? (
								<>
									<h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">PDF Ready to Convert</h2>
									<div className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl shadow-sm max-w-sm w-full">
										<FileText className="w-7 h-7 text-purple-500 shrink-0" />
										<div className="flex-grow text-left overflow-hidden">
											<p className="font-bold text-slate-900 dark:text-white text-sm truncate">{file.name}</p>
											<p className="text-xs text-slate-400 mt-0.5">{(file.size/1024/1024).toFixed(2)} MB · PDF</p>
										</div>
										<button onClick={e => { e.stopPropagation(); setFile(null); setWebsiteHtml(null); }} className="text-slate-400 hover:text-red-500 transition-colors p-1 text-lg">✕</button>
									</div>
									<p className="text-xs text-slate-400 mt-4">Click to replace file</p>
								</>
							) : (
								<>
									<h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Drop your resume PDF here</h2>
									<p className="text-sm text-slate-500 dark:text-slate-400 mb-6 max-w-xs">Or click to browse. Supports standard resume PDFs up to 10 MB.</p>
									<div className="px-7 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
										Browse Files
									</div>
								</>
							)}
						</div>

						{/* Generate button */}
						<button
							onClick={showResult ? () => { setWebsiteHtml(null); setParsedData(null); setFile(null); } : handleGenerate}
							disabled={!file || isProcessing}
							className={`w-full flex items-center justify-center gap-3 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
							${showResult
								? 'bg-[#f5f5f5] dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#262626] text-[#0a0a0a] dark:text-[#fafafa]'
								: 'bg-[#0a0a0a] dark:bg-[#fafafa] text-white dark:text-[#0a0a0a] hover:-translate-y-0.5'
							}`}
						>
							{isProcessing ? (
								<><Loader2 className="w-5 h-5 animate-spin" /> Parsing & Building Website...</>
							) : showResult ? (
								<><RefreshCw className="w-5 h-5" /> Start Over</>
							) : (
								<><Sparkles className="w-5 h-5" /> Generate Portfolio Website</>
							)}
						</button>
					</motion.div>

					{/* Right: Theme picker */}
					<motion.div className="lg:col-span-5" initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:.2 }}>
						<div className="card p-6 h-full">
							<div className="flex items-center gap-3 mb-6">
								<div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
									<LayoutTemplate className="w-5 h-5 text-white" />
								</div>
								<div>
									<h2 className="text-base font-bold text-slate-900 dark:text-white">Website Theme</h2>
									<p className="text-xs text-slate-400">Live-switches even after generation</p>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-3">
								{THEMES.map(t => (
									<button
										key={t.id}
										onClick={() => setSelectedTheme(t.id)}
										className={`relative flex flex-col items-start p-3.5 rounded-2xl border-2 text-left transition-all duration-200 group
										${selectedTheme === t.id
											? 'border-purple-500 bg-purple-50 dark:bg-purple-500/10 shadow-md shadow-purple-500/10'
											: 'border-slate-200 dark:border-slate-700/60 bg-white/60 dark:bg-white/5 hover:border-purple-300 hover:shadow-sm'
										}`}
									>
										<div className={`w-full h-7 rounded-lg bg-gradient-to-r ${t.swatch} mb-2.5 shadow-sm`} />
										<p className={`font-bold text-xs ${selectedTheme === t.id ? 'text-purple-700 dark:text-purple-400' : 'text-slate-700 dark:text-slate-300'}`}>{t.name}</p>
										<p className="text-[10px] text-slate-400 mt-0.5 leading-tight">{t.desc}</p>
										{selectedTheme === t.id && (
											<CheckCircle2 className="w-4 h-4 text-purple-500 absolute top-2 right-2" />
										)}
									</button>
								))}
							</div>

							{/* Feature list */}
							<div className="mt-5 pt-5 border-t border-slate-100 dark:border-white/10 grid grid-cols-2 gap-2">
								{['Real PDF parsing','Sticky navbar','Downloadable HTML','Responsive layout','6 unique themes','Live theme switch'].map(f => (
									<div key={f} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
										<CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" /> {f}
									</div>
								))}
							</div>
						</div>
					</motion.div>
				</div>

				{/* ── Result preview ── */}
				<AnimatePresence>
					{showResult && websiteHtml && (
						<motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:.45 }}>
							{/* Toolbar */}
							<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
								<div>
									<h2 className="text-2xl font-bold text-slate-900 dark:text-white">Your Portfolio Website ✨</h2>
									<h2 className="text-2xl font-bold text-[#0a0a0a] dark:text-white">Your Portfolio Website ✨</h2>
									<p className="text-sm text-[#737373] dark:text-slate-400 mt-0.5">
										Built from <strong>{file?.name}</strong> · <strong>{theme.name}</strong> theme · Switch themes live above
									</p>
								</div>
								<button
									onClick={handleDownload}
									className="flex items-center gap-2 px-5 py-2.5 bg-[#0a0a0a] dark:bg-[#fafafa] text-white dark:text-[#0a0a0a] rounded-xl font-semibold text-sm hover:-translate-y-0.5 transition-all"
								>
									<Download className="w-4 h-4" /> Download HTML File
								</button>
							</div>

							{/* Fake browser chrome */}
							<div className="bg-white dark:bg-[#0a0a0a] border border-[#e5e5e5] dark:border-[#262626] rounded-3xl shadow-2xl overflow-hidden">
								{/* Browser bar */}
								<div className="flex items-center gap-4 px-5 py-3.5 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 backdrop-blur">
									<div className="flex gap-1.5 shrink-0">
										<div className="w-3.5 h-3.5 rounded-full bg-red-400" />
										<div className="w-3.5 h-3.5 rounded-full bg-amber-400" />
										<div className="w-3.5 h-3.5 rounded-full bg-emerald-400" />
									</div>
									<div className="flex-1 flex items-center justify-center">
										<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 flex items-center gap-2 w-full max-w-md shadow-inner">
											<LinkIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
											<span className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">
												{parsedData?.name?.toLowerCase().replace(/\s+/g,'-') || 'portfolio'}.resumebuilder.app
											</span>
										</div>
									</div>
									<div className="flex gap-2 text-slate-400 shrink-0">
										<Monitor className="w-4 h-4" />
										<Smartphone className="w-4 h-4" />
									</div>
								</div>

								{/* Preview iframe */}
								<div style={{ height: '82vh' }}>
									<iframe
										key={selectedTheme}
										title="Portfolio Preview"
										srcDoc={websiteHtml}
										className="w-full h-full border-0"
										sandbox="allow-same-origin allow-scripts"
									/>
								</div>
							</div>
						</motion.div>
					)}
				</AnimatePresence>
			</main>
		</div>
	);
}
