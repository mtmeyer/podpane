import { useQuery } from "@tanstack/solid-query"
import type { ContainerSummary } from "../types"

export function getSummary() {
  return useQuery(() => ({
    queryKey: ["container-summary"],
    queryFn: async (): Promise<ContainerSummary> => {
      const response = await fetch('http://localhost:3000/containers/summary')
      return await response.json()
    },
    refetchInterval: 10000
  }))
}

