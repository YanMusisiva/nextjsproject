"use client";

import React from "react";
import NewsletterForm from "@/components/NewsletterForm";
import Image from "next/image";


const Navbar = () => (
  <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur border-b border-gray-200 text-gray-900 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
      <span className="font-extrabold text-2xl tracking-widest">AS ElektrikaTek</span>
      <input id="menu-toggle" type="checkbox" className="hidden peer" />
      <label htmlFor="menu-toggle" className="cursor-pointer md:hidden block">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </label>
      <ul className="flex-col md:flex-row md:items-center absolute md:static bg-white/95 text-gray-900 left-0 w-full md:w-auto top-full md:top-auto hidden peer-checked:flex md:flex shadow md:shadow-none rounded-b md:rounded-none gap-4 md:gap-4 md:bg-transparent md:shadow-none">
        {[
          { href: "#hero", label: "Accueil" },
          { href: "#services", label: "Services" },
          { href: "#portfolio", label: "Portfolio" },
          { href: "#solutions", label: "Solutions" },
          { href: "#contact", label: "Contact" },
        ].map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="block px-8 py-4 hover:text-blue-700 font-semibold tracking-wide transition"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

const Hero = () => (
  <section
    id="hero"
    className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
    style={{
      backgroundImage: "url('/eleKtrika-hero.jpg')",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-blue-900/40" />
    <div className="relative z-10 text-center text-white max-w-2xl mx-auto">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
        L’Innovation Électrique, <span className="text-blue-400">Simplement</span>
      </h1>
      <p className="text-xl md:text-2xl mb-8 font-light drop-shadow">
        Solutions électriques et technologiques pour les professionnels et particuliers exigeants.
      </p>
      <div  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10  rounded-full shadow-lg text-lg transition  w-full md:w-auto py-4">
        <a
        href="#contact"
       
      >
        Demander un devis
      </a>
      </div>
      
    </div>
  </section>
);

const Services = () => (
  <section id="services" className="py-24 px-6 bg-white">
    <h2 className="text-4xl font-bold text-blue-700 text-center mb-14 tracking-tight">
      Nos Services
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
      {[
        {
          icon: "/lumion-service1.jpg",
          title: "Installations Modernes",
          desc: "Mise en place d’installations électriques haut de gamme pour bâtiments résidentiels et professionnels.",
        },
        {
          icon: "/lumion-service2.jpg",
          title: "Domotique & Smart Home",
          desc: "Automatisation, contrôle à distance, sécurité et confort pour votre maison ou bureau.",
        },
        {
          icon: "/lumion-service3.jpg",
          title: "Maintenance & Dépannage",
          desc: "Interventions rapides, diagnostics précis et maintenance préventive pour éviter les pannes.",
        },
      ].map((service, i) => (
        <div
          key={i}
          className="group rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition bg-gray-50"
        >
          <div className="relative h-56">
            <Image
           
  fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
              
              src={service.icon}
              alt={service.title}
              className="object-cover w-full h-56 group-hover:scale-105 transition"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
          </div>
          <div className="p-8">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">{service.title}</h3>
            <p className="text-gray-600">{service.desc}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Solutions = () => (
  <section id="solutions" className="py-24 px-6 bg-gradient-to-br from-blue-50 to-white">
    <h2 className="text-4xl font-bold text-blue-700 text-center mb-14 tracking-tight">
      Exemples de Solutions
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4">
        <h4 className="text-xl font-semibold text-blue-700">Gestion intelligente de l’énergie</h4>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Tableaux connectés et suivi de consommation</li>
          <li>Optimisation des coûts énergétiques</li>
          <li>Alertes et maintenance prédictive</li>
        </ul>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4">
        <h4 className="text-xl font-semibold text-blue-700">Sécurité & Contrôle d’accès</h4>
        <ul className="list-disc ml-6 text-gray-700">
          <li>Vidéosurveillance intelligente</li>
          <li>Contrôle d’accès biométrique</li>
          <li>Alarmes connectées</li>
        </ul>
      </div>
    </div>
  </section>
);

const Portfolio = () => (
  <section id="portfolio" className="py-24 px-6 bg-white">
    <h2 className="text-4xl font-bold text-blue-700 text-center mb-14 tracking-tight">
      Réalisations
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
      {["portfolio1.jpg", "portfolio2.jpg", "portfolio3.jpg", "portfolio4.jpg"].map(
        (src, i) => (
          <div key={i} className="relative group rounded-2xl overflow-hidden shadow-lg">
            <Image
            width={400}
            height={500}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={90}
            
              src={`/${src}`}
              alt={`Projet ${i + 1}`}
              className="w-full h-56 object-cover group-hover:scale-105 transition"
              
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
              <span className="text-white font-semibold">Projet {i + 1}</span>
            </div>
          </div>
        )
      )}
    </div>
   
  </section>
);

const Testimonials = () => (
  <section className="py-24 px-6 bg-gradient-to-br from-blue-100 to-white">
    <h2 className="text-4xl font-bold text-blue-700 text-center mb-14 tracking-tight">
      Témoignages
    </h2>
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10">
      {[
        {
          name: "Marie Dupont",
          text: "Service impeccable, équipe très professionnelle et à l’écoute. Je recommande vivement !",
        },
        {
          name: "Jean K.",
          text: "Installation domotique parfaite, tout fonctionne à merveille. Merci pour votre sérieux.",
        },
      ].map((t, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-lg text-gray-700 mb-4">“{t.text}”</p>
          <span className="font-bold text-blue-700">{t.name}</span>
        </div>
      ))}
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-24 px-6 bg-white">
    <h2 className="text-4xl font-bold text-center mb-10 tracking-tight">Contact</h2>
    <div className="max-w-2xl mx-auto bg-blue-50 p-10 rounded-2xl shadow-lg border border-blue-100">
      <h1 className="text-2xl font-bold mb-6">Inscrivez-vous à la newsletter et OBTENEZ UN PREMIER DEPANNAGE GRATUIT</h1>
      <NewsletterForm />
      <div className="mt-8 text-center text-base text-gray-700 space-y-2">
        <p>
          Email:{" "}
          <a
            href="mailto:johnitehero@gmail.com"
            className="underline text-blue-700"
          >
            johnitehero@gmail.com
          </a>
        </p>
        <p>Téléphone: +256 787531919</p>
        <p>Adresse: Busabala, Kampala</p>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-8 text-center text-gray-500 text-sm bg-white border-t border-gray-100">
    &copy; {new Date().getFullYear()} AS ElektrikaTek. Tous droits réservés.
  </footer>
);

const Home: React.FC = () => {
  return (
    <main className="bg-gray-50 text-gray-900 min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Solutions />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
};

export default Home;