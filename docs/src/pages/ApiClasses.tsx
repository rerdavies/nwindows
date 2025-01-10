import DocsPage from '../DocsPage';
import { ClassesNavTree, DocsTitle } from '../DocsNav';

function ApiClasses() {

    return (
        <DocsPage route="/apis/classes">
            <h1>{DocsTitle("/apis/classes")}</h1>

            <ClassesNavTree />
        </DocsPage>

    );
}
export default ApiClasses;
