import RegisterForm from "~/components/auth-page/RegisterForm";
import authService from "@services/auth.service";
import toast from "react-hot-toast";
import { redirect } from "react-router";
import type { Route } from "./+types/register";

export default function Register() {
  return (
    <>
      <RegisterForm></RegisterForm>
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as {
    name: string;
    email: string;
    password: string;
  };

  try {
    await authService.registerEmail(payload);

    return redirect("/");
  } catch (err) {
    const errorMessage =
      err instanceof Error
        ? err.message
        : "An unexpected error occurred when trying to register with email";

    toast.error(errorMessage);
    return { error: errorMessage };
  }
}
