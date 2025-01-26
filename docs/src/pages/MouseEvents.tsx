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
import M,{ML} from '../M';
import { SummaryClassDescription, EventDescription } from '../ClassDescription';



function NWindowsEvents() {
    return (
        <DocsPage route="/using/events/mouse">
            <h1>{DocsTitle("/using/events/mouse")}</h1>
            <SummaryClassDescription name="NElement">
            <EventDescription
                        indexName={[
                            "NEvent<void (NMouseButton button,NClickedEventArgs&event_args)> NElement::on_clicked"
                        ]}
                        event={`NEvent<
    void (NMouseButton button,NClickedEventArgs&event_args)
> on_clicked;`}><p>
        Fires when an element is clicked. NWindows also fires on_click events when the space key is pressed.
    </p>
    <p>
        The <M>button</M> argument is of type <ML name="NMouseButton"/> and specifies which mouse button was clicked. 
        The <M>event_args</M> argument is of type <ML name="NClickedEventArgs" /> and  provides the state of the mouse buttons, and modifier keys. 
    </p>
    <p>Elements received on_click events only if their <ML name="NElement::clickable" /> and <ML name="NElement::focusable"/> properties
    are set to <M>true</M>, and if their <ML name="NElement::disabled"/> property is set to <M>false</M>.</p>
    <p>Handling either of the <M>on_mouse_button_pressed</M> or <M>on_mouse_button_released</M> events will prevent the <M>on_clicked</M> event from 
    firing.</p>
                    </EventDescription>
                    <EventDescription indexName={[
                            "NEvent<void (NMouseButton button,NMouseEventArgs&event_args)> NElement::on_mouse_button_pressed",
                            "NEvent<void (NMouseButton button,NMouseEventArgs&event_args)> NElement::on_mouse_button_released",
                    ]} event={`NEvent<
    void (NMouseButton button,NMouseEventArgs&event_args)
> on_mouse_button_pressed;

NEvent<
    void (NMouseButton button,NMouseEventArgs&event_args)
> on_mouse_button_released;`} >
    <p>Fires whenever a mouse button is pressed or released. The <M>button</M> argument is of
    type <ML name="NMouseButton" /> and specifies which mouse button was clicked. The <M>event_args</M> argument is of 
    type <ML name="NMouseEventArgs" /> and provides the current mouse position, 
    in window coordinates, and the state of mouse buttons, and modifier keys.
    </p>
    <p>Elements that hold mouse capture will receive <M>on_mouse_button_pressed</M> and <M>on_mouse_button_released</M> events
    regardless of the position of the mouse cursor. Elements that do not hold the mouse capture will only receive these events
    when the mouse cursor is over the element.</p>
                    </EventDescription>
                    <EventDescription                         indexName={[
                            "NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_enter",
                            "NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_leave",
                        ]}
                        event={
`NEvent<
    void (NMouseEventArgs&event_args)
> on_mouse_enter;

NEvent<void (
    NMouseEventArgs&event_args)
> on_mouse_leave;
`} 
                            >
                        <p>Fires when the mouse cursor enters or leaves the layout bounds of the element. The events are non-cancellable.</p>
                        <p>The <M>event_args</M> argument is of type <ML name="NMouseEventArgs" /> and provides the current mouse position,
                        in window coordinates, and the state of mouse buttons, and modifier keys.
                        </p>
                    </EventDescription>
                        
                    <EventDescription
                        indexName={[
                            "NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_move",
                        ]}
                        event={`NEvent<
    void (NMouseEventArgs&event_args)
> on_mouse_move;
`} >
                        <p><M>on_mouse_move</M> only fires on elements that have captured the mouse
                            using <ML fullName name="NWindow::mouse_capture()" />. However, it 
                            also fires on the currently active <ML name="NWindow" />. 
                        </p>
                    </EventDescription>
                    <EventDescription indexName={[
                        "NEvent<void ()>  NElement::on_mouse_lost_capture",
                    ]}
                    event={`NEvent<
    void ()
>  on_mouse_lost_capture;`} >
                        <p>Fires on the element which has mouse capture if capture is lost. 
                        </p>
                    </EventDescription>
            </SummaryClassDescription>

        </DocsPage>
    );
}

export default NWindowsEvents;
