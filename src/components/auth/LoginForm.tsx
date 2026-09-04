"use client";

import { useState, type SubmitEvent } from "react";

import { Button } from "../ui/Button/button";
import { Input } from "@/components/ui/Input/input";
import { login } from "@/lib/api";
import { saveAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handlesubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("FORM SUBMITTED");

    setError("");
    setIsLoading(true);

    try {
      const response = await login({
        email,
        password,
      });

      if(response){
        saveAuth(
          response.data.jwt,
          {
            id: response.data.id,
            email: response.data.email,
            full_name: response.data.full_name,
            //phone: response.data.phone,
            role: response.data.role,
          }
        )
      }

      console.log("Login successful:", response);

      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong...");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form 
        onSubmit={handlesubmit}
        className="flex w-full flex-col gap-5"
         
    >
        <Input
          id="email"
          label="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          required
        />
        <label htmlFor="password"></label>
        <Input
            id="password"
            label="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) =>
            setPassword(event.target.value)
            }
            disabled={isLoading}
            required
        >
        </Input>

        {error && (
            <p className="rounded-app bg-danger/10 px-3 py-2 text-sm text-danger">
                {error}
            </p>
        )}

        <Button
            type="submit"
            disabled={isLoading}
            className="w-full"

        >
            {isLoading ? "Logging in...." : "Login"}
        </Button>
    </form>
  );
}
