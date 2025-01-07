


function CenteredImage(props: { src: string, alt?: string, width?: string, maxWidth?: string }) {
    return <div style={{ display: 'flex', flexFlow: "row nowrap",}}>
        <div style={{flex:  "1 1 0px"}}></div>
        <div style={{flex: "0 1 auto"}}>
            <img src={props.src} style={{ width: props.width, maxWidth: props.maxWidth ?? '100%' }} alt={props.alt}/>
        </div>
        <div style={{flex: "2 2 0px"}}></div>
    </div>
}

export default CenteredImage;