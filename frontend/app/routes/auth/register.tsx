import RegisterForm from "@components/RegisterForm";
import type { Route } from "./+types/register";
import { authSchema } from "~/types/auth.type";
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

  const validForm = authSchema.safeParse(payload);

  if (!validForm.success) {
    return { errors: z.treeifyError(validForm.error) };
  }

  return redirect("/");
}
