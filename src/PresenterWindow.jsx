import React, { useState, useEffect, useMemo } from 'react';
import { SLIDES_DATA, LESSON_INFO } from './data/lessonData';
import MathView from './components/MathView';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Mic,
  MessageSquare,
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Maximize2,
  Timer,
  FileText,
} from 'lucide-react';
import { timerManager } from './utils/timerManager';

export default function PresenterWindow() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => {
    const saved = localStorage.getItem('antigravity_current_slide');
    return saved ? parseInt(saved, 10) || 0 : 0;
  });
  const [currentTime, setCurrentTime] = useState('');
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activeTimer, setActiveTimer] = useState(null);

  // Dynamic slides metadata state
  const [slidesMeta, setSlidesMeta] = useState(() => {
    try {
      const custom = JSON.parse(localStorage.getItem('antigravity_custom_slides') || '[]');
      const list = [...SLIDES_DATA];
      custom.forEach((c) => {
        const targetPos = Math.min(list.length, (c.insertAfterIndex ?? 0) + 1);
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
        });
      });
      return list;
    } catch {
      return SLIDES_DATA;
    }
  });

  const totalSlides = slidesMeta.length;
  const safeIndex = Math.min(currentSlideIndex, Math.max(0, totalSlides - 1));
  const currentSlide = slidesMeta[safeIndex] || slidesMeta[0];
  const nextSlide = safeIndex < totalSlides - 1 ? slidesMeta[safeIndex + 1] : null;

  // Broadcast Channel for syncing with main slide window
  useEffect(() => {
    let channel = null;
    try {
      channel = new BroadcastChannel('slides_sync');
      channel.onmessage = (event) => {
        if (event.data?.type === 'SLIDE_CHANGED') {
          setCurrentSlideIndex(event.data.index);
          if (event.data.slidesMeta) {
            setSlidesMeta(event.data.slidesMeta);
          }
        }
      };
    } catch {}

    // LocalStorage fallback for sync
    const handleStorage = (e) => {
      if (e.key === 'antigravity_current_slide') {
        const idx = parseInt(e.newValue, 10);
        if (!isNaN(idx)) setCurrentSlideIndex(idx);
      }
      if (e.key === 'antigravity_custom_slides') {
        try {
          const custom = JSON.parse(e.newValue || '[]');
          const list = [...SLIDES_DATA];
          custom.forEach((c) => {
            const targetPos = Math.min(list.length, (c.insertAfterIndex ?? 0) + 1);
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
            });
          });
          setSlidesMeta(list);
        } catch {}
      }
    };
    window.addEventListener('storage', handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Clock & Presentation elapsed timer & Active background timer listener
  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
      setTimerSeconds((prev) => prev + 1);
    }, 1000);

    const unsubTimer = timerManager.subscribe(() => {
      setActiveTimer(timerManager.getActiveTimer());
    });

    return () => {
      clearInterval(clockInterval);
      unsubTimer();
    };
  }, []);

  const changeSlide = (newIndex) => {
    if (newIndex >= 0 && newIndex < totalSlides) {
      setCurrentSlideIndex(newIndex);
      localStorage.setItem('antigravity_current_slide', String(newIndex));
      try {
        const channel = new BroadcastChannel('slides_sync');
        channel.postMessage({ type: 'SLIDE_CHANGED', index: newIndex });
        channel.close();
      } catch {}
    }
  };

  const elapsedMin = Math.floor(timerSeconds / 60);
  const elapsedSec = timerSeconds % 60;
  const formattedElapsed = `${String(elapsedMin).padStart(2, '0')}:${String(elapsedSec).padStart(2, '0')}`;

  const activeMin = activeTimer ? Math.floor(activeTimer.remainingSeconds / 60) : 0;
  const activeSec = activeTimer ? activeTimer.remainingSeconds % 60 : 0;
  const formattedActive = `${String(activeMin).padStart(2, '0')}:${String(activeSec).padStart(2, '0')}`;

  return (
    <div className="w-screen h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-hidden">
      {/* Presenter Top Bar */}
      <header className="h-14 bg-slate-900 border-b border-slate-800 px-5 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Painel Privado do Professor</span>
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            (Esta janela NÃO deve ser compartilhada com os alunos)
          </span>
        </div>

        {/* Timers */}
        <div className="flex items-center gap-3 text-xs font-mono">
          {/* Active running timer badge if any timer is ticking */}
          {activeTimer && (
            <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-lg animate-pulse">
              <Timer className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeTimer.title}:</span>
              <span className="font-bold">{formattedActive}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            <span className="text-slate-400 font-sans">Hora Atual:</span>
            <span className="text-white font-bold">{currentTime}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
            <span className="text-slate-400 font-sans">Tempo de Aula:</span>
            <span className="text-emerald-400 font-bold">{formattedElapsed}</span>
          </div>
        </div>
      </header>

      {/* Main Grid: Left (Previews & Nav) | Right (Speaker Notes & Chat Prompts) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left Side: Current Slide Card & Controls (5 cols) */}
        <div className="lg:col-span-5 border-r border-slate-800/80 p-5 flex flex-col justify-between overflow-y-auto bg-slate-950/70">
          <div>
            {/* Slide Position & Title */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                  currentSlide.isCustom
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-indigo-600 text-white'
                }`}
              >
                {currentSlide.isCustom
                  ? `Slide Extra ${safeIndex + 1} de ${totalSlides}`
                  : `Slide ${safeIndex + 1} de ${totalSlides}`}
              </span>
              <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {currentSlide.time} ({currentSlide.duration})
              </span>
            </div>

            <h2 className="text-xl font-black text-white mb-4">
              {currentSlide.title}
            </h2>

            {/* Current Slide Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 mb-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Habilidade BNCC / Foco:
              </div>
              <div className="text-xs text-indigo-300 font-semibold">
                {currentSlide.habilities || 'Resolução e Fixação Pedagógica'}
              </div>
            </div>

            {/* Next Slide Preview Card */}
            {nextSlide ? (
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/60 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase">
                  <span>Próximo Slide:</span>
                  <span className="text-amber-400 font-normal">{nextSlide.time}</span>
                </div>
                <div className="text-sm font-bold text-slate-200">
                  {safeIndex + 2}. {nextSlide.title}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 text-xs text-emerald-300 font-bold">
                🏁 Este é o último slide da aula!
              </div>
            )}
          </div>

          {/* Large Remote Navigation Buttons */}
          <div className="pt-4 border-t border-slate-800 mt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => changeSlide(safeIndex - 1)}
                disabled={safeIndex === 0}
                className={`py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border transition ${
                  safeIndex === 0
                    ? 'border-slate-800 text-slate-600 bg-slate-900/50 cursor-not-allowed'
                    : 'border-slate-700 bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Anterior (←)</span>
              </button>

              <button
                onClick={() => changeSlide(safeIndex + 1)}
                disabled={safeIndex === totalSlides - 1}
                className={`py-3.5 px-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border transition ${
                  safeIndex === totalSlides - 1
                    ? 'border-slate-800 text-slate-600 bg-slate-900/50 cursor-not-allowed'
                    : 'border-indigo-600 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                }`}
              >
                <span>Próximo (→)</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Quick jump pills */}
            <div className="flex flex-wrap gap-1 justify-center pt-1 max-h-24 overflow-y-auto">
              {slidesMeta.map((s, idx) => (
                <button
                  key={s.id || idx}
                  onClick={() => changeSlide(idx)}
                  className={`w-7 h-7 rounded-lg text-xs font-bold font-mono transition ${
                    safeIndex === idx
                      ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400'
                      : s.isCustom
                      ? 'bg-amber-950/50 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                  title={`${s.isCustom ? 'Extra: ' : ''}${s.id || idx + 1}. ${s.title}`}
                >
                  {s.isCustom ? '✏️' : s.id || idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Speaker Notes & Pedagogical Prompts (7 cols) */}
        <div className="lg:col-span-7 p-6 overflow-y-auto space-y-5 bg-slate-900/40">
          {/* Section 1: O Que Falar */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-3">
              <Mic className="w-5 h-5" />
              <span>Roteiro Sugerido: O Que Falar neste Slide</span>
            </div>
            <p className="text-slate-100 text-base sm:text-lg leading-relaxed italic bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
              "{currentSlide.speakerScript}"
            </p>
          </div>

          {/* Section 2: Perguntas para o Chat */}
          {currentSlide.chatPrompt && (
            <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-3xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <MessageSquare className="w-5 h-5" />
                  <span>Pergunta Exata para Lançar no Chat:</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                  Copiar / Falar
                </span>
              </div>
              <p className="text-emerald-100 text-base font-semibold leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-emerald-900/40">
                "{currentSlide.chatPrompt}"
              </p>

              {currentSlide.expectedAnswer && (
                <div className="mt-3 pt-3 border-t border-emerald-800/30 flex items-start gap-2 text-xs sm:text-sm text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong>Resposta Esperada dos Alunos:</strong> {currentSlide.expectedAnswer}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section 3: Alertas Pedagógicos & Erros Comuns */}
          {currentSlide.pedagogicalTip && (
            <div className="bg-amber-950/30 border border-amber-500/40 rounded-3xl p-5 shadow-xl">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Alerta Pedagógico (Ficha de Planejamento):</span>
              </div>
              <p className="text-amber-200/90 text-sm leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-amber-900/40">
                {currentSlide.pedagogicalTip}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
