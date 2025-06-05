import { getSummary } from "../queries/getSummary"

function HomePage() {
  const state = getSummary()

  if (state.isError) {
    return (
      <h1>Something went wrong...</h1>
    )
  }

  if (state.isLoading) {
    return (
      <h1>Loading...</h1>
    )
  }

  return (
    <div>
      <h2 class="mt-0">Summary</h2>
      <section class="flex gap-8">
        <div class="stats shadow border border-neutral bg-base-200">
          <div class="stat">
            <div class="stat-title">All containers</div>
            <div class="stat-value text-primary">{state.data?.containerCount}</div>
          </div>
        </div>
        <div class="stats shadow border border-neutral bg-base-200">
          <div class="stat">
            <div class="stat-title">Running containers</div>
            <div class="stat-value text-secondary">{state.data?.runningCount}</div>
          </div>
        </div>
        <div class="stats shadow border border-neutral bg-base-200">
          <div class="stat">
            <div class="stat-title">Exited containers</div>
            <div class="stat-value text-accent">{state.data?.exitedCount}</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
