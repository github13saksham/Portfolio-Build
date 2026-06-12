import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Sun, Moon, FileText, User, LogOut, ChevronDown } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/templates", label: "Templates" },
  { path: "/home/chat-bot", label: "AI Assistant" },
  { path: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(!!localStorage.getItem("userEmail"));
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const userEmail = localStorage.getItem("userEmail") || "";
  const userInitial = userEmail.charAt(0).toUpperCase();

  useEffect(() => {
    const saved = localStorage.getItem("theme") || "light";
    setTheme(saved);
    document.body.className = saved;

    const onScroll = () => setScrolled(window.scrollY > 20);
    const onAuth = () => setIsSignedIn(!!localStorage.getItem("userEmail"));
    window.addEventListener("scroll", onScroll);
    window.addEventListener("auth-changed", onAuth);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("auth-changed", onAuth);
    };
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.body.className = next;
    localStorage.setItem("theme", next);
  };

  const signOut = async () => {
    try { await axios.post(`${API_BASE}/api/auth/logout`, {}, { withCredentials: true }); } catch {}
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    setIsSignedIn(false);
    setProfileOpen(false);
    window.dispatchEvent(new Event("auth-changed"));
    navigate("/auth");
  };

  const isActive = (p: string) => location.pathname === p;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#e5e5e5] dark:border-[#1a1a1a] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-5 sm:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 bg-[#0a0a0a] dark:bg-[#fafafa] rounded-lg flex items-center justify-center transition-transform group-hover:scale-95">
            <FileText className="w-4 h-4 text-white dark:text-[#0a0a0a]" strokeWidth={2} />
          </div>
          <span className="font-semibold text-sm text-[#0a0a0a] dark:text-[#fafafa] tracking-tight">
            Resume Builder
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`px-3.5 py-2 text-sm rounded-md transition-colors duration-150 ${
                isActive(path)
                  ? "text-[#0a0a0a] dark:text-[#fafafa] font-medium bg-[#f5f5f5] dark:bg-[#1a1a1a]"
                  : "text-[#737373] dark:text-[#737373] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a]"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right controls */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-8 h-8 flex items-center justify-center rounded-md border border-[#e5e5e5] dark:border-[#262626] text-[#737373] dark:text-[#737373] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] transition-all duration-150"
          >
            {theme === "light"
              ? <Moon className="w-3.5 h-3.5" />
              : <Sun className="w-3.5 h-3.5" />
            }
          </button>

          {/* Auth */}
          {isSignedIn ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-[#e5e5e5] dark:border-[#262626] rounded-md text-sm text-[#0a0a0a] dark:text-[#fafafa] hover:bg-[#f5f5f5] dark:hover:bg-[#1a1a1a] transition-all"
              >
                <span className="w-5 h-5 rounded-full bg-[#4f46e5] flex items-center justify-center text-white text-[10px] font-bold">
                  {userInitial || <User className="w-3 h-3" />}
                </span>
                <ChevronDown className={`w-3 h-3 text-[#a3a3a3] transition-transform duration-150 ${profileOpen ? "rotate-180" : ""}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-1.5 w-56 bg-white dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#262626] rounded-xl shadow-lg py-1.5 z-50">
                  <div className="px-4 py-2.5 border-b border-[#f5f5f5] dark:border-[#1f1f1f]">
                    <p className="text-[10px] text-[#a3a3a3] uppercase tracking-widest mb-0.5">Signed in as</p>
                    <p className="text-sm font-medium text-[#0a0a0a] dark:text-[#fafafa] truncate">{userEmail}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#404040] dark:text-[#a3a3a3] hover:bg-[#f9f9f9] dark:hover:bg-[#1a1a1a] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={signOut}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#737373] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] hover:bg-[#f9f9f9] dark:hover:bg-[#1a1a1a] transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/auth"
              className="btn-primary px-4 py-2 text-sm"
            >
              Sign in
            </Link>
          )}
        </div>

        {/* Mobile controls */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-[#e5e5e5] dark:border-[#262626] text-[#737373]"
          >
            {theme === "light" ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-md border border-[#e5e5e5] dark:border-[#262626] text-[#0a0a0a] dark:text-[#fafafa]"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-250 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-5xl mx-auto px-5 py-4">
          <div className="bg-white dark:bg-[#141414] border border-[#e5e5e5] dark:border-[#262626] rounded-xl overflow-hidden">
            {NAV_LINKS.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-5 py-3.5 text-sm border-b border-[#f5f5f5] dark:border-[#1f1f1f] last:border-0 transition-colors ${
                  isActive(path)
                    ? "text-[#0a0a0a] dark:text-[#fafafa] font-medium bg-[#fafafa] dark:bg-[#1a1a1a]"
                    : "text-[#737373] dark:text-[#737373] hover:text-[#0a0a0a] dark:hover:text-[#fafafa]"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="p-4 border-t border-[#f5f5f5] dark:border-[#1f1f1f]">
              {!isSignedIn ? (
                <Link
                  to="/auth"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary w-full justify-center py-3"
                >
                  Sign In
                </Link>
              ) : (
                <button
                  onClick={() => { setMobileOpen(false); signOut(); }}
                  className="btn-ghost w-full justify-center py-3 text-sm"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
