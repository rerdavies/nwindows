

export default function SectionHead(props: { text: string, id?: string }) {
    return (
        <div>
            <h2 
                className="section_head" 
                style={{marginBottom:0, marginTop: 36}} 
                id={props.id}
            >{props.text}</h2>
            <hr style={{marginTop: 0, marginBottom: 12}}/>
        </div>
    );
}