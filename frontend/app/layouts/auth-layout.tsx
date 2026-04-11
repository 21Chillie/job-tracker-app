import { Outlet } from "react-router";

export default function AuthLayout() {
  
  
  return (
    <>
      <div className="bg-base-100 flex min-h-screen w-screen flex-col">
        <main className="bg-base-200 m-3 grid flex-1 place-items-center rounded-lg">
          <Outlet></Outlet>
        </main>
      </div>
    </>
  );
}
