import { lazy } from "solid-js";

export const routes = [{
  path: "/",
  component: lazy(() => import("./pages/Home")),
},
{
  path: "/container/:id",
  component: lazy(() => import("./pages/Container")),
}]
