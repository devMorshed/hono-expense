import app from "./src/app";

Bun.serve({
  port: process.env.PORT || 3000,
  hostname: "",
  fetch: app.fetch,
});

console.log(` ⚙️  Server is running at ${process.env.PORT}... `);
