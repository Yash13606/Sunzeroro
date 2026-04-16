import { useEffect, useState } from 'react';

type ResponsiveState = {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
};

const getWidth = () => (typeof window === 'undefined' ? 1024 : window.innerWidth);

export function useResponsive(): ResponsiveState {
  const [width, setWidth] = useState(getWidth());

  useEffect(() => {
    const handleResize = () => setWidth(getWidth());
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width,
    isMobile: width <= 768,
    isTablet: width <= 1024
  };
}
