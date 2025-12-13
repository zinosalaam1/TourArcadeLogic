import { Trophy, Medal, Award } from 'lucide-react';

export interface LeaderboardEntry {
  name: string;
  time: number;
  date: number;
  performance: string;
}

interface LeaderboardProps {
  currentScore?: LeaderboardEntry;
}

export function Leaderboard({ currentScore }: LeaderboardProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getLeaderboard = (): LeaderboardEntry[] => {
    try {
      const stored = localStorage.getItem('silentTrialLeaderboard');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const leaderboard = getLeaderboard();
  const isCurrentScoreInTop10 = currentScore && leaderboard.some(
    entry => entry.name === currentScore.name && entry.time === currentScore.time && entry.date === currentScore.date
  );

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-zinc-300" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-zinc-500">#{index + 1}</span>;
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Trophy className="w-5 h-5 text-amber-400" />
        <h3 className="text-xl text-zinc-100">Leaderboard</h3>
      </div>

      {leaderboard.length === 0 ? (
        <p className="text-center text-zinc-500 py-8">No scores yet. Be the first!</p>
      ) : (
        <div className="space-y-2">
          {leaderboard.map((entry, index) => {
            const isCurrent = currentScore && 
              entry.name === currentScore.name && 
              entry.time === currentScore.time && 
              entry.date === currentScore.date;
            
            return (
              <div
                key={`${entry.name}-${entry.date}-${index}`}
                className={`flex items-center justify-between p-3 rounded border transition-colors ${
                  isCurrent
                    ? 'bg-emerald-950/30 border-emerald-900/50'
                    : 'bg-zinc-800/30 border-zinc-700/50'
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 flex justify-center">
                    {getRankIcon(index)}
                  </div>
                  <div className="flex-1">
                    <p className={`${isCurrent ? 'text-emerald-300' : 'text-zinc-200'}`}>
                      {entry.name}
                      {isCurrent && <span className="ml-2 text-xs text-emerald-400">(You)</span>}
                    </p>
                    <p className="text-xs text-zinc-500">{formatDate(entry.date)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`${isCurrent ? 'text-emerald-300' : 'text-zinc-300'}`}>
                    {formatTime(entry.time)}
                  </p>
                  <p className="text-xs text-zinc-500">{entry.performance}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {currentScore && !isCurrentScoreInTop10 && leaderboard.length >= 10 && (
        <div className="border-t border-zinc-800 pt-4">
          <p className="text-sm text-zinc-400 text-center mb-2">Your Score</p>
          <div className="flex items-center justify-between p-3 rounded bg-zinc-800/30 border border-zinc-700/50">
            <div className="flex items-center gap-3">
              <span className="text-zinc-500">Not in Top 10</span>
              <p className="text-zinc-300">{currentScore.name}</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-300">{formatTime(currentScore.time)}</p>
              <p className="text-xs text-zinc-500">{currentScore.performance}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function saveToLeaderboard(entry: LeaderboardEntry) {
  try {
    const stored = localStorage.getItem('silentTrialLeaderboard');
    const leaderboard: LeaderboardEntry[] = stored ? JSON.parse(stored) : [];
    
    leaderboard.push(entry);
    leaderboard.sort((a, b) => a.time - b.time);
    
    const top10 = leaderboard.slice(0, 10);
    localStorage.setItem('silentTrialLeaderboard', JSON.stringify(top10));
  } catch (error) {
    console.error('Failed to save to leaderboard:', error);
  }
}
