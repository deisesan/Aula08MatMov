import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Plus, Coffee, Droplets, Eye, Bell, Sparkles } from 'lucide-react';
import { timerManager } from '../utils/timerManager';

export default function Slide6BreakTimer() {
  const DEFAULT_SECONDS = 600; // 10 minutes
  const TIMER_ID = 'slide6_break';

  const [timerState, setTimerState] = useState(() =>
    timerManager.getTimer(TIMER_ID, DEFAULT_SECONDS, 'Intervalo Pedagógico', 'alarm')
  );

  useEffect(() => {
    const unsub = timerManager.subscribe((allTimers) => {
      if (allTimers[TIMER_ID]) {
        setTimerState({ ...allTimers[TIMER_ID] });
      }
    });
    return () => unsub();
  }, []);

  const isRunning = timerState.isRunning;
  const timeLeft = timerState.remainingSeconds;

  const toggleTimer = () => {
    timerManager.toggle(TIMER_ID, DEFAULT_SECONDS, 'Intervalo Pedagógico', 'alarm');
  };

  const resetTimer = () => {
    timerManager.reset(TIMER_ID, DEFAULT_SECONDS);
  };

  const addTime = (seconds) => {
    timerManager.addSeconds(TIMER_ID, seconds);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const progressPercent = ((DEFAULT_SECONDS - timeLeft) / DEFAULT_SECONDS) * 100;

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-5xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Coffee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Intervalo Pedagógico • 10:30 às 10:40
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Pausa de 10 Minutos para Descanso de Tela
            </h2>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <span>Retorno Pontual às:</span>
          <span className="text-emerald-400 font-bold font-mono text-sm">10:40</span>
        </div>
      </div>

      {/* Center Big Countdown Timer */}
      <div className="my-auto py-6 flex flex-col items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Subtle Outer Glow */}
          <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Time Display */}
          <div className="relative bg-slate-900/90 border-2 border-indigo-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col items-center backdrop-blur-xl">
            <div className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Tempo Restante de Intervalo</span>
            </div>

            <div
              className={`font-mono font-black text-6xl sm:text-8xl md:text-9xl tracking-tight transition-colors ${
                timeLeft === 0
                  ? 'text-rose-500 animate-pulse'
                  : timeLeft < 60
                  ? 'text-amber-400 animate-pulse'
                  : 'text-white'
              }`}
            >
              {formattedTime}
            </div>

            {/* Progress bar under display */}
            <div className="w-64 sm:w-80 h-2 bg-slate-800 rounded-full mt-4 overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-500 transition-all duration-1000"
                style={{ width: `${Math.min(100, Math.max(0, 100 - progressPercent))}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mt-6">
              <button
                onClick={toggleTimer}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition ${
                  isRunning
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Iniciar Cronômetro</span>
                  </>
                )}
              </button>

              <button
                onClick={resetTimer}
                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
                title="Reiniciar para 10 minutos"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => addTime(60)}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                title="Adicionar 1 minuto"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>1 min</span>
              </button>

              <button
                onClick={() => addTime(300)}
                className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1 transition"
                title="Adicionar 5 minutos"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>5 min</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wellness Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
            <Droplets className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <strong className="text-slate-100 block">Hidratação & Lanche:</strong>
            <span className="text-slate-400">Beba um copo d'água para oxigenar o cérebro.</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <strong className="text-slate-100 block">Descanso Visual:</strong>
            <span className="text-slate-400">Olhe para um ponto distante fora da tela.</span>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 shrink-0">
            <Bell className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <strong className="text-slate-100 block">Próximo Bloco:</strong>
            <span className="text-indigo-300">Relações Métricas no Triângulo!</span>
          </div>
        </div>
      </div>
    </div>
  );
}
