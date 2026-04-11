import { useForm } from "@tanstack/react-form";
import { useSubmit } from "react-router";
import z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one symbol",
    }),
});

export function useLoginForm() {
  const submit = useSubmit();

  const formDefaultValues = {
    email: "",
    password: "",
  };

  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues: formDefaultValues,
    validators: {
      onSubmit: loginSchema,
      onBlur: loginSchema,
    },
    onSubmit: async ({ value }) => {
      submit(value, { method: "POST" });
    },
  });

  return { handleSubmit, Field, Subscribe };
}
