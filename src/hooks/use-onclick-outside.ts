import { useEffect } from "react";

type UseOnClickOutsideProps = {
  ref: React.RefObject<HTMLElement>;
  handler?: (event: MouseEvent | TouchEvent) => void;
  captureClicks?: boolean;
  clickCaptureIgnore?: React.RefObject<HTMLElement>[];
};

/**
 * A react hook that captures clicks outside of a given element
 * and calls a callback function when that happens
 * https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 */
export const useOnClickOutside = ({
  ref,
  handler,
  captureClicks,
  clickCaptureIgnore,
}: UseOnClickOutsideProps) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        clickCaptureIgnore?.some((ignoreRef) =>
          ignoreRef.current?.contains(event.target)
        )
      ) {
        return;
      }

      if (captureClicks) {
        event.preventDefault();
        event.stopPropagation();
      }
      handler?.(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, captureClicks, clickCaptureIgnore, handler]);
};
