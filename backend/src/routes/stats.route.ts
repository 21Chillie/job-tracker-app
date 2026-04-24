import { statsController } from "@controllers/stats.controller";
import { checkAuth } from "@middlewares/check-auth.middleware";
import { generalLimiter } from "@middlewares/rateLimiter.middleware";
import { Hono } from "hono";
import { Variables } from "~/types/global.types";

const statsRoute = new Hono<{ Variables: Variables }>();

statsRoute.use("/*", checkAuth, generalLimiter);

statsRoute.get("/", statsController.totalJobsPerWeek);

export default statsRoute;
