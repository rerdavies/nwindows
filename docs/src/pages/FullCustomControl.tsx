import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import M from '../M';
import ClassDescription, { MethodDescription } from '../ClassDescription';
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
            <MethodDescription method={`virtual void handle_attached(NWindow* window);
virtual void handle_detach();
`} />
            <p>along with their corresponding observable events</p>
            <MethodDescription method={`NEvent<void(NWindow*)> on_attach;
NEvent<void(void)> void on_detach;
`} />


            <p>When an <M>NElement</M> is attached to an <M>NWindow</M>, <M>handle_attached</M> is called,
                which then fires an <M>on_attached</M> event. And when it is detached from an <M>MWindow</M>, <M>handle_on_detached</M> is
                called, which then fires the <M>on_detached</M> event. If you override these methods, make sure you call the superclass's
                implementation, since the events are fired in <M>NElement::handle_attached</M> and <M>Nelement::handle_detached</M>.
            </p><p>Elements are attached to an <M>NWindow</M> either during creation of their parent <M>NWindow</M>, or because they, or
                one of their parents have been added to a live visual tree using <M>NContainerElement::add_child</M>. A window can be detached either because the element, or one of its parent
                elements has been removed from a live visual tree, or because it's parent <M>NWindow</M> is closing.</p>
            <p>Note that because <M>NElement</M>s are reference counted <M>std::shared_ptr</M>s, elements will not be deleted until
                all references to them are released. As a result, when and where <M>NElements</M> in the visual tree are deleted may be a bit unpredictable. The most
                common scenario where this comes into play when firing events, which studiously take <M>shared_ptr</M> references on participating
                elements while firing the event. This is done so that event handlers have to worry much less about use-after-free problems when
                closing windows, or making structural changes to the visual tree. <M>handle_attach</M> and <M>handle_detach</M>, on the other
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
    NTextElement::ptr textElement = find_element_by_id("text_control");
    NElement::ptr thisElement = this->shared_from_this();

    this->on_mouse_move.subscribe(
        [thisElement](int button, NMouseMoveEvent& event_args) mutable {
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

            <SectionHead text='Layout' />
            <p>Layout is performed in the main event loop. Elements can request a new layout pass by
                calling <M>NElement::invalidate_layout()</M> which sets a flag in the
                element's parent <M>NWindow</M> (if it has one), asking the window to perform a layout pass for all components
                in the visual tree once control returns to the main event loop. Layout is not performed immediately. Multiple calls
                to  <M>invalidate_layout</M> are therefore coalesced, and result in one and only one layout pass.
            </p>
            <p>To participate in layout, a custom element will have to override and implement two methods:</p>
            <MethodDescription method={`virtual NSize measure(const NSize& available);
virtual void arrange(const NRect& bounds);`} />
            <p>These methods are called during the layout pass. <M>measure</M> is called first, and <M>arrange</M> is called
                after all elements have been measured. <M>measure</M> should return the size that the element would like to be,
                given the available space. <M>arrange</M> should position and size the element and its children.</p>
            <p>When implementing <M>measure</M> and <M>arrange</M>, the element should not change its state or the state of any of
                its child elements. If an element absolutely
                must change it's state during a layout pass, it may call <M>NElement::invalidate_layout()</M>, after which the
                current layout pass will complete, and layout will be restarted once control returns to the event loop.
                However, calling <M>NElement::invalidate_layout</M> during a layout pass is strongly discouraged, as it may lead
                to unexpected performance problems.
            </p>
            <p>Implementing <M>measure</M> for elements that don't have children is fairly straightforward. It should look
                something like this:</p>
            <CodeFragment2 white text={`NSize measure(const NSize& available) {
    NSize result = { measure_text(this->text()), 1 };
    if (width() != AUTO_SIZE)
    {
        result.width = width();
    }
    if (available.width != AUTO_SIZE && result.width > available.width)
    {
        result.width = available.width;
    }
    if (result.width < 0)
    {
        result.width = 0;
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
            <CodeFragment2 white text={`NSize NVerticalStackElement::measure(const NSize& available)
{
    NSize constrainedWidth = { available.width, std::numeric_limits<int>::max() };
    int height = 0;
    int width = 0;

    for (auto& child : children())
    {
        auto childSize = measure_child_with_margins(constrainedWidth, child);
        child->measured(childSize);
        height += childSize.height;
        width = std::max(width, childSize.width);
    }
    if (children().size() > 1)
    {
        height += (int)(children().size() - 1) * row_gap_;
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
            <CodeFragment2 white text={`void NVerticalStackElement::arrange(const NRect& rect)
{
    NElement::arrange(rect);
    int y = rect.y;

    for (auto& child : children())
    {
        NSize measured = child->measured();
        NRect childRect{ 0,y,measured.width,measured.height };
        childRect = childRect.intersect(rect);
        switch (alignment_)
        {
        case NAlignment::Start:
            childRect.x = rect.x;
            break;
        case NAlignment::Center:
            childRect.x = rect.x + (rect.width - measured.width) / 2;
            break;
        case NAlignment::Justify:
            childRect.x = rect.x;
            childRect.width = rect.width;
            break;
        case NAlignment::End:
            childRect.x = rect.right() - measured.width;
            break;
        }
        if (childRect.x < 0)
        {
            childRect.x = 0;
        }
        childRect = childRect.inset(child->margin());
        child->arrange(childRect);
        y += measured.height + row_gap_;
    }
}
`} />

            <SectionHead text='Rendering' />
            <p>An element can request that its contents be re-rendered by calling <M>NElement::invalidate_render()</M>.
                Rendering does not occur immediately; instead, a flag is set that will cause a render pass once control
                returns to the main event loop.
                Calling <M>invalidate_render</M> more than once is harmless as all requests will be batched into a single
                render pass. Calling <M>NElement::invalidate_render()</M> also invalidates the rendering of all child
                elements, causing them to be redrawn as well on the next render pass.</p>
            <p>To participate in rendering, a custom element will have to override and implement the following method:</p>
            <MethodDescription method={`virtual void render() {}`} />
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
            <ClassDescription className="NElement">
                <MethodDescription method={
                    `void move(int x, int y);`} >
                    <p>Move the cursor to the specified location. Coordinate are in element space &mdash; (0,0) is located
                        at the top-left corner of the element, inside its margins.
                    </p>
                </MethodDescription>
                <MethodDescription method={
                    `int measure_text(const std::string&text);`} >
                    <p>Returns the number columns on the display terminal by which the cursor would advance if the
                        string were printed. The character encoding of the string is assumed to be UTF-8. Individual
                        Unicode characters may occupy zero, one or two columns on the display terminal. "😄" and "字" are
                        examples of characters that occupy two columns on the display terminal. Unicode composing accents
                        are examples of characters that occupy zero columns on the display terminal. The return value takes 
                        all of these factors into account.
                    </p>
                </MethodDescription>


                <MethodDescription method={
                    `void print(const char* text);
void print(const std::string& text);`} >
                    <p>Print text at the current cursor position, advancing the cursor by the number of columns that <M>measure_text</M> would
                        return. Individual characters are mapped by NWindows to characters actually supported by the display terminal. xterm-like
                        terminals typically support almost all Unicode characters. Raw text-mode terminals will typically support only a small
                        subset. Unprintable characters are translated to the appropriate "missing character" glyph for the current display terminal.
                    </p>
                    <p>Individual text </p>
                </MethodDescription>

                <MethodDescription method={
                    `void print(const std::string& text, int width);`} >
                    <p>Print text at the current cursor position. <M>width</M> specifies the maximum length of text to display &mdash; more
                        specifically, the maximum number of columns the cursor can be advanced. Anything extra is discarded. Text is not
                        padded if it is shorter than the specified width. Note that individual Unicode characters may occupy zero, one or
                        two columns on screen, so the unit for width is has nothing to do with the <M>length()</M> of the string, or even
                        the number of UTF-8 characters in the string.
                    </p>
                </MethodDescription>

                <MethodDescription method={
                    `void box(
    const NRect &rect, 
    const std::optional<NColorPair>& colorPair = std::nullopt);`} >
                    <p>Display a box on screen. Line drawing characters will be used if they are available on the current display terminal; otherwise
                        NWindows will fall back to drawing boxes with ASCII characters. The optional <M>colorPair</M> argument specifies the
                        color pair to use when drawing the box.
                    </p>
                </MethodDescription>

                <MethodDescription method={
                    `void horizontal_line(int x, int y, int width);
void vertical_line(int x, int y, int height);`} >
                    <p>Draw a vertical or horizontal line at the specified location. Coordinates are element coordinates. Uses line-drawing characters
                        if availalbe, and falls back to ASCII rendering otherwise.
                    </p>
                </MethodDescription>

                <MethodDescription method={
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

                <MethodDescription method={
                    `int measure_menu_item(const std::string& text);`} >
                    <p>In menu item text, the '_' character indicates that the character which follows is a shortcut key.</p>
                    <p>Returns the number of columns that the menu item would occupy on the display terminal if it were printed.
                        The same as <M>measure_text</M>, but with special handling for the '_' character.</p>
                    int measure_menu_item(const std::string& text);
                </MethodDescription>
                <MethodDescription method={
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
                    <p><M>width</M> specifies the number of columns to write to the screen. If the measure of the text
                        is less than width, the displayed text will be padded with spaces. If the measure of the text is
                        greater than <M>width</M>, displayed text will be truncated.
                        <p>If <M>alignment</M> is specified, padding will be applied as required to align the text at the
                            start, center or end of the specified <M>width</M>.</p>
                    </p>
                </MethodDescription>

                <MethodDescription method={
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
                    Unicode codepoint (which many consist of multiple UTF-8 encoded bytes) </p>
                </MethodDescription>
                <MethodDescription method={
                    `void attribute_on(NAttribute attr);
void attribute_off(NAttribute attr);
`} >
                    <p>Turn the specified attribute on or off. Attributes are used to change the appearance of text.
                        The following attributes are supported:</p>
                    <p>If you turn an attribute on, you <i>must</i> turn it off before you return from <M>render()</M>.</p>
                </MethodDescription>
                <MethodDescription method={
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
