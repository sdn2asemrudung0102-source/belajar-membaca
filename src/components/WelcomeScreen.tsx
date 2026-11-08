import React, { useState } from 'react';
import { Sparkles, ArrowRight, School, User, Award } from 'lucide-react';
import { StudentInfo } from '../types';
import { playSound } from '../utils/audio';

interface WelcomeScreenProps {
  onStart: (info: StudentInfo) => void;
  initialInfo: StudentInfo;
  soundEnabled: boolean;
}

const MASCOTS = [
  { id: 'lion', emoji: '🦁', name: 'Singa Berani' },
  { id: 'rabbit', emoji: '🐰', name: 'Kelinci Ceria' },
  { id: 'panda', emoji: '🐼', name: 'Panda Pintar' },
  { id: 'fox', emoji: '🦊', name: 'Rubah Cermat' },
  { id: 'owl', emoji: '🦉', name: 'Burung Hantu Bijak' },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  initialInfo,
  soundEnabled,
}) => {
  const [name, setName] = useState(initialInfo.name || '');
  const [classInfo, setClassInfo] = useState(initialInfo.classInfo || '1 SD');
  const [schoolName, setSchoolName] = useState(initialInfo.schoolName || 'SDN 2 Asemrudung');
  const [selectedMascot, setSelectedMascot] = useState(initialInfo.avatarId || 'rabbit');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Halo! Jangan lupa ketik nama lengkapmu ya 😊');
      playSound('wrong', soundEnabled);
      return;
    }
    if (!classInfo.trim()) {
      setErrorMessage('Isi juga kelasmu ya (misal: 1 SD atau 1A)');
      playSound('wrong', soundEnabled);
      return;
    }

    setErrorMessage('');
    playSound('pop', soundEnabled);
    onStart({
      name: name.trim(),
      classInfo: classInfo.trim(),
      schoolName: schoolName.trim(),
      avatarId: selectedMascot,
    });
  };

  const fillQuickSample = () => {
    setName('Budi Pratama');
    setClassInfo('1 SD');
    setSchoolName('SDN 2 Asemrudung');
    playSound('select', soundEnabled);
  };

  return (
    <div className="max-w-xl mx-auto w-full px-4 py-8 sm:py-12 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl shadow-xl shadow-sky-100/70 border-4 border-amber-300 p-6 sm:p-10 text-center relative overflow-hidden">
        {/* Decorative corner stars */}
        <div className="absolute top-4 left-4 text-amber-300 text-2xl select-none animate-bounce">
          ⭐
        </div>
        <div className="absolute top-4 right-4 text-teal-400 text-2xl select-none animate-pulse">
          ✨
        </div>

        {/* Mascot Avatar Header */}
        <div className="inline-flex p-3 bg-amber-50 rounded-2xl border-2 border-amber-200 mb-4 shadow-xs">
          <span className="text-5xl select-none filter drop-shadow-sm">
            {MASCOTS.find((m) => m.id === selectedMascot)?.emoji || '🎒'}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mb-2">
          Ayo Belajar Membaca!
        </h1>
        <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto mb-6">
          Selamat datang teman-teman hebat! Mari latihan mengenal huruf vokal, konsonan, dan merangkai kata.
        </p>

        {/* Mascot selector */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            Pilih Karakter Maskotmu:
          </label>
          <div className="flex justify-center items-center gap-2 sm:gap-3 flex-wrap">
            {MASCOTS.map((m) => {
              const isSelected = selectedMascot === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    setSelectedMascot(m.id);
                    playSound('select', soundEnabled);
                  }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all transform ${
                    isSelected
                      ? 'bg-amber-100 border-2 border-amber-500 scale-110 shadow-md ring-2 ring-amber-200'
                      : 'bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:scale-105'
                  }`}
                  title={m.name}
                >
                  {m.emoji}
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-left max-w-md mx-auto">
          <div>
            <label
              htmlFor="studentName"
              className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-teal-500" />
              Nama Lengkap Siswa:
            </label>
            <input
              id="studentName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Siti Rahmawati"
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-base font-medium placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all bg-slate-50/50"
              autoComplete="name"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="studentClass"
                className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1.5"
              >
                <Award className="w-4 h-4 text-amber-500" />
                Kelas:
              </label>
              <input
                id="studentClass"
                type="text"
                value={classInfo}
                onChange={(e) => setClassInfo(e.target.value)}
                placeholder="Misal: 1 SD / 1A"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-base font-medium placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all bg-slate-50/50"
              />
            </div>

            <div>
              <label
                htmlFor="schoolName"
                className="block text-sm font-bold text-slate-700 mb-1 flex items-center gap-1.5"
              >
                <School className="w-4 h-4 text-sky-500" />
                Nama Sekolah:
              </label>
              <input
                id="schoolName"
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder="Misal: SDN 2 Asemrudung"
                className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 text-slate-800 text-base font-medium placeholder-slate-400 focus:outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition-all bg-slate-50/50"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm font-medium animate-shake">
              ⚠️ {errorMessage}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 active:scale-[0.98] text-white text-lg font-bold shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Mulai Belajar Sekarang!</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>

        {/* Quick Demo Fill */}
        <div className="mt-6 pt-4 border-t border-slate-100 text-center">
          <button
            type="button"
            onClick={fillQuickSample}
            className="text-xs text-slate-400 hover:text-teal-600 underline font-medium transition-colors"
          >
            ⚡ Isi contoh cepat: Budi Pratama (Kelas 1 SD)
          </button>
        </div>
      </div>
    </div>
  );
};
