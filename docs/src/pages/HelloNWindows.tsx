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

import CenteredImage from '../CenteredImage';
import Code, {CodeFragment2} from '../Code';
import DocsPage from '../DocsPage';
import M, {A,ML} from '../M';
import Name from '../Name';
import { DocsTitle } from '../DocsNav';



function UsingNWindows() {
    let myRoute = "/using/hello";
    return (
        <DocsPage route={myRoute}>
            <div>
                <h1>{DocsTitle(myRoute)}</h1>
                <p>
                    This section describes how to create a simple <Name>NWindows</Name> program that displays
                    a window with a button that closes the window when clicked.
                </p>
                <p>
                    Here is the <Name>NWindows</Name> Hello World program:
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
                    | on_clicked([](NMouseButton button, NClickedEventArgs& event)
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
                    file. All components and classes are in the <M>nwindows</M> namespace.</p>
                    <Code showLines startingLineNumber={1}  text=
                    {
                        `#include "NWindows/NWindows.hpp"

using namespace nwindows;`}/>

                <p> Line 1 includes
                    the header file. Line 3 brings the contents of the <M>nwindows</M> namespace into scope.</p>
                <p><Name>NWindows</Name> elements and windows are referenced by <M>std::shared_ptr&lt;&gt;</M>s, and are created
                    using a static <M>create</M> method on the class in question.</p>
                    <Code showLines startingLineNumber={6}  text=
                    {
                        `    NWindow::ptr window = NWindow::create(22, AUTO_SIZE);`}/>
                <p>  <M>NWindow::ptr</M> is 
                    actually defined as <M>std::shared_ptr&lt;NWindow&gt;</M>. The <ML fullName name="NWindow::create" /> method has
                    various overloads, which specify an optional parent window, the x, y, width and height position of the window,
                    and an additional argument that allows you to specify a custom color palette for windows and controls. The
                    overload being used on line 6 specifies the width and height of the window, with the x and y position of
                    the window being chosen to center the window on the screen. Setting the width and height 
                    to <M>AUTO_SIZE</M> instructs the window to size itself to fit is children. In this case, the window will be 22 columns wide,
                    and the height will be automatically adjusted to fit the content of the window.
                </p>
                <Code showLines startingLineNumber={8}  text=
                    {
                        `    NColorPair text_color = window->make_color_pair(0x00FF00,0x000000);`}/>
                <p>
                    Line 8 creates a color pair that will be used to color the text in the window.
                    The <ML name="NWindows::make_color_pair"/> method takes two colors, in 0xRRGGBB format.
                    When displaying text in color, you must set both the foreground and background
                    color for each character cell, hence the use of color pairs.  There is a
                    limit to the maximum number of unique colors, and the maximum number of unique color
                    pairs that can be created in a program. The number of available colors and
                    color pairs varies depends on the terminal on which the application is
                    being displayed. The <ML name="NWindow::max_colors" fullName/> property
                    returns the maximum number of colors supported by the current terminal device;
                    the <ML name="NWindow::max_color_pairs" fullName/> property returns the number of unique
                    color pairs supported by the current terminal device. An xterm terminal
                    will typically support up to 256 colors and up to 65,536 color pairs. An actual
                    text-mode device will support much fewer colors and color pairs. The
                    Ubuntu recovery console (an actual text-mode terminal) supports 16
                    colors, and 256 color pairs; but the the maximum number of color pairs
                    could be as few as 6 (not counting 0x000000 and 0xFFFFFF, which are
                    always present). <Name>NWindows</Name> UI controls use extra colors.  In theory,
                    a terminal device could not support colors at all, 
                    although <Name>NWindows</Name> would not run on such a devices. However, your chances of encountering 
                    an actual VT-100 terminal (or any other classic terminal device) in the field are 
                    pretty slim these days. <Name>NWindows</Name> reuses color and color pair indices,
                    so there's no harm in calling <M>NWindows:make_color_pair()</M> many
                    times with the same colors.
                </p>
                <Code showLines startingLineNumber={10}  text=
                    {
`            window
                | title("Hello")`}/>
                <p>Line 11 is the first instance of a <i>manipulator</i> being used to set a property on the <M>window</M> object.
                    Properties of objects in the <Name>NWindows</Name> api use the following convention:</p>
                <CodeFragment2 white text=
                    {
`const std::string& title() const;   // the getter for the title property
void title(const std::string);      // the setter for the title property
`
                    } />
                <p><i>Manipulators</i> are classes that set properties on objects to which they are applied. They are similar to 
                IO manipulators in the C++ standard library, but return a std::shared_ptr with the exact same type as the expression 
                on the left-hand side of the NWindows manipulator. Manipulators are applied
                    to NWindows objects using the '|' operator. So, return value aside,</p>
                <CodeFragment2 white text={` window | title("Hello")`} />
                <p>has the same effect as setting the <M>title</M> property with</p>
                <CodeFragment2 text={` window->title("Hello")`} />
                <p>Unlike the method call, however, application of a manipulator returns a pointer to the original object which allows
                    setting of properties to be chained together to achieve the rather delightful and concise syntax for composing
                    the user interface of <Name>NWindows</Name> Hello World. Note that you can always fall back to using properties and method calls
                    instead of manipulators. There's nothing terribly wrong with the following:
                </p>
                <CodeFragment2 text=
                    {
                        `NWindow::ptr window = NWindow::create(AUTO_SIZE, AUTO_SIZE);
window->title("Hello");
`
                    } />
                <p>and sometimes, it's actually necessary to fall back to method calls instead of manipulators, depending on the
                    user interface you're trying to create. But, for the most part, manipulators are the way to go.
                </p>
                <Code showLines startingLineNumber={12}  text=
                    {
`        | add_child(
            NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | ...`}/>



                <p>Lines 12  and 13,  create an <M>NVerticalStackElement</M> and add it to the contents of the window (after applying manipulators
                    to the <ML name='NVerticalStackElement' /> in subsequent lines).</p>
                <p>Before discussing <ML name='NVerticalStackElement' />,  let's discuss elements in <Name>NWindows</Name> in general. NWindows uses a tree
                    of elements to compose user interfaces in much the same was HTML does. All elements in <Name>NWindows</Name> derive from the <M>NElement</M> base class.
                    (An <M>NWindow</M> is, in fact an NElement itself). Some elements
                    (<ML name='NVerticalStackElement' />, <ML name='NHorizontalStackElement' />) control layout. Others (<ML name='NTextElement' />, <ML name='NBoxElement' />) render
                    content. Others (<ML name='NButtonElement' />, <ML name='NCheckboxElement' />, <ML name='NRadioGroupElement' />) respond to user
                    input. The tree of elements is built using the <M>add_child</M> method or manipulator.
                    </p><p>Once an <M>NWindow</M> starts running,
                    it will perform a layout pass to determine the size and position of each element in the tree, and then a render pass to draw the
                    elements to the screen. The window will then monitor user input (mouse and keyboard) and distribute events to elements in
                    the tree as appropriate. In response to events, or property changes, Elements can request that their contents be re-rendered
                    by calling <ML name="NElement::invalidate_render"/>, and can request a new layout pass by calling <ML name="NElement::invalidate_layout"/>.
                    Finer details of the layout and rendering passes will be discussed in a later section.
                </p>
                <p>
                    Back to discussing line 13... <ML name='NVerticalStackElement' /> and <ML name='NHorizontalStackElement' /> are the principle elements used
                    to control layout of <Name>NWindows</Name> elements. The width and height of stack elements can by setting
                    the <ML fullName name="NElement::width" /> and <ML fullName name="NElement::height"/> properties. Like <M>NWindow</M>, the stack elements will size themselves
                    to fit their children if their width and/or height are set to <M>AUTO_SIZE</M>.
                </p>
                <Code showLines startingLineNumber={13}  text=
                    {
`            NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | ...`}/>

                <p>
                    Line 14 sets the margins of the <M>NVerticalStackElement</M>, which adds additional space around the element. The argument
                    supplied to the <ML name='NElement::margin' /> manipulator is an <ML name='NThickness' />, which is a struct whose constructor takes four
                    arguments: left, top, right and, bottom. <Name>NWindows</Name> does not have any concept of padding, but you can achieve the same effect by
                    adding a margin to an element's child elements.
                </p>
                <p>
                    Line 15 sets the <M>row_gap</M> property of the <M>NVerticalStackElement</M>. The <M>row_gap</M> property set the number of Lines
                    of space between each child element of the stack. <M>MHorizontalStackElement</M> has a similar <M>column_gap</M> property.
                </p>
                <Code showLines startingLineNumber={16}  text=
                    {
`            | add_child(
                NTextElement::create("Hello world!")
                | color(text_color)
            )
            | ...`}/>                
                <p>
                    On line 17, an <ML name='NTextElement' /> is created and added to the <ML name='NVerticalStackElement' />.
                    The <M>NTextElement</M> displays text. The <ML name='NTextElement::color' /> manipulator sets the
                    color of the text to green, using the <ML name='NColorPair' /> that was created on line 8.
                </p>
                <Code showLines startingLineNumber={21}  text={
`            | add_child(
                NHorizontalStackElement::create()
                | alignment(NAlignment::End)
                | ...`}/>
                <p>
                    Line 22 creates an <M>NHorizontalStackElement</M> and adds it to the <M>NVerticalStackElement</M>. 
                    The <M>NHorizontalStackElement</M> is used to lay out elements horizontally. The <M>alignment</M> manipulator sets
                    the alignment of the <M>NHorizontalStackElement</M>
                    to be right-justified. The <ML name='NHorizontalStackElement::alignment' /> property can be set 
                    to <ML name="NAlignment"/><M>::Start</M>, <M>NAlignment::Center</M>,
                    or <M>NAlignment::End</M>. In this case, the intent is right justify the OK button.
                </p>
                <Code showLines startingLineNumber={23}  text={
`                | add_child(
                    NButtonElement::create("OK")
                    | width(10)
                    | on_clicked([](NMouseButton button, NClickedEventArgs& event)
                        {
                            event.handled = true;
                            event.window->close();
                        }
                    )`

                }/>
                <p>
                    Line 24 creates an <ML name='NButtonElement' /> and adds it to the <M>NHorizontalStackElement</M>.
                    The <ML fullName={false} name="NElement::width"/> manipulator is used to set the width of the button to 10 
                    display columns.
                    The <M>on_clicked</M> manipulator is used to add an event handler for the <ML name="NElement::on_clicked"/> event of the button.
                    The <M>on_clicked</M> event takes a C++ <i>lambda</i> (actually, a <M>std::function</M>) as an argument. The lambda is called
                    when the button is clicked. The <M>on_clicked</M> lambda takes two arguments: the button that was clicked,
                    and an <M>NClickedEventArgs</M> object that contains information about the event. In this case,
                    the event handler closes the window when the button is clicked.
                </p>
                <p>
                    Line 28 sets the <M>event.handled</M> property to <M>true</M>. This tells the <Name>NWindows</Name> event system
                    that the event has been handled, and should not be further propagated, or bubbled to parent elements
                    if the event is a bubbling event. The delegate then calls <M>event.window.close() to
                        close the main window and exit the <M>run()</M>event loop.
                    </M>
                </p>
                <p>
                    The method-based syntax for attaching event handlers is slightly different from the 
                    syntax used by event manipulators. When using method-based syntax, you use the <M>subscribe</M> 
                    and <M>unsubscribe</M> methods to add and remove event handler. So

                </p>
                <CodeFragment2 text=
                    {
                        `NEventHandle on_clicked_handle = button->on_clicked.subscribe(
        [](NMouseButton button, NClickedEvent&event_args) { 
            if (button == NMouseButton::Left) {
                event_args.handled = true;
                event_args.window->close();
            }
        }
    );`
                    } />

                <p>will add an event handler for the <ML name="NElement::on_clicked" /> event.
                    The <ML name="NEvent::subscribe"/> method returns an <ML name="NEventHandle" /> which can later be used to remove the event handler
                    by calling <ML name="NEvent::unsubscribe"/>. 
                </p>
                <CodeFragment2 text=
                    {
                        `button->on_clicked.unsubscribe(on_clicked_handle);`
                    } />
                <p>Generally, there's no need to unsubscribe from an event if your handler is required for the
                    lifetime of the object. In this example, we want to be notified of clicked events for
                    as long as the button exists, so there's no need to remove the event handler. You should,
                     however, be careful
                    about capture variables in event delegates. Because <Name>NWindows</Name> uses <M>shared_ptr</M>'s, it is
                    possible to create circular <M>shared_ptr</M> references that prevent elements from getting 
                    properly deleted. One of the perils of <M>shared_ptr</M>s is that if objects hold a circular 
                    chain of references to each other, the reference count of each object in the chain will never reach zero,
                    and the objects will never be deleted. In practice, this happens surprisingly rarely in <Name>NWindows</Name> 
                    applications. However, if you are capturing references to elements in event handler 
                    delegates,
                    it may be sensible to use capture <M>weak_ptr</M>s instead of <M>shared_ptr</M>s just to be safe. 
                    The following example shows how  to capture a weak_ptr instead of a shared_ptr. Note that this code would
                    actually  <i>not</i> generate a circular reference, but the code serves to show how relatively painless it
                    is to capture a weak_ptr instead of a shared_ptr.
                </p>
                <CodeFragment2 text=
                    {
                        `NEventHandle on_clicked_handle = button->on_clicked.subscribe(
         // capture a weak_ptr to a text element
        [elementRef = textElement->weak_from_this<NTextElement>()] 
        (NMouseButton button, NClickedEvent&event_args) mutable // mutable so elementRef is not const!
        { 
            NTextElement::ptr textElement = elementRef.lock(); // recover the shared_ptr.
            if (!window) return; // if the element has been deleted, return.

            textElement->text(std::format("Button {} clicked", button));
        }
    );`
                    } />
                <p><Name>NWindows</Name> takes pains to break circular references if it can. When a window closes, it detaches its children, and clears its 
                    dispatcher queue in advance of its destructor being called. So circular reference chains caused by children that 
                    hold <M>shared_ptr</M>s on their parent windows are usually broken. And event destructors 
                    destroy their event handlers, which release <M>shared_ptr</M>s in capture variables of event-handler lambdas. So it is, honestly, infuriatingly 
                    and surprisingly difficult to come up with an actual sensible example of a circular reference problem. But were it to 
                    happen, it would be a very difficult problem to debug. Given that I am unable to convince myself that it will never happen,
                    and given that it requires significant effort to convince oneself that capture variables do not create circular references,
                    the cautious approach is to capture only <M>weak_ptr</M>s in 
                    event handler lambdas.
                </p>
                <p>Finally, line 35 calls the <M>run</M> method on the window, which starts the event loop for the window.
                    The event loop will continue until the window is closed, at which point the <M>run</M> method will return.
                </p>
                <p>And that's it: a complete functional <Name>NWindows</Name> application that says hello to the world! You can compile and run this program with the following commands:</p>
                <Code language="text" text={
                    `g++ -std=c++20 hello_world.cpp -o hello_world -lNWindows.a -lncursesw`
                } />
                <p>When you run the program, you get the following output:</p>
                <CenteredImage src="/nwindows/image/hello_world2.png" 
                    alt="hello world"  />
                <p>This code sample is included in 
                    the <A href="https://github.com/rerdavies/nwindows/tree/main/examples/hello_world2" target="_blank"><M>examples/hello_world2</M></A> folder of the NWindows project, and provides a <M>CMakeList.txt</M> file 
                to build the program. Note the use of the static library version of <M>libNWindows</M> in the commandline version. (The <M>CMake</M> build
                script automatically selects the static library). Because <Name>NWindows</Name> is a C++ library, it would cause endless versioning issues if it were
                to be distributed as a shared library. 
                </p>

            </div>
        </DocsPage>
    );
}

export default UsingNWindows;
