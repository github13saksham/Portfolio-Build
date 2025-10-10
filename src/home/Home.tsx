// import { Link } from "react-router-dom";
// import { UserButton } from "@clerk/clerk-react";
// import heroimg from "../assets/images/generated-image.png"; // Adjust your import path

// function Hero() {
// 	return (
// 		<div className="relative min-h-screen w-full">
// 			{/* Background Image */}
// 			<div
// 				className="absolute inset-0 bg-cover bg-center"
// 				style={{ backgroundImage: `url(${heroimg})` }}
// 			></div>

// 			{/* UserButton in top-right */}
// 			<div className="absolute top-4 right-4 z-20 transform scale-125">
// 				<UserButton />
// 			</div>

// 			{/* Content in center */}
// 			<div className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen p-6 text-white">
// 				<h1 className="text-5xl font-bold mb-4">
// 					Welcome to My Resume Builder
// 				</h1>

// 				<p className="text-xl mb-6">
// 					Create stunning resumes, convert PDFs to websites, and get AI-powered
// 					recommendations.
// 				</p>

// 				<div className="space-x-4">
// 					<Link
// 						to="/resumewebsite"
// 						className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
// 					>
// 						Build Resume Website
// 					</Link>
// 					<Link
// 						to="/pages/pdfbuilder"
// 						className="px-6 py-3 bg-green-600 rounded hover:bg-green-700 transition"
// 					>
// 						Create PDF Resume
// 					</Link>
// 					<Link
// 						to="/pdf2website"
// 						className="px-6 py-3 bg-purple-600 rounded hover:bg-purple-700 transition"
// 					>
// 						PDF to Resume Website
// 					</Link>
// 				</div>
// 			</div>

// 			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
// 				<div className="p-4 border rounded shadow text-center">
// 					<h3 className="font-semibold text-lg">AI-Powered Recommendations</h3>
// 					<p className="text-gray-600">
// 						Get smart tips to improve your resume in real time.
// 					</p>
// 				</div>
// 				<div className="p-4 border rounded shadow text-center">
// 					<h3 className="font-semibold text-lg">PDF to Website</h3>
// 					<p className="text-gray-600">
// 						Transform your resume PDF into a beautiful website effortlessly.
// 					</p>
// 				</div>
// 				<div className="p-4 border rounded shadow text-center">
// 					<h3 className="font-semibold text-lg">Multiple Resume Formats</h3>
// 					<p className="text-gray-600">
// 						Build resumes for jobs, portfolios, or creative fields.
// 					</p>
// 				</div>
// 			</div>

// 			{/* Optional overlay for darkening background */}
// 			<div className="absolute inset-0 bg-black opacity-50"></div>

// 			<div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
// 				<div className="p-4 border rounded shadow text-center">
// 					<h3 className="font-semibold text-lg">AI-Powered Recommendations</h3>
// 					<p className="text-gray-600">
// 						Get smart tips to improve your resume in real time.
// 					</p>
// 				</div>
// 				<div className="p-4 border rounded shadow text-center">
// 					<h3 className="font-semibold text-lg">PDF to Website</h3>
// 					<p className="text-gray-600">
// 						Transform your resume PDF into a beautiful website effortlessly.
// 					</p>
// 				</div>
// 				<div className="p-4 border rounded shadow text-center">
// 					<h3 className="font-semibold text-lg">Multiple Resume Formats</h3>
// 					<p className="text-gray-600">
// 						Build resumes for jobs, portfolios, or creative fields.
// 					</p>
// 				</div>
// 			</div>

// 			<div className="mt-10 bg-gray-100 p-6 rounded shadow">
// 				<blockquote className="italic text-gray-700">
// 					"This resume builder transformed my job search! It's easy, fast, and
// 					the output looks professional."
// 				</blockquote>
// 				<p className="mt-4 font-semibold text-right">– Happy User</p>
// 			</div>

// 			<footer className="mt-12 text-gray-500 text-sm">
// 				© 2025 My Resume Builder. All rights reserved.
// 			</footer>
// 		</div>
// 	);
// }

// export default Hero;
import { Link } from "react-router-dom";
// import Chatbot from "./Chatbot";
import heroimg from "../assets/images/generated-image.png"; // Ensure correct path
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import darkhero_img from "../assets/images/resumebannerimage.jpg";
import { Globe, FileText, ArrowRight } from "lucide-react";

function Home() {
	const [] = useState(false);
	const navigate = useNavigate();
	return (
		// <div className="relative min-h-screen w-full font-sans text-gray-800">
		// 	{/* Background Image with Dark Overlay */}

		// 	<div
		// 		className="absolute inset-0 bg-cover bg-center block dark:hidden"
		// 		style={{ backgroundImage: `url(${heroimg})` }}
		// 	></div>

		// 	<div
		// 		className="absolute inset-0 bg-cover bg-center hidden dark:block z-0"
		// 		style={{ backgroundImage: `url(${darkhero_img})` }}
		// 	></div>

		// 	<div className="absolute inset-0 bg-black opacity-60 dark:hidden"></div>
		<div className="relative min-h-screen w-full font-sans text-gray-800 overflow-hidden">
			{/* 🌅 Light mode background */}
			<div
				className="absolute inset-0 bg-cover bg-center hidden dark:hidden z-0"
				style={{ backgroundImage: `url(${heroimg})` }}
			></div>

			{/* 🌌 Dark mode background */}
			<div
				className=" absolute inset-0 bg-cover bg-center block dark:block "
				style={{ backgroundImage: `url(${darkhero_img})` }}
			></div>

			{/* 🩶 Overlay for both modes */}
			<div className="absolute inset-0 bg-black/70 dark:bg-black/85 transition-all duration-700 z-10"></div>

			{/* Top Navbar */}
			<header className="relative z-20  items-center justify-between  max-w-7xl mx-auto">
				<Navbar />
			</header>

			{/* Hero Section */}

			<section className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center text-white">
				<h1 className="text-5xl md:text-6xl font-bold drop-shadow-[0_0_20px_#00f7ff] dark:text-cyan-300 transition-all duration-700">
					Build Your Future
				</h1>
				<p className="mt-4 text-xl text-gray-200 dark:text-cyan-100">
					Create stunning resumes with AI assistance.
				</p>

				<div className="flex flex-wrap justify-center gap-6">
					<Link
						to="/pages/ResumeBuilder"
						className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
					>
						<Globe className="w-5 h-5" />
						Build Website Resume
					</Link>

					<button
						onClick={() => navigate("/pages/pdfbuilder")}
						className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
					>
						<FileText className="w-5 h-5" />
						Create PDF Resume
					</button>

					<Link
						to="/pages/Pdftoweb"
						className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
					>
						<ArrowRight className="w-5 h-5" />
						PDF → Website
					</Link>
				</div>
			</section>

			{/* Features Section */}
			<section className="relative z-10  bg-blue-900  py-16 px-6 dark:bg-black">
				<h2 className="text-3xl font-semibold text-center mb-12 text-white dark:text-cyan-400 dark:drop-shadow-[0_0_11px_#00f7ff]">
					Why Choose Us?
				</h2>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto ">
					<div
						className="bg-gray-100 dark:bg-black rounded-lg shadow p-6 text-center dark:border-4 dark:border-b-blue-900 dark:hover:border-cyan-200 transition-transform duration-300 ease-out 
             hover:scale-105"
					>
						<h3 className="text-xl text-black dark:text-cyan-200 font-semibold mb-4 ">
							AI Recommendations
						</h3>
						<p className="dark:text-white">
							Smart tips and suggestions to optimize your resume in real time.
						</p>
					</div>

					<div
						className="bg-gray-100  dark:bg-black rounded-lg shadow p-6 text-center dark:border-4 dark:border-b-blue-900 dark:hover:border-cyan-200 transition-transform duration-300 ease-out 
             hover:scale-105"
					>
						<h3 className="text-xl text-black dark:text-cyan-200 font-semibold mb-4">
							PDF to Website
						</h3>
						<p className="dark:text-white">
							Automatically convert your PDF resume into a fully responsive
							website.
						</p>
					</div>

					<div
						className="bg-gray-100 dark:bg-black rounded-lg shadow p-6 text-center dark:border-4 dark:border-b-blue-900 dark:hover:border-cyan-200 transition-transform duration-300 ease-out 
             hover:scale-105"
					>
						<h3 className="text-xl text-black dark:text-cyan-200 font-semibold mb-4">
							Multiple Resume Formats
						</h3>
						<p className="dark:text-white">
							Choose templates for job applications, portfolios, and creative
							industries.
						</p>
					</div>
				</div>
			</section>

			{/* Statistics Section */}
			<section className="relative z-10 bg-gray-100 dark:bg-gray-800 py-16 px-6">
				<h2 className="text-3xl font-semibold text-center mb-12 text-gray-800 dark:text-white">
					Resume Statistics
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
					<div className="text-center">
						<h3 className="text-4xl font-bold text-blue-600 dark:text-cyan-400">
							1000+
						</h3>
						<p className="text-gray-600 dark:text-gray-300">Resumes Created</p>
					</div>
					<div className="text-center">
						<h3 className="text-4xl font-bold text-green-600 dark:text-cyan-400">
							50+
						</h3>
						<p className="text-gray-600 dark:text-gray-300">
							Templates Available
						</p>
					</div>
					<div className="text-center">
						<h3 className="text-4xl font-bold text-purple-600 dark:text-cyan-400">
							95%
						</h3>
						<p className="text-gray-600 dark:text-gray-300">Success Rate</p>
					</div>
				</div>
			</section>

			{/* Testimonial Section
			<section className="relative z-10 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:bg-black py-16 px-6 text-center">
				<h2 className="text-3xl font-semibold mb-8">What Our Users Say</h2>
				<div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
					<blockquote className="italic text-lg text-gray-700">
						"ResumeBuilderPro made job applications effortless. The AI-powered
						suggestions improved my resume by 50%, and now I’m landing
						interviews like never before!"
					</blockquote>
					<p className="mt-4 font-semibold text-gray-800">
						– Jane Doe, Software Engineer
					</p>
				</div>
			</section> */}

			{/* Testimonial Section */}
			<section className="relative z-1000 bg-blue-900  dark:bg-black py-16 px-6 text-center">
				<h2 className="text-3xl font-semibold mb-8 text-white dark:text-cyan-400 dark:drop-shadow-[0_0_11px_#00f7ff]">
					What Our Users Say
				</h2>

				<div
					className="max-w-2xl mx-auto bg-white p-8 rounded shadow 
               dark:bg-black dark:border-2 dark:hover:border-cyan-200 
               dark:shadow-blue-700  transition-transform duration-300 ease-out 
             hover:scale-105 "
				>
					<blockquote className="italic text-lg text-gray-700 dark:text-gray-300">
						"ResumeBuilderPro made job applications effortless. The AI-powered
						suggestions improved my resume by 50%, and now I’m landing
						interviews like never before!"
					</blockquote>
					<p className="mt-4 font-semibold text-gray-800 dark:text-cyan-300">
						– Jane Doe, Software Engineer
					</p>
				</div>
			</section>

			{/* Footer */}
			{/* <footer
				className="relative  bg-black text-white dark:text-cyan-300  shadow-md py-4 px-8 z-20 text-center
        dark:bg-black dark:border-[3px_0_0_0] dark:border-cyan-400 
        dark:drop-shadow-cyan-300 "
			>
				© 2025 ResumeBuilderPro. All rights reserved.
			</footer> */}
			<footer
				className="relative bg-black text-white dark:text-cyan-300 shadow-md py-4 px-8 z-20 text-center
             dark:bg-black 
             border-t-2 border-blue-600
             dark:border-cyan-400 
             dark:shadow-[0_0_4px_#00f7ff]"
			>
				© 2025 ResumeBuilderPro. All rights reserved.
			</footer>

			{/* <Chatbot /> */}
		</div>
	);
}

export default Home;
