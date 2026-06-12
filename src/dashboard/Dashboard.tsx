import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../home/Navbar";
import { FileText, Globe, Eye, ArrowRight, TrendingUp, Clock, Sparkles, Download, Plus } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip,
  ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";

const defaultViewsData = [{ name: "Jan", views: 0, downloads: 0 }];
const COLORS = ["#4f46e5", "#818cf8", "#a3a3a3", "#e5e5e5"]; // indigo shades + grey
const API_BASE = "http://localhost:5000";

export default function Dashboard() {
  const userName = localStorage.getItem("userEmail")?.split("@")[0] || "there";
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalViews: 0, totalDownloads: 0, viewsData: [] });

  useEffect(() => {
    const load = async () => {
      try {
        const [r, s] = await Promise.all([
          axios.get(`${API_BASE}/api/resumes`, { withCredentials: true }),
          axios.get(`${API_BASE}/api/stats`),
        ]);
        setResumes(r.data);
        setStats({ totalViews: s.data.totalViews || 0, totalDownloads: s.data.totalDownloads || 0, viewsData: s.data.viewsData || [] });
      } catch (e) { console.error(e); } finally { setLoading(false); }
    };
    load();
  }, []);

  const activeResumes = resumes.length;

  let profileHealth = 10;
  if (resumes.length > 0) {
    const l = resumes[0];
    const fields = [l.name, l.email, l.phone, l.bio, l.address, l.skills?.length > 0, l.education?.length > 0, l.workExperience?.length > 0, l.projects?.length > 0];
    profileHealth = Math.round((fields.filter(Boolean).length / fields.length) * 100);
  }

  const templateCounts = resumes.reduce((acc: any, r: any) => {
    acc[r.template] = (acc[r.template] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(templateCounts).length > 0
    ? Object.keys(templateCounts).map(t => ({ name: t, value: templateCounts[t] }))
    : [];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] transition-colors duration-200">
      <Navbar />

      <main className="max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-20">

        {/* ── Header ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-8 border-b border-[#e5e5e5] dark:border-[#1a1a1a]"
        >
          <div>
            <p className="text-xs font-semibold text-[#4f46e5] uppercase tracking-widest mb-1.5">Dashboard</p>
            <h1 className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-1">
              Good to see you, {userName}
            </h1>
            <p className="text-sm text-[#737373]">Here's an overview of your resume activity.</p>
          </div>
          <Link to="/pages/ResumeBuilder" className="btn-primary shrink-0 text-sm px-5 py-2.5">
            <Plus className="w-3.5 h-3.5" /> New Resume
          </Link>
        </motion.div>

        {/* ── KPI Row ──────────────────────────────────── */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Views", value: stats.totalViews, icon: <Eye className="w-4 h-4" />, delay: 0.1 },
            { label: "Active Resumes", value: loading ? "—" : activeResumes, icon: <FileText className="w-4 h-4" />, delay: 0.15 },
            { label: "Downloads", value: stats.totalDownloads, icon: <Download className="w-4 h-4" />, delay: 0.2 },
            { label: "Profile Health", value: `${loading ? "—" : profileHealth + "%"}`, icon: <TrendingUp className="w-4 h-4" />, delay: 0.25, accent: true },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: kpi.delay }}
              className="card p-5"
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 ${kpi.accent ? "bg-[#4f46e5] text-white" : "bg-[#f5f5f5] dark:bg-[#1a1a1a] text-[#737373] dark:text-[#525252]"}`}>
                {kpi.icon}
              </div>
              <p className="text-2xl font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-0.5">{kpi.value}</p>
              <p className="text-xs text-[#a3a3a3]">{kpi.label}</p>
            </motion.div>
          ))}
        </section>

        {/* ── Charts ───────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

          {/* Area chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="card lg:col-span-2 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa]">Performance</h3>
                <p className="text-xs text-[#a3a3a3] mt-0.5">Views & downloads over time</p>
              </div>
              <span className="text-xs text-[#a3a3a3] bg-[#f5f5f5] dark:bg-[#1a1a1a] px-2.5 py-1 rounded-md border border-[#e5e5e5] dark:border-[#262626]">
                Last 7 months
              </span>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.viewsData.length > 0 ? stats.viewsData : defaultViewsData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gV" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0a0a0a" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#0a0a0a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gD" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 4" vertical={false} stroke="#e5e5e5" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#a3a3a3", fontSize: 11 }} dy={8} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#a3a3a3", fontSize: 11 }} />
                  <RechartsTooltip
                    contentStyle={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "12px", color: "#0a0a0a", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
                    itemStyle={{ color: "#404040" }}
                    labelStyle={{ color: "#737373", marginBottom: "2px" }}
                  />
                  <Legend verticalAlign="top" height={32} iconType="circle" wrapperStyle={{ fontSize: "11px", color: "#737373" }} />
                  <Area type="monotone" dataKey="views" name="Views" stroke="#0a0a0a" strokeWidth={2} fill="url(#gV)" />
                  <Area type="monotone" dataKey="downloads" name="Downloads" stroke="#4f46e5" strokeWidth={2} fill="url(#gD)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Donut chart */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="card p-6 flex flex-col"
          >
            <h3 className="text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa] mb-0.5">Templates Used</h3>
            <p className="text-xs text-[#a3a3a3] mb-4">Distribution by template type</p>
            <div className="flex-grow h-52">
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="46%" innerRadius={52} outerRadius={76} paddingAngle={3} dataKey="value" stroke="none">
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: "8px", fontSize: "12px", color: "#0a0a0a" }}
                      itemStyle={{ color: "#404040" }}
                    />
                    <Legend verticalAlign="bottom" height={32} iconType="circle" wrapperStyle={{ fontSize: "11px" }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-full border-[12px] border-[#f5f5f5] dark:border-[#1a1a1a] flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-[#a3a3a3] uppercase tracking-wider">No Data</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* ── Quick Actions ─────────────────────────────── */}
        <section>
          <h2 className="text-sm font-semibold text-[#0a0a0a] dark:text-[#fafafa] mb-4">Quick actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { to: "/pages/pdfbuilder", icon: <Sparkles className="w-4 h-4" />, title: "Design a PDF Resume", desc: "Create a polished resume with AI assistance." },
              { to: "/pages/PdftoWeb", icon: <Globe className="w-4 h-4" />, title: "Convert to Website", desc: "Turn your resume into an online portfolio." },
              { to: "/Nav-bar components", icon: <FileText className="w-4 h-4" />, title: "Manage Resumes", desc: "View, edit, or delete your resume files." },
            ].map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 + i * 0.05 }}
              >
                <Link
                  to={a.to}
                  className="card p-5 flex items-center gap-4 group hover:border-[#4f46e5]/30 block"
                >
                  <div className="w-9 h-9 bg-[#f5f5f5] dark:bg-[#1a1a1a] rounded-lg flex items-center justify-center text-[#737373] group-hover:bg-[#4f46e5] group-hover:text-white transition-all duration-200 shrink-0">
                    {a.icon}
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-medium text-[#0a0a0a] dark:text-[#fafafa] mb-0.5">{a.title}</p>
                    <p className="text-xs text-[#a3a3a3] leading-relaxed">{a.desc}</p>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4d4d4] dark:text-[#333] group-hover:text-[#4f46e5] group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e5e5e5] dark:border-[#1a1a1a] text-center py-8">
        <p className="text-xs text-[#a3a3a3]">© {new Date().getFullYear()} ResumeBuilderPro</p>
      </footer>
    </div>
  );
}
