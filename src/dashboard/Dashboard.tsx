import { Link } from "react-router-dom";

import { motion } from "framer-motion";
import Navbar from "../home/Navbar";
import { FileText, Globe, Eye, ArrowRight, TrendingUp, Clock, Zap, Sparkles, Download } from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';

// Mock initial data schema, will be overwritten by backend
const defaultViewsData = [
  { name: 'Jan', views: 0, downloads: 0 }
];

const resumeTypesData = [
  { name: 'Tech Resume', value: 45 },
  { name: 'Creative Portfolio', value: 30 },
  { name: 'Executive CV', value: 25 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899'];

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

function Dashboard() {
  const userName = localStorage.getItem("userEmail")?.split('@')[0] || "User";
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalViews: 0, totalDownloads: 0, viewsData: [] });

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/resumes`, { withCredentials: true });
        setResumes(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/stats`);
        setStats({ totalViews: data.totalViews || 0, totalDownloads: data.totalDownloads || 0, viewsData: data.viewsData || [] });
      } catch(e) { console.error(e); }
    };
    fetchResumes();
    fetchStats();
  }, []);

  const activeResumes = resumes.length;
  
  // Calculate profile health based on latest resume completeness
  let profileHealth = 0;
  if (resumes.length > 0) {
    const latest = resumes[0]; // ordered by updatedAt DESC
    const fields = [latest.name, latest.email, latest.phone, latest.bio, latest.address, latest.skills?.length > 0, latest.education?.length > 0, latest.workExperience?.length > 0, latest.projects?.length > 0];
    const filledFields = fields.filter(f => !!f).length;
    profileHealth = Math.round((filledFields / fields.length) * 100);
  } else {
    profileHealth = 10;
  }

  // Calculate Resume Typology
  const templateCounts = resumes.reduce((acc: any, r: any) => {
    acc[r.template] = (acc[r.template] || 0) + 1;
    return acc;
  }, {});
  
  const realResumeTypesData = Object.keys(templateCounts).length > 0 
    ? Object.keys(templateCounts).map(t => ({ name: t + ' Template', value: templateCounts[t] }))
    : [{ name: 'No Resumes', value: 1 }];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0f1c] font-sans transition-colors duration-500 overflow-hidden relative">
      {/* Ambient Glowing Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
        <div className="absolute top-40 -right-20 w-[35rem] h-[35rem] bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse style={{ animationDelay: '2s' }}"></div>
        <div className="absolute -bottom-40 left-1/4 w-[45rem] h-[45rem] bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse style={{ animationDelay: '4s' }}"></div>
      </div>

      {/* Navbar at top */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end pb-10 border-b border-slate-200/50 dark:border-white/10 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-slate-900 dark:text-white tracking-tight">
              Dashboard, <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">{userName}</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              Here's what is happening with your resumes today.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 md:mt-0"
          >
            <Link to="/pages/ResumeBuilder" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1">
              <Sparkles className="w-5 h-5" />
              New Resume
            </Link>
          </motion.div>
        </section>

        {/* Top KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            icon={<Eye className="w-6 h-6 text-white" />}
            title="Total Views"
            value={stats.totalViews.toString()}
            subtitle="All published resumes"
            trendIcon={<TrendingUp className="w-5 h-5 text-emerald-500" />}
            gradient="from-blue-500 to-cyan-500"
            delay={0.1}
          />
          <StatCard 
            icon={<FileText className="w-6 h-6 text-white" />}
            title="Active Resumes"
            value={loading ? "..." : activeResumes.toString()}
            subtitle="Real-time count"
            trendIcon={<Clock className="w-5 h-5 text-amber-500" />}
            gradient="from-emerald-500 to-teal-500"
            delay={0.2}
          />
          <StatCard 
            icon={<Globe className="w-6 h-6 text-white" />}
            title="Total Downloads"
            value={stats.totalDownloads.toString()}
            subtitle="Tracking PDF exports"
            trendIcon={<Download className="w-5 h-5 text-indigo-500" />}
            gradient="from-purple-500 to-pink-500"
            delay={0.3}
          />
          {/* Profile Completion Mini Card */}
           <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-6 shadow-sm flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-orange-400/30 transition-colors"></div>
              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1 z-10 relative">Profile Health</h3>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent mb-1 z-10 relative">{loading ? "..." : `${profileHealth}%`}</p>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 z-10 relative">{profileHealth > 80 ? "Looking excellent!" : "Keep filling details!"}</p>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2 mt-4 overflow-hidden z-10 relative">
                <motion.div
                  className="bg-gradient-to-r from-orange-400 to-amber-500 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${profileHealth}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
                ></motion.div>
              </div>
            </motion.div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Area Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-2 bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] focus-within:ring-2 focus-within:ring-blue-500/50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Performance Overview</h3>
              <select className="bg-slate-100 dark:bg-slate-800 border-none text-sm font-medium text-slate-700 dark:text-slate-300 rounded-lg px-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow cursor-pointer">
                <option>Last 7 Months</option>
                <option>This Year</option>
                <option>All Time</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.viewsData.length > 0 ? stats.viewsData : defaultViewsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.2} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '14px', color: '#64748b' }} iconType="circle"/>
                  <Area type="monotone" dataKey="views" name="Profile Views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                  <Area type="monotone" dataKey="downloads" name="Resume Downloads" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorDownloads)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Donut Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] flex flex-col"
          >
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Resume Typology</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Distribution of your active templates.</p>
            <div className="flex-grow flex items-center justify-center h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={realResumeTypesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {realResumeTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    itemStyle={{ color: '#e2e8f0' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '10px' }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <ActionCard 
            to="/pages/pdfbuilder"
            icon={<FileText className="w-6 h-6 text-white" />}
            title="Design a PDF"
            desc="Use AI to generate professional PDF resumes in seconds."
            gradient="from-blue-500 to-indigo-500"
            delay={0.7}
          />
          <ActionCard 
            to="/pages/PdftoWeb"
            icon={<ArrowRight className="w-6 h-6 text-white" />}
            title="Convert to Web"
            desc="Turn static resumes into stunning online portfolios."
            gradient="from-emerald-500 to-teal-500"
            delay={0.8}
          />
          <ActionCard 
            to="/Nav-bar components"
            icon={<Eye className="w-6 h-6 text-white" />}
            title="Manage Files"
            desc="Organize, edit, or delete your existing files."
            gradient="from-purple-500 to-pink-500"
            delay={0.9}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-white/20 dark:bg-black/20 backdrop-blur-md border-t border-slate-200/50 dark:border-white/5 text-center py-8 mt-auto">
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
          © {new Date().getFullYear()} ResumeBuilderPro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

function StatCard({ icon, title, value, subtitle, trendIcon, gradient, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="group bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-6 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] dark:hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:-translate-y-1 relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-10 dark:opacity-5 rounded-full blur-2xl -mr-6 -mt-6 group-hover:opacity-20 transition-opacity`}></div>
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center shadow-md`}>
          {icon}
        </div>
        <div className="bg-white/50 dark:bg-slate-800/80 backdrop-blur p-2 rounded-full border border-slate-100 dark:border-slate-700 shadow-sm">
          {trendIcon}
        </div>
      </div>
      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1 relative z-10">{title}</h3>
      <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2 relative z-10 tracking-tight">{value}</p>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 relative z-10">{subtitle}</p>
    </motion.div>
  );
}

function ActionCard({ to, icon, title, desc, gradient, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link
        to={to}
        className="group flex items-center h-full bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 rounded-3xl p-6 hover:bg-white/80 dark:hover:bg-white/10 transition-all duration-300 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]"
      >
        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300 mr-5`}>
          {icon}
        </div>
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{title}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{desc}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default Dashboard;
