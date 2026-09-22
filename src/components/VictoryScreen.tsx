import React from 'react';
import { PlayerState, RegionInfo } from '../types';
import { PixelMonster } from './PixelMonster';
import { CuteCharacter } from './CuteCharacter';
import { getCharacterById } from '../data/charactersData';
import { sound } from '../utils/audio';
import {
  Trophy,
  RotateCcw,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  XCircle,
  Flame,
  HeartHandshake,
  Award,
  Crown
} from 'lucide-react';

interface VictoryScreenProps {
  players: PlayerState[];
  region: RegionInfo;
  onRematch: () => void;
  onReturnToMenu: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  players,
  region,
  onRematch,
  onReturnToMenu
}) => {
  const isSolo = players.length === 1;
  // Multi-tier sorting: 1. Score, 2. Correct answers, 3. Remaining time
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const aCorrect = a.history.filter(h => h.isCorrect).length;
    const bCorrect = b.history.filter(h => h.isCorrect).length;
    if (bCorrect !== aCorrect) return bCorrect - aCorrect;
    return b.timeLeft - a.timeLeft;
  });
  const topPlayer = sortedPlayers[0];
  const runnerUp = sortedPlayers.length > 1 ? sortedPlayers[1] : null;
  const isTie = runnerUp !== null && topPlayer.score === runnerUp.score && 
    topPlayer.history.filter(h => h.isCorrect).length === runnerUp.history.filter(h => h.isCorrect).length;

  // Solo mode win condition: score >= 800 (>= 8/15 correct) or monster HP <= 100
  const isSoloWon = isSolo && (topPlayer.score >= 800 || topPlayer.monsterHp <= 100);

  const topChar = getCharacterById(topPlayer.characterId || 'mimi');

  const getRankBadge = (score: number) => {
    if (score >= 1400) return { title: 'MAESTRO MUSIK (S-RANK)', color: 'text-amber-700 bg-amber-100 border-amber-400' };
    if (score >= 1100) return { title: 'VIRTUOSO AKADEMI (A-RANK)', color: 'text-sky-700 bg-sky-100 border-sky-400' };
    if (score >= 800) return { title: 'MUSISI BERBAKAT (B-RANK)', color: 'text-emerald-700 bg-emerald-100 border-emerald-400' };
    return { title: 'SISWA MAGANG MUSIK (C-RANK)', color: 'text-slate-600 bg-slate-100 border-slate-300' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-sky-950/70 backdrop-blur-md overflow-y-auto select-none">
      <div className="w-full max-w-4xl bg-gradient-to-b from-sky-50 via-white to-sky-100 border-4 border-sky-400 shadow-2xl rounded-2xl p-4 sm:p-7 flex flex-col gap-5 text-slate-800 my-auto animate-in zoom-in-95 duration-300">
        
        {/* ================= HEADER BANNER ================= */}
        <div className="text-center space-y-1.5 border-b-2 border-sky-200 pb-4">
          <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 bg-sky-100 border-2 border-sky-300 rounded-full text-sky-800 font-pixel text-[11px] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>KUIS SELESAI (15 SOAL LENGKAP) • {region.name.toUpperCase()}</span>
          </div>

          {isSolo ? (
            isSoloWon ? (
              <h1 className="font-pixel text-xl sm:text-2xl text-emerald-600 tracking-wide">
                🎉 KAMU MENANG! MONSTER DITAKLUKKAN!
              </h1>
            ) : (
              <h1 className="font-pixel text-xl sm:text-2xl text-rose-600 tracking-wide flex items-center justify-center gap-2">
                <Flame className="w-6 h-6 text-rose-500 animate-bounce" />
                <span>KAMU KALAH! MONSTER MAKIN KUAT!</span>
                <Flame className="w-6 h-6 text-rose-500 animate-bounce" />
              </h1>
            )
          ) : isTie ? (
            <h1 className="font-pixel text-xl sm:text-2xl text-amber-600 tracking-wide">
              🤝 DRAW! PERTARUNGAN MUSISI SEIMBANG!
            </h1>
          ) : (
            <h1 className="font-pixel text-xl sm:text-2xl text-amber-600 tracking-wide flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-amber-500 animate-bounce" />
              <span>JUARA PERTANDINGAN: {topPlayer.name.toUpperCase()}!</span>
              <Crown className="w-6 h-6 text-amber-500 animate-bounce" />
            </h1>
          )}

          <p className="font-sans-clean text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            {isSolo
              ? isSoloWon
                ? `Selamat! Melalui pengetahuan teori musikmu, monster ${region.monsterName} berhasil dijinakkan dengan gemilang!`
                : `Monster ${region.monsterName} menyerap energi nada-nada yang meleset dan berubah menjadi jauh lebih perkasa!`
              : isTie
              ? `Kedua musisi berhasil mengumpulkan poin yang sama! Harmoni kalian berdua luar biasa!`
              : `${topPlayer.name} berhasil meraih skor tertinggi dan memenangkan duel musik spektakuler ini!`}
          </p>
        </div>

        {/* ================= MAIN RESULT SHOWCASE ================= */}
        {isSolo ? (
          /* ---------- SOLO MODE VIEW ---------- */
          <div className={`p-4 sm:p-5 rounded-2xl border-3 flex flex-col md:flex-row items-center justify-between gap-5 ${
            isSoloWon
              ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border-emerald-300'
              : 'bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border-rose-400'
          }`}>
            {/* Player Character Presentation */}
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="relative">
                <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center border-4 shadow-inner ${
                  isSoloWon ? 'bg-emerald-100 border-emerald-300' : 'bg-rose-100 border-rose-300'
                }`}>
                  <CuteCharacter
                    characterId={topChar.id}
                    pose={isSoloWon ? 'celebrate' : 'sad'}
                    size="lg"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <span className={`px-2 py-0.5 rounded-full font-pixel text-[10px] ${topChar.badgeBg}`}>
                  {topPlayer.name} ({topChar.name})
                </span>
                <div className="font-pixel text-lg sm:text-xl text-sky-950">
                  {topPlayer.score} PTS
                </div>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className={`px-2 py-0.5 font-pixel text-[10px] rounded border ${getRankBadge(topPlayer.score).color}`}>
                    {getRankBadge(topPlayer.score).title}
                  </span>
                </div>
                <p className="font-sans-clean text-xs text-slate-600 italic max-w-xs mt-1">
                  "{isSoloWon ? topChar.quoteWin : topChar.quoteLose}"
                </p>
              </div>
            </div>

            {/* Monster Status Box */}
            <div className="flex flex-col items-center p-3 rounded-xl bg-white/80 border-2 border-slate-200 text-center min-w-[200px]">
              <span className="font-pixel text-[10px] text-slate-500 mb-1">
                {isSoloWon ? 'STATUS MONSTER: TERTUNDUK' : 'STATUS MONSTER: BERSERK & LEVEL UP!'}
              </span>
              <PixelMonster
                regionId={region.id}
                size={isSoloWon ? 'md' : 'xl'}
                isBuffed={!isSoloWon}
              />
              <div className="mt-2 font-sans-clean text-xs">
                <strong className={isSoloWon ? 'text-emerald-700' : 'text-rose-700'}>
                  {region.monsterName}
                </strong>
                <p className="text-[11px] text-slate-500">
                  {isSoloWon
                    ? 'Jinap & bergabung ke orkestra musikmu!'
                    : 'Menjadi Raksasa! HP x2 & Serangan Musik Berlipat!'}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* ---------- DUEL / SQUAD MODE VIEW ---------- */
          <div className="space-y-4">
            {/* Top Winner Card (Full Triumphant Celebration) */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 border-4 border-amber-400 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
              {/* Sparkle Badges */}
              <div className="absolute top-2 right-2 flex items-center gap-1 opacity-75">
                <span className="text-lg animate-spin">✨</span>
                <span className="text-lg animate-bounce">👑</span>
                <span className="text-lg animate-spin">✨</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-amber-300 to-yellow-100 border-4 border-amber-500 flex items-center justify-center shadow-lg ring-4 ring-amber-300/60">
                    <CuteCharacter characterId={topChar.id} pose="celebrate" size="lg" />
                  </div>
                  <div className="absolute -top-2 -right-1 w-8 h-8 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center shadow-md animate-bounce">
                    <Crown className="w-4 h-4 text-slate-950" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-3 py-1 rounded-full font-pixel text-xs bg-amber-500 text-slate-950 font-bold shadow-xs flex items-center gap-1 border border-amber-600">
                      <Crown className="w-3.5 h-3.5 text-slate-950" />
                      JUARA 1 (WINNER)
                    </span>
                    <span className="font-pixel text-xs text-sky-950 font-bold">
                      {topPlayer.name}
                    </span>
                  </div>
                  <h3 className="font-pixel text-lg sm:text-xl text-amber-900 mt-1 flex items-center gap-2">
                    <span>{topChar.name}</span>
                    <span className="text-sm font-sans-clean text-amber-800 font-semibold">({topChar.role})</span>
                  </h3>
                  <div className="mt-1 bg-amber-50/90 p-2 rounded-lg border border-amber-300 text-xs font-sans-clean text-slate-800 italic max-w-md shadow-2xs">
                    "{topChar.quoteWin}"
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="font-pixel text-base sm:text-lg text-amber-900 font-bold">
                      {topPlayer.score} PTS
                    </span>
                    <span className="text-xs text-emerald-800 font-pixel bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      ✓ {topPlayer.history.filter(h => h.isCorrect).length}/15 Benar
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center bg-white/95 p-3.5 rounded-xl border-2 border-amber-400 min-w-[140px] shadow-sm">
                <Trophy className="w-9 h-9 text-amber-500 animate-bounce mb-1" />
                <span className="font-pixel text-[10px] text-amber-900 font-bold">MAESTRO UTAMA</span>
                <span className="font-sans-clean text-xs text-emerald-700 font-bold">Kemenangan Penuh!</span>
              </div>
            </div>

            {/* Losers & Runners-Up Showcase: Comical, Sad but Motivating! */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-pixel text-sky-900 mb-2">
                <HeartHandshake className="w-4 h-4 text-pink-500" />
                <span>PAPAN KLASEMEN & SEMANGAT BELAJAR:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {sortedPlayers.slice(1).map((loser, idx) => {
                  const loserChar = getCharacterById(loser.characterId || 'bunbun');
                  const correctCount = loser.history.filter(h => h.isCorrect).length;

                  return (
                    <div
                      key={loser.id}
                      className="p-3.5 bg-white/95 rounded-2xl border-3 border-sky-200 hover:border-pink-300 transition-all flex flex-col justify-between shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full bg-sky-50 border-2 border-sky-300 flex items-center justify-center flex-shrink-0 relative">
                          <CuteCharacter characterId={loserChar.id} pose="sad" size="sm" />
                          <span className="absolute -bottom-1 -right-1 text-xs">💧</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-pixel text-[10px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                              #{idx + 2}
                            </span>
                            <span className="font-pixel text-xs text-slate-800 truncate font-bold">
                              {loser.name}
                            </span>
                          </div>
                          <p className="font-sans-clean text-[11px] font-semibold text-sky-700 truncate mt-0.5">
                            {loserChar.name}
                          </p>
                          <p className="font-pixel text-xs text-amber-600 mt-0.5">
                            {loser.score} Pts ({correctCount}/15)
                          </p>
                        </div>
                      </div>

                      {/* Comical Sad Reaction & Motivational Pep Talk */}
                      <div className="mt-3 p-2.5 bg-gradient-to-r from-pink-50 to-amber-50 rounded-xl border-2 border-pink-200 text-xs font-sans-clean text-slate-700 shadow-xs">
                        <div className="flex items-center gap-1.5 text-pink-700 font-bold mb-1">
                          <span className="text-base animate-pulse">😭</span>
                          <span className="font-pixel text-[10px]">HIKS, KALAH SKOR TIPIS!</span>
                        </div>
                        <p className="text-slate-700 italic bg-white/80 p-1.5 rounded-lg border border-pink-100 text-[11px] leading-snug mb-2">
                          "{loserChar.quoteLose || 'Aduh, tempo seranganku tadi kurang tepat!'}"
                        </p>
                        <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-300 text-emerald-900 text-[11px] leading-snug">
                          <p className="font-pixel text-[10px] text-emerald-700 font-bold flex items-center gap-1 mb-0.5">
                            <span>💡</span> SEMANGAT BELAJAR:
                          </p>
                          <p>
                            Kamu sudah hebat menjawab <strong>{correctCount}/15 soal benar</strong>! Jangan berkecil hati yaa, ulas materi di Slide dan tantang ulang untuk jadi juara berikutnya!
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= STATS COMPARISON TABLE ================= */}
        <div className="bg-white/80 rounded-xl border-2 border-sky-200 overflow-hidden">
          <div className="px-3.5 py-2 bg-sky-100 border-b border-sky-200 font-pixel text-[10px] text-sky-900 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-sky-700" />
              RINCIAN SKOR & AKURASI 15 SOAL
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-sky-50 text-sky-800 font-pixel text-[9px] border-b border-sky-100">
                <tr>
                  <th className="p-2.5">PEMAIN</th>
                  <th className="p-2.5">AVATAR</th>
                  <th className="p-2.5">BENAR</th>
                  <th className="p-2.5">SALAH</th>
                  <th className="p-2.5">AKURASI</th>
                  <th className="p-2.5 text-right">TOTAL SKOR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sky-100 text-slate-700 font-sans-clean">
                {sortedPlayers.map((p) => {
                  const char = getCharacterById(p.characterId || 'mimi');
                  const correct = p.history.filter(h => h.isCorrect).length;
                  const accuracy = Math.round((correct / 15) * 100);

                  return (
                    <tr key={p.id} className="hover:bg-sky-50/50">
                      <td className="p-2.5 font-bold font-pixel text-[11px] text-slate-800">
                        {p.name}
                      </td>
                      <td className="p-2.5">
                        <span className="inline-flex items-center gap-1 font-semibold text-sky-700">
                          {char.name.split(' ')[0]}
                        </span>
                      </td>
                      <td className="p-2.5 text-emerald-700 font-semibold">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                          {correct}
                        </span>
                      </td>
                      <td className="p-2.5 text-rose-700 font-semibold">
                        <span className="inline-flex items-center gap-1">
                          <XCircle className="w-3 h-3 text-rose-500" />
                          {15 - correct}
                        </span>
                      </td>
                      <td className="p-2.5 font-pixel text-[10px] text-sky-600">
                        {accuracy}%
                      </td>
                      <td className="p-2.5 font-pixel text-xs text-amber-600 font-bold text-right">
                        {p.score} Pts
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t-2 border-sky-200">
          <button
            onClick={() => {
              sound.playSelect();
              onReturnToMenu();
            }}
            className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-sky-50 text-slate-700 font-pixel text-xs rounded-xl border-2 border-sky-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-sky-600" />
            <span>KEMBALI KE LOBBY UTAMA</span>
          </button>

          <button
            onClick={() => {
              sound.playSelect();
              sound.playBattleIntro();
              onRematch();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-400 hover:to-teal-400 text-white font-pixel text-xs sm:text-sm rounded-xl border-2 border-white shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
          >
            <RotateCcw className="w-4 h-4 text-white" />
            <span>MAIN LAGI (TANTANG ULANG)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
