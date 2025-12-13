import { useState } from 'react';
import { Clock, Save } from 'lucide-react';
import { SaveGame } from './SaveGame';

interface Chamber4Props {
  onEliminate: (reason: string) => void;
  onProgress: () => void;
  onSave: () => string;
  saveCode: string;
}

export function Chamber4({ onEliminate, onProgress, onSave, saveCode }: Chamber4Props) {
  const [answer, setAnswer] = useState<string>('');
  const [showSaveCode, setShowSaveCode] = useState(false);

  const handleSubmit = () => {
    const normalizedAnswer = answer.trim().toLowerCase();
    
    // Correct answer is "tomorrow"
    if (normalizedAnswer === 'tomorrow') {
      onProgress();
    } else {
      onEliminate(`You answered "${answer}". The logical consistency of the statements reveals the verdict must be announced tomorrow.`);
    }
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
          <div className="inline-block px-4 py-2 bg-blue-950/30 border border-blue-900/50 rounded">
            <span className="text-blue-400">CHAMBER 4</span>
          </div>
          <h2 className="text-3xl text-blue-500">THE VERDICT CLOCK</h2>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 space-y-6">
          <div className="flex items-start gap-3 bg-zinc-800/50 border border-zinc-700 rounded p-6">
            <Clock className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div className="space-y-4">
              <p className="text-zinc-100">The verdict is announced tomorrow.</p>
              <p className="text-zinc-300">Yesterday, it was said the verdict would be today.</p>
              <p className="text-zinc-300">Today, the judge says the verdict is not today.</p>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 space-y-4">
            <p className="text-zinc-300">Question:</p>
            <p className="text-xl text-zinc-100">When is the verdict announced?</p>

            <div className="space-y-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer (e.g., today, tomorrow, yesterday)..."
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={handleSubmit}
                disabled={!answer.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-3 rounded transition-colors"
              >
                Submit Answer
              </button>
            </div>
          </div>

          <div className="bg-blue-950/20 border border-blue-900/50 rounded p-4">
            <p className="text-sm text-blue-400">
              ⏰ Consider which statements maintain logical consistency.
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