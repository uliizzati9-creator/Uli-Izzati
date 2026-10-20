import { InvestigationCase } from '../types';

export const INVESTIGATION_CASES: InvestigationCase[] = [
  {
    id: 'kasus-1',
    caseNumber: 1,
    codeName: 'BERKAS-STRUKTUR-01',
    title: 'Misteri Berkas yang Tercecer',
    subtitle: 'Mendiagnosis Anatomi Struktur Teks Anekdot',
    badge: 'Struktur Teks',
    targetCompetency: 'Menganalisis 5 struktur teks anekdot (Abstraksi, Orientasi, Krisis, Reaksi, Koda)',
    description: 'Sebuah berkas laporan rahasia terpecah menjadi beberapa bagian di meja redaksi. Detektif harus mengidentifikasi bagian mana yang berfungsi sebagai orientasi, krisis, reaksi, dan koda.',
    maxPoints: 40,
    questions: [
      {
        id: 'k1-q1',
        title: 'Tantangan 1.1: Menemukan Titik Krisis',
        scenario: 'Perhatikan penggalan anekdot berikut:\n"Seorang dosen fakultas hukum sedang mengajar. Ia bertanya kepada mahasiswa: \'Mengapa kursi anggota parlemen dibuat begitu empuk dan nyaman?\' Mahasiswa menjawab: \'Agar mereka tidak mudah lelah ketika berdebat, Pak!\' Dosen tersenyum lalu berbisik: \'Bukan itu alasannya. Supaya mereka tidak bangun saat tertidur lelap sewaktu rapat.\'"',
        type: 'multiple_choice',
        points: 10,
        clue: 'Krisis adalah puncak keganjilan atau keunikan masalah yang menjadi sumber kelucuan utama.',
        options: [
          {
            id: 'k1-q1-a',
            text: 'Dosen fakultas hukum sedang mengajar di kelas',
            isCorrect: false,
            explanation: 'Ini adalah bagian Abstraksi dan Orientasi yang mengenalkan latar dan tokoh.'
          },
          {
            id: 'k1-q1-b',
            text: 'Dosen bertanya mengapa kursi anggota parlemen dibuat empuk',
            isCorrect: false,
            explanation: 'Ini adalah pemicu orientasi masalah, belum mencapai puncak kejanggalan.'
          },
          {
            id: 'k1-q1-c',
            text: 'Dosen berbisik: "Supaya mereka tidak bangun saat tertidur lelap sewaktu rapat"',
            isCorrect: true,
            explanation: 'Tepat! Bagian ini merupakan Krisis (kejanggalan menggelitik sekaligus sindiran terhadap perilaku wakil rakyat yang tidur saat sidang).'
          },
          {
            id: 'k1-q1-d',
            text: 'Mahasiswa menjawab agar tidak mudah lelah',
            isCorrect: false,
            explanation: 'Ini adalah jawaban pengantar sebelum klimaks sindiran disampaikan dosen.'
          }
        ]
      },
      {
        id: 'k1-q2',
        title: 'Tantangan 1.2: Membedah Abstraksi Cerita',
        scenario: 'Kalimat manakah yang paling tepat berfungsi sebagai ABSTRAKSI dalam teks anekdot bertema antrean rumah sakit?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Abstraksi memberikan gambaran umum suasana di awal teks sebelum masuk ke peristiwa khusus.',
        options: [
          {
            id: 'k1-q2-a',
            text: 'Pagi itu di ruang tunggu loket BPJS yang sesak, terdengar desah napas panjang puluhan warga.',
            isCorrect: true,
            explanation: 'Tepat! Kalimat ini menggambarkan gambaran umum suasana di awal cerita (Abstraksi).'
          },
          {
            id: 'k1-q2-b',
            text: '"Obatnya baru datang besok ya, Pak!" kata petugas sambil menyeruput kopi panas.',
            isCorrect: false,
            explanation: 'Ini adalah Reaksi / dialog krisis, bukan abstraksi pembuka.'
          },
          {
            id: 'k1-q2-c',
            text: 'Akhirnya Pak Bejo pulang membawa selembar kertas kosong dengan wajah lesu.',
            isCorrect: false,
            explanation: 'Ini adalah bagian Koda (penutup cerita).'
          },
          {
            id: 'k1-q2-d',
            text: 'Mendengar hal itu, semua pasien langsung serempak terdiam.',
            isCorrect: false,
            explanation: 'Ini bagian Reaksi respon tokoh.'
          }
        ]
      },
      {
        id: 'k1-q3',
        title: 'Tantangan 1.3: Mengidentifikasi Reaksi',
        scenario: 'Dalam anekdot "Rompi Termahal", reaksi timbul ketika lawan bicara tertegun mendengar alasan rompi KPK mahal. Apa esensi utama dari bagian REAKSI?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Reaksi adalah cara tokoh menyelesaikan atau merespons krisis yang memicu tawa/renungan.',
        options: [
          {
            id: 'k1-q3-a',
            text: 'Tanggapan, penyelesaian, atau tindakan tak terduga dalam merespons krisis keganjilan.',
            isCorrect: true,
            explanation: 'Tepat! Reaksi menunjukkan bagaimana tokoh merespons krisis sehingga timbul unsur jenaka dan sindiran.'
          },
          {
            id: 'k1-q3-b',
            text: 'Pengenalan riwayat hidup sang tokoh sejak kecil.',
            isCorrect: false,
            explanation: 'Itu adalah teks biografi, bukan reaksi anekdot.'
          },
          {
            id: 'k1-q3-c',
            text: 'Daftar rincian anggaran proyek pembangunan fasilitas umum.',
            isCorrect: false,
            explanation: 'Itu adalah dokumen laporan keuangan.'
          },
          {
            id: 'k1-q3-d',
            text: 'Hukuman penjara fisik tanpa dialog apapun.',
            isCorrect: false,
            explanation: 'Bukan esensi reaksi anekdot.'
          }
        ]
      },
      {
        id: 'k1-q4',
        title: 'Tantangan 1.4: Fungsi Bagian Koda',
        scenario: 'Apakah sebuah teks anekdot selalu WAJIB menyertakan bagian Koda secara eksplisit?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Dalam struktur anekdot, ada bagian inti dan bagian penutup yang bersifat opsional/implisit.',
        options: [
          {
            id: 'k1-q4-a',
            text: 'Wajib ada, jika tidak ada koda maka teks dianggap batal sebagai teks anekdot.',
            isCorrect: false,
            explanation: 'Koda bersifat opsional; banyak teks anekdot modern berakhir di reaksi yang menohok.'
          },
          {
            id: 'k1-q4-b',
            text: 'Bersifat opsional (pilihan), cerita bisa ditutup dengan simpulan pengarang atau dibiarkan pembaca merenungkannya di bagian reaksi.',
            isCorrect: true,
            explanation: 'Benar sekali! Koda bersifat opsional dalam teks anekdot. Cerita bisa berakhir di reaksi dengan kesan menggantung yang cerdas.'
          },
          {
            id: 'k1-q4-c',
            text: 'Koda harus diletakkan di awal sebelum Abstraksi.',
            isCorrect: false,
            explanation: 'Koda selalu berada di akhir cerita.'
          },
          {
            id: 'k1-q4-d',
            text: 'Hanya teks drama yang memiliki koda.',
            isCorrect: false,
            explanation: 'Tidak tepat.'
          }
        ]
      }
    ]
  },
  {
    id: 'kasus-2',
    caseNumber: 2,
    codeName: 'INTEROGASI-BAHASA-02',
    title: 'Interogasi Kalimat Terselubung',
    subtitle: 'Menganalisis Kaidah Kebahasaan & Ragam Sindiran',
    badge: 'Kaidah Bahasa',
    targetCompetency: 'Menganalisis pertanyaan retoris, konjungsi temporal, kalimat seru, dan majas sindiran',
    description: 'Tersangka meninggalkan jejak kata-kata sarkastis dan kalimat retoris pada papan pengumuman kota. Detektif harus membongkar fungsi kebahasaannya.',
    maxPoints: 40,
    questions: [
      {
        id: 'k2-q1',
        title: 'Tantangan 2.1: Mendeteksi Pertanyaan Retoris',
        scenario: 'Di antara kalimat berikut, manakah yang merupakan PERTANYAAN RETORIS yang tepat dalam teks anekdot?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Pertanyaan retoris adalah pertanyaan penegas yang sebenarnya tidak memerlukan jawaban karena sudah jelas maksudnya.',
        options: [
          {
            id: 'k2-q1-a',
            text: '"Pukul berapa rapat komisi akan dimulai hari ini?"',
            isCorrect: false,
            explanation: 'Ini adalah kalimat tanya faktual yang memerlukan jawaban jam/waktu.'
          },
          {
            id: 'k2-q1-b',
            text: '"Apakah jalanan berlubang sedalam kolam ikan ini sengaja disiapkan untuk ternak lele warga?"',
            isCorrect: true,
            explanation: 'Tepat! Pertanyaan ini bernada sindiran retoris untuk mengkritik lambannya perbaikan jalan umum.'
          },
          {
            id: 'k2-q1-c',
            text: '"Berapa jumlah kursi yang ada di gedung dewan?"',
            isCorrect: false,
            explanation: 'Ini pertanyaan informasi jumlah kuantitatif.'
          },
          {
            id: 'k2-q1-d',
            text: '"Siapa yang meninggalkan dompet di toilet?"',
            isCorrect: false,
            explanation: 'Ini pertanyaan kehilangan barang.'
          }
        ]
      },
      {
        id: 'k2-q2',
        title: 'Tantangan 2.2: Jejak Konjungsi Temporal',
        scenario: 'Temukan kalimat yang mengandung KONJUNGSI KRONOLOGIS/TEMPORAL:',
        type: 'multiple_choice',
        points: 10,
        clue: 'Konjungsi temporal menyatakan urutan waktu kejadian (contoh: lalu, kemudian, setelah itu).',
        options: [
          {
            id: 'k2-q2-a',
            text: 'Pejabat itu tersenyum lebar karena kamera wartawan menyorotnya dari dekat.',
            isCorrect: false,
            explanation: '"Karena" adalah konjungsi kausalitas (sebab-akibat), bukan temporal.'
          },
          {
            id: 'k2-q2-b',
            text: 'Setelah membaca laporan keuangan fiktif itu, ia kemudian menandatanganinya tanpa rasa bersalah sedikit pun.',
            isCorrect: true,
            explanation: 'Tepat! Kata "Setelah" dan "kemudian" adalah konjungsi temporal yang mengurutkan kronologi peristiwa.'
          },
          {
            id: 'k2-q2-c',
            text: 'Gedung itu megah tetapi fasilitas toiletnya rusak parah.',
            isCorrect: false,
            explanation: '"Tetapi" adalah konjungsi pertentangan.'
          },
          {
            id: 'k2-q2-d',
            text: 'Baik kepala dinas maupun stafnya tidak ada di kantor.',
            isCorrect: false,
            explanation: '"Baik... maupun" adalah konjungsi korelatif.'
          }
        ]
      },
      {
        id: 'k2-q3',
        title: 'Tantangan 2.3: Membedakan Majas Ironi vs Sinisme',
        scenario: '"Bagus sekali kinerjamu, rapat sepuluh menit tapi studi bandingnya sampai ke luar negeri dua minggu!" Kalimat sindiran tersebut menggunakan gaya bahasa:',
        type: 'multiple_choice',
        points: 10,
        clue: 'Menyatakan hal berlawanan secara halus (memuji diawal padahal mencela).',
        options: [
          {
            id: 'k2-q3-a',
            text: 'Ironi (sindiran halus dengan mengatakan kebalikan dari kenyataan sebenarnya)',
            isCorrect: true,
            explanation: 'Tepat! Menyebut "Bagus sekali kinerjamu" padahal faktanya memboroskan anggaran adalah contoh nyata majas ironi.'
          },
          {
            id: 'k2-q3-b',
            text: 'Hiperbola (melebih-lebihkan fakta)',
            isCorrect: false,
            explanation: 'Bukan hiperbola utama, fokusnya adalah kontradiksi sindiran.'
          },
          {
            id: 'k2-q3-c',
            text: 'Personifikasi (mengorbankan benda mati berjiwa)',
            isCorrect: false,
            explanation: 'Tidak ada benda mati yang beraktivitas seperti manusia.'
          },
          {
            id: 'k2-q3-d',
            text: 'Pleonasme (keterangan berlebih)',
            isCorrect: false,
            explanation: 'Bukan pleonasme.'
          }
        ]
      },
      {
        id: 'k2-q4',
        title: 'Tantangan 2.4: Penggunaan Kata Kerja Aksi',
        scenario: 'Manakah kelompok kata kerja yang seluruhnya merupakan KATA KERJA AKSI dalam teks anekdot?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Kata kerja aksi menggambarkan subjek melakukan aktivitas fisik secara nyata.',
        options: [
          {
            id: 'k2-q4-a',
            text: 'Merasa, menyukai, mengira, membayangkan',
            isCorrect: false,
            explanation: 'Ini adalah kata kerja mental / persepsi pikiran.'
          },
          {
            id: 'k2-q4-b',
            text: 'Mengetuk, melempar, membagikan, memotret',
            isCorrect: true,
            explanation: 'Tepat! Mengetuk, melempar, membagikan, dan memotret adalah perbuatan fisik nyata (action verbs).'
          },
          {
            id: 'k2-q4-c',
            text: 'Mengetahui, mencemaskan, memahami, mengingat',
            isCorrect: false,
            explanation: 'Ini adalah verba mental.'
          },
          {
            id: 'k2-q4-d',
            text: 'Adalah, merupakan, yaitu, ialah',
            isCorrect: false,
            explanation: 'Ini adalah kopula atau verba relasional.'
          }
        ]
      }
    ]
  },
  {
    id: 'kasus-3',
    caseNumber: 3,
    codeName: 'REKONSTRUKSI-ALUR-03',
    title: 'Rekonstruksi Adegan Rapat Paripurna',
    subtitle: 'Menyusun Urutan Logika Anekdot yang Acak',
    badge: 'Urutan Logika',
    targetCompetency: 'Menyusun urutan alur teks anekdot secara runut dan koheren',
    description: 'Laporan notulensi rapat dirobek oleh pelaku tak dikenal. Detektif harus merekonstruksi urutan peristiwa yang benar agar kelucuan dan sindirannya utuh.',
    maxPoints: 40,
    questions: [
      {
        id: 'k3-q1',
        title: 'Tantangan 3.1: Logika Urutan Peristiwa (Struktur Abstraksi ke Orientasi)',
        scenario: 'Dua kalimat awal:\n(1) Suatu siang di sebuah kantor kependudukan yang sangat ramai.\n(2) Pak Danu datang untuk mengurus surat pindah setelah menempuh perjalanan 30 km.\nBagian manakah kalimat (1) dan (2)?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Kalimat (1) adalah pembuka suasana dan kalimat (2) adalah pengenalan tokoh dan keperluannya.',
        options: [
          {
            id: 'k3-q1-a',
            text: 'Kalimat (1) adalah Abstraksi dan Kalimat (2) adalah Orientasi.',
            isCorrect: true,
            explanation: 'Benar! (1) memberi suasana umum (Abstraksi), dan (2) memperkenalkan tokoh Pak Danu beserta tujuannya (Orientasi).'
          },
          {
            id: 'k3-q1-b',
            text: 'Kalimat (1) adalah Krisis dan Kalimat (2) adalah Koda.',
            isCorrect: false,
            explanation: 'Belum terjadi krisis maupun koda di awal kalimat ini.'
          },
          {
            id: 'k3-q1-c',
            text: 'Kedua kalimat adalah Koda.',
            isCorrect: false,
            explanation: 'Koda ada di akhir teks.'
          },
          {
            id: 'k3-q1-d',
            text: 'Kedua kalimat adalah Reaksi spontan.',
            isCorrect: false,
            explanation: 'Tidak tepat.'
          }
        ]
      },
      {
        id: 'k3-q2',
        title: 'Tantangan 3.2: Menentukan Titik Puncak Krisis dalam Alur',
        scenario: 'Melanjutkan cerita Pak Danu:\n(3) Saat sampai di loket, petugas berkata: "Maaf Pak, sistem kami sedang offline karena server belum dibayar."\n(4) Pak Danu terbelalak: "Lho, kemarin saya lihat ada papan bertuliskan \'Melayani dengan Sepenuh Hati Tanpa Hambatan\'!"\nApa peran kalimat (3)?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Kalimat (3) menghadirkan benturan/keganjilan nyata yang mengecewakan namun menggelitik.',
        options: [
          {
            id: 'k3-q2-a',
            text: 'Krisis (Puncak konflik/kejanggalan dalam birokrasi)',
            isCorrect: true,
            explanation: 'Tepat! Alasan server mati karena belum dibayar adalah krisis kejanggalan utama yang memantik sindiran.'
          },
          {
            id: 'k3-q2-b',
            text: 'Abstraksi pembuka cerita',
            isCorrect: false,
            explanation: 'Abstraksi sudah lewat di awal.'
          },
          {
            id: 'k3-q2-c',
            text: 'Koda kesimpulan pengarang',
            isCorrect: false,
            explanation: 'Bukan penutup.'
          },
          {
            id: 'k3-q2-d',
            text: 'Latar waktu malam hari',
            isCorrect: false,
            explanation: 'Tidak ada latar malam.'
          }
        ]
      },
      {
        id: 'k3-q3',
        title: 'Tantangan 3.3: Jawaban Reaksi yang Mengunci Sindiran',
        scenario: 'Petugas menjawab protes Pak Danu: "Betul Pak, sepanduk itu dipasang untuk dibaca, bukan untuk dirasakan!"\nKalimat tersebut adalah:',
        type: 'multiple_choice',
        points: 10,
        clue: 'Penyelesaian yang paradoks dan menohok adalah ciri khas bagian ini.',
        options: [
          {
            id: 'k3-q3-a',
            text: 'Reaksi (Respons tak terduga yang menjadi puncak kelucuan dan kritik)',
            isCorrect: true,
            explanation: 'Benar sekali! Reaksi petugas yang sarkastis menunjukkan kritik terhadap slogan pelayanan yang hanya sekadar pajangan.'
          },
          {
            id: 'k3-q3-b',
            text: 'Orientasi pengenalan tokoh baru',
            isCorrect: false,
            explanation: 'Bukan pengenalan tokoh.'
          },
          {
            id: 'k3-q3-c',
            text: 'Abstraksi cuaca',
            isCorrect: false,
            explanation: 'Bukan cuaca.'
          },
          {
            id: 'k3-q3-d',
            text: 'Permintaan maaf resmi dinas',
            isCorrect: false,
            explanation: 'Petugas tidak minta maaf secara resmi melainkan berdalih konyol.'
          }
        ]
      },
      {
        id: 'k3-q4',
        title: 'Tantangan 3.4: Koda Penutup yang Tepat',
        scenario: 'Manakah penutup (KODA) yang paling padu untuk melengkapi anekdot Pak Danu di atas?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Koda menutup dengan perenungan atau situasi akhir tokoh utama.',
        options: [
          {
            id: 'k3-q4-a',
            text: 'Pak Danu pun hanya bisa mengelus dada sambil berjanji akan membaca sepanduk dengan kacamata lebih tebal lain kali.',
            isCorrect: true,
            explanation: 'Tepat! Menutup kisah dengan getir sekaligus jenaka yang merefleksikan kepasrahan warga terhadap birokrasi berbelit.'
          },
          {
            id: 'k3-q4-b',
            text: 'Kemudian matahari terbit dari sebelah barat di kota itu.',
            isCorrect: false,
            explanation: 'Tidak logis dan tidak nyambung dengan isu birokrasi.'
          },
          {
            id: 'k3-q4-c',
            text: 'Pak Danu segera memanggil pemadam kebakaran.',
            isCorrect: false,
            explanation: 'Tidak ada kebakaran dalam skenario.'
          },
          {
            id: 'k3-q4-d',
            text: 'Tiba-tiba alien datang mengambil berkas kependudukan.',
            isCorrect: false,
            explanation: 'Bukan anekdot realitas sosial melainkan fiksi ilmiah murni.'
          }
        ]
      }
    ]
  },
  {
    id: 'kasus-4',
    caseNumber: 4,
    codeName: 'DEKODE-PESAN-04',
    title: 'Dekode Pesan & Kritik Sosial',
    subtitle: 'Membongkar Makna Tersirat di Balik Gelak Tawa',
    badge: 'Makna Tersirat',
    targetCompetency: 'Mengevaluasi makna tersirat dan pesan moral kritik sosial dalam anekdot',
    description: 'Detektif ditugaskan membaca berkas rahasia kasus "Jembatan Layang yang Bergoyang" untuk menemukan pesan tersirat bagi perbaikan masyarakat.',
    maxPoints: 40,
    questions: [
      {
        id: 'k4-q1',
        title: 'Tantangan 4.1: Menemukan Kritik Tersirat dalam Dialog',
        scenario: 'Seorang inspektur bertanya: "Mengapa tiang jembatan ini hanya berisi semen tipis dan bambu?" Kontraktor menjawab: "Agar ramah lingkungan dan fleksibel saat gempa, Pak!"\nKritik tersirat apa yang dituju?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Analisis kontras antara alasan "ramah lingkungan" dengan praktik pengurangan mutu material bangunan.',
        options: [
          {
            id: 'k4-q1-a',
            text: 'Menyindir praktik korupsi pemotongan anggaran proyek infrastruktur publik yang membahayakan nyawa.',
            isCorrect: true,
            explanation: 'Tepat! Anekdot ini mengkritik oknum kontraktor dan pejabat yang memangkas spesifikasi demi keuntungan pribadi.'
          },
          {
            id: 'k4-q1-b',
            text: 'Memuji kecerdasan kontraktor dalam memanfaatkan bahan bambu tradisional.',
            isCorrect: false,
            explanation: 'Bukan pujian; kata-kata kontraktor adalah dalih konyol atas korupsi.'
          },
          {
            id: 'k4-q1-c',
            text: 'Mengedukasi masyarakat agar gemar menanam pohon bambu di jalan raya.',
            isCorrect: false,
            explanation: 'Bukan tentang edukasi pertanian bambu.'
          },
          {
            id: 'k4-q1-d',
            text: 'Menjelaskan teknik arsitektur modern tahan gempa.',
            isCorrect: false,
            explanation: 'Bukan artikel ilmiah teknik sipil.'
          }
        ]
      },
      {
        id: 'k4-q2',
        title: 'Tantangan 4.2: Evaluasi Target Sasaran Kritik',
        scenario: 'Siapakah yang menjadi target sasaran utama kritik dalam teks anekdot?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Anekdot biasanya menyasar pemangku kebijakan, perilaku sosial menyimpang, atau pejabat publik.',
        options: [
          {
            id: 'k4-q2-a',
            text: 'Masyarakat kecil yang sedang berbelanja di pasar tradisional tanpa alasan.',
            isCorrect: false,
            explanation: 'Anekdot tidak ditujukan untuk menindas orang yang tidak berdaya.'
          },
          {
            id: 'k4-q2-b',
            text: 'Pemangku kebijakan publik, oknum birokrasi, atau kebiasaan buruk masyarakat yang merugikan kepentingan umum.',
            isCorrect: true,
            explanation: 'Benar sekali! Anekdot adalah sarana kontrol sosial konstruktif terhadap pihak yang memiliki wewenang atau kebiasaan buruk bersama.'
          },
          {
            id: 'k4-q2-c',
            text: 'Karakter fiksi dalam dongeng zaman purbakala.',
            isCorrect: false,
            explanation: 'Anekdot selalu berakar dari fenomena sosial nyata.'
          },
          {
            id: 'k4-q2-d',
            text: 'Hewan peliharaan di rumah sakit.',
            isCorrect: false,
            explanation: 'Bukan target anekdot.'
          }
        ]
      },
      {
        id: 'k4-q3',
        title: 'Tantangan 4.3: Menghindari Fitnah dalam Teks Anekdot',
        scenario: 'Bagaimana cara seorang detektif bahasa menyusun teks anekdot agar tetap santun dan tidak terjerat pasal penghinaan personal?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Fokus pada substansi masalah atau sistem, bukan penyerangan fisik/identitas pribadi seseorang.',
        options: [
          {
            id: 'k4-q3-a',
            text: 'Menyebutkan nama asli, alamat rumah, dan nama keluarga orang yang dibenci secara terbuka.',
            isCorrect: false,
            explanation: 'Itu adalah pencemaran nama baik dan doxxing, bukan teks anekdot!'
          },
          {
            id: 'k4-q3-b',
            text: 'Menggunakan analogi, simbol, penyamaran tokoh, dan memfokuskan kritik pada perilaku atau sistem, bukan menghina fisik/pribadi.',
            isCorrect: true,
            explanation: 'Tepat! Kekuatan anekdot terletak pada simbol, analogi, dan humor cerdas yang membedah sistem tanpa merendahkan martabat personal.'
          },
          {
            id: 'k4-q3-c',
            text: 'Menyebarkan kabar bohong yang tidak pernah terjadi di manapun.',
            isCorrect: false,
            explanation: 'Anekdot harus berakar pada esensi kenyataan sosial.'
          },
          {
            id: 'k4-q3-d',
            text: 'Menulis teks tanpa ada unsur lelucon sedikit pun.',
            isCorrect: false,
            explanation: 'Unsur humor adalah ciri wajib anekdot.'
          }
        ]
      },
      {
        id: 'k4-q4',
        title: 'Tantangan 4.4: Nilai Moral & Refleksi Detektif',
        scenario: 'Apa nilai akhir yang harus didapatkan pembaca setelah menuntaskan teks anekdot berkualitas?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Kombinasi antara kesenangan jiwa dan pencerahan akal budi.',
        options: [
          {
            id: 'k4-q4-a',
            text: 'Hanya rasa sakit hati dan dendam kesumat.',
            isCorrect: false,
            explanation: 'Anekdot tidak bertujuan menyulut kebencian destruktif.'
          },
          {
            id: 'k4-q4-b',
            text: 'Tersenyum gembira sekaligus tergerak memperbaiki kesalahan moral atau ketidakadilan di lingkungan sekitar.',
            isCorrect: true,
            explanation: 'Tepat! Ini adalah hakikat dulce et utile (menghibur sekaligus mendidik).'
          },
          {
            id: 'k4-q4-c',
            text: 'Rasa mengantuk dan ingin tidur seharian.',
            isCorrect: false,
            explanation: 'Bukan tujuan literasi.'
          },
          {
            id: 'k4-q4-d',
            text: 'Kebingungan tanpa memahami maksud cerita.',
            isCorrect: false,
            explanation: 'Anekdot yang baik pesannya tajam dan mudah dipahami intinya.'
          }
        ]
      }
    ]
  },
  {
    id: 'kasus-5',
    caseNumber: 5,
    codeName: 'LISENSI-UTAMA-05',
    title: 'Ujian Lisensi Detektif Utama',
    subtitle: 'Analisis Komprehensif Kasus "Kursi Terkutuk di Ruang Sidang"',
    badge: 'Ujian Master',
    targetCompetency: 'Mengevaluasi secara holistik struktur, kebahasaan, dan relevansi sosial teks anekdot',
    description: 'Tantangan puncak Sekolah Rahasia Pemburu Bahasa. Selesaikan 4 teka-teki studi kasus tingkat tinggi untuk memperoleh lisensi Master Detective.',
    maxPoints: 40,
    questions: [
      {
        id: 'k5-q1',
        title: 'Tantangan 5.1: Verifikasi Struktur Lengkap',
        scenario: '"(A) Suatu hari di sebuah balai kota. (B) Pak Walikota memamerkan mobil dinas baru seharga 3 miliar. (C) Seorang warga bertanya: \'Apakah mobil ini bisa melintasi jalan kampung kami yang berlubang?\' (D) Sang Walikota menjawab: \'Tentu tidak, makanya saya hanya lewat di jalan tol yang mulus!\' (E) Warga pun terdiam dan tersenyum getir."',
        type: 'multiple_choice',
        points: 10,
        clue: 'Pasangkan bagian A s.d E dengan urutan 5 struktur standar secara tepat.',
        options: [
          {
            id: 'k5-q1-a',
            text: 'A=Abstraksi, B=Orientasi, C=Krisis, D=Reaksi, E=Koda',
            isCorrect: true,
            explanation: 'Tepat sekali! Urutan A=Abstraksi, B=Orientasi, C=Krisis (pertanyaan penohok), D=Reaksi (jawaban ironis), E=Koda (senyum getir penutup).'
          },
          {
            id: 'k5-q1-b',
            text: 'A=Koda, B=Krisis, C=Reaksi, D=Orientasi, E=Abstraksi',
            isCorrect: false,
            explanation: 'Ukurannya terbalik.'
          },
          {
            id: 'k5-q1-c',
            text: 'A=Orientasi, B=Abstraksi, C=Koda, D=Krisis, E=Reaksi',
            isCorrect: false,
            explanation: 'Tidak sesuai kaidah struktur baku.'
          },
          {
            id: 'k5-q1-d',
            text: 'Semua bagian adalah Orientasi belaka.',
            isCorrect: false,
            explanation: 'Salah.'
          }
        ]
      },
      {
        id: 'k5-q2',
        title: 'Tantangan 5.2: Bedah Kaidah Kalimat Seru & Dialog',
        scenario: 'Dalam anekdot di atas, manakah kalimat yang mencerminkan nada sindiran sinisme paling kuat?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Kalimat yang terang-terangan menunjukkan ketidakpedulian pejabat terhadap jalan warga.',
        options: [
          {
            id: 'k5-q2-a',
            text: '"Suatu hari di sebuah balai kota."',
            isCorrect: false,
            explanation: 'Ini hanya kalimat penunjuk latar.'
          },
          {
            id: 'k5-q2-b',
            text: '"Tentu tidak, makanya saya hanya lewat di jalan tol yang mulus!"',
            isCorrect: true,
            explanation: 'Tepat! Jawaban ini menyindir ketidakpekaan pejabat yang menghindari persoalan rakyat daripada menyelesaikannya.'
          },
          {
            id: 'k5-q2-c',
            text: '"Pak Walikota memamerkan mobil dinas baru."',
            isCorrect: false,
            explanation: 'Ini kalimat orientasi fakta cerita.'
          },
          {
            id: 'k5-q2-d',
            text: '"Warga pun tersenyum."',
            isCorrect: false,
            explanation: 'Ini penutup pasif.'
          }
        ]
      },
      {
        id: 'k5-q3',
        title: 'Tantangan 5.3: Korelasi Nilai KKTP & Karakter Peserta Didik',
        scenario: 'Pembelajaran teks anekdot di kurikulum bertujuan melatih peserta didik agar memiliki daya nalar kritis (Profil Pelajar Pancasila). Mengapa kemampuan mengkritik lewat humor itu penting?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Humor cerdas mampu menurunkan ketegangan emosi dan menyampaikan pesan perbaikan secara damai.',
        options: [
          {
            id: 'k5-q3-a',
            text: 'Karena kritik dengan humor cerdas mampu meredam kekerasan fisik dan membangun budaya dialog yang beradab serta berdaya ingat tinggi.',
            isCorrect: true,
            explanation: 'Luar biasa! Inilah kompetensi nalar kritis yang diharapkan dalam KKTP Bahasa Indonesia.'
          },
          {
            id: 'k5-q3-b',
            text: 'Supaya peserta didik bisa menjadi pelawak bayaran di televisi saja.',
            isCorrect: false,
            explanation: 'Bukan tujuan utama kurikulum sekolah menengah.'
          },
          {
            id: 'k5-q3-c',
            text: 'Agar kita tidak perlu lagi belajar matematika dan sains.',
            isCorrect: false,
            explanation: 'Tidak tepat.'
          },
          {
            id: 'k5-q3-d',
            text: 'Supaya semua peraturan di sekolah dihapuskan.',
            isCorrect: false,
            explanation: 'Bukan tujuan edukasi.'
          }
        ]
      },
      {
        id: 'k5-q4',
        title: 'Tantangan 5.4: Formulasi Poin & Nilai Pengetahuan Detektif',
        scenario: 'Seorang detektif bahasa memperoleh 170 poin dari total maksimal acuan 200 poin. Berapakah nilai pengetahuan resminya, dan apakah ia mencapai KKTP 75?',
        type: 'multiple_choice',
        points: 10,
        clue: 'Gunakan rumus resmi: (170 ÷ 200) × 100.',
        options: [
          {
            id: 'k5-q4-a',
            text: 'Nilai = 85 | Status: Tercapai (karena 85 ≥ 75)',
            isCorrect: true,
            explanation: 'Tepat sekali! (170 ÷ 200) × 100 = 85. Karena 85 ≥ 75, maka statusnya adalah TERCAPAI. Bukan 100!'
          },
          {
            id: 'k5-q4-b',
            text: 'Nilai = 100 | Status: Tercapai (menganggap 170 adalah nilai tertinggi)',
            isCorrect: false,
            explanation: 'Keliru! Nilai 170 dari 200 adalah 85, bukan 100. Jangan mengasumsikan 170 poin otomatis bernilai 100 jika penyebutnya 200!'
          },
          {
            id: 'k5-q4-c',
            text: 'Nilai = 70 | Status: Belum Tercapai',
            isCorrect: false,
            explanation: 'Perhitungan salah.'
          },
          {
            id: 'k5-q4-d',
            text: 'Nilai = 170 | Status: Melampaui Batas',
            isCorrect: false,
            explanation: 'Skala nilai pengetahuan pembelajaran adalah 0–100, tidak boleh melebihi 100.'
          }
        ]
      }
    ]
  }
];

export const TOTAL_INVESTIGATION_MAX_POINTS = INVESTIGATION_CASES.reduce(
  (sum, c) => sum + c.maxPoints,
  0
); // 200 points
