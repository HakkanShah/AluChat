
"use client";
import { cn } from '@/lib/utils';
import { BrainCircuit, Skull } from 'lucide-react';

interface ModeToggleProps {
  mode: 'Sweet' | 'Savage';
  onModeChange: (mode: 'Sweet' | 'Savage') => void;
  isTutorialRunning?: boolean;
  tutorialStep?: number;
}

export function ModeToggle({ 
  mode, 
  onModeChange, 
  isTutorialRunning = false,
  tutorialStep = 0
}: ModeToggleProps) {
  const isSavageMode = mode === 'Savage';

  const getHighlightClass = (buttonMode: 'Sweet' | 'Savage') => {
    if (!isTutorialRunning) return '';
    if (buttonMode === 'Sweet' && tutorialStep === 2) {
      return 'ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse';
    }
    if (buttonMode === 'Savage' && tutorialStep === 3) {
      return 'ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse';
    }
    return '';
  };

  return (
    <div className="relative flex w-32 md:w-64 items-center rounded-full border-2 border-border bg-muted p-1">
      <div
        className={cn(
          'absolute h-10 w-1/2 rounded-full bg-background shadow-md transition-transform duration-300 ease-in-out',
          isSavageMode ? 'translate-x-full' : 'translate-x-0'
        )}
      />
      <button
        onClick={() => onModeChange('Sweet')}
        className={cn(
          'z-10 flex w-1/2 items-center justify-center gap-2 rounded-full py-2 text-sm font-medium transition-colors',
          !isSavageMode ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
          getHighlightClass('Sweet')
        )}
        aria-pressed={!isSavageMode}
      >
        <BrainCircuit className="size-5" />
        <span className="hidden md:inline">Sweet</span>
      </button>
      <button
        onClick={() => onModeChange('Savage')}
        className={cn(
          'z-10 flex w-1/2 items-center justify-center gap-2 rounded-full py-2 text-sm font-medium transition-colors',
          isSavageMode ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
          getHighlightClass('Savage')
        )}
        aria-pressed={isSavageMode}
      >
        <Skull className="size-5" />
        <span className="hidden md:inline">Savage</span>
      </button>
    </div>
  );
}
