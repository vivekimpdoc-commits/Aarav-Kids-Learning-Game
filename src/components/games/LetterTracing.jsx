import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';
import { Eraser, Palette, Sparkles, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const COLORS = [
  { name: 'Sky', hex: '#0ea5e9' },
  { name: 'Rose', hex: '#f43f5e' },
  { name: 'Emerald', hex: '#10b981' },
  { name: 'Amber', hex: '#f59e0b' },
  { name: 'Violet', hex: '#8b5cf6' },
];

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');

const LetterTracing = ({ onScore, difficulty, isPaused }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [penColor, setPenColor] = useState(COLORS[0].hex);
  const [showGuide, setShowGuide] = useState(true);

  // Difficulty scales number of letters to trace
  const lettersToTrace = LETTERS.slice(0, Math.min(LETTERS.length, 5 + difficulty));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 25;
    }
  }, []);

  const getPointerPos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const startDrawing = (e) => {
    if (isPaused) return;
    const { x, y } = getPointerPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = penColor;
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || isPaused) return;
    const { x, y } = getPointerPos(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleNext = () => {
    onScore(1);
    const nextIdx = (currentIdx + 1) % lettersToTrace.length;
    setCurrentIdx(nextIdx);
    clear();
    speak(`Trace the letter ${lettersToTrace[nextIdx]}`);
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    synth.speak(utter);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-md p-6 rounded-[3rem] border-4 border-white/60 shadow-2xl space-y-6">
        
        {/* Toolbar */}
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-2 bg-white/80 p-2 rounded-2xl shadow-inner border-2 border-slate-200">
            {COLORS.map(c => (
              <button
                key={c.hex}
                onClick={() => setPenColor(c.hex)}
                className={`w-10 h-10 rounded-full border-4 transition-transform ${penColor === c.hex ? 'border-slate-800 scale-110 shadow-lg' : 'border-white hover:scale-105'}`}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button onClick={() => setShowGuide(!showGuide)} variant="secondary" size="sm" className="rounded-xl">
               {showGuide ? 'Hide Guide' : 'Show Guide'}
            </Button>
            <Button onClick={clear} variant="danger" size="sm" className="rounded-xl">
              <Eraser size={18} />
            </Button>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="relative group">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden rounded-[2.5rem]">
             <AnimatePresence mode="wait">
               <motion.span 
                 key={currentIdx}
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={{ opacity: showGuide ? 0.15 : 0.05, scale: 1 }}
                 exit={{ opacity: 0, scale: 1.2 }}
                 className="text-[35rem] font-black text-slate-900 leading-none select-none"
                 style={{ fontFamily: 'monospace' }}
               >
                 {lettersToTrace[currentIdx]}
               </motion.span>
             </AnimatePresence>
             
             {showGuide && (
                <motion.div 
                  animate={{ opacity: [0.2, 0.5, 0.2] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                   <p className="text-xl font-black text-slate-400 uppercase tracking-widest mt-[25rem]">Follow the lines!</p>
                </motion.div>
             )}
          </div>

          <canvas
            ref={canvasRef}
            width={600}
            height={600}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={() => setIsDrawing(false)}
            className="relative z-10 bg-white/80 rounded-[2.5rem] border-8 border-slate-800 shadow-2xl cursor-crosshair touch-none w-full aspect-square"
          />

          {/* Sparkle Decoration */}
          <Sparkles className="absolute -top-4 -right-4 text-yellow-400 w-12 h-12 animate-pulse" />
        </div>

        {/* Bottom Navigation */}
        <div className="flex justify-between items-center gap-6 pt-4">
           <div className="text-left">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest leading-none">Tracing</p>
              <h3 className="text-4xl font-black text-slate-800 uppercase italic">{lettersToTrace[currentIdx]}</h3>
           </div>
           
           <Button onClick={handleNext} variant="success" className="flex-1 py-6 text-3xl shadow-[0_10px_0_0_rgba(16,185,129,1)] active:shadow-none active:translate-y-2 transition-all">
              NEXT LETTER <ChevronRight className="ml-2" />
           </Button>
        </div>
      </div>
    </div>
  );
};

export default LetterTracing;
