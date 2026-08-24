import { checkSessionRedirect } from "@/services/auth/auth-session.server";

export default async function DashboardPage() {
  const {
    user: { name },
  } = await checkSessionRedirect();

  return <div>Welcome, {name}</div>;
}
