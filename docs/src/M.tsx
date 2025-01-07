import React from 'react';

function M(props: { children: React.ReactNode }) {
    return (
        <span className="mono">{props.children}</span>
    );
}

export default M;