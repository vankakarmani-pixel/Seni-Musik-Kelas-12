import { PresentationSlide, RegionId } from '../types';

export const REGION_SLIDES: Record<RegionId, PresentationSlide[]> = {
  1: [
    {
      id: 'r1-s1',
      tag: 'SLIDE 1 • PROLOG',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      title: 'Mendefinisikan Ulang Musik',
      subtitle: 'Sains, Seni & Budaya: 3 Sudut Pandang yang Mengubah Cara Kita Mendengar',
      content: {
        type: 'cards',
        cards: [
          {
            badge: 'FISIKA & SAINS',
            title: 'Gelombang Frekuensi',
            desc: 'Getaran periodik udara yang teratur dan dapat diukur dalam satuan Hertz (Hz). Beda dari sekadar "noise" yang berantakan!',
            iconEmoji: '🔬',
            color: 'border-cyan-500/40 bg-cyan-950/40'
          },
          {
            badge: 'SENI & ESTETIKA',
            title: 'Bahasa Emosi Jiwa',
            desc: 'Media ekspresi manusia paling jujur saat kata-kata tak sanggup lagi mewakili perasaan sedih, bahagia, atau jatuh cinta.',
            iconEmoji: '🎨',
            color: 'border-amber-500/40 bg-amber-950/40'
          },
          {
            badge: 'BUDAYA & IDENTITAS',
            title: 'Cermin Peradaban',
            desc: 'Lahir dari titi laras, sistem nilai, dan tradisi leluhur yang diwariskan turun-temurun ke setiap generasi baru.',
            iconEmoji: '🏛️',
            color: 'border-emerald-500/40 bg-emerald-950/40'
          }
        ],
        highlightFact: '💡 Mindblowing Fact: Musik bukan sekadar audio di Spotify, tapi arsitektur gelombang getaran yang langsung menstimulasi hormon dopamin di otak kita!',
        proTip: 'Kuasai sudut pandang ini saat menghadapi soal ujian analitis tentang konsep esensial seni musik.'
      }
    },
    {
      id: 'r1-s2',
      tag: 'SLIDE 2 • 4 PILAR UTAMA',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      title: '4 Fondasi Anatomi Musik (No Skip!)',
      subtitle: 'Setiap lagu favoritmu pasti tersusun dari empat elemen fundamental ini',
      content: {
        type: 'bento',
        cards: [
          {
            badge: 'ELEMEN 1',
            title: 'Irama / Ritme',
            desc: 'Denyut jantung musik! Rangkaian ketukan panjang-pendek, tempo (cepat-lambat), dan birama (pola ayunan 2/4, 3/4, 4/4).',
            iconEmoji: '🥁',
            color: 'border-rose-500/50 bg-rose-950/30'
          },
          {
            badge: 'ELEMEN 2',
            title: 'Melodi',
            desc: 'Rangkaian nada horizontal naik-turun yang punya pitch (frekuensi) teratur. Ini bagian lagu yang paling gampang kamu nyanyikan!',
            iconEmoji: '🎶',
            color: 'border-sky-500/50 bg-sky-950/30'
          },
          {
            badge: 'ELEMEN 3',
            title: 'Harmoni',
            desc: 'Perpaduan dua atau lebih nada yang dibunyikan bersamaan secara vertikal membentuk akor yang selaras dan sedap didengar.',
            iconEmoji: '🎹',
            color: 'border-amber-500/50 bg-amber-950/30'
          },
          {
            badge: 'ELEMEN 4',
            title: 'Ekspresi & Rasa',
            desc: 'Penjiwaan musisi! Terdiri dari Dinamika (keras-lembut), Tempo, Timbre (warna suara unik instrumen), dan Artikulasi penyampaian.',
            iconEmoji: '✨',
            color: 'border-purple-500/50 bg-purple-950/30'
          }
        ],
        proTip: 'Ingat rumus anatomi: Irama = Denyut, Melodi = Kalimat, Harmoni = Pondasi Ruangan, Ekspresi = Jiwa & Karakter!'
      }
    },
    {
      id: 'r1-s3',
      tag: 'SLIDE 3 • CHEAT SHEET UJIAN',
      tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      title: 'Membedah Titi Laras: Diatonik vs Pentatonik',
      subtitle: 'Tabel perbandingan kilat yang wajib kamu hafal sebelum masuk arena pertempuran',
      content: {
        type: 'comparison',
        comparisonData: {
          col1Title: 'DIATONIK (BARAT)',
          col2Title: 'PENTATONIK PELOG',
          col3Title: 'PENTATONIK SLENDRO',
          rows: [
            { label: 'Jumlah Nada', val1: '7 nada pokok (Do-Re-Mi-Fa-Sol-La-Si)', val2: '5 nada primer (Ji-Ro-Lu-Mo-Nem)', val3: '5 nada primer (Ji-Ro-Lu-Mo-Nem)' },
            { label: 'Interval Jarak', val1: 'Pola baku 1 dan 1/2 (Mayor / Minor)', val2: 'Jarak interval tidak sama rata (ada lompatan)', val3: 'Jarak interval hampir sama rata (~240 sen)' },
            { label: 'Nuansa Emosi', val1: 'Universal, fleksibel, ceria/melankolis', val2: 'Khidmat, agung, tenang, sakral, mistis', val3: 'Lincah, ceria, gembira, bersemangat, energik' },
            { label: 'Instrumen Khas', val1: 'Piano, Gitar, Biola, Saxophone', val2: 'Gamelan Jawa/Bali laras Pelog', val3: 'Gamelan Jawa/Bali laras Slendro' }
          ]
        },
        highlightFact: '🔥 Tokoh Sejarah: Notasi balok & solmisasi (Ut-Re-Mi-Fa-Sol-La) dicetuskan oleh biarawan Italia abad ke-11 bernama Guido d’Arezzo!',
        proTip: 'Pelog = Tenang & Agung; Slendro = Ceria & Lincah. Jangan sampai tertukar di soal kuis!'
      }
    },
    {
      id: 'r1-s4',
      tag: 'SLIDE 4 • HARMONI & STRUKTUR',
      tagColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
      title: 'Anatomi Akor & Bahasa Ekspresi',
      subtitle: 'Bagaimana akor dibentuk dan dinamika menghidupkan suasana lagu',
      content: {
        type: 'bento',
        cards: [
          {
            badge: 'TRIAD AKOR',
            title: 'Fondasi 3 Nada',
            desc: 'Root (Nada Dasar) + Terts (Penentu Mayor ceria atau Minor sedih) + Kuint (Penyempurna harmoni akor).',
            iconEmoji: '🎼',
            color: 'border-blue-500/50 bg-blue-950/30'
          },
          {
            badge: 'KADENS MUSIK',
            title: 'Titik Henti Frasa',
            desc: 'Pergerakan akor menuju titik istirahat/resolusi (seperti tanda koma atau tanda titik dalam sebuah kalimat cerita).',
            iconEmoji: '🛑',
            color: 'border-emerald-500/50 bg-emerald-950/30'
          },
          {
            badge: 'DINAMIKA',
            title: 'Keras Lembut Suara',
            desc: 'Pianissimo (sangat lembut) -> Piano -> Mezzo-Forte -> Forte (keras) -> Fortissimo (sangat menggelegar!).',
            iconEmoji: '🔊',
            color: 'border-amber-500/50 bg-amber-950/30'
          },
          {
            badge: 'TIMBRE',
            title: 'Warna Suara Alami',
            desc: 'Karakter getaran akustik unik yang membedakan nada C piano dengan nada C gitar akustik.',
            iconEmoji: '💎',
            color: 'border-rose-500/50 bg-rose-950/30'
          }
        ],
        proTip: 'Akor mayor terasa terang benderang karena jarak terts besarnya (2 nada), sedangkan minor bernada melankolis karena terts kecilnya (1.5 nada)!'
      }
    }
  ],

  2: [
    {
      id: 'r2-s1',
      tag: 'SLIDE 1 • TIMELINE HISTORIS',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      title: 'Jejak Langkah Musik Nusantara',
      subtitle: 'Dari ritual prasejarah, relief Candi Borobudur, dakwah Wali Songo, hingga pop modern',
      content: {
        type: 'cards',
        cards: [
          {
            badge: 'ERA PRA-HINDU',
            title: 'Bunyi Magis Ritual',
            desc: 'Tabuhan genderang perunggu nekara dan mantra vokal digunakan sebagai medium komunikasi spiritual dengan leluhur.',
            iconEmoji: '🗿',
            color: 'border-amber-600/40 bg-amber-950/30'
          },
          {
            badge: 'ABAD KE-8 MASEHI',
            title: 'Relief Borobudur',
            desc: 'Terpahat abadi 40+ jenis alat musik kuno (lute berdawai, suling, kendang) membuktikan tingginya peradaban musikal kita!',
            iconEmoji: '🏛️',
            color: 'border-emerald-600/40 bg-emerald-950/30'
          },
          {
            badge: 'ABAD KE-15 ISLAM',
            title: 'Dakwah Wali Songo',
            desc: 'Sunan Bonang & Sunan Kalijaga menggubah gending gamelan Sekaten di Masjid Demak untuk syiar nilai-nilai kebajikan.',
            iconEmoji: '🕌',
            color: 'border-cyan-600/40 bg-cyan-950/30'
          },
          {
            badge: 'ABAD 16 - MODERN',
            title: 'Akulturasi & Pop',
            desc: 'Masuknya instrumen Eropa (biola, ukulele) melahirkan Keroncong, berlanjut ke revolusi Koes Plus, Dewa 19, dan era digital.',
            iconEmoji: '🎸',
            color: 'border-rose-600/40 bg-rose-950/30'
          }
        ],
        highlightFact: '📌 Borobudur Fact: Relief Karmawibhangga di Borobudur memuat orkestrasi ansambel terlengkap di Asia Tenggara pada abad ke-8!'
      }
    },
    {
      id: 'r2-s2',
      tag: 'SLIDE 2 • AKULTURASI BUDAYA',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      title: 'Fenomena Akulturasi Musik Lokal',
      subtitle: 'Ketika tradisi nusantara melebur selaras dengan musik dunia',
      content: {
        type: 'bento',
        cards: [
          {
            badge: 'GENRE 1',
            title: 'Keroncong & Kampung Tugu',
            desc: 'Lahir dari perpaduan musik Fado pelaut Portugis abad ke-16 dengan cengkok vokal Melayu Batavia di Kampung Tugu.',
            iconEmoji: '🎻',
            color: 'border-amber-500/50 bg-amber-950/30'
          },
          {
            badge: 'GENRE 2',
            title: 'Campursari',
            desc: 'Dipopulerkan Manthous & Didi Kempot. Meleburkan gamelan pentatonik (saron, kendang) dengan keyboard diatonik modern!',
            iconEmoji: '🎹',
            color: 'border-blue-500/50 bg-blue-950/30'
          },
          {
            badge: 'GENRE 3',
            title: 'Dangdut: The People’s Beat',
            desc: 'Evolusi magis Melayu Deli + ketukan Tabla Bollywood India + distorsi gitar Rock barat (Rhoma Irama & Soneta Group).',
            iconEmoji: '🥁',
            color: 'border-rose-500/50 bg-rose-950/30'
          },
          {
            badge: 'GENRE 4',
            title: 'Santiswara & Tanjidor',
            desc: 'Santiswara memadukan rebana Islam dengan laras pelog Jawa; Tanjidor Betawi memadukan terompet tiup Eropa Belanda.',
            iconEmoji: '🎺',
            color: 'border-emerald-500/50 bg-emerald-950/30'
          }
        ],
        proTip: 'Keroncong asli punya formasi 7 alat musik wajib: Cuk, Cak, Cello (dipetik meniru kendang!), Biola, Flute, Gitar, dan Kontrabas!'
      }
    },
    {
      id: 'r2-s3',
      tag: 'SLIDE 3 • MATRIX REGIONAL',
      tagColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      title: 'Harta Karun Musik Tradisi Daerah',
      subtitle: 'Jelajahi keanekaragaman karakter musik dari Sabang sampai Merauke',
      content: {
        type: 'cards',
        cards: [
          {
            badge: 'KUTAI TIMUR',
            title: 'Tingkilan & Gambus',
            desc: 'Ansambel petik gambus Kutai dan ketipung yang mengiringi tradisi berbalas pantun tarian Jepen bernuansa pesisir.',
            iconEmoji: '🌊',
            color: 'border-cyan-500/40 bg-cyan-950/30'
          },
          {
            badge: 'PULAU ROTE NTT',
            title: 'Sasando Resonansi Lontar',
            desc: 'Kecapi tabung bambu dengan belasan dawai yang dipayungi daun lontar melengkung sebagai mangkuk resonansi bunyi.',
            iconEmoji: '🌴',
            color: 'border-emerald-500/40 bg-emerald-950/30'
          },
          {
            badge: 'BETAWI JAKARTA',
            title: 'Gambang Kromong & Tehyan',
            desc: 'Akulturasi harmonis pribumi Betawi dengan komunitas Tionghoa melalui gesekan biola dua dawai batok kelapa (Tehyan).',
            iconEmoji: '🏮',
            color: 'border-rose-500/40 bg-rose-950/30'
          },
          {
            badge: 'DAYAK KALIMANTAN',
            title: 'Sampe / Sape’ Kayu Ulin',
            desc: 'Alat musik petik ukiran khas Dayak berlaras pentatonik yang menghasilkan nada meditatif penyejuk jiwa hutan tropis.',
            iconEmoji: '🍃',
            color: 'border-amber-500/40 bg-amber-950/30'
          }
        ],
        highlightFact: '🌟 Masterpiece Dunia: Angklung Sunda diakui UNESCO berkat inovasi Daeng Soetigna (1938) yang mengubah laras pentatonik menjadi diatonik!'
      }
    }
  ],

  3: [
    {
      id: 'r3-s1',
      tag: 'SLIDE 1 • KONSEP SAINS',
      tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      title: 'Bunyi vs Musik: Apa Bedanya?',
      subtitle: 'Sains akustik di balik getaran yang menyenangkan telinga kita',
      content: {
        type: 'cards',
        cards: [
          {
            badge: 'NOISE / DESIS',
            title: 'Bunyi Non-Periodik',
            desc: 'Gelombang getaran acak yang frekuensinya tidak menentu dan saling bertabrakan (contoh: deru mesin motor, gemuruh ombak).',
            iconEmoji: '📢',
            color: 'border-slate-600 bg-slate-900/50'
          },
          {
            badge: 'PITCH / MUSIK',
            title: 'Getaran Periodik Teratur',
            desc: 'Gelombang sinusoidal teratur yang menghasilkan nada terukur (Do-Re-Mi) dan dirajut dalam pola tempo ritmik yang indah.',
            iconEmoji: '🎵',
            color: 'border-emerald-500/50 bg-emerald-950/30'
          }
        ],
        highlightFact: '💡 Taksonomi Musik: Diciptakan tahun 1914 oleh Curt Sachs & Erich M. von Hornbostel. Mengklasifikasi alat musik murni berdasarkan SUMBER GETARANNYA!'
      }
    },
    {
      id: 'r3-s2',
      tag: 'SLIDE 2 • THE BIG 5 SYSTEM',
      tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      title: '5 Kategori Sachs-Hornbostel',
      subtitle: 'Sistem klasifikasi instrumen ilmiah yang berlaku di seluruh dunia',
      content: {
        type: 'bento',
        cards: [
          {
            badge: '1. IDIOPHONE',
            title: 'Badan Alat Bergetar',
            desc: 'Suara keluar dari getaran materi kaku instrumen itu sendiri tanpa senar/kulit. Contoh: Gong, Kolintang, Angklung, Triangle, Marakas.',
            iconEmoji: '🔔',
            color: 'border-amber-500/50 bg-amber-950/30'
          },
          {
            badge: '2. AEROPHONE',
            title: 'Kolom Udara Ditiup',
            desc: 'Getaran berasal dari udara yang dipampatkan atau ditiup melalui rongga. Contoh: Suling, Saluang, Terompet, Saxophone, Harmonika.',
            iconEmoji: '💨',
            color: 'border-cyan-500/50 bg-cyan-950/30'
          },
          {
            badge: '3. CHORDOPHONE',
            title: 'Dawai / Senar Tegang',
            desc: 'Getaran berasal dari senar yang dipetik, digesek, atau dipukul. Contoh: Gitar, Biola, Sasando, Sampe Dayak, Harpa, dan PIANO!',
            iconEmoji: '🎻',
            color: 'border-purple-500/50 bg-purple-950/30'
          },
          {
            badge: '4. MEMBRANOPHONE',
            title: 'Selaput / Kulit Tegang',
            desc: 'Getaran berasal dari membran elastis (kulit hewan/mylar) yang dipukul. Contoh: Kendang, Tifa Papua, Snare Drum, Marawis, Rebana.',
            iconEmoji: '🥁',
            color: 'border-rose-500/50 bg-rose-950/30'
          },
          {
            badge: '5. ELECTROPHONE',
            title: 'Sinyal Elektronik',
            desc: 'Getaran gelombang dibangkitkan dari sirkuit listrik osilator atau mikroprosesor. Contoh: Synthesizer, Theremin, MIDI Controller.',
            iconEmoji: '⚡',
            color: 'border-blue-500/50 bg-blue-950/30'
          }
        ],
        proTip: '⚠️ Jebakan Soal: PIANO masuk Chordophone karena menghasilkan suara dari palu yang memukul dawai/senar di dalam bodi instrumen!'
      }
    }
  ],

  4: [
    {
      id: 'r4-s1',
      tag: 'SLIDE 1 • PENALAAN & FREKUENSI',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      title: 'Standar Frekuensi Penalaan A = 440 Hz',
      subtitle: 'Konvensi internasional ISO 16 yang menyatukan seluruh musisi di dunia',
      content: {
        type: 'cards',
        cards: [
          {
            badge: 'STANDAR DUNIA',
            title: 'Penalaan Baku A4 = 440 Hz',
            desc: 'Ditetapkan agar nada A pada biola, gitar, dan orkestra di belahan dunia mana pun bergetar tepat di frekuensi yang sama.',
            iconEmoji: '🎯',
            color: 'border-cyan-500/50 bg-cyan-950/30'
          },
          {
            badge: 'TUNER DIGITAL',
            title: 'Visual Jarum Hijau',
            desc: 'Gunakan aplikasi tuner smartphone: jika jarum ke kiri (Flat / terlalu rendah), jika ke kanan (Sharp / ketinggian). Tepat di tengah berwarna hijau!',
            iconEmoji: '📱',
            color: 'border-emerald-500/50 bg-emerald-950/30'
          }
        ],
        highlightFact: '🎸 Anatomi 6 Senar Terbuka Gitar (Open Strings): Senar 6 paling tebal (E rendah) -> Senar 5 (A) -> Senar 4 (D) -> Senar 3 (G) -> Senar 2 (B) -> Senar 1 paling tipis (E tinggi).'
      }
    },
    {
      id: 'r4-s2',
      tag: 'SLIDE 2 • ANATOMI PETIKAN P.I.M.A.',
      tagColor: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
      title: 'Rahasia Petikan Jari: Sistem P.I.M.A.',
      subtitle: 'Kode anatomis klasik asal Spanyol untuk efisiensi petikan jari tangan kanan',
      content: {
        type: 'bento',
        cards: [
          {
            badge: 'P = PULGAR (IBU JARI)',
            title: 'Penjaga Senar Bass',
            desc: 'Bertanggung jawab memetik nada bass rendah pada senar 4 (D), senar 5 (A), dan senar 6 (E rendah) dengan ayunan ke bawah.',
            iconEmoji: '👍',
            color: 'border-amber-500/50 bg-amber-950/30'
          },
          {
            badge: 'I = INDICE (TELUNJUK)',
            title: 'Petik Senar 3 (G)',
            desc: 'Memetik senar 3 ke arah atas (plucking upward) dengan ujung bantalan jari atau kuku melengkung.',
            iconEmoji: '☝️',
            color: 'border-blue-500/50 bg-blue-950/30'
          },
          {
            badge: 'M = MEDIO (JARI TENGAH)',
            title: 'Petik Senar 2 (B)',
            desc: 'Memetik senar 2 menghasilkan melodi mid yang jernih dan konsisten.',
            iconEmoji: '🖕',
            color: 'border-emerald-500/50 bg-emerald-950/30'
          },
          {
            badge: 'A = ANULAR (JARI MANIS)',
            title: 'Petik Senar 1 (E Tinggi)',
            desc: 'Memetik senar 1 paling bawah untuk aksen melodi tinggi atau nada puncak arpeggio.',
            iconEmoji: '🖖',
            color: 'border-rose-500/50 bg-rose-950/30'
          }
        ],
        proTip: 'Aturan Emas Kuku: Tangan Kiri wajib dipotong pendek rata agar menekan fretboard tegak lurus; Tangan Kanan dirawat melengkung rapi untuk petikan akustik renyah!'
      }
    },
    {
      id: 'r4-s3',
      tag: 'SLIDE 3 • ANATOMI TOPOGRAFI CAJON',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      title: 'Cajon: Kotak Ajaib Pengganti Drum Kit',
      subtitle: '3 zona pukulan topografi yang memproduksi bunyi Bass, Mid, dan Slap',
      content: {
        type: 'bento',
        cards: [
          {
            badge: 'ZONA 1 • BASS ("DUG")',
            title: 'Tengah Kotak Atas',
            desc: 'Dipukul di bagian tengah permukaan depan (tapa) menggunakan telapak tangan rileks. Menghasilkan resonansi dentuman bass drum!',
            iconEmoji: '💥',
            color: 'border-rose-500/50 bg-rose-950/30'
          },
          {
            badge: 'ZONA 2 • MID ("TEK")',
            title: '1/3 Bagian Atas',
            desc: 'Dipukul sedikit di bawah sudut atas menggunakan ruas jari. Karakter suara bernada sedang tanpa getaran snare.',
            iconEmoji: '🖐️',
            color: 'border-blue-500/50 bg-blue-950/30'
          },
          {
            badge: 'ZONA 3 • SLAP ("PAK")',
            title: 'Sudut Tepi Atas Tapa',
            desc: 'Dipukul di sudut ujung atas dengan jentikan ujung jari. Menggetarkan kawat snare di balik kayu untuk suara renyah seperti Snare Drum!',
            iconEmoji: '⚡',
            color: 'border-amber-500/50 bg-amber-950/30'
          },
          {
            badge: 'POSTUR DUDUK',
            title: 'Maksimal Condong 20 cm',
            desc: 'Duduk tegak bertumpu pada pinggul di atas cajon. Bungkuk ke depan maksimal 20 cm agar tulang punggung tidak cedera dan ritme tetap stabil.',
            iconEmoji: '🪑',
            color: 'border-emerald-500/50 bg-emerald-950/30'
          }
        ],
        proTip: 'Pola Ritmik B-S-B-B-M-M: Bass (ketukan 1) -> Slap (ketukan 2) -> Bass-Bass (ketukan 3) -> Mid-Mid (ketukan 4) langsung bikin musikmu nge-groove!'
      }
    }
  ]
};
