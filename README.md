# use-await-dom-render

## Important

The package is under development and this is the Alpha version of it. Stay still, we are doing our best to finish it soon.

## About

A React hook that waits for all elements in an HTML node to be rendered and visible in the Node. It works by adding a MutationObserver to the target node and listens for DOM updates. It has an internal timer which is reset after every update. The DOM is deemed loaded after there have not been updates for 150ms. If that does not suit your purpose, pass the wait time in the hook declaration as argument to override that value.

## Example

[Example on StackBlitz](https://stackblitz.com/edit/react-hdahxp)

## Install

```
npm i @garage-panda/use-await-dom-render
```

## Usage

```typescript
import React from "react";
import { useAwaitDomRender } from "@garage-panda/use-await-dom-render";

function App() {
  const [observer, startWait] = useAwaitDomRender();

  React.useEffect(() => {
    const targetNode = document.querySelector("#container-component");

    observer.on("start", () => {
      console.log("Populating DOM started");
    });

    observer.on("dom-update", () => {
      // Can be called multiple times
      console.log("Each DOM update comes here");
    });

    observer.on("load", () => {
      console.log("All DOM elements rendered");
    });

    observer.on("load", () => {
      console.log("Multiple listeners can be attached, will be called in order.");
    });

    /**
     * Make sure startWait is called after the attached listeners
     * and before ReactDOM.render call
     **/
    startWait(targetNode);

    ReactDOM.render(
      <>
        <SomeHeavySlowContent />
        <OtherContent />
      </>,
      targetNode
    );
  }, []);

  return <div id="container-component" />;
}
```

To change the default wait time after which the DOM is considered loaded use:

```typescript
const [observer, startWait] = useAwaitDomRender(1000);
```

## Documentation

- `hook useAwaitDomRender(waitTime: number)`

  - Returns - Array<`DomObserver`, `StartWaitFunc`>: (example: `[observer, startWait]`);
  - Parameters:
    - `waitTime: number` - how much time needs to pass with no new DOM updates, after which the `load` event is emitted

- `class DomObserver`

  - methods
    - `on(event: DomObserverEvent, callback: () => void)` - registers an event listener for each dom observer event. Possible events are: `start` , `dom-update` and `load`.
    - `removeListeners()` - removes all active previously attached listeners

- `type StartWaitFunc` (second argument of return array of hook)
  - `(targetNode: Node) => void` - starts waiting for DOM updates within the provided targetNode.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Support

If you like what you see, feel free to support us!

<a href="https://www.buymeacoffee.com/garage.panda">
<img src="https://img.buymeacoffee.com/button-api/?text=Buy us a beer&emoji=:beer:&slug=garage.panda&button_colour=FFDD00&font_colour=000000&font_family=Poppins&outline_colour=000000&coffee_colour=ffffff"></a>

## License

[MIT](https://choosealicense.com/licenses/mit/)
