import React, { FC, useEffect, useState, useRef, useLayoutEffect } from "react";

/* @ts-expect-error */
const cryptoObj = window.crypto || window.msCrypto;

const toHex = (prev: string, num: number) => `${prev}${num.toString(16)}`;

const randomString = () => {
  const bytes = new Uint8Array(4);
  cryptoObj.getRandomValues(bytes);
  return bytes.reduce(toHex, "");
};

function useConstant<T>(init: () => T) {
  const ref = useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = init();
  }

  return ref.current;
}

export const LazyRender: FC = ({ children }) => {
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const src = useConstant(randomString);

  useLayoutEffect(() => {
    if (ref.current) {
      const node = ref.current;
      node.setAttribute("style", "display:block;height:0px;width:0px;");
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      const node = ref.current;

      const handler = () => setDone(node.complete);
      node.addEventListener("error", handler);

      return () => node.removeEventListener("error", handler);
    }
  }, []);

  return (
    <>
      {done ? (
        children
      ) : (
        <img
          src={src}
          loading="lazy"
          alt=""
          ref={ref}
        />
      )}
    </>
  );
};
