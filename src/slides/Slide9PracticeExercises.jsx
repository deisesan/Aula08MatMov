import React, { useState, useEffect } from 'react';
import MathView from '../components/MathView';
import { Pencil, Timer, Play, Pause, RotateCcw, Lightbulb, CheckCircle2, MessageSquare, Award } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Slide9PracticeExercises() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes (300 seconds)
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showHintQ1, setShowHintQ1] = useState(false);
  const [showAnswerQ1, setShowAnswerQ1] = useState(false);
  const [showHintQ2, setShowHintQ2] = useState(false);
  const [showAnswerQ2, setShowAnswerQ2] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsTimerRunning(false);
            sounds.playBell();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    sounds.playTone(isTimerRunning ? 400 : 700, 'sine', 0.15);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimeLeft(300);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTimer = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const revealQ1 = () => {
    setShowAnswerQ1(true);
    sounds.playSuccess();
  };

  const revealQ2 = () => {
    setShowAnswerQ2(true);
    sounds.playSuccess();
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Prática Autônoma • 11:05 às 11:20
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Mão na Massa no Caderno (Capítulo 6)
          </h2>
        </div>

        {/* 5-minute practice timer widget */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
          <div className="flex items-center gap-2 px-2.5">
            <Timer className="w-4 h-4 text-amber-400" />
            <span className="font-mono font-bold text-base text-white">{formattedTimer}</span>
          </div>

          <button
            onClick={toggleTimer}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
              isTimerRunning
                ? 'bg-amber-500 text-slate-950'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'
            }`}
          >
            {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isTimerRunning ? 'Pausar' : 'Iniciar 5 min'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="p-1 rounded-lg text-slate-400 hover:text-white"
            title="Resetar tempo"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Practice Instructions Banner */}
      <div className="p-3 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-slate-900 border border-indigo-500/30 rounded-2xl flex items-center justify-between text-xs sm:text-sm">
        <div className="flex items-center gap-2.5">
          <Pencil className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-slate-200">
            <strong>Instrução da Turma:</strong> Resolvam no caderno. Quando terminarem, digitem no chat: <code className="text-amber-300">Q1 = [valor]</code> e <code className="text-sky-300">Q2 = [valor]</code>!
          </span>
        </div>
      </div>

      {/* Two Questions Side by Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-2">
        {/* QUESTÃO 1 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs px-2.5 py-1 rounded-xl font-black bg-indigo-600/30 text-indigo-300 border border-indigo-500/40">
                Questão 1 • Pitágoras
              </span>
              <span className="text-xs text-slate-400">Capítulo 6</span>
            </div>

            <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium mb-4">
              Um lote retangular tem <strong className="text-indigo-400">30 metros</strong> de largura e uma diagonal medindo <strong className="text-amber-400">50 metros</strong>. Qual é o comprimento desse lote?
            </p>

            {/* Hint toggle */}
            {showHintQ1 ? (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 mb-3 animate-in fade-in">
                💡 <strong>Dica:</strong> A diagonal divide o retângulo em dois triângulos retângulos! A diagonal (50) é a hipotenusa e 30 é um dos catetos.
              </div>
            ) : (
              <button
                onClick={() => setShowHintQ1(true)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 mb-3"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Precisa de uma dica? Clique aqui</span>
              </button>
            )}
          </div>

          {/* Solution Area */}
          <div>
            {showAnswerQ1 ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-2 text-xs sm:text-sm animate-in fade-in">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Resolução Comentada:</span>
                </div>
                <div className="font-mono text-slate-200">
                  <MathView math="50^2 = 30^2 + x^2" block />
                  <MathView math="2500 = 900 + x^2 \implies x^2 = 1600" block />
                  <div className="text-center font-bold text-emerald-300 text-base mt-1">
                    <MathView math="x = \sqrt{1600} \implies \mathbf{x = 40\text{ metros}}" />
                  </div>
                </div>
                <div className="text-[11px] text-amber-300/90 pt-1 border-t border-emerald-800/40">
                  ⭐ <em>Terna clássica (3, 4, 5) multiplicada por 10!</em>
                </div>
              </div>
            ) : (
              <button
                onClick={revealQ1}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition"
              >
                Projetar Resolução da Questão 1
              </button>
            )}
          </div>
        </div>

        {/* QUESTÃO 2 */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs px-2.5 py-1 rounded-xl font-black bg-purple-600/30 text-purple-300 border border-purple-500/40">
                Questão 2 • Relações Métricas
              </span>
              <span className="text-xs text-slate-400">Capítulo 6</span>
            </div>

            <p className="text-slate-100 text-sm sm:text-base leading-relaxed font-medium mb-4">
              As projeções dos catetos sobre a hipotenusa de um triângulo retângulo medem <strong className="text-sky-400">4 cm</strong> e <strong className="text-sky-400">16 cm</strong>. Quanto mede a altura relativa à hipotenusa?
            </p>

            {/* Hint toggle */}
            {showHintQ2 ? (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 text-xs text-amber-200 mb-3 animate-in fade-in">
                💡 <strong>Dica:</strong> Temos as duas projeções <MathView math="m=4" /> e <MathView math="n=16" /> e queremos <MathView math="h" />. Qual relação une altura e projeções? (<MathView math="h^2 = m \cdot n" />)!
              </div>
            ) : (
              <button
                onClick={() => setShowHintQ2(true)}
                className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 mb-3"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Precisa de uma dica? Clique aqui</span>
              </button>
            )}
          </div>

          {/* Solution Area */}
          <div>
            {showAnswerQ2 ? (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 space-y-2 text-xs sm:text-sm animate-in fade-in">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Resolução Comentada:</span>
                </div>
                <div className="font-mono text-slate-200">
                  <MathView math="h^2 = m \cdot n \implies h^2 = 4 \cdot 16" block />
                  <MathView math="h^2 = 64" block />
                  <div className="text-center font-bold text-emerald-300 text-base mt-1">
                    <MathView math="h = \sqrt{64} \implies \mathbf{h = 8\text{ cm}}" />
                  </div>
                </div>
                <div className="text-[11px] text-amber-300/90 pt-1 border-t border-emerald-800/40">
                  ⭐ <em>A altura procurada mede 8 cm!</em>
                </div>
              </div>
            ) : (
              <button
                onClick={revealQ2}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm border border-slate-700 transition"
              >
                Projetar Resolução da Questão 2
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Chat Encouragement */}
      <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Verifique o chat e elogie os primeiros alunos que enviarem as respostas corretas!</span>
        </div>
        <div className="text-amber-400 font-semibold">Respostas: Q1 = 40 m | Q2 = 8 cm</div>
      </div>
    </div>
  );
}
