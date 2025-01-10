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

import { useEffect, useState } from 'react';

type NavigationType = 'pop' | 'push' | 'replace' | null;

interface NavigationHandlers {
    startTracking: () => void;
    stopTracking: () => void;
}

var g_navigationType: NavigationType = null;

class TrackerState {

    constructor(setNavigationTypeCallback: React.Dispatch<React.SetStateAction<NavigationType>>) {
        this.setNavigationTypeCallback = setNavigationTypeCallback;
    }

    setNavigationTypeCallback: React.Dispatch<React.SetStateAction<NavigationType>>;

    navigationType: NavigationType = null;
    originalPushState: typeof history.pushState | null = null;
    originalReplaceState: typeof history.replaceState | null = null;

    setNavigationType(navigationType: NavigationType) { 
        g_navigationType = navigationType;
        this.navigationType = navigationType;
        this.setNavigationTypeCallback(navigationType);
    } 

    handlePopState = ()=> {
        this.setNavigationType('pop');
    }

    startTracking() {

        // Intercept history.pushState calls
        this.originalPushState = history.pushState;
        const originalPushState_ = history.pushState;

        const setNavigationType_ = this.setNavigationType.bind(this);
        history.pushState = function (...args) {
            originalPushState_.apply(history, args);
            setNavigationType_('push');
        };

        // Intercept history.replaceState calls
        this.originalReplaceState = history.replaceState;
        const replaceState_ = history.replaceState;
        history.replaceState = function (...args) {
                replaceState_.apply(history, args);
                setNavigationType_('replace');
            };

        // Listen for popstate events (back/forward)
        globalThis.window.addEventListener('popstate',this.handlePopState);

    }
    stopTracking() {
        window.removeEventListener('popstate', this.handlePopState);
        if (this.originalPushState)
        {
            history.pushState = this.originalPushState;
            this.originalPushState = null;
        }
        if (this.originalReplaceState)
        {
            history.replaceState = this.originalReplaceState;
            this.originalReplaceState = null;
        }
    }

};


export function useNavigationType(): NavigationType {
    return g_navigationType;

}

export function useNavigationTracker(setNavigationTypeFn: React.Dispatch<React.SetStateAction<NavigationType>>): NavigationHandlers {
    let trackerState = new TrackerState(setNavigationTypeFn); 
    return { 
        startTracking: trackerState.startTracking.bind(trackerState), 
        stopTracking: trackerState.stopTracking.bind(trackerState)
    }
}


type NavigationTypeContext = {
    navigationType: NavigationType;
}

export const NavigationTypeContext = React.createContext<NavigationTypeContext>({ navigationType: null });

export function  NavigationTypeProvider(props: { children: React.ReactNode }) 
{
    let [navigationType, setNavigationType] = useState<NavigationType>(null);

    let {startTracking,stopTracking} = useNavigationTracker(setNavigationType);
    useEffect(() => {
        startTracking();
        return () => {
            stopTracking();
        }
    },[]);

    const value = {
        navigationType,
        setNavigationType
    };
    return (
        <NavigationTypeContext.Provider value={value}>
            {props.children}
        </NavigationTypeContext.Provider>
    );
}