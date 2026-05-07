import React from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../context/GameContext';
import { CHARACTERS } from '../../data/levels';
import { Button, Card } from '../ui/KidsUI';
import { ArrowLeft, Lock, Coins, CheckCircle } from 'lucide-react';

const CharacterShop = ({ onBack }) => {
  const { coins, unlockedCharacters, selectedCharacter, purchaseCharacter, setSelectedCharacter } = useGame();

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <header className="flex justify-between items-center mb-12">
        <Button variant="secondary" onClick={onBack}><ArrowLeft /> Back</Button>
        <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase">Hero Shop</h1>
        <div className="bg-yellow-400 px-6 py-2 rounded-full border-4 border-slate-800 shadow-[0_4px_0_0_rgba(0,0,0,1)] flex items-center gap-2">
          <Coins className="text-yellow-700" />
          <span className="text-2xl font-black text-slate-800">{coins}</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {CHARACTERS.map((char) => {
          const isUnlocked = unlockedCharacters.includes(char.id);
          const isSelected = selectedCharacter === char.id;

          return (
            <motion.div key={char.id} whileHover={{ y: -10 }}>
              <Card className={`relative flex flex-col items-center p-8 border-8 transition-all ${isSelected ? 'border-yellow-400 bg-yellow-50' : isUnlocked ? 'border-green-400' : 'border-slate-700 opacity-80'}`}>
                <div className="text-[10rem] mb-6 drop-shadow-xl">{char.emoji}</div>
                <h3 className="text-3xl font-black text-slate-800 mb-4">{char.name}</h3>
                
                {isSelected ? (
                  <div className="flex items-center gap-2 text-yellow-600 font-black text-xl uppercase">
                    <CheckCircle /> Selected
                  </div>
                ) : isUnlocked ? (
                  <Button onClick={() => setSelectedCharacter(char.id)} variant="success" className="w-full">Select Hero</Button>
                ) : (
                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-center gap-2 text-2xl font-black text-slate-600">
                      <Coins className="text-yellow-500" /> {char.price}
                    </div>
                    <Button 
                      onClick={() => purchaseCharacter(char.id, char.price)} 
                      disabled={coins < char.price}
                      className="w-full"
                    >
                      <Lock size={20} /> Unlock Now
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterShop;
