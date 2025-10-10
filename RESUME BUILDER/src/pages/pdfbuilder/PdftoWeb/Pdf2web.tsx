import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import Navbar from "@/home/Navbar";

export default function PdfToPortfolio() {
	const [file, setFile] = useState<File | null>(null);
	const [previewVisible, setPreviewVisible] = useState(false);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFile(e.target.files?.[0] || null);
		setPreviewVisible(false);
	};

	const handleGenerate = () => {
		if (!file) return alert("Please upload a PDF file first.");
		setPreviewVisible(true);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600 dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
			<header className="fixed top-0 left-0 w-full z-20 backdrop-blur-md">
				<Navbar />
			</header>

			<main className="pt-28 px-6 flex flex-col items-center">
				{/* Title Section */}
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					className="text-center mb-10"
				>
					<h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
						Convert Your Resume PDF
					</h1>
					<p className="text-lg text-gray-200 mt-3">
						Turn your resume into a beautiful portfolio website in one click.
					</p>
				</motion.div>

				{/* Upload Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.3, duration: 0.6 }}
					className="w-full max-w-3xl bg-white/10 dark:bg-white/5 rounded-2xl p-8 shadow-2xl backdrop-blur-md border border-white/20"
				>
					<div className="flex flex-col md:flex-row md:items-center gap-6">
						<div className="flex-1">
							<label
								htmlFor="pdfUpload"
								className="block text-sm font-semibold text-white mb-2"
							>
								Upload Your Resume (PDF)
							</label>
							<input
								id="pdfUpload"
								type="file"
								accept="application/pdf"
								onChange={handleFileChange}
								className="block w-full text-sm text-black bg-white/20 rounded-lg p-2 border border-white/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-400"
							/>
							{file && (
								<p className="mt-2 text-sm text-cyan-200">📄 {file.name}</p>
							)}
						</div>

						<button
							onClick={handleGenerate}
							className="bg-cyan-500 hover:bg-cyan-400 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-300"
						>
							Generate Portfolio
						</button>
					</div>
				</motion.div>

				{/* Preview Section */}
				{previewVisible && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.5 }}
						className="w-full max-w-5xl mt-12 rounded-2xl overflow-hidden shadow-2xl border border-white/20"
					>
						<iframe
							title="Portfolio Preview"
							srcDoc={`
                <html>
                  <body style="margin:0; background:linear-gradient(135deg,#667eea,#764ba2); color:white; display:flex; align-items:center; justify-content:center; height:100vh; font-family:sans-serif;">
                    <h1>Your Portfolio Preview Will Appear Here</h1>
                  </body>
                </html>
              `}
							className="w-full h-[80vh]"
						/>
					</motion.div>
				)}
			</main>
		</div>
	);
}
