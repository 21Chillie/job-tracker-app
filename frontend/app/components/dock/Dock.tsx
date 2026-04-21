import { CirclePlus, House, TableOfContents, User } from "lucide-react";
import { NavLink } from "react-router";

const dockNavLink = [
  { id: "home", link: "home", path: "/", icon: <House /> },
  {
    id: "job-list",
    link: "job list",
    path: "/jobs",
    icon: <TableOfContents />,
  },
  {
    id: "add-job",
    link: "add job",
    path: "/add-job",
    icon: <CirclePlus />,
  },

  { id: "profile", link: "profile", path: "/profile", icon: <User /> },
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
