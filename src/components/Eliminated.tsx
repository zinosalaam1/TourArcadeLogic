import { XCircle, RotateCcw } from 'lucide-react';

interface EliminatedProps {
  reason: string;
  onRestart: () => void;
  time: number;
  playerName: string;
}

export function Eliminated({ reason, onRestart, time, playerName }: EliminatedProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="bg-red-950/30 p-8 rounded-full border border-red-900/50">
            <XCircle className="w-20 h-20 text-red-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl text-red-500">GUILTY</h1>
          {playerName && (
            <p className="text-2xl text-red-400">{playerName}</p>
          )}
          <p className="text-xl text-zinc-400">You have been eliminated from the trial.</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 space-y-6">
          <div className="space-y-3">
            <p className="text-zinc-400">Reason for Elimination:</p>
            <div className="bg-red-950/20 border border-red-900/50 rounded p-6">
              <p className="text-red-300">{reason}</p>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-zinc-800/30 rounded p-4">
                <p className="text-zinc-500 text-sm">Time Elapsed</p>
                <p className="text-2xl text-zinc-300">{formatTime(time)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-950/20 border border-amber-900/50 rounded-lg p-6">
          <p className="text-amber-400 mb-3">💡 Trial Insight</p>
          <p className="text-sm text-zinc-400">
            The Silent Trial is designed to eliminate those who act on assumption rather than careful analysis. 
            Every instruction contains critical details that must not be overlooked.
          </p>
        </div>

        <button
          onClick={onRestart}
          className="bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Retry the Trial
        </button>
      </div>
    </div>
  );
}