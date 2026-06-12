import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/home/Navbar";
import { Search, LayoutTemplate, Star, ArrowRight, CheckCircle, Monitor, Smartphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["All", "Professional", "Creative", "Minimalist", "Developer", "Academic", "Finance", "Medical", "Dark"];

const TEMPLATES = [
  { id: "pro-exec", name: "Executive Pro", category: "Professional", rating: 4.9, reviews: 1240, badges: ["Best Seller", "ATS Friendly"], features: ["Clean Typography", "Timeline Layout", "Skill Graphs"], description: "A traditional, proven layout engineered to pass ATS systems while retaining a sleek, modern edge.", path: "/pages/pdfbuilder?template=pro-exec", thumb: "bg-[#1e293b]" },
  { id: "neo-creative", name: "Neo Creative", category: "Creative", rating: 4.8, reviews: 856, badges: ["New", "Web Portfolio"], features: ["Bold Colors", "Masonry Grid", "Dark Mode Ready"], description: "Stand out with this daring, vibrant design. Perfect for designers, marketers, and creative technologists.", path: "/pages/ResumeBuilder?template=neo-creative", thumb: "bg-[#7c3aed]" },
  { id: "clean-minimal", name: "Clean Minimal", category: "Minimalist", rating: 4.9, reviews: 2100, badges: ["Most Popular"], features: ["Lots of Whitespace", "Single Column", "Elegant Serif"], description: "Let your experience speak. A beautifully restrained design with perfect typographical hierarchy.", path: "/pages/pdfbuilder?template=clean-minimal", thumb: "bg-[#f1f5f9] border border-[#e2e8f0]" },
  { id: "dev-terminal", name: "Terminal Tech", category: "Developer", rating: 4.7, reviews: 432, badges: ["For Devs"], features: ["Monospace Fonts", "Syntax Highlighting", "GitHub Stats"], description: "A hacker-inspired theme that formats your resume like a beautiful dark-mode terminal.", path: "/pages/ResumeBuilder?template=dev-terminal", thumb: "bg-[#0d1117]" },
  { id: "academic-classic", name: "Oxford Scholar", category: "Academic", rating: 4.6, reviews: 320, badges: ["For CVs"], features: ["Multi-page Support", "Publication Links", "Classic Serif"], description: "Designed for comprehensive CVs. Handles extensive publication lists and academic history beautifully.", path: "/pages/pdfbuilder?template=academic-classic", thumb: "bg-[#1e3a5f]" },
  { id: "startup-hustle", name: "Startup Hustle", category: "Creative", rating: 4.8, reviews: 671, badges: [], features: ["Dynamic Layout", "Impact Metrics", "Vibrant"], description: "Fast, loud, and impactful. For the startup operator who wants to highlight massive growth metrics.", path: "/pages/ResumeBuilder?template=startup-hustle", thumb: "bg-[#ea580c]" },
  { id: "finance-strict", name: "Wall Street", category: "Finance", rating: 4.8, reviews: 504, badges: ["ATS Friendly"], features: ["Serif Typography", "Conservative Layout", "High Contrast"], description: "Built for finance, banking, and consulting. Authoritative, precise, designed to convey trust.", path: "/pages/pdfbuilder?template=finance-strict", thumb: "bg-[#14532d]" },
  { id: "design-studio", name: "Designer Studio", category: "Creative", rating: 4.7, reviews: 389, badges: ["New"], features: ["Gradient Header", "Bold Accents", "Portfolio Ready"], description: "A vibrant, energetic design for creative professionals — designers, artists, and brand strategists.", path: "/pages/pdfbuilder?template=design-studio", thumb: "bg-[#be185d]" },
  { id: "medical-clean", name: "Medical Clean", category: "Medical", rating: 4.6, reviews: 278, badges: ["ATS Friendly"], features: ["Clean Structure", "Clinical Precision", "Easy to Read"], description: "Designed for healthcare and pharmaceutical professionals. Clean, structured, highly professional.", path: "/pages/pdfbuilder?template=medical-clean", thumb: "bg-[#0e7490]" },
  { id: "legal-formal", name: "Legal Formal", category: "Professional", rating: 4.7, reviews: 195, badges: ["ATS Friendly"], features: ["Formal Typography", "Dense Layout", "Conservative Palette"], description: "Crafted for legal, government, and policy professionals. Authoritative with a no-nonsense design.", path: "/pages/pdfbuilder?template=legal-formal", thumb: "bg-[#374151]" },
  { id: "royal-gold", name: "Royal Gold", category: "Professional", rating: 4.9, reviews: 412, badges: ["Premium Look"], features: ["Gold Gradient Header", "Serif Fonts", "Luxury Feel"], description: "An opulent design with gold accents. Make a commanding first impression for senior leadership roles.", path: "/pages/pdfbuilder?template=royal-gold", thumb: "bg-[#d97706]" },
  { id: "midnight-dark", name: "Midnight Dark", category: "Dark", rating: 4.8, reviews: 567, badges: ["Dark Mode"], features: ["Full Dark Theme", "Indigo Accents", "Modern & Sleek"], description: "A stunning full dark-mode resume for tech, gaming, and digital media roles.", path: "/pages/pdfbuilder?template=midnight-dark", thumb: "bg-[#1e1b4b]" },
];

export default function TemplatesPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<typeof TEMPLATES[0] | null>(null);

  const filtered = TEMPLATES.filter(t => {
    const matchCat = activeCategory === "All" || t.category === activeCategory;
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-[#fafafa] transition-colors duration-200">
      <Navbar />

      <main className="max-w-5xl mx-auto px-5 sm:px-8 pt-28 pb-20">

        {/* Header */}
        <div className="mb-12">
          <p className="text-[#4f46e5] text-xs font-semibold uppercase tracking-widest mb-3">Templates</p>
          <h1 className="text-4xl md:text-5xl font-bold text-[#0a0a0a] dark:text-[#fafafa] mb-4">
            Find your template
          </h1>
          <p className="text-[#737373] dark:text-[#a3a3a3] max-w-xl">
            Professionally designed, ATS-optimized resume templates for every industry and career level.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a3a3a3]" />
          <input
            type="text"
            placeholder="Search by name, style, or profession..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="form-input pl-10 py-3"
          />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-[#e5e5e5] dark:border-[#1a1a1a]">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                activeCategory === cat
                  ? "bg-[#0a0a0a] dark:bg-[#fafafa] text-white dark:text-[#0a0a0a]"
                  : "border border-[#e5e5e5] dark:border-[#262626] text-[#737373] dark:text-[#737373] hover:border-[#a3a3a3] hover:text-[#0a0a0a] dark:hover:text-[#fafafa]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
                className="card flex flex-col group"
              >
                {/* Thumbnail */}
                <div className={`${t.thumb} aspect-[4/3] relative overflow-hidden rounded-t-xl flex items-end p-4`}>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 z-10">
                    {t.badges.map(b => (
                      <span key={b} className="px-2.5 py-0.5 bg-white/90 dark:bg-black/70 text-[#0a0a0a] dark:text-[#fafafa] text-[10px] font-bold rounded-full">
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Mock resume lines */}
                  <div className="absolute inset-0 flex flex-col justify-center px-6 opacity-30">
                    <div className="w-1/2 h-3 bg-white/60 rounded mb-3" />
                    <div className="w-full h-1.5 bg-white/40 rounded mb-1.5" />
                    <div className="w-4/5 h-1.5 bg-white/40 rounded mb-1.5" />
                    <div className="w-full h-1.5 bg-white/30 rounded mb-4" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-10 bg-white/20 rounded-lg" />
                      <div className="h-10 bg-white/20 rounded-lg" />
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#0a0a0a]/70 opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center justify-center gap-3">
                    <button
                      onClick={() => navigate(t.path)}
                      className="px-5 py-2.5 bg-white text-[#0a0a0a] rounded-lg font-semibold text-sm flex items-center gap-1.5 hover:bg-[#f5f5f5] transition-colors"
                    >
                      Use Template <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setPreviewTemplate(t)}
                      className="px-5 py-2.5 bg-white/20 text-white border border-white/30 rounded-lg font-semibold text-sm hover:bg-white/30 transition-colors"
                    >
                      Preview
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-grow flex flex-col">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-[#0a0a0a] dark:text-[#fafafa] text-sm">{t.name}</h3>
                      <p className="text-xs text-[#a3a3a3] mt-0.5">{t.category}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <Star className="w-3.5 h-3.5 fill-[#0a0a0a] dark:fill-[#fafafa] text-[#0a0a0a] dark:text-[#fafafa]" />
                      <span className="text-xs font-semibold text-[#0a0a0a] dark:text-[#fafafa]">{t.rating}</span>
                      <span className="text-xs text-[#a3a3a3]">({t.reviews})</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#737373] dark:text-[#737373] leading-relaxed mb-4 line-clamp-2 flex-grow">{t.description}</p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {t.features.map(f => (
                      <span key={f} className="flex items-center gap-1 px-2 py-0.5 bg-[#f5f5f5] dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#262626] rounded text-[10px] font-medium text-[#737373] dark:text-[#737373]">
                        <CheckCircle className="w-2.5 h-2.5 text-[#4f46e5]" /> {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#f5f5f5] dark:border-[#1a1a1a]">
                    <span className="text-xs font-semibold text-[#0a0a0a] dark:text-[#fafafa]">Free</span>
                    <div className="flex items-center gap-2 text-[#a3a3a3]">
                      <Monitor className="w-3.5 h-3.5" />
                      <Smartphone className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="w-14 h-14 bg-[#f5f5f5] dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#262626] rounded-xl flex items-center justify-center mx-auto mb-4">
              <Search className="w-6 h-6 text-[#a3a3a3]" />
            </div>
            <h3 className="font-semibold text-[#0a0a0a] dark:text-[#fafafa] mb-1">No templates found</h3>
            <p className="text-sm text-[#a3a3a3] mb-4">Try adjusting your search or category.</p>
            <button
              onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
              className="btn-primary text-sm px-5 py-2"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-[#0a0a0a] dark:bg-[#fafafa] rounded-xl p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white dark:text-[#0a0a0a] mb-2">Can't decide?</h2>
            <p className="text-[#737373] dark:text-[#525252] text-sm max-w-sm">Start with our most popular template. You can always switch later without losing any content.</p>
          </div>
          <button
            onClick={() => navigate("/pages/pdfbuilder?template=clean-minimal")}
            className="shrink-0 flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#0a0a0a] text-[#0a0a0a] dark:text-white font-semibold rounded-lg text-sm hover:bg-[#f5f5f5] dark:hover:bg-[#141414] transition-all"
          >
            Start with Minimal <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Preview modal */}
      <AnimatePresence>
        {previewTemplate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setPreviewTemplate(null)} />
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 16 }}
              className="relative w-full max-w-2xl bg-white dark:bg-[#141414] rounded-2xl border border-[#e5e5e5] dark:border-[#262626] shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#f5f5f5] dark:border-[#1f1f1f]">
                <div>
                  <h2 className="font-semibold text-[#0a0a0a] dark:text-[#fafafa]">{previewTemplate.name}</h2>
                  <p className="text-xs text-[#a3a3a3]">{previewTemplate.category} · {previewTemplate.rating} ★</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => { navigate(previewTemplate.path); setPreviewTemplate(null); }}
                    className="btn-primary text-xs px-4 py-2"
                  >
                    Use this template
                  </button>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e5e5e5] dark:border-[#262626] text-[#737373] hover:text-[#0a0a0a] dark:hover:text-[#fafafa] transition-colors text-lg leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className={`${previewTemplate.thumb} aspect-video rounded-lg flex items-center justify-center`}>
                  <div className="text-white/60 text-sm font-medium">{previewTemplate.name} preview</div>
                </div>
                <p className="mt-4 text-sm text-[#737373] dark:text-[#a3a3a3] leading-relaxed">{previewTemplate.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {previewTemplate.features.map(f => (
                    <span key={f} className="flex items-center gap-1 px-2.5 py-1 bg-[#f5f5f5] dark:bg-[#1a1a1a] border border-[#e5e5e5] dark:border-[#262626] rounded-lg text-xs font-medium text-[#737373]">
                      <CheckCircle className="w-3 h-3 text-[#4f46e5]" /> {f}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
