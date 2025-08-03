
"use client";

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MoreVertical } from 'lucide-react';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { ModeToggle } from './mode-toggle';
import type { Message } from '@/lib/types';
import { getAiResponse } from '@/lib/actions';
import { Icons } from '../icons';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';

const vibeCheckMessages = [
  "Checking if you're down bad...",
  "Manifesting the right response ✨",
  "Assembling the memes...",
  "Consulting the digital elders...",
  "Translating to GenZ...",
];

const modeSwitchMessages = {
  'Good Bro': "Switching to Peace Mode 🌈",
  'Bad Bro': "Ayo, the demon's out 😈",
};

export default function Chat() {
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<'Good Bro' | 'Bad Bro'>('Good Bro');
  const [isLoading, setIsLoading] = useState(false);
  const [vibeMessage, setVibeMessage] = useState('');
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, systemMessage]);
  
  useEffect(() => {
    setMessages([
        { id: '1', content: 'What\'s up? Ask me anything!', role: 'assistant', timestamp: Date.now() }
    ]);
  }, []);

  const handleModeChange = (newMode: 'Good Bro' | 'Bad Bro') => {
    setMode(newMode);
    setTheme(newMode === 'Good Bro' ? 'light' : 'dark');
    setSystemMessage(modeSwitchMessages[newMode]);
    setIsSwitching(true);
    setTimeout(() => setSystemMessage(null), 2000); // Hide message after 2 seconds
    setTimeout(() => setIsSwitching(false), 500); // Animation duration
  }

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      setVibeMessage(vibeCheckMessages[Math.floor(Math.random() * vibeCheckMessages.length)]);
      interval = setInterval(() => {
        setVibeMessage(vibeCheckMessages[Math.floor(Math.random() * vibeCheckMessages.length)]);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: String(Date.now()),
      content,
      role: 'user',
      timestamp: Date.now(),
    };
    
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const responseContent = await getAiResponse(content, mode, newMessages.slice(0, -1));
      const botMessage: Message = {
        id: String(Date.now() + 1),
        content: responseContent,
        role: 'assistant',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: 'Uh oh! Something went wrong.',
        description: "There was a problem with your request. Please try again.",
        variant: 'destructive',
        className: 'font-mono text-accent-foreground border-accent',
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn(
        "relative flex h-full max-h-svh flex-col", 
        mode === 'Good Bro' ? 'good-bro-bg' : 'bad-bro-bg',
        mode === 'Bad Bro' ? 'font-bro' : '',
        isSwitching && (mode === 'Bad Bro' ? 'animate-glitch' : 'animate-flash')
      )}
    >
      <header className="flex-shrink-0 border-b p-2 md:p-4 backdrop-blur-sm bg-background/50">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <Avatar className="h-10 w-10 border-2 border-primary">
                <AvatarFallback>
                  <Icons.logo className="p-1" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-headline text-lg font-semibold tracking-wider">AluChat</h2>
                <p className="text-xs md:text-sm text-muted-foreground">Your Desi AI Bestie</p>
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-4">
              <ModeToggle mode={mode} onModeChange={handleModeChange} />
              <Button variant="ghost" size="icon">
                <MoreVertical />
                <span className="sr-only">More options</span>
              </Button>
            </div>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto" ref={scrollAreaRef}>
          <div className="space-y-6 p-2 md:p-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} mode={mode}/>
            ))}
             {systemMessage && (
                <div className="flex justify-center my-2 animate-slide-in-left">
                  <div className="text-xs text-muted-foreground bg-card/80 backdrop-blur-md rounded-full px-3 py-1">
                    {systemMessage}
                  </div>
                </div>
              )}
            {isLoading && (
              <div className="flex items-start gap-4 animate-slide-in-left">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarFallback><Icons.logo className="p-1" /></AvatarFallback>
                  </Avatar>
                  <div className="max-w-[75%] rounded-2xl rounded-bl-none bg-muted px-4 py-3 backdrop-blur-md bg-opacity-50">
                      <div className="flex flex-col">
                        <div className="flex gap-1.5 items-center">
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-0"></span>
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-150"></span>
                            <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-300"></span>
                        </div>
                        {mode === 'Bad Bro' && <p className="text-sm text-muted-foreground mt-2">{vibeMessage}</p>}
                      </div>
                  </div>
              </div>
            )}
          </div>
      </div>
      <footer className="flex-shrink-0 border-t bg-background/50 backdrop-blur-sm p-2 md:p-4">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
}
