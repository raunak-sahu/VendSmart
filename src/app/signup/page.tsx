"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Account created!");
      router.push("/login");
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 dark:bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 p-8 shadow-xl space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <input
          placeholder="Your Name"
          className="w-full rounded-xl border p-3"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Company Name"
          className="w-full rounded-xl border p-3"
          onChange={(e) =>
            setForm({
              ...form,
              companyName: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          type="email"
          className="w-full rounded-xl border p-3"
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Password"
          type="password"
          className="w-full rounded-xl border p-3"
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        <button
          className="w-full rounded-xl bg-indigo-600 py-3 text-white"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}