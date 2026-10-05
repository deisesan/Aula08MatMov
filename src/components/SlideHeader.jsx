import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
  BookOpen,
  Pencil,
  Grid,
  Clock,
  Volume2,
  VolumeX,
  ExternalLink,
  PlusSquare,
  FileText,
  Timer,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { timerManager } from '../utils/timerManager';

export default function SlideHeader({
  currentSlideIndex,
  totalSlides,
  slides,
  onSelectSlide,
  onNext,
  onPrev,
  isNotesOpen,
  onToggleNotes,
  isDrawingActive,
  onToggleDrawing,
  onAddBlankSlide,
  onOpenHomework,
  onDeleteSlide,
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeTimer, setActiveTimer] = useState(null);

  const currentSlide = slides[currentSlideIndex] || slides[0];
  const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;

  // Real-time clock & Active timer subscription
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const unsubTimer = timerManager.subscribe(() => {
      setActiveTimer(timerManager.getActiveTimer());
    });

    return () => {
      clearInterval(interval);
      unsubTimer();
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playTone(800, 'sine', 0.1);
  };

  // Format active timer
  const activeMinutes = activeTimer ? Math.floor(activeTimer.remainingSeconds / 60) : 0;
  const activeSeconds = activeTimer ? activeTimer.remainingSeconds % 60 : 0;
  const formattedActiveTimer = `${String(activeMinutes).padStart(2, '0')}:${String(activeSeconds).padStart(2, '0')}`;

  return (
    <>
      <header className="h-14 bg-slate-900/90 border-b border-slate-800 backdrop-blur-md px-4 flex items-center justify-between select-none relative z-30">
        {/* Progress Bar at the top edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Left: Branding & Quick Jump */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-2 text-xs font-semibold"
            title="Ver todos os slides da aula"
          >
            <Grid className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Índice</span>
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold border ${
                  currentSlide.isCustom
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                }`}
              >
                {currentSlide.isCustom
                  ? `Extra ${currentSlideIndex + 1}`
                  : `Slide ${currentSlide.id || currentSlideIndex + 1}/${totalSlides}`}
              </span>
              <h1 className="text-sm font-bold text-slate-100 truncate max-w-[180px] md:max-w-xs lg:max-w-md">
                {currentSlide.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Center: Live Clock & Real-time Background Timer (Indestructible!) */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Active running timer badge if running */}
          {activeTimer && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-xs font-mono text-amber-300 animate-pulse">
              <Timer className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-sans font-bold">{activeTimer.title}:</span>
              <span className="font-bold">{formattedActiveTimer}</span>
            </div>
          )}

          <div className="flex items-center gap-2 px-3 py-1 bg-slate-950/70 rounded-full border border-slate-800/80 text-xs">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono text-slate-200">{currentTime}</span>
            <span className="text-slate-500">|</span>
            <span className="text-amber-300 font-medium">{currentSlide.time || 'Flexível'}</span>
          </div>
        </div>

        {/* Right: Controls Toolbar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* + Add Blank Slide Button */}
          {onAddBlankSlide && (
            <button
              onClick={() => onAddBlankSlide(currentSlideIndex)}
              className="p-2 sm:px-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-black text-xs transition flex items-center gap-1.5 shadow-md shadow-amber-500/20"
              title="Adicionar Novo Slide em Branco / Quadro de Exercício Aqui (Atalho: B ou Ctrl+B)"
            >
              <PlusSquare className="w-4 h-4 text-slate-950" />
              <span className="hidden xl:inline">+ Slide em Branco</span>
            </button>
          )}

          {/* Homework Material Button */}
          {onOpenHomework && (
            <button
              onClick={onOpenHomework}
              className="p-2 sm:px-2.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 hover:text-white border border-indigo-500/40 text-xs font-bold transition flex items-center gap-1.5"
              title="Ver Material da Lição de Casa / Baixar PDF (Atalho: H)"
            >
              <FileText className="w-4 h-4 text-indigo-400" />
              <span className="hidden xl:inline">Lição de Casa</span>
            </button>
          )}

          {/* Audio toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl transition ${
              soundEnabled ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-400'
            }`}
            title={soundEnabled ? 'Desativar sons' : 'Ativar sons'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Teacher Pen / Whiteboard Overlay */}
          <button
            onClick={onToggleDrawing}
            className={`p-2 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold ${
              isDrawingActive
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Lousa / Caneta de Desenho (Atalho: D)"
          >
            <Pencil className="w-4 h-4 text-amber-400" />
            <span className="hidden xl:inline">Caneta</span>
          </button>

          {/* Teacher Notes (Lateral Drawer) */}
          <button
            onClick={onToggleNotes}
            className={`p-2 rounded-xl transition flex items-center gap-1.5 text-xs font-semibold ${
              isNotesOpen
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white'
            }`}
            title="Notas do Professor na Tela (Atalho: N)"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="hidden xl:inline">Notas</span>
          </button>

          {/* Presenter Window Popup (Separate screen) */}
          <button
            onClick={() => {
              const url = window.location.origin + window.location.pathname + '?mode=presenter';
              window.open(url, 'PresenterWindow', 'width=1100,height=750,menubar=no,toolbar=no,location=no');
            }}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-amber-600/20 hover:border-amber-500/50 border border-slate-700/60 text-slate-300 hover:text-amber-400 transition flex items-center gap-1.5 text-xs font-semibold"
            title="Abrir Janela Privada do Apresentador (Para 2 telas / sem que os alunos vejam as notas)"
          >
            <ExternalLink className="w-4 h-4 text-amber-400" />
            <span className="hidden xl:inline">2ª Tela</span>
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Tela Cheia (Atalho: F)"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Nav arrows */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={onPrev}
              disabled={currentSlideIndex === 0}
              className={`p-1.5 rounded-lg border transition ${
                currentSlideIndex === 0
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
              title="Slide Anterior (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              disabled={currentSlideIndex === totalSlides - 1}
              className={`p-1.5 rounded-lg border transition ${
                currentSlideIndex === totalSlides - 1
                  ? 'border-slate-800 text-slate-600 cursor-not-allowed'
                  : 'border-indigo-600 bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20'
              }`}
              title="Próximo Slide (→ ou Espaço)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Slide Navigation Modal */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-white">Roteiro Completo da Aula</h3>
                <p className="text-xs text-slate-400">Clique para pular instantaneamente para qualquer momento da aula</p>
              </div>

              <div className="flex items-center gap-2">
                {onAddBlankSlide && (
                  <button
                    onClick={() => {
                      onAddBlankSlide(currentSlideIndex);
                      setIsMenuOpen(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1 shadow-sm"
                  >
                    <PlusSquare className="w-3.5 h-3.5" />
                    <span>+ Slide em Branco</span>
                  </button>
                )}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Fechar
                </button>
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 overflow-y-auto">
              {slides.map((s, idx) => (
                <div
                  key={s.id || idx}
                  className={`p-3 rounded-xl border text-left transition flex items-start justify-between gap-2 ${
                    currentSlideIndex === idx
                      ? 'bg-indigo-950/70 border-indigo-500/80 ring-2 ring-indigo-500/40'
                      : s.isCustom
                      ? 'bg-amber-950/20 border-amber-500/40 hover:bg-slate-800'
                      : 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <button
                    onClick={() => {
                      onSelectSlide(idx);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-start gap-3 flex-1 text-left min-w-0"
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        currentSlideIndex === idx
                          ? 'bg-indigo-600 text-white'
                          : s.isCustom
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {s.isCustom ? '✏️' : s.id || idx + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm text-slate-100 truncate">
                        {s.title}
                      </div>
                      <div className="text-xs text-amber-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" /> {s.time || 'Flexível'} ({s.duration || 'Livre'})
                      </div>
                    </div>
                  </button>

                  {/* Delete button if custom slide */}
                  {s.isCustom && onDeleteSlide && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm('Excluir este slide extra?')) {
                          onDeleteSlide(s.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition shrink-0"
                      title="Excluir slide"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
