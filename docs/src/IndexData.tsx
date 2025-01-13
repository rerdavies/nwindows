/*
 *   Copyright (c) 2025 Robin E. R. Davies
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


export interface IndexLink {
    route: string;
    id: string;
    classRef: boolean;
};

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

function compactSearchTerms(terms: string[]) {
    let result = [];
    for (let term of terms) {
        if (term.length > 0 && !ignoredWords.has(term)) {
            result.push(term);
        }
    }
    return result;      

}
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


function searchScore(term: string, text: string): number {
    let score = 0;
    let tokens = tokenizeSearchTargetText(text);
    for (let token of tokens) {
        let  t = searchScoreWord(term, token);
        if (t > score) score = t;
    }
    return score;
}   

let tokenMemos = new Map<string, string[]>();


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



export default class  IndexData {
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
        if (terms.length > 15) {
            terms = terms.slice(0, 15);
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

