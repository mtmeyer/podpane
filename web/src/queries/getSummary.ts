import { useQuery } from "@tanstack/solid-query"
import type { ContainerSummary } from "../types"
import env from "../env"

export function getSummary() {
  return useQuery(() => ({
    queryKey: ["container-summary"],
    queryFn: async (): Promise<ContainerSummary> => {
      const response = await fetch(`${env.VITE_API_URL}/containers/summary`)
      return await response.json()
    },
    refetchInterval: 10000
  }))
}

