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
import ClassDescription, { MethodDescription, ClassSectionHead, UsingDescription, PropertyList, PropertyEntry, EventDescriptions, EventDescription, MethodDescriptions, TypeDefinitions, CreateDescriptions } from '../ClassDescription';
import M, { ML } from '../M';
import CenteredImage from '../CenteredImage';

function ClassNButtonElement() {

    let className = "NButtonElement";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name={className} baseClass="NButtonBaseElement">
                <p>
                    Displays a button control.
                </p>
                <CenteredImage src="/nwindows/image/sample_buttons.png" alt="Menu Element" />

                <TypeDefinitions>
                    <UsingDescription indexName={"NButtonElement::super"} declaration="using super = NButtonBaseElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NButtonElement::self"} declaration="using self = NButtonElement;" >
                    </UsingDescription>
                    <UsingDescription indexName="NButtonElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>


                <CreateDescriptions>

                    <MethodDescription indexName={[
                        `static NButtonElement::ptr create(const std::string& label, int width = AUTO_SIZE)`,
                        `static NButtonElement::ptr create()`
                    ]}
                        method={`static NButtonElement::ptr create();

static NButtonElement::ptr create(
    const std::string& title, 
    int width = AUTO_SIZE);`}
                    >
                        <div>
                            Return an <M>std::shared_ptr</M> to a newly-created <M>NButtonElement</M>. Optionally set 
                            the <ML name="NButtonElement::label"/> and <ML name="NElement::width" /> properties.
                        </div>
                    </MethodDescription>
                </CreateDescriptions>
                <ClassSectionHead text="Protected Constructors" />
                <MethodDescription indexName={[
                    `NButtonElement::NButtonElement(const std::string& label, int width, const std::string &tagName="Button")`
                ]}
                    method={`NButtonElement(
    const std::string& label,
    int width, 
    const std::string &tagName="Button");`}>
                    <div>Protected constructor. Use the <M>create</M> methods to create instances of <M>NButtonElement</M>.</div>
                </MethodDescription>
                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NButtonElement::label'>
                        <div>The text displayed on the button. If a '_' character appears within the label, the following 
                            character will be underlined and used as a shortcut key. Pressing the shortcut key will click the button.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="std::string" propertyName='NButtonElement::prefix'>
                        <div>Provided to allow customization. The text displayed before the label. Defaults to "[ ".</div>
                    </PropertyEntry>
                    <PropertyEntry type="std::string" propertyName='NButtonElement::suffix'>
                        <div>Provided to allow customization. The text displayed after the label. Defaults to " ]".</div>
                    </PropertyEntry>
                    <PropertyEntry type="NAlignment" propertyName='NButtonElement::label_alignment'>
                        <div>The alignment of the label text within the button. Defaults to <M>NAlignment::Center</M>.</div>
                    </PropertyEntry>
                    <PropertyEntry type="bool" propertyName='NButtonElement::disabled'>
                        <div>(Inherited from <ML name="NElement"/>). When true, the control is grayed out, and 
                        the button can no longer be clicked.</div>
                    </PropertyEntry>
                    
                </PropertyList>



                <EventDescriptions>
                    <EventDescription indexName={`NEvent<void(NButtonElement::ptr source, int selection)> NButtonElement::on_selection_changed`}
                        event={`NEvent<
    void(NButtonElement::ptr source, int selection)
> on_selection_changed;`}>
                        <div>Fired when the selected menu item changes. The <M>selection</M> parameter is the <M>item_id</M> of the selected menu item.
                        </div>
                    </EventDescription>
                </EventDescriptions>
                <MethodDescriptions>
                    <MethodDescription
                        indexName={`virtual bool NButtonElement::wants_shortcut_key(const std::string& key) override`}
                        method={`virtual bool wants_shortcut_key(
    const std::string& key
) override;`}>
                        <div>Overrides <ML fullName name="NElement::wants_shortcut_key" />. The default implementation
                            returns <M>true</M> if the key is the shortcut key for <M>label</M>. {

                            }.</div>
                    </MethodDescription>
                </MethodDescriptions>

            </ClassDescription>
        </DocsPage>
    );
}
export default ClassNButtonElement;
