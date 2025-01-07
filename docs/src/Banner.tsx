import LogoSvg from  "./assets/logo-white.svg";

function Banner(props: { subtitle: string }) {
    return (
        <div  style={{ display: "flex", flexDirection: "row", alignItems: "start", marginBottom: 16 }}>
            <div><img className="banner_logo" src={LogoSvg}  /></div>
            <div className="banner">
                <span className="title">NWindows</span><br />
                <span className="subtitle"> {props.subtitle}</span></div>
        </div>
    );
}

export default Banner;