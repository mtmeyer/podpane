import { Card } from "../Card"
import dayjs from 'dayjs'
import { DownIcon } from "../icons/Down";

type LogViewerProps = {
  logs: string[]
}

export function LogViewer(props: LogViewerProps) {
  console.log("rerender")
  let container: HTMLDivElement | undefined;

  const scrollToBottom = () => {
    if (!container || !container.lastElementChild) {
      return
    }
    container.lastElementChild.scrollIntoView()
  }

  return (
    <Card>
      <div class="flex justify-between">
        <h2 class="mt-0">Container logs</h2>
        <button class="btn btn-neutral" onClick={scrollToBottom}>Scroll to bottom <DownIcon /></button>
      </div>
      <div class="h-[500px] overflow-scroll" ref={container}>
        {props.logs.map((log, i) => <LogLine log={log} lineNumber={i + 1} />)}
      </div>
    </Card >
  )
}

function LogLine(props: { log: string, lineNumber: number }) {
  const firstSpaceIndex = props.log.indexOf(' ');
  const timestamp = dayjs(props.log.slice(0, firstSpaceIndex)).format('YYYY-mm-DD HH:MM:ss')
  const message = props.log.slice(firstSpaceIndex + 1);

  return (
    <div class="flex gap-4 w-full hover:bg-base-300">
      <div class="border-r border-neutral py-2 w-16 flex justify-center">{props.lineNumber}</div>
      <div class="my-auto w-max kbd">{timestamp}</div>
      <div class="pr-4 my-auto w-max color-base-content">{message}</div>
    </div>
  )
}
