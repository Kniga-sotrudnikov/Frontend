import { useEffect, useState } from "react";

export const useLastDefinedValue = <T,>(
  value: T | undefined,
  initialValue: T,
) => {
  const [lastValue, setLastValue] = useState(initialValue);

  useEffect(() => {
    if (value !== undefined) {
      setLastValue(value);
    }
  }, [value]);

  return value ?? lastValue;
};
