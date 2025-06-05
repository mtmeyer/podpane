import { useParams } from "@solidjs/router"
import { RestartIcon } from "../components/icons/Restart"
import { StartIcon } from "../components/icons/Start"
import { StopIcon } from "../components/icons/Stop"
import { getContainerDetails } from "../queries/getContainerDetails"
import { getStatusColour } from "../utils/status"

function Container() {
  const params = useParams()
  const state = getContainerDetails()

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
        <button class="btn btn-lg btn-neutral"><StartIcon /> Start</button>
        <button class="btn btn-lg btn-neutral"><StopIcon /> Stop</button>
        <button class="btn btn-lg btn-neutral"><RestartIcon /> Restart</button>
      </div>
      <div class="border border-neutral shadow rounded-md p-6 bg-base-200">
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
      </div>
    </div>
  )
}

export default Container
