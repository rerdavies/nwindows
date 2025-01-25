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
    MethodDescriptions, MethodDescription, TypeDefinitions, UsingDescription,
    EventDescriptions, EventDescription,
    PropertyList,
    ParameterList
} from '../ClassDescription';
import M, { ML } from '../M';
import Code from '../Code';

function ClassNPopupMenuWindow() {

    let className = "NPopupMenuWindow";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name="NPopupMenuWindow" baseClass="NPopupWindow">
                <p>Display a popup menu. <M>NPopupMenuWindow</M> inherits directly from <M>NPopupWindow</M>.</p>
                <div style={{ display: "flex", flexFlow: "row nowrap", columnGap: 16, justifyContent: "start", alignItems: "flex-start" }}>
                    <div style={{ flex: "1 1 0px" }} />
                    <img src="/nwindows/image/sample_menuelement.png" style={{ flex: "0 1 auto" }} alt="Menu" />
                    <img src="/nwindows/image/sample_menu_icons.png" style={{ flex: "0 1 auto" }} alt="Menu Icons" />
                    <div style={{ flex: "1 1 0px" }} />
                </div>

                <p>In normal use, you would use <ML name="NMenuElement" /> or <ML name="NDropdownElement" /> elements, both of which
                    use <M>NPopupMenuWindow</M> to display their menus, rather than using <M>NPopupMenuWindow</M> directly;
                    but <M>NPopupMenuWindow</M> is exposed for use when
                    implementing custom NWindows elements. See the <M>context_edit</M> sample project that uses <M>NPopupMenuWindow</M> to
                    implement a context menu for an <M>NTextEditElement</M>. Sources can be found in the <M>examples/context_edit</M> directory
                    of the NWindows project source code.</p>
                <p>An <M>NPopupMenuWindow</M> positions itself relative to an <i>anchor</i> rectangle. Typically,
                    the anchor rectangle is the bounding box of a control <M>NElement</M>, converted to screen
                    coordinates.
                </p>
                <p>An <M>NPopupMenuWindow</M> displays a menu described by an array of <ML name="NMenuItem" />s. Menu items can have icons, or checkmarks, and
                    can display as regular menu items, dividers or submenus. See <ML name="NMenuItem" /> for more information.</p>

                <TypeDefinitions>
                    <UsingDescription indexName={"NPopupMenuWindow::super"} declaration="using super = NPopupWindow;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NPopupMenuWindow::self"} declaration="using self = NPopupMenuWindow;" >
                    </UsingDescription>
                    <UsingDescription indexName="NPopupMenuWindow::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>

                <MethodDescriptions title="Create Methods">
                    <MethodDescription
                        indexName={`static NPopupMenuWindow::ptr create(NWindow::ptr parentWindow, const std::vector<NMenuItem>& menu_items, const NRect& anchor, NAttachment attachment);`}
                        method={
                            `static NPopupMenuWindow::ptr create(
    NWindow::ptr parentWindow,
    const std::vector<NMenuItem>& menu_items,
    const NRect& anchor,
    NAttachment attachment);`
                        }
                    >
                        <ParameterList>
                            <div>parentWindow</div>
                            <div>The parent window to which the new window will be attached.
                            </div>

                            <div>menu_items</div>
                            <div>The menu items to display in the popup menu. Each <ML name="NMenuItem" /> can describe either
                                a regular menu item, a divider, or a submenu. Menu items can optionally have icons or checkmarks.
                                See <ML name="NMenuItem" /> for more information.
                            </div>

                            <div>anchor</div>
                            <div>An anchor rectangle, in screen coordinates, relative to which the window will be positioned.
                            </div>

                            <div>attachment</div>
                            <div>Describes how the window will be positioned relative to the anchor rectangle. See <ML name="NAttachment" />.
                            </div>
                        </ParameterList>
                        <p></p>
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
                                the <M>NPopupMenuWindow</M> to reposition itself relative to the new anchor rectangle
                                when control returns to the main event loop.
                            </div>
                        </PropertyList>

                    </MethodDescription>
                </MethodDescriptions>
                <EventDescriptions>
                    <EventDescription indexName={`NEvent<void(NPopupMenuWindow::ptr source, int item_id)> NPopupMenuWindow::on_item_selected`}
                        event={`NEvent<
    void(NPopupMenuWindow::ptr source, int item_id)
> on_item_selected;`}
                            >
                        <div>Fired when a menu item is selected.</div>
                    </EventDescription>
                    <EventDescription indexName={`NEvent<void(NPopupMenuWindow::ptr source)> NPopupMenuWindow::on_cancelled`}
                        event={`NEvent<
    void(NPopupMenuWindow::ptr source)
> on_cancelled;`}
                            >
                        <div>Fired when the menu is closed without selecting a menu item.</div>
                    </EventDescription>
                </EventDescriptions>
            </ClassDescription>

        </DocsPage>

    );

}
export default ClassNPopupMenuWindow;
