
"use client";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { BrainCircuit, Sword } from 'lucide-react';

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
      <Label htmlFor="mode-switch" className={cn('flex items-center gap-1 cursor-pointer transition-colors', mode === 'Good Bro' ? 'text-primary font-semibold' : 'text-muted-foreground')}>
        Good Bro <BrainCircuit className={cn("size-5 transition-transform duration-300", mode === 'Good Bro' ? 'scale-110' : 'scale-100')} />
      </Label>
      <Switch
        id="mode-switch"
        checked={mode === 'Bad Bro'}
        onCheckedChange={handleToggle}
        className={cn(
          "data-[state=checked]:bg-accent transition-all duration-200",
          "radix-state-checked:bg-red-500 radix-state-unchecked:bg-green-500"
        )}
        aria-label={`Switch to ${mode === 'Good Bro' ? 'Bad Bro' : 'Good Bro'} mode`}
      />
      <Label htmlFor="mode-switch" className={cn('flex items-center gap-1 cursor-pointer transition-colors', mode === 'Bad Bro' ? 'text-primary font-semibold' : 'text-muted-foreground')}>
        Bad Bro <Sword className={cn("size-5 transition-transform duration-300", mode === 'Bad Bro' ? 'scale-110' : 'scale-100')}/>
      </Label>
    </div>
  );
}
