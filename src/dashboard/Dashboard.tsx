import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import Navbar from "../home/Navbar";

function Dashboard() {
	const { user } = useUser();

	return (
		<div className="min-h-screen bg-gray-50 dark:bg-black font-sans">
			{/* Navbar at the top */}
			<Navbar />

			{/* Main Content */}
			<main className="pt-20 px-6 max-w-7xl mx-auto">
				{/* Hero Section */}
				<section className="text-center py-12">
					<h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
						Welcome back, {user?.firstName || "User"}!
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
						Manage your resumes, build new ones, and track your progress.
					</p>
					{/* Progress Bar */}
					<div className="max-w-md mx-auto mb-4">
						<p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
							Resume Completion
						</p>
						<div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
							<motion.div
								className="bg-blue-600 dark:bg-cyan-400 h-4 rounded-full"
								initial={{ width: 0 }}
								animate={{ width: "75%" }}
								transition={{ duration: 1.5, ease: "easeOut" }}
							></motion.div>
						</div>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
							75% Complete
						</p>
					</div>
				</section>

				{/* Stats Cards */}
				<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							Total Resumes
						</h3>
						<p className="text-3xl font-bold text-blue-600 dark:text-cyan-400">
							3
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Created so far
						</p>
					</div>
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							Last Updated
						</h3>
						<p className="text-lg font-bold text-green-600 dark:text-green-400">
							Today
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Keep it fresh!
						</p>
					</div>
					<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
						<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
							AI Suggestions
						</h3>
						<p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
							12
						</p>
						<p className="text-sm text-gray-500 dark:text-gray-400">
							Improvements made
						</p>
					</div>
				</section>

				{/* Action Cards */}
				<section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<motion.div
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.2 }}
					>
						<Link
							to="/pages/pdfbuilder"
							className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg dark:hover:border-2 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_10px_#00f7ff] transition-all duration-200 block"
						>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
								Build PDF Resume
							</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">
								Create a professional PDF resume with ease.
							</p>
							<span className="text-blue-600 dark:text-cyan-400 font-medium">
								Get Started →
							</span>
						</Link>
					</motion.div>
					<motion.div
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.2 }}
					>
						<Link
							to="/pages/ResumeBuilder"
							className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg dark:hover:border-2 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_10px_#00f7ff] transition-all duration-200 block"
						>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
								Build Website Resume
							</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">
								Design a stunning online resume website.
							</p>
							<span className="text-blue-600 dark:text-cyan-400 font-medium">
								Get Started →
							</span>
						</Link>
					</motion.div>
					<motion.div
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.2 }}
					>
						<Link
							to="/Nav-bar components"
							className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg dark:hover:border-2  dark:hover:border-cyan-400 dark:hover:shadow-[0_0_10px_#00f7ff] transition-all duration-200 block"
						>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
								View My Resumes
							</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">
								Access and edit your existing resumes.
							</p>
							<span className="text-blue-600 dark:text-cyan-400 font-medium">
								View →
							</span>
						</Link>
					</motion.div>
					<motion.div
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.2 }}
					>
						<Link
							to="/pages/PdftoWeb"
							className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700 hover:shadow-lg dark:hover:border-2 dark:hover:border-cyan-400 dark:hover:shadow-[0_0_10px_#00f7ff] transition-all duration-200 block"
						>
							<h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
								PDF to Website
							</h3>
							<p className="text-gray-600 dark:text-gray-300 mb-4">
								Convert your PDF resume to a website.
							</p>
							<span className="text-blue-600 dark:text-cyan-400 font-medium">
								Convert →
							</span>
						</Link>
					</motion.div>
				</section>
			</main>

			{/* Footer */}
			<footer className="bg-gray-100 dark:bg-gray-900 text-center py-6 mt-12 border-t dark:border-gray-700">
				<p className="text-gray-600 dark:text-gray-400">
					© 2025 ResumeBuilderPro. All rights reserved.
				</p>
			</footer>
		</div>
	);
}

export default Dashboard;
