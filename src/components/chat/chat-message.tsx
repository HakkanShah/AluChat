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
  const isGoodBro = mode === 'Good Bro';

  return (
    <div className={cn('flex items-start gap-4', 
        isUser ? 'justify-end animate-slide-in-right' : 'justify-start animate-slide-in-left'
      )}
    >
      {!isUser && (
        <Avatar className="h-10 w-10 border-2 border-primary shadow-lg">
          <AvatarFallback>
            <Icons.logo className="p-1" />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3 shadow-lg',
          isUser
            ? 'bg-primary text-primary-foreground rounded-br-none'
            : 'rounded-bl-none',
          isGoodBro && !isUser ? 'bg-background/80 backdrop-blur-md border border-border/20' : '',
          !isGoodBro && !isUser ? 'font-bro bg-card/80 backdrop-blur-md border border-accent/20 shadow-accent/20' : '',
          isGoodBro ? 'text-foreground' : 'text-card-foreground',
          !isUser && isGoodBro && 'text-foreground',
          !isUser && !isGoodBro && 'text-primary-foreground',
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <Avatar className="h-10 w-10 shadow-lg">
          <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="profile picture" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
