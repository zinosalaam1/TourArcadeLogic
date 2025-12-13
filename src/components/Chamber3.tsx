import { useState } from 'react';
import { Scale, Save } from 'lucide-react';
import { SaveGame } from './SaveGame';

interface Chamber3Props {
  onEliminate: (reason: string) => void;
  onProgress: () => void;
  onSave: () => string;
  saveCode: string;
}

export function Chamber3({ onEliminate, onProgress, onSave, saveCode }: Chamber3Props) {
  const [selectedJudge, setSelectedJudge] = useState<number | null>(null);
  const [textInput, setTextInput] = useState<string>('');
  const [showSaveCode, setShowSaveCode] = useState(false);

  const handleSubmit = () => {
    // Allow both button selection and text input
    let answer: number | null = selectedJudge;
    if (!answer && textInput.trim()) {
      answer = parseInt(textInput.trim());
    }
    if (answer === null || isNaN(answer)) return;

    // Correct answer is Judge 2
    if (answer === 2) {
      onProgress();
    } else {
      onEliminate(`You selected Judge ${answer} as correct. This creates a logical contradiction. Only Judge 2 can be correct without paradox.`);
    }
  };

  const handleTextInputChange = (value: string) => {
    setTextInput(value);
    setSelectedJudge(null); // Clear button selection when typing
  };

  const handleJudgeSelect = (judge: number) => {
    setSelectedJudge(judge);
    setTextInput(''); // Clear text input when clicking button
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
          <div className="inline-block px-4 py-2 bg-emerald-950/30 border border-emerald-900/50 rounded">
            <span className="text-emerald-400">CHAMBER 3</span>
          </div>
          <h2 className="text-3xl text-emerald-500">THE JUDGES</h2>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 space-y-6">
          <div className="flex items-start gap-3 bg-zinc-800/50 border border-zinc-700 rounded p-6">
            <Scale className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
            <div>
              <p className="text-zinc-100">Exactly ONE of the following judges is correct.</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-zinc-300">The judges say:</p>
            
            <div className="space-y-3">
              <div className="bg-zinc-800/30 border border-zinc-700 rounded p-5">
                <p className="text-zinc-100">
                  <span className="text-emerald-400">Judge 1:</span> "This chamber has no correct answer."
                </p>
              </div>
              
              <div className="bg-zinc-800/30 border border-zinc-700 rounded p-5">
                <p className="text-zinc-100">
                  <span className="text-emerald-400">Judge 2:</span> "Judge 3 is wrong."
                </p>
              </div>
              
              <div className="bg-zinc-800/30 border border-zinc-700 rounded p-5">
                <p className="text-zinc-100">
                  <span className="text-emerald-400">Judge 3:</span> "Judge 1 is correct."
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 space-y-4">
            <p className="text-zinc-300">Question:</p>
            <p className="text-xl text-zinc-100">Which judge is correct?</p>

            <div className="space-y-3">
              <div className="flex gap-3">
                {[1, 2, 3].map((judge) => (
                  <button
                    key={judge}
                    onClick={() => handleJudgeSelect(judge)}
                    className={`flex-1 px-6 py-4 rounded border-2 transition-all ${
                      selectedJudge === judge
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-emerald-500'
                    }`}
                  >
                    Judge {judge}
                  </button>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-700"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-zinc-900 px-2 text-xs text-zinc-500">or type your answer</span>
                </div>
              </div>

              <input
                type="number"
                value={textInput}
                onChange={(e) => handleTextInputChange(e.target.value)}
                placeholder="Type 1, 2, or 3..."
                min="1"
                max="3"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />

              <button
                onClick={handleSubmit}
                disabled={selectedJudge === null && !textInput.trim()}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-3 rounded transition-colors"
              >
                Submit Answer
              </button>
            </div>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/50 rounded p-4">
            <p className="text-sm text-emerald-400">
              💡 This chamber tests self-referential logic, not mathematics.
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