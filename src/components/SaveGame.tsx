import { useState } from 'react';
import { Save, Copy, Check } from 'lucide-react';

interface SaveGameProps {
  saveCode: string;
}

export function SaveGame({ saveCode }: SaveGameProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(saveCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-blue-950/20 border border-blue-900/50 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Save className="w-5 h-5 text-blue-400" />
        <h3 className="text-lg text-blue-300">Game Saved!</h3>
      </div>

      <div className="space-y-3">
        <p className="text-sm text-zinc-400 text-center">
          Your progress has been saved. Use this code to resume later:
        </p>
        
        <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4">
          <div className="flex items-center justify-between gap-3">
            <code className="text-2xl tracking-wider text-blue-400 font-mono">
              {saveCode}
            </code>
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-xs text-zinc-500 text-center">
          Keep this code safe. You can resume your trial from the intro screen.
        </p>
      </div>
    </div>
  );
}
