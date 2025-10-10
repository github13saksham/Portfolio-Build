// // import { useState } from "react";
// // import type { Resume } from "../../types/Resume";
// // import Navbar from "@/home/Navbar";

// // interface Props {
// // 	onSave: (resume: Resume) => void;
// // }

// // export default function ResumeForm({ onSave }: Props) {
// // 	const [resume, setResume] = useState<Resume>({
// // 		id: Date.now(),
// // 		name: "",
// // 		bio: "",
// // 		email: "",
// // 		phone: "",
// // 		address: "",
// // 		skills: [],
// // 		education: [],
// // 		workExperience: [],
// // 		projects: [],
// // 		websiteTheme: "light",
// // 		linkedin: "",
// // 		github: "",
// // 		profilePic: "",
// // 		languages: [],
// // 	});

// // 	const handleChange = (field: keyof Resume, value: any) => {
// // 		setResume((prev) => ({ ...prev, [field]: value }));
// // 	};

// // 	return (
// // 		<div className="max-h-full  bg-gray-90  dark:text-white ">
// // 			{/* ✅ Navbar always on top */}
// // 			<header className="fixed top-0 left-0 w-full z-50">
// // 				<Navbar />
// // 			</header>

// // 			{/* ✅ Resume form below */}
// // 			<div className="max-w-3xl mx-auto mt-12 p-8 bg-white  dark:bg-gray-900 rounded-2xl shadow-md">
// // 				<form
// // 					onSubmit={(e) => {
// // 						e.preventDefault();
// // 						onSave(resume);
// // 					}}
// // 				>
// // 					<h3 className="text-2xl font-semibold mb-4">Personal Info</h3>
// // 					<input
// // 						placeholder="Full Name"
// // 						value={resume.name}
// // 						onChange={(e) => handleChange("name", e.target.value)}
// // 						className="w-full mb-4 p-2 border rounded dark:bg-gray-800 dark:border-cyan-400"
// // 					/>
// // 					<textarea
// // 						placeholder="Short Bio"
// // 						value={resume.bio}
// // 						onChange={(e) => handleChange("bio", e.target.value)}
// // 						className="w-full mb-4 p-2 border rounded dark:bg-gray-800 dark:border-cyan-400"
// // 					/>
// // 					<input
// // 						placeholder="Email"
// // 						value={resume.email}
// // 						onChange={(e) => handleChange("email", e.target.value)}
// // 						className="w-full mb-4 p-2 border rounded dark:bg-gray-800 dark:border-cyan-400"
// // 					/>
// // 					<input
// // 						placeholder="Phone"
// // 						value={resume.phone}
// // 						onChange={(e) => handleChange("phone", e.target.value)}
// // 						className="w-full mb-4 p-2 border rounded dark:bg-gray-800 dark:border-cyan-400"
// // 					/>
// // 					<input
// // 						placeholder="Address"
// // 						value={resume.address}
// // 						onChange={(e) => handleChange("address", e.target.value)}
// // 						className="w-full mb-4 p-2 border rounded dark:bg-gray-800 dark:border-cyan-400"
// // 					/>

// // 					<h3 className="text-2xl font-semibold mt-6 mb-4">Skills</h3>
// // 					<input
// // 						placeholder="Comma separated skills"
// // 						onChange={(e) =>
// // 							handleChange(
// // 								"skills",
// // 								e.target.value.split(",").map((s) => s.trim())
// // 							)
// // 						}
// // 						className="w-full mb-6 p-2 border rounded dark:bg-gray-800 dark:border-cyan-400"
// // 					/>

// // 					<button
// // 						type="submit"
// // 						className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:shadow-[0_0_15px_#00f7ff] transition-all"
// // 					>
// // 						Preview Resume Website
// // 					</button>
// // 				</form>
// // 			</div>
// // 		</div>
// // 	);
// // }
// import { useState } from "react";
// import type { Resume } from "../../types/Resume";
// import Navbar from "@/home/Navbar";

// interface Props {
// 	onSave: (resume: Resume) => void;
// }

// export default function ResumeForm({ onSave }: Props) {
// 	const [resume, setResume] = useState<Resume>({
// 		id: Date.now(),
// 		name: "",
// 		bio: "",
// 		email: "",
// 		phone: "",
// 		address: "",
// 		skills: [],
// 		education: [],
// 		workExperience: [],
// 		projects: [],
// 		websiteTheme: "light",
// 		linkedin: "",
// 		github: "",
// 		profilePic: "",
// 		languages: [],
// 	});

// 	const handleChange = (field: keyof Resume, value: any) => {
// 		setResume((prev) => ({ ...prev, [field]: value }));
// 	};

// 	const handleArrayChange = (
// 		field: keyof Resume,
// 		index: number,
// 		key: string,
// 		value: any
// 	) => {
// 		setResume((prev) => {
// 			const updated = [...(prev[field] as any[])];
// 			updated[index] = { ...updated[index], [key]: value };
// 			return { ...prev, [field]: updated };
// 		});
// 	};

// 	const addField = (field: keyof Resume, template: any) => {
// 		setResume((prev) => ({
// 			...prev,
// 			[field]: [...(prev[field] as any[]), template],
// 		}));
// 	};

// 	return (
// 		<div className="min-h-screen bg-gray-90 dark:bg-gray-900 dark:text-white">
// 			{/* ✅ Navbar fixed */}
// 			<header className="fixed top-0 left-0 w-full z-50">
// 				<Navbar />
// 			</header>

// 			{/* ✅ Form Container */}
// 			<div className="max-w-4xl mx-auto mt-20 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-md mb-10">
// 				<form
// 					onSubmit={(e) => {
// 						e.preventDefault();
// 						onSave(resume);
// 					}}
// 				>
// 					{/* PERSONAL INFO */}
// 					<h2 className="text-3xl font-semibold mb-6">Personal Information</h2>
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 						<input
// 							placeholder="Full Name"
// 							value={resume.name}
// 							onChange={(e) => handleChange("name", e.target.value)}
// 							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 						/>
// 						<input
// 							placeholder="Email"
// 							value={resume.email}
// 							onChange={(e) => handleChange("email", e.target.value)}
// 							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 						/>
// 						<input
// 							placeholder="Phone"
// 							value={resume.phone}
// 							onChange={(e) => handleChange("phone", e.target.value)}
// 							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 						/>
// 						<input
// 							placeholder="Address"
// 							value={resume.address}
// 							onChange={(e) => handleChange("address", e.target.value)}
// 							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 						/>
// 					</div>

// 					<textarea
// 						placeholder="Short Bio"
// 						value={resume.bio}
// 						onChange={(e) => handleChange("bio", e.target.value)}
// 						className="w-full mt-4 p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 					/>

// 					{/* SOCIAL LINKS */}
// 					<h3 className="text-2xl font-semibold mt-8 mb-4">Social Links</h3>
// 					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// 						<input
// 							placeholder="LinkedIn URL"
// 							value={resume.linkedin}
// 							onChange={(e) => handleChange("linkedin", e.target.value)}
// 							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 						/>
// 						<input
// 							placeholder="GitHub URL"
// 							value={resume.github}
// 							onChange={(e) => handleChange("github", e.target.value)}
// 							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 						/>
// 					</div>

// 					{/* PROFILE PICTURE */}
// 					<h3 className="text-2xl font-semibold mt-8 mb-4">Profile Picture</h3>
// 					<input
// 						type="file"
// 						accept="image/*"
// 						onChange={(e) => {
// 							const file = e.target.files?.[0];
// 							if (file) {
// 								const reader = new FileReader();
// 								reader.onloadend = () =>
// 									handleChange("profilePic", reader.result);
// 								reader.readAsDataURL(file);
// 							}
// 						}}
// 						className="w-full p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 					/>
// 					{resume.profilePic && (
// 						<img
// 							src={resume.profilePic}
// 							alt="Profile"
// 							className="mt-4 w-24 h-24 rounded-full object-cover border-2 border-cyan-400"
// 						/>
// 					)}

// 					{/* SKILLS */}
// 					<h3 className="text-2xl font-semibold mt-8 mb-4">Skills</h3>
// 					<input
// 						placeholder="Comma separated skills"
// 						onChange={(e) =>
// 							handleChange(
// 								"skills",
// 								e.target.value.split(",").map((s) => s.trim())
// 							)
// 						}
// 						className="w-full p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 					/>

// 					{/* EDUCATION */}
// 					<h3 className="text-2xl font-semibold mt-8 mb-4">Education</h3>
// 					{resume.education.map((edu, i) => (
// 						<div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// 							<input
// 								placeholder="Institution"
// 								value={edu.institution || ""}
// 								onChange={(e) =>
// 									handleArrayChange(
// 										"education",
// 										i,
// 										"institution",
// 										e.target.value
// 									)
// 								}
// 								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 							/>
// 							<input
// 								placeholder="Degree"
// 								value={edu.degree || ""}
// 								onChange={(e) =>
// 									handleArrayChange("education", i, "degree", e.target.value)
// 								}
// 								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 							/>
// 							<input
// 								placeholder="Year"
// 								value={edu.year || ""}
// 								onChange={(e) =>
// 									handleArrayChange("education", i, "year", e.target.value)
// 								}
// 								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 							/>
// 						</div>
// 					))}
// 					<button
// 						type="button"
// 						onClick={() =>
// 							addField("education", { institution: "", degree: "", year: "" })
// 						}
// 						className="px-4 py-2 bg-cyan-500 rounded shadow hover:bg-cyan-400 transition"
// 					>
// 						Add Education
// 					</button>

// 					{/* WORK EXPERIENCE */}
// 					<h3 className="text-2xl font-semibold mt-8 mb-4">Work Experience</h3>
// 					{resume.workExperience.map((work, i) => (
// 						<div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// 							<input
// 								placeholder="Company"
// 								value={work.company || ""}
// 								onChange={(e) =>
// 									handleArrayChange(
// 										"workExperience",
// 										i,
// 										"company",
// 										e.target.value
// 									)
// 								}
// 								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 							/>
// 							<input
// 								placeholder="Role"
// 								value={work.role || ""}
// 								onChange={(e) =>
// 									handleArrayChange("workExperience", i, "role", e.target.value)
// 								}
// 								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 							/>
// 							<input
// 								placeholder="Duration"
// 								value={work.duration || ""}
// 								onChange={(e) =>
// 									handleArrayChange(
// 										"workExperience",
// 										i,
// 										"duration",
// 										e.target.value
// 									)
// 								}
// 								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 							/>
// 						</div>
// 					))}
// 					<button
// 						type="button"
// 						onClick={() =>
// 							addField("workExperience", {
// 								company: "",
// 								role: "",
// 								duration: "",
// 							})
// 						}
// 						className="px-4 py-2 bg-cyan-500 rounded shadow hover:bg-cyan-400 transition"
// 					>
// 						Add Work
// 					</button>

// 					{/* PROJECTS */}
// 					<h3 className="text-2xl font-semibold mt-8 mb-4">Projects</h3>
// 					{resume.projects.map((proj, i) => (
// 						<div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
// 							<input
// 								placeholder="Project Name"
// 								value={proj.name || ""}
// 								onChange={(e) =>
// 									handleArrayChange("projects", i, "name", e.target.value)
// 								}
// 								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 							/>
// 							<input
// 								placeholder="Description"
// 								value={proj.description || ""}
// 								onChange={(e) =>
// 									handleArrayChange(
// 										"projects",
// 										i,
// 										"description",
// 										e.target.value
// 									)
// 								}
// 								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 							/>
// 							<input
// 								placeholder="Link"
// 								value={proj.link || ""}
// 								onChange={(e) =>
// 									handleArrayChange("projects", i, "link", e.target.value)
// 								}
// 								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 							/>
// 						</div>
// 					))}
// 					<button
// 						type="button"
// 						onClick={() =>
// 							addField("projects", { name: "", description: "", link: "" })
// 						}
// 						className="px-4 py-2 bg-cyan-500 rounded shadow hover:bg-cyan-400 transition"
// 					>
// 						Add Project
// 					</button>

// 					{/* LANGUAGES */}
// 					<h3 className="text-2xl font-semibold mt-8 mb-4">Languages</h3>
// 					<input
// 						placeholder="Comma separated languages"
// 						onChange={(e) =>
// 							handleChange(
// 								"languages",
// 								e.target.value.split(",").map((s) => s.trim())
// 							)
// 						}
// 						className="w-full p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 					/>

// 					{/* THEME SELECTION */}
// 					<h3 className="text-2xl font-semibold mt-8 mb-4">Website Theme</h3>
// 					<select
// 						value={resume.websiteTheme}
// 						onChange={(e) => handleChange("websiteTheme", e.target.value)}
// 						className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
// 					>
// 						<option value="light">Light</option>
// 						<option value="dark">Dark</option>
// 						<option value="modern">Modern</option>
// 						<option value="classic">Classic</option>
// 					</select>

// 					{/* SUBMIT BUTTON */}
// 					<button
// 						type="submit"
// 						className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:shadow-[0_0_15px_#00f7ff] transition-all"
// 					>
// 						Preview Resume Website
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// }
import { useState } from "react";
import type { Resume } from "../../types/Resume";
import Navbar from "@/home/Navbar";

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

	return (
		<div className="min-h-screen max-w-full  bg-gray-90 dark:bg-gray-900 dark:text-white">
			<header className="fixed top-0 left-0 w-full z-50">
				<Navbar />
			</header>

			<div className="max-w-4xl mx-auto mt-20 p-8 ml-50 bg-white dark:bg-gray-800 rounded-2xl shadow-md mb-10">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						onSave(resume);
					}}
				>
					{/* PERSONAL INFO */}
					<h2 className="text-3xl font-semibold mb-6">Personal Information</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input
							placeholder="Full Name"
							value={resume.name}
							onChange={(e) => handleChange("name", e.target.value)}
							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
						/>
						<input
							placeholder="Email"
							value={resume.email}
							onChange={(e) => handleChange("email", e.target.value)}
							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
						/>
						<input
							placeholder="Phone"
							value={resume.phone}
							onChange={(e) => handleChange("phone", e.target.value)}
							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
						/>
						<input
							placeholder="Address"
							value={resume.address}
							onChange={(e) => handleChange("address", e.target.value)}
							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
						/>
					</div>

					<textarea
						placeholder="Short Bio"
						value={resume.bio}
						onChange={(e) => handleChange("bio", e.target.value)}
						className="w-full mt-4 p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
					/>

					<textarea
						placeholder="About You (detailed)"
						value={resume.about}
						onChange={(e) => handleChange("about", e.target.value)}
						className="w-full mt-4 p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
					/>

					{/* SOCIAL LINKS */}
					<h3 className="text-2xl font-semibold mt-8 mb-4">Social Links</h3>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input
							placeholder="LinkedIn URL"
							value={resume.linkedin}
							onChange={(e) => handleChange("linkedin", e.target.value)}
							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
						/>
						<input
							placeholder="GitHub URL"
							value={resume.github}
							onChange={(e) => handleChange("github", e.target.value)}
							className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
						/>
					</div>

					{/* PROFILE PICTURE */}
					<h3 className="text-2xl font-semibold mt-8 mb-4">Profile Picture</h3>
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
						className="w-full p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
					/>
					{resume.profilePic && (
						<img
							src={resume.profilePic}
							alt="Profile"
							className="mt-4 w-24 h-24 rounded-full object-cover border-2 border-cyan-400"
						/>
					)}

					{/* SKILLS */}
					<h3 className="text-2xl font-semibold mt-8 mb-4">Skills</h3>
					<input
						placeholder="Comma separated skills"
						onChange={(e) =>
							handleChange(
								"skills",
								e.target.value.split(",").map((s) => s.trim())
							)
						}
						className="w-full p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
					/>

					{/* EDUCATION */}
					<h3 className="text-2xl font-semibold mt-8 mb-4">Education</h3>
					{resume.education.map((edu, i) => (
						<div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
							<input
								placeholder="Degree"
								value={edu.degree as string}
								onChange={(e) =>
									handleArrayChange("education", i, "degree", e.target.value)
								}
								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
							/>
							<input
								placeholder="Institution"
								value={edu.institution}
								onChange={(e) =>
									handleArrayChange(
										"education",
										i,
										"institution",
										e.target.value
									)
								}
								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
							/>
							<input
								placeholder="Program"
								value={edu.program}
								onChange={(e) =>
									handleArrayChange("education", i, "program", e.target.value)
								}
								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
							/>
							<input
								placeholder="Duration"
								value={edu.duration}
								onChange={(e) =>
									handleArrayChange("education", i, "duration", e.target.value)
								}
								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
							/>
						</div>
					))}
					<button
						type="button"
						onClick={() =>
							addField("education", {
								degree: "",
								institution: "",
								program: "",
								duration: "",
							})
						}
						className="px-4 py-2 bg-cyan-500 rounded shadow hover:bg-cyan-400 transition"
					>
						Add Education
					</button>

					{/* WORK EXPERIENCE */}
					<h3 className="text-2xl font-semibold mt-8 mb-4">Work Experience</h3>
					{resume.workExperience.map((work, i) => (
						<div key={i} className="space-y-2 mb-4">
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<input
									placeholder="Position"
									value={work.position as string}
									onChange={(e) =>
										handleArrayChange(
											"workExperience",
											i,
											"position",
											e.target.value
										)
									}
									className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
								/>
								<input
									placeholder="Company"
									value={work.company}
									onChange={(e) =>
										handleArrayChange(
											"workExperience",
											i,
											"company",
											e.target.value
										)
									}
									className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
								/>
								<input
									placeholder="Title"
									value={work.title}
									onChange={(e) =>
										handleArrayChange(
											"workExperience",
											i,
											"title",
											e.target.value
										)
									}
									className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
								/>
								<input
									placeholder="Duration"
									value={work.duration}
									onChange={(e) =>
										handleArrayChange(
											"workExperience",
											i,
											"duration",
											e.target.value
										)
									}
									className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
								/>
							</div>
							<textarea
								placeholder="Responsibilities (comma separated)"
								onChange={(e) =>
									handleArrayChange(
										"workExperience",
										i,
										"responsibilities",
										e.target.value.split(",").map((r) => r.trim())
									)
								}
								className="w-full p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
							/>
						</div>
					))}
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
						className="px-4 py-2 bg-cyan-500 rounded shadow hover:bg-cyan-400 transition"
					>
						Add Work Experience
					</button>

					{/* PROJECTS */}
					<h3 className="text-2xl font-semibold mt-8 mb-4">Projects</h3>
					{resume.projects.map((proj, i) => (
						<div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
							<input
								placeholder="Title"
								value={proj.title}
								onChange={(e) =>
									handleArrayChange("projects", i, "title", e.target.value)
								}
								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
							/>
							<input
								placeholder="Duration"
								value={proj.duration}
								onChange={(e) =>
									handleArrayChange("projects", i, "duration", e.target.value)
								}
								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
							/>
							<textarea
								placeholder="Description"
								value={proj.description}
								onChange={(e) =>
									handleArrayChange(
										"projects",
										i,
										"description",
										e.target.value
									)
								}
								className="p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
							/>
						</div>
					))}
					<button
						type="button"
						onClick={() =>
							addField("projects", { title: "", duration: "", description: "" })
						}
						className="px-4 py-2 bg-cyan-500 rounded shadow hover:bg-cyan-400 transition"
					>
						Add Project
					</button>

					{/* LANGUAGES */}
					<h3 className="text-2xl font-semibold mt-8 mb-4">Languages</h3>
					<input
						placeholder="Comma separated languages"
						onChange={(e) =>
							handleChange(
								"languages",
								e.target.value.split(",").map((s) => s.trim())
							)
						}
						className="w-full p-2 border rounded dark:bg-gray-700 dark:border-cyan-400"
					/>

					{/* SUBMIT */}
					<button
						type="submit"
						className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md dark:bg-cyan-500 dark:hover:bg-cyan-400 dark:shadow-[0_0_15px_#00f7ff] transition-all"
					>
						Preview Resume
					</button>
				</form>
			</div>
		</div>
	);
}
