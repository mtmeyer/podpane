import { useQuery } from "@tanstack/solid-query"
import type { ContainerDetails } from "../types"
import { useParams } from "@solidjs/router"

export function getContainerDetails() {
  const params = useParams()
  return useQuery(() => ({
    queryKey: ["container-details", params.id],
    queryFn: async (): Promise<ContainerDetails> => {
      const response = await fetch(`http://localhost:3000/containers/${params.id}`)
      return await response.json()
    },
  }))
}

