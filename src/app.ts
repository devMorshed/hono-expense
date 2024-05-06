import { Hono } from "hono";
import { logger } from "hono/logger";
import { testRoute } from "./routes/test";
import { expensesRoute } from "./routes/expenses";

const app = new Hono();

app.use("*", logger());

app.get("/", (c) => {
  return c.json({
    message: "Welcome to expense-tracker server",
  });
});

app.route("/api/v1/test", testRoute);
app.route("/api/v1/expenses", expensesRoute);

export default app;
