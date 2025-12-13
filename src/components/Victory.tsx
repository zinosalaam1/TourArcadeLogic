import { Trophy, CheckCircle, RotateCcw } from 'lucide-react';
import { Leaderboard, saveToLeaderboard, LeaderboardEntry } from './Leaderboard';
import { useEffect, useState } from 'react';

interface VictoryProps {
  time: number;
  onRestart: () => void;
  playerName: string;
}

export function Victory({ time, onRestart, playerName }: VictoryProps) {
  const [currentScore, setCurrentScore] = useState<LeaderboardEntry | undefined>();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceRating = (seconds: number) => {
    if (seconds < 180) return { label: 'Exceptional', color: 'text-purple-400' };
    if (seconds < 300) return { label: 'Excellent', color: 'text-blue-400' };
    if (seconds < 420) return { label: 'Very Good', color: 'text-emerald-400' };
    if (seconds < 600) return { label: 'Good', color: 'text-amber-400' };
    return { label: 'Completed', color: 'text-zinc-400' };
  };

  const rating = getPerformanceRating(time);

  useEffect(() => {
    if (playerName && time > 0) {
      const entry: LeaderboardEntry = {
        name: playerName,
        time,
        date: Date.now(),
        performance: rating.label,
      };
      saveToLeaderboard(entry);
      setCurrentScore(entry);
    }
  }, [playerName, time, rating.label]);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="flex justify-center">
          <div className="bg-emerald-950/30 p-8 rounded-full border border-emerald-900/50 animate-pulse">
            <Trophy className="w-20 h-20 text-emerald-500" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl text-emerald-500">INNOCENT</h1>
          {playerName && (
            <p className="text-2xl text-emerald-400">{playerName}</p>
          )}
          <p className="text-xl text-zinc-400">You have escaped the Silent Trial.</p>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 space-y-6">
          <div className="space-y-4">
            <div className="bg-emerald-950/20 border border-emerald-900/50 rounded p-6">
              <p className="text-emerald-300 text-lg">
                You successfully navigated all 5 chambers without a single mistake.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800/30 rounded p-4">
                <p className="text-zinc-500 text-sm">Completion Time</p>
                <p className="text-3xl text-zinc-100">{formatTime(time)}</p>
              </div>
              <div className="bg-zinc-800/30 rounded p-4">
                <p className="text-zinc-500 text-sm">Performance</p>
                <p className={`text-3xl ${rating.color}`}>{rating.label}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6 space-y-3">
            <p className="text-zinc-400">Chambers Cleared:</p>
            <div className="flex justify-center gap-3">
              {[
                { name: 'The Terms', color: 'bg-red-500' },
                { name: 'The Witness', color: 'bg-amber-500' },
                { name: 'The Judges', color: 'bg-emerald-500' },
                { name: 'The Verdict Clock', color: 'bg-blue-500' },
                { name: 'The Final Appeal', color: 'bg-purple-500' },
              ].map((chamber, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 ${chamber.color} rounded-full flex items-center justify-center`}>
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-xs text-zinc-500">{index + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-purple-950/20 border border-purple-900/50 rounded-lg p-6">
          <p className="text-purple-400 mb-3">🏆 Achievement Unlocked</p>
          <p className="text-sm text-zinc-400">
            You are among the elite few who can distinguish between what is said and what is meant. 
            You read carefully, thought critically, and resisted impulse. This is the mark of true mastery.
          </p>
        </div>

        <Leaderboard currentScore={currentScore} />

        <button
          onClick={onRestart}
          className="bg-zinc-700 hover:bg-zinc-600 text-white px-8 py-4 rounded-lg transition-colors inline-flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
}