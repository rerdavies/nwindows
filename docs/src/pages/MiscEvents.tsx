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
import ClassDescription, { EventDescription } from '../ClassDescription';



function NWindowsEvents() {
    return (
        <DocsPage route="/using/events/misc">
            <h1>{DocsTitle("/using/events/misc")}</h1>
            <ClassDescription name="NElement">
                <EventDescription indexName={["NEvent<void(NWindow*window)> NElement::on_attached",
                    "NEvent<void()> NElement::on_detaching"]}
                    event={`NEvent<void(NWindow*window)> on_attached;
NEvent<void()> on_detaching;
`} >
                    <p>
                        These events track life-cycle of the <M>NElement</M>.
                    </p><p><M>on_attached</M> fires after the element's <M>window</M> property first assigned
                        during creation of an owning <M>NWindow</M>. It occurs immediately before layout and rendering begins.
                        <M>on_attach</M> can fire as part of normal window startup, but can also fire if an element is added
                        to the visual tree of a currently-running window using <M>add_child</M>.
                    </p>
                    <p>
                        <M>on_detaching</M> fires just before the element's  <M>window()</M> property is set to <M>nullptr</M>, which
                        occurs when an element is removed from the visual tree of a running window, or when the owning <M>NWindow</M> is closed.
                    </p>
                </EventDescription>
                <EventDescription indexName={'NEvent<void (bool focused)> NElement::on_focused'} event='NEvent<void (bool focused)> on_focused;' >
                    The <M>focused</M> event fires when the <M>NElement</M> receives or loses input focus.
                </EventDescription>
            </ClassDescription>

            <ClassDescription name="NCheckboxElement">
                <EventDescription indexName="NEvent<void (bool checked)> NCheckboxElement::on_checked_changed" event={`NEvent<void (bool checked)> on_checked_changed;
`} >
                    <p>The <M>on_checked_changed</M> event fires when the <M>NCheckboxElement</M> changes its <M>checked</M> property.</p>
                </EventDescription>
            </ClassDescription>

            <ClassDescription name="NRadioGroupElement">
                <EventDescription indexName="NEvent<void (int value)> NRadioGroupElement::on_value_changed"
                    event={`NEvent<void (int value)> on_value_changed;`} >
                    <p>The <M>on_value_changed</M> event fires when the <M>NRadioGroupElement</M> changes its <M>value</M> property.</p>
                </EventDescription>
            </ClassDescription>

            <ClassDescription name="NDropdownElement">
                <EventDescription indexName="NEvent<void (int value)> NDropdownElement::on_value_changed" event={`NEvent<void (int value)> on_value_changed;`} >
                    <p>The <M>on_selected_changed</M> event fires when the <M>NDropdownElement</M> changes its <M>selected</M> property.</p>
                </EventDescription>
            </ClassDescription>

            <ClassDescription name="NTextEditElement">
                <EventDescription indexName="NEvent<void(const std::string&)> NTextEditElement::on_text_changed"
                 event={`NEvent<void(const std::string&)> on_text_changed;`} >
                    <p>The <M>on_selected_changed</M> event fires when the <M>NTextEditElement</M> changes its <M>selected</M> property.</p>
                </EventDescription>
                <EventDescription indexName="NEvent<void(const NTextSelection&selection)> NTextEditElement::on_selection_changed"
                event={`NEvent<void(const NTextSelection&selection)> on_selection_changed;`} >
                    <p>The <M>on_selected_changed</M> event fires when the <M>NTextEditElement</M> changes its <M>selection</M> property.</p>
                </EventDescription>

            </ClassDescription>




            <ClassDescription name="NWindow">
                <EventDescription indexName="NEvent<void (NElement::ptr focusElement)> NWindow::on_focus_changed" event={`NEvent<void (NElement::ptr focusElement)> on_focus_changed;`} >
                    <p>The <M>on_focus_changed</M> event fires when the <M>NWindow</M>'s focus object changes.</p>
                </EventDescription>
            </ClassDescription>



        </DocsPage>
    );
}

export default NWindowsEvents;
