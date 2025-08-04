
"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BrainCircuit, Skull } from "lucide-react";

interface TutorialDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function TutorialDialog({ open, onOpenChange }: TutorialDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-2xl font-headline">
            Welcome to AluChat!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base">
            Your new AI companion with a split personality.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-4 py-4">
            <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                    <BrainCircuit className="size-6 text-blue-500" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Good Bro 😇</h3>
                    <p className="text-muted-foreground">
                        Kind, helpful, and always ready to hype you up. Use this mode for straightforward answers and good vibes.
                    </p>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-pink-100 dark:bg-pink-900/50">
                    <Skull className="size-6 text-pink-500" />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">Bad Bro 😈</h3>
                    <p className="text-muted-foreground">
                        Sarcastic, edgy, and brutally honest. Use this mode for roasts, banter, and a dose of reality.
                    </p>
                </div>
            </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogAction className="w-full">Let's Go! 🔥</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
