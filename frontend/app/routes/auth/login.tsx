import LoginForm from "~/components/auth-page/LoginForm";
import authService from "@services/auth.service";
import toast from "react-hot-toast";
import { redirect } from "react-router";
import type { Route } from "./+types/login";

export default function Login() {
  return (
    <>
      <LoginForm></LoginForm>
    </>
  );
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const payload = Object.fromEntries(formData) as {
    email: string;
    password: string;
  };

  try {
    await authService.loginEmail(payload);

    return redirect("/");
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "An unexpected error occurred when trying to login with email";

    toast.error(errorMessage);
    return { error: errorMessage };
  }
}
