import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/auth/login-form';
import { SignupForm } from '@/components/auth/signup-form';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';

export default function AuthPage() {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-background good-bro-bg p-4">
      <div className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2">
        <Icons.logo className="size-8 text-primary" />
        <h1 className="text-xl font-headline font-semibold">AluChat</h1>
      </div>
      <Tabs defaultValue="login" className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle>Welcome Back!</CardTitle>
              <CardDescription>
                Sign in to continue your chat with Alu.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
               <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Github />
                GitHub
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>
                Ready to start chatting? Sign up now!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or sign up with
                  </span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Github />
                GitHub
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
