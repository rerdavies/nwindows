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

import { useLocation } from "react-router-dom";
import DocsNav from "./DocsNav";
import PageColumn from "./PageColumn";
import { useLayoutEffect } from "react";
import PersistentScrollDiv from "./PersistentScrollDiv";
import { useNavigationType } from "./NavigationType";
import Paper from "@mui/material/Paper"


function DocsPage(props: { children: React.ReactNode, route: string }) {
    let navigationType = useNavigationType();
    let location = useLocation();
    if (location.state
        && navigationType !== 'pop' // don't do hash links on browser back navigation.
    ) {
        let navRef = location.state.showElement as string | undefined;
        if (navRef) {
            useLayoutEffect(() => {
                let element = document.getElementById(navRef);
                if (element) {
                    element.scrollIntoView();
                } else {
                    console.error("Element not found: " + navRef);
                }
            }, []);
        }
    }
    let t = (
        <div className="docs_page" style={{ display: "flex", flex: "1 1 1px",flexFlow: "column nowrap", position: "relative" }}>
            <PersistentScrollDiv  tag="docs" style={{ flex: "1 1 1px"}} >
                <Paper className="app_body">

                    <PageColumn>
                        {props.children}
                    </PageColumn>
                </Paper>
            </PersistentScrollDiv>
            <div className="docs_footer no_print" >
                <PageColumn >
                    <DocsNav currentRoute={props.route} />
                </PageColumn>
            </div>

        </div>
    );
    return t;
}

export default DocsPage;