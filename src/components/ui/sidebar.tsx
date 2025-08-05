
"use client"

import * as React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetOverlay, SheetPortal, SheetClose, SheetTitle } from "@/components/ui/sheet"
import { Button } from "./button"
import { Menu, X } from "lucide-react"

type SidebarContextType = {
  isMobile: boolean
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContextType | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const isMobile = useIsMobile();
    const [isOpen, setIsOpen] = React.useState(!isMobile);

    React.useEffect(() => {
        if (isMobile) {
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }, [isMobile]);

    const toggle = React.useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const contextValue = React.useMemo<SidebarContextType>(
        () => ({ isMobile, isOpen, setIsOpen, toggle }),
        [isMobile, isOpen, setIsOpen, toggle]
    );

    return (
        <SidebarContext.Provider value={contextValue}>
            <div className={cn("group/sidebar-wrapper flex min-h-svh w-full")}>
                {children}
            </div>
        </SidebarContext.Provider>
    );
}
SidebarProvider.displayName = "SidebarProvider";

export const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isMobile, isOpen, setIsOpen } = useSidebar();
    const state = isOpen ? 'expanded' : 'collapsed';

    const commonContent = (
      <div
        ref={ref}
        data-state={state}
        className={cn("flex h-full flex-col bg-card text-card-foreground border-r", className)}
        {...props}
      >
        {children}
         {isMobile && (
            <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </SheetClose>
          )}
      </div>
    );

    if (isMobile) {
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetPortal>
            <SheetOverlay />
            <SheetContent side="left" className="w-[16rem] p-0">
               <SheetTitle className="sr-only">Sidebar Menu</SheetTitle>
              {commonContent}
            </SheetContent>
          </SheetPortal>
        </Sheet>
      )
    }

    return (
      <aside
        data-state={state}
        className={cn(
          "hidden md:flex h-svh transition-[width] duration-300 ease-in-out",
          state === 'expanded' ? 'w-[16rem]' : 'w-0'
        )}
      >
        {commonContent}
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"

export const SidebarTrigger = () => {
    const { isMobile, toggle } = useSidebar();
    if (!isMobile) return null;

    return (
        <Button variant="ghost" size="icon" onClick={toggle}>
            <Menu />
            <span className="sr-only">Toggle Sidebar</span>
        </Button>
    )
}

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col p-2 transition-all duration-300 overflow-hidden",
        !isOpen && "p-0 items-center opacity-0",
        className
      )}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
   const { isOpen } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto transition-all duration-300",
        !isOpen && "opacity-0",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"


export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
   const { isOpen } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-2 p-2 overflow-hidden transition-all duration-300",
         !isOpen && "opacity-0",
        className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"
