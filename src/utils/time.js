export const formatTime = (time) => {
  // only show hours and minutes
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTimeFb = (time) => {
  if (!time) return "N/A";

  // only show hours and minutes
  return time.toDate().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getNameInitials = (date) => {
  if (!date) return "N/A";

  return new Date(time.toDate()).getDay();
};

export const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date.toDate()).toLocaleDateString([], {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
