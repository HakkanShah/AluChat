"use client";
import { useAuth } from '@/components/providers/auth-provider';
import { redirect } from 'next/navigation';

export default function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (user) {
    redirect('/chat');
  } else {
    redirect('/auth');
  }

  return null;
}
