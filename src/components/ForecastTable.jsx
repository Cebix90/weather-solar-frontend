import React from "react";
import { format } from "date-fns";
import { getIconClass } from "../utils/weatherIcons";

export default function ForecastTable({ data }) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white dark:bg-neutral-900 shadow-md mb-8">
      <table className="w-full min-w-[650px] text-center">
        <thead>
          <tr>
            <th className="w-32 text-left md:text-right font-normal text-neutral-400 dark:text-neutral-500"></th>
            {data.map(({ date }) => (
              <th
                key={date}
                className="p-2 text-base md:text-lg font-semibold text-neutral-900 dark:text-neutral-100"
              >
                {format(new Date(date), "dd/MM/yyyy")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Ikona pogody */}
          <tr>
            <td className="font-semibold text-neutral-500 dark:text-neutral-400 text-left md:text-right px-2">
              Ikona
            </td>
            {data.map((day) => (
              <td key={day.date} className="py-3">
                <i
                  className={`fas ${getIconClass(
                    day.weatherCode
                  )} fa-2x md:fa-3x text-neutral-700 dark:text-neutral-200`}
                  aria-label="Ikona pogody"
                ></i>
              </td>
            ))}
          </tr>
          {/* temp max */}
          <tr>
            <td className="font-semibold text-neutral-500 dark:text-neutral-400 text-left md:text-right px-2">
              Temp. max
            </td>
            {data.map(({ maxTemp, date }) => (
              <td
                key={date}
                className="p-2 text-base md:text-lg text-neutral-800 dark:text-neutral-100"
              >
                {maxTemp}°C
              </td>
            ))}
          </tr>
          {/* temp min */}
          <tr>
            <td className="font-semibold text-neutral-500 dark:text-neutral-400 text-left md:text-right px-2">
              Temp. min
            </td>
            {data.map(({ minTemp, date }) => (
              <td
                key={date}
                className="p-2 text-sm md:text-base text-neutral-500 dark:text-neutral-300"
              >
                {minTemp}°C
              </td>
            ))}
          </tr>
          {/* energia */}
          <tr>
            <td className="font-semibold text-neutral-500 dark:text-neutral-400 text-left md:text-right px-2">
              Wygenerowana Energia
            </td>
            {data.map(({ estimatedEnergy, date }) => (
              <td
                key={date}
                className="p-2 text-sm md:text-base text-neutral-700 dark:text-neutral-200"
              >
                {estimatedEnergy.toFixed(2)} kWh
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
