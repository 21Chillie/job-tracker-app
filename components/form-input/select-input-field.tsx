"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/motion/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { useFieldContext } from "@/lib/hooks/create-form.hook";
import { AnyInputFieldProps } from "@/types/global.type";
import { SelectValue } from "react-aria-components";
import DynamicFieldDescription from "./dynamic-field-errors";

type Props<T> = AnyInputFieldProps & {
  data: {
    value: T;
    label: string;
  }[];
};

export default function SelectInputField<T>({
  data,
  disabled,
  label,
  required,
}: Props<T>) {
  const { name, state, handleChange } = useFieldContext<string>();
  const isInvalid = state.meta.isDirty && state.meta.errors.length > 0;

  return (
    <Field data-disabled={disabled} data-invalid={isInvalid}>
      {label && (
        <FieldLabel htmlFor={name} className="text-xs">
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}

      <Select
        value={state.value as string}
        disabled={disabled}
        defaultValue={state.value as string}
        onValueChange={(e) => handleChange(e)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {data.map((item) => (
            <SelectItem key={`${item.value}`} value={item.value as string}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <DynamicFieldDescription name={name} meta={state.meta} />
    </Field>
  );
}
