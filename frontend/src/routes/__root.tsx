import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="sticky bg-slate-600 top-0 h-10 flex items-center justify-center gap-3">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>
        <Link to="/expenses" className="[&.active]:font-bold">
          All Expense
        </Link>
      </div>
      <hr />
      <div className="h-[calc(100vh-41px)] flex justify-center items-center">
        <Outlet />
      </div>
    </>
  ),
});
