import React, { useState } from "react";
import { Sparkles, ArrowLeft, Mail, Lock, Loader2, UserPlus, LogIn, Github, Chrome } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

// API Base configuration
const API_BASE = "http://localhost:5000";

export default function Signin() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
      const { data } = await axios.post(`${API_BASE}${endpoint}`, {
        email,
        password,
      }, { withCredentials: true });

      // On success, the cookie is set by the browser automatically.
      // We just need to trigger the auth check in App.tsx.
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Authentication failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-700">
      {/* Dynamic Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[120px]" 
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.05)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.4)_100%)]" />
      </div>

      {/* Floating Back Button */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-8 z-50"
      >
        <Link to="/" className="group flex items-center gap-2 px-5 py-2.5 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-white/10 transition-all shadow-xl shadow-slate-200/20 dark:shadow-none">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Exit to Portal</span>
        </Link>
      </motion.div>

      <div className="relative z-10 w-full max-w-5xl grid lg:grid-cols-2 gap-8 items-center">
        
        {/* Left Side: Creative Illustration / Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:flex flex-col space-y-8 pr-12"
        >
          <div className="space-y-4">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 dark:bg-blue-400/10 rounded-full border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Intelligence Powered
            </motion.div>
            <h2 className="text-5xl xl:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Design your future <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">pixel by pixel.</span>
            </h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium max-w-md italic">
              "The best way to predict the future is to create it."
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "AI Optimization", sub: "ATS Friendly" },
              { label: "Premium Templates", sub: "Designed by Experts" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="p-5 bg-white/30 dark:bg-white/5 backdrop-blur-md rounded-3xl border border-white/20 dark:border-white/5 shadow-inner"
              >
                <div className="text-lg font-bold text-slate-800 dark:text-slate-200">{item.label}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Interactive Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          {/* Glass Card */}
          <div className="bg-white/80 dark:bg-slate-900/40 backdrop-blur-[40px] border border-white dark:border-white/10 rounded-[3rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
            
            {/* Header */}
            <div className="mb-10 flex flex-col items-center">
              <motion.div 
                whileHover={{ rotate: 15 }}
                className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 mb-6"
              >
                <LogIn className="w-8 h-8 text-white" />
              </motion.div>
              <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">
                {isLogin ? "Welcome Back" : "Join the Elite"}
              </h1>
              <div className="flex gap-1 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                <span>Secure</span> • <span>Encrypted</span> • <span>Private</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.form 
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSubmit} 
                className="space-y-6"
              >
                {error && (
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-bold text-center"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="group space-y-2">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">Credential Access</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 dark:text-slate-600">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-5 py-4 bg-slate-100 dark:bg-slate-800/50 border border-transparent dark:border-white/5 rounded-[1.25rem] focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/5 outline-none text-slate-900 dark:text-white font-medium transition-all placeholder:text-slate-400"
                      placeholder="Email Identity"
                      required
                    />
                  </div>
                </div>

                <div className="group space-y-2">
                  <label className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase ml-1 tracking-widest group-focus-within:text-blue-500 transition-colors">Access Key</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 dark:text-slate-600">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-14 pr-5 py-4 bg-slate-100 dark:bg-slate-800/50 border border-transparent dark:border-white/5 rounded-[1.25rem] focus:bg-white dark:focus:bg-slate-800 focus:ring-4 focus:ring-blue-500/10 dark:focus:ring-blue-500/5 outline-none text-slate-900 dark:text-white font-medium transition-all placeholder:text-slate-400"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black py-4.5 rounded-[1.25rem] shadow-xl dark:shadow-white/5 hover:shadow-2xl transition-all flex justify-center items-center gap-3"
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                      <span>{isLogin ? "AUTHENTICATE" : "ESTABLISH ID"}</span>
                    </>
                  )}
                </motion.button>
              </motion.form>
            </AnimatePresence>

            {/* Social Separator */}
            <div className="my-10 flex items-center gap-4">
              <div className="h-px flex-grow bg-slate-200 dark:bg-white/5" />
              <span className="text-[10px] font-black text-slate-400 dark:text-slate-600 tracking-tighter uppercase">External Neural Links</span>
              <div className="h-px flex-grow bg-slate-200 dark:bg-white/5" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                <Github className="w-4 h-4" /> Github
              </button>
              <button className="flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-white/10 transition-all">
                <Chrome className="w-4 h-4" /> Google
              </button>
            </div>

            {/* Footer Toggle */}
            <div className="mt-10 text-center">
              <button 
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-black tracking-widest uppercase transition-colors"
              >
                {isLogin ? "No identity detected? Create Portal" : "Existing identity? Recalibrate"}
              </button>
            </div>
          </div>

          {/* Decorative small cards behind */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] pointer-events-none opacity-50 dark:opacity-20 flex items-center justify-center">
             <div className="w-full h-full border border-blue-500/20 rounded-[4rem] rotate-3 scale-95 animate-pulse" />
             <div className="absolute w-full h-full border border-purple-500/20 rounded-[4rem] -rotate-3 scale-90 animate-pulse" />
          </div>
        </motion.div>

      </div>
    </div>
  );
}
