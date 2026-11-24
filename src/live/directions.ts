import { liveConfig } from './content';
import type { Venue } from './content';

export function isAppleTouchDevice() {
  return (
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  );
}

export function directionsTo(venue: Venue) {
  const coordinates = `${venue.lat},${venue.lng}`;
  const name = encodeURIComponent(venue.name);
  if (isAppleTouchDevice()) return `https://maps.apple.com/?ll=${coordinates}&q=${name}`;
  if (/Android/.test(navigator.userAgent)) return `geo:${coordinates}?q=${coordinates}(${name})`;
  return `https://www.google.com/maps/search/?api=1&query=${coordinates}`;
}

const venueByScheduleLocation: Record<string, string> = {
  'Moore Walk': 'moore-walk',
  'Baxter Lecture Hall': 'baxter-hall-entrance',
  'Avery Outer Courtyard': 'avery-house',
  'Avery Dining Hall': 'avery-house',
  'Avery Dining': 'avery-house',
  'Bechtel Dining Hall': 'bechtel-center',
  'Annenberg 104': 'annenberg-center',
  'Parking Structure': 'parking-structure',
};

export function eventVenue(location: string) {
  return liveConfig.locations.find((venue) => venue.id === venueByScheduleLocation[location]);
}
