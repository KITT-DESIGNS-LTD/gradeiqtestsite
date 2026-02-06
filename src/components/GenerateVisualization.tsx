import { motion } from "motion/react";
import { useMemo, useState } from "react";
import svgPaths from "../imports/svg-dtxz0excxr";

export function GenerateVisualization({
  t
}: {
  t: (key: string, vars?: Record<string, string | number>) => string;
}) {
  const [questions, setQuestions] = useState([
    { id: "mc", count: 3 },
    { id: "short", count: 3 },
    { id: "matching", count: 2 },
    { id: "tf", count: 1 },
    { id: "fill", count: 1 }
  ]);

  const questionDefs = useMemo(
    () => [
      { id: "mc", label: t("generate_mc") },
      { id: "short", label: t("generate_short") },
      { id: "matching", label: t("generate_matching") },
      { id: "tf", label: t("generate_true_false") },
      { id: "fill", label: t("generate_fill_blank") }
    ],
    [t]
  );

  const updateCount = (id: string, delta: number) => {
    setQuestions(prev => prev.map(q => 
      q.id === id ? { ...q, count: Math.max(0, q.count + delta) } : q
    ));
  };

  const totalQuestions = questions.reduce((acc, q) => acc + q.count, 0);

  return (
    <div className="relative w-full h-full bg-white flex flex-col p-6 md:p-10 font-['Prompt',sans-serif]">
      {/* Header Info */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-4 md:mb-8"
      >
        <h3 className="text-lg md:text-xl font-bold text-black uppercase mb-1 md:mb-2">{t("generate_title")}</h3>
        <p className="text-xs md:text-sm text-[#6b7280] font-medium">{t("generate_subtitle")}</p>
      </motion.div>

      {/* Questions List */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-2 pb-2">
        {questions.map((q, i) => {
          const label = questionDefs.find((d) => d.id === q.id)?.label ?? q.id;
          return (
          <motion.div 
            key={q.id}
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="flex items-center justify-between bg-[#f9fafb] p-4 rounded-xl"
          >
            <span className="font-['Prompt',sans-serif] font-medium text-sm text-black">{label}</span>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => updateCount(q.id, -1)}
                className="size-6 bg-white border border-[#d8dadf] rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors active:scale-90"
              >
                <svg className="size-3" viewBox="0 0 13 2" fill="none">
                  <path d={svgPaths.p33534c00} fill="#707785" />
                </svg>
              </button>
              <span className="font-['Prompt',sans-serif] font-medium text-sm text-black w-4 text-center tabular-nums">{q.count}</span>
              <button 
                onClick={() => updateCount(q.id, 1)}
                className="size-6 bg-white border border-[#d8dadf] rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors active:scale-90"
              >
                <svg className="size-3" viewBox="0 0 13 13" fill="none">
                  <path d={svgPaths.p18ee9a00} fill="#707785" />
                </svg>
              </button>
            </div>
          </motion.div>
        );
        })}
      </div>

      {/* Footer Counter */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="mt-4 pt-4 border-t border-gray-100 flex justify-center"
      >
        <div className="bg-[#f3f4f6] px-6 py-2.5 rounded-2xl flex items-center gap-4">
          <span className="text-[10px] font-bold text-[#6b7280] uppercase tracking-wider">{t("generate_total_questions")}</span>
          <div className="h-4 w-px bg-gray-300" />
          <span className="text-xl font-black text-black tabular-nums leading-none">{totalQuestions}</span>
        </div>
      </motion.div>
    </div>
  );
}
