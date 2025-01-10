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
    ClassSectionHead, MethodDescriptions, MethodDescription, UsingDescription, EnumDescription, EnumDefinitionList,
    PropertyList, PropertyEntry, EventDescriptions, EventDescription,
    ApiLink, LinkType, DocsLink, MethodCode,
    DefinitionList

} from '../ClassDescription';
import M from '../M';
import Code, { CodeFragment2 } from '../Code';

function ClassNElement() {

    return (
        <DocsPage route="/apis/classes/NElement">
            <h1>{DocsTitle("/apis/classes/NElement")}</h1>
            <ClassDescription name="NElement" >
                <p><M>NElement</M> is the base class for all NWindows elements and windows. NElement and classes
                    derived from it are not copyable or movable.</p>

                <ClassSectionHead text="Type Definitions" />
                <UsingDescription indexName={"NElement::self"} declaration="using self = NElement;" >
                </UsingDescription>
                <UsingDescription indexName="NElement::ptr" declaration={`using ptr = std::shared_ptr<NElement>;`} >
                </UsingDescription>

                <ClassSectionHead text="Protected Constructors" />
                <MethodDescription indexName={"NElement::NElement(const std::string&tagName)"} method="const std::string&tagName()" >
                    <p>Sets the tag name of the element. Each NWindows class has a unique tag by
                        by which its type can be identified.
                    </p>
                </MethodDescription>
                <PropertyList>

                    <PropertyEntry type="NWindow*" propertyName='NElement::window'>
                        <div>
                            <p>Read only.  A pointer the to the NWindow to which the current NElement is attached.
                            Returns <M>nullptr</M> if the element is not attached to a windows. The value of the
                            property is null, until <M>NElement::handle_attached</M> is called, after which it
                            references the parent window, and becomes invalid again after <M>NElement::handle_detaching</M> is
                            called. If access to the window is needed for longer than the lifetime of the method in
                            which <M>window()</M> is called (in an event handler, for example), the pointer
                            should be converted to a <M>std::weak_ptr</M> by calling</p>
                        <CodeFragment2 text={`window()->weak_ptr_from_this<NWindow>()`} />
                        <p>
                            However, keyboard and mouse events provide access to a live and attached window
                            through the <M>EventArgsBase::window</M> property;
                            and most other events provide an <M>NElement::ptr</M> to the source element, which can be
                            used to access a relevant window via <M>source-&gt;window()</M>. So in practice, it's best to avoid capturing
                            a shared_pointer or a weak_ptr to the containing <M>NWindow</M> altogether.
                        </p>
                    </div>

                </PropertyEntry>

                <PropertyEntry type="NElement*" propertyName='NElement::parent'>
                    The the parent container element which owns the current element, or the owning NWindow as an NElement pointer, if the
                    element is a direct child of an NWindow. Set when the element is added as a child
                    of a container element; and set to <M>nullptr</M> when the element is removed from the container, or the
                    container is destroyed. Elements should be extremely cautious about holding <M>std::shared_ptr</M> references to
                    their parent, and should only do so long enough to ensure liveness of the parent object for brief intervals.
                    Holding a shared pointer to the parent will create circular references that prevent elements from being deleted.
                    If an element <i>must</i> hold a reference to its parent, it should do so using a <M>std::weak_ptr&gt;&lt;</M>.
                </PropertyEntry>


                <PropertyEntry type="int" propertyName='NElement::width'>
                    <div>Controls the width of the element. If set to <M>AUTO_SIZE</M>, the width of the element
                        will adjust to fit the width of its content at layout time. Setting the value will
                        invalidate the element's layout, and trigger a new layout pass when control
                        returns to the main event loop.</div>
                </PropertyEntry>

                <PropertyEntry type="int" propertyName='NElement::height'>
                    <div>Controls the height of the element. If set to <M>AUTO_SIZE</M>, the height of the
                        element will adjust to fit the height of its content at layout time. Setting the value will
                        invalidate the element's layout, and trigger a new layout pass when control
                        returns to the main event loop.</div>
                </PropertyEntry>

                <PropertyEntry type="NSize" propertyName='NElement::size'>
                    <div>A convenience property that gets and sets both width and height properties at the
                        same time.
                    </div>
                </PropertyEntry>

                <PropertyEntry type="NRect" propertyName='NElement::margin'>
                    <div>Controls the amount of blank space display outside the element. The <M>width</M> and <M>height</M> of
                        the element do not include space allocated for margins. Defaults to <M>NRect(0,0,0,0)</M>. Setting
                        the value will invalidate the element's layout and trigger a new layout pass when control
                        returns to the main event loop.</div>
                </PropertyEntry>

                <PropertyEntry type="int" propertyName="NElement::actual_width">
                    Read only.  The actual layout width of the element. Not valid until layout has completed.
                </PropertyEntry>
                <PropertyEntry type="int" propertyName="NElement::actual_height">
                    Read only.  The actual layout height of the element. Not valid until layout has completed.
                </PropertyEntry>
                <PropertyEntry type="NSize" propertyName="NElement::actual_size">
                    Read only.  The actual layout width and height of the element. Not valid until layout has completed.
                </PropertyEntry>

                <PropertyEntry type="NRect" propertyName="NElement:bounds">
                    Read only.  The actual position of the element inside the window in window coordinates. Only valid
                    after layout has completed.
                </PropertyEntry>

                <PropertyEntry type="bool" propertyName='NElement::disabled'>
                    <div>Present on all objects, but Only has effect for input controls elements. Has no effect for elements of other types.
                        Setting disabled to true will gray out the control to which it is applied. Discussion of effects on event handling
                        for the object will be deferred to a later section. Set to <M>false</M> by default. </div>
                </PropertyEntry>
                <PropertyEntry type="bool" propertyName='NElement::focusable'>
                    <div>Whether or not the element can accept keyboard focus.</div>
                </PropertyEntry>
                <PropertyEntry type="bool" propertyName='NElement::mouse_entered'>
                    <div>Read only. Whether the mouse cursor position is within the layout bounds of the element .</div>
                </PropertyEntry>
                <PropertyEntry type="bool" propertyName='NElement::is_focused'>
                    <div>Whether or not the element currently has keyboard focus.</div>
                </PropertyEntry>
                <PropertyEntry type="bool" propertyName='NElement::request_initial_focus'>
                    <div>If true, the element is given keyboard focus when window is first created. The element
                        must not be disabled and and its focusable property must be set to true for this property
                        to have any effect. Defaults to false.
                    </div>
                </PropertyEntry>
                <PropertyEntry type="bool" propertyName='NElement::clickable'>
                    Whether or not the element wants to receive mouse click events.
                </PropertyEntry>
                <PropertyEntry type="NSize" propertyName='NElement::measured'>
                    The desired size of the element as determined during the <i>measure</i> phase of
                    a layout pass. Not of any particular use or interest to anything other than
                    container elements performing layout. The value does not reflect final layout size.
                    See <M>actual_size</M> instead.
                </PropertyEntry>
                <PropertyEntry type="bool" propertyName='NElement::is_default'>
                    <p>
                        Whether or not the element should be treated as the default button in a window. Setting this property to
                        true causes NWindows to click event on the element whenever the user presses the enter key,
                        and no element has handled the keyboard event. Only one element in a window can be the default button.
                    </p>
                    <p>
                        In practice, this turns out to be less than useful in TUI applications
                        because of cognitive dissonance caused by use of the enter and space key for activation
                        of UI elements. It tends to produces UI where dialogs mysteriously disappear when
                        trying to manipulate other controls on the dialog because the OK button got activated.
                    </p>
                    <p>Nevertheless the option remains to use this property if you want to try it in your UI.
                        But I would recommend against it.
                    </p>
                </PropertyEntry>
                <PropertyEntry type="bool" propertyName='NElement::is_cancel'>
                    <p>
                        Whether or not the element should be treated as the default cancel button in a window. If this
                        property is true NWindows simulates a mouse click whenever the Escape key is pressed and no
                        element has handled the keyboard event. Only one element in a window can be the cancel button.
                    </p>
                    <p>
                        This behavior is not as problematic as the default button behavior, since users
                        expect windows to close when they push the escape key. But without a default button,
                        this property seems to produce an oddly dissatisfying user experience.
                    </p>
                    <p>Also not recommended.
                    </p>
                </PropertyEntry>
                <PropertyEntry type="bool" propertyName='NElement::is_container'>
                    <p>
                        Read only.  Whether or not the element is inherits from <M>NContainerElement</M>, and can therefore
                        have child elements. If true, references to the element can be cast to type NContainerElement.
                    </p>
                </PropertyEntry>

            </PropertyList>
            <EventDescriptions>
                <EventDescription
                    indexName={[
                        "NEvent<void (int button,NClickedEventArgs&event_args)> NElement::on_clicked",
                        "NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_pressed",
                        "NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_released",
                        "NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_move",
                        "NEvent<void ()>  NElement::on_mouse_lost_capture",
                        "NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_enter",
                        "NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_leave",
                    ]}
                    method={`NEvent<void (int button,NClickedEventArgs&event_args)> on_clicked;
NEvent<void (int button,NMouseEventArgs&event_args)> on_mouse_button_pressed;
NEvent<void (int button,NMouseEventArgs&event_args)> on_mouse_button_released;
NEvent<void (NMouseEventArgs&event_args)> on_mouse_move;
NEvent<void ()>  on_mouse_lost_capture;
NEvent<void (NMouseEventArgs&event_args)> on_mouse_enter;
NEvent<void (NMouseEventArgs&event_args)> on_mouse_leave;
`} >
                    <p><M>on_mouse_move</M> only fires on elements that have captured the mouse
                        using <M>NWindow::mouse_capture(NElement*)</M>.
                    </p>
                    <p><M>on_mouse_button_pressed</M>, and <M>on_mouse_button_released</M> fire on the topmost element
                        under the mouse cursor whose <M>clickable</M> property has been set to <M>true</M>, and bubbles up the
                        element tree from there.</p>
                    <p><M>on_clicked</M> is fired on elements whose <M>clickable</M> property is set to <M>true</M> after an
                        appropriate on_mouse_button_pressed/on_mouse_button_released sequence. Handling either of the pressed or released
                        events will prevent the click event from firing. NWindows also generates on <M>on_click</M> events
                        when the space or enter key is pressed and a clickable element has keyboard focus.
                    </p>
                    <p><M>on_mouse_enter</M> and <M>on_mouse_leave</M> events fire as the mouse cursor enters or
                        leaves the layout bounds of an element. The events are non-cancellable.</p>

                    <p>Each event provides an  <ApiLink linkType={LinkType.Struct} name="NMouseEventArgs"><M>NMouseEventArgs</M></ApiLink> argument,
                        which provides the current <M>cursor_position</M> along with member variables that define the current state
                        of mouse buttons, and the shift, alt and ctrl keys.</p>
                    <p>The <M>cursor_position</M> is in window coordinates (0,0, is at the top left corner of the
                        containing <M>NWindow</M>). To convert to element-relative coordinates, use</p>
                    <Code text={`NPoint position = screen_to_element(event_args.cursor_position);`} />
                    <p>If the mouse cursor is outside the bounds of the current <M>NWindow</M>, <M>cursor_position</M> will
                        be set to <M>{"{-1,-1}"}</M>
                    </p>
                </EventDescription>
                <EventDescription indexName={[
                    "NEvent<void (NKeyEventArgs&event_args)> NElement::on_key",
                    "NEvent<void (NKeyCodeEventArgs&event_args)> NElement::on_key_code"
                ]}
                    method={
                        `NEvent<void (NKeyEventArgs&event_args)> on_key;
NEvent<void (NKeyCodeEventArgs&event_args)> on_key_code;
`
                    } >
                    <p>Keyboard events are first offered to the current focused element, and then bubble up
                        from the focused element to the root of the visual tree. When bubbling the active
                        window will receive keyboard events if no element handles the keyboard event first.
                        If there is no focused element, the event is fired on the currently-active window only..
                    </p>
                    <p>Elements can take focus forcibly, by calling <M>NElement::take_focus()</M>, but generally, focus navigation
                        is performed by the <M>handle_key</M> method of of <M>NWindow</M>, which only processes keyboard events after
                        the focused object has decided not to handle the keyboard event, and after observers if the <M>NWindow</M>s
                        on_key and on_key_code events have decided not to handle the keyboard events. When a window is first
                        created, focus is set to the first focusable element that has the <M>NElement::request_initial_focus</M> property
                        set to true; otherwise, the first focusable element in the visual tree is given focus.</p>
                    <p>Following Unix/X11 convention, text characters are distributed by <M>handle_key</M>/<M>on_key</M> events, and
                        function keys, cursor keys, and all other non-text keys are distribute separately
                        by <M>handle_key_code</M>/<M>on_key_code</M> events.</p>
                    <p>The <M>handle_key</M> method, and subscribers to <M>on_key</M> events receive a single
                        argument of type <ApiLink linkType={LinkType.Struct} name="NKeyEventArgs"><M>NKeyEventArgs</M></ApiLink> which
                        contains a key of type <M>char32_t</M> &mdash; a 32-bit Unicode character.
                    </p>
                    <p><M>handle_key_code</M> methods and observers of <M>on_key_code</M> receive one argument of
                        type <ApiLink linkType={LinkType.Struct} name="NKeyEventArgs"><M>NKeyCodeEventArgs</M></ApiLink>, which contains
                        a <M>key_code</M> of type <M>int</M>.</p>
                    <p> Key-codes are the the same as <M>ncurses</M> key-codes, which are in turn derived from X11 key-codes.
                        Well-known key-codes can be found the <M>ncurses.h</M> header file. Search for literals starting with "KEY_".
                        Unfortunately, key code definitions suffer from a serious case of historical cruft. There are key codes for keys
                        that appeared on the venerable VT-100 terminal, and key codes for keys that appeared on 3270 terminals. Key codes
                        for modern PC keyboards have been mapped onto that vast set of accumulated keys that have ever been seen on
                        any terminal produced since the VT-100. Most of the <M>non-Ctrl /
                            non-alt</M> key codes for modern keyboards have been mapped onto fairly sensible key codes. Keys with
                        alt and ctrl modifiers tend to be mapped somewhat chaotically onto keys that were
                        found on old terminals. In practice, the best way to find a key code is to write a program
                        and see what you get. Some basic key codes to get you started: </p>
                    <DefinitionList style={{ columnGap: 12, rowGap: 4, marginLeft: 32 }}>
                        <div>KEY_UP</div><div>Cursor up key</div>
                        <div>KEY_DOWN</div><div>Cursor down key</div>
                        <div>KEY_LEFT</div><div>Cursor left key</div>
                        <div>KEY_RIGHT</div><div>Cursor right key</div>
                        <div>KEY_HOME</div><div>Home key</div>
                        <div>KEY_END</div><div>End key</div>
                        <div>KEY_BACKSPACE</div><div>Backspace key</div>
                        <div>KEY_DC</div><div>Delete key</div>
                        <div>KEY_F(n)</div><div>Function key n</div>
                        <div>KEY_NPAGE</div><div>Page down key</div>
                        <div>KEY_PPAGE</div><div>Page up key</div>
                        <div>KEY_IC</div><div>Insert key</div>
                        <div>KEY_ENTER</div><div>Enter key</div>
                        <div>KEY_TAB</div><div>Tab key</div>
                        <div>KEY_BTAB</div><div>Back tab key (shift tab)</div>
                        <div>KEY_SUP</div><div>Shift + Cursor up key</div>
                        <div>KEY_SDOWN</div><div>Shift + Cursor down key</div>
                        <div>KEY_SLEFT</div><div>Shift + Cursor left key</div>
                        <div>KEY_SRIGHT</div><div>Shift + Cursor right key</div>
                    </DefinitionList>

                </EventDescription>

            </EventDescriptions>
            <MethodDescriptions>

                <MethodDescription indexName={[
                    "virtual NSize NElement::measure(const NSize& available)",
                    "virtual void NElement::arrange(const NRect& bounds)"
                ]} method={`virtual NSize measure(const NSize& available);
virtual void arrange(const NRect& bounds);`}>
                    <p>The  <DocsLink route="/using/custom/full" directId="section__Layout">Layout</DocsLink> section
                        of the <i>Fully-Custom Elements</i> page provides a
                        full discussion of layout, along with example code, and details on handling of margins in implementations of <M>measure</M> and <M>arrange</M>.</p>
                    <p>These methods are called during the layout pass of the element tree.</p><p>The <M>measure</M> method is called
                        on each element in the tree, starting at the root, and working down to the leaves. <M>NContainerElement</M>s
                        are responsible for measuring their own children and must call <M>measure</M> on each of their children whether
                        they need the measure of  their children or not. The <M>measure</M> method
                        is called with the available space for the element, and returns the desired size of the element.</p>
                    <p>The <M>arrange</M>
                        method is called on each element in the tree, starting at the leaves and working up to the root. <M>NContainerElement</M>s
                        are responsible for calling <M>arrange</M> on each of their children.
                        method is called with the bounds of the element. Container elements are expected to lay out their children within those bounds as
                        it sees fit. Implementations of <M>arrange</M> must call the <M>arrange</M> method of their superclass, since <M>NElement::arrange</M> sets
                        the actual layout bounds of the element that will be used during rendering.
                    </p>
                </MethodDescription>
                <MethodDescription indexName="void NElement::render()" method="virtual void render()" >
                    <p>Called to render the element. The element should render its own content only,
                        and not the content of its children. The elent should render itself with the
                        confines of its layout bounds.  The space in which an element should render its contents
                        (in element coordinates) is  determined by the rectangle which encloses (0,0), actual_width()
                        and actual_height(). The element must not render outside of this rectangle.
                    </p>
                </MethodDescription>


                <MethodDescription indexName="std::shared_ptr<T> NElement::shared_from_this()"
                    method={`template<typename T = NElement>
std::shared_ptr<T> NElement::shared_ptr_from_this()`}>
                    Create a std::shared_ptr of type T from a non-shared-pointer reference to an NElement.
                </MethodDescription>
                <MethodDescription indexName="std::weak_ptr<T> NElement::weak_ptr_from_this()"
                    method={`template<typename T = NElement>
std::weak_ptr<T> weak_ptr_from_this()`}>
                    Create a std::weak_ptr of type T from a non-shared-pointer reference to an NElement.
                </MethodDescription>
                <MethodDescription indexName="std::shared_ptr<T> NElement::get_element_by_id<T>(const std::string& id)"
                    method={`template<typename T = NElement>
std::shared_ptr<T> get_element_by_id(const std::string& id)`}>
                    <p>Find a child element whose <M>id()</M> matches the requested id. Returns an empty pointer
                        if not found.  Because <M>NWindow</M>s inherit from <M>NElement</M>, you can search the
                        entire visual tree by calling </p>
                    <CodeFragment2 text={
                        `auto element = window()-
    >get_element_by_id<NElement>("id");`}
                    />
                </MethodDescription>
                <MethodDescription indexName={["NElement::ptr NElement::get_element_at(int x, int y)",
                    "NElement::ptr NElement::get_element_at(const NPoint&pt)"]}
                    method={`NElement::ptr get_element_at(int x, int y);
NElement::ptr get_element_at(const NPoint&pt);`}>
                    Get the topmost child element of the current element whose bounds contains the point (x,y). Returns an empty pointer
                    if no element is found at the point. The point is in window coordinates. To search the entire visual
                    tree call <M>window()-&gt;get_element_at(x,y)</M>.
                </MethodDescription>
                <MethodDescription indexName="bool NElement::take_focus()" method="bool take_focus()" >
                    <p>Attempt to take keyboard focus. Returns <M>true</M> if the element successfully takes focus.</p>
                </MethodDescription>
                <MethodDescription indexName={[
                    "NPoint NElement::window_to_screen(const NPoint& point) const",
                    "NPoint NElement::screen_to_window(const NPoint& point) const",
                    "NPoint NElement::element_to_screen(const NPoint& point) const",
                    "NPoint NElement::screen_to_element(const NPoint& point) const",
                    "NPoint NElement::element_to_window(const NPoint& point) const",
                    "NPoint NElement::window_to_element(const NPoint& point) const",
                ]} method={
                    `NPoint window_to_screen(const NPoint& point) const;
NPoint screen_to_window(const NPoint& point) const;
NPoint element_to_screen(const NPoint& point) const;
NPoint screen_to_element(const NPoint& point) const;
NPoint element_to_window(const NPoint& point) const;
NPoint window_to_element(const NPoint& point) const;`}>
                    <p>
                        These methods provide conversion of points between coordinate systems.
                        In screen coordinates, (0,0) is at the top left corner of the screen
                        or terminal output window. In window coordinates, (0,0) is at the top left corner of
                        the parent <M>NWindow</M>. In element coordinates, (0,0) is at the top left corner of the element.
                    </p>
                </MethodDescription>
                <MethodDescription indexName={[
                    "NRect window_to_screen(const NRect& rect) const",
                    "NRect screen_to_window(const NRect& rect) const",
                    "NRect element_to_screen(const NRect& rect) const",
                    "NRect screen_to_element(const NRect& rect) const",
                    "NRect element_to_window(const NRect& rect) const",
                    "NRect window_to_element(const NRect& rect) const",
                ]} method={
                    `NRect window_to_screen(const NRect& rect) const;
NRect screen_to_window(const NRect& rect) const;
NRect element_to_screen(const NRect& rect) const;
NRect screen_to_element(const NRect& rect) const;
NRect element_to_window(const NRect& rect) const;
NRect window_to_element(const NRect& rect) const;
`}>
                    <p>
                        These methods provide conversion of rectangles between coordinate systems.
                        In screen coordinates, (0,0) is at the top left corner of the screen
                        or terminal output window. In window coordinates, (0,0) is at the top left corner of the
                        parent <M>NWindow</M>. In element coordinates, (0,0) is at the top left corner of the element.
                    </p>
                </MethodDescription>

            </MethodDescriptions>
            <MethodDescriptions title="Protected Rendering Methods">
                <p>The following methods are used to render content by NWindows elements. A general overview and discussion of rendering
                    , including sample code, is provided in the the <DocsLink route="/using/custom/full" directId="section__Rendering">Rendering</DocsLink> section of the
                    <i>Fully-Custom Elements</i> page.
                </p>
                <MethodDescription indexName="void NElement::move(int x, int y)" method="void move(int x, int y)" >
                    Move the print cursor to the specified position. The position is specified in element coordinates &mdash;
                    (0,0) is at the top left corner of the layout rectangle of the element.
                </MethodDescription>

                <MethodDescription
                    indexName={"int NElement::measure_text(const std::string&text)"}
                    method={
                        `int measure_text(const std::string&text);`} >
                    <p>Returns the number columns on the display terminal by which the cursor would advance if the
                        string were printed. The character encoding of the string is assumed to be UTF-8. Individual
                        Unicode characters may occupy zero, one or two columns on the display terminal. "😄" and "字" are
                        examples of characters that occupy two columns on the display terminal. Unicode composing accents
                        are examples of characters that occupy zero columns on the display terminal. The return value takes
                        all of these factors into account.
                    </p>
                    <p>
                        An element must be attached to an window for this method to work, since this and other display methods
                        need to know about the terminal to which they are connected. However, the method is also
                        available on <M>NWindow</M>s, and can be used once the <M>NWindow</M> has been created. You can either
                        wait until <M>on_attached</M> is called to start measuring text, or use an available <M>NWindow</M>
                        if you have access to one.
                    </p>
                </MethodDescription>


                <MethodDescription indexName={["void NElement::print(const char* text)",
                    "void NElement::print(const std::string& text)",
                ]}
                    method={`void print(const char* text);
void print(const std::string& text);
`} >
                    <p>
                        Print a string at the current print cursor position, and advance the cursor position by
                        the measured width of the text. Text is encoded in UTF-8.  Be aware that Unicode characters may occupy zero, one or two display columns
                        on the output terminal. See
                        the <DocsLink route="/using/custom/unicode" directId="section__unicode_support">
                            <i>Unicode Support</i></DocsLink> section of this document for a generic discussion of Unicode support in NWindows.</p>
                </MethodDescription>

                <MethodDescription indexName={["void NElement::print(const std::string& text, NAlignment alignment, int display_width);",
                ]}
                    method={`void print(const std::string& text, NAlignment alignment, int display_width);`}>
                    <p>
                        Fill <M>display_width</M> columns of the output terminal with the supplied text, and advances the text cursor when done.
                        Output will be padded with spaces
                        as required to completely fill the available space. if the supplied text would occupy more space
                        on the display than permitted by <M>display_width</M>, the text will wbe truncated to fit.
                        Set <M>alignment</M> can be set to <M>NAlignment::Start</M>, <M>NAlignment::Center</M>, or <M>NAlignment::End</M> to
                        control the alignment of text within the available width.
                    </p>
                </MethodDescription>

                <MethodDescription indexName={["void NElement::print(const std::string& text, int max_display_width);",
                ]}
                    method={`void print(const std::string& text, int max_display_width);`}>
                    <p>
                        Print characters until the number of columns of text on the output device would
                        exceed <M>max_display_width</M>, or until the end of text is reached. Trailing zero-width combining accents are included; double-width
                        characters will be excluded if they occur after advancing the print cursor by width-1 characters.
                        Output is not padded with spaces at the end.</p>
                    <p><M>Nelement::print(text,NAlignment::Start, display_width)</M> may be a better choice because
                        it predictably fills the specified number of columns on the display, whereas this version
                        can be a bit twitchy (e.g. the case where a double-width character gets discarded because
                        there's room for only half of it).</p>
                </MethodDescription>
                <MethodDescription indexName={[
                    "void NElement::print(const wchar_t* text)",
                    "void print(const std::wstring& text)",
                    "void print(const std::u32string& text)"
                ]}
                    method={`void print(const wchar_t* text)
void print(const std::wstring& text);
void print(const std::u32string& text)`} >
                    <p>
                        Present, so mentioned in passing. UTF-8 encoded std::string's are the canonical and preferred form of text in NWindows.
                        So don't use these overloads.
                    </p>
                </MethodDescription>

                <MethodDescription
                    indexName={"void NElement::box(const NRect &rect, const std::optional<NColorPair>&colorPair = std::nullopt)"}
                    method={
                        `void box(
    const NRect &rect, 
    const std::optional<NColorPair>&
         colorPair = std::nullopt);`} >
                    <p>Display a box on screen. Line drawing characters will be used if they are available on the current display terminal; otherwise
                        NWindows will fall back to drawing boxes with ASCII characters. The optional <M>colorPair</M> argument specifies the
                        color pair to use when drawing the box.
                    </p>
                </MethodDescription>

                <MethodDescription
                    indexName={[
                        "void NElement::horizontal_line(int x, int y, int width)",
                        "void NElement::vertical_line(int x, int y, int height)"
                    ]}
                    method={
                        `void horizontal_line(int x, int y, int width);
void vertical_line(int x, int y, int height);`} >
                    <p>Draw a vertical or horizontal line at the specified location. Coordinates are element coordinates. Uses line-drawing characters
                        if available, and falls back to ASCII rendering otherwise.
                    </p>
                </MethodDescription>


                <MethodDescription indexName={["void NElement::print_acs(int x, int y, int alternate_character)",
                    "void NElement::print_acs(int x, int y, const std::string& alternate_character)"
                ]}
                    method={`void print_acs(int x, int y, int alternate_character);`}>
                    <p>Print a character from the <M>ncurses</M> alternate character set. Typically, these are box drawing characters. For example,
                        the following code displays the top-left corner of a box:
                    </p>
                    <Code text={`print_acs(0,0,ACS_ULCORNER);`} />
                    <p>see the ACS_* literals in <M>ncurses.h</M> for a complete lists of alternate-character-set characters.</p>
                    <p>Prefer this method for ACS line-drawing characters, because <M>ncurses</M> provides fallback
                        behavior for terminal devices that don't have line-drawing characters.
                        Prefer <M>print()</M> using Unicode characters otherwise.</p>

                </MethodDescription>

            </MethodDescriptions>

            <MethodDescription
                indexName={"int NElement::measure_menu_text(const std::string& text)"}
                method={
                    `int measure_menu_text(const std::string& text);`} >
                <p>In menu item text, the '_' character indicates that the character which follows is a shortcut key.</p>
                <p>Returns the number of columns that the menu item would occupy on the display terminal if it were printed.
                    The same as <M>measure_text</M>, but with special handling for the '_' character.</p>
                int measure_menu_item(const std::string& text);
            </MethodDescription>

            <MethodDescription
                indexName={[
                    "void NElement::print_menu_item(const std::string& text, int max_display_width, bool show_underline = true)",
                    "void NElement::print_menu_item(const std::string& text, NAlignment alignment, int display_width, bool show_underline = true)"
                ]}
                method={
                    `void print_menu_item(
    const std::string& text, 
    int width, 
    bool show_underline = true);
void print_menu_item(
    const std::string& text, 
    NAlignment alignment,
    int width, 
    bool show_underline = true);`} >
                <p>Prints the supplied text as a  menu item. The '_' character indicates that the character which
                    follows is a shortcut key. The shortcut character will either be underlined or not, depending on
                    the value of <M>show_underline</M></p>
                <p><M>max_display_width</M> specifies the maximum number of display columns of text to write to the screen.
                    If the measure of the text is less than width, the displayed text will be padded with spaces. If the measure of the text is
                    greater than <M>width</M>, displayed text will be truncated.
                    <p>If <M>alignment</M> is specified, padding will be applied as required to align the text at the
                        start, center or end of the specified <M>display_width</M>. If <M>text</M> requires more than <M>display_width</M> columns,
                        the text will be truncated when displayed.</p>
                </p>
            </MethodDescription>
            <MethodDescription
                indexName={[
                    "bool NElement::is_menu_item_shortcut_key(char32_t c, const std::string& text)",
                    "bool NElement::is_menu_item_shortcut_key(const std::string& utf8key, const std::string& text)"
                ]}
                method={
                    `bool is_menu_item_shortcut_key(
    char32_t c, 
    const std::string &text) const;
bool is_menu_item_shortcut_key(
    const std::string& utf8key, 
    const std::string& text);
                    `} >
                <p>Returns true if the supplied text has a menu item shortcut (a character marked by '_') which
                    matches the character <M>c</M>. The comparison is done using a case-insensitive comparison appropriate for
                    the current locale. </p>
                <p>If <M>utf8key</M> is supplied as an argument, the string will contain a single
                    Unicode codepoint (which many consist of multiple UTF-8 encoded bytes). </p>
                <p>It's not immediately clear whether short-cut keys in all international locales
                    are in fact a single codepoint, or whether shortcut keys can consist of a single
                    unicode codepoint followed by one or more modifiers or combining accents. NWindows, itself,
                    prefers the std::string overload in order to prepare for fixes that might need to be made in
                    the future. However, there are currently no provisions for assembling keystrokes into
                    modifier or combining-accent sequences. Please log a problem report if you need this feature.
                </p>
                <p>See <ApiLink linkType={LinkType.ClassMethod} name="NElement::wants_shortcut_key"><M>NElement::wants_shortcut_key</M></ApiLink>.</p>
            </MethodDescription>

            <MethodDescription indexName={[
                "void NElement::attribute_on(NAttribute attr)",
                "void NElement::attribute_off(NAttribute attr)"
            ]} method={
                `void attribute_on(NAttribute attr);
void attribute_off(NAttribute attr);
`} >
                <p>Turn the specified attribute on or off. Attributes are used to change the appearance of text.
                    The following attributes are supported:</p>
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
                        <div>Don't use. Use <M>print_acs</M> instead.</div>

                        <div>CharText</div>
                        <div>Don't use.</div>
                    </EnumDefinitionList>

                </EnumDescription>

                <p>If you turn an attribute on, you <i>must</i> turn it off before you return from <M>render()</M>.</p>
            </MethodDescription>
            <MethodDescription
                indexName={[
                    "void NElement::color_on(NColorPair colorPair)",
                    "void NElement::color_off(NColorPair colorPair)"
                ]}
                method={
                    `void color_on(NColorPair colorPair);
void color_off(NColorPair colorPair);
`} >
                <p>Turn the specified color pair on or off. Subsequent text display calls will
                    display text using the foreground and background colors specified in the <M>NColorPair</M>.
                    Color pairs are created using the <M>NWindow::make_color_pair</M> method.
                    There must be a matching call to <M>color_off</M> for every call to <M>color_on</M> when you return from <M>render()</M>.
                </p>
            </MethodDescription>

            <MethodDescriptions title="Protected Methods">

                <MethodDescription indexName={["virtual bool NElement::wants_shortcut_key(const std::string& key)"]}
                    method={`virtual bool wants_shortcut_key(const std::string& key);`} >
                    <p>An element can override this method in order to handle shortcut keys.  Return <M>true</M> to have the parent <M>NWindow</M> fire a
                        synthetic <M>on_click</M> event on the element. The default <M>NElement</M>implementation
                        returns false.
                    </p>
                    <p>The following conditions must be true to get Nwindows to call this method.
                        <ul>
                            <   li>The element's parent window must be the currently-active window. </li>
                            <li>The element, or one of its children must have the current keyboard focus.</li>
                            <li>The element's <M>clickable</M> property must be true.</li>
                            <li>The element's <M>enabled</M> property must be true.</li>
                        </ul>
                    </p>
                    <p>The provided <M>key</M> currently contains the UTF-8 byte sequence for a single Unicode codepoint. However,
                        future versions of <M>NWindows</M> may provide a single codepoint followed by a Unicode modifier sequence or
                        combining-accent sequence should that prove to be necessary to properly support international locales. Please file a problem
                        report if you require this feature. </p>
                </MethodDescription>

                <MethodDescription indexName={["virtual void NElement::invalidate_layout()",
                    "virtual void NElement::invalidate_render()"]}
                    method={`virtual void invalidate_layout();
virtual void invalidate_render();`} >
                    <p>Call <M>invalidate_layout</M> to force the element to be remeasured and rearranged during the next layout pass. The
                        next layout pass occurs when control is returned to the NWindows event loop. As a result, multiple calls
                        to <M>invalidate_layout</M> are coalesced into a single layout pass. </p>
                    <p>Invalidate rendering invalidates the rendering of an element, and all its children if it has any. The element is
                        not re-rerendered immediately. Instead, a  flag is set
                        which triggers a rendering pass when control next returns to the main event loop. Only those elements which
                        have invalidated rendering will be redrawn during a rendering pass.</p>
                    <p>NWindows elements will invalidate their layout whenever a property changes that affects layout of the element occurs,
                        and will invalidate their layout whenever a property changes that affects what will be rendered on the terminal
                        display. Custom element implementations should do the same. A property change should result in a call to either <M>invalidate_layout</M>,
                        or to <M>invalidate_render</M>. <M>invalidate_layout</M> also invalidates the rendering of all elements in the visual element
                        tree, so there's no need to do both.</p>
                </MethodDescription>
                <MethodDescription indexName="virtual NElement::ptr find_child_element(const std::function<bool(NElement&)>& predicate);"
                    method={`virtual NElement::ptr 
find_child_element(
    const std::function<bool(NElement&)>& predicate
);
`} >
                    <p>Search the children of the current element for an element that satisfies the predicate. Returns a shared pointer to the element
                        if found, otherwise returns an empty pointer.</p>
                </MethodDescription>
                <MethodDescription indexName="virtual void NElement::for_each_element(const std::function<void(NElement&)>& callback);"
                    method={`virtual void for_each_element(
    const std::function<void(NElement&)>& callback
);`} >
                    <p>Recursively enumerate the element and all its child elements, executing the <M>callback</M> function for each. Elements are enumerated
                        in depth-first order.</p>
                </MethodDescription>
                <MethodDescription indexName="virtual bool NElement::simulate_keyboard_click(NElement* source, int button = 0)"
                    method={`virtual bool simulate_keyboard_click(NElement* source, int button = 0);`} >
                    <p>Simulate a keyboard click on the element. The <M>source</M> argument is the element that is provided as a source in
                        mouse event arguments during the simulated click, and would typically be the owning window of the element (which is the
                        case for actual mouse events).</p>
                    <p>The <M>button</M> argument is the mouse button that will be clicked in the simulation. The default value is 0, which
                        represents the left mouse button. But callers can choose to simulate a right mouse button click (button=2), or a middle
                        mouse button/mouse wheel click (mouse button=1), or a fourth-button click (button=3) as well.</p>
                    <p>The method first focuses the target element. If this actual fails (either because the element is not focusable, or
                        because it is disabled, no further processing takes plance, and <M>simulate_keyboard_click</M> returns false,
                        indicating that the click was not handled.
                    </p>
                    <p>The method then calls <M>handle_mouse_button_pressed</M>  immediately, followed by an <M>handle_mouse_button_released</M> event, so that
                        elements will display a simulated button click. If neither of those events are handled, <M>simulate_keyboard_click</M> will
                        the call <M>handle_mouse_button_clicked</M>. </p>
                    <p>Returns <M>true</M> if an element successfully handles the click event, or if one of the intermediate events was handled.
                    </p>

                </MethodDescription>
                <MethodDescription indexName="bool NElement::keyboard_clicking() const"
                    method={`bool keyboard_clicking() const;`} >
                    <p>Returns <M>true</M> if the element is currently in the process of handling a simulated keyboard click event.</p>
                </MethodDescription>
            </MethodDescriptions>

            <MethodDescriptions title="Protected Event Handler Methods">
                <p>There is a virtual <i>handler</i> method for each event supported by an <M>NElement</M>. Rather than
                    repeat content, please refer to the documentation for the corresponding event. Handler methods are called first;
                    and the <M>NElement</M> implementation of the handler method fires the corresponding event (named <M>on_<i>event</i></M>). If you are writing
                    a custom element, you typically will override the handler method rather having the element subscribe  to an event on itself,
                    which is possible, but somewhat awkward.
                </p>
                <MethodCode text={`
virtual bool handle_key_code(NKeyCodeEventArgs& event_args);

virtual bool handle_clicked(
    int button, 
    NClickedEventArgs& eventArgs);

virtual bool handle_mouse_button_clicked(
    int button, 
    NMouseEventArgs& event_args);

virtual bool handle_mouse_button_pressed(
    int button, 
    NMouseEventArgs& event_args);

virtual bool handle_mouse_button_released(
    int button, 
    NMouseEventArgs& event_args);

virtual bool handle_mouse_move(NMouseEventArgs& event_args);

virtual void handle_mouse_lost_capture();

virtual bool handle_mouse_enter(NMouseEventArgs& event_args);

virtual bool handle_mouse_leave(NMouseEventArgs& event_args);

virtual void handle_focused(bool);

virtual void handle_attached(NWindow* window);
virtual void handle_detaching();

`} />

            </MethodDescriptions>

        </ClassDescription>
        </DocsPage >
    );
}
export default ClassNElement;
