import React from "react";
import PageColumn from "./PageColumn";
import { useLocation } from "react-router-dom";



export default function NotFound() {
    const location = useLocation();
    return (
        <React.Fragment>
            <PageColumn>

                <h1>Page Not Found</h1>
                <p>Sorry, the page you are looking for does not exist.</p>
                <p>Location: { location.pathname }</p>


            </PageColumn>
        </React.Fragment>
    )
}