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

import {useState} from 'react';
import PageColumn from './PageColumn';
import SearchBox from './SearchBox';
import { useLocation, useNavigate } from 'react-router-dom';
import SiteIndexData from './SiteIndexData';
import IndexData, { IndexReference } from './IndexData';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


function flattenData(data: IndexData) {
    let result: IndexReference[] = [];

    for (let reference of data.entries) {
        for (let indexReference of reference.indexReferences) {
            result.push(indexReference);
        }
    }
    result.sort((a, b) => {
        if (a.searchScore == b.searchScore) {
            return 0;
        }
        return a.searchScore < b.searchScore ? 1 : -1;
    }
    );
    return result;
}

function SearchPage() {
    let location = useLocation();
    let navigate = useNavigate();

    const initialSearchString: string = location.state?.initialSearchString ?? "";
    let searchString = initialSearchString;

    const [currentSearchString,setCurrentSearchString] = useState(initialSearchString);

    let siteIndexData: IndexReference[] = [];
    const searched = !IndexData.isEmptySearchString(searchString);
    if (searched) {
        siteIndexData = flattenData(SiteIndexData().filter(searchString));
    }
    return (
        <div>
            <PageColumn>
                <div style={{ height: 32 }} />
                <div style={{ flex: "1 0 auto",  display: "flex", flexFlow: "row nowrap", gap: 16,
                    alignItems: "center" }}>
                <SearchBox alwaysOpen initialText={initialSearchString} 
                    onSearchChanged={(text) => {
                        setCurrentSearchString(text);
                    }}  
                    onApplySearch={(searchString) => {
                        navigate("", {  state: { initialSearchString: searchString } });
                        return true;
                    }
                    }
                    />
                    <Button variant="contained"
                        onClick={() => {
                            navigate("", {  state: { initialSearchString: currentSearchString } });
                        }}
                    >Search</Button>
                </div>
                <div style={{ height: 16 }} />
                {
                    searched && siteIndexData.length !== 0 && (
                        <div>
                            <p style={{marginLeft: 24}}> {siteIndexData.length} matches found.</p>
                            <div>
                                {siteIndexData.map((entry, index) => {
                                    return (
                                        <div key={index} style={{marginBottom: 8}}>
                                            <Link to={entry.route} state={{ showElement: entry.elementId }}>
                                            <div>
                                                <p className="indexTitle">{entry.route_title}</p>
                                                <p className="indexSubtitle">{entry.text}</p>
                                            </div>
                                                
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }
                {
                    searched && siteIndexData.length === 0 && (
                        <div>
                            <h4>No matches found.</h4>
                        </div>
                    )
                }
                {
                    !searched && (
                        <div />
                    )
                }
            </PageColumn>
        </div>
    );
}

export default SearchPage;