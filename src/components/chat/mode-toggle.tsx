
"use client";
import { cn } from '@/lib/utils';
import { BrainCircuit, Skull } from 'lucide-react';

interface ModeToggleProps {
  mode: 'Good Bro' | 'Bad Bro';
  onModeChange: (mode: 'Good Bro' | 'Bad Bro') => void;
  isTutorialRunning?: boolean;
  tutorialStep?: number;
}

export function ModeToggle({ 
  mode, 
  onModeChange, 
  isTutorialRunning = false,
  tutorialStep = 0
}: ModeToggleProps) {
  const isBadBro = mode === 'Bad Bro';

  const getHighlightClass = (buttonMode: 'Good Bro' | 'Bad Bro') => {
    if (!isTutorialRunning) return '';
    if (buttonMode === 'Good Bro' && tutorialStep === 2) {
      return 'ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse';
    }
    if (buttonMode === 'Bad Bro' && tutorialStep === 3) {
      return 'ring-2 ring-primary ring-offset-2 ring-offset-background animate-pulse';
    }
    return '';
  };

  return (
    <div className="relative flex w-32 md:w-64 items-center rounded-full border-2 border-border bg-muted p-1">
      <div
        className={cn(
          'absolute h-10 w-1/2 rounded-full bg-background shadow-md transition-transform duration-300 ease-in-out',
          isBadBro ? 'translate-x-full' : 'translate-x-0'
        )}
      />
      <button
        onClick={() => onModeChange('Good Bro')}
        className={cn(
          'z-10 flex w-1/2 items-center justify-center gap-2 rounded-full py-2 text-sm font-medium transition-colors',
          !isBadBro ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
          getHighlightClass('Good Bro')
        )}
        aria-pressed={!isBadBro}
      >
        <BrainCircuit className="size-5" />
        <span className="hidden md:inline">Good Bro</span>
      </button>
      <button
        onClick={() => onModeChange('Bad Bro')}
        className={cn(
          'z-10 flex w-1/2 items-center justify-center gap-2 rounded-full py-2 text-sm font-medium transition-colors',
          isBadBro ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
          getHighlightClass('Bad Bro')
        )}
        aria-pressed={isBadBro}
      >
        <Skull className="size-5" />
        <span className="hidden md:inline">Bad Bro</span>
      </button>
    </div>
  );
}
