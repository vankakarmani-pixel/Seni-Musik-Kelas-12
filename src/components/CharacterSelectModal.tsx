import React from 'react';
import { MUSIC_CHARACTERS } from '../data/charactersData';
import { CuteCharacter } from './CuteCharacter';
import { sound } from '../utils/audio';
import { Sparkles, X, Check, Music } from 'lucide-react';

interface CharacterSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerId: number;
  playerName: string;
  selectedCharacterId: string;
  onSelectCharacter: (playerId: number, characterId: string) => void;
}

export const CharacterSelectModal: React.FC<CharacterSelectModalProps> = ({
  isOpen,
  onClose,
  playerId,
  playerName,
  selectedCharacterId,
  onSelectCharacter
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-sky-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-gradient-to-b from-sky-50 via-white to-sky-100 border-4 border-sky-400 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-500 px-4 sm:px-6 py-3 text-white flex items-center justify-between border-b-2 border-sky-300 flex-shrink-0 shadow-md">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center border border-white/40">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h2 className="font-pixel text-xs sm:text-sm text-amber-200 tracking-wide">
                PILIH AVATAR MUSISI: {playerName.toUpperCase()}
              </h2>
              <p className="font-sans-clean text-[11px] text-sky-100">
                Pilih teman musisi lucu untuk menemanimu menaklukkan monster!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playSelect();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Character Grid */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {MUSIC_CHARACTERS.map((char) => {
            const isSelected = selectedCharacterId === char.id;

            return (
              <div
                key={char.id}
                onClick={() => {
                  sound.playSelect();
                  onSelectCharacter(playerId, char.id);
                  onClose();
                }}
                className={`group relative p-3.5 rounded-xl border-3 transition-all cursor-pointer flex flex-col items-center text-center justify-between ${
                  isSelected
                    ? 'bg-amber-50/90 border-amber-400 shadow-lg scale-[1.02] ring-2 ring-amber-300'
                    : 'bg-white/80 border-sky-200 hover:border-sky-400 hover:bg-sky-50/70 hover:shadow-md'
                }`}
              >
                {/* Active Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                )}

                {/* Character Sprite Display */}
                <div className="my-1">
                  <CuteCharacter
                    characterId={char.id}
                    pose={isSelected ? 'celebrate' : 'idle'}
                    size="md"
                  />
                </div>

                {/* Info Card */}
                <div className="w-full mt-2">
                  <span className={`inline-block px-2 py-0.5 rounded-full font-pixel text-[9px] mb-1 ${char.badgeBg}`}>
                    {char.species}
                  </span>
                  <h3 className="font-pixel text-xs text-sky-950 font-bold">
                    {char.name}
                  </h3>
                  <p className="font-sans-clean text-[11px] font-semibold text-sky-700 mt-0.5">
                    {char.role}
                  </p>
                  <p className="font-sans-clean text-[10px] text-slate-500 line-clamp-2 mt-1 italic">
                    "{char.tagline}"
                  </p>
                </div>

                {/* Select Button */}
                <button
                  className={`w-full mt-3 py-1.5 rounded-lg font-pixel text-[10px] transition-all ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                      : 'bg-sky-100 group-hover:bg-sky-500 group-hover:text-white text-sky-800'
                  }`}
                >
                  {isSelected ? '✓ TERPILIH' : 'PILIH INI'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 bg-sky-100/80 border-t border-sky-200 text-center font-sans-clean text-xs text-sky-800 flex items-center justify-center gap-2 flex-shrink-0">
          <Music className="w-4 h-4 text-sky-600" />
          <span>Setiap karakter memiliki animasi lucu saat menjawab, menunggu, dan menang!</span>
        </div>
      </div>
    </div>
  );
};
