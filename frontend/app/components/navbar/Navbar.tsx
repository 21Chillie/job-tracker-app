import ProfileDropdownMenu from "./ProfileDropdownMenu";

export default function Navbar() {
  return (
    <>
      <header className="bg-base-100 hidden shrink-0 items-center justify-end p-3 md:flex md:p-4">
        <div className="flex items-center gap-4">
          <button className="btn btn-ghost btn-sm">Dashboard</button>
          <a
            href="https://github.com/21Chillie/job-tracker-app"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
          >
            Documentations
          </a>

          <ProfileDropdownMenu></ProfileDropdownMenu>
        </div>
      </header>
    </>
  );
}
