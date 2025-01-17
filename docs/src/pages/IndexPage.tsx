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

import { Link } from "react-router-dom";
import DocsPage from "../DocsPage";
import SiteIndexData from "../SiteIndexData";
import SearchBox from "../SearchBox";
import { useState } from "react";
import PageColumn from "../PageColumn";



export default function IndexPage() {
    let siteIndexData = SiteIndexData();
    const [searchString, setSearchString] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    let found = true;

    if (searchString !== "") {
        siteIndexData = siteIndexData.filterForIndex(searchString);
        found = siteIndexData.entries.length > 0;

    }
    return (
        <div style={{ display: "flex", flexFlow: "column nowrap", flex: "1 1 auto", height: "100%", overflowX: "hidden" }}>
            <div style={{ marginTop: 36, flex: "0 0 auto" }}>
                <PageColumn >

                    <div style={{ display: "flex", flexFlow: "row nowrap", justifyContent: "space-between", alignItems: "center" }}>
                        { (!searchOpen || window.innerWidth > 500) ?
                            (<h2 className="section-head" style={{ marginBottom: 0, marginTop: 0, flexShrink: 1 }}>Index</h2>)
                            : (<div style={{ flex: "1 1 auto" }}></div>)
                        }
                        <SearchBox open={searchOpen}
                        onSearchChangedWithDelay={(searchString) => {
                                setSearchString(searchString);

                            }}
                            onOpen={(open) => { setSearchOpen(open); }}
                        />
                    </div>
                </PageColumn>
                <hr style={{ marginTop: 0, marginBottom: 12 }} />
            </div>

            <div style={{ flex: "1 1 auto", overflowX: "auto", overflowY: "auto" }}>
                <DocsPage route="/index" >

                    {
                        !found && <h4>Not found.</h4>
                    }
                    {
                        found &&
                        siteIndexData.entries.map((entry, index) => {
                            return (
                                <div key={index} className="indexEntry">
                                    <p className="indexName">{entry.name}</p>
                                    <div className="indexLinks">
                                        {
                                            entry.indexReferences.map((ref, index) => {
                                                let label = ref.route_title;
                                                if (ref.text.length > 0) {
                                                    return (
                                                        <p key={index} className="indexLink" >
                                                            <Link to={ref.route} state={{ showElement: ref.elementId }}>
                                                            <div><p className="indexTitle">{label}</p></div>
                                                            <div><p className="indexSubtitle">{ref.text}</p></div>
                                                            </Link>
                                                        </p>
                                                    )
                                                    label = "<div>" + label + "<br/>" + ref.text + "</div>";

                                                }
                                                return (
                                                    <p key={index} className="indexLink" >
                                                        <Link to={ref.route} state={{ showElement: ref.elementId }}>{label}</Link>
                                                    </p>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </DocsPage>
            </div>
        </div>

    )
}