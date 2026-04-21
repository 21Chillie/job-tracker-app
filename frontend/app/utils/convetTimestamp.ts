import {
  formatDistanceToNow,
  format,
  parseISO,
  differenceInDays,
} from "date-fns";

/**
 * Formats a date string into a relative string or a full date.
 * Threshold: If older than 7 days, returns the full date.
 */
export default function formatRelativeTime(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;
  const now = new Date();

  const daysDiff = differenceInDays(now, date);

  // If the date is older than 7 days, show the actual date
  if (daysDiff > 7) {
    return format(date, "MMM dd, yyyy"); // e.g., Apr 21, 2026
  }

  const distance = formatDistanceToNow(new Date(date), { addSuffix: true });

  return distance.replace(/(about|almost|over)\s/g, "");
}

// Example Usage:
// Input: "2026-04-21 02:37:54"
// Result (if called now): "less than a minute ago"
