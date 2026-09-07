import Link from "next/link";

import { HealthService } from "@/lib/api";

export default async function HomePage() {
  let isBackendHealthy = false;

  try {
    const response = await HealthService.check();
    isBackendHealthy = response.success;
  } catch {
    isBackendHealthy = false;
  }
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-background/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-lg font-bold">☕ CafeFlow</h1>

            <p className="text-xs text-muted-foreground">
              Cafe Management System
            </p>
          </div>

          <Link
            href="/login"
            className="rounded-app bg-primary-home px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full bg-secondary-home px-3 py-1.5 text-xs font-medium text-secondary-foreground">
              ☕ Made for modern cafes
            </div>

            <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Run your cafe
              <span className="text-primary"> smarter.</span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Manage your products, categories, branches, tables and daily
              operations from one simple management system.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/login"
                className="rounded-app bg-primary-home px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Go to Dashboard
              </Link>

              <a
                href="#features"
                className="rounded-app border bg-background px-5 py-3 text-sm font-semibold hover:bg-muted"
              >
                Explore Features
              </a>
            </div>
          </div>

          {/* Cafe visual */}
          <div className="relative">
            <div className="rounded-3xl border bg-secondary-home p-8 shadow-sm">
              <div className="rounded-2xl border bg-background p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Today&apos;s overview
                    </p>

                    <p className="mt-1 text-xl font-bold">Good morning ☀️</p>
                  </div>

                  <div className="text-4xl">☕</div>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-3">
                  <StatCard label="Orders" value="128" />

                  <StatCard label="Revenue" value="₹24.8K" />

                  <StatCard label="Products" value="42" />

                  <StatCard label="Tables" value="18" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-20 -right-0 hidden rounded-2xl border bg-background px-5 py-4 shadow-lg sm:block">
              <p className="text-xs text-muted-foreground">System status</p>

              <p className="mt-1 flex items-center gap-2 text-sm font-semibold">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isBackendHealthy ? "bg-success" : "bg-danger"
                  }`}
                />

                {isBackendHealthy
                  ? "All systems operational"
                  : "Backend currently unavailable"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-y bg-muted/50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-primary">
              Everything in one place
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              Built for cafe operations
            </h3>

            <p className="mt-4 text-muted-foreground">
              Keep your daily cafe management simple, organized and efficient.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <FeatureCard
              icon="☕"
              title="Products"
              description="Manage your menu items, pricing, availability and product information."
            />

            <FeatureCard
              icon="🏪"
              title="Branches"
              description="Keep multiple cafe branches organized from one management system."
            />

            <FeatureCard
              icon="📊"
              title="Operations"
              description="Keep track of your cafe's tables, orders and daily activity."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 CafeFlow</p>

          <p>Cafe Management System</p>
        </div>
      </footer>
    </main>
  );
}

interface StatCardProps {
  label: string;
  value: string;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-xl font-bold">{value}</p>
    </div>
  );
}

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl border bg-background p-6 transition hover:-translate-y-1 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-home text-xl">
        {icon}
      </div>

      <h4 className="mt-5 text-lg font-semibold">{title}</h4>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
