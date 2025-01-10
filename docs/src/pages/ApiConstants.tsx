import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import { ConstantDescription } from '../ClassDescription';

function ApiConstants() {

    return (
        <DocsPage route="/apis/constants">
            <h1>{DocsTitle("/apis/constants")}</h1>

            <ConstantDescription indexName="constexpr int AUTO_SIZE"
                constant={`constexpr int AUTO_SIZE =
    = std::numeric_limits<int>::min()`}>
                <p>Indicates that the effective value of a width, height, x or y property should be chosen automatically.</p>
            </ConstantDescription>

        </DocsPage >
    );
}
export default ApiConstants;
