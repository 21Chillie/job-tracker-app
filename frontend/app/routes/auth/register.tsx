import RegisterForm from "@components/RegisterForm";
import type { Route } from "./+types/register";
import { registerSchema } from "~/hooks/auth/register.hook";
import z from "zod";
import { redirect } from "react-router";

export default function Register() {
  return (
    <>
      <RegisterForm></RegisterForm>
    </>
  );
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData);

  const validForm = registerSchema.safeParse(payload);

  if (!validForm.success) {
    return { errors: z.flattenError(validForm.error) };
  }

  console.log(validForm);

  return redirect("/");
}
