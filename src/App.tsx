import React, { useState, useEffect, useMemo, useRef } from 'react';
import { GameMode, PlayerState, RegionId } from './types';
import { REGIONS_DATA } from './data/questionsData';
import { getPreparedQuestions } from './utils/quizUtils';
import { PlayerArena } from './components/PlayerArena';
import { SummaryModal } from './components/SummaryModal';
import { VictoryScreen } from './components/VictoryScreen';
import { CharacterSelectModal } from './components/CharacterSelectModal';
import { CuteCharacter } from './components/CuteCharacter';
import { PixelMonster } from './components/PixelMonster';
import { getCharacterById } from './data/charactersData';
import { sound } from './utils/audio';
import {
  BookOpen,
  Volume2,
  VolumeX,
  Sparkles,
  Trophy,
  Users,
  User,
  Swords,
  Shuffle,
  Music,
  Maximize2,
  Clock,
  Palette
} from 'lucide-react';

interface RegionThemeConfig {
  borderDefault: string;
  borderActive: string;
  bgDefault: string;
  bgActive: string;
  badgeStyle: string;
  cornerStyle: string;
  musicDescription: string;
  icon: string;
}

const REGION_THEMES: Record<RegionId, RegionThemeConfig> = {
  1: {
    borderDefault: 'border-emerald-400 hover:border-emerald-500',
    borderActive: 'border-emerald-500 ring-4 ring-emerald-300 shadow-xl shadow-emerald-200/70',
    bgDefault: 'bg-gradient-to-br from-emerald-50/95 via-white to-teal-50/75',
    bgActive: 'bg-gradient-to-br from-emerald-100/95 via-white to-teal-100/80',
    badgeStyle: 'bg-emerald-600 border-emerald-400 text-white',
    cornerStyle: 'border-emerald-500',
    musicDescription: 'Chiptune Bouncy C-Mayor (Tempo Cepat & Ketukan Ceria)',
    icon: '🍃',
  },
  2: {
    borderDefault: 'border-amber-400 hover:border-amber-500',
    borderActive: 'border-amber-500 ring-4 ring-amber-300 shadow-xl shadow-amber-200/70',
    bgDefault: 'bg-gradient-to-br from-amber-50/95 via-white to-orange-50/75',
    bgActive: 'bg-gradient-to-br from-amber-100/95 via-white to-orange-100/80',
    badgeStyle: 'bg-amber-600 border-amber-400 text-white',
    cornerStyle: 'border-amber-500',
    musicDescription: 'Resonansi Gong & Slendro/Pelog Nusantara (Agung & Mistis)',
    icon: '🏛️',
  },
  3: {
    borderDefault: 'border-teal-500 hover:border-teal-600',
    borderActive: 'border-teal-600 ring-4 ring-teal-300 shadow-xl shadow-teal-200/70',
    bgDefault: 'bg-gradient-to-br from-teal-50/95 via-white to-emerald-50/75',
    bgActive: 'bg-gradient-to-br from-teal-100/95 via-white to-emerald-100/80',
    badgeStyle: 'bg-teal-700 border-teal-400 text-white',
    cornerStyle: 'border-teal-600',
    musicDescription: 'Arpeggio Marimba Kayu & Akustik Sachs-Hornbostel (Lincah & Ringan)',
    icon: '🌲',
  },
  4: {
    borderDefault: 'border-purple-400 hover:border-purple-500',
    borderActive: 'border-purple-500 ring-4 ring-purple-300 shadow-xl shadow-purple-200/70',
    bgDefault: 'bg-gradient-to-br from-purple-50/95 via-white to-fuchsia-50/75',
    bgActive: 'bg-gradient-to-br from-purple-100/95 via-white to-fuchsia-100/80',
    badgeStyle: 'bg-purple-600 border-purple-400 text-white',
    cornerStyle: 'border-purple-500',
    musicDescription: 'Groove Rock/Funk Synth & Ketukan Cajon Studio (Bertenaga)',
    icon: '⚡',
  },
};

export default function App() {
  const [mode, setMode] = useState<GameMode>('solo');
  const [selectedRegionId, setSelectedRegionId] = useState<RegionId>(1);
  const [hoveredRegionId, setHoveredRegionId] = useState<RegionId | null>(null);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBgmActive, setIsBgmActive] = useState<boolean>(false);
  const [shuffleQuestions, setShuffleQuestions] = useState<boolean>(true);
  const [shuffleOptions, setShuffleOptions] = useState<boolean>(true);
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);
  const [timeLimit, setTimeLimit] = useState<number>(20); // 15, 20, or 30 seconds per question
  const [showVictory, setShowVictory] = useState<boolean>(false);

  // Character selection per player ID
  const [playerCharacters, setPlayerCharacters] = useState<Record<number, string>>({
    1: 'mimi',
    2: 'bunbun',
    3: 'bobi',
    4: 'foxy'
  });

  // Modal for changing a player's character
  const [selectingCharacterForPlayerId, setSelectingCharacterForPlayerId] = useState<number | null>(null);

  // Reference to answer delay timers to prevent duplicate or stale timeouts in StrictMode
  const answerTimeoutsRef = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  useEffect(() => {
    return () => {
      Object.values(answerTimeoutsRef.current).forEach((t) => clearTimeout(t));
    };
  }, []);

  // Current Region Metadata
  const currentRegion = useMemo(() => {
    return REGIONS_DATA.find((r) => r.id === selectedRegionId) || REGIONS_DATA[0];
  }, [selectedRegionId]);

  // Questions for current region with dynamic shuffling of question order, options A/B/C/D, and correct answers
  const regionQuestions = useMemo(() => {
    return getPreparedQuestions(selectedRegionId, shuffleQuestions, shuffleOptions);
  }, [selectedRegionId, shuffleQuestions, shuffleOptions, shuffleSeed]);

  // Pure helper to generate clean, un-finished player state for matches
  const createFreshPlayers = (
    currentMode: GameMode,
    currentChars: Record<number, string>,
    currentTimeLimit: number
  ): PlayerState[] => {
    const count = currentMode === 'solo' ? 1 : currentMode === 'duel' ? 2 : 4;
    const configs = [
      { id: 1, name: 'Player 1', colorName: 'bg-blue-600' },
      { id: 2, name: 'Player 2', colorName: 'bg-rose-600' },
      { id: 3, name: 'Player 3', colorName: 'bg-emerald-600' },
      { id: 4, name: 'Player 4', colorName: 'bg-amber-600' },
    ];

    return configs.slice(0, count).map((cfg) => ({
      id: cfg.id,
      name: cfg.name,
      colorName: cfg.colorName,
      characterId: currentChars[cfg.id] || 'mimi',
      score: 0,
      monsterHp: 300,
      maxMonsterHp: 300,
      currentQIndex: 0,
      timeLeft: currentTimeLimit,
      maxTimePerQuestion: currentTimeLimit,
      isLocked: false,
      selectedOption: null,
      lastSelectedCorrect: null,
      showExplanation: false,
      isTimeUp: false,
      isFinished: false,
      isDamaged: false,
      isShaking: false,
      showSlash: false,
      history: [],
    }));
  };

  // Players configuration based on GameMode
  const initialPlayers = useMemo((): PlayerState[] => {
    return createFreshPlayers(mode, playerCharacters, timeLimit);
  }, [mode, timeLimit, playerCharacters]);

  const [players, setPlayers] = useState<PlayerState[]>(initialPlayers);

  // Sync players when initialPlayers changes
  useEffect(() => {
    setPlayers(initialPlayers);
    setShowVictory(false);
  }, [initialPlayers]);

  // Handle character choice
  const handleSelectCharacter = (playerId: number, charId: string) => {
    setPlayerCharacters((prev) => ({
      ...prev,
      [playerId]: charId
    }));
    setPlayers((prev) =>
      prev.map((p) => (p.id === playerId ? { ...p, characterId: charId } : p))
    );
  };

  // ================= TICK TIMER ENGINE =================
  // Runs every 1 second when battle is active
  useEffect(() => {
    if (!isGameStarted || showSummaryModal || showVictory) return;

    const timerInterval = setInterval(() => {
      setPlayers((prevList) =>
        prevList.map((player) => {
          // Skip ticking if player is locked, finished, or in explanation modal
          if (player.isLocked || player.isFinished || player.showExplanation) {
            return player;
          }

          if (player.timeLeft > 1) {
            return {
              ...player,
              timeLeft: player.timeLeft - 1,
            };
          }

          // TIME IS UP! (reaches 0)
          sound.playWrongBuzzer();
          const currentQ = regionQuestions[player.currentQIndex];
          const updatedHistory = currentQ
            ? [
                ...player.history,
                { questionId: currentQ.id, selected: 'TIMEOUT' as const, isCorrect: false, scoreGained: 0 },
              ]
            : player.history;

          return {
            ...player,
            timeLeft: 0,
            isLocked: true,
            isTimeUp: true,
            showExplanation: true,
            isShaking: true,
            history: updatedHistory,
          };
        })
      );
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isGameStarted, showSummaryModal, showVictory, regionQuestions]);

  // Handle player answer click
  const handleAnswer = (playerId: number, optionId: 'A' | 'B' | 'C' | 'D') => {
    // 1. Locate current player taking action
    const player = players.find((p) => p.id === playerId);
    if (!player || player.isLocked || player.isFinished) return;

    // Safety: ensure question index is strictly within 0..14 (so never 15 / Q16)
    const qIndex = Math.min(player.currentQIndex, regionQuestions.length - 1);
    const currentQ = regionQuestions[qIndex];
    if (!currentQ) return;

    const isCorrect = optionId === currentQ.correct;
    const isLastQ = qIndex >= regionQuestions.length - 1; // True on Question 15 (index 14)

    // Clear any prior transition timer for this player to prevent double increments
    if (answerTimeoutsRef.current[playerId]) {
      clearTimeout(answerTimeoutsRef.current[playerId]);
      delete answerTimeoutsRef.current[playerId];
    }

    if (isCorrect) {
      // Correct Answer: +100 pts + speed bonus (remaining seconds * 2), -20 HP, animation
      const speedBonus = Math.max(0, player.timeLeft * 2);
      const scoreGained = 100 + speedBonus;
      const newHp = Math.max(0, player.monsterHp - 20);
      const newScore = player.score + scoreGained;
      const updatedHistory = [
        ...player.history,
        { questionId: currentQ.id, selected: optionId, isCorrect: true, scoreGained },
      ];

      // Update player visual state synchronously
      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id !== playerId) return p;
          return {
            ...p,
            score: newScore,
            monsterHp: newHp,
            isLocked: true,
            selectedOption: optionId,
            lastSelectedCorrect: true,
            isDamaged: true,
            showSlash: true,
            history: updatedHistory,
          };
        })
      );

      if (isLastQ) {
        // Final question (Question 15) completed!
        // Allow brief 650ms for attack slash animation, then mark player as finished
        answerTimeoutsRef.current[playerId] = setTimeout(() => {
          setPlayers((prev) => {
            const nextList = prev.map((p) => {
              if (p.id !== playerId) return p;
              return {
                ...p,
                isFinished: true,
                isLocked: true,
                isDamaged: false,
                showSlash: false,
              };
            });

            // Check if all players are now finished
            const allFinishedNow = nextList.every((p) => p.isFinished);
            if (allFinishedNow) {
              sound.playVictoryFanfare();
              setShowVictory(true);
            }

            return nextList;
          });
        }, 650);
      } else {
        // Not the last question: advance to next question after 850ms
        answerTimeoutsRef.current[playerId] = setTimeout(() => {
          setPlayers((prev) =>
            prev.map((p) => {
              if (p.id !== playerId) return p;
              // Guarantee index never exceeds 14 (so never reaches 15 / Q16)
              const nextIndex = Math.min(p.currentQIndex + 1, regionQuestions.length - 1);
              return {
                ...p,
                currentQIndex: nextIndex,
                timeLeft: timeLimit,
                selectedOption: null,
                isLocked: false,
                isTimeUp: false,
                lastSelectedCorrect: null,
                isDamaged: false,
                showSlash: false,
              };
            })
          );
        }, 850);
      }
    } else {
      // Wrong Answer: Lock buttons, shake animation, show explanation pop-up
      const updatedHistory = [
        ...player.history,
        { questionId: currentQ.id, selected: optionId, isCorrect: false, scoreGained: 0 },
      ];

      setPlayers((prev) =>
        prev.map((p) => {
          if (p.id !== playerId) return p;
          return {
            ...p,
            isLocked: true,
            selectedOption: optionId,
            lastSelectedCorrect: false,
            isShaking: true,
            showExplanation: true,
            isTimeUp: false,
            history: updatedHistory,
          };
        })
      );
    }
  };

  // Handle Next Question on Explanation Modal dismissal
  const handleNextQuestion = (playerId: number) => {
    // Clear any pending timeout for this player
    if (answerTimeoutsRef.current[playerId]) {
      clearTimeout(answerTimeoutsRef.current[playerId]);
      delete answerTimeoutsRef.current[playerId];
    }

    setPlayers((prev) => {
      const nextList = prev.map((player) => {
        if (player.id !== playerId) return player;

        const isLastQ = player.currentQIndex >= regionQuestions.length - 1;

        if (isLastQ) {
          return {
            ...player,
            isFinished: true,
            showExplanation: false,
            isLocked: true,
            isShaking: false,
            isTimeUp: false,
          };
        }

        return {
          ...player,
          currentQIndex: Math.min(player.currentQIndex + 1, regionQuestions.length - 1),
          timeLeft: timeLimit,
          selectedOption: null,
          isLocked: false,
          isTimeUp: false,
          lastSelectedCorrect: null,
          showExplanation: false,
          isShaking: false,
        };
      });

      // If all players are now finished, immediately open victory screen!
      const allFinishedNow = nextList.every((p) => p.isFinished);
      if (allFinishedNow) {
        sound.playVictoryFanfare();
        setShowVictory(true);
      }

      return nextList;
    });
  };

  // Check if all active players are finished (15 questions completed)
  useEffect(() => {
    if (!isGameStarted || players.length === 0) return;
    const allFinished = players.every((p) => p.isFinished);
    if (allFinished && !showVictory) {
      sound.playVictoryFanfare();
      setShowVictory(true);
    }
  }, [players, isGameStarted, showVictory]);

  // Audio Toggles
  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    setIsBgmActive(!muted && sound.isBgmPlaying);
  };

  const handleToggleBgm = () => {
    if (isBgmActive) {
      sound.stopBattleBgm();
      setIsBgmActive(false);
    } else {
      sound.startBattleBgm(selectedRegionId);
      setIsBgmActive(true);
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    sound.playSelect();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Select Region and switch its music preview
  const handleSelectRegion = (regionId: RegionId) => {
    sound.playSelect();
    setSelectedRegionId(regionId);
    if (isBgmActive && !isMuted) {
      sound.startBattleBgm(regionId);
    }
  };

  // Open Slides for specific Region
  const handleOpenSlidesForRegion = (regionId: RegionId, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sound.playSelect();
    setSelectedRegionId(regionId);
    if (isBgmActive && !isMuted) {
      sound.startBattleBgm(regionId);
    }
    setShowSummaryModal(true);
  };

  const handleStartBattleFromSummary = () => {
    Object.values(answerTimeoutsRef.current).forEach((t) => clearTimeout(t));
    answerTimeoutsRef.current = {};
    setShowVictory(false);
    setShuffleSeed((s) => s + 1);
    setPlayers(createFreshPlayers(mode, playerCharacters, timeLimit));
    setShowSummaryModal(false);
    setIsGameStarted(true);
    sound.playBattleIntro();
    if (!isMuted) {
      sound.startBattleBgm(selectedRegionId);
      setIsBgmActive(true);
    }
  };

  const handleDirectStartBattle = () => {
    sound.playSelect();
    Object.values(answerTimeoutsRef.current).forEach((t) => clearTimeout(t));
    answerTimeoutsRef.current = {};
    setShowVictory(false);
    setShuffleSeed((s) => s + 1);
    setPlayers(createFreshPlayers(mode, playerCharacters, timeLimit));
    setShowSummaryModal(false);
    setIsGameStarted(true);
    sound.playBattleIntro();
    if (!isMuted) {
      sound.startBattleBgm(selectedRegionId);
      setIsBgmActive(true);
    }
  };

  const handleRematch = () => {
    Object.values(answerTimeoutsRef.current).forEach((t) => clearTimeout(t));
    answerTimeoutsRef.current = {};
    sound.playBattleIntro();
    if (!isMuted) {
      sound.startBattleBgm(selectedRegionId);
      setIsBgmActive(true);
    }
    setShowVictory(false);
    setShuffleSeed((s) => s + 1);
    setPlayers(createFreshPlayers(mode, playerCharacters, timeLimit));
  };

  const handleReturnToMenu = () => {
    Object.values(answerTimeoutsRef.current).forEach((t) => clearTimeout(t));
    answerTimeoutsRef.current = {};
    setShowVictory(false);
    setIsGameStarted(false);
    sound.stopBattleBgm();
    setIsBgmActive(false);
    // Reset players so stale isFinished state never triggers premature victory on replay
    setPlayers(createFreshPlayers(mode, playerCharacters, timeLimit));
  };

  const activeSelectingPlayer = players.find((p) => p.id === selectingCharacterForPlayerId);

  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-b from-sky-400 via-sky-200 to-indigo-100 text-slate-800 select-none overflow-hidden font-sans-clean">
      {/* ================= TOP NAVIGATION BAR (Sky Crystal Glass) ================= */}
      <header className="h-12 sm:h-14 bg-gradient-to-r from-sky-600 via-indigo-600 to-sky-600 border-b-4 border-sky-300 px-3 sm:px-5 flex items-center justify-between z-30 flex-shrink-0 shadow-md text-white">
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer" onClick={handleReturnToMenu}>
          <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center border-2 border-white shadow-sm">
            <span className="font-pixel text-xs text-slate-950 font-bold">🎵</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-pixel text-xs sm:text-sm text-amber-200 tracking-wide">
                MUSIC MONSTER ACADEMY
              </h1>
              <span className="hidden md:inline px-2 py-0.5 rounded-full bg-white/20 text-white font-pixel text-[9px] border border-white/30">
                SKY REALM
              </span>
            </div>
            <p className="font-sans-clean text-[10px] text-sky-100 hidden sm:block">
              {currentRegion.name} • MODE {mode.toUpperCase()} • ⏱️ {timeLimit}s / SOAL
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Rangkuman Materi PowerPoint Slides Quick Access */}
          <button
            onClick={() => {
              sound.playSelect();
              setShowSummaryModal(true);
            }}
            title="Buka Slide Presentasi Rangkuman Materi"
            className="px-2.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl font-pixel text-[10px] flex items-center gap-1.5 cursor-pointer transition-all shadow-xs font-bold"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden md:inline">SLIDE MATERI</span>
          </button>

          {/* 8-bit Music Toggle */}
          <button
            onClick={handleToggleBgm}
            title={isBgmActive ? 'Matikan Musik 8-Bit' : 'Nyalakan Musik 8-Bit BGM'}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border-2 font-pixel text-[10px] flex items-center gap-1 cursor-pointer transition-all ${
              isBgmActive
                ? 'bg-emerald-500 text-white border-white animate-pulse shadow-sm'
                : 'bg-white/10 text-sky-100 border-white/20 hover:bg-white/20'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">{isBgmActive ? 'BGM ON' : 'BGM OFF'}</span>
          </button>

          {/* Sound FX Mute */}
          <button
            onClick={handleToggleMute}
            title={isMuted ? 'Nyalakan Suara (Unmute)' : 'Bisukan Suara (Mute)'}
            className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl border-2 font-pixel text-[10px] flex items-center gap-1 cursor-pointer transition-all ${
              isMuted
                ? 'bg-rose-500 text-white border-white'
                : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            title="Layar Penuh (Fullscreen)"
            className="hidden sm:flex p-1.5 sm:px-2.5 sm:py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 font-pixel text-[10px] items-center gap-1 cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="flex-1 w-full h-[calc(100vh-3.5rem)] relative overflow-hidden flex flex-col">
        {!isGameStarted ? (
          /* ================= MENU UTAMA (HOME / LOBBY) ================= */
          <div className="flex-1 w-full overflow-y-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-start relative">
            {/* Whimsical Floating Sky Clouds */}
            <div className="absolute top-6 left-10 text-5xl opacity-40 select-none animate-pulse pointer-events-none">☁️</div>
            <div className="absolute top-16 right-12 text-6xl opacity-40 select-none animate-pulse pointer-events-none">☁️</div>
            <div className="absolute bottom-10 left-16 text-4xl opacity-30 select-none pointer-events-none">🎵</div>
            <div className="absolute bottom-20 right-20 text-4xl opacity-30 select-none pointer-events-none">✨</div>

            <div className="w-full max-w-4xl flex flex-col gap-5 items-center z-10 my-auto">
              
              {/* Sky Hero Banner */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/80 border-2 border-sky-400 rounded-full text-sky-800 font-pixel text-xs shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                  <span>DUNIA MUSIK LANGIT BERGAYA RPG POKÉMON</span>
                </div>
                <h1 className="font-pixel text-2xl sm:text-4xl text-sky-950 tracking-wider drop-shadow-xs">
                  MUSIC MONSTER ACADEMY
                </h1>
                <p className="font-sans-clean text-xs sm:text-sm text-sky-800 font-medium max-w-xl mx-auto">
                  Jelajahi kerajaan musik di atas awan, pelajari teori dengan slide PowerPoint Gen-Z yang asyik, pilih avatar musisi imutmu, dan kalahkan monster penjaga 4 region!
                </p>
              </div>

              {/* 1. SELECT MODE BERMAIN (Solo, Duel, Squad) */}
              <div className="w-full bg-white/90 backdrop-blur-md p-4 sm:p-5 border-4 border-sky-400 rounded-2xl shadow-lg">
                <h2 className="font-pixel text-xs text-sky-950 mb-3 flex items-center gap-2 font-bold">
                  <Users className="w-4 h-4 text-sky-600" />
                  1. PILIH MODE BERMAIN (SPLIT-SCREEN)
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Solo (1P) */}
                  <button
                    onClick={() => {
                      sound.playSelect();
                      setMode('solo');
                    }}
                    className={`p-3.5 rounded-xl border-3 text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      mode === 'solo'
                        ? 'bg-sky-50 border-sky-500 shadow-md ring-2 ring-sky-300'
                        : 'bg-white border-sky-200 hover:border-sky-300 hover:bg-sky-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-pixel text-xs text-sky-900 flex items-center gap-1.5 font-bold">
                        <User className="w-3.5 h-3.5 text-sky-600" /> SOLO (1P)
                      </span>
                      {mode === 'solo' && (
                        <span className="font-pixel text-[9px] px-1.5 py-0.5 rounded bg-sky-500 text-white">
                          AKTIF
                        </span>
                      )}
                    </div>
                    <p className="font-sans-clean text-xs text-slate-600 mt-1">
                      Layar penuh (100vw, 100vh). Langsung hadapi monster secara mandiri.
                    </p>
                  </button>

                  {/* Duel (2P) */}
                  <button
                    onClick={() => {
                      sound.playSelect();
                      setMode('duel');
                    }}
                    className={`p-3.5 rounded-xl border-3 text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      mode === 'duel'
                        ? 'bg-pink-50 border-pink-500 shadow-md ring-2 ring-pink-300'
                        : 'bg-white border-sky-200 hover:border-pink-300 hover:bg-pink-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-pixel text-xs text-pink-900 flex items-center gap-1.5 font-bold">
                        <Swords className="w-3.5 h-3.5 text-pink-600" /> DUEL (2P)
                      </span>
                      {mode === 'duel' && (
                        <span className="font-pixel text-[9px] px-1.5 py-0.5 rounded bg-pink-500 text-white">
                          AKTIF
                        </span>
                      )}
                    </div>
                    <p className="font-sans-clean text-xs text-slate-600 mt-1">
                      Split-screen vertikal 50:50. P1 vs P2 balapan akurasi & waktu kuis.
                    </p>
                  </button>

                  {/* Squad (4P) */}
                  <button
                    onClick={() => {
                      sound.playSelect();
                      setMode('squad');
                    }}
                    className={`p-3.5 rounded-xl border-3 text-left flex flex-col gap-1 transition-all cursor-pointer ${
                      mode === 'squad'
                        ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                        : 'bg-white border-sky-200 hover:border-emerald-300 hover:bg-emerald-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-pixel text-xs text-emerald-900 flex items-center gap-1.5 font-bold">
                        <Users className="w-3.5 h-3.5 text-emerald-600" /> SQUAD (4P)
                      </span>
                      {mode === 'squad' && (
                        <span className="font-pixel text-[9px] px-1.5 py-0.5 rounded bg-emerald-500 text-white">
                          AKTIF
                        </span>
                      )}
                    </div>
                    <p className="font-sans-clean text-xs text-slate-600 mt-1">
                      Grid split-screen 2x2. 4 pemain (P1-P4) bertanding serentak di satu layar.
                    </p>
                  </button>
                </div>
              </div>

              {/* 2. PILIH KARAKTER / AVATAR MUSISI UNTUK TIAP PEMAIN */}
              <div className="w-full bg-white/90 backdrop-blur-md p-4 sm:p-5 border-4 border-sky-400 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-pixel text-xs text-sky-950 flex items-center gap-2 font-bold">
                    <Palette className="w-4 h-4 text-amber-500" />
                    2. PILIH AVATAR PEMAIN (KLIK UNTUK GANTI KARAKTER)
                  </h2>
                  <span className="text-[11px] text-sky-700 font-sans-clean font-semibold hidden sm:inline">
                    6 Karakter Lucu Tersedia ✨
                  </span>
                </div>

                <div className={`grid gap-3 ${
                  mode === 'solo'
                    ? 'grid-cols-1'
                    : mode === 'duel'
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
                }`}>
                  {players.map((p) => {
                    const char = getCharacterById(playerCharacters[p.id] || 'mimi');

                    return (
                      <div
                        key={p.id}
                        onClick={() => {
                          sound.playSelect();
                          setSelectingCharacterForPlayerId(p.id);
                        }}
                        className="p-3 bg-white rounded-xl border-2 border-sky-300 hover:border-amber-400 hover:shadow-md cursor-pointer transition-all flex items-center gap-3 group"
                      >
                        <div className="w-16 h-16 rounded-full bg-sky-50 border-2 border-sky-200 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-all">
                          <CuteCharacter characterId={char.id} pose="idle" size="sm" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <span className={`px-2 py-0.5 rounded-full font-pixel text-[9px] text-white ${p.colorName}`}>
                              {p.name}
                            </span>
                            <span className="text-[10px] text-sky-600 font-pixel group-hover:text-amber-600">
                              GANTI ▶
                            </span>
                          </div>
                          <h4 className="font-pixel text-xs text-slate-800 truncate font-bold">
                            {char.name}
                          </h4>
                          <p className="font-sans-clean text-[11px] text-sky-700 truncate font-semibold">
                            {char.role}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 3. CONFIG: WAKTU SOAL, ACAK SOAL & PILIHAN GANDA */}
              <div className="w-full bg-white/90 backdrop-blur-md p-4 border-4 border-sky-400 rounded-2xl shadow-lg flex flex-col gap-3">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
                  {/* Waktu Per Soal Settings */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-pixel text-xs text-sky-950 flex items-center gap-1.5 font-bold">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      BATAS WAKTU:
                    </span>
                    <div className="flex items-center gap-1">
                      {[15, 20, 30].map((sec) => (
                        <button
                          key={sec}
                          onClick={() => {
                            sound.playSelect();
                            setTimeLimit(sec);
                          }}
                          className={`px-3 py-1.5 rounded-xl font-pixel text-[10px] border-2 transition-all cursor-pointer ${
                            timeLimit === sec
                              ? 'bg-amber-400 text-slate-950 border-amber-500 font-bold shadow-xs'
                              : 'bg-white text-slate-700 border-sky-200 hover:bg-sky-50'
                          }`}
                        >
                          {sec}s
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Shuffle Controls Group */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Shuffle Questions Toggle */}
                    <button
                      onClick={() => {
                        sound.playSelect();
                        setShuffleQuestions(!shuffleQuestions);
                      }}
                      title="Mengacak urutan 15 soal secara dinamis"
                      className={`px-3 py-1.5 rounded-xl border-2 font-pixel text-[10px] flex items-center gap-1.5 cursor-pointer transition-all ${
                        shuffleQuestions
                          ? 'bg-sky-500 text-white border-sky-600 font-bold shadow-xs'
                          : 'bg-white text-slate-600 border-sky-200 hover:bg-sky-50'
                      }`}
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>SOAL: {shuffleQuestions ? 'TERACAK ✓' : 'BERURUTAN'}</span>
                    </button>

                    {/* Shuffle Multiple Choice Options & Correct Key Toggle */}
                    <button
                      onClick={() => {
                        sound.playSelect();
                        setShuffleOptions(!shuffleOptions);
                      }}
                      title="Mengacak posisi pilihan ganda (A, B, C, D) dan kunci jawaban yang benarnya"
                      className={`px-3 py-1.5 rounded-xl border-2 font-pixel text-[10px] flex items-center gap-1.5 cursor-pointer transition-all ${
                        shuffleOptions
                          ? 'bg-emerald-600 text-white border-emerald-700 font-bold shadow-xs'
                          : 'bg-white text-slate-600 border-sky-200 hover:bg-sky-50'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>OPSI A/B/C/D: {shuffleOptions ? 'TERACAK ✓' : 'ASLI'}</span>
                    </button>

                    {/* Re-roll / Shuffle Again Button */}
                    <button
                      onClick={() => {
                        sound.playSelect();
                        setShuffleSeed((prev) => prev + 1);
                      }}
                      title="Kocok ulang urutan soal dan pilihan ganda sekarang juga"
                      className="px-3 py-1.5 rounded-xl border-2 border-amber-400 bg-amber-100 hover:bg-amber-200 text-amber-900 font-pixel text-[10px] flex items-center gap-1.5 cursor-pointer transition-all active:scale-95 font-bold shadow-2xs"
                    >
                      <span>🎲</span>
                      <span>KOCOK ULANG</span>
                    </button>
                  </div>
                </div>

                {/* Helpful note */}
                <div className="text-[11px] font-sans-clean text-sky-800 flex items-center gap-1.5 bg-sky-50/80 px-3 py-1.5 rounded-xl border border-sky-200">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span>
                    <strong>Mode Acak Aktif:</strong> Urutan soal dan posisi pilihan ganda yang benar (A, B, C, atau D) diacak secara otomatis dan merata tiap sesi kuis.
                  </span>
                </div>
              </div>

              {/* 4. SELECT REGION MATERI (Region 1 - 4) */}
              <div className="w-full bg-white/90 backdrop-blur-md p-4 sm:p-5 border-4 border-sky-400 rounded-2xl shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                  <h2 className="font-pixel text-xs text-sky-950 flex items-center gap-2 font-bold">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    4. PILIH REGION MATERI (TIAP WILAYAH PUNYA BINGKAI & MUSIK KHAS)
                  </h2>
                  <span className="text-[11px] text-sky-700 font-sans-clean font-semibold">
                    Hover mouse untuk lihat teks lengkap & info musik ✨
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {REGIONS_DATA.map((reg) => {
                    const theme = REGION_THEMES[reg.id];
                    const isSelected = selectedRegionId === reg.id;

                    return (
                      <div
                        key={reg.id}
                        onClick={() => handleSelectRegion(reg.id)}
                        onMouseEnter={() => setHoveredRegionId(reg.id)}
                        onMouseLeave={() => setHoveredRegionId(null)}
                        className={`group relative p-3.5 sm:p-4 rounded-2xl border-4 flex flex-col sm:flex-row items-start sm:items-center gap-3.5 cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? `${theme.borderActive} ${theme.bgActive}`
                            : `${theme.borderDefault} ${theme.bgDefault}`
                        }`}
                      >
                        {/* Decorative RPG Frame Corner Brackets */}
                        <div className={`absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 pointer-events-none rounded-tl-xs ${theme.cornerStyle}`} />
                        <div className={`absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 pointer-events-none rounded-tr-xs ${theme.cornerStyle}`} />
                        <div className={`absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 pointer-events-none rounded-bl-xs ${theme.cornerStyle}`} />
                        <div className={`absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 pointer-events-none rounded-br-xs ${theme.cornerStyle}`} />

                        {/* Floating Hover Tooltip: Muncul teks lengkap saat mouse hover */}
                        <div
                          className={`opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 z-50 absolute left-1/2 -translate-x-1/2 w-80 sm:w-96 p-3.5 bg-slate-950/95 text-white rounded-2xl border-2 border-amber-300 shadow-2xl backdrop-blur-md hidden sm:block ${
                            reg.id <= 2 ? 'top-full mt-2.5' : '-top-2 -translate-y-full'
                          }`}
                          style={{ filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.6))' }}
                        >
                          <div className="flex items-center justify-between border-b border-white/20 pb-1.5 mb-2">
                            <span className="font-pixel text-[11px] text-amber-300 flex items-center gap-1.5 font-bold">
                              {theme.icon} REGION {reg.id} MATERI LENGKAP
                            </span>
                            <span className="text-[10px] font-pixel text-emerald-400">
                              {isSelected ? '★ SEDANG TERPILIH' : 'KLIK UNTUK PILIH'}
                            </span>
                          </div>
                          <h4 className="font-pixel text-xs text-amber-200 mb-1 leading-snug">
                            {reg.name}
                          </h4>
                          <div className="text-xs font-sans-clean text-sky-200 font-semibold mb-2">
                            {reg.subtitle}
                          </div>
                          <div className="bg-white/10 rounded-lg p-2 text-[11px] space-y-1 mb-2 font-sans-clean">
                            <div className="flex items-center gap-1 text-amber-300 font-semibold">
                              <span>👾 Bos Penjaga:</span>
                              <span className="text-white">{reg.monsterName}</span>
                              <span className="text-slate-400 text-[10px]">({reg.monsterTitle})</span>
                            </div>
                            <div className="flex items-center gap-1 text-sky-300">
                              <span>🎵 Musik BGM:</span>
                              <span className="text-sky-100">{theme.musicDescription}</span>
                            </div>
                          </div>
                          <p className="text-[10px] text-slate-300 italic">
                            💡 {reg.summary.importantTip}
                          </p>
                          {/* Tooltip pointer indicator */}
                          {reg.id <= 2 ? (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-8 border-transparent border-b-slate-950" />
                          ) : (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-950" />
                          )}
                        </div>

                        {/* Monster Sprite */}
                        <div className="flex-shrink-0 relative">
                          <PixelMonster regionId={reg.id} size="sm" />
                        </div>

                        {/* Main Info */}
                        <div className="flex-1 min-w-0 w-full">
                          {/* Top Badges Row */}
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            {/* Strictly single-line Region Badge with no wrapping */}
                            <span
                              className={`whitespace-nowrap shrink-0 inline-flex items-center justify-center px-2.5 py-1 rounded-md font-pixel text-[10px] sm:text-xs font-bold tracking-wider leading-none shadow-xs border select-none ${theme.badgeStyle}`}
                            >
                              REGION {reg.id}
                            </span>
                            <span className="font-pixel text-[10px] text-slate-700 font-semibold truncate group-hover:whitespace-normal group-hover:overflow-visible transition-colors">
                              👾 {reg.monsterName}
                            </span>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 font-pixel text-[9px] px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold animate-pulse shadow-xs whitespace-nowrap ml-auto">
                                ✓ TERPILIH
                              </span>
                            )}
                          </div>

                          {/* Region Name: Full text revealed on hover */}
                          <h3
                            title={`${reg.name} - ${reg.subtitle}`}
                            className="font-pixel text-xs sm:text-sm text-sky-950 font-bold transition-all group-hover:text-amber-700 group-hover:whitespace-normal leading-snug"
                          >
                            {reg.name}
                          </h3>

                          {/* Subtitle / Topic: Full text revealed on hover */}
                          <p
                            title={reg.subtitle}
                            className="font-sans-clean text-xs text-slate-600 line-clamp-1 group-hover:line-clamp-none transition-all mt-0.5 font-medium"
                          >
                            {reg.subtitle}
                          </p>

                          {/* Distinct Region Music Indicator */}
                          <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-pixel text-sky-700">
                            <Music className="w-3 h-3 text-sky-600 shrink-0" />
                            <span className="truncate group-hover:whitespace-normal group-hover:overflow-visible">
                              {theme.musicDescription}
                            </span>
                          </div>
                        </div>

                        {/* Slide Button */}
                        <div className="flex-shrink-0 flex sm:flex-col items-center gap-1.5 w-full sm:w-auto justify-end pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                          <button
                            onClick={(e) => handleOpenSlidesForRegion(reg.id, e)}
                            title={`Buka Slide Presentasi Materi ${reg.name}`}
                            className="w-full sm:w-auto px-3 py-1.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-pixel text-[9px] rounded-xl font-bold shadow-xs flex items-center justify-center gap-1 cursor-pointer transition-all border border-amber-500"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>SLIDES ▶</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Panel Info Lengkap Region yang Sedang Disorot / Dipilih */}
                {(() => {
                  const activeOrHoveredId = hoveredRegionId || selectedRegionId;
                  const activeReg = REGIONS_DATA.find((r) => r.id === activeOrHoveredId) || REGIONS_DATA[0];
                  const activeTheme = REGION_THEMES[activeReg.id];

                  return (
                    <div className={`mt-3.5 p-3 sm:p-4 rounded-xl border-2 bg-white/95 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-3 ${activeTheme.borderDefault}`}>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded font-pixel text-[10px] whitespace-nowrap ${activeTheme.badgeStyle}`}>
                            REGION {activeReg.id}
                          </span>
                          <span className="font-pixel text-xs text-sky-950 font-bold">
                            {activeReg.name}
                          </span>
                          <span className="text-[11px] font-pixel text-slate-600">
                            • Bos: {activeReg.monsterName} ({activeReg.monsterTitle})
                          </span>
                        </div>
                        <p className="font-sans-clean text-xs text-slate-700">
                          <strong className="text-slate-900">Materi Lengkap:</strong> {activeReg.subtitle}
                        </p>
                        <p className="font-sans-clean text-[11px] text-sky-800 flex items-center gap-1.5">
                          <Music className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span><strong>Musik Khas Region:</strong> {activeTheme.musicDescription}</span>
                        </p>
                      </div>
                      <button
                        onClick={() => handleOpenSlidesForRegion(activeReg.id)}
                        className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-pixel text-[10px] rounded-xl font-bold shadow-xs shrink-0 flex items-center gap-1.5 border border-white cursor-pointer transition-all active:scale-95"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>BUKA SLIDE REGION {activeReg.id}</span>
                      </button>
                    </div>
                  );
                })()}
              </div>

              {/* Direct Quick Launch Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-xl">
                <button
                  onClick={handleDirectStartBattle}
                  className="w-full sm:flex-1 px-6 py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-400 hover:to-teal-400 active:scale-98 text-white font-pixel text-xs sm:text-sm rounded-2xl border-2 border-white shadow-xl flex items-center justify-center gap-2 cursor-pointer tracking-wider transition-all font-bold"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
                  <span>MULAI PERTARUNGAN ▶</span>
                </button>

                <button
                  onClick={() => handleOpenSlidesForRegion(selectedRegionId)}
                  className="w-full sm:flex-1 px-6 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 active:scale-98 text-slate-950 font-pixel text-xs sm:text-sm rounded-2xl border-2 border-white shadow-xl flex items-center justify-center gap-2 cursor-pointer tracking-wider transition-all font-bold"
                >
                  <BookOpen className="w-4 h-4 text-slate-950" />
                  <span>SLIDE MATERI PRESENTASI</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ================= BATTLEFIELD (SPLIT-SCREEN MODES) ================= */
          <div className="w-full h-full relative overflow-hidden bg-sky-200">
            {/* SOLO (1P): 100vw, 100vh */}
            {mode === 'solo' && (
              <div className="w-full h-full">
                <PlayerArena
                  player={players[0]}
                  allPlayers={players}
                  region={currentRegion}
                  questions={regionQuestions}
                  mode={mode}
                  onAnswer={handleAnswer}
                  onNextQuestion={handleNextQuestion}
                />
              </div>
            )}

            {/* DUEL (2P): Vertical Split Screen 50:50 */}
            {mode === 'duel' && (
              <div className="w-full h-full flex flex-col md:flex-row divide-y-2 md:divide-y-0 md:divide-x-4 divide-sky-400">
                <div className="w-full md:w-1/2 h-1/2 md:h-full">
                  <PlayerArena
                    player={players[0]}
                    allPlayers={players}
                    region={currentRegion}
                    questions={regionQuestions}
                    mode={mode}
                    onAnswer={handleAnswer}
                    onNextQuestion={handleNextQuestion}
                  />
                </div>
                <div className="w-full md:w-1/2 h-1/2 md:h-full">
                  <PlayerArena
                    player={players[1]}
                    allPlayers={players}
                    region={currentRegion}
                    questions={regionQuestions}
                    mode={mode}
                    onAnswer={handleAnswer}
                    onNextQuestion={handleNextQuestion}
                  />
                </div>
              </div>
            )}

            {/* SQUAD (4P): 2x2 Grid Split Screen */}
            {mode === 'squad' && (
              <div className="w-full h-full grid grid-cols-2 grid-rows-2 gap-1.5 bg-sky-400 p-0.5">
                {players.map((p) => (
                  <div key={p.id} className="w-full h-full overflow-hidden rounded-xl">
                    <PlayerArena
                      player={p}
                      allPlayers={players}
                      region={currentRegion}
                      questions={regionQuestions}
                      mode={mode}
                      onAnswer={handleAnswer}
                      onNextQuestion={handleNextQuestion}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ================= MODAL PILIH KARAKTER ================= */}
      {activeSelectingPlayer && (
        <CharacterSelectModal
          isOpen={selectingCharacterForPlayerId !== null}
          onClose={() => setSelectingCharacterForPlayerId(null)}
          playerId={activeSelectingPlayer.id}
          playerName={activeSelectingPlayer.name}
          selectedCharacterId={playerCharacters[activeSelectingPlayer.id] || 'mimi'}
          onSelectCharacter={handleSelectCharacter}
        />
      )}

      {/* ================= MODAL RANGKUMAN MATERI (GEN-Z SLIDES) ================= */}
      <SummaryModal
        region={currentRegion}
        isOpen={showSummaryModal}
        onStartBattle={handleStartBattleFromSummary}
      />

      {/* ================= HALAMAN KEMENANGAN (VICTORY SCREEN) ================= */}
      {showVictory && (
        <VictoryScreen
          players={players}
          region={currentRegion}
          onRematch={handleRematch}
          onReturnToMenu={handleReturnToMenu}
        />
      )}
    </div>
  );
}
