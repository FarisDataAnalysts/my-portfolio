"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabaseClient";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError("Wrong email or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="max-w-md mx-auto px-6 py-24">
      <p className="font-mono text-teal text-sm mb-2">RESTRICTED</p>
      <h1 className="font-display font-bold text-3xl mb-8">Admin Login</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-xs font-mono text-slate">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 bg-navylight border border-white/10 rounded px-3 py-2 focus:border-teal outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-mono text-slate">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 bg-navylight border border-white/10 rounded px-3 py-2 focus:border-teal outline-none"
          />
        </div>

        {error && <p className="text-sm text-red-400 font-mono">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-6 py-3 bg-teal text-navy font-mono text-sm font-medium rounded hover:bg-gold transition-colors disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
