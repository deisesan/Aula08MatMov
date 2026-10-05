import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Pencil,
  Highlighter,
  Eraser,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Image as ImageIcon,
  Columns,
  Layers,
  Timer,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  Grid3X3,
  Check,
  X,
} from 'lucide-react';
import { sounds } from '../utils/audio';
import { timerManager } from '../utils/timerManager';

const COLORS = [
  { name: 'Amarelo', value: '#facc15' },
  { name: 'Ciano', value: '#06b6d4' },
  { name: 'Verde', value: '#22c55e' },
  { name: 'Rosa', value: '#f43f5e' },
  { name: 'Branco', value: '#ffffff' },
  { name: 'Roxo', value: '#c084fc' },
];

const SIZES = [
  { label: 'Fina', value: 3 },
  { label: 'Média', value: 6 },
  { label: 'Grossa', value: 14 },
];

const BACKGROUNDS = [
  { id: 'grid', label: 'Quadriculado', icon: '▦' },
  { id: 'dark', label: 'Escuro', icon: '⬛' },
  { id: 'dots', label: 'Pontilhado', icon: '⁖' },
  { id: 'white', label: 'Branco', icon: '⬜' },
];

export default function BlankExerciseSlide({
  slide,
  onUpdateSlide,
  onDeleteSlide,
}) {
  const slideId = slide?.id || 'blank-slide';
  const customData = slide?.customData || {};

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const containerRef = useRef(null);

  // Drawing state
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen'); // 'pen' | 'highlighter' | 'eraser'
  const [color, setColor] = useState('#facc15');
  const [size, setSize] = useState(6);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Background and Layout
  const [backgroundStyle, setBackgroundStyle] = useState(
    customData.backgroundStyle || 'grid'
  );
  const [imageLayout, setImageLayout] = useState(
    customData.imageLayout || 'split'
  ); // 'split' (side by side) | 'overlay' (draw on top)
  const [imageSrc, setImageSrc] = useState(customData.imageSrc || null);
  const [imageScale, setImageScale] = useState(customData.imageScale || 100);
  const [slideTitle, setSlideTitle] = useState(
    slide?.title || 'Quadro de Resolução de Exercício'
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Slide-specific exercise timer
  const timerId = `exercise_timer_${slideId}`;
  const [timerState, setTimerState] = useState(() =>
    timerManager.getTimer(timerId, 180, 'Resolução de Exercício')
  );

  useEffect(() => {
    const unsubscribe = timerManager.subscribe((allTimers) => {
      if (allTimers[timerId]) {
        setTimerState({ ...allTimers[timerId] });
      }
    });
    return () => unsubscribe();
  }, [timerId]);

  // Load saved canvas drawing on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const savedStrokes =
      customData.drawingData ||
      localStorage.getItem(`antigravity_canvas_${slideId}`);

    if (savedStrokes) {
      const img = new Image();
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        saveHistoryState();
      };
      img.src = savedStrokes;
    }
  }, [slideId]);

  // Handle Resize of Canvas
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Save existing drawing before resize
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.drawImage(canvas, 0, 0);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.drawImage(tempCanvas, 0, 0, rect.width, rect.height);
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas, imageLayout, imageSrc]);

  // History State
  const saveHistoryState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL();
    setHistory((prev) => {
      const updated = prev.slice(0, historyIndex + 1);
      return [...updated, dataUrl];
    });
    setHistoryIndex((prev) => prev + 1);

    // Save to localStorage for persistence
    try {
      localStorage.setItem(`antigravity_canvas_${slideId}`, dataUrl);
      if (onUpdateSlide) {
        onUpdateSlide(slideId, {
          customData: {
            ...customData,
            drawingData: dataUrl,
            imageSrc,
            imageLayout,
            imageScale,
            backgroundStyle,
          },
        });
      }
    } catch {}
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      const targetData = history[newIdx];
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setHistoryIndex(newIdx);
        localStorage.setItem(`antigravity_canvas_${slideId}`, targetData);
      };
      img.src = targetData;
      sounds.playTone(400, 'sine', 0.1);
    } else if (historyIndex === 0) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHistoryIndex(-1);
      localStorage.removeItem(`antigravity_canvas_${slideId}`);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      const targetData = history[newIdx];
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        setHistoryIndex(newIdx);
        localStorage.setItem(`antigravity_canvas_${slideId}`, targetData);
      };
      img.src = targetData;
      sounds.playTone(600, 'sine', 0.1);
    }
  };

  // Paste image directly from clipboard (Ctrl+V) anywhere on the slide!
  useEffect(() => {
    const handlePaste = (e) => {
      // Don't intercept if typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
              const url = event.target.result;
              setImageSrc(url);
              sounds.playSuccess();
              if (onUpdateSlide) {
                onUpdateSlide(slideId, {
                  customData: { ...customData, imageSrc: url },
                });
              }
            };
            reader.readAsDataURL(file);
          }
          break;
        }
      }
    };

    window.addEventListener('paste', handlePaste);
    return () => window.removeEventListener('paste', handlePaste);
  }, [slideId, customData, onUpdateSlide]);

  // File Upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
        setImageSrc(url);
        sounds.playSuccess();
        if (onUpdateSlide) {
          onUpdateSlide(slideId, {
            customData: { ...customData, imageSrc: url },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag and Drop
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target.result;
        setImageSrc(url);
        sounds.playSuccess();
        if (onUpdateSlide) {
          onUpdateSlide(slideId, {
            customData: { ...customData, imageSrc: url },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Canvas Coordinates
  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.clientX ?? e.touches?.[0]?.clientX;
    const clientY = e.clientY ?? e.touches?.[0]?.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const startDrawing = (e) => {
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (tool === 'eraser') {
      ctx.lineWidth = size * 2.5;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.globalCompositeOperation = 'destination-out';
    } else if (tool === 'highlighter') {
      ctx.lineWidth = size * 3;
      ctx.strokeStyle = color;
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.35;
    } else {
      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1.0;
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const ctx = canvasRef.current.getContext('2d');
    ctx.closePath();
    ctx.globalAlpha = 1.0;
    saveHistoryState();
  };

  const handleClear = () => {
    if (window.confirm('Deseja limpar todos os traços deste quadro?')) {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      saveHistoryState();
      sounds.playTone(300, 'sine', 0.15);
    }
  };

  const exportAsImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `resolucao-${slideTitle.toLowerCase().replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    sounds.playSuccess();
  };

  // Timer controls
  const toggleTimer = () => {
    timerManager.toggle(timerId, 180, 'Resolução de Exercício');
  };

  const resetTimer = (secs = 180) => {
    timerManager.reset(timerId, secs);
  };

  const timerMin = Math.floor((timerState?.remainingSeconds || 0) / 60);
  const timerSec = (timerState?.remainingSeconds || 0) % 60;
  const formattedTimer = `${String(timerMin).padStart(2, '0')}:${String(timerSec).padStart(2, '0')}`;

  // Background Class
  const getBgStyle = () => {
    switch (backgroundStyle) {
      case 'grid':
        return {
          backgroundColor: '#090d16',
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to right, rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(99, 102, 241, 0.08) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        };
      case 'dots':
        return {
          backgroundColor: '#0a0f1d',
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.18) 1.5px, transparent 1.5px)`,
          backgroundSize: '20px 20px',
        };
      case 'white':
        return {
          backgroundColor: '#f8fafc',
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        };
      default:
        return { backgroundColor: '#020617' };
    }
  };

  return (
    <div
      ref={containerRef}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="w-full h-full flex flex-col select-none overflow-hidden relative"
      style={getBgStyle()}
    >
      {/* Top Slide Control Bar */}
      <div className="h-12 bg-slate-900/90 border-b border-slate-800/90 px-4 flex items-center justify-between z-30 shrink-0 backdrop-blur-md">
        {/* Left: Title & Extra Badge */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold text-xs flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Slide Extra</span>
          </span>

          {isEditingTitle ? (
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={slideTitle}
                onChange={(e) => setSlideTitle(e.target.value)}
                className="bg-slate-800 text-white font-bold text-sm px-2.5 py-1 rounded-lg border border-indigo-500 focus:outline-none"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsEditingTitle(false);
                  if (onUpdateSlide) onUpdateSlide(slideId, { title: slideTitle });
                }}
                className="p-1 rounded bg-indigo-600 text-white"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <h2
              onClick={() => setIsEditingTitle(true)}
              className="text-sm sm:text-base font-bold text-white cursor-pointer hover:text-indigo-300 transition flex items-center gap-1.5 truncate max-w-xs md:max-w-md"
              title="Clique para renomear este slide"
            >
              <span>{slideTitle}</span>
              <Pencil className="w-3 h-3 text-slate-500 opacity-60" />
            </h2>
          )}
        </div>

        {/* Center: Dedicated Exercise Countdown Timer (Independent & Persistent) */}
        <div className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 px-3 py-1 rounded-xl">
          <Timer className="w-4 h-4 text-amber-400" />
          <span className="font-mono font-bold text-sm text-white">
            {formattedTimer}
          </span>
          <button
            onClick={toggleTimer}
            className={`p-1 rounded-lg text-xs font-bold transition ${
              timerState?.isRunning
                ? 'bg-amber-500 text-slate-950'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
            title={timerState?.isRunning ? 'Pausar' : 'Iniciar cronômetro de exercício'}
          >
            {timerState?.isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => resetTimer(180)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Reiniciar para 3 min"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <div className="hidden sm:flex items-center gap-1 text-[11px] border-l border-slate-800 pl-2">
            {[1, 3, 5].map((m) => (
              <button
                key={m}
                onClick={() => resetTimer(m * 60)}
                className="px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono"
              >
                {m}m
              </button>
            ))}
          </div>
        </div>

        {/* Right: Background style & Slide Actions */}
        <div className="flex items-center gap-2">
          {/* Background switcher */}
          <div className="hidden md:flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-xs">
            {BACKGROUNDS.map((bg) => (
              <button
                key={bg.id}
                onClick={() => {
                  setBackgroundStyle(bg.id);
                  if (onUpdateSlide) {
                    onUpdateSlide(slideId, {
                      customData: { ...customData, backgroundStyle: bg.id },
                    });
                  }
                }}
                className={`px-2 py-0.5 rounded-md font-medium transition ${
                  backgroundStyle === bg.id
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title={`Fundo ${bg.label}`}
              >
                {bg.label}
              </button>
            ))}
          </div>

          {/* Delete slide button */}
          {onDeleteSlide && (
            <button
              onClick={() => {
                if (window.confirm('Tem certeza que deseja excluir este slide extra?')) {
                  onDeleteSlide(slideId);
                }
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/30 text-slate-400 hover:text-rose-400 border border-slate-700 transition"
              title="Excluir este slide extra"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Board Area */}
      <div className="flex-1 w-full h-full relative flex overflow-hidden">
        {/* Left Column: Image Area (If image present and split mode) */}
        {imageSrc && imageLayout === 'split' && (
          <div className="w-2/5 border-r border-slate-800/90 bg-slate-950/60 p-4 flex flex-col justify-between overflow-y-auto shrink-0 relative">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60 mb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Enunciado do Exercício</span>
              </span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setImageLayout('overlay')}
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 flex items-center gap-1 transition"
                  title="Alternar para tela inteira e desenhar por cima da imagem"
                >
                  <Layers className="w-3 h-3 text-indigo-400" />
                  <span>Sobrepor</span>
                </button>
                <button
                  onClick={() => setImageSrc(null)}
                  className="p-1 rounded hover:bg-rose-500/20 text-slate-400 hover:text-rose-400"
                  title="Remover imagem"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Displayed Image */}
            <div className="flex-1 flex items-center justify-center p-2 rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden">
              <img
                src={imageSrc}
                alt="Exercício"
                className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-2xl transition-transform"
                style={{ transform: `scale(${imageScale / 100})` }}
              />
            </div>

            {/* Scale controls */}
            <div className="flex items-center justify-between pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setImageScale((p) => Math.max(50, p - 10))}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="font-mono text-[11px] px-1">{imageScale}%</span>
                <button
                  onClick={() => setImageScale((p) => Math.min(200, p + 10))}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <span className="text-[11px] text-slate-500">
                Pressione <kbd className="bg-slate-800 px-1 rounded text-slate-300">Ctrl+V</kbd> para colar nova
              </span>
            </div>
          </div>
        )}

        {/* Right / Full Column: Interactive Drawing Canvas */}
        <div className="flex-1 h-full relative overflow-hidden">
          {/* Overlay Image (If overlay mode) */}
          {imageSrc && imageLayout === 'overlay' && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-6 z-0">
              <img
                src={imageSrc}
                alt="Exercício de Fundo"
                className="max-w-full max-h-[85vh] object-contain opacity-90 rounded-2xl shadow-2xl"
                style={{ transform: `scale(${imageScale / 100})` }}
              />
            </div>
          )}

          {/* Prompt if no image is present */}
          {!imageSrc && (
            <div className="absolute top-4 left-6 pointer-events-none z-0 flex items-center gap-3 text-slate-500 text-xs bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-800/60">
              <span className="text-amber-400 font-bold">💡 Dica Rápida:</span>
              <span>
                Pressione <kbd className="bg-slate-800 px-1.5 py-0.5 rounded font-mono text-slate-300">Ctrl + V</kbd> para colar um print de exercício direto nesta lousa!
              </span>
            </div>
          )}

          {/* The Drawing Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full block absolute inset-0 z-10 cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      </div>

      {/* Floating Teacher's Floating Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-slate-700/80 backdrop-blur-xl rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-3 z-40">
        {/* Tools */}
        <div className="flex items-center gap-1 border-r border-slate-700/80 pr-2.5">
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition ${
              tool === 'pen'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Caneta de escrita"
          >
            <Pencil className="w-4 h-4" />
            <span className="hidden sm:inline">Caneta</span>
          </button>

          <button
            onClick={() => setTool('highlighter')}
            className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition ${
              tool === 'highlighter'
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Marca-texto com transparência"
          >
            <Highlighter className="w-4 h-4" />
            <span className="hidden sm:inline">Marca-Texto</span>
          </button>

          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition ${
              tool === 'eraser'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Borracha"
          >
            <Eraser className="w-4 h-4" />
            <span className="hidden sm:inline">Borracha</span>
          </button>
        </div>

        {/* Colors */}
        {tool !== 'eraser' && (
          <div className="flex items-center gap-1.5 border-r border-slate-700/80 pr-2.5">
            {COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full transition-transform ${
                  color === c.value
                    ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900'
                    : 'hover:scale-110 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Stroke thickness */}
        <div className="flex items-center gap-1 border-r border-slate-700/80 pr-2.5">
          {SIZES.map((s) => (
            <button
              key={s.value}
              onClick={() => setSize(s.value)}
              className={`px-2 py-1 rounded-lg text-xs font-medium transition ${
                size === s.value
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center gap-1 border-r border-slate-700/80 pr-2.5">
          <button
            onClick={handleUndo}
            disabled={historyIndex < 0}
            className={`p-1.5 rounded-lg transition ${
              historyIndex >= 0
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Desfazer (Ctrl+Z)"
          >
            <Undo2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 rounded-lg transition ${
              historyIndex < history.length - 1
                ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                : 'text-slate-600 cursor-not-allowed'
            }`}
            title="Refazer"
          >
            <Redo2 className="w-4 h-4" />
          </button>
        </div>

        {/* Image actions & Export */}
        <div className="flex items-center gap-1.5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl text-slate-300 hover:text-indigo-400 hover:bg-slate-800 transition flex items-center gap-1 text-xs font-medium"
            title="Carregar imagem do computador (ou cole com Ctrl+V)"
          >
            <ImageIcon className="w-4 h-4" />
            <span className="hidden md:inline">Imagem</span>
          </button>

          <button
            onClick={exportAsImage}
            className="p-2 rounded-xl text-slate-300 hover:text-emerald-400 hover:bg-slate-800 transition flex items-center gap-1 text-xs font-medium"
            title="Baixar resolução em PNG para enviar aos alunos"
          >
            <Download className="w-4 h-4" />
            <span className="hidden md:inline">Salvar</span>
          </button>

          <button
            onClick={handleClear}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
            title="Limpar quadro"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
