import { useEffect, useRef } from "react";
import Navbar from "@/home/Navbar";

function Pdfbuilder() {
	const iframeRef = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		// helper to get theme from localStorage/body
		const getCurrentIsDark = () => {
			const saved = localStorage.getItem("theme");
			if (saved) return saved === "dark";
			// fallback to body class if your Lightmode sets document.body.className
			return document.body.classList.contains("dark");
		};

		// send theme to specific target window (iframe)
		const sendThemeToWindow = (targetWindow: Window | null | undefined) => {
			if (!targetWindow) return;
			const isDark = getCurrentIsDark();
			// debug
			console.log("[Parent] sending SET_THEME ->", isDark);
			targetWindow.postMessage({ type: "SET_THEME", darkMode: isDark }, "*");
		};

		// message handler: respond to iframe readiness
		const onMessage = (e: MessageEvent) => {
			// ignore other messages
			if (!e?.data?.type) return;

			// ensure message came from the iframe we expect (optional)
			if (iframeRef.current && e.source !== iframeRef.current.contentWindow) {
				// not from our iframe
				return;
			}

			if (e.data.type === "IFRAME_READY") {
				console.log("[Parent] received IFRAME_READY, sending theme");
				const win = iframeRef.current?.contentWindow;
				sendThemeToWindow(win || null);

				// Check for editing resume data
				const editingResume = localStorage.getItem("editingResume");
				if (editingResume) {
					const resume = JSON.parse(editingResume);
					console.log("[Parent] sending LOAD_EDIT_DATA", resume);
					const win = iframeRef.current?.contentWindow;
					if (win) {
						win.postMessage({ type: "LOAD_EDIT_DATA", resume }, "*");
					}
					localStorage.removeItem("editingResume"); // Clear after sending
				}
			}
		};

		window.addEventListener("message", onMessage);

		// Observe body class changes so we send theme updates when user toggles Lightmode
		const observer = new MutationObserver(() => {
			// whenever body class changes (dark added/removed) send update
			const win = iframeRef.current?.contentWindow;
			if (win) {
				console.log("[Parent] body class changed -> sending updated theme");
				sendThemeToWindow(win);
			}
		});
		observer.observe(document.body, {
			attributes: true,
			attributeFilter: ["class"],
		});

		// Also send theme when iframe fires load event (fallback)
		const iframeEl = iframeRef.current;
		const onLoad = () => {
			const win = iframeRef.current?.contentWindow;
			console.log("[Parent] iframe loaded -> sending theme");
			sendThemeToWindow(win);
		};
		if (iframeEl) iframeEl.addEventListener("load", onLoad);

		// cleanup
		return () => {
			window.removeEventListener("message", onMessage);
			observer.disconnect();
			if (iframeEl) iframeEl.removeEventListener("load", onLoad);
		};
	}, []);

	return (
		<div>
			<header className="fixed top-0 left-0 w-full">
				<Navbar />
			</header>

			{/* ensure there is NO trailing space in src */}
			<iframe
				ref={iframeRef}
				className="w-full min-h-screen pt-18"
				src="/Pdf-builder/index.html"
				title="embedded-pdfbuilder"
			/>
		</div>
	);
}

export default Pdfbuilder;
