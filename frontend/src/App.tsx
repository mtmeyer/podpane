import { QueryClient, QueryClientProvider } from '@tanstack/solid-query'
import { Router } from '@solidjs/router'
import GlobalLayout from './layouts/GlobalLayout'
import { routes } from './routes'
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router root={GlobalLayout}>{routes}</Router>
      <SolidQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
