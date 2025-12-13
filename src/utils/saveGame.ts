export interface SavedGameState {
  playerName: string;
  gameState: string;
  startTime: number | null;
  chambersPassed: number;
  saveCode: string;
  savedAt: number;
}

// Generate a unique 8-character save code
export function generateSaveCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Exclude similar characters
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Save game state to localStorage
export function saveGame(state: Omit<SavedGameState, 'saveCode' | 'savedAt'>): string {
  try {
    const saveCode = generateSaveCode();
    const savedGame: SavedGameState = {
      ...state,
      saveCode,
      savedAt: Date.now(),
    };
    
    // Store by save code for easy retrieval
    localStorage.setItem(`silentTrial_save_${saveCode}`, JSON.stringify(savedGame));
    
    // Also store a list of all save codes for the user
    const allSaves = getAllSaveCodes();
    if (!allSaves.includes(saveCode)) {
      allSaves.push(saveCode);
      localStorage.setItem('silentTrial_allSaves', JSON.stringify(allSaves));
    }
    
    return saveCode;
  } catch (error) {
    console.error('Failed to save game:', error);
    throw new Error('Failed to save game');
  }
}

// Load game state from save code
export function loadGame(saveCode: string): SavedGameState | null {
  try {
    const saved = localStorage.getItem(`silentTrial_save_${saveCode.toUpperCase()}`);
    if (!saved) return null;
    
    return JSON.parse(saved);
  } catch (error) {
    console.error('Failed to load game:', error);
    return null;
  }
}

// Delete a saved game
export function deleteSave(saveCode: string): void {
  try {
    localStorage.removeItem(`silentTrial_save_${saveCode.toUpperCase()}`);
    
    // Remove from all saves list
    const allSaves = getAllSaveCodes();
    const filtered = allSaves.filter(code => code !== saveCode.toUpperCase());
    localStorage.setItem('silentTrial_allSaves', JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete save:', error);
  }
}

// Get all save codes
export function getAllSaveCodes(): string[] {
  try {
    const saved = localStorage.getItem('silentTrial_allSaves');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

// Get all saved games
export function getAllSaves(): SavedGameState[] {
  const codes = getAllSaveCodes();
  return codes
    .map(code => loadGame(code))
    .filter((save): save is SavedGameState => save !== null)
    .sort((a, b) => b.savedAt - a.savedAt);
}
