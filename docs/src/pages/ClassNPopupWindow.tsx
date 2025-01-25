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
    MethodDescription, TypeDefinitions, UsingDescription,
    PropertyList, 
    ParameterList
} from '../ClassDescription';
import M, { ML } from '../M';
import Code from '../Code';

function ClassNPopupWindow() {

    let className = "NPopupWindow";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name="NPopupWindow" baseClass="NWindow">
                <p><M>NPopupWindow</M> inherits directly from <ML name="NWindow" />, so it <i>is</i> an <M>NWindow</M>,
                    and behaves like an <M>NWindow</M> in all respects save for how it is positioned on the screen.
                    See <ML name="NPopupMenuWindow" /> for a specialization of <M>NPopupWindow</M> that renders 
                    popup menus.</p>
                <p>An <M>NPopupWindow</M> positions itself relative to an <i>anchor</i> rectangle. Typically,
                    the anchor rectangle is the bounding box of a control <M>NElement</M>, converted to screen
                    coordinates. 
                </p>

                <TypeDefinitions>
                    <UsingDescription indexName={"NPopupWindow::super"} declaration="using super = NWindow;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NPopupWindow::self"} declaration="using self = NPopupWindow;" >
                    </UsingDescription>
                    <UsingDescription indexName="NPopupWindow::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>

                <MethodDescription
                    indexName={`static NPopupWindow::ptr create(NWindow::ptr parentWindow, const NRect& anchor, NAttachment attachment);`}
                    method={
                        `static NPopupWindow::ptr create(
    NWindow::ptr parentWindow,
    const NRect& anchor,
    NAttachment attachment);`
                    }
                >
                    <ParameterList>
                        <div>parentWindow</div>
                        <div>The parent window to which the new window will be attached.
                        </div>

                        <div>anchor</div>
                        <div>An anchor rectangle, in screen coordinates, relative to which the window will be positioned.
                        </div>

                        <div>attachment</div>
                        <div>Describes how the window will be positioned relative to the anchor rectangle. See <ML name="NAttachment" />.
                        </div>
                    </ParameterList>
                    <p>Parameters describe the popup window's preferred placement. The actual position is constrained by
                        the width and height of the terminal device on which the application is being displayed. Popup windows
                        will be positioned as necessary to ensure that they are fully visible on the screen.
                    </p>
                    <p>The anchor rectangle is usually the bounding rectangle of an <M>NElement</M> control that is opening
                        the popup window. The rectangle must be specified in screen coordinates, not window coordinates. The
                        following code fragment converts an element's layout bounds (which are in window coordinates) to screen coordinates:</p>
                    <Code white text={`NRect anchor = this->window_to_screen(this->bounds());`} />
                    <PropertyList>
                        <div>bool</div>
                        <div>cancellable</div>
                        <div>Controls whether the popup window will close itself if a mouse click
                            occurs outside the window's bound, or if the Escape key is pressed. If set to <M>true</M>, the window will close
                            itself. If set to false, the window will remain open until <M>close</M> is
                            explicitly called.
                        </div>

                        <div>NRect</div>
                        <div>anchor</div>
                        <div>The anchor rectangle, in screen coordinates, relative to which the window
                            will be positioned. Updating this property will cause
                            the <M>NPopupWindow</M> to reposition itself relative to the new anchor rectangle
                            when control returns to the main event loop.
                        </div>
                    </PropertyList>

                </MethodDescription>
            </ClassDescription>

        </DocsPage>

    );
    /*
    class NPopupWindow : public NWindow {
    protected:
        virtual NRect calculate_window_position(int max_width, int max_height) override;
        virtual bool handle_mouse_button_pressed(NMouseButton button, NMouseEventArgs& event_args) override;

    private:
        bool cancellable_ = false;
        void left_pos(NRect& bounds, int max_width);
        void right_pos(NRect& bounds, int max_width);
        void top_pos(NRect& bounds, int max_width);
        void bottom_pos(NRect& bounds, int max_width);

        NRect anchor_;
        NAttachment attachment_;
    };

    */

}
export default ClassNPopupWindow;
