export type ButtonProps = {
  children: React.ReactNode;
  href: string;
  variant?:
    "default" | "outline" | "ghost" | "secondary" | "destructive" | "link";
  size?:
    "default" | "sm" | "lg" | "icon" | "xs" | "icon-xs" | "icon-sm" | "icon-lg";
  className?: string;
};
