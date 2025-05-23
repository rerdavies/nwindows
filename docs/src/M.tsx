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

import { KeywordIndexMap } from './SiteIndexData';
import { useNavigate, useLocation} from 'react-router-dom';

/// Display child content with style for code (monospace, light gray background)
function M(props: { children: React.ReactNode }) {
    return (
        <span className="mono">{props.children}</span>
    );
}

export default M;


let whitespaceRegex = /\s+/g;
let sharedPtrRegex = /^std::shared_ptr<\s*([^\s>)]+)\s*>$/;
let optionalRegex = /^std::optional<\s*([^\s>]+)\s*>$/;
let vectorRegex = /^std::vector<\s*([^\s>]+)\s*>$/;
let argumentsRegex = /^([^(]*)\(.*\)\s*$/u;
let elaboratedTypeRegex = /^(?:(?:enum)|(?:class)|(?:typename)|(?:constexpr)|(?:static)(?:struct))\s+(.*)$/u;
export function reduceDeclaration(target: string) : string {
    target = target.replace(whitespaceRegex, " ");

    while (true) {
        let match = target.match(argumentsRegex);
        if (match) {
            target = match[1];
            continue;
        }

        if (target.endsWith("::ptr")) {
            target = target.substring(0, target.length - 5);
            continue;
        }
        if (target.endsWith("*")) {
            target = target.substring(0, target.length - 1);
            continue;
        } 
        if (target.endsWith("&")) {
            target = target.substring(0, target.length - 1);
            continue;
        } 
        match = target.match(sharedPtrRegex);
        if (match) {
            target = match[1];
            continue;
        }
        match = target.match(optionalRegex);
        if (match) {
            target = match[1];
            continue;
        }
        match = target.match(elaboratedTypeRegex);
        if (match) {
            target = match[1];
            continue;
        }   
        match = target.match(vectorRegex);
        if (match)
        {
            target = match[1];
            continue;
        }
        // nothing matched this time. we're done.
        break;
    }
    return target;

}

function findIndexEntry(target: string, route: string) {
    let index = KeywordIndexMap().get(target);
    if (index) {
        return index;
    }
    if (route.startsWith("/apis/classes/") && target.indexOf("::") == -1) {
        let className = route.substring("/apis/classes/".length);
        let memberName = className + "::" + target;
        index = KeywordIndexMap().get(memberName);
        if (index) {
            return index;
        }
    }
    return null;
}

export function A(props: { href: string,target: string, children: React.ReactNode }) {
    return (
        <a  className="nlink" href={props.href} target={props.target??"_blank"} rel="noreferrer">{props.children}</a>
    )
}


// Display a link to a named code entity in the index.
export function ML(props: { target?: string, name: string, fullName?: boolean }) {
    let target = props.target ? props.target : props.name;
    let fullName = props.fullName ?? false;
    target = reduceDeclaration(target);

    let name = props.name;
    if (!fullName) 
    {
        name = reduceDeclaration(name);
        if (name.indexOf("::") != -1) {
            name = name.substring(name.lastIndexOf("::") + 2);
        }   
    }
    

    let navigate = useNavigate();
    let location = useLocation();


    let index = findIndexEntry(target,location.pathname);
    if (index) {
        return (
            <span className="index_link" key={index.id} onClick={() => {
                if (index.route === location.pathname) {
                    let element = document.getElementById(index.id);
                    if (element) {
                        element.scrollIntoView();
                    }   
                } else {
                    navigate(index.route, { state: { showElement: index.id } });
                }
            }}><span className="mono">{name}</span></span>
        );
    } else {
        return (
            <M>{name}</M>
        );
    }
}

export function IL(props: { target?: string, name: string }) {
    let target = props.target ? props.target : props.name;
    target = reduceDeclaration(target);

    const location = useLocation();


    const index = findIndexEntry(target,location.pathname);


    if (index) {
        let navigate = useNavigate();

        return (
            <span className="index_link" key={index.id} onClick={() => {
                if (index.route === location.pathname) {
                    let element = document.getElementById(index.id);
                    if (element) {
                        element.scrollIntoView();
                    }   
                } else {
                    navigate(index.route, { state: { showElement: index.id } });
                }
            }}>{props.name}</span>
        );
    } else {
        return (
            <span>{props.name}</span>
        );
    }
}

