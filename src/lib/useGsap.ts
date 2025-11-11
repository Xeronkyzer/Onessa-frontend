import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGsap = () => {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    return () => {
      contextRef.current?.revert();
    };
  }, []);

  return { gsap, ScrollTrigger, contextRef };
};
