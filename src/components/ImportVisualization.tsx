import { motion, useTransform, MotionValue, AnimatePresence } from "motion/react";
import { useState } from "react";
import svgPaths from "../imports/svg-5bl4i1mg71";

interface ImportVisualizationProps {
  progress: MotionValue<number>;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

export function ImportVisualization({ progress, t }: ImportVisualizationProps) {
  // Map global scroll progress to local step-0 progress (roughly 0.22 to 0.42)
  const buttonColor = useTransform(progress, [0.32, 0.42], ["#14171a", "#7C5DED"]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState("subject_mathematics");

  const folders = [
    { key: "subject_mathematics", label: t("subject_mathematics") },
    { key: "subject_english", label: t("subject_english") },
    { key: "subject_chemistry", label: t("subject_chemistry") },
    { key: "subject_physics", label: t("subject_physics") },
    { key: "subject_biology", label: t("subject_biology") },
    { key: "subject_compsci", label: t("subject_compsci") }
  ];

  return (
    <div className="relative w-full h-full bg-white flex flex-col p-6 md:p-8 font-['Prompt',sans-serif]">
      {/* Main Card */}
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 bg-white rounded-2xl flex flex-col"
      >
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <motion.h3 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-lg md:text-xl font-bold text-black uppercase whitespace-nowrap"
          >
            {t("import_upload_papers")}
          </motion.h3>
          <div className="flex items-center gap-4 flex-1 justify-end">
            <div className="relative z-20">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-[#f3f4f6] px-3 py-2 rounded-lg border border-transparent hover:border-[#7C5DED]/30 transition-all cursor-pointer group"
              >
                <svg className="size-3.5" viewBox="0 0 13 11" fill="none">
                  <path d={svgPaths.p35c30800} fill="#7C5DED" />
                </svg>
                <span className="text-[#14171a] text-xs font-bold uppercase tracking-tight">
                  {t(selectedFolder)}
                </span>
                <motion.svg 
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  className="size-2.5" 
                  viewBox="0 0 13 8" 
                  fill="none"
                >
                  <path d={svgPaths.p3a868112} fill="#707785" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsOpen(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-20"
                    >
                      {folders.map((folder) => (
                        <button
                          key={folder.key}
                          onClick={() => {
                            setSelectedFolder(folder.key);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold uppercase tracking-tight transition-colors flex items-center gap-2
                            ${selectedFolder === folder.key ? 'bg-[#7C5DED]/5 text-[#7C5DED]' : 'text-[#6b7280] hover:bg-[#f3f4f6]'}
                          `}
                        >
                          <div className={`size-1.5 rounded-full ${selectedFolder === folder.key ? 'bg-[#7C5DED]' : 'bg-transparent'}`} />
                          {folder.label}
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
            <div className="size-8 md:size-10 flex items-center justify-center opacity-50">
              <svg className="size-4 md:size-5" viewBox="0 0 21 20" fill="none">
                <path d={svgPaths.p1572c340} fill="#707785" />
              </svg>
            </div>
          </div>
        </div>

        {/* Dropzone Area */}
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex-1 border-2 border-dashed border-[#d9d9d9] rounded-xl flex flex-col items-center justify-center gap-4 md:gap-6 p-4"
        >
          <div className="relative size-12 md:size-20 text-[#d9d9d9]">
            <svg className="size-full" viewBox="0 0 76 73" fill="none">
              <path d={svgPaths.p1a2f0810} fill="currentColor" />
              <path d={svgPaths.p28c14ff1} fill="currentColor" />
            </svg>
          </div>
          
          <p className="text-[#6b7280] font-medium text-sm md:text-base text-center">{t("import_drop_files")}</p>

          <motion.button 
            style={{ backgroundColor: buttonColor }}
            className="px-6 md:px-10 py-2.5 md:py-3 rounded-xl text-white text-sm md:text-base font-bold transition-shadow hover:shadow-lg"
          >
            {t("import_button")}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
