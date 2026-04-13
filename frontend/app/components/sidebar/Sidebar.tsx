import { LuBriefcase } from "react-icons/lu";
import { Link } from "react-router";
import { SidebarNavLinks } from "./SidebarLinks";

export default function Sidebar() {
  return (
    <>
      <aside className="hidden max-w-48 flex-col md:flex">
        <header className="px-6 py-4">
          <Link to={"/"} className="flex items-center gap-2">
            <div className="bg-primary text-primary-content grid size-8 place-items-center rounded-lg">
              <LuBriefcase className="size-5" />
            </div>
            <h4 className="text-lg font-bold">Job Tracker</h4>
          </Link>
        </header>

        <SidebarNavLinks />
      </aside>
    </>
  );
}
