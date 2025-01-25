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
    PropertyList, PropertyEntry, MethodDescriptions, 
    IndentedDefinitionList,
    TypeDefinitions} from '../ClassDescription';
import M, {ML} from '../M';

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


                <ClassSectionHead text="Create Methods" />
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
                            <p>Controls how child elements are aligned within the <M>NVerticalStackElement</M>. The <M>alignment</M> property
                            can take the following values:</p>
                            <IndentedDefinitionList>
                                <div><M>NAlignment::Start</M></div>
                                <p >Aligns child elements to the start of the <M>NVerticalStackElement</M>.</p>
                                <div><M>NAlignment::End</M></div>
                                <p>Right-justifies child elements within available space.</p>
                                <div><M>NAlignment::Center</M></div>
                                <p>Centers child elements within the <M>NVerticalStackElement</M>.</p>
                                <div><M>NAlignment::Justify</M></div>
                                <p>Calculates the maximum width of all child elements, and then arranges all child elements 
                                    with the same width as the widest element.</p>
                            </IndentedDefinitionList>
                            <p>
                                If the <M>width</M> property of the <M>NVerticalStackElement</M> is set to <M>AUTO_SIZE</M>, <M>NVerticalStackElement</M> expands
                                to fit available space if the width of the element is constrained, and will otherwise
                                resize to fit the width of its widest child element. The width of an <M>NVerticalStackElement</M> is constrained 
                                if any of the parents of the <M>NVerticalStackElement</M> have their width set to something 
                                other than <ML name="AUTO_SIZE" />.
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
