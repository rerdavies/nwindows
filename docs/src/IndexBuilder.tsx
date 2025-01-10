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

    equal(other: RegisteredIndexEntry): boolean
    {
        return this.name === other.name 
        && this.route === other.route 
        && this.elementId === other.elementId
        && this.text === other.text;;
    }
    key(): string {
        return this.name + "/"+ this.route + "/" + this.elementId + "/" + this.text;
    }   
}

let collectIndexEntries: boolean = false;

let indexDictionary = new Map<string, RegisteredIndexEntry>();

let indexEntries: RegisteredIndexEntry[] = [];


let registerIndexPageRoute = "";
function SetRegisterIndexPageRoute(route: string) {
    registerIndexPageRoute = route;
}

export function RegisterIndexEntry(
    searchName: string,
    elementId: string,
    text?: string) {
    if (collectIndexEntries) {
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

// how much various types of `matches count for.
const INDEX_NAME_BONUS = 1000;
const REFERENCE_TEXT_BONUS = 5;
const REFERENCE_ROUTE_BONUS = 1;
const EXACT_MATCH_BONUS = 4;
const MATCH_AT_START_BONUS = 2;
const MATCH_IN_MIDDLE_BONUS = 1;
const CASE_MATCH_BONUS = 2;

function searchScoreWord(searchTerm: string, text: string): number {
    if (searchTerm.length > text.length) return 0;
    if (searchTerm.length == text.length) {
        if (searchTerm === text) {
            return CASE_MATCH_BONUS * EXACT_MATCH_BONUS;
        }
        if (searchTerm.localeCompare(text) === 0) {
            return EXACT_MATCH_BONUS;
        }
        return 0;
    } else { 
        let  pos = text.indexOf(searchTerm);
        if (text.indexOf(searchTerm) >= 0) 
        {
            if (pos === 0) {
                return MATCH_AT_START_BONUS * CASE_MATCH_BONUS;
            } else if (pos >= 0)
            {
                return CASE_MATCH_BONUS;
            }
        }
        let lcText = text.toLocaleLowerCase ();
        let lcSearchTerm = searchTerm.toLocaleLowerCase();
        pos = lcText.indexOf(lcSearchTerm);

        if (pos === 0) {
            return MATCH_AT_START_BONUS;
        }
        if (pos > 0) 
        {
            return MATCH_IN_MIDDLE_BONUS;
        }
        return 0;
    }
}

let tokenMemos = new Map<string, string[]>();

let ignoredWords = new Set<string>([
    ",",
    ".",
    "",
    "-",
    "of",
    "the",
    "a",
    "unsigned",
    "signed",
    "short",
    "long",
    "mutable",
    "inline",
    "typename",
    "namespace",
    "using",
    "int",
    "=",

]);

function get_cpp_template_tokens(result: string[],token: string) {
    let pos = token.indexOf('<');
    if (pos < 0) return false;
    // find the matching '>'

    result.push(token); // bonus for match past '<'.

    let end = pos+1;
    let nesting = 1;
    while (end < token.length && nesting > 0) {
        if (token[end] === '<') {
            nesting++;
        } else if (token[end] === '>') {
            nesting--;
        }
        end++;
    }
    let firstPart = token.substring(0,pos).trim();
    if (!get_cpp_type_tokens(result,firstPart))
    {
        result.push(firstPart);
    }
    nesting = 0;
    let argument = "";
    for (let i = pos+1; i < end; ++i)
    {
        if (token[i] === '<') {
            nesting++;
        } else if (token[i] === '>') {
            nesting--;
        }
        if (nesting === 0 && token[i] === ',') {
            if (!get_cpp_type_tokens(result,argument))
            {
                result.push(argument);
            }
            argument = "";
        } else {
            argument += token[i];
        }   
    }
    if (argument.length > 0) {
        if (!get_cpp_type_tokens(result,argument))
        {
            result.push(argument);
        }   
    }
    return true;
}
function get_cpp_type_tokens(result: string[], token: string): boolean {
    if (get_cpp_template_tokens(result,token))
    {
        return true;
    }
    let pos = token.indexOf("::");
    if (pos >= 0) {
        result.push(token);
        let className = token.substring(0, pos);
        let memberName = token.substring(pos + 2);
        if (!get_cpp_type_tokens(result,className))
        {
            result.push(className);
        }
        if (!get_cpp_type_tokens(result,memberName))
        {
            result.push(memberName);
        }
        return true;
    }   
    return false;
}


function tokenizeSearchTargetText(text: string): string[] {
    if (tokenMemos.has(text)) {
        return tokenMemos.get(text)!;
    }
    let spaceTokens = text.split(" ")
    let result: string[] = [];

    for (let token of spaceTokens) {
        if(ignoredWords.has(token)) {
            continue;
        }
        if (get_cpp_type_tokens(result,token))
        {
            continue;
        }
        result.push(token);
    }
    // remove duplicates.
    let unique = new Set<string>(result);
    result = Array.from(unique);


    tokenMemos.set(text,result);
    return result;

}


function searchScore(term: string, text: string): number {
    let score = 0;
    let tokens = tokenizeSearchTargetText(text);
    for (let token of tokens) {
        let  t = searchScoreWord(term, token);
        if (t > score) score = t;
    }
    return score;
}   

export class IndexReference {
    constructor(route: string, route_title: string, text: string, elementId: string) {
        this.route = route;
        this.route_title = route_title;
        this.text = text;
        this.elementId = elementId;
    }   
    route: string;
    route_title: string;
    text: string;
    elementId: string;
    searchScore: number = 0;

    searchScoreWord(searchTerm: string): number {
        return Math.max(
            searchScoreWord(searchTerm, this.route_title)*REFERENCE_ROUTE_BONUS,
            searchScoreWord(searchTerm, this.text)*REFERENCE_TEXT_BONUS 
        );
    }
    filter(searchTerms: string[], indexName?: string): IndexReference {
        let result = new IndexReference(this.route, this.route_title, this.text, this.elementId);

        for (let term of searchTerms) {
            let score = Math.max(
                searchScore(term, this.route_title)*REFERENCE_ROUTE_BONUS,
                searchScore(term, this.text)*REFERENCE_TEXT_BONUS
            );
            if (score === 0 && indexName)
            {
                score =  searchScoreWord(term,indexName);
            }
            if (score === 0) {
                result.searchScore = 0;
                break;
            }
            result.searchScore += score;   
        }
        return result;
    }       
}
export class IndexEntry {
    constructor(name: string, indexReferences?: IndexReference[]) {
        this.name = name;
        if (indexReferences) {
            this.indexReferences = indexReferences;
        }   
    }
    filter(searchTerms: string[]): IndexEntry {
        let result = new IndexEntry(this.name);
        for (let term  of searchTerms)
        {
            let indexScore = searchScore(term, this.name) * INDEX_NAME_BONUS;
            if (indexScore === 0)
            {
                for (let indexReference of this.indexReferences) {
                    indexScore = indexReference.searchScoreWord(term);
                    if (indexScore > 0) {
                        break;
                    }
                }
            }
            if (indexScore === 0) {
                result.searchScore = 0;
                break;
            } else {
                result.searchScore += indexScore;
            }
        }
        if (result.searchScore !== 0)
        {
            for (let indexReference of this.indexReferences) {
                let newReference = indexReference.filter(searchTerms, this.name);
                if (newReference.searchScore > 0)
                {
                    result.indexReferences.push(newReference);
                }
            }
        }
        return result;
    }
    name: string;
    indexReferences: IndexReference[] = [];
    searchScore: number = 0;

};

function sortIndexDataForSearch(indexData: IndexData) {
    indexData.entries.sort((a, b) => {
        return b.searchScore - a.searchScore;
    });
    for (let entry of indexData.entries) {
        entry.indexReferences.sort((a, b) => {
            return b.searchScore - a.searchScore;
        });
    }
}
function compactSearchTerms(terms: string[]) {
    let result = [];
    for (let term of terms) {
        if (term.length > 0 && !ignoredWords.has(term)) {
            result.push(term);
        }
    }
    return result;      

}
export class  IndexData {
    constructor(indexEntries?: IndexEntry[]) {
        if (indexEntries) {
            this.entries = indexEntries;
        }   
    }
    entries: IndexEntry[] = [];

    static isEmptySearchString(searchString: string): boolean {
        let terms = searchString.split(" ");
        terms = compactSearchTerms(terms);
        return terms.length === 0;
    }
    filter(searchString: string): IndexData {
        let result = new IndexData();
        let terms = searchString.split(" ");
        terms = compactSearchTerms(terms);
        if (terms.length === 0) {
            return this;
        }
        for (let entry of this.entries) {
            let filteredEntry  = entry.filter(terms);
            if (filteredEntry.indexReferences.length > 0) {
                result.entries.push(filteredEntry);
            }
        }
        sortIndexDataForSearch(result);
        return result;
    }   

};


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
        if (!dataEntry)
        {
            dataEntry = new IndexEntry(indexEntry.name);
            indexMap.set(indexEntry.name, dataEntry);
            result.entries.push(dataEntry);
        }
        addToDataEntry(dataEntry,indexEntry);
    }
    sortIndexData(result);
    return result;
}

function indexDataToSourceCode(indexData: IndexData): string {
    let text = `import { IndexData, IndexEntry,IndexReference } from "./IndexBuilder";

const indexData = new IndexData([
`;
    for (let entry of indexData.entries) {
        text += `    new IndexEntry("${entry.name}", [\n`;
        for (let indexReference of entry.indexReferences) {
            text += 
`        new IndexReference(
            "${indexReference.route}", 
            "${indexReference.route_title}", 
            "${indexReference.text}", 
            "${indexReference.elementId}"),\n`;
        }
        text += `    ]),\n`;
    }
    text += `]);

`;
    text += 
`const SiteIndexData = () => { return indexData; }
export default  SiteIndexData;
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

strings=(`+"\\\n";

        let routePaths = RoutePaths();

        for (let routePath of routePaths) {
            text += "     \"" + routePath + "\"\\\n";
        }

        text += `)

for str in "$`+`{strings[`+`@`+`]`+`}"; do
    echo "Processing $str"
    mkdir -p $1$str
    cp $1/index.html $1$str/index.html
done
`;
        return text;
    }

    render() {
        return (
            <div style={{ margin: 32 }}>
                <h1>Index Builder</h1>
                {this.state.complete ?
                    (
                        <div>
                            <p><M>SiteIndexData.tsx</M></p>
                            <Code text={this.state.indexText} />

                            <p></p>
                            <p><M>copy_route_pages.sh</M></p>
                            <Code text={this.make_copy_route_pages()} />
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
                        </div>)}
            </div>
        );
    }
}
// ...existing code...