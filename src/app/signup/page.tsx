"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import Link from "next/link";

export default function SignupPage() {
  const router =
    useRouter();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [form, setForm] =
    useState({
      name: "",
      companyName: "",
      email: "",
      password: "",
    });

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      setLoading(true);

      setError("");

      const res =
        await fetch(
          "/api/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify(
              form
            ),
          }
        );

      const data =
        await res.json();

      if (!res.ok) {
        setError(
          data.error
        );

        setLoading(false);

        return;
      }

      router.push(
        "/login"
      );
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
        onSubmit={
          handleSubmit
        }
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
          text-center
          text-4xl
          font-black
          text-slate-900
          dark:text-white
        "
        >
          Create Account
        </h1>

        <p
          className="
          mt-2
          text-center
          text-slate-500
        "
        >
          Join VendSmart
        </p>

        {error && (
          <div
            className="
            mt-4
            rounded-xl
            bg-red-50
            p-3
            text-red-600
          "
          >
            {error}
          </div>
        )}

        {[
          "name",
          "companyName",
          "email",
          "password",
        ].map(
          (field) => (
            <input
              key={field}
              required
              type={
                field ===
                "password"
                  ? "password"
                  : field ===
                    "email"
                  ? "email"
                  : "text"
              }
              placeholder={
                field
              }
              className="
              mt-4
              w-full
              rounded-2xl
              border
              border-slate-300
              dark:border-slate-700
              bg-white
              dark:bg-slate-800
              p-3
              dark:text-white
            "
              onChange={(
                e
              ) =>
                setForm({
                  ...form,
                  [field]:
                    e.target
                      .value,
                })
              }
            />
          )
        )}

        <button
          disabled={
            loading
          }
          className="
          mt-6
          w-full
          rounded-2xl
          bg-indigo-600
          py-3
          font-bold
          text-white
        "
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </button>

        <p className="mt-5 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}