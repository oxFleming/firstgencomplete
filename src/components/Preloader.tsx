import { useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  useEffect(() => {
    const frame = window.requestAnimationFrame(onComplete);
    return () => window.cancelAnimationFrame(frame);
  }, [onComplete]);

  return null;
}
