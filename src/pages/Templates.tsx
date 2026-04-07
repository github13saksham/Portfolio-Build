import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/home/Navbar";
import { Search, LayoutTemplate, Star, ArrowRight, CheckCircle2, Monitor, Smartphone, Heart, Sparkles, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for our beautiful templates
const CATEGORIES = ["All", "Professional", "Creative", "Minimalist", "Developer", "Academic", "Finance", "Medical", "Dark"];

const TEMPLATES = [
	{
		id: "pro-exec",
		name: "Executive Pro",
		category: "Professional",
		price: "Free",
		rating: 4.9,
		reviews: 1240,
		image: "bg-slate-800",
		thumbnailStyle: "from-slate-800 to-slate-900 border-slate-700",
		badges: ["Best Seller", "ATS Friendly"],
		features: ["Clean Typography", "Timeline Layout", "Skill Graphs"],
		description: "A traditional, proven layout engineered to pass Applicant Tracking Systems with flying colors while retaining a sleek, modern edge.",
		path: "/pages/pdfbuilder?template=pro-exec"
	},
	{
		id: "neo-creative",
		name: "Neo Creative",
		category: "Creative",
		price: "Free",
		rating: 4.8,
		reviews: 856,
		image: "bg-purple-600",
		thumbnailStyle: "from-purple-500 to-indigo-600 border-purple-500",
		badges: ["New", "Web Portfolio"],
		features: ["Bold Colors", "Masonry Grid", "Dark Mode Ready"],
		description: "Stand out from the crowd with this daring, vibrant design. Perfect for designers, marketers, and creative technologists.",
		path: "/pages/ResumeBuilder?template=neo-creative"
	},
	{
		id: "clean-minimal",
		name: "Clean Minimal",
		category: "Minimalist",
		price: "Free",
		rating: 4.9,
		reviews: 2100,
		image: "bg-white",
		thumbnailStyle: "from-slate-50 to-slate-100 border-slate-200",
		badges: ["Most Popular"],
		features: ["Lots of Whitespace", "Single Column", "Elegant Serif"],
		description: "Let your experience speak for itself. A beautifully restrained design with perfect typographical hierarchy.",
		path: "/pages/pdfbuilder?template=clean-minimal"
	},
	{
		id: "dev-terminal",
		name: "Terminal Tech",
		category: "Developer",
		price: "Free",
		rating: 4.7,
		reviews: 432,
		image: "bg-[#0a0f1c]",
		thumbnailStyle: "from-emerald-900 to-[#0a0f1c] border-emerald-800",
		badges: ["For Devs"],
		features: ["Monospace Fonts", "Syntax Highlighting", "GitHub Stats"],
		description: "A hacker-inspired theme that formats your resume like a beautiful dark-mode terminal window.",
		path: "/pages/ResumeBuilder?template=dev-terminal"
	},
	{
		id: "academic-classic",
		name: "Oxford Scholar",
		category: "Academic",
		price: "Free",
		rating: 4.6,
		reviews: 320,
		image: "bg-blue-900",
		thumbnailStyle: "from-blue-800 to-slate-900 border-blue-700",
		badges: ["For CVs"],
		features: ["Multi-page Support", "Publication Links", "Classic Serif"],
		description: "Designed for comprehensive Curriculum Vitaes. Handles extensive publication lists and academic history beautifully.",
		path: "/pages/pdfbuilder?template=academic-classic"
	},
	{
		id: "startup-hustle",
		name: "Startup Hustle",
		category: "Creative",
		price: "Free",
		rating: 4.8,
		reviews: 671,
		image: "bg-orange-500",
		thumbnailStyle: "from-orange-400 to-red-500 border-orange-400",
		badges: [],
		features: ["Dynamic Layout", "Impact Metrics", "Vibrant"],
		description: "Fast, loud, and impactful. For the startup operator who wants to highlight their massive growth metrics.",
		path: "/pages/ResumeBuilder?template=startup-hustle"
	},
	{
		id: "finance-strict",
		name: "Wall Street",
		category: "Finance",
		price: "Free",
		rating: 4.8,
		reviews: 504,
		image: "bg-green-900",
		thumbnailStyle: "from-green-900 to-emerald-950 border-green-700",
		badges: ["ATS Friendly"],
		features: ["Serif Typography", "Conservative Layout", "High Contrast"],
		description: "Built for finance, banking, and consulting professionals. Authoritative, precise, and designed to convey trust.",
		path: "/pages/pdfbuilder?template=finance-strict"
	},
	{
		id: "design-studio",
		name: "Designer Studio",
		category: "Creative",
		price: "Free",
		rating: 4.7,
		reviews: 389,
		image: "bg-pink-500",
		thumbnailStyle: "from-pink-500 to-rose-600 border-pink-400",
		badges: ["New"],
		features: ["Gradient Header", "Bold Accents", "Portfolio Ready"],
		description: "A vibrant, energetic design for creative professionals. Perfect for designers, artists, and brand strategists.",
		path: "/pages/pdfbuilder?template=design-studio"
	},
	{
		id: "medical-clean",
		name: "Medical Clean",
		category: "Medical",
		price: "Free",
		rating: 4.6,
		reviews: 278,
		image: "bg-cyan-600",
		thumbnailStyle: "from-cyan-600 to-teal-700 border-cyan-500",
		badges: ["ATS Friendly"],
		features: ["Clean Structure", "Clinical Precision", "Easy to Read"],
		description: "Designed for healthcare, medical, and pharmaceutical professionals. Clean, structured, and highly professional.",
		path: "/pages/pdfbuilder?template=medical-clean"
	},
	{
		id: "legal-formal",
		name: "Legal Formal",
		category: "Professional",
		price: "Free",
		rating: 4.7,
		reviews: 195,
		image: "bg-gray-800",
		thumbnailStyle: "from-gray-700 to-gray-900 border-gray-600",
		badges: ["ATS Friendly"],
		features: ["Formal Typography", "Dense Layout", "Conservative Palette"],
		description: "Crafted specifically for legal, government, and policy professionals. Authoritative structure with a no-nonsense design.",
		path: "/pages/pdfbuilder?template=legal-formal"
	},
	{
		id: "royal-gold",
		name: "Royal Gold",
		category: "Professional",
		price: "Free",
		rating: 4.9,
		reviews: 412,
		image: "bg-amber-600",
		thumbnailStyle: "from-amber-500 to-yellow-600 border-amber-400",
		badges: ["Premium Look"],
		features: ["Gold Gradient Header", "Serif Fonts", "Luxury Feel"],
		description: "An opulent, prestigious design with gold accents. Make a commanding first impression for senior leadership roles.",
		path: "/pages/pdfbuilder?template=royal-gold"
	},
	{
		id: "ocean-breeze",
		name: "Ocean Breeze",
		category: "Creative",
		price: "Free",
		rating: 4.7,
		reviews: 334,
		image: "bg-sky-500",
		thumbnailStyle: "from-sky-500 to-blue-600 border-sky-400",
		badges: ["New"],
		features: ["Sky-Blue Gradient", "Clean Sans-Serif", "Modern Feel"],
		description: "A fresh, calming design with ocean-inspired blue tones. Great for educators, communications, and non-profit sectors.",
		path: "/pages/pdfbuilder?template=ocean-breeze"
	},
	{
		id: "midnight-dark",
		name: "Midnight Dark",
		category: "Dark",
		price: "Free",
		rating: 4.8,
		reviews: 567,
		image: "bg-[#1a1a2e]",
		thumbnailStyle: "from-[#1a1a2e] to-indigo-950 border-indigo-800",
		badges: ["Dark Mode"],
		features: ["Full Dark Theme", "Indigo Accents", "Modern & Sleek"],
		description: "A stunning full dark-mode resume for those who want to stand out. Perfect for tech, gaming, and digital media roles.",
		path: "/pages/pdfbuilder?template=midnight-dark"
	},
	{
		id: "ruby-red",
		name: "Ruby Red",
		category: "Professional",
		price: "Free",
		rating: 4.6,
		reviews: 221,
		image: "bg-red-700",
		thumbnailStyle: "from-red-600 to-rose-800 border-red-500",
		badges: [],
		features: ["Bold Red Header", "High Impact", "ATS Compliant"],
		description: "A powerful, bold design with deep red accents. For confident professionals who want to make a strong first impression.",
		path: "/pages/pdfbuilder?template=ruby-red"
	},
	{
		id: "nature-green",
		name: "Nature Green",
		category: "Creative",
		price: "Free",
		rating: 4.7,
		reviews: 298,
		image: "bg-emerald-600",
		thumbnailStyle: "from-emerald-500 to-teal-600 border-emerald-400",
		badges: ["New"],
		features: ["Emerald Gradient", "Eco-Inspired", "Modern Layout"],
		description: "A refreshing, nature-inspired design with emerald and teal tones. Ideal for sustainability, environmental, and wellness industries.",
		path: "/pages/pdfbuilder?template=nature-green"
	}
];

export default function TemplatesPage() {
	const navigate = useNavigate();
	const [activeCategory, setActiveCategory] = useState("All");
	const [searchQuery, setSearchQuery] = useState("");
	const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
	const [previewMode, setPreviewMode] = useState<string | null>(null);

	const filteredTemplates = TEMPLATES.filter(template => {
		const matchesCategory = activeCategory === "All" || template.category === activeCategory;
		const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
							  template.description.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] font-sans text-slate-900 dark:text-white transition-colors duration-500">
			{/* Ambient Glowing Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
				<div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
				<div className="absolute top-1/2 left-0 w-[35rem] h-[35rem] bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
			</div>
			
			<header className="relative z-50">
				<Navbar />
			</header>

			<main className="relative z-10 pt-32 px-6 pb-20 max-w-7xl mx-auto">
				
				{/* Header Section */}
				<motion.div 
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-md border border-blue-500/20 dark:border-blue-500/30 rounded-full text-sm font-semibold text-blue-700 dark:text-blue-300 mb-6 shadow-sm">
						<LayoutTemplate className="w-4 h-4" />
						<span>Theme Store</span>
					</div>
					<h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
						Find your <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">perfect look</span>
					</h1>
					<p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-medium mb-8">
						Explore our collection of premium, professionally designed resume templates. Whether you are building a PDF or a responsive web portfolio, we have a theme for you.
					</p>

					{/* AI ATS Call to Action */}
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up">
						<button 
							onClick={() => navigate('/home/chat-bot')}
							className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-bold shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.12)] hover:-translate-y-1 transition-all overflow-hidden flex items-center gap-3"
						>
							<div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
							<Bot className="w-5 h-5 relative z-10 group-hover:text-white transition-colors" />
							<span className="relative z-10 group-hover:text-white transition-colors">Ask AI Assistant</span>
						</button>
						<button
							onClick={() => navigate('/home/chat-bot')}
							className="px-8 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white rounded-2xl font-bold hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all flex items-center gap-3"
						>
							<Sparkles className="w-5 h-5 text-amber-500" />
							<span>Check ATS Score</span>
						</button>
					</div>

					{/* Search Bar */}
					<div className="mt-10 max-w-2xl mx-auto relative group">
						<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
							<Search className="w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
						</div>
						<input 
							type="text" 
							placeholder="Search themes by name, style, or profession..." 
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="w-full pl-12 pr-4 py-4 md:py-5 border-2 border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900/50 text-lg text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-lg shadow-slate-200/50 dark:shadow-none"
						/>
						<div className="absolute inset-y-0 right-2 flex items-center">
							<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 md:py-3 rounded-xl font-bold transition-colors">
								Search
							</button>
						</div>
					</div>
				</motion.div>

				{/* Category Navigation */}
				<div className="flex overflow-x-auto pb-4 mb-12 hide-scrollbar border-b border-slate-200 dark:border-slate-800">
					<div className="flex items-center gap-2 md:gap-4 mx-auto px-4">
						{CATEGORIES.map(category => (
							<button
								key={category}
								onClick={() => setActiveCategory(category)}
								className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
									activeCategory === category 
									? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md transform scale-105' 
									: 'bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{/* Templates Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
					<AnimatePresence>
						{filteredTemplates.map((template, idx) => (
							<motion.div
								key={template.id}
								layout
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.9 }}
								transition={{ duration: 0.4, delay: idx * 0.05 }}
								onHoverStart={() => setHoveredTemplate(template.id)}
								onHoverEnd={() => setHoveredTemplate(null)}
								className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgb(0,0,0,0.4)] transition-all duration-500 ease-out flex flex-col hover:-translate-y-2"
							>
								{/* Thumbnail Area */}
								<div className={`aspect-[4/3] w-full relative overflow-hidden bg-gradient-to-br ${template.thumbnailStyle} p-6 flex items-center justify-center`}>
									{/* Badges */}
									<div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
										{template.badges.map(badge => (
											<span key={badge} className="px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-800 dark:text-white shadow-sm border border-black/5 dark:border-white/10">
												{badge}
											</span>
										))}
									</div>

									{/* Abstract Preview blocks representing the template */}
									<div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-2xl relative overflow-hidden transform group-hover:scale-105 transition-transform duration-700 flex flex-col p-4">
										<div className="w-1/3 h-4 bg-white/30 rounded-full mb-4"></div>
										<div className="w-full h-2 bg-white/20 rounded-full mb-2"></div>
										<div className="w-5/6 h-2 bg-white/20 rounded-full mb-6"></div>
										
										<div className="mt-auto grid grid-cols-2 gap-4">
											<div className="h-16 bg-white/20 rounded-lg"></div>
											<div className="h-16 bg-white/20 rounded-lg"></div>
										</div>
									</div>

									{/* Hover Overlay Actions */}
									<div className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4 transition-opacity duration-300 z-30 ${hoveredTemplate === template.id ? 'opacity-100' : 'opacity-0'}`}>
										<button 
											onClick={() => navigate(template.path)}
											className="px-6 py-3 bg-white text-slate-900 rounded-xl font-bold hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
										>
											Use This Theme <ArrowRight className="w-5 h-5" />
										</button>
										<button 
											onClick={(e) => {
												e.stopPropagation();
												setPreviewMode(template.id);
											}}
											className="px-6 py-3 bg-white/20 text-white backdrop-blur-md border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-colors flex items-center gap-2"
										>
											<Eye className="w-5 h-5" /> Preview
										</button>
									</div>
								</div>

								{/* Content Area */}
								<div className="p-6 flex-grow flex flex-col">
									<div className="flex justify-between items-start mb-2">
										<div>
											<h3 className="text-xl font-bold text-slate-900 dark:text-white">{template.name}</h3>
											<p className="text-sm font-medium text-slate-500 dark:text-slate-400">{template.category}</p>
										</div>
										<div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
											<Star className="w-4 h-4 text-amber-500 fill-amber-500" />
											<span className="text-sm font-bold text-slate-700 dark:text-slate-300">{template.rating}</span>
										</div>
									</div>

									<p className="text-slate-600 dark:text-slate-300 text-sm mt-3 mb-6 line-clamp-3 leading-relaxed">
										{template.description}
									</p>

									{/* Features */}
									<div className="mt-auto mb-6">
										<p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3">Highlights</p>
										<div className="flex flex-wrap gap-2">
											{template.features.map(feature => (
												<span key={feature} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md text-xs font-semibold flex items-center gap-1">
													<CheckCircle2 className="w-3 h-3 text-emerald-500" /> {feature}
												</span>
											))}
										</div>
									</div>

									{/* Footer */}
									<div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center mt-auto">
										<span className="font-bold text-lg text-slate-900 dark:text-white">{template.price}</span>
										<div className="flex items-center gap-4 text-slate-400">
											<div className="flex gap-1" title="Responsive Design">
												<Monitor className="w-4 h-4" />
												<Smartphone className="w-4 h-4" />
											</div>
											<span className="text-xs font-bold">{template.reviews} reviews</span>
										</div>
									</div>
								</div>
							</motion.div>
						))}
					</AnimatePresence>
				</div>

				{filteredTemplates.length === 0 && (
					<div className="text-center py-20">
						<div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
							<Search className="w-10 h-10 text-slate-400" />
						</div>
						<h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No themes found</h3>
						<p className="text-slate-500 dark:text-slate-400">Try adjusting your search or category filters.</p>
						<button 
							onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
							className="mt-6 px-6 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl font-bold hover:bg-blue-200 dark:hover:bg-blue-800/40 transition-colors"
						>
							Clear Filters
						</button>
					</div>
				)}

				{/* Banner CTA */}
				<div className="mt-24 p-10 md:p-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-[3rem] text-center text-white relative overflow-hidden shadow-2xl">
					<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
					<div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
					
					<div className="relative z-10 max-w-2xl mx-auto">
						<Heart className="w-12 h-12 text-pink-300 mx-auto mb-6" />
						<h2 className="text-4xl md:text-5xl font-extrabold mb-6">Can't decide?</h2>
						<p className="text-lg md:text-xl text-purple-100 mb-8 font-medium">
							Start with our most popular template and easily switch your design later without losing any of your content.
						</p>
						<button 
							onClick={() => navigate('/pages/pdfbuilder?template=clean-minimal')}
							className="px-8 py-4 bg-white text-purple-600 rounded-xl font-extrabold text-lg hover:shadow-[0_8px_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all flex items-center gap-2 mx-auto"
						>
							Start Building Now <ArrowRight className="w-6 h-6" />
						</button>
					</div>
				</div>

			</main>

			<AnimatePresence>
				{previewMode && (
					<PreviewModal 
						template={TEMPLATES.find(t => t.id === previewMode)!} 
						onClose={() => setPreviewMode(null)} 
						onUse={() => navigate(TEMPLATES.find(t => t.id === previewMode)!.path)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}

// Temporary eye icon (import usually from lucide-react but missed it up top)
function Eye({className}: {className?: string}) {
	return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>;
}

// Preview Modal Component
function PreviewModal({ template, onClose, onUse }: { template: any, onClose: () => void, onUse: () => void }) {
	return (
		<motion.div 
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
		>
			<div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={onClose}></div>
			
			<motion.div 
				initial={{ scale: 0.95, opacity: 0, y: 20 }}
				animate={{ scale: 1, opacity: 1, y: 0 }}
				exit={{ scale: 0.95, opacity: 0, y: 20 }}
				className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
			>
				{/* Modal Header */}
				<div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md z-10 sticky top-0">
					<div>
						<h2 className="text-2xl font-bold text-slate-900 dark:text-white">{template.name} Theme</h2>
						<p className="text-slate-500 dark:text-slate-400 font-medium">Live Preview Demo</p>
					</div>
					<div className="flex items-center gap-4">
						<button 
							onClick={onUse}
							className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-500/20 hidden sm:block"
						>
							Use Theme
						</button>
						<button 
							onClick={onClose}
							className="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full flex items-center justify-center transition-colors"
						>
							<span className="sr-only">Close</span>
							<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
						</button>
					</div>
				</div>

				{/* Modal Scrollable Content - The Live Preview */}
				<div className="flex-grow overflow-y-auto p-8 bg-slate-50 dark:bg-[#0a0f1c]">
					<TemplatePreview template={template} />
				</div>

				{/* Mobile Use button pinned to bottom */}
				<div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 sm:hidden">
					<button 
						onClick={onUse}
						className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg"
					>
						Use This Theme
					</button>
				</div>
			</motion.div>
		</motion.div>
	);
}

// Unique per-template preview component
function TemplatePreview({ template }: { template: any }) {
	const id = template.id;

	if (id === 'dev-terminal') return (
		<div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-[#0d1117] text-gray-300 p-8 font-mono border border-gray-700 min-h-[60vh]">
			<div className="flex justify-between items-start border-b border-gray-700 pb-6 mb-6">
				<div><h1 className="text-3xl font-bold text-emerald-400 mb-1">&gt; alex_dev_</h1><p className="text-gray-400">Full Stack Engineer | React & Node.js</p></div>
				<div className="text-right text-sm text-gray-500"><p>alex@terminal.dev</p><p>github.com/alexdev</p></div>
			</div>
			<h2 className="text-emerald-400 font-bold mb-3 border-b border-gray-800 pb-1"># Experience</h2>
			<p className="text-blue-400 mb-1">Senior Engineer @ TechCorp <span className="text-gray-600 float-right">2021–Present</span></p>
			<ul className="list-none ml-2 space-y-1 text-sm mb-6"><li><span className="text-emerald-600">~</span> Architected microservices reducing latency by 40%.</li><li><span className="text-emerald-600">~</span> Led migration of monolith to containerized Docker/K8s.</li></ul>
			<h2 className="text-emerald-400 font-bold mb-3 border-b border-gray-800 pb-1"># Skills</h2>
			<pre className="bg-black/40 p-3 rounded text-xs">{`{ "langs": ["TypeScript","Python"], "tools": ["Docker","AWS","Redis"] }`}</pre>
		</div>
	);

	if (id === 'midnight-dark') return (
		<div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-[#1a1a2e] text-gray-200 min-h-[60vh]">
			<div className="bg-[#16213e] px-10 py-8 border-b border-indigo-900">
				<h1 className="text-4xl font-bold text-indigo-300 mb-1">Alex Midnight</h1>
				<p className="text-indigo-400 font-medium">Senior Product Manager</p>
				<div className="flex gap-4 text-xs text-indigo-500 mt-3"><span>alex@midnight.io</span><span>•</span><span>New York, NY</span></div>
			</div>
			<div className="p-10 space-y-6">
				<div><h2 className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-2 border-b border-indigo-900 pb-1">Summary</h2><p className="text-gray-400 text-sm leading-relaxed">Visionary product leader with 8+ years building digital products from 0 to 1. Obsessed with data-driven decisions and elegant user experiences.</p></div>
				<div><h2 className="text-indigo-400 font-bold uppercase tracking-widest text-sm mb-3 border-b border-indigo-900 pb-1">Experience</h2>
					<p className="font-bold text-white">Head of Product <span className="text-indigo-500 font-normal float-right text-sm">2020–Present</span></p>
					<p className="text-indigo-400 text-sm italic mb-2">DarkLabs Inc.</p>
					<ul className="list-disc ml-4 text-sm text-gray-400 space-y-1"><li>Shipped 12 major features, driving 3x revenue growth.</li><li>Built and mentored a team of 8 PMs across 3 timezones.</li></ul>
				</div>
			</div>
		</div>
	);

	if (id === 'finance-strict') return (
		<div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white min-h-[60vh] font-serif">
			<div className="bg-green-900 px-10 py-8 text-white text-center">
				<h1 className="text-4xl font-bold tracking-tight mb-1">ALEXANDER MORGAN</h1>
				<p className="text-green-200 font-medium tracking-widest text-sm uppercase">Investment Banking Associate</p>
				<div className="flex justify-center gap-6 text-xs text-green-300 mt-3"><span>a.morgan@wallst.com</span><span>•</span><span>New York, NY</span><span>•</span><span>(212) 555-0190</span></div>
			</div>
			<div className="p-10 space-y-6">
				<div><h2 className="text-green-900 font-bold uppercase tracking-widest text-sm mb-2 border-b-2 border-green-900 pb-1">Professional Summary</h2><p className="text-gray-700 text-sm leading-relaxed">CFA charterholder with 6 years at bulge-bracket firms specializing in M&A advisory and leveraged buyouts with deal values exceeding $2B.</p></div>
				<div><h2 className="text-green-900 font-bold uppercase tracking-widest text-sm mb-3 border-b-2 border-green-900 pb-1">Experience</h2>
					<div className="flex justify-between"><span className="font-bold text-gray-900">VP, M&A Advisory</span><span className="text-sm text-gray-500">2021–Present</span></div>
					<p className="text-gray-600 italic text-sm mb-2">Goldman Sachs Group, Inc.</p>
					<ul className="list-disc ml-4 text-sm text-gray-700 space-y-1"><li>Led execution of 14 cross-border transactions totaling $4.2B.</li><li>Managed client relationships with Fortune 500 CEOs.</li></ul>
				</div>
			</div>
		</div>
	);

	if (id === 'medical-clean') return (
		<div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white min-h-[60vh]">
			<div className="bg-cyan-700 px-10 py-8 text-white">
				<h1 className="text-4xl font-bold mb-1">Dr. Sarah Chen, MD</h1>
				<p className="text-cyan-200 font-medium">Board-Certified Internal Medicine Physician</p>
				<div className="flex gap-4 text-xs text-cyan-300 mt-3"><span>s.chen@medcenter.org</span><span>•</span><span>Boston, MA</span><span>•</span><span>NPI: 1234567890</span></div>
			</div>
			<div className="p-10 space-y-6">
				<div><h2 className="text-cyan-700 font-bold uppercase tracking-widest text-sm mb-2 border-b-2 border-cyan-200 pb-1">Professional Summary</h2><p className="text-gray-600 text-sm leading-relaxed">Dedicated physician with 10+ years in acute care and outpatient settings. Committed to evidence-based medicine and compassionate patient-centered care.</p></div>
				<div><h2 className="text-cyan-700 font-bold uppercase tracking-widest text-sm mb-3 border-b-2 border-cyan-200 pb-1">Clinical Experience</h2>
					<div className="flex justify-between"><span className="font-bold text-gray-900">Attending Physician</span><span className="text-sm text-gray-500">2018–Present</span></div>
					<p className="text-gray-600 italic text-sm mb-2">Massachusetts General Hospital</p>
					<ul className="list-disc ml-4 text-sm text-gray-700 space-y-1"><li>Manage complex inpatient cases averaging 20 patients/day.</li><li>Reduced readmission rates by 18% through protocol improvements.</li></ul>
				</div>
			</div>
		</div>
	);

	if (id === 'royal-gold') return (
		<div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white min-h-[60vh] font-serif">
			<div className="bg-gradient-to-r from-amber-600 to-yellow-500 px-10 py-8 text-white text-center">
				<h1 className="text-4xl font-bold tracking-tight mb-1">Victoria Harrington</h1>
				<p className="text-amber-100 tracking-widest text-sm uppercase font-medium">Chief Executive Officer</p>
				<div className="flex justify-center gap-6 text-xs text-amber-200 mt-3"><span>v.harrington@corp.com</span><span>•</span><span>London, UK</span></div>
			</div>
			<div className="p-10 space-y-6">
				<div><h2 className="text-amber-700 font-bold uppercase tracking-widest text-sm mb-2 border-b-2 border-amber-300 pb-1">Executive Profile</h2><p className="text-gray-700 text-sm leading-relaxed">Transformational leader with 20+ years driving global enterprise growth. P&L ownership exceeding $500M across FTSE 100 organizations.</p></div>
				<div><h2 className="text-amber-700 font-bold uppercase tracking-widest text-sm mb-3 border-b-2 border-amber-300 pb-1">Leadership Experience</h2>
					<div className="flex justify-between"><span className="font-bold text-gray-900">CEO & Board Director</span><span className="text-sm text-gray-500">2019–Present</span></div>
					<p className="text-gray-600 italic text-sm mb-2">Harrington Global Ventures</p>
					<ul className="list-disc ml-4 text-sm text-gray-700 space-y-1"><li>Scaled company from £50M to £280M revenue in 4 years.</li><li>Led successful acquisition of 3 European competitors.</li></ul>
				</div>
			</div>
		</div>
	);

	if (id === 'design-studio') return (
		<div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white min-h-[60vh]">
			<div className="bg-gradient-to-r from-pink-500 to-rose-600 px-10 py-8 text-white">
				<h1 className="text-4xl font-bold mb-1">Jordan Kim</h1>
				<p className="text-pink-100 font-medium">Senior Brand Designer & Creative Director</p>
				<div className="flex gap-4 text-xs text-pink-200 mt-3"><span>jordan@studio.design</span><span>•</span><span>Los Angeles, CA</span></div>
			</div>
			<div className="p-10 space-y-6">
				<div><h2 className="text-pink-600 font-bold uppercase tracking-widest text-sm mb-2 border-b-2 border-pink-200 pb-1">About</h2><p className="text-gray-600 text-sm leading-relaxed">Award-winning designer with 8 years crafting iconic brand identities for Fortune 500 companies and global startups.</p></div>
				<div><h2 className="text-pink-600 font-bold uppercase tracking-widest text-sm mb-3 border-b-2 border-pink-200 pb-1">Experience</h2>
					<div className="flex justify-between"><span className="font-bold text-gray-900">Creative Director</span><span className="text-sm text-gray-400">2020–Present</span></div>
					<p className="text-pink-500 italic text-sm mb-2">Studio Vivid™</p>
					<ul className="list-disc ml-4 text-sm text-gray-600 space-y-1"><li>Rebranded 30+ companies, increasing brand equity by avg. 45%.</li><li>Led a team of 12 designers across 4 continents.</li></ul>
				</div>
			</div>
		</div>
	);

	if (id === 'legal-formal') return (
		<div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white min-h-[60vh] font-serif">
			<div className="bg-gray-800 px-10 py-8 text-white text-center">
				<h1 className="text-4xl font-bold tracking-tight mb-1">JAMES R. WHITMORE</h1>
				<p className="text-gray-300 tracking-widest text-sm uppercase">Attorney at Law | Corporate Litigation</p>
				<div className="flex justify-center gap-6 text-xs text-gray-400 mt-3"><span>j.whitmore@lawgroup.com</span><span>•</span><span>Washington D.C.</span><span>•</span><span>Bar No. 456789</span></div>
			</div>
			<div className="p-10 space-y-6">
				<div><h2 className="text-gray-800 font-bold uppercase tracking-widest text-sm mb-2 border-b-2 border-gray-300 pb-1">Professional Summary</h2><p className="text-gray-600 text-sm leading-relaxed">Accomplished litigator with 15 years specializing in corporate law, securities regulation, and complex commercial disputes before federal courts.</p></div>
				<div><h2 className="text-gray-800 font-bold uppercase tracking-widest text-sm mb-3 border-b-2 border-gray-300 pb-1">Professional Experience</h2>
					<div className="flex justify-between"><span className="font-bold text-gray-900">Partner, Corporate Litigation</span><span className="text-sm text-gray-500">2015–Present</span></div>
					<p className="text-gray-500 italic text-sm mb-2">Whitmore, Holden & Associates LLP</p>
					<ul className="list-disc ml-4 text-sm text-gray-700 space-y-1"><li>Successfully defended clients in 95% of contested matters.</li><li>Negotiated settlements exceeding $800M in aggregate value.</li></ul>
				</div>
			</div>
		</div>
	);

	// Generic fallback for remaining templates (ocean-breeze, ruby-red, nature-green, academic-classic, startup-hustle, clean-minimal, neo-creative, pro-exec)
	const headerColors: Record<string, string> = {
		'ocean-breeze': 'bg-gradient-to-r from-sky-500 to-blue-600',
		'ruby-red': 'bg-red-700',
		'nature-green': 'bg-gradient-to-r from-emerald-500 to-teal-600',
		'academic-classic': 'bg-blue-900',
		'startup-hustle': 'bg-orange-600',
		'clean-minimal': 'bg-white border-b-2 border-gray-200',
		'neo-creative': 'bg-purple-700',
		'pro-exec': 'bg-slate-800',
	};
	const accentColors: Record<string, string> = {
		'ocean-breeze': 'text-sky-600 border-sky-400',
		'ruby-red': 'text-red-700 border-red-400',
		'nature-green': 'text-emerald-700 border-emerald-400',
		'academic-classic': 'text-blue-900 border-blue-700',
		'startup-hustle': 'text-orange-600 border-orange-400',
		'clean-minimal': 'text-gray-900 border-gray-400',
		'neo-creative': 'text-purple-700 border-purple-400',
		'pro-exec': 'text-slate-800 border-slate-600',
	};
	const headerText = id === 'clean-minimal' ? 'text-gray-900' : 'text-white';
	const header = headerColors[id] || 'bg-slate-700';
	const accent = accentColors[id] || 'text-slate-700 border-slate-400';
	return (
		<div className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-2xl bg-white min-h-[60vh]">
			<div className={`${header} px-10 py-8 ${headerText} text-center`}>
				<h1 className="text-4xl font-bold mb-1">{template.name} Preview</h1>
				<p className="opacity-80 font-medium">{template.features[0]} · {template.features[1]}</p>
				<div className="flex justify-center gap-4 text-xs opacity-70 mt-3"><span>alex@example.com</span><span>•</span><span>New York, NY</span><span>•</span><span>(555) 123-4567</span></div>
			</div>
			<div className="p-10 space-y-6">
				<div><h2 className={`font-bold uppercase tracking-widest text-sm mb-2 border-b-2 pb-1 ${accent}`}>Professional Summary</h2><p className="text-gray-600 text-sm leading-relaxed">{template.description}</p></div>
				<div><h2 className={`font-bold uppercase tracking-widest text-sm mb-3 border-b-2 pb-1 ${accent}`}>Experience</h2>
					<div className="flex justify-between mb-1"><span className="font-bold text-gray-900">Senior Manager</span><span className="text-sm text-gray-400">2020–Present</span></div>
					<p className="text-gray-500 italic text-sm mb-2">Acme Corporation</p>
					<ul className="list-disc ml-4 text-sm text-gray-600 space-y-1"><li>Led cross-functional team of 15 delivering $2M project on time.</li><li>Improved process efficiency by 32% through system redesign.</li></ul>
				</div>
				<div><h2 className={`font-bold uppercase tracking-widest text-sm mb-3 border-b-2 pb-1 ${accent}`}>Skills</h2>
					<div className="flex flex-wrap gap-2">{template.features.map((f: string) => <span key={f} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-semibold">{f}</span>)}</div>
				</div>
			</div>
		</div>
	);
}
