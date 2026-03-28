import styles from './Countdown.module.css';
import Ticker from '../Ticker/Ticker';
import { useTimeSpan } from '../../hooks/useTimeSpan';
import { TimeSpan } from '../../utils/timeUtils';

interface CountdownProps {
  endDate: Date;
  initialTimeRemaining: TimeSpan;
}

function Countdown({ endDate, initialTimeRemaining }: CountdownProps) {
  const timeSpan = useTimeSpan(endDate, initialTimeRemaining);

  return (
    <div className={styles.countdown}>
      <Ticker
        value={timeSpan.hours}
        label={timeSpan.hours === 1 ? 'hour' : 'hours'}
      />
      <Ticker value={timeSpan.minutes} label="min" />
      <Ticker value={timeSpan.seconds} label="sec" />
    </div>
  );
}

export default Countdown;
