import { CirclePlus, House, TableOfContents, User } from "lucide-react";
import { NavLink } from "react-router";

const dockNavLink = [
  { id: "home", link: "home", path: "/", icon: <House className="size-4 text-base-content"/> },
  {
    id: "job-list",
    link: "job list",
    path: "/jobs",
    icon: <TableOfContents className="size-4 text-base-content"/>,
  },
  {
    id: "add-job",
    link: "add job",
    path: "/add-job",
    icon: <CirclePlus className="size-4 text-base-content"/>,
  },

  { id: "profile", link: "profile", path: "/profile", icon: <User className="size-4 text-base-content"/> },
];

export default function Dock() {
  return (
    <>
      <aside className="mt-12 block sm:mt-16 md:hidden">
        <nav className="dock dock-md">
          {dockNavLink.map((item) => {
            const { id, link, path, icon } = item;

            return (
              <NavLink
                to={path}
                key={id}
                className={({ isActive }) => (isActive ? "dock-active" : "")}
              >
                <span>{icon}</span>
                <span className="dock-label capitalize">{link}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
