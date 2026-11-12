import { useQuery } from "@tanstack/solid-query"
import type { ContainerDetails } from "../types"
import { useParams } from "@solidjs/router"
import { getServerUrl } from "../utils/getServerUrl"

export function getContainerDetails() {
  const params = useParams()
  return useQuery(() => ({
    queryKey: ["container-details", params.id],
    queryFn: async (): Promise<ContainerDetails> => {
      const response = await fetch(getServerUrl(`/containers/${params.id}`))
      return await response.json()
    },
    refetchInterval: 10000
  }))
}

