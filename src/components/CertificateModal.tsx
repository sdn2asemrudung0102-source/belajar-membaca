import React from 'react';
import { Printer, X, Award, Star } from 'lucide-react';
import { StudentInfo } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: StudentInfo;
  score: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  student,
  score,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  // Format date in Indonesian
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const starsCount = score >= 90 ? 5 : score >= 75 ? 4 : score >= 60 ? 3 : 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-4 sm:p-6 my-8 animate-in zoom-in-95 duration-200">
        {/* Modal Top Actions (no-print) */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 no-print">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-base">
            <Award className="w-5 h-5 text-amber-500" />
            <span>Piagam Penghargaan Siswa</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body (Prints beautifully!) */}
        <div className="certificate-card border-8 border-double border-amber-400 rounded-2xl p-6 sm:p-10 bg-gradient-to-b from-amber-50/40 via-white to-sky-50/30 text-center relative overflow-hidden">
          {/* Ornate corner decorations */}
          <div className="absolute top-2 left-2 text-amber-300 text-xl font-serif">⚜</div>
          <div className="absolute top-2 right-2 text-amber-300 text-xl font-serif">⚜</div>
          <div className="absolute bottom-2 left-2 text-amber-300 text-xl font-serif">⚜</div>
          <div className="absolute bottom-2 right-2 text-amber-300 text-xl font-serif">⚜</div>

          {/* School and Title Header */}
          <div className="mb-4">
            <p className="text-xs tracking-widest text-teal-800 uppercase font-extrabold mb-1">
              {student.schoolName || 'SEKOLAH DASAR'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight uppercase">
              Piagam Penghargaan
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
              Program Literasi Membaca Murid Cerdas Kelas 1 SD
            </p>
          </div>

          <div className="w-24 h-1 bg-amber-400 mx-auto rounded-full my-4" />

          {/* Recipient */}
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Diberikan dengan bangga kepada:</p>
          <div className="my-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-800 border-b-2 border-dashed border-teal-300 inline-block px-6 pb-1">
              {student.name}
            </h3>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-4">
            Kelas: <span className="font-bold text-slate-800">{student.classInfo}</span>
          </p>

          {/* Achievement Description */}
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-4">
            Telah menyelesaikan seluruh rangkaian soal latihan literasi membaca (huruf vokal, huruf konsonan, suku kata, dan merangkai kata) dengan memperoleh nilai:
          </p>

          {/* Badge & Score */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-amber-100/80 border-2 border-amber-300 rounded-2xl mb-4">
            <Award className="w-8 h-8 text-amber-600 shrink-0" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">
                Nilai Prestasi
              </span>
              <span className="text-2xl font-black text-slate-900">{score} / 100</span>
            </div>
          </div>

          {/* Stars */}
          <div className="flex justify-center items-center gap-1.5 mb-6 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < starsCount ? 'fill-amber-400 text-amber-400' : 'text-slate-200'
                }`}
              />
            ))}
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 text-xs text-slate-700 mt-6 pt-4 border-t border-slate-200/80">
            <div>
              <p className="text-slate-400 mb-8">Tanggal: {dateFormatted}</p>
              <div className="w-32 border-b border-slate-400 mx-auto" />
              <p className="font-bold mt-1 text-slate-800">Orang Tua / Wali</p>
            </div>
            <div>
              <p className="text-slate-400 mb-8">Guru Pembimbing</p>
              <div className="w-32 border-b border-slate-400 mx-auto" />
              <p className="font-bold mt-1 text-slate-800">Guru Kelas</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
