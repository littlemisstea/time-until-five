export const enum TimePeriod {
  Morning, // 12am - 9am
  Working, // 9am - 5pm
  Evening, // 5pm - 12am
  Weekend, // Saturday or Sunday
}

export interface TimeSpan {
  hours: number;
  minutes: number;
  seconds: number;
}

export function getTimeUntil(endDate: Date): TimeSpan {
  const diff = endDate.getTime() - Date.now();

  if (diff <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}
