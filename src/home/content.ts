import { siteUrl } from '../components/siteUrl';
export const eventDate = 'February 26–28, 2027';
export const showHackerNotification = false;
export const sponsorPacket = siteUrl('2027/hacktech-2027-sponsorship-packet.pdf');

export const stats = [
  { count: 5, suffix: '+', label: 'countries' },
  { count: 60, suffix: '+', label: 'universities' },
  { count: 350, suffix: '+', label: 'hackers' },
  { count: 30, suffix: '+', label: 'prizes' },
  { count: 36, suffix: '', label: 'hours' },
];

export type SponsorSize = 'small' | 'medium' | 'large' | 'largeplus';

interface Sponsor {
  name: string;
  logo: string;
  url: string;
  size: SponsorSize;
  description?: string;
  lightBackground?: boolean;
}

// The sizes reflect how past partners are displayed on the homepage.
export const sponsors: Sponsor[] = [
  {
    name: 'Y Combinator',
    logo: 'organizers/companies/yc.png',
    url: 'https://www.ycombinator.com/',
    size: 'largeplus',
    description:
      'A startup accelerator that works with founders as they build and grow their companies.',
  },
  {
    name: 'Kleiner Perkins',
    logo: 'organizers/companies/kp.png',
    url: 'https://www.kleinerperkins.com/',
    size: 'largeplus',
    description: 'A venture capital firm that backs early and growing technology companies.',
  },
  {
    name: 'Listen Labs',
    logo: 'organizers/companies/listen.png',
    url: 'https://listenlabs.ai/',
    size: 'largeplus',
    description:
      'An AI research platform for interviewing customers and finding themes in their feedback.',
  },
  {
    name: 'GitHub',
    logo: 'organizers/companies/github.svg',
    url: 'https://github.com/',
    size: 'large',
    description: 'A platform where developers host code, review changes, and build software together.',
  },
  {
    name: 'Rox',
    logo: 'organizers/companies/rox.png',
    url: 'https://www.rox.com/',
    size: 'large',
    description: 'A software company building AI tools for sales teams.',
  },
  {
    name: 'Ironsite AI',
    logo: 'ironsite.png',
    lightBackground: true,
    url: 'https://ironsite.ai/',
    size: 'large',
  },
  {
    name: 'Institute of Foundation Models',
    logo: 'ifm.png',
    lightBackground: true,
    url: 'https://ifm.ai/',
    size: 'large',
  },
  {
    name: 'Citadel',
    logo: 'organizers/companies/citadel.png',
    url: 'https://www.citadel.com/',
    size: 'medium',
    description: 'An investment firm working across global financial markets.',
  },
  {
    name: 'D.E. Shaw Group',
    logo: 'organizers/companies/deshaw.png',
    url: 'https://www.deshaw.com/',
    size: 'medium',
    description: 'An investment and technology firm with roots in quantitative research.',
  },
  {
    name: 'DRW Holdings',
    logo: 'organizers/companies/drw.svg',
    url: 'https://www.drw.com/',
    size: 'medium',
    description: 'A trading firm that uses research and technology across global markets.',
  },
  {
    name: 'Hudson River Trading',
    logo: 'organizers/companies/hrt.png',
    url: 'https://www.hudsonrivertrading.com/',
    size: 'medium',
    description: 'A quantitative trading firm that builds automated trading systems.',
  },
  {
    name: 'Cubist Systematic Strategies',
    logo: 'organizers/companies/cubist.png',
    url: 'https://www.point72.com/cubist/',
    size: 'medium',
    description: 'A systematic investing business that brings together quantitative research and technology.',
  },
  {
    name: 'Major League Hacking',
    logo: 'organizers/companies/mlh.svg',
    url: 'https://mlh.io/',
    size: 'small',
  },
  {
    name: 'Orkes',
    logo: 'orkes.png',
    url: 'https://orkes.io/',
    size: 'small',
    lightBackground: true,
  },
  {
    name: 'Dryft',
    logo: 'dryft.png',
    url: 'https://www.godryft.com/',
    size: 'small',
    lightBackground: true,
  },
  {
    name: 'Wolfram',
    logo: 'wolfram.png',
    url: 'https://www.wolfram.com/',
    size: 'small',
    lightBackground: true,
  },
  {
    name: 'Sideshift',
    logo: 'sideshift.png',
    lightBackground: true,
    url: 'https://www.sideshift.app/',
    size: 'small',
  },
  {
    name: 'Caltech SIF',
    logo: 'sif.png',
    lightBackground: true,
    url: 'https://sif.caltech.edu/',
    size: 'small',
  },
];

export const faq = [
  {
    question: 'What is a hackathon?',
    answer:
      'A hackathon is an event where you turn an idea into a working prototype and share what you built. At Hacktech, you have 36 hours to code a project that addresses one of our tracks. You can work on your own or in a team of up to four.',
  },
  {
    question: 'What is Hacktech?',
    answer:
      'Hacktech is Caltech’s annual student-run hackathon in Pasadena. Students spend the weekend building projects together. Between coding sessions, you can grab a meal, hear from speakers, and meet other hackers and recruiters.',
  },
  {
    question: 'How can I participate in Hacktech?',
    answer:
      'The full application for Hacktech 2027 opens on this website on December 5, 2026. Until then, click “I’m a Hacker!” at the top of the page to fill out the interest form. We’ll email you when applications open. To apply, complete the full application once it opens.',
  },
  {
    question: 'Where is the event held?',
    answer:
      'Hacktech takes place on Caltech’s campus in Pasadena. Our main venues for 2027 are Avery House and the Annenberg Center for Information Science and Technology. See the map below for directions.',
  },
  {
    question: 'Do I have to be in-person?',
    answer:
      'Yes, Hacktech is now a fully in-person event instead of the hybrid format as before. Hackers must check in and be present throughout the hackathon to participate.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Hacktech is free to attend. We provide food, swag, and workshops throughout the weekend.',
  },
  {
    question: 'Is there travel reimbursement?',
    answer:
      'We have limited travel funding for 2027. If you’re selected, we’ll tell you the fixed amount you’ll receive. We decide awards case by case, up to $500. For example, a $200 award stays $200 regardless of your airfare. To receive it, you must attend Hacktech, check in on the first day, and demo your project.',
  },
  {
    question: 'Who can participate?',
    answer:
      'We welcome enrolled undergraduate students at four-year colleges and community colleges. Graduate students are eligible only if they’re enrolled in a Caltech master’s or PhD program. Everyone must be at least 18 to sign the waiver and attend. There are no exceptions to the age requirement.',
  },
  {
    question: 'How many people are on a team?',
    answer: 'Between 1 and 4 people can be on a single team.',
  },
];
