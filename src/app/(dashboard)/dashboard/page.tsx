export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Here&apos;s what&apos;s happening with your cafe.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Products"
          value="0"
        />

        <DashboardCard
          title="Orders"
          value="0"
        />

        <DashboardCard
          title="Tables"
          value="0"
        />

        <DashboardCard
          title="Revenue"
          value="₹0"
        />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
}

function DashboardCard({
  title,
  value,
}: DashboardCardProps) {
  return (
    <div className="rounded-app border bg-background p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}