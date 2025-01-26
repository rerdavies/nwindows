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
    MethodDescription, ParameterList,
    UsingDescription, PropertyList, PropertyEntry, MethodDescriptions,
    TypeDefinitions,
    EventDescriptions,
    EventDescription, ConstDescription
} from '../ClassDescription';
import M, { ML } from '../M';
import Code from '../Code';

function ClassNWindow() {

    let className = "NWindow";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name="NWindow" baseClass="NContainerElement">
                <p><M>NWindow</M> is the base class for all other window classes in NWindows.
                    It is the type of window you will use most often. It can be either a root-level window
                    or a child window, depending on how it is created.
                </p>
                <p>
                    <ML name="NPopupWindow" /> is a specialization of  <M>NWindow</M> that
                    positions itself relative to an anchor rectangle; and <ML name="NPopupMenuWindow" /> is a specialization 
                    of <M>NPopupWindow</M> that displays popup menus. <ML name="NMessageWindow"/> is a specialization of 
                    <M>NWindow</M> that shows an error message dialog.
                </p>
                <p><M>NWindow</M>s are created by calling one of the several static <M>create</M> methods, each of
                    which returns an <M>NWindow::ptr</M> (convenient short-hand for
                    a <M>std::shared_ptr&lt;NWindow&gt;</M>). <M>NWindow</M>'s actual
                    constructor is protected. <M>NWindow</M>s can only exists in <M>NWindow::ptr</M>s.
                </p>
                <p><M>NWindow</M>s inherit from <ML name="NContainerElement" />, but can, in fact, only contain
                    one child element, and will throw an error if you attempt to a second child.</p>
                <p>However, importantly, because <M>NWindow</M>s also inherit from <ML name="NElement"/>, they also 
                    participate in routing of keyboard and mouse events. 
                    in the same way that their child <M>NElement</M>s do, and provide all of the 
                    events and event handler methods that an <M>NElement</M> does. One critical difference, however, 
                    is that <M>NWindow</M>s receive unhandled keyboard events and mouse  events even if they do not have focus or 
                    mouse capture. (They probably should not have keyboard focus or mouse capture.)  This means that applications can add event handlers to an <M>NWindow</M>s keyboard <ML name="NElement::on_key"/> and 
                    <ML name="NElement::on_key_code" /> events in order to process keys and key codes that have not been handled during 
                    normal event routing. These events fire on an <M>NWindow</M> only if child elements have not handled the event, 
                    but fire before the <M>NWindow</M> handles focus navigation keys. 
                </p>
                <TypeDefinitions>
                    <UsingDescription indexName={"NWindow::super"} declaration="using super = NContainerElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NWindow::self"} declaration="using self = NWindow;" >
                    </UsingDescription>
                    <UsingDescription indexName="NWindow::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                    <UsingDescription indexName="NWindow::clock_t" declaration={`using clock_t = std::chrono::steady_clock;`} >
                        See <ML name="NWindow::post" />.
                    </UsingDescription>
                </TypeDefinitions>
                <MethodDescriptions title="Constants">
                    <ConstDescription indexName="static constexpr char32_t NWindow::UNCOMPOSABLE"
                        constant={`static constexpr char32_t UNCOMPOSABLE = (char32_t)-1;`
                        }>
                        <p>A value returned by <ML fullName name="NWindow::compose_characters()" /> when the two characters cannot be combined.</p>
                    </ConstDescription>
                </MethodDescriptions>

                <MethodDescriptions title="Public Constructors" >
                    <MethodDescription indexName={[
                        `static NWindow::ptr NWindow::create(int width, int height, NColorPalette* color_palette = nullptr)`,
                        `static NWindow::ptr NWindow::create(int x, int y, int width, int height, NColorPalette* color_palette = nullptr)`
                    ]}
                        method={
                            `static NWindow::ptr create(
    int width, int height,
    NColorPalette* color_palette = nullptr);

static NWindow::ptr create(
    int x, int y,
    int width, int height,
    NColorPalette* color_palette = nullptr);`
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

                            <div>color_palette</div>
                            <div>An advanced parameter, not normally used. Optionally sets The color palette that controls within the
                                window and child windows will use.
                                If not specified, the default color palette will be used. See <ML name="NColorPalette" /> for details.</div>
                        </ParameterList>
                        <p>These <M>create</M> methods create a top-level <M>NWindow</M>s. You can only create one top-level window.</p>
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
                        <p>These two <M>create</M> methods create child <M>NWindow</M>s. You can create as many child Windows
                            as you like, and new <M>NWindows</M>s can be children of other child windows as well as the
                            top-level window.</p>
                        <p>Child windows are typically used to create dialogs; but they can be used for other purposes,
                            such as transitional progress dialogs as well. Child windows are <i>modal</i> &mdash; they block
                            input to the parent window until they are closed.
                        </p>

                    </MethodDescription>
                </MethodDescriptions>
                <MethodDescriptions title="Protected Constructors">
                    <MethodDescription indexName="NWindow::NWindow(int x, int y, int width, int height, NColorPalette* color_palette = nullptr)"
                        method={`NWindow(
    int x, int y, int width, int height,
    NColorPalette* color_palette = nullptr);`
                        }>
                        <p>Attaching a child window to parent window requires that both parent and child windows have been
                            attached to a std::shared_ptr. As a result, windows have to be privately constructed in two steps.
                            The first step is to create the window (and its shared_ptr) using the protected constructor, and
                            the second step is to either attach the window to its parent window
                            using <ML name="NWindow::add_to_parent_window" /> or perform the rest of top-level window initialization
                            by calling <ML name="NWindow::init_root_window" />. If you are writing a custom <M>NWindow</M>-derived class,
                            these two steps will be performed your static <M>create</M> method, so these details are invisible to
                            consumers of your new class. A
                            custom NWindow-derived child class would write:
                        </p>
                        <Code text={`...
private: 
    NCustomWindow(int width, int height) 
    : NWindow(AUTO_SIZE, AUTO_SIZE, width, height,"CustomWindow")
    {
    }
public:
    static on_create(
        NWindow::parentWindow, 
        int width, 
        int height)
    {
        // not make_shared, since the constructor 
        // is not public.
        ptr result = std::shared_ptr(
            new NCustomWindow(width, height));
        // complete the initialization.
        if (parentWindow)  {
            result->add_to_parent_window(parentWindow);
        } else {    
            results->init_root_window();
        }
        return result;
    }
`} />
                        <p>The <M>color_palette</M> parameter only has effect if the new window is initialized as a top-level window; otherwise,
                            the new window is assigned the color_palette of the top-level window.</p>
                    </MethodDescription>
                </MethodDescriptions>
                <MethodDescriptions title="Static Methods">
                    <MethodDescription indexName="void NWindow::set_locale(const std::string& locale)"
                        method={`static void set_locale(const std::string& locale);`
                        }>
                        <p>Sets the locale that NWindows will use. The syntax of the argument is the same as what <M>std::local</M> supports. Examples of
                            valid locales: "en_US", "da_DK", "tr". The character set will default to "UTF-8" if not specified. This method must be
                            called before the first <M>NWindow</M> is created.</p>
                        <p>Note that NWindows expects strings to be in UTF-8 format even if the system locale is not a UTF-8 locale. (It will
                            transcode to correct system-locale character set at display time). You should probably not do that though, even
                            if your app is displaying English output.
                        </p>
                        <p>This method exists primarily to provide a way to test alternate locales
                            other than the currently configured system locale. It should not be used in production code.
                            The sole exception is that you can expect "en_US" locales to work since both Linux and Windows both install
                            "en_US" locales even if the system locale is not "en_US".
                            NWindows to use the system's configured locale.
                        </p>
                        <p>By default, NWindows uses the currently-configured system locale. and sets the current C++ standard library's default locale, as well as the
                            operating system's process locale as part of the creation process of the top-level window. However, NWindows uses
                            The ICU library for performing case-insensitive compares, and composing of accents, since neither the GCC C++ standard library
                            nor the Linux operating system implement these features properly. </p>
                        <p>For this method to work completely properly the operating system must have an installed UTF-8 locale for the
                            requested locale. This is always true on Linux and Windows systems when using the system locale, and always true for
                            the en-US UTF-8 locale (since Linux and Windows always install the en_US locale).  If you are
                            testing locales other than the system locale, make sure you have installed the locale that you want to test. Both Linux
                            and Windows require additional installation procedures for installing files required by locales other than the
                            system locale, and the en_US locale.
                        </p>
                    </MethodDescription>
                </MethodDescriptions>

                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NWindow::title'>
                        <div>The title of the window. If set to a non-empty string, the window displays a title bar
                            with the title centered in the available space; otherwise the title bar is not displayed.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="NColorPalette" propertyName='NWindow::color_palette'>
                        <div>
                            <p>
                                The color palette of the current window.
                            </p>
                            <p>Child windows take the color palette of their parent window when created, but a
                                different color palette can be set on the newly created child, if desired.
                                For both parent and child windows, if this property is set, it must be set
                                before the first child element is attached to the window. Many NWindows controls
                                create their <ML name="NColorPair" />s when the are first attached to a window.
                                See <ML name="NWindow::make_color_pair" /> for important caveats bout the number of
                                colors and color pairs that available.
                            </p>
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="NRect" propertyName='NWindow::window_position'>
                        <div>
                            <p>The requested position of the window. If <M>position.x</M> is <M>AUTO_SIZE</M>, the window will
                                be centered horizontally on the display terminal. If <M>position.y</M> is <M>AUTO_SIZE</M>, the window will
                                be centered vertically on the display terminal. If <M>position.width</M> is <M>AUTO_SIZE</M>, the width
                                of the window will be adjusted to fit the window's contents. If <M>position.height</M> is <M>AUTO_SIZE</M>, the height
                                of the window will be adjusted to fit the window's contents. If the property is set, the
                                window will be repositioned on the screen once control returns to the main message loop.
                            </p>
                            <p>Initial values are set by <ML name="NWindow::on_create" /></p>
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="NRect" propertyName='NWindow::actual_window_position'>
                        <div>(read only) The actual position of the window after <M>AUTO_SIZE</M> values
                            of <M>window_position</M> have been resolved during a layout pass. Not valid
                            if a layout pass has not yet completed.</div>
                    </PropertyEntry>
                    <PropertyEntry type="bool" propertyName='NWindow::has_colors'>
                        <div>Ready only. True if the terminal has color capabilities.</div>
                    </PropertyEntry>
                    <PropertyEntry type="int" propertyName='NWindow::max_colors'>
                        <div>Ready only. The maximum number of colors the terminal can display.</div>
                    </PropertyEntry>
                    <PropertyEntry type="int" propertyName='NWindow::max_color_pairs'>
                        <div>Ready only. The maximum number of color pairs the terminal can display.</div>
                    </PropertyEntry>
                    <PropertyEntry type="bool" propertyName="is_unicode_locale">
                        <div>Ready only. True if the current locale is a Unicode locale, and the current display terminal can display Unicode characters.
                        </div>
                        <div>Use this property as a broad guideline as to what to expect. and prefer use of <ML name="NWindow::can_display_character" />,
                            since Unicode version support may vary from distro to distro, and from OS version to OS version; and it's always possible that
                            the current output terminal will support the character you need even though it does not provide full Unicode support.</div>
                    </PropertyEntry>
                    <PropertyEntry type={`NElement::ptr`} propertyName="NWindow::focus">
                        <div>The element that currently has keyboard focus. Setting the property gives focus to the the specified <M>NElement</M>.</div>

                    </PropertyEntry>
                    <PropertyEntry type="bool" propertyName="NWindow::is_active_window">
                        <div>Ready only. True if the window is the active (topmost) window.</div>
                    </PropertyEntry>
                    <PropertyEntry type="NWindow*" propertyName="NWindow::active_window">
                        <div>Ready only. The currently-active (topmost) window.</div>
                    </PropertyEntry>
                    <PropertyEntry type="Collator" propertyName="NWindow::collator">
                        <div>
                            <p>Ready only. The collator that NWindows uses for sorting strings. The collator is set to the current locale's
                            collator when the top-level window is created. The collator is used for performing case-insensitive 
                            comparisons of UTF8-encoded <M>std::string</M>s. It is currently only used by NWindows to determine whether 
                            short-cut keys match, but nonetheless, it provides full locale-aware collation. Input strings are expected to 
                            be in UTF-8 NFC form (canonical form with accents composed). See <ML name="NWindow::normalize_utf8"/>.
                            </p>
                            <p>
                                On Linux, Collation is performed using the ICU library, since GCC's C++ std::locale implementation is &mdash; for all practical 
                                purposes &mdash; non-functional. 
                            </p>
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="NWindow*" propertyName="NWindow::top_level_window">
                        <div>Ready only. The top-level window.</div>
                    </PropertyEntry>
                </PropertyList>
                <EventDescriptions>
                    <EventDescription indexName="NEvent<void(NElement::ptr focusElement)> NWindow::on_focus_changed"
                        event={`NEvent<void(
    NElement::ptr focusElement
)> NWindow::on_focus_changed`}>
                        <p>Called when the element which has keyboard focus changes.</p>
                    </EventDescription>
                    <EventDescription indexName={`NEvent<void(NWindow::ptr source, bool activated)> NWindow::on_is_active_changed`}
                        event={`NEvent<
    void(NWindow::ptr source, bool activated)
> on_is_active_changed;`}>
                        <p>Fires when the window becomes active or inactive.</p>
                    </EventDescription>
                </EventDescriptions>
                <MethodDescriptions>
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
                        <p>Closes the window. If the window is a top level window, the <M>run()</M> message loop will
                            be exited, and <M>run()</M> will return shortly thereafter. If the window is a child window,
                            the window will be removed from the screen, and the reference count on the child window should
                            go to zero, causing the child window to be deleted.
                        </p>
                    </MethodDescription>
                    <MethodDescription indexName="void NWindow::fatal_error(const std::string&message)"
                        method={`void fatal_error(const std::string& message);`}>
                        <p>Close the top-level window, shut down <M>ncursesw</M> and display the supplied message on the terminal before exiting.</p>
                    </MethodDescription>
                    <MethodDescription indexName={[
                        "void NWindow::mouse_capture(NElement* element)",
                        "void NWindow::mouse_capture(NElement::ptr element)"
                    ]}
                        method={
                            `void mouse_capture(NElement* element);
void mouse_capture(NElement::ptr element);`
                        }>
                        <p>Causes the specified element to receive all mouse events until the element is released from capture
                            by calling <M>mouse_capture_release()</M>. If the element is not a child of the window, the method
                            will throw an error. If the element is already in capture, the method will do nothing.
                        </p>
                    </MethodDescription>
                    <MethodDescription indexName="void NWindow::mouse_capture_release()"
                        method={`void mouse_capture_release();`
                        }>
                        <p>Releases the current mouse capture. </p>
                    </MethodDescription>
                    <MethodDescription indexName="void NWindow::mouse_capture_release(NElement* element)"
                        method={`void mouse_capture_release(NElement* element);`
                        }>
                        <p>Releases the current mouse capture if the specified element is the current mouse capture. If the element
                            is not the current mouse capture, the method will do nothing.</p>
                    </MethodDescription>
                    <MethodDescription indexName="void NWindow::set_clipboard_text(const std::string& text)"
                        method={`void set_clipboard_text(const std::string& text);`
                        }>
                        <p>Sets the text on the clipboard. If the <M>xclip</M> command has been previously installed, and the application
                            is running on an xterm-like terminal, the text will be available to other applications that can read text from the clipboard;
                            otherwise the clipboard text is only available in the current application.</p>
                    </MethodDescription>
                    <MethodDescription indexName="std::string NWindow::get_clipboard_text()"
                        method={`std::string get_clipboard_text();`
                        }>
                        <p>Gets the text on the clipboard. If the <M>xclip</M> command has been previously installed, and the application
                            is running on an xterm-like terminal, the application will see text that has been posted to the clipboard
                            by other applications that can write text to the clipboard; otherwise the clipboard text will be whatever was last
                            posted by a call to <ML name="NWindow::set_clipboard_text()" />.
                        </p>
                    </MethodDescription>
                    <MethodDescription indexName="NColor NWindow::make_color(uint32_t rrggbb)" method={`NColor make_color(uint32_t rrggbb);`}>
                        <p>Creates an <ML name="NColor" /> index from an RGB value. The argument is a <M>uint32_t</M> value in
                            hexadecimal 0x00RRGGBB format.</p>
                        <p>Colors are allocated from a limited pool of available
                            color indices maintained by the top-level window. Calling <M>make_color</M> with a color that has been
                            previously allocated will return the same <M>NColor</M> index.</p>
                        <p>Terminal devices have a strictly limited number of colors they can allocated, and that number varies depending
                            on the current output terminal. (See <ML fullName name="NWindow:max_colors" />).
                            Allocated colors exist for the lifetime of the top-level window. They cannot be unallocated.</p>
                        <p><M>make_color</M> will throw an exception of the number of available colors has been exceeded.</p>
                        <p><M>make_color</M> will throw an exception if the current output terminal (improbably) does not support colors.
                            See <ML name="NWindow::has_colors" /> for when that might happen.</p>

                    </MethodDescription>
                    <MethodDescription indexName={[
                        "NColorPair NWindow::make_color_pair(uint32_t rrggbbFg, uint32_t rrggbbBg)",
                        "NColorPair NWindow::make_color_pair(NColor foreground, NColor background)",
                    ]}
                        method={`NColorPair make_color_pair(uint32_t rrggbbFg, uint32_t rrggbbBg);
NColorPair make_color_pair(NColor rrggbbFg, NColor rrggbbBg);`
                        }>
                        <p>Creates an <ML name="NColorPair" /> index from a pair of colors. <M>uint32_t</M> arguments are in
                            hexadecimal 0x00RRGGBB format.</p>
                        <p>Colors pairs are allocated from a limited pool of available
                            color-pair indices maintained by the top-level window. Calling <M>make_color_pair</M> with a color pair that has been
                            previously allocated will return the same <M>NColorPair</M> index.</p>
                        <p>Terminal devices have a strictly limited number of color pairs they can allocated, and that number varies depending
                            on the current output terminal. (See <ML fullName name="NWindow:max_color_pairs" />).
                            Allocated color pairs exist for the lifetime of the top-level window. They cannot be unallocated.</p>
                        <p><M>make_color_pair</M> will throw an exception if the number of available color pairs has been exceeded.</p>
                        <p><M>make_color_pair</M> calls <M>make_color</M> for each of the supplied colors. <M>make_color</M> may throw an
                            exception if the maximum number of allocated colors has been exceeded.</p>
                        <p><M>make_color_pair</M> will throw an exception if the current output terminal (improbably)  does not support colors.
                            See <ML name="NWindow::has_colors" /> for when that might happen.</p>
                    </MethodDescription>
                    <MethodDescription indexName={[
                        "void NWindow::navigate_focus(NNavDirection direction)",
                        "void NWindow::navigate_focus(int x, int y, NNavDirection direction)"
                    ]}
                        method={`void navigate_focus(NNavDirection direction);
void navigate_focus(int x, int y, NNavDirection direction);`}
                    >
                        <ParameterList>
                            <div>direction</div>
                            <div>The direction in which to navigate focus. See <ML name="NNavDirection" />.</div>
                            <div>x</div>
                            <div>The x position from which to start navigation, specified in window coordinates.</div>
                            <div>y</div>
                            <div>The y position from which to start navigation, specified in window coordinates.</div>
                        </ParameterList>
                        <p>
                            Move focus to the next element in the specified direction.
                        </p>
                        <p>
                            If <M>x</M> and <M>y</M> are not specified, the location of the current focus element is used as the starting point.
                            If there is no focus element, navigation will start from the top-left corner of the window.
                        </p>
                    </MethodDescription>
                    <MethodDescription indexName={[
                        "PostHandle NWindow::post(std::function<void(void)>&& fn)",
                        "PostHandle NWindow::post(NWindow::clock_t::duration delay, std::function<void(void)>&& fn)",
                        "PostHandle NWindow::post(NWindow::clock_t::time_point when, std::function<void(void)>&& fn)",
                    ]} method={`void post(
    std::function<void(void)>&& fn
);
void NWindow::post(
    NWindow::clock_t::duration delay, 
    std::function<void(void)>&& fn);
void NWindow::post(
    NWindow::clock_t::time_point when, 
    std::function<void(void)>&& fn);
`} >
                        <p>
                            Execute a function at a later time. The <M>post</M> methods are thread-safe and can be called from any thread. 
                            This makes them useful for safely making changes to NWindows content from a thread other than the main 
                            NWindows thread. In each case, the function will be executed on NWindow's main
                            event loop thread (the thread on which <ML fullName name="NWindow::run" /> was called.
                        </p>
                        <p>If <M>delay</M> is specified, the function is executed after the specified delay.</p>
                        <p>If <M>when</M> is specified, the function executes at or after the specified time.</p>
                        <p>Otherwise, the function is executed when control next returns to the NWindows event loop. This is useful if 
                            you wish to execute a function after an in-progress layout or render pass is finished.
                        </p>
                        <p>Each call to <M>post</M> returns a <ML name="PostHandle" /> that can be used to cancel the function before it executes.
                        </p>
                    </MethodDescription>
                    <MethodDescription indexName="bool NWindows::cancel_post(PostHandle handle)"
                        method={`bool cancel_post(PostHandle handle);`
                        }>
                        <p>Cancel a function that was previously posted <ML name="NWindow::post" /> before it executes. The <M>cancel_post</M> method is thread-safe
                            and can be called from any thread.</p>
                        <p>Returns <M>true</M> if the post was successfully canceled, and <M>false</M> if the post has already executed, or has already
                            been cancelled. If  function is no longer scheduled for execution, calling <M>cancel_post</M> has no effect.</p>
                    </MethodDescription>
                    <MethodDescription indexName="void NWindow::quit()"
                        method={`void quit();`
                        }>
                        <p>Closes the top-level window (regardless of which <M>NWindow</M> <M>quit</M> is call on) and all child windows. The <ML fullName name="NWindow::run"/> method 
                        will return shortly thereafter.</p>
                    </MethodDescription>
                    <MethodDescription indexName="void NWindow::move_window(int dx, int dy);"
                        method='void move_window(int dx, int dy);'>
                            Move the window by the specified amount. The window will be repositioned on the
                             screen once control returns to the main message loop. The position of the window will 
                             be clamped to fit within the bounds of the current display terminal.
                    </MethodDescription>
                    <MethodDescription indexName="const std::string & NWindow::normalize_utf8(const std::string & text) const"
                        method={`std::string normalize_utf8(const std::string& text) const;`
                        }>
                        <p>Normalizes a UTF-8 string to Unicode NFC normalized form, with composing characters and accents combined. NWindows' preferred 
                            form for UTF8 string data is NFC normalized form, with accents combined. On Linux, normalization is perform using Unicode services 
                            from the ICU library. 
                        </p>
                    </MethodDescription>
                    <MethodDescription indexName="const std::string & NWindow::decompose_utf8(const std::string & text) const"
                        method={`std::string decompose_utf8(const std::string& text) const;`
                        }>
                        <p>Converts a UTF-8 string to Unicode NFD normalized form, with composing characters and accents uncombined. NWindows' preferred 
                            form for string data is NFC normalized form, with accents combined. This method is provide to allow applications that 
                            require text in NFD form to convert string data provided by NWindows APIs. On Linux, decomposition is perform using 
                            Unicode services from the ICU library. 
                        </p>
                    </MethodDescription>

                    <MethodDescription indexName={`char32_t NWindow::compose_characters(char32_t left, char32_t right)`}
                        method={`char32_t compose_characters(char32_t left, char32_t right);`}
                        >
                        <p>Attempt compose two Unicode characters into a single character in Unicode NFC form.  The method will return a single 
                            character that is the combination of the two characters. 
                            If the two characters cannot be combined, the method will return <ML fullName name="NWindow::UNCOMPOSABLE"/>.
                        </p>
                    </MethodDescription>
`


                </MethodDescriptions>
                <MethodDescriptions title="Protected Methods">
                    <MethodDescription indexName="void NWindow::add_to_parent_window(NWindow::ptr parent)"
                        method={`void add_to_parent_window(NWindow::ptr parent);`
                        }>
                        <p>Used in the create methods of classes derived from <M>NWindow</M>. See <ML fullName target="NWindow::NWindow" name="NWindow::NWindow()" /> for details.</p>
                    </MethodDescription>

                    <MethodDescription indexName="void NWindow::init_root_window()"
                        method={`void init_root_window();`
                        }>
                        <p>Used in the create methods of classes derived from <M>NWindow</M>. See <ML fullName target="NWindow::NWindow" name="NWindow::NWindow()" /> for details.</p>
                    </MethodDescription>

                    <MethodDescription indexName={[
                        `bool NWindow::bubble_event(int x, int y, const std::function<bool(NElement&)>& fn)`,
                        `bool NWindow::bubble_event(NPoint pt}, const std::function<bool(NElement&)>& fn)`,
                    ]}
                    method={`bool bubble_event(
    int x, int y, 
    const std::function<bool(NElement&)>& fn);
bool bubble_event(
    NPoint pt, 
    const std::function<bool(NElement&)>& fn);`}>
                        <p>Finds the top-most element at the specified point, specified in window coordinates, and 
                            walks the element tree from that element to the containing <M>NWindow</M>, calling the 
                            specified function on each element in turn. If the supplied function returns <M>true</M> (nominally indicating 
                                that an event was handled), the walk is terminated, a a value of <M>true</M> is returned. Otherwise, the method 
                                returns <M>false</M>.</p> 
                    </MethodDescription>
                    <MethodDescription indexName={[
                        `bool NWindow::bubble_mouse_event(int x, int y, const std::function<bool(NElement&)>& fn)`,
                        `bool NWindow::bubble_mouse_event(NPoint pt}, const std::function<bool(NElement&)>& fn)`,
                        `bool NWindow::bubble_mouse_event(NElement::ptr element, const std::function<bool(NElement&)>& fn)`,
                        `bool NWindow::bubble_mouse_event(NElement::ptr element}, const std::function<bool(NElement&)>& fn)`,
                    ]}
                    method={`bool bubble_mouse_event(
    int x, int y, 
    const std::function<bool(NElement&)>& fn);
bool bubble_mouseevent(
    NPoint pt, 
    const std::function<bool(NElement&)>& fn);`}>
                        <p>If an element has captured the mouse, calls the function only on that element; otherwise bubbles the event starting 
                            at the topmost element which contains the specified point. If supplied function returns <M>true</M> (nominally indicating 
                                that an event was handled), the walk is terminated, a a value of <M>true</M> is returned. Otherwise, the method 
                                returns <M>false</M>.
                        </p>
                    </MethodDescription>
       `

                </MethodDescriptions>

            </ClassDescription>
        </DocsPage>
    );
    /*
    class NWindow : public NContainerElement
    {
        bool is_unicode_locale() const { return is_unicode_locale_; }
        bool can_display_character(char32_t c) const;


        static ptr create(int width, int height, NColorPalette* color_palette = nullptr)
        {
            return create_(nullptr,
                AUTO_SIZE, AUTO_SIZE, width, height, color_palette);

        }

        static ptr create(
            NWindow::ptr parentWindow,
            int width,
            int height
        )
        {
            return create_(parentWindow, AUTO_SIZE, AUTO_SIZE, width, height, nullptr);
        }
        static ptr create(
            NWindow::ptr parentWindow,
            int x, int y, int width, int height
        )
        {
            return create_(parentWindow, x, y, width, height, nullptr);
        }


        static ptr create(int x, int y, int width, int height, NColorPalette* color_palette = nullptr)
        {
            return create_(nullptr, x, y, width, height, color_palette);
        }

        virtual ~NWindow();


        bool for_each_child_window(const std::function<bool(NWindow*)>& fn);
        void for_each_child_window(const std::function<void(NWindow*)>& fn);

        void for_each_child_window_parent_first(const std::function<void(NWindow*)>& fn);

        NWindow* find_child_window(const std::function<bool(NWindow*)>& condition_fn);

        void move_window(int dx, int dy);

        const NRect& window_bounds() const { return actual_window_position_; }

        Collator& collator();
        UnicodeNormalizer& unicode_normalizer();
        const UnicodeNormalizer& unicode_normalizer() const;

        std::string normalize_utf8(const std::string& text) const;
        std::string decompose_utf8(const std::string& text) const;
    protected:




        bool bubble_event(int x, int y, const std::function<bool(NElement&)>& fn);
        bool bubble_event(const NPoint& pt, const std::function<bool(NElement&)>& fn)
        {
            return bubble_event(pt.x, pt.y, fn);
        }

        bool bubble_mouse_event(int x, int y, const std::function<bool(NElement&)>& fn);
        bool bubble_mouse_event(const NPoint& pt, const std::function<bool(NElement&)>& fn)
        {
            return bubble_mouse_event(pt.x, pt.y, fn);
        }

        bool bubble_mouse_event(NElement::ptr element, const std::function<bool(NElement&)>& fn);

        bool bubble_event(NElement::ptr element, const std::function<bool(NElement&)>& fn);

        void handle_window_mouse_move(NMouseEventArgs& event_args);
        void handle_button_pressed(int x, int y, NMouseButton button, NMouseEventArgs& event_args);
        void handle_button_released(int x, int y, NMouseButton button, NMouseEventArgs& event_args);


        virtual void handle_is_active_changed(bool activated);

        virtual void set_initial_focus();

        virtual bool handle_default_button();
        virtual bool handle_cancel_button();
        virtual bool handle_window_key(wchar_t key);
        virtual bool handle_window_key_code(int key);
        virtual bool handle_mouse_event(MEVENT& event);


        virtual void arrange(const NRect& bounds);
        virtual NSize measure(const NSize& available) override;
        virtual void render() override;



        */
}
export default ClassNWindow;
