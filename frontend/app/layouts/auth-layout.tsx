import { useNavigation } from "react-router";
import { Outlet } from "react-router";

export default function AuthLayout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  if (isNavigating) {
    return (
      <>
        <div className="bg-base-100 grid min-h-screen w-screen flex-col place-items-center">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="bg-base-100 flex min-h-screen w-screen flex-col">
        <main className="bg-base-200 m-3 grid flex-1 place-items-center rounded-xl">
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
}
