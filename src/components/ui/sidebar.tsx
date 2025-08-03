
"use client"

import * as React from "react"
import { VariantProps, cva } from "class-variance-authority"
import { PanelLeft, X } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetOverlay, SheetPortal } from "@/components/ui/sheet"


type SidebarContext = {
  isMobile: boolean
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  toggle: () => void
}

const SidebarContext = React.createContext<SidebarContext | null>(null)

function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.")
  }
  return context
}

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, style, children, ...props }, ref) => {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(!isMobile)

  React.useEffect(() => {
    if (isMobile) {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [isMobile])

  const toggle = React.useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  const contextValue = React.useMemo<SidebarContext>(
    () => ({ isMobile, open, setOpen, toggle }),
    [isMobile, open, setOpen, toggle]
  )

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        ref={ref}
        className={cn(
          "group/sidebar-wrapper flex min-h-svh w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = React.forwardRef<
  HTMLDivElement,
  SidebarProps
>(({ className, children, open, setOpen, ...props }, ref) => {
  const { isMobile } = useSidebar()
  const state = open ? 'expanded' : 'collapsed';

  const commonContent = (
    <div
      ref={ref}
      data-state={state}
      className={cn("flex h-full flex-col bg-card text-card-foreground border-r", className)}
      {...props}
    >
      {children}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetPortal>
          <SheetOverlay />
          <SheetContent side="left" className="w-[16rem] p-0">
            {commonContent}
             <Button 
                variant="ghost" size="icon" 
                className="absolute top-2 right-2 h-7 w-7" 
                onClick={() => setOpen(false)}>
                <X className="size-4" />
                <span className="sr-only">Close sidebar</span>
            </Button>
          </SheetContent>
        </SheetPortal>
      </Sheet>
    )
  }

  return (
    <div
      data-state={state}
      className={cn(
        "hidden md:flex h-svh transition-[width] duration-300 ease-in-out",
        state === 'expanded' ? 'w-[16rem]' : 'w-[3.5rem]',
        className
      )}
    >
      {commonContent}
    </div>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, ...props }, ref) => {
  const { toggle } = useSidebar()

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-7 w-7", className)}
      onClick={toggle}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  const { open } = useSidebar();
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col p-2 transition-all duration-300",
        !open && "items-center",
        className
      )}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"


const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
})
SidebarFooter.displayName = "SidebarFooter"


export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
}
