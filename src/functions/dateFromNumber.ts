export const dateFromNumber = (data: number): string => {
  return new Date(data).toISOString().split('T')[0];
}