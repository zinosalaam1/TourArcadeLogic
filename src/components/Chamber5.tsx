import { useState } from 'react';
import { Trophy, Save } from 'lucide-react';
import { SaveGame } from './SaveGame';

interface Chamber5Props {
  onEliminate: (reason: string) => void;
  onProgress: () => void;
  chambersPassed: number;
  onSave: () => string;
  saveCode: string;
}

export function Chamber5({ onEliminate, onProgress, chambersPassed, onSave, saveCode }: Chamber5Props) {
  const [answer, setAnswer] = useState<string>('');
  const [showSaveCode, setShowSaveCode] = useState(false);

  const handleSubmit = () => {
    const numericAnswer = parseInt(answer);
    
    // At this moment, they have passed 4 chambers (1-4)
    // They have NOT yet passed Chamber 5
    if (numericAnswer === 4) {
      onProgress();
    } else {
      onEliminate(`You submitted ${answer}. At the moment of submission, you had only passed 4 chambers. Chamber 5 is not complete until your answer is validated. The correct answer was 4.`);
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
          <div className="inline-block px-4 py-2 bg-purple-950/30 border border-purple-900/50 rounded">
            <span className="text-purple-400">CHAMBER 5</span>
          </div>
          <h2 className="text-3xl text-purple-500">THE FINAL APPEAL</h2>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 space-y-6">
          <div className="flex items-start gap-3 bg-zinc-800/50 border border-zinc-700 rounded p-6">
            <Trophy className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-xl text-zinc-100">
                Submit the number of chambers you have passed correctly.
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 space-y-4">
            <div className="space-y-3">
              <input
                type="number"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter a number..."
                min="0"
                max="5"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              />

              <button
                onClick={handleSubmit}
                disabled={!answer}
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-3 rounded transition-colors"
              >
                Submit Final Answer
              </button>
            </div>
          </div>

          <div className="bg-purple-950/20 border border-purple-900/50 rounded p-4">
            <p className="text-sm text-purple-400">
              🎯 Read the instruction carefully. When exactly are you submitting this?
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