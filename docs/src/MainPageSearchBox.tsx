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

import React, { useEffect } from 'react';
import SearchBox from './SearchBox';
import { useLocation, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

import { isEmptySearchString } from './IndexData';
import SiteIndexData from './SiteIndexData';
import { IndexReference } from './IndexData';
import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup';
import Button from '@mui/material/Button';
import useWindowSize from './UseWindowSize';



function GetVisibleResultCount(linkFrame: HTMLElement) {
    let frameRect = linkFrame.getBoundingClientRect();
    let visibleResults = 0;
    for (let i = 0; i < linkFrame.children.length; i++) {
        let child = linkFrame.children[i];
        let rect = child.getBoundingClientRect();
        if (rect.left < frameRect.right) {
            visibleResults++;
        }
    }
    return visibleResults;
}

function updateResultCount() {
    let linkFrame = document.getElementById("search_link_frame");
    let resultCount = document.getElementById("result_count");
    if (linkFrame && resultCount) {
        let visibleResults = GetVisibleResultCount(linkFrame);
        let totalResults = parseInt(resultCount.getAttribute("data-result-count") ?? "0");
        resultCount.innerText = `SHOWING ${visibleResults} OF ${totalResults} RESULTS.`;
    }
}


export default function MainPageSearchBox(
    props: {
        open: boolean,
        onOpen: (open: boolean) => void

    }) {

    const navigate = useNavigate();
    const location = useLocation();
    const windowSize = useWindowSize();
    let [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
    let [searchString, setSearchString] = React.useState("");
    let [searchLinks, setSearchLinks] = React.useState<React.ReactElement | undefined>(undefined);
    if (!props.open && searchLinks !== undefined) {
        setSearchLinks(undefined);
    }
    useEffect(() => {
        let timeoutHandle = setTimeout(() => {
            updateResultCount();
        }, 0);
        return () => {
            clearTimeout(timeoutHandle);
        }
    },
        [searchString, windowSize]);

    const generateSearchLinks = (
        searchString: string,
        onClick: (indexReference: IndexReference) => void,
        onShowSearchPage: (searchString: string) => void
    )
        : React.ReactElement | undefined => {
        if (isEmptySearchString(searchString)) {
            return undefined;
        }
        let searchResult = SiteIndexData().filterForSearchPage(searchString);

        let hasMore = false;
        const resultCount = searchResult.length;
        if (searchResult.length > 10) {
            searchResult = searchResult.slice(0, 10);
            hasMore = true;
        }
        let links = searchResult.map((indexReference, index) => {
            return <div key={index} className="search_box_link">
                <div className="search_box_link_inner"
                    onClick={(e) => {
                        onClick(indexReference);
                        e.stopPropagation

                    }}>


                    <Typography variant="body1" noWrap color="inherit">{indexReference.route_title}</Typography>
                    <Typography variant="body1" noWrap color="inherit">{indexReference.text}</Typography>
                </div>
            </div>;
        });
        return (
            <div className="search_popup_frame" >
                {searchResult.length !== 0 &&
                (
                <div className="search_link_frame" id="search_link_frame">
                    {links}
                </div>
                )}
                {searchResult.length === 0 &&
                    (
                        <Typography variant="caption" noWrap color="inherit" style={{marginLeft: 64,marginRight: 64}}>NO MATCHES FOUND.</Typography>
                    )
                }
                {hasMore &&
                    <div style={{ color: "#EEE", flex: "0 0 auto", display: "flex", flexFlow: "row nowrap", alignItems: "center" }}>
                        <div style={{ flex: "1 1 auto", width: 16 }}>&nbsp;</div>
                        <Typography display="block" style={{ flex: "0 1 auto", opacity: 0.6, width: 250 }}
                            variant="caption"
                            noWrap color="inherit"><span id="result_count" data-result-count={resultCount}></span></Typography>
                        <div style={{ flex: "1 1 auto", width: 16, height: 6 }}></div>
                        <Button onClick={() => {
                            onShowSearchPage(searchString);
                        }}>More...</Button>
                    </div>
                }

            </div>
        );
    }
    const applySearchString = (text: string) => {
        setSearchString(text);
        setSearchLinks(generateSearchLinks(text,
            (indexReference) => {
                props.onOpen(false);
                if (location.pathname === indexReference.route) {
                    let target = document.getElementById(indexReference.elementId);
                    if (target) {
                        target.scrollIntoView();
                    }
                } else {
                    navigate(indexReference.route, { state: { showElement: indexReference.elementId } });
                }
            },
            (searchText) => {
                navigate("/search", { state: { initialSearchString: searchText } });
                props.onOpen(false);
            }
        ));
    }

    return (
        <div style={{ display: "flex" }}
            ref={(element) => {
                setAnchor(element as HTMLElement | null)
            }}>
            <SearchBox open={props.open} style={{ zIndex: 1002 }}
                onSearchChangedWithDelay={(text) => {
                    applySearchString(text);
                }}
                onOpen={(open) => { props.onOpen(open); }}

                onApplySearch={(searchString) => {
                    applySearchString(searchString);
                    return false; // don't close.
                }} />
            <Popup open={props.open} >
                <div style={{
                    width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 1000,
                    backgroundColor: searchLinks !== undefined ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.001)"
                }}
                    onClick={(e) => {
                        props.onOpen(false);
                        e.stopPropagation();
                    }}
                />
            </Popup>

            <Popup open={searchLinks !== undefined} anchor={anchor} placement='bottom-end' >
                <div className="search_box_popup">
                    {searchLinks}
                </div>
            </Popup>
        </div>



    );
}