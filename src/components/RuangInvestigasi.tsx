import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  ChevronRight, 
  ArrowLeft, 
  FileText, 
  Sparkles,
  Lock,
  Unlock,
  AlertTriangle,
  Zap,
  RotateCcw
} from 'lucide-react';
import { InvestigationCase, ScoreAssessment, StudentProfile } from '../types';
import { INVESTIGATION_CASES, TOTAL_INVESTIGATION_MAX_POINTS } from '../data/investigationCases';
import { calculateKnowledgeScore } from '../utils/scoreCalculator';
import { ScoreResultCard } from './ScoreResultCard';

interface RuangInvestigasiProps {
  studentProfile: StudentProfile;
  userAnswers: { [questionId: string]: string };
  onAnswerQuestion: (questionId: string, optionId: string, pointsAwarded: number, caseId: string) => void;
  casePoints: { [caseId: string]: number };
  totalPointsEarned: number;
  maxPointsBenchmark: number;
  kktp: number;
  onResetInvestigation: () => void;
  onSaveAssessmentToRecord: (assessment: ScoreAssessment) => void;
  isAssessmentSaved: boolean;
}

export const RuangInvestigasi: React.FC<RuangInvestigasiProps> = ({
  studentProfile,
  userAnswers,
  onAnswerQuestion,
  casePoints,
  totalPointsEarned,
  maxPointsBenchmark,
  kktp,
  onResetInvestigation,
  onSaveAssessmentToRecord,
  isAssessmentSaved,
}) => {
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [showClue, setShowClue] = useState<boolean>(false);
  const [showReportCard, setShowReportCard] = useState<boolean>(false);

  const activeCase = INVESTIGATION_CASES.find((c) => c.id === activeCaseId) || null;
  const currentQuestion = activeCase ? activeCase.questions[activeQuestionIdx] : null;

  // Real-time score computation
  const liveResult = calculateKnowledgeScore(totalPointsEarned, maxPointsBenchmark, kktp);

  // Check how many questions answered total
  const totalQuestions = INVESTIGATION_CASES.reduce((sum, c) => sum + c.questions.length, 0);
  const answeredCount = Object.keys(userAnswers).length;
  const isAllAnswered = answeredCount >= totalQuestions;

  // Prepare current assessment object
  const currentAssessment: ScoreAssessment = {
    studentName: studentProfile.name,
    className: studentProfile.className,
    studentNumber: studentProfile.studentNumber,
    pointsEarned: totalPointsEarned,
    maxPoints: maxPointsBenchmark,
    knowledgeScore: liveResult.knowledgeScore,
    kktp: kktp,
    isAchieved: liveResult.isAchieved,
    caseBreakdown: casePoints,
    evaluatedAt: new Date().toISOString(),
  };

  const handleSelectCase = (caseId: string) => {
    setActiveCaseId(caseId);
    setActiveQuestionIdx(0);
    setShowClue(false);
  };

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion || !activeCase) return;
    const selectedOption = currentQuestion.options.find((o) => o.id === optionId);
    if (!selectedOption) return;

    const awarded = selectedOption.isCorrect ? currentQuestion.points : 0;
    onAnswerQuestion(currentQuestion.id, optionId, awarded, activeCase.id);
  };

  const handleNextQuestion = () => {
    if (!activeCase) return;
    if (activeQuestionIdx < activeCase.questions.length - 1) {
      setActiveQuestionIdx((prev) => prev + 1);
      setShowClue(false);
    } else {
      // Completed case, return to list or show report
      setActiveCaseId(null);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIdx > 0) {
      setActiveQuestionIdx((prev) => prev - 1);
      setShowClue(false);
    }
  };

  // Quick preset loader for teachers / testing
  const handleQuickPreset = (presetScore: '170' | '200' | '150' | '130') => {
    if (presetScore === '170') {
      // 170 points from 200 = 85 (Tercapai)
      // Answer 17 questions correctly (17 * 10 = 170)
      let count = 0;
      INVESTIGATION_CASES.forEach((c) => {
        c.questions.forEach((q) => {
          if (count < 17) {
            const correctOpt = q.options.find((o) => o.isCorrect);
            if (correctOpt) {
              onAnswerQuestion(q.id, correctOpt.id, 10, c.id);
            }
            count++;
          } else {
            const wrongOpt = q.options.find((o) => !o.isCorrect);
            if (wrongOpt) {
              onAnswerQuestion(q.id, wrongOpt.id, 0, c.id);
            }
          }
        });
      });
    } else if (presetScore === '200') {
      // All correct (200 / 200 = 100)
      INVESTIGATION_CASES.forEach((c) => {
        c.questions.forEach((q) => {
          const correctOpt = q.options.find((o) => o.isCorrect);
          if (correctOpt) {
            onAnswerQuestion(q.id, correctOpt.id, 10, c.id);
          }
        });
      });
    } else if (presetScore === '150') {
      // 150 points from 200 = 75 (Tepat KKTP)
      let count = 0;
      INVESTIGATION_CASES.forEach((c) => {
        c.questions.forEach((q) => {
          if (count < 15) {
            const correctOpt = q.options.find((o) => o.isCorrect);
            if (correctOpt) {
              onAnswerQuestion(q.id, correctOpt.id, 10, c.id);
            }
            count++;
          } else {
            const wrongOpt = q.options.find((o) => !o.isCorrect);
            if (wrongOpt) {
              onAnswerQuestion(q.id, wrongOpt.id, 0, c.id);
            }
          }
        });
      });
    } else if (presetScore === '130') {
      // 130 points from 200 = 65 (Belum Tercapai)
      let count = 0;
      INVESTIGATION_CASES.forEach((c) => {
        c.questions.forEach((q) => {
          if (count < 13) {
            const correctOpt = q.options.find((o) => o.isCorrect);
            if (correctOpt) {
              onAnswerQuestion(q.id, correctOpt.id, 10, c.id);
            }
            count++;
          } else {
            const wrongOpt = q.options.find((o) => !o.isCorrect);
            if (wrongOpt) {
              onAnswerQuestion(q.id, wrongOpt.id, 0, c.id);
            }
          }
        });
      });
    }
    setShowReportCard(true);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner & Live Assessment Monitor */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          <div>
            <div className="inline-flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-2">
              <Search className="w-4 h-4" />
              <span>Biro Penyelidikan Sekolah Rahasia Pemburu Bahasa</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ruang Investigasi Kasus Teks Anekdot
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Pecahkan 5 berkas kasus teks anekdot untuk mengumpulkan poin. Setiap jawaban yang tepat bernilai 10 poin. Poin Anda otomatis dikonversi menjadi Nilai Pengetahuan Skala 0–100 berdasarkan KKTP 75.
            </p>
          </div>

          {/* Live Progress Card */}
          <div className="bg-slate-950 border border-amber-500/40 p-4 rounded-xl flex items-center space-x-5 flex-shrink-0">
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Poin Investigasi</div>
              <div className="text-2xl font-black text-amber-400 flex items-baseline gap-1">
                <span>{totalPointsEarned}</span>
                <span className="text-xs text-slate-500 font-normal">/ {maxPointsBenchmark}</span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {answeredCount} dari {totalQuestions} soal terjawab
              </div>
            </div>

            <div className="h-10 w-[1px] bg-slate-800"></div>

            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase">Nilai Skala 0-100</div>
              <div className="text-2xl font-black text-white flex items-baseline gap-1">
                <span className={liveResult.isAchieved ? "text-emerald-400" : "text-amber-400"}>
                  {liveResult.knowledgeScore}
                </span>
                <span className="text-xs text-slate-500 font-normal">/ 100</span>
              </div>
              <div className={`text-[10px] font-bold mt-0.5 ${liveResult.isAchieved ? 'text-emerald-400' : 'text-rose-400'}`}>
                {liveResult.statusLabel} (KKTP {kktp})
              </div>
            </div>

            <button
              onClick={() => setShowReportCard(true)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-3 py-2 rounded-lg text-xs flex items-center space-x-1.5 shadow-md shadow-amber-500/10 transition-all self-stretch justify-center flex-col sm:flex-row"
              title="Lihat Lembar Nilai Resmi Sekarang"
            >
              <FileText className="w-4 h-4" />
              <span>Rapor Nilai</span>
            </button>
          </div>

        </div>

        {/* Quick Testing Bar for Teachers */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2 text-slate-400">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-slate-300">Simulasi Cepat Guru:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleQuickPreset('170')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 transition-all"
              title="Uji 170 poin dari 200 = Nilai 85 (Tercapai)"
            >
              Uji 170 Poin (Nilai 85)
            </button>
            <button
              onClick={() => handleQuickPreset('200')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/30 transition-all"
              title="Uji 200 poin dari 200 = Nilai 100 (Tercapai)"
            >
              Uji 200 Poin (Nilai 100)
            </button>
            <button
              onClick={() => handleQuickPreset('150')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition-all"
              title="Uji 150 poin dari 200 = Nilai Tepat 75 (Tercapai)"
            >
              Uji 150 Poin (Nilai 75)
            </button>
            <button
              onClick={() => handleQuickPreset('130')}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-rose-300 border border-rose-500/30 transition-all"
              title="Uji 130 poin dari 200 = Nilai 65 (Belum Tercapai)"
            >
              Uji 130 Poin (Nilai 65)
            </button>
            <button
              onClick={onResetInvestigation}
              className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 border border-slate-800 transition-all flex items-center space-x-1"
              title="Reset Semua Jawaban"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* Show Report Card Modal if toggled */}
      {showReportCard && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowReportCard(false)}
              className="flex items-center space-x-2 text-xs font-bold text-amber-400 hover:text-amber-300 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ke Berkas Soal</span>
            </button>
            <span className="text-xs text-slate-400">
              Evaluasi Resmi Berdasarkan Rumus: Nilai = (Poin ÷ {maxPointsBenchmark}) × 100
            </span>
          </div>

          <ScoreResultCard
            assessment={currentAssessment}
            onRetake={() => {
              onResetInvestigation();
              setShowReportCard(false);
            }}
            onSaveToClassbook={() => onSaveAssessmentToRecord(currentAssessment)}
            isSaved={isAssessmentSaved}
          />
        </div>
      )}

      {/* Main Investigation Workflow */}
      {!showReportCard && (
        <>
          {/* If NO active case selected, show Case Selection Grid */}
          {!activeCase && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Daftar Berkas Kasus Penyelidikan</h2>
                  <p className="text-xs text-slate-400">Pilih salah satu berkas kasus untuk memulai analisis</p>
                </div>
                <div className="text-xs font-mono text-amber-400">
                  Total Acuan: {TOTAL_INVESTIGATION_MAX_POINTS} Poin Maksimal
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {INVESTIGATION_CASES.map((c) => {
                  const points = casePoints[c.id] || 0;
                  const answeredInCase = c.questions.filter((q) => userAnswers[q.id]).length;
                  const isCompleted = answeredInCase === c.questions.length;

                  return (
                    <div
                      key={c.id}
                      onClick={() => handleSelectCase(c.id)}
                      className={`cursor-pointer bg-slate-900 border rounded-2xl p-5 flex flex-col justify-between transition-all hover:scale-[1.02] shadow-lg ${
                        isCompleted
                          ? 'border-emerald-500/40 hover:border-emerald-400'
                          : 'border-slate-800 hover:border-amber-500/50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-mono font-bold text-amber-400 px-2 py-0.5 rounded bg-slate-950 border border-slate-800">
                            {c.codeName}
                          </span>
                          <span className="text-xs font-bold text-slate-300">
                            {c.maxPoints} pt
                          </span>
                        </div>

                        <h3 className="font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                          {c.title}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                          {c.description}
                        </p>

                        <div className="mt-3 text-[11px] text-amber-300/80 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20">
                          🎯 <strong>Kompetensi:</strong> {c.targetCompetency}
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1.5">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                          )}
                          <span className="text-slate-300">
                            {points} / {c.maxPoints} poin diperoleh
                          </span>
                        </div>

                        <span className="text-amber-400 font-bold flex items-center gap-1">
                          <span>{isCompleted ? 'Tinjau' : 'Buka Kasus'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Complete Assessment Trigger Banner */}
              <div className="bg-gradient-to-r from-amber-500/20 via-slate-900 to-slate-900 border border-amber-500/40 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>Siap Melihat Rapor Penilaian Otomatis?</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Sistem akan menghitung nilai pengetahuan dengan rumus: <code className="text-amber-300 font-mono">(Poin ÷ {maxPointsBenchmark}) × 100</code> dan menentukan status ketercapaian KKTP 75.
                  </p>
                </div>

                <button
                  onClick={() => setShowReportCard(true)}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20 transition-all flex-shrink-0"
                >
                  <FileText className="w-4 h-4" />
                  <span>Buka Lembar Hasil Penilaian</span>
                </button>
              </div>

            </div>
          )}

          {/* If an active case is selected, show Interactive Question Challenge */}
          {activeCase && currentQuestion && (
            <div className="bg-slate-900 border border-amber-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
              
              {/* Case Navigation Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4 gap-3">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setActiveCaseId(null)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                    title="Kembali ke Daftar Kasus"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                      Kasus {activeCase.caseNumber}: {activeCase.codeName}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-white">
                      {activeCase.title}
                    </h2>
                  </div>
                </div>

                {/* Question index tabs */}
                <div className="flex items-center space-x-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
                  {activeCase.questions.map((q, idx) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isActive = idx === activeQuestionIdx;
                    return (
                      <button
                        key={q.id}
                        onClick={() => {
                          setActiveQuestionIdx(idx);
                          setShowClue(false);
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-amber-500 text-slate-950'
                            : isAnswered
                            ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question Header & Points */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                  {currentQuestion.title}
                </span>
                <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-md">
                  Bobot: {currentQuestion.points} Poin
                </span>
              </div>

              {/* Scenario Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 relative overflow-hidden">
                <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2">
                  Petunjuk Skenario / Bukti Perkara:
                </div>
                <div className="text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif italic">
                  "{currentQuestion.scenario}"
                </div>
              </div>

              {/* Clue button */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowClue(!showClue)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center space-x-1.5 transition-all"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>{showClue ? 'Sembunyikan Petunjuk Detektif' : 'Buka Petunjuk Detektif (Clue)'}</span>
                </button>

                {showClue && (
                  <div className="mt-2 p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 animate-fade-in flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Petunjuk Investigasi:</strong> {currentQuestion.clue}
                    </div>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
                  Pilih Analisis Paling Tepat:
                </div>

                {currentQuestion.options.map((option) => {
                  const isSelected = userAnswers[currentQuestion.id] === option.id;
                  const hasAnswered = !!userAnswers[currentQuestion.id];

                  let optionStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';

                  if (hasAnswered) {
                    if (option.isCorrect) {
                      optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-500/10';
                    } else if (isSelected && !option.isCorrect) {
                      optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      optionStyle = 'opacity-50 border-slate-800 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(option.id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${optionStyle}`}
                    >
                      <div className="text-sm font-medium leading-relaxed">
                        {option.text}
                      </div>

                      {hasAnswered && (
                        <div className="flex-shrink-0 mt-0.5">
                          {option.isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          ) : isSelected ? (
                            <XCircle className="w-5 h-5 text-rose-400" />
                          ) : null}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after answering */}
              {userAnswers[currentQuestion.id] && (
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1.5 animate-fade-in">
                  <div className="font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Penjelasan Hasil Analisis:</span>
                  </div>
                  <p className="leading-relaxed">
                    {currentQuestion.options.find((o) => o.isCorrect)?.explanation}
                  </p>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={handlePrevQuestion}
                  disabled={activeQuestionIdx === 0}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-all"
                >
                  Soal Sebelumnya
                </button>

                <div className="text-xs text-slate-400">
                  Tantangan {activeQuestionIdx + 1} dari {activeCase.questions.length}
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/10 transition-all flex items-center space-x-1"
                >
                  <span>
                    {activeQuestionIdx === activeCase.questions.length - 1
                      ? 'Selesai Kasus Ini'
                      : 'Soal Selanjutnya'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}
        </>
      )}

    </div>
  );
};
