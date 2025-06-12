import { use, useEffect, useState } from "react";

const dashboard = () => {
  const [emails, setEmails] = useState<string[]>([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const response = await fetch("/api/subscribe");
      const data = await response.json();
      setEmails(data);
    };
    fetchEmails();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-xl font-semibold mb-2">Subscribed Emails</h2>
      <ul className="list-disc pl-5">
        {emails.map((email, index) => (
          <li key={index} className="mb-1">
            {email}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default dashboard;
