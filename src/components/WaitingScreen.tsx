import React from 'react';
import { PlayerState } from '../types';
import { CuteCharacter } from './CuteCharacter';
import { getCharacterById } from '../data/charactersData';
import { Clock, CheckCircle2, XCircle, Sparkles, Coffee } from 'lucide-react';

interface WaitingScreenProps {
  player: PlayerState;
  allPlayers: PlayerState[];
}

export const WaitingScreen: React.FC<WaitingScreenProps> = ({ player, allPlayers }) => {
  const character = getCharacterById(player.characterId || 'mimi');
  const correctCount = player.history.filter((h) => h.isCorrect).length;
  const accuracy = Math.round((correctCount / 15) * 100);

  // Other players who are still playing
  const otherPlayers = allPlayers.filter((p) => p.id !== player.id);
  const stillPlaying = otherPlayers.filter((p) => !p.isFinished);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-sky-200 via-sky-100 to-indigo-50 text-slate-800 relative overflow-hidden select-none">
      {/* Whimsical Floating Sky Clouds */}
      <div className="absolute top-4 left-6 text-4xl opacity-40 animate-pulse pointer-events-none">☁️</div>
      <div className="absolute top-10 right-8 text-5xl opacity-40 animate-pulse pointer-events-none">☁️</div>
      <div className="absolute bottom-6 left-12 text-3xl opacity-30 pointer-events-none">✨</div>
      <div className="absolute bottom-10 right-10 text-3xl opacity-30 pointer-events-none">🎵</div>

      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl border-4 border-sky-400 p-4 sm:p-6 shadow-xl flex flex-col items-center text-center z-10 animate-in fade-in zoom-in-95 duration-300">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-400 text-emerald-800 font-pixel text-[10px] mb-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>15 SOAL LENGKAP TERJAWAB!</span>
        </div>

        {/* Main Headline */}
        <h2 className="font-pixel text-base sm:text-lg text-sky-900 tracking-wide leading-snug">
          OKE SUDAH SELESAI! 🎉
        </h2>
        <p className="font-sans-clean text-xs sm:text-sm text-sky-700 font-medium mt-1">
          Tunggu dulu yang lain yaa...
        </p>

        {/* Cute Character in WAITING pose */}
        <div className="my-3 sm:my-4 relative">
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-sky-200 to-indigo-100 flex items-center justify-center border-4 border-white shadow-inner">
            <CuteCharacter characterId={character.id} pose="waiting" size="lg" />
          </div>
          <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-pixel text-[9px] font-bold border border-white shadow">
            {character.name.split(' ')[0]}
          </span>
        </div>

        {/* Player Stats Recap Box */}
        <div className="w-full bg-sky-50 rounded-xl border-2 border-sky-200 p-3 mb-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-pixel text-[10px] text-sky-800">SKOR AKHIRMU:</span>
            <span className="font-pixel text-sm text-amber-600 font-bold">{player.score} PTS</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-sans-clean">
            <div className="flex items-center justify-center gap-1 bg-white p-1.5 rounded-lg border border-emerald-200 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{correctCount} Benar</span>
            </div>
            <div className="flex items-center justify-center gap-1 bg-white p-1.5 rounded-lg border border-rose-200 text-rose-700 font-semibold">
              <XCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>{15 - correctCount} Salah</span>
            </div>
          </div>
          <div className="mt-1 text-[11px] text-sky-600 font-medium font-pixel">
            Akurasi Pengetahuan: {accuracy}%
          </div>
        </div>

        {/* Other Players Live Status */}
        <div className="w-full bg-amber-50/90 rounded-xl border border-amber-300 p-2.5 text-left">
          <div className="flex items-center gap-1.5 text-amber-800 font-pixel text-[9px] mb-1">
            <Clock className="w-3 h-3 text-amber-600 animate-spin" />
            <span>STATUS PEMAIN LAIN:</span>
          </div>

          {stillPlaying.length > 0 ? (
            <div className="space-y-1">
              {stillPlaying.map((other) => (
                <div key={other.id} className="flex items-center justify-between text-xs font-sans-clean text-slate-700">
                  <span className="font-semibold">{other.name}:</span>
                  <span className="text-amber-700 font-pixel text-[10px]">
                    Sedang soal #{Math.min(other.currentQIndex + 1, 15)}/15...
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-700 font-semibold">
              Semua pemain telah selesai! Membuka hasil akhir...
            </p>
          )}
        </div>

        {/* Comical Cozy Relax Note */}
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-slate-500 italic font-sans-clean">
          <Coffee className="w-3.5 h-3.5 text-sky-500" />
          <span>Sambil nunggu, boleh minum air putih & rilekskan tangan dulu yaa!</span>
        </div>
      </div>
    </div>
  );
};
