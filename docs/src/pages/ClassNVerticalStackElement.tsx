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
import ClassDescription, { MethodDescription, ClassSectionHead, UsingDescription,
    PropertyList, PropertyEntry, MethodDescriptions, DefinitionList, 
    TypeDefinitions} from '../ClassDescription';
import M from '../M';

function ClassNVerticalStackElement() {

    let className = "NVerticalStackElement";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name="NVerticalStackElement" baseClass="NContainerElement">
                <p>
                    <M>NVerticalStackElement</M> stacks child elements vertically.
                </p>
                <TypeDefinitions>
                    <UsingDescription indexName={"NVerticalStackElement::super"} declaration="using super = NContainerElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NVerticalStackElement::self"} declaration="using self = NVerticalStackElement;" >
                    </UsingDescription>
                    <UsingDescription indexName="NVerticalStackElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>


                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName="static NVerticalStackElement::ptr NVerticalStackElement::create()"
                    method={`static NVerticalStackElement::ptr create();`}>
                    <div>
                        Creates a new <M>NVerticalStackElement</M>, and returns a shared_ptr to it.
                    </div>
                </MethodDescription>
                <ClassSectionHead text="Protected Constructors" />
                <MethodDescription indexName="NVerticalStackElement::NVerticalStackElement(const std::string &tag)"
                    method={`NVerticalStackElement(
    const std::string&tag = "VerticalStack);`}>
                    <div>
                        Constructs a <M>NVerticalStackElement</M> and sets the tag property.
                    </div>
                </MethodDescription>

                <PropertyList>
                    <PropertyEntry type="NAlignment" propertyName='NVerticalStackElement::alignment'>
                        <div>
                            <p>Controls how child elements are aligned within the <M>NVerticalStackElement</M>.</p>
                            <p>alignment can take the following values:</p>
                            <DefinitionList>
                                <div><M>NAlignment::Start</M></div>
                                <div>Aligns child elements to the start of

                                    the <M>NVerticalStackElement</M>.</div>

                                <div><M>NAlignment::Center</M></div>
                                <div>Centers child elements within the <M>NVerticalStackElement</M>.</div>

                                <div><M>NAlignment::End</M></div> 
                                <div>Aligns
                                    child elements to the end of the <M>NVerticalStackElement</M>.</div>

                                <div><M>NAlignment::Justify</M></div>
                                <div><p>Calculates
                                    the maximum width of all child elements, and then
                                    arranges each child element with the same width as the widest element.
                                </p>
                                <p>This is useful for case like listboxes, radio button groups, and menus, where you want 
                                    all child elements to have the same width.
                                </p>
                                </div>
                            </DefinitionList>
                            <p>
                                If the <M>width</M> property of the <M>NVerticalStackElement</M> is set to <M>AUTO_SIZE</M>, the <M>NVerticalStackElement</M> will
                                automatically resize to fit the width of the widest child element, if the alignment is set to <M>Start</M> or <M>Justify</M>;
                                and will expand to fill available width if the alignment is set to <M>Center</M> or <M>End</M>.
                            </p>

                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="int" propertyName='NVerticalStackElement::row_gap'>
                        <div>
                            Controls how many blank lines to put between each child element. Defaults to 0.
                        </div>
                    </PropertyEntry>

                </PropertyList>

                <MethodDescriptions>
                <MethodDescription indexName={[
                        "void NVerticalStackElement::add_child(const NElement::ptr& child)",
                        "void NVerticalStackElement::add_child(NElement::ptr&& child)"]}
                        method={`void add_child(NElement::ptr&& child);
void add_child(const NElement::ptr& child);`}>
                        <p>Inherited from <M>NContainerElement</M>.</p>
                        <p>Adds a child element to the container.</p>
                    </MethodDescription>

                </MethodDescriptions>

            </ClassDescription>

        </DocsPage>

    );

}
export default ClassNVerticalStackElement;
