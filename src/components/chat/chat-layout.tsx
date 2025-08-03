
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
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';
import Chat from '@/components/chat/chat';
import { useAuth } from '../providers/auth-provider';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

function getInitials(name: string | null | undefined) {
  if (!name) return 'U';
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[1][0]}`.toUpperCase();
  }
  return name[0].toUpperCase();
}

export function ChatLayout() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    logout();
    router.push('/auth');
  };


  return (
    <SidebarProvider>
      <Sidebar className="border-r bg-card" variant="sidebar" collapsible="icon">
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
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.photoURL ?? undefined} alt={user?.displayName ?? "User"} data-ai-hint="profile picture" />
                <AvatarFallback>{getInitials(user?.displayName)}</AvatarFallback>
              </Avatar>
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
