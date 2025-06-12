import { useState } from "react";
const NewsletterForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      alert("Subscription successful!");
      setEmail("");
    } else {
      alert("Subscription failed. Please try again.");
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
    </form>
  );
};
export default NewsletterForm;
