"use client";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface EmailDoc {
  _id: string;
  email: string;
  __v?: number;
}

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [emails, setEmails] = useState<EmailDoc[]>([]);
  const [emailText, setEmailText] = useState("Thank you for subscribing!");

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

  const handleSendEmail = async (email: string) => {
    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: "Welcome!",
        text: emailText,
      }),
    });

    if (response.ok) {
      alert("Email sent successfully!");
    } else {
      alert("Failed to send email.");
      console.log("Sending email to:", email, "with subject:", "Welcome!");
    }
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
      <h2 className="text-xl font-semibold mt-6 mb-2">Send Email</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const email = (e.target as HTMLFormElement).email.value;
          handleSendEmail(email);
        }}
        className="flex flex-col space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Enter email to send"
          className="p-2 border border-gray-300 rounded"
          required
        />
        <textarea
          name="emailText"
          value={emailText}
          onChange={(e) => setEmailText(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          rows={4}
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Send Email
        </button>
      </form>
    </div>
  );
};
export default Dashboard;
