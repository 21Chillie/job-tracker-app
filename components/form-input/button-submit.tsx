"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from "@/lib/hooks/create-form.hook";
import { ButtonProps } from "@/types/global.type";

export function ButtonSubmit({
  children,
  variant = "default",
  size = "default",
  className,
  loadingLabel,
}: ButtonProps & { loadingLabel: string }) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.isSubmitting, state.canSubmit]}>
      {([isSubmitting, canSubmit]) => (
        <Button
          variant={variant}
          size={size}
          type="submit"
          className={className}
          isDisabled={isSubmitting || !canSubmit}
        >
          {isSubmitting ? (
            <>
              {loadingLabel}
              <Spinner data-icon="inline-start" />
            </>
          ) : (
            <>{children}</>
          )}
        </Button>
      )}
    </form.Subscribe>
  );
}

export function ButtonReset({
  children,
  variant = "default",
  size = "default",
  className,
}: ButtonProps) {
  const form = useFormContext();

  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      onClick={() => form.reset()}
    >
      {children}
    </Button>
  );
}
