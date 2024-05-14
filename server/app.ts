import { Hono } from "hono";
import { logger } from "hono/logger";
import { testRoute } from "./routes/test";
import { expensesRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono();

app.use("*", logger());

const apiRoutes = app
  .basePath("/api")
  .route("/test", testRoute)
  .route("/expenses", expensesRoute);

app.get("/*", serveStatic({ root: "./frontend/dist" }));
app.get("/*", serveStatic({ root: "./frontend/dist/index.html" }));

export default app;

export type ApiRoutes = typeof apiRoutes;
