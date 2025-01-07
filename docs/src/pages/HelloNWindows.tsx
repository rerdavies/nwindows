import CenteredImage from '../CenteredImage';
import Code from '../Code';
import DocsPage from '../DocsPage';
import M from '../M';
import Name from '../Name';



function UsingNWindows() {
    return (
        <DocsPage route="/using/hello">
            <div>
                <h1>3.1 - Hello NWindows - General Principles</h1>
                <p>
                    This section describes how to create a simple NWindows program that displays
                    a window with a button that closes the window when clicked.
                    Along the way, it discusses important general principles that apply to NWindows
                    programming in general.
                </p>
                <p>
                    As a starting point, here is the <Name>NWindows</Name> Hello World program:
                </p>
                <Code showLines text=
                    {
                        `#include "NWindows/NWindows.hpp"

using namespace nwindows;

int main(void) {
    NWindow::ptr window = NWindow::create(22, AUTO_SIZE);

    NColorPair text_color = window->make_color_pair(0x00FF00,0x000000);

    window
        | title("Hello")
        | add_child(
            NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | add_child(
                NTextElement::create("Hello world!")
                | color(text_color)
            )
            | add_child(
                NHorizontalStackElement::create()
                | alignment(NAlignment::End)
                | add_child(
                    NButtonElement::create("OK")
                    | width(10)
                    | on_click([](int button, NClickedEventArgs& event)
                        {
                            event.handled = true;
                            event.window->close();
                        }
                    )
                )   
            )
        );
    window->run();
}`} />
                <p>Let's discuss what's going on here, step by step.</p>
                <p>The complete <Name>NWindows</Name> api is accessible through the <M>NWindows/NWindows.hpp</M> header
                    file. All components and classes are in the <M>nwindows</M> namespace. Line 1 includes
                    the header file. Line 3 brings the contents of the <M>nwindows</M> namespace into scope.</p>
                <p>NWindows elements and windows are referenced by <M>std::shared_ptr&lt;&gt;</M>s, and are usually created
                    using a static <M>create</M> method on the class in question.  On line 6, <M>NWindow::ptr</M> is
                    actually defined as <M>std::shared_ptr&lt;NWindow&gt;</M>. The <M>NWindow::create</M> method has
                    various overloads, which specify an optional parent window, the x, y, width and height position of the window,
                    and additional argument that allows you to specify a custom color palette for windows and controls. The
                    overload being used on line 6 specifies the width and height of the window, with the x and y position of
                    the window being chosen to center the window on the screen. Setting the width and height to <M>AUTO_SIZE</M>
                    instructs the window to size itself to fit is children. In this case, the window will be 20 columns wide,
                    and the height will be automatically adjusted to fit the content of the window.
                </p>
                <p>
                    Line 8 creates a color pair that will be used to color the text in the window.
                    The <M>make_color_pair()</M> method takes two colors, in 0xRRGGBB format.
                    When displaying text in color, you must set both the foreground and background
                    color for each character cell, hence the use of color pairs.  There is a
                    limit to the maximum number of unique colors, and the maximum number of unique color
                    pairs that can be created in a program. The number of available colors and
                    color pairs varies depends on the terminal on which the application is
                    being displayed. The <M>NWindow::max_colors()</M> method
                    returns the maximum number of colors supported by the current terminal device;
                    the <M>NWindows::max_color_pairs()</M> method returns the number of unique
                    color pairs supported by the current terminal device. An xterm terminal
                    will support up to 256 colors and up to 65,536 color pairs. An actual
                    text-mode device will support much fewer colors and color pairs. The
                    Ubuntu recovery console (an actual text-mode terminal) supports 16
                    colors, and 256 color pairs; but the the maximum number of color pairs
                    could be as few as 6 (not counting 0x000000 and 0xFFFFFF, which are
                    always present). NWindows UI controls use extra colors.  In theory,
                    a terminal device could not support colors at all, although NWindows
                    would not run on such a devices. NWindows reuses colors and color pairs,
                    so there's no problem calling <M>NWindows:make_color_pair()</M> many
                    times with the same colors.
                </p>
                <p>Line 11 is the first instance of a <i>manipulator</i> being used to set a property on the <M>window</M> object.
                    Properties of objects in the NWindows api use the following convention:</p>
                <Code text=
                    {
                        `const std::string& title() const;  // the getter for the title property
void title(const std::string);      // the setter for the title property
`
                    } />
                <p><i>Manipulators</i> are classes that set properties on objects to which they are applied. Manipulators are applied
                    NWindows objects using the '|' operator. So, return value aside,</p>
                <Code text={` window | title("Hello")`} />
                <p>has the same effect as setting the <M>title</M> property with</p>
                <Code text={` window->title("Hello")`} />
                <p>Unlike the method call, however, application of a manipulator returns a pointer to the original object which allows
                    setting of properties to be chained together to achieve the rather delightful and concise syntax for composing
                    the user interface of NWindows Hello World. Note that you can always fall back to using properties and method calls
                    instead of manipulators. There's nothing terribly wrong with the following:
                </p>
                <Code text=
                    {
                        `NWindow::ptr window = NWindow::create(AUTO_SIZE, AUTO_SIZE);
window->title("Hello");
`
                    } />
                <p>and sometimes, it's actually necessary to fall back to method calls instead of manipulators, depending on the
                    user interface you're trying to create. But, for the most part, manipulators are the way to go.
                </p>
                <p>Lines 12  and 13,  create an <M>NVerticalStackElement</M> and add it to the contents of the window (after applying manipulator
                    to the <M>NVerticalStackElement</M> in subsequent lines).</p>
                <p>Before discussing <M>NVerticalStackElement</M>,  let's discuss elements in NWindows in general. NWindows uses a tree
                    of elements to compose user interfaces in much the same was HTML does. All elements in NWindows derive from the <M>NElement</M> base class.
                    (An <M>NWindow</M> is, in fact an NElement itself). Some elements
                    (<M>NVerticalStackElement</M>, <M>NHorizontalStackElement</M>) control layout. Others (<M>NTextElement</M>, <M>NBoxElement</M>) render
                    content. Others (<M>NButtonElement</M>, <M>NCheckboxElement</M>, <M>NRadioElement</M>) respond to user
                    input. The tree of elements is built using the <M>add_child</M> method or manipulator. One an <M>NWindow</M> starts running,
                    it will perform a layout pass to determine the size and position of each element in the tree, and then a render pass to draw the
                    elements to the screen. The window will then monitor user input (mouse and keyboard) and distribute events to elements in
                    the tree as appropriate. In response to events, or property changes, Elements can request that their contents be re-rendered
                    by calling <M>invalidate_render()</M>, and can request a new layout pass by calling <M>NElement::invalidate_layout()</M>.
                    Finer details of the layout and rendering passes will be discussed in a later section.
                </p>
                <p>
                    Back to discussing line 13... <M>NVerticalStackElement</M> and <M>NHorizonalStackElement</M> are the principle elements used
                    to control layout of NWindows elements. The width and height of stack elements can be set using the <M>NElement::width()</M> and
                    <M>NElement::height()</M> properties and corresponding manipulators. Like <M>NWindow</M>, the stack elements will size themselves
                    to fit their children if their width and/or height height are set to <M>AUTO_SIZE</M>.
                </p>
                <p>
                    Line 14 sets the margins of the <M>NVerticalStackElement</M>, which adds additional space around the element. The argument
                    supplied to the <M>margin</M> manipulator is an <M>NThickness</M>, which is a struct whose constructor takes four
                    arguments: left, top, right and, bottom. NWindows does not have any concept of padding, but you can achieve the same effect by
                    adding a margin to an element's child elements.
                </p>
                <p>
                    Line 15 sets the <M>row_gap</M> property of the <M>NVerticalStackElement</M>. The <M>row_gap</M> property set the number of Lines
                    of space between each child element of the stack. <M>MHorizontalStackElement</M> has a similar <M>column_gap</M> property.
                </p>
                <p>
                    On line 17, an <M>NTextElement</M> is created and added to the <M>NVerticalStackElement</M>.
                    The <M>NTextElement</M> is used to display text. The <M>color</M> manipulator is used to set the
                    color of the text to green, using the NColorPair that was created on line 8.
                </p>
                <p>
                    Line 22 creates an <M>NHorizontalStackElement</M> and adds it to the <M>NVerticalStackElement</M>. The <M>NHorizontalStackElement</M>
                    is used to lay out elements horizontally. The <M>alignment</M> manipulator is used to set the alignment of the <M>NHorizontalStackElement</M>
                    to be right-justified. The <M>alignment</M> property can be set to <M>NAlignment::Start</M>, <M>NAlignment::Center</M>,
                    or <M>NAlignment::End</M>. In this case, the intent is right justify the OK button.
                </p>
                <p>
                    Line 24 creates an <M>NButtonElement</M> and adds it to the <M>NHorizontalStackElement</M>.
                    The <M>width</M> manipulator is used to set the width of the button to 10 characters.
                    The <M>on_click</M> manipulator is used to add an event handler for the <M>on_clicked</M> event of the button.
                    The <M>on_click</M> event takes a C++ <i>delegate</i> as an argument. The delegate is called
                    when the button is clicked. The <M>on_clicked</M> delegate takes two arguments: the button that was clicked,
                    and an <M>NClickedEventArgs</M> object that contains information about the event. In this case,
                    the delegate is a lambda function that closes the window when the button is clicked.
                </p>
                <p>The syntax for method-based event access is slightly different. When using method-based syntax, you
                    use  <M>subscribe</M> and <M>unsubscribe</M> methods to add and remove event handler
                    delegates. So
                </p>

                <p>
                    Line 28 sets the <M>event.handled</M> property to <M>true</M>. This tells the NWindows event system
                    that the event has been handled, and should not be further propagated, or bubbled to parent elements
                    if the event is a bubbling event. The delegate then calls <M>event.window.close() to
                        close the main window and exit the <M>run()</M>event loop.
                    </M>
                </p>
                <p>
                    The method-based syntax for attaching event handlers is slightly different from the 
                    syntax used by event manipulators. When using method-based syntax, you use the <M>subscribe</M> 
                    and <M>unsubscribe</M> methods to add and remove event handler delegates. So

                </p>
                <Code text=
                    {
                        `NEventHandle on_clicked_handle = button->on_clicked.subscribe(
        [](int button, NClickedEvent&event_args) { 
            if (button == 1) {
                event_args.handled = true;
                event_args.window->close();
            }
        }
    );
    `
                    } />

                <p>will have the same effect as the lambda function in the manipulator.
                    The <M>subscribe</M> method returns an <M>NEventHandle</M> which can later be used to remove the event handler.
                </p>
                <Code text=
                    {
                        `button->on_clicked.unsubscribe(on_clicked_handle);`
                    } />
                <p>Generally, there's no need to unsubscribe from an event if your handler is required for the
                    lifetime of the object. In this example, we want to be notified of clicked events for
                    as long as the button exists, so there's no need to remove the event handler. You should,
                     however, be careful
                    about capture variables in event delegates. Because NWindows uses <M>shared_ptr</M>'s, it is
                    possible to create circular <M>shared_ptr</M> references that prevent elements from getting 
                    properly deleted. One of the perils of <M>shared_ptr</M>s is that if objects hold a circular 
                    chain of references to each other, the reference count of each object in the chain will never reach zero,
                    and the objects will never be deleted. In practice, this happens surprisingly rarely in NWindows 
                    applications. However, if you are capturing references to elements in event handler 
                    delegates,
                    it may be sensible to use capture <M>weak_ptr</M>s instead of <M>shared_ptr</M>s just to be safe. 
                    The following example shows how  to capture a weak_ptr instead of a shared_ptr. Note that this code would
                    actually  <i>not</i> generate a circular reference, but the code serves to show how relatively painless it
                    is to capture a weak_ptr instead of a shared_ptr.
                </p>
                <Code text=
                    {
                        `NEventHandle on_clicked_handle = button->on_clicked.subscribe(
         // capture a weak_ptr to a text element
        [elementRef = textElement->weak_from_this<NTextElement>()] 
        (int button, NClickedEvent&event_args) mutable // mutable so elementRef is not const!
        { 
            NTextElement::ptr textElement = elementRef.lock(); // recover the shared_ptr.
            if (!window) return; // if the element has been deleted, return.

            textElement->text(std::format("Button {} clicked", button));
        }
    );
    `
                    } />
                <p>Finally, line 35 calls the <M>run</M> method on the window, which starts the event loop for the window.
                    The event loop will continue until the window is closed, at which point the <M>run</M> method will return.
                </p>
                <p>And that's it! You've created your first NWindows program. You can compile and run this program with the following commands:</p>
                <Code text={
                    `g++ -std=c++20 hello_world.cpp -o hello_world -lNWindows -lncursesw`
                } />
                <p>This code sample is included in the <M>examples/hello_world2</M> folder of the NWindows project, and is built as part of the 
                    project build procedure.</p>
                <p>When you run the program, you get the following output:</p>
                <CenteredImage src="/nwindows/image/hello_world2.png" 
                    alt="hello world"  />
            </div>
        </DocsPage>
    );
}

export default UsingNWindows;
