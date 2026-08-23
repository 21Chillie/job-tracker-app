import { FieldDescription } from "@/components/ui/field";
import { AnyFieldMeta } from "@tanstack/react-form-nextjs";
import { ZodError } from "zod";

export default function DynamicFieldDescription({
  meta,
  name,
  description,
}: {
  meta: AnyFieldMeta;
  name: string;
  description?: string;
}) {
  const { errors, isDirty } = meta;

  if (isDirty && errors.length > 0) {
    return (
      <div className="flex flex-col gap-1">
        {errors.map(({ message }: ZodError) => {
          return (
            <FieldDescription
              className="text-xs"
              key={`${name}-${message}`}>
              {message}
            </FieldDescription>
          );
        })}
      </div>
    );
  }

  if (description) {
    return (
      <FieldDescription className="text-xs">{description}</FieldDescription>
    );
  }

  return null;
}
