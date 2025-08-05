
"use client";
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '../providers/auth-provider';
import { Markdown } from '../ui/markdown';
import { Button } from '../ui/button';
import { Check, Copy, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';


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
  mode: 'Sweet Mode' | 'Savage Mode';
}

export function ChatMessage({ message, mode }: ChatMessageProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [isCopied, setIsCopied] = useState(false);
  const isUser = message.role === 'user';
  const isSweetMode = mode === 'Sweet Mode';

  const onCopy = () => {
    if (isCopied) return;
    navigator.clipboard.writeText(message.content);
    setIsCopied(true);
    toast({
      description: "Copied to clipboard!",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const MessageContent = () => (
     <div
      className={cn(
        'max-w-[85%] rounded-2xl px-4 py-3 shadow-lg group relative',
        isUser
          ? 'bg-primary text-primary-foreground rounded-br-none'
          : 'rounded-bl-none',
        isSweetMode && !isUser ? 'bg-background/80 backdrop-blur-md border border-border/20' : '',
        !isSweetMode && !isUser ? 'font-bro bg-card/80 backdrop-blur-md border border-accent/20 shadow-accent/20' : '',
        isSweetMode ? 'text-foreground' : 'text-card-foreground',
        !isUser && isSweetMode && 'text-foreground',
        !isUser && !isSweetMode && 'text-primary-foreground',
      )}
    >
      <div className="whitespace-pre-wrap">
        {isUser ? message.content : <Markdown content={message.content} />}
      </div>
    </div>
  )

  return (
    <div className={cn('group flex items-start gap-3', 
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

      <div className={cn(
        "flex items-center gap-2",
         isUser ? "flex-row-reverse" : "flex-row"
      )}>
        <MessageContent />
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                    "size-7 text-muted-foreground transition-all duration-300",
                    isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                    )}
                >
                    <MoreVertical className="size-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isUser ? "end" : "start"}>
                <DropdownMenuItem onClick={onCopy}>
                    {isCopied ? <Check className="mr-2" /> : <Copy className="mr-2" />}
                    {isCopied ? 'Copied!' : 'Copy'}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
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
