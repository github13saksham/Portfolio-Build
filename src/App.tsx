import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import ApiKeySettings from "./components/ApiKeySettings";


const API_BASE = "http://localhost:5000";

function App() {
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/auth/me`, { withCredentials: true });
        setUser(data);
        localStorage.setItem("userEmail", data.email);
      } catch (err) {
        setUser(null);
        localStorage.removeItem("userEmail");
      } finally {
        setIsLoaded(true);
      }
    };

    checkAuth();
    
    const handleAuthChange = () => checkAuth();
    window.addEventListener("auth-changed", handleAuthChange);
    return () => window.removeEventListener("auth-changed", handleAuthChange);
  }, []);

  if (!isLoaded) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0f1c]">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) {
    return <Navigate to={"/auth"} replace />;
  }

  return (
    <>
      <Outlet />
      <ApiKeySettings />
    </>
  );
}

export default App;
