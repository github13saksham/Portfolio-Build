import { useState, useEffect } from "react";
import type { Resume } from "../../../types/Resume";
import ResumeForm from "../../../components/ui/ResumeForm";
import ResumePreview from "../../../components/Resume-Preview/ResumePreview";
import { FileText, Edit, Sparkles, Download, Eye, Globe, LayoutTemplate, CheckCircle2 } from "lucide-react";
import Navbar from "@/home/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
const TEMPLATES = [
	{ id: 'pro-exec', name: 'Executive Pro', color: 'bg-slate-800' },
	{ id: 'neo-creative', name: 'Neo Creative', color: 'bg-purple-600' },
	{ id: 'clean-minimal', name: 'Clean Minimal', color: 'bg-white border border-gray-300' },
	{ id: 'dev-terminal', name: 'Terminal Tech', color: 'bg-[#0a0f1c]' },
	{ id: 'academic-classic', name: 'Oxford Scholar', color: 'bg-blue-900' },
	{ id: 'startup-hustle', name: 'Startup Hustle', color: 'bg-orange-500' },
	{ id: 'finance-strict', name: 'Wall Street', color: 'bg-green-900' },
	{ id: 'design-studio', name: 'Designer Studio', color: 'bg-pink-500' },
	{ id: 'medical-clean', name: 'Medical Clean', color: 'bg-cyan-600' },
	{ id: 'legal-formal', name: 'Legal Formal', color: 'bg-gray-800' },
	{ id: 'royal-gold', name: 'Royal Gold', color: 'bg-amber-600' },
	{ id: 'ocean-breeze', name: 'Ocean Breeze', color: 'bg-sky-500' },
	{ id: 'midnight-dark', name: 'Midnight Dark', color: 'bg-[#1a1a2e]' },
	{ id: 'ruby-red', name: 'Ruby Red', color: 'bg-red-700' },
	{ id: 'nature-green', name: 'Nature Green', color: 'bg-emerald-600' },
];

export default function BuildResumePage() {
	const location = useLocation();
	const [resume, setResume] = useState<Resume | null>(null);
	const [selectedTemplate, setSelectedTemplate] = useState('pro-exec');
	const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
	const [isGenerating, setIsGenerating] = useState(false);

	const generatePDF = async () => {
		if (!resume) return;
		setIsGenerating(true);
		
		setTimeout(async () => {
			const element = document.getElementById('resume-preview-container-website');
			if (!element) {
				setIsGenerating(false);
				return;
			}
			try {
				const style = document.createElement('style');
				style.innerHTML = `
					#resume-preview-container-website * {
						color-interpolation-filters: sRGB !important;
						--tw-ring-color: rgba(59, 130, 246, 0.5) !important;
						--tw-ring-offset-shadow: 0 0 #0000 !important;
						--tw-ring-shadow: 0 0 #0000 !important;
						--tw-shadow: 0 0 #0000 !important;
						--tw-shadow-colored: 0 0 #0000 !important;
					}
				`;
				document.head.appendChild(style);

				const canvas = await html2canvas(element, { 
					scale: 2, 
					useCORS: true,
					logging: false,
					ignoreElements: (el) => el.classList.contains('no-print')
				});
				
				document.head.removeChild(style);

				const imgData = canvas.toDataURL('image/jpeg', 1.0);
				const pdf = new jsPDF({
					orientation: 'portrait',
					unit: 'px',
					format: [canvas.width, canvas.height] 
				});
				pdf.addImage(imgData, 'JPEG', 0, 0, canvas.width, canvas.height);
				const safeName = resume?.name ? resume.name.replace(/\s+/g, '_') : 'My';
				pdf.save(`${safeName}_Resume.pdf`);
				// Track download
				if (resume.id && String(resume.id).length > 10) {
					axios.post(`http://localhost:5000/api/resumes/${resume.id}/download`, {}, { withCredentials: true }).catch(console.error);
				}
			} catch (err) {
				console.error('PDF generation failed', err);
			}
			setIsGenerating(false);
		}, 100);
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const templateParam = params.get('template');
		if (templateParam) {
			setSelectedTemplate(templateParam);
		}
	}, [location]);

	return (
		<div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] font-sans transition-colors duration-500 overflow-hidden relative">
			{/* Ambient Glowing Background Elements */}
			<div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
				<div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
				<div className="absolute top-40 -right-20 w-[35rem] h-[35rem] bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse style={{ animationDelay: '2s' }}"></div>
				<div className="absolute -bottom-40 left-1/4 w-[45rem] h-[45rem] bg-blue-300/20 dark:bg-blue-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse style={{ animationDelay: '4s' }}"></div>
			</div>
			
			<header className="relative z-50">
				<Navbar />
			</header>
			
			<div className="relative z-10 pt-32 px-6 pb-20 max-w-7xl mx-auto">
				
				{/* Header Section */}
				<motion.div 
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-16"
				>
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200/50 dark:border-white/10 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 mb-6 shadow-sm">
						<Globe className="w-4 h-4 text-indigo-500" />
						<span>Interactive Web Builder</span>
					</div>
					<h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900 dark:text-white">
						Build Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Online Resume</span>
					</h1>
					<p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium">
						Create a stunning, fully responsive online resume website that showcases your professional journey in a beautiful way.
					</p>
				</motion.div>

				{!resume ? (
					/* Builder UI - Before Save */
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
						{/* Left Column: Form & Settings (8 cols) */}
						<motion.div 
							initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
							className="lg:col-span-8 space-y-8"
						>
							{/* Template Selection */}
							<div className="bg-white/60 dark:bg-[#111827]/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 shadow-sm">
								<div className="flex items-center gap-3 mb-6">
									<LayoutTemplate className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
									<h2 className="text-2xl font-bold text-slate-900 dark:text-white">Select Web Theme</h2>
								</div>
								<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
									{TEMPLATES.map(temp => (
										<button 
											key={temp.id}
											onClick={() => setSelectedTemplate(temp.id)}
											className={`relative p-4 rounded-2xl border ${selectedTemplate === temp.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'} transition-all duration-300 hover:shadow-md outline-none focus:ring-2 focus:ring-indigo-500/50 text-left group`}
										>
											<div className={`w-8 h-8 rounded-full ${temp.color} mb-3 shadow-inner group-hover:scale-110 transition-transform`}></div>
											<p className={`font-bold ${selectedTemplate === temp.id ? 'text-indigo-700 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>{temp.name}</p>
											{selectedTemplate === temp.id && (
												<div className="absolute top-4 right-4 text-indigo-500">
													<CheckCircle2 className="w-5 h-5" />
												</div>
											)}
										</button>
									))}
								</div>
							</div>

							{/* Form Box wrapped around existing Form component to give it glassmorphism */}
							<div className="bg-white/60 dark:bg-[#111827]/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl shadow-sm overflow-hidden flex flex-col">
								<div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-8 text-white relative overflow-hidden">
									<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
									<div className="relative z-10">
										<div className="flex items-center gap-4 mb-2">
											<div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-inner">
												<FileText className="w-6 h-6" />
											</div>
											<div>
												<h2 className="text-2xl font-bold tracking-tight">Content Editor</h2>
												<p className="font-medium text-indigo-100">Fill in your data</p>
											</div>
										</div>
									</div>
								</div>

								{/* The custom injected ResumeForm component goes here with its own transparent styles */}
								<div className="p-8 [&_input]:bg-white/50 dark:[&_input]:bg-slate-900/50 [&_input]:border-slate-200 dark:[&_input]:border-slate-700 [&_textarea]:bg-white/50 dark:[&_textarea]:bg-slate-900/50 [&_textarea]:border-slate-200 dark:[&_textarea]:border-slate-700 [&_.bg-white]:bg-transparent dark:[&_.bg-gray-800]:bg-transparent [&_.shadow-md]:shadow-none [&_.border]:border-none [&_input]:rounded-xl [&_textarea]:rounded-xl [&_.rounded-lg]:rounded-2xl [&_input:focus]:ring-indigo-500 [&_textarea:focus]:ring-indigo-500">
									<ResumeForm onSave={setResume} />
								</div>
							</div>
						</motion.div>

						{/* Right Column: Tips (4 cols) */}
						<motion.div 
							initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
							className="lg:col-span-4"
						>
							<div className="sticky top-32 space-y-6">
								{/* Features Card */}
								<div className="bg-white/60 dark:bg-[#111827]/60 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]">
									<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Why a Web Resume?</h3>
									
									<ul className="space-y-5">
										<li className="flex items-start gap-4">
											<div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center shrink-0 shadow-inner">
												<Globe className="w-5 h-5" />
											</div>
											<div>
												<p className="font-bold text-slate-900 dark:text-white">Accessible Anywhere</p>
												<p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Share your custom URL instantly without heavy attachments.</p>
											</div>
										</li>
										<li className="flex items-start gap-4">
											<div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center shrink-0 shadow-inner">
												<Eye className="w-5 h-5" />
											</div>
											<div>
												<p className="font-bold text-slate-900 dark:text-white">Perfect on Mobile</p>
												<p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Responsive layouts ensure recruiters can read it easily on any device.</p>
											</div>
										</li>
										<li className="flex items-start gap-4">
											<div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center shrink-0 shadow-inner">
												<Sparkles className="w-5 h-5" />
											</div>
											<div>
												<p className="font-bold text-slate-900 dark:text-white">Interactive Elements</p>
												<p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Add clickable links to your portfolio projects and GitHub.</p>
											</div>
										</li>
									</ul>
								</div>
							</div>
						</motion.div>
					</div>
				) : (

					/* Results/Preview View - After Save */
					<motion.div 
						initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
						className="max-w-6xl mx-auto"
					>
						{/* Success Message Banner */}
						<div className="flex flex-col sm:flex-row items-center justify-between bg-emerald-500/10 dark:bg-emerald-900/20 border border-emerald-500/20 rounded-2xl p-6 mb-8 gap-4">
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
									<CheckCircle2 className="w-6 h-6 text-white" />
								</div>
								<div>
									<h4 className="text-xl font-bold text-emerald-800 dark:text-emerald-400">Web Resume Generated!</h4>
									<p className="text-emerald-600 dark:text-emerald-300 font-medium">Your data was saved and compiled successfully.</p>
								</div>
							</div>
							
							{/* Toggle Tabs */}
							<div className="flex bg-white/50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-slate-200/50 dark:border-white/5">
								<button 
									onClick={() => setActiveTab('preview')}
									className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'preview' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
								>
									Live Preview
								</button>
								<button 
									onClick={() => setActiveTab('editor')}
									className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === 'editor' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
								>
									Actions & Export
								</button>
							</div>
						</div>

						{/* Content Area */}
						<AnimatePresence mode="wait">
							{activeTab === 'preview' ? (
								<motion.div key="preview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
									<div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-900/5">
										{/* Browser Toolbar fake */}
										<div className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
											<div className="flex items-center gap-2 shrink-0">
												<div className="w-3.5 h-3.5 rounded-full bg-red-400"></div>
												<div className="w-3.5 h-3.5 rounded-full bg-amber-400"></div>
												<div className="w-3.5 h-3.5 rounded-full bg-emerald-400"></div>
											</div>
											<div className="flex-grow flex justify-center w-full max-w-xl">
												<div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-1.5 flex items-center justify-between gap-2 w-full shadow-inner">
													<div className="flex items-center gap-2 overflow-hidden">
														<Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
														<span className="text-sm font-medium text-slate-600 dark:text-slate-300 truncate">portfoliopro.app/u/{resume.name.replace(/\s+/g, '-').toLowerCase()}</span>
													</div>
													<div className="text-[10px] font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded shrink-0">
														{TEMPLATES.find(t => t.id === selectedTemplate)?.name}
													</div>
												</div>
											</div>
											<div className="w-16 shrink-0 hidden sm:block"></div> {/* Spacer for centering */}
										</div>
										<div className="p-8 md:p-12 min-h-[60vh] bg-slate-50 dark:bg-slate-900">
											<ResumePreview resume={resume} onEdit={() => setResume(null)} template={selectedTemplate} />
										</div>
									</div>
								</motion.div>
							) : (
								<motion.div key="editor" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
										
										{/* Share Card */}
										<div className="bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 shadow-sm text-center group">
											<div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
												<Globe className="w-8 h-8 text-white" />
											</div>
											<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Deploy & Share</h3>
											<p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">Publish this URL so recruiters can view your resume instantly online.</p>
											<button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold flex flex-col items-center justify-center gap-1 hover:shadow-lg transition-shadow">
												<span>Publish Website</span>
												<span className="text-xs text-indigo-200 font-medium">Free hosting included</span>
											</button>
										</div>

										{/* Export Card */}
										<div className="bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 shadow-sm text-center group">
											<div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
												<Download className="w-8 h-8 text-white" />
											</div>
											<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Export to PDF</h3>
											<p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">Need a hard copy for ATS scanners? Generate a matched PDF version.</p>
											<button 
												onClick={generatePDF} 
												disabled={isGenerating}
												className="w-full py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
											>
												<FileText className="w-5 h-5" />
												<span>{isGenerating ? 'Generating...' : 'Save as PDF'}</span>
											</button>
										</div>

										{/* Edit Card */}
										<div className="bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-8 shadow-sm text-center group">
											<div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:-translate-y-2 transition-transform duration-300">
												<Edit className="w-8 h-8 text-white" />
											</div>
											<h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Edit Details</h3>
											<p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-8">Found a typo or need to add a new job? Jump right back into the editor.</p>
											<button 
												onClick={() => setResume(null)}
												className="w-full py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
											>
												<Edit className="w-5 h-5" />
												<span>Edit Content</span>
											</button>
										</div>

									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				)}

			</div>
			
			{/* Hidden element for PDF capture */}
			{resume && (
				<div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none w-[1024px] overflow-hidden">
					<div id="resume-preview-container-website" className="bg-white">
						<ResumePreview resume={resume} onEdit={() => {}} template={selectedTemplate} />
					</div>
				</div>
			)}
		</div>
	);
}
