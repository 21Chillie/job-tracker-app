import { checkSessionRedirect } from "@/services/auth/auth-session.server";

export default async function DashboardPage() {
  const session = await checkSessionRedirect();

  return <div>Welcome, {session.name}</div>;
}
