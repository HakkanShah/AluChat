"use client";

import { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MoreVertical } from 'lucide-react';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { ModeToggle } from './mode-toggle';
import type { Message } from '@/lib/types';
import { getAiResponse } from '@/lib/actions';
import { Icons } from '../icons';
import { useToast } from '@/hooks/use-toast';

export default function Chat() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [mode, setMode] = useState<'Normal' | 'Bro'>('Normal');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  useEffect(() => {
    setMessages([
        { id: '1', content: 'What\'s up? Ask me anything!', role: 'assistant', timestamp: Date.now() }
    ]);
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: String(Date.now()),
      content,
      role: 'user',
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const responseContent = await getAiResponse(content, mode);
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
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarFallback>
              <Icons.logo className="p-1" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-headline text-lg font-semibold">Alu</h2>
            <p className="text-sm text-muted-foreground">AI Bestie</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle mode={mode} onModeChange={setMode} />
          <Button variant="ghost" size="icon">
            <MoreVertical />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-6 p-4 md:p-6">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                      <AvatarFallback><Icons.logo className="p-1" /></AvatarFallback>
                  </Avatar>
                  <div className="max-w-[75%] rounded-2xl rounded-bl-none bg-muted px-4 py-3">
                      <div className="flex gap-1.5 items-center">
                          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-0"></span>
                          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-150"></span>
                          <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce delay-300"></span>
                      </div>
                  </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </main>
      <footer className="border-t bg-background p-4 md:p-6">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
}
