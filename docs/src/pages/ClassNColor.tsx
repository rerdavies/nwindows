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
    ClassSectionHead, MethodDescription
    
} from '../ClassDescription';
import M from '../M';

function ClassNColor() {

    return (
        <DocsPage route="/apis/classes/NColor">
            <h1>{DocsTitle("/apis/classes/NColor")}</h1>

            <ClassDescription name="NColor" >
                <p>Wrapper class for a color index allocated by <M>NWindow::make_color</M>. <M>NColor::Black</M> and <M>NColor::White</M>  are
                    pre-reserved color indexes. Only really useful for making <M>NColorPairs</M>s.</p>
                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName={"NColor::NColor()"} method="NColor()" >
                    <p>Default constructor. Set to black.</p>
                </MethodDescription>
                <ClassSectionHead text="Constants" />
                <MethodDescription indexName={"static NColor NColor::Black"} method="static NColor Black" >
                </MethodDescription>
                <MethodDescription indexName={"static NColor NColor::White"} method="static NColor White" >
                </MethodDescription>
            </ClassDescription>

        </DocsPage>

    );
}
export default ClassNColor;
