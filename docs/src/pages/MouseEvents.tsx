import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import M from '../M';
import ClassDescription, { EventDescription } from '../ClassDescription';
import Code, { CodeFragment2 } from '../Code';



function NWindowsEvents() {
    return (
        <DocsPage route="/using/events/mouse">
            <h1>{DocsTitle("/using/events/mouse")}</h1>
            <ClassDescription name="NElement">
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
                    <p>If the mouse cursor is outside the bounds of the current <M>NWindow</M>, <M>cursor_position</M> will
                        be set to <M>{"{-1,-1}"}</M>
                    </p>
                </EventDescription>
            </ClassDescription>

        </DocsPage>
    );
}

export default NWindowsEvents;
