"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type Pin = { lat: number; lng: number; text: string };

const MANCHESTER: Pin = {
  lat: 53.4808,
  lng: -2.2426,
  text: "Manchester, UK",
};

const MSBT_ADDRESS: Pin = {
  lat: 53.4687522,
  lng: -2.1964829,
  text: "99 Clowes Street, M12 5FY",
};

const SATELLITE_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    satellite: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "© Esri, Maxar, Earthstar Geographics",
      maxzoom: 19,
    },
    streets: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
    },
    labels: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      maxzoom: 19,
    },
  },
  layers: [
    { id: "satellite", type: "raster", source: "satellite" },
    { id: "streets", type: "raster", source: "streets", paint: { "raster-opacity": 0.85 } },
    { id: "labels", type: "raster", source: "labels" },
  ],
};

function sleep(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function geocodeAddress(query: string): Promise<Pin | null> {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
    { headers: { "Accept-Language": "en", "User-Agent": "MSBT-Website/1.0" } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  if (!data?.[0]) return null;
  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
    text: query,
  };
}

function setMarker(map: maplibregl.Map, markerRef: React.MutableRefObject<maplibregl.Marker | null>, pin: Pin) {
  markerRef.current?.remove();
  const el = document.createElement("div");
  el.className = "msbt-map-pin";
  el.innerHTML = `<span>${pin.text}</span>`;
  markerRef.current = new maplibregl.Marker({ element: el, anchor: "bottom" })
    .setLngLat([pin.lng, pin.lat])
    .addTo(map);
}

async function runIntroFlythrough(
  map: maplibregl.Map,
  markerRef: React.MutableRefObject<maplibregl.Marker | null>,
  active: () => boolean
) {
  map.setProjection({ type: "globe" });
  map.jumpTo({ center: [-20, 30], zoom: 1.4, pitch: 0, bearing: 0 });

  await sleep(1200);
  if (!active()) return;

  map.flyTo({
    center: [MANCHESTER.lng, MANCHESTER.lat],
    zoom: 12,
    pitch: 0,
    bearing: 0,
    duration: 5000,
    essential: true,
  });

  await sleep(5200);
  if (!active()) return;

  setMarker(map, markerRef, MANCHESTER);

  await sleep(800);
  if (!active()) return;

  map.flyTo({
    center: [MSBT_ADDRESS.lng, MSBT_ADDRESS.lat],
    zoom: 18.5,
    pitch: 62,
    bearing: -28,
    duration: 6500,
    essential: true,
  });

  await sleep(6600);
  if (!active()) return;

  setMarker(map, markerRef, MSBT_ADDRESS);
}

export default function GlobeExplorer({
  searchLocation,
}: {
  searchLocation: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);
  const introDoneRef = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!containerRef.current) return;

    let active = true;
    const isActive = () => active;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: SATELLITE_STYLE,
      center: [-20, 30],
      zoom: 1.4,
      maxPitch: 70,
    });

    map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
    mapRef.current = map;

    map.on("load", () => {
      runIntroFlythrough(map, markerRef, isActive).then(() => {
        if (isActive()) introDoneRef.current = true;
      });
    });

    const onResize = () => map.resize();
    window.addEventListener("resize", onResize);

    return () => {
      active = false;
      introDoneRef.current = false;
      window.removeEventListener("resize", onResize);
      markerRef.current?.remove();
      markerRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!searchLocation?.trim() || !mapRef.current) return;

    let active = true;
    setError("");

    const fly = async () => {
      while (!introDoneRef.current && active) {
        await sleep(200);
      }
      const map = mapRef.current;
      if (!active || !map) return;

      const pin = await geocodeAddress(searchLocation);
      if (!active || !mapRef.current) return;

      if (!pin) {
        setError("Address not found. Try a different search.");
        return;
      }

      setMarker(map, markerRef, pin);
      map.flyTo({
        center: [pin.lng, pin.lat],
        zoom: 18.5,
        pitch: 62,
        bearing: -28,
        duration: 4000,
        essential: true,
      });
    };

    fly();

    return () => {
      active = false;
    };
  }, [searchLocation]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="h-[420px] w-full bg-[#000814] md:h-[520px] lg:h-[600px]"
      />
      {error && (
        <p className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-navy/90 px-4 py-2 text-xs text-white">
          {error}
        </p>
      )}
    </div>
  );
}
