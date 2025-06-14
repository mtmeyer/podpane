import { lazy } from "solid-js";

export const routes = {
  path: "/",
  component: lazy(() => import("./routes/index")),
}
