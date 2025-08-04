
"use client";
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '../providers/auth-provider';
import { Markdown } from '../ui/markdown';
import { Button } from '../ui/button';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useIsMobile } from '@/hooks/use-mobile';


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
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.role === 'user';
  const isGoodBro = mode === 'Good Bro';

  const onCopy = () => {
    setIsCopied(true);
    toast({
      description: "Copied to clipboard!",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const messageContent = (
    <div
      className={cn(
        'max-w-[75%] rounded-2xl px-4 py-3 shadow-lg group relative',
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
      <div className="whitespace-pre-wrap">
        {isUser ? message.content : <Markdown content={message.content} />}
      </div>
      <CopyToClipboard text={message.content} onCopy={onCopy}>
          <Button
            size="icon"
            variant="ghost"
            className={cn(
              "absolute -top-2 -right-2 size-7 text-muted-foreground transition-all duration-300",
              isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100",
              isCopied && "opacity-100"
            )}
          >
            {isCopied ? <Check className="size-4 text-green-500" /> : <Copy className="size-4" />}
          </Button>
      </CopyToClipboard>
    </div>
  );

  return (
    <div className={cn('flex items-start gap-3', 
        isUser ? 'justify-end animate-slide-in-right' : 'justify-start animate-slide-in-left'
      )}
    >
      {!isUser && (
        <Avatar className="h-10 w-10 shadow-lg border-2 border-primary">
           <AvatarImage src="/images/aluchat_icon.png" alt="AluChat Logo" />
          <AvatarFallback>
            <div className="size-full rounded-full bg-primary/20" />
          </AvatarFallback>
        </Avatar>
      )}

      {messageContent}

      {isUser && (
        <Avatar className="h-10 w-10 shadow-lg">
          <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "User"} data-ai-hint="profile picture" />
          <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
