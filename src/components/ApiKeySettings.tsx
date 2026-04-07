import { useState, useEffect } from "react";
import { Settings, Key, Check, X, AlertTriangle, Sparkles } from "lucide-react";
import { getStoredOverrideKey, setApiKey, clearApiKeyOverride, getApiKey } from "../utils/gemini";

/**
 * A floating settings button + modal that lets users enter/update their
 * Gemini API key at runtime without needing to edit .env or restart.
 */
export default function ApiKeySettings() {
	const [isOpen, setIsOpen] = useState(false);
	const [keyInput, setKeyInput] = useState("");
	const [saved, setSaved] = useState(false);
	const [hasKey, setHasKey] = useState(false);

	useEffect(() => {
		setKeyInput(getStoredOverrideKey());
		setHasKey(!!getApiKey());
	}, [isOpen]);

	const handleSave = () => {
		setApiKey(keyInput);
		setSaved(true);
		setHasKey(!!keyInput.trim());
		setTimeout(() => setSaved(false), 2000);
	};

	const handleClear = () => {
		clearApiKeyOverride();
		setKeyInput("");
		setHasKey(!!import.meta.env.VITE_GEMINI_API_KEY);
		setSaved(false);
	};

	return (
		<>
			{/* Floating Button */}
			<button
				onClick={() => setIsOpen(true)}
				className={`fixed bottom-6 right-6 z-[200] w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300 group hover:scale-110 hover:shadow-[0_8px_30px_rgba(99,102,241,0.4)] ${
					hasKey
						? "bg-gradient-to-br from-indigo-500 to-purple-600"
						: "bg-gradient-to-br from-red-500 to-orange-500 animate-pulse"
				}`}
				title={hasKey ? "API Key Settings" : "⚠️ No API Key — Click to configure"}
			>
				{hasKey ? (
					<Settings className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
				) : (
					<AlertTriangle className="w-6 h-6 text-white" />
				)}
			</button>

			{/* Modal */}
			{isOpen && (
				<div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
					<div
						className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm"
						onClick={() => setIsOpen(false)}
					/>
					<div className="relative w-full max-w-lg bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/10 rounded-3xl shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
						{/* Close */}
						<button
							onClick={() => setIsOpen(false)}
							className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
						>
							<X className="w-4 h-4" />
						</button>

						{/* Header */}
						<div className="flex items-center gap-3 mb-6">
							<div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
								<Key className="w-6 h-6 text-white" />
							</div>
							<div>
								<h2 className="text-xl font-bold text-slate-900 dark:text-white">
									Gemini API Key
								</h2>
								<p className="text-sm text-slate-500 dark:text-slate-400">
									Required for AI features
								</p>
							</div>
						</div>

						{/* Info */}
						<div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-2xl">
							<div className="flex items-start gap-3">
								<Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
								<div className="text-sm text-indigo-700 dark:text-indigo-300">
									<p className="font-bold mb-1">How to get a free API key:</p>
									<ol className="list-decimal ml-4 space-y-1 text-xs leading-relaxed">
										<li>
											Go to{" "}
											<a
												href="https://aistudio.google.com/apikey"
												target="_blank"
												rel="noopener noreferrer"
												className="underline font-bold hover:text-indigo-900 dark:hover:text-white"
											>
												aistudio.google.com/apikey
											</a>
										</li>
										<li>Sign in with a Google account</li>
										<li>Click <strong>"Create API Key"</strong></li>
										<li>Copy and paste it below</li>
									</ol>
									<p className="mt-2 text-xs opacity-75">
										💡 Tip: If one key runs out of quota, create a new one with a
										different Google account.
									</p>
								</div>
							</div>
						</div>

						{/* Input */}
						<div className="mb-4">
							<label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
								API Key
							</label>
							<input
								type="password"
								value={keyInput}
								onChange={(e) => setKeyInput(e.target.value)}
								placeholder="AIzaSy..."
								className="w-full px-4 py-3.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none font-mono text-sm placeholder-slate-400 transition-all"
							/>
						</div>

						{/* Status indicator */}
						{getStoredOverrideKey() && (
							<div className="mb-4 flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
								<Check className="w-3.5 h-3.5" />
								Custom key active (overrides .env)
							</div>
						)}

						{/* Actions */}
						<div className="flex gap-3">
							<button
								onClick={handleSave}
								disabled={!keyInput.trim()}
								className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
									saved
										? "bg-emerald-500 text-white"
										: "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-lg hover:-translate-y-0.5"
								}`}
							>
								{saved ? (
									<>
										<Check className="w-4 h-4" /> Saved!
									</>
								) : (
									<>
										<Key className="w-4 h-4" /> Save Key
									</>
								)}
							</button>

							{getStoredOverrideKey() && (
								<button
									onClick={handleClear}
									className="px-5 py-3.5 rounded-xl font-bold text-sm border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
								>
									Reset
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
