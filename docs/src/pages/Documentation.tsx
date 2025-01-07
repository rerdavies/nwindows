import Banner from "../Banner";
import { NavTree } from "../DocsNav";
import DocsPage from "../DocsPage";



function Documentation() {
    return (
        <DocsPage route="/documentation">
            <div >
                <Banner subtitle="Documentation" />
                <div className="toc" style={{ marginLeft: 67, marginTop: 34 }}>
                    { NavTree()}
                </div>
            </div>
        </DocsPage>
    );
}

export default Documentation;