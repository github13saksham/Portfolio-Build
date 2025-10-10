// src/utils/resumeStorage.ts
import type { Resume } from "../types/Resume";

export const loadResumes = (): Resume[] => {
	return JSON.parse(localStorage.getItem("resumes") || "[]");
};

export const saveResume = (resume: Resume) => {
	const resumes = loadResumes();
	resumes.push(resume);
	localStorage.setItem("resumes", JSON.stringify(resumes));
};

export const deleteResume = (id: number) => {
	let resumes = loadResumes();
	resumes = resumes.filter((r) => r.id !== id);
	localStorage.setItem("resumes", JSON.stringify(resumes));
};
