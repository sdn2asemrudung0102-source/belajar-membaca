import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, RotateCcw, FileText, CheckCircle2, XCircle, Share2, Printer } from 'lucide-react';
import { StudentInfo, Question, OptionKey } from '../types';
import { playSound } from '../utils/audio';

interface ResultScreenProps {
  student: StudentInfo;
  questions: Question[];
  userAnswers: (OptionKey | null)[];
  soundEnabled: boolean;
  onShowReview: () => void;
  onOpenCertificate: () => void;
  onReset: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  student,
  questions,
  userAnswers,
  soundEnabled,
  onShowReview,
  onOpenCertificate,
  onReset,
}) => {
  // Calculate results
  const correctCount = userAnswers.reduce((acc, ans, idx) => {
    return ans === questions[idx].ans ? acc + 1 : acc;
  }, 0);

  const total = questions.length;
  const score = Math.round((correctCount / total) * 100);
  const wrongCount = total - correctCount;

  useEffect(() => {
    playSound('complete', soundEnabled);
    if (score >= 70) {
      // Fire confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4ecdc4', '#ff6b6b', '#ffe66d', '#10b981', '#3b82f6'],
        });
      } catch {
        // ignore
      }
    }
  }, [score, soundEnabled]);

  let feedbackTitle = 'Hebat!';
  let feedbackText = 'Kamu sudah belajar membaca dengan sangat baik!';
  let emoji = '🌟';
  let badgeColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
  let predicate = 'Sangat Baik';

  if (score >= 90) {
    feedbackTitle = 'Luar Biasa!';
    feedbackText = 'Kamu pintar sekali! Penguasaan membaca dan hurufmu sangat mantap!';
    emoji = '🏆🥳';
    badgeColor = 'text-amber-600 bg-amber-50 border-amber-300';
    predicate = 'Istimewa / Bintang Emas';
  } else if (score >= 75) {
    feedbackTitle = 'Bagus Sekali!';
    feedbackText = 'Hasil belajarmu bagus! Pertahankan semangat membacamu ya!';
    emoji = '🎉😊';
    badgeColor = 'text-teal-600 bg-teal-50 border-teal-200';
    predicate = 'Sangat Baik';
  } else if (score >= 60) {
    feedbackTitle = 'Cukup Bagus!';
    feedbackText = 'Sudah bagus, yuk pelajari lagi suku kata dan huruf vokal yang salah!';
    emoji = '👍📖';
    badgeColor = 'text-sky-600 bg-sky-50 border-sky-200';
    predicate = 'Baik';
  } else {
    feedbackTitle = 'Ayo Semangat!';
    feedbackText = 'Jangan berkecil hati ya, dengan sering berlatih kamu pasti semakin lancar!';
    emoji = '💪🤗';
    badgeColor = 'text-rose-600 bg-rose-50 border-rose-200';
    predicate = 'Perlu Bimbingan';
  }

  return (
    <div className="max-w-xl mx-auto w-full px-4 py-8 sm:py-12 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-xl shadow-sky-100/70 border-4 border-amber-300 p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Large Emoji Header */}
        <div className="text-6xl mb-3 select-none animate-bounce">{emoji}</div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
          Latihan Selesai!
        </h2>
        <p className="text-slate-600 font-semibold text-base sm:text-lg mt-1">
          Kerja bagus, <span className="text-teal-700 underline decoration-amber-400">{student.name}</span>!
        </p>
        <p className="text-xs text-slate-400 font-medium">
          {student.classInfo} {student.schoolName ? `· ${student.schoolName}` : ''}
        </p>

        {/* Big Score Box */}
        <div className="my-6 p-6 rounded-3xl bg-gradient-to-b from-amber-50/80 to-amber-100/40 border-2 border-amber-200/80 inline-block w-full max-w-xs shadow-inner">
          <p className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-1">
            Nilai Akhir
          </p>
          <div className="text-6xl sm:text-7xl font-extrabold text-slate-900 tracking-tight drop-shadow-xs">
            {score}
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-1">Skala Nilai 100</p>
          <div className={`mt-3 inline-block px-3 py-1 rounded-full border text-xs font-bold ${badgeColor}`}>
            Predikat: {predicate}
          </div>
        </div>

        {/* Encouraging Feedback */}
        <div className="max-w-md mx-auto mb-6">
          <h3 className="text-lg font-bold text-slate-800">{feedbackTitle}</h3>
          <p className="text-slate-600 text-sm mt-1">{feedbackText}</p>
        </div>

        {/* Score Breakdown Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 text-center">
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200">
            <div className="flex items-center justify-center gap-1 text-emerald-700 font-bold text-sm mb-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Benar</span>
            </div>
            <div className="text-2xl font-extrabold text-emerald-800">{correctCount}</div>
            <div className="text-[11px] text-emerald-600 font-medium">soal</div>
          </div>

          <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200">
            <div className="flex items-center justify-center gap-1 text-rose-700 font-bold text-sm mb-1">
              <XCircle className="w-4 h-4" />
              <span>Salah</span>
            </div>
            <div className="text-2xl font-extrabold text-rose-800">{wrongCount}</div>
            <div className="text-[11px] text-rose-600 font-medium">soal</div>
          </div>

          <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200">
            <div className="flex items-center justify-center gap-1 text-sky-700 font-bold text-sm mb-1">
              <Award className="w-4 h-4" />
              <span>Akurasi</span>
            </div>
            <div className="text-2xl font-extrabold text-sky-800">{score}%</div>
            <div className="text-[11px] text-sky-600 font-medium">persen</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 max-w-md mx-auto">
          {/* Certificate button */}
          <button
            type="button"
            onClick={() => {
              playSound('pop', soundEnabled);
              onOpenCertificate();
            }}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-bold text-base shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer className="w-5 h-5" />
            <span>Cetak Piagam Penghargaan 🎓</span>
          </button>

          {/* Review answers button */}
          <button
            type="button"
            onClick={() => {
              playSound('click', soundEnabled);
              onShowReview();
            }}
            className="w-full py-3 px-6 rounded-2xl bg-teal-50 hover:bg-teal-100 border-2 border-teal-200 text-teal-800 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <FileText className="w-5 h-5 text-teal-600" />
            <span>Lihat Kunci Jawaban & Pembahasan 📝</span>
          </button>

          {/* Retry button */}
          <button
            type="button"
            onClick={() => {
              playSound('click', soundEnabled);
              onReset();
            }}
            className="w-full py-2.5 px-6 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Latihan Dari Awal 🔄</span>
          </button>
        </div>
      </div>
    </div>
  );
};
