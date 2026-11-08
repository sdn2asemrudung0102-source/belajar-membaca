import React from 'react';
import { Volume2, VolumeX, RotateCcw, BookOpen } from 'lucide-react';
import { StudentInfo } from '../types';

interface NavbarProps {
  student: StudentInfo;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onReset: () => void;
  activeScreen: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  student,
  soundEnabled,
  onToggleSound,
  onReset,
}) => {
  return (
    <header className="w-full bg-white/95 backdrop-blur-sm border-b border-sky-100 shadow-xs sticky top-0 z-30 no-print">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-coral-500 flex items-center justify-center text-white shadow-sm ring-2 ring-amber-100">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-800 flex items-center gap-2">
              <span>Ayo Belajar Membaca!</span>
              <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200/60">
                Kelas 1 SD
              </span>
            </h1>
            {student.schoolName && (
              <p className="text-[11px] text-slate-400 font-medium hidden sm:block truncate max-w-xs">
                {student.schoolName}
              </p>
            )}
          </div>
        </div>

        {/* Zone 2: Navigation / Student Info */}
        <div className="flex items-center gap-2 text-sm text-slate-600 truncate">
          {student.name ? (
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full border border-amber-200/80 text-amber-900 text-xs sm:text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="truncate max-w-[120px] sm:max-w-[200px]">
                {student.name}
              </span>
              <span className="text-amber-400">·</span>
              <span className="text-amber-700 shrink-0">{student.classInfo}</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500 hidden md:inline">
              Latihan Mandiri & Menyenangkan
            </span>
          )}
        </div>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-slate-200"
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-teal-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {student.name && (
            <button
              onClick={onReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors border border-rose-200"
              title="Ganti Siswa / Mulai Ulang"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ulangi</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
