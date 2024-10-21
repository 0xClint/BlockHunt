export function daysUntil(dateString: string): number {
  const today = new Date();
  const targetDate = new Date(dateString);

  const timeDifference = targetDate.getTime() - today.getTime();

  const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysDifference;
}
