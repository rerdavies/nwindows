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
import ClassDescription, { MethodDescription, ClassSectionHead, UsingDescription, PropertyList, PropertyEntry, MethodDescriptions, TypeDefinitions, IndentedDefinitionList } from '../ClassDescription';
import M, { ML } from '../M';
import Code from '../Code';

function ClassNHorizontalStackElement() {

    let className = "NHorizontalStackElement";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name="NHorizontalStackElement" baseClass="NContainerElement">
                <p>
                    <M>NHorizontalStackElement</M> stacks child elements horizontally.
                </p>

                <TypeDefinitions>
                    <UsingDescription indexName={"NHorizontalStackElement::super"} declaration="using super = NContainerElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NHorizontalStackElement::self"} declaration="using self = NHorizontalStackElement;" >
                    </UsingDescription>
                    <UsingDescription indexName="NHorizontalStackElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>


                <ClassSectionHead text="Create Methods" />
                <MethodDescription indexName="static NHorizontalStackElement::ptr NHorizontalStackElement::create()"
                    method={`static NHorizontalStackElement::ptr create();`}>
                    <div>
                        Creates a new <M>NHorizontalStackElement</M>, and returns a shared_ptr to it.
                    </div>
                </MethodDescription>
                <ClassSectionHead text="Protected Constructors" />
                <MethodDescription indexName="NHorizontalStackElement::NHorizontalStackElement(const std::string &tag)"
                    method={`NHorizontalStackElement(
    const std::string&tag = "VerticalStack);`}>
                    <div>
                        Constructs a <M>NHorizontalStackElement</M> and sets the tag property.
                    </div>
                </MethodDescription>

                <PropertyList>
                    <PropertyEntry type="NAlignment" propertyName='NHorizontalStackElement::alignment'>
                        <div>
                            <p>Controls how child elements are aligned within the <M>NHorizontalStackElement</M>. The <M>alignment</M> property
                            can take the following values:</p>
                            <IndentedDefinitionList>
                                <div><M>NAlignment::start</M></div>
                                <p>Aligns child elements to the start of the <M>NHorizontalStackElement</M>.</p>
                                <M>NAlignment::end</M>
                                <p>Right-justifies child elements within available space.</p>
                                <M>NAlignment::Center</M>
                                <p>Centers child elements within available space.</p>
                                <M>NAlignment::Justify</M>
                                <p>Not allowed. Behavior is undefined.</p>
                            </IndentedDefinitionList>

                            <p>When the alignment of an <M>NHorizontalStackElement</M> is set to <M>NAlignment::Center</M>,
                                or <M>NAlignment::end</M>, the width of the <M>NHorizontalStackElement</M> must be be constrained.
                                The width of an <M>NHorizontalStackElement</M> is constrained if any of the following conditions is true:
                            </p>
                            <ul>
                                <li>
                                    The width of the element is set to a value other than <M>AUTO_SIZE</M>.
                                </li>
                                <li>
                                    The width of one of the element's parents is set to a value other than <M>AUTO_SIZE</M>.
                                </li>
                                <li>One of the element's parents is an <ML name="NVerticalStackElement" /> whose alignment
                                    has been set to <M>NAlignment::Justify</M></li>
                            </ul>
                            <p>Consider the following example:</p>

                            <Code showLines text={`NVerticalStackElement::create()
    | alignment(NAlignment::Justify)
    | margins(2,0,2,0)
    | addChild(
        NTextElement::create(
            "Always do right. This will gratify "
            "some people and astonish the rest."
        )
     )
    | addChild(
        NTextElement::create("-- Mark Twain")
        | margins(5,0,0,1)
    )
    | addChild(
        NHorizontalStackElement::create()
        | alignment(NAlignment::End)
        | addChild(
            NButtonElement::create("OK")
            | width(10)
        )
    )
)`} />
                            <p>During layout, the <M>NTextElement</M> created at line 5 is measured as wanting
                                66 columns of display space. The NButtonElement is measured as wanting 10 columns
                                during the measure phase of layout. However, because the <M>NVerticalStackElement</M> created
                                at line 1 has an alignment of <M>NAlignment::Justify</M>, each of its child elements
                                are arranged with the width of the widest child: 66 columns, in this case.
                                The <M>NHorizontalStackElement</M>, because it is arranged with a width of 66
                                columns, now arranges its child (the button) to fill the space assigned to it. So
                                it right-justifies the button at the end of the 66 columns of space, and the
                                edge of the  <M>NButtonElement</M> will line up with the
                                end of the long text line when displayed.
                            </p>

                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="int" propertyName='NHorizontalStackElement::row_gap'>
                        <div>
                            Controls how many blank lines to put between each child element. Defaults to 0.
                        </div>
                    </PropertyEntry>

                </PropertyList>

                <MethodDescriptions>
                    <MethodDescription indexName={[
                        "void NHorizontalStackElement::add_child(const NElement::ptr& child)",
                        "void NHorizontalStackElement::add_child(NElement::ptr&& child)"]}
                        method={`void add_child(NElement::ptr&& child);
void add_child(const NElement::ptr& child);`}>
                        <p>Inherited from <M>NContainerElement</M>. Adds a child element to the <M>NHorizontalStackElement</M></p>
                    </MethodDescription>

                </MethodDescriptions>

            </ClassDescription>

        </DocsPage>

    );

}
export default ClassNHorizontalStackElement;
