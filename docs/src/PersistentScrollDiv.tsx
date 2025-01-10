import React from 'react';
import { useLocation } from 'react-router-dom';

import { useNavigationType } from './NavigationType';

interface ScrollValue {
    x: number;
    y: number;
}

var scrollMap = new Map<string, ScrollValue>();


function PersistentScrollDiv(props: { children: React.ReactNode, tag?: string, style?: React.CSSProperties }) {
    const divRef = React.useRef<HTMLDivElement>(null);
    let location = useLocation();
    const navigationType = useNavigationType();

    // snapshot the state key when we load.
    const locationStateKey = window.history.state?.key??"0";

    const key = locationStateKey + "_" + (props.tag ? props.tag + "_" : "") + location.pathname;




    React.useEffect(() => {
        if (scrollMap.has(key)) {
            if (navigationType === 'pop') {
                if (divRef.current) {
                    let savedScroll = scrollMap.get(key);
                    if (savedScroll) {
                        divRef.current.scrollTop = savedScroll.x;
                        divRef.current.scrollLeft = savedScroll.y;
                    }
                }
            }
        }
        return () => {
            if (divRef.current) {
                scrollMap.set(key, { x: divRef.current.scrollTop, y: divRef.current.scrollLeft });
            }
        }
    }, []);

    return (
        <div
            style={props.style}
            ref={divRef}
            onScroll={() => {
                if (divRef.current) {
                    // should be implemented as a FIFO cache, but we'll just clear it for now. 
                    // Actual cache flushes would be improbably rare. So just deal with the 
                    // improbably rare condition poorly.
                    if (scrollMap.size > 10000)
                    {
                        scrollMap.clear();
                    }
                    scrollMap.set(key, { x: divRef.current.scrollTop, y: divRef.current.scrollLeft });
                }
            }}
        >
            {props.children}
        </div>
    );
}

export default PersistentScrollDiv;