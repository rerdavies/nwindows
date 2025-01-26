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



function NWindowsEvents() {
    let route = "/using/events/other";
    return (
        <DocsPage route={route}>
            <h1>{DocsTitle(route)}</h1>
            <SummaryClassDescription name="NElement">
                <EventDescription indexName={["NEvent<void(NWindow*window)> NElement::on_attached",
                    "NEvent<void()> NElement::on_detaching"]}
                    event={`NEvent<void(NWindow*window)> on_attached;
NEvent<void()> on_detaching;
`} >
                    <p>
                        These events track life-cycle of the <M>NElement</M>.
                    </p><p><M>on_attached</M> fires after the element's <ML name="NElement::window" /> property is first assigned
                        during creation of an owning <M>NWindow</M>. It occurs immediately before layout and rendering
                        begins. <M>on_attach</M> can also fire if an element is added
                        to the visual tree of a currently-running window using <ML name="NContainerElement::add_child" />.
                    </p>
                    <p>
                        <M>on_detaching</M> fires just before the element's  <M>window</M> property is set to <M>nullptr</M>, which
                        occurs when an element is removed from the visual tree of a running window, or when the owning <M>NWindow</M> is closed.
                    </p>
                </EventDescription>
                <EventDescription indexName={'NEvent<void (bool focused)> NElement::on_focused'} event='NEvent<void (bool focused)> on_focused;' >
                    The <M>focused</M> event fires when the <M>NElement</M> receives or loses keyboard focus.
                </EventDescription>
            </SummaryClassDescription>

            <SummaryClassDescription name="NCheckboxElement">
                <EventDescription
                    indexName={`NCheckboxElement::on_checked_changed`}
                    event={`NEvent<
    void(NCheckboxElement::ptr source, bool checked)
> on_checked_changed;`}>
                    <div>Fires when the <ML fullName name="NCheckboxElement::checked" /> property changes. The <M>source</M> parameter is
                        the <M>NCheckboxElement</M> that generated the event. The <M>checked</M> parameter is the new value of the
                        <M>checked</M> property.
                    </div>
                </EventDescription>
            </SummaryClassDescription>

            <SummaryClassDescription name="NRadioGroupElement">
                <EventDescription indexName="NEvent<void(NRadioButtonGroupElement::ptr source, int selection)> NRadioGroupElement::on_selection_changed"
                    event={`NEvent<
    void(NRadioButtonGroupElement::ptr source, int selection)
> on_selection_changed;`}>
                    <p>
                        Fired when the <ML fullName name="NRadioButtonGroupElement::selection" /> property changes.
                    </p>
                </EventDescription>
            </SummaryClassDescription>

            <SummaryClassDescription name="NDropdownElement">
                <EventDescription indexName={`NEvent<void(NDropdownElement::ptr source, int selection)> NDropdownElement::on_selection_changed`}
                    event={`NEvent<
    void(NDropdownElement::ptr source, int selection)
> on_selection_changed;`}>
                    <div>Fired when the selected menu item changes. The <M>selection</M> parameter is
                        the <ML name="NMenuItem::item_id" /> of the selected menu item.
                    </div>
                </EventDescription>
            </SummaryClassDescription>

            <SummaryClassDescription name="NTextEditElement">
                <EventDescription indexName="NTextEditElement::on_text_changed"
                    event={`NEvent<
    void(NTextEditElement::ptr source, const std::string&)
> on_text_changed;`} >
                    <div>Called when <ML fullName name="NTextEditElement::text" /> property changes.</div>
                </EventDescription>
                <EventDescription indexName="NTextEditElement::on_selection_changed"
                    event={`NEvent<
    void(NTextEditElement::ptr source, NTextSelection selection)
> on_selection_changed;`} >
                    <div>Called when selection of text in the control changes.</div>
                </EventDescription>
            </SummaryClassDescription>


            <SummaryClassDescription name="NMenuElement">
                <EventDescription indexName={`NEvent<void(NMenuElement::ptr source)> NMenuElement::on_opening`}
                    event={`NEvent<
    void(NMenuElement::ptr source)
> on_opening;`}>
                    <div>Fired before the menu dropdown opens. If you need to update menu items, you can set
                        the <ML fullName name="NMenuElement::menu_items" /> property in the handler for this event.
                    </div>
                </EventDescription>
                <EventDescription indexName={`NEvent<void(NMenuElement::ptr source)> NMenuElement::on_closed`}
                    event={`NEvent<
    void(NMenuElement::ptr source)
> on_closed;`}>
                    <div>Fired after the menu dropdown closes.</div>
                </EventDescription>
                <EventDescription indexName={`NEvent<void(NMenuElement::ptr source, int selection)> NMenuElement::on_item_selected`}
                    event={`NEvent<
    void(NMenuElement::ptr source, int selection)
> on_item_selected;`}>
                    <div>Fired when a menu item is selected. The <M>selection</M> parameter is the index of the selected menu item.
                    </div>
                </EventDescription>

            </SummaryClassDescription>


            <SummaryClassDescription name="NWindow">
                <EventDescription indexName="NEvent<void (NElement::ptr focusElement)> NWindow::on_focus_changed" event={`NEvent<void (NElement::ptr focusElement)> on_focus_changed;`} >
                    <p>The <M>on_focus_changed</M> event fires when the <M>NWindow</M>'s focus object changes.</p>
                </EventDescription>
                <EventDescription indexName={`NEvent<void(NWindow::ptr source, bool activated)> NWindow::on_is_active_changed`}
                    event={`NEvent<
    void(NWindow::ptr source, bool activated)
> on_is_active_changed;`}>
                    <p>Fires when the window becomes active or inactive.</p>
                </EventDescription>

            </SummaryClassDescription>

            <SummaryClassDescription name="NPopupMenuWindow">
                <EventDescription indexName={`NEvent<void(NPopupMenuWindow::ptr source, int item_id)> NPopupMenuWindow::on_item_selected`}
                    event={`NEvent<
    void(NPopupMenuWindow::ptr source, int item_id)
> on_item_selected;`}
                >
                    <div>Fired when a menu item is selected. <M>item_id</M> is the <ML name="NMenuItem::item_id" /> of the 
                    selected menu item.</div>
                </EventDescription>
                <EventDescription indexName={`NEvent<void(NPopupMenuWindow::ptr source)> NPopupMenuWindow::on_cancelled`}
                    event={`NEvent<
    void(NPopupMenuWindow::ptr source)
> on_cancelled;`}
                >
                    <div>Fired when the menu is closed without selecting a menu item.</div>
                </EventDescription>

            </SummaryClassDescription>


        </DocsPage>
    );
}

export default NWindowsEvents;
