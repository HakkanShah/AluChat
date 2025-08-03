"use client";
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icons } from '@/components/icons';

interface ChatMessageProps {
  message: Message;
  mode: 'Good Bro' | 'Bad Bro';
}

export function ChatMessage({ message, mode }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div className={cn('flex items-start gap-4', 
        isUser ? 'justify-end animate-slide-in-right' : 'justify-start animate-slide-in-left'
      )}
    >
      {!isUser && (
        <Avatar className="h-10 w-10 border-2 border-primary">
          <AvatarFallback>
            <Icons.logo className="p-1" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3 shadow-md',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'bg-card text-card-foreground rounded-bl-none',
          mode === 'Bad Bro' && !isUser ? 'font-bro border border-accent/50 shadow-accent/20' : 'backdrop-blur-md bg-opacity-50',
          mode === 'Good Bro' && !isUser ? 'border border-border/20' : ''
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <Avatar className="h-10 w-10">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="profile picture" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
