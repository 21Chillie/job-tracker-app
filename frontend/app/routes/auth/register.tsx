import RegisterForm from "@components/RegisterForm";
import type { Route } from "./+types/register";
import { registerSchema } from "~/hooks/auth/register.hook";
import z from "zod";
import { redirect, useActionData } from "react-router";
import authClient from "@utils/auth-client";
import toast from "react-hot-toast";

export default function Register() {
  const actionData = useActionData<typeof clientAction>();

  if (actionData?.error) {
    toast.error(actionData.error);
  }

  return (
    <>
      <RegisterForm></RegisterForm>
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const validForm = registerSchema.safeParse(payload);

  if (!validForm.success) {
    return { error: z.prettifyError(validForm.error) };
  }

  const { error } = await authClient.signUp.email({
    name: validForm.data.name,
    email: validForm.data.email,
    password: validForm.data.password,
  });

  if (error) {
    console.error(error);
    return { error: error.message };
  }

  return redirect("/");
}
