"use client";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface EmailDoc {
  _id: string;
  email: string;
  __v?: number;
}

const SITE_URL = "https://ton-site.com"; // Remplace par ton vrai domaine
const DEFAULT_TITLE = "Bienvenue sur notre newsletter !";
const DEFAULT_MESSAGE =
  "Merci de vous être abonné à notre newsletter. Nous sommes ravis de vous compter parmi nous !";

// Copie exacte du modèle de l'API subscribe
function getWelcomeHtml(email: string, title: string, message: string) {
  const unsubscribeLink = `${SITE_URL}/unsubscribe?email=${encodeURIComponent(
    email
  )}`;
  return `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;">
      <h1 style="color:#2563eb;">${title}</h1>
      <p>${message}</p>
      <a href="${SITE_URL}" style="display:inline-block;padding:10px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:5px;margin:20px 0;">Visiter notre site</a>
      <br/>
      <a href="${unsubscribeLink}" style="display:inline-block;padding:8px 16px;background:#e53e3e;color:#fff;text-decoration:none;border-radius:5px;margin:20px 0;font-size:14px;">Se désabonner</a>
      <p style="font-size:12px;color:#888;margin-top:40px;">
        Si vous ne souhaitez plus recevoir nos emails, cliquez sur le bouton "Se désabonner" ci-dessus.
      </p>
    </div>
  `;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [emails, setEmails] = useState<EmailDoc[]>([]);
  const [newsletterTitle, setNewsletterTitle] = useState(DEFAULT_TITLE);
  const [newsletterMessage, setNewsletterMessage] = useState(DEFAULT_MESSAGE);
  const [singleEmail, setSingleEmail] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      signIn();
    }
  }, [session, status]);

  useEffect(() => {
    if (!session) return;
    const fetchEmails = async () => {
      const response = await fetch("/api/subscribe");
      const data: EmailDoc[] = await response.json();
      setEmails(data);
    };
    fetchEmails();
  }, [session]);

  // Envoi à un seul email
  const handleSendEmail = async (email: string) => {
    const title = newsletterTitle.trim() || DEFAULT_TITLE;
    const message = newsletterMessage.trim() || DEFAULT_MESSAGE;
    const html = getWelcomeHtml(email, title, message);

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `"Newsletter AS ELEKTRIKA & TEK" <rockfordjohn317@gmail.com>`,
        to: email,
        subject: title,
        html,
      }),
    });

    if (response.ok) {
      alert("Email envoyé avec succès !");
    } else {
      alert("Échec de l'envoi de l'email.");
    }
  };

  // Envoi à tous les emails
  const handleSendAll = async () => {
    for (const emailObj of emails) {
      await handleSendEmail(emailObj.email);
    }
    alert("Newsletter envoyée à tous les abonnés !");
  };

  if (status === "loading" || !session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Subscribed Emails</h2>
      <ul className="list-disc pl-5">
        {emails.map((email) => (
          <li key={email._id} className="mb-1">
            {email.email}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        Envoyer une newsletter
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendEmail(singleEmail);
        }}
        className="flex flex-col space-y-4"
      >
        <input
          type="email"
          name="email"
          value={singleEmail}
          onChange={(e) => setSingleEmail(e.target.value)}
          placeholder="Entrer l'email du destinataire"
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          name="newsletterTitle"
          value={newsletterTitle}
          onChange={(e) => setNewsletterTitle(e.target.value)}
          placeholder="Titre de la newsletter"
          className="p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="newsletterMessage"
          value={newsletterMessage}
          onChange={(e) => setNewsletterMessage(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          rows={4}
          placeholder="Votre message"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Envoyer à cet email
          </button>
          <button
            type="button"
            className="bg-green-600 text-white p-2 rounded"
            onClick={handleSendAll}
          >
            Envoyer à tous
          </button>
        </div>
      </form>
    </div>
  );
};
export default Dashboard;
