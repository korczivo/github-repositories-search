export const getDisplayDate = (date: string): string => {
  if (!date) return '-';

  const isValidDate = !Number.isNaN(Date.parse(date));
  if (!isValidDate) return '-';

  return new Date(date).toLocaleDateString();
};
