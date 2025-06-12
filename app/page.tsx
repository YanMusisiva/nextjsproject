"use client";

import React from "react";
import NewsletterForm from "@/components/NewsletterForm";
import ImageSlider from "@/components/ImageSlider";
import { SessionProvider } from "next-auth/react";

// Navbar component
const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-white/90 dark:bg-gray-900/90 shadow z-50">
    <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
      <span className="font-bold text-blue-900 dark:text-orange-400 text-xl">
        AS ElektrikaTek
      </span>
      <input id="menu-toggle" type="checkbox" className="hidden peer" />
      <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>
      <ul className="flex-col md:flex-row md:items-center absolute md:static bg-white dark:bg-gray-900 left-0 w-full md:w-auto top-full md:top-auto hidden peer-checked:flex md:flex">
        <li>
          <a href="#hero" className="block px-4 py-2 hover:text-orange-500">
            Accueil
          </a>
        </li>
        <li>
          <a href="#services" className="block px-4 py-2 hover:text-orange-500">
            Services
          </a>
        </li>
        <li>
          <a
            href="#portfolio"
            className="block px-4 py-2 hover:text-orange-500"
          >
            Portfolio
          </a>
        </li>
        <li>
          <a href="#contact" className="block px-4 py-2 hover:text-orange-500">
            Contact
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

const Home: React.FC = () => {
  return (
    <main className="bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <Navbar />
      {/* Hero Section */}
      <section
        id="hero"
        className="bg-blue-900 text-white dark:bg-blue-900 py-16 px-6 text-center flex mt-16"
      >
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
      {/* Services Section */}
      <section id="services" className="py-16 px-6">
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
      {/* Portfolio Section */}
      <section id="portfolio" className="py-16 px-6 bg-white dark:bg-gray-950">
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
      {/* Contact Section */}
      <section id="contact" className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
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
