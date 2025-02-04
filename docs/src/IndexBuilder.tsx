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

import React, { useLayoutEffect } from "react";
import { DocsTitle, IndexedComponents, RoutePaths } from "./DocsNav";
import Code from "./Code";
import M from "./M";
import IndexData, { IndexEntry, IndexReference, IndexLink } from "./IndexData";
import Paper from "@mui/material/Paper";
import PersistentScrollDiv from "./PersistentScrollDiv";


class RegisteredIndexEntry {
    constructor(name: string, route: string, elementId: string, text: string) {
        this.name = name;
        this.route = route;
        this.elementId = elementId;
        this.text = text;
    }

    name: string = "";
    route: string = "";
    elementId: string = "";
    text: string = "";

    equal(other: RegisteredIndexEntry): boolean {
        return this.name === other.name
            && this.route === other.route
            && this.elementId === other.elementId
            && this.text === other.text;;
    }
    key(): string {
        return this.name + "/" + this.route + "/" + this.elementId + "/" + this.text;
    }
}

let collectIndexEntries: boolean = false;

let indexDictionary = new Map<string, RegisteredIndexEntry>();

let indexEntries: RegisteredIndexEntry[] = [];


let registerIndexPageRoute = "";
function SetRegisterIndexPageRoute(route: string) {
    registerIndexPageRoute = route;
}

const invalidIdCharactersRegex = /[^a-zA-Z0-9_]/;

export function RegisterIndexEntry(
    searchName: string,
    elementId: string,
    text?: string) {
    if (collectIndexEntries) {
        if (elementId.match(invalidIdCharactersRegex)) {
            throw new Error("Invalid element id: " + elementId);
        }
        let indexEntry = new RegisteredIndexEntry(
            searchName,
            registerIndexPageRoute,
            elementId,
            text ? text : ""
        );

        let key = indexEntry.key();
        if (!indexDictionary.has(key)) {
            indexDictionary.set(key, indexEntry);
            indexEntries.push(indexEntry);
        }
    }
}

export function EnableIndexCollection(value: boolean) {
    collectIndexEntries = value;
}

function addToDataEntry(dataEntry: IndexEntry, indexEntry: RegisteredIndexEntry) {
    let indexReference = new IndexReference(
        indexEntry.route,
        DocsTitle(indexEntry.route),
        indexEntry.text,
        indexEntry.elementId);
    dataEntry.indexReferences.push(indexReference);
}

function sortIndexData(indexData: IndexData) {
    indexData.entries.sort((a, b) => {
        return a.name.localeCompare(b.name);
    });
    for (let entry of indexData.entries) {
        entry.indexReferences.sort((a, b) => {
            let t = a.route_title.localeCompare(b.route_title);
            if (t != 0) return t;
            return a.text.localeCompare(b.text);
        });
    }
}


function makeIndexData(indexEntries: RegisteredIndexEntry[]): IndexData {
    let indexMap = new Map<string, IndexEntry>();
    let result = new IndexData();

    for (let indexEntry of indexEntries) {
        let dataEntry = indexMap.get(indexEntry.name);
        if (!dataEntry) {
            dataEntry = new IndexEntry(indexEntry.name);
            indexMap.set(indexEntry.name, dataEntry);
            result.entries.push(dataEntry);
        }
        addToDataEntry(dataEntry, indexEntry);
    }
    sortIndexData(result);
    return result;
}

let keywordIdRegex = /^([^_]+)__(?:_?)([^_]+(?:_.+)?)$/;

function makeKeywordData(indexData: IndexData): Map<string, IndexLink> {
    let result = new Map<string, IndexLink>();
    for (let entry of indexData.entries) {
        for (let indexReference of entry.indexReferences) {
            if (indexReference.route.startsWith("/apis/")) {
                let match = indexReference.elementId.match(keywordIdRegex);
                if (match) {
                    let keyword = match[2].replace("_", "::");
                    result.set(keyword, {
                        route: indexReference.route,
                        id: indexReference.elementId,
                        classRef: match[1] === "class"
                    });
                }
            }
        }
    }
    return result;
}



function indexDataToSourceCode(indexData: IndexData): string {
    let text = `import IndexData, { IndexLink, IndexEntry,IndexReference } from "./IndexData";

const indexData = new IndexData([
`;
    for (let entry of indexData.entries) {
        text += `    new IndexEntry("${entry.name}", [\n`;
        for (let indexReference of entry.indexReferences) {
            text +=
                `        new IndexReference(
            \`${indexReference.route}\`, 
            \`${indexReference.route_title}\`, 
            \`${indexReference.text}\`, 
            \`${indexReference.elementId}\`),\n`;
        }
        text += `    ]),\n`;
    }
    text += `]);

`;
    text +=
        `const SiteIndexData = () => { return indexData; }
export default  SiteIndexData;
`;

    let keywordData = makeKeywordData(indexData);
    text += `
let keywordIndexMap = new Map<string,IndexLink>([
`;

    for (let [keyword, link] of keywordData) {
        text += `    ["${keyword}", {route: "${link.route}", id: "${link.id}", classRef: ${link.classRef}}],\n`;
    }

    text += `]);

export function KeywordIndexMap(): Map<string,IndexLink> {
    return keywordIndexMap; 
}    
`;
    return text;
}


const Loader = (props: {
    onLoad: () => void,
    route: string,
    onComplete: (route: string) => void,
    children?: React.ReactNode
}) => {
    if (props.onLoad) {
        props.onLoad();
    }

    useLayoutEffect(() => {
        if (props.onComplete) {
            props.onComplete(props.route);
        }
    }, []);

    return (<div>
        {props.children}
    </div>);
}
interface IndexBuilderProps {
}
interface IndexBuilderState {
    complete: boolean;
    currentRoute: string;
    currentComponent?: React.LazyExoticComponent<() => JSX.Element>;
    indexText: string;
}

export class IndexBuilder extends React.Component<IndexBuilderProps, IndexBuilderState> {
    constructor(props: IndexBuilderProps) {
        super(props);
        this.state = {
            complete: false,
            currentRoute: "",
            indexText: ""
        };
    }

    nextIndexEntry: number = 0;

    buildIndex() {
        let indexData = makeIndexData(indexEntries);
        return indexDataToSourceCode(indexData);
    }


    process_next_entry() {
        let indexedComponents = IndexedComponents();
        if (this.nextIndexEntry >= indexedComponents.length) {
            let indexText = this.buildIndex();
            this.setState({ complete: true, indexText: indexText });
            return false;
        }
        let indexedComponent = indexedComponents[this.nextIndexEntry++];

        SetRegisterIndexPageRoute(indexedComponent.route);
        this.setState({
            currentRoute: indexedComponent.route,
            currentComponent: indexedComponent.component()
        });

        return true;
    }
    onRouteComplete(route: string) {
        if (route === this.state.currentRoute) {
            this.process_next_entry();
        }
    }

    process_entries() {
        if (this.state.complete) { return; }
        this.nextIndexEntry = 0;
        this.process_next_entry();
    }

    componentDidMount() {
        EnableIndexCollection(true);
        this.process_entries();
    }
    componentWillUnmount(): void {
        EnableIndexCollection(false);
    }
    make_copy_route_pages() {
        let text = `#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

if [ ! -d "$1" ]; then
    echo "The argument is not a valid directory."
    exit 1
fi

strings=(`+ "\\\n";

        let routePaths = RoutePaths();

        for (let routePath of routePaths) {
            if (routePath !== "/index_builder") {
                text += "     \"" + routePath + "\"\\\n";
            }
        }

        text += `)

for str in "$`+ `{strings[` + `@` + `]` + `}"; do
    echo "Processing $str"
    mkdir -p $1$str
    cp $1/index.html $1$str/index.html
done
`;
        return text;
    }
    static  site_map_priority = new Map<string,number>([    
        ["/documentation",0.9],
        ["/installing",0.8],
        ["/using",0.8],
        ["/apis",0.8],
        ["/index",0.0],
        ["/search",0.0],
        ["/index_builder",0.0]

    ]);

    get_site_map_priority(route: string): number {
        if (IndexBuilder.site_map_priority.has(route))
        {
            return IndexBuilder.site_map_priority.get(route)!;
        }
        return 0.5;
    }
    make_site_map() {

        let date = new Date().toISOString();
        date = date.substring(0, date.indexOf("T"));

        let text = `<?xml version="1.0" encoding="UTF-8"?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>http://rerdavies.github.io/nwindows</loc>
        <lastmod>` + date + `</lastmod>
        <priority>1.0</priority>
    </url>
`;


        let routePaths = RoutePaths();

        for (let routePath of routePaths) {
            let priority = this.get_site_map_priority(routePath);
            if (priority !== 0.0) {
                text += `    <url>
        <loc>` + "http://rerdavies.github.io/nwindows" + routePath + `</loc>
        <lastmod>` + date + `</lastmod>
        <priority>` + this.get_site_map_priority(routePath) + `</priority>
    </url>
`;
            }
        }
        text += `</urlset>
`;
        return text;
    }

    render() {
        return (
            <PersistentScrollDiv>
                <Paper className="app_body" style={{ margin: 32, padding: 32 }}>
                    <div style={{ margin: 32 }}>
                        <h1>Index Builder</h1>
                        <p>Builds index data files for the project. Redo this procedure each time documentation files are edited.</p>
                        <p>Copy the results into the named source files verbatim.</p>
                        {this.state.complete ?
                            (
                                <div>
                                    <p><M>docs/src/SiteIndexData.tsx</M></p>
                                    <div style={{ maxHeight: 180, overflowY: "auto", paddingRight: 8 }}>

                                        <Code language="text" text={this.state.indexText} />
                                    </div>

                                    <p></p>
                                    <p><M>docs/make_route_pages.sh</M></p>
                                    <div style={{ maxHeight: 180, overflowY: "auto", paddingRight: 8 }}>
                                        <Code language="text" text={this.make_copy_route_pages()} />
                                    </div>
                                    <p><M>docs/public/sitemap.xml</M></p>
                                    <div style={{ maxHeight: 180, overflowY: "auto", paddingRight: 8 }}>
                                        <Code language="text" text={this.make_site_map()} />
                                    </div>

                                </div>
                            )
                            : (
                                <div>
                                    <p>Building index...</p>
                                    <p style={{ marginLeft: 32 }}> {this.state.currentRoute}</p>

                                    <div style={{
                                        marginLeft: 32, marginRight: 32, border: "2px solid #000000",
                                        overflowX: "auto", overflowY: "auto", height: 300, opacity: 0.5
                                    }}>
                                        {this.state.currentComponent &&
                                            (
                                                <React.Suspense fallback={<div>Loading...</div>} >
                                                    <Loader
                                                        route={this.state.currentRoute}
                                                        onComplete={(route) => {
                                                            this.onRouteComplete(route);
                                                        }}
                                                        onLoad={() => { }}
                                                    >

                                                        {<this.state.currentComponent />}
                                                    </Loader>
                                                </React.Suspense>
                                            )
                                        }
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </Paper>
            </PersistentScrollDiv>
        );
    }
}
// ...existing code...