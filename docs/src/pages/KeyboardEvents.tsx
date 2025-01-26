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
import M, { ML } from '../M';
import { SummaryClassDescription, EventDescription } from '../ClassDescription';
import { CodeFragment2 } from '../Code';




function KeyboardEvents() {
    return (
        <DocsPage route="/using/events/keyboard">

            <h1>{DocsTitle("/using/events/keyboard")}</h1>

            <SummaryClassDescription name="NElement">
                    <EventDescription
                        indexName="NEvent<void (NKeyEventArgs&event_args)> NElement::on_key"
                        event={
`NEvent<
    void (NKeyEventArgs&event_args)
> on_key;

 NEvent<
    void (NKeyCodeEventArgs&event_args)
> on_key_code;

`
                        } >
                        <p>Keyboard events are received by the <M>NElement</M> that has input focus. Focused elements do not receive keyboard events
                            if their <ML name="NElement::disabled" /> property is <M>true</M>.
                        </p>
                        <p>Keyboard events are first offered to the current focused element, and then bubble up
                            from the focused element to the root of the visual tree. When bubbling the active
                            window will receive keyboard events if no element handles the keyboard event first.
                            If there is no focused element, the event is fired on the currently active window only.
                        </p>
                        <p>Elements can take focus forcibly, by calling <ML fullName name="NElement::take_focus()"/>, but generally, focus navigation
                            is performed by the <M>handle_key</M> and <M>handle_key_code</M> methods of of <M>NWindow</M>, which only processes keyboard events after
                            the focused object has decided not to handle the keyboard event, and after observers if 
                            the <M>NWindow</M>s <ML name="NElement::on_key"/> and <ML name="NElement::on_key_code"/> events 
                            have decided not to handle the keyboard events.</p>
                        <p>Text characters are distributed by <M>handle_key</M>/<M>on_key</M> events, and
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

                        <CodeFragment2 text={`#define KEY_SMESSAGE	0612
    /* shifted message key */`} />

                        <p>Regrettably, the key code problem is one that percolates through all of Linux and even carries into
                            Windows ports of the ncurses libraries. So just press the keys and see what you get.</p>

                        <p>Key code event routing is the same as for key event routing.</p>
                    </EventDescription>
            </SummaryClassDescription>

        </DocsPage>
    );
}

export default KeyboardEvents;
