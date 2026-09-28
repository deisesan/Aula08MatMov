import React, { useState } from 'react';
import MathView from '../components/MathView';
import { ChevronRight, RotateCcw, CheckCircle, Lightbulb, Target } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Slide8MetricExamples() {
  const [activeTab, setActiveTab] = useState('ex1'); // 'ex1' or 'ex2'
  const [stepEx1, setStepEx1] = useState(1);
  const [stepEx2, setStepEx2] = useState(1);

  const nextStepEx1 = () => {
    if (stepEx1 < 4) {
      setStepEx1((prev) => prev + 1);
      sounds.playTone(500 + stepEx1 * 60, 'sine', 0.15);
    } else {
      sounds.playSuccess();
    }
  };

  const nextStepEx2 = () => {
    if (stepEx2 < 4) {
      setStepEx2((prev) => prev + 1);
      sounds.playTone(500 + stepEx2 * 60, 'sine', 0.15);
    } else {
      sounds.playSuccess();
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Resolução Comentada • 10:55 às 11:05
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Exemplos de Aplicação das Relações Métricas
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
            <Target className="w-3.5 h-3.5" />
            <span>Exemplo 1: Altura (h² = m·n)</span>
          </button>
          <button
            onClick={() => setActiveTab('ex2')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              activeTab === 'ex2'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            <span>Exemplo 2: Cateto (b² = a·m)</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="my-auto py-2">
        {activeTab === 'ex1' ? (
          /* EXAMPLE 1: h^2 = 3 * 12 = 36 -> h = 6 */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Diagram */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-between">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wide">
                  Dados do Problema
                </span>
                <span className="text-xs text-slate-400">Projeções m=3 e n=12</span>
              </div>

              <div className="w-full h-52 bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center">
                <svg viewBox="0 0 280 170" className="w-full h-full max-w-[280px]">
                  {/* Triangle */}
                  <polygon points="30,140 100,35 250,140" fill="rgba(56, 189, 248, 0.08)" stroke="#475569" strokeWidth="2" />
                  {/* Altitude */}
                  <line x1="100" y1="35" x2="100" y2="140" stroke="#38bdf8" strokeWidth="3.5" strokeDasharray="3 3" />
                  <rect x="86" y="126" width="14" height="14" fill="none" stroke="#64748b" strokeWidth="1.5" />

                  {/* Base projections */}
                  <line x1="30" y1="140" x2="100" y2="140" stroke="#38bdf8" strokeWidth="4" />
                  <line x1="100" y1="140" x2="250" y2="140" stroke="#38bdf8" strokeWidth="4" />

                  {/* Labels */}
                  <text x="55" y="158" fill="#38bdf8" fontSize="12" fontWeight="bold">m = 3 cm</text>
                  <text x="160" y="158" fill="#38bdf8" fontSize="12" fontWeight="bold">n = 12 cm</text>
                  <text
                    x="108"
                    y="85"
                    fill={stepEx1 >= 4 ? '#34d399' : '#f59e0b'}
                    fontSize="15"
                    fontWeight="black"
                    className="animate-pulse"
                  >
                    {stepEx1 >= 4 ? 'h = 6 cm' : 'h = ?'}
                  </text>
                </svg>
              </div>

              <div className="w-full mt-3 text-center text-xs text-slate-400">
                Fórmula da Altura: <MathView math="h^2 = m \cdot n" className="text-sky-300 font-bold" />
              </div>
            </div>

            {/* Right: Step-by-Step */}
            <div className="lg:col-span-7 space-y-3">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <h3 className="font-bold text-base text-white mb-1">
                  Enunciado 1:
                </h3>
                <p className="text-slate-200 text-sm">
                  Em um triângulo retângulo, a altura divide a hipotenusa em duas projeções medindo <strong className="text-sky-400">3 cm</strong> e <strong className="text-sky-400">12 cm</strong>. Calcule a medida dessa altura <strong className="text-amber-400">h</strong>.
                </p>
              </div>

              <div className="space-y-2">
                {stepEx1 >= 1 && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <span className="text-slate-400 text-xs font-bold uppercase">Passo 1: Escolher a Fórmula</span>
                    <MathView math="h^2 = m \cdot n" className="text-sky-300 font-bold text-base" />
                  </div>
                )}
                {stepEx1 >= 2 && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <span className="text-slate-400 text-xs font-bold uppercase">Passo 2: Substituir os Valores</span>
                    <MathView math="h^2 = 3 \cdot 12" className="text-amber-300 font-bold text-base" />
                  </div>
                )}
                {stepEx1 >= 3 && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <span className="text-slate-400 text-xs font-bold uppercase">Passo 3: Multiplicar</span>
                    <MathView math="h^2 = 36" className="text-purple-300 font-bold text-base" />
                  </div>
                )}
                {stepEx1 >= 4 && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <div>
                      <span className="text-emerald-400 text-xs font-bold uppercase">Passo 4: Raiz Quadrada</span>
                      <div className="text-xs text-slate-300 mt-0.5">Tirar a raiz para achar h:</div>
                    </div>
                    <MathView math="h = \sqrt{36} \implies \mathbf{h = 6\text{ cm}}" className="text-emerald-300 font-black text-lg" />
                  </div>
                )}
              </div>

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
                  title="Reiniciar"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* EXAMPLE 2: b^2 = a * m = 25 * 9 = 225 -> b = 15 */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG Diagram */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-between">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wide">
                  Dados do Problema
                </span>
                <span className="text-xs text-slate-400">a = 25 cm | m = 9 cm</span>
              </div>

              <div className="w-full h-52 bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center">
                <svg viewBox="0 0 280 170" className="w-full h-full max-w-[280px]">
                  <polygon points="30,135 110,35 250,135" fill="rgba(168, 85, 247, 0.08)" stroke="#475569" strokeWidth="2" />
                  <line x1="110" y1="35" x2="110" y2="135" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />

                  {/* Leg b highlighted */}
                  <line x1="30" y1="135" x2="110" y2="35" stroke="#a855f7" strokeWidth="4" />

                  {/* Projection m */}
                  <line x1="30" y1="135" x2="110" y2="135" stroke="#a855f7" strokeWidth="4" />

                  {/* Full hypotenuse bracket */}
                  <line x1="30" y1="152" x2="250" y2="152" stroke="#facc15" strokeWidth="2" />
                  <line x1="30" y1="147" x2="30" y2="157" stroke="#facc15" strokeWidth="2" />
                  <line x1="250" y1="147" x2="250" y2="157" stroke="#facc15" strokeWidth="2" />

                  {/* Labels */}
                  <text
                    x="50"
                    y="75"
                    fill={stepEx2 >= 4 ? '#34d399' : '#c084fc'}
                    fontSize="15"
                    fontWeight="black"
                    className="animate-pulse"
                  >
                    {stepEx2 >= 4 ? 'b = 15 cm' : 'b = ?'}
                  </text>
                  <text x="60" y="147" fill="#c084fc" fontSize="11" fontWeight="bold">m = 9</text>
                  <text x="140" y="166" fill="#facc15" fontSize="12" fontWeight="bold" textAnchor="middle">
                    hipotenusa a = 25 cm
                  </text>
                </svg>
              </div>

              <div className="w-full mt-3 text-center text-xs text-slate-400">
                Fórmula do Cateto: <MathView math="b^2 = a \cdot m" className="text-purple-300 font-bold" />
              </div>
            </div>

            {/* Right: Step-by-Step */}
            <div className="lg:col-span-7 space-y-3">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                <h3 className="font-bold text-base text-white mb-1">
                  Enunciado 2:
                </h3>
                <p className="text-slate-200 text-sm">
                  Um triângulo retângulo possui hipotenusa total <strong className="text-amber-400">a = 25 cm</strong>. A projeção do cateto <strong className="text-purple-400">b</strong> sobre ela mede <strong className="text-purple-400">9 cm</strong>. Quanto mede o cateto <strong className="text-emerald-400">b</strong>?
                </p>
              </div>

              <div className="space-y-2">
                {stepEx2 >= 1 && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <span className="text-slate-400 text-xs font-bold uppercase">Passo 1: Fórmula do Cateto</span>
                    <MathView math="b^2 = a \cdot m" className="text-purple-300 font-bold text-base" />
                  </div>
                )}
                {stepEx2 >= 2 && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <span className="text-slate-400 text-xs font-bold uppercase">Passo 2: Substituir os Dados</span>
                    <MathView math="b^2 = 25 \cdot 9" className="text-amber-300 font-bold text-base" />
                  </div>
                )}
                {stepEx2 >= 3 && (
                  <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <span className="text-slate-400 text-xs font-bold uppercase">Passo 3: Multiplicar</span>
                    <MathView math="b^2 = 225" className="text-sky-300 font-bold text-base" />
                  </div>
                )}
                {stepEx2 >= 4 && (
                  <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-xl flex items-center justify-between text-sm animate-in fade-in">
                    <div>
                      <span className="text-emerald-400 text-xs font-bold uppercase">Passo 4: Raiz Quadrada</span>
                      <div className="text-xs text-slate-300 mt-0.5">Tirar a raiz de 225:</div>
                    </div>
                    <MathView math="b = \sqrt{225} \implies \mathbf{b = 15\text{ cm}}" className="text-emerald-300 font-black text-lg" />
                  </div>
                )}
              </div>

              {stepEx2 >= 4 && (
                <div className="p-2.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-center gap-2 text-xs text-amber-200 animate-in fade-in">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>
                    <strong>Pulo do gato:</strong> <MathView math="\sqrt{25 \cdot 9} = \sqrt{25} \cdot \sqrt{9} = 5 \cdot 3 = 15" />! Poupa conta gigante!
                  </span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={nextStepEx2}
                  disabled={stepEx2 >= 4}
                  className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
                    stepEx2 >= 4
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>{stepEx2 >= 4 ? 'Resolução Concluída' : 'Revelar Próximo Passo'}</span>
                </button>
                <button
                  onClick={() => setStepEx2(1)}
                  className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition"
                  title="Reiniciar"
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
