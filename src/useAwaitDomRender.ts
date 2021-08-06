import React from "react";
import DomObserver from "./DomObserver";

export type StartWaitFunc = (targetNode: Node) => void;
export type UseAwaitDomRenderResult = [DomObserver, StartWaitFunc];

export default (waitTimeMs = 150): UseAwaitDomRenderResult => {
  const [updatesCount, setUpdatesCount] = React.useState<number>(0);

  const receiveDomUpdate = React.useCallback(() => {
    setUpdatesCount((prevCount: number) => prevCount + 1);
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
      observer.call("load");
      observer.disconnect();
    }, waitTimeMs);

    return () => {
      clearTimeout(timeout);
    };
  }, [updatesCount]);

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
