export const forecastDays = (index: number) => {
  let WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const date = new Date();
  const dayThisWeek = date.getDay();
  const forecastDays = WEEK_DAYS.slice(dayThisWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(dayThisWeek, dayThisWeek)
  );

  return forecastDays;
};