
"use client";

import { useState, useRef, useEffect } from 'react';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import type { Message } from '@/lib/types';
import { getAiResponse } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '../ui/avatar';


const vibeCheckMessages = [
  "Checking if you're down bad...",
  "Manifesting the right response ✨",
  "Assembling the memes...",
  "Consulting the digital elders...",
  "Translating to GenZ...",
];

const initialMessage: Message = { id: '1', content: 'What\'s up? Ask me anything!', role: 'assistant', timestamp: Date.now() };

interface ChatProps {
  mode: 'Good Bro' | 'Bad Bro';
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  isSwitching: boolean;
  systemMessage: string | null;
}

export default function Chat({ 
  mode, 
  messages,
  setMessages,
  isSwitching,
  systemMessage,
}: ChatProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [vibeMessage, setVibeMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [messages, setMessages]);


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
        "flex flex-col h-full", 
        mode === 'Good Bro' ? 'good-bro-bg' : 'bad-bro-bg',
        mode === 'Bad Bro' ? 'font-bro' : '',
        isSwitching && (mode === 'Bad Bro' ? 'animate-glitch' : 'animate-awakening')
      )}
    >
      <div className="flex-1 overflow-y-auto p-2 md:p-6" ref={scrollAreaRef}>
          <div className="space-y-6">
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
                     <div className="size-full rounded-full bg-primary/20" />
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
