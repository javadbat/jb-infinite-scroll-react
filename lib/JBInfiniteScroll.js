import React, { useState, useRef, useCallback, useEffect, useImperativeHandle } from 'react';
import "jb-infinite-scroll";
import { useEvent } from "../../custom-hooks/UseEvent";
const JBInfiniteScroll = React.forwardRef((props, ref) => {
    const element = useRef();
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
        element.current.checkScrollHeight();
    }, [element.current]);

    const onScrollEnd = useCallback((e) => {
        if (props.onScrollEnd) {
            props.onScrollEnd(e);
        }
    }, [props.onScrollEnd]);
    useEvent(element.current, 'scrollEnd', onScrollEnd, true);
    useEffect(() => {
        if (props.isLoading) {
            element.current.setAttribute('is-loading', 'true');
        } else {
            element.current.setAttribute('is-loading', 'false');

        }
    }, [props.isLoading]);
    useEffect(() => {
        if (props.isListEmpty) {
            element.current.setAttribute('is-list-empty', 'true');
        } else {
            element.current.setAttribute('is-list-empty', 'false');

        }
    }, [props.isListEmpty])
    useEffect(() => {
        if (props.isListEnded) {
            element.current.setAttribute('is-list-ended', 'true');
        } else {
            element.current.setAttribute('is-list-ended', 'false');

        }
    }, [props.isListEnded])
    useEffect(() => {
        if (props.disableCaptureScroll) {
            element.current.setAttribute('disable-capture-scroll', 'true');
        } else {
            element.current.setAttribute('disable-capture-scroll', 'false');

        }
    }, [props.disableCaptureScroll]);
    useEffect(() => {
        if (props.stateChangeWaitingBehaviour) {
            element.current.setAttribute('state-change-waiting-behaviour', props.stateChangeWaitingBehaviour);
        }
    }, [props.stateChangeWaitingBehaviour])
    return (
        <jb-infinite-scroll ref={element}>{props.children}</jb-infinite-scroll>
    );
})



JBInfiniteScroll.displayName = "JBInfiniteScroll";

export default JBInfiniteScroll;