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

import Code from '../Code';
import DocsPage from '../DocsPage';
import M, { ML } from '../M';
import { DocsTitle } from '../DocsNav';
import SectionHead from '../SectionHead';
import { CodeFragment2 } from '../Code';
import { Link } from 'react-router-dom';



function NWindowsFundamentals() {
    let myRoute = "/using/fundamentals";
    return (
        <DocsPage route={myRoute}>
            <h1>{DocsTitle(myRoute)}</h1>
            <p>
                This section introduces fundamental principles used by NWindows throughout its API.
                If you are determined to recklessly charge headfirst into NWindows programming, you
                at least read this section of the documentation before doing so.
            </p>
            <SectionHead text="Elements and NWindows and ptrs" />
            <p>NWindows uses <M>std::shared_ptr</M>s throughout its API.</p>
            <p>Elements and NWindows objects have private constructors.
                Each class provides one or more static <M>create</M> methods that returns
                a <M>std::shared_ptr</M> to the object. Each class defines
                a <M>ptr</M> type which is shorthand for an appropriately
                specialized <M>std::shared_ptr&lt;T&gt;</M>. By convention,
                and for the sake of merciful brevity, one uses the <M>ptr</M> type
                rather than using an explicit <M>std::shared_ptr</M> type.
                For example:
            </p>
            <Code text={`NTextElement::ptr = NTextElement::create();`} />

            <p>Element
                lifetimes are determined entirely by whether there are
                outstanding <M>shared_ptr</M> references. A properly written NWindows program
                will perform a series of cascading deletes on all elements
                in the entire visual tree when the final <M>shared_ptr</M> reference
                to the application's top-level <ML name="NWindow" /> is released. Shared pointer
                references may also go to zero when performing other operations, such as
                modifying the structure of the visual tree of elements in an <M>NWindow</M>,
                closing a child <M>NWindow</M>.
            </p>
            <p><M>NWindows</M> APIs occasionally, and rarely expose naked pointers &mdash; almost
                exclusively in methods that one would use for writing custom elements or windows.
                Naked pointers can be converted to <M>shared_ptr</M>s or <M>weak_ptr</M>s using
                the <ML name="NElement::shared_from_this" /> and <ML name="NElement::weak_ptr_from_this" /> methods
                if you need to retain a reference to element that has been referenced with a naked
                pointer.
            </p>
            <p>This reliance on <M>shared_ptr</M> references requires some care to
                avoid circular references that prevent elements from being deleted.
                This is particularly true when writing event handlers. Problems can
                generally be avoided by converting <M>shared_ptr</M> references
                to <M>{`std::weak_ptr<T>`}</M> references if you need to capture
                references to elements for any protracted period of time.
            </p>


            <SectionHead text="Properties and Manipulators" />
            <p>
                The convention that NWindows uses for naming property methods is:
            </p>
            <M>
                <div style={{ marginLeft: 32 }}>
                    void <i>propertyname</i>(const <i>PropertyType</i> &value); // the setter.<br />
                    const <i>PropertyType</i>& <i>propertyname</i>() const; // the getter.
                </div>
            </M>
            <p>with argument and return types adjusted depending on whether the
                property value is passed by value or by reference.
            </p>
            <p>When properties are set to new values, NWindows elements will invalidate their layout
                or rendering, which will cause layout or rendering passes to be performed when
                control next returns to the main NWindows event loop. There is no need to explicitly
                force rendering or layout to take place; elements decide for themselves
                when they need new layout, or need to be redrawn.
            </p>
            <p>Each property also has a manipulator class in the <M>nwindows</M> namespace
                that allows applications to set properties using <i>manipulator</i> syntax. NWindows
                manipulators are similar in concept to IO manipulators on iostream classes,
                although modern C++ features allow for a slightly more elegant implementation.
                NWindows manipulators use <M>operator|</M> to set properties on elements
                that are being manipulated.
            </p>
            <Code text={`NTextElement::ptr textElement = NTextElement::create() 
    | text("Ipsem lorem)
    | margins({2,1,2,1})
    | color(window->make_color_pair(0x000000,0xFF8080));`} />
            <p>When an NWindows manipulator is applied to an element using <M>operator|</M>,
                the corresponding property of the <M>operator|</M> is set, and a value
                with the exact same type as the left-hand-side element is returned. Chaining
                of manipulators allow multiple properties to be set on an element in
                a single expression. This provides an elegant and concise way to construct
                trees of elements, often allowing an entire window to be created and populated
                with visual elements in a single expression.
            </p>
            <p>There are also manipulators for handling events: </p>
            <Code text={`NButtonElement okButton = NButtonElement::create()
    | label("OK")
    | width(10)
    | on_clicked((
        [](NClickedEventArgs&event_args) {
           event_args.window->close();
        }
    );`} />
            <p>You don't <i>have</i> to use manipulator syntax. You can always
                fall back on variables and methods to assemble elements, and in fact,
                it is sometimes necessary to do so for complex visual trees, or in
                cases where event handlers reference objects elsewhere in the
                visual tree.</p>
            <p>If you are determined to build an entire visual tree in a single
                expression, NWindows provides the <ML name="NElement::get_element_by_id<T>" /> method,
                which allows you to retrieve elements elsewhere in the visual tree by id. 
            </p>
            <Code text={`NButtonElement::create()
    | label("Apply")
    | width(10)
    | on_clicked(
        [](NClickedEventArgs&event_args) {
            NTextElement::ptr textElement 
                = event_args.window
                    ->get_element_by_id<NTextElement>("textElementId");
            textElement->text("Apply button clicked!");
        }
    )`} />
            <p>Note how <M>get_element_by_id</M> is called on the window object
                in order to search the entire visual tree.
            </p>

            <p>
                An alternate approach is to use inline assignments to variables in the expression that creates the 
                visual true, and add event handlers after the visual tree has been constructed. Or you can assemble your 
                visual tree in pieces.
            </p>                

            <SectionHead text="Events and Handlers" />
            <p>
                An <ML name="NEvent" /> is a templated class that allows event consumers 
                to <i>subscribe</i> to event notifications by supplying a C++ lambda (a <M>std::function&lt;&gt;</M>) with the appropriate
                function signature that will be called each time the event is fired.  The template argument of
                an NEvent is a function signature that describes the arguments that consumers and producers must provide
                when using the event. Event producers call <ML name="Event::fire" /> with arguments that match the
                NEvent's function signature.
            </p>
            <p>An example is worth a thousand words.</p>
            <CodeFragment2 text={
                `NEvent<
    void(uint64_t buttonId, const std::string&text)
> on_button_name_changed;`
            } />
            <p>Subscribers must call <M>NEvent::subscribe</M> with a matching lambda:</p>
            <CodeFragment2 text={`
NEventHandle buttonChangedHandle = 
    on_button_name_changed.subscribe(
        [](uint64_t buttonId, const std::string&text) {
            // do something.
        }
    );`
            } />
            <p>Producers fire events as follows:</p>
            <CodeFragment2 text={`on_button_name_changed.fire(buttonId, text);
    );`
            } />

            <p>Subscribers can unsubscribe from the event by calling <M>NEvent::unsubscribe</M> with the handle returned
                by <M>NEvent::subscribe</M>. If the event's lifetime is tied to the lifetime of the element which 
                has subscribed, there's no compelling reason to unsubscribe; but you may need to do so 
                if you are changing the structure of a window's visual tree while the window is active.
            </p>
            <p>You should be extremely careful about capturing references to elements in the capture list 
            of event handler lambdas, as captured <M>std::shared_ptr</M>s may create circular shared_ptr 
            references. If you must, it's prudent to do so using a <M>weak_ptr</M> reference to the element.
        </p>
        <Code text={`/* DO NOT DO THIS!!! ***/ 
NMessageWindow::ptr messageWindow 
    = NMessageWindow::create(parentWindow, NMessageType::Information, "Title", "Message");'
messageWindow.on_closed.subscribe(
    [messageWindow]  // <--- CIRCULAR REFERENCE!!!
    (NMessageWindow::ptr source) {
    });`} />
    <p>You can avoid the circular reference easily enough. In this example, the most obvious way is to use 
    the <M>source</M> argument of the event handler instead of capturing a pointer. But you can also break the circular reference using a weak_ptr: </p>
    <Code text={`NMessageWindow::ptr messageWindow 
    = NMessageWindow::create(parentWindow, NMessageType::Information, "Title", "Message");'
messageWindow.on_closed.subscribe(
    [weak_ptr = messageWindow->weak_from_this<NMessageWindow()]  // Capture a std::weak_ptr
    (NMessageWindow::ptr source) {
         NMessageWindow::ptr messageWindow = weak_ptr.lock(); 
        if (messageWindow) {
            // do something.
        }
    });`} />
        <p>Actual circular references occur surprisingly rarely in NWindows programming. Even the example 
            is a bit contrived. However, should they 
            ever occur, they would be exceedingly difficult to debug. It seems prudent to just take 
            a weak_ptr if you must, rather than reasoning through whether it's actually safe to do so. </p>

        <SectionHead text="The NWindows Dispatcher" />
        <p>NWindows itself is single-threaded. All events and actions must occur on the 
        thread on which <ML fullName name="NWindow::run" /> is called.
        </p>
        <p>The sole exception are the <ML fullName name="NWindow::post"/> methods which which allow 
            applications to post actions that will be executed on the main thread by the NWindows dispatcher. 
            thread. See the <Link to="/using/dispatcher"><i>NWindows Dispatcher</i></Link> page 
            for more details. The NWindows dispatcher also allows applications to post actions that will be 
            executed after a delay, or post actions that will be executed when control next returns to the 
            NWindows event loop.
        </p>
        <SectionHead text="Running an NWindows Application" />
        <p>Running an NWindows application is simple. One constructs a top-level window, builds a visual tree
            of elements in the window, and then call the <ML fullName name="NWindow::run" /> method on the window. 
            The <ML name="NWindow::run" /> method will not return until the window is closed. <ML name="NWindow::run" /> should 
            be called once on the main window of the application. Child windows use the event loop of the top-level window.
        </p>
        <p>Within the <ML name="NWindow::run"/> method, NWindows runs an event loop that handles window management, layout, rendering, dispatching 
        of posted actions, and servicing of keyboard and mouse events. 
            When a property 
            is set on an element that affects its position or rendering onscreen, layout and rendering does not 
            occur immediately. Instead, elements will call <ML fullName name="NElement::invalidate_layout" /> or <ML fullName name="NElement::invalidate_render"/>, 
            which trigger a new layout or rendering pass when control next returns to the event loop. Multiple calls to <M>invalidate_layout</M>
            or <M>invalidate_render</M> are coalesced into a single layout or rendering pass within the event loop. 
            Calling <ML fullName name="NElement::invalidate_layout" /> also invalidates the rendering of all elements within the 
            parent window's visual tree.
        </p>


        </DocsPage >
    );
}

export default NWindowsFundamentals;
