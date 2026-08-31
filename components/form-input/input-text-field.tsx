"use client";

import DynamicFieldDescription from "@/components/form-input/dynamic-field-errors";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useFieldContext } from "@/lib/hooks/create-form.hook";
import { TextInputFieldProps } from "@/types/global.type";

export default function InputTextField({
  type,
  label,
  placeholder,
  required = false,
  disabled = false,
  fieldDescription,
  defaultValues,
  icon,
}: TextInputFieldProps) {
  const { name, state, handleBlur, handleChange } = useFieldContext<string>();

  const isInvalid = state.meta.isDirty && state.meta.errors.length > 0;

  return (
    <Field data-disabled={disabled} data-invalid={isInvalid}>
      {label && (
        <FieldLabel className="text-xs" htmlFor={name}>
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}
      <InputGroup>
        {icon && (
          <InputGroupAddon align={"inline-start"}>{icon}</InputGroupAddon>
        )}

        <InputGroupInput
          className="text-sm!"
          aria-invalid={isInvalid}
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          defaultValue={defaultValues}
          value={state.value ?? ""}
          onBlur={handleBlur}
          onChange={(e) => handleChange(e.target.value)}
        />
      </InputGroup>

      <DynamicFieldDescription
        name={name}
        meta={state.meta}
        description={fieldDescription}
      />
    </Field>
  );
}
