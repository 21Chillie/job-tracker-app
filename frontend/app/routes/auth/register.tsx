import RegisterForm from "@components/RegisterForm";
import { registerSchema } from "@hooks/auth/register.hook";
import { redirect } from "react-router";
import authClient from "~/utils/auth/auth-client";
import toast from "react-hot-toast";
import type { Route } from "./+types/register";
import z from "zod";

export default function Register() {
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
    toast.error(z.prettifyError(validForm.error));
    return { error: z.prettifyError(validForm.error) };
  }

  const { error } = await authClient.signUp.email({
    name: validForm.data.name,
    email: validForm.data.email,
    password: validForm.data.password,
  });

  if (error) {
    console.log(error);
    toast.error(error.message as string);
    return { error: error.message };
  }

  return redirect("/");
}
