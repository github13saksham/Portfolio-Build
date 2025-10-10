// Navigation buttons
function applyBackground(isDark) {
	document.body.style.transition = "background 0.45s ease";
	document.body.style.background = isDark
		? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
		: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
	// Debug log inside iframe
	console.log("[Iframe] applyBackground ->", isDark);
}

// Listen for messages from parent
window.addEventListener("message", (event) => {
	if (!event?.data?.type) return;
	if (event.data.type === "SET_THEME") {
		applyBackground(Boolean(event.data.darkMode));
	}
	if (event.data.type === "LOAD_EDIT_DATA") {
		populateForm(event.data.resume);
		document.getElementById("builderPage").classList.remove("hidden");
		document.getElementById("myResumePage").classList.add("hidden");
	}
});

// When iframe DOM is ready, notify parent that iframe is ready to receive theme
window.addEventListener("DOMContentLoaded", () => {
	// Fallback: if this iframe has its own saved theme, apply it first (optional)
	try {
		const saved = localStorage.getItem("theme");
		if (saved === "dark" || saved === "light") {
			applyBackground(saved === "dark");
		}
	} catch (err) {
		// ignore storage errors
	}

	// Tell parent we're ready — parent will send the authoritative theme immediately
	if (window.parent) {
		console.log("[Iframe] sending IFRAME_READY to parent");
		window.parent.postMessage({ type: "IFRAME_READY" }, "*");
	}
});
document.getElementById("myResumeBtn").addEventListener("click", () => {
	document.getElementById("builderPage").classList.add("hidden");
	document.getElementById("myResumePage").classList.remove("hidden");
	loadResumes();
});

// Dynamic form section handlers
document.getElementById("addEducationBtn").addEventListener("click", () => {
	const container = document.getElementById("educationContainer");
	const newEntry = container.children[0].cloneNode(true);
	newEntry.querySelectorAll("input").forEach((input) => (input.value = ""));
	container.appendChild(newEntry);
});

document
	.getElementById("addWorkExperienceBtn")
	.addEventListener("click", () => {
		const container = document.getElementById("workExperienceContainer");
		const newEntry = container.children[0].cloneNode(true);
		newEntry
			.querySelectorAll("input, textarea")
			.forEach((input) => (input.value = ""));
		container.appendChild(newEntry);
	});

document.getElementById("addProjectBtn").addEventListener("click", () => {
	const container = document.getElementById("projectsContainer");
	const newEntry = container.children[0].cloneNode(true);
	newEntry
		.querySelectorAll("input, textarea")
		.forEach((input) => (input.value = ""));
	container.appendChild(newEntry);
});

// Skills with recommendations
const skillsInput = document.getElementById("skillsInput");
const skillsContainer = document.getElementById("skillsContainer");
const skillSuggestions = document.getElementById("skillSuggestions");
let selectedSkills = [];
const allSkills = [
	"JavaScript",
	"Python",
	"Java",
	"React",
	"Angular",
	"Vue.js",
	"Node.js",
	"HTML",
	"CSS",
	"Sass",
	"Tailwind CSS",
	"Bootstrap",
	"Git",
	"GitHub",
	"SQL",
	"NoSQL",
	"MongoDB",
	"PostgreSQL",
	"Express.js",
	"Django",
	"Flask",
	"REST APIs",
	"GraphQL",
	"AWS",
	"Azure",
	"Docker",
	"Kubernetes",
	"CI/CD",
	"Agile",
	"Scrum",
	"Project Management",
	"Communication",
	"Problem-solving",
	"Teamwork",
	"Data Analysis",
	"Machine Learning",
	"AI",
	"UI/UX Design",
];

skillsInput.addEventListener("input", () => {
	const query = skillsInput.value.toLowerCase();
	skillSuggestions.innerHTML = "";
	if (query.length > 0) {
		const matches = allSkills.filter(
			(skill) =>
				skill.toLowerCase().includes(query) && !selectedSkills.includes(skill)
		);
		matches.forEach((skill) => {
			const div = document.createElement("div");
			div.textContent = skill;
			div.addEventListener("click", () => {
				addSkill(skill);
				skillsInput.value = "";
				skillSuggestions.innerHTML = "";
			});
			skillSuggestions.appendChild(div);
		});
	}
});

function addSkill(skill) {
	if (!selectedSkills.includes(skill)) {
		selectedSkills.push(skill);
		const span = document.createElement("span");
		span.textContent = skill;
		span.classList.add("skill-tag");

		const removeButton = document.createElement("span");
		removeButton.textContent = "×";
		removeButton.style.cursor = "pointer";
		removeButton.style.marginLeft = "5px";
		removeButton.onclick = () => {
			selectedSkills = selectedSkills.filter((s) => s !== skill);
			span.remove();
		};
		span.appendChild(removeButton);

		skillsContainer.appendChild(span);
	}
}

// Languages with recommendations
const languagesInput = document.getElementById("languagesInput");
const languagesContainer = document.getElementById("languagesContainer");
const languageSuggestions = document.getElementById("languageSuggestions");
let selectedLanguages = [];
const allLanguages = [
	"English",
	"Spanish",
	"French",
	"German",
	"Mandarin",
	"Hindi",
	"Arabic",
	"Russian",
	"Japanese",
	"Korean",
	"Portuguese",
	"Italian",
];

languagesInput.addEventListener("input", () => {
	const query = languagesInput.value.toLowerCase();
	languageSuggestions.innerHTML = "";
	if (query.length > 0) {
		const matches = allLanguages.filter(
			(lang) =>
				lang.toLowerCase().includes(query) && !selectedLanguages.includes(lang)
		);
		matches.forEach((lang) => {
			const div = document.createElement("div");
			div.textContent = lang;
			div.addEventListener("click", () => {
				addLanguage(lang);
				languagesInput.value = "";
				languageSuggestions.innerHTML = "";
			});
			languageSuggestions.appendChild(div);
		});
	}
});

function addLanguage(lang) {
	if (!selectedLanguages.includes(lang)) {
		selectedLanguages.push(lang);
		const span = document.createElement("span");
		span.textContent = lang;
		span.classList.add("skill-tag");

		const removeButton = document.createElement("span");
		removeButton.textContent = "×";
		removeButton.style.cursor = "pointer";
		removeButton.style.marginLeft = "5px";
		removeButton.onclick = () => {
			selectedLanguages = selectedLanguages.filter((l) => l !== lang);
			span.remove();
		};
		span.appendChild(removeButton);

		languagesContainer.appendChild(span);
	}
}

// Save a new resume
function saveNewResume(data) {
	let resumes = JSON.parse(localStorage.getItem("resumes")) || [];
	const newResume = {
		id: Date.now(), // Unique ID for each resume
		...data,
	};
	resumes.push(newResume);
	localStorage.setItem("resumes", JSON.stringify(resumes));
	alert("Resume saved successfully!");
}

// Load and display all resumes
function loadResumes() {
	const resumesContainer = document.getElementById("resumesContainer");
	resumesContainer.innerHTML = "";
	const resumes = JSON.parse(localStorage.getItem("resumes")) || [];

	if (resumes.length === 0) {
		resumesContainer.innerHTML =
			'<p>No resumes saved yet. Start building one on the "Build Resume" page!</p>';
		return;
	}

	resumes.forEach((resume) => {
		const card = document.createElement("div");
		card.classList.add("resume-card");
		card.dataset.id = resume.id;
		card.innerHTML = `
            <div class="resume-card-header">
                <img src="${
									resume.profilePic || "https://via.placeholder.com/50"
								}" alt="Profile Picture">
                <h4>${resume.name || "Untitled Resume"}</h4>
            </div>
            <div class="resume-card-body">
                <p>${resume.bio || "No summary provided."}</p>
            </div>
            <div class="resume-card-actions">
                <button class="view-btn">View</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
		resumesContainer.appendChild(card);
	});

	// Add event listeners to new buttons
	document.querySelectorAll(".view-btn").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const id = e.target.closest(".resume-card").dataset.id;
			const resume = resumes.find((r) => r.id == id);
			if (resume) {
				openPreviewModal(resume);
			}
		});
	});

	document.querySelectorAll(".edit-btn").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const id = e.target.closest(".resume-card").dataset.id;
			const resume = resumes.find((r) => r.id == id);
			if (resume) {
				populateForm(resume);
				document.getElementById("builderPage").classList.remove("hidden");
				document.getElementById("myResumePage").classList.add("hidden");
			}
		});
	});

	document.querySelectorAll(".delete-btn").forEach((btn) => {
		btn.addEventListener("click", (e) => {
			const id = e.target.closest(".resume-card").dataset.id;
			if (confirm("Are you sure you want to delete this resume?")) {
				deleteResume(id);
			}
		});
	});
}

function deleteResume(id) {
	let resumes = JSON.parse(localStorage.getItem("resumes")) || [];
	resumes = resumes.filter((r) => r.id != id);
	localStorage.setItem("resumes", JSON.stringify(resumes));
	loadResumes();
}

// Function to clear the form
function clearForm() {
	const form = document.getElementById("portfolioForm");
	form.reset();
	selectedSkills = [];
	selectedLanguages = [];
	document.getElementById("skillsContainer").innerHTML = "";
	document.getElementById("languagesContainer").innerHTML = "";
	document.getElementById(
		"workExperienceContainer"
	).innerHTML = `<div class="work-entry"><label>Company</label><input type="text" class="workCompany" /><label>Job Title</label><input type="text" class="workTitle" /><label>Duration (e.g., Jan 2023 - Present)</label><input type="text" class="workDuration" /><label>Responsibilities (comma separated)</label><textarea class="workResponsibilities" rows="3"></textarea></div>`;
	document.getElementById(
		"projectsContainer"
	).innerHTML = `<div class="project-entry"><label>Project Title</label><input type="text" class="projectTitle" /><label>Project Duration</label><input type="text" class="projectDuration" /><label>Project Description</label><textarea class="projectDescription" rows="3"></textarea></div>`;
	document.getElementById(
		"educationContainer"
	).innerHTML = `<div class="education-entry"><label>Institution Name</label><input type="text" class="educationInstitution" /><label>Program/Degree</label><input type="text" class="educationProgram" /><label>Duration</label><input type="text" class="educationDuration" /></div>`;
	document.getElementById("portfolio").classList.add("hidden");
	document.getElementById("downloadBtn").classList.add("hidden");
}

// Save Resume button handler
document.getElementById("saveResumeBtn").addEventListener("click", () => {
	const picInput = document.getElementById("profilePic");
	if (picInput.files[0]) {
		const reader = new FileReader();
		reader.onload = function (e) {
			const data = {
				name: document.getElementById("fullName").value,
				bio: document.getElementById("bio").value,
				email: document.getElementById("email").value,
				phone: document.getElementById("phone").value,
				address: document.getElementById("address").value,
				linkedin: document.getElementById("linkedin").value,
				github: document.getElementById("github").value,
				profilePic: e.target.result,
				skills: selectedSkills,
				languages: selectedLanguages,
				education: getEducationData(),
				workExperience: getWorkExperienceData(),
				projects: getProjectsData(),
			};
			saveNewResume(data);
		};
		reader.readAsDataURL(picInput.files[0]);
	} else {
		const data = {
			name: document.getElementById("fullName").value,
			bio: document.getElementById("bio").value,
			email: document.getElementById("email").value,
			phone: document.getElementById("phone").value,
			address: document.getElementById("address").value,
			linkedin: document.getElementById("linkedin").value,
			github: document.getElementById("github").value,
			profilePic: "https://via.placeholder.com/150",
			skills: selectedSkills,
			languages: selectedLanguages,
			education: getEducationData(),
			workExperience: getWorkExperienceData(),
			projects: getProjectsData(),
		};
		saveNewResume(data);
	}
});

// Form submission handler (for live preview)
document
	.getElementById("portfolioForm")
	.addEventListener("submit", function (e) {
		e.preventDefault();
		const picInput = document.getElementById("profilePic");
		if (picInput.files[0]) {
			const reader = new FileReader();
			reader.onload = function (e) {
				const data = {
					name: document.getElementById("fullName").value,
					bio: document.getElementById("bio").value,
					email: document.getElementById("email").value,
					phone: document.getElementById("phone").value,
					address: document.getElementById("address").value,
					linkedin: document.getElementById("linkedin").value,
					github: document.getElementById("github").value,
					profilePic: e.target.result,
					skills: selectedSkills,
					languages: selectedLanguages,
					education: getEducationData(),
					workExperience: getWorkExperienceData(),
					projects: getProjectsData(),
				};
				populatePreview(data);
			};
			reader.readAsDataURL(picInput.files[0]);
		} else {
			const data = {
				name: document.getElementById("fullName").value,
				bio: document.getElementById("bio").value,
				email: document.getElementById("email").value,
				phone: document.getElementById("phone").value,
				address: document.getElementById("address").value,
				linkedin: document.getElementById("linkedin").value,
				github: document.getElementById("github").value,
				profilePic: "https://via.placeholder.com/150",
				skills: selectedSkills,
				languages: selectedLanguages,
				education: getEducationData(),
				workExperience: getWorkExperienceData(),
				projects: getProjectsData(),
			};
			populatePreview(data);
		}
	});

// Modal functions
const modal = document.getElementById("previewModal");
const modalContent = document.getElementById("modal-preview");
const span = document.getElementsByClassName("close-button")[0];

function openPreviewModal(data) {
	modalContent.innerHTML = "";
	const portfolioDiv = document.getElementById("portfolio").cloneNode(true);
	portfolioDiv.classList.remove("hidden");
	populatePreview(data, portfolioDiv);
	modalContent.appendChild(portfolioDiv);
	modal.classList.remove("hidden");
}

span.onclick = function () {
	modal.classList.add("hidden");
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.classList.add("hidden");
	}
};

// Function to populate the resume preview
function populatePreview(data, targetElement) {
	const element = targetElement || document.getElementById("portfolio");
	element.querySelector("#previewPic").src =
		data.profilePic || "https://via.placeholder.com/150";
	element.querySelector("#previewName").textContent = data.name;
	element.querySelector("#previewSummary").textContent = data.bio;
	element.querySelector("#previewEmail").textContent = data.email;
	element.querySelector("#previewPhone").textContent = data.phone;
	element.querySelector("#previewAddress").textContent = data.address;

	const linkedinLink = element.querySelector("#previewLinkedIn");
	linkedinLink.href = data.linkedin;
	linkedinLink.textContent = data.linkedin;

	const githubLink = element.querySelector("#previewGitHub");
	githubLink.href = data.github;
	githubLink.textContent = data.github;

	// Populate Skills
	const skillsList = element.querySelector("#previewSkills");
	skillsList.innerHTML = "";
	data.skills.forEach((skill) => {
		const li = document.createElement("li");
		li.textContent = skill;
		skillsList.appendChild(li);
	});

	// Populate Languages
	const languagesList = element.querySelector("#previewLanguages");
	languagesList.innerHTML = "";
	data.languages.forEach((lang) => {
		const li = document.createElement("li");
		li.textContent = lang;
		languagesList.appendChild(li);
	});

	// Populate Education
	const educationContainer = element.querySelector("#previewEducation");
	educationContainer.innerHTML = "";
	data.education.forEach((edu) => {
		const entry = document.createElement("div");
		entry.classList.add("education-entry-preview");
		entry.innerHTML = `
                <div class="education-info">
                    <h4>${edu.institution}</h4>
                    <p>${edu.program}</p>
                </div>
                <div class="education-duration">${edu.duration}</div>
            `;
		educationContainer.appendChild(entry);
	});

	// Populate Work Experience
	const workContainer = element.querySelector("#previewWorkExperience");
	workContainer.innerHTML = "";
	data.workExperience.forEach((work) => {
		const entry = document.createElement("div");
		entry.classList.add("work-entry-preview");
		entry.innerHTML = `
            <div class="work-info">
                <h4>${work.company}</h4>
                <p>${work.title}</p>
                <ul>
                    ${work.responsibilities
											.split(",")
											.map((resp) => `<li>${resp.trim()}</li>`)
											.join("")}
                </ul>
            </div>
            <div class="work-duration">${work.duration}</div>
        `;
		workContainer.appendChild(entry);
	});

	// Populate Projects
	const projectsContainer = element.querySelector("#previewProjects");
	projectsContainer.innerHTML = "";
	data.projects.forEach((project) => {
		const entry = document.createElement("div");
		entry.classList.add("project-entry-preview");
		entry.innerHTML = `
            <div class="project-info">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
            </div>
            <div class="project-duration">${project.duration}</div>
        `;
		projectsContainer.appendChild(entry);
	});

	if (!targetElement) {
		document.getElementById("portfolio").classList.remove("hidden");
		document.getElementById("downloadBtn").classList.remove("hidden");
	}
}

// Helper functions to populate the form from saved data
function populateForm(data) {
	document.getElementById("fullName").value = data.name || "";
	document.getElementById("bio").value = data.bio || "";
	document.getElementById("email").value = data.email || "";
	document.getElementById("phone").value = data.phone || "";
	document.getElementById("address").value = data.address || "";
	document.getElementById("linkedin").value = data.linkedin || "";
	document.getElementById("github").value = data.github || "";

	// Populate skills
	selectedSkills = data.skills || [];
	document.getElementById("skillsContainer").innerHTML = "";
	selectedSkills.forEach(addSkill);

	// Populate languages
	selectedLanguages = data.languages || [];
	document.getElementById("languagesContainer").innerHTML = "";
	selectedLanguages.forEach(addLanguage);

	setEducationData(data.education || []);
	setWorkExperienceData(data.workExperience || []);
	setProjectsData(data.projects || []);
}

// Helper functions for dynamic data
function getEducationData() {
	return Array.from(
		document.querySelectorAll("#educationContainer .education-entry")
	).map((entry) => ({
		institution: entry.querySelector(".educationInstitution").value,
		program: entry.querySelector(".educationProgram").value,
		duration: entry.querySelector(".educationDuration").value,
	}));
}

function setEducationData(education) {
	const container = document.getElementById("educationContainer");
	container.innerHTML = "";
	education.forEach((edu) => {
		const newEntry = document.createElement("div");
		newEntry.classList.add("education-entry");
		newEntry.innerHTML = `
            <label>Institution Name</label>
            <input type="text" class="educationInstitution" value="${
							edu.institution || ""
						}" />
            <label>Program/Degree</label>
            <input type="text" class="educationProgram" value="${
							edu.program || ""
						}" />
            <label>Duration</label>
            <input type="text" class="educationDuration" value="${
							edu.duration || ""
						}" />
        `;
		container.appendChild(newEntry);
	});
}

function getWorkExperienceData() {
	return Array.from(
		document.querySelectorAll("#workExperienceContainer .work-entry")
	).map((entry) => ({
		title: entry.querySelector(".workTitle").value,
		company: entry.querySelector(".workCompany").value,
		duration: entry.querySelector(".workDuration").value,
		responsibilities: entry.querySelector(".workResponsibilities").value,
	}));
}

function setWorkExperienceData(workExperience) {
	const container = document.getElementById("workExperienceContainer");
	container.innerHTML = "";
	workExperience.forEach((work) => {
		const newEntry = document.createElement("div");
		newEntry.classList.add("work-entry");
		newEntry.innerHTML = `
            <label>Company</label>
            <input type="text" class="workCompany" value="${
							work.company || ""
						}" />
            <label>Job Title</label>
            <input type="text" class="workTitle" value="${work.title || ""}" />
            <label>Duration (e.g., Jan 2023 - Present)</label>
            <input type="text" class="workDuration" value="${
							work.duration || ""
						}" />
            <label>Responsibilities (comma separated)</label>
            <textarea class="workResponsibilities" rows="3">${
							work.responsibilities || ""
						}</textarea>
        `;
		container.appendChild(newEntry);
	});
}

function getProjectsData() {
	return Array.from(
		document.querySelectorAll("#projectsContainer .project-entry")
	).map((entry) => ({
		title: entry.querySelector(".projectTitle").value,
		duration: entry.querySelector(".projectDuration").value,
		description: entry.querySelector(".projectDescription").value,
	}));
}

function setProjectsData(projects) {
	const container = document.getElementById("projectsContainer");
	container.innerHTML = "";
	projects.forEach((project) => {
		const newEntry = document.createElement("div");
		newEntry.classList.add("project-entry");
		newEntry.innerHTML = `
            <label>Project Title</label>
            <input type="text" class="projectTitle" value="${
							project.title || ""
						}" />
            <label>Project Duration</label>
            <input type="text" class="projectDuration" value="${
							project.duration || ""
						}" />
            <label>Project Description</label>
            <textarea class="projectDescription" rows="3">${
							project.description || ""
						}</textarea>
        `;
		container.appendChild(newEntry);
	});
}

// Download PDF button (using built-in print functionality)
document.getElementById("downloadBtn").addEventListener("click", function () {
	window.print();
});

// Initial load
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("builderPage").classList.remove("hidden");
	document.getElementById("myResumePage").classList.add("hidden");
});
