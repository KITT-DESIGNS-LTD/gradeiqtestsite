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

// --- Components ---

import { ExportVisualization } from "./components/ExportVisualization";

const Navbar = ({ onContactClick }: { onContactClick: () => void }) => {
  const { scrollY } = useScroll();
  const height = useTransform(scrollY, [0, 100], [100, 80]);
  
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
          Product
        </button>
        <button 
          onClick={onContactClick}
          className="hover:opacity-60 transition-opacity cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
        >
          Contact
        </button>
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
            Demo <motion.div variants={{ hover: { x: 4 } }} transition={{ type: "spring", stiffness: 400, damping: 10 }}><ArrowRight size={18} /></motion.div>
          </span>
        </motion.button>
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

const SolutionRow = ({ icon: Icon, title, index, delay, isOpen, onToggle }: { icon: any, title: string, index: number, delay: number, isOpen: boolean, onToggle: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const getExampleContent = () => {
    switch (title.toLowerCase()) {
      case "mathematics":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-4">What is the derivative of 3x²</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="p-3 bg-gray-50 rounded-lg">A. 3x</div>
                <div className="p-3 bg-black text-white rounded-lg">B. 6x</div>
                <div className="p-3 bg-gray-50 rounded-lg">C. x³</div>
                <div className="p-3 bg-gray-50 rounded-lg">D. 9</div>
              </div>
            </div>
            <p className="text-sm font-medium text-black/40 italic">
              Grade IQ generates precise computational checks and auto grades numeric answers with accuracy.
            </p>
          </div>
        );
      case "languages":
      case "english":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-4">Fill in the blank. She ______ to the store yesterday.</p>
              <div className="h-10 border-b-2 border-dashed border-black/20 w-32 mb-2" />
            </div>
            <p className="text-sm font-medium text-black/40 italic">
              Grade IQ builds grammar focused exercises and marks language structure instantly.
            </p>
          </div>
        );
      case "chemistry":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-2">State how a covalent bond forms.</p>
              <p className="text-black text-lg py-2" style={{ fontFamily: '"Comic Sans MS", "Marker Felt", cursive' }}>
                Covalent bonds form when atoms share electrons to reach stable configurations.
              </p>
              <div className="h-px bg-black/10 w-full mt-1" />
            </div>
            <p className="text-sm font-medium text-black/40 italic">
              Grade IQ reviews short answer chemistry responses by matching key ideas and terms to ensure the core concept is truly understood.
            </p>
          </div>
        );
      case "physics":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-4">Explain how conservation of momentum applies when two objects collide and move together.</p>
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-4/6" />
              </div>
            </div>
            <p className="text-sm font-medium text-black/40 italic">
              Grade IQ walks through every line of a long answer explanation, comparing the reasoning to physics rubrics so complex thinking is rewarded.
            </p>
          </div>
        );
      case "biology":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-8">Match the term to its function.</p>
              <div className="relative flex justify-between gap-12 max-w-lg mx-auto min-h-[220px]">
                {/* Left Side: Terms */}
                <div className="space-y-6 z-10 flex flex-col justify-between">
                  <div className="flex items-center gap-3 group">
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium border border-black/5 w-40 text-center">Cell membrane</div>
                    <div className="size-2 rounded-full bg-black/20 group-hover:bg-[#7C5DED] transition-colors" id="term-1" />
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium border border-black/5 w-40 text-center">Mitochondria</div>
                    <div className="size-2 rounded-full bg-black/20 group-hover:bg-[#7C5DED] transition-colors" id="term-2" />
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium border border-black/5 w-40 text-center">Ribosome</div>
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
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-xs font-medium border border-black/5 w-48">produces cellular energy</div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="size-2 rounded-full bg-black/20 group-hover:bg-[#7C5DED] transition-colors" id="def-2" />
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-xs font-medium border border-black/5 w-48">builds proteins</div>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <div className="size-2 rounded-full bg-black/20 group-hover:bg-[#7C5DED] transition-colors" id="def-3" />
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-xs font-medium border border-black/5 w-48">controls what enters/leaves</div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm font-medium text-black/40 italic">
              Grade IQ handles complex relational questions like matching and sorting by analyzing conceptual links rather than just text strings.
            </p>
          </div>
        );
      case "computer science":
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <p className="text-black mb-4">Recursion always requires a base case. True or false</p>
              <div className="flex gap-4">
                <div className="px-6 py-2 bg-black text-white rounded-full text-sm font-bold">True</div>
                <div className="px-6 py-2 bg-gray-100 text-black rounded-full text-sm font-bold">False</div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="p-8 text-xl text-black/60 font-['Prompt',sans-serif]">
            Comprehensive coverage for {title} curricula. Grade IQ analyzes your existing materials to generate varied question types including multiple choice, long-form, and practical applications, all with automated grading rubrics.
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
            {title}
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

const WordRotator = () => {
  const words = ["PAST PAPERS", "HOMEWORK", "ASSIGNMENTS"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
            className="font-['Anybody',sans-serif] font-black text-4xl md:text-8xl lg:text-9xl tracking-tighter text-white whitespace-nowrap block"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#19191b] text-white py-12 px-6 md:px-24 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 font-['Prompt',sans-serif] opacity-40 text-sm">
        <p>© {currentYear} Grade IQ. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default function App() {
  const { scrollY } = useScroll();

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

  const steps = ["Import", "Generate", "Export"];
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
      <Navbar onContactClick={handleContactClick} />

      {/* Hero Section */}
      <section className="pt-40 pb-20 max-w-auto mx-auto text-center overflow-hidden">
        <div className="flex flex-col items-center">
          {/* Headline */}
          <div className="relative flex flex-col items-center gap-4 w-full">
            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0 }}
              className="font-['Anybody',sans-serif] font-black text-6xl md:text-9xl tracking-tighter"
            >
              GENERATE
            </motion.h1>

            <WordRotator />

            <motion.h1
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.16 }}
              className="font-['Anybody',sans-serif] font-black text-6xl md:text-9xl tracking-tighter"
            >
              INSTANTLY
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-12 max-w-2xl font-['Prompt',sans-serif] text-xl md:text-2xl leading-relaxed opacity-70"
          >
            Creating and grading homework and exams is time consuming. We turn past papers into new exams with answers in minutes.
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
              Contact Sales
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
        >
          EXAMPLES
        </motion.h2>

        <motion.div style={{ borderColor }} className="max-w-4xl mx-auto border-t text-left">
          {(() => {
            const [openIndex, setOpenIndex] = useState<number | null>(null);
            const subjects = [
              { title: "Mathematics", icon: <div className="bg-[#77B7E9] w-full h-full flex items-center justify-center p-3"><svg viewBox="0 0 98 98" fill="none" className="w-full h-full"><path d={svgPaths.p39fda460} stroke="white" strokeWidth="7" strokeLinecap="round"/></svg></div> },
              { title: "English", icon: <div className="bg-[#E66D6F] w-full h-full flex items-center justify-center p-3"><svg viewBox="0 0 98 98" fill="none" className="w-full h-full"><path d={svgPaths.p3e5f0370} fill="white"/></svg></div> },
              { title: "Chemistry", icon: <div className="bg-[#a180ee] w-full h-full flex items-center justify-center p-4"><svg viewBox="0 0 58 81" fill="none" className="w-full h-full"><path d={svgPaths.p3fdc9380} fill="white"/><path d={svgPaths.p18f8e180} fill="white"/><path d={svgPaths.p1c26c6f0} fill="white"/><path d={svgPaths.p3ff11370} fill="white"/><path d={svgPaths.p3a671680} fill="white"/></svg></div> },
              { title: "Physics", icon: <div className="bg-[#F6DA6F] w-full h-full flex items-center justify-center p-3"><svg viewBox="0 0 98 98" fill="none" className="w-full h-full"><path d={svgPaths.p25aa0ff0} fill="white"/></svg></div> },
              { title: "Biology", icon: <div className="bg-[#a7d9b4] w-full h-full flex items-center justify-center p-4"><svg viewBox="0 0 58 71" fill="none" className="w-full h-full"><path d={svgPaths.p20ea880} fill="white"/></svg></div> },
              { title: "Computer Science", icon: <div className="bg-[#19191b] w-full h-full flex items-center justify-center p-3"><svg viewBox="0 0 98 98" fill="none" className="w-full h-full"><rect fill="black" height="98" rx="20" width="98"/><path d={svgPaths.p7a73700} fill="white"/><path d={svgPaths.p165f700} fill="white"/><path d={svgPaths.p1f736500} fill="white"/></svg></div> }
            ];
            
            return subjects.map((subject, i) => (
              <SolutionRow 
                key={subject.title}
                title={subject.title} 
                index={i} 
                delay={i * 0.1}
                icon={subject.icon}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
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
            <h3 className="font-['Anybody',sans-serif] font-black text-3xl md:text-4xl mb-4 uppercase tracking-tight">Additional Features</h3>
            <p className="font-['Prompt',sans-serif] text-xl opacity-70 leading-relaxed">
              Looking for something else? We're constantly expanding our subject library. Modules for <span className="font-semibold">History</span>, <span className="font-semibold">Geography</span>, and <span className="font-semibold">Economics</span> are currently in <span className="font-semibold">early access</span>.
            </p>
            <p className="font-['Prompt',sans-serif] text-lg opacity-40 mt-4">
              Discuss custom integrations or request additional features for your institution through our contact form below.
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
              <h2 className="font-['Anybody',sans-serif] font-black text-5xl md:text-7xl uppercase tracking-tight text-white leading-none">
                HOW IT WORKS
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
                      key={step}
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
                        {step}
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
                      key={step}
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
                        {i === 0 && <ImportVisualization progress={scrollYProgress} />}
                        {i === 1 && <GenerateVisualization />}
                        {i === 2 && <ExportVisualization />}
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
                          {activeStep === 0 && "Simply upload PDF files of previous exams into the source folder"}
                          {activeStep === 1 && "AI identifies key topics and generates fresh, relevant questions."}
                          {activeStep === 2 && "Download your new, fully curated exam with a comprehensive marking scheme instantly."}
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
            <h2 className="font-['Anybody',sans-serif] font-black text-5xl md:text-7xl mb-6 uppercase tracking-tight">Get in Touch</h2>
            <p className="font-['Prompt',sans-serif] text-xl opacity-60">Ready to transform your examination workflow? Let's talk.</p>
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
              <Label htmlFor="name" className="text-lg font-['Prompt',sans-serif] opacity-80">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                className="h-16 bg-white/5 border-white/10 text-xl px-6 focus:border-white/40 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg font-['Prompt',sans-serif] opacity-80">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                className="h-16 bg-white/5 border-white/10 text-xl px-6 focus:border-white/40 transition-colors"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="company" className="text-lg font-['Prompt',sans-serif] opacity-80">Company</Label>
              <Input
                id="company"
                name="company"
                placeholder="Institution or School Name"
                className="h-16 bg-white/5 border-white/10 text-xl px-6 focus:border-white/40 transition-colors"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="message" className="text-lg font-['Prompt',sans-serif] opacity-80">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your needs..."
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
                  Send Message
                </span>
              </motion.button>
            </div>
          </motion.form>
        </div>
      </section>

      <Footer />
    </motion.div>
  );
}
