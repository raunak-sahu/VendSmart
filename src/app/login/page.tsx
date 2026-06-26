"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {
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
}
else {
      alert(data.error);
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

        <input
          placeholder="Email"
          className="mt-6 w-full rounded-xl border p-3"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
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
        />

        <button
          onClick={handleLogin}
          className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-white"
        >
          Login
        </button>

      </div>

    </div>
  );
}