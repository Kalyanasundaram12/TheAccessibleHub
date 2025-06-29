
'use client';

import { Sun, Moon } from 'lucide-react';
import { useAccessibility } from '@/hooks/use-accessibility';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { useState, useEffect } from 'react';

export function AccessibilityToolbar() {
  const { highContrast, toggleHighContrast } = useAccessibility();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or a placeholder/skeleton
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center space-x-1.5 p-2 bg-card rounded-lg shadow-md border border-border">
        <Switch
          id="high-contrast-toggle"
          checked={highContrast}
          onCheckedChange={toggleHighContrast}
          aria-label="Toggle high contrast mode"
        />
        <Label htmlFor="high-contrast-toggle" className="text-xs flex items-center cursor-pointer">
          {highContrast ? <Moon className="mr-1 h-3.5 w-3.5" /> : <Sun className="mr-1 h-3.5 w-3.5" />}
          <span className="hidden sm:inline">Contrast</span>
        </Label>
      </div>
    </div>
  );
}
