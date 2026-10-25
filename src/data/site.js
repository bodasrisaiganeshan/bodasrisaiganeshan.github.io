/**
 * Single source of truth, carried forward from portfolio v2 through v5 into v6.
 *
 * FACT DISCIPLINE — carried over from v1 and non-negotiable:
 * every value here is either confirmed by Boda Sri Sai Ganeshan or is an
 * explicitly marked placeholder. Nothing is invented. In particular there are
 * NO proficiency levels, NO year counts, NO years-of-experience values, NO
 * CGPA, NO graduation year, NO metrics and NO user counts anywhere in this
 * file, because none of those were ever confirmed.
 *
 * v2 adds presentational copy (section kickers, the marquee word list, the
 * stat-strip labels) but adds no new CLAIMS: every figure in `metrics` is a
 * count of items that appear elsewhere in this same file, so it cannot drift.
 */

export const profile = {
  firstLine: 'Boda Sri Sai',
  secondLine: 'Ganeshan',
  // Split so the display face and the serif-italic clause can be set separately.
  roleLead: 'Web & Software',
  roleClause: 'Developer',
  eyebrow: 'B.Tech CSE (AI & ML) · Presidency University Bangalore',
  subtitle: 'Web & Software Developer | Building AI/ML Projects',
  description:
    "I'm a second-year engineering student who learns by building practical projects — from a live utility platform to computer-vision and study-planning prototypes.",
  location: 'Bangalore, India',
};

/**
 * Hero index — focus areas and the one live project.
 *
 * `focus` is the set of areas stated by the owner, in the owner's own wording.
 * These are stated INTERESTS AND AREAS OF WORK, not proficiencies, and carry no
 * level, rating or year count. `primary` marks the two areas already evidenced
 * by shipped work elsewhere on this page — it drives emphasis only and claims
 * nothing beyond that.
 */
export const heroIndex = {
  focusLabel: 'Focus',
  focus: [
    { id: 'web', name: 'Web & Software Development', primary: true },
    { id: 'aiml', name: 'AI / ML', primary: true },
    { id: 'app', name: 'Application Development', primary: false },
    { id: 'game', name: 'Game Development', primary: false },
  ],
  liveLabel: 'Live now',
  scrollLabel: 'Scroll',
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

/**
 * The marquee band under the hero.
 *
 * Every word is lifted from `skills` or `heroIndex.focus` below — the band is a
 * restatement in motion, not a new list, so it can never claim a technology
 * that is not already stated as a skill.
 */
export const marqueeWords = [
  'React',
  'Python',
  'Computer Vision',
  'Flask',
  'JavaScript',
  'MediaPipe',
  'Java',
  'Tailwind CSS',
  'OpenCV',
  'Machine Learning',
  'Vite',
  'C',
];

export const about = {
  label: '01',
  labelText: 'About',
  kicker: 'Who is behind this',
  heading: {
    lead: 'Building by learning,',
    accent: 'learning by building.',
  },
  paragraphs: [
    "I'm a second-year B.Tech CSE (AI & ML) student at Presidency University, Bangalore. I learn by building practical projects rather than stopping at tutorials.",
    'My work spans web development, software development, AI/ML experimentation and application development. I enjoy turning ideas into working prototypes and improving them through iteration.',
  ],
  projectsLabel: 'Currently building',
  projects: [
    { name: 'Samastam', note: 'India-focused utility platform', primary: true },
    { name: 'GYM-BUDDY', note: 'Computer-vision fitness prototype', primary: false },
    { name: 'IdeaSpark', note: 'Study-planning prototype', primary: false },
  ],
};

/**
 * The stat strip.
 *
 * DELIBERATELY NOT vanity metrics. Every `value` is either a count of entries
 * that exist elsewhere in this file, or a plainly verifiable fact — so nothing
 * here can be an invented number. There is no "years of experience", no
 * "happy clients", no "lines of code".
 *
 *   3   = projects.items.length
 *   60+ = stated in the Samastam description, the owner's own wording
 *   4   = certifications: 1 programme + 3 HackerRank badges
 *   2nd = the confirmed year of study
 */
export const metrics = [
  { id: 'projects', value: '3', label: 'Projects built', note: 'one live, two prototypes' },
  { id: 'tools', value: '60+', label: 'Utility tools', note: 'shipped on Samastam' },
  { id: 'certs', value: '4', label: 'Certifications', note: '1 programme · 3 verified skills' },
  { id: 'year', value: '2nd', label: 'Year of B.Tech', note: 'CSE (AI & ML)' },
];

export const skills = {
  label: '02',
  labelText: 'Skills',
  kicker: 'What I build with',
  heading: {
    lead: 'The tools I build with,',
    accent: 'and keep learning.',
  },
  intro:
    'Technologies and areas I am actively developing as a B.Tech CSE (AI & ML) student.',
  // No proficiency values, levels or ratings anywhere — the section states what
  // is being worked on, not how well.
  groups: [
    {
      id: 'programming',
      title: 'Programming',
      note: 'Languages I write day to day',
      items: ['Python', 'Java', 'C'],
    },
    {
      id: 'web',
      title: 'Web & Application Development',
      note: 'The stack behind the shipped work',
      items: [
        'React.js',
        'JavaScript',
        'Web Development',
        'Flask',
        'Tailwind CSS',
        'Application Development',
      ],
    },
    {
      id: 'ai',
      title: 'AI / ML & Computer Vision',
      note: 'Where the prototypes are heading',
      items: [
        'Artificial Intelligence (AI)',
        'Machine Learning',
        'Computer Vision',
        'OpenCV',
        'MediaPipe',
      ],
    },
  ],
};

export const projects = {
  label: '03',
  labelText: 'Projects',
  kicker: 'Selected work',
  heading: {
    lead: 'Things I have built,',
    accent: 'and keep building.',
  },
  items: [
    {
      id: 'samastam',
      index: '01',
      name: 'Samastam',
      tagline: 'India-Focused Utility Tools Platform',
      category: 'Live web platform',
      // V6 card copy: a shortened restatement of the first paragraph below.
      summary:
        'A live India-focused web platform offering 60+ practical utility tools across GST, taxation, finance, document generation, conversions and lookups.',
      // Screenshot of the live samastam.xyz homepage, carried over from V5.
      preview: {
        src: '/projects/samastam.webp',
        width: 1280,
        height: 800,
        alt: 'Samastam homepage: the samastam wordmark over an illustrated forest, with an Explore Tools button.',
      },
      featured: true,
      year: null, // No date was confirmed. Do not add one.
      paragraphs: [
        'Samastam is a live India-focused web platform offering 60+ practical utility tools across areas such as GST, taxation, finance, document generation, conversions and lookups.',
        'I contributed to the web development, tool logic and implementation, using React, Vite, Tailwind CSS and a prerendering pipeline deployed on Cloudflare Pages.',
        'Claude was used as an AI coding assistant during development.',
      ],
      tech: ['React', 'Vite', 'Tailwind CSS', 'Cloudflare Pages'],
      status: null,
      link: { kind: 'site', label: 'samastam.xyz', href: 'https://samastam.xyz/' },
    },
    {
      id: 'gym-buddy',
      index: '02',
      name: 'GYM-BUDDY',
      tagline: 'Computer-Vision Fitness Prototype',
      category: 'Computer-vision prototype',
      summary:
        'A working fitness prototype that uses MediaPipe pose estimation with OpenCV to analyse exercise form from a webcam and count repetitions.',
      // Captured from the GYM-BUDDY repository running locally (/trainer page,
      // camera off). Nothing in the frame was edited.
      preview: {
        src: '/projects/gym-buddy.webp',
        width: 1280,
        height: 800,
        alt: 'GYM-BUDDY AI Workout Trainer page: a live camera feed panel beside exercise selection, a repetition counter and how-to steps.',
      },
      featured: false,
      year: null,
      paragraphs: [
        'GYM-BUDDY is a functional computer-vision fitness prototype that uses MediaPipe pose estimation with OpenCV to analyse exercise form from a webcam and count repetitions.',
        'It includes exercise-specific tracking logic, BMI and diet planning, habit streaks, performance analysis, a gym finder, user accounts and session authentication, and a rule-based fitness chatbot.',
      ],
      tech: ['Python', 'Flask', 'MediaPipe', 'OpenCV', 'NumPy', 'Jinja2', 'SQLite'],
      status: 'This is a working prototype, not a finished production or commercial product.',
      link: {
        kind: 'repo',
        label: 'GitHub repository',
        href: 'https://github.com/bodasrisaiganeshan/GYM-BUDDY',
      },
    },
    {
      id: 'ideaspark',
      index: '03',
      name: 'IdeaSpark',
      tagline: 'AI-Assisted Study Planner (Prototype)',
      category: 'Study-planner prototype',
      summary:
        'A near-complete study planner prototype that schedules work around mental energy rather than only calendar availability, with a focus timer and analytics.',
      // Captured from the IdeaSpark repository's own production build, run
      // locally after its onboarding with default values. Nothing was edited.
      preview: {
        src: '/projects/ideaspark.webp',
        width: 1280,
        height: 800,
        alt: 'IdeaSpark dashboard: a sidebar with Planner, Focus Mode and Analytics, a morning check-in card, an energy level meter and a today’s schedule panel.',
      },
      featured: false,
      year: null,
      paragraphs: [
        'IdeaSpark is a near-complete study planner prototype that schedules work around mental energy rather than only calendar availability.',
        'It uses a two-pass scheduling approach with recovery breaks, a focus timer with multiple modes, analytics, and a browser-based local data layer. It also supports optional AI-assisted scheduling with a local scheduling fallback when an AI response cannot be parsed.',
      ],
      tech: ['React', 'Vite', 'Tailwind CSS', 'Dexie/IndexedDB', 'Recharts'],
      status:
        'This is a near-complete prototype, not a finished production or commercial product.',
      link: {
        kind: 'repo',
        label: 'GitHub repository',
        href: 'https://github.com/bodasrisaiganeshan/IdeaSpark',
      },
    },
  ],
};

export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    // Confirmed: git remote origin of the IdeaSpark and GYM-BUDDY repositories.
    href: 'https://github.com/bodasrisaiganeshan',
    verified: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    // Confirmed: current LinkedIn public profile URL.
    href: 'https://www.linkedin.com/in/ganesh-boda-1a09bb3a2/',
    verified: true,
  },
  {
    id: 'email',
    label: 'Email',
    // PLACEHOLDER — awaiting confirmation of the address to publish.
    // Do not replace with a guessed address.
    href: null,
    placeholder: 'Email address to be confirmed',
    verified: false,
  },
];

/**
 * Certifications.
 *
 * Three groups kept apart because they are three different kinds of document.
 * `kind` drives the treatment so the participation group can be rendered
 * separately from the two credentialed groups.
 *
 * Every title, name, date and ID is transcribed from the certificate itself, as
 * printed. `recipientName` differs between documents because the documents
 * differ — it is not normalised. There are no scores, grades, levels or
 * rankings anywhere, because none appear on any source certificate.
 */
export const certifications = {
  label: '04',
  labelText: 'Certifications',
  kicker: 'Paper trail',
  heading: {
    lead: 'What I have completed,',
    accent: 'and where I showed up.',
  },
  intro:
    'Certifications and programmes I have completed, and tech-fest events I took part in.',
  groups: [
    {
      id: 'programme',
      kind: 'programme',
      title: 'Programme certification',
      items: [
        {
          id: 'unlox-edge-ai',
          // Title exactly as printed on the certificate.
          title: 'Unlox Edge Certification specialized in Artificial Intelligence',
          programme: 'Job Bridge Program',
          // The certificate refers only to "the Unlox Edge Certification".
          // There is no standalone legal entity name printed — do not expand.
          issuer: 'Unlox',
          date: '29 April 2026', // Printed as 29-04-2026.
          credentialId: 'UNXAI-2026-5949',
          // Name as printed on THIS certificate — no period after the initial.
          recipientName: 'B Sri Sai Ganeshan',
          verificationUrl: null, // None exists. Do not add one.
          verified: true, // Confirmed from: B Sri Sai Ganeshan_Course_Cert.pdf
        },
      ],
    },
    {
      id: 'skill',
      kind: 'skill',
      title: 'Verified skill certifications',
      issuer: 'HackerRank',
      recipientName: 'Boda Sri Sai Ganeshan',
      signedBy: 'Harishankaran K, CTO, HackerRank',
      /*
        CREDENTIAL IDs ARE DELIBERATELY ABSENT.
        The only source is a low-resolution screenshot in which the characters
        are genuinely ambiguous; two conflicting readings were recorded and
        neither could be confirmed. Do not transcribe, guess or reconstruct an
        ID here — it must be supplied by the account owner.
      */
      credentialIds: {
        placeholder: 'Credential IDs to be supplied from the HackerRank account',
        verified: false,
      },
      items: [
        {
          id: 'hackerrank-java-basic',
          title: 'Java (Basic)',
          status: 'Verified',
          // Only the Java certificate carries a date ("03 May, 2026").
          // The other two show none — do not infer dates for them.
          date: '03 May 2026',
          verificationUrl: null,
          verified: true,
        },
        {
          id: 'hackerrank-csharp-basic',
          title: 'C# (Basic)',
          status: 'Verified',
          date: null,
          verificationUrl: null,
          verified: true,
        },
        {
          id: 'hackerrank-python-basic',
          title: 'Python (Basic)',
          status: 'Verified',
          date: null,
          verificationUrl: null,
          verified: true,
        },
      ],
      // Confirmed from: WhatsApp Image 2026-08-29 at 7.25.49 AM.jpeg
    },
    {
      id: 'participation',
      kind: 'participation',
      title: 'Event participation',
      /*
        CONSTRAINT — DO NOT UPGRADE THIS LANGUAGE.
        Both documents are headed "CERTIFICATE OF PARTICIPATION" and state only
        that the recipient "has actively participated in the event". They are
        not awards, not wins, not placements and not finalist positions. No
        result, rank or outcome of any kind was recorded on either certificate,
        so none may be implied here or in the component that renders this group.
      */
      certificateType: 'Certificate of Participation',
      event: 'InnovateX 4.0 — International Tech Fest',
      host: 'Presidency University',
      branding: ["Institution's Innovation Council", 'Unstop'],
      dates: '6–9 April 2026',
      recipientName: 'B. SRI SAI GANESHAN', // Handwritten on both certificates.
      signatories: [
        'Dr. DIVYARANI M.S., Convenor, InnovateX 4.0',
        'Dr. S. J. THIRUVENGADAM, Vice Chancellor',
      ],
      items: [
        {
          id: 'innovatex-pitchathon',
          title: 'PITCHATHON',
          verificationUrl: null,
          verified: true, // Confirmed from: pitchathon.jpeg
        },
        {
          id: 'innovatex-idea-spark',
          // NOTE: this is the name of a tech-fest event and is unrelated to the
          // "IdeaSpark" project in the projects export. Do not cross-reference.
          title: 'IDEA SPARK',
          verificationUrl: null,
          verified: true, // Confirmed from: WhatsApp Image 2026-08-29 at 7.17.45 AM.jpeg
        },
      ],
    },
  ],

  /*
    V6 gallery — the records shown as cards, newest first.

    Each card is one certificate document. Titles, issuers and dates are
    transcribed from the document as printed (source file noted per record).
    `link` is set only where the document itself carries a working,
    credential-specific verification URL; everything else is null — do not add
    one. `preview` images are page renders / crops of the real documents in
    /public/certificates; never substitute a mock-up.

    C# (Basic) and Python (Basic) stay in `groups` above but are not shown as
    cards: they have no certificate document of their own to preview (the
    HackerRank screenshot shows only badges for them).

    The two InnovateX previews are photos of the printed certificates. Stylised
    re-creations of them exist but are NOT used: they redraw the logo, layout
    and signatures, so they are not the official documents.
  */
  filters: [
    { id: 'all', label: 'All records' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'other', label: 'Skills & events' },
  ],
  records: [
    {
      id: 'claude-101',
      category: 'ai',
      issuer: 'Claude Academy',
      title: 'Claude 101',
      type: 'Course completion badge',
      date: '19 October 2026', // "Issued October 19, 2026"
      link: 'https://academy.claude.com/verify/582f8e2dda774d28e902d4a56b6f1d8d',
      preview: { src: '/certificates/claude-101.webp', width: 640, height: 440 },
      // Source: claude-academy-badge-claude-101.pdf
    },
    {
      id: 'aws-genai-art-of-the-possible',
      category: 'ai',
      issuer: 'AWS Training & Certification',
      title: 'Introduction to Generative AI - Art of the Possible',
      type: 'Completion certificate',
      date: '19 October 2026', // "Completed: October 19, 2026"
      link: null, // The certificate carries no verification URL.
      preview: { src: '/certificates/aws-genai.webp', width: 640, height: 495 },
      // Source: aws.pdf
    },
    {
      id: 'claude-mcp',
      category: 'ai',
      issuer: 'Claude Academy',
      title: 'Introduction to Model Context Protocol',
      type: 'Course completion badge',
      date: '18 October 2026', // "Issued October 18, 2026"
      link: 'https://academy.claude.com/verify/a6c42cff963deed4363274fe646bf8cf',
      preview: { src: '/certificates/claude-mcp.webp', width: 640, height: 440 },
      // Source: claude-academy-badge-introduction-to-model-context-protocol.pdf
    },
    {
      id: 'claude-ai-fluency',
      category: 'ai',
      issuer: 'Claude Academy',
      // Lower-case "foundations" as printed on the badge.
      title: 'AI Fluency: Framework and foundations',
      type: 'Course completion badge',
      date: '17 October 2026', // "Issued October 17, 2026"
      link: 'https://academy.claude.com/verify/2381799d0d61052203187b5f1e01072f',
      preview: { src: '/certificates/claude-ai-fluency.webp', width: 640, height: 440 },
      // Source: claude-academy-badge-ai-fluency-framework-foundations.pdf
    },
    {
      id: 'infosys-intro-ai',
      category: 'ai',
      issuer: 'Infosys Springboard',
      title: 'Introduction to Artificial Intelligence',
      type: 'Course completion certificate',
      date: '15 October 2026', // "on October 15, 2026"
      // Only a QR code and the generic verify.onwingspan.com page are printed;
      // there is no credential-specific URL, so no link is shown.
      link: null,
      preview: { src: '/certificates/infosys-ai.webp', width: 640, height: 452 },
      // Source: springboard.pdf
    },
    {
      id: 'hackerrank-java-basic',
      category: 'other',
      issuer: 'HackerRank',
      title: 'Java (Basic)',
      type: 'Certificate of Accomplishment · skill certification test',
      date: '03 May 2026',
      link: null,
      preview: { src: '/certificates/hackerrank-java.webp', width: 640, height: 480 },
      // Source: WhatsApp Image 2026-08-29 at 7.25.49 AM.jpeg (certificate panel only)
    },
    {
      id: 'unlox-edge-ai',
      category: 'ai',
      issuer: 'Unlox',
      title: 'Unlox Edge Certification specialized in Artificial Intelligence',
      type: 'Certificate of course completion · Job Bridge Program',
      date: '29 April 2026',
      link: null, // None exists. Do not add one.
      preview: { src: '/certificates/unlox-edge-ai.webp', width: 640, height: 453 },
      // Source: B Sri Sai Ganeshan_Course_Cert.pdf
    },
    {
      id: 'innovatex-pitchathon',
      category: 'other',
      issuer: 'InnovateX 4.0 · Presidency University',
      // Participation only — never an award, win or placement (see above).
      title: 'Pitchathon',
      type: 'Certificate of Participation · International Tech Fest',
      date: '6–9 April 2026',
      link: null,
      preview: { src: '/certificates/innovatex-pitchathon.webp', width: 960, height: 682 },
      // Source: pitchathon.jpeg (photo of the printed certificate, rotated upright)
    },
    {
      id: 'innovatex-idea-spark',
      category: 'other',
      issuer: 'InnovateX 4.0 · Presidency University',
      // Participation only — never an award, win or placement (see above).
      // A tech-fest event, unrelated to the IdeaSpark project.
      title: 'Idea Spark',
      type: 'Certificate of Participation · International Tech Fest',
      date: '6–9 April 2026',
      link: null,
      preview: { src: '/certificates/innovatex-idea-spark.webp', width: 960, height: 679 },
      // Source: WhatsApp Image 2026-08-29 at 7.17.45 AM.jpeg (photo, rotated upright)
    },
  ],
};

/**
 * Education.
 *
 * Deliberately short, because this is the entire set of confirmed facts. There
 * is no start date, no end date, no expected graduation year, no CGPA, no grade
 * and no coursework list in the source material — so none of those fields exist
 * here. Do not add an "expected 2027" style value.
 */
export const education = {
  label: '05',
  labelText: 'Education',
  kicker: 'Where I study',
  heading: {
    lead: 'Where I am studying,',
    accent: 'and what I am studying.',
  },
  items: [
    {
      id: 'presidency-btech-cse-aiml',
      institution: 'Presidency University, Bangalore',
      programme: 'B.Tech CSE (AI & ML)',
      programmeFull:
        'B.Tech in Computer Science and Engineering, specialisation in Artificial Intelligence & Machine Learning',
      status: 'Second-year student',
      verified: true,
    },
  ],
};

/**
 * Contact.
 *
 * GitHub and LinkedIn are the two available contact methods. Email is withheld
 * by an explicit decision of the owner, not because it is unknown, so it keeps
 * the placeholder pattern: href null, verified false.
 *
 * There is intentionally no contact form, no phone number (none exists), no
 * postal address and no response-time promise. The copy makes no claim about
 * availability, hiring or freelance status — nothing of that kind was stated.
 */
export const contact = {
  label: '06',
  labelText: 'Contact',
  kicker: 'Get in touch',
  heading: {
    lead: 'If you want to talk,',
    accent: 'these are the two doors.',
  },
  intro:
    'GitHub is where the work lives; LinkedIn is the easiest place to reach me.',
  location: 'Bangalore', // Location line only. No street address exists.
  methods: [
    {
      id: 'github',
      label: 'GitHub',
      value: 'github.com/bodasrisaiganeshan',
      href: 'https://github.com/bodasrisaiganeshan',
      verified: true,
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: 'linkedin.com/in/ganesh-boda-1a09bb3a2',
      href: 'https://www.linkedin.com/in/ganesh-boda-1a09bb3a2/',
      verified: true,
    },
    {
      id: 'email',
      label: 'Email',
      // PLACEHOLDER — the owner has decided not to publish an address yet.
      href: null,
      placeholder: 'Email address to be confirmed',
      verified: false,
    },
  ],
};

/**
 * V6 Let's Connect (renders as #contact).
 *
 * Builds on `contact` above. The owner asked for a contact form and an
 * "open to collaborate" line for this section on 25 October 2026; both are
 * the owner's own request, not inferred.
 *
 * Email: confirmed by the owner on 25 October 2026 for THIS card only. The card
 * opens Gmail's compose screen in a new tab (owner's request: mailto: did not
 * open a draft on their machine). It is deliberately not added to `contact`,
 * `socials` or the footer — do not surface it anywhere else.
 *
 * The form delivers through Formspree when VITE_FORMSPREE_FORM_ID is set (see
 * .env.example). Without it the form says plainly that nothing was sent — it
 * never fakes a success.
 *
 * Certifications counts every record in the Certifications gallery (owner's
 * request: participation certificates included), so it tracks the gallery.
 */

const connectEmail = 'bodasrisaiganeshan26@gmail.com';

export const connect = {
  heading: 'Let’s connect',
  intro:
    'Have a project in mind or just want to say hi? Write to me here, or find me on LinkedIn and GitHub.',
  email: connectEmail,
  methods: [
    {
      id: 'email',
      label: 'Email',
      value: connectEmail,
      href: `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(connectEmail)}`,
      external: true,
      newTabNote: '(opens Gmail compose in a new tab)',
    },
    ...contact.methods
      .filter((m) => m.verified && m.id === 'linkedin')
      .map((m) => ({ ...m, external: true })),
    ...contact.methods
      .filter((m) => m.verified && m.id === 'github')
      .map((m) => ({ ...m, external: true })),
  ],
  formTitle: 'Send a message',
  artLine: 'Let’s Build Something Great Together.',
  stats: [
    { id: 'projects', value: String(projects.items.length), label: 'Projects Built' },
    { id: 'certs', value: String(certifications.records.length), label: 'Certifications' },
    { id: 'collab', value: 'Open', label: 'to Collaborate' },
  ],
};

/**
 * V6 About Me (renders as #about).
 *
 * How the owner thinks, learns and builds. The introduction restates the
 * confirmed `about` copy (learns by building, iterates prototypes) and the
 * owner's stated focus areas in `heroIndex.focus`; it does not repeat the
 * Hero's name, role line, portrait, facts or focus tags.
 *
 * The process and drives describe an approach, not achievements: no outcomes,
 * levels or experiences beyond what is confirmed elsewhere in this file.
 *
 * `tools` lists only technologies stated in `skills` or in a project's `tech`
 * list, plus GitHub (where the confirmed repositories live). No proficiency.
 */
export const aboutMe = {
  badge: 'About Me',
  heading: { lead: 'How I Think,', accent: ['Learn,', 'Build'], tail: 'and Grow' },
  paragraphs: [
    "I learn by building. When an idea or a technology catches my attention, I want to understand how it works, then turn that understanding into something useful rather than stopping at a tutorial.",
    "Most of my work sits in web development and AI/ML, and I'm also drawn to application and game development. I start small, get a working prototype in front of me, and keep improving it through iteration.",
  ],
  process: {
    title: 'My Development Process',
    note: 'From an idea to a working project',
    cycleLabel: 'A continuous learning cycle',
    steps: [
      {
        id: 'explore',
        name: 'Explore',
        text: 'Understand the problem, look at how it is usually solved and find the tools it needs.',
      },
      {
        id: 'plan',
        name: 'Learn & Plan',
        text: 'Read the docs, try small experiments and sketch the structure before the real build.',
      },
      {
        id: 'build',
        name: 'Build',
        text: 'Turn the plan into a working prototype, one feature at a time.',
      },
      {
        id: 'improve',
        name: 'Test & Improve',
        text: 'Use it, find what breaks or feels wrong, and iterate on it.',
      },
    ],
  },
  drives: {
    title: 'What Drives Me',
    items: [
      {
        id: 'curiosity',
        name: 'Curiosity',
        text: 'Wanting to know how things work, from new tools to the ideas behind them.',
      },
      {
        id: 'problems',
        name: 'Problem Solving',
        text: 'Breaking a problem down until a practical solution becomes clear.',
      },
      {
        id: 'projects',
        name: 'Building Real Projects',
        text: 'Turning ideas into applications that work, not just notes.',
        link: { href: '#projects', label: 'See my projects' },
      },
      {
        id: 'learning',
        name: 'Continuous Learning',
        text: 'Improving through practice, courses and feedback, one step at a time.',
        link: { href: '#journey', label: 'See my learning journey' },
      },
    ],
  },
  tools: {
    title: 'Tools & Technologies I Work With',
    // Grouped by role. Each item is stated in `skills` or a project's `tech`
    // list; GitHub is where the confirmed repositories live.
    groups: [
      {
        id: 'languages',
        label: 'Languages',
        items: [
          { id: 'python', label: 'Python' },
          { id: 'openjdk', label: 'Java' },
          { id: 'c', label: 'C' },
          { id: 'javascript', label: 'JavaScript' },
        ],
      },
      {
        id: 'frontend',
        label: 'Frontend',
        items: [
          { id: 'react', label: 'React' },
          { id: 'vite', label: 'Vite' },
          { id: 'tailwindcss', label: 'Tailwind CSS' },
        ],
      },
      {
        id: 'backend',
        label: 'Backend & data',
        items: [
          { id: 'flask', label: 'Flask' },
          { id: 'sqlite', label: 'SQLite' },
        ],
      },
      {
        id: 'ai',
        label: 'AI & vision',
        items: [
          { id: 'opencv', label: 'OpenCV' },
          { id: 'mediapipe', label: 'MediaPipe' },
          { id: 'numpy', label: 'NumPy' },
        ],
      },
      {
        id: 'tools',
        label: 'Tools & deploy',
        items: [
          { id: 'github', label: 'GitHub' },
          { id: 'cloudflarepages', label: 'Cloudflare Pages' },
        ],
      },
    ],
  },
  mindset: {
    title: 'My Mindset',
    quote: [
      'I believe in learning by doing, staying curious and turning ideas into real projects.',
      'Every project is a step toward becoming a better developer.',
    ],
  },
};

/**
 * V6 Journey & Learning (renders as #journey).
 *
 * Every dated step is transcribed from a certificate in `certifications`
 * (looked up by id, so titles, issuers and dates cannot drift). The first and
 * last steps carry no date because none was confirmed — no start year, no
 * graduation year. Projects have no confirmed dates either, so they are listed
 * apart from the timeline ("Built alongside") instead of being placed on it.
 */
const record = (id) => certifications.records.find((r) => r.id === id);
const course = (id) => {
  const r = record(id);
  return { id: r.id, title: r.title, issuer: r.issuer, date: r.date, link: r.link };
};

export const journey = {
  heading: { lead: 'Journey', accent: '& learning' },
  intro:
    'The path so far, in order: a tech fest, a programme certification, a skill test and a run of AI courses, with three projects built alongside.',
  steps: [
    {
      id: 'start',
      when: 'Starting point',
      dated: false,
      kind: 'Studies',
      title: education.items[0].programme,
      place: education.items[0].institution,
      text: `${education.items[0].programmeFull}.`,
    },
    {
      id: 'innovatex',
      when: record('innovatex-pitchathon').date,
      dated: true,
      kind: 'Tech fest',
      title: 'InnovateX 4.0 International Tech Fest',
      place: 'Presidency University',
      text: 'Took part in two of the fest’s events.',
      items: [
        { id: 'pitchathon', title: record('innovatex-pitchathon').title, issuer: 'Certificate of Participation' },
        { id: 'idea-spark', title: record('innovatex-idea-spark').title, issuer: 'Certificate of Participation' },
      ],
    },
    {
      id: 'unlox',
      when: record('unlox-edge-ai').date,
      dated: true,
      kind: 'Programme',
      title: record('unlox-edge-ai').title,
      place: 'Unlox, Job Bridge Program',
      text: 'Completed the programme certification in Artificial Intelligence.',
    },
    {
      id: 'hackerrank',
      when: record('hackerrank-java-basic').date,
      dated: true,
      kind: 'Skill test',
      title: record('hackerrank-java-basic').title,
      place: 'HackerRank',
      text: 'Passed the Java (Basic) skill certification test.',
      also: 'C# (Basic) and Python (Basic) are also verified on HackerRank; those badges carry no date.',
    },
    {
      id: 'ai-week',
      when: '15–19 October 2026',
      dated: true,
      kind: 'Coursework',
      title: 'Five AI courses in five days',
      place: 'Infosys Springboard, Claude Academy and AWS',
      text: 'From an introduction to AI through to generative AI and the Model Context Protocol.',
      // Oldest first, to read in the timeline's own order.
      items: [
        course('infosys-intro-ai'),
        course('claude-ai-fluency'),
        course('claude-mcp'),
        course('claude-101'),
        course('aws-genai-art-of-the-possible'),
      ],
    },
    {
      id: 'now',
      when: 'Now',
      dated: false,
      kind: 'Studies',
      title: 'Second year, still building',
      place: education.items[0].institution,
      text: 'Studying B.Tech CSE (AI & ML) and building projects alongside the coursework.',
      current: true,
    },
  ],
  builtTitle: 'Built alongside',
  builtNote: 'The projects this learning went into.',
  built: projects.items.map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category,
    state: { samastam: 'Live', 'gym-buddy': 'Working prototype', ideaspark: 'Near-complete prototype' }[p.id],
    live: p.id === 'samastam',
    href: p.link.href,
    linkNote: p.link.kind === 'site' ? '(opens samastam.xyz in a new tab)' : '(opens the GitHub repository in a new tab)',
  })),
  exploringTitle: 'Also exploring',
  exploring: 'Application development and game development.',
};

export const footer = {
  wordmark: `${profile.firstLine} ${profile.secondLine}`,
  copyrightName: `${profile.firstLine} ${profile.secondLine}`,
  socials,
  backToTopLabel: 'Back to top',
  // No "built with" line, no availability line, no newsletter, and no links to
  // pages that do not exist.
};

/**
 * V6 Home / Hero.
 *
 * Presentational copy only — no new claims. Every value is drawn from the
 * exports above: the role line restates `profile.subtitle`, the stage caption
 * restates `heroIndex.focus`, the facts are counts of entries in this file,
 * and the technology strip lists only items stated in `skills` or in a
 * project's `tech` list. There is deliberately no availability line, no
 * "years of experience" and no proficiency bar anywhere in the hero.
 *
 * Section links point at the anchors the remaining V6 sections will use.
 * Those sections are not built yet (Home is being reviewed first).
 */
export const home = {
  wordmark: 'Ganesh Boda',
  greeting: "Hi, I'm",
  role: 'B.Tech CSE (AI & ML) student at Presidency University, Bangalore',
  stageWord: 'Developer',
  stageCaption: ['AI', 'Web', 'Apps', 'Games'],
  nav: [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#journey', label: 'Journey' },
    { href: '#contact', label: 'Contact' },
  ],
  primaryCta: { href: '#projects', label: 'View my work' },
  secondaryCta: { href: '#contact', label: 'Contact me' },
  // LinkedIn is the confirmed "easiest place to reach me" (see `contact.intro`).
  talkCta: { href: 'https://www.linkedin.com/in/ganesh-boda-1a09bb3a2/', label: "Let's talk" },
  facts: [
    { id: 'projects', value: String(projects.items.length), label: 'Projects built' },
    // Counts every record in the Certifications gallery, same as `connect.stats`.
    { id: 'certs', value: String(certifications.records.length), label: 'Certifications' },
    { id: 'year', value: '2nd', label: 'Year of B.Tech' },
  ],
  live: {
    label: 'Live now',
    name: 'Samastam',
    note: '60+ utility tools, India-focused',
    href: 'https://samastam.xyz/',
  },
  focusTitle: 'Focus areas',
  techLabel: 'Technologies I work with',
  tech: [
    { id: 'python', label: 'Python' },
    { id: 'openjdk', label: 'Java' },
    { id: 'c', label: 'C' },
    { id: 'javascript', label: 'JavaScript' },
    { id: 'react', label: 'React' },
    { id: 'vite', label: 'Vite' },
    { id: 'tailwindcss', label: 'Tailwind CSS' },
    { id: 'flask', label: 'Flask' },
    { id: 'opencv', label: 'OpenCV' },
    { id: 'mediapipe', label: 'MediaPipe' },
  ],
  portraitAlt: 'Portrait of Boda Sri Sai Ganeshan in a black jacket',
};
