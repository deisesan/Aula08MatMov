import React, { useState } from 'react';
import { Sparkles, MessageCircle, BookOpen, CheckCircle, Flame, Heart, Compass } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Slide1Welcome() {
  const [_reactions, setReactions] = useState({ bomDia: 0, prontos: 0 });
  const [_lastAction, setLastAction] = useState(null);

  const addReaction = (type) => {
    sounds.playTone(type === 'bomDia' ? 523.25 : 659.25, 'triangle', 0.15);
    setReactions((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setLastAction(type);
    setTimeout(() => setLastAction(null), 1200);
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Compass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider font-extrabold text-indigo-400">
              Matemática em Movimento — 1º Ano
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Aula 08: Triângulos & Relações Métricas
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-semibold text-emerald-400">Ao Vivo</span>
          <span className="text-slate-500">•</span>
          <span>Capítulo 6 da Apostila</span>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-center">
        {/* Left Side: Overview & Combinados */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>O Tema que Mais Cai em Vestibulinhos e Provas</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
              Teorema de Pitágoras & Relações Métricas
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Hoje vamos desvendar os segredos do <strong className="text-amber-400">triângulo retângulo</strong>,
              aprender a nunca mais errar a hipotenusa e dominar as 4 relações de ouro!
            </p>
          </div>

          {/* Combinados do dia */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3">
            <div className="text-xs uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              <span>Combinados de Ouro da Aula:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400 shrink-0 font-bold">1</span>
                <span className="text-slate-200">
                  <strong>Caderno e lápis à mão:</strong> vamos fazer contas e treinar na prática.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 shrink-0 font-bold">2</span>
                <span className="text-slate-200">
                  <strong>Chat a mil por hora:</strong> responda com <code className="text-amber-300">A, B ou C</code> e seus cálculos!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Chat Thermometer */}
        <div className="lg:col-span-5 flex flex-col gap-4">

          {/* Quick Schedule Capsule */}
          <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <div>
              <span className="text-slate-300 font-semibold">Grade da Aula:</span> 09:30 às 11:30
            </div>
            <div className="text-indigo-400 font-medium">Intervalo às 10:30 (10 min)</div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Tip */}
      <div className="border-t border-slate-800/80 pt-3 flex flex-wrap items-center justify-between text-xs text-slate-400">
        <div className="text-indigo-300 font-medium">
          📐 Matemática em Movimento • Teorema de Pitágoras e Relações Métricas
        </div>
        <div className="text-slate-500">
          Aula Interativa • Capítulo 6
        </div>
      </div>
    </div>
  );
}
