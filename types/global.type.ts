import { HTMLAttributeAnchorTarget } from "react";

export type ButtonProps = {
  children: React.ReactNode;
  variant?:
    "default" | "outline" | "ghost" | "secondary" | "destructive" | "link";
  size?:
    "default" | "sm" | "lg" | "icon" | "xs" | "icon-xs" | "icon-sm" | "icon-lg";
  className?: string;
};

export type ButtonLinkProps = ButtonProps & {
  target?: HTMLAttributeAnchorTarget;
  href: string;
};

export type AnyInputFieldProps = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fieldDescription?: string;
  defaultValues?: string;
  icon?: React.JSX.Element;
};

export type TextInputFieldProps = AnyInputFieldProps & {
  type: "text" | "email" | "search" | "url";
};

export type NumberInputFieldProps = AnyInputFieldProps & {
  type: "number";
  subType?: "default" | "price";
};

export type DatabaseResponse<T> = {
  success: boolean;
  statusText: string;
  message: string;
  data: T | null;
};
