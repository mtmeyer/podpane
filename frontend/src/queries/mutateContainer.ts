import { useParams } from "@solidjs/router";
import { QueryClient, useMutation } from "@tanstack/solid-query";
import env from "../env";

export function stopContainer(queryClient: QueryClient) {
  const params = useParams()
  return useMutation(() => ({
    mutationKey: ['container-details', params.id, 'stop'],
    mutationFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/containers/${params.id}/stop`, {
        method: "POST"
      })
      if (response.ok) {
        return
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['container-details', params.id] })
    },
  }))
}

export function restartContainer(queryClient: QueryClient) {
  const params = useParams()
  return useMutation(() => ({
    mutationKey: ['container-details', params.id, 'restart'],
    mutationFn: async () => {
      const response = await fetch(`${env.VITE_API_URL}/containers/${params.id}/restart`, {
        method: "POST"
      })
      if (response.ok) {
        return
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['container-details', params.id] })
    },
  }))
}
