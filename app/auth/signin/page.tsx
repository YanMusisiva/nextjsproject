"use client";
import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // <-- IMPORTANT

const allowedEmail =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || "admin@tondomaine.com";

export default function SignIn() {
  const { data: session } = useSession();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (session && session.user?.email !== allowedEmail) {
      router.replace("/");
    }
    if (session && session.user?.email === allowedEmail) {
      router.replace("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.error) {
      setError("mauvaise adresse email ou mot de passe");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
