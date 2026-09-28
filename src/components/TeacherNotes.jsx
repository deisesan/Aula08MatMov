import React from 'react';
import { X, Mic, MessageSquare, AlertTriangle, Clock, BookOpen, CheckCircle2 } from 'lucide-react';

export default function TeacherNotes({ slide, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-96 max-w-full bg-slate-900/98 text-slate-100 border-l border-slate-700/80 shadow-2xl z-40 flex flex-col backdrop-blur-xl animate-in slide-in-from-right duration-200">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Guia do Professor (Slide {slide.id})</h3>
            <p className="text-xs text-amber-400 font-medium flex items-center gap-1">
              <Clock className="w-3 h-3" /> {slide.time} ({slide.duration})
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Fechar painel (Atalho: N)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
        {/* O que falar */}
        <div className="bg-slate-800/60 rounded-xl p-3.5 border border-slate-700/60">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-2">
            <Mic className="w-4 h-4" />
            <span>O que Falar:</span>
          </div>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed italic bg-slate-950/40 p-2.5 rounded-lg border border-slate-800">
            "{slide.speakerScript}"
          </p>
        </div>

        {/* Pergunta para o chat */}
        {slide.chatPrompt && (
          <div className="bg-emerald-950/30 rounded-xl p-3.5 border border-emerald-800/40">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>Pergunta para o Chat:</span>
            </div>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium leading-relaxed">
              {slide.chatPrompt}
            </p>
            {slide.expectedAnswer && (
              <div className="mt-2.5 pt-2 border-t border-emerald-800/30 flex items-start gap-1.5 text-xs text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-emerald-400 shrink-0" />
                <span><strong>Resposta Esperada:</strong> {slide.expectedAnswer}</span>
              </div>
            )}
          </div>
        )}

        {/* Dica Pedagógica / Erro Comum */}
        {slide.pedagogicalTip && (
          <div className="bg-amber-950/30 rounded-xl p-3.5 border border-amber-800/40">
            <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Alerta Pedagógico / Dificuldade:</span>
            </div>
            <p className="text-amber-200/90 text-xs leading-relaxed">
              {slide.pedagogicalTip}
            </p>
          </div>
        )}

        {/* BNCC / Habilidade */}
        <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-800 text-xs text-slate-400">
          <div className="font-semibold text-slate-300 mb-1">BNCC / Competência:</div>
          <div>{slide.habilities}</div>
        </div>

        {/* Quick Tips */}
        <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 text-xs text-blue-200 space-y-1">
          <div className="font-semibold text-blue-300">💡 Dicas de Atalhos:</div>
          <div>• Pressione <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px]">Espaço</kbd> ou <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px]">→</kbd> para avançar</div>
          <div>• Pressione <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px]">D</kbd> para ativar Caneta / Lousa virtual</div>
          <div>• Pressione <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px]">N</kbd> para abrir / fechar este painel</div>
          <div>• Pressione <kbd className="px-1.5 py-0.5 bg-slate-800 rounded font-mono text-[10px]">F</kbd> para Tela Cheia</div>
        </div>
      </div>
    </div>
  );
}
