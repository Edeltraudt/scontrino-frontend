const locale = "en-us";

export const today = new Date();
export const now = new Date(Date.now());

export const second = 1000;
export const minute = second * 60;
export const hour = minute * 60;
export const day = hour * 24;
export const week = day * 7;

export const isSameDay = (a, b) => {
  if (!a instanceof Date || !b instanceof Date) {
    throw new Error(a, b, "are no dates.");
  }

  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};

export const isToday = (date) => {
  return isSameDay(date, today);
};

export const getRelativeDateString = (date) => {
  if (isToday(date)) {
    return "Today";
  }

  // Otherwise get the weekday
  return date.toLocaleString(locale, { weekday: "long" });
};

export const getDateString = (date, showYear = false) => {
  return date.toLocaleString(locale, { month: "long", day: "numeric" });
};
