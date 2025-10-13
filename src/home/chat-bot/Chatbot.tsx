import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import "../../index.css";

import { Send, MessageCircle, Bot, User } from "lucide-react";

interface Message {
	id: number;
	type: "user" | "bot";
	content: string;
	isTyping?: boolean;
}

function Chatbot() {
	const [question, setQuestion] = useState("");
	const [messages, setMessages] = useState<Message[]>([
		{
			id: 0,
			type: "bot",
			content:
				"Hello! I'm your AI assistant. How can I help you with your resume today? 🤖",
		},
	]);
	const [isLoading, setIsLoading] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	useEffect(() => {
		scrollToBottom();
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
		}, 20); // Adjust speed here (lower = faster)
	};

	async function generateAnswer() {
		if (!question.trim()) return;

		const userMessage: Message = {
			id: Date.now(),
			type: "user",
			content: question,
		};

		setMessages((prev) => [...prev, userMessage]);
		setIsLoading(true);
		const currentQuestion = question;
		setQuestion("");

		try {
			const response = await axios({
				url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${
					import.meta.env.VITE_GEMINI_API_KEY
				}`,
				method: "post",
				data: {
					contents: [
						{
							parts: [
								{
									text: `Provide a concise answer in 1-2 sentences: ${currentQuestion}`,
								},
							],
						},
					],
				},
			});

			const botContent =
				response["data"]["candidates"][0]["content"]["parts"][0]["text"];
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
			let errorMessage = "Unable to generate answer. Please try again.";
			if (error.response) {
				console.error("API Response Error:", error.response.data);
				errorMessage = error.response.data.error.message || errorMessage;
			}

			const botMessage: Message = {
				id: Date.now() + 1,
				type: "bot",
				content: `Error: ${errorMessage}`,
			};

			setMessages((prev) => [...prev, botMessage]);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<div className="text-black text-center font-bold">
			<header className="fixed top-0 w-full left-0 z-500">
				<Navbar />
			</header>
			<div className="min-h-screen bg-gradient-to-b from-indigo-200 via-pink-300 to-purple-300 dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20 relative overflow-hidden">
				{/* Background particles for dynamism */}
				<div className="absolute inset-0 opacity-10">
					<div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
					<div className="absolute top-20 right-20 w-1 h-1 bg-purple-400 rounded-full animate-bounce"></div>
					<div className="absolute bottom-20 left-1/4 w-3 h-3 bg-pink-400 rounded-full animate-ping"></div>
					<div className="absolute top-1/3 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
				</div>

				<div className="relative pt-5 z-10"></div>

				{/* Chat Messages Box */}
				<div className="max-w-2xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 mb-6 h-96 overflow-y-auto border border-gray-200 dark:border-gray-700">
					{messages.map((message, index) => (
						<div
							key={message.id}
							className={`mb-4 flex items-start gap-3 ${
								message.type === "user" ? "justify-end" : "justify-start"
							} animate-fade-in`}
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							{message.type === "bot" && (
								<div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
									<Bot className="w-4 h-4 text-white" />
								</div>
							)}
							<div
								className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 ${
									message.type === "user"
										? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-md"
										: "bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-md"
								}`}
							>
								<p className="text-sm text-justify justify-normal whitespace-pre-wrap leading-relaxed">
									{message.content}
									{message.isTyping && (
										<span className="animate-pulse text-blue-400">|</span>
									)}
								</p>
							</div>
							{message.type === "user" && (
								<div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
									<User className="w-4 h-4 text-white" />
								</div>
							)}
						</div>
					))}
					{isLoading && !messages.some((m) => m.isTyping) && (
						<div className="mb-4 flex items-start gap-3 justify-start animate-fade-in">
							<div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-around shadow-lg">
								<Bot className="w-4 h-4 text-white animate-bounce" />
							</div>
							<div className="max-w-xs lg:max-w-md px-4 py-3 rounded-2xl bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-md shadow-md">
								<p className="text-sm flex items-center gap-2">
									<span className="animate-pulse">AI is thinking</span>
									<span className="flex gap-1">
										<span
											className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"
											style={{ animationDelay: "0s" }}
										></span>
										<span
											className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"
											style={{ animationDelay: "0.1s" }}
										></span>
										<span
											className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"
											style={{ animationDelay: "0.2s" }}
										></span>
									</span>
								</p>
							</div>
						</div>
					)}
					<div ref={messagesEndRef} />
				</div>

				{/* Input Area */}
				<div className="max-w-2xl mx-auto flex gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-gray-200 dark:border-gray-700">
					<div className="flex-1 relative">
						<MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
						<input
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							onKeyPress={(e) => e.key === "Enter" && generateAnswer()}
							placeholder="Ask me anything about your resume..."
							className="w-full text-sm h-12 pl-10 pr-4 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
							disabled={isLoading}
						/>
					</div>
					<button
						onClick={generateAnswer}
						disabled={isLoading || !question.trim()}
						className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 w-12 h-12 rounded-xl text-white font-semibold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:transform-none disabled:hover:scale-100"
					>
						{isLoading ? (
							<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
						) : (
							<Send className="w-5 h-5" />
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

export default Chatbot;
