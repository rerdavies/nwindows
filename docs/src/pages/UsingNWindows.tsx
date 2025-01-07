import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';


function UsingNWindows() {
    return (
        <DocsPage route="/using">
            <h1>{DocsTitle("/using")}</h1>
            <p>This section discusses how to use NWindows. Details of implementation 
                and information on how to implement custom controls have been deliberately omitted in order
                to keep this section as accessible as possible.
            </p>
        </DocsPage>
    );
}

export default UsingNWindows;
