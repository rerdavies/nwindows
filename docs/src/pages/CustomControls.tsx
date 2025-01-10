/*
 *   Copyright (c) 2024-2025 Robin E. R. Davies
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:
 
 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.
 
 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

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
