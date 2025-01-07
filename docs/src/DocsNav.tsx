import React from 'react';
import Button from "@mui/material/Button";
import ListIcon from '@mui/icons-material/List';
import { Link } from 'react-router-dom';

import Loading from './Loading'
import { Route, Routes, useNavigate } from 'react-router-dom'
import NotFound from './NotFound';
import { IndexBuilder } from './IndexBuilder';
import SearchPage from './SearchPage';



interface DocsPage {
    route: string;
    title: string;
    up: string;
    source?: string;
};

const HomePage = React.lazy(() => import("./pages/HomePage"));
const Documentation = React.lazy(() => import("./pages/Documentation"));
const NWindowsApis = React.lazy(() => import("./Loading")); // import("./pages/NWindowsApis"));
const PlatformSupport = React.lazy(() => import("./pages/PlatformSupport"));
const InstallingNWindows = React.lazy(() => import("./pages/InstallingNWindows"));
const UsingNWindows = React.lazy(() => import("./pages/UsingNWindows"));
const HelloNWindows = React.lazy(() => import("./pages/HelloNWindows"));
const NWindowsElements = React.lazy(() => import("./pages/NWindowsElements"));
const NWindowsWindows = React.lazy(() => import("./pages/NWindowsWindows"));
const NWindowsEvents = React.lazy(() => import("./pages/NWindowsEvents"));
const KeyboardEvents = React.lazy(() => import("./pages/KeyboardEvents"));
const MouseEvents = React.lazy(() => import("./pages/MouseEvents"));
const MiscEvents = React.lazy(() => import("./pages/MiscEvents"));
const CustomControls = React.lazy(() => import("./pages/CustomControls"));
const InheritingCustomControl = React.lazy(() => import("./pages/InheritingCustomControl"));
const ComposedCustomControl = React.lazy(() => import("./pages/ComposedCustomControl"));
const FullCustomControl = React.lazy(() => import("./pages/FullCustomControl"));
const NWindowsDispatcher = React.lazy(() => import("./pages/NWindowsDispatcher"));
const IndexPage = React.lazy(() => import("./pages/IndexPage"));




export interface IndexedComponent {
    route: string;
    component: ()=> React.LazyExoticComponent<() => JSX.Element>;

};

const indexedComponents: IndexedComponent[] = [
    { route: "/apis", component: ()=> NWindowsApis },
    { route: "/support", component: ()=> PlatformSupport },
    { route: "/installing", component: ()=> InstallingNWindows },
    { route: "/using", component: ()=> UsingNWindows },
    { route: "/using/hello", component: ()=> HelloNWindows },
    { route: "/using/elements", component: ()=> NWindowsElements },
    { route: "/using/windows", component: ()=> NWindowsWindows },
    { route: "/using/events", component: ()=> NWindowsEvents },
    { route: "/using/events/keyboard", component: ()=> KeyboardEvents },
    { route: "/using/events/mouse", component: ()=> MouseEvents },
    { route: "/using/events/misc", component: ()=> MiscEvents },
    { route: "/using/custom", component: ()=> CustomControls },
    { route: "/using/custom/inherit", component: ()=> InheritingCustomControl },
    { route: "/using/custom/compose", component: ()=> ComposedCustomControl },
    { route: "/using/custom/full", component: ()=> FullCustomControl },
    { route: "/using/dispatcher", component: ()=> NWindowsDispatcher },
];

export function IndexedComponents() {
    return indexedComponents;
}


let docsIndex: DocsPage[] = [
    { route: "/documentation", title: "Documentation", up: "" },
    { route: "/support", title: "1.0 - Support", up: "/documentation" },
    { route: "/installing", title: "2.0 - Installing NWindows", up: "/documentation" },
    { route: "/using", title: "3.0 - Using NWindows", up: "/documentation" },
    { route: "/using/hello", title: "3.1 - Hello NWindows - General Principles", up: "/using" },
    { route: "/using/elements", title: "3.2 - NWindows Elements", up: "/using" },
    { route: "/using/windows", title: "3.3 - NWindows Windows", up: "/using" },
    { route: "/using/events", title: "3.4 - NWindows Events", up: "/using" },
    { route: "/using/events/keyboard", title: "3.4.1 - Keyboard Events", up: "/using/events", },
    { route: "/using/events/mouse", title: "3.4.2 - Mouse Events", up: "/using/events", },
    { route: "/using/events/misc", title: "3.4.3 - Miscellaneous Events", up: "/using/events", },
    { route: "/using/custom", title: "3.5 - Implementing Custom Controls", up: "/using", },
    { route: "/using/custom/inherit", title: "3.5.1 - Inheriting from Existing Elements", up: "/using/custom", },
    { route: "/using/custom/compose", title: "3.5.2 - Compound Elements", up: "/using/custom", },
    { route: "/using/custom/full", title: "3.5.3 - Fully-Custom Elements", up: "/using/custom", },
    { route: "/using/dispatcher", title: "3.6 - The NWindows Dispatcher", up: "/using", },
    { route: "/index", title: "Index", up: "/documentation", },

];


export function DocsRoutes() {
    return (
        <Routes>
            <Route index element=

                {
                    <React.Suspense fallback={<Loading />}>
                        <HomePage />
                    </React.Suspense>

                } />
            <Route path="documentation" element=
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
            <Route path="apis" element={
                <React.Suspense fallback={<Loading />}>
                        <NWindowsApis />
                </React.Suspense>
            } />
            <Route path="support" element={
                <React.Suspense fallback={<Loading />}>
                    <PlatformSupport />
                </React.Suspense>
            } />
            <Route path="installing" element={
                <React.Suspense fallback={<Loading />}>
                        <InstallingNWindows />
                </React.Suspense>
            } />
            <Route path="using" element={
                <React.Suspense fallback={<Loading />}>
                        <UsingNWindows />
                </React.Suspense>
            } />
            <Route path="using/hello" element={
                <React.Suspense fallback={<Loading />}>
                        <HelloNWindows />
                </React.Suspense>
            } />
            <Route path="using/elements" element={
                <React.Suspense fallback={<Loading />}>
                        <NWindowsElements />
                </React.Suspense>
            } />
            <Route path="using/windows" element={
                <React.Suspense fallback={<Loading />}>
                        <NWindowsWindows />
                </React.Suspense>
            } />
            <Route path="using/events" element={
                <React.Suspense fallback={<Loading />}>
                        <NWindowsEvents />
                </React.Suspense>
            } />
            <Route path="using/events/keyboard" element={
                <React.Suspense fallback={<Loading />}>
                        <KeyboardEvents />
                </React.Suspense>
            } />
            <Route path="using/events/mouse" element={
                <React.Suspense fallback={<Loading />}>
                        <MouseEvents />
                </React.Suspense>
            } />
            <Route path="using/events/misc" element={
                <React.Suspense fallback={<Loading />}>
                        <MiscEvents />
                </React.Suspense>
            } />
            <Route path="using/custom" element={
                <React.Suspense fallback={<Loading />}>
                        <CustomControls />
                </React.Suspense>
            } />
            <Route path="using/custom/inherit" element={
                <React.Suspense fallback={<Loading />}>
                        <InheritingCustomControl />
                </React.Suspense>
            } />
            <Route path="using/custom/compose" element={
                <React.Suspense fallback={<Loading />}>
                        <ComposedCustomControl />
                </React.Suspense>
            } />
            <Route path="using/custom/full" element={
                <React.Suspense fallback={<Loading />}>
                        <FullCustomControl />
                </React.Suspense>
            } />
            <Route path="using/dispatcher" element={
                <React.Suspense fallback={<Loading />}>
                        <NWindowsDispatcher />
                </React.Suspense>
            } />

            <Route path="search" element = {
                <SearchPage />
            } />
            <Route path="index_builder" element= {
                <IndexBuilder />
            } />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
interface DocsTree {
    page: DocsPage;
    children: DocsTree[];
}


function RenderTree(tree: DocsTree) {
    
    return (
        <div>
            {tree.children.map((node) => {
                if (node.children.length != 0) {
                    return (<React.Fragment>
                        {DocsLink(node.page.route)}
                        <div style={{ marginLeft: 32 }}>
                            {RenderTree(node)}
                        </div>
                    </React.Fragment>
                    );
                } else {
                    return DocsLink(node.page.route);
                }
            })}
        </div>
    );
}
export function NavTree() {
    let root: DocsTree = { page: docsIndex[0], children: [] };
    var index: { [id: string]: DocsTree; } = {};
    index[root.page.route] = root;

    for (let i = 1; i < docsIndex.length; i++) {
        let page = docsIndex[i];
        let treeItem: DocsTree = { page: page, children: [] };
        index[page.route] = treeItem;
        let parent = index[page.up];
        parent.children.push(treeItem);
    }
    return RenderTree(root);
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
    if (isIndex) 
    { 
        return (
            <p style={{marginTop: 32}}>
            <Link to={route}
                
            >{DocsTitle(route)}</Link></p>
        );

    } else {
        return (
            <p><Link to={route}>{DocsTitle(route)}</Link></p>
        );
    }
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
    const opacity = 0.75;
    return (
        <div style={{ display: "flex", flexFlow: "row nowrap", alignItems: "center", gap: 16 }}>
            <div style={{ flex: "1 0 1px", display: "flex", justifyContent: "flex-end" }}>

                <Button style={{ color: "#FFF", opacity: prevDisabled ? 0.2 : opacity }}
                    disabled={prevDisabled}
                    onClick={() => navigate(prevNavLink)}
                >&lt; PREV</Button>
            </div>
            <div style={{ flex: "0 0 auto" }}>
                <Button style={{ color: "#FFF", opacity: upDisabled ? 0.2 : opacity }}
                    disabled={upDisabled}
                    onClick={() => navigate(upNavLink)}
                >UP
                </Button>
            </div>

            <div style={{ flex: "1 0 1px", color: "#FFF", opacity: nextDisabled ? 0.2 : opacity }}>
                <Button
                    disabled={nextDisabled}
                    onClick={() => navigate(nextNavLink)}
                    style={{ color: "#FFF" }}>
                    NEXT &gt;
                </Button>
            </div>
            <div style={{ flex: "0 0 auto", opacity: indexDisabled ? 0.2 : opacity }}>
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


export default DocsNav;