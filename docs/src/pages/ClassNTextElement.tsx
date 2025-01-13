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
import ClassDescription, {MethodDescription,ClassSectionHead,UsingDescription, PropertyList, PropertyEntry, EnumDescription, EnumDefinitionList} from '../ClassDescription';
import M from '../M';
import CenteredImage from '../CenteredImage';

function ClassNTextElement() {

    return (
        <DocsPage route="/apis/classes/NTextElement">
            <h1>{DocsTitle("/apis/classes/NTextElement")}</h1>

            <ClassDescription name="NTextElement" baseClass="NElement">
                <p>
                    The <M>NTextElement</M> displays text.
                </p>
                <ClassSectionHead text="Type Definitions" />
                <UsingDescription indexName={"NTextElement::super"} declaration="using super = NElement;" >
                </UsingDescription>
                <UsingDescription indexName={"NTextElement::self"} declaration="using self = NTextElement;" >
                </UsingDescription>
                <UsingDescription indexName="NTextElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                </UsingDescription>

                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName={
                    ["static NTextElement::ptr NTextElement::create()",
                    "static NTextElement::ptr NTextElement::create(const std::string& text)",
                    "static NTextElement::ptr NTextElement::create(const std::string& text, NAttribute attribute)"
                    ]
                    } 
                method={`static NTextElement::ptr create();

static NTextElement::ptr create(const std::string& text);

static NTextElement::ptr 
create(
    const std::string& text, 
    NAttribute attribute);
`} >
    Create a new NTextElement, returning a shared_ptr. Optionally, set the <M>text</M> and <M>text_attribute</M> properties.
    </MethodDescription>

                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NTextElement::text'>
                        <div>The text to display. The contents of the string are treated as UTF-8-encoded text.</div>
                    </PropertyEntry>


                    <PropertyEntry type="NColorPair" propertyName='NTextElement::color'>
                        <div>Actually of type <M>std::optional&lt;NColorPair&gt;</M>. The foreground and background
                            colors to use when displaying the text. See <M>NWindow::make_color</M>. Defaults to unset.
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NTextElement::wrap_text'>
                        <div>When false, text is displayed as a single line of text. When true, text is word-wrapped to
                            fit the width of the element. Defaults to false.</div>
                    </PropertyEntry>

                    <PropertyEntry type="NAlignment" propertyName='NTextElement::alignment'>
                        <div>The alignment of text within the element. <M>NAlignment::Start</M>, <M>NAlignment::Center</M> or <M>NAlignment::End</M> </div>
                    </PropertyEntry>

                    <PropertyEntry type={
                        `std::optional<
  NAttribute>`}
                        propertyName="NTextElement::text_attribute">
                        <div>
                            <p>Modifies how text is displayed.
                            </p>
                                <CenteredImage 
                                    src="/nwindows/image/sample_attributes.png" 
                                    alt="Sample attributes"  />
                            <p>The <M>text_attribute</M> property can take the following values:</p>

                            <EnumDescription enumName="NAttribute" prefix="enum class">
                                <EnumDefinitionList>
                                    <div>Normal</div>
                                    <div>Normal text.</div>

                                    <div>Underline</div>
                                    <div>Underlined text.</div>

                                    <div>Bold</div>
                                    <div>Bold text.</div>

                                    <div>Reverse</div>
                                    <div>Reverse text</div>

                                    <div>Standout</div>
                                    <div>Best highlighted mode of the terminal</div>

                                    <div>Dim</div>
                                    <div>Half-bright text.</div>

                                    <div>Invisible</div>
                                    <div>Invisible text.</div>

                                    <div>Protected</div>
                                    <div>Protected text.</div>

                                    <div>Blink</div>
                                    <div>Blinking. Doesn't work on xterm-like devices.</div>

                                    <div>AltChar</div>
                                    <div>Don't use. Use <M>print_acs</M> instead.</div>

                                    <div>CharText</div>
                                    <div>Don't use.</div>
                                </EnumDefinitionList>

                            </EnumDescription>
                            <p>
                                Support
                                for each of these attributes varies by terminal type, and depends entirely on the capabilities
                                of the underlying <M>ncursesw</M> library. Support is provided as-is. Defaults to unset.</p>

                        </div>
                    </PropertyEntry>
                </PropertyList>
            </ClassDescription>

        </DocsPage>

    );
}
export default ClassNTextElement;
