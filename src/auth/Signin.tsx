import React, { useState } from "react";
import { ArrowLeft, Mail, Lock, Loader2, Eye, EyeOff, FileText } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const API_BASE = "http://localhost:5000";

export default function Signin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      await axios.post(`${API_BASE}${endpoint}`, { email, password }, { withCredentials: true });
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => { setIsLogin(!isLogin); setError(""); };

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0a0a0a]">

      {/* ── Left panel ──────────────────────────────── */}
      <div className="hidden lg:flex w-[42%] flex-col bg-[#0a0a0a] dark:bg-[#fafafa] px-14 py-12">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 mb-16">
          <div className="w-8 h-8 bg-white dark:bg-[#0a0a0a] rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-[#0a0a0a] dark:text-white" strokeWidth={2} />
          </div>
          <span className="text-sm font-semibold text-white dark:text-[#0a0a0a]">Resume Builder</span>
        </Link>

        {/* Body */}
        <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-4xl xl:text-5xl font-bold text-white dark:text-[#0a0a0a] leading-tight mb-5">
            Your next job<br />starts here.
          </h2>
          <p className="text-[#737373] dark:text-[#525252] text-base leading-relaxed mb-12 max-w-xs">
            AI-powered resume builder with professional templates and instant portfolio conversion.
          </p>

          {/* Feature rows */}
          <div className="space-y-4">
            {[
              "ATS-optimized templates",
              "AI writing suggestions",
              "PDF to portfolio website",
              "Free to get started",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4f46e5]" />
                <span className="text-sm text-[#a3a3a3] dark:text-[#525252]">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#525252] dark:text-[#a3a3a3]">
          © {new Date().getFullYear()} ResumeBuilderPro
        </p>
      </div>

      {/* ── Right panel: form ────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-12 relative bg-white dark:bg-[#0a0a0a]">

        {/* Back link */}
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-1.5 text-xs text-[#a3a3a3] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-sm"
        >
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-10 lg:hidden">
            <div className="w-7 h-7 bg-[#0a0a0a] dark:bg-[#fafafa] rounded-lg flex items-center justify-center">
              <FileText className="w-3.5 h-3.5 text-white dark:text-[#0a0a0a]" />
            </div>
            <span className="text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa]">Resume Builder</span>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-[#f5f5f5] dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#262626] p-1 rounded-lg mb-8">
            {["Sign In", "Create Account"].map((label, i) => {
              const active = i === 0 ? isLogin : !isLogin;
              return (
                <button
                  key={label}
                  onClick={() => { setIsLogin(i === 0); setError(""); }}
                  className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-150 ${
                    active
                      ? "bg-white dark:bg-[#262626] text-[#0a0a0a] dark:text-[#fafafa] shadow-sm"
                      : "text-[#a3a3a3] hover:text-[#737373]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? "l" : "s"}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="mb-7"
            >
              <h1 className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-1.5">
                {isLogin ? "Welcome back" : "Create your account"}
              </h1>
              <p className="text-sm text-[#a3a3a3]">
                {isLogin
                  ? "Enter your credentials to access your account."
                  : "Sign up for free. No credit card required."}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-5 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 px-4 py-3 rounded-lg"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "lf" : "sf"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-[#737373] dark:text-[#737373] mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-medium text-[#737373] dark:text-[#737373] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-input pr-10"
                    placeholder={isLogin ? "Your password" : "Min. 8 characters"}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a3a3a3] hover:text-[#737373] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-3 mt-1 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {loading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : isLogin ? "Sign In" : "Create Account"
                }
              </button>
            </motion.form>
          </AnimatePresence>

          {/* Switch mode */}
          <p className="mt-6 text-center text-xs text-[#a3a3a3]">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={switchMode}
              className="text-[#4f46e5] font-medium hover:underline transition-all"
            >
              {isLogin ? "Sign up free" : "Sign in"}
            </button>
          </p>

          {!isLogin && (
            <p className="mt-4 text-center text-[10px] text-[#c4c4c4] dark:text-[#404040]">
              By creating an account you agree to our Terms of Service.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
