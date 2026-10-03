import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, BookCheck, Camera, HelpCircle, ArrowRight, Sparkles, CheckSquare, Square } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Slide10ClosingHomework() {
  const [checklist, setChecklist] = useState({
    participacao: true,
    licao: false,
    pontos: false,
    despedida: false,
  });

  const launchConfetti = () => {
    sounds.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#f59e0b', '#10b981', '#ec4899'],
    });
  };

  useEffect(() => {
    // Fire a celebratory burst on mount
    launchConfetti();
  }, []);

  const toggleCheck = (key) => {
    setChecklist((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      sounds.playTone(next[key] ? 600 : 400, 'triangle', 0.1);
      return next;
    });
  };

  return (
    <div className="h-full flex flex-col justify-between p-6 sm:p-10 max-w-6xl mx-auto overflow-y-auto">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 pb-3 gap-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Fechamento da Aula • 11:20 às 11:30
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Parabéns pelo Empenho e Participação Hoje! 🏆
            </h2>
          </div>
        </div>

        <button
          onClick={launchConfetti}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>Celebrar com Confetes 🎊</span>
        </button>
      </div>

      {/* Main 4 Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-auto py-2">
        {/* Card 1: Lição de Casa */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex items-start gap-4 shadow-xl hover:border-slate-700 transition">
          <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shrink-0">
            <BookCheck className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400">
              Tarefa Obrigatória
            </span>
            <h3 className="text-lg font-bold text-white">Lição de Casa (Capítulo 6)</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Fazer os exercícios de fixação sobre Pitágoras e Relações Métricas na apostila. Pratiquem para automatizar o reconhecimento das fórmulas!
            </p>
          </div>
        </div>

        {/* Card 2: Envio de Foto & MatMov */}
        <div className="bg-gradient-to-br from-emerald-950/30 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 flex items-start gap-4 shadow-xl">
          <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
            <Camera className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                Pontuação Somativa
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                +20 Pontos
              </span>
            </div>
            <h3 className="text-lg font-bold text-white">Envio no Canal Oficial</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Tirem foto legível da resolução no caderno e enviem a solução junto com o exercício no moodle!
            </p>
          </div>
        </div>

        {/* Card 3: Wikimática Plantão */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 flex items-start gap-4 shadow-xl hover:border-slate-700 transition">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shrink-0">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400">
              Suporte & Dúvidas
            </span>
            <h3 className="text-lg font-bold text-white">Plantão Semanal da Wikimática</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Travou em algum exercício? Não fique com dúvida! Participe do nosso plantão semanal online na Wikimática para atendimento individual.
            </p>
          </div>
        </div>

        {/* Card 4: Spoiler Próxima Aula */}
        <div className="bg-gradient-to-br from-amber-950/20 to-slate-900 border border-amber-500/30 rounded-3xl p-5 flex items-start gap-4 shadow-xl">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <ArrowRight className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-400">
              Próxima Parada (Aula 09)
            </span>
            <h3 className="text-lg font-bold text-white">Trigonometria no Triângulo Retângulo</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Vamos descobrir quem são os misteriosos <strong className="text-amber-300">Seno, Cosseno e Tangente</strong> e como calcular alturas inalcançáveis!
            </p>
          </div>
        </div>
      </div>

      {/* Teacher's Closing Checklist & Dismissal Note */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <span className="font-bold text-slate-300">Checklist Final:</span>
          <button
            onClick={() => toggleCheck('participacao')}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white"
          >
            {checklist.participacao ? (
              <CheckSquare className="w-4 h-4 text-emerald-400" />
            ) : (
              <Square className="w-4 h-4 text-slate-500" />
            )}
            <span>Participação no Chat</span>
          </button>

          <button
            onClick={() => toggleCheck('licao')}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white"
          >
            {checklist.licao ? (
              <CheckSquare className="w-4 h-4 text-emerald-400" />
            ) : (
              <Square className="w-4 h-4 text-slate-500" />
            )}
            <span>Lição Avisada</span>
          </button>

          <button
            onClick={() => toggleCheck('despedida')}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white"
          >
            {checklist.despedida ? (
              <CheckSquare className="w-4 h-4 text-emerald-400" />
            ) : (
              <Square className="w-4 h-4 text-slate-500" />
            )}
            <span>Encerramento Pontual às 11:30</span>
          </button>
        </div>

        <div className="text-xs text-indigo-400 font-semibold">
          Parabéns pelo show de participação hoje, 1º Ano! Até a próxima aula! 👋
        </div>
      </div>
    </div>
  );
}
