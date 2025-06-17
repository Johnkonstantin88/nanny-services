import { useEffect, useState } from 'react';
import Button from './Button';
import { useThrottle } from '../hooks';
import { useLocation } from 'react-router-dom';
import Icon from './Icon';

const ScrollUpBtn = () => {
  const [isShow, setIsShow] = useState(false);
  const location = useLocation();

  const handleScroll = () => {
    window.scrollY > window.innerHeight / 2
      ? setIsShow(true)
      : setIsShow(false);
  };

  const throttledScroll = useThrottle(handleScroll, 150);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (location.pathname !== '/') {
      window.addEventListener('scroll', throttledScroll);
      return () => window.removeEventListener('scroll', throttledScroll);
    }
  }, []);

  return (
    <Button
      type="button"
      className={`${
        isShow
          ? 'flex pointer-events-auto animate-scaleIn primary-transition'
          : 'hidden pointer-events-none opacity-0 animate-scaleOut transition-all transition-discrete'
      }
        fixed right-16 bottom-16 w-12 h-12 px-3.5 py-3.5 bg-green-main/30 hover:bg-green-main rounded-[50%] `}
      onClick={scrollToTop}
    >
      <Icon
        name={'icon-arrow-normal'}
        width={18}
        height={18}
        className={'-rotate-90'}
      />
    </Button>
  );
};

export default ScrollUpBtn;
