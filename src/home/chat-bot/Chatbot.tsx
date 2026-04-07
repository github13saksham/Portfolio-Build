import { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import "../../index.css";
import { callGemini, GeminiApiError } from "../../utils/gemini";

import { Send, MessageSquare, Bot, User, Sparkles, Code, Terminal, Briefcase, BookOpen, PenTool, FileText } from "lucide-react";

interface Message {
	id: number;
	type: "user" | "bot";
	content: string;
	isTyping?: boolean;
}

const SUGGESTIONS = [
	{ icon: Sparkles, text: "Score my resume ATS compatibility" },
	{ icon: Briefcase, text: "Give me the top ATS keywords for Frontend Developers" },
	{ icon: FileText, text: "How can I format my resume to pass ATS scanners?" },
	{ icon: Bot, text: "Evaluate my executive summary" },
];

function Chatbot() {
	const [question, setQuestion] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = (smooth = true) => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTo({
				top: messagesContainerRef.current.scrollHeight,
				behavior: smooth ? "smooth" : "auto"
			});
		}
	};

	useEffect(() => {
		const isTyping = messages.some(m => m.isTyping);
		scrollToBottom(!isTyping);
	}, [messages]);

	const typeWriter = (text: string, messageId: number) => {
		let index = 0;
		const interval = setInterval(() => {
			setMessages((prev) =>
				prev.map((msg) =>
					msg.id === messageId
						? { ...msg, content: text.slice(0, index + 1) }
						: msg
				)
			);
			index++;
			if (index >= text.length) {
				clearInterval(interval);
				setMessages((prev) =>
					prev.map((msg) =>
						msg.id === messageId ? { ...msg, isTyping: false } : msg
					)
				);
			}
		}, 15);
	};

	async function generateAnswer(userPrompt?: string) {
		const finalQuestion = (userPrompt || question).trim();
		if (!finalQuestion) return;

		const userMessage: Message = {
			id: Date.now(),
			type: "user",
			content: finalQuestion,
		};

		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);
		if (!userPrompt) setQuestion("");

		try {
			const promptToAPI = `You are an elite Tech Recruiter and an advanced ATS (Applicant Tracking System) scoring algorithm. The user is asking you for help regarding their resume, portfolio, or career. Provide extremely helpful, concise, and highly professional advice. If they provide a resume or ask for a score, evaluate it critically like a strict ATS parser, outputting a numerical score out of 100, and listing exact keywords to add. Do NOT use any asterisks (*) or complex markdown formatting. Use standard dashes (-) for lists. Be extremely clear, concise and structurally formatted: ${finalQuestion}`;
			
			let botContent = await callGemini(promptToAPI);
			botContent = botContent.replace(/\*/g, "").replace(/#/g, "");
			
			const botMessage: Message = {
				id: Date.now() + 1,
				type: "bot",
				content: "",
				isTyping: true,
			};

			setMessages((prev) => [...prev, botMessage]);
			typeWriter(botContent, botMessage.id);
		} catch (error: any) {
			console.error("Error generating answer:", error);
			const errorMessage = error instanceof GeminiApiError
				? (error.isQuotaError
					? "🚨 API Quota Exhausted! Click the ⚙️ button in the bottom-right corner to enter a new API key."
					: error.message)
				: "Unable to generate answer. Click the ⚙️ button to check your API key.";

			const botMessage: Message = {
				id: Date.now() + 1,
				type: "bot",
				content: errorMessage,
			};

			setMessages((prev) => [...prev, botMessage]);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-[#0a0f1c] dark:via-[#0d1326] dark:to-[#0a0f1c] text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-500 relative overflow-hidden">
			{/* Ambient Glowing Background */}
			<div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
				<div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/20 dark:bg-indigo-500/30 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse animation-delay-2000"></div>
				<div className="absolute top-[30%] right-[10%] w-[20%] h-[30%] bg-blue-400/20 dark:bg-blue-600/20 blur-[90px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
				<div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[40%] bg-purple-500/20 dark:bg-purple-600/30 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
			</div>

			<header className="fixed top-0 w-full left-0 z-50 transition-colors duration-300">
				<Navbar />
			</header>
			
			<main className="flex-1 w-full pt-16 flex flex-col h-full relative z-10">
				
				{/* Main Space App Layer */}
				<div className="w-full h-full flex flex-col lg:flex-row transition-all duration-300 relative z-20">
					

					{/* Right Side: Chat Interface */}
					<div className="flex-1 flex flex-col h-full bg-white/20 dark:bg-[#0a0f1c]/40 backdrop-blur-md relative z-20">
						
						{/* Mobile Header (Only visible on small screens) */}
						<div className="lg:hidden px-6 py-4 border-b border-slate-200/50 dark:border-white/5 bg-white/50 dark:bg-[#111827]/50 backdrop-blur-md flex items-center gap-3">
							<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
								<Bot className="w-4 h-4 text-white" />
							</div>
							<div>
								<h2 className="font-bold text-sm text-slate-900 dark:text-white">AI Assistant</h2>
								<p className="text-[10px] font-semibold text-emerald-500 dark:text-emerald-400">Online & Ready</p>
							</div>
						</div>

						{/* Chat Messages */}
						<div 
							ref={messagesContainerRef}
							className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/10 scrollbar-track-transparent"
						>
							{messages.length === 0 ? (
								<div className="flex flex-col items-center justify-center min-h-[70vh] max-w-4xl mx-auto px-4 mt-8 sm:mt-12">
									<div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mb-8 hover:scale-105 transition-transform duration-500 relative group">
										<div className="absolute inset-0 bg-indigo-500 rounded-3xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>
										<Bot className="w-10 h-10 text-white drop-shadow-lg relative z-10" />
									</div>
									<h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mb-7 pb-4 pr-2 text-center tracking-tight">
										How can I help you today?
									</h1>
									<p className="text-slate-500 dark:text-slate-400 text-[16px] md:text-lg mb-12 text-center max-w-2xl font-medium leading-relaxed">
										I'm your personal AI Applicant Tracking System (ATS) Career Assistant. I can score your resume, optimize your keywords, or prepare you for interviews.
									</p>
									
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
										{SUGGESTIONS.map((item, i) => (
											<button 
												key={i}
												onClick={() => generateAnswer(item.text)}
												disabled={isLoading}
												className="flex flex-col gap-3.5 p-5 bg-white/60 dark:bg-[#1f2937]/50 hover:bg-white dark:hover:bg-[#1f2937]/80 border border-slate-200/50 dark:border-white/5 rounded-[1.25rem] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all duration-300 text-left group disabled:opacity-50 backdrop-blur-md"
											>
												<div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-500/20 transition-transform shadow-sm dark:shadow-none">
													<item.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
												</div>
												<span className="text-[14.5px] font-semibold text-slate-700 dark:text-slate-300 group-hover:text-indigo-700 dark:group-hover:text-white transition-colors leading-[1.4]">
													{item.text}
												</span>
											</button>
										))}
									</div>
								</div>
							) : (
								<div className="max-w-3xl mx-auto space-y-8 pb-4 pt-2">
									{messages.map((message, index) => (
										<div
											key={message.id}
											className={`flex items-start gap-4 ${message.type === "user" ? "flex-row-reverse" : ""}`}
										>
											{/* Avatar */}
											<div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md border ${
												message.type === "bot" 
													? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-white/20" 
													: "bg-white dark:bg-[#1f2937] text-slate-500 dark:text-slate-300 border-slate-200 dark:border-white/10"
											}`}>
												{message.type === "bot" ? <Bot className="w-5 h-5 drop-shadow-sm" /> : <User className="w-5 h-5" />}
											</div>
											
											{/* Bubble */}
											<div className={`max-w-[85%] sm:max-w-[80%] px-6 py-4 shadow-sm ${
												message.type === "user"
													? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-2xl rounded-tr-sm"
													: "bg-white dark:bg-[#1f2937] border border-slate-200/60 dark:border-white/10 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-sm shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none"
											}`}>
												<div className="text-[14px] font-medium leading-[1.7] whitespace-pre-wrap">
													{message.content}
													{message.isTyping && <span className="inline-block w-2 h-4 ml-1 bg-indigo-500 dark:bg-white animate-pulse align-middle rounded-[1px]"></span>}
												</div>
											</div>
										</div>
									))}
									
									{/* Typing Indicator */}
									{isLoading && !messages.some((m) => m.isTyping) && (
										<div className="flex items-start gap-4">
											<div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center shadow-md border border-white/20 animate-pulse">
												<Bot className="w-5 h-5" />
											</div>
											<div className="bg-white dark:bg-[#1f2937] border border-slate-200/60 dark:border-white/10 px-6 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[3.5rem]">
												<div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }}></div>
												<div className="w-2 h-2 rounded-full bg-purple-500 dark:bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }}></div>
												<div className="w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }}></div>
											</div>
										</div>
									)}
								</div>
							)}
						</div>

						{/* Input Area */}
						<div className="p-4 sm:p-6 bg-slate-50/80 dark:bg-[#0a0f1c]/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-white/5 relative z-20">
							<div className="max-w-3xl mx-auto relative flex items-center group/input">
								<div className="absolute left-5 text-slate-400 group-focus-within/input:text-indigo-500 dark:group-focus-within/input:text-indigo-400 transition-colors">
									<Sparkles className="w-5 h-5" />
								</div>
								<input
									value={question}
									onChange={(e) => setQuestion(e.target.value)}
									onKeyPress={(e) => e.key === "Enter" && generateAnswer()}
									placeholder="Message AI Assistant..."
									className="w-full text-[14px] font-medium h-14 pl-14 pr-16 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1f2937] text-slate-900 dark:text-white rounded-2xl focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-[0_2px_10px_rgb(0,0,0,0.02)] placeholder-slate-400 dark:placeholder-slate-500"
									disabled={isLoading}
								/>
								<button
									onClick={() => generateAnswer()}
									disabled={isLoading || !question.trim()}
									className="absolute right-2 w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-300 dark:disabled:from-slate-700 dark:disabled:to-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-[12px] text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
								>
									{isLoading ? (
										<div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
									) : (
										<Send className="w-4 h-4 ml-0.5" />
									)}
								</button>
							</div>
							<p className="text-center text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-3 flex items-center justify-center gap-1.5 ">
								<Bot className="w-3 h-3" /> AI can make mistakes. Consider verifying important information.
							</p>
						</div>

					</div>
				</div>
			</main>
		</div>
	);
}

export default Chatbot;
