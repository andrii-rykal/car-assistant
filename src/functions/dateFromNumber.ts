export const dateFromNumber = (data: number): string => {
  if (!data || data < 0) {
    return '';
  }

  return new Date(data).toISOString().split('T')[0];
}