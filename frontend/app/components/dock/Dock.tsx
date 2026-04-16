import { LuTableOfContents, LuUser, LuHouse } from "react-icons/lu";
import { IoIosAddCircleOutline } from "react-icons/io";
import { NavLink } from "react-router";

const dockNavLink = [
  { id: "home", link: "home", path: "/", icon: <LuHouse /> },
  {
    id: "job-list",
    link: "job list",
    path: "/jobs",
    icon: <LuTableOfContents />,
  },
  {
    id: "add-job",
    link: "add job",
    path: "/add-job",
    icon: <IoIosAddCircleOutline />,
  },

  { id: "profile", link: "profile", path: "/profile", icon: <LuUser /> },
];

export default function Dock() {
  return (
    <>
      <aside className="block md:hidden mt-12 sm:mt-16">
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
