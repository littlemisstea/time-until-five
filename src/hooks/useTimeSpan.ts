import { useEffect, useState } from 'react';
import { getTimeUntil, TimeSpan } from '../utils/timeUtils';

// Passing in the initialTimeRemaining prevents the time span from
// displaying all zeros for the first second
export function useTimeSpan(endDate: Date, initialTimeRemaining?: TimeSpan) {
  const [timeSpan, setTimeSpan] = useState<TimeSpan>(
    initialTimeRemaining ?? {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeSpan = getTimeUntil(endDate);

      if (
        timeSpan.hours === 0 &&
        timeSpan.minutes === 0 &&
        timeSpan.seconds === 0
      ) {
        clearInterval(intervalId);
      }

      setTimeSpan(timeSpan);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [endDate]);

  return timeSpan;
}
