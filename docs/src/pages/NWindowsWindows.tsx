import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import M from '../M';
import ClassDescription, {
    PropertyList, EnumDescription, EnumDefinitionList, MethodDescription, ParameterList, DefinitionList
} from '../ClassDescription';
import Code from '../Code';


function NWindowsWindows() {
    return (
        <DocsPage route="/using/windows">
            <h1>{DocsTitle("/using/windows")}</h1>
            <p>This section describes the types of windows in NWindows, and how they are used. Ordinary use of
                the windows is simple, but there are many advanced features available for those who need them.
                This section describes only basic use of windows in NWindows. Discussion of event handling will
                be covered in a later section; and discussion of the many methods and properties that you
                might be interested in if you were implementing custom controls are also omitted for the
                sake of brevity and clarity.</p>
            <p>
                NWindows provides three following types of windows:</p>
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
            <p><M>NWindow</M>s are <i>modal</i> &mdash; that is, child windows block all user input to their
                parent window until they are closed. However, parent windows will continue to render and update
                their layout, and may do so in response to events posted to the NWindows event dispatcher by
                processes external to NWindows, or in response to
                timer events queued on the NWindows event dispatcher (discussed later in the Events section).</p>
            <p><M>NWindow</M>s inherit from <M>NElement</M>, but only do so in order to participate
                in <M>NElement</M> event routing. It would be a serious (and promptly fatal) error to try to add
                an <M>NWindow</M> as a child of another <M>NElement</M>.</p>
            <ClassDescription name="NWindow" baseClass="NElement">
                <p>
                    <M>NWindow</M> is the type of window you will use most often. It can be either a root-level window
                    or a child window, depending on how it is constructed.
                </p>
                <p><M>NWindow</M>s are created by calling one of the several static <M>create</M> methods, each of
                    which returns an <M>NWindow::ptr</M> (convenient short-hand for a <M>std::shared_ptr&lt;NWindow&gt;</M>).
                    <M>NWindow</M>'s actual constructor is private. <M>NWindow</M>s can only exists in <M>NWindow::ptr</M>s.
                </p>

                <h3>create Methods</h3>
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
                        as you like, and new <M>NWindows</M>s can be children of other child windows as well as the
                        top-level window.</p>
                    <p>Child windows are typically used to create dialogs; but they can be used for other purposes,
                        such as transitional progress dialogs as well.
                    </p>

                </MethodDescription>
                <h3>Methods required to display and run a window.</h3>
                <MethodDescription 
                    indexName="void NWindow::run()"
                    method={`void run();`
                }>
                    <p>The <M>run</M> method displays the window and starts the event loop. The window will
                        remain visible until the <M>close</M> method on the top-level window is called. Once the
                        top level window has been closed, <M>run()</M> will exit the message loop and return.</p>
                    <p><M>run()</M> can only be called (and only needs to be called) on a top-level <M>NWindow</M>.</p>
                </MethodDescription>
                <MethodDescription indexName="void NWindow::close()" method={`void close();`
                }>
                    <p>Closes the window. If the window is a top level window, The <M>run()</M> message loop will
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
                        window will be repositioned on the screen once control returns to the main message loop.</div>
                    <div>NRect</div>
                    <div>actual_window_position</div>
                    <div>(read only) The actual position of the window after <M>AUTO_SIZE</M> values
                        of <M>window_position</M> have been resolved.</div>

                </PropertyList>

            </ClassDescription>
            <ClassDescription name="NPopupWindow" baseClass="NWindow">
                <p><M>NPopupWindow</M> inherits directly from <M>NWindow</M>, so it <i>is</i> an <M>NWindow</M>,
                    and behave like an <M>NWindow</M> in all respects save for how it is positioned on the screen.</p>
                <p>An <M>MPopupWindow</M> positions itself relative to an <i>anchor</i> rectangle. Typically,
                    the anchor rectangle is the bounding box of a control <M>NElement</M>, converted to screen
                    coordinates. It's used by <M>NDropdownElement</M> to create the window in which the dropdown
                    list appears; and it could very easily be used for custom implementations of context menus,
                    and menu systems, which NWindows does not currently provide directly.</p>

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
                ...
            </ClassDescription>
        </DocsPage >
    );
}

export default NWindowsWindows;
