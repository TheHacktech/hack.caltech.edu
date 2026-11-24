import { useEffect, useState } from 'react';
import { Dialog } from '../components/Dialog';
import { liveConfig } from './content';
import type { ScheduleEvent } from './content';
import { directionsTo, eventVenue } from './directions';
import {
  eventTime,
  formatTime,
  layoutSchedule,
  scheduleDayToday,
  timeToMinutes,
} from './scheduleLayout';

function EventDetails({ event, close }: { event: ScheduleEvent | null; close: () => void }) {
  const venue = event && eventVenue(event.location);

  return (
    <Dialog
      className="live-dialog schedule-modal-card"
      open={Boolean(event)}
      onClose={close}
      labelledBy="schedule-modal-title"
    >
      <div className="live-dialog-content">
        {venue && (
          <a
            className="schedule-modal-directions"
            href={directionsTo(venue)}
            target="_blank"
            rel="noopener"
          >
            Get directions
          </a>
        )}
        <button
          className="schedule-modal-close"
          type="button"
          aria-label="Close event details"
          onClick={close}
        >
          ×
        </button>
        {event && (
          <>
            <p className="schedule-modal-kicker">
              {formatTime(timeToMinutes(event.start))}-{formatTime(timeToMinutes(event.end))}
            </p>
            <h2 id="schedule-modal-title">{event.title}</h2>
            <p className="schedule-modal-location">{event.location}</p>
            <p className="schedule-modal-description">{event.description}</p>
            {event.links && (
              <div className="schedule-modal-links">
                {event.links.map(({ label, url }) => (
                  <a href={url} key={url} target="_blank" rel="noopener">
                    {label}
                  </a>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </Dialog>
  );
}

export function Schedule() {
  const [now, setNow] = useState(() => eventTime(new Date()));
  const today = scheduleDayToday(now.date);
  const [selectedDay, setSelectedDay] = useState({ id: today.id, date: now.date });
  const [event, setEvent] = useState<ScheduleEvent | null>(null);
  const day =
    (selectedDay.date === now.date && liveConfig.schedule.find((item) => item.id === selectedDay.id)) ||
    today;
  const startHour = Math.max(
    0,
    Math.floor(Math.min(...day.events.map(({ start }) => timeToMinutes(start))) / 60) - 1,
  );
  const firstMinute = startHour * 60;
  const lastMinute = day.endHour * 60;
  const hours = Array.from({ length: day.endHour - startHour }, (_, index) => startHour + index);
  const showNow = now.date === day.date && now.minutes >= firstMinute && now.minutes <= lastMinute;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(eventTime(new Date())), 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="live-section live-container" aria-labelledby="schedule-title">
      <div className="section-heading schedule-heading">
        <div>
          <p className="eyebrow">Weekend timeline</p>
          <h2 id="schedule-title">Schedule</h2>
        </div>
        <p className="schedule-note">
          Last updated: <code>04/17/2026 9:00AM PDT</code>
        </p>
      </div>
      <div className="schedule-days" role="group" aria-label="Schedule days">
        {liveConfig.schedule.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`schedule-day${item.id === day.id ? ' is-active' : ''}`}
            aria-pressed={item.id === day.id}
            onClick={() => setSelectedDay({ id: item.id, date: now.date })}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="schedule-board" aria-label={`Schedule for ${day.label}`}>
        <div className="time-column" aria-hidden="true">
          {hours.map((hour) => (
            <div className="time-slot" key={hour}>
              {formatTime(hour * 60, ' ')}
            </div>
          ))}
        </div>
        <div className="event-column">
          {layoutSchedule(day.events).map((item) => {
            const duration = item.endMinutes - item.startMinutes;
            const top = (item.startMinutes - firstMinute) / 60;
            const width = `calc((100% - 20px - ${8 * (item.columnCount - 1)}px) / ${item.columnCount})`;
            const className = [
              'schedule-event',
              `schedule-event-${item.category}`,
              duration <= 30 && 'is-short',
              duration <= 15 && 'is-tiny',
              item.columnCount > 1 && 'is-overlapping',
              (duration <= 45 || item.columnCount >= 3) && 'is-cramped',
            ]
              .filter(Boolean)
              .join(' ');
            const time = `${formatTime(item.startMinutes)}-${formatTime(item.endMinutes)}`;
            return (
              <button
                type="button"
                key={`${item.title}-${item.start}`}
                className={className}
                aria-label={`${item.title}, ${time}, ${item.location}`}
                aria-haspopup="dialog"
                onClick={() => setEvent(item)}
                style={{
                  top: `calc(${top} * var(--row-height))`,
                  height: `max(22px, calc(${duration / 60} * var(--row-height) - 6px))`,
                  left: `calc(10px + (${width} + 8px) * ${item.column})`,
                  width,
                }}
              >
                <span className="schedule-event-content">
                  <strong className="schedule-event-title">{item.title}</strong>
                  <span className="schedule-event-time">{time}</span>
                  <span className="schedule-event-location">{item.location}</span>
                </span>
              </button>
            );
          })}
          {showNow && (
            <div
              className="schedule-now-indicator"
              style={{ top: `calc(${(now.minutes - firstMinute) / 60} * var(--row-height))` }}
            >
              <span className="schedule-now-dot" />
              <span className="schedule-now-label">Now {formatTime(now.minutes)}</span>
            </div>
          )}
        </div>
      </div>
      <EventDetails event={event} close={() => setEvent(null)} />
    </section>
  );
}
