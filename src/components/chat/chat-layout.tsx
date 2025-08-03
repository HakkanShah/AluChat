
'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Chat from '@/components/chat/chat';
import { useAuth } from '../providers/auth-provider';
import { LogOut, Pencil, MoreVertical, Trash, Github, Instagram, Facebook, Linkedin, Mail } from 'lucide-react';
import React, { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ModeToggle } from '../chat/mode-toggle';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { SidebarTrigger } from '../ui/sidebar';


function getInitials(name: string | null | undefined) {
  if (!name) return 'U';
  const names = name.split(' ');
  if (names.length > 1 && names[1]) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return name[0].toUpperCase();
}

export function ChatLayout() {
  const { user, logout, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { setTheme } = useTheme();
  const [mode, setMode] = useState<'Good Bro' | 'Bad Bro'>('Good Bro');
  const [messages, setMessages] = useState<any[]>([]); // Using any for simplicity
  const [isClearAlertOpen, setIsClearAlertOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  const handleSignOut = async () => {
    logout();
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleModeChange = (newMode: 'Good Bro' | 'Bad Bro') => {
    setMode(newMode);
    setTheme(newMode === 'Good Bro' ? 'light' : 'dark');
  }

  const handleClearChat = () => {
    // This is a placeholder. In a real app, you might lift state up
    // or use a more robust state management solution.
    setMessages([]); 
    toast({
      title: "Chat Cleared",
      description: "Your conversation history has been wiped.",
    });
    setIsClearAlertOpen(false);
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
    <SidebarProvider>
      <Sidebar open={isSidebarOpen} setOpen={setIsSidebarOpen}>
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
            <div className='flex items-center gap-2'>
              <Icons.logo className="size-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold">AluChat</h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
           <div className="p-2 space-y-4">
              <div className="text-center">
                  <p className="font-headline text-lg">Built with brains & banter.</p>
                  <p className="text-sm text-muted-foreground">Connect with the creator:</p>
              </div>
              <div className="flex justify-center gap-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Github className="size-6" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="size-6" />
                </a>
                 <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="size-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="size-6" />
                </a>
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
      <SidebarInset>
        <div className="relative flex h-full max-h-svh flex-col">
            <header className="flex-shrink-0 border-b p-2 md:p-4 backdrop-blur-sm bg-background/50 z-10">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className="md:hidden">
                      <SidebarTrigger onClick={() => setIsSidebarOpen(true)} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="hidden h-10 w-10 border-2 border-primary md:flex">
                        <AvatarFallback>
                          <Icons.logo className="p-1" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-headline text-lg font-semibold tracking-wider">AluChat</h2>
                        <p className="text-xs md:text-sm text-muted-foreground">Your AI Companion</p>
                      </div>
                    </div>
                  </div>
                   <div className="flex items-center gap-1 md:gap-2">
                    <ModeToggle mode={mode} onModeChange={handleModeChange} />
                    <AlertDialog open={isClearAlertOpen} onOpenChange={setIsClearAlertOpen}>
                      <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical />
                              <span className="sr-only">More options</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                              <DropdownMenuItem onSelect={() => setIsClearAlertOpen(true)} className="text-destructive focus:text-destructive">
                                <Trash className="mr-2 h-4 w-4" />
                                Clear History
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                      </DropdownMenu>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              current chat history.
                          </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={handleClearChat} className="bg-destructive hover:bg-destructive/90">
                              Clear
                          </AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
              </div>
            </header>
            <Chat 
              mode={mode} 
              onModeChange={handleModeChange}
              messages={messages}
              setMessages={setMessages}
              isClearAlertOpen={isClearAlertOpen}
              setIsClearAlertOpen={setIsClearAlertOpen}
              onClearChat={handleClearChat}
            />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
