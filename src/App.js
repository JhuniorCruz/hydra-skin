import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";

import { NavBar } from "./components/NavBar";
import { MobileMenu } from "./components/MobileMenu";
import { Hero } from "./components/Hero";
import { StatsSection } from "./components/StatsSection";
import { AboutSection } from "./components/AboutSection";
import { ExpertiseSection } from "./components/ExpertiseSection";
import { ServicesSection } from "./components/ServicesSection";
import { GallerySection } from "./components/GallerySection";
import { FAQSection } from "./components/FAQSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { FloatingWhatsAppButton } from "./components/FloatingWhatsAppButton";

import { stats as statsData } from "./data/stats";
import { services } from "./data/services";
import { galleryBeforeAfter } from "./data/gallery";

const WHATSAPP_NUMBER = "51914063936";

function App() {
  const [navSolid, setNavSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const countersStarted = useRef(false);
  const statsRef = useRef(null);
  const formButtonText = "Enviar por WhatsApp";
  const [btnLabel, setBtnLabel] = useState(formButtonText);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
  });

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out" });
  }, []);

  const animateCount = (index, target) => {
    const duration = 1200;
    const start = performance.now();
    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const value = Math.floor(progress * target);
      setCounts((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted.current) {
            countersStarted.current = true;
            statsData.forEach((stat, idx) => animateCount(idx, stat.value));
          }
        });
      },
      { threshold: 0.4 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceReserve = (serviceName) => {
    setFormData((prev) => ({ ...prev, service: serviceName }));
    scrollToId("contacto");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, service, date } = formData;
    const message =
      `Hola Hydra Skin, quiero agendar una evaluacion.\n\n` +
      `Nombre: ${name || "No especificado"}\n` +
      `Telefono: ${phone || "No especificado"}\n` +
      `Email: ${email || "No especificado"}\n` +
      `Servicio: ${service || "Por definir"}\n` +
      `Fecha deseada: ${date || "Proxima disponible"}`;

    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    setBtnLabel("Abriendo WhatsApp...");
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => {
      setBtnLabel(formButtonText);
      setFormData({ name: "", phone: "", email: "", service: "", date: "" });
    }, 2000);
  };

  return (
    <div className="bg-hydra-bg text-hydra-dark font-sans antialiased selection:bg-hydra-pink selection:text-white">
      <NavBar navSolid={navSolid} scrollToId={scrollToId} onMenuToggle={() => setMenuOpen((v) => !v)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} scrollToId={scrollToId} />

      <Hero scrollToId={scrollToId} />
      <StatsSection counts={counts} statsRef={statsRef} stats={statsData} />
      <AboutSection />
      <ExpertiseSection />
      <ServicesSection services={services} onReserveService={handleServiceReserve} />
      <GallerySection items={galleryBeforeAfter} />
      <FAQSection />
      <ContactSection
        formData={formData}
        handleFieldChange={handleFieldChange}
        handleSubmit={handleSubmit}
        btnLabel={btnLabel}
        services={services}
      />
      <FloatingWhatsAppButton phoneNumber={WHATSAPP_NUMBER} />
      <Footer scrollToId={scrollToId} />
    </div>
  );
}

export default App;
