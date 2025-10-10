import type { ReactNode } from "react";

// src/types/Resume.ts
export interface Resume {
	id: number;
	name: string;
	bio: string;
	about?: string;
	email: string;
	phone: string;
	address: string;
	linkedin: string;
	github: string;
	profilePic: string;
	skills: string[];
	languages: string[];
	education: {
		degree: ReactNode;
		institution: string;
		program: string;
		duration: string;
	}[];
	workExperience: {
		position: ReactNode;
		company: string;
		title: string;
		duration: string;
		responsibilities: string[];
	}[];
	projects: { title: string; duration: string; description: string }[];

	websiteTheme: "light";
}
