import { MusicCharacter } from '../types';

export const MUSIC_CHARACTERS: MusicCharacter[] = [
  {
    id: 'mimi',
    name: 'Mimi Si Kucing Ritme',
    species: 'Kucing DJ',
    tagline: 'Beat drop adalah nafasku!',
    role: 'Pakar Ketukan & Tempo',
    personality: 'Ceria, enerjik, dan suka melompat sesuai irama musik 4/4.',
    avatarColor: 'text-amber-500',
    badgeBg: 'bg-amber-400 text-slate-900',
    quoteWin: 'Nyahaha! Irama musik kita terlalu cepat dan keren untuk dikalahkan!',
    quoteLose: 'Hiks.. ketukanku meleset sedikit tadi! Tapi tenang, kucing punya 9 nyawa untuk belajar!'
  },
  {
    id: 'bunbun',
    name: 'Bunbun Si Kelinci Flute',
    species: 'Kelinci Virtuoso',
    tagline: 'Melodi tinggi selembut awan.',
    role: 'Pakar Melodi & Tangga Nada',
    personality: 'Pemalu tapi sangat teliti membedakan nada Diatonik dan Pentatonik.',
    avatarColor: 'text-pink-500',
    badgeBg: 'bg-pink-400 text-slate-900',
    quoteWin: 'Yay! Tiupan nada recorder-ku menembus langit sampai monster pun terpesona!',
    quoteLose: 'Uuu.. nada solfeggio-ku agak fals barusan. Ayo latihan tangga nada lagi sama Bunbun!'
  },
  {
    id: 'bobi',
    name: 'Bobi Si Panda Bass',
    species: 'Panda Perkusi',
    tagline: 'Santai tapi gebukan bass-nya nendang!',
    role: 'Pakar Harmoni & Akor Dasar',
    personality: 'Gembul menggemaskan yang hobi minum boba sambil memukul ritme cajon.',
    avatarColor: 'text-cyan-500',
    badgeBg: 'bg-cyan-400 text-slate-900',
    quoteWin: 'Groovy banget! Kekuatan frekuensi rendah kita bikin arena berguncang!',
    quoteLose: 'Aduhh.. Bobi kebanyakan makan boba sampai ngantuk. Yuk rebahan sebentar terus kita balas!'
  },
  {
    id: 'foxy',
    name: 'Foxy Si Rubah Biola',
    species: 'Rubah Maestro',
    tagline: 'Gesekan dawai penuh pesona.',
    role: 'Pakar Chordophone & Sachs-Hornbostel',
    personality: 'Cerdas dan elegan, selalu bawa busur biola bertabur bintang.',
    avatarColor: 'text-orange-500',
    badgeBg: 'bg-orange-400 text-slate-900',
    quoteWin: 'Simfoni kemenangan yang sempurna! Teori musik adalah senjataku yang paling ampuh!',
    quoteLose: 'Waduh, senar biolaku agak longgar! Jangan sedih, komposer hebat pun pernah salah nada!'
  },
  {
    id: 'pipi',
    name: 'Pipi Si Pipit Sopran',
    species: 'Burung Kicau',
    tagline: 'Vokal jernih 440 Hertz!',
    role: 'Pakar Pitch & Akustik Suara',
    personality: 'Mungil bermahkota bunga, mampu menyanyikan nada A4 standar pitch dengan tepat.',
    avatarColor: 'text-emerald-500',
    badgeBg: 'bg-emerald-400 text-slate-900',
    quoteWin: 'Cuit-cuit! Harmoni kita melesat tinggi melampaui puncak awan!',
    quoteLose: 'Chirp! Nafasku agak ngos-ngosan tadi. Tarik nafas diafragma dulu, lalu kita serang lagi!'
  },
  {
    id: 'kuma',
    name: 'Kuma Si Beruang Marakas',
    species: 'Beruang Ritmik',
    tagline: 'Goyang marakas hilangkan galau!',
    role: 'Pakar Idiophone & Alat Nusantara',
    personality: 'Hangat, suka memeluk, dan gemar menari jaipong sambil menggoyangkan instrumen.',
    avatarColor: 'text-indigo-500',
    badgeBg: 'bg-indigo-400 text-slate-900',
    quoteWin: 'Horeee! Tabuhan ritme kita sukses menaklukkan monster legendaris!',
    quoteLose: 'Huwaaa.. marakasku copot! Tapi Kuma gak bakal menyerah. Musik itu tentang bersenang-senang!'
  }
];

export const getCharacterById = (id: string): MusicCharacter => {
  return MUSIC_CHARACTERS.find((c) => c.id === id) || MUSIC_CHARACTERS[0];
};
