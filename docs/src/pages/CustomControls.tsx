import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';


function CustomControl() {
    return (
        <DocsPage route="/using/custom">
            <h1>{DocsTitle("/using/custom")}</h1>

            <p>If stock elements don't meet your needs, it's not terribly difficult to write custom elements. This section describes
                the basics of creating custom elements, and provides a few examples to get you started.
            </p>
            <p>There are several strategies for implementing custom controls.</p>
            <ul>
                <li>For modest customizations, you can inherit from an existing element, and override methods as required.</li>
                <li>You can write a compound element that is composed of simpler elements.</li>
                <li>You can write a fully custom control.</li>
            </ul>
            <p>Subsequent sections deal with each of these strategies for implementing custom elements.</p>
        </DocsPage>

    );
}

export default CustomControl;
