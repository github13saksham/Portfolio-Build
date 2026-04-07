import type { Resume } from "../../types/Resume";

interface Props {
	resume: Resume;
	onEdit: () => void;
	template?: string; // e.g. "modern" (blue), "classic" (slate), "creative" (purple), "minimal" (emerald), or template IDs from themes store
}

export default function ResumePreview({ resume, onEdit, template = "modern" }: Props) {
	// Let's determine the color scheme based on the chosen template string
	
	let themeStyles = {
		wrapper: "bg-white text-gray-900 border-gray-200",
		headerBg: "bg-blue-700",
		headerText: "text-white",
		accentText: "text-blue-700",
		accentBg: "bg-blue-600 text-white",
		bgAccent: "bg-blue-600",
		borderAccent: "border-blue-700",
		font: "font-sans"
	};

	if (template === 'pro-exec') {
		themeStyles = {
			wrapper: "bg-white text-slate-900 border-slate-300",
			headerBg: "bg-slate-800",
			headerText: "text-white",
			accentText: "text-slate-800",
			accentBg: "bg-slate-700 text-white",
			bgAccent: "bg-slate-700",
			borderAccent: "border-slate-800",
			font: "font-serif"
		};
	} else if (template === 'neo-creative' || template === 'creative') {
		themeStyles = {
			wrapper: "bg-white text-gray-800 border-purple-200",
			headerBg: "bg-purple-700",
			headerText: "text-white",
			accentText: "text-purple-700",
			accentBg: "bg-purple-100 text-purple-800 font-bold",
			bgAccent: "bg-purple-600",
			borderAccent: "border-purple-700",
			font: "font-sans"
		};
	} else if (template === 'clean-minimal' || template === 'minimal') {
		themeStyles = {
			wrapper: "bg-white text-gray-800 border-gray-100",
			headerBg: "bg-white border-b border-gray-200",
			headerText: "text-gray-900",
			accentText: "text-gray-900",
			accentBg: "bg-gray-100 text-gray-800",
			bgAccent: "bg-gray-200",
			borderAccent: "border-gray-900",
			font: "font-sans"
		};
	} else if (template === 'dev-terminal') {
		themeStyles = {
			wrapper: "bg-[#0d1117] text-gray-300 border-gray-700",
			headerBg: "bg-[#161b22] border-b border-gray-700",
			headerText: "text-emerald-400",
			accentText: "text-emerald-400",
			accentBg: "bg-gray-800 text-emerald-400",
			bgAccent: "bg-emerald-500",
			borderAccent: "border-emerald-500",
			font: "font-mono"
		};
	} else if (template === 'academic-classic' || template === 'classic') {
		themeStyles = {
			wrapper: "bg-white text-gray-900 border-gray-300",
			headerBg: "bg-blue-900",
			headerText: "text-white",
			accentText: "text-blue-900",
			accentBg: "bg-blue-900 text-white",
			bgAccent: "bg-blue-900",
			borderAccent: "border-blue-900",
			font: "font-serif"
		};
	} else if (template === 'startup-hustle') {
		themeStyles = {
			wrapper: "bg-white text-gray-900 border-orange-200",
			headerBg: "bg-orange-600",
			headerText: "text-white",
			accentText: "text-orange-600",
			accentBg: "bg-orange-100 text-orange-800 font-bold",
			bgAccent: "bg-orange-600",
			borderAccent: "border-orange-600",
			font: "font-sans"
		};
	} else if (template === 'finance-strict') {
		themeStyles = {
			wrapper: "bg-white text-gray-900 border-green-300",
			headerBg: "bg-green-900",
			headerText: "text-white",
			accentText: "text-green-900",
			accentBg: "bg-green-900 text-white",
			bgAccent: "bg-green-800",
			borderAccent: "border-green-900",
			font: "font-serif"
		};
	} else if (template === 'design-studio') {
		themeStyles = {
			wrapper: "bg-white text-gray-800 border-pink-200",
			headerBg: "bg-gradient-to-r from-pink-500 to-rose-500",
			headerText: "text-white",
			accentText: "text-pink-600",
			accentBg: "bg-pink-100 text-pink-800 font-bold",
			bgAccent: "bg-pink-500",
			borderAccent: "border-pink-500",
			font: "font-sans"
		};
	} else if (template === 'medical-clean') {
		themeStyles = {
			wrapper: "bg-white text-gray-900 border-cyan-200",
			headerBg: "bg-cyan-700",
			headerText: "text-white",
			accentText: "text-cyan-700",
			accentBg: "bg-cyan-100 text-cyan-800 font-bold",
			bgAccent: "bg-cyan-600",
			borderAccent: "border-cyan-700",
			font: "font-sans"
		};
	} else if (template === 'legal-formal') {
		themeStyles = {
			wrapper: "bg-white text-gray-900 border-gray-400",
			headerBg: "bg-gray-800",
			headerText: "text-white",
			accentText: "text-gray-800",
			accentBg: "bg-gray-800 text-white",
			bgAccent: "bg-gray-700",
			borderAccent: "border-gray-800",
			font: "font-serif"
		};
	} else if (template === 'royal-gold') {
		themeStyles = {
			wrapper: "bg-white text-gray-900 border-amber-300",
			headerBg: "bg-gradient-to-r from-amber-600 to-yellow-600",
			headerText: "text-white",
			accentText: "text-amber-700",
			accentBg: "bg-amber-100 text-amber-800 font-bold",
			bgAccent: "bg-amber-600",
			borderAccent: "border-amber-600",
			font: "font-serif"
		};
	} else if (template === 'ocean-breeze') {
		themeStyles = {
			wrapper: "bg-white text-gray-900 border-sky-200",
			headerBg: "bg-gradient-to-r from-sky-500 to-blue-600",
			headerText: "text-white",
			accentText: "text-sky-600",
			accentBg: "bg-sky-100 text-sky-800 font-bold",
			bgAccent: "bg-sky-500",
			borderAccent: "border-sky-500",
			font: "font-sans"
		};
	} else if (template === 'midnight-dark') {
		themeStyles = {
			wrapper: "bg-[#1a1a2e] text-gray-200 border-indigo-800",
			headerBg: "bg-[#16213e]",
			headerText: "text-indigo-300",
			accentText: "text-indigo-400",
			accentBg: "bg-indigo-900 text-indigo-300",
			bgAccent: "bg-indigo-600",
			borderAccent: "border-indigo-500",
			font: "font-sans"
		};
	} else if (template === 'ruby-red') {
		themeStyles = {
			wrapper: "bg-white text-gray-900 border-red-200",
			headerBg: "bg-red-700",
			headerText: "text-white",
			accentText: "text-red-700",
			accentBg: "bg-red-100 text-red-800 font-bold",
			bgAccent: "bg-red-600",
			borderAccent: "border-red-700",
			font: "font-sans"
		};
	} else if (template === 'nature-green') {
		themeStyles = {
			wrapper: "bg-white text-gray-900 border-emerald-200",
			headerBg: "bg-gradient-to-r from-emerald-600 to-teal-600",
			headerText: "text-white",
			accentText: "text-emerald-700",
			accentBg: "bg-emerald-100 text-emerald-800 font-bold",
			bgAccent: "bg-emerald-600",
			borderAccent: "border-emerald-600",
			font: "font-sans"
		};
	}

	// For ATS friendliness, we prioritize linear layouts (StandardLayout)
	// We only use DeveloperLayout for 'dev-terminal' but made it more structured.
	
	if (template === 'dev-terminal') {
		return <DeveloperLayout resume={resume} themeStyles={themeStyles} onEdit={onEdit} />;
	}
	
	return <StandardLayout resume={resume} themeStyles={themeStyles} onEdit={onEdit} template={template} />;
}

/**
 * Standard ATS-Friendly Layout
 * Uses a single-column, logical reading order for maximum compatibility.
 */
const StandardLayout = ({ resume, themeStyles, onEdit }: any) => {
	return (
		<div className={`w-full max-w-5xl mx-auto ${themeStyles.wrapper} ${themeStyles.font} shadow-lg print:shadow-none min-h-[1100px] flex flex-col`}>
			
			{/* Header Section */}
			<div className={`p-10 md:p-12 ${themeStyles.headerBg} ${themeStyles.headerText} text-center`}>
				<h1 className="text-4xl md:text-5xl font-bold mb-3 uppercase tracking-tight">{resume.name}</h1>
				<p className="text-xl opacity-95 font-medium mb-6 italic">{resume.bio}</p>
				
				<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium opacity-90">
					{resume.email && <span className="flex items-center gap-1.5"><EmailIcon /> {resume.email}</span>}
					{resume.phone && <span className="flex items-center gap-1.5"><PhoneIcon /> {resume.phone}</span>}
					{resume.address && <span className="flex items-center gap-1.5"><MapIcon /> {resume.address}</span>}
					{resume.linkedin && <span className="flex items-center gap-1.5"><LinkedinIcon /> {resume.linkedin.replace('https://', '')}</span>}
					{resume.github && <span className="flex items-center gap-1.5"><GithubIcon /> {resume.github.replace('https://', '')}</span>}
				</div>
			</div>

			<div className="p-10 md:p-12 space-y-10 flex-grow">
				
				{/* Professional Summary */}
				{resume.about && (
					<section>
						<h2 className={`text-xl font-bold mb-3 uppercase tracking-widest border-b-2 ${themeStyles.borderAccent} pb-1 ${themeStyles.accentText}`}>Summary</h2>
						<p className="leading-relaxed text-gray-700 dark:text-gray-300 text-[1.05rem]">{resume.about}</p>
					</section>
				)}

				{/* Work Experience */}
				{resume.workExperience.length > 0 && (
					<section>
						<h2 className={`text-xl font-bold mb-6 uppercase tracking-widest border-b-2 ${themeStyles.borderAccent} pb-1 ${themeStyles.accentText}`}>Professional Experience</h2>
						<div className="space-y-8">
							{resume.workExperience.map((work: any, i: number) => (
								<div key={i} className="group">
									<div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
										<h3 className="font-bold text-lg text-gray-900 dark:text-white uppercase">{work.position}</h3>
										<span className="text-sm font-bold text-gray-600 dark:text-gray-400">{work.duration}</span>
									</div>
									<div className="flex flex-col md:flex-row md:items-center justify-between mb-3 text-gray-700 dark:text-gray-400 font-semibold italic">
										<span>{work.company} {work.title && `| ${work.title}`}</span>
									</div>
									{work.responsibilities && work.responsibilities.length > 0 && (
										<ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
											{work.responsibilities.map((r: string, j: number) => (
												<li key={j} className="leading-relaxed">{r}</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>
					</section>
				)}

				{/* Projects */}
				{resume.projects.length > 0 && (
					<section>
						<h2 className={`text-xl font-bold mb-6 uppercase tracking-widest border-b-2 ${themeStyles.borderAccent} pb-1 ${themeStyles.accentText}`}>Key Projects</h2>
						<div className="space-y-6">
							{resume.projects.map((proj: any, i: number) => (
								<div key={i}>
									<div className="flex justify-between items-center mb-1">
										<h3 className="font-bold text-lg text-gray-900 dark:text-white">{proj.title}</h3>
										<span className="text-sm font-semibold text-gray-500">{proj.duration}</span>
									</div>
									<p className="text-gray-700 dark:text-gray-300 leading-relaxed italic mb-1">{proj.description}</p>
								</div>
							))}
						</div>
					</section>
				)}

				{/* Technical Skills */}
				{resume.skills.length > 0 && (
					<section>
						<h2 className={`text-xl font-bold mb-4 uppercase tracking-widest border-b-2 ${themeStyles.borderAccent} pb-1 ${themeStyles.accentText}`}>Skills & Expertise</h2>
						<div className="flex flex-wrap gap-2">
							{resume.skills.map((skill: string, i: number) => (
								<span key={i} className={`px-3 py-1 rounded-sm border ${themeStyles.borderAccent} text-sm font-bold uppercase transition-colors group hover:bg-gray-50`}>
									{skill}
								</span>
							))}
						</div>
					</section>
				)}

				{/* Education */}
				{resume.education.length > 0 && (
					<section>
						<h2 className={`text-xl font-bold mb-6 uppercase tracking-widest border-b-2 ${themeStyles.borderAccent} pb-1 ${themeStyles.accentText}`}>Education</h2>
						<div className="space-y-6">
							{resume.education.map((edu: any, i: number) => (
								<div key={i}>
									<div className="flex justify-between items-center mb-1">
										<h3 className="font-bold text-lg text-gray-900 dark:text-white">{edu.degree}</h3>
										<span className="text-sm font-bold text-gray-600">{edu.duration}</span>
									</div>
									<p className="text-gray-700 dark:text-gray-300 font-semibold">{edu.institution} | {edu.program}</p>
								</div>
							))}
						</div>
					</section>
				)}

				{/* Languages */}
				{resume.languages.length > 0 && (
					<section>
						<h2 className={`text-xl font-bold mb-4 uppercase tracking-widest border-b-2 ${themeStyles.borderAccent} pb-1 ${themeStyles.accentText}`}>Languages</h2>
						<div className="flex flex-wrap gap-x-8 gap-y-2">
							{resume.languages.map((lang: string, idx: number) => (
								<div key={idx} className="flex items-center gap-2">
									<span className="font-bold text-gray-900 dark:text-white uppercase text-sm tracking-wider">• {lang}</span>
								</div>
							))}
						</div>
					</section>
				)}
			</div>
			
			<div className="text-center p-12 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto flex justify-center pb-20 pt-8 no-print">
				<button
					onClick={onEdit}
					className={`px-10 py-3 rounded-full font-bold transition-all hover:scale-105 shadow-md flex items-center gap-2 mx-auto ${themeStyles.accentBg}`}
				>
					Update Resume Information
				</button>
			</div>

		</div>
	);
}

/**
 * Developer Terminal Layout
 * Clean, high-tech, but still ATS-friendly by using standard headings and text.
 */
const DeveloperLayout = ({ resume, themeStyles, onEdit }: any) => {
	return (
		<div className={`w-full max-w-5xl mx-auto ${themeStyles.wrapper} ${themeStyles.font} p-10 md:p-14 min-h-[1100px] flex flex-col border shadow-inner`}>
			<div className="flex flex-col md:flex-row justify-between items-start border-b border-emerald-500/30 pb-10 mb-10">
				<div>
					<h1 className="text-4xl md:text-5xl font-bold text-emerald-400 mb-4 font-mono tracking-tighter">
						&gt; {resume.name.replace(/\s+/g, '_').toLowerCase()}
					</h1>
					<p className="text-gray-400 text-xl font-mono opacity-80">&lsaquo; {resume.bio} /&rsaquo;</p>
				</div>
				<div className="font-mono text-sm text-gray-500 space-y-2 mt-6 md:mt-0 text-left md:text-right">
					{resume.email && <p>user@email: <span className="text-blue-400">{resume.email}</span></p>}
					{resume.phone && <p>user@phone: <span className="text-blue-400">{resume.phone}</span></p>}
					{resume.github && <p>user@github: <span className="text-blue-400">{resume.github.replace('https://', '')}</span></p>}
					{resume.linkedin && <p>user@linkedin: <span className="text-blue-400">{resume.linkedin.replace('https://', '').replace('www.', '')}</span></p>}
				</div>
			</div>

			<div className="space-y-12">
				{resume.about && (
					<section>
						<h2 className="text-xl font-bold text-emerald-400 mb-4 font-mono uppercase tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
							<span className="text-emerald-600">#</span> Profile_Summary
						</h2>
						<p className="text-gray-300 leading-relaxed text-lg font-mono">{resume.about}</p>
					</section>
				)}
				
				{resume.workExperience.length > 0 && (
					<section>
						<h2 className="text-xl font-bold text-emerald-400 mb-6 font-mono uppercase tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
							<span className="text-emerald-600">#</span> Work_Experience
						</h2>
						<div className="space-y-10">
							{resume.workExperience.map((work: any, i: number) => (
								<div key={i} className="relative pl-6 border-l border-emerald-500/20">
									<div className="absolute top-0 left-0 -translate-x-1/2 w-2 h-2 bg-emerald-500 rounded-full"></div>
									<div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
										<h3 className="text-emerald-300 font-bold text-xl font-mono">{work.position}</h3>
										<span className="text-gray-500 font-mono text-sm">[{work.duration}]</span>
									</div>
									<p className="text-blue-400 font-mono mb-4 italic">@ {work.company} {work.title && `/ ${work.title}`}</p>
									{work.responsibilities && (
										<ul className="list-none space-y-3 text-gray-400 font-mono">
											{work.responsibilities.map((r: string, j: number) => (
												<li key={j} className="flex gap-3">
													<span className="text-emerald-600 font-bold">~</span>
													<span className="leading-relaxed">{r}</span>
												</li>
											))}
										</ul>
									)}
								</div>
							))}
						</div>
					</section>
				)}
				
				<div className="grid grid-cols-1 md:grid-cols-2 gap-14">
					<div className="space-y-12">
						{resume.skills.length > 0 && (
							<section>
								<h2 className="text-xl font-bold text-emerald-400 mb-6 font-mono uppercase tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
									<span className="text-emerald-600">#</span> Skill_Set
								</h2>
								<div className="flex flex-wrap gap-2">
									{resume.skills.map((s: string, i: number) => (
										<span key={i} className="px-3 py-1 bg-gray-800/50 border border-gray-700 text-emerald-300 font-mono text-sm">
											{s}
										</span>
									))}
								</div>
							</section>
						)}
					</div>
					
					<div className="space-y-12">
						{resume.education.length > 0 && (
							<section>
								<h2 className="text-xl font-bold text-emerald-400 mb-6 font-mono uppercase tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
									<span className="text-emerald-600">#</span> Education
								</h2>
								<div className="space-y-6">
									{resume.education.map((edu: any, i: number) => (
										<div key={i} className="font-mono">
											<p className="text-emerald-300 font-bold mb-1 uppercase tracking-tight">{edu.degree}</p>
											<p className="text-gray-400 text-sm mb-1">{edu.institution} | {edu.program}</p>
											<p className="text-gray-500 text-xs italic">Term: {edu.duration}</p>
										</div>
									))}
								</div>
							</section>
						)}
					</div>
				</div>
			</div>

			<div className="mt-auto pt-14 flex justify-center border-t border-gray-800 no-print">
				<button onClick={onEdit} className="px-10 py-3 rounded-md font-mono font-bold transition-all hover:bg-emerald-500 hover:text-black border border-emerald-500/50 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
					&gt; sudo update_profile()
				</button>
			</div>
		</div>
	);
};

// Icons (Inlined for standalone component)
const EmailIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const PhoneIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MapIcon = () => <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LinkedinIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>;
const GithubIcon = () => <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>;
