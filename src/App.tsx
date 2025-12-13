import { useState, useEffect } from 'react';
import { Intro } from './components/Intro';
import { Chamber1 } from './components/Chamber1';
import { Chamber2 } from './components/Chamber2';
import { Chamber3 } from './components/Chamber3';
import { Chamber4 } from './components/Chamber4';
import { Chamber5 } from './components/Chamber5';
import { Eliminated } from './components/Eliminated';
import { Victory } from './components/Victory';
import { ProgressIndicator } from './components/ProgressIndicator';
import { Timer } from './components/Timer';
import { saveGame, SavedGameState } from './utils/saveGame';

type GameState = 'intro' | 'chamber1' | 'chamber2' | 'chamber3' | 'chamber4' | 'chamber5' | 'eliminated' | 'victory';

export default function App() {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [eliminationReason, setEliminationReason] = useState<string>('');
  const [chambersPassed, setChambersPassed] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>('');
  const [currentSaveCode, setCurrentSaveCode] = useState<string>('');

  useEffect(() => {
    if (gameState === 'chamber1' && startTime === null) {
      setStartTime(Date.now());
    }
  }, [gameState, startTime]);

  const handleElimination = (reason: string) => {
    setEliminationReason(reason);
    setGameState('eliminated');
    setEndTime(Date.now());
  };

  const handleProgress = (nextChamber: GameState) => {
    if (nextChamber === 'victory') {
      setEndTime(Date.now());
      setChambersPassed(5);
    }
    setGameState(nextChamber);
  };

  const handleRestart = () => {
    setGameState('intro');
    setStartTime(null);
    setEndTime(null);
    setEliminationReason('');
    setChambersPassed(0);
    setPlayerName('');
    setCurrentSaveCode('');
  };

  const handleSaveGame = () => {
    if (!playerName || !gameState.startsWith('chamber')) return '';
    
    try {
      const saveCode = saveGame({
        playerName,
        gameState,
        startTime,
        chambersPassed,
      });
      setCurrentSaveCode(saveCode);
      return saveCode;
    } catch (error) {
      console.error('Failed to save game:', error);
      return '';
    }
  };

  const handleLoadGame = (savedGame: SavedGameState) => {
    setPlayerName(savedGame.playerName);
    setGameState(savedGame.gameState as GameState);
    setStartTime(savedGame.startTime);
    setChambersPassed(savedGame.chambersPassed);
    setCurrentSaveCode('');
  };

  const getCompletionTime = () => {
    if (startTime && endTime) {
      return Math.floor((endTime - startTime) / 1000);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Show progress indicator only during chambers */}
      {gameState.startsWith('chamber') && (
        <ProgressIndicator 
          currentChamber={parseInt(gameState.replace('chamber', ''))} 
          totalChambers={5} 
        />
      )}
      
      {/* Show timer during chambers */}
      {gameState.startsWith('chamber') && startTime && (
        <Timer startTime={startTime} />
      )}
      
      {gameState === 'intro' && (
        <Intro 
          onStart={() => setGameState('chamber1')} 
          onSetPlayerName={setPlayerName}
          onLoadGame={handleLoadGame}
        />
      )}
      
      {gameState === 'chamber1' && (
        <Chamber1 
          onEliminate={handleElimination} 
          onProgress={() => {
            setChambersPassed(1);
            handleProgress('chamber2');
          }}
          onSave={handleSaveGame}
          saveCode={currentSaveCode}
        />
      )}
      
      {gameState === 'chamber2' && (
        <Chamber2 
          onEliminate={handleElimination} 
          onProgress={() => {
            setChambersPassed(2);
            handleProgress('chamber3');
          }}
          onSave={handleSaveGame}
          saveCode={currentSaveCode}
        />
      )}
      
      {gameState === 'chamber3' && (
        <Chamber3 
          onEliminate={handleElimination} 
          onProgress={() => {
            setChambersPassed(3);
            handleProgress('chamber4');
          }}
          onSave={handleSaveGame}
          saveCode={currentSaveCode}
        />
      )}
      
      {gameState === 'chamber4' && (
        <Chamber4 
          onEliminate={handleElimination} 
          onProgress={() => {
            setChambersPassed(4);
            handleProgress('chamber5');
          }}
          onSave={handleSaveGame}
          saveCode={currentSaveCode}
        />
      )}
      
      {gameState === 'chamber5' && (
        <Chamber5 
          onEliminate={handleElimination} 
          onProgress={() => handleProgress('victory')}
          chambersPassed={chambersPassed}
          onSave={handleSaveGame}
          saveCode={currentSaveCode}
        />
      )}
      
      {gameState === 'eliminated' && (
        <Eliminated 
          reason={eliminationReason} 
          onRestart={handleRestart}
          time={getCompletionTime()}
          playerName={playerName}
        />
      )}
      
      {gameState === 'victory' && (
        <Victory 
          time={getCompletionTime()}
          onRestart={handleRestart}
          playerName={playerName}
        />
      )}
    </div>
  );
}