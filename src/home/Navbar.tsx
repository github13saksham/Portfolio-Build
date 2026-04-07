import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, FileText, Home as HomeIcon, MessageSquare, BarChart3, User, LayoutTemplate, LogOut } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

function Navbar() {
	const location = useLocation();
	const navigate = useNavigate();
	const [theme, setTheme] = useState("light");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const [isSignedIn, setIsSignedIn] = useState(!!localStorage.getItem("userEmail"));
	const [showProfileMenu, setShowProfileMenu] = useState(false);

	useEffect(() => {
		const savedTheme = localStorage.getItem("theme") || "light";
		setTheme(savedTheme);
		document.body.className = savedTheme;
		
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		
		const checkAuth = () => {
			setIsSignedIn(!!localStorage.getItem("userEmail"));
		};
		window.addEventListener("auth-changed", checkAuth);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener("auth-changed", checkAuth);
		};
	}, []);

	const toggleMode = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.body.className = newTheme;
		localStorage.setItem("theme", newTheme);
	};

	const handleSignOut = async () => {
		try {
			await axios.post(`${API_BASE}/api/auth/logout`, {}, { withCredentials: true });
		} catch (err) {
			console.error("Logout error", err);
		}
		localStorage.removeItem("userId");
		localStorage.removeItem("userEmail");
		setIsSignedIn(false);
		setShowProfileMenu(false);
		window.dispatchEvent(new Event("auth-changed"));
		navigate("/auth");
	};

	const isActive = (path: string) => {
		return location.pathname === path;
	};

	const navLinks = [
		{ path: "/", label: "Home", icon: HomeIcon },
		{ path: "/templates", label: "Templates", icon: LayoutTemplate },
		{ path: "/home/chat-bot", label: "AI Suggestions", icon: MessageSquare },
		{ path: "/dashboard", label: "Dashboard", icon: BarChart3 },
		{ path: "/Nav-bar components", label: "My Resume", icon: FileText },
	];

	return (
		<nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
			scrolled 
				? "bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/10 shadow-sm py-3" 
				: "bg-transparent py-5"
		}`}>
			<div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
				<div className="flex justify-between items-center">
					{/* Logo */}
					<div className="flex items-center">
						<Link to="/" className="flex items-center gap-3 group">
							<div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md border border-white/10 group-hover:shadow-[0_4px_20px_rgb(79,70,229,0.4)] transition-all duration-300 group-hover:scale-105">
								<FileText className="w-5 h-5 text-white" strokeWidth={2.5} />
							</div>
							<span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-300">
								Resume Builder
							</span>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex flex-1 items-center justify-center">
						<div className={`flex items-center space-x-2 px-2 py-1.5 rounded-2xl transition-all duration-500 ${scrolled ? 'bg-transparent' : 'bg-white/50 dark:bg-black/20 backdrop-blur-md border border-slate-200/50 dark:border-white/5'}`}>
							{navLinks.map(({ path, label, icon: Icon }) => (
								<Link
									key={path}
									to={path}
									className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group ${
										isActive(path)
											? "text-blue-600 dark:text-blue-400"
											: "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
									}`}
								>
									{isActive(path) && (
										<div className="absolute inset-0 bg-blue-50 dark:bg-blue-500/10 rounded-xl -z-10 transition-transform duration-300"></div>
									)}
									<Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
									<span>{label}</span>
								</Link>
							))}
						</div>
					</div>

					{/* Theme Toggle & Auth */}
					<div className="hidden md:flex items-center space-x-4">
						{/* Theme Toggle */}
						<button
							onClick={toggleMode}
							className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
							aria-label="Toggle theme"
						>
							<div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
								<Sun className={`absolute w-5 h-5 transition-transform duration-500 ${theme === 'dark' ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`} />
								<Moon className={`absolute w-5 h-5 transition-transform duration-500 ${theme === 'light' ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100'}`} />
							</div>
						</button>

						{/* Auth */}
						{isSignedIn ? (
							<div className="relative ml-2">
								<button 
									onClick={() => setShowProfileMenu(!showProfileMenu)}
									className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 shadow-sm hover:shadow-md transition-all"
								>
									<User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
								</button>
								
								{showProfileMenu && (
									<div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg py-1 z-50">
										<button 
											onClick={handleSignOut}
											className="w-full flex items-center gap-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300 transition-colors text-sm"
										>
											<LogOut className="w-4 h-4" />
											<span>Sign Out</span>
										</button>
									</div>
								)}
							</div>
						) : (
							<Link
								to="/auth"
								className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold text-sm hover:shadow-[0_8px_20px_rgb(0,0,0,0.1)] dark:hover:shadow-[0_8px_20px_rgb(255,255,255,0.15)] transition-all duration-300 hover:-translate-y-0.5 ml-2"
							>
								<User className="w-4 h-4" />
								<span>Sign In</span>
							</Link>
						)}
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center gap-3">
						<button
							onClick={toggleMode}
							className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
						>
							{theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
						</button>
						<button
							onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
							className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
						>
							{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
						</button>
					</div>
				</div>

				{/* Mobile Menu Dropdown */}
				<div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
					<div className="px-4 pt-2 pb-6 space-y-2 bg-white/95 dark:bg-[#0a0f1c]/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl">
						{navLinks.map(({ path, label, icon: Icon }) => (
							<Link
								key={path}
								to={path}
								onClick={() => setMobileMenuOpen(false)}
								className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 ${
									isActive(path)
										? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
										: "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
									}`}
							>
								<Icon className={`w-5 h-5 ${isActive(path) ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
								<span>{label}</span>
							</Link>
						))}

						{!isSignedIn ? (
							<div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
								<Link
									to="/auth"
									onClick={() => setMobileMenuOpen(false)}
									className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-semibold shadow-md"
								>
									<User className="w-5 h-5" />
									<span>Sign In / Sign Up</span>
								</Link>
							</div>
						) : (
							<div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
								<button
									onClick={() => {
										setMobileMenuOpen(false);
										handleSignOut();
									}}
									className="flex items-center justify-center gap-2 w-full px-4 py-3.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl font-semibold hover:bg-red-100 dark:hover:bg-red-500/20 transition-all"
								>
									<LogOut className="w-5 h-5" />
									<span>Sign Out</span>
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
