
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import TextareaAutosize from 'react-textarea-autosize';

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
    <div className="mx-auto w-full max-w-2xl">
        <form 
            onSubmit={handleSubmit} 
            className="relative flex w-full items-end rounded-full border bg-background"
        >
            <TextareaAutosize
                placeholder="Message AluChat..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                maxRows={5}
                className="flex-1 resize-none bg-transparent p-3 focus:outline-none"
                disabled={isLoading}
            />
            <Button
                type="submit"
                size="icon"
                className="m-1 rounded-full"
                disabled={isLoading || !message.trim()}
                aria-label="Send message"
            >
                <ArrowUp className="size-5" />
            </Button>
        </form>
    </div>
  );
}
