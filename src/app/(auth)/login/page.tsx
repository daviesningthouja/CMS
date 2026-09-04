import {LoginForm} from "@/components/auth/LoginForm";
export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Login</h1>
      <p>Login to your cafe management account.</p>
      <LoginForm />

    </main>
  );
}
