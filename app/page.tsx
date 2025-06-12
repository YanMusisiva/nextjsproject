"use client";

import React from "react";
import NewsletterForm from "@/components/NewsletterForm";
import ImageSlider from "@/components/ImageSlider";

const Home: React.FC = () => {
  return (
    <main className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      {/**Hero Section */}
      <section className="bg-blue-900 text-white dark:bg-blue-900 py-16 px-6 text-center flex">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ELECTRICAL & TECH SERVICES
          </h1>
          <p className="max-w-xl mx-auto text-lg">
            {" "}
            We provide professional elctrical services and electronic repair for
            residential and commercial clients.
          </p>
        </div>

        <div className="mt-8">
          <img
            src="/john.jpg"
            alt="Electrician Illustration"
            className="mx-auto w-32 md:w-44"
          />
        </div>
      </section>
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 text-center mb-10">
          SERVICES
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "j",
              title: "Electrical Repair",
              desc: "Fixing electrical issues and faults.",
            },
            {
              icon: "j",
              title: "Panel Upgrades",
              desc: "Upgrading electrical panels safely.",
            },
            {
              icon: "j",
              title: "Lighting Installation",
              desc: "Installing indoor and outdoor lighting.",
            },
            {
              icon: "j",
              title: "Wiring Services",
              desc: "Complete home and office rewiring.",
            },
          ].map((service, i) => (
            <div
              key={i}
              className="text-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
      {/**portfolio Section */}
      <section className="py-16 px-6 bg-white dark:bg-gray-950">
        <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 text-center mb-10">
          PORTFOLIO
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {["null", "null", "null", "null"].map((src, i) => (
            <img
              key={i}
              src={`/${src}`}
              alt={`Portfolio ${i + 1}`}
              className="w-full rounded-lg shadow"
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <ImageSlider />
        </div>
      </section>
      {/**Contact Section */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-xl shadow">
          <h1 className="text-3xl font-bold">Inscrivez vous a la newsletter</h1>
          <NewsletterForm />
          <div className="mt-6 text-center text-sm text-gray-700 dark:text-gray-300">
            <p>
              Email:{" "}
              <a href="mailto:johnitehero@gmail.com" className="underline">
                johnitehero@gmail.com
              </a>
            </p>
            <p>Telephone : +256 787531919</p>
            <p>Adresse:Busabala ,kampala</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
