// src/components/MapComponent/MapComponent.jsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapComponent.css";
import {
  AGS_DISTRICTS_GEOJSON,
  AGS_OUTER_BOUNDARY,
  SUBPROVINCE_COLORS,
} from "../data/agsGeoData.js";
import MapLegend from "./MapLegend.jsx";

function defaultCreateColoredIcon(color) {
  return L.divIcon({
    className: "",
    html: `<span class="ags-custom-marker" style="background:${color}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export function MapComponent({
  points = [],
  regionColors = {},
  activeDistrictCodes = null,
  showPointLabels = false,
  createColoredIcon = defaultCreateColoredIcon,
  onDistrictSelect,
  height = "600px",
  showLegend = true,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  const isSpeciesMode = Array.isArray(activeDistrictCodes);

  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    if (container._leaflet_id) {
      container._leaflet_id = null;
    }

    const map = L.map(container).setView([48.8, 88.5], 5);
    mapInstanceRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const activeBounds = L.latLngBounds([]);

    const districtsLayer = L.geoJSON(AGS_DISTRICTS_GEOJSON, {
      style: (feature) => {
        const code = feature.properties.code;

        if (isSpeciesMode) {
          const isPresent = activeDistrictCodes.includes(code);
          return {
            color: isPresent ? "#9b2226" : "#555",
            weight: isPresent ? 2.2 : 1,
            fillColor: isPresent ? "#e63946" : "#cfd4d2",
            fillOpacity: isPresent ? 0.55 : 0.18,
          };
        }

        return {
          color: "#2c3531",
          weight: 1.5,
          fillColor: SUBPROVINCE_COLORS[feature.properties.group] || "#888",
          fillOpacity: 0.45,
        };
      },
      onEachFeature: (feature, layer) => {
        const { code, name } = feature.properties;
        const isPresent = isSpeciesMode && activeDistrictCodes.includes(code);

        if (isPresent) {
          activeBounds.extend(layer.getBounds());
        }

        layer.bindTooltip(code, {
          permanent: true,
          direction: "center",
          className: "ags-district-label",
        });

        layer.bindPopup(
          `<strong>Район ${code}</strong><br/>${name} флористический район` +
            (isSpeciesMode
              ? `<br/><em>${isPresent ? "Вид отмечен в районе" : "Данных по району нет"}</em>`
              : "")
        );

        layer.on({
          mouseover: (e) => {
            e.target.setStyle({ fillOpacity: 0.78, weight: 2.5 });
          },
          mouseout: (e) => {
            districtsLayer.resetStyle(e.target);
          },
          click: () => {
            if (typeof onDistrictSelect === "function") {
              onDistrictSelect(feature.properties);
            }
          },
        });
      },
    }).addTo(map);

    L.polygon(AGS_OUTER_BOUNDARY, {
      color: "#1b211e",
      weight: 3,
      fill: false,
      interactive: false,
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);

    if (isSpeciesMode && Array.isArray(points)) {
      points.forEach((p) => {
        if (Array.isArray(p.coords)) {
          activeBounds.extend(p.coords);
        }
      });
    }

    const timer = setTimeout(() => {
      map.invalidateSize();
      if (isSpeciesMode && activeBounds.isValid()) {
        map.fitBounds(activeBounds, {
          padding: [28, 28],
          maxZoom: points.length > 0 && points.length < 5 ? 8 : 7,
        });
      }
    }, 50);

    return () => {
      clearTimeout(timer);
      map.remove();
      mapInstanceRef.current = null;
      markersLayerRef.current = null;
    };
  }, [activeDistrictCodes, isSpeciesMode, onDistrictSelect, points]);

  useEffect(() => {
    const markersLayer = markersLayerRef.current;
    if (!markersLayer) return;

    markersLayer.clearLayers();

    points.forEach((point) => {
      const color = regionColors[point.region] || "#1d3557";

      const marker = L.marker(point.coords, { icon: createColoredIcon(color) })
        .addTo(markersLayer)
        .bindPopup(
          `<strong>${point.title}</strong><br/><br/>` +
            `${point.desc}<br/><br/>` +
            `<em>${point.region}</em>` +
            (point.approx
              ? '<br/><span style="color:#b00">Координаты приблизительные</span>'
              : "")
        );

      // Пояснительные заметки открываются только при наведении на точку сбора
      if (point.shortLabel) {
        marker.bindTooltip(point.shortLabel, {
          permanent: false,
          direction: "right",
          offset: [10, 0],
          className: "ags-point-label",
        });
      }
    });
  }, [points, regionColors, createColoredIcon, showPointLabels]);

  return (
    <div className="container ags-map-wrapper">
      <div
        ref={mapContainerRef}
        className="ags-map-container"
        style={{ height }}
      />
      {showLegend && !isSpeciesMode && <MapLegend regionColors={regionColors} />}
    </div>
  );
}
