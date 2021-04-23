import React, { FC, useEffect, useState, useRef, useLayoutEffect } from "react";
import { ToastContainer, toast } from "react-toastify";


const randomStr = () => {
  const bytes = new Uint8Array(32);
  window.crypto.getRandomValues(bytes);
  return new TextDecoder().decode(bytes);
};

function useConstant<T>(init: () => T) {
  const ref = useRef<T | null>(null);

  if (ref.current === null) {
    ref.current = init();
  }

  return ref.current;
}

const LazyRender: FC = ({ children }) => {
  const [state, setState] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  const src = useConstant(randomStr);

  useLayoutEffect(() => {
    if (ref.current) {
      const node = ref.current;
      node.setAttribute("style", "display:block;height:0px; width:0px;");
    }
  }, []);

  useEffect(() => {
    if (ref.current) {
      const node = ref.current;

      const handler = () => setState(node.complete);
      node.addEventListener("error", handler);

      return () => node.removeEventListener("error", handler);
    }
  }, []);

  return (
    <>
      {!state && <img src={src} loading="lazy" alt="" ref={ref} />}
      {state && children}
    </>
  );
};

const HelloWorld = () => {
  const toastId = useConstant(randomStr);

  useEffect(() => {
    toast("Hello World!", { toastId });
  }, [toastId]);

  return null;
};

export default function App() {
  return (
    <>
      <ToastContainer />

      <header className="text">
        <h1>Lazy Render</h1>
        <h2>Scroll down</h2>
        <button onClick={() => window.location.reload()}>Reload</button>
      </header>

      <div className="long"></div>

      <LazyRender>
        <HelloWorld />
      </LazyRender>

      <footer className="text">End</footer>
    </>
  );
}
