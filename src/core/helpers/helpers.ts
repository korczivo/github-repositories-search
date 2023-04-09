export const getDisplayDate = (date?: string | null): string => {
  if (!date) return '-';

  const isValidDate = !Number.isNaN(Date.parse(String(date)));
  if (!isValidDate) return '-';

  return new Date(date).toLocaleDateString();
};
