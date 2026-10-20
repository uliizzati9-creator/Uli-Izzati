import { StudentAnecdote, StudentProfile, ScoreAssessment, AssessmentConfig } from '../types';

export const STORAGE_KEYS = {
  STUDENT_PROFILE: 'anekdot_detective_profile_v1',
  COMPLETED_QUESTIONS: 'anekdot_detective_answers_v1',
  EARNED_POINTS: 'anekdot_detective_points_v1',
  STUDENT_ANECDOTES: 'anekdot_detective_gallery_v1',
  SCORE_ASSESSMENTS: 'anekdot_detective_assessments_v1',
  ASSESSMENT_CONFIG: 'anekdot_detective_config_v1',
};

export const DEFAULT_CONFIG: AssessmentConfig = {
  maxPointsBenchmark: 200, // Total 5 kasus x 40 poin
  kktp: 75,
  allowBonusPoints: true,
};

export const DEFAULT_PROFILE: StudentProfile = {
  id: 'det-001',
  name: 'Arya Satria Pratama',
  className: 'X IPS 2',
  studentNumber: '07',
  schoolName: 'SMA Negeri 1 Pemburu Bahasa',
  avatarId: 'detective-1',
  joinedAt: new Date().toISOString(),
};

export const INITIAL_ANECDOTES: StudentAnecdote[] = [
  {
    id: 'anc-1',
    studentName: 'Nadia Kirana',
    className: 'X MIPA 1',
    title: 'Sopir Busway & Lampu Merah Abadi',
    topic: 'Fasilitas & Lalu Lintas',
    abstraction: 'Di tengah terik jalanan ibu kota pada jam pulang kantor yang padat merayap.',
    orientation: 'Sebuah bus listrik melaju di jalur khusus namun mendadak berhenti di perempatan lampu merah.',
    crisis: 'Lampu merah sudah berganti hijau tiga kali, tetapi bus tetap tidak jalan. Penumpang gelisah: "Pak Sopir, kenapa kita tidak maju juga?" Sopir menoleh dengan santai: "Saya menunggu lampu warna ungu, Mbak. Siapa tahu ada inovasi baru!"',
    reaction: 'Para penumpang serentak tertawa terbahak-bahak sambil menghapus keringat di dahi.',
    coda: 'Akhirnya seluruh penumpang sepakat bahwa sabar di jalan adalah latihan spiritual terbaik.',
    linguisticCheck: {
      hasTemporalConjunction: true,
      hasRhetoricalQuestion: true,
      hasActionVerb: true,
      hasSatire: true
    },
    createdAt: '2026-10-18T10:30:00.000Z',
    likes: 14
  },
  {
    id: 'anc-2',
    studentName: 'Rizky Ramadhan',
    className: 'X IPS 2',
    title: 'Buku Rapor yang Sakti',
    topic: 'Pendidikan & Sekolah',
    abstraction: 'Hari pembagian rapor semester ganjil selalu menjadi hari paling mendebarkan bagi Budi.',
    orientation: 'Ayah Budi menatap buku rapor anaknya dengan kening berkerut dalam.',
    crisis: 'Ayah bertanya heran: "Budi, kenapa nilai Sejarahmu 95 tapi nilai Matematikamu cuma 40?" Budi menjawab sigap: "Sebab masa lalu jauh lebih mudah diingat daripada menghitung masa depan yang belum jelas, Yah!"',
    reaction: 'Ayah Budi yang semula hendak marah mendadak tersenyum simpul dan menggelengkan kepala.',
    coda: 'Sejak hari itu, Budi dihadiahi les berhitung kilat setiap akhir pekan.',
    linguisticCheck: {
      hasTemporalConjunction: true,
      hasRhetoricalQuestion: true,
      hasActionVerb: true,
      hasSatire: true
    },
    createdAt: '2026-10-19T08:15:00.000Z',
    likes: 22
  }
];

export const INITIAL_ASSESSMENTS: ScoreAssessment[] = [
  {
    studentName: 'Arya Satria Pratama',
    className: 'X IPS 2',
    studentNumber: '07',
    pointsEarned: 170,
    maxPoints: 200,
    knowledgeScore: 85,
    kktp: 75,
    isAchieved: true,
    caseBreakdown: {
      'kasus-1': 40,
      'kasus-2': 40,
      'kasus-3': 30,
      'kasus-4': 30,
      'kasus-5': 30
    },
    evaluatedAt: '2026-10-19T14:20:00.000Z'
  },
  {
    studentName: 'Siti Nurhaliza',
    className: 'X IPS 2',
    studentNumber: '28',
    pointsEarned: 200,
    maxPoints: 200,
    knowledgeScore: 100,
    kktp: 75,
    isAchieved: true,
    caseBreakdown: {
      'kasus-1': 40,
      'kasus-2': 40,
      'kasus-3': 40,
      'kasus-4': 40,
      'kasus-5': 40
    },
    evaluatedAt: '2026-10-19T15:10:00.000Z'
  },
  {
    studentName: 'Bima Alfarisi',
    className: 'X IPS 2',
    studentNumber: '04',
    pointsEarned: 140,
    maxPoints: 200,
    knowledgeScore: 70,
    kktp: 75,
    isAchieved: false,
    caseBreakdown: {
      'kasus-1': 30,
      'kasus-2': 30,
      'kasus-3': 30,
      'kasus-4': 20,
      'kasus-5': 30
    },
    evaluatedAt: '2026-10-20T09:45:00.000Z'
  }
];
