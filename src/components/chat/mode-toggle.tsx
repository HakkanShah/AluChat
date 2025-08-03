"use client";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Brain, Smile } from 'lucide-react';

interface ModeToggleProps {
  mode: 'Normal' | 'Bro';
  onModeChange: (mode: 'Normal' | 'Bro') => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  const handleToggle = (checked: boolean) => {
    onModeChange(checked ? 'Bro' : 'Normal');
  };

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="mode-switch" className={cn('flex items-center gap-1', mode === 'Normal' ? 'text-primary font-semibold' : 'text-muted-foreground')}>
        Normal <Brain className={cn("size-5 transition-transform duration-300", mode === 'Normal' ? 'rotate-0' : '-rotate-12')} />
      </Label>
      <Switch
        id="mode-switch"
        checked={mode === 'Bro'}
        onCheckedChange={handleToggle}
        aria-label={`Switch to ${mode === 'Normal' ? 'Bro' : 'Normal'} mode`}
      />
      <Label htmlFor="mode-switch" className={cn('flex items-center gap-1', mode === 'Bro' ? 'text-primary font-semibold' : 'text-muted-foreground')}>
        Bro <Smile className={cn("size-5 transition-transform duration-300", mode === 'Bro' ? 'rotate-0' : 'rotate-12')}/>
      </Label>
    </div>
  );
}
