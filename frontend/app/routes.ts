import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/auth-layout.tsx", [
    route("login", "./routes/auth/login.tsx"),
    route("register", "./routes/auth/register.tsx"),
  ]),

  route("/", "./layouts/dashboard-layout.tsx", [index("./routes/home.tsx")]),
] satisfies RouteConfig;
