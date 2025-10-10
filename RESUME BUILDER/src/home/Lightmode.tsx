import { useEffect, useState } from "react";
import "../index.css";

function Lightmode() {
	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "light";
		setTheme(savedTheme);
		document.body.className = savedTheme;
	}, []);

	const toggleMode = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.body.className = newTheme;
		localStorage.setItem("theme", newTheme);
	};
	return (
		<button
			onClick={toggleMode}
			className="px-4 py-2 rounded-full shadow-md bg-gray-200 dark:bg-gray-800 dark:text-white transition"
		>
			{theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
		</button>
	);
}

export default Lightmode;
