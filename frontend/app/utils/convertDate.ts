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
