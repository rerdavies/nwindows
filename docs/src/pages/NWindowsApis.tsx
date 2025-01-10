import DocsPage from '../DocsPage';
import { DocsTitle, ApiNavTree } from '../DocsNav';

function NWindowsApis() {

    return (
        <DocsPage route="/apis">
            <h1>{DocsTitle("/apis")}</h1>
            <div className="toc" style={{ marginLeft: 67, marginTop: 34 }}>
                { ApiNavTree()}
            </div>
        </DocsPage>
        
    );
}
export default NWindowsApis;
