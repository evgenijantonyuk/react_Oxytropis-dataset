// MapLegend.jsx

import { AGS_SUBPROVINCES_LEGEND } from "../data/agsGeoData.js"

function MapLegend({ regionColors = {} }) {
    const customRegions = Object.entries(regionColors);

    return (
        <div className="ags-legend">
            <div className="ags-legend-title">Подпровинции АГС (по Р. В. Камелину)</div>

            {AGS_SUBPROVINCES_LEGEND.map(({ key, label, color }) => (
                <div key={key} className="ags-legend-item">
          <span
              className="ags-legend-swatch-box"
              style={{ backgroundColor: color }}
          />
                    <span>{label}</span>
                </div>
            ))}

            {customRegions.length > 0 && (
                <>
                    <div className="ags-legend-divider" />
                    {customRegions.map(([region, color]) => (
                        <div key={region} className="ags-legend-item">
              <span
                  className="ags-legend-swatch-dot"
                  style={{ backgroundColor: color }}
              />
                            <span>{region}</span>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default MapLegend