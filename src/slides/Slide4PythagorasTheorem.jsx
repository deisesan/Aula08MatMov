import React, { useState } from 'react';
import MathView from '../components/MathView';
import { Layers, Sparkles, CheckCircle2, Play, RefreshCw, Zap } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Slide4PythagorasTheorem() {
  const [multiplier, setMultiplier] = useState(1);
  const [animatingAreas, setAnimatingAreas] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const b = 3 * multiplier;
  const c = 4 * multiplier;
  const a = 5 * multiplier;

  const areaB = b * b;
  const areaC = c * c;
  const areaA = a * a;

  const triggerAnimation = () => {
    setAnimatingAreas(true);
    setActiveStep(1);
    sounds.playTone(440, 'sine', 0.2);
    setTimeout(() => {
      setActiveStep(2);
      sounds.playTone(554.37, 'sine', 0.2);
    }, 800);
    setTimeout(() => {
      setActiveStep(3);
      sounds.playSuccess();
    }, 1600);
  };

  const handleMultiplierChange = (k) => {
    setMultiplier(k);
    sounds.playTone(400 + k * 40, 'triangle', 0.15);
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Conceito Central • 10:05 às 10:15
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            O Teorema de Pitágoras e a Mágica das Áreas
          </h2>
        </div>

        {/* Formula Badge */}
        <div className="px-4 py-1.5 rounded-2xl bg-indigo-950/80 border border-indigo-500/40 text-indigo-200">
          <MathView math="a^2 = b^2 + c^2" className="text-lg font-black tracking-wide" />
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-auto items-center">
        {/* Left: Interactive Geometric 3-4-5 Triangle with Squares */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-between shadow-xl">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-indigo-400" />
              Demonstração Geométrica das Áreas
            </span>
            <button
              onClick={triggerAnimation}
              className="px-3 py-1 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Animar Demonstração</span>
            </button>
          </div>

          {/* SVG Diagram with Quadrículados */}
          <div className="w-full h-64 sm:h-72 bg-slate-950 rounded-2xl border border-slate-800/80 p-2 flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 340 300" className="w-full h-full max-w-[340px]">
              {/* Central Right Triangle (catetos 60 e 80, hipotenusa 100) */}
              <polygon
                points="120,180 200,180 120,120"
                fill="#1e1b4b"
                stroke="#6366f1"
                strokeWidth="2.5"
              />
              {/* 90 deg marker */}
              <rect x="120" y="165" width="15" height="15" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="127.5" cy="172.5" r="1.5" fill="#f59e0b" />

              {/* Square B (Vertical Leg = 3 -> 3x3 = 9 cells, left of (120,120) to (120,180)) */}
              <g
                transform="translate(60, 120)"
                className={`transition-all duration-500 ${
                  activeStep >= 1 ? 'opacity-100 scale-100' : 'opacity-85'
                }`}
              >
                <rect x="0" y="0" width="60" height="60" fill="rgba(59, 130, 246, 0.25)" stroke="#3b82f6" strokeWidth="2" />
                {/* 3x3 grid */}
                {[1, 2].map((i) => (
                  <React.Fragment key={i}>
                    <line x1={i * 20} y1="0" x2={i * 20} y2="60" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" />
                    <line x1="0" y1={i * 20} x2="60" y2={i * 20} stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.4" />
                  </React.Fragment>
                ))}
                <text x="30" y="34" fill="#93c5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                  b² = 9
                </text>
              </g>

              {/* Square C (Horizontal Leg = 4 -> 4x4 = 16 cells, below (120,180) to (200,180)) */}
              <g
                transform="translate(120, 180)"
                className={`transition-all duration-500 ${
                  activeStep >= 2 ? 'opacity-100 scale-100' : 'opacity-85'
                }`}
              >
                <rect x="0" y="0" width="80" height="80" fill="rgba(249, 115, 22, 0.25)" stroke="#f97316" strokeWidth="2" />
                {/* 4x4 grid */}
                {[1, 2, 3].map((i) => (
                  <React.Fragment key={i}>
                    <line x1={i * 20} y1="0" x2={i * 20} y2="80" stroke="#f97316" strokeWidth="1" strokeOpacity="0.4" />
                    <line x1="0" y1={i * 20} x2="80" y2={i * 20} stroke="#f97316" strokeWidth="1" strokeOpacity="0.4" />
                  </React.Fragment>
                ))}
                <text x="40" y="44" fill="#fdba74" fontSize="12" fontWeight="bold" textAnchor="middle">
                  c² = 16
                </text>
              </g>

              {/* Square A (Hypotenuse = 5 -> 5x5 = 25 cells, rotated outside along hypotenuse) */}
              {/* Hypotenuse line goes from (120,120) to (200,180). Vector = (80, 60), length = 100 */}
              {/* Perpendicular unit normal pointing up-right: (60, -80)/100 = (0.6, -0.8). Box size = 100 */}
              <g
                transform="translate(120, 120) rotate(36.87)"
                className={`transition-all duration-700 ${
                  activeStep >= 3 ? 'opacity-100 ring-2 ring-emerald-400' : 'opacity-85'
                }`}
              >
                <rect
                  x="0"
                  y="-100"
                  width="100"
                  height="100"
                  fill="rgba(16, 185, 129, 0.25)"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />
                {/* 5x5 grid */}
                {[1, 2, 3, 4].map((i) => (
                  <React.Fragment key={i}>
                    <line x1={i * 20} y1="-100" x2={i * 20} y2="0" stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
                    <line x1="0" y1={-100 + i * 20} x2="100" y2={-100 + i * 20} stroke="#10b981" strokeWidth="1" strokeOpacity="0.4" />
                  </React.Fragment>
                ))}
                <text x="50" y="-45" fill="#6ee7b7" fontSize="13" fontWeight="bold" textAnchor="middle">
                  a² = 25
                </text>
              </g>
            </svg>
          </div>

          {/* Area equality equation */}
          <div className="w-full mt-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-around text-xs sm:text-sm font-bold">
            <span className="text-blue-400">9 (azul)</span>
            <span className="text-slate-400">+</span>
            <span className="text-orange-400">16 (laranja)</span>
            <span className="text-slate-400">=</span>
            <span className="text-emerald-400 text-base">25 (verde)! ⭐</span>
          </div>
        </div>

        {/* Right: Formulas & Pythagorean Triples Explorer */}
        <div className="lg:col-span-6 space-y-4">
          {/* Conceptual Definition */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wide mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>O Significado Real da Fórmula:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              "A área do quadrado construído sobre a <strong className="text-emerald-400">hipotenusa</strong> é igual à soma das áreas dos quadrados construídos sobre os dois <strong className="text-indigo-400">catetos</strong>."
            </p>
            <div className="mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
              <MathView
                math="(\text{hipotenusa})^2 = (\text{cateto}_1)^2 + (\text{cateto}_2)^2"
                block
                className="text-amber-300 text-sm sm:text-base font-bold"
              />
            </div>
          </div>

          {/* Famous Triples Interactive Generator */}
          <div className="bg-gradient-to-br from-indigo-950/30 to-slate-900 border border-indigo-500/30 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-sm sm:text-base text-white">Terna Pitagórica Famosa: 3 - 4 - 5</h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                Multiplicador k = {multiplier}x
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              Qualquer múltiplo da terna fundamental <code className="text-amber-300">(3, 4, 5)</code> também forma um triângulo retângulo perfeito:
            </p>

            {/* Multiplier buttons */}
            <div className="grid grid-cols-5 gap-1.5 mb-4">
              {[1, 2, 3, 5, 10].map((k) => (
                <button
                  key={k}
                  onClick={() => handleMultiplierChange(k)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition border ${
                    multiplier === k
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30 scale-105'
                      : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  k = {k}
                </button>
              ))}
            </div>

            {/* Calculated values */}
            <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Lados correspondentes:</span>
                <span className="font-mono font-bold text-white">
                  Catetos: <span className="text-blue-400">{b}</span> e <span className="text-orange-400">{c}</span> | Hipotenusa: <span className="text-emerald-400">{a}</span>
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-400">Conferindo Pitágoras:</span>
                <span className="font-mono text-amber-300 font-bold">
                  {b}² + {c}² = {areaB} + {areaC} = {areaA} ({a}²) ✅
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
