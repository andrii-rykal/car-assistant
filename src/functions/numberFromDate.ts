// export const numberFromDate = (date: string | number): number => {
//   return new Date(date).getTime()
// };

export const numberFromDate = (date: string | Date): number => {
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return parsedDate instanceof Date && !isNaN(parsedDate.getTime())
    ? parsedDate.getTime()
    : 0;
};