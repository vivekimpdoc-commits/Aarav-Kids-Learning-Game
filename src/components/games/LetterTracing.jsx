import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Eraser, Star } from 'lucide-react';
import confetti from 'canvas-confetti';

const LetterTracing = ({ onBack }) => {
  const { addStars } = useGame();
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const letters = 'ABC'.split('');
  const [currentIdx, setCurrentIdx] = useState(0);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = '#0ea5e9';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleNext = () => {
    addStars(10);
    confetti({ particleCount: 50, origin: { y: 0.8 } });
    if (currentIdx < letters.length - 1) {
      setCurrentIdx(currentIdx + 1);
      clear();
    } else {
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-kids-sun/5 p-8 flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12">
        <Button onClick={onBack} variant="secondary" size="sm"><ArrowLeft /> Back</Button>
        <h2 className="text-4xl font-black text-slate-800 tracking-widest">Trace the Letter!</h2>
        <Button onClick={clear} variant="danger" size="sm"><Eraser /> Clear</Button>
      </header>

      <main className="relative bg-white rounded-[3rem] border-8 border-slate-800 shadow-[0_15px_0_0_rgba(30,41,59,1)] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[30rem] font-black text-slate-100 uppercase border-slate-200 border-dashed border-8 px-20">
            {letters[currentIdx]}
          </span>
        </div>
        <canvas
          ref={canvasRef}
          width={600}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={() => setIsDrawing(false)}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={() => setIsDrawing(false)}
          className="relative z-10 cursor-crosshair touch-none"
        />
      </main>

      <Button onClick={handleNext} variant="success" className="mt-12 px-20">
        I'm Done! Next Letter ➡️
      </Button>
    </div>
  );
};

export default LetterTracing;
