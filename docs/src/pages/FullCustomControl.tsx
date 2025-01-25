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
import M from '../M';
import ClassDescription, { MethodDescription, EventDescription, EnumDefinitionList, EnumDescription } from '../ClassDescription';
import SectionHead from '../SectionHead';
import Code, { CodeFragment2 } from '../Code';


function FullCustomControl() {
    return (
        <DocsPage route="/using/custom/full">


            <h1>{DocsTitle("/using/custom/full")}</h1>
            <p>A slightly more complicated option is to implement a full custom element from scratch. This section
                covers what you need to know in order to write a custom NWindows element.</p>
            <SectionHead text='Lifecycles' />
            <p><M>NElement</M>s really only have one lifecycle state (other than construction and deletion). They are either attached to
                an <M>NWindow</M> or they are not.</p>
            <p><M>NElement</M> provides the following methods to deal with this.</p>
            <MethodDescription
                indexName={[
                    "void NElement::handle_attached(NWindow* window)",
                    "void NElement::handle_detaching()"
                ]}
                method={`virtual void handle_attached(NWindow* window);
virtual void handle_detaching();
`} />
            <p>along with their corresponding observable events</p>
            <EventDescription
                indexName={[
                    "NEvent<void(NWindow*)> NElement::on_attached",
                    "NEvent<void(void)> void NElement::on_detaching"

                ]}
                event={`NEvent<void(NWindow*)> on_attached;
NEvent<void(void)> void on_detaching;
`} />


            <p>When an <M>NElement</M> is attached to an <M>NWindow</M>, <M>handle_attached</M> is called,
                which then fires an <M>on_attached</M> event. And when it is detached from an <M>MWindow</M>, <M>handle_on_detaching</M> is
                called, which then fires the <M>on_detaching</M> event. If you override these methods, make sure you call the superclass's
                implementation, since the events are fired in <M>NElement::handle_attached</M> and <M>Nelement::handle_detached</M>.
            </p><p>Elements are attached to an <M>NWindow</M> either during creation of their parent <M>NWindow</M>, or because they, or
                one of their parents have been added to a live visual tree using <M>NContainerElement::add_child</M>. A window can be detached either because the element, or one of its parent
                elements has been removed from a live visual tree, or because it's parent <M>NWindow</M> is closing.</p>
            <p>Note that because <M>NElement</M>s are reference counted <M>std::shared_ptr</M>s, elements will not be deleted until
                all references to them are released. As a result, when and where <M>NElements</M> in the visual tree are deleted may be a bit unpredictable. The most
                common scenario where this comes into play when firing events, which studiously take <M>shared_ptr</M> references on participating
                elements while firing the event. This is done so that event handlers have to worry much less about use-after-free problems when
                closing windows, or making structural changes to the visual tree. <M>handle_attach</M> and <M>handle_detaching</M>, on the other
                hand, are entirely predictable. The are called immediately during processing of an <M>add_child</M> or <M>remove_child</M> call,
                or during creation of an element's parent window, or during processing of an <M>NWindow::close</M> call.
            </p>
            <p>A custom element does not have direct access to an <M>NWindow</M> until a window has been attached to it. If
                your element needs access to <M>NWindows</M> properties or methods, such as <M>NWindow::make_color_Pair</M>, or
                <M>NWindow::is_unicode_locale()</M> (whether the display terminal provides full Unicode support) it
                will won't be able to do so in the constructor. <M>NElement::window()</M> will return a null pointer before
                a window is attached, and after the window is detached. Thus, <M>handle_attached</M> provides the first
                opportunity for an element to get access to an <M>NWindow</M> and its properties and methods.</p>
            <p>If you implement either of these methods, make sure you call the superclass's implementation in yours, since the superclass
                may also need to perform work when attaching or detaching.</p>
            <p>If you subscribe to an <M>NWindow</M> event, you should add your event subscription in <M>on_attach</M> and
                unsubscribe in <M>on_detach</M>, because your element's event handlers should not outlive your element.</p>

            <SectionHead text="Circular shared_ptr References in Event Handlers" />
            <p>This is probably a good point at which to bring up the problem of circular <M>shared_ptr</M> references in <M>NWindows</M>. Oddly,
                circular reference chains hardly ever come up when not using custom controls. During ordinary use, most circular reference chains
                are broken in <M>NWindow::close</M> when <M>NWindow</M>s remove all their child elements. This is not always the case when
                writing custom elements.</p>
            <p>The core issue is that if <M>NElement</M> implementations hold a <M>shared_ptr</M> that creates a circular chain of <M>shared_ptr</M>
                references, reference counts on the <M>shared_ptr</M> will never go to zero, and a a result, none of the
                participating objects will ever get deleted.</p>
            <p>This issue becomes particular perilous when capturing references to elements in event handler lambdas. The following
                somewhat contrived example illustrates the issue:
            </p>
            <CodeFragment2 white text={`/* DO NOT DO THIS! */
virtual void on_attach(NWindow*) override {
    super:on_attach();
    NWindow::ptr window = this->window();
    // find on of our child elements.
    NTextElement::ptr textElement = get_element_by_id<NTextElement>("text_control");
    NElement::ptr thisElement = this->shared_from_this();

    this->on_mouse_move.subscribe(
        [thisElement,textElement](NMouseButton button, NMouseMoveEvent& event_args) mutable {
            /* DO SOMETHING */
        }
    
    );
}`} />
            <p>This code creates a chain of <M>shared_ptr</M> reference that will prevent the element from ever getting deleted.
                The problem arises because of the capture of <M>thisPtr</M> in the lambda. The lambda captures a shared_ptr by value,
                and the captured variable is stored within generated lambda, which is then moved into the list of event handlers
                for <M>on_mouse_move</M>, where it persists until the event handler is removed. So this code generates a circular reference
                where the <M>thisElement</M> holds a circular reference to the element itself.
            </p>
            <p>There are several easy solutions, any of which would solve the problem:</p>
            <ul>
                <li>Use a weak pointer instead of a shared pointer in the lambda capture. This prevents the prevents the circular reference chain from forming in the first place.</li>
                <li>Capture the reference using a naked pointer. instead of a shared pointer to the element. This is a good solution
                    if the element doesn't need to be kept alive, and if the lifetime of the element to which the event handler is added
                    is well known, and understood.</li>
                <li>Use a shared pointer to the element, but remove the event handler in <M>on_detach</M> (which you should do anyway, honestly).
                </li>
            </ul>
            <p>Obviously, this is a very contrived example. But the issue may occur in more subtle and less obvious situations where a
                capture variable references a parent of the element that owns the event handler, or when capturing a shared pointer to
                a parent <M>NWindow</M>. In order to avoid difficult-to-detect memory leaks, it is therefore best practice to
                capture weak pointers in event handlers, and to remove event handlers in <M>on_detach</M>.
            </p>
            <p>To be honest, this may be a purely theoretical concern. It is infuriatingly difficult to come up with a sensible
                example of a circular reference chain that actually causes a problem in practice. In actual practice, circular reference
                probably get broken by removing event handlers in <M>on_detach</M> or when closing <M>NWindow</M>s release their visual
                tree. And are further prevented by the fact that you cannot call <M>shared_from_this</M> in a constructor because an object
                that is being constructed has not yet been made into a shared_ptr (you will get a runtime exception if you try to do so).
                However, I am unable to convince myself that the problem will <i>never</i> occur, and so I bring it up here.
            </p>
            <p>
                In short, capturing <M>shared_ptr</M>'s in event handler lambdas
                seems perilous, and I think you should avoid it if you can.
            </p>
            <SectionHead text='Parent Classes for Custom Controls' />
            <p>Simple classes can inherit directly from <M>NElement</M>. If your custom element wants child elements,
                it should instead inherit from <M>NContainerItemElement</M>. If your custom control will be clickable,
                it's probably best to inherit from <M>NButtonBaseElement</M>, which provides a starting point for
                dealing with mouse clicks, and rendering of hover, pressed, and focus states.</p>

            <SectionHead text='Layout' id="section__Layout" />
            <p>Layout is performed in the main event loop. Elements can request a new layout pass by
                calling <M>NElement::invalidate_layout()</M> which sets a flag in the
                element's parent <M>NWindow</M> (if it has one), asking the window to perform a layout pass for all components
                in the visual tree once control returns to the main event loop. Layout is not performed immediately. Multiple calls
                to  <M>invalidate_layout</M> are therefore coalesced, and result in one and only one layout pass.
            </p>
            <p>To participate in layout, a custom element will have to override and implement two methods:</p>
            <MethodDescription
                indexName={"NSize NElement::measure(const NSize& available)"}
                method={`virtual NSize measure(const NSize& available);
virtual void arrange(const NRect& bounds);`} />

            <p>These methods are called during the layout pass of the element tree. The layout pass occurs in two phases.
                During the measure phase, <M>measure</M> is called to determine the desired size of each element in the tree.
                Once sizes are determined, <M>arrange</M> is called on each element in the visual tree to determine the final
                position of each element.</p>
            <p>When measuring, either or both of <M>available.width</M> and <M>available.height</M> may be set to <M>AUTO_SIZE</M>.
                if that's the case, implementations of <M>measure</M> should return a width or height that reflects the desired size
                of the element if it were unconstrained. The width and height of the returned value of <M>measure</M> must <i>not</i> be
                <M>AUTO_SIZE</M>, and must not be less than zero. Container elements are responsible for calling <M>measure</M> on
                each of their child elements, with available space appropriately adjusted. The <M>available</M> argument contains
                the space available to the element with margins already applied. <M>NContainerElement</M> implementations of <M>measure</M>
                must deal with margins of their child elements by subtracting the margins of the child from the space available to the
                child before calling the child's arrange method, and then adding the child's margins back onto the value return from
                the child's <M>measure</M> method. <M>NContainerElement</M> provides a <M>measure_child_with_margins</M> method
                to subtract and re-add a child's margins when measuring.</p>

            <p>The <M>arrange</M> method
                is called on each element in the visual tree, starting at the root and working in toward the
                leaves. <M>NContainerElement</M>s are responsible for calling <M>arrange</M> on each of their
                children. The <M>bounds</M> argument has margins already applied, and determines the final layout position
                of the client area of the element. The <M>bounds</M> argument is in window coordinates &mdash; (0,0) is at the top-left
                corner of the owning <M>NWindow</M>. <M>NContainerElement</M> implementations of <M>arrange</M> are expected to arrange their
                children within those bounds as they sees fit. Container implementations of <M>arrange </M> are responsible for
                subtracting the margins of child elements before calling <M>arrange</M> on the child element. The bounds argument of
                each call to a child's <M>arrange</M> method must be contained entirely within the bounds argument of the container element.
                If the child doesn't fit at all, it the width and height of the bounds argument supplied to the child should be
                set to zero. Implementations of <M>arrange</M> must call the <M>arrange</M> method of their superclass,
                since <M>NElement::arrange</M> sets private properties that control the position of the element when rendering.
            </p>
            <p>When calling <M>measure</M> on a child element, container implementations of <M>measure</M> may set the <M>NElement::measured</M>
                property of child elements to the result return by the <M>measure</M> call so that the measured result can be retrieved in their <M>arrange</M> implementation.
                reserved specifically for this use, and no other.
            </p>

            <p>When implementing <M>measure</M> and <M>arrange</M>, the element should not change its state or the state of any of
                its child elements. If an element absolutely must change it's state during a layout pass, it may call <M>NElement::invalidate_layout()</M>, after which the
                current layout pass will complete, and layout will be restarted once control returns to the event loop.
                However, calling <M>NElement::invalidate_layout</M> during a layout pass is strongly discouraged, as it may lead
                to unexpected performance problems, or even infinite loops in the layout pass.
            </p>
            <p>Implementing <M>measure</M> for elements that don't have children is fairly straightforward. It should look
                something like this:</p>
            <Code text={`NSize measure(const NSize& available) {
    NSize result = { 
        measure_text(this->text()), 1 
    };
    if (width() != AUTO_SIZE)
    {
        result.width = width();
    }
    if (available.width != AUTO_SIZE 
        && result.width > available.width)
    {
        result.width = available.width;
    }
    if (result.width < 0)
    {
        result.width = 0;
    }
    if (available.height != AUTO_SIZE 
        && available.height < result.height)
    {
        result.height = available.height;
    }    
    return result;
}`} />
            <p>The only thing worth noting here is the use of the method <M>NElement::measure_text</M>. The size
                that <M>measure</M> returns is in screen coordinates. <M>measure_text</M> takes care of a lot of details:
                interpreting UTF-8 characters, dealing with double-width display characters (some Unicode characters
                occupy two character cells on terminal output devices), and composing of accents which can't always be
                composed into a single character. Don't
                make the mistake of just using string lengths to measure text; always use <M>measure_text</M>. <M>measure_text</M>
                will be discussed more in the rendering section that follows.</p>

            <p>Measuring elements that have children is a bit more complicated. The actual code for <M>NVerticalStackElement::measure</M> serves as a good example of
                how <M>measure</M> should be implemented.</p>
            <Code text={`NSize measure(const NSize& available)
{
    NSize constrainedWidth = { 
        available.width, 
        std::numeric_limits<int>::max() 
    };
    int height = 0;
    int width = 0;

    for (auto& child : children())
    {
        auto childSize 
            = measure_child_with_margins(
                constrainedWidth, child);
        child->measured(childSize);
        height += childSize.height;
        width = std::max(width, childSize.width);
    }
    if (children().size() > 1)
    {
        height += 
            (int)(children().size() - 1) 
            * row_gap_;
    }
    if (this->width() != AUTO_SIZE)
    {
        width = this->width();
    }
    if (this->height() != AUTO_SIZE)
    {
        height = this->height();
    }
    return NSize(width, height);
}
`} />
            <p>There are two things that particularly bear mentioning. Elements that are containers are responsible for handling margins of their
                children. <M>NVerticalStackElement</M> does this by using the method <M>NContainerElement::measure_child_with_margins</M>. This
                method subtracts the child's margins from the available space before calling <M>child-measure(...)</M>, and adds the margins
                to the size that the child returns, returning an <M>NSize</M> that includes the child's margins. The implementation
                also calls <M>child-&gt;measured(childSize)</M> to store the size that the child returned. This is important because it
                allows subsequent <M>arrange</M> methods to find out what sizes it's children wanted if required.</p>
            <p>Implementations of measure <i>must</i> call NElement::measure on all of their child elements and must set
                the <M>measured</M> property on all of their child elements, whether they actually need to know the
                width of child elements or not. <M>NSize</M>s that are returned by children are an expression of
                what size the child would like to be. <M>NContainerElement</M>s can and will decide to arrange
                children with a size other than what the child originally wanted.</p>
            <p>Once all children have been measured, the controlling <M>NWindow</M> will arrange child elements by
                calling <M>NElement::arrange</M> on each child in the visual tree.</p>
            <p>Custom controls without children must just accept the bounds they are given by calling their superclass's <M>arrange</M>
                method, which will set the element's <M>bounds()</M> property, which is used to position the control during rendering.
                Usually, elements without children will not need to override <M>arrange</M> at all.</p>
            <p>Elements with children, however, must override <M>arrange</M> and call <M>arrange</M> on each of their child elements
                in order to establish the position at which child elements will be rendered.</p>
            <p>the <M>bounds</M> argument provided to <M>arrange</M> is final position of the element in window coordinates with
                margins excluded &mdash; (0,0) is at the top-left corner of the owning <M>NWindow</M>.</p>
            <p>The actual code for <M>NVerticalStackElement</M> serves as a good example of what an implementation
                of <M>arrange</M> should look like.</p>
            <Code text={`void arrange(const NRect& rect)
{
    NElement::arrange(rect);
    int y = rect.y;

    for (auto& child : children())
    {
        NSize measured = child->measured();
        NRect childRect{ 
            0,y,
            measured.width,measured.height };
        childRect = childRect.intersect(rect);
        switch (alignment_)
        {
        case NAlignment::Start:
            childRect.x = rect.x;
            break;
        case NAlignment::Center:
            childRect.x = rect.x 
                + (rect.width - measured.width) / 2;
            break;
        case NAlignment::Justify:
            childRect.x = rect.x;
            childRect.width = rect.width;
            break;
        case NAlignment::End:
            childRect.x = rect.right() 
                          - measured.width;
            break;
        }
        if (childRect.x < 0)
        {
            childRect.x = 0;
        }
        childRect = childRect.inset(
            child->margin()
        );
        child->arrange(childRect);
        y += measured.height + row_gap_;
    }
}
`} />

            <SectionHead text='Rendering' id="section__Rendering" />
            <p>An element can request that its contents be re-rendered by calling <M>NElement::invalidate_render()</M>.
                Rendering does not occur immediately; instead, a flag is set that will cause a render pass once control
                returns to the main event loop.
                Calling <M>invalidate_render</M> more than once is harmless as all requests will be batched into a single
                render pass. Calling <M>NElement::invalidate_render()</M> also invalidates the rendering of all child
                elements, causing them to be redrawn as well on the next render pass.</p>
            <p>To participate in rendering, a custom element will have to override and implement the following method:</p>
            <MethodDescription
                indexName="void render()"
                method={`virtual void render()`} />
            <p>The <M>render</M> method should render content specific to the element itself. <M>NWindow</M> will take care of
                walking the visual tree and
                calling the <M>render</M> method of child elements. Note that <M>render()</M> will only be called if the
                rendering of the element has been invalidated by a previous call to <M>invalidate_render</M>. Calling <M>invalidate_layout</M>
                also invalidates the rendering of all element in the visual tree. Controls that are concerned only with
                layout need not override <M>render</M> at all, if they have nothing to render.
            </p>
            <p><M>NElement</M> provides the following methods for drawing content on the screen. Coordinates, when specified, are
                in element coordinates &mdash; (0,0) is at the top-left corner of the element, inside its margins.
            </p>
            <ClassDescription name="NElement">
                <MethodDescription
                    indexName={"void NElement::move(int x, int y)"}
                    method={
                        `void move(int x, int y);`} >
                    <p>Move the cursor to the specified location. Coordinate are in element space &mdash; (0,0) is located
                        at the top-left corner of the element, inside its margins.
                    </p>
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
                </MethodDescription>


                <MethodDescription
                    indexName={[
                        "void NElement::print(const char* text)",
                        "void NElement::print(const std::string& text)"
                    ]}
                    method={
                        `void print(const char* text);
void print(const std::string& text);`} >
                    <p>Print text at the current cursor position, advancing the cursor by the number of columns that <M>measure_text</M> would
                        return. Individual characters are mapped by NWindows to characters actually supported by the display terminal. xterm-like
                        terminals typically support almost all Unicode characters. Raw text-mode terminals will typically support only a small
                        subset. Unprintable characters are translated to the appropriate "missing character" glyph for the current display terminal.
                    </p>
                    <p>Individual text </p>
                </MethodDescription>

                <MethodDescription
                    indexName={"void NElement::print(const std::string& text, int width)"}
                    method={
                        `void print(const std::string& text, int width);`} >
                    <p>Print text at the current cursor position. <M>width</M> specifies the maximum length of text to display &mdash; more
                        specifically, the maximum number of columns the cursor can be advanced. Anything extra is discarded. Text is not
                        padded if it is shorter than the specified width. Note that individual Unicode characters may occupy zero, one or
                        two columns on screen, so the unit for width is has nothing to do with the <M>length()</M> of the string, or even
                        the number of UTF-8 characters in the string.
                    </p>
                </MethodDescription>

                <MethodDescription
                    indexName={"void NElement::print(const std::string& text, NAlignment alignment, int width)"}
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

                <MethodDescription
                    indexName={"void NElement::print_acs(int x, int y, int acs_character)"}
                    method={
                        `void print_acs(int x, int y, int acs_character);`} >
                    <p>Print a character from the <M>ncurses</M> alternate character set. Typically, these are box drawing characters. For example,
                        the following code displays the top-left corner of a box:
                    </p>
                    <Code text={`print_acs(0,0,ACS_ULCORNER);`} />
                    <p>see the ACS_* literals in <M>ncurses.h</M> for a complete lists of alternate-character-set characters.</p>
                    <p>Prefer this method for ACS line-drawing characters, because <M>ncurses</M> provides fallback
                        behavior for terminal devices that don't have line-drawing characters.
                        Prefer <M>print()</M> using Unicode characters otherwise.</p>
                </MethodDescription>

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
                        the value of <M>show_underline</M>.</p>
                    <p><M>max_display_width</M> specifies the maximum number of display columns of text to write to the screen.
                        If the measure of the text is less than width, the displayed text will be padded with spaces. If the measure of the text is
                        greater than <M>width</M>, displayed text will be truncated.
                    </p>
                    <p>If <M>alignment</M> is specified, padding will be applied as required to align the text at the
                        start, center or end of the specified <M>display_width</M>. If <M>text</M> requires more than <M>display_width</M> columns,
                        the text will be truncated when displayed.</p>
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
                    <p>If <M>utf8key</M> is supplied as an argument, the string must contain a single
                        currently Unicode codepoint (which may consist of multiple UTF-8 encoded bytes) </p>
                    <p>The recommended implementation for custom elements that wish to handle shortcut keys is to
                        override <M>NElement::wants_shortcut_key</M>, which provides  a <M>std::string</M> instead of intercepting
                        keyboard events and using the <M>char32_t</M> key provided in the keyboard event arguments. Future versions of
                        <M>NWindows</M> may allow a single Unicode character followed by a possible modifier sequence or composing-accent
                        sequence, depending on actual internationalization requirements. Please log a problem report if you need this
                        feature.</p>
                </MethodDescription>

                <MethodDescription indexName={["virtual bool NElement::wants_shortcut_key(const std::string& key)"]}
                    method={`virtual bool wants_shortcut_key(const std::string& key);`} >
                    <p>An element can override this method in order to handle shortcut keys.  Return <M>true</M> to have the parent <M>NWindow</M> fire a
                        synthetic <M>on_click</M> event on the element. The default <M>NElement</M>implementation
                        returns false.
                    </p>
                    <p>The following conditions must be true to get Nwindows to call this method.</p>
                    <ul>
                        <   li>The element's parent window must be the currently-active window. </li>
                        <li>The element, or one of its children must have the current keyboard focus.</li>
                        <li>The element's <M>clickable</M> property must be true.</li>
                        <li>The element's <M>enabled</M> property must be true.</li>
                    </ul>
                    <p>The provided <M>key</M> currently contains the UTF-8 byte sequence for a single Unicode codepoint. However,
                        future versions of <M>NWindows</M> may provide a single codepoint followed by a Unicode modifier sequence or
                        combining-accent sequence should that prove to be necessary to properly support international locales. Please file a problem
                        report if you require this feature. </p>
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



            </ClassDescription>



        </DocsPage>

    );
}

export default FullCustomControl;
