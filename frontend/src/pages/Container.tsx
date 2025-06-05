import { RestartIcon } from "../components/icons/Restart"
import { StartIcon } from "../components/icons/Start"
import { StopIcon } from "../components/icons/Stop"

function Container() {
  return (
    <div class="flex flex-col gap-6">
      <div class="flex flex-col">
        <div class="flex gap-4 items-center">
          <h2 class="mt-0 mb-0">Container name</h2>
          <div class="badge badge-soft badge-success">Running</div>
        </div>
        <p class="mt-0 mb-0"><span class="font-bold">Container ID:{" "}</span>234832dfsa8r238f8389</p>
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
              <td>nginx:latest</td>
            </tr>
            <tr>
              <th>Command</th>
              <td>npm run start</td>
            </tr>
            <tr>
              <th>Created</th>
              <td>4 mins ago</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>Up 29 seconds</td>
            </tr>
            <tr>
              <th>Ports</th>
              <td>80:80</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Container
