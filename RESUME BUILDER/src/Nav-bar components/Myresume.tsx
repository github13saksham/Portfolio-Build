import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Resume } from "../types/Resume";
import { loadResumes, deleteResume } from "../utils/resumeStorage";
import Navbar from "../home/Navbar";

export default function MyResume() {
	const navigate = useNavigate();
	const [resumes, setResumes] = useState<Resume[]>([]);
	const [selectedResume, setSelectedResume] = useState<Resume | null>(null);

	useEffect(() => {
		setResumes(loadResumes());
	}, []);

	const handleDelete = (id: number) => {
		if (window.confirm("Are you sure you want to delete this resume?")) {
			deleteResume(id);
			setResumes(loadResumes());
		}
	};

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-black font-sans text-gray-900 dark:text-white">
			{/* Navbar */}
			<header className="fixed top-0 left-0 w-full z-10">
				<Navbar />
			</header>

			{/* Main Content */}
			<main className="pt-24 px-6 max-w-7xl mx-auto">
				<h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-900 dark:text-white">
					My Saved Resumes
				</h1>

				{resumes.length === 0 ? (
					<p className="text-center text-lg text-gray-600 dark:text-gray-300">
						No resumes saved yet. Start building one!
					</p>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{resumes.map((resume) => (
							<motion.div
								key={resume.id}
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
								className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg hover:border-2 hover:border-cyan-400 hover:shadow-[0_0_10px_#00f7ff] transition-all duration-200"
							>
								<div className="flex items-center mb-4">
									<img
										src={resume.profilePic || "https://via.placeholder.com/50"}
										alt="Profile"
										className="w-12 h-12 rounded-full mr-4"
									/>
									<h4 className="text-xl font-semibold text-gray-900 dark:text-white">
										{resume.name || "Untitled Resume"}
									</h4>
								</div>
								<p className="text-gray-600 dark:text-gray-300 mb-4">
									{resume.bio || "No summary provided."}
								</p>
								<div className="flex space-x-2">
									<button
										className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
										onClick={() => setSelectedResume(resume)}
									>
										View
									</button>
									<button
										className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
										onClick={() => {
											localStorage.setItem(
												"editingResume",
												JSON.stringify(resume)
											);
											navigate("/pages/pdfbuilder");
										}}
									>
										Edit
									</button>
									<button
										className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
										onClick={() => handleDelete(resume.id)}
									>
										Delete
									</button>
								</div>
							</motion.div>
						))}
					</div>
				)}
			</main>

			{/* View Modal */}
			{selectedResume && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
					<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
						<div className="flex justify-between items-center p-6 border-b dark:border-gray-700">
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								Resume Preview
							</h2>
							<button
								className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl"
								onClick={() => setSelectedResume(null)}
							>
								&times;
							</button>
						</div>
						<div className="p-6">
							{/* Resume Header */}
							<div className="flex items-center mb-6">
								<img
									src={
										selectedResume.profilePic ||
										"https://via.placeholder.com/120"
									}
									alt="Profile"
									className="w-24 h-24 rounded-full mr-6"
								/>
								<div>
									<h3 className="text-3xl font-bold text-gray-900 dark:text-white">
										{selectedResume.name}
									</h3>
									<p className="text-gray-600 dark:text-gray-300">
										Email: {selectedResume.email}
									</p>
									<p className="text-gray-600 dark:text-gray-300">
										Phone: {selectedResume.phone}
									</p>
									<p className="text-gray-600 dark:text-gray-300">
										Address: {selectedResume.address}
									</p>
								</div>
							</div>

							{/* Resume Content */}
							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								{/* Left Column */}
								<div>
									{/* Work Experience */}
									{selectedResume.workExperience &&
										selectedResume.workExperience.length > 0 && (
											<section className="mb-6">
												<h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
													Work Experience
												</h4>
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
											</section>
										)}

									{/* Education */}
									{selectedResume.education &&
										selectedResume.education.length > 0 && (
											<section className="mb-6">
												<h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
													Education
												</h4>
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
											</section>
										)}

									{/* Projects */}
									{selectedResume.projects &&
										selectedResume.projects.length > 0 && (
											<section className="mb-6">
												<h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
													Projects
												</h4>
												{selectedResume.projects.map((proj, idx) => (
													<div key={idx} className="mb-4">
														<h5 className="font-bold text-gray-900 dark:text-white">
															{proj.title}
														</h5>
														<p className="text-gray-600 dark:text-gray-300">
															{proj.description} - {proj.duration}
														</p>
													</div>
												))}
											</section>
										)}
								</div>

								{/* Right Column */}
								<div>
									{/* Skills */}
									{selectedResume.skills &&
										selectedResume.skills.length > 0 && (
											<section>
												<h4 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
													Skills
												</h4>
												<ul className="list-disc list-inside text-gray-600 dark:text-gray-300">
													{selectedResume.skills.map((skill, idx) => (
														<li key={idx}>{skill}</li>
													))}
												</ul>
											</section>
										)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
