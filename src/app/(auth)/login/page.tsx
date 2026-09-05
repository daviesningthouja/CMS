import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary/30 p-4 sm:p-24">
      <div className="w-full max-w-md space-y-8 rounded-app border border-border bg-background p-8 shadow-sm">
        
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-2xl">
            ☕
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              CafeManager Portal
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access the management dashboard.
            </p>
          </div>
        </div>

        {/* Form Section */}
        <LoginForm />
        
      </div>
    </main>
  );
}