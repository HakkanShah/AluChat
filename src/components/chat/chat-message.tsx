
"use client";
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '../providers/auth-provider';


function getInitials(name: string | null | undefined) {
  if (!name) return 'U';
  const names = name.split(' ');
  if (names.length > 1 && names[1]) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return name[0].toUpperCase();
}
interface ChatMessageProps {
  message: Message;
  mode: 'Good Bro' | 'Bad Bro';
}

export function ChatMessage({ message, mode }: ChatMessageProps) {
  const { user } = useAuth();
  const isUser = message.role === 'user';
  const isGoodBro = mode === 'Good Bro';

  return (
    <div className={cn('flex items-start gap-4', 
        isUser ? 'justify-end animate-slide-in-right' : 'justify-start animate-slide-in-left'
      )}
    >
      {!isUser && (
        <Avatar className="h-10 w-10 shadow-lg">
           <AvatarImage src="/images/aluchat_icon.png" alt="AluChat Logo" />
          <AvatarFallback>
            <div className="size-full rounded-full bg-primary/20" />
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
          <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "User"} data-ai-hint="profile picture" />
          <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
