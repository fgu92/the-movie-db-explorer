const YEAR_REGEXP = /^\d+$/;

/**
 * Get the year of a date string.
 * @param release_date date string at format YYYY-MM-DD
 */
export const getYearFromDateString = (
  release_date?: string,
): number | undefined => {
  if (!release_date) return undefined;
  const yearStr = release_date.split("-")[0];
  if (!yearStr || !YEAR_REGEXP.test(yearStr)) return undefined;
  const yearNum = Number(yearStr);
  return isNaN(yearNum) ? undefined : yearNum;
};
