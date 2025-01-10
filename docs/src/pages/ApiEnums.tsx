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
import { EnumDescription, EnumDefinitionList } from '../ClassDescription';
import CenteredImage from '../CenteredImage';
import M from '../M';

function NWindowsApis() {

    return (
        <DocsPage route="/apis/enums">
            <h1>{DocsTitle("/apis/enums")}</h1>

            <EnumDescription enumName='NAlignment'>
                <EnumDefinitionList>
                    <div>Start</div>
                    <div>Align child elements to the start of available space.</div>

                    <div>Center</div>
                    <div>Center child elements in the available space.</div>

                    <div>End</div>
                    <div>Align  child elements to the end of available space.</div>

                    <div>Justify</div>
                    <div>(NVerticalStackElement only.) All children are assigned the same width,
                        which is that of the widest child element.
                    </div>
                </EnumDefinitionList>
                <p>Define how child elements are aligned in a container element. The precise effect
                    depends on the class of the  container.</p>

            </EnumDescription>

            <EnumDescription enumName="NAttribute" prefix="enum class">
                <EnumDefinitionList>
                    <div>Normal</div>
                    <div>Normal text.</div>

                    <div>Underline</div>
                    <div>Underlined text.</div>

                    <div>Bold</div>
                    <div>Bold text.</div>

                    <div>Reverse</div>
                    <div>Reverse text</div>

                    <div>Standout</div>
                    <div>Best highlighted mode of the terminal</div>

                    <div>Dim</div>
                    <div>Half-bright text.</div>

                    <div>Invisible</div>
                    <div>Invisible text.</div>

                    <div>Protected</div>
                    <div>Protected text.</div>

                    <div>Blink</div>
                    <div>Blinking. Doesn't work on xterm-like devices.</div>

                    <div>AltChar</div>
                    <div>Don't use. Use <M>NElement::print_acs</M> instead.</div>

                    <div>CharText</div>
                    <div>Don't use.</div>
                </EnumDefinitionList>
                <p>Specifies how text is displayed onscreen.</p>
                <CenteredImage
                    src="/nwindows/image/sample_attributes.png"
                    alt="Sample attributes" />

                <p>The exact effect depends on the capabilities of the terminal on which output is being
                    displayed. Not all attributes are supported on all terminals.
                </p>

            </EnumDescription>

            <EnumDescription
                enumName="NAttachment">
                <EnumDefinitionList>
                    <div>TopStart<br />TopLeft</div>
                    <div>The new window will be positioned so that its bottom left corner is immediately above the top left corner of the anchor rectangle. </div>

                    <div>TopEnd<br />TopRight</div>
                    <div>The new window will be positioned so that its bottom right corner is immediately above the top right corner of the anchor rectangle. </div>

                    <div>BottomStart<br />BottomLeft</div>
                    <div>The new window will be positioned so that its top left corner is immediately below the bottom left corner of the anchor rectangle. </div>

                    <div>BottomEnd<br />BottomRight</div>
                    <div>The new window will be positioned so that its top right corner is immediately below the bottom right corner of the anchor rectangle. </div>

                    <div>CenterOnAnchor</div>
                    <div>The new window will be positioned so that its centered over the anchor rectangle. If <M>anchor</M> is set to <M>NWindow::actual_window_position()</M>,
                        the new window will be centered in the parent window.</div>


                    <div>ContextMenu</div>
                    <div>The new window will be positioned appropriately for a context menu. The anchor rectangle is assumed to be either a cursor position
                        if (the context menu is being opened in response to a right-click event), or the bounding rectangle of the control that is opening the
                        context menu (if the context menu is being opened in response to a keyboard event).
                    </div>
                    <div>Submenu</div>
                    <div>The new window will be positioned appropriately for a sub-menu. The anchor rectangle is assumed to the
                        bounding box of the menu item from which the submenu was opened.
                    </div>
                </EnumDefinitionList>
                <p>Controls how <M>NPopupWindow</M>s are positioned with respect to their anchor rectangle.</p>
            </EnumDescription>
            <EnumDescription enumName='NNavDirection'>
                <EnumDefinitionList>
                    <div>Up</div>
                    <div>Select the closest focusable element above the current focus element.</div>

                    <div>Down</div>
                    <div>Select the closest focusable element below the current focus element.</div>

                    <div>Left</div>
                    <div>Select the closest focusable element to the left of the current focus element,
                        wrapping to the next line above if there is no element to the left..</div>

                    <div>Right</div>
                    <div>Select the closest focusable element to the right of the current focus element.</div>

                    <div>Home</div>
                    <div>Move to the first focusable element.</div>

                    <div>End</div>
                    <div>Move to the last focusable element.</div>

                    <div>Tab</div>
                    <div>Same as Right, but cycles to the first element.</div>

                    <div>ReverseTab</div>
                    <div>Same as Left, but cycles to the last element.</div>
                </EnumDefinitionList>

                <div>Specifies how to select the next focus element when performing focus navigation. Start
                    and End values anticipate future support of bi-directional layout (which NWindows does
                    not currently support).
                </div>
            </EnumDescription>
            <EnumDescription enumName='NOrientation'>
                <EnumDefinitionList>
                    <div>Horizontal</div>
                    <div></div>

                    <div>Vertical</div>
                    <div></div>
                </EnumDefinitionList>
            </EnumDescription>
            
        </DocsPage>



    );
}
export default NWindowsApis;
