
'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Chat from '@/components/chat/chat';
import { useAuth } from '../providers/auth-provider';
import { useRouter } from 'next/navigation';
import { LogOut, Pencil } from 'lucide-react';
import React, { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';


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
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();


  const handleSignOut = async () => {
    logout();
    router.push('/auth');
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
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
       <div className="absolute top-2 left-2 z-20 md:hidden">
          <SidebarTrigger />
        </div>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Icons.logo className="size-8 text-primary" />
            <h1 className="text-xl font-headline font-semibold">AluChat</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive>Chat with Alu</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
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
        <Chat />
      </SidebarInset>
    </SidebarProvider>
  );
}
