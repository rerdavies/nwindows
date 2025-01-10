import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import { UsingDescription } from '../ClassDescription';

function NWindowsApis() {

    return (
        <DocsPage route="/apis/typedefs">
            <h1>{DocsTitle("/apis/typedefs")}</h1>

            <UsingDescription indexName="PostHandle"
                declaration={`using PostHandle = uint64_t;`}>
                <p>An opaque handle to function posted to the NWindows dispatcher. Used to cancel outstanding posts.</p>
            </UsingDescription>


        </DocsPage>

    );
}
export default NWindowsApis;
