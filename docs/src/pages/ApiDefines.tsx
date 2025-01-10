import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import { MethodDescription } from '../ClassDescription';
import { CodeFragment2 } from '../Code';
import M from '../M';

function ApiDefines() {

    return (
        <DocsPage route="/apis/defines">
            <h1>{DocsTitle("/apis/defines")}</h1>

            <MethodDescription indexName="DEBUG_NELEMENT_LIFECYCLE" method={`#ifndef DEBUG_NELEMENT_LIFECYCLE
#define DEBUG_NELEMENT_LIFECYCLE 0
#endif
`} tag="define">
                <div><p>
                    When defined to 1, NWindows maintains a count of live NElement objects. Define this variable if you 
                    would like to check for leaked NWindows objects. The count of live objects is available using
                    </p> </div>
                    <CodeFragment2 white text={`static int64_t NElement::allocated_element_count();`} />
                    <p>The value should go to zero when the last reference to the top-level <M>NWindow</M> is released.
                    </p>
            </MethodDescription>

        </DocsPage>
        
    );
}
export default ApiDefines;
