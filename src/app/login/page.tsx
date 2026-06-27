"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        "/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data =
        await res.json();

      if (res.ok) {
        console.log(
          "COOKIE AFTER SET:",
          document.cookie
        );

        localStorage.setItem(
          "role",
          data.user.role
        );

        window.location.href =
          "/dashboard";
      } else {
        setError(
          data.error || "Login failed"
        );
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(
        "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold">
          Login
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome to VendSmart
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {error}
          </div>
        )}

        <input
          placeholder="Email"
          className="mt-6 w-full rounded-xl border p-3"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          className="mt-4 w-full rounded-xl border p-3"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          disabled={loading}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </div>

    </div>
  );
}