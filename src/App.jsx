import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import SlideHomeworkMaterial from './slides/SlideHomeworkMaterial';
import BlankExerciseSlide from './slides/BlankExerciseSlide';

import { BookOpen, Pencil, ExternalLink, PlusSquare, FileText } from 'lucide-react';
import { sounds } from './utils/audio';

const BASE_SLIDE_COMPONENTS = [
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
  SlideHomeworkMaterial,
];

export default function App() {
  // If URL has ?mode=presenter, render the isolated presenter console!
  const isPresenterMode = window.location.search.includes('mode=presenter');
  if (isPresenterMode) {
    return <PresenterWindow />;
  }

  // Load custom blank slides from localStorage
  const [customSlides, setCustomSlides] = useState(() => {
    try {
      const saved = localStorage.getItem('antigravity_custom_slides');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => {
    const saved = localStorage.getItem('antigravity_current_slide');
    return saved ? parseInt(saved, 10) || 0 : 0;
  });
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isDrawingActive, setIsDrawingActive] = useState(false);

  // Merge base slides with custom blank slides in order
  const mergedSlides = useMemo(() => {
    const list = BASE_SLIDE_COMPONENTS.map((Component, idx) => ({
      ...SLIDES_DATA[idx],
      isCustom: false,
      Component,
    }));

    // Insert custom slides at their designated positions
    const sortedCustom = [...customSlides].sort(
      (a, b) => (a.insertAfterIndex ?? 0) - (b.insertAfterIndex ?? 0)
    );

    let offset = 0;
    sortedCustom.forEach((c) => {
      const targetPos = Math.min(list.length, (c.insertAfterIndex ?? 0) + 1 + offset);
      list.splice(targetPos, 0, {
        id: c.id,
        title: c.title || 'Quadro de Resolução de Exercício',
        time: 'Flexível',
        duration: 'Livre',
        speakerScript:
          'Espaço aberto para resolução detalhada na lousa digital com os alunos. Destaque cada passo da fórmula.',
        chatPrompt:
          'Acompanhem a resolução na lousa e digitem no chat os resultados de cada etapa!',
        expectedAnswer: 'Resolução guiada passo a passo na lousa.',
        pedagogicalTip:
          'Permita que os alunos tentem primeiro. Use cores diferentes para destacar catetos e hipotenusa.',
        habilities: 'Resolução de Problemas / Prática Guiada',
        isCustom: true,
        customData: c.customData || {},
        Component: BlankExerciseSlide,
      });
      offset++;
    });

    return list;
  }, [customSlides]);

  const totalSlides = mergedSlides.length;
  const safeSlideIndex = Math.min(currentSlideIndex, Math.max(0, totalSlides - 1));
  const currentSlideMeta = mergedSlides[safeSlideIndex] || mergedSlides[0];
  const CurrentSlideComponent = currentSlideMeta?.Component || Slide1Welcome;

  // Broadcast slide changes to Presenter Window
  const broadcastSlide = (index, allSlides = mergedSlides) => {
    localStorage.setItem('antigravity_current_slide', String(index));
    try {
      const channel = new BroadcastChannel('slides_sync');
      channel.postMessage({
        type: 'SLIDE_CHANGED',
        index,
        slidesMeta: allSlides.map((s) => ({
          id: s.id,
          title: s.title,
          time: s.time,
          duration: s.duration,
          isCustom: s.isCustom,
          speakerScript: s.speakerScript,
          chatPrompt: s.chatPrompt,
          expectedAnswer: s.expectedAnswer,
          pedagogicalTip: s.pedagogicalTip,
          habilities: s.habilities,
        })),
      });
      channel.close();
    } catch {}
  };

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
      if (e.key === 'antigravity_custom_slides') {
        try {
          setCustomSlides(JSON.parse(e.newValue || '[]'));
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

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
  }, [totalSlides, mergedSlides]);

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
  }, [mergedSlides]);

  const goToSlide = useCallback((index) => {
    if (index >= 0 && index < totalSlides) {
      sounds.playTone(500, 'sine', 0.1);
      setCurrentSlideIndex(index);
      broadcastSlide(index);
    }
  }, [totalSlides, mergedSlides]);

  // Add a blank exercise slide right in the middle of presentation!
  const addBlankSlide = useCallback(
    (afterIndex, initialOptions = {}) => {
      const newId = `custom_${Date.now()}`;
      const newSlide = {
        id: newId,
        title: initialOptions.title || 'Quadro de Resolução de Exercício',
        insertAfterIndex: afterIndex ?? safeSlideIndex,
        customData: {
          backgroundStyle: 'grid',
          imageLayout: 'split',
          imageSrc: initialOptions.imageSrc || null,
          drawingData: null,
          ...initialOptions.customData,
        },
      };

      const updated = [...customSlides, newSlide];
      setCustomSlides(updated);
      try {
        localStorage.setItem('antigravity_custom_slides', JSON.stringify(updated));
      } catch {}

      sounds.playSuccess();
      const newIndex = (afterIndex ?? safeSlideIndex) + 1;
      setCurrentSlideIndex(newIndex);
      broadcastSlide(newIndex);
    },
    [customSlides, safeSlideIndex]
  );

  // Delete a custom blank slide
  const deleteSlide = useCallback(
    (slideId) => {
      const updated = customSlides.filter((s) => s.id !== slideId);
      setCustomSlides(updated);
      try {
        localStorage.setItem('antigravity_custom_slides', JSON.stringify(updated));
        localStorage.removeItem(`antigravity_canvas_${slideId}`);
      } catch {}

      sounds.playTone(350, 'sine', 0.15);
      setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      broadcastSlide(Math.max(0, safeSlideIndex - 1));
    },
    [customSlides, safeSlideIndex]
  );

  // Update a custom blank slide
  const updateSlide = useCallback(
    (slideId, newData) => {
      setCustomSlides((prev) => {
        const next = prev.map((s) => (s.id === slideId ? { ...s, ...newData } : s));
        try {
          localStorage.setItem('antigravity_custom_slides', JSON.stringify(next));
        } catch {}
        return next;
      });
    },
    []
  );

  // Open homework question directly on a new blank whiteboard slide!
  const openExerciseOnBlankSlide = useCallback(
    (question) => {
      addBlankSlide(safeSlideIndex, {
        title: question.title || 'Resolução do Exercício',
        customData: {
          backgroundStyle: 'grid',
          imageLayout: 'split',
        },
      });
    },
    [addBlankSlide, safeSlideIndex]
  );

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
        case 'b':
        case 'B':
          e.preventDefault();
          addBlankSlide(safeSlideIndex);
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          // Jump to Slide 11 (Homework material)
          goToSlide(mergedSlides.length - 1);
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
  }, [goToNextSlide, goToPrevSlide, goToSlide, addBlankSlide, safeSlideIndex, mergedSlides.length]);

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans select-none relative">
      {/* Top Slide Header */}
      <SlideHeader
        currentSlideIndex={safeSlideIndex}
        totalSlides={totalSlides}
        slides={mergedSlides}
        onSelectSlide={goToSlide}
        onNext={goToNextSlide}
        onPrev={goToPrevSlide}
        isNotesOpen={isNotesOpen}
        onToggleNotes={() => setIsNotesOpen((prev) => !prev)}
        isDrawingActive={isDrawingActive}
        onToggleDrawing={() => setIsDrawingActive((prev) => !prev)}
        onAddBlankSlide={addBlankSlide}
        onOpenHomework={() => goToSlide(mergedSlides.length - 1)}
        onDeleteSlide={deleteSlide}
      />

      {/* Main Slide Presentation Stage */}
      <main className="flex-1 w-full relative overflow-hidden bg-radial from-slate-900 via-slate-950 to-slate-950">
        <div key={currentSlideMeta.id || safeSlideIndex} className="w-full h-full animate-in fade-in duration-200">
          <CurrentSlideComponent
            slide={currentSlideMeta}
            onUpdateSlide={updateSlide}
            onDeleteSlide={deleteSlide}
            onOpenExerciseOnBlankSlide={openExerciseOnBlankSlide}
            onViewHomeworkMaterial={() => goToSlide(mergedSlides.length - 1)}
          />
        </div>
      </main>

      {/* Bottom Compact Dock */}
      <footer className="h-11 bg-slate-950/95 border-t border-slate-800/80 px-4 flex items-center justify-between z-20 text-xs text-slate-400">
        {/* Left: Quick slide dots / pills */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 max-w-xl">
          {mergedSlides.map((s, idx) => (
            <button
              key={s.id || idx}
              onClick={() => goToSlide(idx)}
              className={`h-6 px-2 rounded-lg font-mono text-[11px] font-bold transition flex items-center justify-center shrink-0 ${
                safeSlideIndex === idx
                  ? s.isCustom
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                    : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : s.isCustom
                  ? 'bg-amber-950/40 text-amber-400 hover:bg-amber-900/60'
                  : 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={`${s.isCustom ? 'Quadro Extra: ' : ''}${s.title}`}
            >
              {s.isCustom ? '✏️' : idx === mergedSlides.length - 1 ? '📄' : s.id || idx + 1}
            </button>
          ))}

          {/* Quick Add Blank Slide + pill */}
          <button
            onClick={() => addBlankSlide(safeSlideIndex)}
            className="h-6 px-2 rounded-lg bg-slate-900 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-[11px] flex items-center gap-1 transition"
            title="Adicionar Slide em Branco após o slide atual"
          >
            <PlusSquare className="w-3 h-3" />
            <span>Novo</span>
          </button>
        </div>

        {/* Center: Educational motto */}
        <div className="hidden lg:flex items-center gap-2 text-slate-400">
          <span className="font-semibold text-slate-300">Matemática em Movimento</span>
          <span className="text-slate-600">•</span>
          <span>{LESSON_INFO.grade}</span>
        </div>

        {/* Right: Quick tool labels */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => goToSlide(mergedSlides.length - 1)}
            className="hidden sm:flex items-center gap-1 text-slate-400 hover:text-indigo-400 transition"
            title="Ver Material da Lição de Casa (Atalho: H)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Lição <kbd className="px-1 py-0.2 bg-slate-800 rounded font-mono text-[10px]">H</kbd></span>
          </button>

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
            {safeSlideIndex + 1}/{totalSlides}
          </div>
        </div>
      </footer>

      {/* Floating Teacher Notes Panel */}
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
