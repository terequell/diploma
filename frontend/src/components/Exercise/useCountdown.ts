import { useEffect, useState } from 'react';

type TypeUseCountdownHookResult = {
  current: number;
  resetCountdown: () => void;
};

export function useCountdown(
  secondsPerIteratee: number,
): TypeUseCountdownHookResult {
  const [current, setCurrent] = useState<number>(secondsPerIteratee);

  useEffect(() => {
    const interval = setInterval(
      () =>
        setCurrent((prevCurrent) => (prevCurrent === 1 ? 0 : prevCurrent - 1)),
      1000,
    );

    return () => clearInterval(interval);
  });

  function resetCountdown(): void {
    setCurrent(secondsPerIteratee);
  }

  return {
    current,
    resetCountdown,
  };
}
