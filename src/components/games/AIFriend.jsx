import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Send, Mic, Volume2 } from 'lucide-react';

const AIFriend = ({ onBack }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Sparky, your English learning friend. What's your name?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const speak = (text) => {
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance(text);
    utter.pitch = 1.5;
    utter.rate = 1;
    synth.speak(utter);
  };

  const getAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes('name is') || input.includes('i am')) {
      const name = userInput.split(' ').pop();
      return `Nice to meet you, ${name}! Do you want to learn some colors or animals today?`;
    }
    if (input.includes('color')) return "Colors are fun! Red like an apple, Blue like the sky! What's your favorite color?";
    if (input.includes('animal')) return "I love animals! A lion says ROAR! Can you say ROAR?";
    if (input.includes('hello') || input.includes('hi')) return "Hello there! How are you doing today?";
    if (input.includes('apple')) return "A is for Apple! A-P-P-L-E. It's a healthy fruit!";
    return "That's interesting! Tell me more about it.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiText = getAIResponse(input);
      setMessages(prev => [...prev, { text: aiText, sender: 'ai' }]);
      setIsTyping(false);
      speak(aiText);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-kids-sky/5 p-4 flex flex-col max-w-2xl mx-auto">
      <header className="flex items-center gap-4 mb-6">
        <Button onClick={onBack} variant="secondary" size="sm">
          <ArrowLeft />
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-kids-sun rounded-full border-2 border-slate-800 flex items-center justify-center text-2xl">
            🐶
          </div>
          <h2 className="text-2xl font-black text-slate-800">Sparky the AI</h2>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.sender === 'ai' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex ${m.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-3xl border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] ${
              m.sender === 'ai' ? 'bg-white text-slate-800' : 'bg-kids-sky text-white'
            }`}>
              <p className="text-xl font-bold">{m.text}</p>
              {m.sender === 'ai' && (
                <button onClick={() => speak(m.text)} className="mt-2 text-slate-400 hover:text-slate-600">
                  <Volume2 size={16} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-3xl border-4 border-slate-800 shadow-[0_4px_0_0_rgba(30,41,59,1)] flex gap-2">
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}
        <div ref={scrollRef} />
      </div>

      <div className="flex gap-4 items-center bg-white p-4 rounded-[2rem] border-4 border-slate-800 shadow-[0_8px_0_0_rgba(30,41,59,1)]">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Talk to Sparky..."
          className="flex-1 bg-transparent border-none outline-none text-xl font-bold p-2"
        />
        <Button onClick={handleSend} size="sm" className="p-3">
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default AIFriend;
