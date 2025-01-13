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
import ClassDescription, {MethodDescriptions, MethodDescription} from '../ClassDescription';
import M, {ML} from '../M';

function ClassNColorPair() {

    return (
        <DocsPage route="/apis/classes/NColorPair">
            <h1>{DocsTitle("/apis/classes/NColorPair")}</h1>

            <ClassDescription name="NColorPair" >
                <p>A opaque wrapper class for indices of color pairs &mdash; a foreground and background color &mdash; that can
                    be used to control the color of displayed text. <M>NColorPair</M>s can only be created by  
                    calling <ML name='NWindow::make_color_pair' />.
                    The number of distinct <M>NColorPair</M> indices is limited, and the limit varies depending on the
                    terminal on which output is being displayed. Call <ML name="NWindow::max_color_pairs()" /> to determine 
                    how many color pairs are supported by the terminal on which output is being 
                    displayed. <M>NColorPair</M>s are allocated for the lifetime of the
                    top-level window and are not reclaimed; however NColorPairs with the same foreground and
                    background color share the same index.
                </p>

            <MethodDescriptions title="Operators">
                <MethodDescription indexName="bool NColorPair::operator==(const NColorPair &other) const"
                    method={`bool operator==(const NColorPair &other) const;`}>
                    <div>
                        Compares two NColorPairs for equality.
                    </div>
                </MethodDescription>
            </MethodDescriptions>

            </ClassDescription>

        </DocsPage>

    );
}
export default ClassNColorPair;
