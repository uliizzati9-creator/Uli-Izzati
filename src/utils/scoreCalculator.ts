export interface ScoreCalculationResult {
  pointsEarned: number;
  maxPoints: number;
  rawPercentage: number;
  knowledgeScore: number; // 0 to 100, clamped
  kktp: number;
  isAchieved: boolean;
  statusLabel: 'Tercapai' | 'Belum Tercapai';
  gradeBadge: {
    letter: string;
    description: string;
    color: string;
  };
  formulaString: string;
}

/**
 * Menghitung nilai pengetahuan skala 0–100 berdasarkan poin yang diperoleh
 * dan total poin maksimal acuan, dievaluasi terhadap KKTP (Kriteria Ketercapaian Tujuan Pembelajaran).
 *
 * Rumus Resmi:
 * Nilai Pengetahuan = (Poin Diperoleh ÷ Total Poin Maksimal) × 100
 * Batasan: min 0, max 100.
 */
export function calculateKnowledgeScore(
  pointsEarned: number,
  maxPoints: number = 200,
  kktp: number = 75
): ScoreCalculationResult {
  // Validasi penyebut agar tidak terjadi pembagian dengan nol
  const safeMax = maxPoints > 0 ? maxPoints : 200;
  const safePoints = Math.max(0, pointsEarned);

  // Perhitungan rasio & persentase
  const rawPercentage = (safePoints / safeMax) * 100;

  // Batasi nilai akhir antara 0 dan 100 (clamp), dengan pembulatan 1 tempat desimal jika perlu atau bulat
  const clampedRaw = Math.min(100, Math.max(0, rawPercentage));
  // Round to 1 decimal place (misal 74.5 atau 85)
  const knowledgeScore = Math.round(clampedRaw * 10) / 10;

  // Evaluasi KKTP (Kriteria Ketercapaian Tujuan Pembelajaran)
  const isAchieved = knowledgeScore >= kktp;
  const statusLabel = isAchieved ? 'Tercapai' : 'Belum Tercapai';

  // Badge predikat kompetensi detektif
  let gradeBadge = {
    letter: 'D',
    description: 'Perlu Pendampingan Khusus',
    color: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
  };

  if (knowledgeScore >= 90) {
    gradeBadge = {
      letter: 'A',
      description: 'Sangat Mahir (Master Detective)',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    };
  } else if (knowledgeScore >= 80) {
    gradeBadge = {
      letter: 'B',
      description: 'Mahir (Senior Investigator)',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    };
  } else if (knowledgeScore >= 75) {
    gradeBadge = {
      letter: 'C+',
      description: 'Cakap / Memenuhi KKTP (Detektif Muda)',
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    };
  }

  const formulaString = `(${safePoints} ÷ ${safeMax}) × 100 = ${knowledgeScore}`;

  return {
    pointsEarned: safePoints,
    maxPoints: safeMax,
    rawPercentage: Math.round(rawPercentage * 10) / 10,
    knowledgeScore,
    kktp,
    isAchieved,
    statusLabel,
    gradeBadge,
    formulaString
  };
}

/**
 * Daftar skenario uji resmi untuk memvalidasi rumus penilaian
 */
export const OFFICIAL_TEST_SCENARIOS = [
  {
    id: 'under-kktp',
    title: '1. Poin di bawah KKTP (< 75)',
    points: 130,
    maxPoints: 200,
    expectedScore: 65,
    expectedStatus: 'Belum Tercapai' as const,
    notes: '(130 ÷ 200) × 100 = 65. Nilai di bawah 75 sehingga Belum Tercapai.'
  },
  {
    id: 'exact-kktp',
    title: '2. Poin yang menghasilkan nilai tepat 75',
    points: 150,
    maxPoints: 200,
    expectedScore: 75,
    expectedStatus: 'Tercapai' as const,
    notes: '(150 ÷ 200) × 100 = 75. Nilai tepat 75 memenuhi batas minimal KKTP (Tercapai).'
  },
  {
    id: 'above-kktp',
    title: '3. Poin di atas KKTP (Contoh 170 poin dari 200)',
    points: 170,
    maxPoints: 200,
    expectedScore: 85,
    expectedStatus: 'Tercapai' as const,
    notes: '(170 ÷ 200) × 100 = 85. Nilai di atas KKTP (Tercapai). Bukan 100!'
  },
  {
    id: 'raw-above-170',
    title: '4. Poin mentah lebih dari 170 (Contoh 190 dari 200)',
    points: 190,
    maxPoints: 200,
    expectedScore: 95,
    expectedStatus: 'Tercapai' as const,
    notes: '(190 ÷ 200) × 100 = 95. Nilai bertambah proporsional dan tidak salah terpotong.'
  },
  {
    id: 'max-benchmark',
    title: '5. Poin sama dengan total maksimal acuan (200 dari 200)',
    points: 200,
    maxPoints: 200,
    expectedScore: 100,
    expectedStatus: 'Tercapai' as const,
    notes: '(200 ÷ 200) × 100 = 100. Nilai sempurna (Tercapai).'
  },
  {
    id: 'overflow-test',
    title: '6. Poin berlebih / bonus (Contoh 215 dari 200)',
    points: 215,
    maxPoints: 200,
    expectedScore: 100,
    expectedStatus: 'Tercapai' as const,
    notes: 'Terbatas aman pada nilai 100 (tidak ada nilai melebihi batas 100).'
  }
];
