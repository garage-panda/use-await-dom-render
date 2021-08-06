type DomObserverCallback = (...args: any[]) => void;
type DomObserverEvent = "load" | "dom-update" | "start";

class DomObserver {
  private observer: MutationObserver;
  private onLoadCallbacks: DomObserverCallback[] = [];
  private onDomUpdateCallbacks: DomObserverCallback[] = [];
  private onStartCallbacks: DomObserverCallback[] = [];

  constructor(observerCallback: MutationCallback) {
    this.observer = new MutationObserver(observerCallback);
  }

  public on = (event: DomObserverEvent, callback: DomObserverCallback) => {
    const callbackArray = this.getCallbackArray(event);
    if (callbackArray) {
      callbackArray.push(callback);
    }
  };

  public call = (event: DomObserverEvent): void => {
    const callbackArray = this.getCallbackArray(event);
    if (callbackArray) {
      callbackArray.forEach((callback) => callback());
    }
  };

  public startDomWait = (targetNode) => {
    const config = { attributes: true, childList: true, subtree: true };

    this.observer.observe(targetNode, config);
  };

  public disconnect = () => {
    this.observer.disconnect();
  };

  public removeListeners = () => {
    this.onLoadCallbacks = [];
    this.onDomUpdateCallbacks = [];
    this.onStartCallbacks = [];
  };

  private getCallbackArray = (event: DomObserverEvent): DomObserverCallback[] => {
    switch (event) {
      case "load": {
        return this.onLoadCallbacks;
      }
      case "dom-update": {
        return this.onDomUpdateCallbacks;
      }
      case "start": {
        return this.onStartCallbacks;
      }
      default: {
        throw new Error(`Event ${event} is not a name handler for DomObserver`);
      }
    }
  };
}

export default DomObserver;
