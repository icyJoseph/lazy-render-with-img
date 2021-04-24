import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { LazyRender } from "native-lazy-render";

const HelloWorld = () => {
  useEffect(() => {
    toast("Hello World!", { toastId: "Hello" });
  }, []);

  return null;
};

export default function App() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!show) {
      const handler = () => setShow(true);
      window.addEventListener("scroll", handler);
      return () => window.removeEventListener("scroll", handler);
    }
  }, [show]);

  return (
    <>
      <ToastContainer />

      <header className="text">
        <h1>Lazy Render</h1>
        <h2>Scroll down</h2>
        <button onClick={() => setShow(false)}>Reload</button>
      </header>

      <div className="long"></div>

      {show && (
        <LazyRender>
          <HelloWorld />
        </LazyRender>
      )}

      <footer className="text">End</footer>
    </>
  );
}
