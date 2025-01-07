

export default function SectionHead(props: { text: string }) {
    return (
        <div>
            <h2 className="section-head" style={{marginBottom:0, marginTop: 36}}>{props.text}</h2>
            <hr style={{marginTop: 0, marginBottom: 12}}/>
        </div>
    );
}