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
    // The AuthProvider's useEffect will handle the redirect.
    // Returning null here prevents the component from trying to render
    // before the redirect happens, which was causing the error.
    return null;
  }

  return <ChatLayout />;
}
