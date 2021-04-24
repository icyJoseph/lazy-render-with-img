# Native Lazy Render

> Experimental, please do not install

Native in this context refers to, browser enabled.

Since native image loading is now browser native, with great support across vendors, I thought of making a lazy render component, that takes advantage of it.

This version uses React, but it can of course extended to trigger more generic actions. Rendering would just be one option of many. Although it might be unsafe, when used outsite of a framework that sanitizes strings.

## Considerations

- An image is used as sentinel to know when the user scrolls nearby.
- The browser handles viewport calculations, so no intersection observers, or scroll listeners are needed.
- The browser knows when to best proceed with loading an image.
- No polyfills
- Enable a `top` prop, to trigger rendering when the user has arrived at a certain scroll position.
- Enable a `Loading` component.
- Demonstrate component design.
- Test string safety when using React.
- When an the browser decides to load the image, a network request is actually made.

The last point, might be undesirable by some, but for those practicing tracking it might be rather convenient.

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
    <>{state ? <img src={src} loading="lazy" alt="" ref={ref} /> : children}</>
  );
};
```
