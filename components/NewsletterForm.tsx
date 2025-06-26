import { useState } from "react";

const validateEmail = (email: string) => {
  // Regex robuste pour l'email
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  return re.test(email);
};

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(email)) {
      setError("Veuillez entrer une adresse e-mail valide.");
      return;
    }

    setLoading(true);

    

    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    if (response.ok) {
      setSuccess("Inscription réussie !");
      setEmail("");
    } else {
      const data = await response.json();
      setError(
        data.message || "Erreur lors de l'inscription. Veuillez réessayer."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md mx-auto flex flex-col items-center gap-4 bg-white/80 rounded-2xl shadow-xl p-8"
      style={{
        backdropFilter: "blur(2px)",
      }}
    >
      <div className="w-full relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 text-xl">
          <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none">
            <path d="M2 6l10 7 10-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="2" y="6" width="20" height="12" rx="4" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Votre adresse e-mail"
          className="w-full pl-12 pr-4 py-3 rounded-full border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none text-lg transition"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-3 rounded-full shadow-lg text-lg transition disabled:opacity-60"
      >
        {loading ? "Envoi..." : "S'inscrire à la newsletter"}
      </button>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      {success && <p className="text-green-600 mt-2 text-center">{success}</p>}
      <p className="text-xs text-gray-500 mt-2 text-center">
        Nous respectons votre vie privée. Aucun spam.
      </p>
    </form>
  );
};

export default NewsletterForm;