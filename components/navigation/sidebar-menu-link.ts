import {
  Briefcase,
  CircleUserRound,
  FileText,
  LayoutGrid,
  ListTodo,
  NotebookTabs,
} from "lucide-react";

export const destinations = [
  {
    label: "Dashboard",
    icon: LayoutGrid,
    href: "/dashboard",
  },
  {
    label: "Manage Jobs",
    icon: Briefcase,
    children: [
      { label: "Job list", href: "/dashboard/jobs" },
      { label: "Add jobs", href: "/dashboard/jobs/new" },
    ],
  },
  {
    label: "Resume",
    icon: FileText,
    href: "/dashboard/resume",
  },
  {
    label: "Tasks",
    icon: ListTodo,
    href: "/dashboard/tasks",
  },
  {
    label: "Notes",
    icon: NotebookTabs,
    href: "/dashboard/notes",
  },
] satisfies {
  label: string;
  href?: string;
  icon: typeof CircleUserRound;
  children?: { label: string; href?: string }[];
}[];
