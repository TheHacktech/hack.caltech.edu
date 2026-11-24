import { useEffect, useRef, useState } from 'react';
import { circle, divIcon, latLngBounds, map, marker, tileLayer, tooltip } from 'leaflet';
import type { Circle, Map, Marker, Tooltip } from 'leaflet';
import { directionsTo } from './directions';
import { liveConfig } from './content';
import type { Coordinates, Venue } from './content';
import 'leaflet/dist/leaflet.css';

interface VisitorLocation extends Coordinates {
  accuracy: number;
}

const [defaultVenue] = liveConfig.locations;
const venueBounds = latLngBounds(liveConfig.locations.map(({ lat, lng }) => [lat, lng]));
const mapIcon = divIcon({
  className: '',
  html: '<span class="venue-pin" aria-hidden="true"></span>',
  iconSize: [34, 34],
  iconAnchor: [17, 17],
});
const visitorIcon = divIcon({
  className: '',
  html: '<span class="user-pin" aria-hidden="true"></span>',
  iconSize: [22, 22],
  iconAnchor: [11, 11],
});

function resetView(instance: Map) {
  instance.invalidateSize();
  instance.fitBounds(venueBounds, { padding: [52, 52], maxZoom: 18, animate: false });
}

function tooltipContent(name: string, description: string) {
  const label = document.createElement('div');
  const type = document.createElement('span');
  label.textContent = name;
  type.textContent = description;
  label.append(type);
  return label;
}

function fallbackPosition({ lat, lng }: Coordinates) {
  const { north, south, west, east } = liveConfig.mapBounds;
  return {
    left: `${Math.max(4, Math.min(96, ((lng - west) / (east - west)) * 100))}%`,
    top: `${Math.max(6, Math.min(94, ((north - lat) / (north - south)) * 100))}%`,
  };
}

function FallbackMap({
  selected,
  visitor,
  choose,
}: {
  selected: Venue;
  visitor: VisitorLocation | null;
  choose: (venue: Venue) => void;
}) {
  return (
    <div className="campus-map campus-map-fallback" aria-label="Caltech venue map">
      {liveConfig.locations.map((venue) => (
        <button
          key={venue.id}
          type="button"
          className={`map-marker${venue === selected ? ' is-selected' : ''}`}
          style={fallbackPosition(venue)}
          aria-label={venue.name}
          onClick={() => choose(venue)}
        >
          <span className="map-marker-tooltip">
            {venue.name}
            <span>{venue.type}</span>
          </span>
        </button>
      ))}
      {visitor && (
        <span
          className="map-marker map-user-marker"
          style={fallbackPosition(visitor)}
          aria-label="You are here"
        />
      )}
    </div>
  );
}

export function VenueMap({ visible }: { visible: boolean }) {
  const mapElement = useRef<HTMLDivElement>(null);
  const instance = useRef<Map | null>(null);
  const selectedTooltip = useRef<Tooltip | null>(null);
  const visitorMarker = useRef<Marker | null>(null);
  const accuracyCircle = useRef<Circle | null>(null);
  const [selected, setSelected] = useState(defaultVenue);
  const [visitor, setVisitor] = useState<VisitorLocation | null>(null);
  const [status, setStatus] = useState('');
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const node = mapElement.current;
    if (!node || fallback) return;
    let tilesLoaded = 0;
    let tileFailures = 0;
    const venueMap = map(node, { scrollWheelZoom: false });
    instance.current = venueMap;
    try {
      resetView(venueMap);
      const tiles = tileLayer(liveConfig.mapTileUrl, {
        maxZoom: 19,
        attribution: liveConfig.mapAttribution,
      });
      tiles.on('tileload', () => {
        tilesLoaded++;
      });
      tiles.on('tileerror', () => {
        tileFailures++;
      });
      tiles.on('load', () => {
        if (tilesLoaded === 0 && tileFailures > 0) setFallback(true);
      });
      tiles.addTo(venueMap);

      for (const venue of liveConfig.locations) {
        marker([venue.lat, venue.lng], {
          icon: mapIcon,
          title: `${venue.name} / ${venue.type}`,
          alt: venue.name,
        })
          .addTo(venueMap)
          .on('click', () => setSelected(venue));
      }
      selectedTooltip.current = tooltip({
        className: 'venue-tooltip',
        direction: 'top',
        offset: [0, -18],
        opacity: 1,
        permanent: true,
      });
    } catch {
      setFallback(true);
    }
    return () => {
      venueMap.remove();
      instance.current = null;
      selectedTooltip.current = null;
      visitorMarker.current = null;
      accuracyCircle.current = null;
    };
  }, [fallback]);

  useEffect(() => {
    const venueMap = instance.current;
    const label = selectedTooltip.current;
    if (!venueMap || !label) return;
    label
      .setLatLng([selected.lat, selected.lng])
      .setContent(tooltipContent(selected.name, selected.type));
    if (!venueMap.hasLayer(label)) label.addTo(venueMap);
  }, [selected, fallback]);

  useEffect(() => {
    if (!visible) return;
    const frame = requestAnimationFrame(() => instance.current?.invalidateSize());
    return () => cancelAnimationFrame(frame);
  }, [visible]);

  useEffect(() => {
    const venueMap = instance.current;
    if (!venueMap || !visitor) return;
    const coordinates: [number, number] = [visitor.lat, visitor.lng];
    if (visitorMarker.current) visitorMarker.current.setLatLng(coordinates);
    else {
      visitorMarker.current = marker(coordinates, { icon: visitorIcon, title: 'You are here' })
        .addTo(venueMap)
        .bindTooltip(tooltipContent('You are here', 'Current location'), {
          className: 'venue-tooltip',
          direction: 'top',
          offset: [0, -12],
          opacity: 1,
        });
    }
    if (accuracyCircle.current)
      accuracyCircle.current.setLatLng(coordinates).setRadius(visitor.accuracy || 20);
    else
      accuracyCircle.current = circle(coordinates, {
        radius: visitor.accuracy || 20,
        color: '#2f8cff',
        fillColor: '#2f8cff',
        fillOpacity: 0.12,
        weight: 1,
      }).addTo(venueMap);
    venueMap.setView(coordinates, Math.max(venueMap.getZoom(), 18));
  }, [visitor]);

  function locate() {
    if (!navigator.geolocation) {
      setStatus('Location is not supported by this browser.');
      return;
    }
    setStatus('Requesting location...');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setVisitor({ lat: coords.latitude, lng: coords.longitude, accuracy: coords.accuracy });
        setStatus('Current location shown on map.');
      },
      () => setStatus('Location permission was denied or unavailable.'),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 30_000 },
    );
  }

  return (
    <section className="live-section live-container map-schedule-layout" aria-labelledby="map-title">
      <div className="section-heading">
        <p className="eyebrow">Hacktech 2026 Campus Guide</p>
        <h2 id="map-title">Venue Map</h2>
      </div>
      <div className="map-shell">
        <div className="map-grid">
          <div className="campus-map-wrap">
            <div
              className="campus-map interactive-map"
              ref={mapElement}
              aria-label="Interactive Caltech venue map"
              hidden={fallback}
            />
            {fallback && <FallbackMap selected={selected} visitor={visitor} choose={setSelected} />}
            <button
              className="map-recenter-btn"
              type="button"
              onClick={() => {
                if (instance.current) resetView(instance.current);
                setSelected(defaultVenue);
              }}
            >
              Recenter
            </button>
          </div>
          <aside className="location-panel" aria-live="polite">
            <p className="location-kicker">{selected.type}</p>
            <h3>{selected.name}</h3>
            <p>{selected.description}</p>
            <a id="map-coordinates-link" href={directionsTo(selected)}>
              Get Directions
            </a>
            <button className="locate-button" type="button" onClick={locate}>
              Show My Location
            </button>
            <p className="location-status" role="status">
              {status}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
