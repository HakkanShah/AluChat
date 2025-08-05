
'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Chat from '@/components/chat/chat';
import { useAuth } from '../providers/auth-provider';
import { LogOut, Pencil, MoreVertical, Trash, Github, Instagram, Facebook, Linkedin, Mail, Share2, AlertTriangle, MessageCircleQuestion, RefreshCw } from 'lucide-react';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ModeToggle } from '../chat/mode-toggle';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Message } from '@/lib/types';
import Image from 'next/image';
import { TutorialDialog } from './tutorial-dialog';
import { InfoDialog } from './info-dialog';
import { getAiResponse, getDailyAluism } from '@/lib/actions';
import { Skeleton } from '../ui/skeleton';


function getInitials(name: string | null | undefined) {
  if (!name) return 'U';
  const names = name.split(' ');
  if (names.length > 1 && names[1]) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return name[0].toUpperCase();
}

const sweetModeMessages = [
  "Sweet Mode Activated! 🌈",
  "Aura cleansed. Good vibes only.",
  "Engaging wholesome protocols.",
  "Here to help! 😊",
];

const savageModeMessages = [
  "Savage Mode Activated! 😈",
  "Alright, let's turn up the heat 🔥",
  "The gloves are off. Let's go 💀",
  "Ayo, the demon's out.",
];

function ChatLayoutContent() {
  const { user, logout, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const [mode, setMode] = useState<'Sweet' | 'Savage'>('Sweet');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [systemMessage, setSystemMessage] = useState<string | null>(null);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [aluism, setAluism] = useState('');
  const [isAluismLoading, setIsAluismLoading] = useState(true);

  useEffect(() => {
    const isNewUser = localStorage.getItem('isNewUser');
    if (isNewUser) {
      setIsTutorialOpen(true);
      setTutorialStep(1); // Start the tutorial
    }
  }, []);

  const fetchAluism = useCallback(async () => {
    setIsAluismLoading(true);
    try {
      const quote = await getDailyAluism(mode);
      setAluism(quote);
    } catch (error) {
      console.error("Failed to fetch Daily Alu-ism:", error);
      setAluism("Couldn't fetch today's vibe. Try again later.");
    } finally {
      setIsAluismLoading(false);
    }
  }, [mode]);

  useEffect(() => {
    fetchAluism();
  }, [fetchAluism]);

  const handleTutorialNext = () => {
    if (tutorialStep < 3) {
      setTutorialStep(prev => prev + 1);
    } else {
      setIsTutorialOpen(false);
      localStorage.removeItem('isNewUser');
    }
  };

  const handleSignOut = async () => {
    logout();
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleModeChange = (newMode: 'Sweet' | 'Savage') => {
    if (mode === newMode || isSwitching) return;

    setMode(newMode);
    setTheme(newMode === 'Sweet' ? 'light' : 'dark');
    
    const messages = newMode === 'Sweet' ? sweetModeMessages : savageModeMessages;
    setSystemMessage(messages[Math.floor(Math.random() * messages.length)]);
    setIsSwitching(true);
  }

  useEffect(() => {
    if (isSwitching) {
        const timer = setTimeout(() => {
            setSystemMessage(null);
            setIsSwitching(false);
        }, 1500);
        return () => clearTimeout(timer);
    }
  }, [isSwitching]);

  const handleClearChat = () => {
    setMessages([]);
    toast({
      title: "Chat Cleared",
      description: "Your conversation history has been wiped.",
    });
    setIsClearAlertOpen(false);
  };
  
  const handleShare = async () => {
    const shareData = {
      title: "AluChat – The Spiciest AI Potato 😎🥔",
      text: "Meet Sweet Mode and Savage Mode at AluChat – The Desi AI Potato Duo who'll roast, roast, and respect you all at once! 😂 Try it now 👉",
      url: 'https://aluchat.netlify.app/',
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
            title: "Thanks for spreading the potato madness! 🥔🔥",
        });
      } else {
        // Fallback for browsers that don't support the Web Share API
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast({
          title: 'Link Copied!',
          description: 'The share link has been copied to your clipboard.',
        });
      }
    } catch (error) {
      // Don't show an error toast if the user cancels the share dialog
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      toast({
        title: 'Oops!',
        description: 'Could not share the app at this moment.',
        variant: 'destructive',
      });
    }
  };


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        toast({
          title: "Image Too Large",
          description: "Please select an image smaller than 2MB.",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if(user) {
            const updatedUser = { ...user, photoURL: base64String };
            updateUser(updatedUser);
            toast({
                title: "Profile Picture Updated",
                description: "Your new DP is looking fresh! ✨"
            })
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
            <div className='flex items-center gap-2'>
              <Image src="/images/aluchat_icon.png" alt="AluChat Logo" width={32} height={32} className="rounded-full" />
              <div>
                <div className='flex items-center gap-2'>
                  <h1 className="text-xl font-headline font-semibold">AluChat</h1>
                  <InfoDialog />
                </div>
                <p className="text-xs text-muted-foreground">Your AI Companion</p>
              </div>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
           <div className="p-2 space-y-4">
              <div className="p-2 text-center bg-card-foreground/5 dark:bg-card-foreground/10 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h3 className="font-headline text-md font-semibold">Daily Alu-ism</h3>
                  <Button variant="ghost" size="icon" className="size-6" onClick={fetchAluism} disabled={isAluismLoading}>
                    <RefreshCw className={`size-3 ${isAluismLoading ? 'animate-spin' : ''}`}/>
                  </Button>
                </div>
                {isAluismLoading ? (
                   <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                ) : (
                  <blockquote className="text-sm text-muted-foreground italic border-l-2 border-border pl-3 text-left">
                    "{aluism}"
                  </blockquote>
                )}
              </div>
              <Separator />
               <div className="p-2 text-center bg-card-foreground/5 dark:bg-card-foreground/10 rounded-lg">
                  <h3 className="font-headline text-md font-semibold">Got Ideas?</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    Your feedback helps make AluChat better. Send your suggestions!
                  </p>
                  <a href="mailto:hakkanparbej@gmail.com">
                    <Button variant="outline" size="sm" className="w-full">
                      <Mail className="mr-2 size-4" />
                      Send Mail
                    </Button>
                  </a>
              </div>
              <div className="text-center">
                  <p className="font-headline text-lg">Built with brains & banter.</p>
                  <p className="text-sm text-muted-foreground">Connect with the creator:</p>
              </div>
              <div className="flex justify-center gap-4">
                <a href="https://github.com/HakkanShah" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="size-6" />
                </a>
                <a href="https://www.instagram.com/hakkanshah" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="size-6" />
                </a>
                 <a href="https://www.facebook.com/i.hakkan" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="size-6" />
                </a>
                <a href="https://www.linkedin.com/in/hakkan" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="size-6" />
                </a>
              </div>
            </div>
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-1" />
           <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
              <div className="relative group">
                <Avatar className="h-10 w-10 cursor-pointer" onClick={handleAvatarClick}>
                  <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "User"} data-ai-hint="profile picture" />
                  <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
                </Avatar>
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleAvatarClick}
                >
                    <Pencil className="size-4 text-white" />
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    className="hidden" 
                    accept="image/png, image/jpeg, image/gif"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{user?.displayName || "User"}</span>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign out">
              <LogOut />
            </Button>
          </div>
        </SidebarFooter>
      </Sidebar>
      <div className="flex h-svh flex-1 flex-col">
        <header className="flex-shrink-0 border-b p-2 md:p-4 backdrop-blur-sm bg-background/50 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 md:gap-3">
              <SidebarTrigger />
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src="/images/aluchat_icon.png" alt="AluChat Logo" />
                  <AvatarFallback>
                    <div className="size-full rounded-full bg-primary/20" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-headline text-lg font-semibold tracking-wider">AluChat</h2>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 md:gap-2">
              <ModeToggle 
                mode={mode} 
                onModeChange={handleModeChange} 
                isTutorialRunning={isTutorialOpen} 
                tutorialStep={tutorialStep}
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                   <DropdownMenuItem onSelect={handleShare}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setIsClearAlertOpen(true)} className="text-destructive focus:text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Clear History
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className='flex-1 flex flex-col min-h-0 relative'>
             <Chat 
                mode={mode} 
                messages={messages}
                setMessages={setMessages}
                isSwitching={isSwitching}
                systemMessage={systemMessage}
                />
        </main>
      </div>
      <AlertDialog open={isClearAlertOpen} onOpenChange={setIsClearAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-2">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <AlertDialogTitle className="text-center">Clear Chat History?</AlertDialogTitle>
            <AlertDialogDescription className="text-center">
              This action cannot be undone. All your messages will be
              permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-center">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleClearChat} className="bg-destructive hover:bg-destructive/90">
              Yes, clear chat
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <TutorialDialog 
        open={isTutorialOpen}
        step={tutorialStep}
        onNext={handleTutorialNext}
      />
    </>
  );
}


export function ChatLayout() {
  return (
    <SidebarProvider>
      <ChatLayoutContent />
    </SidebarProvider>
  )
}
