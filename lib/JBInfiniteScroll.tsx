import React, { useState, useRef, useCallback, useEffect, useImperativeHandle, ReactElement } from 'react';
import "jb-infinite-scroll";
import { useEvent } from "../../../common/hooks/use-event.js";
//TODO: replace it after you migrate web-component to typescript
type JBInfinityScrollWebComponent = any;
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'jb-infinite-scroll': JBInfinityScrollType;
    }
    interface JBInfinityScrollType extends React.DetailedHTMLProps<React.HTMLAttributes<JBInfinityScrollWebComponent>, JBInfinityScrollWebComponent> {
      "class"?: string,
      "type"?: string;
    }
  }
}
const JBInfiniteScroll = React.forwardRef((props: Props, ref) => {
  const element = useRef<JBInfinityScrollWebComponent>(null);
  const [refChangeCount, refChangeCountSetter] = useState(0);
  useImperativeHandle(
    ref,
    () => (element ? element.current : {}),
    [element],
  );
  useEffect(() => {
    refChangeCountSetter(refChangeCount + 1);
  }, [element.current]);

  useEffect(() => {
    element.current?.checkScrollHeight();
  }, [element.current]);

  const onScrollEnd = useCallback((e) => {
    if (props.onScrollEnd) {
      props.onScrollEnd(e);
    }
  }, [props.onScrollEnd]);
  useEvent(element.current, 'scrollEnd', onScrollEnd, true);
  useEffect(() => {
    if (element.current) {
      if (props.isLoading) {
        element.current.setAttribute('is-loading', 'true');
      } else {
        element.current.setAttribute('is-loading', 'false');

      }
    }

  }, [props.isLoading]);
  useEffect(() => {
    if (element.current) {
      if (props.isListEmpty) {
        element.current.setAttribute('is-list-empty', 'true');
      } else {
        element.current.setAttribute('is-list-empty', 'false');

      }
    }

  }, [props.isListEmpty]);
  useEffect(() => {
    if (element.current) {
      if (props.isListEnded) {
        element.current?.setAttribute('is-list-ended', 'true');
      } else {
        element.current?.setAttribute('is-list-ended', 'false');
      }
    }

  }, [props.isListEnded]);
  useEffect(() => {
    if (element.current) {
      if (props.disableCaptureScroll) {
        element.current?.setAttribute('disable-capture-scroll', 'true');
      } else {
        element.current?.setAttribute('disable-capture-scroll', 'false');
      }
    }

  }, [props.disableCaptureScroll]);
  useEffect(() => {
    if (props.stateChangeWaitingBehavior && element.current) {
      element.current?.setAttribute('state-change-waiting-behavior', props.stateChangeWaitingBehavior);
    }
  }, [props.stateChangeWaitingBehavior]);
  return (
    <jb-infinite-scroll ref={element}>{props.children}</jb-infinite-scroll>
  );
});
//TODO: fix types with real one
type Props = {
  stateChangeWaitingBehavior: () => void,
  disableCaptureScroll: boolean,
  isListEmpty: boolean,
  isLoading: boolean,
  children: ReactElement,
  isListEnded:boolean,
  onScrollEnd:(e:any)=>void

}

JBInfiniteScroll.displayName = "JBInfiniteScroll";

export {JBInfiniteScroll};