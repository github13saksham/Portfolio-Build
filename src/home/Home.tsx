import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, FileText, ArrowRight, Sparkles, Zap, Shield, Star, ChevronRight, LayoutTemplate } from "lucide-react";

function Home() {
	const navigate = useNavigate();
	const [visible, setVisible] = useState(true);
	const [mounted, setMounted] = useState(false);
	const [statsVisible, setStatsVisible] = useState(false);
	const [stats, setStats] = useState({ resumes: 0, users: 0, templates: 4 });

	useEffect(() => {
		setMounted(true);
		const enterTimer = setTimeout(() => setVisible(true), 100);
		const exitTimer = setTimeout(() => setVisible(false), 5000);
		const statsTimer = setTimeout(() => setStatsVisible(true), 800);
		
		// Fetch real data from backend
		fetch("http://localhost:5000/api/stats")
			.then(res => res.json())
			.then(data => {
				if (data.resumes !== undefined) {
					setStats(prev => ({ ...prev, resumes: data.resumes, users: data.users }));
				}
			})
			.catch(err => console.error("Failed to load stats", err));

		return () => {
			clearTimeout(enterTimer);
			clearTimeout(exitTimer);
			clearTimeout(statsTimer);
		};
	}, []);

	return (
		<div className="relative min-h-screen w-full font-sans text-gray-900 dark:text-gray-100 overflow-hidden bg-slate-50 dark:bg-[#0a0f1c] transition-colors duration-500">
			{/* Ambient Glowing Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
				<div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
				<div className="absolute top-40 -right-20 w-[35rem] h-[35rem] bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse animation-delay-2000"></div>
				<div className="absolute -bottom-40 left-1/4 w-[45rem] h-[45rem] bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse animation-delay-4000"></div>
			</div>

			{/* Top Navbar */}
			<header className="relative w-full z-50">
				<Navbar />
			</header>

			{/* Hero Section */}
			<section className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] text-center px-6 pt-32 pb-20">
				<div className={`max-w-5xl mx-auto transition-all duration-1000 ease-out transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
					<div className="mb-8 flex justify-center">
						<span className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-800 dark:text-gray-200 shadow-sm hover:scale-105 transition-transform cursor-default">
							<Sparkles className="w-4 h-4 text-amber-500 dark:text-yellow-400" />
							Next-Gen AI Resume Builder
						</span>
					</div>
					
					<h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight text-slate-900 dark:text-white leading-[1.1]">
						Craft Your <br className="hidden sm:block" />
						<span className="relative inline-block mt-2">
							<span className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-20 dark:opacity-40 rounded-full"></span>
							<span className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">Dream Resume</span>
						</span>
					</h1>
					
					<p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
						Stand out from the crowd with stunning, professional resumes crafted in minutes. Powered by artificial intelligence.
					</p>

					<div className="flex flex-col sm:flex-row flex-wrap justify-center gap-5 mb-16">
						<Link
							to="/pages/ResumeBuilder"
							className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-blue-200 dark:border-blue-500/30 rounded-2xl shadow-[0_8px_30px_rgba(59,130,246,0.15)] dark:shadow-[0_8px_30px_rgba(59,130,246,0.2)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.3)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
						>
							{/* Hover Sweep */}
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 dark:via-blue-500/20 to-blue-500/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-[-20deg]"></div>
							
							{/* Active State BG */}
							<div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

							{/* Text */}
							<span className="relative z-10 text-lg font-extrabold tracking-wide bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-300 dark:to-indigo-300 bg-clip-text text-transparent group-hover:scale-[1.02] transition-transform duration-300">
								Website Resume
							</span>

							{/* Chevron */}
							<ChevronRight className="w-5 h-5 relative z-10 text-blue-500 dark:text-blue-400 group-hover:translate-x-2 transition-transform duration-300" />
						</Link>

						<button
							onClick={() => navigate("/pages/pdfbuilder")}
							className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-emerald-200 dark:border-emerald-500/30 rounded-2xl shadow-[0_8px_30px_rgba(16,185,129,0.15)] dark:shadow-[0_8px_30px_rgba(16,185,129,0.2)] hover:shadow-[0_8px_40px_rgba(16,185,129,0.3)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
						>
							{/* Hover Sweep */}
							<div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 dark:via-emerald-500/20 to-emerald-500/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-[-20deg]"></div>
							
							{/* Active State BG */}
							<div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

							{/* Text */}
							<span className="relative z-10 text-lg font-extrabold tracking-wide bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-300 dark:to-teal-300 bg-clip-text text-transparent group-hover:scale-[1.02] transition-transform duration-300">
								PDF Resume
							</span>

							{/* Chevron */}
							<ChevronRight className="w-5 h-5 relative z-10 text-emerald-500 dark:text-emerald-400 group-hover:translate-x-2 transition-transform duration-300" />
						</button>

						<Link
							to="/pages/Pdftoweb"
							className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-purple-200 dark:border-purple-500/30 rounded-2xl shadow-[0_8px_30px_rgba(168,85,247,0.15)] dark:shadow-[0_8px_30px_rgba(168,85,247,0.2)] hover:shadow-[0_8px_40px_rgba(168,85,247,0.3)] hover:-translate-y-1 transition-all duration-500 overflow-hidden"
						>
							{/* Hover Sweep */}
							<div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 dark:via-purple-500/20 to-purple-500/0 -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out skew-x-[-20deg]"></div>
							
							{/* Active State BG */}
							<div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
							
							{/* Text */}
							<span className="relative z-10 text-lg font-extrabold tracking-wide bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-300 dark:to-indigo-300 bg-clip-text text-transparent group-hover:scale-[1.02] transition-transform duration-300">
								PDF → Website
							</span>

							{/* Chevron */}
							<ChevronRight className="w-5 h-5 relative z-10 text-purple-500 dark:text-purple-400 group-hover:translate-x-2 transition-transform duration-300" />
						</Link>
					</div>
					
					<div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-400">
						<div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-white/5">
							<Zap className="w-4 h-4 text-yellow-500" />
							<span>Lightning Fast</span>
						</div>
						<div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-white/5">
							<Shield className="w-4 h-4 text-emerald-500" />
							<span>Secure & Private</span>
						</div>
						<div className="flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 rounded-full backdrop-blur-sm border border-slate-200/50 dark:border-white/5">
							<Star className="w-4 h-4 text-blue-500" />
							<span>4.9/5 Rating</span>
						</div>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="relative z-10 py-24 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-20">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
							Why Choose Us?
						</h2>
						<p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
							Discover the powerful features that make our builder the best choice for forward-thinking professionals.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<FeatureCard 
							icon={<Sparkles className="w-7 h-7 text-blue-600 dark:text-blue-400" />}
							title="AI Recommendations"
							desc="Get intelligent, real-time suggestions to optimize your resume content and format for maximum impact and ATS compatibility."
							bgClass="from-blue-500/10 to-indigo-500/10 border-blue-200/50 dark:border-blue-500/20"
						/>
						<FeatureCard 
							icon={<Globe className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />}
							title="PDF to Website"
							desc="Instantly transform your static PDF resume into a stunning, fully responsive interactive website that impresses recruiters."
							bgClass="from-emerald-500/10 to-teal-500/10 border-emerald-200/50 dark:border-emerald-500/20"
						/>
						<FeatureCard 
							icon={<LayoutTemplate className="w-7 h-7 text-purple-600 dark:text-purple-400" />}
							title="Premium Templates"
							desc="Choose from dozens of professionally designed, customizable templates tailored for every industry and career level."
							bgClass="from-purple-500/10 to-pink-500/10 border-purple-200/50 dark:border-purple-500/20"
						/>
					</div>
				</div>
			</section>

			{/* How It Works Section */}
			<section className="relative z-10 py-32 px-6">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-24">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
							Build Your Dream Resume in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">3 Easy Steps</span>
						</h2>
						<p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
							We've streamlined the entire process so you can focus on what matters most: advancing your career.
						</p>
					</div>

					<div className="relative">
						{/* Connecting Line */}
						<div className="hidden md:block absolute top-[40%] left-[10%] w-[80%] h-1 bg-gradient-to-r from-blue-100 via-purple-200 to-emerald-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-emerald-900/30 -z-10"></div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10">
							<StepCard number="01" title="Select a Template" desc="Choose from our curated collection of professional templates designed to pass ATS systems." color="blue" />
							<StepCard number="02" title="Drop Your Details" desc="Enter your experience, skills, and education manually or seamlessly extract them via AI." color="purple" />
							<StepCard number="03" title="Download & Apply" desc="Export your beautiful new resume as a PDF or instantly deploy it as a personal web portfolio." color="emerald" />
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials Section */}
			<section className="relative z-10 py-24 px-6 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/50 dark:border-white/5">
				<div className="max-w-6xl mx-auto">
					<div className="text-center mb-20">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white tracking-tight">
							Loved by Professionals
						</h2>
						<p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
							Don't just take our word for it. Join thousands of users who have successfully landed their dream roles.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						<TestimonialCard 
							quote="I completely converted my old, boring PDF into a fully functioning portfolio website in seconds. I received 3 interview requests the next week!" 
							name="Sarah Jenkins" 
							role="Frontend Developer" 
						/>
						<TestimonialCard 
							quote="The AI recommendations re-wrote my bullet points and instantly made my resume sound like it was written by an industry executive." 
							name="Michael Chen" 
							role="Product Manager" 
						/>
						<TestimonialCard 
							quote="ResumeBuilderPro is incredibly easy to use. The modern themes are absolutely stunning and definitely help you stand out from the crowd." 
							name="Aisha Patel" 
							role="UX Designer" 
						/>
					</div>
				</div>
			</section>

			{/* Statistics Section */}
			<section className="relative z-10 py-24 px-6 border-b border-slate-200/50 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-sm">
				<div className="max-w-6xl mx-auto">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
						<StatItem value={`${stats.resumes > 10 ? stats.resumes + '+' : stats.resumes}`} label="Resumes Created" gradient="from-blue-500 to-indigo-500" visible={statsVisible} />
						<StatItem value={`${stats.users > 10 ? stats.users + '+' : stats.users}`} label="Registered Users" gradient="from-emerald-400 to-teal-500" visible={statsVisible} delay={100} />
						<StatItem value={`${stats.templates}+`} label="Pro Templates" gradient="from-purple-500 to-pink-500" visible={statsVisible} delay={200} />
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="relative z-10 py-32 px-6">
				<div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-900/60 dark:via-purple-900/60 dark:to-pink-900/60 rounded-[3rem] p-12 md:p-20 text-center shadow-2xl relative overflow-hidden border border-white/20 dark:border-white/10">
					{/* Glowing Orbs */}
					<div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
					<div className="absolute bottom-0 left-0 w-80 h-80 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
					
					<h2 className="text-4xl md:text-6xl font-black text-white mb-6 relative z-10 tracking-tight leading-tight">
						Ready to land your dream job?
					</h2>
					<p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto relative z-10">
						Join professionals worldwide who have successfully accelerated their careers using our next-generation builder. No credit card required.
					</p>
					
					<button
						onClick={() => navigate("/pages/ResumeBuilder")}
						className="relative z-10 group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-indigo-600 dark:text-purple-900 font-extrabold rounded-2xl text-xl shadow-[0_10px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgb(255,255,255,0.2)] hover:scale-105 transition-all duration-300"
					>
						Get Started for Free <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</section>

			{/* Footer */}
			<footer className="relative z-10 bg-white dark:bg-[#060913] border-t border-slate-200 dark:border-white/5 py-10 px-8 text-center">
				<div className="max-w-6xl mx-auto flex flex-col items-center">
					<div className="flex items-center gap-2 mb-6 opacity-80">
						<FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
						<span className="text-xl font-bold text-slate-900 dark:text-white">Resume Builder</span>
					</div>
					<p className="text-slate-500 dark:text-slate-400 mb-6">Empowering professionals to achieve their career goals beautifully.</p>
					<div className="text-slate-400 dark:text-slate-500 text-sm">
						© {new Date().getFullYear()} ResumeBuilderPro. All rights reserved.
					</div>
				</div>
			</footer>

			{/* Floating Chat Bot */}
			<div className="fixed bottom-8 right-8 z-[90]">
				<Link to="/home/chat-bot" className="relative group flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgb(0,0,0,0.2)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] border border-slate-200 dark:border-slate-700 hover:-translate-y-2 transition-all duration-300">
					<span className="text-3xl filter drop-shadow-sm group-hover:scale-110 transition-transform duration-300">🤖</span>
					{/* Tooltip */}
					<div className={`absolute bottom-full right-0 mb-4 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl shadow-xl whitespace-nowrap pointer-events-none transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
						Need help? 💬
						<div className="absolute top-full right-6 w-3 h-3 bg-slate-900 dark:bg-white rotate-45 -mt-1.5"></div>
					</div>
				</Link>
			</div>
		</div>
	);
}

function FeatureCard({ icon, title, desc, bgClass }: { icon: React.ReactNode, title: string, desc: string, bgClass: string }) {
	return (
		<div className={`group relative bg-white/60 dark:bg-white/5 backdrop-blur-xl border ${bgClass} rounded-3xl p-8 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]`}>
			<div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:rotate-6 transition-transform duration-300">
				{icon}
			</div>
			<h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
				{title}
			</h3>
			<p className="text-slate-600 dark:text-slate-400 leading-relaxed">
				{desc}
			</p>
		</div>
	);
}

function StatItem({ value, label, gradient, visible, delay = 0 }: { value: string, label: string, gradient: string, visible: boolean, delay?: number }) {
	return (
		<div className="group relative p-6" style={{ transitionDelay: `${delay}ms` }}>
			<div className={`transition-all duration-1000 transform ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
				<h3 className="text-5xl sm:text-7xl font-extrabold mb-3 tracking-tight">
					<span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent drop-shadow-sm`}>{value}</span>
				</h3>
				<p className="text-slate-600 dark:text-slate-400 text-lg font-bold tracking-widest uppercase">{label}</p>
			</div>
		</div>
	);
}

function StepCard({ number, title, desc, color }: { number: string, title: string, desc: string, color: 'blue'|'purple'|'emerald' }) {
	const colors = {
		blue: 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
		purple: 'text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
		emerald: 'text-emerald-500 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
	};

	return (
		<div className="relative flex flex-col items-center text-center group cursor-default">
			{/* Node Bubble */}
			<div className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-black mb-8 border-2 shadow-xl ${colors[color]} group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 z-10 bg-white dark:backdrop-blur-md`}>
				{number}
			</div>
			{/* Content */}
			<h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{title}</h3>
			<p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xs">{desc}</p>
		</div>
	);
}

function TestimonialCard({ quote, name, role }: { quote: string, name: string, role: string }) {
	return (
		<div className="bg-white dark:bg-slate-800/80 backdrop-blur-lg border border-slate-200 dark:border-slate-700 p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between">
			<div className="mb-8">
				{/* 5 Stars */}
				<div className="flex gap-1 mb-6">
					{[...Array(5)].map((_, i) => (
						<Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
					))}
				</div>
				<p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-medium">"{quote}"</p>
			</div>
			<div className="flex items-center gap-4">
				<div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
					{name.charAt(0)}
				</div>
				<div>
					<h4 className="font-bold text-slate-900 dark:text-white">{name}</h4>
					<p className="text-sm text-slate-500 dark:text-slate-400">{role}</p>
				</div>
			</div>
		</div>
	);
}

export default Home;
