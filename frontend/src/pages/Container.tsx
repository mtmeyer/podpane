import { useParams } from "@solidjs/router"
import { createWS } from "@solid-primitives/websocket";
import { createEventSignal } from "@solid-primitives/event-listener";
import { RestartIcon } from "../components/icons/Restart"
import { StartIcon } from "../components/icons/Start"
import { StopIcon } from "../components/icons/Stop"
import { getContainerDetails } from "../queries/getContainerDetails"
import { getStatusColour } from "../utils/status"
import { restartContainer, stopContainer } from "../queries/mutateContainer"
import { useQueryClient } from "@tanstack/solid-query"
import { createEffect, createMemo, createSignal } from "solid-js";
import { LogViewer } from "../components/LogViewer";
import { Card } from "../components/Card";

function Container() {
  const queryClient = useQueryClient()
  const params = useParams()
  const state = getContainerDetails()
  const { mutate: stopMutate } = stopContainer(queryClient)
  const { mutate: restartMutate } = restartContainer(queryClient)
  const [logs, setLogs] = createSignal<string[]>([])

  const ws = createMemo(() => createWS(`ws://localhost:3000/ws/${params.id}/logs`));
  const messages = createEventSignal(ws, "message");

  createEffect(() => {
    const messageEvent = messages();

    if (messageEvent) {
      setLogs(prev => [...prev, messageEvent.data]);
    }
  })

  createEffect(() => {
    const currentId = params.id;
    // Reset logs when ID changes
    setLogs([]);
    console.log(`Logs reset for ID: ${currentId}`);
  });

  if (state.isError) {
    return (
      <h1>Something went wrong...</h1>
    )
  }

  return (
    <div class="flex flex-col gap-6">
      <div class="flex flex-col">
        <div class="flex gap-4 items-center">
          <h2 class="mt-0 mb-0">{state?.data?.name.replace(/^\//i, "")}</h2>
          <div class={`badge badge-soft badge-${getStatusColour(state.data?.state)}`}>{state.data?.state}</div>
        </div>
        <p class="mt-0 mb-0"><span class="font-bold">Container ID:{" "}</span>{params.id}</p>
      </div>
      <div class="flex gap-2">
        <button disabled={state.data?.state === "running"} class="btn btn-lg btn-neutral" onClick={() => restartMutate()}><StartIcon /> Start</button>
        <button disabled={state.data?.state === "exited"} class="btn btn-lg btn-neutral" onClick={() => stopMutate()}><StopIcon /> Stop</button>
        <button class="btn btn-lg btn-neutral" onClick={() => restartMutate()}><RestartIcon /> Restart</button>
      </div>
      <Card>
        <h2 class="mt-0">Summary</h2>
        <table class="table mb-0">
          <tbody>
            <tr>
              <th>Image</th>
              <td>{state.data?.image}</td>
            </tr>
            <tr>
              <th>Command</th>
              <td>{state.data?.command}</td>
            </tr>
            <tr>
              <th>Created</th>
              <td>{state.data?.created}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{state.data?.status}</td>
            </tr>
            <tr>
              <th>Ports</th>
              <td class="flex flex-col gap-1">{state.data?.ports.map(port => <p class="mt-0 mb-0">{port}</p>)}</td>
            </tr>
          </tbody>
        </table>
      </Card>
      <LogViewer logs={logs()} />
    </div>
  )
}

export default Container
