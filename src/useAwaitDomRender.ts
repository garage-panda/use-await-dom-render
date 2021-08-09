import React from "react";
import DomObserver from "./DomObserver";

export type StartWaitFunc = (targetNode: Node) => void;
export type UseAwaitDomRenderResult = [DomObserver, StartWaitFunc];

export default (waitTimeMs = 150): UseAwaitDomRenderResult => {
  const [updatesCount, setUpdatesCount] = React.useState<number>(0);

  const receiveDomUpdate = React.useCallback(() => {
    setUpdatesCount((prevCount: number) => prevCount + 1);
  }, []);

  const setLoaded = React.useCallback(() => {
    observer.call("load");
    observer.disconnect();
  }, []);

  const observer = React.useMemo(
    () =>
      new DomObserver(() => {
        receiveDomUpdate();
        observer.call("dom-update");
      }),
    [receiveDomUpdate]
  );

  React.useEffect(() => {
    if (updatesCount === 0) return;

    const timeout = setTimeout(() => {
      setLoaded();
    }, waitTimeMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [updatesCount]);

  React.useEffect(() => {
    setTimeout(() => {
      if (updatesCount === 0) {
        setLoaded();
      }
    }, waitTimeMs);
  }, []);

  const startWait = React.useCallback(
    (targetNode: Node): void => {
      setUpdatesCount(0);
      observer.call("start");
      observer.startDomWait(targetNode);
    },
    [observer]
  );

  return [observer, startWait];
};
