import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function SeparatorText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <Separator className="flex-1" />
      <span className="text-muted-foreground text-sm">{children}</span>
      <Separator className="flex-1" />
    </div>
  );
}
