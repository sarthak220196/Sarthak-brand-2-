/**
 * THE SINGLE SOURCE OF TRUTH FOR THE SITE.
 * Edit this file to update copy, career, projects and travel.
 * Contact and social links live in /site.config.ts.
 *
 * Links set to null render as a quiet "coming soon" label instead of a dead link.
 * Only facts supplied by Sarthak are in here. Keep it that way.
 */

export type Status = "closed" | "pipeline";

export interface LedgerItem {
  text: string;
  status: Status;
}

export interface Figure {
  /** Copied verbatim from the CV/brief. Never estimate. */
  value: string;
  label: string;
}

export interface CaseStudy {
  /** Every line must come from the CV or brief. */
  context: string;
  did: string[];
  /** The outcome column shows the role's figures. */
}

export interface Role {
  company: string;
  dates: string;
  /** Role or focus. Replace with exact job titles where you prefer them. */
  role: string;
  context?: string;
  figures?: Figure[];
  points: string[];
  ledger?: LedgerItem[];
  note?: string;
  caseStudy?: CaseStudy;
}

export type StageId = "build" | "grow" | "lead" | "sell" | "connect";

export interface Stage {
  id: StageId;
  verb: string;
  chapter: string;
  years: string;
  lesson: string;
  carriedForward: string;
  /** Toolkit capabilities this chapter gives evidence for. */
  capabilities: CapabilityId[];
  roles: Role[];
}

export const person = {
  name: "Sarthak Sighat",
  base: "Mumbai, India",
  statement: "I connect people, technology and opportunity.",
  kicker: "I make things happen.",
  pillars: ["People.", "Products.", "Markets.", "Business."],
  identity:
    "Engineering graduate turned commercial operator. Product, go-to-market, sales leadership, enterprise sales and strategic partnerships, across B2B SaaS and fintech, in markets from APAC to the Americas.",
  now: "International business development and strategic partnerships at Unlimit",
};

export const stages: Stage[] = [
  {
    id: "build",
    capabilities: ["commercial", "product"],
    verb: "Build",
    chapter: "The builder",
    years: "2019–2021",
    lesson: "Taking a product from development all the way into the market, and owning what happens there.",
    carriedForward: "Product ownership and commercial execution",
    roles: [
      {
        company: "Creative Awards & Rewards",
        dates: "2019–2021",
        role: "Product strategy, demand generation and sales",
        figures: [{ value: "$300K+", label: "revenue from a B2B product, sold to hospitals and airlines" }],
        points: [],
        caseStudy: {
          context: "A B2B product, taken from development into the market.",
          did: ["Owned product strategy.", "Owned demand generation.", "Owned sales execution."],
        },
      },
    ],
  },
  {
    id: "grow",
    capabilities: ["gtm", "enterprise"],
    verb: "Grow",
    chapter: "The GTM operator",
    years: "2021–2023",
    lesson: "How to create demand from nothing, open new regions and turn outbound into a repeatable engine.",
    carriedForward: "Demand creation and market entry",
    roles: [
      {
        company: "Rocketium",
        dates: "Jan 2021 – Apr 2022",
        role: "Sales development and outbound",
        figures: [{ value: "190%+", label: "of quota" }],
        points: ["Built outbound motions for new regions.", "Mentored junior SDRs.", "Optimised sales playbooks."],
      },
      {
        company: "Toddle",
        dates: "Apr 2022 – Mar 2023",
        role: "Outbound GTM strategy",
        context: "APAC, North America, LATAM",
        figures: [
          { value: "$300K+", label: "outbound pipeline built" },
          { value: "145%+", label: "of quota, two consecutive quarters" },
          { value: "+25%", label: "SQLs" },
        ],
        points: ["Designed outbound GTM strategy across APAC, North America and LATAM."],
      },
    ],
  },
  {
    id: "lead",
    capabilities: ["leadership", "gtm"],
    verb: "Lead",
    chapter: "The team lead",
    years: "2023–2024",
    lesson: "Building a team and a system, not only hitting a number myself.",
    carriedForward: "Leading people and building structure",
    roles: [
      {
        company: "Sprinto",
        dates: "Mar 2023 – Apr 2024",
        role: "SDR Manager, inbound and outbound",
        context: "APAC, USA",
        figures: [
          { value: "4", label: "SDRs led and coached" },
          { value: "$300K+", label: "qualified pipeline, APAC and USA" },
          { value: "+35%", label: "lead-to-meeting conversion" },
        ],
        points: [],
        caseStudy: {
          context: "Sprinto had no structured outbound engine yet.",
          did: ["Built the company's first structured outbound engine.", "Led and coached four SDRs across inbound and outbound."],
        },
      },
    ],
  },
  {
    id: "sell",
    capabilities: ["enterprise", "commercial", "product"],
    verb: "Sell",
    chapter: "The enterprise seller",
    years: "2024–2026",
    lesson:
      "Navigating complex enterprise relationships, long evaluations and real commercial negotiation, in fintech and payments.",
    carriedForward: "Full-cycle enterprise selling in regulated fintech",
    roles: [
      {
        company: "PortOne",
        dates: "Apr 2024 – Sep 2025",
        role: "Full-cycle enterprise sales, fintech and payments",
        context: "SEA, EU, USA",
        figures: [
          { value: "$500K+", label: "qualified pipeline built and managed" },
          { value: "90–104%", label: "of quarterly quota" },
          { value: "$30K–$60K", label: "ARR per enterprise contract closed" },
        ],
        points: [],
        caseStudy: {
          context: "Full-cycle enterprise sales to global e-commerce and fintech merchants, across SEA, the EU and the USA.",
          did: [
            "Led discovery, demos, negotiation and onboarding.",
            "Worked with product and engineering on API and integration-led solutions.",
          ],
        },
      },
      {
        company: "Glomo",
        dates: "Sep 2025 – Feb 2026",
        role: "Global Account Executive",
        context: "Regulated, compliance-focused fintech, GIFT City",
        figures: [{ value: "3", label: "customers closed and onboarded end to end" }],
        points: ["Generated additional outbound pipeline.", "Progressed several opportunities to late-stage evaluation."],
        note: "Moved on for surgery and recovery.",
      },
    ],
  },
  {
    id: "connect",
    capabilities: ["partnerships", "enterprise", "gtm"],
    verb: "Connect",
    chapter: "The partnerships builder",
    years: "2026 – now",
    lesson: "Moving from selling to one buyer towards building networks of partners, merchants and markets.",
    carriedForward: "Partnerships and networks across global payments",
    roles: [
      {
        company: "Unlimit",
        dates: "Apr 2026 – present",
        role: "International business development and strategic partnerships",
        context: "Cross-border payments, primarily global markets",
        points: [],
        ledger: [
          { text: "Two strategic partners", status: "closed" },
          { text: "Two enterprise merchants", status: "closed" },
          { text: "Opportunities across insurance companies", status: "pipeline" },
          { text: "Opportunities across fashion and e-commerce", status: "pipeline" },
          { text: "A significant opportunity with Mswipe", status: "pipeline" },
          { text: "Relationships with larger players in international payments", status: "pipeline" },
        ],
      },
    ],
  },
];

/** Domain depth from the payments chapters. Listed as knowledge areas, not claims of outcomes. */
export const paymentsDepth = [
  "Cross-border payments",
  "Global acquiring",
  "Payment service providers",
  "Alternative payment methods",
  "Banking and financial infrastructure",
  "Local payment ecosystems",
  "Jurisdiction-specific regulation",
  "Enterprise merchant acquisition",
];

export type CapabilityId = "commercial" | "enterprise" | "gtm" | "partnerships" | "product" | "leadership";

export interface Evidence {
  company: string;
  text: string;
  pipeline?: boolean;
}

export interface Capability {
  id: CapabilityId;
  name: string;
  short: string;
  /** Plain description of the capability, no claims. */
  summary: string;
  /** Kinds of problem this applies to. Framed as uses, not as past results. */
  usefulFor: string[];
  evidence: Evidence[];
}

export const toolkit: Capability[] = [
  {
    id: "commercial",
    name: "Commercial strategy",
    short: "Commercial",
    summary: "Turning a product or opportunity into a commercial plan, then owning the numbers that follow.",
    usefulFor: ["Taking a new product to market", "Structuring and negotiating commercial deals"],
    evidence: [
      { company: "Creative Awards & Rewards", text: "Owned product strategy, demand generation and sales execution for a B2B product that generated $300K+." },
      { company: "PortOne", text: "Led discovery, demos and negotiation; closed enterprise contracts worth $30K–$60K ARR." },
      { company: "Unlimit", text: "Closed two strategic partners and two enterprise merchants." },
      { company: "Side projects", text: "Chatterbubble: chose to shut down a bootstrapped venture without product-market fit rather than burn more." },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise growth and business development",
    short: "Enterprise",
    summary: "Building qualified pipeline with large customers and taking it through to signature and onboarding.",
    usefulFor: ["Opening and growing enterprise accounts", "Long, multi-stakeholder sales cycles"],
    evidence: [
      { company: "PortOne", text: "Built and managed $500K+ qualified pipeline; 90–104% of quarterly quota." },
      { company: "Glomo", text: "Closed and onboarded three customers end to end; progressed several opportunities to late-stage evaluation." },
      { company: "Unlimit", text: "Two enterprise merchants closed." },
      { company: "Unlimit", text: "Opportunities across insurance, and fashion and e-commerce.", pipeline: true },
    ],
  },
  {
    id: "gtm",
    name: "Go-to-market and international expansion",
    short: "GTM",
    summary: "Designing how a company reaches a new market, and building the outbound engine to do it.",
    usefulFor: ["Entering new regions", "Building outbound from zero"],
    evidence: [
      { company: "Rocketium", text: "Built outbound motions for new regions; 190%+ of quota." },
      { company: "Toddle", text: "Designed outbound GTM strategy across APAC, North America and LATAM; $300K+ outbound pipeline; SQLs up 25%." },
      { company: "Sprinto", text: "Built the company's first structured outbound engine." },
      { company: "PortOne", text: "Pipeline across SEA, the EU and the USA." },
      { company: "Side projects", text: "Chatterbubble: took an AEO/GEO offering to businesses, especially cybersecurity brands looking for new leads." },
    ],
  },
  {
    id: "partnerships",
    name: "Strategic partnerships and ecosystems",
    short: "Partnerships",
    summary: "Finding the partners that move a business further than direct sales can, and making the relationship work.",
    usefulFor: ["Building partner and channel ecosystems", "Working with larger players across a market"],
    evidence: [
      { company: "Unlimit", text: "Two strategic partners closed." },
      { company: "Unlimit", text: "A significant opportunity with Mswipe.", pipeline: true },
      { company: "Unlimit", text: "Relationships with larger players across international payments.", pipeline: true },
    ],
  },
  {
    id: "product",
    name: "Product and technical fluency",
    short: "Product",
    summary: "Engineering education, product ownership and hands-on building, so technical conversations stay grounded.",
    usefulFor: ["Selling API and integration-led products", "Sitting between customers, product and engineering"],
    evidence: [
      { company: "Education", text: "Engineering graduate." },
      { company: "Creative Awards & Rewards", text: "Involved in developing and launching a B2B product." },
      { company: "PortOne", text: "Worked with product and engineering on API and integration-led solutions." },
      { company: "Side projects", text: "Built the RememberMe MVP with Next.js, Mapbox and location-history JSON decoding." },
      { company: "Side projects", text: "Chatterbubble: built around AEO and GEO, ranking businesses in AI search." },
    ],
  },
  {
    id: "leadership",
    name: "Leadership and cross-functional execution",
    short: "Leadership",
    summary: "Raising the output of a team and the system around it, and working across functions to get things shipped.",
    usefulFor: ["Leading and coaching early-career teams", "Turning playbooks into repeatable process"],
    evidence: [
      { company: "Rocketium", text: "Mentored junior SDRs and optimised sales playbooks." },
      { company: "Sprinto", text: "Led and coached four SDRs; lead-to-meeting conversion up 35%." },
      { company: "PortOne", text: "Worked across product and engineering on customer solutions." },
    ],
  },
];

export interface Region {
  id: string;
  name: string;
  lon: number;
  lat: number;
}

/** Regions named in the career history. lon/lat are approximate centres for the map. */
export const regions: Region[] = [
  { id: "na", name: "North America", lon: -98, lat: 40 },
  { id: "latam", name: "LATAM", lon: -60, lat: -12 },
  { id: "eu", name: "EU", lon: 12, lat: 49 },
  { id: "apac", name: "APAC", lon: 132, lat: 34 },
  { id: "sea", name: "SEA", lon: 106, lat: 6 },
  { id: "gift", name: "GIFT City", lon: 72.6, lat: 23.2 },
];

export const home = { name: "Mumbai", lon: 72.88, lat: 19.07 };

export interface Route {
  company: string;
  dates: string;
  /** "global" = no specific markets named */
  regions: string[] | "global";
  /** What happened there, in words from the CV. */
  summary: string;
}

/** In career order. Rocketium is omitted: its "new regions" were not named. */
export const routes: Route[] = [
  { company: "Toddle", dates: "Apr 2022 – Mar 2023", regions: ["apac", "na", "latam"], summary: "Outbound GTM strategy designed across APAC, North America and LATAM. $300K+ outbound pipeline." },
  { company: "Sprinto", dates: "Mar 2023 – Apr 2024", regions: ["apac", "na"], summary: "$300K+ qualified pipeline across APAC and the USA." },
  { company: "PortOne", dates: "Apr 2024 – Sep 2025", regions: ["sea", "eu", "na"], summary: "$500K+ qualified pipeline across SEA, the EU and the USA." },
  { company: "Glomo", dates: "Sep 2025 – Feb 2026", regions: ["gift"], summary: "Global account executive in regulated, compliance-focused fintech, based out of GIFT City." },
  { company: "Unlimit", dates: "Apr 2026 – present", regions: "global", summary: "Cross-border payments with a primarily global focus. Specific markets aren't listed here." },
];

/**
 * Project status, shown as a label:
 *  "Concept"    explored on paper: positioning, use cases, GTM. No product.
 *  "Experiment" built to learn; works on my machine.
 *  "Prototype"  built and demonstrable to others.
 *  "Deployed"   live for real users.
 *  "Shut down"  built and run with real businesses, then closed.
 * Use the lowest one that is true.
 */
export type ProjectStatus = "Concept" | "Experiment" | "Prototype" | "Deployed" | "Shut down";

export interface Project {
  name: string;
  status: ProjectStatus;
  summary: string;
  /** An honest closing line: what happened, or why it stopped. */
  note?: string;
  stack: string[];
  url: string | null;
}

export const projects: Project[] = [
  {
    name: "RememberMe / I-WAS-THERE",
    status: "Experiment",
    summary:
      "A curiosity project. It turns Google Timeline location history into an interactive personal timeline you can scrub back through. Scroll far enough and you get that moment: wait, I was there. An old spot, a particular place, and a memory unlocks.",
    note: "I built an MVP and never took it further. It's still an experiment I'm proud of.",
    stack: ["Next.js", "Mapbox", "Location-history JSON decoding", "Timeline visualisation"],
    url: null,
  },
  {
    name: "Chatterbubble",
    status: "Shut down",
    summary:
      "A bootstrapped venture built around AEO and GEO: helping businesses rank in AI search and turn that visibility into leads. Beyond marketing, it gave them a new inbound channel. We engaged with a lot of businesses, especially cybersecurity brands looking for new leads.",
    note: "We shut it down because we didn't find product-market fit and didn't want to burn more.",
    stack: ["Answer engine optimisation (AEO)", "Generative engine optimisation (GEO)", "AI search", "Inbound lead generation"],
    url: null,
  },
  // Add other genuine projects here with the same shape.
]

/** Things Sarthak has said he enjoys. Add only what's true. */
export const interests = ["Travel and new places", "Technology", "Building things", "Interesting conversations", "New ideas"];

/** How I work: each principle is tied to something that actually happened. */
export const workingStyle = [
  { principle: "Build the system, not just the number.", proof: "Built Sprinto's first structured outbound engine and coached four SDRs to run it." },
  { principle: "Close the loop.", proof: "At Glomo, closed and onboarded three customers end to end. At PortOne, led everything from discovery to onboarding." },
  { principle: "Work across the table.", proof: "At PortOne, worked with product and engineering on API and integration-led solutions." },
  { principle: "Stay curious.", proof: "Built RememberMe, a location-history timeline, simply to see what it would feel like." },
  { principle: "Know when to stop.", proof: "Shut down Chatterbubble, a bootstrapped venture, when we hadn't found product-market fit, rather than burn more." },
];

/**
 * Travel journal. Empty on purpose: add only places actually visited.
 * Example entry:
 * { place: "City, Country", when: "2024", story: "One or two lines.", photo: "/photos/city.jpg" }
 */
export interface Place {
  place: string;
  when: string;
  story: string;
  photo?: string;
}
export const places: Place[] = [];

export const stations = [
  { id: "top", label: "Intro", freq: "88.0" },
  { id: "work", label: "Journey", freq: "92.4" },
  { id: "network", label: "Markets", freq: "96.1" },
  { id: "toolkit", label: "Toolkit", freq: "99.9" },
  { id: "builds", label: "Builder", freq: "103.1" },
  { id: "person", label: "Person", freq: "105.7" },
  { id: "hello", label: "Let's talk", freq: "108.0" },
] as const;

export type StationId = (typeof stations)[number]["id"];
