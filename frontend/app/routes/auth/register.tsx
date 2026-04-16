import RegisterForm from "@components/RegisterForm";
import { registerSchema } from "@hooks/auth/useRegister.hook";
import { redirect } from "react-router";
import toast from "react-hot-toast";
import type { Route } from "./+types/register";
import z from "zod";
import authService from "@services/auth.service";

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

  try {
    await authService.registerEmail(validForm.data);
    return redirect("/");
  } catch (err) {
    console.error((err as Error).message);

    throw new Response("An unknown error occurred when trying to login", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
}
