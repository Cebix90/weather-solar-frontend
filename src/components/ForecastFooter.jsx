import React from "react";

export default function ForecastFooter({ summary }) {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-2xl mt-4 text-left shadow text-neutral-900 dark:text-neutral-100">
      <div className="font-semibold mb-2 text-base md:text-lg">
        Podsumowanie danych pogodowych dla wybranego tygodnia:
      </div>
      <div>
        Skrajne temperatury: od{" "}
        <b>
          {summary.minTemp}°C - {summary.maxTemp}°C
        </b>
      </div>
      <div>
        Średnie ciśnienie: <b>{summary.averagePressure} hPa</b>
      </div>
      <div>
        Średni czas ekspozycji na słońce:{" "}
        <b>{summary.averageSunlightHours} h</b>
      </div>
      <div>
        Podsumowanie: <b>{summary.weekSummary}</b>
      </div>
    </footer>
  );
}
