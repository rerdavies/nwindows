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
import Button from "@mui/material/Button";
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';

import Loading from './Loading'
import { Route, Routes, useNavigate } from 'react-router-dom'
import NotFound from './NotFound';
import { IndexBuilder } from './IndexBuilder';
import SearchPage from './SearchPage';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';


// vite needs these placed right here in this form in order to do proper partitioning 
// for lazy loading. Do not optimize.
const HomePage = React.lazy(() => import("./pages/HomePage"));
const Documentation = React.lazy(() => import("./pages/Documentation"));
const Licenses = React.lazy(() => import("./pages/Licenses"));

const PlatformSupport = React.lazy(() => import("./pages/PlatformSupport"));
const InstallingNWindows = React.lazy(() => import("./pages/InstallingNWindows"));
const PackagingNWindows = React.lazy(() => import("./pages/PackagingNWindows"));
const UsingNWindows = React.lazy(() => import("./pages/UsingNWindows"));
const NWindowsFundamentals = React.lazy(() => import("./pages/NWindowsFundamentals"));
const HelloNWindows = React.lazy(() => import("./pages/HelloNWindows"));
const NWindowsElements = React.lazy(() => import("./pages/NWindowsElements"));
const NWindowsWindows = React.lazy(() => import("./pages/NWindowsWindows"));
const NWindowsEvents = React.lazy(() => import("./pages/NWindowsEvents"));
const KeyboardEvents = React.lazy(() => import("./pages/KeyboardEvents"));
const MouseEvents = React.lazy(() => import("./pages/MouseEvents"));
const OtherEvents = React.lazy(() => import("./pages/OtherEvents"));
const CustomControls = React.lazy(() => import("./pages/CustomControls"));
const CustomUnicode = React.lazy(() => import("./pages/CustomUnicode"));

const InheritingCustomControl = React.lazy(() => import("./pages/InheritingCustomControl"));
const ComposedCustomControl = React.lazy(() => import("./pages/ComposedCustomControl"));
const FullCustomControl = React.lazy(() => import("./pages/FullCustomControl"));
const NWindowsDispatcher = React.lazy(() => import("./pages/NWindowsDispatcher"));
const NWindowsApis = React.lazy(() => import("./pages/NWindowsApis"));
const ApiDefines = React.lazy(() => import("./pages/ApiDefines"));
const ApiTypedefs = React.lazy(() => import("./pages/ApiTypedefs"));
const ApiConstants = React.lazy(() => import("./pages/ApiConstants"));
const ApiEnums = React.lazy(() => import("./pages/ApiEnums"));
const ApiStructs = React.lazy(() => import("./pages/ApiStructs"));
const ApiMethods = React.lazy(() => import("./pages/ApiMethods"));
const ApiClasses = React.lazy(() => import("./pages/ApiClasses"));

const ClassNElement = React.lazy(() => import("./pages/ClassNElement"));
const ClassNColor = React.lazy(() => import("./pages/ClassNColor"));
const ClassNColorPair = React.lazy(() => import("./pages/ClassNColorPair"));
const ClassNTextElement = React.lazy(() => import("./pages/ClassNTextElement"));
const ClassNContainerElement = React.lazy(() => import("./pages/ClassNContainerElement"));
const ClassNBoxElement = React.lazy(() => import("./pages/ClassNBoxElement"));
const ClassNVerticalStackElement = React.lazy(() => import("./pages/ClassNVerticalStackElement"));
const ClassNHorizontalStackElement = React.lazy(() => import("./pages/ClassNHorizontalStackElement"));
const ClassNRadioGroupElement = React.lazy(() => import("./pages/ClassNRadioGroupElement"));
const ClassNMenuElement = React.lazy(() => import("./pages/ClassNMenuElement"));
const ClassNDropdownElement = React.lazy(() => import("./pages/ClassNDropdownElement"));
const ClassNWindow = React.lazy(() => import("./pages/ClassNWindow"));
const ClassNMessageWindow = React.lazy(() => import("./pages/ClassNMessageWindow"));
const ClassNPopupWindow = React.lazy(() => import("./pages/ClassNPopupWindow"));
const ClassNPopupMenuWindow = React.lazy(() => import("./pages/ClassNPopupMenuWindow"));
const ClassNButtonElement = React.lazy(() => import("./pages/ClassNButtonElement"));
const ClassNButtonBaseElement = React.lazy(() => import("./pages/ClassNButtonBaseElement"));
const ClassNCheckboxElement = React.lazy(() => import("./pages/ClassNCheckboxElement"));
const ClassNTextEditElement = React.lazy(() => import("./pages/ClassNTextEditElement"));
const ClassNEvent = React.lazy(() => import("./pages/ClassNEvent"));
const IndexPage = React.lazy(() => import("./pages/IndexPage"));
const ScratchPage = React.lazy(() => import("./pages/ScratchPage"));


interface DocsPage {
    route: string;
    title: string;
    up: string;
};


export interface IndexedComponent {
    route: string;
    component: () => React.LazyExoticComponent<() => JSX.Element>;

};

const indexedComponents: IndexedComponent[] = [
    { route: "/licenses", component: () => Licenses },
    { route: "/support", component: () => PlatformSupport },
    { route: "/installing", component: () => InstallingNWindows },
    { route: "/packaging", component: () => PackagingNWindows },
    { route: "/using", component: () => UsingNWindows },
    { route: "/using/fundamentals", component: () => NWindowsFundamentals },
    { route: "/using/hello", component: () => HelloNWindows },
    { route: "/using/elements", component: () => NWindowsElements },
    { route: "/using/windows", component: () => NWindowsWindows },
    { route: "/using/events", component: () => NWindowsEvents },
    { route: "/using/events/keyboard", component: () => KeyboardEvents },
    { route: "/using/events/mouse", component: () => MouseEvents },
    { route: "/using/events/other", component: () => OtherEvents },
    { route: "/using/custom", component: () => CustomControls },
    { route: "/using/custom/unicode", component: () => CustomUnicode },
    { route: "/using/custom/inherit", component: () => InheritingCustomControl },
    { route: "/using/custom/compose", component: () => ComposedCustomControl },
    { route: "/using/custom/full", component: () => FullCustomControl },
    { route: "/using/dispatcher", component: () => NWindowsDispatcher },
    { route: "/apis", component: () => NWindowsApis },
    { route: "/apis/defines", component: () => ApiDefines },
    { route: "/apis/constants", component: () => ApiConstants },
    { route: "/apis/typedefs", component: () => ApiTypedefs },
    { route: "/apis/enums", component: () => ApiEnums },
    { route: "/apis/structs", component: () => ApiStructs },
    { route: "/apis/methods", component: () => ApiMethods },
    { route: "/apis/classes", component: () => ApiClasses },
    { route: "/apis/classes/NElement", component: () => ClassNElement },
    { route: "/apis/classes/NColor", component: () => ClassNColor },
    { route: "/apis/classes/NColorPair", component: () => ClassNColorPair },
    { route: "/apis/classes/NTextElement", component: () => ClassNTextElement },
    { route: "/apis/classes/NContainerElement", component: () => ClassNContainerElement },
    { route: "/apis/classes/NBoxElement", component: () => ClassNBoxElement },
    { route: "/apis/classes/NVerticalStackElement", component: () => ClassNVerticalStackElement },
    { route: "/apis/classes/NHorizontalStackElement", component: () => ClassNHorizontalStackElement },
    { route: "/apis/classes/NRadioGroupElement", component: () => ClassNRadioGroupElement },
    { route: "/apis/classes/NMenuElement", component: () => ClassNMenuElement },
    { route: "/apis/classes/NDropdownElement", component: () => ClassNDropdownElement },
    { route: "/apis/classes/NWindow", component: () => ClassNWindow },
    { route: "/apis/classes/NMessageWindow", component: () => ClassNMessageWindow },
    { route: "/apis/classes/NPopupWindow", component: () => ClassNPopupWindow },
    { route: "/apis/classes/NPopupMenuWindow", component: () => ClassNPopupMenuWindow },
    { route: "/apis/classes/NButtonElement", component: () => ClassNButtonElement },
    { route: "/apis/classes/NButtonBaseElement", component: () => ClassNButtonBaseElement },
    { route: "/apis/classes/NCheckboxElement", component: () => ClassNCheckboxElement },
    { route: "/apis/classes/NTextEditElement", component: () => ClassNTextEditElement },
    { route: "/apis/classes/NEvent", component: () => ClassNEvent },
];

export function IndexedComponents() {
    return indexedComponents;
}


let docsIndex: DocsPage[] = [
    { route: "/documentation", title: "Documentation", up: "" },
    { route: "/licenses", title: "Licenses", up: "/documentation" },
    { route: "/support", title: "1.0 - Platform Support", up: "/documentation" },
    { route: "/installing", title: "2.0 - Installing and Building NWindows", up: "/documentation" },
    { route: "/packaging", title: "3.0 - Packaging NWindows Applications", up: "/documentation" },
    { route: "/using", title: "4.0 - Using NWindows", up: "/documentation" },
    { route: "/using/fundamentals", title: "4.1 - General Principles", up: "/using" },
    { route: "/using/hello", title: "4.2 - Hello NWindows", up: "/using" },
    { route: "/using/elements", title: "4.3 - NWindows Elements", up: "/using" },
    { route: "/using/windows", title: "4.4 - NWindows Windows", up: "/using" },
    { route: "/using/events", title: "4.5 - NWindows Events", up: "/using" },
    { route: "/using/events/keyboard", title: "4.5.1 - Keyboard Events", up: "/using/events", },
    { route: "/using/events/mouse", title: "4.5.2 - Mouse Events", up: "/using/events", },
    { route: "/using/events/other", title: "4.5.3 - Other Events", up: "/using/events", },
    { route: "/using/custom", title: "4.6 - Implementing Custom Controls", up: "/using", },
    { route: "/using/custom/unicode", title: "4.6.1 - Supporting Unicode", up: "/using/custom", },
    { route: "/using/custom/inherit", title: "4.6.2 - Inheriting from Existing Elements", up: "/using/custom", },
    { route: "/using/custom/compose", title: "4.6.3 - Compound Elements", up: "/using/custom", },
    { route: "/using/custom/full", title: "4.6.4 - Fully-Custom Elements", up: "/using/custom", },
    { route: "/using/dispatcher", title: "4.7 - The NWindows Dispatcher", up: "/using", },
    { route: "/apis", title: "5.0 - NWindows API Reference", up: "/documentation", },
    { route: "/apis/defines", title: "5.1 - Defines", up: "/apis", },
    { route: "/apis/constants", title: "5.2 - Constants", up: "/apis", },
    { route: "/apis/typedefs", title: "5.3 - Type Definitions", up: "/apis", },
    { route: "/apis/enums", title: "5.4 - Enums", up: "/apis", },
    { route: "/apis/structs", title: "5.5 - Structs", up: "/apis", },
    { route: "/apis/methods", title: "5.6 - Methods", up: "/apis", },
    { route: "/apis/classes", title: "5.7 - Classes", up: "/apis", },
    { route: "/apis/classes/NBoxElement", title: "5.7.1 - NBoxElement", up: "/apis/classes" },
    { route: "/apis/classes/NButtonElement", title: "5.7.2 - NButtonElement", up: "/apis/classes" },
    { route: "/apis/classes/NButtonBaseElement", title: "5.7.3 - NButtonBaseElement", up: "/apis/classes" },
    { route: "/apis/classes/NCheckboxElement", title: "5.7.4 - NCheckboxElement", up: "/apis/classes" },
    { route: "/apis/classes/NColor", title: "5.7.5 - NColor", up: "/apis/classes" },
    { route: "/apis/classes/NColorPair", title: "5.7.6 - NColorPair", up: "/apis/classes" },
    { route: "/apis/classes/NContainerElement", title: "5.7.7 - NContainerElement", up: "/apis/classes" },
    { route: "/apis/classes/NDropdownElement", title: "5.7.8 - NDropdownElement", up: "/apis/classes" },
    { route: "/apis/classes/NElement", title: "5.7.9 - NElement", up: "/apis/classes" },
    { route: "/apis/classes/NEvent", title: "5.7.10 - NEvent<T>", up: "/apis/classes" },
    { route: "/apis/classes/NHorizontalStackElement", title: "5.7.11 - NHorizontalStackElement", up: "/apis/classes" },
    { route: "/apis/classes/NMenuElement", title: "5.7.12 - NMenuElement", up: "/apis/classes" },
    { route: "/apis/classes/NMessageWindow", title: "5.7.13 - NMessageWindow", up: "/apis/classes" },
    { route: "/apis/classes/NPopupWindow", title: "5.7.14 - NPopupWindow", up: "/apis/classes" },
    { route: "/apis/classes/NPopupMenuWindow", title: "5.7.15 - NPopupMenuWindow", up: "/apis/classes" },
    { route: "/apis/classes/NRadioGroupElement", title: "5.7.16 - NRadioGroupElement", up: "/apis/classes" },
    { route: "/apis/classes/NTextElement", title: "5.7.17 - NTextElement", up: "/apis/classes" },
    { route: "/apis/classes/NTextEditElement", title: "5.7.18 - NTextEditElement", up: "/apis/classes" },
    { route: "/apis/classes/NVerticalStackElement", title: "5.7.19 - NVerticalStackElement", up: "/apis/classes" },
    { route: "/apis/classes/NWindow", title: "5.7.20 - NWindow", up: "/apis/classes" },

    // XXX Delete me!
    { route: "/index_builder", title: "Index Builder", up: "/documentation", },
    { route: "/index", title: "Index", up: "/documentation", },

];

export function RoutePaths(): string[] {
    let paths: string[] = [];
    for (let i = 0; i < docsIndex.length; i++) {
        paths.push(docsIndex[i].route);
    }
    paths.push("/search");

    return paths;
}

function IndexPageRoutes() {
    return (
        <React.Fragment>
            {
                indexedComponents.map((comp) => {
                    let t = { component: comp.component() };
                    return (<Route key={comp.route} path={comp.route} element={
                        <React.Suspense fallback={<Loading />}>

                            <t.component />
                        </React.Suspense>} />);
                }
                )
            }
        </React.Fragment>
    );
}

export function DocsRoutes() {
    return (
        <Routes>
            <Route index element=

                {
                    <React.Suspense fallback={<Loading />}>
                        <HomePage />
                    </React.Suspense>

                } />
            {
                IndexPageRoutes()
            }
            <Route path="/documentation" element=
                {
                    <React.Suspense fallback={<Loading />}>
                        <Documentation />
                    </React.Suspense>

                } />
            <Route path="index" element=
                {
                    <React.Suspense fallback={<Loading />}>
                        <IndexPage />
                    </React.Suspense>

                } />

            <Route path="search" element={
                <SearchPage />
            } />
            <Route path="index_builder" element={
                <IndexBuilder />
            } />
            <Route path="scratch" element={
                <React.Suspense fallback={<Loading />}>
                    <ScratchPage />
                </React.Suspense>
            } />



            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
interface DocsTree {
    page: DocsPage;
    children: DocsTree[];
}


let treeNodeId = 0;
function RenderTree(tree: DocsTree) {
    // React requires a unique key for each element in the entire tree!
    if (treeNodeId > 1_000_000_000) {
        treeNodeId = 0;
    }
    return (
        <div key={treeNodeId++}>
            {tree.children.map((node) => {
                if (node.children.length != 0) {
                    return (<div key={treeNodeId++}>
                        {DocsLink(node.page.route)}
                        <div style={{ marginLeft: 32 }}>
                            {RenderTree(node)}
                        </div>
                    </div>
                    );
                } else {
                    return (<div key={treeNodeId++}>
                        {DocsLink(node.page.route)}
                    </div>);
                }
            })}
        </div>
    );
}

function buildDocsTree(localHostPage: boolean = false): DocsTree {
    let root: DocsTree = { page: docsIndex[0], children: [] };
    var index: { [id: string]: DocsTree; } = {};
    index[root.page.route] = root;

    for (let i = 1; i < docsIndex.length; i++) {
        let page = docsIndex[i];
        if (page.route == "/index_builder" && !localHostPage) {
            continue;
        }
        let treeItem: DocsTree = { page: page, children: [] };
        index[page.route] = treeItem;
        let parent = index[page.up];
        parent.children.push(treeItem);
    }
    return root;

}
export function NavTree(localHostPage: boolean = false) {
    let root: DocsTree = buildDocsTree(localHostPage);
    return RenderTree(root);
}

function findDocsNode(route: string, tree: DocsTree): DocsTree | undefined {
    if (tree.page.route === route) {
        return tree;
    }
    for (let child of tree.children) {
        if (child.page.route === route) {
            return child;
        }
    }
    for (let child of tree.children) {
        let result = findDocsNode(route, child);
        if (result) {
            return result;
        }
    }
    return undefined;
}

export function ApiNavTree() {
    let root: DocsTree = buildDocsTree();
    let apiTree = findDocsNode("/apis", root);
    if (!apiTree) {
        return (<div> #ERROR: MISSING ROUTE</div>);
    }
    return RenderTree(apiTree);

}
export function ClassesNavTree() {
    let root: DocsTree = buildDocsTree();
    let apiTree = findDocsNode("/apis/classes", root);
    if (!apiTree) {
        return (<div> #ERROR: MISSING ROUTE</div>);
    }
    return RenderTree(apiTree);

}

export function DocsTitle(route: string) {

    for (let i = 0; i < docsIndex.length; i++) {
        if (docsIndex[i].route === route) {
            return docsIndex[i].title;
        }
    }
    return "#ERROR: MISSING ROUTE";

}

export function DocsLink(route: string) {
    let isIndex = route === "/index";
    if (isIndex) {
        return (
            <p style={{ marginTop: 32 }}>
                <Link to={route}

                >{DocsTitle(route)}</Link></p>
        );

    } else {
        return (
            <p><Link to={route}>{DocsTitle(route)}</Link></p>
        );
    }
}

function NavTooltip(props: { title: string, children: React.ReactElement, placement: 'top' | 'top-end' | 'top-start' | undefined }
) {
    return (
        <Tooltip color="black" arrow disableFocusListener disableTouchListener title={(

            <Typography noWrap variant="h6" style={{ fontSize: "16px" }}>{props.title}</Typography>
        )} placement={props.placement} enterDelay={1250} enterNextDelay={750}
            slotProps={{
                tooltip: { style: { background: "#000", color: "#FFF", opacity: 0.9 } },
                arrow: { style: { color: "#000", opacity: 0.9 } },
                popper: { style: { paddingBottom: 4 } }
            }}
        >
            {props.children}
        </Tooltip>
    );
}

function NavButton(props: { route: string, color: string, disabled: boolean, children: React.ReactElement | string }) {
    let navigate = useNavigate();
    const opacity = 0.75;

    let tooltip = DocsTitle(props.route);
    if (props.disabled) {
        return (
            <Button style={{ color: props.color, opacity: 0.2 }}
                disabled={props.disabled}
                onClick={() => navigate(props.route)}
            >{props.children}</Button>
        );
    }
    return (
        <NavTooltip title={tooltip} placement='top'>
            <Button style={{ color: props.color, opacity: opacity }}
                disabled={props.disabled}
                onClick={() => navigate(props.route)}
            >{props.children}</Button>
        </NavTooltip>
    );

}


function DocsNav(props: { currentRoute: string }) {
    const navigate = useNavigate();

    let ix: number = -1;

    for (let i = 0; i < docsIndex.length; i++) {
        if (docsIndex[i].route === props.currentRoute) {
            ix = i;
            break;
        }
    }
    if (ix === -1) {
        return (<div> #ERROR: MISSING ROUTE</div>)
    }
    let prevDisabled: boolean = true;
    let prevNavLink: string = "";
    if (ix != 0) {
        prevDisabled = false;
        prevNavLink = docsIndex[ix - 1].route;
    }
    let nextDisabled: boolean = true;
    let nextNavLink: string = "";
    if (ix + 1 < docsIndex.length) {
        nextDisabled = false;
        nextNavLink = docsIndex[ix + 1].route;
    }
    let upDisabled = true;
    let upNavLink = "";
    if (docsIndex[ix].up !== "") {
        upDisabled = false;
        upNavLink = docsIndex[ix].up;
    }
    let indexDisabled = true;
    if (props.currentRoute !== "/documentation") {
        indexDisabled = false;
    }
    return (
        <div style={{ display: "flex", flexFlow: "row nowrap", alignItems: "center", gap: 16 }}>
            <div style={{ flex: "1 0 1px", display: "flex", justifyContent: "flex-end" }}>
                <NavButton route={prevNavLink} disabled={prevDisabled} color="#FFF">
                    &lt; PREV
                </NavButton>
            </div>
            <div style={{ flex: "0 0 auto" }}>
                <NavButton route={upNavLink} disabled={upDisabled} color="#FFF">
                    UP
                </NavButton>
            </div>

            <div style={{ flex: "1 0 1px" }}>
                <NavButton route={nextNavLink} disabled={nextDisabled} color="#FFF">
                    NEXT &gt;
                </NavButton>
            </div>
            <div style={{ flex: "0 0 auto", opacity: 0.75 }}>
                <Button style={{ color: "#FFF" }} startIcon={<ListIcon />}
                    onClick={() => navigate('/documentation')}
                    disabled={indexDisabled}

                >
                    INDEX
                </Button>
            </div>
        </div>
    );
}


export function WhereToGoFromHere() {
    let tree: DocsTree = buildDocsTree();

    if (treeNodeId > 1_000_000_000) {
        treeNodeId = 0;
    }
    return (
        <div style={{ marginLeft: 0 }}>
            {DocsLink("/documentation")}
            <div style={{ marginLeft: 32 }}>
                {tree.children.map((node) => {

                    return (<div key={treeNodeId++}>
                        {DocsLink(node.page.route)}
                    </div>);
                })}
            </div>
        </div>
    );

}


export default DocsNav;