import React from 'react';




function PageColumn(props: { children: React.ReactNode, footer?: boolean }) {
    const foot = props.footer??false
    return (
        <div style={{
            paddingTop: foot ? 0: 16, paddingLeft: 16, paddingRight: 16, paddingBottom: foot? 0:16,
            display: "flex", flexFlow: "row nowrap", position: "relative"
        }}>
            <div style={{ flex: "1 1 1px" }} />
            <div style={{ flex: "0 0 auto", width: "95%", position: "relative", maxWidth: 800 }}>
                {props.children}
            </div>
            <div style={{ flex: "2 2 1px"}} />
        </div>
    );
}

export default PageColumn;