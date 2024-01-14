import { RefObject, useEffect, useRef } from 'react';

interface UserObserverProps {
  ref: RefObject<HTMLDivElement | null>;
  canLoad?: boolean;
  isLoading: boolean;
  callback: () => void;
}

export const useObserver = ({
  ref,
  canLoad,
  isLoading,
  callback,
}: UserObserverProps) => {
  const observer = useRef<IntersectionObserver>();
  useEffect(() => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();

    var cb = function (entries: { isIntersecting: boolean }[]) {
      if (entries[0].isIntersecting && canLoad) {
        setTimeout(() => callback(), 500);
      }
    };
    observer.current = new IntersectionObserver(cb);
    if (ref.current) observer.current.observe(ref.current);
  }, [isLoading]);
};
