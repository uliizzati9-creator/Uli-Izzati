import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Layers, 
  Code, 
  PenTool, 
  CheckCircle, 
  HelpCircle, 
  ArrowRight, 
  Lightbulb,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { LEARNING_MATERIALS } from '../data/learningMaterials';

interface RuangBelajarProps {
  onStartInvestigation: () => void;
}

export const RuangBelajar: React.FC<RuangBelajarProps> = ({ onStartInvestigation }) => {
  const [activeSectionId, setActiveSectionId] = useState<string>(LEARNING_MATERIALS[0].id);

  const currentSection = LEARNING_MATERIALS.find((m) => m.id === activeSectionId) || LEARNING_MATERIALS[0];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950/40 border border-amber-500/30 rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl">
        <div className="max-w-3xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Markas Doktrin Detektif Bahasa</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ruang Belajar: Menguasai Rahasia Teks Anekdot
          </h1>
          <p className="mt-2 text-slate-300 text-sm sm:text-base leading-relaxed">
            Selamat datang di Markas Pelatihan Sekolah Rahasia Pemburu Bahasa. Pelajari anatomi struktur, senjata kaidah kebahasaan, dan taktik kritik cerdas sebelum turun ke Ruang Investigasi Kasus!
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onStartInvestigation}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center space-x-2 text-sm transition-all"
            >
              <span>Langsung ke Ruang Investigasi</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-xs text-amber-400/90 font-mono flex items-center gap-1.5 bg-slate-950/60 px-3 py-2 rounded-xl border border-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Target KKTP: 75 / 100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {LEARNING_MATERIALS.map((mat) => {
          const isActive = mat.id === activeSectionId;
          return (
            <button
              key={mat.id}
              onClick={() => setActiveSectionId(mat.id)}
              className={`p-4 rounded-xl text-left border transition-all relative ${
                isActive
                  ? 'bg-amber-500/15 border-amber-500 text-white shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-bold text-amber-400">MODUL {mat.number}</span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                  {mat.badge}
                </span>
              </div>
              <h3 className="font-bold text-sm text-slate-100">{mat.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{mat.summary}</p>
            </button>
          );
        })}
      </div>

      {/* Active Module Content Display */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
        
        <div className="border-b border-slate-800 pb-4">
          <div className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            Materi Pelatihan Detektif • Modul {currentSection.number}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {currentSection.title}
          </h2>
          <p className="text-sm text-slate-300 mt-1">{currentSection.summary}</p>
        </div>

        {/* Content Blocks */}
        <div className="space-y-8">
          {currentSection.content.map((block, idx) => (
            <div key={idx} className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-amber-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
                <span>{block.heading}</span>
              </h3>

              <div className="space-y-2 text-slate-300 text-sm leading-relaxed">
                {block.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Key points cards if available */}
              {block.keyPoints && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {block.keyPoints.map((kp, kpIdx) => (
                    <div 
                      key={kpIdx}
                      className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 hover:border-amber-500/40 transition-all"
                    >
                      <div className="font-bold text-amber-400 text-sm">{kp.term}</div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">{kp.explanation}</p>
                      {kp.example && (
                        <div className="mt-2 text-[11px] font-mono text-cyan-300 bg-cyan-950/30 p-2 rounded border border-cyan-900/40">
                          Contoh: {kp.example}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Example Box */}
              {block.exampleBox && (
                <div className="bg-slate-950 border border-amber-500/30 rounded-xl p-5 space-y-3 mt-4">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <Lightbulb className="w-4 h-4" />
                    <span>{block.exampleBox.title}</span>
                  </div>
                  <div className="space-y-1.5 pl-3 border-l-2 border-amber-500/40 italic text-slate-200 text-sm">
                    {block.exampleBox.body.map((line, lIdx) => (
                      <p key={lIdx}>{line}</p>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-slate-800 text-xs text-emerald-400 font-medium">
                    🔍 <strong>Analisis Detektif:</strong> {block.exampleBox.analysis}
                  </div>
                </div>
              )}

              {/* Detective Tip */}
              {block.detectiveTip && (
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start space-x-3 text-amber-200 text-xs">
                  <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300">Catatan Khusus Detektif:</strong> {block.detectiveTip}
                  </div>
                </div>
              )}

            </div>
          ))}
        </div>

        {/* Visual 5-Structure Diagram for Module 2 */}
        {currentSection.id === 'struktur-teks' && (
          <div className="mt-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">
              Bagan Alir 5 Struktur Teks Anekdot
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                <div className="font-mono text-amber-400 font-bold">1. ABSTRAKSI</div>
                <div className="text-[11px] text-slate-400 mt-1">Pengantar suasana awal</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                <div className="font-mono text-amber-400 font-bold">2. ORIENTASI</div>
                <div className="text-[11px] text-slate-400 mt-1">Pengenalan tokoh & latar</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500 text-white font-bold shadow-md shadow-amber-500/10">
                <div className="font-mono text-amber-300 font-bold">3. KRISIS ⚡</div>
                <div className="text-[11px] text-amber-200 mt-1">Puncak keganjilan / masalah</div>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500 text-white font-bold shadow-md shadow-amber-500/10">
                <div className="font-mono text-amber-300 font-bold">4. REAKSI 🎭</div>
                <div className="text-[11px] text-amber-200 mt-1">Respons menggelitik tokoh</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700">
                <div className="font-mono text-amber-400 font-bold">5. KODA</div>
                <div className="text-[11px] text-slate-400 mt-1">Penutup / simpulan moral</div>
              </div>
            </div>
          </div>
        )}

        {/* CTA to Investigation */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Sudah memahami materi ini? Lanjutkan penyelidikan untuk mengumpulkan poin pengetahuan.
          </div>
          <button
            onClick={onStartInvestigation}
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center space-x-2 text-sm transition-all"
          >
            <span>Buka Berkas Investigasi</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
