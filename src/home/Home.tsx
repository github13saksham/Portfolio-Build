import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, FileText, Globe, LayoutTemplate, Sparkles, CheckCircle, ChevronRight } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */
const features = [
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "AI Writing Assistant",
    desc: "Real-time suggestions to sharpen your bullet points and match job descriptions. ATS-optimized by default.",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "PDF → Live Portfolio",
    desc: "Upload your existing PDF and get an instant, fully responsive personal website — shareable in seconds.",
  },
  {
    icon: <LayoutTemplate className="w-5 h-5" />,
    title: "Professional Templates",
    desc: "Handcrafted templates built for real hiring managers. Clean, readable, and designed to pass ATS filters.",
  },
];

const steps = [
  { n: "01", title: "Pick a template", desc: "Browse our library of ATS-friendly templates built for every industry." },
  { n: "02", title: "Fill in your details", desc: "Add your experience, skills, and education — or let AI assist you." },
  { n: "03", title: "Export & share", desc: "Download a polished PDF or publish a personal portfolio website." },
];

const testimonials = [
  {
    quote: "Got 3 interview requests the week after using this. The PDF-to-website feature alone is worth it.",
    name: "Sarah J.",
    role: "Frontend Developer",
  },
  {
    quote: "The AI rewrote my bullet points and made them sound like they came from a senior exec. Landed my PM role.",
    name: "Michael C.",
    role: "Product Manager",
  },
  {
    quote: "Dead simple, beautiful output. My resume was ready in under 15 minutes.",
    name: "Aisha P.",
    role: "UX Designer",
  },
];

/* ─── Page ───────────────────────────────────────────────── */
export default function Home() {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [stats, setStats] = useState({ resumes: 0, users: 0, templates: 4 });
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    fetch("http://localhost:5000/api/stats")
      .then(r => r.json())
      .then(d => { if (d.resumes !== undefined) setStats(p => ({ ...p, resumes: d.resumes, users: d.users })); })
      .catch(() => {});

    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] transition-colors duration-200">
      <Navbar />

      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pt-32 pb-16 md:pt-36 md:pb-24">
        <div className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-16 transition-all duration-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>

          {/* ── Left: Copy ────────────────────────────── */}
          <div className="flex-1 min-w-0">
            {/* Label */}
            <p className="text-[#4f46e5] text-xs font-semibold tracking-widest mb-6 uppercase">
              AI Resume Builder
            </p>

            {/* Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#0a0a0a] dark:text-[#fafafa] mb-7 leading-[1.06]">
              Build a resume<br />
              <span className="text-[#0a0a0a] dark:text-[#fafafa]">that gets you hired.</span>
            </h1>

            {/* Sub-copy */}
            <p className="text-[#737373] dark:text-[#a3a3a3] text-lg leading-relaxed max-w-lg mb-10">
              Professional templates, AI writing assistance, and instant PDF-to-website conversion.
              Create your resume in minutes — free, with no fluff.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 items-center mb-12">
              <button
                onClick={() => navigate("/pages/ResumeBuilder")}
                className="btn-primary px-7 py-3.5 text-sm"
              >
                Get started free <ArrowRight className="w-4 h-4" />
              </button>
              <Link to="/templates" className="btn-ghost px-7 py-3.5 text-sm">
                View templates
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-[#737373] dark:text-[#525252]">
              {[
                "ATS-optimized",
                "Free to start",
                "No credit card needed",
              ].map(item => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#4f46e5]" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Hero visual ────────────────────── */}
          <div className="flex-shrink-0 w-full lg:w-[500px] xl:w-[560px] relative">

            {/* Main image card */}
            <div className="relative rounded-2xl overflow-hidden border border-[#e5e5e5] dark:border-[#262626] shadow-2xl shadow-black/10 dark:shadow-black/60 bg-white dark:bg-[#141414]">
              {/* Browser-chrome top bar */}
              <div className="flex items-center gap-1.5 px-4 py-3 bg-[#f5f5f5] dark:bg-[#1a1a1a] border-b border-[#e5e5e5] dark:border-[#262626]">
                <div className="w-3 h-3 rounded-full bg-[#e5e5e5] dark:bg-[#333]" />
                <div className="w-3 h-3 rounded-full bg-[#e5e5e5] dark:bg-[#333]" />
                <div className="w-3 h-3 rounded-full bg-[#e5e5e5] dark:bg-[#333]" />
                <div className="flex-1 mx-3">
                  <div className="bg-white dark:bg-[#262626] border border-[#e5e5e5] dark:border-[#333] rounded-md px-3 py-1 flex items-center gap-2 max-w-[200px] mx-auto">
                    <div className="w-2 h-2 rounded-full bg-[#4f46e5]" />
                    <span className="text-[10px] text-[#a3a3a3] font-medium">resumebuilder.app</span>
                  </div>
                </div>
              </div>

              {/* Hero image */}
              <img
                src="/hero-dashboard.png"
                alt="Resume builder interface showing professional resume templates"
                className="w-full h-auto block dark:opacity-90"
                loading="eager"
              />
            </div>

            {/* Floating badge: ATS Score */}
            <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#262626] rounded-xl px-4 py-3 shadow-lg shadow-black/8 dark:shadow-black/40 flex items-center gap-3 z-10">
              <div className="w-9 h-9 rounded-lg bg-[#4f46e5] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[#0a0a0a] dark:text-[#fafafa]">ATS Score</p>
                <p className="text-[10px] text-[#737373]">94 / 100 — Excellent</p>
              </div>
            </div>

            {/* Floating badge: AI Assist */}
            <div className="absolute -top-3 -right-3 sm:-right-5 bg-[#0a0a0a] dark:bg-[#fafafa] rounded-xl px-3.5 py-2.5 shadow-lg flex items-center gap-2 z-10">
              <svg className="w-4 h-4 text-[#4f46e5] dark:text-[#4f46e5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              <span className="text-xs font-semibold text-white dark:text-[#0a0a0a]">AI-assisted</span>
            </div>

            {/* Floating badge: Templates count */}
            <div className="absolute top-16 -left-5 sm:-left-7 bg-white dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#262626] rounded-xl px-3.5 py-2.5 shadow-md z-10 hidden sm:flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#4f46e5]" />
              <span className="text-xs font-semibold text-[#0a0a0a] dark:text-[#fafafa]">15+ Templates</span>
            </div>

          </div>
        </div>
      </section>


      {/* ─── FEATURES ──────────────────────────────────────── */}
      <section className="section-alt py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="mb-12">
            <p className="text-[#4f46e5] text-xs font-semibold uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] dark:text-[#fafafa]">
              Everything in one place
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#e5e5e5] dark:bg-[#262626] border border-[#e5e5e5] dark:border-[#262626] rounded-xl overflow-hidden">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#0a0a0a] p-8 flex flex-col gap-4 hover:bg-[#fafafa] dark:hover:bg-[#111] transition-colors duration-150"
              >
                <span className="w-9 h-9 border border-[#e5e5e5] dark:border-[#333] rounded-lg flex items-center justify-center text-[#4f46e5]">
                  {f.icon}
                </span>
                <h3 className="font-semibold text-[#0a0a0a] dark:text-[#fafafa] text-base">{f.title}</h3>
                <p className="text-sm text-[#737373] dark:text-[#a3a3a3] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ──────────────────────────────────── */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[#4f46e5] text-xs font-semibold uppercase tracking-widest mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] dark:text-[#fafafa]">
              Three steps to done
            </h2>
          </div>

          <div className="space-y-0 divide-y divide-[#e5e5e5] dark:divide-[#262626] border border-[#e5e5e5] dark:border-[#262626] rounded-xl overflow-hidden">
            {steps.map((s, i) => (
              <div
                key={i}
                className="flex items-start gap-8 px-8 py-7 bg-white dark:bg-[#0a0a0a] hover:bg-[#fafafa] dark:hover:bg-[#0f0f0f] transition-colors group cursor-default"
              >
                <span className="text-[#4f46e5] text-sm font-bold font-mono shrink-0 mt-0.5 w-8">{s.n}</span>
                <div className="flex-grow">
                  <p className="font-semibold text-[#0a0a0a] dark:text-[#fafafa] mb-1">{s.title}</p>
                  <p className="text-sm text-[#737373] dark:text-[#737373] leading-relaxed">{s.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#d4d4d4] dark:text-[#333] group-hover:text-[#a3a3a3] shrink-0 mt-0.5 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────── */}
      <section ref={statsRef} className="section-alt py-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#e5e5e5] dark:divide-[#262626]">
            {[
              { value: stats.resumes > 0 ? `${stats.resumes}+` : "1,000+", label: "Resumes created" },
              { value: stats.users > 0 ? `${stats.users}+` : "500+", label: "Users signed up" },
              { value: `${stats.templates}+`, label: "Professional templates" },
            ].map((s, i) => (
              <div
                key={i}
                className={`py-10 text-center transition-all duration-700 ease-out ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <p className="text-4xl md:text-5xl font-bold tracking-tight text-[#0a0a0a] dark:text-[#fafafa] mb-2">{s.value}</p>
                <p className="text-sm text-[#737373] dark:text-[#737373]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ──────────────────────────────────── */}
      <section className="py-20 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[#4f46e5] text-xs font-semibold uppercase tracking-widest mb-3">What people say</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] dark:text-[#fafafa]">
              Trusted by job seekers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="card p-7 flex flex-col gap-5"
              >
                {/* Stars — monochrome */}
                <div className="flex gap-0.5">
                  {Array(5).fill(0).map((_, j) => (
                    <svg key={j} className="w-4 h-4 fill-[#0a0a0a] dark:fill-[#fafafa]" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-[#404040] dark:text-[#d4d4d4] leading-relaxed flex-grow">
                  "{t.quote}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa]">{t.name}</p>
                  <p className="text-xs text-[#a3a3a3]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ────────────────────────────────────── */}
      <section className="py-10 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#0a0a0a] dark:bg-[#fafafa] rounded-xl p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-[#0a0a0a] mb-2">
                Ready to land your next role?
              </h2>
              <p className="text-[#737373] dark:text-[#525252] text-sm">
                Create your resume for free. No account needed to get started.
              </p>
            </div>
            <button
              onClick={() => navigate("/pages/ResumeBuilder")}
              className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-white font-semibold rounded-lg text-sm hover:bg-[#f5f5f5] dark:hover:bg-[#141414] transition-all"
            >
              Start building <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────── */}
      <footer className="border-t border-[#e5e5e5] dark:border-[#1a1a1a] py-10 px-5 sm:px-8 mt-10">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#0a0a0a] dark:bg-[#fafafa] rounded-lg flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white dark:text-[#0a0a0a]" />
            </div>
            <span className="font-semibold text-sm text-[#0a0a0a] dark:text-[#fafafa]">Resume Builder</span>
          </div>

          <p className="text-xs text-[#a3a3a3] order-last sm:order-none">
            © {new Date().getFullYear()} ResumeBuilderPro
          </p>

          <div className="flex gap-5 text-sm text-[#737373] dark:text-[#525252]">
            {[
              { to: "/templates", label: "Templates" },
              { to: "/home/chat-bot", label: "AI Help" },
              { to: "/auth", label: "Sign In" },
            ].map(l => (
              <Link
                key={l.to}
                to={l.to}
                className="hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors text-xs"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>

      {/* Floating chat */}
      <Link
        to="/home/chat-bot"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 bg-[#0a0a0a] dark:bg-[#fafafa] text-white dark:text-[#0a0a0a] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 border border-[#1a1a1a] dark:border-[#e5e5e5]"
        title="AI Help"
      >
        <span className="text-base">💬</span>
      </Link>
    </div>
  );
}
