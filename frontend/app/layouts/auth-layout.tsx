import { useNavigation } from "react-router";
import { Outlet } from "react-router";
import { FaGithub } from "react-icons/fa";

export default function AuthLayout() {
  const navigation = useNavigation();
  const pageIsLoading = navigation.state === "loading";

  if (pageIsLoading) {
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

        <div className="fixed right-6 bottom-6">
          <a
            role="link"
            href="https://github.com/21Chillie/job-tracker-app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-soft btn-circle group"
          >
            <span>
              <FaGithub className="text-base-content/70 group-hover:text-base-content size-5 transition-colors" />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
