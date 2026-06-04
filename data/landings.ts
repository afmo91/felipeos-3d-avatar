// Bilingual (EN/FR) landing-page content. Each landing maps to a homepage
// solution by `slug` (= solution id) and is the dedicated target for paid ads.
// Keep copy benefit-led and specific; the entry offer lowers friction for cold
// traffic, then we upsell to the full range on the call.

export type Locale = "en" | "fr";

export type LandingCopy = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSub: string;
  entryOffer: string;
  pains: string[];
  features: { title: string; desc: string }[];
  faq: { q: string; a: string }[];
  ctaTitle: string;
  ctaSub: string;
};

export type Landing = {
  slug: string;
  priceRange: string;
  tech: string[];
  en: LandingCopy;
  fr: LandingCopy;
};

// Shared UI strings (chrome, buttons, section titles, form).
export const ui: Record<Locale, Record<string, string>> = {
  en: {
    backHome: "Felipe OS",
    allSolutions: "All solutions",
    bookCall: "Book a 30-min call",
    talkToFelipe: "See it live",
    theProblem: "The problem",
    whatYouGet: "What you get",
    howItWorks: "How it works",
    pricing: "Pricing",
    faq: "FAQ",
    from: "from",
    step1Title: "Free 30-min diagnosis",
    step1Desc: "We map your workflow, your tools and what a win looks like — no obligation.",
    step2Title: "Fixed-scope build",
    step2Desc: "I build and configure the system on a fixed scope, price and timeline.",
    step3Title: "Handoff & measure",
    step3Desc: "You get a working system, the integration plan and the metrics that prove it works.",
    formTitle: "Get a free diagnosis",
    formSub: "Tell me what's eating your week. I reply within one business day.",
    name: "Name",
    email: "Email",
    company: "Company (optional)",
    message: "What would you like to automate?",
    send: "Request my free diagnosis",
    sending: "Sending…",
    sent: "Thanks — I'll be in touch within one business day.",
    errEmail: "Please enter a valid email.",
    errGeneric: "Something went wrong. Please email me@felipeos.com.",
    or: "or",
    builtBy: "Built and delivered by Felipe Mejia · Felipe OS",
    langSwitch: "Français",
  },
  fr: {
    backHome: "Felipe OS",
    allSolutions: "Toutes les solutions",
    bookCall: "Réserver un appel de 30 min",
    talkToFelipe: "Voir une démo",
    theProblem: "Le problème",
    whatYouGet: "Ce que vous obtenez",
    howItWorks: "Comment ça marche",
    pricing: "Tarifs",
    faq: "Questions fréquentes",
    from: "à partir de",
    step1Title: "Diagnostic gratuit (30 min)",
    step1Desc: "On cartographie votre workflow, vos outils et l'objectif visé — sans engagement.",
    step2Title: "Build à périmètre fixe",
    step2Desc: "Je construis et configure le système à périmètre, prix et délai fixes.",
    step3Title: "Livraison & mesure",
    step3Desc: "Vous obtenez un système opérationnel, le plan d'intégration et les indicateurs qui le prouvent.",
    formTitle: "Obtenez un diagnostic gratuit",
    formSub: "Dites-moi ce qui vous fait perdre du temps. Je réponds sous un jour ouvré.",
    name: "Nom",
    email: "E-mail",
    company: "Entreprise (optionnel)",
    message: "Que souhaitez-vous automatiser ?",
    send: "Demander mon diagnostic gratuit",
    sending: "Envoi…",
    sent: "Merci — je vous recontacte sous un jour ouvré.",
    errEmail: "Merci d'indiquer un e-mail valide.",
    errGeneric: "Une erreur est survenue. Écrivez à me@felipeos.com.",
    or: "ou",
    builtBy: "Conçu et livré par Felipe Mejia · Felipe OS",
    langSwitch: "English",
  },
};

export const landings: Landing[] = [
  {
    slug: "openclaw-runtime",
    priceRange: "€2,500–€8,000",
    tech: ["Agent orchestration", "Local / on-device", "GDPR", "Guardrails"],
    en: {
      metaTitle: "OpenClaw Deployment for Business — Secure, GDPR-Compliant AI Agents",
      metaDescription:
        "I install, secure and configure OpenClaw so your AI agents actually do the work — locally, GDPR-compliant, with guardrails. Free diagnosis, deployment from €490.",
      heroEyebrow: "OpenClaw deployment",
      heroTitle: "AI agents that do the work — deployed securely on your infrastructure.",
      heroSub:
        "OpenClaw runs autonomous agents across 50+ tools (email, calendar, CRM, messaging). I deploy it securely and GDPR-compliant, so your data never leaves your control.",
      entryOffer: "Free diagnosis + secure deployment from €490",
      pains: [
        "Off-the-shelf chatbots answer questions but never actually do the task.",
        "Most agent setups leak data to third parties — a non-starter under GDPR/AI Act.",
        "Community agent skills are risky: misconfiguration is behind most incidents.",
      ],
      features: [
        { title: "Runs locally", desc: "Agents run on your machine or server — data stays in-house, fully GDPR-compliant." },
        { title: "Secured by default", desc: "Containerisation, authentication, audit logs and human-approval guardrails." },
        { title: "Connected to your tools", desc: "Email, calendar, CRM and messaging wired in so agents complete real tasks." },
      ],
      faq: [
        { q: "What is OpenClaw?", a: "An open-source platform for autonomous AI agents that use your tools to complete multi-step tasks — not just chat." },
        { q: "Is my data safe?", a: "Yes. I deploy it to run locally with a hardened, audited configuration, so data never leaves your environment." },
        { q: "How fast can it be live?", a: "A typical secure deployment is operational within days, starting from a free 30-minute diagnosis." },
      ],
      ctaTitle: "Deploy AI agents you can actually trust.",
      ctaSub: "Book a free diagnosis and I'll show you exactly what OpenClaw could run for your team.",
    },
    fr: {
      metaTitle: "Déploiement OpenClaw pour entreprise — Agents IA sécurisés et RGPD",
      metaDescription:
        "J'installe, sécurise et configure OpenClaw pour que vos agents IA fassent vraiment le travail — en local, conforme RGPD, avec garde-fous. Diagnostic gratuit, déploiement dès 490 €.",
      heroEyebrow: "Déploiement OpenClaw",
      heroTitle: "Des agents IA qui font le travail — déployés en sécurité sur votre infrastructure.",
      heroSub:
        "OpenClaw exécute des agents autonomes sur 50+ outils (e-mail, agenda, CRM, messagerie). Je le déploie en sécurité et conforme RGPD : vos données ne quittent jamais votre contrôle.",
      entryOffer: "Diagnostic gratuit + déploiement sécurisé dès 490 €",
      pains: [
        "Les chatbots standards répondent aux questions mais n'exécutent jamais la tâche.",
        "La plupart des installations d'agents envoient vos données à des tiers — incompatible RGPD/AI Act.",
        "Les compétences d'agents communautaires sont risquées : la mauvaise configuration est la 1re cause d'incident.",
      ],
      features: [
        { title: "Exécution locale", desc: "Les agents tournent sur votre machine ou serveur — vos données restent chez vous, conforme RGPD." },
        { title: "Sécurisé par défaut", desc: "Conteneurisation, authentification, journaux d'audit et garde-fous avec validation humaine." },
        { title: "Connecté à vos outils", desc: "E-mail, agenda, CRM et messagerie intégrés pour que les agents accomplissent de vraies tâches." },
      ],
      faq: [
        { q: "Qu'est-ce qu'OpenClaw ?", a: "Une plateforme open-source d'agents IA autonomes qui utilisent vos outils pour réaliser des tâches multi-étapes — pas seulement discuter." },
        { q: "Mes données sont-elles protégées ?", a: "Oui. Je le déploie en local avec une configuration durcie et auditée : les données ne quittent pas votre environnement." },
        { q: "En combien de temps c'est opérationnel ?", a: "Un déploiement sécurisé type est opérationnel en quelques jours, à partir d'un diagnostic gratuit de 30 minutes." },
      ],
      ctaTitle: "Déployez des agents IA en qui vous pouvez avoir confiance.",
      ctaSub: "Réservez un diagnostic gratuit et je vous montre ce qu'OpenClaw pourrait exécuter pour votre équipe.",
    },
  },
  {
    slug: "support-sav-agent",
    priceRange: "€3,500–€10,000",
    tech: ["RAG", "Ticket classification", "Human handoff", "GDPR"],
    en: {
      metaTitle: "AI Customer Support Agent (SAV) — Deflect Tickets, Keep Humans in Control",
      metaDescription:
        "An AI support agent that drafts accurate replies, classifies and routes tickets, and escalates the hard cases. GDPR-compliant. Free diagnosis, from €490.",
      heroEyebrow: "Customer support (SAV) agent",
      heroTitle: "Cut your support load without losing the human touch.",
      heroSub:
        "An AI agent trained on your docs and past tickets deflects repetitive questions, drafts accurate replies and escalates the cases that genuinely need a person.",
      entryOffer: "Free diagnosis + pilot from €490",
      pains: [
        "Agents spend most of the day answering the same handful of questions.",
        "Response times balloon before peak season and customers churn.",
        "Generic bots give wrong answers and damage trust.",
      ],
      features: [
        { title: "Grounded in your knowledge", desc: "Answers come from your docs and tickets (RAG), with citations — not hallucinations." },
        { title: "Classifies & routes", desc: "Tags, prioritises and routes every request to the right place automatically." },
        { title: "Human handoff", desc: "Hard or sensitive cases escalate to a person with full context attached." },
      ],
      faq: [
        { q: "Will it give wrong answers?", a: "It only answers from your approved content and hands off when unsure — you control the guardrails." },
        { q: "Which channels?", a: "Web chat, email and WhatsApp are the common ones; we scope yours on the call." },
        { q: "Is it GDPR-compliant?", a: "Yes — European hosting and data handling are part of the build." },
      ],
      ctaTitle: "Handle routine tickets in seconds.",
      ctaSub: "Book a free diagnosis and I'll estimate how much of your support volume is automatable.",
    },
    fr: {
      metaTitle: "Agent IA Service Client (SAV) — Désengorgez vos tickets, gardez l'humain",
      metaDescription:
        "Un agent IA qui rédige des réponses justes, classe et route les tickets, et escalade les cas difficiles. Conforme RGPD. Diagnostic gratuit, dès 490 €.",
      heroEyebrow: "Agent service client (SAV)",
      heroTitle: "Réduisez la charge du support sans perdre la relation humaine.",
      heroSub:
        "Un agent IA entraîné sur vos documents et tickets passés traite les questions répétitives, rédige des réponses justes et escalade les cas qui nécessitent vraiment un humain.",
      entryOffer: "Diagnostic gratuit + pilote dès 490 €",
      pains: [
        "Vos agents passent la journée à répondre aux mêmes questions.",
        "Les délais de réponse explosent avant les pics et les clients partent.",
        "Les bots génériques donnent de mauvaises réponses et abîment la confiance.",
      ],
      features: [
        { title: "Ancré dans votre savoir", desc: "Les réponses viennent de vos documents et tickets (RAG), avec sources — pas d'hallucinations." },
        { title: "Classe & route", desc: "Étiquette, priorise et route chaque demande automatiquement au bon endroit." },
        { title: "Relais humain", desc: "Les cas difficiles ou sensibles sont escaladés à un humain, contexte complet inclus." },
      ],
      faq: [
        { q: "Va-t-il donner de mauvaises réponses ?", a: "Il ne répond qu'à partir de votre contenu validé et passe la main en cas de doute — vous maîtrisez les garde-fous." },
        { q: "Quels canaux ?", a: "Chat web, e-mail et WhatsApp sont les plus courants ; on cadre les vôtres lors de l'appel." },
        { q: "Est-ce conforme RGPD ?", a: "Oui — hébergement et traitement des données en Europe font partie du build." },
      ],
      ctaTitle: "Traitez les tickets courants en quelques secondes.",
      ctaSub: "Réservez un diagnostic gratuit et j'estime la part de votre volume support automatisable.",
    },
  },
  {
    slug: "workflow-automation",
    priceRange: "€1,500–€6,000",
    tech: ["APIs", "Webhooks", "n8n / Make", "AI steps"],
    en: {
      metaTitle: "AI Workflow Automation for SMBs — Stop Doing It by Hand",
      metaDescription:
        "Connect the apps you already use and let AI handle the repetitive steps: intake, classification, data entry, follow-ups and reporting. Free diagnosis, from €490.",
      heroEyebrow: "Workflow automation",
      heroTitle: "Automate the repetitive work that quietly eats your week.",
      heroSub:
        "Quotes, follow-ups, invoices, reporting, data entry — I connect your tools and add AI where judgement is needed, so the busywork runs itself.",
      entryOffer: "Free diagnosis + first automation from €490",
      pains: [
        "Your team re-types the same data across three different tools.",
        "Follow-ups and reports depend on someone remembering to do them.",
        "You've outgrown spreadsheets but a full software project is overkill.",
      ],
      features: [
        { title: "Connect your stack", desc: "Email, CRM, sheets, forms and messaging wired together via APIs and webhooks." },
        { title: "AI where it matters", desc: "Classification, drafting and extraction handled by AI inside the workflow." },
        { title: "Reliable & visible", desc: "Runs on schedule with logging, so you can see exactly what happened and when." },
      ],
      faq: [
        { q: "Which tools can you connect?", a: "Most popular SaaS via n8n/Make or direct APIs — Google Workspace, CRMs, WhatsApp, and more." },
        { q: "Do I need to change tools?", a: "No — the point is to connect what you already use." },
        { q: "What's a good first automation?", a: "Usually the highest-volume manual task: lead intake, follow-ups or report generation." },
      ],
      ctaTitle: "Get hours back every week.",
      ctaSub: "Book a free diagnosis and I'll pick the first automation with the best payback.",
    },
    fr: {
      metaTitle: "Automatisation IA pour PME — Arrêtez de le faire à la main",
      metaDescription:
        "Connectez les outils que vous utilisez déjà et laissez l'IA gérer les étapes répétitives : saisie, classification, relances, reporting. Diagnostic gratuit, dès 490 €.",
      heroEyebrow: "Automatisation des workflows",
      heroTitle: "Automatisez le travail répétitif qui grignote vos semaines.",
      heroSub:
        "Devis, relances, factures, reporting, saisie — je connecte vos outils et ajoute l'IA là où il faut du jugement, pour que les tâches ingrates se fassent seules.",
      entryOffer: "Diagnostic gratuit + première automatisation dès 490 €",
      pains: [
        "Votre équipe ressaisit les mêmes données dans trois outils différents.",
        "Les relances et rapports dépendent de quelqu'un qui doit y penser.",
        "Vous avez dépassé les tableurs mais un vrai projet logiciel serait disproportionné.",
      ],
      features: [
        { title: "Connectez votre stack", desc: "E-mail, CRM, tableurs, formulaires et messagerie reliés via API et webhooks." },
        { title: "L'IA là où ça compte", desc: "Classification, rédaction et extraction prises en charge par l'IA dans le workflow." },
        { title: "Fiable & visible", desc: "Exécution planifiée avec journalisation : vous voyez exactement ce qui s'est passé." },
      ],
      faq: [
        { q: "Quels outils pouvez-vous connecter ?", a: "La plupart des SaaS via n8n/Make ou API directes — Google Workspace, CRM, WhatsApp, etc." },
        { q: "Dois-je changer d'outils ?", a: "Non — l'objectif est de connecter ce que vous utilisez déjà." },
        { q: "Quelle première automatisation ?", a: "Souvent la tâche manuelle la plus fréquente : réception de leads, relances ou génération de rapports." },
      ],
      ctaTitle: "Récupérez des heures chaque semaine.",
      ctaSub: "Réservez un diagnostic gratuit et je choisis la première automatisation la plus rentable.",
    },
  },
  {
    slug: "voice-agent",
    priceRange: "€4,000–€15,000",
    tech: ["Voice / telephony", "Call routing", "Booking", "GDPR"],
    en: {
      metaTitle: "AI Voice Agent (Callbot) — Answer Every Call, Book More",
      metaDescription:
        "A GDPR-compliant AI voice agent that answers and makes calls, qualifies, books appointments and routes to a human when needed. Free diagnosis, pilot available.",
      heroEyebrow: "AI voice agent / callbot",
      heroTitle: "Never miss a call — an AI voice agent that books and qualifies for you.",
      heroSub:
        "A natural-sounding voice agent answers inbound calls, qualifies callers, books appointments into your calendar and hands off to a human when it matters.",
      entryOffer: "Free diagnosis + scoped pilot",
      pains: [
        "Missed calls are missed revenue — especially after hours.",
        "Staff lose hours to repetitive phone enquiries and booking.",
        "Off-the-shelf voicebots sound robotic and frustrate callers.",
      ],
      features: [
        { title: "Answers & calls out", desc: "Handles inbound enquiries and can run outbound reminders or qualification." },
        { title: "Books into your calendar", desc: "Qualifies the caller and writes confirmed appointments straight to your system." },
        { title: "Human when it matters", desc: "Escalates complex or high-value calls to a person with context." },
      ],
      faq: [
        { q: "Does it sound robotic?", a: "Modern voice models sound natural; we tune tone and scripts to your brand." },
        { q: "What about GDPR?", a: "European hosting, call-recording consent and data handling are built in." },
        { q: "Can I try it first?", a: "Yes — we start with a scoped pilot on one use case before scaling." },
      ],
      ctaTitle: "Turn every call into a booking.",
      ctaSub: "Book a free diagnosis and I'll scope a voice-agent pilot for your busiest line.",
    },
    fr: {
      metaTitle: "Agent Vocal IA (Callbot) — Répondez à chaque appel, réservez plus",
      metaDescription:
        "Un agent vocal IA conforme RGPD qui répond et passe des appels, qualifie, prend des rendez-vous et passe la main à un humain si besoin. Diagnostic gratuit, pilote possible.",
      heroEyebrow: "Agent vocal IA / callbot",
      heroTitle: "Ne manquez plus un appel — un agent vocal IA qui réserve et qualifie pour vous.",
      heroSub:
        "Un agent vocal à la voix naturelle répond aux appels entrants, qualifie, prend les rendez-vous dans votre agenda et transfère à un humain quand c'est important.",
      entryOffer: "Diagnostic gratuit + pilote cadré",
      pains: [
        "Un appel manqué, c'est du chiffre d'affaires perdu — surtout hors horaires.",
        "Vos équipes perdent des heures sur des appels et prises de rendez-vous répétitifs.",
        "Les voicebots standards sonnent robotiques et agacent les appelants.",
      ],
      features: [
        { title: "Répond & appelle", desc: "Gère les demandes entrantes et peut lancer des rappels ou qualifications sortants." },
        { title: "Réserve dans votre agenda", desc: "Qualifie l'appelant et inscrit des rendez-vous confirmés directement dans votre système." },
        { title: "L'humain quand il faut", desc: "Escalade les appels complexes ou à forte valeur vers une personne, avec le contexte." },
      ],
      faq: [
        { q: "Est-ce que ça sonne robotique ?", a: "Les modèles vocaux récents sont naturels ; on règle le ton et les scripts à votre marque." },
        { q: "Et le RGPD ?", a: "Hébergement européen, consentement à l'enregistrement et traitement des données intégrés." },
        { q: "Puis-je tester d'abord ?", a: "Oui — on démarre par un pilote cadré sur un cas d'usage avant de passer à l'échelle." },
      ],
      ctaTitle: "Transformez chaque appel en rendez-vous.",
      ctaSub: "Réservez un diagnostic gratuit et je cadre un pilote d'agent vocal pour votre ligne la plus chargée.",
    },
  },
  {
    slug: "rag-knowledge-base",
    priceRange: "€4,000–€15,000",
    tech: ["Vector DB", "Embeddings", "Citations", "RAG"],
    en: {
      metaTitle: "RAG Knowledge Base — Turn Your Docs Into an Instant Answer Engine",
      metaDescription:
        "Turn your documents, wikis and tickets into a cited, instant answer engine for staff or customers. Accurate, GDPR-compliant. Free diagnosis, from €490.",
      heroEyebrow: "RAG knowledge base",
      heroTitle: "Instant, cited answers from your own documents.",
      heroSub:
        "Stop hunting through PDFs, wikis and old tickets. A retrieval-augmented (RAG) assistant gives your team or customers accurate answers — with sources.",
      entryOffer: "Free diagnosis + pilot from €490",
      pains: [
        "Knowledge is scattered across drives, wikis, PDFs and people's heads.",
        "New staff take months to find what they need.",
        "Generic AI invents answers because it doesn't know your content.",
      ],
      features: [
        { title: "Grounded & cited", desc: "Every answer links back to the source document, so it's verifiable." },
        { title: "Always current", desc: "Connects to your sources and re-indexes as content changes." },
        { title: "Private by design", desc: "European hosting; your knowledge isn't used to train anyone else's model." },
      ],
      faq: [
        { q: "What can it ingest?", a: "PDFs, Google Docs/Drive, Notion, wikis, past tickets and more." },
        { q: "How accurate is it?", a: "It answers from your content with citations and abstains when unsure." },
        { q: "Internal or customer-facing?", a: "Both — same engine, different access and tone." },
      ],
      ctaTitle: "Make your knowledge instantly searchable.",
      ctaSub: "Book a free diagnosis and I'll scope a knowledge base around your messiest content.",
    },
    fr: {
      metaTitle: "Base de connaissances RAG — Vos documents en moteur de réponses instantané",
      metaDescription:
        "Transformez vos documents, wikis et tickets en moteur de réponses instantané et sourcé, pour vos équipes ou clients. Précis, conforme RGPD. Diagnostic gratuit, dès 490 €.",
      heroEyebrow: "Base de connaissances RAG",
      heroTitle: "Des réponses instantanées et sourcées depuis vos propres documents.",
      heroSub:
        "Fini la chasse dans les PDF, wikis et anciens tickets. Un assistant RAG donne à vos équipes ou clients des réponses justes — avec les sources.",
      entryOffer: "Diagnostic gratuit + pilote dès 490 €",
      pains: [
        "Le savoir est éparpillé entre disques, wikis, PDF et la tête des gens.",
        "Les nouveaux mettent des mois à trouver l'information.",
        "L'IA générique invente des réponses car elle ne connaît pas votre contenu.",
      ],
      features: [
        { title: "Ancré & sourcé", desc: "Chaque réponse renvoie au document source : c'est vérifiable." },
        { title: "Toujours à jour", desc: "Se connecte à vos sources et ré-indexe quand le contenu évolue." },
        { title: "Privé par conception", desc: "Hébergement européen ; votre savoir n'entraîne pas le modèle d'un autre." },
      ],
      faq: [
        { q: "Que peut-il ingérer ?", a: "PDF, Google Docs/Drive, Notion, wikis, anciens tickets, etc." },
        { q: "Quelle précision ?", a: "Il répond à partir de votre contenu avec citations et s'abstient en cas de doute." },
        { q: "Interne ou client ?", a: "Les deux — même moteur, accès et ton différents." },
      ],
      ctaTitle: "Rendez votre savoir instantanément consultable.",
      ctaSub: "Réservez un diagnostic gratuit et je cadre une base de connaissances sur votre contenu le plus complexe.",
    },
  },
  {
    slug: "prospecting-agent",
    priceRange: "€3,500–€9,000",
    tech: ["Lead enrichment", "CRM integration", "Outreach drafting"],
    en: {
      metaTitle: "B2B Prospecting Agent — Fill Your Pipeline on Autopilot",
      metaDescription:
        "An AI prospecting agent that finds and qualifies leads, enriches their data, drafts personalised outreach and books meetings into your CRM. Free diagnosis.",
      heroEyebrow: "B2B prospecting agent",
      heroTitle: "A prospecting agent that finds, qualifies and books — while you sell.",
      heroSub:
        "It sources leads matching your ideal customer, enriches their data, drafts personalised outreach and books qualified meetings straight into your CRM.",
      entryOffer: "Free diagnosis + pilot campaign",
      pains: [
        "Reps spend more time researching leads than talking to them.",
        "Outreach is generic, so reply rates are low.",
        "Leads fall through the cracks between tools and follow-ups.",
      ],
      features: [
        { title: "Finds & enriches", desc: "Builds lists matching your ICP and fills in the data your CRM is missing." },
        { title: "Personalised outreach", desc: "Drafts tailored messages per prospect — you approve, it sends." },
        { title: "Books into your CRM", desc: "Qualified replies become meetings and pipeline records automatically." },
      ],
      faq: [
        { q: "Is this compliant?", a: "We design outreach to respect GDPR and platform rules — opt-out and consent handled." },
        { q: "Which channels?", a: "Email and LinkedIn are common; we match your motion." },
        { q: "Does it replace my reps?", a: "No — it removes the grunt work so your reps focus on conversations that close." },
      ],
      ctaTitle: "Keep your pipeline full without the busywork.",
      ctaSub: "Book a free diagnosis and I'll scope a prospecting pilot for your ICP.",
    },
    fr: {
      metaTitle: "Agent de Prospection B2B — Remplissez votre pipeline en pilote automatique",
      metaDescription:
        "Un agent IA de prospection qui trouve et qualifie des leads, enrichit leurs données, rédige des messages personnalisés et prend des rendez-vous dans votre CRM. Diagnostic gratuit.",
      heroEyebrow: "Agent de prospection B2B",
      heroTitle: "Un agent de prospection qui trouve, qualifie et réserve — pendant que vous vendez.",
      heroSub:
        "Il identifie des leads correspondant à votre client idéal, enrichit leurs données, rédige des messages personnalisés et prend des rendez-vous qualifiés directement dans votre CRM.",
      entryOffer: "Diagnostic gratuit + campagne pilote",
      pains: [
        "Les commerciaux passent plus de temps à chercher des leads qu'à leur parler.",
        "Les messages sont génériques, donc les taux de réponse sont faibles.",
        "Des leads se perdent entre les outils et les relances.",
      ],
      features: [
        { title: "Trouve & enrichit", desc: "Construit des listes selon votre ICP et complète les données manquantes du CRM." },
        { title: "Messages personnalisés", desc: "Rédige des messages sur-mesure par prospect — vous validez, il envoie." },
        { title: "Réserve dans le CRM", desc: "Les réponses qualifiées deviennent des rendez-vous et des entrées de pipeline automatiquement." },
      ],
      faq: [
        { q: "Est-ce conforme ?", a: "On conçoit la prospection dans le respect du RGPD et des règles des plateformes — désinscription et consentement gérés." },
        { q: "Quels canaux ?", a: "E-mail et LinkedIn principalement ; on s'adapte à votre méthode." },
        { q: "Cela remplace mes commerciaux ?", a: "Non — ça enlève le travail ingrat pour qu'ils se concentrent sur les conversations qui closent." },
      ],
      ctaTitle: "Gardez un pipeline plein sans le travail ingrat.",
      ctaSub: "Réservez un diagnostic gratuit et je cadre un pilote de prospection sur votre ICP.",
    },
  },
  {
    slug: "ai-assistant",
    priceRange: "€4,000–€12,000",
    tech: ["RAG", "APIs", "Claude / OpenAI", "GDPR"],
    en: {
      metaTitle: "Custom AI Assistant — Trained on Your Business, In Your Tools",
      metaDescription:
        "A branded AI assistant trained on your docs and connected to your tools — in your website, Slack or WhatsApp. GDPR-compliant. Free diagnosis, from €490.",
      heroEyebrow: "Custom AI assistant",
      heroTitle: "Your own AI assistant — trained on your business, where your team works.",
      heroSub:
        "Not a generic chatbot. A branded assistant that knows your products, docs and processes, and can take action through your tools.",
      entryOffer: "Free diagnosis + pilot from €490",
      pains: [
        "Generic AI tools don't know your business and give vague answers.",
        "Your team copies context between five tabs to get anything done.",
        "You want AI in your operations but don't know where to start safely.",
      ],
      features: [
        { title: "Knows your business", desc: "Trained on your docs, products and processes via RAG — accurate, on-brand answers." },
        { title: "Where your team works", desc: "Embedded in your website, Slack or WhatsApp — no new tool to learn." },
        { title: "Takes action", desc: "Connected to your tools so it can do tasks, not just answer questions." },
      ],
      faq: [
        { q: "How is this different from ChatGPT?", a: "It's grounded in your content and connected to your tools, with guardrails you control." },
        { q: "Where can it live?", a: "Website widget, Slack, WhatsApp or internal portal — your choice." },
        { q: "Is my data safe?", a: "Yes — European hosting and no training on your data by third parties." },
      ],
      ctaTitle: "Give your team an assistant that actually knows your business.",
      ctaSub: "Book a free diagnosis and I'll scope an assistant around your highest-value use case.",
    },
    fr: {
      metaTitle: "Assistant IA sur-mesure — Entraîné sur votre activité, dans vos outils",
      metaDescription:
        "Un assistant IA à votre marque, entraîné sur vos documents et connecté à vos outils — dans votre site, Slack ou WhatsApp. Conforme RGPD. Diagnostic gratuit, dès 490 €.",
      heroEyebrow: "Assistant IA sur-mesure",
      heroTitle: "Votre propre assistant IA — entraîné sur votre activité, là où votre équipe travaille.",
      heroSub:
        "Pas un chatbot générique. Un assistant à votre marque qui connaît vos produits, documents et processus, et peut agir via vos outils.",
      entryOffer: "Diagnostic gratuit + pilote dès 490 €",
      pains: [
        "Les outils IA génériques ne connaissent pas votre activité et restent vagues.",
        "Votre équipe copie le contexte entre cinq onglets pour avancer.",
        "Vous voulez de l'IA dans vos opérations mais ne savez pas par où commencer sereinement.",
      ],
      features: [
        { title: "Connaît votre activité", desc: "Entraîné sur vos documents, produits et processus via RAG — des réponses justes et à votre image." },
        { title: "Là où l'équipe travaille", desc: "Intégré à votre site, Slack ou WhatsApp — aucun nouvel outil à apprendre." },
        { title: "Passe à l'action", desc: "Connecté à vos outils pour exécuter des tâches, pas seulement répondre." },
      ],
      faq: [
        { q: "En quoi est-ce différent de ChatGPT ?", a: "Il est ancré dans votre contenu et connecté à vos outils, avec des garde-fous que vous contrôlez." },
        { q: "Où peut-il vivre ?", a: "Widget site web, Slack, WhatsApp ou portail interne — au choix." },
        { q: "Mes données sont-elles protégées ?", a: "Oui — hébergement européen et aucune utilisation de vos données pour entraîner des tiers." },
      ],
      ctaTitle: "Offrez à votre équipe un assistant qui connaît vraiment votre activité.",
      ctaSub: "Réservez un diagnostic gratuit et je cadre un assistant sur votre cas d'usage le plus rentable.",
    },
  },
];

export const locales: Locale[] = ["en", "fr"];

export function getLanding(slug: string) {
  return landings.find((l) => l.slug === slug);
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr";
}
