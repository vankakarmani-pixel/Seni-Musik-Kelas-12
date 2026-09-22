import React from 'react';

export type CharacterPose = 'idle' | 'waiting' | 'celebrate' | 'sad';

interface CuteCharacterProps {
  characterId: string;
  pose?: CharacterPose;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showShadow?: boolean;
}

export const CuteCharacter: React.FC<CuteCharacterProps> = ({
  characterId,
  pose = 'idle',
  size = 'md',
  showShadow = true
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16 sm:w-20 sm:h-20',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-40 sm:h-40',
    xl: 'w-44 h-44 sm:w-52 sm:h-52'
  }[size];

  const getPoseAnimation = () => {
    switch (pose) {
      case 'celebrate':
        return 'animate-bounce';
      case 'waiting':
        return 'animate-pulse';
      case 'sad':
        return 'animate-shake';
      case 'idle':
      default:
        return 'animate-trainer-bounce';
    }
  };

  const renderCharacterSvg = () => {
    switch (characterId) {
      case 'bunbun':
        // BUNBUN THE FLUTE BUNNY
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md" style={{ imageRendering: 'pixelated' }}>
            {/* Bunny Ears */}
            <path d="M22 2h6v18h-6zM36 2h6v18h-6z" fill="#f8fafc" />
            <path d="M24 6h3v12h-3zM37 6h3v12h-3z" fill="#f472b6" />
            {/* Beret Hat */}
            <path d="M18 16h28v6h-28z" fill="#ec4899" />
            <path d="M24 12h16v5h-16z" fill="#f472b6" />
            <circle cx="32" cy="11" r="2" fill="#fbcfe8" />
            {/* Head */}
            <circle cx="32" cy="28" r="14" fill="#ffffff" />
            {/* Cheeks */}
            <circle cx="23" cy="32" r="3" fill="#fbcfe8" opacity="0.8" />
            <circle cx="41" cy="32" r="3" fill="#fbcfe8" opacity="0.8" />
            {/* Eyes based on pose */}
            {pose === 'celebrate' ? (
              // Joyful arches
              <>
                <path d="M23 27q4 -4 8 0" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M33 27q4 -4 8 0" stroke="#1e293b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </>
            ) : pose === 'sad' ? (
              // Teary eyes
              <>
                <circle cx="26" cy="27" r="3" fill="#38bdf8" />
                <circle cx="38" cy="27" r="3" fill="#38bdf8" />
                <path d="M20 28l-3 10M44 28l3 10" stroke="#38bdf8" strokeWidth="2" strokeDasharray="2,2" />
              </>
            ) : pose === 'waiting' ? (
              // Closed content eyes
              <>
                <path d="M24 28q3 2 6 0" stroke="#1e293b" strokeWidth="2" fill="none" />
                <path d="M34 28q3 2 6 0" stroke="#1e293b" strokeWidth="2" fill="none" />
              </>
            ) : (
              // Normal big sparkly eyes
              <>
                <circle cx="27" cy="27" r="3.5" fill="#1e293b" />
                <circle cx="37" cy="27" r="3.5" fill="#1e293b" />
                <circle cx="26" cy="26" r="1.2" fill="#ffffff" />
                <circle cx="36" cy="26" r="1.2" fill="#ffffff" />
              </>
            )}
            {/* Cute Nose and Mouth */}
            <polygon points="32,30 30,32 34,32" fill="#f472b6" />
            {pose === 'sad' ? (
              <path d="M30 36q2 -3 4 0" stroke="#be185d" strokeWidth="1.5" fill="none" />
            ) : (
              <path d="M30 33q2 2 4 0" stroke="#be185d" strokeWidth="1.5" fill="none" />
            )}
            {/* Body */}
            <path d="M22 39h20v16h-20z" fill="#f8fafc" />
            <path d="M25 41h14v12h-14z" fill="#ffffff" />
            {/* Pink Bowtie */}
            <polygon points="28,40 32,42 28,44" fill="#ec4899" />
            <polygon points="36,40 32,42 36,44" fill="#ec4899" />
            <circle cx="32" cy="42" r="1.5" fill="#fbcfe8" />
            {/* Cute Musical Flute */}
            <rect x="36" y="38" width="18" height="3" rx="1.5" transform="rotate(-20 36 38)" fill="#fbbf24" />
            <circle cx="42" cy="34" r="0.8" fill="#78350f" />
            <circle cx="45" cy="33" r="0.8" fill="#78350f" />
            <circle cx="48" cy="32" r="0.8" fill="#78350f" />
            {/* Feet */}
            <ellipse cx="26" cy="56" rx="5" ry="3" fill="#f8fafc" />
            <ellipse cx="38" cy="56" rx="5" ry="3" fill="#f8fafc" />
          </svg>
        );

      case 'bobi':
        // BOBI THE BASS PANDA
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md" style={{ imageRendering: 'pixelated' }}>
            {/* Panda Ears */}
            <circle cx="20" cy="16" r="7" fill="#0f172a" />
            <circle cx="44" cy="16" r="7" fill="#0f172a" />
            {/* Head */}
            <ellipse cx="32" cy="27" rx="15" ry="13" fill="#ffffff" />
            {/* Black Eye Patches */}
            <ellipse cx="24" cy="26" rx="5" ry="4" transform="rotate(-15 24 26)" fill="#0f172a" />
            <ellipse cx="40" cy="26" rx="5" ry="4" transform="rotate(15 40 26)" fill="#0f172a" />
            {/* Eyes */}
            {pose === 'celebrate' ? (
              <>
                <circle cx="24" cy="26" r="2" fill="#38bdf8" />
                <circle cx="40" cy="26" r="2" fill="#38bdf8" />
              </>
            ) : pose === 'sad' ? (
              <>
                <path d="M22 28l4 -4M22 24l4 4" stroke="#94a3b8" strokeWidth="1.5" />
                <path d="M38 28l4 -4M38 24l4 4" stroke="#94a3b8" strokeWidth="1.5" />
              </>
            ) : (
              <>
                <circle cx="24" cy="26" r="2" fill="#ffffff" />
                <circle cx="40" cy="26" r="2" fill="#ffffff" />
              </>
            )}
            {/* Panda Nose & Mouth */}
            <ellipse cx="32" cy="30" rx="2.5" ry="1.8" fill="#0f172a" />
            <path d="M30 33q2 2 4 0" stroke="#0f172a" strokeWidth="1.2" fill="none" />
            {/* Blue Bass Hoodie Body */}
            <path d="M18 38h28v18h-28z" rx="4" fill="#0284c7" />
            <circle cx="32" cy="46" r="4" fill="#38bdf8" />
            {/* Bass Clef symbol on hoodie */}
            <path d="M31 44a2 2 0 1 1 2 2c-1 0 -2 1 -2 2" stroke="#ffffff" strokeWidth="1.5" fill="none" />
            {/* Paws */}
            <circle cx="16" cy="44" r="4.5" fill="#0f172a" />
            <circle cx="48" cy="44" r="4.5" fill="#0f172a" />
            {/* Boba or Drumstick in Hand */}
            {pose === 'waiting' ? (
              <g transform="translate(42, 38)">
                <rect x="0" y="2" width="7" height="11" rx="1.5" fill="#fed7aa" />
                <circle cx="2" cy="10" r="1" fill="#78350f" />
                <circle cx="5" cy="11" r="1" fill="#78350f" />
                <circle cx="3" cy="8" r="1" fill="#78350f" />
                <line x1="3.5" y1="0" x2="3.5" y2="4" stroke="#0284c7" strokeWidth="1.5" />
              </g>
            ) : (
              <line x1="48" y1="44" x2="56" y2="34" stroke="#e2e8f0" strokeWidth="2.5" strokeLinecap="round" />
            )}
            {/* Feet */}
            <ellipse cx="24" cy="57" rx="5" ry="3" fill="#0f172a" />
            <ellipse cx="40" cy="57" rx="5" ry="3" fill="#0f172a" />
          </svg>
        );

      case 'foxy':
        // FOXY THE VIOLIN FOX
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md" style={{ imageRendering: 'pixelated' }}>
            {/* Pointy Fox Ears */}
            <polygon points="17,18 24,4 30,18" fill="#ea580c" />
            <polygon points="20,16 24,8 27,16" fill="#fed7aa" />
            <polygon points="47,18 40,4 34,18" fill="#ea580c" />
            <polygon points="44,16 40,8 37,16" fill="#fed7aa" />
            {/* Head */}
            <circle cx="32" cy="26" r="14" fill="#ea580c" />
            <polygon points="20,26 32,36 44,26" fill="#ffffff" />
            {/* Eyes */}
            {pose === 'celebrate' ? (
              <>
                <path d="M23 23q4 -3 7 0" stroke="#431407" strokeWidth="2" fill="none" />
                <path d="M34 23q4 -3 7 0" stroke="#431407" strokeWidth="2" fill="none" />
              </>
            ) : pose === 'sad' ? (
              <>
                <circle cx="26" cy="24" r="2.5" fill="#38bdf8" />
                <circle cx="38" cy="24" r="2.5" fill="#38bdf8" />
              </>
            ) : (
              <>
                <circle cx="26" cy="23" r="3" fill="#431407" />
                <circle cx="38" cy="23" r="3" fill="#431407" />
                <circle cx="25" cy="22" r="1" fill="#ffffff" />
                <circle cx="37" cy="22" r="1" fill="#ffffff" />
              </>
            )}
            {/* Fox Nose */}
            <circle cx="32" cy="31" r="2" fill="#1c1917" />
            {/* Body */}
            <path d="M22 38h20v17h-20z" fill="#ea580c" />
            <path d="M27 38h10v12h-10z" fill="#ffffff" />
            {/* Golden Treble Clef Ribbon */}
            <circle cx="32" cy="41" r="2.5" fill="#f59e0b" />
            {/* Big Fluffy Tail with White Tip */}
            <path d="M16 42c-8 0 -10 10 -4 14c6 4 10 -4 10 -8z" fill="#ea580c" />
            <path d="M8 50c-2 4 0 6 3 6c2 0 3 -3 2 -5z" fill="#ffffff" />
            {/* Feet */}
            <ellipse cx="26" cy="57" rx="4" ry="2.5" fill="#431407" />
            <ellipse cx="38" cy="57" rx="4" ry="2.5" fill="#431407" />
          </svg>
        );

      case 'pipi':
        // PIPI THE SONG BIRD
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md" style={{ imageRendering: 'pixelated' }}>
            {/* Flower Crown */}
            <circle cx="26" cy="14" r="3" fill="#f43f5e" />
            <circle cx="32" cy="12" r="3" fill="#fbbf24" />
            <circle cx="38" cy="14" r="3" fill="#38bdf8" />
            {/* Round Chubby Bird Body */}
            <circle cx="32" cy="30" r="16" fill="#facc15" />
            <ellipse cx="32" cy="34" rx="10" ry="9" fill="#fef08a" />
            {/* Cute Wings */}
            <ellipse cx="16" cy="32" rx="4" ry="7" transform="rotate(20 16 32)" fill="#eab308" />
            <ellipse cx="48" cy="32" rx="4" ry="7" transform="rotate(-20 48 32)" fill="#eab308" />
            {/* Eyes */}
            {pose === 'celebrate' ? (
              <>
                <path d="M23 27q3 -3 6 0" stroke="#713f12" strokeWidth="2" fill="none" />
                <path d="M35 27q3 -3 6 0" stroke="#713f12" strokeWidth="2" fill="none" />
              </>
            ) : pose === 'sad' ? (
              <>
                <circle cx="26" cy="27" r="2.5" fill="#0284c7" />
                <circle cx="38" cy="27" r="2.5" fill="#0284c7" />
              </>
            ) : (
              <>
                <circle cx="26" cy="27" r="3" fill="#713f12" />
                <circle cx="38" cy="27" r="3" fill="#713f12" />
                <circle cx="25" cy="26" r="1" fill="#ffffff" />
                <circle cx="37" cy="26" r="1" fill="#ffffff" />
              </>
            )}
            {/* Orange Beak */}
            <polygon points="32,29 28,33 36,33" fill="#ea580c" />
            {/* Cheeks */}
            <circle cx="22" cy="32" r="2" fill="#f43f5e" opacity="0.6" />
            <circle cx="42" cy="32" r="2" fill="#f43f5e" opacity="0.6" />
            {/* Cute Tail Feathers */}
            <polygon points="14,38 8,42 15,44" fill="#ca8a04" />
            {/* Tiny Bird Feet */}
            <line x1="28" y1="46" x2="28" y2="55" stroke="#ea580c" strokeWidth="2" />
            <line x1="36" y1="46" x2="36" y2="55" stroke="#ea580c" strokeWidth="2" />
            <line x1="26" y1="55" x2="30" y2="55" stroke="#ea580c" strokeWidth="2" />
            <line x1="34" y1="55" x2="38" y2="55" stroke="#ea580c" strokeWidth="2" />
          </svg>
        );

      case 'kuma':
        // KUMA THE MARACAS BEAR
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md" style={{ imageRendering: 'pixelated' }}>
            {/* Bear Round Ears */}
            <circle cx="18" cy="16" r="7" fill="#92400e" />
            <circle cx="18" cy="16" r="3.5" fill="#fde68a" />
            <circle cx="46" cy="16" r="7" fill="#92400e" />
            <circle cx="46" cy="16" r="3.5" fill="#fde68a" />
            {/* Festive Beanie Hat */}
            <path d="M22 13h20v6h-20z" fill="#059669" />
            <path d="M26 8h12v6h-12z" fill="#10b981" />
            <circle cx="32" cy="7" r="2.5" fill="#fef08a" />
            {/* Head */}
            <circle cx="32" cy="27" r="14" fill="#b45309" />
            {/* Muzzle */}
            <ellipse cx="32" cy="31" rx="6" ry="4.5" fill="#fde68a" />
            <ellipse cx="32" cy="29" rx="2.5" ry="1.8" fill="#451a03" />
            {/* Eyes */}
            {pose === 'celebrate' ? (
              <>
                <path d="M23 24q3 -3 6 0" stroke="#451a03" strokeWidth="2" fill="none" />
                <path d="M35 24q3 -3 6 0" stroke="#451a03" strokeWidth="2" fill="none" />
              </>
            ) : pose === 'sad' ? (
              <>
                <circle cx="26" cy="24" r="2.5" fill="#38bdf8" />
                <circle cx="38" cy="24" r="2.5" fill="#38bdf8" />
              </>
            ) : (
              <>
                <circle cx="26" cy="24" r="2.5" fill="#451a03" />
                <circle cx="38" cy="24" r="2.5" fill="#451a03" />
              </>
            )}
            {/* Body */}
            <rect x="20" y="38" width="24" height="18" rx="4" fill="#92400e" />
            <ellipse cx="32" cy="46" rx="6" ry="6" fill="#fde68a" />
            {/* Maracas in hand */}
            <circle cx="48" cy="38" r="4" fill="#ef4444" />
            <line x1="48" y1="42" x2="48" y2="48" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="16" cy="38" r="4" fill="#3b82f6" />
            <line x1="16" y1="42" x2="16" y2="48" stroke="#f59e0b" strokeWidth="2" />
            {/* Feet */}
            <ellipse cx="25" cy="57" rx="5" ry="3" fill="#78350f" />
            <ellipse cx="39" cy="57" rx="5" ry="3" fill="#78350f" />
          </svg>
        );

      case 'mimi':
      default:
        // MIMI THE RHYTHM CAT (Default)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md" style={{ imageRendering: 'pixelated' }}>
            {/* DJ Headphones Band */}
            <path d="M16 20a16 16 0 0 1 32 0" stroke="#0284c7" strokeWidth="4" fill="none" />
            <rect x="13" y="18" width="5" height="11" rx="2" fill="#0284c7" />
            <rect x="46" y="18" width="5" height="11" rx="2" fill="#0284c7" />
            {/* Cat Ears */}
            <polygon points="18,17 22,5 28,15" fill="#f97316" />
            <polygon points="20,15 22,8 26,14" fill="#fbcfe8" />
            <polygon points="46,17 42,5 36,15" fill="#f97316" />
            <polygon points="44,15 42,8 38,14" fill="#fbcfe8" />
            {/* Cat Head */}
            <circle cx="32" cy="27" r="14" fill="#fb923c" />
            {/* Cheeks */}
            <circle cx="22" cy="31" r="2.5" fill="#f43f5e" opacity="0.6" />
            <circle cx="42" cy="31" r="2.5" fill="#f43f5e" opacity="0.6" />
            {/* Eyes based on pose */}
            {pose === 'celebrate' ? (
              // Star eyes / super happy
              <>
                <text x="22" y="29" fontSize="10" fill="#fef08a" fontWeight="bold">★</text>
                <text x="34" y="29" fontSize="10" fill="#fef08a" fontWeight="bold">★</text>
              </>
            ) : pose === 'sad' ? (
              // Comical anime waterfall tears
              <>
                <circle cx="26" cy="26" r="3" fill="#38bdf8" />
                <circle cx="38" cy="26" r="3" fill="#38bdf8" />
                <path d="M22 26l-4 12M42 26l4 12" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="3,2" />
                <rect x="29" y="32" width="6" height="3" rx="1.5" fill="#ffffff" />
              </>
            ) : pose === 'waiting' ? (
              // Chilling with closed happy eyes
              <>
                <path d="M24 27q3 3 6 0" stroke="#431407" strokeWidth="2" fill="none" />
                <path d="M34 27q3 3 6 0" stroke="#431407" strokeWidth="2" fill="none" />
              </>
            ) : (
              // Big round cat eyes
              <>
                <circle cx="26" cy="26" r="3.5" fill="#1e293b" />
                <circle cx="38" cy="26" r="3.5" fill="#1e293b" />
                <circle cx="25" cy="25" r="1.2" fill="#ffffff" />
                <circle cx="37" cy="25" r="1.2" fill="#ffffff" />
              </>
            )}
            {/* Cute Cat Whiskers */}
            <line x1="17" y1="28" x2="11" y2="27" stroke="#431407" strokeWidth="1.2" />
            <line x1="17" y1="31" x2="11" y2="32" stroke="#431407" strokeWidth="1.2" />
            <line x1="47" y1="28" x2="53" y2="27" stroke="#431407" strokeWidth="1.2" />
            <line x1="47" y1="31" x2="53" y2="32" stroke="#431407" strokeWidth="1.2" />
            {/* Nose & Mouth */}
            <polygon points="32,29 30,31 34,31" fill="#ea580c" />
            <path d="M30 32q2 2 4 0" stroke="#431407" strokeWidth="1.2" fill="none" />
            {/* Cat Body */}
            <rect x="21" y="38" width="22" height="17" rx="4" fill="#fb923c" />
            <ellipse cx="32" cy="46" rx="6" ry="6" fill="#fed7aa" />
            {/* Cute Cat Tail */}
            <path d="M42 48c6 0 10 -6 10 -12c0 -2 -2 -2 -3 0c-1 6 -4 8 -7 9z" fill="#f97316" />
            {/* Feet */}
            <ellipse cx="26" cy="56" rx="4.5" ry="2.5" fill="#ea580c" />
            <ellipse cx="38" cy="56" rx="4.5" ry="2.5" fill="#ea580c" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative inline-flex flex-col items-center justify-center ${sizeClasses}`}>
      {/* Decorative Overlays for Pose */}
      {pose === 'celebrate' && (
        <div className="absolute -top-3 z-20 animate-bounce">
          <span className="text-xl sm:text-2xl filter drop-shadow">👑</span>
        </div>
      )}

      {pose === 'waiting' && (
        <div className="absolute -top-2 right-0 z-20 flex items-center gap-0.5 animate-pulse">
          <span className="text-xs sm:text-sm font-bold text-sky-500">♪</span>
          <span className="text-xs text-pink-400">♫</span>
          <span className="text-[10px] text-amber-500 font-pixel">zZz</span>
        </div>
      )}

      {pose === 'sad' && (
        <div className="absolute -top-2 z-20">
          <span className="text-sm sm:text-base animate-pulse">🩹</span>
        </div>
      )}

      {/* Main Character SVG */}
      <div className={`w-full h-full relative ${getPoseAnimation()}`}>
        {renderCharacterSvg()}
      </div>

      {/* Ground Shadow */}
      {showShadow && (
        <div className="w-3/4 h-2 sm:h-2.5 bg-slate-800/20 rounded-full blur-[1px] -mt-1 -z-10" />
      )}
    </div>
  );
};
