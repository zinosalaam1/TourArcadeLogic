import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  startTime: number;
}

export function Timer({ startTime }: TimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed top-6 right-6 z-10">
      <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg px-4 py-2 flex items-center gap-2">
        <Clock className="w-4 h-4 text-zinc-400" />
        <span className="text-zinc-300 tabular-nums">{formatTime(elapsed)}</span>
      </div>
    </div>
  );
}
