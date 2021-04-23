# Lazy Render

Perhaps an anti pattern, but this project shows how to use `loading=lazy` on an `img` element to lazy render a component.

In this particular case, the lazy rendered component, triggers a call to `react-toastify`.

```tsx
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
```
