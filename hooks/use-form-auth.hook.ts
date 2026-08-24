import { ButtonSubmit } from "@/components/form-input/button-submit";
import InputPasswordField from "@/components/form-input/input-password";
import InputTextField from "@/components/form-input/input-text-field";
import { fieldContext, formContext } from "@/hooks/create-form.hook";
import { emailSignIn, emailSignUp } from "@/services/auth/auth-email.server";
import {
  SignInFormSchema,
  SignInFormSchemaType,
  SignUpFormSchema,
  SignUpFormSchemaType,
} from "@/types/auth.type";
import { createFormHook, revalidateLogic } from "@tanstack/react-form-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputTextField,
    InputPasswordField,
  },
  formComponents: {
    ButtonSubmit,
  },
});

const validationLogic = revalidateLogic();

const signInDefaultValues: SignInFormSchemaType = {
  email: "",
  password: "",
};

const signUpDefaultValues: SignUpFormSchemaType = {
  fullName: "",
  email: "",
  password: "",
};

export function useFormSignIn() {
  const router = useRouter();

  const form = useAppForm({
    defaultValues: signInDefaultValues,
    validationLogic,
    validators: {
      onDynamicAsyncDebounceMs: 500,
      onDynamic: SignInFormSchema,
    },

    // TODO: finish on submit logic
    onSubmit: async ({ value }) => {
      const res = await emailSignIn(value);

      if (!res.success) {
        toast.error(res.statusText, {
          description: res.message,
          duration: 3000,
        });

        router.push(res.redirectURL);
      }
    },
  });

  return form;
}

export function useFormSignUp() {
  const router = useRouter();
  const form = useAppForm({
    defaultValues: signUpDefaultValues,
    validationLogic,
    validators: {
      onDynamicAsyncDebounceMs: 500,
      onDynamic: SignUpFormSchema,
    },

    // TODO: finish on submit logic
    onSubmit: async ({ value }) => {
      const res = await emailSignUp(value);

      if (!res.success) {
        toast.error(res.statusText, {
          description: res.message,
          duration: 3000,
        });
        router.push(res.redirectURL);
      }
    },
  });

  return form;
}
