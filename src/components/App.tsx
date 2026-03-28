import { useCallback, useRef } from 'react';
import { getTimeUntil, TimePeriod } from '../utils/timeUtils';
import styles from './App.module.css';
import Countdown from './Countdown/Countdown';
import { Button, Heading } from '@radix-ui/themes';
import { breakfast, party } from '../utils/confettiUtils';
import { useTimePeriod } from '../hooks/useTimePeriod';
import { shuffle } from '../utils/arrayUtils';
import MessageSlideshow from './MessageSlideshow/MessageSlideshow';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const headings: Record<TimePeriod, string> = {
  [TimePeriod.Morning]: 'The workday starts in:',
  [TimePeriod.Working]: 'The workday ends in:',
  [TimePeriod.Evening]: 'The workday has ended!',
  [TimePeriod.Weekend]: 'Seriously?',
};

const workingMessageGroups = [
  ['lmao you have to work?', 'just get rich'],
  ['Another day, another dollar.', '(ask for a raise)'],
  ['The investors appreciate your sacrifice.'],
  ['Give yourself a break.', "You've earned it."],
  ["🎶 Workin' 9 to 5 🎶", "What a way to make a livin'"],
  ['"Wow, I\'m so glad I worked those extra hours"', '- said no one ever'],
  [
    'just one more meeting bro',
    'I SwEaR JuSt oNe mOrE MeEtInG WiLL fiX eVeRyThInG',
  ],
  [
    'In the standard work dialect, "urgent" is synonymous with "at your leisure"',
  ],
  [
    'Vacation days are not health potions',
    "You don't need to save them for the final boss",
  ],
  ['Yes, you can take a vacation!', 'No, seriously. Do it.'],
];
shuffle(workingMessageGroups);

const messageGroups: Record<TimePeriod, string[][]> = {
  [TimePeriod.Morning]: [
    ['Take your time.', "Work to live, don't live to work."],
  ],
  [TimePeriod.Working]: workingMessageGroups,
  [TimePeriod.Evening]: [['You did it!', 'Congrats, go home.']],
  [TimePeriod.Weekend]: [["It's the weekend.", 'What are you doing here?']],
};

const buttonStates: Partial<
  Record<TimePeriod, { text: string; action: (element: Element) => void }>
> = {
  [TimePeriod.Morning]: { text: '☕️ Breakfast 🥐', action: breakfast },
  [TimePeriod.Evening]: { text: '🥳 Party 🎉', action: party },
};

function App() {
  const timePeriod = useTimePeriod();
  const partyButton = useRef<HTMLButtonElement>(null);

  const partyButtonCallback = useCallback(
    (node: typeof partyButton.current) => {
      if (!node) return;
      partyButton.current = node;

      if (timePeriod === TimePeriod.Evening) {
        party(node);
      }
    },
    [timePeriod],
  );

  const endDate = getCountdownEndDate(timePeriod);
  const initialTimeRemaining = getTimeUntil(endDate);
  const buttonState = buttonStates[timePeriod];

  return (
    <div className={styles.container}>
      <main className={styles.app}>
        <>
          <Heading
            as="h1"
            size={{
              initial: '8',
              sm: '9',
            }}
          >
            {headings[timePeriod]}
          </Heading>
          {timePeriod !== TimePeriod.Weekend && (
            <Countdown
              endDate={endDate}
              initialTimeRemaining={initialTimeRemaining}
            />
          )}
          <MessageSlideshow messageGroups={messageGroups[timePeriod]} />
          {buttonState && (
            <Button
              ref={partyButtonCallback}
              onClick={() => {
                if (!partyButton.current) return;
                buttonState.action(partyButton.current);
              }}
              size="4"
              my="5"
            >
              {buttonState.text}
            </Button>
          )}
        </>
      </main>
      <footer>
        <a
          href="https://github.com/littlemisstea/time-until-five"
          target="_blank"
        >
          <GitHubLogoIcon width={24} height={24} color="var(--gray-9)" />
        </a>
      </footer>
    </div>
  );
}

function getCountdownEndDate(timePeriod: TimePeriod) {
  let endHour = 17;
  if (timePeriod === TimePeriod.Morning) endHour = 9;

  const endDate = new Date();
  endDate.setHours(endHour, 0, 0, 0);

  return endDate;
}

export default App;
