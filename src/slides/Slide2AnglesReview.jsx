import React, { useState } from 'react';
import MathView from '../components/MathView';
import { HelpCircle, CheckCircle, RotateCw, Lightbulb, Triangle } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Slide2AnglesReview() {
  const [selectedAngle, setSelectedAngle] = useState(30);
  const [quizRevealed, setQuizRevealed] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const otherAngle = 90 - selectedAngle;

  const handleOptionClick = (opt) => {
    setSelectedOption(opt);
    if (opt === 'B') {
      sounds.playSuccess();
    } else {
      sounds.playTone(300, 'sawtooth', 0.2);
    }
  };

  const handleReveal = () => {
    setQuizRevealed(true);
    setSelectedOption('B');
    sounds.playSuccess();
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Revisão Relâmpago • 09:35 às 09:40
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Fundamentos dos Ângulos no Triângulo
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300">
          <Triangle className="w-4 h-4 text-indigo-400" />
          <span>Soma Sempre = 180°</span>
        </div>
      </div>

      {/* 3 Columns / Cards of Theory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        {/* 1. Soma dos Ângulos */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-indigo-400 uppercase tracking-wide mb-1">
              Lei Universal
            </div>
            <h3 className="text-base font-bold text-white mb-2">Soma dos Ângulos Internos</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Em <strong className="text-white">qualquer triângulo</strong> do universo euclidiano, a soma dos 3 ângulos internos é sempre:
            </p>
          </div>
          <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl text-center">
            <MathView math="\alpha + \beta + \gamma = 180^\circ" block className="text-indigo-200 text-lg font-bold" />
          </div>
        </div>

        {/* 2. Classificação */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-purple-400 uppercase tracking-wide mb-1">
              Classificação
            </div>
            <h3 className="text-base font-bold text-white mb-2">Pelos Ângulos</h3>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="p-1.5 rounded-lg bg-slate-950/50 flex justify-between">
                <span>📐 <strong>Acutângulo:</strong></span>
                <span className="text-slate-400">3 ângulos &lt; 90°</span>
              </div>
              <div className="p-1.5 rounded-lg bg-slate-950/50 flex justify-between">
                <span>📐 <strong>Obtusângulo:</strong></span>
                <span className="text-slate-400">1 ângulo &gt; 90°</span>
              </div>
              <div className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex justify-between text-emerald-200">
                <span>⭐ <strong>Retângulo:</strong></span>
                <span className="font-bold">1 ângulo = 90°</span>
              </div>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 italic text-center">
            O triângulo retângulo é o astro da aula!
          </div>
        </div>

        {/* 3. Regra de Ouro */}
        <div className="bg-gradient-to-br from-amber-950/20 to-slate-900 border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Regra de Ouro</span>
            </div>
            <h3 className="text-base font-bold text-white mb-2">Ângulos Complementares</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Como um ângulo já gasta <strong className="text-amber-400">90°</strong>, os outros dois ângulos agudos somados medem exatamente:
            </p>
          </div>
          <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-center">
            <MathView math="\alpha + \beta = 90^\circ" block className="text-amber-300 text-lg font-bold" />
          </div>
        </div>
      </div>

      {/* Interactive Demonstration & Quiz Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Dynamic Triangle Visualizer with Slider */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-semibold text-slate-200">Simulador de Ângulos:</span>
            <span className="text-amber-400 font-mono font-bold">
              {selectedAngle}° + {otherAngle}° + 90° = 180°
            </span>
          </div>

          {/* SVG Right Triangle */}
          <div className="relative w-full h-44 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-center p-3">
            <svg viewBox="0 0 280 180" className="w-full h-full max-w-[280px]">
              {/* Triangle polygon */}
              <polygon
                points="40,150 240,150 40,30"
                fill="rgba(99, 102, 241, 0.15)"
                stroke="#818cf8"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* 90-degree square marker */}
              <rect x="40" y="125" width="25" height="25" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
              <circle cx="52.5" cy="137.5" r="2.5" fill="#f59e0b" />
              <text x="75" y="142" fill="#f59e0b" fontSize="12" fontWeight="bold">90°</text>

              {/* Top angle label */}
              <text x="48" y="45" fill="#38bdf8" fontSize="13" fontWeight="bold">
                {selectedAngle}°
              </text>

              {/* Bottom right angle label */}
              <text x="195" y="142" fill="#34d399" fontSize="13" fontWeight="bold">
                {otherAngle}°
              </text>
            </svg>
          </div>

          <div className="mt-3">
            <div className="flex justify-between text-xs text-slate-400 mb-1">
              <span>Arraste para variar o ângulo agudo:</span>
              <span className="text-indigo-400 font-bold">{selectedAngle}°</span>
            </div>
            <input
              type="range"
              min="10"
              max="80"
              value={selectedAngle}
              onChange={(e) => setSelectedAngle(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Interactive Chat Quiz */}
        <div className="lg:col-span-7 bg-gradient-to-br from-indigo-950/30 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base">Pergunta Relâmpago para o Chat:</h3>
              </div>
            </div>

            <p className="text-slate-200 text-sm sm:text-base font-semibold mb-4 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
              "Se um triângulo retângulo tem um ângulo agudo de <span className="text-amber-400">30°</span>, quanto mede o outro ângulo agudo?"
            </p>

            {/* Multiple Choice Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {[
                { id: 'A', text: '45°' },
                { id: 'B', text: '60°', isCorrect: true },
                { id: 'C', text: '70°' },
                { id: 'D', text: '90°' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionClick(opt.id)}
                  className={`p-3 rounded-xl border font-bold text-sm transition-all flex flex-col items-center justify-center ${
                    selectedOption === opt.id
                      ? opt.isCorrect
                        ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500'
                        : 'bg-rose-600/30 border-rose-500 text-rose-300'
                      : 'bg-slate-800/80 border-slate-700/80 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  <span className="text-xs text-slate-400">{opt.id}</span>
                  <span className="text-lg">{opt.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reveal & Step by step */}
          <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
            <button
              onClick={handleReveal}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Revelar Resolução Comentada</span>
            </button>

            {quizRevealed && (
              <div className="text-xs sm:text-sm text-emerald-400 font-bold animate-in fade-in">
                Cálculo: <MathView math="90^\circ - 30^\circ = \mathbf{60^\circ}" /> ✅
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
