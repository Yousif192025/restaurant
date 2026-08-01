import React, { createContext, useContext, ReactNode } from 'react';
import { saudiTheme } from '../config/theme';

const ThemeContext = createContext(saudiTheme);

export const useSaudiTheme = () => useContext(ThemeContext);

interface SaudiThemeProviderProps {
  children: ReactNode;
}

export const SaudiThemeProvider: React.FC<SaudiThemeProviderProps> = ({ children }) => {
  return (
    <ThemeContext.Provider value={saudiTheme}>
      <div className="saudi-theme">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
