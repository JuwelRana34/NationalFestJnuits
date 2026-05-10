
const formatDate = (dateString?: string | null) => {
  if (!dateString) return "TBA";
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  } catch (error) {
    return dateString;
  }
};


const formatTime = (timeString?: string | null) => {
  if (!timeString) return "TBA";
  try {
    // If it's already a full date string, parse it
    if (timeString.includes("T")) {
      const date = new Date(timeString);
      return new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(date);
    }

    // If it's just "HH:MM" (e.g., "20:20")
    const [hours, minutes] = timeString.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12; // Convert 0 to 12
    return `${formattedHour}:${minutes} ${ampm}`;
  } catch (error) {
    return timeString; // fallback
  }
};

export { formatDate, formatTime };