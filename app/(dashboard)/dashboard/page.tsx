import { checkSession } from "@/services/auth/session.server";

export default async function DashboardPage() {
  const {
    user: { name },
  } = await checkSession();

  return <div>Welcome, {name}</div>;
}
