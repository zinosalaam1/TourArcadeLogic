import { useState } from 'react';
import { Upload, AlertCircle } from 'lucide-react';
import { loadGame, SavedGameState } from '../utils/saveGame';

interface LoadGameProps {
  onLoad: (savedGame: SavedGameState) => void;
}

export function LoadGame({ onLoad }: LoadGameProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLoad = () => {
    const trimmedCode = code.trim().toUpperCase();
    if (!trimmedCode) {
      setError('Please enter a save code.');
      return;
    }

    const savedGame = loadGame(trimmedCode);
    if (!savedGame) {
      setError('Invalid save code. Please check and try again.');
      return;
    }

    onLoad(savedGame);
  };

  if (!isExpanded) {
    return (
      <div className="text-center">
        <button
          onClick={() => setIsExpanded(true)}
          className="text-blue-400 hover:text-blue-300 text-sm underline transition-colors"
        >
          Resume saved game
        </button>
      </div>
    );
  }

  return (
    <div className="bg-blue-950/20 border border-blue-900/50 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Upload className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg text-blue-300">Resume Game</h3>
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <label htmlFor="saveCode" className="block text-sm text-zinc-400">
            Enter your save code:
          </label>
          <input
            id="saveCode"
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value.toUpperCase());
              setError('');
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleLoad();
              }
            }}
            placeholder="XXXXXXXX"
            maxLength={8}
            className="w-full bg-zinc-900 border border-zinc-700 rounded px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500 transition-colors font-mono tracking-wider uppercase"
          />
          {error && (
            <div className="flex items-start gap-2 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleLoad}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Load Game
          </button>
          <button
            onClick={() => {
              setIsExpanded(false);
              setCode('');
              setError('');
            }}
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
