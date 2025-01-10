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
    ClassSectionHead, MethodDescriptions, MethodDescription, UsingDescription,
    PropertyList, PropertyEntry, EventDescriptions, EventDescription,
    ApiLink, LinkType, DocsLink,
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
                        <div>(Read only). A pointer the to the NWindow to which the current NElement is attached.
                            Returns <M>nullptr</M> if the element is not attached to a windows. The value of the
                            property is null, until <M>NElement::handle_attached</M> is called, after which it
                            references the parent window, and becomes invalid again after <M>NElement::handle_detaching</M> is
                            called. If access to the window is needed for longer than the lifetime of the method in
                            which <M>window()</M> is called (in an event handler, for example), the pointer
                            should be converted to a <M>std::weak_ptr</M> by calling <M>window()-&gt;weak_ptr_from_this&gt;NWindow&lt;()</M>.
                            However, keyboard and mouse events provide access to a live and attached window
                            through the <M>EventArgsBase::window</M> property;
                            and most other events provide an <M>NElement::ptr</M> to the source element, which can be
                            used to access a relevant window via <M>source-&gt;window()</M>. So in practice, it's best to avoid capturing
                            a shared_pointer or a weak_ptr to the containing <M>NWindow</M> altogether.
                        </div>

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
                        (Read only). The actual layout width of the element. Not valid until layout has completed.
                    </PropertyEntry>
                    <PropertyEntry type="int" propertyName="NElement::actual_height">
                        (Read only). The actual layout height of the element. Not valid until layout has completed.
                    </PropertyEntry>
                    <PropertyEntry type="NSize" propertyName="NElement::actual_size">
                        (Read only). The actual layout width and height of the element. Not valid until layout has completed.
                    </PropertyEntry>

                    <PropertyEntry type="NRect" propertyName="NElement:bounds">
                        (Read only). The actual position of the element inside the window in window coordinates. Only valid
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
                            (Read only). Whether or not the element is inherits from <M>NContainerElement</M>, and can therefore
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
                            layout bounds, determend by (0,0), actual_width() and actual_height() which
                            contain the final size of the element, as dtermined during the layout process.
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
                <MethodDescriptions title="Protected Methods">
                    <MethodDescription indexName="void NElement::move(int x, int y)" method="void move(int x, int y)" >
                        Move the print cursor to the specified position. The position is specified in element coordinates &mdash;
                        (0,0) is at the top left corner of the layout rectangle of the element.
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
                    <MethodDescription indexName={["void NElement::print(const std::string& text, NAlignment alignment, int width);",
                    ]}
                        method={`void print(const std::string& text, int width);`}>
                        <p>
                            Fill <M>width</M> columns of the output terminal with the supplied text. Output will be padded with spaces 
                            as required to completely fill the available space. if the supplied text would occupy more space 
                            on the display than permitted by <M>width</M>, the text will wbe truncated to fit.
                        </p>
                    </MethodDescription>

                    <MethodDescription indexName={["void NElement::print(const std::string& text, int width);",
                    ]}
                        method={`void print(const std::string& text, int width);`}>
                        <p>
                            Print characters until the number of columns of text on the output device would 
                            exceed <M>width</M>. Trailing zero-width combining accents are included; double-width 
                            characters will be excluded if they occur after advancing the print cursor by width-1 characters. 
                            Output is not padded with spaces at the end.</p>
                            <p><M>Nelement::print(text,NAlignment::Start, width)</M> may be a better choice because 
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
                            Present, so mentioned in passing. UTF-8 encoded std::string's are the canonical and preferred form of text in NWindows. So don't use these overloads.
                        </p>
                    </MethodDescription>

                </MethodDescriptions>
            </ClassDescription>

            {/*
    class NElement : public std::enable_shared_from_this<NElement>
    {






    protected:

        void move(int x, int y);

        void print(const char* text);
        void print(const std::string& text);
        void print(const std::string& text, int width);
        void print(const std::string&text, NAlignment alignment, int width);
        void print(const wchar_t* text);
        void print(const std::wstring& text);
        void print(const std::u32string& text);
        void print_acs(int x, int y, int alternate_character);

        void horizontal_line(int x, int y, int width);
        void vertical_line(int x, int y, int height);

        int measure_text(const std::string& text);
        int measure_menu_text(const std::string& text);
        void print_menu_text(const std::string& text);
        void print_menu_text(const std::string& text, int width, bool show_underline = true);
        void print_menu_text(
            const std::string& text,
            NAlignment alignment,
            int width,
            bool show_underline = true);
        bool is_menu_item_shortcut_key(const char32_t c, const std::string& text);
        bool is_menu_item_shortcut_key(const std::string& utf8key, const std::string& text);


        void box(const NRect& rect, const std::optional<NColorPair>& colorPair = std::nullopt);

        void attribute_on(NAttribute attr);
        void attribute_off(NAttribute attr);

        void color_on(NColorPair colorPair);
        void color_off(NColorPair colorPair);


        virtual bool wants_shortcut_key(const std::string& key);

        virtual NSize measure(const NSize& available);
        virtual void arrange(const NRect& bounds) { this->bounds_ = bounds; }
        virtual void render() {}


    protected:
        virtual bool handle_key(NKeyEventArgs& event_args);
        virtual bool handle_key_code(NKeyCodeEventArgs& event_args);
        virtual bool handle_clicked(int button, NClickedEventArgs& eventArgs);
        virtual bool handle_mouse_button_clicked(int button, NMouseEventArgs& event_args);
        virtual bool handle_mouse_button_pressed(int button, NMouseEventArgs& event_args);
        virtual bool handle_mouse_button_released(int button, NMouseEventArgs& event_args);
        // only received after NWindow::mouse_capture() is called.
        virtual bool handle_mouse_move(NMouseEventArgs& event_args);
        virtual void handle_mouse_lost_capture();
        virtual bool handle_mouse_enter(NMouseEventArgs& event_args);
        virtual bool handle_mouse_leave(NMouseEventArgs& event_args);
        virtual void handle_focused(bool);


        NElement* parent()
        {
            return this->parent_;
        }

        void invalidate_layout();
        virtual void invalidate_render();

        virtual void handle_attached(NWindow* window);
        virtual void handle_detaching();

        bool mouse_entered() const { return mouse_entered_; }

        virtual NElement::ptr find_child_element(const std::function<bool(NElement&)>& predicate);

        virtual void for_each_element(const std::function<void(NElement&)>& callback);

        virtual bool simulate_keyboard_click(NElement* source, int button = 0);
        bool keyboard_clicking() const { return keyboard_clicking_; }


    };
*/}
        </DocsPage >

    );
}
export default ClassNElement;
