import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import M from '../M';
import ClassDescription, { MethodDescription } from '../ClassDescription';
import Code, { CodeFragment2 } from '../Code';
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
                provides a mechanism by which applications can monitor user input, and changes to the
                state of input control elements while the application is running.</p>
            <p>
                The <M>NEvent&lt;T&gt;</M> class is the foundation of event notification in NWindows. All event notifications
                in  NWindows occur through <M>NEvent&lt;T&gt;</M>s. The template argument for an <M>NEvent&lt;T&gt;</M> is a
                function signature that defines the function signature of event notification handlers. Subscribers to the event must
                add a C++ lambda (a std::function&lt&gt) to the event using the <M>NEvent::subscribe</M> method. Once subscribed,
                the lambda is called each time an event fires.
            </p>
            <p>For example, consider the declaration</p>
            <CodeFragment2 text={`NEvent<void(int button, NClickedEvent&event_args)> on_clicked;`} />
            <p>Subscribers must supply a C++ lambda that has the type</p>
            <CodeFragment2 text={`std::function<void(int button, NClickedEvent&event_args)>`} />
            <p>which would look like this:</p>
            <CodeFragment2 text={`NEventHandle on_clicked_handle 
    = buttonElement.on_clicked.subscribe(
    [] (int button, NClickedEvent&event_args) {
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
    [] (int button, NClickedEventArgs&event_args) { 
                /*DO SOMETHING*/
        }
   )
`} />

            <p>(manipulator syntax) does the same thing (return types aside) as </p>
            <CodeFragment2 text={`NEventHandle clicked_handle = buttonElement->on_clicked.subscribe(
    [] (int button, NClickedEventArgs&event_args) { 
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
            <p>The following principles apply to custom control implementations, and are used by internal
                NWindows elements as well.</p>
            <p>The general pattern for event distribution in NWindows is that events are delivered to a virtual method
                on a target element named <M>handle_<i>event_name</i></M>. That method should then fire an event on a
                corresponding public <M>NEvent&lt;&gt;</M>  member variable named <M>on_<i>event_name</i></M>.
                This allows <M>NElement</M>-derived classes to handle events without having to subscribe to their
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

            <SectionHead text="Keyboard Events" />

            <ClassDescription className="NElement">

                <MethodDescription method={
                    `public:
    NEvent<void (NKeyEventArgs&event_args)> on_key;
    NEvent<void (NKeyCodeEventArgs&event_args)> on_key_code;

    virtual void handle_key(NKeyEventArgs& event_args);
    virtual bool handle_key_code(NKeyCodeEventArgs& event_args);
`
                } >
                    <p>Keyboard events are only received by the <M>NElement</M> that has input focus, and by
                        the currently active <M>NWindow</M>. Focused elements do not receive keyboard events
                        if their <M>disabled</M> property is <M>true</M>.
                    </p>
                    <p>Keyboard events are first offered to the current focused element, and then bubble up
                        from the focused element to the root of the visual tree. When bubbling the active
                        window will receive keyboard events if no element handles the keyboard event first.
                        If there is no focused element, the event is fired on the currently active window only..
                    </p>
                    <p>Elements can take focus forcibly, by calling <M>NElement::take_focus()</M>, but generally, focus navigation
                        is performed by the <M>handle_key</M> method of of <M>NWindow</M>, which only processes keyboard events after
                        the focused object has decided not to handle the keyboard event, and after observers if the <M>NWindow</M>s
                        on_key and on_key_code events have decided not to handle the keyboard events.</p>
                    <p>Following Unix/X11 convention, text characters are distributed by <M>handle_key</M>/<M>on_key</M> events, and
                        function keys, cursor keys, and all other non-text keys are distribute separately
                        by <M>handle_key_code</M>/<M>on_key_code</M> events.</p>
                    <p>Generally, input elements fire their <M>on_key</M> and <M>on_key_code</M> events before they perform their
                        own handling, so observers can handle events before input element do. If an observer handles a key or on_key_code
                        event, they should set <M>event_args.handled</M> to <M>true</M>, which will prevent input controls from
                        processing the events themselves.</p>
                    <p>The <M>handle_key</M> method, and subscribers to <M>on_key</M> events receive a single argument: </p>

                    <CodeFragment2 white text={`struct NKeyEventArgs : public NEventArgsBase {
    NKeyEventArgs(NElement* source, wchar_t key);
    std::shared_ptr<NElement> target;
    wchar_t key = 0;
};`} />
                    <p>and <M>NEventArgsBase</M> provides three more member variables in the event:</p>
                    <CodeFragment2 white text={`    struct NEventArgsBase {
    NEventArgsBase(NElement* source);
    std::shared_ptr<NElement> source;
    std::shared_ptr<NWindow> window;
    bool handled = false;
};
`} />
                    <p>The <M>source</M> member variable is the element that fired the event, and the <M>window</M> member variable is the
                        window to which that element belongs. In practice, <M>source</M> and <M>window</M> always point to
                        the same object since the window is the source of all keyboard events. (<M>NWindow</M>s <i>are</i> <M>NElements</M> precisely
                        for situations like this).
                        But theoretically, <M>source</M> could point to a different object if the event is generated
                        synthetically. <M>target</M> points to the element with focus, and may be null if no
                        element currently has focus and the event is being fired on the <M>NWindow</M>.</p>
                    <p>
                        These pointers are all conspicuously
                        and deliberately shared pointers. This ensures liveness of all the participating objects for the duration of
                        processing of the event, even if an event handler should choose to <M>close</M> the window that sent the message that
                        sourced the event, or make other major structural changes to the element tree. While the objects are guaranteed to be live,
                        you should be aware that fairly dramatic things
                        happened during a call to <M>close</M>. Most notably, all elements get detached from their parent window, and
                        many if not most objects in the visual tree for which there are not outstanding shared pointers will get
                        deleted. So
                        you should carefully consider the consequences of <M>close</M>ing a window, or making major structural changes
                        to the element tree in response to events. If you are using third-party elements in your event handler, the
                        prudent thing to do is to take shared pointers (or weak pointers) on those objects in order to guard against
                        use-after-free errors when reference counts to major parts of the element tree may go to zero.</p>
                    <p><M>handle_key_code</M> methods and observers of <M>on_key_code</M> receive one argument of type <M>NKeyCodeEventArgs</M>:</p>
                    <CodeFragment2 white text={`struct NKeyCodeEventArgs : public NEventArgsBase {
    NKeyCodeEventArgs(NElement* source, int key_code);
    std::shared_ptr<NElement> target;
    int key_code;
};`} />
                    <p>The object pointers are the same as for <M>NKeyEventArgs</M>; but instead of receive a key, the event contains a <M>key_code</M>.
                        Key codes are defined in the <M>curses.h</M> header file, which is included by <M>NWindows/NWindows.h</M>.</p>
                    <p> Unfortunately,
                        key code definitions suffer from a serious case of historical cruft. There are key codes for keys that appeared on the venerable
                        VT-100 terminal, and key codes for keys that appeared on 3270 terminals. Key codes for modern PC keyboards have been mapped onto
                        that vast set of accumulated keys that have ever been seen on any terminal produced since the VT-100. Most of the <M>non-Ctrl /
                            non-alt</M> key codes for modern keyboards have been mapped onto fairly sensible key codes. Cursor keys map to KEY_RIGHT, KEY_LEFT,
                        KEY_UP, KEY_DOWN. The Home key maps to KEY_HOME. Shifted keys are mostly sensible: KEY_RIGHT becomes KEY_SRIGHT, for example.
                        But keys with Ctrl or Alt key modifiers are a mess. At some point in the history of Xnix, these keys have been partially mapped
                        onto keys that once meant something on ancient terminals, but no longer carry meaning to us. The key codes produced by keys modified
                        by Ctrl and Alt modifiers produces odd and unpredictable results, some of which don't even appear in the list of
                        known key code literals that ncurses does provided. The unfortunate solution is to
                        write a program and see what key code you receive when your key combination is pressed, and perhaps
                        convert received values to octal (KEY_ codes are encoded in octal for reasons known only to our forefathers), and search for
                        the octal value in the <M>curses.h</M> header file to see what the literal is for your particular flavor of Ctrl+/-Alt+/-Shift+INS is.
                        Or just hardcode the literal value, since no real good comes from using a key code literal of</p>

                    <CodeFragment2 text={`#define KEY_SMESSAGE	0612		/* shifted message key */`} />

                    <p>Regrettably, the key code problem is one that percolates through all of Linux and even carries into
                        Windows ports of the ncurses libraries. So just press the keys and see what you get.</p>

                    <p>Key code event routing is the same as for key event routing.</p>
                </MethodDescription>
            </ClassDescription>

            <SectionHead text="Mouse Events" />
            <ClassDescription className="NElement">
                <MethodDescription method={`NEvent<void (int button,NClickedEventArgs&event_args)>  on_clicked;
NEvent<void (int button,NMouseEventArgs&event_args)> on_mouse_button_pressed;
NEvent<void (int button,NMouseEventArgs&event_args)>  on_mouse_button_released;
NEvent<void (NMouseEventArgs&event_args)>  on_mouse_move;
NEvent<void ()>  on_mouse_lost_capture;
NEvent<void (NMouseEventArgs&event_args)> on_mouse_enter;
NEvent<void (NMouseEventArgs&event_args)> on_mouse_leave;
`} />
                <p><M>on_mouse_move</M> only fires on elements that have captured the mouse
                    using <M>NWindow::mouse_capture(NElement*)</M>.
                </p>
                <p><M>on_mouse_button_pressed</M>, and <M>on_mouse_button_released</M> fire on the topmost element
                    under the mouse cursor whose <M>clickable</M> property has been set to <M>true</M>, and bubbles up the
                    element tree from there.</p>
                <p><M>on_clicked</M> is fired on elements whose <M>clickable</M> property is set to <M>true</M> after an
                    appropriate on_mouse_button_pressed/on_mouse_button_released sequence. Handling either of the pressed or on_mouse_button_released
                    events will prevent the clikc from happening. NWindows also generates on <M>on_click</M> events
                    when the space or enter key is pressed and a clickable element has keyboard focus.
                </p>
                <p><M>on_mouse_enter</M> and <M>on_mouse_leave</M> events fire as the mouse cursor enters or
                    leaves the layout bounds of an element. The events are non-cancellable.</p>

                <p><M>NMouseEventArgs</M> is </p>
                <CodeFragment2 white text={`struct NMouseEventArgs : public NEventArgsBase {
        NMouseEventArgs(NElement* source);
        NMouseEventArgs();

        std::shared_ptr<NElement> target;
        
        NPoint cursor_position;

        bool button0_pressed;
        bool button1_pressed;
        bool button2_pressed;
        bool button3_pressed;

        bool shift;
        bool alt;
        bool ctrl;
    };
`} />
                <p>The <M>cursor_position</M> is in window coordinates (0,0, is at the top left corner of the
                    containing <M>NWindow</M>). To convert to element-relative coordinates, use</p>
                <Code text={`NPoint position = screen_to_element(event_args.cursor_position);`} />
                <p>If the mouse curor is outside the bounds of the current <M>NWindow</M>, <M>cursor_position</M> will
                be set to <M>{"{-1,-1}"}</M>
                </p> 
            </ClassDescription>

        </DocsPage>
    );
}

export default NWindowsEvents;
