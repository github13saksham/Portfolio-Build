import { useState, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import "../../index.css";
import { callGemini, GeminiApiError } from "../../utils/gemini";
import { Send, Bot, User, Sparkles, Briefcase, FileText, Loader2 } from "lucide-react";

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
        behavior: smooth ? "smooth" : "auto",
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
      setMessages(prev =>
        prev.map(msg => msg.id === messageId ? { ...msg, content: text.slice(0, index + 1) } : msg)
      );
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setMessages(prev =>
          prev.map(msg => msg.id === messageId ? { ...msg, isTyping: false } : msg)
        );
      }
    }, 12);
  };

  async function generateAnswer(userPrompt?: string) {
    const finalQuestion = (userPrompt || question).trim();
    if (!finalQuestion) return;

    const userMessage: Message = { id: Date.now(), type: "user", content: finalQuestion };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    if (!userPrompt) setQuestion("");

    try {
      const prompt = `You are an elite Tech Recruiter and ATS scoring system. Help the user with resume, portfolio, or career advice. Be concise and professional. Use dashes (-) for lists, no asterisks or markdown symbols. ${finalQuestion}`;
      let botContent = await callGemini(prompt);
      botContent = botContent.replace(/\*/g, "").replace(/#/g, "");

      const botMessage: Message = { id: Date.now() + 1, type: "bot", content: "", isTyping: true };
      setMessages(prev => [...prev, botMessage]);
      typeWriter(botContent, botMessage.id);
    } catch (error: any) {
      const errText = error instanceof GeminiApiError
        ? (error.isQuotaError ? "API quota exhausted. Please add a new API key." : error.message)
        : "Unable to generate answer. Check your API key.";
      setMessages(prev => [...prev, { id: Date.now() + 1, type: "bot", content: errText }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] flex flex-col transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex flex-col pt-16 min-h-0">

        {/* Messages area */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto px-4 sm:px-6 py-8"
        >
          {messages.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center min-h-full max-w-2xl mx-auto text-center py-16">
              <div className="w-14 h-14 bg-[#0a0a0a] dark:bg-[#fafafa] rounded-2xl flex items-center justify-center mb-6">
                <Bot className="w-7 h-7 text-white dark:text-[#0a0a0a]" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-3 tracking-tight">
                AI Resume Assistant
              </h1>
              <p className="text-[#737373] dark:text-[#737373] mb-10 max-w-sm leading-relaxed text-sm">
                Get ATS scores, keyword suggestions, and expert resume advice — powered by AI.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
                {SUGGESTIONS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => generateAnswer(item.text)}
                    disabled={isLoading}
                    className="flex items-start gap-3 p-4 bg-white dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#262626] rounded-xl text-left hover:border-[#a3a3a3] dark:hover:border-[#404040] hover:shadow-sm transition-all group disabled:opacity-50"
                  >
                    <span className="w-8 h-8 rounded-lg bg-[#f5f5f5] dark:bg-[#1a1a1a] flex items-center justify-center shrink-0 group-hover:bg-[#4f46e5] group-hover:text-white text-[#737373] transition-all">
                      <item.icon className="w-4 h-4" />
                    </span>
                    <span className="text-xs font-medium text-[#404040] dark:text-[#a3a3a3] leading-relaxed group-hover:text-[#0a0a0a] dark:group-hover:text-[#fafafa] transition-colors">
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Messages list */
            <div className="max-w-2xl mx-auto space-y-6">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${message.type === "user" ? "flex-row-reverse" : ""}`}
                >
                  {/* Avatar */}
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === "bot"
                      ? "bg-[#0a0a0a] dark:bg-[#fafafa]"
                      : "bg-[#4f46e5]"
                  }`}>
                    {message.type === "bot"
                      ? <Bot className="w-4 h-4 text-white dark:text-[#0a0a0a]" />
                      : <User className="w-4 h-4 text-white" />
                    }
                  </div>

                  {/* Bubble */}
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    message.type === "user"
                      ? "bg-[#0a0a0a] dark:bg-[#fafafa] text-white dark:text-[#0a0a0a] rounded-tr-sm"
                      : "bg-[#f5f5f5] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#262626] text-[#0a0a0a] dark:text-[#fafafa] rounded-tl-sm"
                  }`}>
                    <span className="whitespace-pre-wrap">{message.content}</span>
                    {message.isTyping && (
                      <span className="inline-block w-1.5 h-4 ml-1 bg-[#4f46e5] animate-pulse align-middle rounded-sm" />
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isLoading && !messages.some(m => m.isTyping) && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0a0a0a] dark:bg-[#fafafa] flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-white dark:text-[#0a0a0a]" />
                  </div>
                  <div className="bg-[#f5f5f5] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#262626] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a3a3a3] animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a3a3a3] animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a3a3a3] animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input bar */}
        <div className="border-t border-[#e5e5e5] dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a] px-4 sm:px-6 py-4">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <div className="relative flex-1">
              <Sparkles className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
              <input
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && generateAnswer()}
                placeholder="Ask about your resume, ATS score, keywords..."
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-[#f5f5f5] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#262626] rounded-xl text-sm text-[#0a0a0a] dark:text-[#fafafa] placeholder-[#a3a3a3] outline-none focus:border-[#4f46e5] focus:bg-white dark:focus:bg-[#1a1a1a] focus:ring-2 focus:ring-[#4f46e5]/10 transition-all"
              />
            </div>
            <button
              onClick={() => generateAnswer()}
              disabled={isLoading || !question.trim()}
              className="w-10 h-10 bg-[#0a0a0a] dark:bg-[#fafafa] text-white dark:text-[#0a0a0a] rounded-xl flex items-center justify-center hover:bg-[#1a1a1a] dark:hover:bg-[#e5e5e5] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              {isLoading
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Send className="w-4 h-4 ml-0.5" />
              }
            </button>
          </div>
          <p className="text-center text-[10px] text-[#c4c4c4] dark:text-[#404040] mt-2 max-w-2xl mx-auto">
            AI can make mistakes. Verify important career decisions independently.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Chatbot;
