import React, { useState, useEffect } from 'react';
import {
  Volume2,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  LayoutGrid,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { Question, OptionKey, StudentInfo } from '../types';
import { playSound, speakIndonesian, stopSpeaking } from '../utils/audio';

interface QuizScreenProps {
  questions: Question[];
  currentIndex: number;
  userAnswers: (OptionKey | null)[];
  student: StudentInfo;
  soundEnabled: boolean;
  onSelectAnswer: (option: OptionKey) => void;
  onNavigate: (step: number) => void;
  onJumpToQuestion: (index: number) => void;
  onFinish: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  currentIndex,
  userAnswers,
  student,
  soundEnabled,
  onSelectAnswer,
  onNavigate,
  onJumpToQuestion,
  onFinish,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [alertNudge, setAlertNudge] = useState<string | null>(null);

  const currentQ = questions[currentIndex];
  const currentAnswer = userAnswers[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const isLastQuestion = currentIndex === questions.length - 1;

  // Stop previous speech on question change
  useEffect(() => {
    stopSpeaking();
    setIsSpeaking(false);
    setShowHint(false);
    setAlertNudge(null);
  }, [currentIndex]);

  const handleSpeakQuestion = () => {
    playSound('pop', soundEnabled);
    setIsSpeaking(true);

    const speechText = `Soal nomor ${currentIndex + 1}. ${currentQ.q}. Pilihan A: ${currentQ.opts.a}. Pilihan B: ${currentQ.opts.b}. Pilihan C: ${currentQ.opts.c}.`;

    speakIndonesian(speechText, () => {
      setIsSpeaking(false);
    });
  };

  const handleSelect = (key: OptionKey) => {
    playSound('select', soundEnabled);
    onSelectAnswer(key);
    setAlertNudge(null);
  };

  const handleNextClick = () => {
    if (!currentAnswer) {
      setAlertNudge('Yuk pilih salah satu jawaban (a, b, atau c) dulu ya! 😊');
      playSound('wrong', soundEnabled);
      return;
    }
    playSound('click', soundEnabled);
    onNavigate(1);
  };

  const handleFinishClick = () => {
    if (!currentAnswer) {
      setAlertNudge('Yuk pilih jawaban soal terakhir dulu ya sebelum selesai! 😊');
      playSound('wrong', soundEnabled);
      return;
    }
    playSound('complete', soundEnabled);
    onFinish();
  };

  // Helper renderer for interactive letter/syllable badges
  const renderInteractiveWordVisual = () => {
    // If spelling letters like "b - u - k - u"
    if (currentQ.q.includes(' - ')) {
      const match = currentQ.q.match(/([a-z]\s*-\s*[a-z]\s*-\s*[a-z](\s*-\s*[a-z])?)/i);
      if (match) {
        const letters = match[0].split('-').map((l) => l.trim().toUpperCase());
        return (
          <div className="flex items-center justify-center gap-2 my-4">
            {letters.map((letter, idx) => {
              const isVowel = ['A', 'I', 'U', 'E', 'O'].includes(letter);
              return (
                <div
                  key={idx}
                  className={`w-11 h-12 rounded-xl flex items-center justify-center text-xl font-extrabold shadow-sm border-2 ${
                    isVowel
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'bg-teal-50 border-teal-300 text-teal-700'
                  }`}
                >
                  {letter}
                </div>
              );
            })}
            <span className="text-2xl text-amber-500 font-bold px-1">=</span>
            <div className="px-4 py-2 rounded-xl bg-amber-50 border-2 border-amber-300 text-amber-900 font-bold text-lg tracking-wider">
              ?
            </div>
          </div>
        );
      }
    }

    // If word in quotes like "BUKU" or "MEJA"
    const quoteMatch = currentQ.q.match(/"([^"]+)"/);
    if (quoteMatch) {
      const word = quoteMatch[1];
      return (
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-sky-50 border border-sky-200 rounded-2xl my-2 text-sky-900 font-bold tracking-widest text-lg">
          {word.split('').map((char, i) => {
            const isVowel = ['a', 'i', 'u', 'e', 'o'].includes(char.toLowerCase());
            return (
              <span
                key={i}
                className={`px-1 rounded-sm ${
                  isVowel ? 'text-rose-500 font-extrabold underline' : 'text-slate-700'
                }`}
                title={isVowel ? 'Huruf Vokal' : 'Huruf Konsonan'}
              >
                {char}
              </span>
            );
          })}
        </div>
      );
    }

    return null;
  };

  const answeredCount = userAnswers.filter((a) => a !== null).length;

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-6 sm:py-8">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl shadow-xl shadow-sky-100/70 border-4 border-amber-300 p-6 sm:p-8 relative">
        {/* Progress Bar & Counter */}
        <div className="mb-5">
          <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-500 mb-2">
            <span className="flex items-center gap-1.5 text-teal-700">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
              Soal {currentIndex + 1} dari {questions.length}
            </span>
            <span className="text-slate-400">
              Terjawab: <b className="text-slate-700">{answeredCount}</b>/{questions.length}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-slate-200">
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-amber-400 to-coral-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Category & Audio Controls Header */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span className="text-base select-none">{currentQ.icon || '📖'}</span>
            <span className="uppercase tracking-wider text-teal-700 font-bold">
              {currentQ.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Read-Aloud */}
            <button
              type="button"
              onClick={handleSpeakQuestion}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-amber-400 text-slate-900 shadow-md ring-2 ring-amber-200 animate-pulse'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
              title="Dengarkan soal ini dibacakan"
            >
              <Volume2 className="w-4 h-4" />
              <span>{isSpeaking ? 'Membacakan...' : 'Dengarkan 🔊'}</span>
            </button>

            {/* Quick Drawer Button */}
            <button
              type="button"
              onClick={() => {
                playSound('click', soundEnabled);
                setShowDrawer(!showDrawer);
              }}
              className="p-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              title="Lihat Daftar Semua Soal"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Question Drawer */}
        {showDrawer && (
          <div className="mb-6 p-4 bg-slate-50 rounded-2xl border-2 border-slate-200 animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-700">
              <span>Pilih Lompat ke Soal:</span>
              <button
                type="button"
                onClick={() => setShowDrawer(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕ Tutup
              </button>
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-8 gap-2">
              {questions.map((q, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = userAnswers[idx] !== null;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      playSound('select', soundEnabled);
                      onJumpToQuestion(idx);
                      setShowDrawer(false);
                    }}
                    className={`h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-teal-500 text-white shadow-md ring-2 ring-teal-200 scale-105'
                        : isAnswered
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Question Content */}
        <div className="text-center my-4">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug tracking-tight">
            {currentQ.q}
          </h2>

          {/* Interactive visual word breakdown */}
          {renderInteractiveWordVisual()}

          {/* Optional Hint Dropdown */}
          {currentQ.hint && (
            <div className="mt-2">
              {showHint ? (
                <div className="inline-block mt-2 p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium animate-in fade-in">
                  💡 <b>Petunjuk:</b> {currentQ.hint}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    playSound('click', soundEnabled);
                    setShowHint(true);
                  }}
                  className="inline-flex items-center gap-1 text-xs text-amber-700 hover:text-amber-800 font-semibold hover:underline mt-1 cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Lihat Petunjuk</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Options List */}
        <div className="space-y-3 my-6">
          {(['a', 'b', 'c'] as OptionKey[]).map((letter) => {
            const isSelected = currentAnswer === letter;
            const optionText = currentQ.opts[letter];

            return (
              <button
                key={letter}
                type="button"
                onClick={() => handleSelect(letter)}
                className={`w-full p-4 rounded-2xl border-3 text-left font-medium text-base sm:text-lg transition-all duration-150 flex items-center gap-4 cursor-pointer group ${
                  isSelected
                    ? 'bg-teal-50/90 border-teal-500 shadow-md shadow-teal-500/10 scale-[1.01]'
                    : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 active:scale-[0.99]'
                }`}
              >
                {/* Circle Letter Badge */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base shrink-0 transition-all ${
                    isSelected
                      ? 'bg-teal-500 text-white shadow-xs'
                      : 'bg-amber-100 text-amber-900 group-hover:bg-amber-200'
                  }`}
                >
                  {letter}
                </div>

                {/* Option Text */}
                <div className="flex-1 text-slate-800 font-semibold">{optionText}</div>

                {/* Selected Check Icon */}
                {isSelected && (
                  <CheckCircle className="w-6 h-6 text-teal-600 shrink-0 animate-in zoom-in" />
                )}
              </button>
            );
          })}
        </div>

        {/* Alert Nudge if clicked without selecting */}
        {alertNudge && (
          <div className="p-3 mb-4 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-sm font-medium text-center animate-shake">
            {alertNudge}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              playSound('click', soundEnabled);
              onNavigate(-1);
            }}
            disabled={currentIndex === 0}
            className={`px-5 py-3 rounded-xl border text-sm sm:text-base font-bold flex items-center gap-1.5 transition-all ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
                : 'border-slate-300 text-slate-700 hover:bg-slate-100 cursor-pointer active:scale-95'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <div className="text-xs text-slate-400 font-semibold hidden sm:block">
            {student.name} · {student.classInfo}
          </div>

          {!isLastQuestion ? (
            <button
              type="button"
              onClick={handleNextClick}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 active:scale-95 text-white font-bold text-sm sm:text-base shadow-md shadow-teal-500/25 flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <span>Selanjutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishClick}
              className="px-7 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-coral-500 hover:from-amber-600 hover:to-coral-600 active:scale-95 text-white font-bold text-sm sm:text-base shadow-lg shadow-amber-500/30 flex items-center gap-1.5 cursor-pointer transition-all animate-bounce"
            >
              <span>Selesai & Nilai</span>
              <CheckCircle className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
