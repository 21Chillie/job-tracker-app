import { CalendarDate } from "@internationalized/date";

export function capitalizeString(text: string) {
  const capitalized = text
    .replaceAll("_", " ")
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return capitalized;
}

export function toCalendarDate(date: Date): CalendarDate {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  );
}
