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
import ClassDescription, {
    
    
} from '../ClassDescription';
import M from '../M';

function ClassNColorPair() {

    return (
        <DocsPage route="/apis/classes/NColorPair">
            <h1>{DocsTitle("/apis/classes/NColorPair")}</h1>

            <ClassDescription name="NColorPair" >
                <p>A opaque wrapper class for indices of color pairs (foreground and background) colors that can
                    be used to control the color of text onscreen. Constructable only via <M>NWindow::make_color_pair</M>.
                    The number of distinctNColorPair indices is limited, and the limit varies depending on the
                    terminal on which output is being displayed. <M>NColorPair</M>s are allocated for the lifetime of the
                    top-level window and are not recycled (although NColorPairs with the same foreground and
                    background color share the same index).
                </p>

            </ClassDescription>

        </DocsPage>

    );
}
export default ClassNColorPair;
