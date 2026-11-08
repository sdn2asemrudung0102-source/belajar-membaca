/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { InstructionScreen } from './components/InstructionScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultScreen } from './components/ResultScreen';
import { ReviewScreen } from './components/ReviewScreen';
import { CertificateModal } from './components/CertificateModal';
import { QUESTIONS_DATA } from './data/questions';
import { StudentInfo, OptionKey, ScreenType } from './types';
import { playSound, stopSpeaking } from './utils/audio';

const STORAGE_KEY_STUDENT = 'ayo_membaca_student';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenType>('welcome');
  const [student, setStudent] = useState<StudentInfo>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STUDENT);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      name: '',
      classInfo: '1 SD',
      schoolName: 'SDN 2 Asemrudung',
      avatarId: 'rabbit',
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(OptionKey | null)[]>(() =>
    new Array(QUESTIONS_DATA.length).fill(null)
  );
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);

  // Save student info when changed
  useEffect(() => {
    try {
      if (student.name) {
        localStorage.setItem(STORAGE_KEY_STUDENT, JSON.stringify(student));
      }
    } catch {
      // ignore
    }
  }, [student]);

  // Clean audio on unmount or screen transition
  useEffect(() => {
    stopSpeaking();
  }, [activeScreen]);

  // Welcome -> Instructions
  const handleStartFromWelcome = (info: StudentInfo) => {
    setStudent(info);
    setActiveScreen('instructions');
  };

  // Instructions -> Quiz
  const handleStartQuiz = () => {
    setCurrentIndex(0);
    setUserAnswers(new Array(QUESTIONS_DATA.length).fill(null));
    setActiveScreen('quiz');
  };

  // Select option in quiz
  const handleSelectAnswer = (option: OptionKey) => {
    setUserAnswers((prev) => {
      const copy = [...prev];
      copy[currentIndex] = option;
      return copy;
    });
  };

  // Navigate next / prev in quiz
  const handleNavigate = (direction: number) => {
    const nextIdx = currentIndex + direction;
    if (nextIdx >= 0 && nextIdx < QUESTIONS_DATA.length) {
      setCurrentIndex(nextIdx);
    }
  };

  const handleJumpToQuestion = (targetIndex: number) => {
    if (targetIndex >= 0 && targetIndex < QUESTIONS_DATA.length) {
      setCurrentIndex(targetIndex);
    }
  };

  // Finish quiz
  const handleFinishQuiz = () => {
    setActiveScreen('result');
  };

  // Reset entire quiz (keeps student name for convenience)
  const handleReset = () => {
    stopSpeaking();
    setCurrentIndex(0);
    setUserAnswers(new Array(QUESTIONS_DATA.length).fill(null));
    setActiveScreen('welcome');
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    if (!next) {
      stopSpeaking();
    } else {
      playSound('click', true);
    }
  };

  // Score computation
  const correctCount = userAnswers.reduce((acc, ans, idx) => {
    return ans === QUESTIONS_DATA[idx].ans ? acc + 1 : acc;
  }, 0);
  const finalScore = Math.round((correctCount / QUESTIONS_DATA.length) * 100);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-amber-300 selection:text-slate-900">
      {/* Top Navigation */}
      <Navbar
        student={student}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onReset={handleReset}
        activeScreen={activeScreen}
      />

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center py-4 sm:py-6">
        {activeScreen === 'welcome' && (
          <WelcomeScreen
            onStart={handleStartFromWelcome}
            initialInfo={student}
            soundEnabled={soundEnabled}
          />
        )}

        {activeScreen === 'instructions' && (
          <InstructionScreen
            student={student}
            onStartQuiz={handleStartQuiz}
            onBack={() => setActiveScreen('welcome')}
            soundEnabled={soundEnabled}
          />
        )}

        {activeScreen === 'quiz' && (
          <QuizScreen
            questions={QUESTIONS_DATA}
            currentIndex={currentIndex}
            userAnswers={userAnswers}
            student={student}
            soundEnabled={soundEnabled}
            onSelectAnswer={handleSelectAnswer}
            onNavigate={handleNavigate}
            onJumpToQuestion={handleJumpToQuestion}
            onFinish={handleFinishQuiz}
          />
        )}

        {activeScreen === 'result' && (
          <ResultScreen
            student={student}
            questions={QUESTIONS_DATA}
            userAnswers={userAnswers}
            soundEnabled={soundEnabled}
            onShowReview={() => setActiveScreen('review')}
            onOpenCertificate={() => setIsCertificateOpen(true)}
            onReset={handleReset}
          />
        )}

        {activeScreen === 'review' && (
          <ReviewScreen
            questions={QUESTIONS_DATA}
            userAnswers={userAnswers}
            soundEnabled={soundEnabled}
            onBackToResult={() => setActiveScreen('result')}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-500 no-print border-t border-sky-100 bg-white/70 backdrop-blur-xs">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-medium">
            Ayo Belajar Membaca · Media Pembelajaran Literasi Kelas 1 SD
          </p>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Huruf Vokal & Konsonan</span>
            <span>·</span>
            <span>Suku Kata</span>
            <span>·</span>
            <span>Merangkai Kata</span>
          </div>
        </div>
      </footer>

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        student={student}
        score={finalScore}
      />
    </div>
  );
}
