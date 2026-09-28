import React, { useState } from 'react';
import { Eye, HelpCircle, Check, AlertTriangle, Sparkles, Compass } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Slide3IdentifySides() {
  const [highlightMode, setHighlightMode] = useState('none'); // 'none', 'rightAngle', 'hypotenuse', 'legs', 'all'
  const [challengeAnswer, setChallengeAnswer] = useState(null);

  const setMode = (mode) => {
    setHighlightMode(mode);
    sounds.playTone(mode === 'hypotenuse' ? 659.25 : 523.25, 'sine', 0.15);
  };

  const handleChallenge = (answer) => {
    setChallengeAnswer(answer);
    if (answer === 'hipotenusa') {
      sounds.playSuccess();
      setHighlightMode('hypotenuse');
    } else {
      sounds.playTone(280, 'sawtooth', 0.25);
    }
  };

  const isHypActive = highlightMode === 'hypotenuse' || highlightMode === 'all';
  const isLegsActive = highlightMode === 'legs' || highlightMode === 'all';
  const isAngleActive = highlightMode === 'rightAngle' || highlightMode === 'all';

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-8 max-w-6xl mx-auto overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
            Dinâmica Interativa • 09:40 às 10:05
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Quem é Quem no Triângulo Retângulo?
          </h2>
        </div>

        {/* Highlight Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1.5 rounded-2xl">
          <button
            onClick={() => setMode('rightAngle')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              highlightMode === 'rightAngle'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            1. Ângulo Reto (90°)
          </button>
          <button
            onClick={() => setMode('hypotenuse')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              highlightMode === 'hypotenuse'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            2. Hipotenusa (Frente)
          </button>
          <button
            onClick={() => setMode('legs')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              highlightMode === 'legs'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            3. Catetos (Quina)
          </button>
          <button
            onClick={() => setMode('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              highlightMode === 'all'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Todos
          </button>
        </div>
      </div>

      {/* 3 Interactive SVG Triangles in Different Orientations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
        {/* Triangle 1: Traditional Stand Up */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300">Posição 1: Tradicional</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">Em pé</span>
          </div>

          <div className="w-full h-48 bg-slate-950 rounded-xl border border-slate-800/80 p-2 flex items-center justify-center relative">
            <svg viewBox="0 0 200 160" className="w-full h-full max-w-[190px]">
              {/* Triangle fill */}
              <polygon points="30,130 170,130 30,20" fill="rgba(99, 102, 241, 0.08)" />

              {/* Legs */}
              <line
                x1="30" y1="130" x2="30" y2="20"
                stroke={isLegsActive ? '#818cf8' : '#64748b'}
                strokeWidth={isLegsActive ? '4' : '2'}
              />
              <line
                x1="30" y1="130" x2="170" y2="130"
                stroke={isLegsActive ? '#818cf8' : '#64748b'}
                strokeWidth={isLegsActive ? '4' : '2'}
              />

              {/* Hypotenuse */}
              <line
                x1="30" y1="20" x2="170" y2="130"
                stroke={isHypActive ? '#34d399' : '#94a3b8'}
                strokeWidth={isHypActive ? '5' : '2.5'}
                strokeDasharray={isHypActive ? 'none' : 'none'}
              />

              {/* Right angle marker */}
              <rect
                x="30" y="112" width="18" height="18"
                fill="none"
                stroke={isAngleActive ? '#f59e0b' : '#64748b'}
                strokeWidth={isAngleActive ? '2.5' : '1.5'}
              />
              <circle cx="39" cy="121" r="2" fill={isAngleActive ? '#f59e0b' : '#64748b'} />

              {/* Labels */}
              {isHypActive && (
                <text x="105" y="65" fill="#34d399" fontSize="11" fontWeight="bold" className="animate-pulse">
                  HIPOTENUSA
                </text>
              )}
              {isLegsActive && (
                <>
                  <text x="35" y="75" fill="#818cf8" fontSize="10" fontWeight="bold">Cateto</text>
                  <text x="90" y="145" fill="#818cf8" fontSize="10" fontWeight="bold">Cateto</text>
                </>
              )}
              {isAngleActive && (
                <text x="52" y="125" fill="#f59e0b" fontSize="10" fontWeight="bold">90°</text>
              )}
            </svg>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">A hipotenusa parece inclinada</span>
        </div>

        {/* Triangle 2: Sitting on Hypotenuse (DEITADO) */}
        <div
          className={`bg-slate-900/80 rounded-2xl p-4 flex flex-col items-center justify-between relative transition-all duration-300 ${
            challengeAnswer !== null
              ? 'border-2 border-amber-500 shadow-xl shadow-amber-500/20 ring-2 ring-amber-500/30'
              : 'border border-slate-800'
          }`}
        >
          <div className="w-full flex items-center justify-between mb-2">
            <span
              className={`text-xs font-bold flex items-center gap-1 transition-colors ${
                challengeAnswer !== null ? 'text-amber-400' : 'text-slate-300'
              }`}
            >
              {challengeAnswer !== null && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
              Posição 2: Deitado
            </span>
            <span
              className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-all ${
                challengeAnswer !== null
                  ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                  : 'bg-slate-800 text-slate-400 font-normal'
              }`}
            >
              {challengeAnswer !== null ? 'Pegadinha!' : 'Horizontal'}
            </span>
          </div>

          <div className="w-full h-48 bg-slate-950 rounded-xl border border-slate-800/80 p-2 flex items-center justify-center relative">
            <svg viewBox="0 0 200 160" className="w-full h-full max-w-[190px]">
              {/* Triangle fill */}
              <polygon points="25,135 175,135 55,75" fill="rgba(245, 158, 11, 0.08)" />

              {/* Legs */}
              <line
                x1="25" y1="135" x2="55" y2="75"
                stroke={isLegsActive ? '#818cf8' : '#64748b'}
                strokeWidth={isLegsActive ? '4' : '2'}
              />
              <line
                x1="55" y1="75" x2="175" y2="135"
                stroke={isLegsActive ? '#818cf8' : '#64748b'}
                strokeWidth={isLegsActive ? '4' : '2'}
              />

              {/* Hypotenuse (AT THE BOTTOM!) */}
              <line
                x1="25" y1="135" x2="175" y2="135"
                stroke={isHypActive ? '#34d399' : '#94a3b8'}
                strokeWidth={isHypActive ? '5' : '2.5'}
              />

              {/* Exact Right angle marker at top vertex B(55, 75) - 100% aligned with legs */}
              <polygon
                points="55,75 49,87 61,93 67,81"
                fill="none"
                stroke={isAngleActive ? '#f59e0b' : '#64748b'}
                strokeWidth={isAngleActive ? '2.5' : '1.5'}
              />
              <circle cx="58" cy="84" r="2" fill={isAngleActive ? '#f59e0b' : '#64748b'} />

              {/* Labels */}
              {isHypActive && (
                <text x="45" y="152" fill="#34d399" fontSize="12" fontWeight="black" className="animate-pulse">
                  HIPOTENUSA (EMBAIXO!)
                </text>
              )}
              {isLegsActive && (
                <>
                  <text x="18" y="95" fill="#818cf8" fontSize="10" fontWeight="bold">Cateto</text>
                  <text x="120" y="95" fill="#818cf8" fontSize="10" fontWeight="bold">Cateto</text>
                </>
              )}
              {isAngleActive && (
                <text x="60" y="65" fill="#f59e0b" fontSize="10" fontWeight="bold">90° no topo</text>
              )}
            </svg>
          </div>
          <span
            className={`text-[11px] transition-colors mt-2 ${
              challengeAnswer !== null
                ? 'text-amber-300 font-bold'
                : 'text-slate-400'
            }`}
          >
            {challengeAnswer !== null
              ? 'A hipotenusa é a base horizontal!'
              : 'Qual é o lado da hipotenusa?'}
          </span>
        </div>

        {/* Triangle 3: Rotated / Angled */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex flex-col items-center justify-between">
          <div className="w-full flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300">Posição 3: Girado</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">Inclinado</span>
          </div>

          <div className="w-full h-48 bg-slate-950 rounded-xl border border-slate-800/80 p-2 flex items-center justify-center relative">
            <svg viewBox="0 0 200 160" className="w-full h-full max-w-[190px]">
              {/* Triangle fill */}
              <polygon points="58,76 175,70 130,130" fill="rgba(168, 85, 247, 0.08)" />

              {/* Legs */}
              <line
                x1="130" y1="130" x2="58" y2="76"
                stroke={isLegsActive ? '#818cf8' : '#64748b'}
                strokeWidth={isLegsActive ? '4' : '2'}
              />
              <line
                x1="130" y1="130" x2="175" y2="70"
                stroke={isLegsActive ? '#818cf8' : '#64748b'}
                strokeWidth={isLegsActive ? '4' : '2'}
              />

              {/* Hypotenuse (Opposite to 90 deg vertex) */}
              <line
                x1="58" y1="76" x2="175" y2="70"
                stroke={isHypActive ? '#34d399' : '#94a3b8'}
                strokeWidth={isHypActive ? '5' : '2.5'}
              />

              {/* Exact Right angle at V(130, 130) - 100% aligned with legs */}
              <polygon
                points="130,130 118,121 127,109 139,118"
                fill="none"
                stroke={isAngleActive ? '#f59e0b' : '#64748b'}
                strokeWidth={isAngleActive ? '2.5' : '1.5'}
              />
              <circle cx="128.5" cy="119.5" r="2" fill={isAngleActive ? '#f59e0b' : '#64748b'} />

              {/* Labels */}
              {isHypActive && (
                <text x="85" y="60" fill="#34d399" fontSize="11" fontWeight="bold" className="animate-pulse">
                  HIPOTENUSA
                </text>
              )}
              {isLegsActive && (
                <>
                  <text x="75" y="115" fill="#818cf8" fontSize="10" fontWeight="bold">Cateto</text>
                  <text x="160" y="110" fill="#818cf8" fontSize="10" fontWeight="bold">Cateto</text>
                </>
              )}
              {isAngleActive && (
                <text x="110" y="148" fill="#f59e0b" fontSize="10" fontWeight="bold">90°</text>
              )}
            </svg>
          </div>
          <span className="text-[11px] text-slate-400 mt-2">Gire a cabeça ou ache o 90°!</span>
        </div>
      </div>

      {/* Rules Box & Chat Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Golden Rules */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="text-xs uppercase font-extrabold text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" />
            <span>As Duas Leis Infalíveis:</span>
          </div>
          <div className="text-xs sm:text-sm space-y-2">
            <div className="p-2.5 rounded-xl bg-emerald-950/30 border border-emerald-800/40 text-emerald-200">
              <strong className="text-emerald-400">1. HIPOTENUSA:</strong> Fica <span className="underline decoration-emerald-400 font-bold">sempre de frente</span> (oposta) para o quadradinho com o ponto (90°) e é <span className="underline decoration-emerald-400 font-bold">sempre o maior lado</span>.
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-indigo-200">
              <strong className="text-indigo-400">2. CATETOS:</strong> São os dois lados que se encontram para <span className="underline decoration-indigo-400 font-bold">formar a quina de 90°</span>.
            </div>
          </div>
        </div>

        {/* Live Chat Dinâmica */}
        <div className="lg:col-span-6 bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/40 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1">
              <HelpCircle className="w-4 h-4 text-indigo-400" />
              Dinâmica de Chat ao Vivo:
            </span>
            <span className="text-[11px] text-amber-400 font-bold">Responda no chat</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-100 font-semibold mb-3">
            "No <strong className="text-amber-400">triângulo deitado</strong> (do meio): o lado que está embaixo na horizontal é cateto ou hipotenusa?"
          </p>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleChallenge('cateto')}
              className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold transition ${
                challengeAnswer === 'cateto'
                  ? 'bg-rose-600/30 border-rose-500 text-rose-300 ring-2 ring-rose-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/80'
              }`}
            >
              Opção A: É Cateto
            </button>
            <button
              onClick={() => handleChallenge('hipotenusa')}
              className={`p-2.5 rounded-xl border text-xs sm:text-sm font-bold transition ${
                challengeAnswer === 'hipotenusa'
                  ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700/80'
              }`}
            >
              Opção B: É Hipotenusa
            </button>
          </div>

          {challengeAnswer && (
            <div className={`mt-2.5 text-xs p-2 rounded-lg font-medium ${
              challengeAnswer === 'hipotenusa'
                ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800'
                : 'bg-rose-950/50 text-rose-300 border border-rose-800'
            }`}>
              {challengeAnswer === 'hipotenusa'
                ? '🎉 CORRETO! O lado de baixo está de frente para o ângulo reto que está lá em cima!'
                : '⚠️ Cuidado! Ele parece uma base reta, mas está de frente para o ângulo de 90°! É a Hipotenusa!'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
