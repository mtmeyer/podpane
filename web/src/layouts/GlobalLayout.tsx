import { A, useMatch } from "@solidjs/router";
import { getSummary } from "../queries/getSummary";
import { createSignal, type JSX } from "solid-js";
import { effect } from "solid-js/web";
import { getStatusColour } from "../utils/status";

function GlobalLayout(props: { children: JSX.Element }) {
  const state = getSummary()
  const [selectedContainer, setSelectedContainer] = createSignal<string | undefined>();
  const isContainerDetails = useMatch(() => "/container/:id");

  effect(() => {
    if (isContainerDetails()) {
      setSelectedContainer(isContainerDetails()?.params.id || undefined)
    }
  })


  return (
    <div class="flex flex-col w-full prose max-w-none min-h-screen h-full">
      <header class="pl-6 pt-5">
        <A href="/" class="no-underline hover:underline"><h1 class="w-fit">Docker manager</h1></A>
      </header>
      <div class="flex flex-1 w-full gap-8">
        <ul class="flex flex-col p-0 my-0 max-w-[280px] w-full px-4 border-r border-neutral h-full grow font-bold">
          {state.data && state.data.containers.map(item => (
            <li class="list-none p-0">
              <A href={`/container/${item.id}`} class={`btn ${item.id !== selectedContainer() && 'btn-soft'} btn-secondary btn-wide`}>
                <div aria-label="status" class={`status status-${getStatusColour(item.state)}`}></div>
                {item.name.replace(/^\//i, "")}
              </A>
            </li>
          ))}
        </ul>
        <main class="flex">
          {props.children}
        </main>
      </div>
    </div>
  )
}

export default GlobalLayout
