import { ButtonSubmit } from "@/components/form-input/button-submit";
import InputPasswordField from "@/components/form-input/input-password";
import InputTextField from "@/components/form-input/input-text-field";
import { fieldContext, formContext } from "@/hooks/create-form.hook";
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

const validationLogic = revalidateLogic({
  mode: "blur",
  modeAfterSubmission: "change",
});

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
      onDynamic: SignInFormSchema,
    },

    // TODO: finish sign in form submission
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
      onDynamic: SignUpFormSchema,
    },

    // TODO: finish sign up form submission 
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return form;
}
