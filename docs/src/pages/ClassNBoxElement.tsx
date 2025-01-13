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
    PropertyList, PropertyEntry, MethodDescriptions } from '../ClassDescription';
import M from '../M';

function ClassNBoxElement() {

    let className = "NBoxElement";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>

            <ClassDescription name={className} baseClass="NElement">
                <p>
                    <M>NBoxElement</M> renders a box around a single child element. By default, with <M>width</M> and <M>height</M> set
                    to <M>AUTO_SIZE</M> the box will be sized to fit the child element.
                </p>
                <ClassSectionHead text="Type Definitions" />
                <UsingDescription indexName={"NBoxElement::super"} declaration="using super = NElement;" >
                </UsingDescription>
                <UsingDescription indexName={"NBoxElement::self"} declaration="using self = NBoxElement;" >
                </UsingDescription>
                <UsingDescription indexName="NBoxElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                </UsingDescription>

                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName={
                    ["static NBoxElement::ptr NBoxElement::create()"
                    ]
                }
                    method={`static NBoxElement::ptr create();`} >
                    Create a new NBoxElement, returning a shared_ptr.
                </MethodDescription>

                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NBoxElement::title'>
                        <div>When set to a non-empty string, the title text will be displayed on the top border
                            of the rendered box. The contents of the string are treated as UTF-8-encoded text.</div>
                    </PropertyEntry>


                    <PropertyEntry type={`std::optional<
   NColorPair>`} propertyName={`NBoxElement::color`}>
                        <div>The foreground and background
                            colors to use when displaying the box. See <M>NWindow::make_color</M>. Defaults to unset.
                        </div>
                    </PropertyEntry>

                </PropertyList>

                <MethodDescriptions>
                        <MethodDescription indexName={[
                            "void NBoxElement::add_child(const NElement::ptr& child)",
                            "void NBoxElement::add_child(NElement::ptr&& child)"]}
                            method={`virtual void add_child(
    NElement::ptr&& child
) override;

virtual void add_child(
    const NElement::ptr& child
) override;
 `}>
    <p>
                            Overrides <M>NContainerElement::add_child</M>.
                            </p><p>
                            Adds a child element to the container. You may only add one child element.
                            This method will throw an exception if you try to add a second child element.
                            </p>
                        </MethodDescription>

                    </MethodDescriptions>

            </ClassDescription>

        </DocsPage>

    );

}
export default ClassNBoxElement;
