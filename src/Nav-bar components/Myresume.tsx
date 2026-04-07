import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Resume } from "../types/Resume";
import Navbar from "../home/Navbar";
import { FileText, Trash2, Edit, Eye, Sparkles, Loader2 } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function MyResume() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [resumes, setResumes] = useState<Resume[]>([]);
	const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

	const fetchResumes = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(`${API_BASE}/api/resumes`, { withCredentials: true });
			setResumes(data);
		} catch (err) {
			console.error("Fetch error:", err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchResumes();
	}, []);

	const handleDelete = async (id: string | number) => {
		if (window.confirm("Are you sure you want to delete this resume?")) {
			try {
				await axios.delete(`${API_BASE}/api/resumes/${id}`, { withCredentials: true });
				setResumes(prev => prev.filter(r => r.id !== id));
			} catch (err) {
				console.error("Delete error:", err);
				alert("Failed to delete resume.");
			}
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 font-sans text-gray-900 dark:text-white transition-colors duration-300">
			{/* Animated background */}
			<div className="fixed inset-0 overflow-hidden">
				<div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
				<div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-xl animate-pulse delay-75"></div>
				<div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-500/10 dark:bg-pink-500/5 rounded-full blur-xl animate-pulse delay-150"></div>
			</div>
			
			{/* Navbar */}
			<header className="relative z-20 fixed top-0 left-0 w-full">
				<Navbar />
			</header>

			{/* Main Content */}
			<main className="relative z-10 pt-24 px-6 max-w-7xl mx-auto">
				<div className="text-center mb-12">
					<div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-full text-sm font-medium mb-6">
						<Sparkles className="w-4 h-4 text-yellow-400" />
						<span className="text-gray-900 dark:text-white">My Resume Collection</span>
					</div>
					<h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent transition-colors duration-300">
						My Saved Resumes
					</h1>
					<p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
						Manage and edit your professional resumes
					</p>
				</div>

				{loading ? (
					<div className="flex justify-center items-center py-20">
						<Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
					</div>
				) : resumes.length === 0 ? (
					<div className="text-center py-16">
						<div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 mx-auto">
							<FileText className="w-12 h-12 text-white" />
						</div>
						<p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
							No resumes saved yet
						</p>
						<p className="text-gray-500 dark:text-gray-400 mb-8">
							Start building your professional resume today
						</p>
						<button
							onClick={() => navigate('/pages/pdfbuilder')}
							className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
						>
							<Edit className="w-4 h-4" />
							Create Your First Resume
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{resumes.map((resume) => (
							<motion.div
								key={resume.id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
								className="group bg-white/80 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-2xl p-6 hover:bg-white/90 dark:hover:bg-white/15 transition-all duration-300"
							>
								<div className="flex items-center justify-between mb-4">
									<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
										<FileText className="w-6 h-6 text-white" />
									</div>
									<div className="flex gap-2">
										<button
											onClick={() => navigate(`/pages/pdfbuilder?edit=${resume.id}`)}
											className="p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors duration-200"
										>
											<Edit className="w-4 h-4" />
										</button>
										<button
											onClick={() => handleDelete(resume.id)}
											className="p-2 bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
										>
											<Trash2 className="w-4 h-4" />
										</button>
									</div>
								</div>
								<img
									src={resume.profilePic || "https://via.placeholder.com/50"}
									alt="Profile"
									className="w-12 h-12 rounded-full mr-4"
								/>
								<h4 className="text-xl font-semibold text-gray-900 dark:text-white">
									{resume.name || "Untitled Resume"}
								</h4>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									{resume.bio || "No summary provided."}
								</p>
								<div className="flex space-x-2">
									<button
										className="px-4 py-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-500/30 transition-colors duration-200"
										onClick={() => setSelectedResume(resume)}
									>
										<Eye className="w-4 h-4" />
									</button>
									<button
										className="px-4 py-2 bg-green-500/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-500/30 transition-colors duration-200"
										onClick={() => {
											localStorage.setItem(
												"editingResume",
												JSON.stringify(resume)
											);
											navigate("/pages/pdfbuilder");
										}}
									>
										<Edit className="w-4 h-4" />
									</button>
									<button
										className="px-4 py-2 bg-red-500/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
										onClick={() => handleDelete(resume.id)}
									>
										<Trash2 className="w-4 h-4" />
									</button>
								</div>
							</motion.div>
						))}
					</div>
				)}
			</main>

			{/* View Modal */}
			{selectedResume && (
				<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-white/90 dark:bg-white/10 backdrop-blur-lg border border-gray-200 dark:border-white/20 rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-white/20">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								Resume Preview
							</h2>
							<button
								className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl transition-colors duration-200"
								onClick={() => setSelectedResume(null)}
							>
								&times;
							</button>
						</div>
						<div className="p-6">
							<div className="flex items-center mb-6">
								<img
									src={selectedResume.profilePic || "https://via.placeholder.com/50"}
									alt="Profile"
									className="w-16 h-16 rounded-full mr-4 border-2 border-gray-200 dark:border-white/20"
								/>
								<div>
									<h3 className="text-xl font-bold text-gray-900 dark:text-white">
										{selectedResume.name || "Untitled Resume"}
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										{selectedResume.bio || "No summary provided."}
									</p>
								</div>
							</div>
							<div className="space-y-4">
								{selectedResume.workExperience && selectedResume.workExperience.length > 0 && (
									<div>
										<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Work Experience</h4>
										{selectedResume.workExperience.map((work, idx) => (
											<div key={idx} className="mb-4">
												<h5 className="font-bold text-gray-900 dark:text-white">
													{work.company}
												</h5>
												<p className="text-gray-600 dark:text-gray-300">
													{work.position} - {work.duration}
												</p>
												<ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
													{Array.isArray(work.responsibilities) ? (
														work.responsibilities.map((r, i) => (
															<li key={i}>{r}</li>
														))
													) : work.responsibilities ? (
														<li>{work.responsibilities}</li>
													) : null}
												</ul>
											</div>
										))}
									</div>
								)}
								{selectedResume.education && selectedResume.education.length > 0 && (
									<div>
										<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Education</h4>
										{selectedResume.education.map((edu, idx) => (
											<div key={idx} className="mb-4">
												<h5 className="font-bold text-gray-900 dark:text-white">
													{edu.institution}
												</h5>
												<p className="text-gray-600 dark:text-gray-300">
													{edu.degree} - {edu.duration}
												</p>
											</div>
										))}
									</div>
								)}
								{selectedResume.skills && selectedResume.skills.length > 0 && (
									<div>
										<h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Skills</h4>
										<ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
											{selectedResume.skills.map((skill, idx) => (
												<li key={idx}>{skill}</li>
											))}
										</ul>
									</div>
								)}
							</div>
						</div>
					</div>
				
			
		</div>
		)}
		</div>
	);
}
