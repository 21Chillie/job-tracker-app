import { useNavigation } from "react-router";
import { Outlet } from "react-router";

export default function AuthLayout() {
  const navigation = useNavigation();
  const pageIsLoading = navigation.state === "loading";

  return (
    <>
      <div className="bg-base-100 flex min-h-screen w-screen flex-col">
        <main className="bg-base-200 m-3 grid flex-1 place-items-center rounded-xl">
          {pageIsLoading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            <Outlet></Outlet>
          )}
        </main>
      </div>
    </>
  );
}
