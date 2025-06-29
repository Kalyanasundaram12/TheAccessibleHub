'use client';

import React, { createContext, useState, useEffect, useCallback } from 'react';

type FontSize = 'sm' | 'md' | 'lg' | 'xl';

interface AccessibilityContextProps {
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
}

export const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedContrast = localStorage.getItem('highContrast') === 'true';
    const storedFontSize = localStorage.getItem('fontSize') as FontSize | null;
    
    if (storedContrast) setHighContrast(storedContrast);
    if (storedFontSize) setFontSize(storedFontSize);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.classList.remove('font-scale-sm', 'font-scale-md', 'font-scale-lg', 'font-scale-xl');
    document.documentElement.classList.add(`font-scale-${fontSize}`);
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize, isMounted]);

  const toggleHighContrast = useCallback(() => {
    setHighContrast(prev => !prev);
  }, []);

  const handleSetFontSize = useCallback((size: FontSize) => {
    setFontSize(size);
  }, []);
  
  return (
    <AccessibilityContext.Provider value={{ highContrast, toggleHighContrast, fontSize, setFontSize: handleSetFontSize }}>
      {children}
    </AccessibilityContext.Provider>
  );
}
