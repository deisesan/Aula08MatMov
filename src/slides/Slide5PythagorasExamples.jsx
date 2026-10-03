import React, { useState } from 'react';
import MathView from '../components/MathView';
import { ChevronRight, RotateCcw, CheckCircle, HelpCircle, Building2, Ruler } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Slide5PythagorasExamples() {
  const [activeTab, setActiveTab] = useState('ex1'); // 'ex1' or 'ex2'
  const [stepEx1, setStepEx1] = useState(1);
  const [stepEx2, setStepEx2] = useState(1);
  const [ladderVote, setLadderVote] = useState(null);

  const nextStepEx1 = () => {
    if (stepEx1 < 4) {
      setStepEx1((prev) => prev + 1);
      sounds.playTone(500 + stepEx1 * 60, 'sine', 0.15);
    } else {
      sounds.playSuccess();
    }
  };

  const nextStepEx2 = () => {
    if (stepEx2 < 5) {
      setStepEx2((prev) => prev + 1);
      sounds.playTone(500 + stepEx2 * 60, 'sine', 0.15);
    } else {
      sounds.playSuccess();
    }
  };

  const handleLadderVote = (choice) => {
    setLadderVote(choice);
    if (choice === '10') {
      sounds.playSuccess();
    } else {
      sounds.playTone(280, 'sawtooth', 0.2);
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Resolução Guiada • 10:15 às 10:30
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Exemplos Resolvidos: Pitágoras na Prática
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setActiveTab('ex1')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'ex1'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Exemplo 1: Hipotenusa</span>
          </button>
          <button
            onClick={() => setActiveTab('ex2')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'ex2'
                ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Exemplo 2: Escada na Parede</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto py-2">
        {activeTab === 'ex1' ? (
          /* EXAMPLE 1: Finding Hypotenuse (5 and 12 -> 13) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Diagram */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-between">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wide">
                  Figura Geométrica
                </span>
                <span className="text-xs font-mono text-slate-400">Catetos: 5 e 12</span>
              </div>

              {/* Triangle SVG */}
              <div className="w-full h-52 bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center">
                <svg viewBox="0 0 240 180" className="w-full h-full max-w-[240px]">
                  <polygon points="40,140 200,140 40,40" fill="rgba(99, 102, 241, 0.12)" stroke="#818cf8" strokeWidth="2.5" />
                  <rect x="40" y="122" width="18" height="18" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="49" cy="131" r="2" fill="#f59e0b" />

                  {/* Catetos */}
                  <text x="18" y="95" fill="#93c5fd" fontSize="13" fontWeight="bold">5 cm</text>
                  <text x="110" y="160" fill="#93c5fd" fontSize="13" fontWeight="bold">12 cm</text>

                  {/* Hypotenuse */}
                  <text
                    x="125"
                    y="78"
                    fill={stepEx1 >= 4 ? '#34d399' : '#f59e0b'}
                    fontSize="15"
                    fontWeight="black"
                    className="animate-pulse"
                  >
                    {stepEx1 >= 4 ? 'x = 13 cm' : 'x = ?'}
                  </text>
                </svg>
              </div>

              <div className="w-full mt-3 text-center text-xs text-slate-400">
                Hipotenusa oposta ao ângulo de 90°
              </div>
            </div>

            {/* Right: Step-by-Step Resolution */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <h3 className="font-bold text-base text-white mb-1">
                  Enunciado 1:
                </h3>
                <p className="text-slate-200 text-sm">
                  Em um triângulo retângulo, os catetos medem <strong className="text-indigo-400">5 cm</strong> e <strong className="text-indigo-400">12 cm</strong>. Qual é a medida <strong className="text-amber-400">x</strong> da hipotenusa?
                </p>
              </div>

              {/* Steps container */}
              <div className="space-y-2">
                {stepEx1 >= 1 && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <span className="text-slate-400 text-xs font-bold uppercase">Passo 1: Montar a Fórmula</span>
                    <MathView math="x^2 = 5^2 + 12^2" className="text-white font-bold text-base" />
                  </div>
                )}

                {stepEx1 >= 2 && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <span className="text-slate-400 text-xs font-bold uppercase">Passo 2: Elevar ao Quadrado</span>
                    <MathView math="x^2 = 25 + 144" className="text-amber-300 font-bold text-base" />
                  </div>
                )}

                {stepEx1 >= 3 && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <span className="text-slate-400 text-xs font-bold uppercase">Passo 3: Somar</span>
                    <MathView math="x^2 = 169" className="text-purple-300 font-bold text-base" />
                  </div>
                )}

                {stepEx1 >= 4 && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <div>
                      <span className="text-emerald-400 text-xs font-bold uppercase">Passo 4: Raiz Quadrada</span>
                      <div className="text-xs text-slate-300 mt-0.5">Tirar a raiz para achar o valor de x:</div>
                    </div>
                    <MathView math="x = \sqrt{169} \implies \mathbf{x = 13\text{ cm}}" className="text-emerald-300 font-black text-lg" />
                  </div>
                )}
              </div>

              {/* Step controller */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={nextStepEx1}
                  disabled={stepEx1 >= 4}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
                    stepEx1 >= 4
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>{stepEx1 >= 4 ? 'Resolução Concluída' : 'Revelar Próximo Passo'}</span>
                </button>

                <button
                  onClick={() => setStepEx1(1)}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                  title="Reiniciar passos"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* EXAMPLE 2: Real-world Ladder on Wall (10m and 6m -> h = 8m) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Diagram: Ladder */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-between">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Aplicação Cotidiana
                </span>
                <span className="text-xs font-mono text-slate-400">Escada na Parede</span>
              </div>

              {/* Ladder SVG */}
              <div className="w-full h-56 bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative">
                <svg viewBox="0 0 240 200" className="w-full h-full max-w-[240px]">
                  {/* Ground & Wall */}
                  <line x1="30" y1="170" x2="220" y2="170" stroke="#64748b" strokeWidth="4" />
                  <line x1="60" y1="20" x2="60" y2="170" stroke="#64748b" strokeWidth="5" />

                  {/* 90 deg wall-ground corner */}
                  <rect x="60" y="152" width="18" height="18" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  <circle cx="69" cy="161" r="2" fill="#f59e0b" />

                  {/* Ladder (Hypotenuse from (180, 170) to (60, 40)) */}
                  <line x1="180" y1="170" x2="60" y2="40" stroke="#eab308" strokeWidth="6" strokeLinecap="round" />
                  {/* Rungs of ladder */}
                  {[0.2, 0.35, 0.5, 0.65, 0.8].map((t, idx) => {
                    const x = 180 + (60 - 180) * t;
                    const y = 170 + (40 - 170) * t;
                    return (
                      <line
                        key={idx}
                        x1={x - 6}
                        y1={y - 5}
                        x2={x + 6}
                        y2={y + 5}
                        stroke="#ca8a04"
                        strokeWidth="3"
                      />
                    );
                  })}

                  {/* Dimension labels */}
                  <text x="135" y="90" fill="#fef08a" fontSize="13" fontWeight="bold">
                    10 m (escada)
                  </text>
                  <text x="105" y="190" fill="#93c5fd" fontSize="13" fontWeight="bold">
                    6 m (chão)
                  </text>
                  <text
                    x="25"
                    y="100"
                    fill={stepEx2 >= 5 ? '#34d399' : '#f87171'}
                    fontSize="14"
                    fontWeight="black"
                  >
                    {stepEx2 >= 5 ? 'h = 8 m' : 'h = ?'}
                  </text>
                </svg>
              </div>

              {/* Chat Question Embedded */}
              <div className="w-full mt-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
                <div className="font-semibold text-amber-300 mb-1 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Pergunta pro chat: Quem é a Hipotenusa?</span>
                </div>
                <div className="flex gap-2 mt-1.5">
                  <button
                    onClick={() => handleLadderVote('10')}
                    className={`flex-1 py-1.5 rounded-lg font-bold border transition ${
                      ladderVote === '10'
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    10 m (Escada)
                  </button>
                  <button
                    onClick={() => handleLadderVote('6')}
                    className={`flex-1 py-1.5 rounded-lg font-bold border transition ${
                      ladderVote === '6'
                        ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    6 m (Base)
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Resolution Steps */}
            <div className="lg:col-span-7 space-y-3">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <h3 className="font-bold text-base text-white mb-1">
                  Enunciado 2:
                </h3>
                <p className="text-slate-200 text-sm">
                  Uma escada de <strong className="text-amber-400">10 metros</strong> está apoiada em uma parede. A base da escada distante <strong className="text-indigo-400">6 metros</strong> da parede. Qual é a altura <strong className="text-rose-400">h</strong> alcançada pela escada?
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-1.5">
                {stepEx2 >= 1 && (
                  <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs sm:text-sm animate-in fade-in">
                    <span className="text-slate-400 font-bold uppercase">Passo 1: Hipotenusa = 10 m</span>
                    <MathView math="10^2 = h^2 + 6^2" className="text-white font-bold" />
                  </div>
                )}
                {stepEx2 >= 2 && (
                  <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs sm:text-sm animate-in fade-in">
                    <span className="text-slate-400 font-bold uppercase">Passo 2: Elevar ao Quadrado</span>
                    <MathView math="100 = h^2 + 36" className="text-amber-300 font-bold" />
                  </div>
                )}
                {stepEx2 >= 3 && (
                  <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs sm:text-sm animate-in fade-in">
                    <span className="text-slate-400 font-bold uppercase">Passo 3: Isolar o h²</span>
                    <MathView math="h^2 = 100 - 36 \implies h^2 = 64" className="text-purple-300 font-bold" />
                  </div>
                )}
                {stepEx2 >= 4 && (
                  <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-xs sm:text-sm animate-in fade-in">
                    <span className="text-slate-400 font-bold uppercase">Passo 4: Raiz Quadrada</span>
                    <MathView math="h = \sqrt{64} \implies \mathbf{h = 8\text{ metros}}" className="text-emerald-300 font-bold text-base" />
                  </div>
                )}
                {stepEx2 >= 5 && (
                  <div className="p-3 bg-amber-950/40 border border-amber-500/50 rounded-xl flex items-center justify-between text-xs text-amber-200 animate-in fade-in">
                    <div>
                      <strong>💡 Olhar de Águia:</strong> É a terna (3, 4, 5) multiplicada por 2!
                    </div>
                    <span className="font-mono font-bold text-amber-300">
                      (3x2 = 6, 4x2 = 8, 5x2 = 10)
                    </span>
                  </div>
                )}
              </div>

              {/* Step controller */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={nextStepEx2}
                  disabled={stepEx2 >= 5}
                  className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
                    stepEx2 >= 5
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/30'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>{stepEx2 >= 5 ? 'Resolução Concluída' : 'Revelar Próximo Passo'}</span>
                </button>

                <button
                  onClick={() => setStepEx2(1)}
                  className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                  title="Reiniciar passos"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
