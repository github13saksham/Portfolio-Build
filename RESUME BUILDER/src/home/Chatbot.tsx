// // import { useState } from "react";

// // declare const puter: any;

// // const Chatbot = () => {
// // 	const [response, setResponse] = useState<string>("");
// // 	const [loading, setLoading] = useState<boolean>(false);

// // 	const handleChat = () => {
// // 		setLoading(true);

// // 		puter.ai
// // 			.chat("What are the best practices for React development?", {
// // 				model: "gpt-5-nano",
// // 			})
// // 			.then((res: string) => setResponse(res))
// // 			.catch((err: any) => {
// // 				console.error(err);
// // 				setResponse("Failed to fetch AI response.");
// // 			})
// // 			.finally(() => setLoading(false));
// // 	};

// // 	return (
// // 		<div className="p-6 max-w-xl mx-auto">
// // 			<button
// // 				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
// // 				onClick={handleChat}
// // 				disabled={loading}
// // 			>
// // 				{loading ? "Loading..." : "Ask AI"}
// // 			</button>

// // 			{response && (
// // 				<div className="mt-4 p-4 bg-gray-100 rounded">
// // 					<h2 className="font-semibold">AI Response:</h2>
// // 					<p>{response}</p>
// // 				</div>
// // 			)}
// // 		</div>
// // 	);
// // };

// // export default Chatbot;
// import { useState } from "react";

// declare const puter: any; // Ensure Puter.js global object is accessible

// const Chatbot = () => {
// 	const [userInput, setUserInput] = useState<string>("");
// 	const [response, setResponse] = useState<string>("");
// 	const [loading, setLoading] = useState<boolean>(false);

// 	const handleSend = () => {
// 		if (!userInput.trim()) return;

// 		setLoading(true);
// 		puter.ai
// 			.chat(userInput, { model: "gpt-5-nano" })
// 			.then((res: string) => setResponse(res))
// 			.catch((err: any) => {
// 				console.error(err);
// 				setResponse("Error: Unable to get response.");
// 			})
// 			.finally(() => setLoading(false));
// 	};

// 	return (
// 		<div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 w-96 max-w-full z-1000">
// 			<h3 className="font-bold text-lg mb-2">AI Chatbot</h3>

// 			<textarea
// 				className="w-full p-2 border rounded mb-2"
// 				rows={3}
// 				placeholder="Type your question here..."
// 				value={userInput}
// 				onChange={(e) => setUserInput(e.target.value)}
// 			></textarea>

// 			<button
// 				className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
// 				onClick={handleSend}
// 				disabled={loading}
// 			>
// 				{loading ? "Thinking..." : "Send"}
// 			</button>

// 			{response && (
// 				<div className="mt-4 p-2 bg-gray-100 rounded">
// 					<strong>AI Response:</strong>
// 					<p>{response}</p>
// 				</div>
// 			)}
// 		</div>
// 	);
// };

// export default Chatbot;
