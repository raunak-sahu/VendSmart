"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

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

      if (!res.ok) {
        setError(
          data.error ||
            "Invalid credentials"
        );
        return;
      }

      localStorage.setItem(
        "role",
        data.user.role
      );

      router.push(
        "/dashboard"
      );

      router.refresh();
    } catch (err) {
      console.log(err);

      setError(
        "Unable to login"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-slate-100
      dark:bg-slate-950
      px-4
    "
    >
      <form
        onSubmit={handleLogin}
        className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        bg-white
        dark:bg-slate-900
        p-8
        shadow-2xl
      "
      >
        <h1
          className="
          text-4xl
          font-black
          text-slate-900
          dark:text-white
        "
        >
          Welcome Back
        </h1>

        <p
          className="
          mt-2
          text-slate-500
          dark:text-slate-400
        "
        >
          Login to continue to
          VendSmart
        </p>

        {error && (
          <div
            className="
            mt-5
            rounded-xl
            bg-red-50
            dark:bg-red-500/10
            p-4
            text-red-600
          "
          >
            {error}
          </div>
        )}

        <div className="relative mt-6">
          <Mail
            size={18}
            className="
            absolute
            left-4
            top-4
            text-slate-400
          "
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            placeholder="Email"
            className="
            w-full
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            py-3
            pl-11
            pr-4
            text-slate-900
            dark:text-white
            outline-none
            focus:border-indigo-500
          "
          />
        </div>

        <div className="relative mt-4">
          <Lock
            size={18}
            className="
            absolute
            left-4
            top-4
            text-slate-400
          "
          />

          <input
            type="password"
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Password"
            className="
            w-full
            rounded-2xl
            border
            border-slate-300
            dark:border-slate-700
            bg-white
            dark:bg-slate-800
            py-3
            pl-11
            pr-4
            text-slate-900
            dark:text-white
            outline-none
            focus:border-indigo-500
          "
          />
        </div>

        <button
          disabled={loading}
          className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-indigo-600
          py-3
          font-bold
          text-white
          transition
          hover:bg-indigo-700
          disabled:opacity-60
        "
        >
          {loading ? (
            <>
              <Loader2
                className="animate-spin"
                size={18}
              />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p
          className="
          mt-6
          text-center
          text-sm
          text-slate-500
          dark:text-slate-400
        "
        >
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="
            font-semibold
            text-indigo-600
          "
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}