import React, { useState, useEffect, useCallback } from 'react';
import { SLIDES_DATA, LESSON_INFO } from './data/lessonData';
import SlideHeader from './components/SlideHeader';
import TeacherNotes from './components/TeacherNotes';
import DrawingCanvas from './components/DrawingCanvas';
import PresenterWindow from './PresenterWindow';

// Slide components
import Slide1Welcome from './slides/Slide1Welcome';
import Slide2AnglesReview from './slides/Slide2AnglesReview';
import Slide3IdentifySides from './slides/Slide3IdentifySides';
import Slide4PythagorasTheorem from './slides/Slide4PythagorasTheorem';
import Slide5PythagorasExamples from './slides/Slide5PythagorasExamples';
import Slide6BreakTimer from './slides/Slide6BreakTimer';
import Slide7MetricRelations from './slides/Slide7MetricRelations';
import Slide8MetricExamples from './slides/Slide8MetricExamples';
import Slide9PracticeExercises from './slides/Slide9PracticeExercises';
import Slide10ClosingHomework from './slides/Slide10ClosingHomework';

import { BookOpen, Pencil, ExternalLink } from 'lucide-react';
import { sounds } from './utils/audio';

const SLIDE_COMPONENTS = [
  Slide1Welcome,
  Slide2AnglesReview,
  Slide3IdentifySides,
  Slide4PythagorasTheorem,
  Slide5PythagorasExamples,
  Slide6BreakTimer,
  Slide7MetricRelations,
  Slide8MetricExamples,
  Slide9PracticeExercises,
  Slide10ClosingHomework,
];

export default function App() {
  // If URL has ?mode=presenter, render the isolated presenter console!
  const isPresenterMode = window.location.search.includes('mode=presenter');
  if (isPresenterMode) {
    return <PresenterWindow />;
  }

  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => {
    const saved = localStorage.getItem('antigravity_current_slide');
    return saved ? parseInt(saved, 10) || 0 : 0;
  });
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isDrawingActive, setIsDrawingActive] = useState(false);

  const totalSlides = SLIDE_COMPONENTS.length;
  const currentSlideMeta = SLIDES_DATA[currentSlideIndex];
  const CurrentSlideComponent = SLIDE_COMPONENTS[currentSlideIndex];

  // Sync listener with presenter window
  useEffect(() => {
    let channel = null;
    try {
      channel = new BroadcastChannel('slides_sync');
      channel.onmessage = (event) => {
        if (event.data?.type === 'SLIDE_CHANGED') {
          setCurrentSlideIndex(event.data.index);
        }
      };
    } catch {}

    const handleStorage = (e) => {
      if (e.key === 'antigravity_current_slide') {
        const idx = parseInt(e.newValue, 10);
        if (!isNaN(idx)) setCurrentSlideIndex(idx);
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const broadcastSlide = (index) => {
    localStorage.setItem('antigravity_current_slide', String(index));
    try {
      const channel = new BroadcastChannel('slides_sync');
      channel.postMessage({ type: 'SLIDE_CHANGED', index });
      channel.close();
    } catch {}
  };

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev < totalSlides - 1) {
        const next = prev + 1;
        sounds.playTone(520, 'sine', 0.1);
        broadcastSlide(next);
        return next;
      }
      return prev;
    });
  }, [totalSlides]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => {
      if (prev > 0) {
        const next = prev - 1;
        sounds.playTone(460, 'sine', 0.1);
        broadcastSlide(next);
        return next;
      }
      return prev;
    });
  }, []);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < totalSlides) {
      sounds.playTone(500, 'sine', 0.1);
      setCurrentSlideIndex(index);
      broadcastSlide(index);
    }
  }, [totalSlides]);

  const openPresenterPopup = () => {
    const url = window.location.origin + window.location.pathname + '?mode=presenter';
    window.open(url, 'PresenterWindow', 'width=1100,height=750,menubar=no,toolbar=no,location=no');
  };

  // Keyboard navigation & global shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger if user is typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          goToNextSlide();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          goToPrevSlide();
          break;
        case 'n':
        case 'N':
          e.preventDefault();
          setIsNotesOpen((prev) => !prev);
          break;
        case 'd':
        case 'D':
          e.preventDefault();
          setIsDrawingActive((prev) => !prev);
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          openPresenterPopup();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          e.preventDefault();
          goToSlide(parseInt(e.key, 10) - 1);
          break;
        case '0':
          e.preventDefault();
          goToSlide(9); // Slide 10
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide, goToSlide]);

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans select-none relative">
      {/* Top Slide Header */}
      <SlideHeader
        currentSlideIndex={currentSlideIndex}
        totalSlides={totalSlides}
        slides={SLIDES_DATA}
        onSelectSlide={goToSlide}
        onNext={goToNextSlide}
        onPrev={goToPrevSlide}
        isNotesOpen={isNotesOpen}
        onToggleNotes={() => setIsNotesOpen((prev) => !prev)}
        isDrawingActive={isDrawingActive}
        onToggleDrawing={() => setIsDrawingActive((prev) => !prev)}
      />

      {/* Main Slide Presentation Stage (100% Student-Facing Clean Presentation) */}
      <main className="flex-1 w-full relative overflow-hidden bg-radial from-slate-900 via-slate-950 to-slate-950">
        <div key={currentSlideIndex} className="w-full h-full animate-in fade-in duration-200">
          <CurrentSlideComponent />
        </div>
      </main>

      {/* Bottom Compact Student & Teacher Dock */}
      <footer className="h-11 bg-slate-950/95 border-t border-slate-800/80 px-4 flex items-center justify-between z-20 text-xs text-slate-400">
        {/* Left: Quick slide dots / pills */}
        <div className="flex items-center gap-1">
          {SLIDES_DATA.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => goToSlide(idx)}
              className={`h-6 px-2 rounded-lg font-mono text-[11px] font-bold transition flex items-center justify-center ${
                currentSlideIndex === idx
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={`${s.id}. ${s.title}`}
            >
              {s.id}
            </button>
          ))}
        </div>

        {/* Center: Educational motto (Clean, no spoilers) */}
        <div className="hidden lg:flex items-center gap-2 text-slate-400">
          <span className="font-semibold text-slate-300">Matemática em Movimento</span>
          <span className="text-slate-600">•</span>
          <span>{LESSON_INFO.grade}</span>
        </div>

        {/* Right: Quick tool labels */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition"
            title="Abrir/fechar notas na tela (Atalho: N)"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Notas <kbd className="px-1 py-0.2 bg-slate-800 rounded font-mono text-[10px]">N</kbd></span>
          </button>

          <button
            onClick={openPresenterPopup}
            className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-amber-400 transition"
            title="Abrir janela separada para 2ª tela sem que os alunos vejam as notas (Atalho: P)"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>2ª Tela <kbd className="px-1 py-0.2 bg-slate-800 rounded font-mono text-[10px]">P</kbd></span>
          </button>

          <button
            onClick={() => setIsDrawingActive(!isDrawingActive)}
            className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-amber-400 transition"
            title="Lousa digital (Atalho: D)"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>Caneta <kbd className="px-1 py-0.2 bg-slate-800 rounded font-mono text-[10px]">D</kbd></span>
          </button>

          <div className="text-slate-500 font-mono text-[11px]">
            {currentSlideIndex + 1}/{totalSlides}
          </div>
        </div>
      </footer>

      {/* Floating Teacher Notes Panel (Drawer - Only visible if teacher presses N) */}
      <TeacherNotes
        slide={currentSlideMeta}
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
      />

      {/* Transparent Whiteboard / Drawing Pen Overlay */}
      <DrawingCanvas
        isActive={isDrawingActive}
        onClose={() => setIsDrawingActive(false)}
      />
    </div>
  );
}
