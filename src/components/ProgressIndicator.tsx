interface ProgressIndicatorProps {
  currentChamber: number;
  totalChambers: number;
}

export function ProgressIndicator({ currentChamber, totalChambers }: ProgressIndicatorProps) {
  const chambers = [
    { num: 1, name: 'Terms', color: 'bg-red-500' },
    { num: 2, name: 'Witness', color: 'bg-amber-500' },
    { num: 3, name: 'Judges', color: 'bg-emerald-500' },
    { num: 4, name: 'Clock', color: 'bg-blue-500' },
    { num: 5, name: 'Appeal', color: 'bg-purple-500' },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-10">
      <div className="bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-full px-6 py-3 flex items-center gap-2">
        {chambers.map((chamber, index) => (
          <div key={chamber.num} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                currentChamber === chamber.num
                  ? `${chamber.color} ring-2 ring-offset-2 ring-offset-zinc-900 ring-white/20`
                  : currentChamber > chamber.num
                  ? `${chamber.color} opacity-50`
                  : 'bg-zinc-800 text-zinc-600'
              }`}
            >
              <span className="text-sm text-white">{chamber.num}</span>
            </div>
            {index < chambers.length - 1 && (
              <div className={`w-6 h-0.5 ${currentChamber > chamber.num ? 'bg-zinc-500' : 'bg-zinc-800'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
