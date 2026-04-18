import { checkAuth } from "@middlewares/check-auth.middleware";
import {
  authLimiter,
  generalLimiter,
} from "@middlewares/rateLimiter.middleware";
import { auth } from "@utils/auth";
import { Hono } from "hono";

const authRoute = new Hono();

authRoute.use("/sign-up/*", authLimiter);
authRoute.use("/sign-in/*", authLimiter);
authRoute.use("/get-session", checkAuth, generalLimiter);

authRoute.on(["POST", "GET"], "/*", (c) => auth.handler(c.req.raw));

export default authRoute;
