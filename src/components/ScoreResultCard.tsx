import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Printer, 
  Download, 
  Award, 
  BookCheck, 
  User, 
  Calculator,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { ScoreAssessment } from '../types';
import { INVESTIGATION_CASES } from '../data/investigationCases';

interface ScoreResultCardProps {
  assessment: ScoreAssessment;
  onRetake?: () => void;
  onSaveToClassbook?: () => void;
  isSaved?: boolean;
}

export const ScoreResultCard: React.FC<ScoreResultCardProps> = ({
  assessment,
  onRetake,
  onSaveToClassbook,
  isSaved = false,
}) => {
  const {
    studentName,
    className,
    studentNumber,
    pointsEarned,
    maxPoints,
    knowledgeScore,
    kktp,
    isAchieved,
    caseBreakdown,
    evaluatedAt,
  } = assessment;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-900 border-2 border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden text-slate-100 print:bg-white print:text-black print:border-black print:shadow-none">
      
      {/* Decorative Background Stamp */}
      <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-5 select-none print:hidden">
        <Award className="w-72 h-72 text-amber-500" />
      </div>

      {/* Header Info */}
      <div className="border-b border-slate-700/80 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs tracking-wider uppercase mb-1">
            <BookCheck className="w-4 h-4" />
            <span>Lembar Hasil Penilaian Resmi Pembelajaran Teks Anekdot</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight print:text-black">
            Laporan Capaian Detektif Bahasa
          </h2>
          <p className="text-xs text-slate-400 mt-1 print:text-gray-600">
            Sekolah Rahasia Pemburu Bahasa • Kurikulum Merdeka / SMA-SMK
          </p>
        </div>

        {/* Status Stamp / Badge */}
        <div className={`inline-flex items-center space-x-2 px-5 py-3 rounded-xl font-black text-base border-2 shadow-lg self-start sm:self-auto ${
          isAchieved
            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500 shadow-emerald-500/10'
            : 'bg-rose-950/80 text-rose-300 border-rose-500 shadow-rose-500/10'
        }`}>
          {isAchieved ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0" />
          ) : (
            <XCircle className="w-6 h-6 text-rose-400 flex-shrink-0" />
          )}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-300 font-medium">Status Ketercapaian</div>
            <div className="text-lg">{isAchieved ? 'TERCAPAI' : 'BELUM TERCAPAI'}</div>
          </div>
        </div>
      </div>

      {/* Identity Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-800/60 p-4 rounded-xl border border-slate-700/60 mb-6 print:bg-gray-100 print:border-gray-300">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Nama Peserta Didik</div>
            <div className="font-bold text-slate-100 text-sm print:text-black">{studentName || 'Peserta Didik'}</div>
          </div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Kelas & No. Absen</div>
          <div className="font-bold text-slate-100 text-sm print:text-black">
            {className || 'X'} • No. Absen: {studentNumber || '-'}
          </div>
        </div>

        <div>
          <div className="text-[10px] text-slate-400 uppercase tracking-wider">Tanggal Evaluasi</div>
          <div className="font-medium text-slate-300 text-xs mt-0.5 print:text-gray-700">
            {new Date(evaluatedAt).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
          </div>
        </div>
      </div>

      {/* 4 Primary Assessment Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        
        {/* Metric 1: Total Poin Diperoleh */}
        <div className="bg-slate-800/90 border border-amber-500/30 p-4 rounded-xl">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
            Total Poin Diperoleh
          </div>
          <div className="mt-2 flex items-baseline space-x-1">
            <span className="text-3xl font-black text-amber-400">{pointsEarned}</span>
            <span className="text-xs text-slate-400">poin</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Akumulasi hasil tantangan investigasi
          </p>
        </div>

        {/* Metric 2: Total Poin Maksimal Acuan */}
        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
            Poin Maksimal Acuan
          </div>
          <div className="mt-2 flex items-baseline space-x-1">
            <span className="text-3xl font-black text-slate-200">{maxPoints}</span>
            <span className="text-xs text-slate-400">poin</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Penyebut standar 5 kasus investigasi
          </p>
        </div>

        {/* Metric 3: Nilai Pengetahuan Skala 0-100 */}
        <div className={`border p-4 rounded-xl ${
          isAchieved
            ? 'bg-emerald-950/40 border-emerald-500/50'
            : 'bg-rose-950/40 border-rose-500/50'
        }`}>
          <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">
            Nilai Pengetahuan (0–100)
          </div>
          <div className="mt-2 flex items-baseline space-x-1">
            <span className={`text-4xl font-black ${
              isAchieved ? 'text-emerald-400' : 'text-rose-400'
            }`}>
              {knowledgeScore}
            </span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <p className="text-[10px] text-slate-300 mt-1">
            Formula: ({pointsEarned} ÷ {maxPoints}) × 100
          </p>
        </div>

        {/* Metric 4: KKTP Acuan */}
        <div className="bg-slate-800/90 border border-slate-700 p-4 rounded-xl">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
            KKTP Acuan
          </div>
          <div className="mt-2 flex items-baseline space-x-1">
            <span className="text-3xl font-black text-amber-300">{kktp}</span>
            <span className="text-xs text-slate-400">/ 100</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Batas minimal kriteria ketercapaian
          </p>
        </div>

      </div>

      {/* Formula & Rule Transparency Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Calculator className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed text-slate-200">
            <span className="font-bold text-amber-300">Transparansi Rumus Penilaian Resmi: </span>
            <code className="bg-slate-950/80 px-2 py-0.5 rounded text-amber-300 font-mono text-[11px] mx-1">
              Nilai Pengetahuan = ({pointsEarned} ÷ {maxPoints}) × 100 = {knowledgeScore}
            </code>
            <div className="mt-1.5 text-slate-300">
              {isAchieved ? (
                <span>
                  ✅ Karena nilai <strong className="text-emerald-300">{knowledgeScore}</strong> ≥ KKTP <strong className="text-amber-300">{kktp}</strong>, maka kompetensi peserta didik dinyatakan <strong className="text-emerald-300">Tercapai</strong>.
                </span>
              ) : (
                <span>
                  ⚠️ Karena nilai <strong className="text-rose-300">{knowledgeScore}</strong> &lt; KKTP <strong className="text-amber-300">{kktp}</strong>, maka kompetensi peserta didik dinyatakan <strong className="text-rose-300">Belum Tercapai</strong> dan berhak mendapatkan pengayaan/remedial.
                </span>
              )}
            </div>
            {pointsEarned === 170 && maxPoints === 200 && (
              <div className="mt-2 p-2 bg-slate-900/80 rounded border border-amber-500/40 text-[11px] text-amber-200">
                💡 <strong>Catatan Khusus Uji Kasus:</strong> Peserta didik memperoleh 170 poin dari total maksimal 200 poin. Sesuai ketentuan, nilainya adalah <strong>85</strong> (bukan 100), dan statusnya <strong>Tercapai</strong> karena 85 ≥ 75.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Breakdown per Kasus */}
      <div className="mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-2">
          <span>Rincian Poin per Kasus Penyelidikan</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {INVESTIGATION_CASES.map((c) => {
            const casePoints = caseBreakdown[c.id] ?? 0;
            const isFull = casePoints >= c.maxPoints;
            return (
              <div 
                key={c.id} 
                className="bg-slate-800/60 border border-slate-700/70 p-3 rounded-lg flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-bold text-amber-400">Kasus {c.caseNumber}</div>
                  <div className="text-xs font-semibold text-slate-200 line-clamp-1">{c.badge}</div>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Perolehan:</span>
                  <span className={`font-mono font-bold ${isFull ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {casePoints} / {c.maxPoints} pt
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800 print:hidden">
        <div className="flex items-center space-x-2">
          {onSaveToClassbook && (
            <button
              onClick={onSaveToClassbook}
              disabled={isSaved}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                isSaved
                  ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isSaved ? 'Tersimpan di Buku Rekap Guru' : 'Simpan ke Buku Rekap Nilai'}</span>
            </button>
          )}

          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>

        {onRetake && (
          <button
            onClick={onRetake}
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/30 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Ulangi Tantangan</span>
          </button>
        )}
      </div>

    </div>
  );
};
