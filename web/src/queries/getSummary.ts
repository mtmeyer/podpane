import { useQuery } from "@tanstack/solid-query"
import type { ContainerSummary } from "../types"
import { getServerUrl } from "../utils/getServerUrl"

export function getSummary() {
  return useQuery(() => ({
    queryKey: ["container-summary"],
    queryFn: async (): Promise<ContainerSummary> => {
      const response = await fetch(getServerUrl('/containers/summary'))
      return await response.json()
    },
    refetchInterval: 10000
  }))
}

