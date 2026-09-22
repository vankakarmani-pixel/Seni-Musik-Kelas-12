import React from 'react';
import { RegionId } from '../types';

interface PixelMonsterProps {
  regionId: RegionId;
  isDamaged?: boolean;
  isBuffed?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'giant';
}

export const PixelMonster: React.FC<PixelMonsterProps> = ({
  regionId,
  isDamaged,
  isBuffed = false,
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-20 h-20 sm:w-24 sm:h-24',
    md: 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44',
    lg: 'w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56',
    xl: 'w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64',
    giant: 'w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 scale-110'
  }[size];

  // Pixel SVG renderers for each region monster
  const renderMonsterSvg = () => {
    switch (regionId) {
      case 1:
        // Sonovorus (Emerald / Cyan Musical Rhythm Dragon)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-xl" style={{ imageRendering: 'pixelated' }}>
            {/* Horns & Clef Crown */}
            <path d="M26 4h4v6h-4zM34 4h4v6h-4zM24 8h4v4h-4zM36 8h4v4h-4z" fill="#34d399" />
            <path d="M28 2h8v4h-8z" fill="#a7f3d0" />
            {/* Head */}
            <path d="M22 12h20v14h-20z" fill="#059669" />
            <path d="M24 14h16v10h-16z" fill="#10b981" />
            {/* Piercing Red Dragon Eyes */}
            <path d="M24 16h4v4h-4zM36 16h4v4h-4z" fill="#ef4444" />
            <path d="M26 17h2v2h-2zM38 17h2v2h-2z" fill="#ffffff" />
            {/* Musical Soundwave Fangs */}
            <path d="M26 22h3v4h-3zM35 22h3v4h-3z" fill="#ffffff" />
            {/* Body */}
            <path d="M18 26h28v20h-28z" fill="#047857" />
            <path d="M22 28h20v16h-20z" fill="#10b981" />
            {/* Soundwave Bars on Chest */}
            <path d="M26 30h12v2h-12zM28 34h8v2h-8zM30 38h4v2h-4z" fill="#6ee7b7" />
            {/* Wings / Sonic Fins */}
            <path d="M8 22h10v14h-10zM46 22h10v14h-10z" fill="#059669" />
            <path d="M10 24h6v10h-6zM48 24h6v10h-6z" fill="#34d399" />
            <path d="M4 18h6v8h-6zM54 18h6v8h-6z" fill="#a7f3d0" />
            {/* Claws & Tail */}
            <path d="M16 46h10v8h-10zM38 46h10v8h-10z" fill="#065f46" />
            <path d="M14 52h4v4h-4zM24 52h4v4h-4zM36 52h4v4h-4zM46 52h4v4h-4z" fill="#ffffff" />
            {/* Treble Clef Tail Tip */}
            <path d="M48 44h8v6h-8zM54 38h4v8h-4zM50 36h6v4h-6z" fill="#34d399" />
          </svg>
        );

      case 2:
        // Gamelagont (Bronze Gamelan Armor Beast / Garuda Chimera)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-xl" style={{ imageRendering: 'pixelated' }}>
            {/* Bronze Crown with Gong Boss */}
            <path d="M24 4h16v6h-16zM28 2h8v4h-8z" fill="#d97706" />
            <path d="M30 6h4v4h-4z" fill="#fef08a" />
            {/* Head */}
            <path d="M20 10h24v16h-24z" fill="#b45309" />
            <path d="M22 12h20v12h-20z" fill="#d97706" />
            {/* Fierce Amber Eyes */}
            <path d="M24 16h5v4h-5zM35 16h5v4h-5z" fill="#451a03" />
            <path d="M26 17h2v2h-2zM37 17h2v2h-2z" fill="#fbbf24" />
            {/* Beak / Mask */}
            <path d="M28 22h8v6h-8zM30 26h4v4h-4z" fill="#f59e0b" />
            {/* Heavy Gong Shield Body */}
            <path d="M16 26h32v22h-32z" fill="#78350f" />
            <path d="M20 28h24v18h-24z" fill="#b45309" />
            {/* Central Gong Resonator on Chest */}
            <circle cx="32" cy="37" r="7" fill="#f59e0b" />
            <circle cx="32" cy="37" r="4" fill="#fbbf24" />
            <circle cx="32" cy="37" r="2" fill="#451a03" />
            {/* Bronze Wing Plates */}
            <path d="M8 24h8v16h-8zM48 24h8v16h-8z" fill="#d97706" />
            <path d="M4 28h6v14h-6zM54 28h6v14h-6z" fill="#f59e0b" />
            <path d="M2 34h4v10h-4zM58 34h4v10h-4z" fill="#fde68a" />
            {/* Sturdy Stomp Feet */}
            <path d="M18 48h10v10h-10zM36 48h10v10h-10z" fill="#451a03" />
            <path d="M16 56h4v4h-4zM38 56h4v4h-4z" fill="#d97706" />
          </svg>
        );

      case 3:
        // Hornbostilion (Forest Acoustic Sound Chimera - Sachs-Hornbostel)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-xl" style={{ imageRendering: 'pixelated' }}>
            {/* Aerophone Horn Antennae */}
            <path d="M18 4h8v4h-8zM14 6h6v4h-6zM10 8h6v4h-6z" fill="#65a30d" />
            <path d="M38 4h8v4h-8zM44 6h6v4h-6zM48 8h6v4h-6z" fill="#65a30d" />
            {/* Head */}
            <path d="M20 12h24v14h-24z" fill="#3f6212" />
            <path d="M22 14h20v10h-20z" fill="#4d7c0f" />
            {/* Luminous Nature Eyes */}
            <path d="M24 16h5v4h-5zM35 16h5v4h-5z" fill="#a3e635" />
            <path d="M26 17h2v2h-2zM37 17h2v2h-2z" fill="#ffffff" />
            {/* Membranophone Belly Shell */}
            <path d="M16 26h32v22h-32z" fill="#14532d" />
            <path d="M20 28h24v18h-24z" fill="#166534" />
            {/* Drum Rim & Cord Lacing */}
            <path d="M20 28h24v3h-24z" fill="#84cc16" />
            <path d="M22 31l4 12h2l-4-12zM32 31l4 12h2l-4-12zM40 31l-4 12h-2l4-12z" fill="#bef264" />
            {/* Chordophone String Wings */}
            <path d="M6 24h10v18h-10zM48 24h10v18h-10z" fill="#15803d" />
            <path d="M8 26h2v14h-2zM12 28h2v10h-2zM50 28h2v10h-2zM54 26h2v14h-2z" fill="#fef08a" />
            {/* Idiophone Resonant Claws */}
            <path d="M18 48h10v8h-10zM36 48h10v8h-10z" fill="#365314" />
            <path d="M14 54h6v4h-6zM34 54h6v4h-6z" fill="#a3e635" />
          </svg>
        );

      case 4:
        // Cajonirath (Studio Akustik Fret Wyvern & Cajon Sentinel)
        return (
          <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-xl" style={{ imageRendering: 'pixelated' }}>
            {/* Guitar Headstock Horns & Tuning Pegs */}
            <path d="M26 2h12v8h-12z" fill="#991b1b" />
            <path d="M22 4h4v4h-4zM38 4h4v4h-4z" fill="#e2e8f0" />
            <path d="M22 8h4v4h-4zM38 8h4v4h-4z" fill="#e2e8f0" />
            {/* Head with Fretboard Crown */}
            <path d="M22 10h20v14h-20z" fill="#b91c1c" />
            <path d="M24 12h16v10h-16z" fill="#dc2626" />
            {/* Silver Frets across Face */}
            <path d="M24 14h16v1h-16zM24 18h16v1h-16zM24 21h16v1h-16z" fill="#94a3b8" />
            {/* Electric Studio Eyes */}
            <path d="M25 15h4v3h-4zM35 15h4v3h-4z" fill="#38bdf8" />
            {/* Cajon Box Torso */}
            <path d="M16 24h32v24h-32z" fill="#7f1d1d" />
            <path d="M18 26h28v20h-28z" fill="#991b1b" />
            {/* Cajon Soundhole & Bass Target */}
            <circle cx="32" cy="36" r="7" fill="#450a0a" />
            <circle cx="32" cy="36" r="4" fill="#ef4444" />
            {/* Slap Zone Top Corners */}
            <path d="M19 27h6v4h-6zM39 27h6v4h-6z" fill="#fca5a5" />
            {/* Acoustic Pick Wings */}
            <path d="M8 26h8v16h-8zM48 26h8v16h-8z" fill="#dc2626" />
            <path d="M4 30h6v12h-6zM54 30h6v12h-6z" fill="#f87171" />
            {/* Steel P.I.M.A. Claws */}
            <path d="M18 48h10v8h-10zM36 48h10v8h-10z" fill="#450a0a" />
            <path d="M16 54h3v5h-3zM22 54h3v5h-3zM37 54h3v5h-3zM43 54h3v5h-3z" fill="#e2e8f0" />
          </svg>
        );
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${sizeClasses} ${
        isDamaged
          ? 'animate-damage'
          : isBuffed
          ? 'animate-pulse drop-shadow-[0_0_25px_rgba(239,68,68,0.9)]'
          : 'animate-monster-bob'
      }`}
    >
      {/* Fiery buff aura overlay */}
      {isBuffed && (
        <>
          <div className="absolute -inset-4 bg-gradient-to-t from-red-600/40 via-orange-500/30 to-amber-400/20 rounded-full blur-md animate-ping -z-10" />
          <div className="absolute -top-6 px-2.5 py-0.5 rounded-full bg-red-600 text-white font-pixel text-[9px] border-2 border-amber-300 shadow-lg tracking-wider animate-bounce z-20">
            🔥 BUFFED LV.99!
          </div>
        </>
      )}
      {renderMonsterSvg()}
    </div>
  );
};

export const RetroTrainer: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-20 h-20 sm:w-28 sm:h-28';
  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses} animate-trainer-bounce`}>
      <svg viewBox="0 0 64 64" className="w-full h-full drop-shadow-md" style={{ imageRendering: 'pixelated' }}>
        {/* Retro Red & White Cap */}
        <path d="M22 8h20v8h-20z" fill="#ef4444" />
        <path d="M26 6h12v4h-12z" fill="#ffffff" />
        <path d="M20 14h24v4h-24z" fill="#1e293b" />
        {/* Back Hair */}
        <path d="M20 18h24v6h-24z" fill="#334155" />
        {/* Blue Jacket */}
        <path d="M18 24h28v18h-28z" fill="#2563eb" />
        <path d="M26 24h12v18h-12z" fill="#ffffff" />
        {/* Backpack */}
        <path d="M24 28h16v12h-16z" fill="#10b981" />
        <path d="M22 30h4v8h-4zM38 30h4v8h-4z" fill="#f59e0b" />
        {/* Jeans / Belt */}
        <path d="M20 42h24v4h-24z" fill="#0f172a" />
        <path d="M20 46h11v12h-11zM33 46h11v12h-11z" fill="#1e3a8a" />
        {/* Red Sneakers */}
        <path d="M18 56h12v4h-12zM34 56h12v4h-12z" fill="#dc2626" />
        <path d="M18 59h12v2h-12zM34 59h12v2h-12z" fill="#f8fafc" />
      </svg>
    </div>
  );
};
