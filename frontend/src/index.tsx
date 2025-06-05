/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import { routes } from "./routes";
import GlobalLayout from "./layouts/GlobalLayout";
import './index.css'

const wrapper = document.getElementById("root");

if (!wrapper) {
  throw new Error("Wrapper div not found");
}

render(() => <Router root={GlobalLayout}>{routes}</Router>, wrapper)
