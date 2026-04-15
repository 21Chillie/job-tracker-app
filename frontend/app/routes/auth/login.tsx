import LoginForm from "@components/LoginForm";
import { redirect } from "react-router";
import type { Route } from "./+types/login";
import { loginSchema } from "@hooks/auth/login.hook";
import authClient from "~/utils/auth/auth-client";
import toast from "react-hot-toast";
import z from "zod";

export default function Login() {
  return (
    <>
      <LoginForm></LoginForm>
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const validForm = loginSchema.safeParse(payload);

  if (!validForm.success) {
    toast.error(z.prettifyError(validForm.error));
    return { error: z.prettifyError(validForm.error) };
  }

  const { error } = await authClient.signIn.email({
    email: validForm.data.email,
    password: validForm.data.password,
  });

  if (error) {
    toast.error(error.message as string);
    return { error: error.message };
  }

  return redirect("/");
}
