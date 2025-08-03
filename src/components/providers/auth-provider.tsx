"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '../ui/skeleton';

// A mock User type
interface User {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Simulate checking for a logged-in user
    const checkUser = () => {
      try {
        const storedUser = sessionStorage.getItem('dummyUser');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        // Could be that sessionStorage is not available
        console.error("Failed to get user from sessionStorage", error);
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const login = (newUser: User) => {
    setUser(newUser);
    try {
      sessionStorage.setItem('dummyUser', JSON.stringify(newUser));
    } catch (error) {
       console.error("Failed to save user to sessionStorage", error);
    }
  };

  const logout = () => {
    setUser(null);
     try {
      sessionStorage.removeItem('dummyUser');
    } catch (error) {
       console.error("Failed to remove user from sessionStorage", error);
    }
  };


  useEffect(() => {
    if (isLoading) return;

    const isAuthPage = pathname === '/auth';
    const isChatPage = pathname === '/chat';

    if (!user && isChatPage) {
      router.push('/auth');
    } else if (user && isAuthPage) {
      router.push('/chat');
    }
  }, [user, isLoading, pathname, router]);


  if (isLoading) {
    return (
        <div className="flex h-svh w-full items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                </div>
            </div>
        </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
