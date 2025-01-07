import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import M from '../M';
import ClassDescription, { MethodDescription } from '../ClassDescription';



function NWindowsEvents() {
    return (
        <DocsPage route="/using/events/misc">
            <h1>{DocsTitle("/using/events/misc")}</h1>
            <ClassDescription className="NElement">
                <MethodDescription method={`NEvent<void(NWindow*window)> on_attached;
NEvent<void()> on_detached;
`} >
                    <p>
                        These events track life-cycle of the <M>NElement</M>.
                    </p><p><M>on_attached</M> fires after the element's <M>window</M> property first assigned
                        during creation of an owning <M>NWindow</M>. It occurs immediately before layout and rendering begins.
                        <M>on_attach</M> can fire as part of normal window startup, but can also fire if an element is added
                        to the visual tree of a currently-running window using <M>add_child</M>.
                    </p>
                    <p>
                        <M>on_detached</M> fires just before the element's  <M>window()</M> property is set to <M>nullptr</M>, which
                        occurs when an element is removed from the visual tree of a running window, or when the owning <M>NWindow</M> is closed.
                    </p>
                </MethodDescription>
                <MethodDescription method='NEvent<void (bool focused)> on_focused;' >
                    The <M>focused</M> event fires when the <M>NElement</M> receives or loses input focus.
                </MethodDescription>
            </ClassDescription>

            <ClassDescription className="NCheckboxElement">
                <MethodDescription method={`NEvent<void (bool checked)> on_checked_changed;
`} >
                    <p>The <M>on_checked_changed</M> event fires when the <M>NCheckboxElement</M> changes its <M>checked</M> property.</p>
                </MethodDescription>
            </ClassDescription>

            <ClassDescription className="NRadioGroupElement">
                <MethodDescription method={`NEvent<void (int value)> on_value_changed;`} >
                    <p>The <M>on_value_changed</M> event fires when the <M>NRadioGroupElement</M> changes its <M>value</M> property.</p>
                </MethodDescription>
            </ClassDescription>

            <ClassDescription className="NDropdownElement">
                <MethodDescription method={`NEvent<void (int value)> on_value_changed;`} >
                    <p>The <M>on_selected_changed</M> event fires when the <M>NDropdownElement</M> changes its <M>selected</M> property.</p>
                </MethodDescription>
            </ClassDescription>

            <ClassDescription className="NTextEditElement">
                <MethodDescription method={`NEvent<void(const std::string&)> on_text_changed;`} >
                    <p>The <M>on_selected_changed</M> event fires when the <M>NTextEditElement</M> changes its <M>selected</M> property.</p>
                </MethodDescription>
                <MethodDescription method={`NEvent<void(const NTextSelection&selection)> on_selection_changed;`} >
                    <p>The <M>on_selected_changed</M> event fires when the <M>NTextEditElement</M> changes its <M>selection</M> property.</p>
                </MethodDescription>

            </ClassDescription>




            <ClassDescription className="NWindow">
                <MethodDescription method={`NEvent<void (NElement::ptr focusElement)> on_focus_changed;`} >
                    <p>The <M>on_focus_changed</M> event fires when the <M>NWindow</M>'s focus object changes.</p>
                </MethodDescription>
            </ClassDescription>



        </DocsPage>
    );
}

export default NWindowsEvents;
