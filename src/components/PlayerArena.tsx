import React, { useState } from 'react';
import { GameMode, PlayerState, Question, RegionInfo } from '../types';
import { PixelMonster } from './PixelMonster';
import { CuteCharacter } from './CuteCharacter';
import { ExplanationModal } from './ExplanationModal';
import { WaitingScreen } from './WaitingScreen';
import { getCharacterById } from '../data/charactersData';
import { sound } from '../utils/audio';
import { Check, Clock, ShieldAlert, Zap } from 'lucide-react';

interface PlayerArenaProps {
  player: PlayerState;
  allPlayers: PlayerState[];
  region: RegionInfo;
  questions: Question[];
  mode: GameMode;
  onAnswer: (playerId: number, optionId: 'A' | 'B' | 'C' | 'D') => void;
  onNextQuestion: (playerId: number) => void;
}

export const PlayerArena: React.FC<PlayerArenaProps> = ({
  player,
  allPlayers,
  region,
  questions,
  mode,
  onAnswer,
  onNextQuestion
}) => {
  // If all players have finished 15 questions, do not show waiting screen - victory screen takes over
  const allFinished = allPlayers.length > 0 && allPlayers.every((p) => p.isFinished);
  if (allFinished) {
    return null;
  }

  // If this player finished 15 questions in multiplayer (duel or squad), show Waiting Screen!
  if (player.isFinished && mode !== 'solo') {
    return <WaitingScreen player={player} allPlayers={allPlayers} />;
  }

  const currentQIndex = Math.min(player.currentQIndex, questions.length - 1);
  const currentQ = questions[currentQIndex];
  const displayQNum = Math.min(player.currentQIndex + 1, 15);
  const [floatingDamage, setFloatingDamage] = useState<{ text: string; color: string } | null>(null);

  const character = getCharacterById(player.characterId || 'mimi');

  const hpPercent = Math.max(0, Math.min(100, Math.round((player.monsterHp / player.maxMonsterHp) * 100)));
  const timePercent = Math.max(0, Math.min(100, Math.round((player.timeLeft / player.maxTimePerQuestion) * 100)));

  // Color code HP bar: Green > 50%, Amber 20-50%, Red < 20%
  const getHpColorClass = () => {
    if (hpPercent > 50) return 'bg-emerald-500';
    if (hpPercent > 20) return 'bg-amber-400';
    return 'bg-rose-500 animate-pulse';
  };

  const isLowTime = player.timeLeft <= 5 && !player.isLocked && !player.isFinished;

  const handleOptionClick = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (player.isLocked || player.isFinished || !currentQ) return;
    sound.playSelect();

    const isCorrect = optionId === currentQ.correct;
    if (isCorrect) {
      sound.playAttackHit();
      setFloatingDamage({ text: '-20 HP HIT!', color: 'text-amber-500' });
      setTimeout(() => setFloatingDamage(null), 1200);
    } else {
      sound.playWrongBuzzer();
    }

    onAnswer(player.id, optionId);
  };

  const isSquad = mode === 'squad';

  // Determine avatar pose based on player state
  const getAvatarPose = () => {
    if (player.isLocked) {
      if (player.lastSelectedCorrect) return 'celebrate';
      if (player.lastSelectedCorrect === false) return 'sad';
    }
    return 'idle';
  };

  return (
    <div
      className={`relative w-full h-full flex flex-col overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-indigo-100 border-2 sm:border-4 ${
        player.colorName === 'bg-blue-600'
          ? 'border-sky-500'
          : player.colorName === 'bg-rose-600'
          ? 'border-pink-400'
          : player.colorName === 'bg-emerald-600'
          ? 'border-emerald-400'
          : 'border-amber-400'
      } ${player.isShaking ? 'animate-shake' : ''}`}
    >
      {/* 1. TOP STATUS BAR: Sky Frosted HUD */}
      <div className="bg-white/90 backdrop-blur-md border-b-2 border-sky-300 px-2 sm:px-3 py-1.5 flex items-center justify-between gap-1.5 sm:gap-2 z-10 flex-shrink-0 shadow-xs">
        {/* Left: Player Identity & Score */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className={`px-2 py-0.5 rounded-full font-pixel text-[10px] sm:text-xs text-white shadow-xs ${player.colorName}`}>
            {player.name}
          </span>
          <div className="flex items-center gap-1 bg-sky-50 px-1.5 sm:px-2 py-0.5 rounded-lg border border-sky-200 shadow-xs">
            <span className="font-pixel text-[9px] text-amber-600 font-bold">SKOR:</span>
            <span className="font-pixel text-[10px] sm:text-xs text-slate-800 font-bold">
              {player.score}
            </span>
          </div>
        </div>

        {/* Center: Monster HP HUD */}
        <div className="flex-1 max-w-[150px] sm:max-w-[210px] bg-white/90 p-1 sm:p-1.5 rounded-xl border border-sky-200 shadow-xs">
          <div className="flex items-center justify-between text-[8px] sm:text-[9px] font-pixel text-slate-700 mb-0.5">
            <span className="truncate text-sky-950 font-bold">{region.monsterName}</span>
            <span className="text-[8px] text-sky-600">Lv.15</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-pixel text-[8px] text-amber-500 font-bold">HP</span>
            <div className="flex-1 h-2 sm:h-2.5 bg-slate-200 rounded-full overflow-hidden p-0.5 border border-slate-300">
              <div
                className={`h-full rounded-full transition-all duration-300 ${getHpColorClass()}`}
                style={{ width: `${hpPercent}%` }}
              />
            </div>
            <span className="font-pixel text-[8px] text-slate-700 min-w-[34px] text-right font-semibold">
              {player.monsterHp}/{player.maxMonsterHp}
            </span>
          </div>
        </div>

        {/* Right: TIMER COUNTDOWN + Question Progress */}
        <div className="flex items-center gap-1.5">
          {/* Question Countdown Timer */}
          <div className={`px-2 py-0.5 rounded-lg border flex items-center gap-1.5 transition-all shadow-xs ${
            isLowTime
              ? 'bg-rose-100 border-rose-400 text-rose-700 animate-pulse font-bold'
              : 'bg-white border-sky-300 text-sky-800'
          }`}>
            <Clock className={`w-3 h-3 ${isLowTime ? 'text-rose-600 animate-spin' : 'text-sky-600'}`} />
            <span className="font-pixel text-[10px] sm:text-xs font-bold">
              {player.timeLeft}s
            </span>
          </div>

          {/* Question Index Progress */}
          <div className="bg-sky-500 text-white px-2 py-0.5 rounded-lg font-pixel text-[9px] sm:text-xs shadow-xs">
            Q{displayQNum}/15
          </div>
        </div>
      </div>

      {/* Timer Progress Bar (Subtle line directly underneath topbar) */}
      <div className="w-full h-1 bg-sky-200/80 z-10">
        <div
          className={`h-full transition-all duration-300 ${
            isLowTime ? 'bg-rose-500 animate-pulse' : 'bg-gradient-to-r from-sky-400 to-amber-400'
          }`}
          style={{ width: `${timePercent}%` }}
        />
      </div>

      {/* 2. MAIN BATTLE & INTERACTIVE AREA */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* VISUAL ARENA (Floating Sky Island Stage) */}
        <div className="flex-1 relative flex flex-col justify-between p-2 sm:p-4 bg-gradient-to-b from-sky-300/60 via-sky-200/50 to-indigo-100/60 overflow-hidden">
          {/* Whimsical Floating Sky Clouds */}
          <div className="absolute top-2 left-4 text-3xl opacity-35 select-none animate-pulse pointer-events-none">☁️</div>
          <div className="absolute top-6 right-8 text-4xl opacity-35 select-none animate-pulse pointer-events-none">☁️</div>
          <div className="absolute bottom-16 right-16 text-2xl opacity-20 select-none pointer-events-none">🎵</div>
          <div className="absolute top-12 left-1/3 text-2xl opacity-20 select-none pointer-events-none">✨</div>

          {/* Floating Damage Indicator */}
          {floatingDamage && (
            <div className="absolute top-1/3 right-1/4 z-20 font-pixel text-xs sm:text-base animate-bounce px-2.5 py-1 rounded-xl bg-white border-2 border-amber-400 shadow-xl text-amber-600 font-bold">
              {floatingDamage.text}
            </div>
          )}

          {/* MONSTER FLOATING PLATFORM (Upper Right) */}
          <div className="flex justify-end pr-2 sm:pr-8 pt-1 sm:pt-2">
            <div className="relative flex flex-col items-center">
              {/* Monster Sprite */}
              <div className="relative">
                <PixelMonster
                  regionId={region.id}
                  isDamaged={player.isDamaged}
                  size={isSquad ? 'sm' : 'md'}
                />

                {/* Slash animation effect overlay */}
                {player.showSlash && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <span className="font-pixel text-rose-500 text-3xl sm:text-5xl animate-slash select-none">
                      💥⚡
                    </span>
                  </div>
                )}
              </div>

              {/* Monster Floating Grassy Cloud Stand */}
              <div className="w-24 sm:w-36 h-3.5 sm:h-5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 rounded-full border-2 border-white -mt-2 -z-10 shadow-md scale-x-125" />
            </div>
          </div>

          {/* PLAYER AVATAR FLOATING PLATFORM (Lower Left) */}
          <div className="flex justify-start pl-2 sm:pl-6 pb-1">
            <div className="relative flex flex-col items-center">
              <CuteCharacter
                characterId={character.id}
                pose={getAvatarPose()}
                size={isSquad ? 'sm' : 'md'}
              />
              <span className="font-pixel text-[8px] px-1.5 py-0.5 rounded-full bg-white/90 text-sky-800 border border-sky-300 shadow-xs -mt-1 z-10">
                {character.name.split(' ')[0]}
              </span>
              {/* Trainer Island Stand */}
              <div className="w-20 sm:w-28 h-3 sm:h-4 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-full border-2 border-white -mt-2 -z-10 shadow-md scale-x-125" />
            </div>
          </div>

          {/* BATTLE DIALOGUE / QUESTION BANNER: Sky Card */}
          <div className="rpg-box-sky z-10 p-2.5 sm:p-3 mt-1 sm:mt-0 text-slate-800 border-3 border-sky-400 max-h-[110px] sm:max-h-[140px] overflow-y-auto bg-white/95 backdrop-blur-md shadow-md">
            <div className="flex items-center justify-between gap-1.5 mb-1 text-[9px] font-pixel text-sky-800">
              <span className="flex items-center gap-1.5 font-bold">
                <Zap className="w-3 h-3 text-amber-500 animate-pulse" />
                PERTANYAAN #{displayQNum}/15
              </span>
              <span className={isLowTime ? 'text-rose-600 font-bold' : 'text-sky-600'}>
                WAKTU: {player.timeLeft}S
              </span>
            </div>
            <p className="font-sans-clean text-xs sm:text-sm font-semibold text-slate-900 leading-snug">
              {currentQ ? currentQ.question : 'Memuat soal...'}
            </p>
          </div>
        </div>

        {/* ACTION / ANSWER OPTIONS PANEL */}
        <div className="w-full lg:w-72 xl:w-80 p-2 sm:p-3 bg-white/90 backdrop-blur-md border-t-2 lg:border-t-0 lg:border-l-2 border-sky-300 flex flex-col justify-center gap-1.5 sm:gap-2 z-10 flex-shrink-0">
          <div className="flex items-center justify-between px-1">
            <span className="font-pixel text-[9px] text-sky-900 font-bold">PILIH JAWABAN:</span>
            {player.isLocked && (
              <span className="font-pixel text-[9px] text-amber-600 flex items-center gap-1 animate-pulse font-bold">
                <ShieldAlert className="w-3 h-3" /> TERKUNCI
              </span>
            )}
          </div>

          {/* 4 Answer Choice Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-1.5 sm:gap-2">
            {currentQ?.options.map((opt) => {
              const isSelected = player.selectedOption === opt.id;
              const isCorrectAnswer = opt.id === currentQ.correct;

              let btnStyle = 'bg-white hover:bg-sky-50 border-sky-200 text-slate-800 hover:border-sky-400 shadow-xs';

              if (player.isLocked) {
                if (isSelected) {
                  btnStyle = isCorrectAnswer
                    ? 'bg-emerald-500 border-emerald-600 text-white shadow-md'
                    : 'bg-rose-500 border-rose-600 text-white animate-shake shadow-md';
                } else if (isCorrectAnswer && player.lastSelectedCorrect === false) {
                  btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                } else {
                  btnStyle = 'bg-sky-50/60 border-sky-100 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={player.isLocked || player.isFinished}
                  onClick={() => handleOptionClick(opt.id)}
                  className={`rpg-btn w-full p-2 sm:p-2.5 rounded-xl border-2 text-left flex items-start gap-2 text-xs transition-all cursor-pointer ${btnStyle} ${
                    player.isLocked ? 'cursor-not-allowed' : 'active:scale-98'
                  }`}
                >
                  <span className={`font-pixel text-[10px] px-1.5 py-0.5 rounded-md flex-shrink-0 mt-0.5 font-bold ${
                    isSelected && isCorrectAnswer
                      ? 'bg-emerald-700 text-white'
                      : isSelected && !isCorrectAnswer
                      ? 'bg-rose-700 text-white'
                      : 'bg-sky-100 text-sky-800'
                  }`}>
                    {opt.id}
                  </span>
                  <span className="font-sans-clean font-semibold leading-tight flex-1">
                    {opt.text}
                  </span>
                  {player.isLocked && isSelected && isCorrectAnswer && (
                    <Check className="w-4 h-4 text-white flex-shrink-0 mt-0.5 stroke-[3]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* EXPLANATION MODAL (Opens for this player if answer is wrong or timed out) */}
      <ExplanationModal
        playerName={player.name}
        playerColorName={player.colorName}
        question={currentQ}
        selectedOption={player.selectedOption}
        isOpen={player.showExplanation}
        isTimeUp={player.isTimeUp}
        onNext={() => onNextQuestion(player.id)}
      />
    </div>
  );
};
