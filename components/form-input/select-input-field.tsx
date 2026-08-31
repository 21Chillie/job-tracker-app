"use client";

import DynamicFieldDescription from "@/components/form-input/dynamic-field-errors";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFieldContext } from "@/lib/hooks/create-form.hook";
import { AnyInputFieldProps } from "@/types/global.type";

type Props = Pick<
  AnyInputFieldProps,
  "disabled" | "label" | "placeholder" | "fieldDescription" | "required"
> & {
  data: {
    value: string;
    label: string;
  }[];
};

export default function SelectInputField({
  data,
  disabled,
  label,
  required,
  placeholder,
  fieldDescription,
}: Props) {
  const { name, state, handleChange } = useFieldContext<string>();
  const isInvalid = state.meta.isDirty && state.meta.errors.length > 0;

  return (
    <Field data-disabled={disabled} data-invalid={isInvalid}>
      {label && (
        <FieldLabel htmlFor={name} className="text-xs capitalize">
          {label} {required && <span className="text-destructive">*</span>}
        </FieldLabel>
      )}

      <Select
        name={name}
        aria-label={label}
        value={state.value as string | undefined}
        isInvalid={isInvalid}
        placeholder={placeholder}
        onChange={(value) => handleChange(value as string)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            {data.map((item) => (
              <SelectItem
                className={"cursor-pointer"}
                key={`${item.value}`}
                id={item.value}
              >
                {item.label
                  .replaceAll("_", " ")
                  .toLowerCase()
                  .split(" ")
                  .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                  .join(" ")}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <DynamicFieldDescription
        name={name}
        meta={state.meta}
        description={fieldDescription}
      />
    </Field>
  );
}
