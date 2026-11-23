export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Venue extends Coordinates {
  id: string;
  name: string;
  type: string;
  description: string;
}

export interface ScheduleEvent {
  title: string;
  category: 'checkin' | 'key' | 'food' | 'sponsor' | 'program' | 'judging';
  location: string;
  start: string;
  end: string;
  description: string;
  links?: { label: string; url: string }[];
}

export interface ScheduleDay {
  id: string;
  date: string;
  label: string;
  startHour: number;
  endHour: number;
  events: ScheduleEvent[];
}

interface LiveConfig {
  hackingStartsAt: string;
  hackingEndsAt: string;
  mapTileUrl: string;
  mapAttribution: string;
  googleDocUrl: string;
  devpostUrl: string;
  mapBounds: { north: number; south: number; west: number; east: number };
  locations: Venue[];
  schedule: ScheduleDay[];
}

// Archived schedule and venue information for Hacktech 2026.
export const liveConfig: LiveConfig = {
  hackingStartsAt: '2026-04-24T21:00:00-07:00',
  hackingEndsAt: '2026-04-26T09:00:00-07:00',
  mapTileUrl: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
  mapAttribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  googleDocUrl:
    'https://docs.google.com/document/d/e/2PACX-1vSECEOQdmjsEYdCLzoW1GNKm5xZ7RRbv6XibaOzwGRrLj4qr3rxBVLhQimLFxJ4UZbm8VSqCdjN6_Kx/pub',
  devpostUrl: 'https://hacktech-by-caltech-2026.devpost.com/',
  mapBounds: {
    north: 34.1419,
    south: 34.1354,
    west: -118.1288,
    east: -118.1211,
  },
  locations: [
    {
      id: 'avery-house',
      name: 'Avery House',
      type: 'check-in + workspace',
      description: 'Check-in and workspace.',
      lat: 34.140281,
      lng: -118.123599,
    },
    {
      id: 'moore-walk',
      name: 'Moore Walk',
      type: 'events',
      description: 'Check-in, company fair, and more is here.',
      lat: 34.140061131534715,
      lng: -118.12400769604251,
    },
    {
      id: 'parking-structure',
      name: 'Parking Structure',
      type: 'parking',
      description: 'Free parking.',
      lat: 34.13946894834286,
      lng: -118.12263107314755,
    },
    {
      id: 'annenberg-center',
      name: 'Annenberg Center',
      type: 'talks + workspace',
      description: 'Talks and workspace.',
      lat: 34.13979734638861,
      lng: -118.12385699753644,
    },
    {
      id: 'bechtel-center',
      name: 'Bechtel Center',
      type: 'judging',
      description: 'Judging area.',
      lat: 34.14021157809335,
      lng: -118.12446813086468,
    },
    {
      id: 'baxter-hall-entrance',
      name: 'Baxter Hall Entrance',
      type: 'ceremonies',
      description: 'Opening and closing ceremonies.',
      lat: 34.13799806624361,
      lng: -118.12519245598114,
    },
    {
      id: 'chen-neuroscience-building',
      name: 'Chen Neuroscience Building',
      type: 'workspace',
      description: 'Workspace.',
      lat: 34.140194070445055,
      lng: -118.12709575186697,
    },
  ],
  schedule: [
    {
      id: 'friday',
      date: '2026-04-24',
      label: 'Fri Apr 24',
      startHour: 15,
      endHour: 24,
      events: [
        {
          title: 'Check-in',
          category: 'checkin',
          location: 'Moore Walk',
          start: '15:00',
          end: '17:00',
          description:
            'To check in, you MUST bring your Photo ID and School ID. Hacktech 2026 standard merch includes a T-shirt, Tote bag, Lanyard/Badge, Phone Wallet, Deodorant, and Stickers!',
        },
        {
          title: 'Opening Ceremony',
          category: 'key',
          location: 'Baxter Lecture Hall',
          start: '17:00',
          end: '18:30',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Dinner',
          category: 'food',
          location: 'Moore Walk',
          start: '18:30',
          end: '19:30',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Team Matching',
          category: 'sponsor',
          location: 'Avery Outer Courtyard',
          start: '19:30',
          end: '21:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'IFM Workshop + Talk',
          category: 'program',
          location: 'Annenberg 104',
          start: '19:30',
          end: '21:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Hacking Begins',
          category: 'key',
          location: 'Hacktech',
          start: '21:00',
          end: '21:15',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'MLH Workshops',
          category: 'program',
          location: 'Annenberg 104',
          start: '21:00',
          end: '22:00',
          description: 'More details will be shared closer to the event.',
        },
      ],
    },
    {
      id: 'saturday',
      date: '2026-04-25',
      label: 'Sat Apr 25',
      startHour: 7,
      endHour: 22,
      events: [
        {
          title: 'Breakfast',
          category: 'food',
          location: 'Avery Dining Hall',
          start: '07:00',
          end: '10:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Company Career Fair',
          category: 'sponsor',
          location: 'Moore Walk',
          start: '09:00',
          end: '17:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Listen Labs Talk',
          category: 'program',
          location: 'Annenberg 104',
          start: '11:00',
          end: '12:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Lunch',
          category: 'food',
          location: 'Avery Dining Hall',
          start: '12:00',
          end: '13:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Rox Talk',
          category: 'program',
          location: 'Annenberg 104',
          start: '13:00',
          end: '14:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Y Combinator Talk',
          category: 'program',
          location: 'Annenberg 104',
          start: '16:15',
          end: '17:45',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Ironsite Fireside',
          category: 'program',
          location: 'Annenberg 104',
          start: '18:00',
          end: '19:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Dinner',
          category: 'food',
          location: 'Avery Dining Hall',
          start: '19:00',
          end: '21:00',
          description: 'More details will be shared closer to the event.',
        },
      ],
    },
    {
      id: 'sunday',
      date: '2026-04-26',
      label: 'Sun Apr 26',
      startHour: 7,
      endHour: 16,
      events: [
        {
          title: 'Breakfast',
          category: 'food',
          location: 'Avery Dining',
          start: '07:00',
          end: '10:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Projects Due',
          category: 'key',
          location: 'Hacktech',
          start: '09:00',
          end: '09:15',
          description:
            'ALL PROJECTS MUST BE SUBMITTED TO DEVPOST BY THIS TIME. NO EXCEPTIONS CAN BE MADE! Please plan accordingly!',
        },
        {
          title: 'Judging: Round 1',
          category: 'judging',
          location: 'Bechtel Dining Hall',
          start: '10:00',
          end: '12:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Lunch',
          category: 'food',
          location: 'Avery Dining',
          start: '12:00',
          end: '13:00',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Judging: Round 2',
          category: 'judging',
          location: 'Bechtel Dining Hall',
          start: '13:00',
          end: '13:30',
          description: 'More details will be shared closer to the event.',
        },
        {
          title: 'Closing Ceremony',
          category: 'key',
          location: 'Baxter Lecture Hall',
          start: '14:00',
          end: '15:00',
          description: 'Winners announced. More details will be shared closer to the event.',
        },
      ],
    },
  ],
};
