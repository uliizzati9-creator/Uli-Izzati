import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  Heart, 
  Download, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  Filter, 
  Search, 
  Calendar, 
  User, 
  Settings2,
  FileSpreadsheet,
  ChevronDown,
  Trash2
} from 'lucide-react';
import { ScoreAssessment, StudentAnecdote, AssessmentConfig } from '../types';
import { ScoreResultCard } from './ScoreResultCard';

interface GaleriDanRekapProps {
  anecdotes: StudentAnecdote[];
  assessments: ScoreAssessment[];
  config: AssessmentConfig;
  onUpdateConfig: (newConfig: AssessmentConfig) => void;
  onLikeAnecdote: (anecdoteId: string) => void;
  onDeleteAssessment?: (index: number) => void;
}

export const GaleriDanRekap: React.FC<GaleriDanRekapProps> = ({
  anecdotes,
  assessments,
  config,
  onUpdateConfig,
  onLikeAnecdote,
  onDeleteAssessment,
}) => {
  const [subTab, setSubTab] = useState<'rekap' | 'galeri'>('rekap');
  const [filterStatus, setFilterStatus] = useState<'all' | 'achieved' | 'unachieved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssessmentForModal, setSelectedAssessmentForModal] = useState<ScoreAssessment | null>(null);

  // Filtered assessments
  const filteredAssessments = assessments.filter((item) => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.className.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filterStatus === 'achieved') return item.isAchieved;
    if (filterStatus === 'unachieved') return !item.isAchieved;
    return true;
  });

  // Analytics for the teacher
  const totalCount = assessments.length;
  const achievedCount = assessments.filter((a) => a.isAchieved).length;
  const unachievedCount = totalCount - achievedCount;
  const achievementRate = totalCount > 0 ? Math.round((achievedCount / totalCount) * 100) : 0;
  const averageScore = totalCount > 0 
    ? Math.round((assessments.reduce((sum, a) => sum + a.knowledgeScore, 0) / totalCount) * 10) / 10 
    : 0;

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      'No',
      'Nama Peserta Didik',
      'Kelas',
      'No. Absen',
      'Poin Diperoleh',
      'Poin Maksimal Acuan',
      'Nilai Pengetahuan (0-100)',
      'KKTP',
      'Status Ketercapaian',
      'Tanggal Evaluasi'
    ];

    const rows = assessments.map((item, idx) => [
      idx + 1,
      `"${item.studentName.replace(/"/g, '""')}"`,
      `"${item.className}"`,
      `"${item.studentNumber}"`,
      item.pointsEarned,
      item.maxPoints,
      item.knowledgeScore,
      item.kktp,
      item.isAchieved ? 'Tercapai' : 'Belum Tercapai',
      `"${new Date(item.evaluatedAt).toLocaleString('id-ID')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + 
      [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_Anekdot_Detective_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Award className="w-4 h-4" />
              <span>Arsip Penilaian & Karya Peserta Didik</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Galeri Karya & Buku Rekap Nilai Guru
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Memantau hasil konversi otomatis nilai pembelajaran skala 0–100 berdasarkan KKTP 75 dan membaca teks anekdot orisinal para peserta didik.
            </p>
          </div>

          {/* Subtab Switcher */}
          <div className="flex items-center bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setSubTab('rekap')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                subTab === 'rekap'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Buku Rekap Nilai Guru ({assessments.length})
            </button>
            <button
              onClick={() => setSubTab('galeri')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                subTab === 'galeri'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Galeri Teks Anekdot ({anecdotes.length})
            </button>
          </div>
        </div>
      </div>

      {/* SUBTAB 1: REKAP NILAI GURU */}
      {subTab === 'rekap' && (
        <div className="space-y-6">
          
          {/* Class Statistics Summary Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Peserta Terdaftar</div>
              <div className="text-2xl sm:text-3xl font-black text-white mt-1">{totalCount} Siswa</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Tersimpan di sistem</div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Rata-rata Nilai Kelas</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">{averageScore}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Skala 0–100</div>
            </div>

            <div className="bg-slate-900 border border-emerald-500/30 p-4 rounded-xl bg-emerald-950/20">
              <div className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold">Mencapai KKTP (≥ 75)</div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1">{achievedCount} Siswa</div>
              <div className="text-[10px] text-emerald-400/80 mt-0.5">Tingkat Tuntas: {achievementRate}%</div>
            </div>

            <div className="bg-slate-900 border border-rose-500/30 p-4 rounded-xl bg-rose-950/20">
              <div className="text-[10px] text-rose-400 uppercase tracking-wider font-semibold">Belum Mencapai KKTP (&lt; 75)</div>
              <div className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">{unachievedCount} Siswa</div>
              <div className="text-[10px] text-rose-400/80 mt-0.5">Perlu Pengayaan / Remedial</div>
            </div>
          </div>

          {/* Benchmark Setting & Filter Controls */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Search & Status Filter */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama atau kelas..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 py-1 rounded-lg font-medium ${
                    filterStatus === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setFilterStatus('achieved')}
                  className={`px-3 py-1 rounded-lg font-medium ${
                    filterStatus === 'achieved' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-emerald-400'
                  }`}
                >
                  Tercapai
                </button>
                <button
                  onClick={() => setFilterStatus('unachieved')}
                  className={`px-3 py-1 rounded-lg font-medium ${
                    filterStatus === 'unachieved' ? 'bg-rose-500 text-slate-950 font-bold' : 'text-rose-400'
                  }`}
                >
                  Belum Tercapai
                </button>
              </div>
            </div>

            {/* Benchmark Switcher & Export */}
            <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
              
              {/* Benchmark Option */}
              <div className="flex items-center space-x-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
                <Settings2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-400">Acuan Maks:</span>
                <select
                  value={config.maxPointsBenchmark}
                  onChange={(e) => onUpdateConfig({ ...config, maxPointsBenchmark: Number(e.target.value) })}
                  className="bg-transparent text-amber-300 font-bold focus:outline-none cursor-pointer"
                >
                  <option value={200} className="bg-slate-900 text-white">200 Poin (Standar 5 Kasus)</option>
                  <option value={170} className="bg-slate-900 text-white">170 Poin (Acuan Fleksibel)</option>
                </select>
              </div>

              <button
                onClick={handleExportCSV}
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition-all shadow-md shadow-emerald-600/10"
                title="Ekspor Rekap ke file CSV / Excel"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={handlePrint}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center space-x-1"
                title="Cetak lembar rekap"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak</span>
              </button>
            </div>

          </div>

          {/* Table of Assessments */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Nama Peserta Didik</th>
                    <th className="py-3 px-4">Kelas & Absen</th>
                    <th className="py-3 px-4 text-center">Poin Diperoleh</th>
                    <th className="py-3 px-4 text-center">Poin Maks.</th>
                    <th className="py-3 px-4 text-center">Nilai (0–100)</th>
                    <th className="py-3 px-4 text-center">KKTP</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-200">
                  {filteredAssessments.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-500">
                        Tidak ada data penilaian yang cocok dengan kriteria pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredAssessments.map((row, idx) => (
                      <tr 
                        key={idx}
                        className="hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-3.5 px-4 font-mono text-slate-400">{idx + 1}</td>
                        <td className="py-3.5 px-4 font-bold text-white flex items-center space-x-2">
                          <User className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                          <span>{row.studentName}</span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {row.className} (No. {row.studentNumber})
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-amber-400">
                          {row.pointsEarned} pt
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono text-slate-400">
                          {row.maxPoints} pt
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`font-mono text-sm font-black px-2 py-0.5 rounded ${
                            row.isAchieved 
                              ? 'text-emerald-300 bg-emerald-950/60 border border-emerald-500/30' 
                              : 'text-rose-300 bg-rose-950/60 border border-rose-500/30'
                          }`}>
                            {row.knowledgeScore}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono text-slate-300">
                          {row.kktp}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                            row.isAchieved
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40'
                              : 'bg-rose-500/15 text-rose-300 border border-rose-500/40'
                          }`}>
                            {row.isAchieved ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            ) : (
                              <XCircle className="w-3.5 h-3.5 text-rose-400" />
                            )}
                            <span>{row.isAchieved ? 'Tercapai' : 'Belum Tercapai'}</span>
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={() => setSelectedAssessmentForModal(row)}
                            className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold border border-amber-500/30 transition-all"
                          >
                            Rapor
                          </button>
                          {onDeleteAssessment && (
                            <button
                              onClick={() => onDeleteAssessment(idx)}
                              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 transition-colors"
                              title="Hapus baris"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-950/60 border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div>
                Rumus Terpilih: <code className="text-amber-300 font-mono">(Poin ÷ {config.maxPointsBenchmark}) × 100</code> • Batas KKTP: <strong className="text-amber-300">{config.kktp}</strong>
              </div>
              <div>
                Data otomatis diperbarui dan tersimpan permanen di peramban (localStorage).
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SUBTAB 2: GALERI ANEKDOT SISWA */}
      {subTab === 'galeri' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Arsip Berkas Karya Teks Anekdot Detektif</h2>
              <p className="text-xs text-slate-400">Kumpulan teks anekdot yang telah diunggah oleh siswa pemburu bahasa</p>
            </div>
            <div className="text-xs text-amber-400 font-mono">
              {anecdotes.length} Berkas Diterbitkan
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {anecdotes.map((anc) => (
              <div 
                key={anc.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-amber-500/40 transition-all shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 uppercase">
                      {anc.topic}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(anc.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{anc.title}</h3>

                  <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-serif">
                    {anc.abstraction && (
                      <p className="italic text-slate-400">"{anc.abstraction}"</p>
                    )}
                    {anc.orientation && (
                      <p>{anc.orientation}</p>
                    )}
                    <div className="bg-amber-500/10 border-l-2 border-amber-500 p-2.5 rounded text-amber-100 font-sans">
                      <span className="font-bold text-[10px] uppercase text-amber-300 block mb-0.5">Krisis & Reaksi:</span>
                      <p className="mb-1 font-medium">{anc.crisis}</p>
                      <p className="font-semibold text-amber-200">{anc.reaction}</p>
                    </div>
                    {anc.coda && (
                      <p className="italic text-slate-400">{anc.coda}</p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-slate-400">
                    Oleh: <strong className="text-slate-200">{anc.studentName}</strong> ({anc.className})
                  </div>

                  <button
                    onClick={() => onLikeAnecdote(anc.id)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500/50" />
                    <span className="font-bold">{anc.likes} Apresiasi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal View for Individual Report */}
      {selectedAssessmentForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="max-w-3xl w-full my-8">
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setSelectedAssessmentForModal(null)}
                className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold"
              >
                Tutup Lembar Rapor
              </button>
            </div>
            <ScoreResultCard assessment={selectedAssessmentForModal} />
          </div>
        </div>
      )}

    </div>
  );
};
