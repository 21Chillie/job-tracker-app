import {
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
  },
  {
    label: "Manage Jobs",
    icon: CircleUserRound,
    children: ["Job list", "Add jobs"],
  },
  {
    label: "Resume",
    icon: FileText,
  },
  {
    label: "Tasks",
    icon: ListTodo,
  },
  {
    label: "Notes",
    icon: NotebookTabs,
  },
] satisfies {
  label: string;
  icon: typeof CircleUserRound;
  children?: string[];
}[];
