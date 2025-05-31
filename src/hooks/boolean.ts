import { useState } from 'react';

export function useBoolean(initialValue = false) {
  const [isOn, setIsOn] = useState(initialValue);

  return {
    isOn,
    on: () => setIsOn(true),
    off: () => setIsOn(false),
    toggle: () => setIsOn((prev) => !prev)
  };
}
