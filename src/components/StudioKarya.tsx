import React, { useState } from 'react';
import { 
  PenTool, 
  Sparkles, 
  Eye, 
  Send, 
  CheckSquare, 
  Square, 
  FileCheck, 
  BookOpen, 
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { StudentAnecdote, StudentProfile } from '../types';

interface StudioKaryaProps {
  studentProfile: StudentProfile;
  onSubmitAnecdote: (anecdote: StudentAnecdote) => void;
  onGoToGallery: () => void;
}

export const StudioKarya: React.FC<StudioKaryaProps> = ({
  studentProfile,
  onSubmitAnecdote,
  onGoToGallery,
}) => {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('Pelayanan Publik & Birokrasi');
  const [abstraction, setAbstraction] = useState('');
  const [orientation, setOrientation] = useState('');
  const [crisis, setCrisis] = useState('');
  const [reaction, setReaction] = useState('');
  const [coda, setCoda] = useState('');

  // Checklist kaidah kebahasaan
  const [hasTemporalConjunction, setHasTemporalConjunction] = useState(false);
  const [hasRhetoricalQuestion, setHasRhetoricalQuestion] = useState(false);
  const [hasActionVerb, setHasActionVerb] = useState(false);
  const [hasSatire, setHasSatire] = useState(false);

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [isSuccessSubmitted, setIsSuccessSubmitted] = useState(false);

  const TOPIC_OPTIONS = [
    'Pelayanan Publik & Birokrasi',
    'Pendidikan & Fasilitas Sekolah',
    'Lalu Lintas & Angkutan Umum',
    'Lingkungan Hidup & Sampah',
    'Kecanduan Gawai & Media Sosial',
    'Kesehatan & Antrean Rumah Sakit',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !crisis.trim() || !reaction.trim()) {
      alert('Mohon isi setidaknya Judul, bagian Krisis, dan Reaksi sebagai syarat utama teks anekdot!');
      return;
    }

    const newAnecdote: StudentAnecdote = {
      id: `anc-${Date.now()}`,
      studentName: studentProfile.name,
      className: studentProfile.className,
      title: title.trim(),
      topic,
      abstraction: abstraction.trim(),
      orientation: orientation.trim(),
      crisis: crisis.trim(),
      reaction: reaction.trim(),
      coda: coda.trim(),
      linguisticCheck: {
        hasTemporalConjunction,
        hasRhetoricalQuestion,
        hasActionVerb,
        hasSatire,
      },
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    onSubmitAnecdote(newAnecdote);
    setIsSuccessSubmitted(true);
  };

  const handleResetForm = () => {
    setTitle('');
    setAbstraction('');
    setOrientation('');
    setCrisis('');
    setReaction('');
    setCoda('');
    setHasTemporalConjunction(false);
    setHasRhetoricalQuestion(false);
    setHasActionVerb(false);
    setHasSatire(false);
    setIsSuccessSubmitted(false);
    setIsPreviewMode(false);
  };

  const wordCount = [abstraction, orientation, crisis, reaction, coda]
    .join(' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <PenTool className="w-4 h-4" />
              <span>Studio Penulisan & Pengumpulan Karya</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Studio Karya Detektif Bahasa
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Tuliskan teks anekdot orisinal Anda berdasarkan isu sosial di sekitar kita. Gunakan 5 struktur baku dan terapkan kaidah kebahasaan untuk mendapatkan penilaian karya terbaik.
            </p>
          </div>

          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center space-x-1.5"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>{isPreviewMode ? 'Mode Editor' : 'Pratinjau Berkas'}</span>
            </button>
            <button
              onClick={onGoToGallery}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-4 py-2 rounded-xl text-xs font-bold border border-amber-500/30 transition-all"
            >
              Lihat Galeri Kelas
            </button>
          </div>
        </div>
      </div>

      {isSuccessSubmitted ? (
        <div className="bg-slate-900 border-2 border-emerald-500/50 rounded-2xl p-8 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <FileCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white">Karya Anekdot Berhasil Dikumpulkan!</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Teks anekdot karya <strong>{studentProfile.name}</strong> telah masuk ke arsip berkas Galeri Karya Detektif dan siap dievaluasi oleh guru.
          </p>
          <div className="pt-4 flex justify-center space-x-3">
            <button
              onClick={onGoToGallery}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all"
            >
              Buka Galeri Karya
            </button>
            <button
              onClick={handleResetForm}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-6 py-2.5 rounded-xl text-xs border border-slate-700 transition-all"
            >
              Tulis Karya Baru
            </button>
          </div>
        </div>
      ) : isPreviewMode ? (
        /* Preview Case File Layout */
        <div className="bg-amber-50 text-slate-900 rounded-2xl p-6 sm:p-8 border-2 border-amber-300 shadow-2xl space-y-6 font-serif">
          <div className="border-b-2 border-amber-900/30 pb-4 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono tracking-widest text-amber-800 uppercase font-bold">
                BERKAS DOKUMEN ANEKDOT DETEKTIF RESMI
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-sans">
                {title || 'Tanpa Judul'}
              </h2>
            </div>
            <div className="text-right text-xs font-sans text-slate-600">
              <div className="font-bold text-slate-800">{studentProfile.name}</div>
              <div>{studentProfile.className} • No. {studentProfile.studentNumber}</div>
              <div className="text-[10px] text-amber-800 font-mono mt-0.5">{topic}</div>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed">
            {abstraction && (
              <div>
                <span className="font-sans text-[10px] font-bold text-amber-800 tracking-wider uppercase block">
                  [ 1. Abstraksi ]
                </span>
                <p>{abstraction}</p>
              </div>
            )}

            {orientation && (
              <div>
                <span className="font-sans text-[10px] font-bold text-amber-800 tracking-wider uppercase block">
                  [ 2. Orientasi ]
                </span>
                <p>{orientation}</p>
              </div>
            )}

            {crisis && (
              <div className="bg-amber-100/60 p-3 rounded-lg border-l-4 border-amber-600">
                <span className="font-sans text-[10px] font-bold text-amber-900 tracking-wider uppercase block">
                  [ 3. Krisis (Puncak Masalah) ]
                </span>
                <p className="font-semibold text-slate-950">{crisis}</p>
              </div>
            )}

            {reaction && (
              <div className="bg-amber-100/60 p-3 rounded-lg border-l-4 border-amber-600">
                <span className="font-sans text-[10px] font-bold text-amber-900 tracking-wider uppercase block">
                  [ 4. Reaksi (Penyelesaian Lucu & Menohok) ]
                </span>
                <p className="font-semibold text-slate-950">{reaction}</p>
              </div>
            )}

            {coda && (
              <div>
                <span className="font-sans text-[10px] font-bold text-amber-800 tracking-wider uppercase block">
                  [ 5. Koda (Penutup) ]
                </span>
                <p className="italic text-slate-700">{coda}</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-amber-900/20 flex items-center justify-between font-sans text-xs">
            <span className="text-slate-600">Panjang Naskah: {wordCount} kata</span>
            <button
              onClick={() => setIsPreviewMode(false)}
              className="text-amber-800 hover:text-amber-950 font-bold underline"
            >
              Kembali Mengedit
            </button>
          </div>
        </div>
      ) : (
        /* Form Editor */
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                Judul Teks Anekdot <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Lampu Merah Abadi di Perempatan Harapan"
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-1.5">
                Topik Fenomena Sosial
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none transition-all"
              >
                {TOPIC_OPTIONS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 5 Structural Fields */}
          <div className="space-y-4 pt-2">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center justify-between">
              <span>Isi 5 Bagian Struktur Anatomi Teks:</span>
              <span className="text-slate-400 font-normal font-mono">{wordCount} kata</span>
            </div>

            {/* 1. Abstraksi */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>1. Abstraksi (Pengantar Suasana Awal)</span>
                <span className="text-[10px] text-slate-500">Opsional / Sangat Baik</span>
              </label>
              <textarea
                rows={2}
                value={abstraction}
                onChange={(e) => setAbstraction(e.target.value)}
                placeholder="Contoh: Suatu hari di ruang tunggu loket pelayanan terpadu yang penuh sesak oleh warga..."
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            {/* 2. Orientasi */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                2. Orientasi (Pengenalan Tokoh, Latar, dan Awal Masalah)
              </label>
              <textarea
                rows={2}
                value={orientation}
                onChange={(e) => setOrientation(e.target.value)}
                placeholder="Contoh: Pak Joko datang membawa tumpukan map berkas untuk memperpanjang surat izin..."
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            {/* 3. Krisis */}
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center justify-between">
                <span>3. Krisis (Puncak Masalah / Keganjilan Unik) *</span>
                <span className="text-[10px] text-amber-400">Wajib Diisi</span>
              </label>
              <textarea
                rows={3}
                required
                value={crisis}
                onChange={(e) => setCrisis(e.target.value)}
                placeholder="Contoh: Petugas loket berkata santai bahwa sistem komputer mati karena tagihan wifi lupa dibayar dinas..."
                className="w-full bg-slate-950 border border-amber-500/50 focus:border-amber-400 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            {/* 4. Reaksi */}
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1 flex items-center justify-between">
                <span>4. Reaksi (Tanggapan Tokoh yang Lucu & Mengkritik) *</span>
                <span className="text-[10px] text-amber-400">Wajib Diisi</span>
              </label>
              <textarea
                rows={3}
                required
                value={reaction}
                onChange={(e) => setReaction(e.target.value)}
                placeholder="Contoh: Pak Joko tersenyum getir lalu menawarkan tethering kuota HP miliknya demi stempel dinas..."
                className="w-full bg-slate-950 border border-amber-500/50 focus:border-amber-400 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>

            {/* 5. Koda */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>5. Koda (Penutup / Refleksi Moral Cerita)</span>
                <span className="text-[10px] text-slate-500">Opsional</span>
              </label>
              <textarea
                rows={2}
                value={coda}
                onChange={(e) => setCoda(e.target.value)}
                placeholder="Contoh: Sejak hari itu, warga yang datang ke kantor tersebut selalu membawa powerbank dan modem sendiri."
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Self-Assessment Kaidah Kebahasaan Checklist */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <CheckSquare className="w-4 h-4 text-amber-400" />
              <span>Verifikasi Mandiri Kaidah Kebahasaan Detektif:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <label 
                className="flex items-center space-x-2 text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-900 transition-colors"
                onClick={() => setHasTemporalConjunction(!hasTemporalConjunction)}
              >
                {hasTemporalConjunction ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span>Menggunakan konjungsi temporal (lalu, kemudian, setelah itu)</span>
              </label>

              <label 
                className="flex items-center space-x-2 text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-900 transition-colors"
                onClick={() => setHasRhetoricalQuestion(!hasRhetoricalQuestion)}
              >
                {hasRhetoricalQuestion ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span>Menggunakan pertanyaan retoris untuk menyindir</span>
              </label>

              <label 
                className="flex items-center space-x-2 text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-900 transition-colors"
                onClick={() => setHasActionVerb(!hasActionVerb)}
              >
                {hasActionVerb ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span>Menggunakan kata kerja aksi (berlari, melempar, menepis)</span>
              </label>

              <label 
                className="flex items-center space-x-2 text-slate-300 cursor-pointer p-2 rounded-lg hover:bg-slate-900 transition-colors"
                onClick={() => setHasSatire(!hasSatire)}
              >
                {hasSatire ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500" />
                )}
                <span>Mengandung sindiran halus (ironi/sinisme) terhadap masalah sosial</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setIsPreviewMode(true)}
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl text-xs font-bold border border-slate-700 transition-all flex items-center justify-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Pratinjau Dokumen Berkas</span>
            </button>

            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black px-7 py-2.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Kumpulkan & Terbitkan ke Galeri</span>
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
