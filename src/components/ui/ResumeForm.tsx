import { useState } from "react";
import type { Resume } from "../../types/Resume";
import { User, Globe, Github, Linkedin, Image, Plus, Trash2, Save, Briefcase, GraduationCap, Code, Languages, Palette, Sparkles } from "lucide-react";
import { callGemini, GeminiApiError } from "../../utils/gemini";

interface Props {
	onSave: (resume: Resume) => void;
}

export default function ResumeForm({ onSave }: Props) {
	const [resume, setResume] = useState<Resume>({
		id: Date.now(),
		name: "",
		bio: "",
		about: "",
		email: "",
		phone: "",
		address: "",
		linkedin: "",
		github: "",
		profilePic: "",
		skills: [],
		languages: [],
		education: [],
		workExperience: [],
		projects: [],
		websiteTheme: "light",
	});
	
	const [isGeneratingAI, setIsGeneratingAI] = useState(false);

	const generateSummaryWithAI = async () => {
		const jobTitle = resume.name ? resume.name + " (" + resume.bio + ")" : resume.bio;
		if (!jobTitle?.trim()) {
			alert('Please enter your Name and Professional Bio/Title first.');
			return;
		}
		
		setIsGeneratingAI(true);
		try {
			const prompt = `Write an extremely professional, impressive, and concise resume summary (3-4 sentences max) for ${jobTitle}. Do not use any markdown formatting or introductory text. Just provide the raw paragraph.`;
			const text = await callGemini(prompt);
			if (text) handleChange('about', text);
		} catch (e: any) {
			console.error("AI Generation error:", e);
			if (e instanceof GeminiApiError && e.isQuotaError) {
				alert("🚨 API Quota Exhausted! Click the ⚙️ button in the bottom-right corner to enter a new API key.");
			} else {
				alert(e.message || "Failed to generate AI text. Click ⚙️ to check your API key.");
			}
		} finally {
			setIsGeneratingAI(false);
		}
	};

	const generateExperienceWithAI = async (index: number, jobTitle: string, company: string) => {
		if (!jobTitle && !company) {
			alert('Please enter a Position or Company first to generate bullet points.');
			return;
		}
		
		setIsGeneratingAI(true);
		try {
			const prompt = `Write 4 professional, dynamic, and achievement-oriented resume bullet points for a ${jobTitle} at ${company || 'a company'}. Start each with a strong action verb. Return only the raw bullet points separated by new lines, starting with a bullet character (• ) for each.`;
			const text = await callGemini(prompt);
			if (text) {
				handleArrayChange('workExperience', index, 'responsibilities', text.split('\n').filter(Boolean));
			}
		} catch (e: any) {
			console.error("AI Generation error:", e);
			if (e instanceof GeminiApiError && e.isQuotaError) {
				alert("🚨 API Quota Exhausted! Click the ⚙️ button in the bottom-right corner to enter a new API key.");
			} else {
				alert(e.message || "Failed to generate AI text.");
			}
		} finally {
			setIsGeneratingAI(false);
		}
	};

	const handleChange = (field: keyof Resume, value: any) => {
		setResume((prev) => ({ ...prev, [field]: value }));
	};

	const handleArrayChange = (
		field: keyof Resume,
		index: number,
		key: string,
		value: any
	) => {
		setResume((prev) => {
			const updated = [...(prev[field] as any[])];
			updated[index] = { ...updated[index], [key]: value };
			return { ...prev, [field]: updated };
		});
	};

	const addField = (field: keyof Resume, template: any) => {
		setResume((prev) => ({
			...prev,
			[field]: [...(prev[field] as any[]), template],
		}));
	};

	const removeField = (field: keyof Resume, index: number) => {
		setResume((prev) => {
			const updated = [...(prev[field] as any[])];
			updated.splice(index, 1);
			return { ...prev, [field]: updated };
		});
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900">
			{/* Animated background */}
			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-xl animate-pulse delay-75"></div>
				<div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-xl animate-pulse delay-150"></div>
			</div>

			{/* Form Container */}
			<div className="relative z-10 pt-24 px-6 pb-12">
				<div className="max-w-5xl mx-auto">
					<div className="bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-2xl shadow-xl p-8">
						{/* Header */}
						<div className="text-center mb-10">
							<div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-sm font-medium text-white mb-6">
								<Save className="w-4 h-4" />
								<span>Resume Builder</span>
							</div>
							<h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-2">
								Create Your Professional Resume
							</h1>
							<p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
								Fill in your details to build a stunning resume that stands out
							</p>
						</div>

						<form
							onSubmit={(e) => {
								e.preventDefault();
								onSave(resume);
							}}
							className="space-y-8"
						>
							{/* Personal Information */}
							<div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
								<div className="flex items-center gap-3 mb-6">
									<div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
										<User className="w-5 h-5 text-white" />
									</div>
									<h2 className="text-xl font-bold text-gray-900 dark:text-white">Personal Information</h2>
								</div>
								
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
										<input
											type="text"
											placeholder="John Doe"
											value={resume.name}
											onChange={(e) => handleChange("name", e.target.value)}
											className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
										<input
											type="email"
											placeholder="john@example.com"
											value={resume.email}
											onChange={(e) => handleChange("email", e.target.value)}
											className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
										<input
											type="tel"
											placeholder="+1 (555) 123-4567"
											value={resume.phone}
											onChange={(e) => handleChange("phone", e.target.value)}
											className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
										<input
											type="text"
											placeholder="New York, NY"
											value={resume.address}
											onChange={(e) => handleChange("address", e.target.value)}
											className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
										/>
									</div>
								</div>
								
								<div className="space-y-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Professional Bio</label>
										<textarea
											placeholder="A brief summary of your professional background..."
											value={resume.bio}
											onChange={(e) => handleChange("bio", e.target.value)}
											rows={3}
											className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
										/>
									</div>
									<div>
										<div className="flex justify-between items-center mb-2">
											<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">About You (Summary)</label>
											<button 
												type="button"
												onClick={generateSummaryWithAI} 
												disabled={isGeneratingAI}
												className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-lg text-xs font-bold shadow hover:shadow-md transition-all disabled:opacity-50"
											>
												{isGeneratingAI ? <span className="animate-pulse">...</span> : <Sparkles className="w-3 h-3" />}
												{isGeneratingAI ? 'Generating...' : 'AI Complete'}
											</button>
										</div>
										<textarea
											placeholder="Detailed information about your background, experience, and goals..."
											value={resume.about}
											onChange={(e) => handleChange("about", e.target.value)}
											rows={4}
											className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
										/>
									</div>
								</div>
							</div>

							{/* Social Links */}
							<div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
								<div className="flex items-center gap-3 mb-6">
									<Globe className="w-10 h-10 text-blue-500" />
									<h2 className="text-xl font-bold text-gray-900 dark:text-white">Social Links</h2>
								</div>
								
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">LinkedIn Profile</label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<Linkedin className="w-5 h-5 text-gray-400" />
											</div>
											<input
												type="url"
												placeholder="https://linkedin.com/in/johndoe"
												value={resume.linkedin}
												onChange={(e) => handleChange("linkedin", e.target.value)}
												className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
											/>
										</div>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">GitHub Profile</label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<Github className="w-5 h-5 text-gray-400" />
											</div>
											<input
												type="url"
												placeholder="https://github.com/johndoe"
												value={resume.github}
												onChange={(e) => handleChange("github", e.target.value)}
												className="w-full pl-10 pr-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
											/>
										</div>
									</div>
								</div>
							</div>

							{/* Profile Picture */}
							<div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
								<div className="flex items-center gap-3 mb-6">
									<Image className="w-10 h-10 text-purple-500" />
									<h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Picture</h2>
								</div>
								
								<div className="flex items-center gap-6">
									<div className="flex-1">
										<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Upload Photo</label>
										<div className="relative">
											<input
												type="file"
												accept="image/*"
												onChange={(e) => {
													const file = e.target.files?.[0];
													if (file) {
														const reader = new FileReader();
														reader.onloadend = () =>
															handleChange("profilePic", reader.result);
														reader.readAsDataURL(file);
													}
												}}
												className="hidden"
												id="profile-upload"
											/>
											<label
												htmlFor="profile-upload"
												className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 cursor-pointer"
											>
												<Image className="w-5 h-5" />
												<span>Choose Image</span>
											</label>
										</div>
									</div>
									{resume.profilePic && (
										<div className="relative">
											<img
												src={resume.profilePic}
												alt="Profile"
												className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg"
											/>
											<button
												type="button"
												onClick={() => handleChange("profilePic", "")}
												className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors duration-200"
											>
												<Trash2 className="w-3 h-3" />
											</button>
										</div>
									)}
								</div>
							</div>

							{/* Skills */}
							<div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
								<div className="flex items-center gap-3 mb-6">
									<Code className="w-10 h-10 text-green-500" />
									<h2 className="text-xl font-bold text-gray-900 dark:text-white">Skills</h2>
								</div>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technical Skills</label>
									<textarea
										placeholder="JavaScript, React, Node.js, Python, etc..."
										value={resume.skills.join(", ")}
										onChange={(e) =>
											handleChange(
												"skills",
												e.target.value.split(",").map((s) => s.trim())
											)
										}
										rows={3}
										className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
									/>
								</div>
							</div>

							{/* Languages */}
							<div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
								<div className="flex items-center gap-3 mb-6">
									<Languages className="w-10 h-10 text-orange-500" />
									<h2 className="text-xl font-bold text-gray-900 dark:text-white">Languages</h2>
								</div>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Languages</label>
									<textarea
										placeholder="English, Spanish, French, etc..."
										value={resume.languages.join(", ")}
										onChange={(e) =>
											handleChange(
												"languages",
												e.target.value.split(",").map((s) => s.trim())
											)
										}
										rows={2}
										className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
									/>
								</div>
							</div>

							{/* Education */}
							<div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center gap-3">
										<GraduationCap className="w-10 h-10 text-indigo-500" />
										<h2 className="text-xl font-bold text-gray-900 dark:text-white">Education</h2>
									</div>
									<button
										type="button"
										onClick={() =>
											addField("education", { degree: "", institution: "", program: "", duration: "" })
										}
										className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-purple-600 transition-all duration-300"
									>
										<Plus className="w-4 h-4" />
										<span>Add Education</span>
									</button>
								</div>
								
								<div className="space-y-4">
									{resume.education.map((edu, i) => (
										<div key={i} className="bg-white dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10">
											<div className="flex justify-between items-start mb-4">
												<h3 className="font-medium text-gray-900 dark:text-white">Education #{i + 1}</h3>
												<button
													type="button"
													onClick={() => removeField("education", i)}
													className="text-red-500 hover:text-red-600 transition-colors duration-200"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<input
													type="text"
													placeholder="Degree"
													value={edu.degree as string}
													onChange={(e) => handleArrayChange("education", i, "degree", e.target.value)}
													className="px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
												/>
												<input
													type="text"
													placeholder="Institution"
													value={edu.institution}
													onChange={(e) => handleArrayChange("education", i, "institution", e.target.value)}
													className="px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
												/>
												<input
													type="text"
													placeholder="Program"
													value={edu.program}
													onChange={(e) => handleArrayChange("education", i, "program", e.target.value)}
													className="px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
												/>
												<input
													type="text"
													placeholder="Duration"
													value={edu.duration}
													onChange={(e) => handleArrayChange("education", i, "duration", e.target.value)}
													className="px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
												/>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Work Experience */}
							<div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center gap-3">
										<Briefcase className="w-10 h-10 text-blue-500" />
										<h2 className="text-xl font-bold text-gray-900 dark:text-white">Work Experience</h2>
									</div>
									<button
										type="button"
										onClick={() =>
											addField("workExperience", {
												position: "",
												company: "",
												title: "",
												duration: "",
												responsibilities: [],
											})
										}
										className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-300"
									>
										<Plus className="w-4 h-4" />
										<span>Add Experience</span>
									</button>
								</div>
								
								<div className="space-y-4">
									{resume.workExperience.map((work, i) => (
										<div key={i} className="bg-white dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10">
											<div className="flex justify-between items-start mb-4">
												<h3 className="font-medium text-gray-900 dark:text-white">Experience #{i + 1}</h3>
												<button
													type="button"
													onClick={() => removeField("workExperience", i)}
													className="text-red-500 hover:text-red-600 transition-colors duration-200"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
												<input
													type="text"
													placeholder="Position"
													value={work.position as string}
													onChange={(e) => handleArrayChange("workExperience", i, "position", e.target.value)}
													className="px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
												/>
												<input
													type="text"
													placeholder="Company"
													value={work.company}
													onChange={(e) => handleArrayChange("workExperience", i, "company", e.target.value)}
													className="px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
												/>
												<input
													type="text"
													placeholder="Duration"
													value={work.duration}
													onChange={(e) => handleArrayChange("workExperience", i, "duration", e.target.value)}
													className="px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
												/>
											</div>
											<div className="flex justify-between items-end mb-2">
												<label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Responsibilities</label>
												<button 
													type="button"
													onClick={() => generateExperienceWithAI(i, work.position as string, work.company)} 
													disabled={isGeneratingAI}
													className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white rounded-lg text-xs font-bold shadow hover:shadow-md transition-all disabled:opacity-50 mt-2"
												>
													{isGeneratingAI ? <span className="animate-pulse">...</span> : <Sparkles className="w-3 h-3" />}
													{isGeneratingAI ? 'Writing...' : 'AI Bullets'}
												</button>
											</div>
											<div>
												<textarea
													placeholder="Responsibilities (comma or newline separated)"
													value={work.responsibilities.join("\\n")}
													onChange={(e) =>
														handleArrayChange(
															"workExperience",
															i,
															"responsibilities",
															e.target.value.split("\\n").map((r) => r.trim()).filter(Boolean)
														)
													}
													rows={5}
													className="w-full px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
												/>
											</div>
										</div>
									))}
								</div>
							</div>

							{/* Projects */}
							<div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center gap-3">
										<Code className="w-10 h-10 text-purple-500" />
										<h2 className="text-xl font-bold text-gray-900 dark:text-white">Projects</h2>
									</div>
									<button
										type="button"
										onClick={() =>
											addField("projects", { title: "", duration: "", description: "" })
										}
										className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
									>
										<Plus className="w-4 h-4" />
										<span>Add Project</span>
									</button>
								</div>
								
								<div className="space-y-4">
									{resume.projects.map((proj, i) => (
										<div key={i} className="bg-white dark:bg-white/5 rounded-xl p-4 border border-gray-200 dark:border-white/10">
											<div className="flex justify-between items-start mb-4">
												<h3 className="font-medium text-gray-900 dark:text-white">Project #{i + 1}</h3>
												<button
													type="button"
													onClick={() => removeField("projects", i)}
													className="text-red-500 hover:text-red-600 transition-colors duration-200"
												>
													<Trash2 className="w-4 h-4" />
												</button>
											</div>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
												<input
													type="text"
													placeholder="Project Title"
													value={proj.title}
													onChange={(e) => handleArrayChange("projects", i, "title", e.target.value)}
													className="px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
												/>
												<input
													type="text"
													placeholder="Duration"
													value={proj.duration}
													onChange={(e) => handleArrayChange("projects", i, "duration", e.target.value)}
													className="px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
												/>
											</div>
											<textarea
												placeholder="Project Description"
												value={proj.description}
												onChange={(e) => handleArrayChange("projects", i, "description", e.target.value)}
												rows={3}
												className="w-full px-3 py-2 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
											/>
										</div>
									))}
								</div>
							</div>

							{/* Theme Selection */}
							<div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 border border-gray-200 dark:border-white/10">
								<div className="flex items-center gap-3 mb-6">
									<Palette className="w-10 h-10 text-pink-500" />
									<h2 className="text-xl font-bold text-gray-900 dark:text-white">Website Theme</h2>
								</div>
								
								<div>
									<label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Choose Theme</label>
									<select
										value={resume.websiteTheme}
										onChange={(e) => handleChange("websiteTheme", e.target.value)}
										className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
									>
										<option value="light">Light Theme</option>
										<option value="dark">Dark Theme</option>
										<option value="modern">Modern Theme</option>
										<option value="classic">Classic Theme</option>
									</select>
								</div>
							</div>

							{/* Submit Button */}
							<div className="flex justify-center pt-8">
								<button
									type="submit"
									className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
								>
									<Save className="w-5 h-5" />
									<span>Generate Resume</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
