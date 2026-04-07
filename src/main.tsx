import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Home from "./home/Home.tsx";
import Signin from "./auth/Signin.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./dashboard/Dashboard.tsx";
import Pdfbuilder from "./pages/pdfbuilder/Pdfbuilder.tsx";
import Myresume from "./Nav-bar components/Myresume.tsx";
import Chatbot from "./home/chat-bot/Chatbot.tsx";
import ResumeWebsite from "./pages/pdfbuilder/ResumeBuilder/ResumeWebsite.tsx";
import Pdf2web from "./pages/pdfbuilder/PdftoWeb/Pdf2web.tsx";
import TemplatesPage from "./pages/Templates.tsx";

const router = createBrowserRouter([
	{
		element: <App />, 
		children: [
			{ path: "/", element: <Home /> },
			{ path: "/dashboard", element: <Dashboard /> },
			{ path: "/pages/pdfbuilder", element: <Pdfbuilder /> },
			{ path: "/pages/ResumeBuilder", element: <ResumeWebsite /> },
			{ path: "/Nav-bar components", element: <Myresume /> },
			{ path: "/pages/PdftoWeb", element: <Pdf2web /> },
			{ path: "/home/chat-bot", element: <Chatbot /> },
			{ path: "/templates", element: <TemplatesPage /> },
		],
	},
	{ path: "/auth", element: <Signin /> },
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
