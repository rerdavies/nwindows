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

function ClassNCheckboxElement() {

    let className = "NCheckboxElement";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name={className} baseClass="NButtonBaseElement">
                <p>
                    Displays a checkbox control.
                </p>
                <CenteredImage src="/nwindows/image/sample_checkbox.png" alt="Menu Element" />

                <TypeDefinitions>
                    <UsingDescription indexName={"NCheckboxElement::super"} declaration="using super = NButtonBaseElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NCheckboxElement::self"} declaration="using self = NCheckboxElement;" >
                    </UsingDescription>
                    <UsingDescription indexName="NCheckboxElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>


                <CreateDescriptions>

                    <MethodDescription indexName={[
                        `static NCheckboxElement::ptr NCheckboxElement::create(const std::string& label, bool checked = false)`,
                        `static NCheckboxElement::ptr NCheckboxElement::create()`
                    ]}
                        method={`static NCheckboxElement::ptr create(
    const std::string& label, 
    bool checked = false);

static NCheckboxElement::ptr create();`
                    }
                    >
                        <div>
                            Return an <M>std::shared_ptr</M> to a newly-created <M>NCheckboxElement</M>. Optionally set 
                            the <ML name="NCheckboxElement::label"/> and <ML name="NCheckboxElement::checked" /> properties.
                        </div>
                    </MethodDescription>
                </CreateDescriptions>
                <ClassSectionHead text="Protected Constructors" />
                <MethodDescription indexName={[
                    `NCheckboxElement::NCheckboxElement(const std::string& text, bool checked,const std::string&tagName)`
                ]}
                    method={`NCheckboxElement(
    const std::string& text, 
    bool checked, const std::string&tagName = "Checkbox");`}>
                    <div>Protected constructor. Use the <M>create</M> methods to create instances of <M>NCheckboxElement</M>.</div>
                </MethodDescription>
                <PropertyList>
                    <PropertyEntry type="bool" propertyName='NCheckboxElement::checked'>
                        <div>When true, the checkbox is checked. Setting the property will update the 
                            onscreen rendering of the control appropriately.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="std::string" propertyName='NCheckboxElement::label'>
                        <div>The text displayed next to the checkbox. If a '_' character appears in the label, 
                        the following character will be underlined and used as a shortcut key.</div>
                    </PropertyEntry>
                    <PropertyEntry type="bool" propertyName='NCheckboxElement::disabled'>
                        <div>(Inherited from <ML name="NElement"/>). When true, the control is grayed out, and 
                        the control can no longer be clicked.</div>
                    </PropertyEntry>
                    <PropertyEntry type="std::string" propertyName='NCheckboxElement::checked_text'>
                        <div>Provided to allow customization. The text to display when the checkbox is checked. Defaults to "", which 
                            allows the control to display "&nbsp;🗹&nbsp;&nbsp;" if the display terminal supports Unicode, 
                            or "&nbsp;[X]&nbsp;&nbsp;" otherwise.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="std::string" propertyName='NCheckboxElement::unchecked_text'>
                        <div>Provided to allow customization. The text to display when the checkbox is unchecked. Defaults to "", which 
                            allows the control to display "&nbsp;☐&nbsp;&nbsp;" if the display terminal supports Unicode, 
                            or " [&nbsp;&nbsp;] " otherwise.
                        </div>
                    </PropertyEntry>
                    
                </PropertyList>



                <EventDescriptions>
                    <EventDescription
                        indexName={`NCheckboxElement::on_checked_changed`}
                        event={`NEvent<
    void(NCheckboxElement::ptr source, bool checked)
> on_checked_changed;`}>
                        <div>Invoked when the <M>checked</M> property changes. The <M>source</M> parameter is the 
                            <M>NCheckboxElement</M> that generated the event. The <M>checked</M> parameter is the new value of the 
                            <M>checked</M> property.
                        </div>
                    </EventDescription>
                </EventDescriptions>
                <MethodDescriptions>
                    <MethodDescription
                        indexName={`virtual bool NCheckboxElement::wants_shortcut_key(const std::string& key) override`}
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
export default ClassNCheckboxElement;
