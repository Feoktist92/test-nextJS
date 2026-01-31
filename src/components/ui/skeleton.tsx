import { cn } from "@/lib/ui/utils";

function Skeleton({ className, style, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-md bg-muted animate-shimmer overflow-hidden", className)}
      style={{ transform: "translateZ(0)", ...style }}
      {...props}
    />
  );
}

export { Skeleton };
