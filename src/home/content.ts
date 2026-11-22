import { siteUrl } from '../components/siteUrl';
export const eventDate = 'February 26–28, 2027';
export const sponsorPacket = siteUrl('2026/hacktech_2026_sponsor_tentative.pdf');

export const stats = [
  { count: 10, suffix: '+', label: 'countries' },
  { count: 60, suffix: '+', label: 'universities' },
  { count: 400, suffix: '+', label: 'hackers' },
  { count: 60, suffix: '+', label: 'prizes' },
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
  example?: boolean;
}

// Preview tier assignments. Confirm sponsors and example logos before the 2027 launch.
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
    size: 'large',
    description:
      'An AI research platform for interviewing customers and finding themes in their feedback.',
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
    name: 'GitHub',
    logo: 'organizers/companies/github.svg',
    url: 'https://github.com/',
    size: 'small',
    example: true,
  },
  {
    name: 'Twelve Labs',
    logo: '12labs.png',
    url: 'https://www.twelvelabs.io/',
    size: 'small',
    lightBackground: true,
    example: true,
  },
  {
    name: 'Wolfram',
    logo: 'wolfram.png',
    url: 'https://www.wolfram.com/',
    size: 'small',
    lightBackground: true,
    example: true,
  },
  {
    name: 'Nord Security',
    logo: 'nord.png',
    url: 'https://nordsecurity.com/',
    size: 'small',
    lightBackground: true,
    example: true,
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
    question: 'What is a Hackathon?',
    answer:
      'In our Hackathon, you have 36 hours to code a product that regards one of our topics. Work by yourself or with a team of up to 4 people!',
  },
  {
    question: 'What is Hacktech?',
    answer:
      "Hacktech is Caltech’s annual hackathon bringing together innovators to showcase the latest advancements in technology and coding. There's food, speakers, recruiters, and of course, tons of building!",
  },
  {
    question: 'How can I participate in Hacktech?',
    answer:
      'To participate, you can register on our website! NOTE: Our 2025 event has wrapped up and applications for 2026 have also closed.',
  },
  {
    question: 'Where is the event held?',
    answer:
      "Hacktech is held at Caltech's campus. This year we will likely be utilizing Avery House and the Annenberg Center for Information Science and Technology as our main venues. Please refer to our website and the map below for detailed directions and accommodation options when the time comes.",
  },
  {
    question: 'Do I have to be in-person?',
    answer:
      'Yes, Hacktech is now a fully in-person event instead of the hybrid format as before. Hackers must check in and be present throughout the hackathon to participate.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Hacktech is free to attend! We will provide food, swag, lessons, and amazing memories! Travel reimbursement for 2026 is still relatively limited, and we will not be able to provide reimbursement to all participants. Unfortunately, partial reimbursement will not be provided this year.',
  },
  {
    question: 'Who can participate?',
    answer:
      'For Hacktech 2026, all enrolled college undergraduate students (4-year or community college programs) are welcome! Note that you must be 18 or older as per institute requirements. No exceptions can be made.',
  },
  {
    question: 'How many people are on a team?',
    answer: 'Between 1 and 4 people can be on a single team.',
  },
];
