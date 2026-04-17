import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure render
    } else {
       if (pathname === '/' || pathname === '') {
        window.scrollTo(0, 0);
       }
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
