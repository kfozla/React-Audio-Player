// utils.js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function parseTime(seconds) {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  seconds = Math.floor(seconds % 60);
  return [hours, minutes, seconds];
}

export function formatHumanTime(seconds) {
  let [h, m, s] = parseTime(seconds);
  return `${h} hour${h == 1 ? "" : "s"}, ${m} minute${
    m == 1 ? "" : "s"
  }, ${s} second${s == 1 ? "" : "s"}`;
}

export function formatTime(seconds) {
  let [hours, minutes, secs] = parseTime(seconds);
  const formattedTime = [hours, minutes, secs]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
  return formattedTime;
}
