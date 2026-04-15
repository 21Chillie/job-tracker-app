import { Hono } from "hono";
import { checkAuth } from "@middlewares/check-auth.middleware";
import { Variables } from "~/types/global.types";
import { zValidator } from "@hono/zod-validator";
import { JobFormSchema } from "~/types/jobs.types";
import { HTTPException } from "hono/http-exception";
import { jobsController } from "@controllers/jobs.controller";

// Base url is /api/jobs

const jobsRoute = new Hono<{ Variables: Variables }>();

jobsRoute.use("*", checkAuth);

// For testing
jobsRoute.get("/", (c) => {
  const user = c.get("user");

  return c.json({ message: "Hello from jobs route!", user: user.id });
});

jobsRoute.post(
  "/",
  zValidator("json", JobFormSchema, (result) => {
    if (!result.success) {
      throw new HTTPException(400, { message: result.error.message });
    }
  }),
  jobsController.create,
);

export default jobsRoute;
