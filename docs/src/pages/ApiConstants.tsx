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
import { ConstantDescription } from '../ClassDescription';
import { ML } from '../M';

function ApiConstants() {

    return (
        <DocsPage route="/apis/constants">
            <h1>{DocsTitle("/apis/constants")}</h1>

            <ConstantDescription indexName="constexpr int AUTO_SIZE"
                constant={`constexpr int AUTO_SIZE =
    = std::numeric_limits<int>::min()`}>
                <p>Indicates that the effective value of a width, height, x or y property should be chosen automatically.</p>
            </ConstantDescription>
            <ConstantDescription indexName="constexpr int NO_MENU_ITEM"
                constant={`constexpr int NO_MENU_ITEM =  
    = std::numeric_limits<int>::min()`}>
                <p>Indicates that no menu item is selected, or that an <ML name="NMenuItem" /> cannot be selected.</p>
            </ConstantDescription>

        </DocsPage >
    );
}
export default ApiConstants;
