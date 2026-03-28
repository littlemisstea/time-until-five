import { useEffect, useState } from 'react';
import { TimePeriod } from '../utils/timeUtils';

export function useTimePeriod() {
  const [timePeriod, setTimePeriod] = useState(getTimePeriod());
  const endDate = getTimePeriodEndDate(timePeriod);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTimePeriod(getTimePeriod());
    }, endDate.getTime() - Date.now());

    return () => {
      clearTimeout(timeoutId);
    };
  }, [timePeriod, endDate]);

  return timePeriod;
}

function getTimePeriod() {
  const now = new Date();

  // Potentially update with:
  // https://github.com/bart-krakowski/get-week-info-polyfill
  if (now.getDay() === 0 || now.getDay() === 6) {
    return TimePeriod.Weekend;
  }

  const hour = now.getHours();

  if (hour < 9) {
    return TimePeriod.Morning;
  } else if (hour >= 9 && hour < 17) {
    return TimePeriod.Working;
  } else {
    return TimePeriod.Evening;
  }
}

function getTimePeriodEndDate(timePeriod: TimePeriod) {
  const endDate = new Date();

  const endHours: Record<TimePeriod, number> = {
    [TimePeriod.Morning]: 9,
    [TimePeriod.Working]: 17,
    [TimePeriod.Evening]: 24,
    [TimePeriod.Weekend]: 0,
  };

  // If it's the weekend, set the date to next Monday
  if (timePeriod === TimePeriod.Weekend) {
    endDate.setDate(endDate.getDate() + ((1 + 7 - endDate.getDay()) % 7));
  }

  endDate.setHours(endHours[timePeriod], 0, 0, 0);

  return endDate;
}
