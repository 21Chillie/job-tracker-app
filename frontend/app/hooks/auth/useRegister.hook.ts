import { useForm } from "@tanstack/react-form";
import { useSubmit } from "react-router";
import z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "You must be provide your name"),
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

export function useRegisterForm() {
  const submit = useSubmit();

  const formDefaultValues = {
    name: "",
    email: "",
    password: "",
  };

  const { handleSubmit, Field, Subscribe } = useForm({
    defaultValues: formDefaultValues,
    validators: {
      // onSubmit: registerSchema,
      onBlur: registerSchema,
    },
    onSubmit: async ({ value }) => {
      submit(value, { method: "POST" });
    },
  });

  return { handleSubmit, Field, Subscribe };
}
