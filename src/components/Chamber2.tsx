import { useState } from 'react';
import { Users, Save } from 'lucide-react';
import { SaveGame } from './SaveGame';

interface Chamber2Props {
  onEliminate: (reason: string) => void;
  onProgress: () => void;
  onSave: () => string;
  saveCode: string;
}

export function Chamber2({ onEliminate, onProgress, onSave, saveCode }: Chamber2Props) {
  const [selectedWitness, setSelectedWitness] = useState<string>('');
  const [textInput, setTextInput] = useState<string>('');
  const [showSaveCode, setShowSaveCode] = useState(false);

  const handleSubmit = () => {
    // Allow both button selection and text input
    const answer = selectedWitness || textInput.trim().toUpperCase();
    if (!answer) return;

    // Correct answer is B
    if (answer === 'B') {
      onProgress();
    } else {
      onEliminate(`You identified Witness ${answer} as the truth-teller. This was incorrect. The logical elimination proves only Witness B can be the consistent truth-teller.`);
    }
  };

  const handleTextInputChange = (value: string) => {
    setTextInput(value);
    setSelectedWitness(''); // Clear button selection when typing
  };

  const handleWitnessSelect = (witness: string) => {
    setSelectedWitness(witness);
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
          <div className="inline-block px-4 py-2 bg-amber-950/30 border border-amber-900/50 rounded">
            <span className="text-amber-400">CHAMBER 2</span>
          </div>
          <h2 className="text-3xl text-amber-500">THE WITNESS</h2>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 space-y-6">
          <div className="flex items-start gap-3 bg-zinc-800/50 border border-zinc-700 rounded p-6">
            <Users className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <p className="text-zinc-100">Three witnesses testify.</p>
              <div className="space-y-1 text-zinc-400">
                <p>• One always tells the truth.</p>
                <p>• One always lies.</p>
                <p>• One alternates.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-zinc-300">Statements:</p>
            
            <div className="space-y-3">
              <div className="bg-zinc-800/30 border border-zinc-700 rounded p-4">
                <p className="text-zinc-100"><span className="text-amber-400">Witness A:</span> "B is lying."</p>
              </div>
              
              <div className="bg-zinc-800/30 border border-zinc-700 rounded p-4">
                <p className="text-zinc-100"><span className="text-amber-400">Witness B:</span> "C is telling the truth."</p>
              </div>
              
              <div className="bg-zinc-800/30 border border-zinc-700 rounded p-4">
                <p className="text-zinc-100"><span className="text-amber-400">Witness C:</span> "A is lying."</p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 space-y-4">
            <p className="text-zinc-300">Question:</p>
            <p className="text-xl text-zinc-100">Who is the truth-teller?</p>

            <div className="space-y-3">
              <div className="flex gap-3">
                {['A', 'B', 'C'].map((witness) => (
                  <button
                    key={witness}
                    onClick={() => handleWitnessSelect(witness)}
                    className={`flex-1 px-6 py-4 rounded border-2 transition-all ${
                      selectedWitness === witness
                        ? 'bg-amber-600 border-amber-500 text-white'
                        : 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:border-amber-500'
                    }`}
                  >
                    Witness {witness}
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
                type="text"
                value={textInput}
                onChange={(e) => handleTextInputChange(e.target.value)}
                placeholder="Type A, B, or C..."
                maxLength={1}
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-3 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-500 uppercase"
              />

              <button
                onClick={handleSubmit}
                disabled={!selectedWitness && !textInput.trim()}
                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-6 py-3 rounded transition-colors"
              >
                Submit Answer
              </button>
            </div>
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