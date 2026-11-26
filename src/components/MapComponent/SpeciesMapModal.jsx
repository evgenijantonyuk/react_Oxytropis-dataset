// src/components/MapComponent/SpeciesMapModal.jsx
import React, { useEffect, useMemo } from "react";
import { MapComponent } from "./MapComponent.jsx";
import {
  extractAgsDistricts,
  extractSpeciesLocations,
  findDistrictCodeByCoords,
} from "../../utils/parseSpeciesSpread.js";
import style from "../SpeciesList/SpeciesList.module.css";

export function SpeciesMapModal({ species, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const speciesPoints = useMemo(
    () => (species ? extractSpeciesLocations(species) : []),
    [species]
  );

  const districtCodes = useMemo(() => {
    if (!species) return [];
    const codes = new Set(extractAgsDistricts(species));

    if (!species.mistake) {
      for (const pt of speciesPoints) {
        const codeByPoint = findDistrictCodeByCoords(pt.coords);
        if (codeByPoint) {
          codes.add(codeByPoint);
        }
      }
    }

    return Array.from(codes);
  }, [species, speciesPoints]);

  if (!species) return null;

  const isFewPoints = speciesPoints.length > 0 && speciesPoints.length < 5;

  return (
    <div className={style.modal__overlay} onClick={onClose}>
      <div
        className={`${style.modal__content} ${style.modal__content_map}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="map-modal-title"
      >
        <button
          className={style.modal__close}
          onClick={onClose}
          aria-label="Закрыть"
          type="button"
        >
          ×
        </button>

        <h3 className={style.modal__title} id="map-modal-title">
          Распространение: <i>{species.nameLat}</i>
          {species.author && ` ${species.author}`}
          {species.nameRu && ` ${species.nameRu}`}
        </h3>

        <div className={style.modal__map_box}>
          <MapComponent
            activeDistrictCodes={districtCodes}
            points={speciesPoints}
            showPointLabels={isFewPoints}
            regionColors={{
              "Точное местонахождение": "#1d3557",
              "Местонахождение по конспекту": "#2a9d8f",
            }}
            height="430px"
            showLegend={false}
          />
        </div>

        <div className={style.modal__map_legend}>
          <span className={style.modal__legend_item}>
            <span
              className={style.modal__legend_swatch}
              style={{ background: "#e63946", borderColor: "#9b2226" }}
            />
            Районы АГС{" "}
            {districtCodes.length > 0
              ? `(${districtCodes.join(", ")})`
              : species.mistake
                ? "(ошибочное указание в литературе)"
                : "(не уточнены по индексам)"}
          </span>

          {speciesPoints.length > 0 && (
            <span className={style.modal__legend_item}>
              <span
                className={style.modal__legend_dot}
                style={{ background: "#1d3557" }}
              />
              {isFewPoints
                ? `Конкретные местонахождения (${speciesPoints.length}) — наведите на точку`
                : `Точки сборов (${speciesPoints.length}) — наведите на точку`}
            </span>
          )}
        </div>

        {isFewPoints && (
          <div className={style.modal__few_points}>
            <strong>Конкретные местонахождения вида:</strong>
            <ul>
              {speciesPoints.map((pt, i) => (
                <li key={i}>
                  {pt.shortLabel} ({pt.coords[0]}° с.ш., {pt.coords[1]}° в.д.)
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className={style.modal__spread_info}>
          {species.spreadLocal && (
            <p className={style.modal__spread_row}>
              <strong>Распространение в АГС:</strong> {species.spreadLocal}
            </p>
          )}
          {species.spreadGeneral && (
            <p className={style.modal__spread_row}>
              <strong>Общее распространение:</strong> {species.spreadGeneral}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
