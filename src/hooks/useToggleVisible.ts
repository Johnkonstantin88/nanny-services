import { useState } from 'react';

function useToggleVisibility(initialValue = false): [boolean, () => void] {
  const [isVisible, setIsVisible] = useState<boolean>(initialValue);

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  return [isVisible, toggleVisibility];
}

export default useToggleVisibility;
