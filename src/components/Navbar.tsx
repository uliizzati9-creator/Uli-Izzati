import React from 'react';
import { 
  ShieldAlert, 
  BookOpen, 
  Search, 
  PenTool, 
  Award, 
  FlaskConical, 
  Github, 
  UserCheck,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { StudentProfile } from '../types';
import { calculateKnowledgeScore } from '../utils/scoreCalculator';

interface NavbarProps {
  activeTab: 'belajar' | 'investigasi' | 'studio' | 'rekap' | 'simulator' | 'panduan';
  setActiveTab: (tab: 'belajar' | 'investigasi' | 'studio' | 'rekap' | 'simulator' | 'panduan') => void;
  studentProfile: StudentProfile;
  pointsEarned: number;
  maxPoints: number;
  kktp: number;
  onOpenProfileModal: () => void;
  onOpenSimulator: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  studentProfile,
  pointsEarned,
  maxPoints,
  kktp,
  onOpenProfileModal,
  onOpenSimulator,
  onOpenGuide,
}) => {
  const result = calculateKnowledgeScore(pointsEarned, maxPoints, kktp);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/30 shadow-lg text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('belajar')}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center shadow-md shadow-amber-500/20 border border-amber-400/40 text-slate-950 font-bold">
              <ShieldAlert className="w-7 h-7 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  Anekdot Detective
                </span>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                  KKTP {kktp}
                </span>
              </div>
              <p className="text-xs text-amber-400/80 font-medium tracking-wide">
                Sekolah Rahasia Pemburu Bahasa
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('belajar')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'belajar'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Ruang Belajar</span>
            </button>

            <button
              onClick={() => setActiveTab('investigasi')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'investigasi'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Ruang Investigasi</span>
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'studio'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>Studio Karya</span>
            </button>

            <button
              onClick={() => setActiveTab('rekap')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'rekap'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Galeri & Rekap Nilai</span>
            </button>

            <button
              onClick={onOpenSimulator}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/30 transition-all"
              title="Simulator & Kalkulator Uji Rumus KKTP"
            >
              <FlaskConical className="w-4 h-4 text-emerald-400" />
              <span>Lab Uji Rumus</span>
            </button>

            <button
              onClick={onOpenGuide}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/30 transition-all"
              title="Panduan Kode & GitHub Pages"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              <span>Panduan GitHub</span>
            </button>
          </nav>

          {/* Student Status & Score Live Badge */}
          <div className="flex items-center space-x-3">
            {/* Live Score Pill */}
            <div 
              onClick={() => setActiveTab('investigasi')}
              className="cursor-pointer bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-700 flex items-center space-x-3 hover:border-amber-500/50 transition-all"
              title="Klik untuk membuka Ruang Investigasi & Hasil Penilaian"
            >
              <div className="text-right">
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                  Poin: <span className="text-amber-400 font-bold">{pointsEarned}</span> / {maxPoints}
                </div>
                <div className="text-sm font-extrabold flex items-center justify-end space-x-1.5">
                  <span className="text-white">Nilai:</span>
                  <span className={result.isAchieved ? "text-emerald-400" : "text-amber-400"}>
                    {result.knowledgeScore}
                  </span>
                  <span className="text-[10px] font-normal text-slate-400">/100</span>
                </div>
              </div>

              <div className={`flex items-center justify-center p-1.5 rounded-lg text-xs font-bold ${
                result.isAchieved 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}>
                {result.isAchieved ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400" />
                )}
              </div>
            </div>

            {/* Profile Avatar / Trigger */}
            <button
              onClick={onOpenProfileModal}
              className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-xl border border-slate-700 transition-all text-left"
              title="Ubah Data Siswa / Profil Detektif"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs border border-amber-500/30">
                <UserCheck className="w-4 h-4" />
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-slate-200 truncate max-w-[110px]">
                  {studentProfile.name.split(' ')[0]}
                </div>
                <div className="text-[10px] text-slate-400">
                  {studentProfile.className} ({studentProfile.studentNumber})
                </div>
              </div>
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-between py-2 border-t border-slate-800 overflow-x-auto space-x-2 text-xs">
          <button
            onClick={() => setActiveTab('belajar')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'belajar' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Belajar
          </button>
          <button
            onClick={() => setActiveTab('investigasi')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'investigasi' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Investigasi ({pointsEarned} pt)
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'studio' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Studio Karya
          </button>
          <button
            onClick={() => setActiveTab('rekap')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap ${
              activeTab === 'rekap' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-300'
            }`}
          >
            Rekap & Galeri
          </button>
          <button
            onClick={onOpenSimulator}
            className="px-2.5 py-1.5 rounded-lg font-medium text-emerald-400 border border-emerald-500/30 whitespace-nowrap"
          >
            Lab Rumus
          </button>
          <button
            onClick={onOpenGuide}
            className="px-2.5 py-1.5 rounded-lg font-medium text-cyan-400 border border-cyan-500/30 whitespace-nowrap"
          >
            GitHub
          </button>
        </div>

      </div>
    </header>
  );
};
