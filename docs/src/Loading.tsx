import CircularProgress from "@mui/material/CircularProgress";


function Loading() {
    return (    
        <div style={{ display: "flex", flexFlow: "column nowrap", justifyContent: "center",position: "relative", top: "25%"}}>
            <CircularProgress style={{marginLeft: "auto",marginRight: "auto"}}/>
        </div>
    );
}

export default Loading;