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
import ClassDescription, {
    CreateDescriptions, MethodDescription, ClassSectionHead, UsingDescription, PropertyList,
    PropertyEntry, EventDescriptions, EventDescription, TypeDefinitions
} from '../ClassDescription';
import M, {ML} from '../M';
import CenteredImage from '../CenteredImage';

function ClassNRadioGroupElement() {

    let className = "NRadioGroupElement";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name={className} baseClass="NContainerElement">
                <p>
                    Displays a group of radio buttons. Only one radio button in the group can be selected at a time.
                </p>
                <CenteredImage src="/nwindows/image/sample_radiogroup.png" alt="Radio Group" />

                <TypeDefinitions>
                    <UsingDescription indexName={"NRadioGroupElement::super"} declaration="using super = NContainerElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NRadioGroupElement::self"} declaration="using self = NRadioGroupElement;" >
                    </UsingDescription>
                    <UsingDescription indexName="NRadioGroupElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>


                <CreateDescriptions>
                    <MethodDescription indexName={[
                        "static NRadioGroupElement::ptr NRadioGroupElement::create(NOrientation orientation, const std::vector<std::string>& labels, int selection)",
                        "static NRadioGroupElement::ptr NRadioGroupElement::create()",

                    ]}
                        method={`static NRadioGroupElement::ptr create(
    NOrientation orientation,
    const std::vector<std::string>& labels,
    int selection);

static NRadioGroupElement::ptr create();
`}>
                        <div>
                            Return an <M>std::shared_ptr</M> to a newly-created <M>NRadioGroupElement</M>. Optionally set
                            the <M>orientation</M>, <M>labels</M> and <M>selection</M> properties.
                        </div>
                    </MethodDescription>
                </CreateDescriptions>

                <ClassSectionHead text="Protected Constructor" />
                <MethodDescription indexName="static NRadioGroupElement::ptr NRadioGroupElement::create()"
                    method={`NRadioGroupElement(
    NOrientation orientation, 
    const std::vector<std::string>& labels, 
    int selection,
    const std::string&tagName="RadioGroup"
    );`}>
                </MethodDescription>

                <PropertyList>
                    <PropertyEntry type="NOrientation" propertyName='NRadioGroupElement::orientation'>
                        <div>
                            <p>Controls how radio buttons are stacked within the <M>NRadioGroupElement</M>.
                                Either <M>NOrientation::Horizontal</M> or <M>NOrientation::Vertical</M>. Defaults to <M>NOrientation::Vertical</M>.
                            </p>
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type={`std::vector<
    std::string>`} propertyName="labels">
                        <div>
                            <p>
                                Labels for each radio button. The number of labels determines the number of radio buttons.
                            </p><p>
                                If the '_' character appears in a label, the character which follows is treated as a short-cut key. The
                                short-cut key character will be underlined when the radio button is displayed.
                                NWindows performs locale-aware case-insensitive comparison of the short-cut key with keystrokes to
                                select the radio button.</p>
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="int" propertyName='NRadioGroupElement::selection'>
                        <div>
                            The index of the currently selected radio button. Defaults to 0. Set the selection to -1 to
                            deselect all radio buttons.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="int" propertyName='NRadioGroupElement::row_gap'>
                        <div>
                            Controls how many blank lines to put between each radio button when the orientation is vertical. Defaults to 0.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="int" propertyName='NRadioGroupElement::column_gap'>
                        <div>
                            Controls how many blank display columns to put between each radio button when the orientation is horizontal.
                            Defaults to 1.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="bool" propertyName='NRadioGroupElement::disabled'>
                        When set to <M>true</M> the radio button group is disabled, and all radio buttons are grayed out.
                    </PropertyEntry>

                    <PropertyEntry type="std::string" propertyName='NRadioGroupElement::checked_text'>
                        <div>
                            Provided to allow customization. The prefix text to display when a radio button is checked. Defaults to "", which
                            allows the element to choose <M>" ◉  "</M> on terminals that can display the character, and
                            fall back to <M>" (X)  "</M> on terminals that cannot.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="std::string" propertyName='NRadioGroupElement::unchecked_text'>
                        <div>
                            Provided to allow customization. The prefix text to display when a radio button is unchecked. Defaults to "", which
                            allows the element to choose <M>" ○  "</M> on terminals that can display the character, and
                            fall back to <M>" ( )  "</M> on terminals that do cannot.
                        </div>

                    </PropertyEntry>
                </PropertyList>

                <EventDescriptions>
                    <EventDescription indexName="NEvent<void(NRadioButtonGroupElement::ptr source, int selection)> NRadioGroupElement::on_selection_changed"
                        event={`NEvent<
    void(NRadioButtonGroupElement::ptr source, int selection)
> on_selection_changed;`}>
                        <p>
                             Fired when the <ML fullName name="NRadioButtonGroupElement::selection" /> property changes. 
                        </p>
                    </EventDescription>
                </EventDescriptions>

            </ClassDescription>
        </DocsPage>
    );

}
export default ClassNRadioGroupElement;
