import LoginForm from "@components/LoginForm";
import { redirect, useActionData } from "react-router";
import type { Route } from "./+types/login";
import { loginSchema } from "@hooks/auth/login.hook";
import z from "zod";
import authClient from "@utils/auth-client";
import toast from "react-hot-toast";

export default function Login() {
  const actionData = useActionData<typeof clientAction>();

  if (actionData?.error) {
    toast.error(actionData.error);
  }

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
    return { error: "Please check your input fields" };
  }

  const { error } = await authClient.signIn.email({
    email: validForm.data.email,
    password: validForm.data.password,
  });

  if (error) {
    console.log(error);
    return { error: error.message };
  }

  return redirect("/");
}
