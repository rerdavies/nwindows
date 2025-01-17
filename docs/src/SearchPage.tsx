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

import { useState, useEffect } from 'react';
import PageColumn from './PageColumn';
import SearchBox from './SearchBox';
import { useLocation, useNavigate } from 'react-router-dom';
import SiteIndexData from './SiteIndexData';
import IndexData, { IndexReference } from './IndexData';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';


const MAX_SEARCH_RESULTS = 600;

function SearchPage() {
    let location = useLocation();

    const initialSearchString: string = location.state?.initialSearchString ?? "";
    const [searchString, setSearchString] = useState(initialSearchString);
    const navigate = useNavigate();
    const hasValidSearchString = !IndexData.isEmptySearchString(searchString);
    const [siteIndexData, setSiteIndexData] = useState<IndexReference[] | undefined>(undefined);
    const [filterExecutionTime, setFilterExecutionTime] = useState(0);
    filterExecutionTime as any; // unused variable.

    useEffect(
        () => {
            if (hasValidSearchString) {
                let startTime =  performance.now();
                setSiteIndexData(SiteIndexData().filterForSearchPage(searchString));
                let elapsedTime = performance.now() - startTime;
                setFilterExecutionTime(elapsedTime);
            } else {
                setSiteIndexData(undefined);
            }
        }
        , [searchString]
    );
    return (
        <Paper className="app_body">
            <PageColumn>
                <div style={{ height: 32 }} />
                <div style={{
                    flex: "1 0 auto", display: "flex", flexFlow: "row nowrap", gap: 16,
                    alignItems: "center"
                }}>
                    <SearchBox open={true} alwaysOpen initialText={initialSearchString}
                        onOpen={(open) => { 
                            open as any; // unused variable.
                        }}
                        onSearchChangedWithDelay={(text) => {
                            setSearchString(text);
                        }}
                        onApplySearch={(searchText) => {
                            setSearchString(searchText);
                            return false;
                        }
                        }
                    />
                </div>
                {
                    siteIndexData && siteIndexData.length !== 0 && (
                        <div>
                            <div className="no_select">
                                <Typography display="block" variant="caption" style={{ marginLeft: 64, marginTop: 16, marginBottom: 16, opacity: 0.6 }}
                                > 
                                { siteIndexData.length > MAX_SEARCH_RESULTS ?
                                    ("SHOWING " + MAX_SEARCH_RESULTS + " OF " + siteIndexData.length + " RESULTS")
                                    : ("SHOWING " + siteIndexData.length + " RESULTS" )
                                }
                                </Typography>
                            </div>
                            {siteIndexData.map((entry, index) => {
                                return (
                                    <div key={index} style={{ marginBottom: 8 }}>
                                        <div className="search_page_link" tabIndex={0}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                                navigate(entry.route, { state: { showElement: entry.elementId } });
                                                }
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                                navigate(entry.route, { state: { showElement: entry.elementId } });
                                            }}
                                        >
                                            <Typography variant="body1" color="inherit" display="block">
                                                {entry.route_title}
                                            </Typography>
                                            <Typography variant="body1" color="inherit" display="block">
                                                {entry.text}</Typography>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )
                }
                {
                    siteIndexData && siteIndexData.length === 0 && (
                        <div style={{ marginLeft: 64, marginTop: 32 }}>
                            <Typography variant="caption">NO MATCHES FOUND.</Typography>
                        </div>
                    )
                }
                {
                    !hasValidSearchString && (
                        <div />
                    )
                }
            </PageColumn >
        </Paper>
    );
}

export default SearchPage;