import LoginForm from "@components/LoginForm";
import { redirect } from "react-router";
import type { Route } from "./+types/login";
import { loginSchema } from "@hooks/auth/useLogin.hook";
import toast from "react-hot-toast";
import z from "zod";
import authService from "@services/auth.service";

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

  try {
    await authService.loginEmail(validForm.data);
    return redirect("/");
  } catch (err) {
    console.error((err as Error).message);
    throw new Response("An unknown error occurred when trying to login", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
