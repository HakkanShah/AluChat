"use client";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
      <Label htmlFor="mode-switch" className={mode === 'Normal' ? 'text-primary font-semibold' : 'text-muted-foreground'}>Normal</Label>
      <Switch
        id="mode-switch"
        checked={mode === 'Bro'}
        onCheckedChange={handleToggle}
        aria-label={`Switch to ${mode === 'Normal' ? 'Bro' : 'Normal'} mode`}
      />
      <Label htmlFor="mode-switch" className={mode === 'Bro' ? 'text-primary font-semibold' : 'text-muted-foreground'}>Bro Mode 🤙</Label>
    </div>
  );
}
