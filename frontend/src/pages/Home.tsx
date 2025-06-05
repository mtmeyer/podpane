function HomePage() {
  return (
    <div>
      <h2 class="mt-0">Summary</h2>
      <section class="flex gap-8">
        <div class="stats shadow border border-neutral bg-base-200">
          <div class="stat">
            <div class="stat-title">All containers</div>
            <div class="stat-value text-primary">21</div>
          </div>
        </div>
        <div class="stats shadow border border-neutral bg-base-200">
          <div class="stat">
            <div class="stat-title">Running containers</div>
            <div class="stat-value text-secondary">19</div>
          </div>
        </div>
        <div class="stats shadow border border-neutral bg-base-200">
          <div class="stat">
            <div class="stat-title">Exited containers</div>
            <div class="stat-value text-accent">4</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
