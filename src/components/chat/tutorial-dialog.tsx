
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
import { BrainCircuit, Skull, MessageCircleQuestion, Laugh } from "lucide-react";

interface TutorialDialogProps {
    open: boolean;
    step: number;
    onNext: () => void;
}

const TutorialStepContent = ({ step, onNext }: { step: number; onNext: () => void; }) => {
    switch (step) {
        case 1:
            return (
                <>
                    <AlertDialogHeader>
                        <div className="flex justify-center items-center size-12 rounded-full bg-primary/10 mx-auto mb-4">
                           <span className="text-3xl">👋</span>
                        </div>
                        <AlertDialogTitle className="text-center text-2xl font-headline">
                            Welcome to AluChat!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-base">
                            Your favorite two-faced potato chatbot is here! One side’s sweet, the other savage – just how we like it!
                            <br/><br/>
                            Click “Let’s Chat” to get started 🍟
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="w-full" onClick={onNext}>
                            Let's Chat
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </>
            );
        case 2:
            return (
                <>
                    <AlertDialogHeader>
                        <div className="flex justify-center items-center size-12 rounded-full bg-blue-100 dark:bg-blue-900/50 mx-auto mb-4">
                            <BrainCircuit className="size-7 text-blue-500" />
                        </div>
                        <AlertDialogTitle className="text-center text-2xl font-headline">
                             Meet Good Bro!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-base">
                            He’s respectful, polite, and always gives you helpful answers – no matter what you ask. A wholesome buddy for deep convos or chill vibes. 🥔💬
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="w-full" onClick={onNext}>
                           Next
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </>
            );
        case 3:
            return (
                <>
                    <AlertDialogHeader>
                         <div className="flex justify-center items-center size-12 rounded-full bg-pink-100 dark:bg-pink-900/50 mx-auto mb-4">
                            <Skull className="size-7 text-pink-500" />
                        </div>
                        <AlertDialogTitle className="text-center text-2xl font-headline">
                            Say hi to Bad Bro!
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-base">
                            This side’s spicy, sarcastic, and brutally honest – but still got your back. Perfect for banter, roasts, or unfiltered takes. 🌶️🤘
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction className="w-full" onClick={onNext}>
                           Got it, let's start!
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </>
            );
        default:
            return null;
    }
};

export function TutorialDialog({ open, step, onNext }: TutorialDialogProps) {
  if (!open || step === 0) {
    return null;
  }
  
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <TutorialStepContent step={step} onNext={onNext} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
