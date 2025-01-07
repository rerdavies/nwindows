import { useLocation } from "react-router-dom";
import DocsNav from "./DocsNav";
import PageColumn from "./PageColumn";
import { useLayoutEffect } from "react";


function DocsPage(props: { children: React.ReactNode, route: string}) {  

    let location = useLocation();
    if (location.state)  {
        let navRef = location.state.showElement as string | undefined;
        if (navRef) {
            useLayoutEffect(() => {
                let element = document.getElementById(navRef);
                if (element) {
                    element.scrollIntoView();
                }
            },[]);
        }
    }
    let t = (
        <div className="docs_page" style={{display: "flex", height: "100%",flexFlow: "column nowrap", position: "relative"}}>
           <div style={{flex: "1 1 auto", overflowY: "auto"}} > 
                <PageColumn>
                    {props.children}
                </PageColumn>
            </div>
           <div style={{flex: "0 0 54px", background: "#404040", color: "#FFFFFF'"}} >
                <PageColumn >
                    <DocsNav currentRoute={props.route} />
                </PageColumn>
            </div>

        </div>
    );
    return t;
}

export default DocsPage;