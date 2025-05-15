import { useState } from 'react';

export const useToggleVisibility = (
  initialValue = false
): [boolean, () => void] => {
  const [isVisible, setIsVisible] = useState<boolean>(initialValue);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return [isVisible, toggleVisibility];
};
