import { Question, RegionId, RegionInfo } from '../types';
import { REGION_SLIDES } from './slidesData';

export const REGIONS_DATA: RegionInfo[] = [
  {
    id: 1,
    name: 'Lembah Anatomi Musik',
    subtitle: 'Unsur Fundamental, Notasi & Titi Laras',
    badgeColor: 'bg-emerald-600',
    themeColor: 'from-emerald-950 via-slate-900 to-teal-950',
    monsterName: 'Sonovorus',
    monsterTitle: 'Ancient Rhythm Dragon',
    monsterType: 'Dragon / Sonic',
    monsterColor: '#10b981',
    slides: REGION_SLIDES[1],
    summary: {
      title: 'Rangkuman: Lembah Anatomi Musik',
      subtitle: '4 Pilar Fondasi Musik, Sejarah Notasi, & Laras Tradisional',
      keyPoints: [
        'Musik dibentuk oleh 4 Elemen Fundamental: Irama (denyut ketukan teratur), Melodi (rangkaian nada logis berpitch), Harmoni (keselarasan gabungan nada/akor), dan Ekspresi (dinamika keras-lembut & penjiwaan).',
        'Penemu sistem solfeggio (do-re-mi-fa-sol-la-si) dan tangga nada Diatonik adalah Guido d’Arezzo pada abad ke-11.',
        'Metronome Maelzel digunakan untuk mengukur kecepatan tempo dalam satuan BPM (Beats Per Minute).',
        'Tanda birama 3/4 berarti terdapat 3 ketukan dalam setiap bar birama dengan satuan not bernilai seperempat (1/4).',
        'Sistem notasi gamelan di Nusantara dinamakan Titi Laras, terbagi atas dua skala laras pokok: Pelog (do-mi-fa-sol-si) dan Slendro (do-re-mi-sol-la).',
        'Timbre (Warna Suara) adalah karakteristik khas gelombang bunyi yang membedakan satu instrumen dengan instrumen lain meski membunyikan nada dan volume yang sama.',
        'Kadens (Cadence) merupakan rangkaian akor penutup yang menandai akhir dari suatu kalimat atau frase lagu.'
      ],
      tableHeaders: ['Kategori Skala', 'Asal Wilayah', 'Jumlah Nada Pokok', 'Karakter Nada / Contoh'],
      tableRows: [
        ['Diatonik', 'Barat (Eropa)', '7 Nada (do-re-mi-fa-sol-la-si)', 'Mayor (ceria) & Minor (sedih)'],
        ['Pelog', 'Nusantara (Gamelan)', '5 Nada (do-mi-fa-sol-si)', 'Karakter tenang, agung (Gundul Pacul)'],
        ['Slendro', 'Nusantara (Gamelan)', '5 Nada (do-re-mi-sol-la)', 'Karakter lincah, gembira (Lir Ilir)']
      ],
      importantTip: 'Ingat 4 Pilar: Irama = Denyut Waktu, Melodi = Garis Nada, Harmoni = Gabungan Nada (Akor), Ekspresi = Emosi & Dinamika!'
    }
  },
  {
    id: 2,
    name: 'Kota Mosaik Nusantara',
    subtitle: 'Akulturasi Budaya & Alat Musik Daerah',
    badgeColor: 'bg-amber-600',
    themeColor: 'from-amber-950 via-slate-900 to-orange-950',
    monsterName: 'Gamelagont',
    monsterTitle: 'Mystic Bronze Golem',
    monsterType: 'Steel / Folk',
    monsterColor: '#f59e0b',
    slides: REGION_SLIDES[2],
    summary: {
      title: 'Rangkuman: Kota Mosaik Nusantara',
      subtitle: 'Akulturasi Musik, Ragam Instrumen Tradisi, & Tokoh Legendaris',
      keyPoints: [
        'Dangdut adalah hasil perpaduan unik unsur Melayu Deli (1940-an), Film Bollywood India (1950-an), dan Rock Barat (1970-an dipelopori Rhoma Irama).',
        'Keroncong lahir dari akulturasi budaya Nusantara dengan pelaut Portugis abad ke-16 yang membawa musik Fado ke Kampung Tugu, Jakarta.',
        'Tingkilan dari Kutai (Kaltim) memadukan petikan gambus dan ketipung untuk menyampaikan pantun nasihat atau sindiran halus.',
        'Instrumen khas Nusantara: Sasando (NTT - petik daun lontar), Kolintang (Minahasa - bilah kayu pukul), Angklung (Jawa Barat - bambu goyang), Tifa (Papua & Maluku - drum bermuka satu), Saluang (Minangkabau - tiup bambu), Sampe/Sape (Dayak Kaltim - petik kayu bentuk perahu), Talempong (Minang - gong kecil perunggu).',
        'Daeng Soetigna merancang Angklung Diatonik (Angklung Padaeng) pada 1938 agar instrumen bambu dapat melantunkan karya musik internasional.',
        'Campursari menggabungkan ansambel gamelan Jawa dengan instrumen modern seperti keyboard dan gitar elektrik.'
      ],
      tableHeaders: ['Alat Musik', 'Daerah Asal', 'Bahan / Bentuk', 'Cara Memainkan'],
      tableRows: [
        ['Sasando', 'Pulau Rote, NTT', 'Daun lontar & dawai', 'Dipetik'],
        ['Kolintang', 'Minahasa, Sulut', 'Bilah kayu khusus', 'Dipukul dengan mallet'],
        ['Sampe / Sape', 'Dayak, Kalimantan', 'Kayu bentuk perahu', 'Dipetik'],
        ['Tifa', 'Papua & Maluku', 'Kayu & membran kulit hewan', 'Dipukul (perkusi)']
      ],
      importantTip: 'Musik Indonesia bersifat terbuka dan dinamis: terus berevolusi dari ritual purba menuju akulturasi global tanpa kehilangan identitas aslinya!'
    }
  },
  {
    id: 3,
    name: 'Hutan Eksplorasi Bunyi',
    subtitle: 'Klasifikasi Akustik Sachs-Hornbostel',
    badgeColor: 'bg-emerald-500',
    themeColor: 'from-emerald-950 via-slate-900 to-lime-950',
    monsterName: 'Hornbostilion',
    monsterTitle: 'Elemental Sound Chimera',
    monsterType: 'Nature / Acoustic',
    monsterColor: '#10b981',
    slides: REGION_SLIDES[3],
    summary: {
      title: 'Rangkuman: Hutan Eksplorasi Bunyi',
      subtitle: 'Sistem Klasifikasi Sachs-Hornbostel Berdasarkan Sumber Getaran',
      keyPoints: [
        'Semua musik berasal dari bunyi, namun bunyi musik memiliki keteraturan (frekuensi pitch, ritme, dinamika).',
        'Sistem Sachs-Hornbostel membagi instrumen menjadi 5 kelompok utama berdasarkan apa yang bergetar:',
        '1. Idiophone: Sumber bunyi berasal dari badan instrumen itu sendiri yang padat bergetar (Gong, Angklung, Kolintang, Triangle, Castanet, Cymbal).',
        '2. Aerophone: Bunyi dihasilkan dari getaran kolom udara di dalam rongga instrumen (Seruling, Terompet, Saksofon, Pianika, Organ Pipa).',
        '3. Chordophone: Bunyi berasal dari getaran dawai atau senar yang dibentangkan (Gitar, Biola, Harpa, Siter, Kecapi, Piano).',
        '4. Membranophone: Bunyi dihasilkan dari getaran selaput tipis / membran kulit atau plastik (Drum, Kendang, Tifa, Rebana, Conga).',
        '5. Electrophone: Menghasilkan suara dari rangkaian osilator dan sinyal arus listrik elektronik (Synthesizer, Keyboard digital, Drum elektrik, Bass elektrik).'
      ],
      tableHeaders: ['Kategori', 'Sumber Getaran Utama', 'Teknik Bermain', 'Contoh Instrumen'],
      tableRows: [
        ['Idiophone', 'Badan alat itu sendiri', 'Dipukul, digoyang, digesek', 'Gong, Angklung, Simbal, Kolintang'],
        ['Aerophone', 'Udara / tiupan napas', 'Ditiup, dipompa', 'Suling, Saksofon, Pianika, Terompet'],
        ['Chordophone', 'Dawai / senar', 'Dipetik, digesek, ditekan', 'Gitar, Biola, Kecapi, Harpa'],
        ['Membranophone', 'Kulit / membran tipis', 'Dipukul tangan / stik', 'Kendang, Drum, Rebana, Tifa'],
        ['Electrophone', 'Arus listrik / osilator', 'Ditekan tuts, diprogram', 'Synthesizer, Keyboard, Bass elektrik']
      ],
      importantTip: 'Kuncinya: cari bagian fisik apa yang bergetar pertama kali menghasilkan gelombang suara!'
    }
  },
  {
    id: 4,
    name: 'Studio Akustik & Teknik',
    subtitle: 'Standar Penalaan, P.I.M.A. Gitar & Cajon',
    badgeColor: 'bg-rose-600',
    themeColor: 'from-rose-950 via-slate-900 to-indigo-950',
    monsterName: 'Cajonirath',
    monsterTitle: 'Master Studio Behemoth',
    monsterType: 'Percussion / Steel',
    monsterColor: '#f43f5e',
    slides: REGION_SLIDES[4],
    summary: {
      title: 'Rangkuman: Studio Akustik & Teknik Instrumen',
      subtitle: 'Standar Pitch 440 Hz, Petikan P.I.M.A. Gitar & Topografi Cajon',
      keyPoints: [
        'Standar frekuensi penalaan pitch internasional (ISO 16) untuk nada A4 adalah A = 440 Hz.',
        'Sistem petikan gitar Spanyol (PIMA): P = Pulgar (Ibu Jari untuk senar bass 4, 5, 6), I = Indice (Telunjuk untuk senar 3), M = Medio (Jari Tengah untuk senar 2), A = Anular (Jari Manis untuk senar 1).',
        'Teknik petikan Apoyando (Rest Strike): jari memetik senar dan bersandar pada senar di atasnya; Tirando (Free Strike): petikan bebas melayang tanpa bersandar.',
        'Aturan kuku gitar: Kuku tangan kiri wajib pendek rapi agar tidak menghalangi ujung jari saat menekan fret; kuku tangan kanan dianjurkan dipanjangkan sedikit sebagai pick alami.',
        'Cajon (kotak kayu unpitched dari Peru) memiliki 3 zona suara utama:',
        '• Zone 1: Bass Tone (frekuensi rendah "Dug", pukulan membal di tengah wajah cajon, maks 20 cm dari atas).',
        '• Zone 2: Mid / Tap Tone (frekuensi menengah "Tek", pukulan ringan di tepi atas).',
        '• Zone 3: Slap Tone (frekuensi tinggi garing "Pak", tepukan jari terentang di sudut tepi atas menggetarkan kawat snare).',
        'Pernapasan Diafragma adalah teknik terbaik dalam bernyanyi untuk stabilitas napas panjang tanpa membebani leher dan dada.'
      ],
      tableHeaders: ['Simbol PIMA', 'Nama Jari (Spanyol)', 'Tugas Senar Gitar', 'Fungsi Musikal'],
      tableRows: [
        ['P', 'Pulgar (Ibu Jari)', 'Senar 4 (D), 5 (A), 6 (E)', 'Menjaga fondasi Bass'],
        ['I', 'Indice (Telunjuk)', 'Senar 3 (G)', 'Menjaga harmoni tengah'],
        ['M', 'Medio (Jari Tengah)', 'Senar 2 (B)', 'Menjaga harmoni tengah'],
        ['A', 'Anular (Jari Manis)', 'Senar 1 (E tinggi)', 'Menarik melodi nada tertinggi']
      ],
      importantTip: 'Konsistensi tempo lebih penting daripada kecepatan. Biarkan otot tangan mengingat posisi senar (muscle memory)!'
    }
  }
];

export const ALL_QUESTIONS: Question[] = [
  // ==================== REGION 1: LEMBAH ANATOMI MUSIK (15 Questions) ====================
  {
    id: 101,
    regionId: 1,
    questionNumber: 1,
    question: '4 elemen fundamental yang membentuk sebuah karya musik yang utuh adalah...',
    options: [
      { id: 'A', text: 'Irama, Melodi, Harmoni, Ekspresi' },
      { id: 'B', text: 'Nada, Lirik, Suara, Alat' },
      { id: 'C', text: 'Birama, Tempo, Not, Lagu' },
      { id: 'D', text: 'Vokal, Klasik, Pop, Tradisi' }
    ],
    correct: 'A',
    explanation: 'Elemen fundamental musik terdiri dari Irama (ketukan), Melodi (rangkaian nada), Harmoni (gabungan nada), dan Ekspresi (dinamika/penjiwaan).'
  },
  {
    id: 102,
    regionId: 1,
    questionNumber: 2,
    question: 'Tokoh penemu sistem solfeggio / tangga nada Diatonik (do-re-mi) adalah...',
    options: [
      { id: 'A', text: 'Guido d\'Arezzo' },
      { id: 'B', text: 'Jamalus' },
      { id: 'C', text: 'Johann Sebastian Bach' },
      { id: 'D', text: 'Ludwig van Beethoven' }
    ],
    correct: 'A',
    explanation: 'Guido d\'Arezzo memperkenalkan sistem penotasian solfeggio pada abad ke-11.'
  },
  {
    id: 103,
    regionId: 1,
    questionNumber: 3,
    question: 'Denyut teratur yang menjadi landasan dasar durasi waktu dalam musik disebut...',
    options: [
      { id: 'A', text: 'Irama / Ritme' },
      { id: 'B', text: 'Melodi' },
      { id: 'C', text: 'Timbre' },
      { id: 'D', text: 'Akor' }
    ],
    correct: 'A',
    explanation: 'Irama atau ritme adalah pengaturan panjang-pendek dan denyut ketukan dalam musik.'
  },
  {
    id: 104,
    regionId: 1,
    questionNumber: 4,
    question: 'Rangkaian dari sejumlah nada yang diatur berdasarkan tinggi rendah dan durasi secara logis disebut...',
    options: [
      { id: 'A', text: 'Melodi' },
      { id: 'B', text: 'Harmoni' },
      { id: 'C', text: 'Kadens' },
      { id: 'D', text: 'Tekstur' }
    ],
    correct: 'A',
    explanation: 'Melodi merupakan gabungan nada yang membunyikan garis nada utama sebuah lagu.'
  },
  {
    id: 105,
    regionId: 1,
    questionNumber: 5,
    question: 'Bunyi gabungan dua nada atau lebih yang dibunyikan secara bersamaan dan terdengar selaras disebut...',
    options: [
      { id: 'A', text: 'Harmoni / Akor' },
      { id: 'B', text: 'Melodi' },
      { id: 'C', text: 'Tempo' },
      { id: 'D', text: 'Clef' }
    ],
    correct: 'A',
    explanation: 'Harmoni berfokus pada keselarasan gabungan beberapa nada (akor) yang dibunyikan bersama.'
  },
  {
    id: 106,
    regionId: 1,
    questionNumber: 6,
    question: 'Elemen musik yang berkaitan dengan keras-lembutnya suara serta kecepatan penjiwaan lagu adalah...',
    options: [
      { id: 'A', text: 'Ekspresi & Dinamika' },
      { id: 'B', text: 'Birama' },
      { id: 'C', text: 'Tangga Nada' },
      { id: 'D', text: 'Notasi' }
    ],
    correct: 'A',
    explanation: 'Ekspresi mencakup dinamika (keras-lembut) dan tempo (cepat-lambat) untuk menyampaikan emosi.'
  },
  {
    id: 107,
    regionId: 1,
    questionNumber: 7,
    question: 'Tangga nada tradisional Nusantara yang terdiri dari 5 nada pokok disebut...',
    options: [
      { id: 'A', text: 'Pentatonik' },
      { id: 'B', text: 'Diatonik' },
      { id: 'C', text: 'Kromatik' },
      { id: 'D', text: 'Mikrotonal' }
    ],
    correct: 'A',
    explanation: 'Tangga nada Pentatonik menggunakan 5 nada per oktaf, seperti pada musik Gamelan.'
  },
  {
    id: 108,
    regionId: 1,
    questionNumber: 8,
    question: 'Alat yang digunakan untuk mengukur kecepatan tempo dalam hitungan ketukan per menit (BPM) adalah...',
    options: [
      { id: 'A', text: 'Metronome Maelzel' },
      { id: 'B', text: 'Tuner' },
      { id: 'C', text: 'Diapason' },
      { id: 'D', text: 'Sound Level Meter' }
    ],
    correct: 'A',
    explanation: 'Metronome Maelzel digunakan para musisi untuk menjaga konstan kecepatan tempo lagu.'
  },
  {
    id: 109,
    regionId: 1,
    questionNumber: 9,
    question: 'Tanda birama 3/4 berarti dalam satu bar birama terdapat...',
    options: [
      { id: 'A', text: '3 ketukan dengan nilai tiap ketuk nota sekeempat' },
      { id: 'B', text: '4 ketukan bernilai sepertiga' },
      { id: 'C', text: '3 nada tinggi dan 4 nada rendah' },
      { id: 'D', text: '12 ketukan cepat' }
    ],
    correct: 'A',
    explanation: 'Pembilang (3) menunjukkan jumlah ketukan per bar, dan penyebut (4) menunjukkan jenis not sekeempat.'
  },
  {
    id: 110,
    regionId: 1,
    questionNumber: 10,
    question: 'Sistem notasi tradisional yang digunakan untuk mencatat lagu-lagu karawitan/gamelan disebut...',
    options: [
      { id: 'A', text: 'Titi Laras' },
      { id: 'B', text: 'Not Balok' },
      { id: 'C', text: 'Tablatur' },
      { id: 'D', text: 'Solfeggio' }
    ],
    correct: 'A',
    explanation: 'Titi Laras adalah sistem notasi angka tradisional Jawa/Sunda/Bali untuk laras Pelog dan Slendro.'
  },
  {
    id: 111,
    regionId: 1,
    questionNumber: 11,
    question: 'Simbol penunjuk tinggi rendah nada pada garis pranada (seperti Kunci G atau Kunci F) dinamakan...',
    options: [
      { id: 'A', text: 'Clef' },
      { id: 'B', text: 'Barline' },
      { id: 'C', text: 'Rest mark' },
      { id: 'D', text: 'Accidental' }
    ],
    correct: 'A',
    explanation: 'Clef atau Kunci diletakkan di awal garis pranada untuk menentukan acuan tinggi nada.'
  },
  {
    id: 112,
    regionId: 1,
    questionNumber: 12,
    question: 'Jarak pitch atau tinggi-rendah antara dua buah nada disebut...',
    options: [
      { id: 'A', text: 'Interval' },
      { id: 'B', text: 'Birama' },
      { id: 'C', text: 'Amplitudo' },
      { id: 'D', text: 'Otomatisasi' }
    ],
    correct: 'A',
    explanation: 'Interval adalah ukuran jarak frekuensi antara nada satu dengan nada lainnya.'
  },
  {
    id: 113,
    regionId: 1,
    questionNumber: 13,
    question: 'Pengertian dari Warna Suara (Timbre) pada instrumen atau vokal adalah...',
    options: [
      { id: 'A', text: 'Karakteristik khas bunyi yang membedakan satu instrumen dengan instrumen lain' },
      { id: 'B', text: 'Kecepatan lagu dimainkan' },
      { id: 'C', text: 'Tingkat kekerasan suara dalam desibel' },
      { id: 'D', text: 'Jumlah nada dalam satu oktaf' }
    ],
    correct: 'A',
    explanation: 'Timbre membuat suara gitar terdengar beda dengan suara seruling meski memainkan nada yang sama.'
  },
  {
    id: 114,
    regionId: 1,
    questionNumber: 14,
    question: 'Rangkaian akor penutup yang menandai akhir dari suatu frase lagu disebut...',
    options: [
      { id: 'A', text: 'Kadens / Cadence' },
      { id: 'B', text: 'Intro' },
      { id: 'C', text: 'Interlude' },
      { id: 'D', text: 'Reff' }
    ],
    correct: 'A',
    explanation: 'Kadens adalah progresian akor di akhir frase musik yang memberikan kesan selesai atau menggantung.'
  },
  {
    id: 115,
    regionId: 1,
    questionNumber: 15,
    question: 'Istilah latihan menyanyikan nada-nada tangga nada dengan sebutan nama notnya (do-re-mi) adalah...',
    options: [
      { id: 'A', text: 'Solfeggio' },
      { id: 'B', text: 'Vokalisasi' },
      { id: 'C', text: 'Transposisi' },
      { id: 'D', text: 'Harmonisasi' }
    ],
    correct: 'A',
    explanation: 'Solfeggio adalah latihan ketepatan pendengaran dan penyanyian pendengaran pitch nada.'
  },

  // ==================== REGION 2: KOTA MOSAIK NUSANTARA (15 Questions) ====================
  {
    id: 201,
    regionId: 2,
    questionNumber: 1,
    question: 'Genre musik Dangdut lahir dari perpaduan unsur...',
    options: [
      { id: 'A', text: 'Melayu Deli, Film India, dan Rock' },
      { id: 'B', text: 'Portugis, Afrika, dan Jawa' },
      { id: 'C', text: 'Arab, Cina, dan Sunda' },
      { id: 'D', text: 'Pop, Jazz, dan Blues' }
    ],
    correct: 'A',
    explanation: 'Dangdut berakar dari musik Melayu Deli, mendapat pengaruh irama tabla India, dan instrumen elektrik musik Rock.'
  },
  {
    id: 202,
    regionId: 2,
    questionNumber: 2,
    question: 'Alat musik tradisional Tingkilan dari Kutai (Kaltim) memadukan petikan gambus untuk menyampaikan...',
    options: [
      { id: 'A', text: 'Sindiran halus lewat pantun' },
      { id: 'B', text: 'Mantra perang' },
      { id: 'C', text: 'Peringatan bencana' },
      { id: 'D', text: 'Tarian Istana' }
    ],
    correct: 'A',
    explanation: 'Tingkilan dimainkan bersama nyanyian pantun yang berisi nasihat atau sindiran halus masyarakat Kutai.'
  },
  {
    id: 203,
    regionId: 2,
    questionNumber: 3,
    question: 'Musik Keroncong merupakan hasil akulturasi budaya Indonesia dengan bangsa...',
    options: [
      { id: 'A', text: 'Portugis' },
      { id: 'B', text: 'Belanda' },
      { id: 'C', text: 'Inggris' },
      { id: 'D', text: 'Spanyol' }
    ],
    correct: 'A',
    explanation: 'Keroncong berkembang dari musik Fado Portugis yang dibawa oleh para pelaut ke kawasan Tugu, Jakarta.'
  },
  {
    id: 204,
    regionId: 2,
    questionNumber: 4,
    question: 'Alat musik Sasando yang dipetik dan memiliki tabung resonator dari daun lontar berasal dari daerah...',
    options: [
      { id: 'A', text: 'Rote, Nusa Tenggara Timur' },
      { id: 'B', text: 'Minahasa, Sulawesi Utara' },
      { id: 'C', text: 'Sumbawa, NTB' },
      { id: 'D', text: 'Papua' }
    ],
    correct: 'A',
    explanation: 'Sasando adalah instrumen petik khas Pulau Rote, NTT, terbuat dari bambu dan daun lontar.'
  },
  {
    id: 205,
    regionId: 2,
    questionNumber: 5,
    question: 'Musik Kolintang yang terbuat dari kayu ramuan dan dimainkan dengan dipukul berasal dari...',
    options: [
      { id: 'A', text: 'Minahasa, Sulawesi Utara' },
      { id: 'B', text: 'Toraja, Sulawesi Selatan' },
      { id: 'C', text: 'Banjar, Kalimantan Selatan' },
      { id: 'D', text: 'Bali' }
    ],
    correct: 'A',
    explanation: 'Kolintang adalah alat musik perkusi kayu tradisional masyarakat Minahasa, Sulawesi Utara.'
  },
  {
    id: 206,
    regionId: 2,
    questionNumber: 6,
    question: 'Musik instrumen gesek dan tiup tiup khas Betawi yang mendapat pengaruh kuat dari musik korps militer Eropa adalah...',
    options: [
      { id: 'A', text: 'Tanjidor' },
      { id: 'B', text: 'Gambang Kromong' },
      { id: 'C', text: 'Marawis' },
      { id: 'D', text: 'Samrah' }
    ],
    correct: 'A',
    explanation: 'Tanjidor dikembangkan di Betawi menggunakan instrumen tiup besi khas korps musik Eropa.'
  },
  {
    id: 207,
    regionId: 2,
    questionNumber: 7,
    question: 'Tokoh yang merancang dan mempopulerkan instrumen Angklung ber-tangga nada Diatonik (Angklung Padaeng) adalah...',
    options: [
      { id: 'A', text: 'Daeng Soetigna' },
      { id: 'B', text: 'Udjo Ngalagena' },
      { id: 'C', text: 'Ki Nartosabdo' },
      { id: 'D', text: 'Raden Machjar' }
    ],
    correct: 'A',
    explanation: 'Daeng Soetigna menciptakan angklung diatonik pada tahun 1938 agar angklung bisa memainkan lagu-lagu internasional.'
  },
  {
    id: 208,
    regionId: 2,
    questionNumber: 8,
    question: 'Alat musik pukul berupa gendang bermuka satu dari bahan kayu dan kulit hewan khas Papua dan Maluku adalah...',
    options: [
      { id: 'A', text: 'Tifa' },
      { id: 'B', text: 'Kendang' },
      { id: 'C', text: 'Rebana' },
      { id: 'D', text: 'Dogdog' }
    ],
    correct: 'A',
    explanation: 'Tifa merupakan instrumen perkusi utama suku-suku di Papua dan Maluku.'
  },
  {
    id: 209,
    regionId: 2,
    questionNumber: 9,
    question: 'Alat musik tiup berbahan bambu dari Minangkabau yang dimainkan dengan teknik hembusan menyamping tanpa selongsong tiup khusus adalah...',
    options: [
      { id: 'A', text: 'Saluang' },
      { id: 'B', text: 'Suling Sunda' },
      { id: 'C', text: 'Serunai' },
      { id: 'D', text: 'Sumpitan' }
    ],
    correct: 'A',
    explanation: 'Saluang adalah alat musik tiup khas Minangkabau yang dimainkan dengan teknik pernapasan bersambung (penyebutan nada kontinu).'
  },
  {
    id: 210,
    regionId: 2,
    questionNumber: 10,
    question: 'Alat musik petik berbentuk seperti perahu khas suku Dayak Kalimantan disebut...',
    options: [
      { id: 'A', text: 'Sampe / Sape' },
      { id: 'B', text: 'Hasapi' },
      { id: 'C', text: 'Kecapi' },
      { id: 'D', text: 'Gambus' }
    ],
    correct: 'A',
    explanation: 'Sampe atau Sape adalah alat musik petik khas Dayak yang biasa digunakan dalam ritual dan tarian adat.'
  },
  {
    id: 211,
    regionId: 2,
    questionNumber: 11,
    question: 'Musik Campursari di Jawa Tengah dan Jawa Timur dipopulerkan melalui penggabungan instrumen...',
    options: [
      { id: 'A', text: 'Gamelan tradisional dan Instrumen Musik Modern' },
      { id: 'B', text: 'Tanjidor dan Keroncong' },
      { id: 'C', text: 'Angklung dan Sasando' },
      { id: 'D', text: 'Kolintang dan Gambus' }
    ],
    correct: 'A',
    explanation: 'Campursari menggabungkan elemen instrumen gamelan (siter, kendang) dengan alat musik barat (keyboard, gitar).'
  },
  {
    id: 212,
    regionId: 2,
    questionNumber: 12,
    question: 'Musik tradisional perkusi Islam dari Timur Tengah yang berkembang di Melayu menggunakan gendang kecil dinamakan...',
    options: [
      { id: 'A', text: 'Marawis / Rebana' },
      { id: 'B', text: 'Gamelan' },
      { id: 'C', text: 'Kolintang' },
      { id: 'D', text: 'Calung' }
    ],
    correct: 'A',
    explanation: 'Marawis dan Rebana adalah seni musik tepuk tangan/perkusi bernuansa Islami.'
  },
  {
    id: 213,
    regionId: 2,
    questionNumber: 13,
    question: 'Ansambel musik tradisional Jawa, Bali, dan Sunda yang terdiri dari gong, kenong, saron, dan kendang disebut...',
    options: [
      { id: 'A', text: 'Gamelan / Karawitan' },
      { id: 'B', text: 'Tingkilan' },
      { id: 'C', text: 'Arumba' },
      { id: 'D', text: 'Talempong' }
    ],
    correct: 'A',
    explanation: 'Gamelan merupakan ansambel instrumen perunggu/besi tradisional Nusantara.'
  },
  {
    id: 214,
    regionId: 2,
    questionNumber: 14,
    question: 'Talempong adalah alat musik pukul dari logam/perunggu berbentuk gong kecil yang berasal dari daerah...',
    options: [
      { id: 'A', text: 'Minangkabau, Sumatera Barat' },
      { id: 'B', text: 'Palembang, Sumatera Selatan' },
      { id: 'C', text: 'Aceh' },
      { id: 'D', text: 'Riau' }
    ],
    correct: 'A',
    explanation: 'Talempong adalah instrumen bernada khas Minangkabau berbentuk gong kecil (kettledrum).'
  },
  {
    id: 215,
    regionId: 2,
    questionNumber: 15,
    question: 'Fungsi musik tradisional sebagai sarana pengiring tarian ritual adat dinamakan fungsi...',
    options: [
      { id: 'A', text: 'Pengiring Ritual & Upacara' },
      { id: 'B', text: 'Komersial' },
      { id: 'C', text: 'Komunikasi Politik' },
      { id: 'D', text: 'Edukasi Murni' }
    ],
    correct: 'A',
    explanation: 'Banyak musik tradisional Nusantara diciptakan khusus untuk melengkapi prosesi ritual sakral.'
  },

  // ==================== REGION 3: HUTAN EKSPLORASI BUNYI (15 Questions) ====================
  {
    id: 301,
    regionId: 3,
    questionNumber: 1,
    question: 'Alat musik yang sumber bunyinya berasal dari getaran bahan fisik atau badan alat itu sendiri dinamakan...',
    options: [
      { id: 'A', text: 'Idiophone' },
      { id: 'B', text: 'Aerophone' },
      { id: 'C', text: 'Chordophone' },
      { id: 'D', text: 'Membranophone' }
    ],
    correct: 'A',
    explanation: 'Idiophone menghasilkan suara murni dari getaran tubuh instrumen tanpa bantuan dawai atau membran.'
  },
  {
    id: 302,
    regionId: 3,
    questionNumber: 2,
    question: 'Instrumen seruling, terompet, dan saksofon masuk dalam klasifikasi...',
    options: [
      { id: 'A', text: 'Aerophone' },
      { id: 'B', text: 'Electrophone' },
      { id: 'C', text: 'Chordophone' },
      { id: 'D', text: 'Membranophone' }
    ],
    correct: 'A',
    explanation: 'Aerophone menghasilkan bunyi akibat adanya getaran kolom udara di dalam tabung instrumen.'
  },
  {
    id: 303,
    regionId: 3,
    questionNumber: 3,
    question: 'Gitar, biola, kecapi, dan piano tergolong dalam klasifikasi instrumen...',
    options: [
      { id: 'A', text: 'Chordophone' },
      { id: 'B', text: 'Idiophone' },
      { id: 'C', text: 'Aerophone' },
      { id: 'D', text: 'Membranophone' }
    ],
    correct: 'A',
    explanation: 'Chordophone menghasilkan suara dari getaran dawai/senar yang direntangkan.'
  },
  {
    id: 304,
    regionId: 3,
    questionNumber: 4,
    question: 'Alat musik yang menggunakan membran/selaput tipis (kulit/plastik) sebagai sumber getarannya disebut...',
    options: [
      { id: 'A', text: 'Membranophone' },
      { id: 'B', text: 'Idiophone' },
      { id: 'C', text: 'Chordophone' },
      { id: 'D', text: 'Electrophone' }
    ],
    correct: 'A',
    explanation: 'Membranophone memproduksi bunyi saat selaput membran ditabuh (seperti drum, kendang, tifa).'
  },
  {
    id: 305,
    regionId: 3,
    questionNumber: 5,
    question: 'Synthesizer, Keyboard elektronik, dan Drum elektrik dikategorikan sebagai...',
    options: [
      { id: 'A', text: 'Electrophone' },
      { id: 'B', text: 'Aerophone' },
      { id: 'C', text: 'Idiophone' },
      { id: 'D', text: 'Chordophone' }
    ],
    correct: 'A',
    explanation: 'Electrophone membutuhkan rangkaian dan sinyal listrik elektronik untuk menghasilkan gelombang bunyi.'
  },
  {
    id: 306,
    regionId: 3,
    questionNumber: 6,
    question: 'Manakah di bawah ini yang SELURUHNYA merupakan contoh alat musik Idiophone?',
    options: [
      { id: 'A', text: 'Gong, Triangle, Angklung, Castanet' },
      { id: 'B', text: 'Gitar, Biola, Harpa, Bass' },
      { id: 'C', text: 'Suling, Terompet, Clarinet, Pianika' },
      { id: 'D', text: 'Kendang, Drum, Rebana, Tifa' }
    ],
    correct: 'A',
    explanation: 'Gong, triangle, angklung, dan castanet menghasilkan bunyi dari getaran badan alatnya sendiri.'
  },
  {
    id: 307,
    regionId: 3,
    questionNumber: 7,
    question: 'Pianika dimainkan dengan ditiup (udara) dan menekan tuts. Sumber getaran utamanya tergolong sebagai...',
    options: [
      { id: 'A', text: 'Aerophone' },
      { id: 'B', text: 'Electrophone' },
      { id: 'C', text: 'Chordophone' },
      { id: 'D', text: 'Membranophone' }
    ],
    correct: 'A',
    explanation: 'Pianika menghasilkan bunyi dari getaran pita lidah besi yang ditiup oleh aliran udara.'
  },
  {
    id: 308,
    regionId: 3,
    questionNumber: 8,
    question: 'Drum Kit modern menggunakan membran plastik sintetis pada bagian head-nya, sehingga tergolong...',
    options: [
      { id: 'A', text: 'Membranophone' },
      { id: 'B', text: 'Idiophone' },
      { id: 'C', text: 'Aerophone' },
      { id: 'D', text: 'Chordophone' }
    ],
    correct: 'A',
    explanation: 'Drum kit menggunakan membran yang direntangkan pada tabung kayu/besi.'
  },
  {
    id: 309,
    regionId: 3,
    questionNumber: 9,
    question: 'Alat musik Angklung menghasilkan bunyi saat digoyangkan karena benturan tabung bambunya. Hal ini menjadikan Angklung tergolong...',
    options: [
      { id: 'A', text: 'Idiophone' },
      { id: 'B', text: 'Aerophone' },
      { id: 'C', text: 'Chordophone' },
      { id: 'D', text: 'Membranophone' }
    ],
    correct: 'A',
    explanation: 'Benturan pipa bambu Angklung getarannya memancar dari bahan bambu itu sendiri.'
  },
  {
    id: 310,
    regionId: 3,
    questionNumber: 10,
    question: 'Siter dan Harpa dikategorikan sebagai Chordophone karena sumber bunyinya adalah...',
    options: [
      { id: 'A', text: 'Petikan pada rentangan senar/dawai' },
      { id: 'B', text: 'Embusan nafas' },
      { id: 'C', text: 'Membran sintetis' },
      { id: 'D', text: 'Sinyal osilator listrik' }
    ],
    correct: 'A',
    explanation: 'Getaran pada dawai yang dipetik menyalurkan getaran ke papan resonansi.'
  },
  {
    id: 311,
    regionId: 3,
    questionNumber: 11,
    question: 'Mengapa Kendang tradisional digolongkan sebagai Membranophone?',
    options: [
      { id: 'A', text: 'Karena bunyi berasal dari kulit hewan yang direntangkan di ujung tabung' },
      { id: 'B', text: 'Karena terbuat dari kayu jati' },
      { id: 'C', text: 'Karena ditiup dari sisi samping' },
      { id: 'D', text: 'Karena memiliki kabel listrik' }
    ],
    correct: 'A',
    explanation: 'Sumber getaran kendang berasal dari pukulan pada membran kulit.'
  },
  {
    id: 312,
    regionId: 3,
    questionNumber: 12,
    question: 'Alat musik Cymbal (simbal) pada drum menghasilkan bunyi saat dipukul sesamanya. Simbal tergolong...',
    options: [
      { id: 'A', text: 'Idiophone' },
      { id: 'B', text: 'Aerophone' },
      { id: 'C', text: 'Chordophone' },
      { id: 'D', text: 'Electrophone' }
    ],
    correct: 'A',
    explanation: 'Simbal terbuat dari piringan logam tembaga/perunggu murni tanpa dawai maupun membran.'
  },
  {
    id: 313,
    regionId: 3,
    questionNumber: 13,
    question: 'Bagian instrumen gitar akustik yang berfungsi memperkuat getaran dawai agar terdengar nyaring adalah...',
    options: [
      { id: 'A', text: 'Tabung Resonansi / Body' },
      { id: 'B', text: 'Tuning Peg' },
      { id: 'C', text: 'Fretboard' },
      { id: 'D', text: 'Headstock' }
    ],
    correct: 'A',
    explanation: 'Ruang udara di dalam body gitar memperkuat getaran frekuensi dawai.'
  },
  {
    id: 314,
    regionId: 3,
    questionNumber: 14,
    question: 'Bass Elektrik yang harus disambungkan ke Amplifier agar bunyinya terdengar tergolong...',
    options: [
      { id: 'A', text: 'Electrophone' },
      { id: 'B', text: 'Aerophone' },
      { id: 'C', text: 'Idiophone' },
      { id: 'D', text: 'Membranophone' }
    ],
    correct: 'A',
    explanation: 'Walau memiliki senar, bass elektrik mengandalkan pickup magnetic dan sinyal amplifier listrik.'
  },
  {
    id: 315,
    regionId: 3,
    questionNumber: 15,
    question: 'Organ Pipa (Pipe Organ) klasik yang menggunakan semburan udara dari pompa mekanis tergolong...',
    options: [
      { id: 'A', text: 'Aerophone' },
      { id: 'B', text: 'Electrophone' },
      { id: 'C', text: 'Chordophone' },
      { id: 'D', text: 'Idiophone' }
    ],
    correct: 'A',
    explanation: 'Organ pipa mengalirkan angin ke pipa-pipa bernada untuk menghasilkan bunyi.'
  },

  // ==================== REGION 4: STUDIO AKUSTIK & TEKNIK INSTRUMEN (15 Questions) ====================
  {
    id: 401,
    regionId: 4,
    questionNumber: 1,
    question: 'Standar frekuensi penalaan pitch global untuk nada A4 pada musik Barat modern adalah...',
    options: [
      { id: 'A', text: 'A = 440 Hz' },
      { id: 'B', text: 'A = 432 Hz' },
      { id: 'C', text: 'A = 528 Hz' },
      { id: 'D', text: 'A = 415 Hz' }
    ],
    correct: 'A',
    explanation: 'Frekuensi A = 440 Hz disepakati secara internasional (ISO 16) sebagai standar penalaan pitch musik.'
  },
  {
    id: 402,
    regionId: 4,
    questionNumber: 2,
    question: 'Pada sistem petikan gitar PIMA, simbol huruf \'A\' (Anular) merujuk pada penggunaan jari...',
    options: [
      { id: 'A', text: 'Jari Manis' },
      { id: 'B', text: 'Ibu Jari' },
      { id: 'C', text: 'Telunjuk' },
      { id: 'D', text: 'Jari Tengah' }
    ],
    correct: 'A',
    explanation: 'PIMA berasal dari bahasa Spanyol: P (Pulgar/Ibu Jari), I (Indice/Telunjuk), M (Medio/Jari Tengah), dan A (Anular/Jari Manis).'
  },
  {
    id: 403,
    regionId: 4,
    questionNumber: 3,
    question: 'Huruf \'P\' (Pulgar) dalam teknik petikan PIMA bertugas memetik senar gitar bass nomor...',
    options: [
      { id: 'A', text: 'Senar 4, 5, dan 6' },
      { id: 'B', text: 'Senar 1, 2, dan 3' },
      { id: 'C', text: 'Hanya Senar 1' },
      { id: 'D', text: 'Seluruh senar secara bersamaan' }
    ],
    correct: 'A',
    explanation: 'Ibu Jari (Pulgar) umumnya bertugas memetik senar nada bass yaitu senar 4, 5, dan 6.'
  },
  {
    id: 404,
    regionId: 4,
    questionNumber: 4,
    question: 'Huruf \'I\' (Indice) dan \'M\' (Medio) pada teknik PIMA mewakili jari...',
    options: [
      { id: 'A', text: 'Telunjuk dan Jari Tengah' },
      { id: 'B', text: 'Ibu Jari dan Jari Manis' },
      { id: 'C', text: 'Jari Kelingking dan Telunjuk' },
      { id: 'D', text: 'Jari Manis dan Tengah' }
    ],
    correct: 'A',
    explanation: 'Indice adalah jari telunjuk (memetik senar 3) dan Medio adalah jari tengah (memetik senar 2).'
  },
  {
    id: 405,
    regionId: 4,
    questionNumber: 5,
    question: 'Alat musik Cajon dimainkan dengan cara diduduki dan ditepuk permukaannya. Bagian tepukan atas menghasilkan suara...',
    options: [
      { id: 'A', text: 'Slap / Snare' },
      { id: 'B', text: 'Bass berat' },
      { id: 'C', text: 'Hi-hat ritmis' },
      { id: 'D', text: 'Melodi tinggi' }
    ],
    correct: 'A',
    explanation: 'Tepukan pada sudut atas Cajon menggetarkan kawat snare sehingga menghasilkan bunyi Slap/Snare.'
  },
  {
    id: 406,
    regionId: 4,
    questionNumber: 6,
    question: 'Teknik pernapasan paling ideal yang digunakan dalam bernyanyi untuk menopang ketahanan napas adalah...',
    options: [
      { id: 'A', text: 'Pernapasan Diafragma' },
      { id: 'B', text: 'Pernapasan Dada' },
      { id: 'C', text: 'Pernapasan Bahu' },
      { id: 'D', text: 'Pernapasan Hidung saja' }
    ],
    correct: 'A',
    explanation: 'Pernapasan diafragma memungkinkan kontrol udara maksimal tanpa membebani otot leher/dada.'
  },
  {
    id: 407,
    regionId: 4,
    questionNumber: 7,
    question: 'Istilah teknik memainkan nada secara bersambung halus tanpa terputus dinamakan...',
    options: [
      { id: 'A', text: 'Legato' },
      { id: 'B', text: 'Staccato' },
      { id: 'C', text: 'Marcato' },
      { id: 'D', text: 'Glissando' }
    ],
    correct: 'A',
    explanation: 'Legato berarti memainkan nada-nada secara terhubung mulus.'
  },
  {
    id: 408,
    regionId: 4,
    questionNumber: 8,
    question: 'Istilah teknik memainkan nada secara terputus-putus pendek dan tegas dinamakan...',
    options: [
      { id: 'A', text: 'Staccato' },
      { id: 'B', text: 'Legato' },
      { id: 'C', text: 'Sostenuto' },
      { id: 'D', text: 'Crescendo' }
    ],
    correct: 'A',
    explanation: 'Staccato membunyikan not dengan durasi pendek dan terpisah tajam.'
  },
  {
    id: 409,
    regionId: 4,
    questionNumber: 9,
    question: 'Alat pemutar penala kayu/besi pada kepala gitar yang berfungsi mengencangkan/mengendurkan senar dinamakan...',
    options: [
      { id: 'A', text: 'Tuning Pegs / Pemutar Senar' },
      { id: 'B', text: 'Bridge' },
      { id: 'C', text: 'Nut' },
      { id: 'D', text: 'Fret' }
    ],
    correct: 'A',
    explanation: 'Tuning pegs diputar untuk mengubah tegangan senar guna mendapatkan pitch nada yang pas.'
  },
  {
    id: 410,
    regionId: 4,
    questionNumber: 10,
    question: 'Kejelasan pengucapan kata dan huruf vokal (A, I, U, E, O) saat bernyanyi disebut...',
    options: [
      { id: 'A', text: 'Artikulasi' },
      { id: 'B', text: 'Intonasi' },
      { id: 'C', text: 'Phrasering' },
      { id: 'D', text: 'Vibrato' }
    ],
    correct: 'A',
    explanation: 'Artikulasi adalah teknik pemenggalan dan pengucapan kata secara jelas dalam bernyanyi.'
  },
  {
    id: 411,
    regionId: 4,
    questionNumber: 11,
    question: 'Ketepatan membunyikan tinggi-rendah nada (pitch) agar tidak sumbang dinamakan...',
    options: [
      { id: 'A', text: 'Intonasi' },
      { id: 'B', text: 'Artikulasi' },
      { id: 'C', text: 'Ambitus' },
      { id: 'D', text: 'Resonance' }
    ],
    correct: 'A',
    explanation: 'Intonasi adalah kemampuan membunyikan nada secara akurat sesuai frekuensinya.'
  },
  {
    id: 412,
    regionId: 4,
    questionNumber: 12,
    question: 'Garis-garis logam pembatas pada papan leher gitar (fretboard) dinamakan...',
    options: [
      { id: 'A', text: 'Fret' },
      { id: 'B', text: 'Saddle' },
      { id: 'C', text: 'Pickguard' },
      { id: 'D', text: 'Truss Rod' }
    ],
    correct: 'A',
    explanation: 'Fret membagi papan leher gitar menjadi interval setengah nada (semitone).'
  },
  {
    id: 413,
    regionId: 4,
    questionNumber: 13,
    question: 'Teknik petikan gitar \'Apoyando\' berarti memetik senar dengan gerakan...',
    options: [
      { id: 'A', text: 'Bersandar pada senar di atasnya (Rest Strike)' },
      { id: 'B', text: 'Melayang tanpa menyentuh senar lain (Free Strike)' },
      { id: 'C', text: 'Dipukul dengan telapak tangan' },
      { id: 'D', text: 'Ditarik hingga putus' }
    ],
    correct: 'A',
    explanation: 'Apoyando (Rest strike) adalah teknik petikan di mana jari bersandar pada senar berikutnya setelah memetik.'
  },
  {
    id: 414,
    regionId: 4,
    questionNumber: 14,
    question: 'Alat bantu berbentuk klip elektronik yang dipasang di kepala gitar untuk membantu proses penalaan nada secara visual dinamakan...',
    options: [
      { id: 'A', text: 'Digital Clip-on Tuner' },
      { id: 'B', text: 'Capo' },
      { id: 'C', text: 'Metronome' },
      { id: 'D', text: 'Transposer' }
    ],
    correct: 'A',
    explanation: 'Clip-on tuner mengukur getaran frekuensi instrumen dan menampilkannya pada layar LED.'
  },
  {
    id: 415,
    regionId: 4,
    questionNumber: 15,
    question: 'Batas jangkauan wilayah nada terendah hingga tertinggi yang mampu dicapai oleh seorang penyanyi dinamakan...',
    options: [
      { id: 'A', text: 'Ambitus / Range Vokal' },
      { id: 'B', text: 'Timbre' },
      { id: 'C', text: 'Harmoni' },
      { id: 'D', text: 'Registers' }
    ],
    correct: 'A',
    explanation: 'Ambitus adalah rentang nada dari yang paling rendah sampai paling tinggi yang dapat dinyanyikan.'
  }
];

export function getQuestionsForRegion(regionId: RegionId): Question[] {
  return ALL_QUESTIONS.filter(q => q.regionId === regionId);
}
