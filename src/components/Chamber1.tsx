import { useState, useEffect } from 'react';
import { AlertCircle, Save } from 'lucide-react';
import { SaveGame } from './SaveGame';

interface Chamber1Props {
  onEliminate: (reason: string) => void;
  onProgress: () => void;
  onSave: () => string;
  saveCode: string;
}

export function Chamber1({ onEliminate, onProgress, onSave, saveCode }: Chamber1Props) {
  const [input, setInput] = useState('');
  const [timeWaited, setTimeWaited] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showSaveCode, setShowSaveCode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeWaited(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-progress after 8 seconds of not interacting
  useEffect(() => {
    if (timeWaited >= 8 && !hasInteracted) {
      onProgress();
    }
  }, [timeWaited, hasInteracted, onProgress]);

  const handleSubmit = () => {
    setHasInteracted(true);
    onEliminate('You answered the question despite being explicitly instructed NOT to answer unless instructed to do so.');
  };

  const handleInputChange = (value: string) => {
    setInput(value);
    setHasInteracted(true);
    // Immediate elimination if they type anything
    onEliminate('You answered the question despite being explicitly instructed NOT to answer unless instructed to do so.');
  };

  const handleSave = () => {
    const code = onSave();
    if (code) {
      setShowSaveCode(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 animate-in fade-in duration-500">
        <div className="text-center space-y-4">
          <div className="inline-block px-4 py-2 bg-red-950/30 border border-red-900/50 rounded">
            <span className="text-red-400">CHAMBER 1</span>
          </div>
          <h2 className="text-3xl text-red-500">THE TERMS</h2>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 space-y-6">
          <div className="bg-zinc-800/50 border border-zinc-700 rounded p-6 space-y-4">
            <p className="text-zinc-100">
              Only those who follow ALL instructions exactly may proceed.
            </p>
            <p className="text-red-400">
              Do NOT answer this question unless instructed to do so.
            </p>
          </div>

          <div className="border-t border-zinc-800 pt-6 space-y-4">
            <p className="text-zinc-300">Question displayed below:</p>
            
            <div className="bg-zinc-800/30 border border-zinc-700 rounded p-4">
              <p className="text-zinc-100">Type YES to continue.</p>
            </div>

            <div className="space-y-3">
              <input
                type="text"
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Your answer..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-red-500"
              />
              
              <button
                onClick={handleSubmit}
                disabled={!input}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-3 rounded transition-colors"
              >
                Submit Answer
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-amber-950/20 border border-amber-900/50 rounded p-4">
            <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-400">
              Remember: Every mistake confirms your guilt.
            </p>
          </div>
        </div>

        {showSaveCode && saveCode && (
          <SaveGame saveCode={saveCode} />
        )}

        <div className="flex justify-center">
          <button
            onClick={handleSave}
            className="text-zinc-400 hover:text-zinc-300 text-sm flex items-center gap-2 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save & Exit
          </button>
        </div>
      </div>
    </div>
  );
}