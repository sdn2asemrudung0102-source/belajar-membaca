import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Volume2,
  RotateCcw,
  ArrowLeft,
  Filter,
  Lightbulb,
} from 'lucide-react';
import { Question, OptionKey } from '../types';
import { playSound, speakIndonesian } from '../utils/audio';

interface ReviewScreenProps {
  questions: Question[];
  userAnswers: (OptionKey | null)[];
  soundEnabled: boolean;
  onBackToResult: () => void;
  onReset: () => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  questions,
  userAnswers,
  soundEnabled,
  onBackToResult,
  onReset,
}) => {
  const [filter, setFilter] = useState<'all' | 'correct' | 'wrong'>('all');
  const [playingId, setPlayingId] = useState<number | null>(null);

  const filteredQuestions = questions.map((q, idx) => ({
    q,
    idx,
    userAns: userAnswers[idx],
    isCorrect: userAnswers[idx] === q.ans,
  })).filter((item) => {
    if (filter === 'correct') return item.isCorrect;
    if (filter === 'wrong') return !item.isCorrect;
    return true;
  });

  const correctCount = userAnswers.filter((ans, idx) => ans === questions[idx].ans).length;
  const wrongCount = questions.length - correctCount;

  const handleSpeakItem = (item: (typeof filteredQuestions)[0]) => {
    playSound('pop', soundEnabled);
    setPlayingId(item.q.id);
    const speech = `Soal nomor ${item.idx + 1}. ${item.q.q}. Jawaban yang benar adalah pilihan ${item.q.ans.toUpperCase()}, yaitu ${item.q.opts[item.q.ans]}. Penjelasan: ${item.q.explanation}`;
    speakIndonesian(speech, () => {
      setPlayingId(null);
    });
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-4 py-6 sm:py-10 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-xl shadow-sky-100/70 border-4 border-amber-300 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800">
              Kunci Jawaban & Pembahasan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Pelajari kembali soal-soal agar semakin paham dan lancar membaca!
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click', soundEnabled);
              onBackToResult();
            }}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali</span>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => {
              playSound('select', soundEnabled);
              setFilter('all');
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua ({questions.length})
          </button>
          <button
            type="button"
            onClick={() => {
              playSound('select', soundEnabled);
              setFilter('correct');
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              filter === 'correct'
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'text-emerald-700 hover:text-emerald-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Benar ({correctCount})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playSound('select', soundEnabled);
              setFilter('wrong');
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              filter === 'wrong'
                ? 'bg-rose-500 text-white shadow-xs'
                : 'text-rose-700 hover:text-rose-900'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Perlu Belajar ({wrongCount})</span>
          </button>
        </div>

        {/* Question List */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
          {filteredQuestions.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">
              Tidak ada soal dalam kategori ini.
            </div>
          ) : (
            filteredQuestions.map((item) => {
              const { q, idx, userAns, isCorrect } = item;
              const isSpeakingThis = playingId === q.id;

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl border-2 transition-all ${
                    isCorrect
                      ? 'bg-emerald-50/50 border-emerald-200'
                      : 'bg-rose-50/50 border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white ${
                          isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {q.category}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSpeakItem(item)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                        isSpeakingThis
                          ? 'bg-amber-400 text-slate-900'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                      title="Dengarkan pembahasan soal ini"
                    >
                      <Volume2 className="w-3 h-3 text-teal-600" />
                      <span>{isSpeakingThis ? 'Membaca...' : 'Dengar 🔊'}</span>
                    </button>
                  </div>

                  <p className="text-sm sm:text-base font-bold text-slate-800 mb-3">
                    {q.q}
                  </p>

                  <div className="space-y-1.5 text-xs sm:text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Jawabanmu:</span>
                      {userAns ? (
                        <span
                          className={`font-bold inline-flex items-center gap-1 ${
                            isCorrect ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          {userAns.toUpperCase()}. {q.opts[userAns]}
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          )}
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Tidak dijawab</span>
                      )}
                    </div>

                    {!isCorrect && (
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-medium">Kunci Jawaban:</span>
                        <span className="font-extrabold text-emerald-700 inline-flex items-center gap-1">
                          {q.ans.toUpperCase()}. {q.opts[q.ans]}
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Explanation box */}
                  <div className="p-3 bg-white/90 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800">Pembahasan: </span>
                      <span>{q.explanation}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-100 mt-6">
          <button
            type="button"
            onClick={() => {
              playSound('click', soundEnabled);
              onBackToResult();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Nilai</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('pop', soundEnabled);
              onReset();
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-600 active:scale-95 text-white font-bold text-sm shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Latihan 🔄</span>
          </button>
        </div>
      </div>
    </div>
  );
};
