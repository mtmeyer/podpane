export function getStatusColour(state?: "exited" | "running") {
  switch (state) {
    case "exited":
      return 'error'
    case "running":
      return 'success'
    default:
      return 'primary'
  }
}

