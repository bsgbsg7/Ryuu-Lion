import { useEffect, useRef } from 'react';

interface FitDivProps {
  onSize: (hwidth: number, eight: number) => void;
  children: any;
}
export default function FitDiv(props: FitDivProps) {
  const refTop = useRef<HTMLDivElement>(null);
  const refHeight = useRef(0);
  const refWidth = useRef(0);
  useEffect(() => {
    const timer = setInterval(() => {
      const rect = refTop.current?.getBoundingClientRect();
      const distanceToTop = rect?.top || 0;
      let height = window.innerHeight - distanceToTop;
      let width = rect?.width || 0;
      if (height < 0) height = 0;
      if (width < 0) width = 0;
      height = Math.round(height);
      width = Math.round(width);

      if (height !== refHeight.current || width !== refWidth.current) {
        refHeight.current = height;
        refWidth.current = width;
        props.onSize(width, height);
      }
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div style={{ padding: 0, margin: 0 }} ref={refTop}>
      {props.children}
    </div>
  );
}
