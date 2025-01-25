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
import M, {ML} from '../M';
import { CodeFragment2 } from '../Code';
import SectionHead from '../SectionHead';
import { Link } from 'react-router-dom';



function NWindowsEvents() {
    return (
        <DocsPage route="/using/events">
            <h1>{DocsTitle("/using/events")}</h1>
            <p>This section describes events and event handling in NWindows.</p>
            <SectionHead text="Events in General" />
            <p>Once applications have built the visual tree of <M>NElement</M>s, and started the <M>NWindow</M> running,
                they will need to monitor and respond to activity that occurs in response to user input. The NWindows event system
                provides a mechanism by which applications can monitor user input, and make changes to the
                state of input control elements while the application is running.</p>
            <p>
                The <ML name="NEvent" /> class is the foundation of event notification in NWindows. All event notifications
                in  NWindows occur through <M>NEvent&lt;T&gt;</M>s. The template argument for an <M>NEvent&lt;T&gt;</M> is a
                function signature that defines the function signature of event notification handlers. Subscribers to the event must
                add a C++ lambda (a std::function&lt&gt) to the event using the <M>NEvent::subscribe</M> method. Once subscribed,
                the lambda is called each time an event fires.
            </p>
            <p>For example, consider the declaration</p>
            <CodeFragment2 text={`NEvent<void(NMouseButton button, NClickedEvent&event_args)> on_clicked;`} />
            <p>Subscribers must supply a C++ lambda that has the type</p>
            <CodeFragment2 text={`std::function<void(NMouseButton button, NClickedEvent&event_args)>`} />
            <p>which would look like this:</p>
            <CodeFragment2 text={`NEventHandle on_clicked_handle 
    = buttonElement.on_clicked.subscribe(
    [] (NMouseButton button, NClickedEvent&event_args) {
        /*DO SOMETHING*/
    }
);`} />
            <p>The returned <M>NEventHandle</M> can be used to cancel the event subscription using the <M>NEvent::unsubscribe</M> method.</p>
            <CodeFragment2 text={`buttonElement->on_clicked.unsubscribe(on_clicked_handle);
`} />

            <p>As for properties, common events are accessible via direct method calls as well
                as through <i>manipulators</i>.
            </p>
            <CodeFragment2 text={`buttonElement | on_clicked (
    [] (NMouseButton button, NClickedEventArgs&event_args) { 
                /*DO SOMETHING*/
        }
   )
`} />

            <p>(manipulator syntax) does the same thing (return types aside) as </p>
            <CodeFragment2 text={`NEventHandle clicked_handle = buttonElement->on_clicked.subscribe(
    [] (NMouseButton button, NClickedEventArgs&event_args) { 
                /*DO SOMETHING*/
        }
   );
`} />
            <p>
                The difference lies in the return types. As for property manipulators, the manipulator expression
                returns the object pointer on the left-hand object of <M>operator|</M> which can be used to chain further
                manipulator operations.
            </p>
            <p>Unlike property method calls, and unlike the manipular expression, <M>NEvent&lt;&gt;.subscribe</M> returns
                an event handle that can be used to cancel the event subscription.</p>
            <p>
                In most cases, you want to observe an event for as long as the target element exists,
                so there's no compelling need to unsubscribe. When a window closes, all of the elements
                in its view tree get deleted, and when that happens,  event subscriptions are deleted as well.
                For more complicated cases, you may want to add and remove event subscriptions on the fly. In that case, you will
                have to use direct method calls instead of <M>manipulator expressions</M>, so that you can
                obtain the EventHandle that isn't accessible in manipulator expressions.
            </p>
            <p>Complete documentation on <M>NEvent&lt;&gt;</M> can be found <Link to="/api/NEvent">here</Link>.</p>
            <SectionHead text="Events and Event Handlers" />
            <p>The following principles apply to event in NWindows elements and windows. Custom control implementations should follow these conventions as well.</p>
            <p>The general pattern for event distribution in NWindows is that events are delivered to a virtual method
                on a target element named <M>handle_<i>event_name</i></M>. That method should then fire an event on a
                corresponding public <M>NEvent&lt;&gt;</M>  member variable named <M>on_<i>event_name</i></M>.
                This allows <M>NElement</M>-derived classes to handle events by overriding the <M>handle_<i>event_name</i></M> method instead of subscribing to their
                own <M>on_<i>event_name</i></M> event, and to decide whether they want to intercept the event
                without relaying it to subscribers, or to take action if the event is not handled by subscribers
                to the event.
            </p>
            <p>For example, <M>NElement</M> has a virtual method that receives keyboard events from <M>NWindow</M> (which
                is the source of all keyboard and mouse events). The method is named <M>handle_key</M> and is declared as follows:
            </p>
            <CodeFragment2 text={`virtual void handle_key(NKeyEventArgs& event_args);`} />
            <p><M>NElement</M> then declares a matching <M>NEvent&lt;&gt;</M> member variable which observers can
                subscribe to:</p>
            <CodeFragment2 text={`NEvent<void (NKeyEventArgs&event_args)> on_key;`} />
            <p>When <M>NWindow</M> receives a keyboard event, it calls the <M>handle_key</M> method on the
                currently focused element. The element can then decide whether to relay the event to subscribers by
                firing the <M>on_key</M> event by calling</p>
            <CodeFragment2 text={`on_key.fire(event_args);`} />

            <p>The guiding principle is that objects should never fire events on another object's <M>on_<i>event_name</i></M> instance,
                but should instead pass the event to the target object's <M>handle_<i>event_name</i></M> method, so that the
                target object (or classes that inherit from the target object, since the method is virtual) can decide whether to
                handle the event before or after passing it to event subscribers.</p>


        </DocsPage>
    );
}

export default NWindowsEvents;
