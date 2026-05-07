import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '../ui/KidsUI';
import { Send, Volume2 } from 'lucide-react';

const AIFriend = ({ onScore, difficulty, isPaused }) => {
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
    if (isPaused) return;
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
    if (!input.trim() || isPaused) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Each message counts towards level progress
    onScore(1);

    setTimeout(() => {
      const aiText = getAIResponse(input);
      setMessages(prev => [...prev, { text: aiText, sender: 'ai' }]);
      setIsTyping(false);
      speak(aiText);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col p-4 max-w-2xl mx-auto bg-white/20 backdrop-blur-md rounded-[3rem] border-4 border-white/40">
      <div className="flex-1 overflow-y-auto mb-6 space-y-4 pr-2 custom-scrollbar">
        {messages.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8, x: m.sender === 'ai' ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            className={`flex ${m.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[85%] p-5 rounded-3xl border-4 border-slate-800 shadow-[0_6px_0_0_rgba(30,41,59,1)] ${
              m.sender === 'ai' ? 'bg-white text-slate-800' : 'bg-sky-500 text-white'
            }`}>
              <p className="text-xl font-black">{m.text}</p>
              {m.sender === 'ai' && (
                <button onClick={() => speak(m.text)} className="mt-2 text-slate-400 hover:text-slate-600">
                  <Volume2 size={20} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-3xl border-4 border-slate-800 flex gap-2">
              <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-3 h-3 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
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
          placeholder="Type your message..."
          className="flex-1 bg-transparent border-none outline-none text-xl font-black p-2"
        />
        <Button onClick={handleSend} size="sm" className="p-4 rounded-2xl">
          <Send />
        </Button>
      </div>
    </div>
  );
};

export default AIFriend;
