import { House, TableOfContents, CirclePlus, User } from "lucide-react";

import { NavLink } from "react-router";

const navLinks = [
  {
    title: "manage jobs",
    links: [
      {
        id: "job-list",
        link: "job list",
        path: "/jobs",
        icon: <TableOfContents className="size-4" />,
      },
      {
        id: "add-job",
        link: "add job",
        path: "/add-job",
        icon: <CirclePlus className="size-4" />,
      },
    ],
  },

  {
    title: "settings",
    links: [
      {
        id: "profile",
        link: "profile",
        path: "/profile",
        icon: <User className="size-4" />,
      },
    ],
  },
];

export function SidebarNavLinks() {
  return (
    <>
      <nav className="flex-1 space-y-2 px-6 py-4">
        <ul className="space-y-6">
          <li>
            <NavLink
              className={({ isActive }) =>
                `btn btn-ghost btn-block flex items-center justify-start gap-2 px-0 transition-all duration-150 hover:px-4 ${isActive ? "btn-active px-3" : ""}`
              }
              to={"/"}
            >
              <span>
                <House className="size-4" />
              </span>
              <span className="font-medium">Home</span>
            </NavLink>
          </li>

          {navLinks.map((link) => {
            const { title, links } = link;
            return (
              <li key={title} className="space-y-1">
                <p className="text-base-content/60 text-sm font-medium capitalize">
                  {title}
                </p>

                <div>
                  {links.map((item) => {
                    const { id, link, path, icon } = item;
                    return (
                      <NavLink
                        key={id}
                        to={path}
                        className={({ isActive }) =>
                          `btn btn-ghost btn-block flex items-center justify-start gap-2 px-0 transition-all duration-150 hover:px-4 ${isActive ? "btn-active px-3" : ""}`
                        }
                      >
                        <span>{icon}</span>
                        <span className="font-medium capitalize">{link}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
