import React, { useState, useEffect } from "react";
import { useGeolocation } from "./hooks/useGeolocation";
import ForecastTable from "./components/ForecastTable";
import ForecastFooter from "./components/ForecastFooter";
import ThemeToggle from "./components/ThemeToggle";
import MapPicker from "./components/MapPicker";

function App() {
  const { latitude, longitude } = useGeolocation();
  const [forecastData, setForecastData] = useState({ forecast: [] });
  const [summaryData, setSummaryData] = useState(null);
  const [customLat, setCustomLat] = useState(null);
  const [customLng, setCustomLng] = useState(null);

  const actualLat = customLat ?? latitude;
  const actualLng = customLng ?? longitude;

  useEffect(() => {
    if (actualLat == null || actualLng == null) return;

    Promise.all([
      fetch(
        `/weather/forecast?latitude=${actualLat}&longitude=${actualLng}`
      ).then((res) => res.json()),
      fetch(
        `/weather/summary?latitude=${actualLat}&longitude=${actualLng}`
      ).then((res) => res.json()),
    ])
      .then(([fResp, sResp]) => {
        setForecastData(fResp);
        setSummaryData(sResp);
      })
      .catch(console.error);
  }, [actualLat, actualLng]);

  if (!forecastData.forecast.length || !summaryData) {
    return (
      <div className="flex items-center justify-center h-screen">
        Ładowanie danych…
      </div>
    );
  }

  return (
    <>
      <ThemeToggle />
      <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 transition-colors duration-500">
        <div className="container mx-auto p-4">
          <MapPicker
            latitude={actualLat}
            longitude={actualLng}
            onChange={(lat, lng) => {
              setCustomLat(lat);
              setCustomLng(lng);
            }}
          />
          <div className="flex flex-col md:flex-row items-center justify-between mb-3 gap-2">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition shadow flex items-center"
              onClick={() => {
                setCustomLat(null);
                setCustomLng(null);
              }}
              style={{ minWidth: 44 }}
            >
              <i className="fas fa-location-crosshairs mr-2 text-base"></i>
              Znajdź moją lokalizację
            </button>
            <div className="text-base md:text-lg font-semibold text-neutral-800 dark:text-neutral-100 pr-1 md:pr-4 text-center w-full md:text-right md:w-auto">
              Wybrana Lokalizacja:{" "}
              <span className="font-mono">{actualLat?.toFixed(4)}</span>,{" "}
              <span className="font-mono">{actualLng?.toFixed(4)}</span>
            </div>
          </div>
          <ForecastTable data={forecastData.forecast} />
          <ForecastFooter summary={summaryData} />
        </div>
      </div>
    </>
  );
}

export default App;
