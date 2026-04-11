import LoginForm from "@components/LoginForm";
import { redirect } from "react-router";
import type { Route } from "./+types/login";
import { loginSchema } from "@hooks/auth/login.hook";
import z from "zod";

export default function Login() {
  return (
    <>
      <LoginForm></LoginForm>
    </>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const validForm = loginSchema.safeParse(payload);

  if (!validForm.success) {
    return { errors: z.flattenError(validForm.error) };
  }

  console.log(validForm);

  return redirect("/");
}
