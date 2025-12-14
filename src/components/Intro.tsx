import { Scale } from 'lucide-react';
import { useState } from 'react';
import { Leaderboard } from './Leaderboard';
import { LoadGame } from './LoadGame';
import { SavedGameState } from '../utils/saveGame';

interface IntroProps {
  onStart: () => void;
  onSetPlayerName: (name: string) => void;
  onLoadGame: (savedGame: SavedGameState) => void;
}

export function Intro({ onStart, onSetPlayerName, onLoadGame }: IntroProps) {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');

  const handleStart = () => {
    const trimmedName = playerName.trim();
    if (!trimmedName) {
      setError('Please enter your name to begin the trial.');
      return;
    }
    if (trimmedName.length < 2) {
      setError('Name must be at least 2 characters.');
      return;
    }
    if (trimmedName.length > 20) {
      setError('Name must be 20 characters or less.');
      return;
    }
    onSetPlayerName(trimmedName);
    onStart();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-3xl w-full space-y-8 text-center animate-in fade-in duration-700">
        <div className="flex justify-center mb-8">
          <div className="bg-red-950/30 p-6 rounded-full border border-red-900/50">
            <Scale className="w-16 h-16 text-red-500" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="inline-block px-4 py-2 bg-red-950/30 border border-red-900/50 rounded">
            <span className="text-red-400">SUNDAY's ESCAPE ROOM</span>
          </div>
          
          <h1 className="text-5xl text-red-500">
            THE SILENT TRIAL
          </h1>
          
          <div className="space-y-2 text-zinc-400">
            <p className="text-red-400">Difficulty: Extreme</p>
            <p>Style: Legal Logic • Meta-Rules • Self-Referencing Traps</p>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 space-y-6">
          <div className="space-y-4">
            <p className="text-xl text-zinc-300">You are accused in a secret trial.</p>
            <p className="text-zinc-400">You are not told your crime.</p>
            <p className="text-zinc-400">You are not told the verdict.</p>
          </div>

          <div className="border-l-4 border-red-500 pl-6 py-4 bg-red-950/20">
            <p className="text-xl text-red-400 italic">
              "Every mistake confirms your guilt."
            </p>
          </div>

          <div className="space-y-3 text-zinc-400">
            <p>There are 5 Chambers.</p>
            <p>Each chamber is a logical test disguised as instructions.</p>
            <p className="text-red-400">The rules themselves are part of the puzzle.</p>
            <p className="text-red-400">What you assume will eliminate you.</p>
          </div>
        </div>

        <div className="bg-amber-950/20 border border-amber-900/50 rounded-lg p-6">
          <p className="text-amber-400 mb-4">⚠️ WARNING</p>
          <div className="space-y-2 text-sm text-zinc-400">
            <p>• Any wrong input = elimination</p>
            <p>• Rules contradict expectations</p>
            <p>• Silence may be an answer</p>
            <p>• Read everything carefully</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="playerName" className="block text-zinc-300">
              Enter your name to begin:
            </label>
            <input
              id="playerName"
              type="text"
              value={playerName}
              onChange={(e) => {
                setPlayerName(e.target.value);
                setError('');
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleStart();
                }
              }}
              placeholder="Your name"
              className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors"
              maxLength={20}
            />
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
          </div>

          <button
            onClick={handleStart}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg transition-colors w-full"
          >
            Enter the Trial
          </button>
        </div>

        <LoadGame onLoad={onLoadGame} />

        <Leaderboard />
      </div>
    </div>
  );
}