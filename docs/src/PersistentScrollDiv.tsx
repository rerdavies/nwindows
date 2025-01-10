/*
 *   Copyright (c) 2024-2025 Robin E. R. Davies
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

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