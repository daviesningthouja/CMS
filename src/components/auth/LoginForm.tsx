"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/Button/button"; // Standardized the import path alias
import { Input } from "@/components/ui/Input/input";
import { loginAction } from "@/lib/auth-action";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handlesubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await loginAction({
        email,
        password,
      });

      if (response.success) {
        router.push("/dashboard");
      } else {
        // Fallback error if the action returns success: false without throwing
        setError("Invalid email or password.");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong securely connecting to the server.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handlesubmit} className="flex w-full flex-col space-y-5">
      <div className="space-y-4">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="manager@cafe.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        
        <div className="space-y-1">
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isLoading}
            required
          />
          <div className="flex justify-end">
            <a 
              href="#" 
              className="text-xs font-medium text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-app border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full pt-2"
      >
        {isLoading ? "Authenticating..." : "Sign In"}
      </Button>
    </form>
  );
}