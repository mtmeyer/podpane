import env from "../env"

export function getServerUrl(path?: string, protocol?: "http" | "ws") {
  const url = new URL(window.location.href)

  const modifiedPath = path?.indexOf("/") === 0 ? path.substring(1) : path

  return new URL(`${protocol === "ws" ? "ws://" : url.protocol}${url.hostname}:${env.VITE_SERVER_PORT || "3000"}/${modifiedPath}`).href
}
