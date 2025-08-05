
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Info, X } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

export function InfoDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="size-6">
          <Info className="size-4" />
          <span className="sr-only">About AluChat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-headline">
            About AluChat
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] px-6 pb-6">
            <div className="space-y-6 text-sm text-muted-foreground">
                <section>
                    <h3 className="font-semibold text-lg text-foreground mb-2">What is AluChat?</h3>
                    <p>
                        AluChat is a dual-personality AI chatbot inspired by the versatility of a potato ("Alu"). It offers two distinct conversational modes: a helpful "Sweet Mode" and a sarcastic "Savage Mode." The app is designed to provide a uniquely engaging and entertaining chat experience, showcasing the power of generative AI.
                    </p>
                </section>

                <Separator />

                <section>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Terms and Conditions</h3>
                    <div className="space-y-2">
                        <p><strong>1. Acceptance of Terms:</strong> By using AluChat, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use the app.</p>
                        <p><strong>2. Age Restriction:</strong> You must be 18 years of age or older to use this application. The "Savage Mode" may contain mature themes, humor, and language that is not suitable for minors.</p>
                        <p><strong>3. User Conduct:</strong> You agree not to use AluChat for any unlawful purpose or to send content that is abusive, harassing, defamatory, or obscene. We are not responsible for user-generated content, but we reserve the right to take action against prohibited conduct.</p>
                        <p><strong>4. Disclaimer of Warranties:</strong> AluChat is provided "as is" without any warranties, express or implied. The AI's responses are generated and may not always be accurate or appropriate. Do not rely on AluChat for professional advice (e.g., medical, legal, or financial).</p>
                        <p><strong>5. Limitation of Liability:</strong> The creator of AluChat, Hakkan Parbej Shah, shall not be liable for any damages arising from the use or inability to use this application.</p>
                    </div>
                </section>

                <Separator />

                <section>
                    <h3 className="font-semibold text-lg text-foreground mb-2">Privacy Policy</h3>
                     <div className="space-y-2">
                        <p><strong>1. Data Collection:</strong> AluChat uses a mock authentication system. Your email and name are stored in your browser's local storage for a personalized experience. We do not transmit or store this information on a server.</p>
                        <p><strong>2. Profile Pictures:</strong> If you upload a profile picture, it is converted to a Base64 string and stored in your local storage. It is not uploaded to any server.</p>
                        <p><strong>3. Conversation History:</strong> Your chat history is maintained in the application's state during your session and may be sent to the AI model provider (Google Gemini) to maintain conversational context. This history is not permanently stored by us.</p>
                        <p><strong>4. Third-Party Services:</strong> The AI is powered by Google's Gemini models. Your interaction with the AI is subject to Google's Privacy Policy and Terms of Service.</p>
                        <p><strong>5. Security:</strong> Since all personal data is stored on your device, the security of your data depends on the security of your own device and browser.</p>
                    </div>
                </section>
            </div>
        </ScrollArea>
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
