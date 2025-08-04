
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
import { BrainCircuit, Skull, MessageCircleQuestion } from "lucide-react";

interface TutorialDialogProps {
    open: boolean;
    step: number;
    onNext: () => void;
}

const TutorialStepContent = ({ step }: { step: number }) => {
    if (step === 1) {
        return (
            <>
                <AlertDialogHeader>
                    <div className="flex justify-center items-center size-12 rounded-full bg-primary/10 mx-auto mb-4">
                        <MessageCircleQuestion className="size-8 text-primary" />
                    </div>
                    <AlertDialogTitle className="text-center text-2xl font-headline">
                        Welcome to AluChat!
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-base">
                        Your new AI companion with a split personality. Ready for a quick tour?
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </>
        )
    }
     if (step === 2) {
        return (
             <>
                <AlertDialogHeader>
                     <div className="flex justify-center items-center size-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mx-auto mb-4">
                        <BrainCircuit className="size-7 text-blue-500" />
                    </div>
                    <AlertDialogTitle className="text-center text-2xl font-headline">
                        Good Bro Mode 😇
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-base">
                        Kind, helpful, and always ready to hype you up. Use this mode for straightforward answers and good vibes.
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </>
        )
    }
     if (step === 3) {
        return (
            <>
                <AlertDialogHeader>
                     <div className="flex justify-center items-center size-12 rounded-full bg-pink-100 dark:bg-pink-900/50 mx-auto mb-4">
                        <Skull className="size-7 text-pink-500" />
                    </div>
                    <AlertDialogTitle className="text-center text-2xl font-headline">
                        Bad Bro Mode 😈
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center text-base">
                        Sarcastic, edgy, and brutally honest. Use this mode for roasts, banter, and a dose of reality.
                    </AlertDialogDescription>
                </AlertDialogHeader>
            </>
        )
    }
    return null;
}


export function TutorialDialog({ open, step, onNext }: TutorialDialogProps) {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <TutorialStepContent step={step} />
        <AlertDialogFooter>
          <AlertDialogAction className="w-full" onClick={onNext}>
            {step === 1 && "Start Tour 🔥"}
            {step === 2 && "Next →"}
            {step === 3 && "Let's Go! 🚀"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
