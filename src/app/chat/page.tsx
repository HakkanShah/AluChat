"use client";
import { ChatLayout } from '@/components/chat/chat-layout';
import { useAuth } from '@/components/providers/auth-provider';
import { redirect } from 'next/navigation';


export default function ChatPage() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!user) {
    redirect('/auth');
    return null;
  }

  return <ChatLayout />;
}
