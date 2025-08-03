"use client";
import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <form onSubmit={handleSubmit} className="relative w-full">
        <Textarea
          placeholder="Message AluChat..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          className="min-h-[48px] rounded-2xl border-2 border-input pr-16 resize-none shadow-sm"
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full"
          disabled={isLoading || !message.trim()}
          aria-label="Send message"
        >
          <ArrowUp className="size-5" />
        </Button>
      </form>
    </div>
  );
}
