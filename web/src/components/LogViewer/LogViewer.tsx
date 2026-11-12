import { Card } from "../Card"
import dayjs from 'dayjs'
import { DownIcon } from "../icons/Down";

type LogViewerProps = {
  logs: string[]
}

export function LogViewer(props: LogViewerProps) {
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
        <button class="btn btn-neutral" onClick={scrollToBottom} disabled={props.logs.length === 0}>Scroll to bottom <DownIcon /></button>
      </div>
      <div class="h-[500px] overflow-scroll" ref={container}>
        <LogLine lineNumber={1} log={`2025/06/16 06:53:31.422 [34mINFO[0m http.log.access.log0 handled request {"request": {"remote_ip": "192.168.1.171", "remote_port": "62534", "client_ip": "192.168.1.171", "proto": "HTTP/2.0", "method": "POST", "host": "hass.pickles.website", "uri": "/api/webhook/c55b520360ead556468c418015965b0a91cd31c187ad6df3f4ae011f5465b884", "headers": {"Upload-Draft-Interop-Version": ["6"], "Upload-Complete": ["?1"], "Cache-Control": ["no-cache"], "Accept": ["/"], "Content-Type": ["application/json"], "User-Agent": ["Home Assistant/2025.5 (io.robbie.HomeAssistant; build:2025.1264; iOS 18.5.0)"], "Content-Length": ["376"], "Accept-Language": ["en-AU,en;q=0.9"], "Accept-Encoding": ["gzip, deflate, br"]}, "tls": {"resumed": false, "version": 772, "cipher_suite": 4865, "proto": "h2", "server_name": "hass.pickles.website"}}, "bytes_read": 376, "user_id": "", "duration": 0.002399319, "size": 16, "status": 400, "resp_headers": {"Server": ["Python/3.13 aiohttp/3.11.11"], "Content-Type": ["text/plain; charset=utf-8"], "Content-Length": ["16"], "Date": ["Mon, 16 Jun 2025 06:53:31 GMT"], "Via": ["1.1 Caddy"], "Alt-Svc": ["h3=\":443\"; ma=2592000"]}}
`} />
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
      <div class="pr-4 my-auto w-full break-all color-base-content">{message}</div>
    </div>
  )
}
