import { liveConfig } from './content';
import type { ScheduleEvent } from './content';

export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

export function formatTime(minutes: number, separator = '') {
  const hour = Math.floor(minutes / 60) % 24;
  const minute = Math.floor(minutes % 60);
  return `${hour % 12 || 12}${minute ? ':' + String(minute).padStart(2, '0') : ''}${separator}${hour < 12 ? 'AM' : 'PM'}`;
}

const eventClock = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Los_Angeles',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

export function eventTime(now: Date) {
  const parts = Object.fromEntries(eventClock.formatToParts(now).map((part) => [part.type, part.value]));
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    minutes: Number(parts.hour) * 60 + Number(parts.minute),
  };
}

export function scheduleDayToday(date: string) {
  const { schedule } = liveConfig;
  return (
    schedule.find((day) => day.date === date) ??
    (date < schedule[0].date ? schedule[0] : schedule[schedule.length - 1])
  );
}

export function layoutSchedule(events: ScheduleEvent[]) {
  const sorted = events
    .map((event) => ({
      ...event,
      startMinutes: timeToMinutes(event.start),
      endMinutes: timeToMinutes(event.end),
    }))
    .sort((a, b) => a.startMinutes - b.startMinutes || a.endMinutes - b.endMinutes);

  const groups: (typeof sorted)[] = [];
  let group: typeof sorted = [];
  let groupEnd = -1;
  for (const event of sorted) {
    if (event.startMinutes >= groupEnd && group.length) {
      groups.push(group);
      group = [];
    }
    group.push(event);
    groupEnd = Math.max(groupEnd, event.endMinutes);
  }
  if (group.length) groups.push(group);

  // Only overlapping events share horizontal space.
  return groups.flatMap((overlapGroup) => {
    const columnEnds: number[] = [];
    const placed = overlapGroup.map((event) => {
      const emptyColumn = columnEnds.findIndex((end) => end <= event.startMinutes);
      const column = emptyColumn === -1 ? columnEnds.length : emptyColumn;
      columnEnds[column] = event.endMinutes;
      return { ...event, column };
    });
    return placed.map((event) => ({ ...event, columnCount: columnEnds.length }));
  });
}
