import { useForm } from "@tanstack/react-form";
import { useSubmit } from "react-router";
import z from "zod";

export const profileSchema = z
  .object({
    name: z.string().min(2, "Name is too short"),
    email: z.email("Invalid email address").trim(),
    currentPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one symbol",
      })
      .optional()
      .or(z.literal("")),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Password must contain at least one symbol",
      })
      .optional()
      .or(z.literal("")),
    avatar: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && !data.currentPassword) {
        return false;
      }

      return true;
    },
    {
      error: "Current password is required to set a new one",
      path: ["currentPassword"],
    },
  );

export type profileFormDataType = z.infer<typeof profileSchema>;

export function useEditProfile({
  name,
  avatar,
  email,
}: {
  name: string;
  email: string;
  avatar: string;
}) {
  const submit = useSubmit();

  const formDefaultValues: profileFormDataType = {
    name,
    email,
    currentPassword: "",
    newPassword: "",
    avatar: avatar,
  };

  const { handleSubmit, Subscribe, Field } = useForm({
    defaultValues: formDefaultValues,
    validators: {
      onSubmit: profileSchema,
    },
    onSubmit: async ({ value }) => {
      submit({ ...value, action: "edit-profile" }, { method: "POST" });
    },
  });

  return { handleSubmit, Subscribe, Field };
}
