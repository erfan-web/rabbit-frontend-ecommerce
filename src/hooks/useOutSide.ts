import { useEffect, useRef } from "react";

/**
 * useOutsideClick
 * @param active - مشخص می‌کند که هوک فقط وقتی فعال باشد که کامپوننت باز است
 * @param callback - تابعی که هنگام کلیک بیرون از المنت فراخوانی می‌شود
 */
export function useOutsideClick<T extends HTMLElement>(
  active: boolean,
  callback: () => void
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!active) return; // فقط زمانی که باکس بازه لیسنر اضافه کن

    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [active, callback]);

  return ref;
}
