import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'motion/react';
import { Plus, ArrowRight } from 'lucide-react';
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Button } from "./components/ui/button";
import svgPaths from "./imports/svg-inxdi7sgrl";
import imgMacMockup from "figma:asset/92178435c4f4e383b8d3a5e1650bc16d743bb194.png";
import LogoSvg from "./assets/Vector.svg";
import GlobeSvg from "./assets/globe.svg";
import { translate, type LanguageCode } from "./i18n";
import FlagCN from "./assets/flags/flag/CN.svg?url";
import FlagHK from "./assets/flags/flag/HK.svg?url";
import FlagHM from "./assets/flags/flag/HM.svg?url";
import FlagRU from "./assets/flags/flag/RU.svg?url";
import FlagVN from "./assets/flags/flag/VN.svg?url";

// --- Components ---

import { ExportVisualization } from "./components/ExportVisualization";

const Navbar = ({
  onContactClick,
  language,
  setLanguage,
  t
}: {
  onContactClick: () => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}) => {
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 100], [100, 80]);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isGlobeHover, setIsGlobeHover] = useState(false);
  const languageDropdownOffsetX = 12;

  const languages = [
    { code: "en" as LanguageCode, label: "English", flagSrc: FlagHM, flagAlt: "UK" },
    { code: "zh-Hant" as LanguageCode, label: "Chinese (Traditional)", flagSrc: FlagHK, flagAlt: "Hong Kong" },
    { code: "zh-Hans" as LanguageCode, label: "Chinese (Simplified)", flagSrc: FlagCN, flagAlt: "China" },
    { code: "vi" as LanguageCode, label: "Vietnamese", flagSrc: FlagVN, flagAlt: "Vietnam" },
    { code: "ru" as LanguageCode, label: "Russian", flagSrc: FlagRU, flagAlt: "Russia" }
  ];
  
  
  const textColor = useTransform(
    scrollY,
    [0, 2800, 3100],
    ["#19191b", "#19191b", "#ffffff"]
  );

  const navBg = useTransform(
    scrollY,
    [0, 2800, 3100],
    ["rgba(255,255,255,0.8)", "rgba(255,255,255,0.8)", "rgba(25,25,27,0.8)"]
  );

  const buttonBg = useTransform(
    scrollY,
    [0, 2800, 3100],
    ["#19191b", "#19191b", "#ffffff"]
  );

  const buttonText = useTransform(
    scrollY,
    [0, 2800, 3100],
    ["#ffffff", "#ffffff", "#19191b"]
  );

  const globeFilter = useTransform(
    scrollY,
    [0, 2800, 3100],
    ["none", "none", "invert(1) brightness(2)"]
  );
  const globeActiveFilter = "invert(41%) sepia(85%) saturate(3370%) hue-rotate(239deg) brightness(95%) contrast(96%)";

  const logoFilter = useTransform(
    scrollY,
    [0, 2800, 3100],
    ["invert(0)", "invert(0)", "invert(1)"]
  );

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ height, backgroundColor: navBg, color: textColor }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 md:px-24 backdrop-blur-md border-b border-black/5 transition-all duration-200"
    >
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <motion.img src={LogoSvg} alt="GRADE IQ" className="h-[40px]" style={{ filter: logoFilter, height: 40 }} />
      </div>
      
      <div className="flex items-center gap-12 font-['Prompt',sans-serif] font-medium text-lg">
        <button 
          onClick={() => {
            const el = document.getElementById('how-it-works');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
        >
          {t("nav_product")}
        </button>
        <button 
          onClick={onContactClick}
          className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
        >
          {t("nav_contact")}
        </button>
        <div className="flex items-center gap-12">
          <motion.button
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            onClick={onContactClick}
            style={{ backgroundColor: buttonBg, color: buttonText }}
            className="relative px-6 py-2.5 rounded-full flex items-center gap-2 cursor-pointer font-medium overflow-hidden group transition-colors duration-300"
          >
            <motion.div 
              variants={{
                initial: { x: "-100%" },
                hover: { x: 0 }
              }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 bg-[#7C5DED]"
            />
            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              {t("nav_demo")} <motion.div variants={{ hover: { x: 4 } }} transition={{ type: "spring", stiffness: 400, damping: 10 }}><ArrowRight size={18} /></motion.div>
            </span>
          </motion.button>
          <div className="relative">
            <motion.button
              type="button"
              aria-label="Language"
              onClick={() => setIsLanguageOpen((prev) => !prev)}
              onHoverStart={() => setIsGlobeHover(true)}
              onHoverEnd={() => setIsGlobeHover(false)}
              initial="initial"
              whileHover="hover"
              className="relative block shrink-0 cursor-pointer rounded-full"
            >
              <motion.svg
                viewBox="0 0 40 40"
                className="absolute z-0"
                style={{ width: 40, height: 40, left: -8, top: -8 }}
                variants={{
                  initial: { opacity: 0 },
                  hover: { opacity: 1 }
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.circle
                  cx="20"
                  cy="20"
                  r="18"
                  fill="none"
                  stroke="#7C5DED"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  variants={{
                    initial: { pathLength: 0 },
                    hover: { pathLength: 1 }
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.svg>
              <motion.img
                src={GlobeSvg}
                alt=""
                className="relative z-10 block"
                style={{
                  width: 24,
                  height: 24,
                  filter: isGlobeHover || isLanguageOpen ? globeActiveFilter : globeFilter
                }}
              />
            </motion.button>

            <AnimatePresence>
              {isLanguageOpen && (
                <>
                  <div
                    className="fixed inset-0"
                    style={{ zIndex: 9999 }}
                    onClick={() => setIsLanguageOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.96, x: languageDropdownOffsetX }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: languageDropdownOffsetX }}
                    exit={{ opacity: 0, y: 10, scale: 0.96, x: languageDropdownOffsetX }}
                    className="absolute left-1/2 mt-4 w-[76px] bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden flex flex-col gap-1"
                    style={{ translateX: "-50%", padding: "2px", zIndex: 10000 }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageOpen(false);
                        }}
                        aria-label={lang.label}
                        style={{ paddingInline: "10px", cursor: "pointer" }}
                        className={`w-full h-10 transition-colors flex items-center justify-center rounded-lg border border-transparent cursor-pointer
                          ${language === lang.code ? 'bg-[#7C5DED]/10 border-[#7C5DED]/20' : 'bg-transparent hover:bg-[#efeff6]'}
                        `}
                      >
                        <img
                          src={lang.flagSrc}
                          alt={lang.flagAlt}
                          className="shrink-0 object-contain"
                          style={{
                            width: 38,
                            height: 28,
                            maxWidth: "none",
                            maxHeight: "none"
                          }}
                        />
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

const PenNibIcon = () => (
  <motion.div
    initial={{ scale: 0.88, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ type: "spring", bounce: 0.3, duration: 0.28, delay: 0.4 }}
    className="size-24 -rotate-45"
  >
    <svg viewBox="0 0 148.488 148.487" fill="none" className="size-full">
      <path d={svgPaths.p258c0200} fill="#19191B" />
      <path d={svgPaths.p4c49700} fill="#19191B" />
    </svg>
  </motion.div>
);

const MacBookMockup = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      style={{ y: yParallax }}
      className="relative w-full max-w-[1300px] mx-auto mt-20"
    >
      <div className="relative scale-110 origin-center">
        <img src={imgMacMockup} alt="Grade IQ Dashboard on MacBook" className="w-full h-auto object-contain" />
      </div>
    </motion.div>
  );
};

const SolutionRow = ({
  icon: Icon,
  id,
  label,
  index,
  delay,
  isOpen,
  onToggle,
  t
}: {
  icon: any;
  id: string;
  label: string;
  index: number;
  delay: number;
  isOpen: boolean;
  onToggle: () => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const getExampleContent = () => {
    switch (id) {
      case "mathematics":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-4">{t("math_question")}</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">{t("math_option_a")}</div>
                <div className="p-3 bg-black text-white rounded-lg">{t("math_option_b")}</div>
                <div className="p-3 bg-gray-50 rounded-lg">{t("math_option_c")}</div>
                <div className="p-3 bg-gray-50 rounded-lg">{t("math_option_d")}</div>
              </div>
            </div>
            <p className="text-sm font-medium text-black/40 italic">{t("math_desc")}</p>
          </div>
        );
      case "english":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-4">{t("english_question")}</p>
              <div className="h-10 border-b-2 border-dashed border-black/20 w-32 mb-2" />
            </div>
            <p className="text-sm font-medium text-black/40 italic">{t("english_desc")}</p>
          </div>
        );
      case "chemistry":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-2">{t("chemistry_question")}</p>
              <p className="text-black text-lg py-2" style={{ fontFamily: '"Comic Sans MS", "Marker Felt", cursive' }}>
                {t("chemistry_answer")}
              </p>
              <div className="h-px bg-black/10 w-full mt-1" />
            </div>
            <p className="text-sm font-medium text-black/40 italic">{t("chemistry_desc")}</p>
          </div>
        );
      case "physics":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-4">{t("physics_question")}</p>
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-4/6" />
              </div>
            </div>
            <p className="text-sm font-medium text-black/40 italic">{t("physics_desc")}</p>
          </div>
        );
      case "biology":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-8">{t("biology_question")}</p>
              <div className="relative flex justify-between gap-12 max-w-lg mx-auto min-h-[220px]">
                {/* Left Side: Terms */}
                <div className="space-y-6 z-10 flex flex-col justify-between">
                  <div className="flex items-center gap-3 group">
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium border border-black/5 w-40 text-center">{t("biology_term1")}</div>
                    <div className="size-2 rounded-full bg-black/20 group-hover:bg-[#7C5DED] transition-colors" id="term-1" />
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium border border-black/5 w-40 text-center">{t("biology_term2")}</div>
                    <div className="size-2 rounded-full bg-black/20 group-hover:bg-[#7C5DED] transition-colors" id="term-2" />
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium border border-black/5 w-40 text-center">{t("biology_term3")}</div>
                    <div className="size-2 rounded-full bg-black/20 group-hover:bg-[#7C5DED] transition-colors" id="term-3" />
                  </div>
                </div>
                
                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" style={{ zIndex: 0 }}>
                  <defs>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7C5DED" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#7C5DED" stopOpacity="0.5" />
                    </linearGradient>
                  </defs>
                  {/* Cell Membrane (Top Left) -> enters/leaves (Bottom Right) */}
                  <path d="M 175 20 C 180 90, 270 158, 308 198" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                  {/* Mitochondria (Mid Left) -> energy (Top Right) */}
                  <path d="M 172 111 C 220 111, 280 44, 308 20" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                  {/* Ribosome (Bottom Left) -> proteins (Mid Right) */}
                  <path d="M 172 198 C 220 198, 280 111, 308 111" stroke="url(#lineGrad)" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                </svg>

                {/* Right Side: Definitions */}
                <div className="space-y-6 z-10 flex flex-col justify-between items-end">
                  <div className="flex items-center gap-3 group">
                    <div className="size-2 rounded-full bg-black/20 group-hover:bg-[#7C5DED] transition-colors" id="def-1" />
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-xs font-medium border border-black/5 w-48">{t("biology_def1")}</div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="size-2 rounded-full bg-black/20 group-hover:bg-[#7C5DED] transition-colors" id="def-2" />
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-xs font-medium border border-black/5 w-48">{t("biology_def2")}</div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="size-2 rounded-full bg-black/20 group-hover:bg-[#7C5DED] transition-colors" id="def-3" />
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-xs font-medium border border-black/5 w-48">{t("biology_def3")}</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm font-medium text-black/40 italic">{t("biology_desc")}</p>
          </div>
        );
      case "computer_science":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-4">{t("cs_question")}</p>
              <div className="flex gap-4">
                <div className="px-6 py-2 bg-black text-white rounded-full text-sm font-bold">{t("cs_true")}</div>
                <div className="px-6 py-2 bg-gray-100 text-black rounded-full text-sm font-bold">{t("cs_false")}</div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-8 text-xl text-black/60 font-['Prompt',sans-serif]">
            {t("default_desc", { title: label })}
          </div>
        );
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: delay + 0.1 }}
      className="group"
    >
      <motion.div
        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        onClick={onToggle}
        className="flex items-center justify-between py-6 px-4 border-b border-black/10 cursor-pointer overflow-hidden"
      >
        <div className="flex items-center gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25, delay: delay }}
            className="size-16 rounded-xl flex items-center justify-center overflow-hidden"
          >
             {Icon}
          </motion.div>
          <motion.p
            initial={{ x: -20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: delay + 0.1 }}
            className="font-['Prompt',sans-serif] text-xl md:text-2xl"
          >
            {label}
          </motion.p>
        </div>
        
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-black"
        >
          <Plus size={32} />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-gray-50/30"
          >
            <div className="p-8 md:p-12 font-['Prompt',sans-serif]">
              {getExampleContent()}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

import svgPathsPen from "./imports/svg-soah9mmirx";

import { ImportVisualization } from "./components/ImportVisualization";
import { GenerateVisualization } from "./components/GenerateVisualization";

const WordRotator = ({
  t,
  headingFontFamily,
  heroScale
}: {
  t: (key: string, vars?: Record<string, string | number>) => string;
  headingFontFamily: string;
  heroScale: number;
}) => {
  const words = [t("word_past_papers"), t("word_homework"), t("word_assignments")];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="relative flex items-center justify-center h-[110px] md:h-[180x] w-full max-w-full">
      {/* The Pen/Bar - sliding in from left */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="absolute inset-y-0 left-0 flex items-center pointer-events-none w-[50vw]"
        style={{ marginLeft: "calc(78vw - 1850px)", marginTop: "8px" }}
      >
        <div className="relative h-full w-full flex items-center">
          <svg 
            className="h-[120%] md:h-[150%] w-auto block overflow-visible" 
            fill="none" 
            viewBox="0 0 1710.36 149.808"
            style={{ filter: "drop-shadow(0px 4px 20px rgba(0,0,0,0.05))", transform: "scale(1.10, 1.20)" }}
          >
            <g id="Frame 39523">
              <g id="Vector">
                {/* The paths are rendered in order. We need to make sure the nib (p21f97800) is visible at the end. */}
                <path d={svgPathsPen.p32fa6980} fill="url(#paint0_linear_hero)" />
                <path d={svgPathsPen.p2c92ab00} fill="url(#paint1_linear_hero)" />
                <path d={svgPathsPen.p21f97800} fill="url(#paint2_linear_hero)" />
              </g>
            </g>
            <defs>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_hero" x1="0" x2="1710" y1="75" y2="75">
                <stop stopColor="#7C5DEC" />
                <stop offset="1" stopColor="#7C5DEC" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint1_linear_hero" x1="0" x2="1710" y1="75" y2="75">
                <stop stopColor="#7C5DEC" />
                <stop offset="1" stopColor="#7C5DEC" />
              </linearGradient>
              <linearGradient gradientUnits="userSpaceOnUse" id="paint2_linear_hero" x1="0" x2="1710" y1="75" y2="75">
                <stop stopColor="#7C5DEC" />
                <stop offset="1" stopColor="#7C5DEC" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* The Text - Centered over the bar */}
      <div className="relative z-10 w-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="font-['Anybody',sans-serif] font-black tracking-tighter text-white whitespace-nowrap block text-4xl md:text-8xl lg:text-9xl"
            style={{
              fontFamily: headingFontFamily,
              transform: `scale(${heroScale})`,
              transformOrigin: "center"
            }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Footer = ({ t }: { t: (key: string, vars?: Record<string, string | number>) => string }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#19191b] text-white py-12 px-6 md:px-24 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-['Prompt',sans-serif] opacity-40 text-sm">
        <p>{t("footer_rights", { year: currentYear })}</p>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollY } = useScroll();
  const [language, setLanguage] = useState<LanguageCode>("en");
  const t = (key: string, vars?: Record<string, string | number>) =>
    translate(language, key, vars);
  const headingFontFamily =
    language === "vi" ? '"Be Vietnam Pro", sans-serif' : '"Anybody", sans-serif';
  const isVietnamese = language === "vi";
  const isRussian = language === "ru";
  const heroScale = isVietnamese ? 0.65 : isRussian ? 0.9 : 1;

  useEffect(() => {
    const saved = localStorage.getItem("gradeiq_language") as LanguageCode | null;
    if (saved) {
      setLanguage(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("gradeiq_language", language);
  }, [language]);

  const handleContactClick = () => {
    const el = document.getElementById('contact-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Updated color transitions: 
  // Hero, MacBook, and Solutions stay White.
  // Fades to Black only for the How It Works section.
  const backgroundColor = useTransform(
    scrollY,
    [0, 2800, 3100],
    ["#ffffff", "#ffffff", "#19191b"]
  );

  const textColor = useTransform(
    scrollY,
    [0, 2800, 3100],
    ["#19191b", "#19191b", "#ffffff"]
  );

  const borderColor = useTransform(
    scrollY,
    [0, 2800, 3100],
    ["rgba(0,0,0,0.1)", "rgba(0,0,0,0.1)", "rgba(255,255,255,0.1)"]
  );

  const featuresRef = useRef(null);
  const { scrollYProgress: featuresProgress } = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"]
  });

  const featuresOpacity = useTransform(featuresProgress, [0.1, 0.3, 0.7, 0.95], [0, 1, 1, 0]);
  const featuresScale = useTransform(featuresProgress, [0.7, 0.95], [1, 0.95]);

  const steps = [
    { id: "import", label: t("step_import") },
    { id: "generate", label: t("step_generate") },
    { id: "export", label: t("step_export") }
  ];
  const [activeStep, setActiveStep] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"]
  });

  // Calculate opacity and scale for the centered title
  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const titleScale = useTransform(scrollYProgress, [0, 0.15], [1, 1.1]);
  
  // Calculate visibility for the content
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.2], [20, 0]);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      if (latest < 0.22) setActiveStep(-1);
      else if (latest < 0.45) setActiveStep(0);
      else if (latest < 0.68) setActiveStep(1);
      else setActiveStep(2);
    });
  }, [scrollYProgress]);

  return (
    <motion.div 
      style={{ backgroundColor, color: textColor }}
      className="min-h-screen selection:bg-gray-500 selection:text-white transition-colors duration-300"
    >
      <Navbar onContactClick={handleContactClick} language={language} setLanguage={setLanguage} t={t} />

      {/* Hero Section */}
      <section className="pt-40 pb-20 max-w-auto mx-auto text-center overflow-hidden">
        <div className="flex flex-col items-center">
          {/* Headline */}
          <div className={`relative flex flex-col items-center w-full ${isVietnamese ? "gap-6" : "gap-4"}`}>
            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0 }}
              className="font-['Anybody',sans-serif] font-black tracking-tighter text-6xl md:text-9xl"
              style={{
                fontFamily: headingFontFamily,
                transform: `scale(${heroScale})`,
                transformOrigin: "center"
              }}
            >
              {t("hero_generate")}
            </motion.h1>

            <WordRotator t={t} headingFontFamily={headingFontFamily} heroScale={heroScale} />

            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.16 }}
              className="font-['Anybody',sans-serif] font-black tracking-tighter text-6xl md:text-9xl"
              style={{
                fontFamily: headingFontFamily,
                transform: `scale(${heroScale})`,
                transformOrigin: "center"
              }}
            >
              {t("hero_instantly")}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-12 max-w-2xl font-['Prompt',sans-serif] text-xl md:text-2xl leading-relaxed opacity-70"
          >
            {t("hero_tagline")}
          </motion.p>

          <motion.button
            initial="initial"
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: "easeOut", delay: 0.5 }}
            onClick={handleContactClick}
            className="relative mt-12 bg-[#19191b] text-white px-10 py-5 rounded-full font-['Prompt',sans-serif] font-medium text-xl cursor-pointer overflow-hidden group"
          >
            <motion.div 
              variants={{
                initial: { x: "-100%" },
                hover: { x: 0 }
              }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              className="absolute inset-0 bg-[#7C5DED]"
            />
            <span className="relative z-10 flex items-center gap-2">
              {t("hero_contact_sales")}
              <motion.div 
                variants={{ hover: { x: 4 } }} 
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <ArrowRight size={22} />
              </motion.div>
            </span>
          </motion.button>
        </div>

        <MacBookMockup />
      </section>

      {/* Examples Section */}
      <section id="solutions" className="py-32 px-6 md:px-24 max-w-[1440px] mx-auto text-center">
        <motion.h2
          initial={{ y: -10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="font-['Anybody',sans-serif] font-black text-5xl md:text-7xl mb-16 inline-block"
          style={{ fontFamily: headingFontFamily }}
        >
          {t("examples_title")}
        </motion.h2>

        <motion.div style={{ borderColor }} className="max-w-4xl mx-auto border-t text-left">
          {(() => {
            const [openIndex, setOpenIndex] = useState<number | null>(null);
            const subjects = [
              { id: "mathematics", label: t("subject_mathematics"), icon: <div className="bg-[#77B7E9] w-full h-full flex items-center justify-center p-3"><svg viewBox="0 0 98 98" fill="none" className="w-full h-full"><path d={svgPaths.p39fda460} stroke="white" strokeWidth="7" strokeLinecap="round"/></svg></div> },
              { id: "english", label: t("subject_english"), icon: <div className="bg-[#E66D6F] w-full h-full flex items-center justify-center p-3"><svg viewBox="0 0 98 98" fill="none" className="w-full h-full"><path d={svgPaths.p3e5f0370} fill="white"/></svg></div> },
              { id: "chemistry", label: t("subject_chemistry"), icon: <div className="bg-[#a180ee] w-full h-full flex items-center justify-center p-4"><svg viewBox="0 0 58 81" fill="none" className="w-full h-full"><path d={svgPaths.p3fdc9380} fill="white"/><path d={svgPaths.p18f8e180} fill="white"/><path d={svgPaths.p1c26c6f0} fill="white"/><path d={svgPaths.p3ff11370} fill="white"/><path d={svgPaths.p3a671680} fill="white"/></svg></div> },
              { id: "physics", label: t("subject_physics"), icon: <div className="bg-[#F6DA6F] w-full h-full flex items-center justify-center p-3"><svg viewBox="0 0 98 98" fill="none" className="w-full h-full"><path d={svgPaths.p25aa0ff0} fill="white"/></svg></div> },
              { id: "biology", label: t("subject_biology"), icon: <div className="bg-[#a7d9b4] w-full h-full flex items-center justify-center p-4"><svg viewBox="0 0 58 71" fill="none" className="w-full h-full"><path d={svgPaths.p20ea880} fill="white"/></svg></div> },
              { id: "computer_science", label: t("subject_compsci"), icon: <div className="bg-[#19191b] w-full h-full flex items-center justify-center p-3"><svg viewBox="0 0 98 98" fill="none" className="w-full h-full"><rect fill="black" height="98" rx="20" width="98"/><path d={svgPaths.p7a73700} fill="white"/><path d={svgPaths.p165f700} fill="white"/><path d={svgPaths.p1f736500} fill="white"/></svg></div> }
            ];
            
            return subjects.map((subject, i) => (
              <SolutionRow 
                key={subject.id}
                id={subject.id}
                label={subject.label}
                index={i} 
                delay={i * 0.1}
                icon={subject.icon}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                t={t}
              />
            ));
          })()}
        </motion.div>

        {/* Additional Features CTA */}
        <motion.div
          ref={featuresRef}
          style={{ opacity: featuresOpacity, scale: featuresScale }}
          className="mt-24 p-12 md:p-16 border border-black/5 rounded-[40px] bg-gray-50/50 flex flex-col items-center text-center gap-8"
        >
          <div className="max-w-3xl">
            <h3
              className="font-['Anybody',sans-serif] font-black text-3xl md:text-4xl mb-4 uppercase tracking-tight"
              style={{ fontFamily: headingFontFamily }}
            >
              {t("additional_features_title")}
            </h3>
            <p className="font-['Prompt',sans-serif] text-xl opacity-70 leading-relaxed">
              {t("additional_features_body", {
                history: t("history"),
                geography: t("geography"),
                economics: t("economics"),
                early_access: t("early_access")
              })}
            </p>
            <p className="font-['Prompt',sans-serif] text-lg opacity-40 mt-4">
              {t("additional_features_note")}
            </p>
          </div>
        </motion.div>
      </section>

      {/* How It Works Section - Sticky Scroll Layout */}
      <section id="how-it-works" className="relative">
        <div className="h-[480vh] relative" ref={scrollRef}>
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-6 md:px-24">
            
            {/* Centered Title that fades out */}
            <motion.div 
              style={{ opacity: titleOpacity, scale: titleScale }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <h2
                className="font-['Anybody',sans-serif] font-black text-5xl md:text-7xl uppercase tracking-tight text-white leading-none"
                style={{ fontFamily: headingFontFamily }}
              >
                {t("how_it_works_title")}
              </h2>
            </motion.div>

            {/* Sticky Content */}
            <motion.div 
              style={{ opacity: contentOpacity, y: contentY }}
              className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center"
            >
              
              {/* Left Side: Steps Indicators (Vertical and Slim) */}
              <div className="md:col-span-3 flex flex-col gap-6">
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div 
                      key={step.id}
                      className="relative pl-6 group"
                    >
                      <motion.div 
                        animate={{ 
                          scaleY: activeStep === i ? 1 : 0,
                          opacity: activeStep === i ? 1 : 0
                        }}
                        className="absolute left-0 top-0 bottom-0 w-0.5 bg-white origin-top"
                      />
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10" />
                      
                      <h3 className={`font-['Prompt',sans-serif] font-medium text-lg transition-all duration-300 ${activeStep === i ? 'text-white translate-x-1' : 'text-white/30'}`}>
                        {step.label}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center/Right: Visual Showcase + Explanation Below */}
              <div className="md:col-span-9 flex flex-col items-center gap-16 pt-20">
                <div className="relative aspect-video w-full overflow-hidden sm:overflow-visible">
                  {steps.map((step, i) => (
                    <motion.div
                      key={step.id}
                      initial={false}
                      animate={{ 
                        y: i < activeStep ? -400 : (i - activeStep) * 20,
                        scale: i < activeStep ? 1 : 1 - (i - activeStep) * 0.05,
                        opacity: i < activeStep ? 0 : 1,
                        rotate: i < activeStep ? -5 : 0,
                        zIndex: steps.length - i
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      className="absolute inset-0 bg-white rounded-3xl md:rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.3)] flex items-center justify-center border border-black/5"
                    >
                      <div className="absolute inset-0 rounded-[inherit] overflow-hidden">
                        {i === 0 && <ImportVisualization progress={scrollYProgress} t={t} />}
                        {i === 1 && <GenerateVisualization t={t} />}
                        {i === 2 && <ExportVisualization t={t} />}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none rounded-[inherit]" />
                    </motion.div>
                  ))}
                </div>

                {/* Explanation text directly below the showcase */}
                <div className="min-h-[120px] max-w-2xl text-center">
                  <AnimatePresence mode="wait">
                    {activeStep >= 0 && (
                      <motion.div
                        key={`desc-${activeStep}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.5 }}
                      >
                        <p className="font-['Prompt',sans-serif] text-xl md:text-2xl leading-relaxed opacity-70 text-white">
                          {activeStep === 0 && t("step_desc_import")}
                          {activeStep === 1 && t("step_desc_generate")}
                          {activeStep === 2 && t("step_desc_export")}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section 
        id="contact-section" 
        className="py-32 px-6 md:px-24 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2
              className="font-['Anybody',sans-serif] font-black text-5xl md:text-7xl mb-6 uppercase tracking-tight"
              style={{ fontFamily: headingFontFamily }}
            >
              {t("contact_title")}
            </h2>
            <p className="font-['Prompt',sans-serif] text-xl opacity-60">{t("contact_subtitle")}</p>
          </motion.div>

          <motion.form
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            action="https://formsubmit.co/1908a6031b4aa69ba79f51d330466ff1"
            method="POST"
          >
            <input type="hidden" name="_subject" value="New Contact Form Submission" />
            <input type="hidden" name="_captcha" value="false" />
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg font-['Prompt',sans-serif] opacity-80">{t("contact_name")}</Label>
              <Input
                id="name"
                name="name"
                placeholder={t("contact_name_placeholder")}
                required
                className="h-16 bg-white/5 border-white/10 text-xl px-6 focus:border-white/40 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-['Prompt',sans-serif] opacity-80">{t("contact_email")}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={t("contact_email_placeholder")}
                required
                className="h-16 bg-white/5 border-white/10 text-xl px-6 focus:border-white/40 transition-colors"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="company" className="text-lg font-['Prompt',sans-serif] opacity-80">{t("contact_company")}</Label>
              <Input
                id="company"
                name="company"
                placeholder={t("contact_company_placeholder")}
                className="h-16 bg-white/5 border-white/10 text-xl px-6 focus:border-white/40 transition-colors"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="message" className="text-lg font-['Prompt',sans-serif] opacity-80">{t("contact_message")}</Label>
              <Textarea
                id="message"
                name="message"
                placeholder={t("contact_message_placeholder")}
                required
                className="min-h-40 bg-white/5 border-white/10 text-xl p-6 focus:border-white/40 transition-colors"
              />
            </div>
            <div className="md:col-span-2 pt-4 flex justify-center">
              <motion.button
                type="submit"
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
                className="relative bg-white text-[#19191b] px-10 py-5 rounded-full font-['Prompt',sans-serif] font-medium text-xl cursor-pointer overflow-hidden group"
              >
                <motion.div 
                  variants={{
                    initial: { x: "-100%" },
                    hover: { x: 0 }
                  }}
                  transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-0 bg-[#7C5DED]"
                />
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  {t("contact_send")}
                </span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      <Footer t={t} />
    </motion.div>
  );
}
