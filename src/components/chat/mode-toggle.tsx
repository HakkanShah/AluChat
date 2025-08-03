"use client";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Brain, Drama } from 'lucide-react';

interface ModeToggleProps {
  mode: 'Good Bro' | 'Bad Bro';
  onModeChange: (mode: 'Good Bro' | 'Bad Bro') => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  const handleToggle = (checked: boolean) => {
    onModeChange(checked ? 'Bad Bro' : 'Good Bro');
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="mode-switch" className={cn('flex items-center gap-1', mode === 'Good Bro' ? 'text-primary font-semibold' : 'text-muted-foreground')}>
        Good Bro <Brain className={cn("size-5 transition-transform duration-300", mode === 'Good Bro' ? 'rotate-0' : '-rotate-12')} />
      </Label>
      <Switch
        id="mode-switch"
        checked={mode === 'Bad Bro'}
        onCheckedChange={handleToggle}
        aria-label={`Switch to ${mode === 'Good Bro' ? 'Bad Bro' : 'Good Bro'} mode`}
      />
      <Label htmlFor="mode-switch" className={cn('flex items-center gap-1', mode === 'Bad Bro' ? 'text-primary font-semibold' : 'text-muted-foreground')}>
        Bad Bro <Drama className={cn("size-5 transition-transform duration-300", mode === 'Bad Bro' ? 'rotate-0' : 'rotate-12')}/>
      </Label>
    </div>
  );
}
