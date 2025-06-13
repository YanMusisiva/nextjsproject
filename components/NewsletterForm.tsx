import { useState } from "react";
const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
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
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="p-2 border border-gray-300 rounded mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Subscribe
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-600 mt-2">{success}</p>}
    </form>
  );
};
export default NewsletterForm;
