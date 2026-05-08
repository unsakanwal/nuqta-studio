import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { 
  Clipboard, Edit3, Rocket, Palette, Clock, User, Zap, Star, Building,
  Layers, Image as ImageIcon, Share2, Megaphone, Video, Sparkles,
  Phone, Mail, Instagram, Menu, X, Check
} from "lucide-react";
import { SiMeta, SiGoogleads, SiInstagram, SiYoutube, SiTiktok, SiWhatsapp, SiShopify, SiMailchimp, SiFigma } from "react-icons/si";

import { useCountUp } from "@/hooks/useCountUp";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
const logoPath = "/logo.png";
const heroImagePath = "/homesection.jpg";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

function SectionHeader({ label, title, titleHighlight, subtext }: { label: string, title: string, titleHighlight?: string, subtext: string }) {
  return (
    <motion.div 
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="text-center max-w-2xl mx-auto mb-8"
    >
      <div className="text-primary font-bold tracking-widest uppercase text-sm mb-4">{label}</div>
      <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
        {titleHighlight ? (
          <>
            {title.split(titleHighlight)[0]}
            <span className="text-primary">{titleHighlight}</span>
            {title.split(titleHighlight)[1]}
          </>
        ) : title}
      </h2>
      <p className="text-muted-foreground text-lg">{subtext}</p>
    </motion.div>
  );
}

function StatsCounter({ end, label }: { end: number, label: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCountUp(end, 2000, isInView);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-6xl font-bold text-primary mb-2">
        {count}{end === 100 ? "%" : "+"}
      </div>
      <div className="text-sm md:text-base text-foreground font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

// Client logos data from PDF portfolio
const clientLogos = [
  { name: "Beauty Salon", img: "/Beautysalon.png" },
  { name: "BTS Brands", img: "/BTSbrands.jpg" },
  { name: "Furniturizm", img: "/Furniturizm .jpg" },
  { name: "Hair Castle", img: "/hairCastle.jpg" },
  { name: "ICSA Group", img: "/ICSAgroup.jpg" },
  { name: "Idyllic Repairs", img: "/IdyllicRepairs.jpg" },
  { name: "IZMA Digital", img: "/IzmaDigital.jpg" },
  { name: "IZMA Foods", img: "/IzmaFoods.jpg" },
  { name: "MadWomen Digital", img: "/madwomendigital.jpg" },
  { name: "OpenOffice", img: "/OpenOffice.jpg" },
  { name: "Paristaan", img: "/Paristaan.jpg" },
  { name: "Precise", img: "/Precise .png" },
  { name: "Sallaamti", img: "/Sallaamti.jpg" },
  { name: "Skinlogixs", img: "/Skinlogicx.jpg" },
  { name: "Tikka Hut", img: "/TikaHut.jpg" },
  { name: "Way Finder", img: "/WayFinder.jpg" },
  { name: "Zarorat Foundation", img: "/ZaroratFoundation.jpg" },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      
      {/* NAVBAR */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"}`}
      >
        <div className="container mx-auto px-6 md:px-6 flex justify-between items-center max-w-7xl">
          {/* Logo + name — mix-blend-mode removes white background */}
          <div className="flex items-center gap-3">
            <img
              src={logoPath}
              alt="Nuqta Creative Studio"
              className="h-12 object-contain"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-foreground/80 text-sm">
            <button onClick={() => scrollTo("projects")} className="hover:text-primary transition-colors duration-200">Portfolio</button>
            <button onClick={() => scrollTo("services")} className="hover:text-primary transition-colors duration-200">Services</button>
            <button onClick={() => scrollTo("process")} className="hover:text-primary transition-colors duration-200">Process</button>
            <button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors duration-200">About</button>
          </div>

          <div className="hidden md:block">
            <button
              onClick={() => scrollTo("contact")}
              className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full font-semibold text-sm hover:scale-105 hover:shadow-lg transition-all duration-200 btn-glow"
              data-testid="button-nav-cta"
            >
              Get in Touch
            </button>
          </div>

          <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-xl py-4 px-6 flex flex-col gap-3"
          >
            <button onClick={() => scrollTo("projects")} className="text-left font-medium py-2 border-b border-border/50">Portfolio</button>
            <button onClick={() => scrollTo("services")} className="text-left font-medium py-2 border-b border-border/50">Services</button>
            <button onClick={() => scrollTo("process")} className="text-left font-medium py-2 border-b border-border/50">Process</button>
            <button onClick={() => scrollTo("about")} className="text-left font-medium py-2 border-b border-border/50">About</button>
            <button onClick={() => scrollTo("contact")} className="bg-primary text-white px-6 py-3 rounded-full font-semibold text-center mt-2">
              Get in Touch
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* HERO SECTION */}
      <section id="hero" className="relative overflow-hidden min-h-screen flex items-center bg-[#faf8f5]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fdf9f3] via-[#faf8f5] to-[#f5f0e8] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-10 max-w-7xl relative z-10 pt-24 pb-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-4 items-center min-h-[calc(100vh-6rem)]">

            <div className="flex flex-col justify-center py-8">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xs font-bold tracking-[0.2em] uppercase text-foreground/50 mb-4"
              >
                Creative Agency
              </motion.p>

              <motion.h1
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="text-[2.6rem] md:text-[3.2rem] lg:text-[3.8rem] font-black leading-[1.05] text-foreground mb-4"
              >
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
                  className="block"
                >
                  We Create
                </motion.span>
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] } } }}
                  className="block text-primary"
                >
                  Brands That
                </motion.span>
                <motion.span
                  variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] } } }}
                  className="block"
                >
                  Stand Out
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.55 }}
                className="text-foreground/60 text-base leading-relaxed mb-10 max-w-sm"
              >
                Elevate your brand presence with Nuqta Creative Studio. We blend strategy, design, and technology to create visual identities that resonate and perform.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 30px rgba(245,158,11,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("contact")}
                  data-testid="button-hero-start"
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold text-base shadow-lg transition-shadow"
                >
                  Start Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04, borderColor: "#F59E0B", color: "#F59E0B" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("projects")}
                  data-testid="button-hero-portfolio"
                  className="border-2 border-foreground/25 text-foreground px-8 py-4 rounded-full font-bold text-base transition-colors"
                >
                  View Portfolio
                </motion.button>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 80, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative hidden md:flex items-center justify-center"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl w-full max-w-lg">
                <img
                  src={heroImagePath}
                  alt="Creative Studio Workspace"
                  className="w-full object-cover block"
                  style={{ maxHeight: "520px" }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.1 }}
                  className="absolute bottom-5 left-5 bg-white rounded-2xl px-5 py-4 shadow-xl"
                >
                  <div className="text-sm font-black text-foreground mb-0.5">Top Rated</div>
                  <div className="text-xs text-foreground/60 leading-snug max-w-[140px]">Voted #1 Design Agency<br />in the region for 2023.</div>
                </motion.div>
              </div>

              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-3 left-3 w-5 h-5 rounded-full bg-primary shadow-lg z-20" />
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-10 -right-2 w-3 h-3 rounded-full bg-primary/60 z-20" />
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute -bottom-2 right-10 w-4 h-4 rounded-full bg-primary/40 z-20" />
            </motion.div>

          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-12 bg-white border-y border-border relative z-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
            <StatsCounter end={50} label="Projects Completed" />
            <StatsCounter end={30} label="Happy Clients" />
            <StatsCounter end={7} label="Services" />
            <StatsCounter end={100} label="Satisfaction" />
          </div>
        </div>
      </section>

      {/* ── ABOUT US ── */}
      <section id="about" className="py-12 md:py-16 bg-[#fdf9f3]">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            {/* Left — decorative abstract block */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex items-center justify-center"
            >
              {/* Layered geometric card */}
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl bg-primary flex items-center justify-center shadow-2xl relative overflow-hidden">
                {/* Geometric pattern */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 border-[32px] border-white rounded-3xl" />
                  <div className="absolute top-6 left-6 right-6 bottom-6 border-2 border-white/30 rounded-2xl" />
                  <div className="absolute top-12 left-12 right-12 bottom-12 border border-white/20 rounded-xl" />
                </div>
                {/* Central Urdu text design */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div className="text-6xl font-black text-white leading-none" style={{ fontFamily: "Georgia, serif" }}>نقطہ</div>
                  <div className="w-16 h-0.5 bg-white/50 rounded-full" />
                  <div className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">Nuqta Studio</div>
                  {/* Decorative dots */}
                  <div className="flex gap-2 mt-2">
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                    <div className="w-2 h-2 rounded-full bg-white" />
                    <div className="w-2 h-2 rounded-full bg-white/40" />
                  </div>
                </div>
                {/* Corner accents */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/40 rounded-tr-lg" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/40 rounded-bl-lg" />
              </div>

              {/* Floating stat badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-white rounded-2xl px-5 py-3 shadow-xl border border-border"
              >
                <div className="text-xl font-black text-primary">نقطہ</div>
                <div className="text-xs text-muted-foreground font-medium">Every brand begins here</div>
              </motion.div>
            </motion.div>

            {/* Right — content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-primary font-bold tracking-widest uppercase text-xs mb-3">About Us</div>
              <h2 className="text-2xl md:text-3xl font-black text-foreground mb-4 leading-tight">
                Welcome to <span className="text-primary">Nuqta</span> Studio
              </h2>

              <p className="text-foreground/70 text-sm leading-relaxed mb-3">
                Nuqta Studio is a creative and marketing agency built on a simple belief:
              </p>

              <div className="bg-primary/10 border-l-4 border-primary rounded-r-2xl px-5 py-3 mb-4">
                <p className="text-foreground font-bold text-sm italic">
                  "Every brand begins with a single idea, a nuqta."
                </p>
              </div>

              <p className="text-foreground/70 text-sm leading-relaxed mb-3">
                Our purpose is to transform that small beginning into a powerful brand presence. Through strategic thinking, creative design, and digital expertise, we help businesses find clarity, build identity, and create meaningful connections.
              </p>

              <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                We don't just design visuals, we build brands that grow, connect, and stand out.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => scrollTo("services")}
                  className="bg-primary text-white px-7 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg"
                >
                  Our Services
                </button>
                <button
                  onClick={() => scrollTo("contact")}
                  className="border-2 border-primary text-primary px-7 py-3 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-colors"
                >
                  Work With Us
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="process" className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader 
            label="Our Process"
            title="How It Works"
            titleHighlight="Works"
            subtext="A simple, transparent process designed to get you results fast, without the back-and-forth confusion."
          />

          <div className="relative max-w-5xl mx-auto">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-border z-0" />
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-3 gap-8 relative z-10"
            >
              {[
                { icon: Clipboard, step: "01", title: "Discovery & Briefing", desc: "We start by understanding your brand, goals, and target audience. A detailed briefing ensures we are fully aligned before we begin." },
                { icon: Edit3, step: "02", title: "Design & Creation", desc: "Our creative team gets to work, crafting visuals, strategies, and content tailored specifically to your brand identity." },
                { icon: Rocket, step: "03", title: "Deliver & Launch", desc: "We deliver polished, ready-to-use brand assets. You review, we refine, and we launch with confidence." },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="text-center">
                  <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl relative">
                    <item.icon size={40} />
                    <div className="absolute -top-2 -right-2 bg-foreground text-background text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-background">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader 
            label="Choose Us"
            title="Why Choose Us"
            titleHighlight="Choose Us"
            subtext="We don't just design, we build brand experiences that connect, convert, and last."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: Palette, title: "Creative Excellence", desc: "Every project is crafted with passion and originality, no templates, no shortcuts." },
              { icon: Clock, title: "On-Time Delivery", desc: "We respect your deadlines. Fast turnaround without ever compromising on quality." },
              { icon: User, title: "Client-First Approach", desc: "Your vision drives everything. We listen closely and revise until you're 100% satisfied." },
              { icon: Zap, title: "AI-Powered Speed", desc: "We leverage the latest AI tools to enhance creativity and speed up the workflow." },
              { icon: Star, title: "Quality Guaranteed", desc: "Professional-grade work backed by years of industry experience and 100+ happy clients." },
              { icon: Building, title: "All-in-One Studio", desc: "From branding to video editing, we handle everything under one roof, your one creative partner." },
            ].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-background rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white mb-4">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section id="services" className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader 
            label="What We Do"
            title="Our Services"
            titleHighlight="Services"
            subtext="From branding to AI-powered design, we deliver end-to-end creative solutions that elevate your brand."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              { icon: Layers, title: "Branding & Strategy", items: ["Logo Design", "Brand Identity", "Brand Guidelines", "Personal Branding", "Company Profile", "Product Packaging"] },
              { icon: ImageIcon, title: "Graphic Design Solutions", items: ["Social Media Posts", "Banner & Ad Creatives", "Poster Design", "Thumbnail Design", "Presentation Design"] },
              { icon: Share2, title: "Social Media Management", items: ["Content Planning", "Page Management", "Audience Engagement", "Caption Writing"] },
              { icon: Megaphone, title: "Marketing & Advertisement", items: ["Meta Ads (FB & IG)", "Google Ads", "Campaign Strategy", "Ad Creatives Design"] },
              { icon: Video, title: "Video Editing", items: ["Social Media Reels", "YouTube Videos", "Promotional Videos", "Motion Graphics"] },
              { icon: Sparkles, title: "AI-Powered Creative Services", items: ["AI Image Generation", "AI Design Assistance", "AI Content Ideas", "Creative Automation"] },
            ].map((service, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white rounded-2xl p-5 shadow-sm border border-border flex flex-col h-full hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white mb-4 shrink-0">
                  <service.icon size={24} />
                </div>
                <h3 className="text-lg font-bold mb-3">{service.title}</h3>
                <ul className="space-y-2 grow">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-muted-foreground text-sm">
                      <span className="text-primary mr-2 mt-1.5 text-xs">●</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TOOLS & PLATFORMS */}
      <section className="py-20 bg-white border-y border-border overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <SectionHeader 
            label="Tools & Platforms"
            title="Powered by Industry-Leading Platforms"
            titleHighlight="Industry-Leading"
            subtext="We work with the world's top tools and platforms to deliver outstanding results for your brand."
          />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
          >
            {[
              { icon: SiMeta, name: "Meta" },
              { icon: SiGoogleads, name: "Google Ads" },
              { icon: SiInstagram, name: "Instagram" },
              { icon: SiYoutube, name: "YouTube" },
              { icon: SiTiktok, name: "TikTok" },
              { icon: SiWhatsapp, name: "WhatsApp" },
              { icon: SiShopify, name: "Shopify" },
              { icon: SiMailchimp, name: "Mailchimp" },
              { icon: SiFigma, name: "Figma" }
            ].map((tool, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }} className="flex flex-col items-center gap-3 group">
                <tool.icon size={48} className="text-foreground group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground">{tool.name}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CREATIVE CONTRIBUTIONS ── */}
      <section id="contributions" className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader
            label="Our Clients"
            title="Creative Contributions"
            titleHighlight="Contributions"
            subtext="Brands we've had the privilege of designing, growing, and bringing to life."
          />
      
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
          >
            {clientLogos.map((client, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                className="flex items-center justify-center"
              >
                <img
                  src={client.img}
                  alt={client.name}
                  className="h-16 md:h-20 w-auto object-contain transition-all duration-300"
                  style={{ mixBlendMode: "multiply" }}
                />
              </motion.div>
            ))}
          </motion.div>
      
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-muted-foreground mt-10 text-sm"
          >
            And many more brands across Pakistan and beyond.
          </motion.p>
        </div>
      </section>

      {/* RECENT PROJECTS */}
      <section id="projects" className="py-10 md:py-14 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-10">
            <SectionHeader
              label="Our Work"
              title="Recent "
              titleHighlight="Projects"
              subtext="A glimpse into the brands we've helped build, grow, and stand out."
            />
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {[
              { img: "https://images.unsplash.com/photo-1600508774634-4e11d34730e2?w=900&q=85", cat: "Branding & Strategy", title: "Brand Identity — Zara Eats", desc: "Complete brand identity including logo, color palette, and packaging for a fast food startup." },
              { img: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=85", cat: "Social Media Management", title: "Social Media — FitZone Gym", desc: "Monthly social media content, reels, and growth strategy that grew the page to 20K followers." },
              { img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=85", cat: "Marketing & Advertisement", title: "Ad Campaign — StyleHouse", desc: "Meta Ads campaign that achieved 5x ROAS for a fashion e-commerce brand." },
              { img: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=900&q=85", cat: "Video Editing", title: "Video Series — TechTalks", desc: "YouTube video editing with motion graphics for a tech education channel." },
              { img: "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=900&q=85", cat: "Outdoor & Print Design", title: "Outdoor Print — CafePlex", desc: "Billboard, standee, and menu card designs for a cafe chain across 5 cities." },
              { img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&q=85", cat: "AI Creative Services", title: "AI Visuals — NovaTech", desc: "AI-generated product imagery and creative automation for a tech brand's launch campaign." },
            ].map((project, i) => (
              <motion.div key={i} variants={fadeInUp} className="group cursor-pointer">
                <div className="w-full aspect-[4/3] rounded-xl mb-3 overflow-hidden relative shadow-md">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-primary text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow">{project.cat}</span>
                  </div>
                </div>
                <h3 className="text-base font-bold mb-1 group-hover:text-primary transition-colors duration-200">{project.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed">{project.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-14 md:py-18 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-primary font-bold tracking-widest uppercase text-xs mb-3">Packages</div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Simple <span className="text-primary">Pricing</span></h2>
            <p className="text-muted-foreground text-sm">Transparent packages with no hidden fees. Choose what fits your brand and budget.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-background rounded-2xl p-6 border border-border shadow-sm">
              <div className="mb-5">
                <h3 className="text-lg font-bold mb-1">STARTER</h3>
                <div className="text-2xl font-black mb-2">15,000 <span className="text-sm text-muted-foreground font-normal">PKR/mo</span></div>
                <p className="text-muted-foreground text-sm">Perfect for small businesses getting started.</p>
              </div>
              <ul className="space-y-2.5 mb-4">
                {["Logo Design", "10 Social Media Posts", "Basic Brand Colors & Fonts", "1 Revision Round", "WhatsApp Support"].map((item, i) => (
                  <li key={i} className="flex items-start text-sm"><Check className="text-primary mr-2 shrink-0" size={16} /><span className="text-foreground font-medium">{item}</span></li>
                ))}
              </ul>
              <button onClick={() => scrollTo("contact")} className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-2.5 rounded-full font-bold text-sm transition-colors">Get Started</button>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1.05 }} viewport={{ once: true }} className="bg-primary text-primary-foreground rounded-2xl p-7 shadow-2xl relative z-10">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs font-bold px-3 py-1 rounded-full tracking-wider">MOST POPULAR</div>
              <div className="mb-5">
                <h3 className="text-lg font-bold mb-1">GROWTH</h3>
                <div className="text-2xl font-black mb-2">35,000 <span className="text-sm text-primary-foreground/80 font-normal">PKR/mo</span></div>
                <p className="text-primary-foreground/90 text-sm">Best for growing brands that need consistent content.</p>
              </div>
              <ul className="space-y-2.5 mb-4
              ">
                {["Full Brand Identity", "30 Social Media Posts", "2 Reels / Videos", "Meta Ads Campaign", "Caption Writing", "3 Revision Rounds", "Priority Support"].map((item, i) => (
                  <li key={i} className="flex items-start text-sm"><Check className="text-white mr-2 shrink-0" size={16} /><span className="font-medium">{item}</span></li>
                ))}
              </ul>
              <button onClick={() => scrollTo("contact")} className="w-full bg-white text-primary hover:bg-foreground hover:text-white py-3 rounded-full font-bold text-sm transition-colors shadow-lg">Get Started</button>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="bg-background rounded-2xl p-6 border border-border shadow-sm">
              <div className="mb-5">
                <h3 className="text-lg font-bold mb-1">PREMIUM</h3>
                <div className="text-2xl font-black mb-2">70,000 <span className="text-sm text-muted-foreground font-normal">PKR/mo</span></div>
                <p className="text-muted-foreground text-sm">Complete creative partnership for established brands.</p>
              </div>
              <ul className="space-y-2.5 mb-4">
                {["Everything in Growth", "Full Social Media Management", "4 Reels + YouTube Videos", "Google + Meta Ads", "AI Creative Assets", "Outdoor / Print Design", "Unlimited Revisions", "Dedicated Account Manager"].map((item, i) => (
                  <li key={i} className="flex items-start text-sm"><Check className="text-primary mr-2 shrink-0" size={16} /><span className="text-foreground font-medium">{item}</span></li>
                ))}
              </ul>
              <button onClick={() => scrollTo("contact")} className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-2.5 rounded-full font-bold text-sm transition-colors">Get Started</button>
            </motion.div>
          </div>

          <div className="text-center mt-8 max-w-xl mx-auto">
            <p className="text-sm text-muted-foreground">Need a custom package? Contact us and we'll build one around your needs.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10 md:py-14 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <SectionHeader 
            label="Client Love"
            title="What Clients Say"
            titleHighlight="Say"
            subtext="Real feedback from real clients — we let our work (and their words) speak for us."
          />

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {[
              { text: "Absolutely outstanding work! They redesigned our entire brand identity and the results were beyond what we imagined. Sales improved significantly after the rebrand.", initials: "AR", name: "Ahmed Raza", title: "E-Commerce Brand Owner" },
              { text: "My YouTube thumbnails went from average to incredible. The team understands aesthetics perfectly and delivers fast. Highly recommended for creators!", initials: "SK", name: "Sara Khan", title: "Content Creator" },
              { text: "They handled our social media completely — content, captions, ads. Our page grew from 2K to 15K followers in just 3 months. Incredible team!", initials: "BM", name: "Bilal Mehmood", title: "Restaurant Owner" }
            ].map((testimonial, i) => (
              <motion.div key={i} variants={fadeInUp} className="bg-white p-8 rounded-3xl shadow-sm border border-border flex flex-col">
                <div className="flex gap-1 mb-4 text-primary">
                  {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <p className="text-lg italic text-foreground mb-8 grow">"{testimonial.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">{testimonial.initials}</div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-14 bg-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <SectionHeader 
            label="FAQ"
            title="Common Questions"
            titleHighlight="Questions"
            subtext="Everything you need to know before working with us."
          />

          <Accordion type="single" collapsible className="w-full">
            {[
              { q: "How long does a branding project take?", a: "Most branding projects take 7–14 business days depending on complexity and the number of revision rounds." },
              { q: "Do you offer revisions?", a: "Yes! Every package includes revision rounds. Our Premium package includes unlimited revisions until you're 100% satisfied." },
              { q: "Can I order a single service without a monthly package?", a: "Absolutely! We offer one-time project pricing for logos, designs, videos, and more. Contact us to get a custom quote." },
              { q: "What file formats will I receive?", a: "You'll receive all final files in high-resolution formats including PDF, PNG, JPG, SVG, and editable source files (AI or PSD) where applicable." },
              { q: "Do you manage social media accounts directly?", a: "Yes! Our Social Media Management service includes full account management — content creation, posting, captions, and engagement." },
              { q: "How do I get started?", a: "Simply reach out via WhatsApp, email, or Instagram. We'll schedule a free discovery call to understand your needs and recommend the best plan." }
            ].map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border py-2">
                <AccordionTrigger className="text-lg font-bold hover:text-primary hover:no-underline transition-colors text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-4">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-10 md:py-14 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <SectionHeader 
            label="Get in Touch"
            title="Let's Work Together"
            titleHighlight="Together"
            subtext="Ready to elevate your brand? Reach out and let's create something amazing."
          />

          <div className="grid md:grid-cols-3 gap-8">
            <motion.a href="https://wa.me/923297646980" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform"><Phone size={32} /></div>
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground">0329-7646980</p>
            </motion.a>

            <motion.a href="mailto:nuqtacreativestudiopk@gmail.com" whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform"><Mail size={32} /></div>
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground">nuqtacreativestudiopk@gmail.com</p>
            </motion.a>

            <motion.a href="https://instagram.com/nuqtacreativestudio1" target="_blank" rel="noopener noreferrer" whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl border border-border shadow-sm flex flex-col items-center group cursor-pointer">
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white mb-4
               group-hover:scale-110 transition-transform"><Instagram size={32} /></div>
              <h3 className="text-xl font-bold mb-2">Instagram</h3>
              <p className="text-muted-foreground">@nuqtacreativestudio1</p>
            </motion.a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-border pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="lg:col-span-1">
              <img
                src={logoPath}
                alt="Nuqta Creative Studio"
                className="h-16 object-contain mb-4"
                style={{ mixBlendMode: "multiply" }}
              />
              <p className="text-muted-foreground text-sm leading-relaxed">
                Elevating brands through creative design, strategic marketing, and AI-powered solutions.
              </p>
            </div>
            
            <div>
              <h4 className="text-base font-bold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><button onClick={() => scrollTo("hero")} className="hover:text-primary transition-colors">Home</button></li>
                <li><button onClick={() => scrollTo("about")} className="hover:text-primary transition-colors">About</button></li>
                <li><button onClick={() => scrollTo("services")} className="hover:text-primary transition-colors">Services</button></li>
                <li><button onClick={() => scrollTo("process")} className="hover:text-primary transition-colors">Process</button></li>
                <li><button onClick={() => scrollTo("contact")} className="hover:text-primary transition-colors">Contact</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-bold mb-4 text-foreground">Services</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><span className="hover:text-primary transition-colors cursor-pointer">Branding & Strategy</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Graphic Design</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Social Media</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Marketing & Ads</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Video Editing</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">Print Design</span></li>
                <li><span className="hover:text-primary transition-colors cursor-pointer">AI Creative</span></li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-bold mb-4 text-foreground">Contact</h4>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><Phone size={18} className="text-primary shrink-0" /><span>0329-7646980</span></li>
                <li className="flex items-center gap-3"><Mail size={18} className="text-primary shrink-0" /><span>nuqtacreativestudiopk@gmail.com</span></li>
                <li className="flex items-center gap-3"><Instagram size={18} className="text-primary shrink-0" /><span>@nuqtacreativestudio1</span></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2025 Nuqta Creative Studio. All rights reserved.</p>
            <p>Designed with passion & precision.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}