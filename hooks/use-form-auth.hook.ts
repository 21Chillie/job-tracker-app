import { ButtonSubmit } from "@/components/form-input/button-submit";
import InputPasswordField from "@/components/form-input/input-password";
import InputTextField from "@/components/form-input/input-text-field";
import { fieldContext, formContext } from "@/hooks/create-form.hook";
import { emailSignUp } from "@/services/auth/email.auth.server";
import {
  SignInFormSchema,
  SignInFormSchemaType,
  SignUpFormSchema,
  SignUpFormSchemaType,
} from "@/types/auth.type";
import { createFormHook, revalidateLogic } from "@tanstack/react-form-nextjs";

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
  const form = useAppForm({
    defaultValues: signInDefaultValues,
    validationLogic,
    validators: {
      onDynamicAsyncDebounceMs: 500,
      onDynamic: SignInFormSchema,
    },

    // TODO: finish on submit logic
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return form;
}

export function useFormSignUp() {
  const form = useAppForm({
    defaultValues: signUpDefaultValues,
    validationLogic,
    validators: {
      onDynamicAsyncDebounceMs: 500,
      onDynamic: SignUpFormSchema,
    },

    // TODO: finish on submit logic
    onSubmit: async ({ value }) => {
      emailSignUp(value);
    },
  });

  return form;
}
