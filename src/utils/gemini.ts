/**
 * Centralized Gemini API utility with:
 * - Runtime API key management (localStorage override)
 * - Automatic retry with exponential backoff
 * - Model fallback (gemini-2.0-flash → gemini-2.0-flash-lite → gemini-1.5-flash)
 * - Clear, actionable error messages
 */

const STORAGE_KEY = "gemini_api_key_override";

const MODELS = [
	"gemini-2.0-flash",
	"gemini-2.0-flash-lite",
	"gemini-1.5-flash",
];

const MAX_RETRIES = 2;
const BASE_DELAY_MS = 2000;

// ─── API Key Management ─────────────────────────────────────────────────────

export function getApiKey(): string {
	// 1. Check localStorage override first (set from the UI)
	const override = localStorage.getItem(STORAGE_KEY);
	if (override && override.trim()) return override.trim();

	// 2. Fall back to .env
	return (import.meta.env.VITE_GEMINI_API_KEY as string) || "";
}

export function setApiKey(key: string): void {
	if (key.trim()) {
		localStorage.setItem(STORAGE_KEY, key.trim());
	} else {
		localStorage.removeItem(STORAGE_KEY);
	}
}

export function getStoredOverrideKey(): string {
	return localStorage.getItem(STORAGE_KEY) || "";
}

export function clearApiKeyOverride(): void {
	localStorage.removeItem(STORAGE_KEY);
}

// ─── Core API Call ───────────────────────────────────────────────────────────

interface GeminiResponse {
	text: string;
}

interface GeminiError {
	type: "quota_exceeded" | "rate_limit" | "invalid_key" | "model_not_found" | "unknown";
	message: string;
	retryable: boolean;
}

async function callSingleModel(
	model: string,
	apiKey: string,
	prompt: string
): Promise<{ ok: true; text: string } | { ok: false; error: GeminiError }> {
	const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

	try {
		const res = await fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
		});

		const json = await res.json();

		if (!res.ok) {
			const apiError = json?.error?.message || "";
			const status = res.status;

			if (status === 429) {
				const isQuota = apiError.toLowerCase().includes("quota");
				// Check if quota limit is literally 0 (fully exhausted key)
				const isZeroQuota = apiError.includes("limit: 0");

				if (isQuota && isZeroQuota) {
					return {
						ok: false,
						error: {
							type: "quota_exceeded",
							message: `API key quota is fully exhausted (limit: 0). This key has no remaining free-tier usage.`,
							retryable: false, // No point retrying with same key/model
						},
					};
				}
				if (isQuota) {
					return {
						ok: false,
						error: {
							type: "quota_exceeded",
							message: `Quota exceeded for ${model}. ${apiError}`,
							retryable: true, // Different model might work
						},
					};
				}
				// Rate limit (temporary)
				const retryMatch = apiError.match(/retry in ([\d.]+)s/i);
				const retryDelay = retryMatch ? parseFloat(retryMatch[1]) : 0;
				return {
					ok: false,
					error: {
						type: "rate_limit",
						message: `Rate limited. ${retryDelay ? `Retry in ${Math.ceil(retryDelay)}s.` : "Please wait a moment."}`,
						retryable: true,
					},
				};
			}

			if (status === 400 || status === 403) {
				return {
					ok: false,
					error: {
						type: "invalid_key",
						message: `API key error (${status}): ${apiError || "Invalid or restricted key."}`,
						retryable: false,
					},
				};
			}

			if (status === 404) {
				return {
					ok: false,
					error: {
						type: "model_not_found",
						message: `Model "${model}" not found or not available.`,
						retryable: true, // Try next model
					},
				};
			}

			return {
				ok: false,
				error: {
					type: "unknown",
					message: `API Error ${status}: ${apiError}`,
					retryable: false,
				},
			};
		}

		// Success — extract text
		const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
		if (!text) {
			const blockReason = json?.promptFeedback?.blockReason;
			if (blockReason) {
				return {
					ok: false,
					error: {
						type: "unknown",
						message: `Response blocked by safety filter: ${blockReason}`,
						retryable: false,
					},
				};
			}
			return {
				ok: false,
				error: {
					type: "unknown",
					message: "No response generated. Try rephrasing your input.",
					retryable: false,
				},
			};
		}

		return { ok: true, text };
	} catch (networkErr: any) {
		return {
			ok: false,
			error: {
				type: "unknown",
				message: `Network error: ${networkErr?.message || "Unable to reach Gemini API"}`,
				retryable: true,
			},
		};
	}
}

// ─── Main Entry Point ────────────────────────────────────────────────────────

/**
 * Call Gemini API with automatic model fallback and retry.
 * Returns the generated text or throws a descriptive error.
 */
export async function callGemini(prompt: string): Promise<string> {
	const apiKey = getApiKey();

	if (!apiKey) {
		throw new GeminiApiError(
			"no_key",
			"No API key configured. Please enter your Gemini API key using the ⚙️ button, or add VITE_GEMINI_API_KEY to your .env file."
		);
	}

	const errors: string[] = [];

	// Try each model in order
	for (const model of MODELS) {
		let lastError: GeminiError | null = null;

		// Retry loop per model
		for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
			if (attempt > 0) {
				// Exponential backoff
				const delay = BASE_DELAY_MS * Math.pow(2, attempt - 1);
				await sleep(delay);
			}

			const result = await callSingleModel(model, apiKey, prompt);

			if (result.ok) {
				return result.text;
			}

			lastError = result.error;

			// If not retryable on this model, break to next model
			if (!result.error.retryable) break;

			// If it's a quota error (not zero), try next model immediately
			if (result.error.type === "quota_exceeded") break;
		}

		if (lastError) {
			errors.push(`[${model}] ${lastError.message}`);

			// If the key itself is invalid, don't try other models
			if (lastError.type === "invalid_key") {
				throw new GeminiApiError(
					"invalid_key",
					`🔑 ${lastError.message}\n\nPlease update your API key.`
				);
			}
		}
	}

	// All models failed
	const allQuotaExhausted = errors.every((e) => e.includes("quota") || e.includes("Quota"));

	if (allQuotaExhausted) {
		throw new GeminiApiError(
			"quota_exhausted",
			`🚨 API Quota Exhausted!\n\nAll Gemini models have been tried and your API key has no remaining free-tier quota.\n\nHow to fix:\n1. Go to aistudio.google.com\n2. Create a new API key (use a different Google account if needed)\n3. Click the ⚙️ settings icon in the app to enter your new key\n\nTechnical details:\n${errors.join("\n")}`
		);
	}

	throw new GeminiApiError(
		"all_failed",
		`❌ All API attempts failed.\n\n${errors.join("\n")}\n\nPlease check your API key and try again.`
	);
}

// ─── Error Class ─────────────────────────────────────────────────────────────

export class GeminiApiError extends Error {
	code: string;

	constructor(code: string, message: string) {
		super(message);
		this.code = code;
		this.name = "GeminiApiError";
	}

	get isQuotaError(): boolean {
		return this.code === "quota_exhausted" || this.code === "quota_exceeded";
	}

	get isKeyError(): boolean {
		return this.code === "invalid_key" || this.code === "no_key";
	}
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
