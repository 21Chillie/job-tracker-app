"use client";

import { ButtonSubmit } from "@/components/form-input/button-submit";
import InputTextField from "@/components/form-input/input-text-field";
import { fieldContext, formContext } from "@/lib/hooks/create-form.hook";
import { emailSchema, type EmailSchemaType } from "@/lib/mail-checker";
import { createFormHook, revalidateLogic } from "@tanstack/react-form-nextjs";
import { useState } from "react";
import z from "zod";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputTextField,
  },
  formComponents: {
    ButtonSubmit,
  },
});

const validationLogic = revalidateLogic();

const emailSchemaReset = z.object({
  email: emailSchema,
});

type ResetPasswordStep = "email" | "otp" | "reset";

// TODO: finish this hooks
export function usePasswordReset() {
  const [resetStep, setResetStep] = useState<ResetPasswordStep>("email");

  const defaultValues: { email: EmailSchemaType } = { email: "" };

  const emailForm = useAppForm({
    defaultValues,
    validationLogic,
    validators: {
      onDynamicAsyncDebounceMs: 500,
      onDynamic: emailSchemaReset,
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return { resetStep, setResetStep, emailForm };
}
