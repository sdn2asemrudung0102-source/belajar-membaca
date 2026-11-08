import React, { useEffect } from 'react';
import { Volume2, PlayCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { StudentInfo } from '../types';
import { playSound, speakIndonesian, stopSpeaking } from '../utils/audio';

interface InstructionScreenProps {
  student: StudentInfo;
  onStartQuiz: () => void;
  onBack: () => void;
  soundEnabled: boolean;
}

export const InstructionScreen: React.FC<InstructionScreenProps> = ({
  student,
  onStartQuiz,
  onBack,
  soundEnabled,
}) => {
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  const handleReadInstructions = () => {
    playSound('pop', soundEnabled);
    speakIndonesian(
      `Halo ${student.name}! Selamat datang di kuis belajar membaca. Ada 15 soal pilihan ganda. Pilih jawaban a, b, atau c. Kamu bisa menekan tombol pengeras suara untuk mendengarkan soal.`
    );
  };

  return (
    <div className="max-w-xl mx-auto w-full px-4 py-8 sm:py-12 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-xl shadow-sky-100/70 border-4 border-amber-300 p-6 sm:p-10 relative overflow-hidden">
        {/* Header icon */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-2 select-none">📖👀✨</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            Petunjuk Pengerjaan
          </h2>
          <p className="text-teal-700 font-semibold text-base sm:text-lg mt-1">
            Halo, <span className="underline decoration-amber-400 decoration-4">{student.name}</span> ({student.classInfo})!
          </p>
          {student.schoolName && (
            <p className="text-xs text-slate-400 font-medium">{student.schoolName}</p>
          )}
        </div>

        {/* Listen Button */}
        <div className="mb-6 flex justify-center">
          <button
            type="button"
            onClick={handleReadInstructions}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-full text-amber-800 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-amber-600" />
            <span>Dengarkan Petunjuk (Suara) 🔊</span>
          </button>
        </div>

        {/* Steps List */}
        <div className="bg-amber-50/70 border-2 border-amber-200/80 rounded-2xl p-5 sm:p-6 mb-6 space-y-3.5 text-slate-700 text-sm sm:text-base">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-sm">
              1
            </span>
            <div>
              <p className="font-semibold text-slate-800">15 Soal Pilihan Ganda</p>
              <p className="text-xs sm:text-sm text-slate-600">
                Latihan seru tentang huruf vokal, konsonan, suku kata, dan menyusun kata.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-sm">
              2
            </span>
            <div>
              <p className="font-semibold text-slate-800">Pilih Jawaban Paling Tepat</p>
              <p className="text-xs sm:text-sm text-slate-600">
                Pilih opsi <b className="text-coral-600">a</b>, <b className="text-coral-600">b</b>, atau <b className="text-coral-600">c</b> dengan mengeklik kartu jawaban.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-sm">
              3
            </span>
            <div>
              <p className="font-semibold text-slate-800">Tombol Audio Pembaca 🔊</p>
              <p className="text-xs sm:text-sm text-slate-600">
                Belum lancar membaca? Klik ikon speaker untuk mendengarkan soal dibacakan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-teal-500 text-white font-bold flex items-center justify-center text-sm">
              4
            </span>
            <div>
              <p className="font-semibold text-slate-800">Lihat Nilai & Piagam Penghargaan</p>
              <p className="text-xs sm:text-sm text-slate-600">
                Di akhir, kamu akan melihat nilai, pembahasan kunci jawaban, dan sertifikat bintang!
              </p>
            </div>
          </div>
        </div>

        {/* Feature badge pill strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Huruf Vokal
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Huruf Konsonan
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Suku Kata
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" /> Merangkai Kata
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              playSound('click', soundEnabled);
              onBack();
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Ubah Identitas</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playSound('pop', soundEnabled);
              onStartQuiz();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 text-white font-bold text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <PlayCircle className="w-5 h-5" />
            <span>Mulai Latihan! 🎯</span>
          </button>
        </div>
      </div>
    </div>
  );
};
