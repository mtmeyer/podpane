import type { JSX } from "solid-js";

export function Card(props: { children: JSX.Element }) {
  return <div class="border border-neutral shadow rounded-md p-6 bg-base-200">{props.children}</div>
}
