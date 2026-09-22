import React, { useState, useEffect } from 'react';
import { RegionInfo } from '../types';
import { sound } from '../utils/audio';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Swords,
  Lightbulb,
  Zap,
  BookmarkCheck,
  X
} from 'lucide-react';

interface SummaryModalProps {
  region: RegionInfo;
  isOpen: boolean;
  onStartBattle: () => void;
}

export const SummaryModal: React.FC<SummaryModalProps> = ({ region, isOpen, onStartBattle }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'slides' | 'table'>('slides');

  const slides = region.slides || [];
  const currentSlide = slides[currentSlideIndex] || slides[0];
  const totalSlides = slides.length;

  // Reset to first slide when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentSlideIndex(0);
      setActiveTab('slides');
    }
  }, [isOpen, region.id]);

  // Keyboard navigation for PowerPoint feel
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex, totalSlides]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentSlideIndex < totalSlides - 1) {
      sound.playSelect();
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      sound.playSelect();
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const handleStart = () => {
    sound.playSelect();
    sound.playBattleIntro();
    onStartBattle();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-sky-950/60 backdrop-blur-md animate-in fade-in duration-200 select-none">
      <div className="w-full max-w-4xl h-[92vh] max-h-[850px] flex flex-col bg-gradient-to-b from-sky-50 via-white to-sky-100 border-4 border-sky-400 rounded-2xl shadow-2xl overflow-hidden relative text-slate-800">
        
        {/* ================= TOP SLIDE PRESENTATION HEADER ================= */}
        <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 px-3 sm:px-5 py-2.5 border-b-2 border-sky-300 flex items-center justify-between z-20 flex-shrink-0 text-white shadow-sm">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 rounded-lg bg-amber-400 flex items-center justify-center text-slate-950 font-bold shadow">
              <Zap className="w-4 h-4 fill-current text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[10px] sm:text-xs text-amber-200 tracking-wide">
                  POWERPOINT STUDY DECK • REGION {region.id}
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-white font-pixel text-[9px] border border-white/30 hidden sm:inline">
                  GEN-Z EDITION
                </span>
              </div>
              <p className="font-sans-clean text-[11px] text-sky-100 truncate max-w-[240px] sm:max-w-md">
                {region.name} ({region.monsterName})
              </p>
            </div>
          </div>

          {/* Tab Switcher: Slides vs Quick Cheat Table */}
          <div className="flex items-center gap-2">
            <div className="bg-sky-700/60 p-0.5 rounded-lg border border-sky-300/40 flex items-center">
              <button
                onClick={() => {
                  sound.playSelect();
                  setActiveTab('slides');
                }}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  activeTab === 'slides'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-sky-100 hover:text-white'
                }`}
              >
                Slides
              </button>
              <button
                onClick={() => {
                  sound.playSelect();
                  setActiveTab('table');
                }}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-all ${
                  activeTab === 'table'
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                    : 'text-sky-100 hover:text-white'
                }`}
              >
                Cheat Sheet
              </button>
            </div>

            <button
              onClick={handleStart}
              className="p-1.5 text-sky-100 hover:text-white rounded-lg hover:bg-white/20 transition-all cursor-pointer"
              title="Mulai Langsung"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar for Slides */}
        {activeTab === 'slides' && totalSlides > 0 && (
          <div className="w-full h-1.5 bg-sky-200 flex-shrink-0">
            <div
              className="h-full bg-gradient-to-r from-amber-400 via-emerald-400 to-sky-500 transition-all duration-300"
              style={{ width: `${((currentSlideIndex + 1) / totalSlides) * 100}%` }}
            />
          </div>
        )}

        {/* ================= MAIN PRESENTATION CANVAS ================= */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-between relative bg-gradient-to-b from-sky-50/80 via-white to-sky-100/50">
          {activeTab === 'slides' && currentSlide ? (
            <div className="w-full flex-1 flex flex-col justify-between max-w-3xl mx-auto animate-in fade-in duration-300">
              
              {/* Slide Meta Tag & Heading */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-pixel border shadow-xs ${currentSlide.tagColor}`}>
                    <Sparkles className="w-3.5 h-3.5" />
                    {currentSlide.tag}
                  </span>
                  <span className="font-pixel text-xs text-sky-700">
                    SLIDE {currentSlideIndex + 1} / {totalSlides}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-sky-950 tracking-tight leading-snug">
                  {currentSlide.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 mt-1 font-medium">
                  {currentSlide.subtitle}
                </p>
              </div>

              {/* Slide Content Layout: Bento or Cards or Comparison */}
              <div className="my-4 sm:my-6 flex-1 flex flex-col justify-center">
                {currentSlide.content.cards && (
                  <div className={`grid gap-3 sm:gap-4 ${
                    currentSlide.content.cards.length === 2
                      ? 'grid-cols-1 sm:grid-cols-2'
                      : currentSlide.content.cards.length === 3
                      ? 'grid-cols-1 sm:grid-cols-3'
                      : 'grid-cols-1 sm:grid-cols-2'
                  }`}>
                    {currentSlide.content.cards.map((card, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-[1.01] flex flex-col justify-between shadow-xs ${card.color || 'bg-white border-sky-200'}`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            {card.badge && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-pixel bg-sky-100 text-sky-800 border border-sky-300">
                                {card.badge}
                              </span>
                            )}
                            {card.iconEmoji && (
                              <span className="text-2xl select-none">{card.iconEmoji}</span>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                            {card.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans-clean">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Comparison Table View if slide has comparisonData */}
                {currentSlide.content.comparisonData && (
                  <div className="bg-white rounded-xl border-2 border-sky-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-sky-100 border-b border-sky-200 text-sky-900 font-pixel text-[10px]">
                          <tr>
                            <th className="p-3">ASPEK</th>
                            <th className="p-3">{currentSlide.content.comparisonData.col1Title}</th>
                            <th className="p-3">{currentSlide.content.comparisonData.col2Title}</th>
                            {currentSlide.content.comparisonData.col3Title && (
                              <th className="p-3">{currentSlide.content.comparisonData.col3Title}</th>
                            )}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-sky-100 text-slate-700">
                          {currentSlide.content.comparisonData.rows.map((r, rIdx) => (
                            <tr key={rIdx} className="hover:bg-sky-50/60">
                              <td className="p-3 font-semibold text-slate-800 bg-sky-50/40 whitespace-nowrap">
                                {r.label}
                              </td>
                              <td className="p-3 text-cyan-800 font-medium">{r.val1}</td>
                              <td className="p-3 text-amber-800 font-medium">{r.val2}</td>
                              {r.val3 && <td className="p-3 text-emerald-800 font-medium">{r.val3}</td>}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Pro-Tip or Highlight Fact */}
              {(currentSlide.content.highlightFact || currentSlide.content.proTip) && (
                <div className="mt-2 p-3 sm:p-3.5 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-300 rounded-xl flex items-start gap-3 shadow-xs">
                  <div className="p-1.5 rounded-lg bg-amber-400 text-slate-950 flex-shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4 fill-current" />
                  </div>
                  <div className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    {currentSlide.content.highlightFact && (
                      <p className="font-semibold text-amber-950 mb-0.5">{currentSlide.content.highlightFact}</p>
                    )}
                    {currentSlide.content.proTip && (
                      <p className="text-xs text-amber-900 font-sans-clean">
                        <strong>💡 Pro-Tip Ujian:</strong> {currentSlide.content.proTip}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Tab: Quick Cheat Sheet */
            <div className="w-full max-w-3xl mx-auto space-y-4 animate-in fade-in">
              <div className="p-4 bg-white rounded-xl border-2 border-sky-300 shadow-sm">
                <h3 className="font-pixel text-xs text-sky-900 mb-2 flex items-center gap-2">
                  <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                  POIN KUNCI KUIS 15 SOAL ({region.name})
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {region.summary.keyPoints.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✔</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {region.summary.tableHeaders && region.summary.tableRows && (
                <div className="bg-white rounded-xl border-2 border-sky-200 overflow-hidden shadow-sm">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-sky-100 text-sky-900 font-pixel text-[10px]">
                      <tr>
                        {region.summary.tableHeaders.map((h, i) => (
                          <th key={i} className="p-2.5">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-sky-100 text-slate-700 font-sans-clean">
                      {region.summary.tableRows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-sky-50/50">
                          {row.map((c, cIdx) => (
                            <td key={cIdx} className="p-2.5">{c}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ================= BOTTOM PRESENTATION NAVIGATION BAR ================= */}
        <div className="bg-sky-100/90 px-4 sm:px-6 py-3 border-t-2 border-sky-200 flex items-center justify-between gap-3 z-20 flex-shrink-0">
          {/* Left: Previous Slide Button */}
          <button
            onClick={handlePrev}
            disabled={activeTab !== 'slides' || currentSlideIndex === 0}
            className={`px-3 sm:px-4 py-2 rounded-xl font-pixel text-[11px] flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'slides' && currentSlideIndex > 0
                ? 'bg-white hover:bg-sky-50 text-slate-800 border-2 border-sky-300 shadow-xs'
                : 'opacity-40 bg-sky-200 text-slate-400 border border-sky-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">SEBELUMNYA</span>
          </button>

          {/* Center: Slide Indicators Dots */}
          {activeTab === 'slides' ? (
            <div className="flex items-center gap-1.5">
              {slides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    sound.playSelect();
                    setCurrentSlideIndex(dotIdx);
                  }}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    dotIdx === currentSlideIndex
                      ? 'w-7 bg-amber-400 shadow-xs'
                      : 'w-2.5 bg-sky-300 hover:bg-sky-400'
                  }`}
                  title={`Ke Slide ${dotIdx + 1}`}
                />
              ))}
            </div>
          ) : (
            <div className="font-pixel text-[10px] text-sky-800">
              RINGKASAN CEPAT
            </div>
          )}

          {/* Right: Next Slide or Start Battle */}
          {activeTab === 'slides' && currentSlideIndex < totalSlides - 1 ? (
            <button
              onClick={handleNext}
              className="px-4 sm:px-5 py-2 bg-white hover:bg-sky-50 text-slate-800 rounded-xl font-pixel text-[11px] border-2 border-sky-300 flex items-center gap-1.5 cursor-pointer shadow-xs transition-all active:scale-98"
            >
              <span>LANJUT SLIDE</span>
              <ChevronRight className="w-4 h-4 text-sky-600" />
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="px-5 sm:px-6 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-400 hover:to-teal-400 text-white font-pixel text-[11px] sm:text-xs rounded-xl border-2 border-white shadow-lg flex items-center gap-2 cursor-pointer font-bold animate-pulse active:scale-98"
            >
              <Swords className="w-4 h-4 text-white" />
              <span>MULAI PERTARUNGAN!</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
