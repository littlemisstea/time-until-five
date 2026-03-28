import { Text } from '@radix-ui/themes';
import styles from './MessageSlideshow.module.css';
import { useEffect, useState } from 'react';
import { shuffle } from '../../utils/arrayUtils';

interface MessageSlideshowProps {
  messageGroups: string[][];
}

function MessageSlideshow({ messageGroups }: MessageSlideshowProps) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [borderWidth, setBorderWidth] = useState(0);
  const [borderTimeout, setBorderTimeout] = useState(0.25);

  useEffect(() => {
    setGroupIndex(0);
  }, [messageGroups]);

  useEffect(() => {
    if (messageGroups.length <= 1) {
      setBorderWidth(0);
      setBorderTimeout(0);
      return;
    }

    const totalWords = messageGroups[groupIndex].reduce(
      (acc, currentMessage) => acc + countWords(currentMessage),
      0,
    );
    const messageTimeout = (totalWords / 100) * 60;

    const borderTimeoutId = setTimeout(() => {
      setBorderWidth(100);
      setBorderTimeout(messageTimeout);
    }, borderTimeout * 1000);

    const timeoutId = setTimeout(() => {
      let nextGroupIndex = groupIndex + 1;
      if (nextGroupIndex === messageGroups.length) {
        nextGroupIndex = 0;
        shuffle(messageGroups);
      }

      setGroupIndex(nextGroupIndex);
      setBorderWidth(0);
      setBorderTimeout(0.25);
    }, messageTimeout * 1000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(borderTimeoutId);
    };
  }, [borderTimeout, groupIndex, messageGroups]);

  return (
    <div
      className={styles.messageBox}
      style={
        {
          '--border-width': `${borderWidth.toString()}%`,
          '--border-timeout': `${borderTimeout.toString()}s`,
        } as React.CSSProperties
      }
    >
      {messageGroups[groupIndex]?.map((message) => (
        <Text as="p" size="8" key={message}>
          {message}
        </Text>
      ))}
    </div>
  );
}

function countWords(message: string) {
  message = message.replace(/(^\s*)|(\s*$)/gi, '');
  message = message.replace(/[ ]{2,}/gi, ' ');
  message = message.replace(/\n /, '\n');
  return message.split(' ').length;
}

export default MessageSlideshow;
