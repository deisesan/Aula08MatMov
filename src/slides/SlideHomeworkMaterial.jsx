import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Pencil,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import MatMovLogo from '../components/MatMovLogo';
import HomeworkDiagram from '../components/HomeworkDiagrams';
import { HOMEWORK_LESSON_8, HOMEWORK_LESSON_7 } from '../data/homeworkData';
import { sounds } from '../utils/audio';

export default function SlideHomeworkMaterial({ onOpenExerciseOnBlankSlide }) {
  const [activeLesson, setActiveLesson] = useState('aula_08'); // 'aula_08' or 'aula_07'
  const [viewMode, setViewMode] = useState('sheet'); // 'sheet' (A4 Worksheet) or 'interactive' (Slide Cards)
  const [showAnswers, setShowAnswers] = useState(false);

  const homework = activeLesson === 'aula_08' ? HOMEWORK_LESSON_8 : HOMEWORK_LESSON_7;

  const downloadPdf = () => {
    sounds.playSuccess();
    const link = document.createElement('a');
    link.href = '/Licao_de_Casa_Aula_08_MatMov.pdf';
    link.download = 'Licao_de_Casa_Aula_08_MatMov.pdf';
    link.click();
  };

  const printSheet = () => {
    sounds.playTone(600, 'sine', 0.1);
    window.print();
  };

  const handleSolveOnWhiteboard = (question) => {
    sounds.playChime();
    if (onOpenExerciseOnBlankSlide) {
      onOpenExerciseOnBlankSlide(question);
    }
  };

  return (
    <div className="h-full w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Top Slide Control Strip */}
      <div className="h-12 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
        {/* Left: Title & Lesson selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <FileText className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-white hidden sm:inline">
              Material Oficial: Lição de Casa
            </span>
          </div>

          {/* Toggle between Aula 8 and Aula 7 */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                setActiveLesson('aula_08');
                sounds.playTone(500, 'sine', 0.08);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                activeLesson === 'aula_08'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aula 08 (Pitágoras)
            </button>
            <button
              onClick={() => {
                setActiveLesson('aula_07');
                sounds.playTone(450, 'sine', 0.08);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition ${
                activeLesson === 'aula_07'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Aula 07 (Semelhança)
            </button>
          </div>
        </div>

        {/* Right: Actions (Download PDF, Print, View Mode, Answers) */}
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="hidden md:flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewMode('sheet')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                viewMode === 'sheet' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Formato Folha A4 idêntica ao PDF"
            >
              Folha Oficial
            </button>
            <button
              onClick={() => setViewMode('interactive')}
              className={`px-2.5 py-1 rounded-lg font-medium transition ${
                viewMode === 'interactive' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Formato Cards para Projeção"
            >
              Cards de Aula
            </button>
          </div>

          {/* Teacher Answer Key Toggle */}
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 border ${
              showAnswers
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
            }`}
            title="Mostrar/ocultar gabarito pedagógico"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Gabarito</span>
          </button>

          {/* Download Official PDF */}
          <button
            onClick={downloadPdf}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-400 hover:to-indigo-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition flex items-center gap-1.5"
            title="Baixar arquivo PDF de alta definição pronto para impressão"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span>Baixar PDF</span>
          </button>

          {/* Print */}
          <button
            onClick={printSheet}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
            title="Imprimir documento"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center">
        {viewMode === 'sheet' ? (
          /* A4 Worksheet Document View (Styled like real print paper) */
          <div className="w-full max-w-4xl space-y-6">
            {/* Page 1: Header + Questão 1 */}
            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl border border-slate-200">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <MatMovLogo className="h-12" />
                <span
                  style={{ fontFamily: "'Luckiest Guy', cursive", color: '#466c9b' }}
                  className="text-xl sm:text-2xl tracking-wide uppercase"
                >
                  ENSINO DE MATEMÁTICA
                </span>
              </div>

              {/* Title */}
              <div className="text-center my-6">
                <h1
                  style={{ fontFamily: "'Luckiest Guy', cursive", color: '#466c9b' }}
                  className="text-2xl sm:text-3xl uppercase tracking-wide"
                >
                  LIÇÃO DE CASA
                </h1>
                <div
                  style={{ fontFamily: "'Luckiest Guy', cursive", color: '#466c9b' }}
                  className="text-xl sm:text-2xl"
                >
                  {homework.grade}
                </div>
              </div>

              {/* Lesson Meta */}
              <div className="mb-6 pb-4 border-b border-slate-100">
                <div
                  style={{ fontFamily: "'Poppins', sans-serif", color: '#466c9b' }}
                  className="font-bold text-sm sm:text-base mb-0.5"
                >
                  {homework.lessonNumber}
                </div>
                <div
                  style={{ fontFamily: "'Poppins', sans-serif", color: '#466c9b' }}
                  className="font-bold text-xs sm:text-sm"
                >
                  TEMA DA AULA: {homework.topic}
                </div>
              </div>

              {/* Questão 1 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3
                    style={{ fontFamily: "'Poppins', sans-serif", color: '#466c9b' }}
                    className="text-sm sm:text-base font-bold"
                  >
                    {homework.questions[0].title}
                  </h3>
                  <button
                    onClick={() => handleSolveOnWhiteboard(homework.questions[0])}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition flex items-center gap-1 shadow-sm"
                    title="Abrir esta questão em um slide em branco para resolver com a caneta"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Resolver no Quadro</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  {homework.questions[0].subtitle}
                </p>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 text-justify">
                  {homework.questions[0].guidance}
                </p>

                {/* Example */}
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-slate-800">
                  <div className="font-bold text-slate-900">{homework.questions[0].example.text}</div>
                  <div className="font-bold text-red-600 mt-1">
                    {homework.questions[0].example.calc}
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2.5 pt-2">
                  {homework.questions[0].items.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-xs sm:text-sm flex flex-wrap items-baseline gap-2 text-slate-800"
                    >
                      <span className="text-amber-600 font-bold">•</span>
                      <span className="font-semibold">{item.text}</span>
                      {showAnswers && (
                        <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
                          Resposta: {item.answer}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Page 2: Questão 2 & Questão 3 */}
            <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-10 shadow-2xl border border-slate-200 space-y-8">
              {/* Header Page 2 */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <MatMovLogo className="h-12" />
                <span
                  style={{ fontFamily: "'Luckiest Guy', cursive", color: '#466c9b' }}
                  className="text-xl sm:text-2xl tracking-wide uppercase"
                >
                  ENSINO DE MATEMÁTICA
                </span>
              </div>

              {/* Questão 2 */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3
                    style={{ fontFamily: "'Poppins', sans-serif", color: '#466c9b' }}
                    className="text-sm sm:text-base font-bold"
                  >
                    {homework.questions[1].title}
                  </h3>
                  <button
                    onClick={() => handleSolveOnWhiteboard(homework.questions[1])}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition flex items-center gap-1 shadow-sm"
                    title="Abrir esta questão em um slide em branco para resolver com a caneta"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Resolver no Quadro</span>
                  </button>
                </div>

                {/* Diagram */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-center">
                  <HomeworkDiagram
                    type={homework.questions[1].diagramType}
                    className="max-w-md w-full"
                  />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  {homework.questions[1].description}
                </p>

                <div className="space-y-2">
                  {homework.questions[1].subitems.map((sub) => (
                    <div key={sub.id} className="text-xs sm:text-sm text-slate-800 text-justify">
                      <div className="font-bold text-blue-900">{sub.question}</div>
                      {showAnswers && (
                        <div className="mt-1 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs font-medium">
                          <strong>Gabarito:</strong> {sub.expected}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Questão 3 */}
              <div className="space-y-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h3
                    style={{ fontFamily: "'Poppins', sans-serif", color: '#466c9b' }}
                    className="text-sm sm:text-base font-bold"
                  >
                    {homework.questions[2].title}
                  </h3>
                  <button
                    onClick={() => handleSolveOnWhiteboard(homework.questions[2])}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition flex items-center gap-1 shadow-sm"
                    title="Abrir esta questão em um slide em branco para resolver com a caneta"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Resolver no Quadro</span>
                  </button>
                </div>

                {/* Diagram */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-center">
                  <HomeworkDiagram
                    type={homework.questions[2].diagramType}
                    className="max-w-md w-full"
                  />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
                  {homework.questions[2].description}
                </p>

                <div className="space-y-2">
                  {homework.questions[2].subitems.map((sub) => (
                    <div key={sub.id} className="text-xs sm:text-sm text-slate-800 text-justify">
                      <div className="font-bold text-blue-900">{sub.question}</div>
                      {showAnswers && (
                        <div className="mt-1 p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-xs font-medium">
                          <strong>Gabarito:</strong> {sub.expected}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Presentation Cards Mode (Dark modern slides mode for classroom projector) */
          <div className="w-full max-w-5xl space-y-6">
            {homework.questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-indigo-600/30">
                      {idx + 1}
                    </span>
                    <h3 className="text-lg font-black text-white">{q.title}</h3>
                  </div>

                  <button
                    onClick={() => handleSolveOnWhiteboard(q)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Resolver no Quadro em Branco</span>
                  </button>
                </div>

                {/* Diagram if available */}
                {q.diagramType && (
                  <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800/80 flex justify-center">
                    <HomeworkDiagram type={q.diagramType} className="max-w-md w-full" />
                  </div>
                )}

                {/* Description / Subtitle */}
                <p className="text-sm text-slate-300 leading-relaxed">
                  {q.description || q.subtitle}
                </p>

                {/* Items or Subitems */}
                {q.items && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {q.items.map((it, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs"
                      >
                        <div className="font-semibold text-slate-200">{it.text}</div>
                        {showAnswers && (
                          <div className="text-emerald-400 font-bold pt-1 border-t border-slate-800/80">
                            ✓ {it.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {q.subitems && (
                  <div className="space-y-3 pt-2">
                    {q.subitems.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5 text-xs sm:text-sm"
                      >
                        <div className="font-bold text-slate-200">{sub.question}</div>
                        {showAnswers && (
                          <div className="text-emerald-400 font-medium text-xs pt-2 border-t border-slate-800/80">
                            <strong>Gabarito:</strong> {sub.expected}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
