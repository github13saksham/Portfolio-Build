export default function initResumeBuilder(): void {
	console.log("✅ Resume Builder JS initialized");

	const builderPage = document.getElementById("builderPage");
	const myResumePage = document.getElementById("myResumePage");
	const dashboardBtn = document.getElementById("dashboardBtn");
	const myResumeBtn = document.getElementById("myResumeBtn");
	const toggleThemeBtn = document.getElementById("toggle-theme");
	const portfolioForm = document.getElementById("portfolioForm") as HTMLFormElement | null;
	const skillsInput = document.getElementById("skillsInput") as HTMLInputElement | null;
	const skillsContainer = document.getElementById("skillsContainer");
	const addEducationBtn = document.getElementById("addEducationBtn");

	// 🌓 Dark Mode Toggle
	toggleThemeBtn?.addEventListener("click", () => {
		document.documentElement.classList.toggle("dark");
		toggleThemeBtn.textContent =
			document.documentElement.classList.contains("dark")
				? "Light Mode"
				: "Dark Mode";
	});

	// 📄 Page Switching
	myResumeBtn?.addEventListener("click", () => {
		builderPage?.classList.add("hidden");
		myResumePage?.classList.remove("hidden");
	});

	dashboardBtn?.addEventListener("click", () => {
		myResumePage?.classList.add("hidden");
		builderPage?.classList.remove("hidden");
	});

	// 💡 Add Education Section
	addEducationBtn?.addEventListener("click", () => {
		const educationContainer = document.getElementById("educationContainer");
		if (educationContainer && educationContainer.children.length > 0) {
			const newEntry = educationContainer.children[0].cloneNode(true) as HTMLElement;
			newEntry.querySelectorAll("input").forEach((input) => {
				(input as HTMLInputElement).value = "";
			});
			educationContainer.appendChild(newEntry);
		}
	});

	// 🏷️ Skills Tag Input
	if (skillsInput && skillsContainer) {
		skillsInput.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				e.preventDefault();
				const value = skillsInput.value.trim();
				if (value) {
					const tag = document.createElement("span");
					tag.textContent = value;
					tag.className =
						"px-2 py-1 bg-cyan-300 text-black rounded-md m-1 inline-block cursor-pointer";
					tag.addEventListener("click", () => tag.remove());
					skillsContainer.appendChild(tag);
					skillsInput.value = "";
				}
			}
		});
	}

	// 💾 Form submission
	portfolioForm?.addEventListener("submit", (e) => {
		e.preventDefault();
		alert("Resume preview generated successfully!");
	});
}
