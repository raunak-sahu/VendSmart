"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("role", data.user.role);

        router.push("/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : String(err);

      console.error(err);

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950 px-4">

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl border border-slate-200 dark:border-slate-800"
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Login
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Welcome back to VendSmart
        </p>

        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          disabled={loading}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-6 w-full rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          disabled={loading}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-4 w-full rounded-xl border border-slate-300 bg-white p-3 outline-none focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-semibold text-indigo-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </form>

    </div>
  );
}