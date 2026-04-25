export default function formatDate(dateInput: string) {
  const formattedDate = new Date(
    dateInput.replace(/-/g, "/"),
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return formattedDate;
}

export const formatMonthly = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short", // "Feb"
    year: "numeric", // "2026"
  });
};
