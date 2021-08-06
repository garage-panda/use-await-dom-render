# use-await-dom-render

## About
A React hook that waits for all elements in an HTML node to be rendered and visible in the Node.

## Install
`npm i @garage-panda/use-await-dom-render`

## Example
```typescript
import { useAwaitDomRender } from "@garage-panda/use-await-dom-render";

function App() {
  const [observer, startWait] = useAwaitDomRender();

  useLayoutEffect(() => {
    const targetNode = document.querySelector('#container-component');
    
    startWait(targetNode);
    
    observer.on('load', () => {
      console.log('All DOM elements rendered');
    });
  }, []);

  return (
    <div id="container-component">
      <SomeHeavySlowContent />
      <OtherContent />
    </div>
  );
}
```
