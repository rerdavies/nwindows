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
    // ",",
    // ".",
    // "",
    // "-",
    // "of",
    // "the",
    // "a",
    // "unsigned",
    // "signed",
    // "short",
    // "long",
    // "mutable",
    // "inline",
    // "typename",
    // "namespace",
    // "using",
    // "int",
    // "=",

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
        let t = searchScoreWord(term, token);
        if (t > score) score = t;
    }
    return score;
}

let tokenMemos = new Map<string, string[]>();


function get_cpp_template_tokens(result: string[], token: string) {
    let pos = token.indexOf('<');
    if (pos < 0) return false;
    // find the matching '>'

    result.push(token); // bonus for match past '<'.

    let end = pos + 1;
    let nesting = 1;
    while (end < token.length && nesting > 0) {
        if (token[end] === '<') {
            nesting++;
        } else if (token[end] === '>') {
            nesting--;
        }
        end++;
    }
    let firstPart = token.substring(0, pos).trim();
    if (!get_cpp_type_tokens(result, firstPart)) {
        result.push(firstPart);
    }
    nesting = 0;
    let argument = "";
    for (let i = pos + 1; i < end; ++i) {
        if (token[i] === '<') {
            nesting++;
        } else if (token[i] === '>') {
            nesting--;
        }
        if (nesting === 0 && token[i] === ',') {
            if (!get_cpp_type_tokens(result, argument)) {
                result.push(argument);
            }
            argument = "";
        } else {
            argument += token[i];
        }
    }
    if (argument.length > 0) {
        if (!get_cpp_type_tokens(result, argument)) {
            result.push(argument);
        }
    }
    return true;
}
function get_cpp_type_tokens(result: string[], token: string): boolean {
    if (get_cpp_template_tokens(result, token)) {
        return true;
    }
    let pos = token.indexOf("::");
    if (pos >= 0) {
        result.push(token);
        let className = token.substring(0, pos);
        let memberName = token.substring(pos + 2);
        if (!get_cpp_type_tokens(result, className)) {
            result.push(className);
        }
        if (!get_cpp_type_tokens(result, memberName)) {
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
        if (ignoredWords.has(token)) {
            continue;
        }
        if (get_cpp_type_tokens(result, token)) {
            continue;
        }
        result.push(token);
    }
    // remove duplicates.
    let unique = new Set<string>(result);
    result = Array.from(unique);


    tokenMemos.set(text, result);
    return result;

}


export class IndexEntry {
    constructor(name: string, indexReferences?: IndexReference[]) {
        this.name = name;
        if (indexReferences) {
            this.indexReferences = indexReferences;
        }
    }
    filterForIndex(searchExpressions: SearchTermRegexps[]): IndexEntry {
        let result = new IndexEntry(this.name);

        let indexScores: number[] = [];
        for (let i = 0; i < searchExpressions.length; ++i) {
            indexScores[i] = searchExpressions[i].score(this.name) * INDEX_NAME_BONUS;
        }

        let bestReferenceScore = 0;
        for (let indexReference of this.indexReferences) {
            let referenceScore = 0;
            for (let i = 0; i < searchExpressions.length; ++i) {
                let t = indexReference.scoreSearchRegexp(searchExpressions[i])
                    +indexScores[i];
                if (t === 0) {
                    referenceScore = 0;
                    break;
                }
                referenceScore += t;
            }
            if (referenceScore > 0) {
                bestReferenceScore = Math.max(bestReferenceScore, referenceScore);
                indexReference.searchScore = referenceScore;
                result.indexReferences.push(indexReference);
            }
        }
        result.searchScore = bestReferenceScore;
        return result;
    }
    name: string = "";
    indexReferences: IndexReference[] = [];
    searchScore: number = 0;
};

// how much various types of `matches count for.
const API_BONUS = 2000;
const INDEX_NAME_BONUS = 1000;
const REFERENCE_TEXT_BONUS = 5;
const REFERENCE_ROUTE_BONUS = 1;
const EXACT_MATCH_BONUS = 4;
const MATCH_AT_START_BONUS = 2;
const CASE_INSENSITIVE_MATCH_BONUS = 1;
const CASE_MATCH_BONUS = 2;

const CLASS_ID_BONUS = 5;
const STRUCT_ID_BONUS = 5;
const ENUM_ID_BONUS = 5;


const regExpCharRegexp = new RegExp("[.:()\\[\\]{}+*?^$|\\\\]","g");

class SearchTermRegexps {
    constructor(term: string) {
        this.term = term;

        // escape any regexp characters in the search term.
        term = term.replace(regExpCharRegexp,"\\$&");

        this.anyMatch = new RegExp(term, "i");
        this.casedMatch = new RegExp(term);
        this.startsWithMatch = new RegExp("\\b" + term);
        this.fullMatch = new RegExp("\\b" + term + "\\b");

    }
    score(target: string): number {
        if (!this.anyMatch || !target.match(this.anyMatch)) {
            return 0;
        }
        if (!this.casedMatch ||  !target.match(this.casedMatch)) {
            return CASE_INSENSITIVE_MATCH_BONUS;
        }
        if (!this.startsWithMatch || !target.match(this.startsWithMatch)) {
            return CASE_MATCH_BONUS;
        }
        if (!this.fullMatch || !target.match(this.fullMatch)) {
            return MATCH_AT_START_BONUS;
        }
        return EXACT_MATCH_BONUS;
    }

    anyMatch?: RegExp;
    casedMatch?: RegExp;
    startsWithMatch?: RegExp;
    fullMatch?: RegExp;

    term: string;
};


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
        let pos = text.indexOf(searchTerm);
        if (text.indexOf(searchTerm) >= 0) {
            if (pos === 0) {
                return MATCH_AT_START_BONUS * CASE_MATCH_BONUS;
            } else if (pos >= 0) {
                return CASE_MATCH_BONUS;
            }
        }
        let lcText = text.toLocaleLowerCase();
        let lcSearchTerm = searchTerm.toLocaleLowerCase();
        pos = lcText.indexOf(lcSearchTerm);

        if (pos === 0) {
            return MATCH_AT_START_BONUS;
        }
        if (pos > 0) {
            return CASE_INSENSITIVE_MATCH_BONUS;
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

    scoreSearchRegexp(searchRegexps: SearchTermRegexps): number {
        let score = searchRegexps.score(this.route_title) * REFERENCE_ROUTE_BONUS +
            searchRegexps.score(this.text) * REFERENCE_TEXT_BONUS;

        if (score > 0) {
            if (this.route.startsWith("/apis")) {
                score += API_BONUS;
            }
            if (this.elementId.startsWith("class__" + searchRegexps.term)) {
                score += CLASS_ID_BONUS;
            }
            if (this.elementId.startsWith("struct__" + searchRegexps.term)) {
                score += STRUCT_ID_BONUS;
            }
            if (this.elementId.startsWith("enum__" + searchRegexps.term)) {
                score += ENUM_ID_BONUS;
            }
        }
        return score;

    }

    searchScoreWord(searchTerm: string): number {
        let score =
            searchScoreWord(searchTerm, this.route_title) * REFERENCE_ROUTE_BONUS +
            searchScoreWord(searchTerm, this.text) * REFERENCE_TEXT_BONUS;
        if (score != 0) {
            if (this.route.startsWith("/apis")) {
                score += API_BONUS;
            }
            if (this.elementId.startsWith("class__" + searchTerm)) {
                score += CLASS_ID_BONUS;
            }
            if (this.elementId.startsWith("struct__" + searchTerm)) {
                score += STRUCT_ID_BONUS;
            }
            if (this.elementId.startsWith("enum__" + searchTerm)) {
                score += ENUM_ID_BONUS;
            }
        }
        return score;
    }
    filter(searchTerms: string[], indexName?: string): IndexReference {
        let result = new IndexReference(this.route, this.route_title, this.text, this.elementId);

        for (let term of searchTerms) {
            let score = Math.max(
                searchScore(term, this.route_title) * REFERENCE_ROUTE_BONUS,
                searchScore(term, this.text) * REFERENCE_TEXT_BONUS
            );
            if (score === 0 && indexName) {
                score = searchScoreWord(term, indexName);
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

export function isEmptySearchString(searchString: string): boolean {
    let terms = searchString.split(" ");
    terms = compactSearchTerms(terms);
    return terms.length === 0;
}



export default class IndexData {
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
    filterForIndex(searchString: string): IndexData {
        let result = new IndexData();
        let searchTerms = searchString.split(" ");
        searchTerms = compactSearchTerms(searchTerms);
        if (searchTerms.length === 0) {
            return this;
        }
        if (searchTerms.length > 15) {
            searchTerms = searchTerms.slice(0, 15);
        }
        let searchExpressions: SearchTermRegexps[] = searchTerms.map<SearchTermRegexps>((term) => { return new SearchTermRegexps(term) });


        for (let entry of this.entries) {
            let filteredEntry = entry.filterForIndex(searchExpressions);
            if (filteredEntry.indexReferences.length > 0) {
                result.entries.push(filteredEntry);
            }
        }
        sortIndexDataForSearch(result);
        return result;
    }

    filterForSearchPage(searchString: string): IndexReference[] {
        let searchTerms = compactSearchTerms(searchString.split(" "));
        if (searchTerms.length === 0) {
            return [];
        }
        if (searchTerms.length > 15) { // avoid catastrophically expensive searches
            searchTerms = searchTerms.slice(0, 15);
        }

        let searchExpressions: SearchTermRegexps[] = searchTerms.map<SearchTermRegexps>((term) => { return new SearchTermRegexps(term) });

        interface ScoredReference {
            score: number,
            indexReference: IndexReference;
        };
        let scoredReferences: ScoredReference[] = [];

        for (let entry of this.entries) {
            for (let indexReference of entry.indexReferences) {
                let score = 0;
                for (let term of searchExpressions) {
                    let t = indexReference.scoreSearchRegexp(term);
                    if (t === 0) {
                        score = 0;
                        break;
                    }
                    score += t;
                }
                if (score !== 0) {
                    scoredReferences.push({ score: score, indexReference: indexReference });
                }
            }
        }
        scoredReferences.sort((a: ScoredReference, b: ScoredReference) => {
            if (a.score === b.score) {
                return 0;
            }
            return a.score < b.score ? 1 : -1;
        });
        let result: IndexReference[] = [];
        for (let scoredReference of scoredReferences) {
            result.push(scoredReference.indexReference);
        }
        return result;
    }

};



