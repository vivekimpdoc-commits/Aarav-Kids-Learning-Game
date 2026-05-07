import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';
import { Eraser } from 'lucide-react';

const LetterTracing = ({ onScore, difficulty, isPaused }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const letters = 'ABC'.split('');
  const [currentIdx, setCurrentIdx] = useState(0);

  const startDrawing = (e) => {
    if (isPaused) return;
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
    if (!isDrawing || isPaused) return;
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
    onScore(1);
    if (currentIdx < letters.length - 1) {
      setCurrentIdx(currentIdx + 1);
      clear();
    } else {
      setCurrentIdx(0);
      clear();
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      <div className="flex justify-between w-full max-w-xl mb-4">
        <h3 className="text-2xl font-black text-slate-800 uppercase italic">Trace: {letters[currentIdx]}</h3>
        <Button onClick={clear} variant="danger" size="sm"><Eraser /> Clear</Button>
      </div>

      <div className="relative bg-white rounded-[3rem] border-8 border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10">
          <span className="text-[30rem] font-black text-slate-800 uppercase">
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
          className="relative z-10 cursor-crosshair touch-none max-w-full aspect-square"
        />
      </div>

      <Button onClick={handleNext} variant="success" className="mt-8 px-12 py-6 text-2xl">
        I'm Done! ➡️
      </Button>
    </div>
  );
};

export default LetterTracing;
