import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import M, { ML } from '../M';
import ClassDescription, {
    CreateDescriptions, MethodDescriptions,
    PropertyList, EnumDescription, EnumDefinitionList, MethodDescription, ParameterList, DefinitionList
} from '../ClassDescription';
import Code from '../Code';
import { Link } from 'react-router-dom';


function NWindowsWindows() {
    return (
        <DocsPage route="/using/windows">
            <h1>{DocsTitle("/using/windows")}</h1>
            <p>This section describes use of windows when building ordinary NWindows user interfaces.

                Descriptions of classes in this section are abridged. They contain documentation only for those properties and methods
                germane to controlling layout and display of NWindows applications.  Discussion of event handling will
                be covered the <Link to="/using/events">Nwindows Events</Link> section of this document. Complete descriptions of the
                full APIs for NWindows windows can be found in the <Link to="/apis">NWindows API Reference</Link> section of this document.
            </p>
            <p>
                NWindows currently provides three types of windows:</p>
            <DefinitionList>
                <div><M>NWindow</M></div>
                <div>The most common type of window, used for most applications. <M>NWindow</M>s can either
                    be a top-level window (there can be only one), or can be a child window of another <M>NWindow</M>.
                </div>
                <div><M>NPopupWindow</M></div>
                <div>An <M>NWindow</M>, specialized for popup windows. <M>NPopupWindow</M>s are positioned relative to an
                    anchor rectangle (typically the bounding rectangle of the control that has opened the popup window),
                    and may be configured to close whenever a mouse click occurs outside the bounds of the window.</div>
                <div><M>NPopupMenuWindow</M></div>
                <div>A <M>NPopupWindow</M> specialized for rendering popup menus.</div>

            </DefinitionList>
            <p><M>NPopupWindow</M> and <M>NPopupMenuWindow</M> are used internally by NWindows elements, and are not typically used directly, unless you
                are implementing custom controls.</p>
            <p><M>NWindow</M>s are <i>modal</i> &mdash; that is, child windows block all user input to their
                parent window until they are closed. However, parent windows will continue to render and update
                their layout, and may do so in response to events posted to the NWindows event dispatcher by
                processes external to NWindows, or in response to
                timer events queued on the NWindows event dispatcher (discussed later in the Events section).</p>
            <p><M>NWindow</M>s inherit from <M>NElement</M>, but only do so in order to participate
                in <M>NElement</M> event routing. It would be a serious (and promptly fatal) error to try to add
                an <M>NWindow</M> as a child of another <M>NElement</M>.</p>
            <p>NWindows applications will create one top-level window, populate the visual tree of the window, and
                then call <ML fullName name="NWindow::run" /> to display the window and start the event loop. The event loop will
                continue to run until the top-level window is closed, at which point <M>NWindow::run"</M> will return.
                Child windows use the event loop of their parent window, and will typically be deleted shortly
                after <ML fullName name="NWindow::close" /> is called on the child window.
            </p>
            <ClassDescription name="NWindow" baseClass="NElement">
                <p>
                    <M>NWindow</M> is the type of window you will use most often. It can be either a root-level window
                    or a child window, depending on how it is constructed.
                </p>
                <p><M>NWindow</M>s are created by calling one of the several static <M>create</M> methods, each of
                    which returns an <M>NWindow::ptr</M> (convenient short-hand for a <M>std::shared_ptr&lt;NWindow&gt;</M>).
                    <M>NWindow</M>'s actual constructor is private. <M>NWindow</M>s can only exists in <M>NWindow::ptr</M>s.
                </p>

                <CreateDescriptions>
                    <MethodDescription indexName={[
                        `static NWindow::ptr NWindow::create(int width, int height, NColorPalette* colorPalette = nullptr)`,
                        `static NWindow::ptr NWindow::create(int x, int y, int width, int height, NColorPalette* colorPalette = nullptr)`
                    ]}
                        method={
                            `static NWindow::ptr create(
        int width, int height,
        NColorPalette* colorPalette = nullptr);

    static NWindow::ptr create(
        int x, int y,
        int width, int height,
        NColorPalette* colorPalette = nullptr);`
                        }
                    >
                        <ParameterList>
                            <div>x</div>
                            <div>the x position of the window in screen coordinates. If set to <M>AUTO_SIZE</M>, or if not
                                specified, the window will be centered horizontally on the screen.
                            </div>

                            <div>y</div>
                            <div>the y position of the window in screen coordinates. If set to <M>AUTO_SIZE</M>, or if not
                                specified, the window will be centered vertically on the screen.
                            </div>

                            <div>width</div>
                            <div>the width of the window in screen coordinates. If set to <M>AUTO_SIZE</M>, the window's
                                width will be sized to fit its contents.
                            </div>

                            <div>height</div>
                            <div>the height of the window in screen coordinates. If set to <M>AUTO_SIZE</M>, the window's
                                height will be sized to fit its contents.</div>

                            <div>colorPalette</div>
                            <div>An advanced parameter, not normally used. Sets The color palette that controls within the
                                window and a child windows will use.
                                If not specified, the default color palette will be used.</div>
                        </ParameterList>
                        <p>These two <M>create</M> overrides create a top-level <M>NWindow</M>s. You can only create one top-level window.</p>
                    </MethodDescription>
                    <MethodDescription
                        indexName={[
                            "static NWindow::ptr NWindow::create(NWindow::ptr parent_window, int width, int height)",
                            "static NWindow::ptr NWindow::create(NWindow::ptr parent_window, int x, int y,int width, int height)",
                        ]}
                        method={
                            `static NWindow::ptr create(
        NWindow::ptr parent_window,
        int width, int height);

    static NWindow::ptr create(
        NWindow::ptr parent_window,
        int x, int y,
        int width, int height);
    `
                        }
                    >
                        <ParameterList>
                            <div>parentWindow</div>
                            <div>The parent window to which the new window will be attached.</div>
                            <div>x</div>
                            <div>the x position of the window in screen coordinates. If set to <M>AUTO_SIZE</M>, or if not
                                specified, the window will be centered horizontally on the screen.
                            </div>

                            <div>y</div>
                            <div>the y position of the window in screen coordinates. If set to <M>AUTO_SIZE</M>, or if not
                                specified, the window will be centered vertically on the screen.
                            </div>

                            <div>width</div>
                            <div>the width of the window in screen coordinates. If set to <M>AUTO_SIZE</M>, the window's
                                width will be sized to fit its contents.
                            </div>

                            <div>height</div>
                            <div>the height of the window in screen coordinates. If set to <M>AUTO_SIZE</M>, the window's
                                height will be sized to fit its contents.</div>

                        </ParameterList>
                        <p>These two <M>create</M> overrides create a child <M>NWindow</M>s. You can create as many child Windows
                            as you like.</p>
                        <p>Child windows are typically used to create dialogs; but they can be used for other purposes,
                            such as transitional progress dialogs as well.
                        </p>

                    </MethodDescription>
                </CreateDescriptions>
                <h3>Methods required to display and run a window.</h3>
                <MethodDescription
                    indexName="void NWindow::run()"
                    method={`void run();`
                    }>
                    <p>The <M>run</M> method displays the window and starts the event loop. The window will
                        remain visible until the <M>close</M> method on the top-level window is called. Once the
                        top level window has been closed, <M>run()</M> will exit the event loop and return.</p>
                    <p><M>run()</M> can only be called (and only needs to be called) on a top-level <M>NWindow</M>.</p>
                </MethodDescription>
                <MethodDescription indexName="void NWindow::close()" method={`void close();`
                }>
                    <p>Closes the window. If the window is a top level window, The <M>run()</M> event loop will
                        be exited, and <M>run()</M> will return shortly thereafter. If the window is a child window,
                        the window will be removed from the screen, and the reference count on the child window should
                        go to zero, causing the child window to be deleted.
                    </p>
                </MethodDescription>
                <PropertyList>
                    <div>NRect</div>
                    <div>window_position</div>
                    <div>The requested position of the window. If <M>position.x</M> is <M>AUTO_SIZE</M>, the window will
                        be centered horizontally on the display terminal. If <M>position.y</M> is <M>AUTO_SIZE</M>, the window will
                        be centered vertically on the display terminal. If <M>position.width</M> is <M>AUTO_SIZE</M>, the width
                        of the window will be adjusted to fit the window's contents. If <M>position.height</M> is <M>AUTO_SIZE</M>, the height
                        of the window will be adjusted to fit the window's contents. If the property is set, the
                        window will be repositioned on the screen once control returns to the main event loop.</div>
                    <div>NRect</div>
                    <div>actual_window_position</div>
                    <div>(read only) The actual position of the window after <M>AUTO_SIZE</M> values
                        of <M>window_position</M> have been resolved.</div>

                </PropertyList>

            </ClassDescription>
            <ClassDescription name="NPopupWindow" baseClass="NWindow">
                <p><M>NPopupWindow</M> inherits directly from <M>NWindow</M>, so it <i>is</i> an <M>NWindow</M>,
                    and behave like an <M>NWindow</M> in all respects save for how it is positioned on the screen.</p>
                <p>An <M>NPopupWindow</M> positions itself relative to an <i>anchor</i> rectangle. Typically,
                    the anchor rectangle is the bounding box of a control <M>NElement</M>, converted to screen
                    coordinates. It's used by <M>NDropdownElement</M> to create the window in which the dropdown
                    list appears; and it could very easily be used for custom implementations of context menus,
                    and menu systems, which NWindows does not currently provide directly.</p>
                <p>If there is not enough screen space to display the popup menu, the position of the new window will be
                    flipped to opposite sides of the anchor rectangle. If there is not enough space on any side of the anchor,
                    the window will be positioned so that it is fully visible on the screen.
                </p>

                <h3>create Methods</h3>
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
                        <div>`Describes how the window will be positioned relative to the anchor rectangle.
                        </div>
                    </ParameterList>
                    <p>Parameters describe the popup window's preferred placement. The actual position is constrained by
                        the width and height of the terminal device on which the application is being displayed. Popup windows
                        will be positioned as necessary to ensure that they are fully visible on the screen.
                    </p>
                    <p>The anchor rectangle is usually the bounding rectangle of an <M>NElement</M> control that is opening
                        the popup window. The rectangle must be specified in screen coordinates, not window coordinates. The
                        following code fragment converts an element's layout bounds (which are in window coordinates) to screen coordinates:</p>
                    <Code text={`NRect anchor = this->window_to_screen(this->bounds());`} />
                    <p>The <M>attachment</M> argument can take the following values:</p>
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
                    </EnumDescription>
                    <p>NWindows does not currently support bi-directional layout; but if and when it does so in the future, <M>...Start</M> and <M>...End</M> values would
                        have accordingly modified affect under a right-to-left language locale. It seems prudent to prefer
                        the <M>...Start</M> and <M>...End</M> values to <M>...Left</M> and <M>...Right</M> values.
                    </p>
                    <PropertyList>
                        <div>bool</div>
                        <div>cancellable</div>
                        <div>Controls whether the popup window will close itself if a mouse click
                            occurs outside the window's bounds. If set to <M>true</M>, the window will close
                            itself. If set to false, the window will remain open until <M>close</M> is
                            explicitly called.
                        </div>

                        <div>NRect</div>
                        <div>anchor</div>
                        <div>The anchor rectangle, in screen coordinates, relative to which the window
                            will be positioned. Updating this property will cause
                            the <M>NPopupWindow</M> to reposition itself relative to the new anchor rectangle.
                        </div>
                    </PropertyList>

                </MethodDescription>

            </ClassDescription>
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
            </ClassDescription>

        </DocsPage >
    );
}

export default NWindowsWindows;
