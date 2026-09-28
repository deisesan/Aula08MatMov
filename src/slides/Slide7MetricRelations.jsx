import React, { useState } from 'react';
import MathView from '../components/MathView';
import { Eye, Sparkles, CheckCircle2, Bookmark, Star } from 'lucide-react';
import { sounds } from '../utils/audio';

const FORMULAS = [
  {
    id: 'h2_mn',
    title: '1. Altura e Projeções',
    formula: 'h^2 = m \\cdot n',
    name: 'A altura ao quadrado é o produto das duas projeções',
    activeParts: ['h', 'm', 'n'],
    color: '#38bdf8', // Sky blue
  },
  {
    id: 'b2_am',
    title: '2. Cateto b e sua Projeção',
    formula: 'b^2 = a \\cdot m',
    name: 'O cateto ao quadrado é a hipotenusa inteira pela sua projeção',
    activeParts: ['b', 'a', 'm'],
    color: '#a855f7', // Purple
  },
  {
    id: 'c2_an',
    title: '3. Cateto c e sua Projeção',
    formula: 'c^2 = a \\cdot n',
    name: 'O outro cateto ao quadrado é a hipotenusa inteira pela sua projeção',
    activeParts: ['c', 'a', 'n'],
    color: '#f97316', // Orange
  },
  {
    id: 'bc_ah',
    title: '4. Produto dos Catetos',
    formula: 'b \\cdot c = a \\cdot h',
    name: 'O produto dos catetos é igual à hipotenusa vezes a altura',
    activeParts: ['b', 'c', 'a', 'h'],
    color: '#10b981', // Emerald
  },
  {
    id: 'a_mn',
    title: '5. Soma das Projeções',
    formula: 'a = m + n',
    name: 'A hipotenusa completa é a soma das duas projeções',
    activeParts: ['a', 'm', 'n'],
    color: '#facc15', // Yellow
  },
];

export default function Slide7MetricRelations() {
  const [selectedFormulaId, setSelectedFormulaId] = useState('h2_mn');

  const selectedFormula = FORMULAS.find((f) => f.id === selectedFormulaId) || FORMULAS[0];

  const handleSelectFormula = (id) => {
    setSelectedFormulaId(id);
    sounds.playTone(600, 'sine', 0.15);
  };

  const isPartActive = (part) => selectedFormula.activeParts.includes(part);

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Bloco Central • 10:40 às 10:55
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Relações Métricas no Triângulo Retângulo
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Fórmulas Obtidas por Semelhança</span>
        </div>
      </div>

      {/* Main Grid: Interactive Sliced Triangle & Formula Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 my-auto items-center">
        {/* Left: Interactive Sliced Right Triangle SVG */}
        <div className="lg:col-span-6 bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex flex-col items-center justify-between shadow-2xl">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-indigo-400" />
              O "Triângulo Mágico" Fatiado pela Altura
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
              Apoiado na hipotenusa a
            </span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full h-64 sm:h-72 bg-slate-950 rounded-2xl border border-slate-800 p-2 flex items-center justify-center relative overflow-hidden">
            <svg viewBox="0 0 340 220" className="w-full h-full max-w-[340px]">
              {/* Main triangle vertices:
                  Hypotenuse base: A=(30, 180) to C=(310, 180). Length = 280.
                  Top 90-deg vertex: B=(130, 45).
                  Foot of altitude H: (130, 180).
                  Altitude h: (130,45) to (130,180).
                  Projection m: from (30,180) to (130,180), length 100.
                  Projection n: from (130,180) to (310,180), length 180.
                  Left leg b: from (30,180) to (130,45).
                  Right leg c: from (130,45) to (310,180).
              */}

              {/* Triangle shaded areas */}
              <polygon points="30,180 130,45 130,180" fill="rgba(99, 102, 241, 0.08)" />
              <polygon points="130,180 130,45 310,180" fill="rgba(168, 85, 247, 0.08)" />

              {/* Top 90 deg corner marker at B(130, 45) - 100% aligned with legs */}
              <polygon
                points="130,46 120.4,59 133.3,68.6 142.8,55.6"
                fill="none"
                stroke="#f59e0b"
                strokeWidth="2"
              />
              <circle cx="131.6" cy="57.3" r="2" fill="#f59e0b" />

              {/* Foot of altitude 90 deg marker at H(130, 180) */}
              <rect x="114" y="164" width="16" height="16" fill="none" stroke="#64748b" strokeWidth="1.5" />
              <circle cx="122" cy="172" r="1.5" fill="#64748b" />

              {/* Leg b (Left) */}
              <line
                x1="30" y1="180" x2="130" y2="45"
                stroke={isPartActive('b') ? '#a855f7' : '#475569'}
                strokeWidth={isPartActive('b') ? '5' : '2.5'}
                className="transition-all duration-300"
              />

              {/* Leg c (Right) */}
              <line
                x1="130" y1="45" x2="310" y2="180"
                stroke={isPartActive('c') ? '#f97316' : '#475569'}
                strokeWidth={isPartActive('c') ? '5' : '2.5'}
                className="transition-all duration-300"
              />

              {/* Altitude h (Middle Vertical) */}
              <line
                x1="130" y1="45" x2="130" y2="180"
                stroke={isPartActive('h') ? '#38bdf8' : '#64748b'}
                strokeWidth={isPartActive('h') ? '5' : '2.5'}
                strokeDasharray={isPartActive('h') ? 'none' : '4 3'}
                className="transition-all duration-300"
              />

              {/* Projection m (Base left: 30 to 130) */}
              <line
                x1="30" y1="180" x2="130" y2="180"
                stroke={isPartActive('m') ? '#38bdf8' : isPartActive('a') ? '#facc15' : '#475569'}
                strokeWidth={isPartActive('m') || isPartActive('a') ? '5' : '2.5'}
                className="transition-all duration-300"
              />

              {/* Projection n (Base right: 130 to 310) */}
              <line
                x1="130" y1="180" x2="310" y2="180"
                stroke={isPartActive('n') ? '#f97316' : isPartActive('a') ? '#facc15' : '#475569'}
                strokeWidth={isPartActive('n') || isPartActive('a') ? '5' : '2.5'}
                className="transition-all duration-300"
              />

              {/* Base brackets / Labels */}
              {/* Leg b label */}
              <text
                x="65" y="105"
                fill={isPartActive('b') ? '#c084fc' : '#94a3b8'}
                fontSize="15"
                fontWeight="black"
              >
                b
              </text>

              {/* Leg c label */}
              <text
                x="230" y="105"
                fill={isPartActive('c') ? '#fb923c' : '#94a3b8'}
                fontSize="15"
                fontWeight="black"
              >
                c
              </text>

              {/* Altitude h label */}
              <text
                x="138" y="115"
                fill={isPartActive('h') ? '#38bdf8' : '#94a3b8'}
                fontSize="15"
                fontWeight="black"
              >
                h
              </text>

              {/* Projection m label */}
              <text
                x="75" y="200"
                fill={isPartActive('m') ? '#38bdf8' : '#94a3b8'}
                fontSize="13"
                fontWeight="bold"
              >
                m
              </text>

              {/* Projection n label */}
              <text
                x="215" y="200"
                fill={isPartActive('n') ? '#fb923c' : '#94a3b8'}
                fontSize="13"
                fontWeight="bold"
              >
                n
              </text>

              {/* Total Hypotenuse a indicator bracket */}
              {isPartActive('a') && (
                <g>
                  <line x1="30" y1="210" x2="310" y2="210" stroke="#facc15" strokeWidth="2" />
                  <line x1="30" y1="205" x2="30" y2="215" stroke="#facc15" strokeWidth="2" />
                  <line x1="310" y1="205" x2="310" y2="215" stroke="#facc15" strokeWidth="2" />
                  <text x="170" y="218" fill="#facc15" fontSize="12" fontWeight="black" textAnchor="middle">
                    a (total = m + n)
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Active Highlight Explanation */}
          <div className="w-full mt-3 p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-xs text-slate-400">Em destaque na figura: </span>
            <span className="text-xs font-bold text-amber-300">{selectedFormula.name}</span>
          </div>
        </div>

        {/* Right: The 4 Golden Formulas Interactive Menu */}
        <div className="lg:col-span-6 space-y-2.5">
          <div className="text-xs uppercase font-extrabold text-amber-400 flex items-center gap-1.5 mb-1">
            <Star className="w-4 h-4" />
            <span>As 4 Fórmulas que Caem em Prova (Clique para Iluminar):</span>
          </div>

          <div className="space-y-2">
            {FORMULAS.map((item) => {
              const isSelected = selectedFormulaId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectFormula(item.id)}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left transition flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-slate-800/90 border-indigo-500 ring-2 ring-indigo-500/40 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {item.title.split('.')[0]}
                    </span>
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-slate-200">{item.title.split('.')[1]}</div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[220px] sm:max-w-xs">{item.name}</div>
                    </div>
                  </div>

                  <div className="shrink-0 p-2 rounded-xl bg-slate-950 border border-slate-800">
                    <MathView math={item.formula} className="text-sm sm:text-base font-bold text-amber-300" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Dica de Memorização */}
          <div className="p-3 bg-indigo-950/30 rounded-xl border border-indigo-900/40 text-xs text-indigo-200">
            <strong>💡 Dica do Professor:</strong> Na hora da prova, nunca tente adivinhar! <em>Circule o que o exercício deu</em> (ex: deu a altura e uma projeção? Use <MathView math="h^2 = m \cdot n" />!).
          </div>
        </div>
      </div>
    </div>
  );
}
