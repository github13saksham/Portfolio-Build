// import type { Resume } from "../../types/Resume";
// import Navbar from "@/home/Navbar";

// interface Props {
// 	resume: Resume;
// 	onEdit: () => void;
// }

// export default function ResumePreview({ resume, onEdit }: Props) {
// 	const themeClasses =
// 		resume.websiteTheme === "dark"
// 			? "bg-gray-900 text-white"
// 			: resume.websiteTheme === "modern"
// 			? "bg-gradient-to-br from-cyan-500 to-blue-700 text-white"
// 			: resume.websiteTheme === "classic"
// 			? "bg-gray-100 text-gray-800"
// 			: "bg-white text-gray-900";

// 	return (
// 		<div className={`min-h-screen ${themeClasses}`}>
// 			{/* Navbar */}
// 			<header className="fixed top-0 left-0 w-full z-50">
// 				<Navbar />
// 			</header>

// 			{/* Content */}
// 			<div className="max-w-4xl mx-auto mt-20 mb-10 p-8 rounded-2xl shadow-lg bg-opacity-90 backdrop-blur-lg">
// 				{/* Header */}
// 				<div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
// 					{resume.profilePic && (
// 						<img
// 							src={resume.profilePic}
// 							alt="Profile"
// 							className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400 mb-4 md:mb-0"
// 						/>
// 					)}
// 					<div>
// 						<h1 className="text-3xl font-bold">{resume.name}</h1>
// 						<p className="mt-2 text-lg opacity-80">{resume.bio}</p>
// 						<div className="mt-3 space-y-1 text-sm">
// 							<p>📧 {resume.email}</p>
// 							<p>📞 {resume.phone}</p>
// 							<p>📍 {resume.address}</p>
// 						</div>
// 					</div>
// 				</div>

// 				<hr className="my-6 border-gray-400 opacity-50" />

// 				{/* Skills */}
// 				<section>
// 					<h2 className="text-2xl font-semibold mb-2">Skills</h2>
// 					<div className="flex flex-wrap gap-2">
// 						{resume.skills.map((skill, i) => (
// 							<span
// 								key={i}
// 								className="px-3 py-1 bg-cyan-500 dark:bg-cyan-400 text-white rounded-full text-sm shadow"
// 							>
// 								{skill}
// 							</span>
// 						))}
// 					</div>
// 				</section>

// 				{/* Education */}
// 				<section className="mt-8">
// 					<h2 className="text-2xl font-semibold mb-2">Education</h2>
// 					<div className="space-y-3">
// 						{resume.education.map((edu, i) => (
// 							<div key={i}>
// 								<p className="font-semibold">{edu.degree}</p>
// 								<p className="text-sm opacity-80">{edu.institution}</p>
// 								<p className="text-xs opacity-70">{edu.year}</p>
// 							</div>
// 						))}
// 					</div>
// 				</section>

// 				{/* Work Experience */}
// 				<section className="mt-8">
// 					<h2 className="text-2xl font-semibold mb-2">Work Experience</h2>
// 					<div className="space-y-3">
// 						{resume.workExperience.map((work, i) => (
// 							<div key={i}>
// 								<p className="font-semibold">{work.role}</p>
// 								<p className="text-sm opacity-80">{work.company}</p>
// 								<p className="text-xs opacity-70">{work.duration}</p>
// 							</div>
// 						))}
// 					</div>
// 				</section>

// 				{/* Projects */}
// 				<section className="mt-8">
// 					<h2 className="text-2xl font-semibold mb-2">Projects</h2>
// 					<div className="space-y-3">
// 						{resume.projects.map((proj, i) => (
// 							<div key={i}>
// 								<p className="font-semibold">{proj.name}</p>
// 								<p className="text-sm opacity-80">{proj.description}</p>
// 								{proj.link && (
// 									<a
// 										href={proj.link}
// 										target="_blank"
// 										className="text-cyan-400 hover:underline text-sm"
// 									>
// 										View Project
// 									</a>
// 								)}
// 							</div>
// 						))}
// 					</div>
// 				</section>

// 				{/* Languages */}
// 				<section className="mt-8">
// 					<h2 className="text-2xl font-semibold mb-2">Languages</h2>
// 					<p>{resume.languages.join(", ")}</p>
// 				</section>

// 				{/* Links */}
// 				<section className="mt-8">
// 					<h2 className="text-2xl font-semibold mb-2">Social Links</h2>
// 					<div className="flex gap-4">
// 						{resume.linkedin && (
// 							<a
// 								href={resume.linkedin}
// 								target="_blank"
// 								className="text-cyan-400 hover:underline"
// 							>
// 								LinkedIn
// 							</a>
// 						)}
// 						{resume.github && (
// 							<a
// 								href={resume.github}
// 								target="_blank"
// 								className="text-cyan-400 hover:underline"
// 							>
// 								GitHub
// 							</a>
// 						)}
// 					</div>
// 				</section>

// 				{/* Edit Button */}
// 				<div className="mt-10 text-center">
// 					<button
// 						onClick={onEdit}
// 						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:shadow-[0_0_15px_#00f7ff] transition-all"
// 					>
// 						Edit Resume
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// }
import Navbar from "@/home/Navbar";
import type { Resume } from "../../types/Resume";

interface Props {
	resume: Resume;
	onEdit: () => void;
}

export default function ResumePreview({ resume, onEdit }: Props) {
	return (
		<div
			className={`min-h-screen ${
				resume.websiteTheme === "light"
					? "bg-white text-gray-900"
					: "bg-gray-900 text-white"
			}`}
		>
			{/* Navbar */}
			<header className="fixed top-0 left-0 w-full z-50">
				<Navbar />
			</header>

			{/* Main Content */}
			<div className="max-w-4xl mx-auto mt-20 mb-16 p-8 bg-opacity-95 rounded-2xl shadow-lg">
				{/* Header Section */}
				<div className="flex flex-col md:flex-row items-center md:items-start md:space-x-6">
					{resume.profilePic && (
						<img
							src={resume.profilePic}
							alt="Profile"
							className="w-32 h-32 rounded-full object-cover border-4 border-cyan-400 mb-4 md:mb-0"
						/>
					)}
					<div>
						<h1 className="text-3xl font-bold">{resume.name}</h1>
						<p className="mt-2 text-lg opacity-80">{resume.bio}</p>
						<div className="mt-3 space-y-1 text-sm">
							<p>📧 {resume.email}</p>
							<p>📞 {resume.phone}</p>
							<p>📍 {resume.address}</p>
							<div className="flex gap-4 mt-2">
								{resume.linkedin && (
									<a
										href={resume.linkedin}
										target="_blank"
										className="text-cyan-500 hover:underline"
									>
										LinkedIn
									</a>
								)}
								{resume.github && (
									<a
										href={resume.github}
										target="_blank"
										className="text-cyan-500 hover:underline"
									>
										GitHub
									</a>
								)}
							</div>
						</div>
					</div>
				</div>

				<hr className="my-6 border-gray-400 opacity-50" />

				{/* ABOUT */}
				{resume.about && (
					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-2 border-b border-cyan-400 pb-1">
							About
						</h2>
						<p className="mt-2 leading-relaxed opacity-90">{resume.about}</p>
					</section>
				)}

				{/* SKILLS */}
				{resume.skills.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-2 border-b border-cyan-400 pb-1">
							Skills
						</h2>
						<div className="flex flex-wrap gap-2 mt-2">
							{resume.skills.map((skill, i) => (
								<span
									key={i}
									className="px-3 py-1 bg-cyan-500 text-white rounded-full text-sm shadow-sm dark:bg-cyan-400"
								>
									{skill}
								</span>
							))}
						</div>
					</section>
				)}

				{/* EDUCATION */}
				{resume.education.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-2 border-b border-cyan-400 pb-1">
							Education
						</h2>
						<div className="space-y-4 mt-3">
							{resume.education.map((edu, i) => (
								<div key={i}>
									<p className="font-semibold">{edu.degree}</p>
									<p className="text-sm opacity-90">
										{edu.program} • {edu.institution}
									</p>
									<p className="text-xs opacity-70">{edu.duration}</p>
								</div>
							))}
						</div>
					</section>
				)}

				{/* WORK EXPERIENCE */}
				{resume.workExperience.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-2 border-b border-cyan-400 pb-1">
							Work Experience
						</h2>
						<div className="space-y-4 mt-3">
							{resume.workExperience.map((work, i) => (
								<div key={i}>
									<p className="font-semibold">
										{work.position} - {work.title}
									</p>
									<p className="text-sm opacity-90">{work.company}</p>
									<p className="text-xs opacity-70 mb-1">{work.duration}</p>
									{work.responsibilities &&
										work.responsibilities.length > 0 && (
											<ul className="list-disc ml-6 text-sm opacity-90">
												{work.responsibilities.map((r, j) => (
													<li key={j}>{r}</li>
												))}
											</ul>
										)}
								</div>
							))}
						</div>
					</section>
				)}

				{/* PROJECTS */}
				{resume.projects.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-2 border-b border-cyan-400 pb-1">
							Projects
						</h2>
						<div className="space-y-4 mt-3">
							{resume.projects.map((proj, i) => (
								<div key={i}>
									<p className="font-semibold">{proj.title}</p>
									<p className="text-sm opacity-90">{proj.description}</p>
									<p className="text-xs opacity-70">{proj.duration}</p>
								</div>
							))}
						</div>
					</section>
				)}

				{/* LANGUAGES */}
				{resume.languages.length > 0 && (
					<section className="mb-8">
						<h2 className="text-2xl font-semibold mb-2 border-b border-cyan-400 pb-1">
							Languages
						</h2>
						<p className="mt-2 opacity-90">{resume.languages.join(", ")}</p>
					</section>
				)}

				{/* Edit Button */}
				<div className="text-center mt-10">
					<button
						onClick={onEdit}
						className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:shadow-[0_0_15px_#00f7ff] transition-all"
					>
						Edit Resume
					</button>
				</div>
			</div>
		</div>
	);
}
