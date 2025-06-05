import { A } from "@solidjs/router";

function GlobalLayout(props) {
  return (
    <div class="flex flex-col w-full prose max-w-none min-h-screen h-full">
      <header class="pl-6 pt-5">
        <h1>Docker manager</h1>
      </header>
      <div class="flex flex-1 w-full gap-8">
        <ul class="flex flex-col p-0 my-0 max-w-[280px] w-full px-4 border-r border-neutral h-full grow font-bold">
          <li class="list-none p-0"><A href="/container/123" class="btn btn-soft btn-secondary btn-wide"><div aria-label="status" class="status status-primary"></div>Container 1</A></li>
          <li class="list-none p-0"><A href="/container/123" class="btn btn-soft btn-secondary btn-wide"><div aria-label="status" class="status status-primary"></div>Container 2</A></li>
          <li class="list-none p-0"><A href="/container/123" class="btn btn-soft btn-secondary btn-wide"><div aria-label="status" class="status status-primary"></div>Container 3</A></li>
        </ul>
        <main class="flex">
          {props.children}
        </main>
      </div>
    </div>
  )
}

export default GlobalLayout
