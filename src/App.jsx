import { useState, useMemo, useEffect } from "react";

/**
 * HLC Développement — Live Preview (FR/EN)
 * Fixes: restores full Track Record & Pipeline data, improves About section, stronger buttons, and removes emojis in modals.
 */

// -----------------------------
// Shared Project Data (FR)
// -----------------------------
const PROJECTS_FR = [
  {
    id: "beverly",
    title: "Beverly Palace — Monaco",
    blurb: "Rénovation globale & revente sur plan en 5 mois — standing Monaco.",
    img: "https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop",
    html: `<h4>Description</h4><p>Appartement issu d’une succession, situé dans une copropriété de standing à Monaco. Acquis à l’été 2017 à l’issue d’une négociation complexe, il a fait l’objet d’un projet de rénovation globale. Grâce à une valorisation ciblée et une commercialisation sur plan, le bien a été revendu cinq mois plus tard, avec une plus‑value significative (base d’acquisition : 4,1 M€).</p>
<h4>Enjeux identifiés</h4><p>Contexte successoral délicat et bien très dégradé, mais potentiel rare : extérieur conséquent en plein cœur de Monaco. Vision : transformer un espace peu exploité en jardin de ville avec piscine — atout différenciant sur ce marché contraint.</p>
<h4>Stratégie</h4><p>Plan complet de rénovation et projection architecturale, budget travaux optimisé, supports de vente premium, commercialisation sur plan.</p>
<h4>Déroulé</h4><p>Acquisition : août 2017 • Structuration immédiate • Revente sur plan : janvier 2018 • Contrat de suivi des travaux.</p>
<h4>Conclusion</h4><p>Transformation rapide d’un actif complexe en produit fini haut de gamme, en moins de six mois, création de valeur nette importante.</p>`
  },
  {
    id: "villa_angeline",
    title: "Appartement bourgeois — Monaco",
    blurb: "Bourgeois monégasque revisité — volumes, vue, cachet conservé.",
    img: "https://images.unsplash.com/photo-1505691723518-36a5ac3b2f22?q=80&w=1600&auto=format&fit=crop",
    html: `<h4>Description</h4><p>Appartement dans un immeuble bourgeois à Monaco (vue mer, belle hauteur sous plafond, ascenseur en fer forgé). Acquis 3,3 M€, entièrement restructuré et repensé dans un style haut de gamme, fidèle à l’identité du lieu.</p>
<h4>Enjeux identifiés</h4><p>Préserver l’élégance d’origine tout en modernisant les volumes et les prestations. Proximité immédiate des écoles : objectif de créer un appartement familial haut de gamme, adapté à la vie locale.</p>
<h4>Stratégie</h4><p>Mise à nue complète, matériaux nobles, design intérieur dans l’esprit bourgeois, intégration discrète des standards actuels.</p>
<h4>Déroulé</h4><p>Conception : 2 mois • Travaux : 3 mois • Achat → revente livrée clé en main en 12 mois.</p>
<h4>Conclusion</h4><p>Budget travaux : 250 000 € • Revente finale : 4,8 M€. Valorisation pleine du potentiel esthétique et architectural.</p>`
  },
  {
    id: "carnot",
    title: "Boulevard Carnot — Nice",
    blurb: "Ancien hôtel → appartements premium saisonniers — forte rentabilité.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=1600&auto=format&fit=crop",
    html: `<h4>Description</h4><p>À proximité du port de Nice, ancien hôtel de 321 m² acquis puis intégralement restructuré pour créer des appartements haut de gamme en location saisonnière. Conservation de la « commercialité » pour sécuriser l’usage.</p>
<h4>Enjeux identifiés</h4><p>Activer et conserver la commercialité liée à l’usage hôtelier et en faire un levier de rendement via des unités premium adaptées à la courte durée.</p>
<h4>Stratégie</h4><p>Ensemble d’appartements indépendants (certains vue mer, d’autres avec jardin), prestations premium, logique de rendement et pérennité locative.</p>
<h4>Déroulé</h4><p>Repenser structure, circulation, distribution. Maintien de la commercialité comme avantage concurrentiel rare.</p>
<h4>Conclusion</h4><p>321 m² de surface commerciale en saisonnier dans un secteur prime. Développé et structuré par HLC, cédé ensuite à des acquéreurs qui en ont fait un immeuble patrimonial à forte rentabilité.</p>`
  },
  {
    id: "gubernatis",
    title: "Immeuble Art Déco — Place Wilson, Nice",
    blurb: "Surélévation & restructuration en secteur classé — PC purgé.",
    img: "https://images.unsplash.com/photo-1505575972945-28063e055ca8?q=80&w=1600&auto=format&fit=crop",
    html: `<h4>Description</h4><p>Au cœur du nouveau Carré d’Or de Nice, face à la bibliothèque municipale (secteur classé), immeuble Art Déco sans vis‑à‑vis, à 50 m du tram souterrain. Projet HLC : surélévation et restructuration complète, avec ascenseur, en conservant l’âme de l’immeuble.</p>
<h4>Enjeux identifiés</h4><p>Préserver l’identité Art Déco et revaloriser par une surélévation dans un contexte urbain dense, avec restaurant 2★ Michelin au RDC.</p>
<h4>Stratégie</h4><p>8 appartements sur 1er/2e (2 studios + 2 T2 par niveau) • 1 T4 au 3e • 1 duplex d’exception en dernier niveau (4 ch., 4 SDB, toit cathédrale, balcon filant, terrasse privée, ascenseur privatif).</p>
<h4>Déroulé</h4><p>Permis déposé, obtenu, purgé de tout recours. Surélévation d’1,5 niveau, restructuration des plateaux, installation ascenseur traversant.</p>
<h4>Conclusion</h4><p>Projet signature HLC alliant patrimoine et création de biens d’exception. Immeuble proposé à 3 200 000 €, fort potentiel de rentabilité et de valorisation.</p>`
  },
  {
    id: "sjcf",
    title: "Maison — Saint‑Jean‑Cap‑Ferrat",
    blurb: "Ancien cinéma modulable — potentiel de division haut de gamme.",
    img: "https://images.unsplash.com/photo-1493247035880-efdf55d1cc31?q=80&w=1600&auto=format&fit=crop",
    html: `<h4>Description</h4><p>Ancien cinéma (308 m² sur 2 niveaux), 5 places de stationnement, 60 m² d’extérieur, à 100 m du port. Volume libre (sans murs porteurs) offrant un potentiel rare de restructuration.</p>
<h4>Enjeux identifiés</h4><p>Créer plusieurs unités haut de gamme de type pieds‑à‑terre, sous réserve d’autorisations, dans un village ultra‑premium.</p>
<h4>Stratégie</h4><p>Études multi‑scenarii de division intelligente ; aménagements haut de gamme adaptés à une clientèle internationale.</p>
<h4>Déroulé</h4><p>Acquisition, faisabilité réglementaire et projections ; ratios m²/emplacement excellents grâce à la grande hauteur sous plafond et au plateau libre.</p>
<h4>Conclusion</h4><p>Projet emblématique de la philosophie HLC : révéler le potentiel d’un bien exceptionnel au cœur d’un marché à forte tension.</p>`
  },
  {
    id: "cannes",
    title: "Maison contemporaine — Cannes",
    blurb: "Maison transformée en villa de prestige — 310 m² & bien‑être.",
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1600&auto=format&fit=crop",
    html: `<h4>Description</h4><p>Située dans l’un des quartiers résidentiels les plus prisés de Cannes, maison ~220 m² transformée en villa de 310 m². Environnement calme et arboré.</p>
<h4>Enjeux identifiés</h4><p>Passer d’une maison classique à une villa de standing ; maximiser les volumes ; intégrer des prestations luxe tout en préservant l’intimité.</p>
<h4>Stratégie</h4><p>4 chambres dont 2 master suites, piscine intérieure, salle de sport, home‑cinéma, jardin sans vis‑à‑vis, cuisine d’été.</p>
<h4>Déroulé</h4><p>Études & conception → travaux dans le respect des contraintes. Livraison prévue fin juin 2025.</p>
<h4>Conclusion</h4><p>Mise en vente prévue à 3 200 000 € ; prestations pensées pour une clientèle exigeante.</p>`
  }
];

// English mirrors FR body for now
const PROJECTS_EN = PROJECTS_FR.map((p) => ({ ...p }));

// -----------------------------
// Pipeline data (FR/EN)
// -----------------------------
const PIPELINE_FR = [
  { title: "Villa Cannet — Nice", budget: "Budget global : 2,8 M€", scope: "Modalités : acquisition + restructuration + division", note: "Data Room disponible sur demande" },
  { title: "Saint‑Jean‑Cap‑Ferrat", budget: "Budget estimé : 8,5 M€", scope: "Modalités : transformation / reconversion", note: "Data Room disponible sur demande" },
  { title: "Carré d’Or — Nice (200 m²)", budget: "Budget : 1,4 M€", scope: "Modalités : valorisation de la commercialité", note: "Data Room disponible sur demande" },
];

const PIPELINE_EN = [
  { title: "Villa Cannet — Nice", budget: "Global budget: €2.8m", scope: "Scope: acquisition + restructuring + unit split", note: "Data Room available on request" },
  { title: "Saint‑Jean‑Cap‑Ferrat", budget: "Estimated budget: €8.5m", scope: "Scope: transformation / reconversion", note: "Data Room available on request" },
  { title: "Carré d’Or — Nice (200 sqm)", budget: "Budget: €1.4m", scope: "Scope: commercial rights optimization", note: "Data Room available on request" },
];

// -----------------------------
// i18n
// -----------------------------
const i18n = {
  fr: {
    nav: { home: "Accueil", about: "À propos", contact: "Contact" },
    about: {
      title: "Qui sommes‑nous",
      lead:
        "Bâtir, transformer, valoriser. HLC Développement intervient sur des opérations complexes — de l’acquisition à la revente — avec une exécution exigeante et un reporting clair.",
      pillars: [
        { h: "Sélection rigoureuse", p: "Sourcing d’actifs off‑market et lecture fine des contextes juridiques, techniques et commerciaux." },
        { h: "Création de valeur", p: "Restructuration, division, surélévation, changement d’usage et optimisation de la commercialité." },
        { h: "Exécution & reporting", p: "Pilotage des travaux, budget et délais, comptes‑rendus clairs et calendrier maîtrisé." },
      ],
    },
    track: { lead: "Une sélection non exhaustive de projets réalisés et développés." },
    projects: PROJECTS_FR,
    pipeline: PIPELINE_FR,
    contact: {
      title: "Contact",
      lead: "Fonds, foncières, vendeurs : parlons valeur. Accès Data Room sur qualification.",
      quick: [
        { label: "LinkedIn", href: "https://www.linkedin.com/" },
        { label: "WhatsApp", href: "https://wa.me/33644204777" },
        { label: "Prendre rendez‑vous (30 min)", href: "https://cal.com/" },
      ],
      hq: { title: "Siège & bureaux", addr: "8 rue Gustave Deloye", city: "06000 Nice, France", map: "https://maps.google.com", mapLabel: "Voir sur Google Maps" },
      legal: { note: "Conformité & confidentialité :", items: ["Process KYC/AML pour l’accès Data Room", "NDA requis pour les informations sensibles", "Reporting financier trimestriel sur demande"] },
      inquiries: {
        title: "Vos demandes",
        lines: [
          { title: "Deal‑flow / Cessions", desc: "Actifs à céder (Nice, Monaco, Riviera).", href: "mailto:deals@hlcdeveloppement.com", cta: "Envoyer un dossier" },
          { title: "Investisseurs / Fonds", desc: "Club deals, pipeline, accès Data Room.", href: "mailto:invest@hlcdeveloppement.com", cta: "Demander l’accès" },
          { title: "Partenariats", desc: "Banques, foncières, family offices.", href: "mailto:partners@hlcdeveloppement.com", cta: "Proposer un échange" },
        ],
      },
      form: { title: "Écrivez‑nous", name: "Nom / Société", email: "Email", topics: ["Sujet", "Investisseur", "Vente d’actif", "Partenariat", "Autre"], msg: "Message (résumez en 5 lignes)", cta: "Envoyer votre message", disclaimer: "En envoyant ce formulaire, vous acceptez d’être contacté par HLC Développement." },
      ctas: { project: "Voir le projet", access: "Demander l’accès" },
    },
  },
  en: {
    nav: { home: "Home", about: "About", contact: "Contact" },
    about: {
      title: "About us",
      lead: "Build, transform, create value. HLC Développement handles complex operations end‑to‑end with rigorous execution and clear reporting.",
      pillars: [
        { h: "Rigorous selection", p: "Off‑market sourcing and sharp legal/technical/commercial assessment." },
        { h: "Value creation", p: "Restructuring, unit split, vertical extension, change of use, commercial rights optimization." },
        { h: "Execution & reporting", p: "Works, budget and timeline control, concise investor updates." },
      ],
    },
    track: { lead: "A curated selection of delivered and developed projects." },
    projects: PROJECTS_EN,
    pipeline: PIPELINE_EN,
    contact: {
      title: "Contact",
      lead: "Funds, REITs, sellers: let’s talk value. Data Room access upon qualification.",
      quick: [
        { label: "LinkedIn", href: "https://www.linkedin.com/" },
        { label: "WhatsApp", href: "https://wa.me/33644204777" },
        { label: "Book a 30‑min call", href: "https://cal.com/" },
      ],
      hq: { title: "HQ & Offices", addr: "8 rue Gustave Deloye", city: "06000 Nice, France", map: "https://maps.google.com", mapLabel: "Open in Google Maps" },
      legal: { note: "Compliance & privacy:", items: ["KYC/AML required for Data Room access", "NDA for sensitive materials", "Quarterly financial reporting upon request"] },
      inquiries: {
        title: "Inquiries",
        lines: [
          { title: "Deal flow / Disposals", desc: "Assets to sell (Nice, Monaco, Riviera).", href: "mailto:deals@hlcdeveloppement.com", cta: "Submit a file" },
          { title: "Investors / Funds", desc: "Club deals, pipeline, Data Room.", href: "mailto:invest@hlcdeveloppement.com", cta: "Request access" },
          { title: "Partnerships", desc: "Banks, REITs, family offices.", href: "mailto:partners@hlcdeveloppement.com", cta: "Propose a call" },
        ],
      },
      form: { title: "Write to us", name: "Name / Company", email: "Email", topics: ["Topic", "Investor", "Asset for sale", "Partnership", "Other"], msg: "Message (5‑line summary)", cta: "Send your message", disclaimer: "By submitting, you agree to be contacted by HLC Développement." },
      ctas: { project: "See project", access: "Request access" },
    },
  },
};

export default function App() {
  const [lang, setLang] = useState("fr");
  const [activeId, setActiveId] = useState(null);
  const t = i18n[lang];

  // Assets (replace with your own URLs when ready)
  const assets = useMemo(
    () => ({
      logo: "https://picsum.photos/seed/logo/200/60",
      hero: [
        "https://images.unsplash.com/photo-1529429612776-7f7a7d65bfc5?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=2000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?q=80&w=2000&auto=format&fit=crop",
      ],
    }),
    [lang]
  );

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={assets.logo} alt="HLC" className="h-8 w-auto rounded" />
            <nav className="hidden md:flex items-center gap-4 text-sm">
              <a href="#hero" className="px-2 py-1 rounded hover:bg-[#DDE7F2]">{t.nav.home}</a>
              <a href="#about" className="px-2 py-1 rounded hover:bg-[#DDE7F2]">{t.nav.about}</a>
              <a href="#track" className="px-2 py-1 rounded hover:bg-[#DDE7F2]">Track Record</a>
              <a href="#pipeline" className="px-2 py-1 rounded hover:bg-[#DDE7F2]">Pipeline</a>
              <a href="#contact" className="px-2 py-1 rounded hover:bg-[#DDE7F2]">{t.nav.contact}</a>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center border border-zinc-300 rounded-lg overflow-hidden text-sm">
              <button onClick={() => setLang("fr")} className={`px-3 py-1.5 ${lang === "fr" ? "bg-[#DDE7F2] font-semibold" : "hover:bg-zinc-50"}`}>FR</button>
              <button onClick={() => setLang("en")} className={`px-3 py-1.5 ${lang === "en" ? "bg-[#DDE7F2] font-semibold" : "hover:bg-zinc-50"}`}>EN</button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="relative h-[70vh] overflow-hidden">
        <Slider images={assets.hero} />
      </section>

      {/* About */}
      <section id="about" className="py-16 border-t border-zinc-200 bg-zinc-50/30">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold tracking-tight relative inline-block">
            {t.about.title}
            <span className="block w-16 h-1 bg-[#C8DAF0] absolute -bottom-1 left-0 rounded-full" />
          </h2>
          <p className="text-zinc-600 mt-4 text-lg leading-relaxed max-w-3xl">
            {t.about.lead}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {t.about.pillars.map((x, i) => (
              <div key={i} className="border border-zinc-200 rounded-xl p-5 bg-white shadow-sm">
                <h3 className="text-lg font-semibold mb-2">{x.h}</h3>
                <p className="text-sm text-zinc-700">{x.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section id="track" className="py-16 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold tracking-tight inline-block relative">
            Track Record
            <span className="block w-14 h-0.5 bg-[#DDE7F2] absolute -bottom-1 left-0" />
          </h2>
          <p className="text-zinc-500 mt-1">{i18n[lang].track.lead}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {i18n[lang].projects.map((p) => (
              <Card
                key={p.id}
                title={p.title}
                blurb={p.blurb}
                img={p.img}
                cta={i18n[lang].contact.ctas.project}
                onClick={() => setActiveId(p.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pipeline */}
      <section id="pipeline" className="py-16 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold tracking-tight inline-block relative">
            Pipeline
            <span className="block w-14 h-0.5 bg-[#DDE7F2] absolute -bottom-1 left-0" />
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {i18n[lang].pipeline.map((x, i) => (
              <PipelineCard key={i} {...x} cta={i18n[lang].contact.ctas.access} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <Contact lang={lang} t={t} />

      {/* Modals */}
      {i18n[lang].projects.map((p) => (
        <Modal
          key={p.id}
          open={activeId === p.id}
          onClose={() => setActiveId(null)}
          title={p.title}
          img={p.img}
          html={p.html}
        />
      ))}
    </div>
  );
}

function Slider({ images }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!images?.length) return undefined;
    const id = setInterval(() => {
      setI((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(id);
  }, [images]);

  return (
    <div className="relative h-full">
      {images.map((src, idx) => (
        <img
          key={idx}
          src={src}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === idx ? "opacity-100" : "opacity-0"}`}
          alt=""
        />
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`w-2.5 h-2.5 rounded-full border border-black/30 ${i === idx ? "bg-[#DDE7F2]" : "bg-white/70"}`}
          />
        ))}
      </div>
    </div>
  );
}

function Card({ title, blurb, img, onClick, cta }) {
  return (
    <article onClick={onClick} className="cursor-pointer border border-zinc-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="aspect-[16/10] bg-zinc-100">
        <img src={img} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-medium">{title}</h3>
          <span className="text-[11px] px-2 py-1 rounded-full border border-zinc-300 bg-[#DDE7F2]">Réalisé / Développé</span>
        </div>
        <p className="text-sm text-zinc-600 mt-1">{blurb}</p>
        <button className="mt-3 inline-flex items-center justify-center gap-2 text-sm rounded-lg px-3 py-1.5 bg-[#C8DAF0] text-zinc-900 font-medium hover:bg-zinc-900 hover:text-white transition">
          {cta}
        </button>
      </div>
    </article>
  );
}

function PipelineCard({ title, budget, scope, note, cta }) {
  return (
    <div className="border border-zinc-200 rounded-xl p-5 shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className="text-[12px] px-2 py-1 rounded-full border border-zinc-300 bg-[#DDE7F2]">Data Room</span>
      </div>
      <ul className="list-disc pl-5 mt-2 text-zinc-700 space-y-1">
        <li>{budget}</li>
        <li>{scope}</li>
        <li>{note}</li>
      </ul>
      <button className="mt-3 inline-flex items-center justify-center gap-2 text-sm rounded-lg px-3 py-1.5 bg-[#C8DAF0] text-zinc-900 font-medium hover:bg-zinc-900 hover:text-white transition">
        {cta}
      </button>
    </div>
  );
}

function Contact({ lang, t }) {
  return (
    <section id="contact" className="py-16 border-t border-zinc-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-semibold tracking-tight inline-block relative">
          {t.contact.title}
          <span className="block w-14 h-0.5 bg-[#DDE7F2] absolute -bottom-1 left-0" />
        </h2>
        <p className="text-zinc-500 mt-1">{t.contact.lead}</p>

        <div className="flex flex-wrap gap-2 mt-4">
          <a href="mailto:contact@hlcdeveloppement.com" className="inline-flex items-center gap-2 text-sm border border-zinc-300 rounded-full px-3 py-1.5 bg-[#DDE7F2]">contact@hlcdeveloppement.com</a>
          <a href="tel:+33644204777" className="inline-flex items-center gap-2 text-sm border border-zinc-300 rounded-full px-3 py-1.5 bg-[#DDE7F2]">+33 6 44 20 47 77</a>
          {t.contact.quick?.map((q, i) => (
            <a key={i} href={q.href} target="_blank" className="inline-flex items-center gap-2 text-sm border border-zinc-300 rounded-full px-3 py-1.5 hover:bg-zinc-900 hover:text-white" rel="noreferrer">
              {q.label}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="space-y-4">
            <h3 className="font-medium">{t.contact.hq.title}</h3>
            <p className="text-sm text-zinc-700">{t.contact.hq.addr}<br/>{t.contact.hq.city}</p>
            <a href={t.contact.hq.map} target="_blank" className="inline-flex text-sm underline underline-offset-4" rel="noreferrer">{t.contact.hq.mapLabel}</a>
            <div className="pt-2 text-xs text-zinc-600 border-t border-zinc-200">
              <p>{t.contact.legal.note}</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {t.contact.legal.items.map((x, i) => (<li key={i}>{x}</li>))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">{t.contact.inquiries.title}</h3>
            <ul className="space-y-3 text-sm">
              {t.contact.inquiries.lines.map((x, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#DDE7F2]"></span>
                  <div>
                    <div className="font-medium">{x.title}</div>
                    <div className="text-zinc-600">{x.desc}</div>
                    <a href={x.href} className="text-zinc-900 underline underline-offset-4">{x.cta}</a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">{t.contact.form.title}</h3>
            <form className="space-y-3">
              <input className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm" placeholder={t.contact.form.name} />
              <input className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm" placeholder={t.contact.form.email} />
              <select className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm">
                {t.contact.form.topics.map((opt, i) => (<option key={i}>{opt}</option>))}
              </select>
              <textarea className="w-full h-28 border border-zinc-300 rounded-lg px-3 py-2 text-sm" placeholder={t.contact.form.msg} />
              <button type="button" className="w-full inline-flex items-center justify-center gap-2 text-sm rounded-lg px-3 py-2 bg-[#C8DAF0] text-zinc-900 font-medium hover:bg-zinc-900 hover:text-white transition">{t.contact.form.cta}</button>
              <p className="text-[11px] text-zinc-500">{t.contact.form.disclaimer}</p>
            </form>
          </div>
        </div>

        <footer className="bg-zinc-50 border-t border-zinc-200 mt-10 py-6">
          <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-between gap-3 text-zinc-600 text-sm">
            <div className="flex items-center gap-2">
              <img src="https://picsum.photos/seed/logo/200/60" alt="HLC" className="h-6 w-auto rounded" />
              <span>8 rue Gustave Deloye, 06000 Nice — contact@hlcdeveloppement.com</span>
            </div>
            <div>© HLC Développement — {lang === "fr" ? "Tous droits réservés" : "All rights reserved"}</div>
          </div>
        </footer>
      </div>
    </section>
  );
}

function Modal({ open, onClose, title, img, html }) {
  if (!open) return null;
  // Remove any emojis just in case
  const cleanHtml = html.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-80">
          <img src={img} alt="" className="w-full h-full object-cover" />
          <button className="absolute top-2 right-3 text-3xl text-white/90" onClick={onClose}>×</button>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <div className="prose prose-zinc max-w-none" dangerouslySetInnerHTML={{ __html: cleanHtml }} />
        </div>
      </div>
    </div>
  );
}
