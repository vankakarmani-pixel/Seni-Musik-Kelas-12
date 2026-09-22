import React, { useEffect } from 'react';
import { Question } from '../types';
import { sound } from '../utils/audio';
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, XCircle, Lightbulb, Trophy } from 'lucide-react';

interface ExplanationModalProps {
  playerName: string;
  playerColorName: string;
  question: Question;
  selectedOption: 'A' | 'B' | 'C' | 'D' | 'TIMEOUT' | null;
  isOpen: boolean;
  isTimeUp?: boolean;
  onNext: () => void;
}

export const ExplanationModal: React.FC<ExplanationModalProps> = ({
  playerName,
  playerColorName,
  question,
  selectedOption,
  isOpen,
  isTimeUp = false,
  onNext
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        sound.playSelect();
        onNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNext]);

  if (!isOpen) return null;

  const handleNextClick = () => {
    sound.playSelect();
    onNext();
  };

  const correctOptionObj = question.options.find(o => o.id === question.correct);
  const selectedOptionObj = question.options.find(o => o.id === selectedOption);

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center p-3 bg-sky-950/60 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className={`w-full max-w-lg bg-gradient-to-b from-sky-50 via-white to-sky-100 rounded-2xl border-4 shadow-2xl p-4 sm:p-5 flex flex-col gap-3 text-slate-800 ${
        isTimeUp ? 'border-amber-400' : 'border-rose-400'
      }`}>
        {/* Top Header */}
        <div className="flex items-center justify-between border-b-2 border-sky-200 pb-2">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full font-pixel text-[11px] text-white shadow-xs ${playerColorName}`}>
              {playerName}
            </span>
            {isTimeUp ? (
              <span className="font-pixel text-xs text-amber-700 flex items-center gap-1.5 animate-pulse">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                WAKTU HABIS!
              </span>
            ) : (
              <span className="font-pixel text-xs text-rose-600 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                SERANGAN MELESET!
              </span>
            )}
          </div>
          <span className="font-pixel text-[10px] text-sky-700">
            SOAL #{question.questionNumber}/15 {question.questionNumber >= 15 ? '(TERAKHIR)' : ''}
          </span>
        </div>

        {/* Question Text */}
        <div className="bg-white/90 p-2.5 rounded-xl border border-sky-200 shadow-xs">
          <p className="font-sans-clean text-xs sm:text-sm font-semibold text-slate-800 leading-snug">
            {question.question}
          </p>
        </div>

        {/* Answer Breakdown */}
        <div className="space-y-2 text-xs font-sans-clean">
          {/* User's choice */}
          <div className={`flex items-start gap-2 p-2.5 rounded-xl border ${
            isTimeUp
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            {isTimeUp ? (
              <Clock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <span className="font-pixel text-[10px] block mb-0.5 font-bold">
                {isTimeUp ? 'STATUS JAWABAN:' : 'JAWABANMU (KURANG TEPAT):'}
              </span>
              <span>
                {isTimeUp
                  ? 'Waktu berpikir habis (melewati batas waktu per soal).'
                  : `${selectedOption}. ${selectedOptionObj?.text || ''}`}
              </span>
            </div>
          </div>

          {/* Correct Answer */}
          <div className="flex items-start gap-2 p-2.5 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-pixel text-[10px] text-emerald-700 block mb-0.5 font-bold">
                KUNCI JAWABAN BENAR:
              </span>
              <strong className="text-emerald-950 font-bold">
                {question.correct}. {correctOptionObj?.text}
              </strong>
            </div>
          </div>

          {/* Pedagogical Explanation */}
          <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 space-y-1">
            <span className="font-pixel text-[10px] text-sky-800 flex items-center gap-1.5 font-bold">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              PEMBAHASAN & TIPS BELAJAR:
            </span>
            <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed font-medium">
              {question.explanation}
            </p>
          </div>
        </div>

        {/* Continue / Finish Button */}
        {question.questionNumber >= 15 ? (
          <button
            onClick={handleNextClick}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-pixel text-xs rounded-xl border-2 border-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <span>SELESAIKAN KUIS & LIHAT HASIL (ENTER / SPASI)</span>
            <Trophy className="w-4 h-4 text-slate-950" />
          </button>
        ) : (
          <button
            onClick={handleNextClick}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-pixel text-xs rounded-xl border-2 border-white shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <span>LANJUT KE SOAL BERIKUTNYA (ENTER / SPASI)</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        )}
      </div>
    </div>
  );
};
