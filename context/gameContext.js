// gameContext.js
import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const useGameContext = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [health, setHealth] = useState(10);
  const [experience, setExperience] = useState(0);
  const [level, setLevel] = useState(1);
  const [achievements, setAchievements] = useState([]);

  const gameState = {
    health,
    setHealth,
    experience,
    setExperience,
    level,
    setLevel,
    achievements,
    setAchievements,
  };

  return <GameContext.Provider value={gameState}>{children}</GameContext.Provider>;
};