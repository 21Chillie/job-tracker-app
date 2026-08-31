"use client";

import DynamicFieldDescription from "@/components/form-input/dynamic-field-errors";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { useFieldContext } from "@/lib/hooks/create-form.hook";

type FieldProps = {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  fieldDescription?: string;
  className?: string;
  rows?: number;
};

export default function TextAreaField({
  label,
  placeholder,
  required = false,
  disabled = false,
  fieldDescription,
  className,
  rows = 6,
}: FieldProps) {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>();

  const isInvalid = state.meta.isTouched && state.meta.errors.length > 0;

  return (
    <Field data-disabled={disabled} data-invalid={isInvalid}>
      {label && (
        <FieldLabel htmlFor={name}>
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}

      <Textarea
        aria-invalid={isInvalid}
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        value={state.value ?? ""}
        onBlur={handleBlur}
        onChange={(e) => handleChange(e.target.value)}
        className={className}
      />

      <DynamicFieldDescription
        name={name}
        meta={state.meta}
        description={fieldDescription}
      />
    </Field>
  );
}
