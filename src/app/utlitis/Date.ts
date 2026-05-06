 export const formatEgyptDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-EG", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};