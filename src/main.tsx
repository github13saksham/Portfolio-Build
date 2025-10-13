import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./home/Home.tsx";
import Signin from "./auth/Signin.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import Dashboard from "./dashboard/Dashboard.tsx";
import Pdfbuilder from "./pages/pdfbuilder/Pdfbuilder.tsx";
import Myresume from "./Nav-bar components/Myresume.tsx";
import Chatbot from "./home/chat-bot/Chatbot.tsx";
import ResumeWebsite from "./pages/pdfbuilder/ResumeBuilder/ResumeWebsite.tsx";
import Pdf2web from "./pages/pdfbuilder/PdftoWeb/Pdf2web.tsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const router = createBrowserRouter([
	{
		element: <App />, // App is the top-level guard
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/dashboard", element: <Dashboard /> },
			{ path: "/pages/pdfbuilder", element: <Pdfbuilder /> },
			{ path: "/pages/ResumeBuilder", element: <ResumeWebsite /> },
			{ path: "/Nav-bar components", element: <Myresume /> },
			{ path: "/pages/PdftoWeb", element: <Pdf2web /> },
			{ path: "/home/chat-bot", element: <Chatbot /> },
		],
	},
	{ path: "/auth", element: <Signin /> },
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY}>
			<RouterProvider router={router} />
		</ClerkProvider>
	</StrictMode>
);
