export interface MaterialSection {
  id: string;
  number: string;
  title: string;
  badge: string;
  icon: string;
  summary: string;
  content: {
    heading: string;
    paragraphs: string[];
    keyPoints?: { term: string; explanation: string; example?: string }[];
    exampleBox?: {
      title: string;
      body: string[];
      analysis: string;
    };
    detectiveTip?: string;
  }[];
}

export const LEARNING_MATERIALS: MaterialSection[] = [
  {
    id: 'definisi-fungsi',
    number: '01',
    title: 'Hakikat & Fungsi Teks Anekdot',
    badge: 'Dasar Penyelidikan',
    icon: 'Search',
    summary: 'Memahami bahwa teks anekdot bukan sekadar lelucon kosong, melainkan senjata kritik halus berbalut humor.',
    content: [
      {
        heading: 'Apa Sebenarnya Teks Anekdot Itu?',
        paragraphs: [
          'Teks anekdot adalah cerita singkat, menarik, dan lucu yang bukan hanya menghibur, melainkan juga bertujuan menyampaikan kritik atau sindiran terhadap fenomena sosial, kebijakan publik, atau perilaku oknum pejabat dan tokoh masyarakat.',
          'Dalam dunia Detektif Bahasa, anekdot diibaratkan sebagai "pesan sandi moral". Penulis tidak menyerang secara frontal, melainkan menggunakan lelucon cerdas agar pembaca tertawa sekaligus menyadari ketidakberesan di sekitarnya.'
        ],
        keyPoints: [
          {
            term: 'Fungsi Hiburan (Rekreasi)',
            explanation: 'Memberikan rasa senang dan senyum melalui kelucuan situasi atau dialog yang tak terduga.'
          },
          {
            term: 'Fungsi Kritik (Edukasi & Kontrol Sosial)',
            explanation: 'Menyampaikan saran, protes, atau kritik cerdas terhadap kebobrokan sosial tanpa terkesan menghujat.'
          },
          {
            term: 'Fungsi Refleksi',
            explanation: 'Mengajak pembaca merenungkan kebenaran moral di balik kelucuan yang tersaji.'
          }
        ],
        detectiveTip: 'Ingat kacamata detektif: Jika ceritanya hanya lucu tanpa ada pesan kritik sosial, itu hanyalah lelucon/humor biasa, bukan TEKS ANEKDOT!'
      },
      {
        heading: 'Perbedaan Anekdot vs Humor Murni',
        paragraphs: [
          'Banyak penyelidik pemula terkecoh antara humor murni dengan teks anekdot. Mari kita amati perbedaannya dengan teliti:'
        ],
        keyPoints: [
          {
            term: 'Teks Anekdot',
            explanation: 'Memiliki sindiran/kritik sosial terhadap isu nyata atau tokoh publik. Bertujuan membuka kesadaran moral.'
          },
          {
            term: 'Humor / Lelucon Biasa',
            explanation: 'Murni menggelitik tanpa pesan kritik atau perbaikan sosial, biasanya fiksi semata.'
          }
        ],
        exampleBox: {
          title: 'Contoh Kasus Klasik: Rompi Termahal di Indonesia',
          body: [
            'Dua anak muda sedang berbincang di kafe mengenai tren pakaian bermerek.',
            'Anak muda A: "Menurutmu, pakaian apa yang paling mahal di Indonesia saat ini? Guci atau Balenciaga?"',
            'Anak muda B: "Bukan keduanya kawan. Yang paling mahal adalah Rompi Oranye tahanan KPK!"',
            'Anak muda A heran: "Lho, kok bisa rompi oranye?"',
            'Anak muda B tersenyum masam: "Coba pikirkan, untuk bisa memakai rompi itu, seseorang harus mencuri uang rakyat miliaran rupiah dulu!"'
          ],
          analysis: 'Cerita di atas adalah anekdot karena mengkritik perilaku koruptor dengan analogi ironis rompi tahanan berharga miliaran.'
        }
      }
    ]
  },
  {
    id: 'struktur-teks',
    number: '02',
    title: '5 Struktur Wajib Teks Anekdot',
    badge: 'Anatomi Kasus',
    icon: 'Layers',
    summary: 'Mengenal formula 5 tahap penyusunan anekdot dari Abstraksi hingga Koda.',
    content: [
      {
        heading: 'Formula Anatomi 5 Bagian',
        paragraphs: [
          'Setiap teks anekdot standar memiliki lima bagian struktur yang berurutan secara logis:'
        ],
        keyPoints: [
          {
            term: '1. Abstraksi',
            explanation: 'Bagian awal pembuka paragraf yang memberikan gambaran umum tentang suasana atau situasi cerita.'
          },
          {
            term: '2. Orientasi',
            explanation: 'Bagian yang mengenalkan tokoh, latar waktu, dan latar tempat yang memicu dimulainya konflik.'
          },
          {
            term: '3. Krisis (Puncak Masalah)',
            explanation: 'Bagian inti masalah keganjilan, kejanggalan, atau kejadian unik yang menjadi pokok cerita.'
          },
          {
            term: '4. Reaksi',
            explanation: 'Tanggapan, penyelesaian, atau respons tak terduga tokoh terhadap krisis yang menimbulkan kelucuan.'
          },
          {
            term: '5. Koda (Penutup)',
            explanation: 'Bagian akhir atau simpulan cerita sebagai penutup (bisa berisi komentar atau perubahan situasi).'
          }
        ],
        detectiveTip: 'Krisis dan Reaksi adalah jantung dari teka-teki anekdot! Tanpa krisis yang menggelitik dan reaksi tak terduga, anekdot kehilangan daya ledaknya.'
      }
    ]
  },
  {
    id: 'kaidah-kebahasaan',
    number: '03',
    title: 'Kaidah Kebahasaan Detektif',
    badge: 'Jejak Bahasa',
    icon: 'Code',
    summary: 'Mengidentifikasi jejak konjungsi temporal, pertanyaan retoris, kata kerja aksi, dan jenis sindiran.',
    content: [
      {
        heading: 'Senjata Kebahasaan Teks Anekdot',
        paragraphs: [
          'Teks anekdot memiliki ciri kebahasaan khusus yang harus dianalisis oleh setiap detektif bahasa:'
        ],
        keyPoints: [
          {
            term: 'Konjungsi Temporal / Urutan Waktu',
            explanation: 'Kata hubung waktu seperti: lalu, kemudian, setelah itu, pada suatu hari, akhirnya.'
          },
          {
            term: 'Pertanyaan Retoris',
            explanation: 'Pertanyaan yang tidak membutuhkan jawaban langsung karena jawabannya sudah jelas, digunakan untuk menyindir atau menggugah kesadaran. Contoh: "Apakah kursi rapat itu memang empuk hingga membuat tertidur lelap?"'
          },
          {
            term: 'Kata Kerja Aksi (Action Verbs)',
            explanation: 'Kata kerja yang menggambarkan tindakan fisik yang dilakukan tokoh: menulis, melompat, menyuap, mengangguk, menandatangani.'
          },
          {
            term: 'Kalimat Seru & Dialog Langsung',
            explanation: 'Penggunaan tanda seru untuk menyatakan keheranan, kemarahan, atau keterkejutan: "Wah, luar biasa sekali anggaran ini!"'
          },
          {
            term: 'Gaya Bahasa Sindiran (Ironi, Sinisme, Sarkasme)',
            explanation: 'Penyampaian sindiran secara halus (ironi: memuji sebaliknya) atau tajam (sinisme: meragukan niat).'
          }
        ]
      }
    ]
  },
  {
    id: 'panduan-karya',
    number: '04',
    title: 'Panduan Menulis di Studio Karya',
    badge: 'Protokol Kreasi',
    icon: 'PenTool',
    summary: 'Langkah taktis menyusun teks anekdot orisinal bertema fenomena sosial masa kini.',
    content: [
      {
        heading: 'Langkah Detektif Menulis Anekdot',
        paragraphs: [
          'Untuk menciptakan karya anekdot yang tajam namun tetap santun dan bernilai estetis, ikuti 4 langkah taktis ini:',
          '1. Tentukan fenomena/isu yang ingin dikritik (misal: antrean loket, kecanduan ponsel pintar, jalan berlubang yang lambat diperbaiki).',
          '2. Tentukan tokoh dan latar yang relevan dengan situasi tersebut.',
          '3. Rancang keganjilan (Krisis) dan jawaban tak terduga (Reaksi) yang memicu tawa kritis.',
          '4. Terapkan konjungsi temporal dan pertanyaan retoris untuk memperkuat nuansa anekdot.'
        ]
      }
    ]
  }
];
