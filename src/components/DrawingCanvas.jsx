import React, { useRef, useState, useEffect } from 'react';
import { Pencil, Eraser, Trash2, X, Palette, Circle } from 'lucide-react';

const COLORS = [
  { name: 'Amarelo', value: '#facc15' },
  { name: 'Ciano', value: '#06b6d4' },
  { name: 'Verde', value: '#22c55e' },
  { name: 'Vermelho', value: '#ef4444' },
  { name: 'Branco', value: '#ffffff' },
];

const SIZES = [
  { label: 'Fina', value: 3 },
  { label: 'Média', value: 6 },
  { label: 'Grossa', value: 12 },
];

export default function DrawingCanvas({ isActive, onClose }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#facc15');
  const [size, setSize] = useState(6);
  const [tool, setTool] = useState('pen'); // 'pen' or 'eraser'

  // Resize canvas to full window on mount/resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      // Preserve existing drawings on resize if needed
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(canvas, 0, 0);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(tempCanvas, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

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
    ctx.lineWidth = size;
    ctx.strokeStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : color;
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
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
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto cursor-crosshair">
      <canvas
        ref={canvasRef}
        className="w-full h-full block drawing-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />

      {/* Floating Toolbar for Teacher's Pen */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-slate-900/95 border border-slate-700/80 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-2xl flex items-center gap-3 pointer-events-auto">
        <div className="flex items-center gap-1.5 border-r border-slate-700/80 pr-3">
          <button
            onClick={() => setTool('pen')}
            className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition ${
              tool === 'pen'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Caneta de Desenho"
          >
            <Pencil className="w-4 h-4" />
            <span>Caneta</span>
          </button>
          <button
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-xl flex items-center gap-1.5 text-xs font-semibold transition ${
              tool === 'eraser'
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Borracha"
          >
            <Eraser className="w-4 h-4" />
            <span>Borracha</span>
          </button>
        </div>

        {/* Colors */}
        {tool === 'pen' && (
          <div className="flex items-center gap-1.5 border-r border-slate-700/80 pr-3">
            {COLORS.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={`w-6 h-6 rounded-full transition-transform ${
                  color === c.value ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'hover:scale-110 opacity-70 hover:opacity-100'
                }`}
                style={{ backgroundColor: c.value }}
                title={c.name}
              />
            ))}
          </div>
        )}

        {/* Thickness */}
        <div className="flex items-center gap-1 border-r border-slate-700/80 pr-3">
          {SIZES.map((s) => (
            <button
              key={s.value}
              onClick={() => setSize(s.value)}
              className={`px-2 py-1 rounded-lg text-xs font-medium transition ${
                size === s.value ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Clear & Close */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={clearCanvas}
            className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
            title="Limpar todos os desenhos"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            title="Fechar caneta (Atalho: D)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
