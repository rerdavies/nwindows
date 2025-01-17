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
    TypeDefinitions
} from '../ClassDescription';
import M, { ML } from '../M';
import CodeDiv from '../Code';

function ClassNWindow() {

    let className = "NWindow";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name="NWindow" baseClass="NContainerElement">
                <p><M>NWindow</M> is the base class for all other window classes in NWindows.
                    It is the type of window you will use most often. It can be either a root-level window
                    or a child window, depending on how it is constructed.
                </p>
                <p>
                    NWindows also provides <ML name="NPopupWindow" />, which is a subclass of <M>NWindow</M> that
                    positions itself relative to an anchor rectangle; and <ML name="NPopupMenuWindow" /> which is a subclass of
                    <M>NPopupWindow</M> that implements popup menus.
                </p>
                <p><M>NWindow</M>s are created by calling one of the several static <M>create</M> methods, each of
                    which returns an <M>NWindow::ptr</M> (convenient short-hand for
                    a <M>std::shared_ptr&lt;NWindow&gt;</M>). <M>NWindow</M>'s actual
                    constructor is protected. <M>NWindow</M>s can only exists in <M>NWindow::ptr</M>s.
                </p>
                <p>Note that allow <M>NWindow</M> inherits from <ML name="NContainerElement" />, but can, in fact, only contain
                    one child element, and will throw an error if you attempt to a second child.
                </p>
                <TypeDefinitions>
                    <UsingDescription indexName={"NWindow::super"} declaration="using super = NContainerElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NWindow::self"} declaration="using self = NWindow;" >
                    </UsingDescription>
                    <UsingDescription indexName="NWindow::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>

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
                        <CodeDiv text={`...
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
                </PropertyList>
                <MethodDescriptions title="Methods Required to Display and Run an NWindow" >
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
                </MethodDescriptions>
                <MethodDescriptions title="Protected Methods">
                    <MethodDescription indexName="void NWindow::add_child_window(NWindow::ptr child)"
                        method={`void add_child_window(NWindow::ptr child);`
                        }>
                        <p>Adds a child window to the current window. Child windows are always modal, and block
                            input to the parent window until they are closed. Child windows are typically used to create
                            dialogs, but can be used for other purposes as well. Child windows can have child windows of their own.
                        </p>
                    </MethodDescription>
                    <MethodDescription indexName="void NWindow::add_to_parent_window(NWindow::ptr parent)"
                        method={`void add_to_parent_window(NWindow::ptr parent);`
                        }>
                        <p>Used in the create methods of classed derived from <M>NWindow</M>. See <ML target="NWindow::NWindow" name="NWindow::NWindow()"   /> for details.</p> 
                    </MethodDescription>
                </MethodDescriptions>

            </ClassDescription>
        </DocsPage>
    );
    /*
    class NWindow : public NContainerElement
    {
    public:
        using ptr = std::shared_ptr<NWindow>;
    protected:

        friend class NPopupWindow;
        friend class NPopupWindow;

        NWindow(
            int x, int y, int width, int height,
            NColorPalette* color_palette = nullptr);


        void add_child_window(NWindow::ptr child);
        void add_to_parent_window(NWindow::ptr parent)
        {
            parent->add_child_window(shared_from_this<NWindow>());
        }

        static ptr create_(
            NWindow::ptr parentWindow,
            int x,
            int y,
            int width,
            int height,
            NColorPalette* color_palette = nullptr);


    public:

        // same locale string as std::setlocale
        static void set_locale(const std::string& locale);
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


        virtual void add_child(const NElement::ptr& child) override;
        virtual void add_child(NElement::ptr&& child) override;


        std::string title() const { return title_; }
        void title(const std::string& title);

        const NRect& actual_window_position() const { return actual_window_position_; }


        const NRect& window_position() const { return window_position_; }
        void window_position(const NRect& value) {
            window_position_ = value;
            width(value.width);
            height(value.height);
        }

        void refresh()
        {
            wrefresh(curses_window_);
        }

        bool has_colors() const { return has_colors_; }
        int max_colors() const { return max_colors_; }
        int max_color_pairs() const { return max_color_pairs_; }

        // color is 0xRRGGBB
        NColor make_color(uint32_t rrggbb);


        NColorPair make_color_pair(uint32_t rrggbbFg, uint32_t rrggbbBg);
        NColorPair make_color_pair(NColor foreground, NColor background);


        void set_attributes(NAttribute attribute, short colorPair = -1);

        void clear_attributes()
        {
            //set_attributes(AttributeT::Normal, defaultColorPair);
        }


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
        void handle_button_pressed(int x, int y, int button, NMouseEventArgs& event_args);
        void handle_button_released(int x, int y, int button, NMouseEventArgs& event_args);


        NEvent<void(NElement::ptr focusElement)> on_focus_changed;

        bool focus(NElement::ptr element);
        NElement::ptr focus() { return focus_.lock(); };

        void navigate_focus(NNavDirection direction);
        void navigate_focus(int x, int y, NNavDirection direction);


        using clock_t = std::chrono::steady_clock;


        PostHandle post(
            NWindow::clock_t::duration delay,
            std::function<void(void)>&& fn);

        PostHandle post(
            NWindow::clock_t::time_point when,
            std::function<void(void)>&& fn);

        PostHandle post(std::function<void(void)>&& fn);


        bool cancel_post(PostHandle handle);

        void quit()
        {
            get_root_window()->close();
        }

        void run();

        void mouse_capture(NElement* element);
        NElement::ptr mouse_capture() const { return mouse_capture_.lock(); }
        void mouse_capture_release() { mouse_capture(nullptr); }
        // release mouse capture if the specified element is the current mouse capture.
        void mouse_capture_release(NElement* element);

        const NColorPalette& color_palette() const { return *color_palette_; }
        void color_palette(const NColorPalette& color_palette);
        void color_palette(std::shared_ptr<NColorPalette> color_palette);

        virtual void close();
        bool is_active_window() { return active_window_ == this; }
        NWindow* get_active_window() { return active_window_; }

        NEvent<void(NWindow::ptr source, bool activated)> on_is_active_changed;


        bool for_each_child_window(const std::function<bool(NWindow*)>& fn);
        void for_each_child_window(const std::function<void(NWindow*)>& fn);

        void for_each_child_window_parent_first(const std::function<void(NWindow*)>& fn);

        NWindow* find_child_window(const std::function<bool(NWindow*)>& condition_fn);

        void set_clipboard_text(const std::string& text);
        std::string get_clipboard_text();

        void move_window(int dx, int dy);

        const NRect& window_bounds() const { return actual_window_position_; }

        UnicodeServices& unicode_services();
        Collator& collator();
        UnicodeNormalizer& unicode_normalizer();
        const UnicodeNormalizer& unicode_normalizer() const;

        std::string normalize_utf8(const std::string& text) const;
        std::string decompose_utf8(const std::string& text) const;
    protected:
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
