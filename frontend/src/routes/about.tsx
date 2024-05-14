import { createRoute } from "@tanstack/react-router";

export const Route = createRoute("/about")({
  component: About,
});

function About() {
  return <div className="p-2">Hello from About!</div>;
}
