import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, CheckCircle2, ChevronDown, FileJson, FileCode } from 'lucide-react';

export const ExportVisualization = ({
  t
}: {
  t: (key: string, vars?: Record<string, string | number>) => string;
}) => {
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setIsDone(true);
      setTimeout(() => setIsDone(false), 3000);
    }, 2000);
  };

  const paperDetails = [
    { label: t("export_subject"), value: t("export_subject_value") },
    { label: t("export_year"), value: t("export_year_value") },
    { label: t("export_questions"), value: t("export_questions_value") },
    { label: t("export_pages"), value: t("export_pages_value") },
    { label: t("export_file_size"), value: t("export_file_size_value") }
  ];

  const formats = [
    { id: 'pdf', name: t("export_format_pdf"), icon: <FileText className="size-4" />, ext: '.pdf' },
    { id: 'docx', name: t("export_format_word"), icon: <FileCode className="size-4" />, ext: '.docx' },
    { id: 'json', name: t("export_format_lms"), icon: <FileJson className="size-4" />, ext: '.json' }
  ];

  return (
    <div className="p-8 md:p-12 text-black font-['Prompt',sans-serif] h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-xl font-bold mb-1">{t("export_title")}</h4>
          <p className="text-sm text-black/40">{t("export_subtitle")}</p>
        </div>
        <div className="size-12 bg-[#7C5DED]/10 rounded-xl flex items-center justify-center text-[#7C5DED]">
          <Download size={24} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        {/* Paper Details */}
        <div className="space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-black/30">{t("export_paper_details")}</p>
          <div className="bg-gray-50 rounded-2xl p-5 border border-black/5 space-y-3">
            {paperDetails.map((detail) => (
              <div key={detail.label} className="flex justify-between items-center text-sm">
                <span className="text-black/40">{detail.label}</span>
                <span className="font-semibold">{detail.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Export Controls */}
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-black/30">{t("export_file_type")}</p>
            <div className="space-y-2">
              {formats.map((format) => (
                <button
                  key={format.id}
                  onClick={() => setSelectedFormat(format.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all duration-200 ${
                    selectedFormat === format.id 
                    ? 'border-[#7C5DED] bg-[#7C5DED]/5 text-[#7C5DED]' 
                    : 'border-black/5 bg-white hover:border-black/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {format.icon}
                    <span className="text-sm font-medium">{format.name}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    selectedFormat === format.id ? 'bg-[#7C5DED] text-white' : 'bg-gray-100 text-black/40'
                  }`}>
                    {format.ext}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 ${
              isDone ? 'bg-black text-white shadow-lg shadow-black/20' : 'bg-[#7C5DED] text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#7C5DED]/20'
            }`}
          >
            {isExporting ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="size-5 border-2 border-white/30 border-t-white rounded-full"
              />
            ) : isDone ? (
              <CheckCircle2 size={20} />
            ) : (
              <Download size={20} />
            )}
            {isExporting ? t("export_generating") : isDone ? t("export_done") : t("export_button")}
          </button>
        </div>
      </div>
    </div>
  );
};
