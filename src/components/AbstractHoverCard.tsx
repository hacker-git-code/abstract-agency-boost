
import React from 'react';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent 
} from "@/components/ui/hover-card";

interface AbstractHoverCardProps {
  triggerElement: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const AbstractHoverCard = ({ triggerElement, children, className }: AbstractHoverCardProps) => {
  return (
    <HoverCard openDelay={100} closeDelay={200}>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer relative group">
          {triggerElement}
          <div className="absolute -inset-2 -z-10 bg-gradient-to-r from-transparent via-accent/10 to-transparent opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className={`backdrop-blur-lg bg-background/80 border-none shadow-[0_0_25px_rgba(0,0,0,0.1)] p-6 transition-all duration-300 ${className}`}>
        {children}
      </HoverCardContent>
    </HoverCard>
  );
};

export default AbstractHoverCard;
