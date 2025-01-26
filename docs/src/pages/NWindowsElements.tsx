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
import {
    SummaryClassDescription, MethodDescription, ClassSectionHead, EnumDescription, PropertyEntry,
    CreateDescriptions, PropertyList, EnumDefinitionList,
    IndentedDefinitionList
} from '../ClassDescription';
import Code from '../Code';
import SectionHead from '../SectionHead';
import CenteredImage from '../CenteredImage';
import { Link } from 'react-router-dom';


function NWindowsElements() {
    return (
        <DocsPage route="/using/elements">
            <h1>{DocsTitle("/using/elements")}</h1>
            <p>This section describes elements used for UI composition in NWindows. </p>
            <p>Descriptions of classes in this section are abridged. They contain
                documentation only on those properties and methods germane to controlling layout and display of NWindows elements.
            </p>
            <p>Event handling is discussed in the <Link to="/using/events">NWindows Events</Link> section of this document; and a complete unabridged description
                of each of these classes is provided in the <Link to="/apis">NWindows API Reference</Link> section of this document.
                Click on the <i>link</i> (🔗) icon on the right of each class header to view full API documentation for that class.
            </p>

            <SectionHead text="General Layout" />
            <p>All NWindows elements have a <M>width</M>, a <M>height</M>, and a <M>margin</M> property. <M>width</M>,
                and <M>height</M> properties default to a value of <M>AUTO_SIZE</M>, which generally means that the element
                will be sized to fit its content. The <M>margin</M> property is of type  <ML name="NThickness" />
                which specifies the width of the top, left, right and bottom margins.
            </p>

            <SectionHead text="Properties Shared by All Elements" />

            <p>All NWindows elements inherit from the <M>NElement</M> class. <M>NElement</M> provides a number of important properties,
                which are available on all NWindows elements.</p>


            <SummaryClassDescription name="NElement">
                <p><M>NElement</M> is the common base class for all NWindows elements. All NWindows elements have these 
                properties.</p>
                <PropertyList>

                    <PropertyEntry type="int" propertyName='NElement::width'>
                        <div>Controls the width of the element. If set to <M>AUTO_SIZE</M>, the width of the element
                            will adjust to fit the width of its content at layout time.</div>
                    </PropertyEntry>

                    <PropertyEntry type="int" propertyName='NElement::height'>
                        <div>Controls the height of the element. If set to <M>AUTO_SIZE</M>, the height of the
                            element will adjust to fit the height of its content at layout time.</div>
                    </PropertyEntry>

                    <PropertyEntry type="NSize" propertyName='NElement::size'>
                    <div>A convenience property that gets and sets both <M>width</M> and <M>height</M> properties at the
                            same time.
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="NRect" propertyName='NElement::margin'>
                        <div>Controls the amount of blank space display outside the element. The <M>width</M> and <M>height</M> of
                            the element do not include space allocated for margins. Defaults to <M>NRect(0,0,0,0)</M></div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NElement::disabled'>
                        <div>Present on all objects, but Only has effect for input controls elements. Has no effect for elements of other types.
                            Setting disabled to true will gray out the control to which it is applied. Discussion of effects on event handling
                            for the object will be deferred to a later section. Set to <M>false</M> by default. </div>
                    </PropertyEntry>
                    <PropertyEntry type="bool" propertyName='NElement::request_initial_focus'>
                        <div>Present on all objects, but Only has effect for focusable elements. Has no effect for elements of other types.
                            NWindows will focus the first element in the window that has <M>request_initial_focus</M> set to <M>true</M> when
                            the window is first created. If no element has this property set, NWindows will give initial focus to the
                            first focusable element in the visual tree. Defaults to <M>false</M>.</div>
                    </PropertyEntry>
                </PropertyList>
            </SummaryClassDescription>


            <SectionHead text="Layout Elements" />

            <SummaryClassDescription name="NVerticalStackElement" baseClass="NContainerElement">
                <p>
                    <M>NVerticalStackElement</M> stacks child elements vertically.
                </p>
                <ClassSectionHead text="Create Methods" />
                <MethodDescription indexName="static NVerticalStackElement::ptr NVerticalStackElement::create()"
                    method={`static NVerticalStackElement::ptr create();`}>
                    <div>
                        Creates a new <M>NVerticalStackElement</M>, and returns a shared_ptr to it.
                    </div>
                </MethodDescription>

                <PropertyList>
                    <PropertyEntry type="NAlignment" propertyName='NVerticalStackElement::alignment'>
                        <div>
                            <p style={{marginTop: 0}}>Controls how child elements are aligned within the <M>NVerticalStackElement</M>. 
                            The <M>alignment</M> property can take the following values:</p>
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

            </SummaryClassDescription>
            <SummaryClassDescription name="NHorizontalStackElement" >
                <p>
                    <M>NHorizontalStackElement</M> stacks child elements horizontally.
                </p>

                <ClassSectionHead text="Create Methods" />
                <MethodDescription indexName="static NHorizontalStackElement::ptr NHorizontalStackElement::create()"
                    method={`static NHorizontalStackElement::ptr create();`}>
                    <div>
                        Creates a new <M>NHorizontalStackElement</M>, and returns a shared_ptr to it.
                    </div>
                </MethodDescription>

                <PropertyList>
                    <PropertyEntry type="NAlignment" propertyName='NHorizontalStackElement::alignment'>
                        <div>
                            <p>
                                Controls how child elements are aligned within the <M>NHorizontalStackElement</M>. 
                                The <M>alignment</M> property can take any of the following values:
                            </p>
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

                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="int" propertyName='NHorizontalStackElement::column_gap'>
                        <div>
                            Controls how many blank columns to put between each child element. Defaults to 0.
                        </div>
                    </PropertyEntry>
                </PropertyList>
            </SummaryClassDescription>

            <SectionHead text="Rendering Elements" />

            <SummaryClassDescription name="NTextElement">
                <p>
                    The <M>NTextElement</M> displays text.
                </p>
                <ClassSectionHead text="Create Methods" />
                <MethodDescription indexName={
                    ["static NTextElement::ptr NTextElement::create()",
                        "static NTextElement::ptr NTextElement::create(const std::string& text)",
                        "static NTextElement::ptr NTextElement::create(const std::string& text, NAttribute attribute)"
                    ]
                }
                    method={`static NTextElement::ptr create();

static NTextElement::ptr create(const std::string& text);

static NTextElement::ptr create(
    const std::string& text, 
    NAttribute attribute);
`} >
                    Create a new NTextElement, returning a shared_ptr. Optionally, set the <M>text</M> and <M>text_attribute</M> properties.
                </MethodDescription>


                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NTextElement::text'>
                        <div>The text to display. The contents of the string are treated as UTF-8-encoded text.</div>
                    </PropertyEntry>


                    <PropertyEntry type={`std::optional<
  NColorPair>`} propertyName='NTextElement::color'>
                        <div>The foreground and background
                            colors to use when displaying the text. See <ML fullName name="NWindow::make_color_pair" />. Defaults to unset.
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
                                alt="Sample attributes" />
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
            </SummaryClassDescription>

            <SummaryClassDescription name="NBoxElement">
                <p>Displays a box border around its child element. <M>NBoxElement</M> can have only
                    one child element.</p>
                <CenteredImage
                    src="/nwindows/image/sample_box.png"
                    alt="Sample box"
                />
                <ClassSectionHead text="Create Methods" />
                <MethodDescription indexName={
                    ["static NBoxElement::ptr NBoxElement::create()"
                    ]
                }
                    method={`static NBoxElement::ptr create();`} >
                    Create a new NBoxElement, returning a shared_ptr.
                </MethodDescription>


                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NBoxElement::title'>
                        <div>Optionally, displays a title on the borders of the box. Defaults to "" (no title).</div>
                    </PropertyEntry>

                    <PropertyEntry type={
                        `std::optional<
  NColorPair>`
                    } propertyName='NBoxElement::color'>
                        <div>The foreground and background
                            colors to use display the box and its title. Defaults to unset.
                        </div>
                    </PropertyEntry>
                </PropertyList>
            </SummaryClassDescription>

            <SectionHead text="Input Elements" />

            <SummaryClassDescription name="NButtonElement">
                <p>Displays a button that can be clicked.</p>
                <CenteredImage
                    src="/nwindows/image/sample_button.png"
                    alt="Sample button"
                />

                <p>
                    If <M>width</M> is <M>AUTO_SIZE</M>, the
                    button wraps the label of the button tightly. Generally, it's a good idea to
                    set width to a larger value to give the label some breathing room. </p>
                <p>If the character '_' is present in the label text, the following character will be
                    treated as a hot key. If the label were "_Apple", NWindows would simulate a click on the
                    button when the 'a' key is pressed. Case comparison of the hot key against pressed keys is
                    case-insensitive, and locale-aware. So, for example, "a" and "A" are considered to be the same key, but in a
                    Turkish locale, "i" and "I" are considered to be different keys.
                </p>

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
                            the <ML name="NButtonElement::label" /> and <ML name="NElement::width" /> properties.
                        </div>
                    </MethodDescription>
                </CreateDescriptions>

                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NButtonElement::label'>
                        <div>The text to display on the button.</div>
                    </PropertyEntry>

                    <PropertyEntry type="NAlignment" propertyName='NButtonElement::label_alignment'>
                        <div>
                            The alignment of the label within the button. <M>NAlignment::Start</M>, <M>NAlignment::Center</M> or <M>NAlignment::End</M>.
                            Defaults to <M>NAlignment::Center</M>.
                        </div>
                    </PropertyEntry>


                    <PropertyEntry type="std::string" propertyName='NButtonElement::prefix'>
                        <div><p>Text to display before the label. Could be used to display UTF-8 icons
                            in a button. For example, </p>
                            <Code white text={`
NButtonElement::create()
    | width(10)
    | alignment(NAlignment::Start)
    | label("OK!")
    | start_text("[ 😁 "
`} />

                            <p>Defaults to "[ ".</p></div>
                    </PropertyEntry>


                    <PropertyEntry type="std::string" propertyName='NButtonElement::suffix'>
                        <div>Text to display after the label. Defaults to " ]".</div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NButtonElement::disabled'>
                        <div>(Inherited from NElement). When true, the button is disabled, and grayed out.</div>
                    </PropertyEntry>

                </PropertyList>
            </SummaryClassDescription>

            <SummaryClassDescription name="NTextEditElement">
                <p>Displays a text box that allows editing of text.</p>
                <CenteredImage
                    src="/nwindows/image/sample_textedit.png"
                    alt="Sample NTextEditElement"
                />

                <p>
                    The <M>text</M> property of
                    the <M>NTextEditElement</M> is the text displayed in the text box. While editing,
                    text is maintained in Unicode NFC canonical form (combining accents are combined with the
                    preceding letter on the fly).
                </p><p>
                    <M>NTextEditElement</M> supports the Linux X11/Wayland clipboard when running on an <M>xterm</M>-like terminal
                    if the <M>xclip</M> program has been previously installed.
                </p>
                <p>
                    You can control which characters may be entered in a <M>NTextEditElement</M> using
                    the following methods (and their corresponding manipulator):
                </p>
                <Code white text={
                    `void character_filter(const std::function<bool(char32_t c, int position)>& filter);
void character_filter(std::function<bool(char32_t c, int position)>&& filter);
`} />
                <p>So you could, for example, restrict the text of an edit box to (European) digits only using the following code:</p>
                <Code white text={
                    `NTextEditElement::create()
    | character_filter(
        [](char32_t c, int _) {
            return c >= L'0' && c <= L'9'; 
        }
    )
`} />
                <p>
                    The units of the <M>selection</M> property are specified as a <M>char</M> index into the
                    current text.  The start and end position of the selection must not fall in the middle of
                    a UTF-8 character sequence, and should not be positioned in the middle of a Unicode
                    <i>Modifier Sequence</i>.  Setting valid selections is a fairly hard problem.
                    <M>NTextEditElement</M> provides the following methods to deal with
                    simple selection operations:
                </p>
                <Code white text={
                    `void select_all();
void select_start();
void select_end();
`} />

                <p><M>width</M> must be set to an explicit value, and must not be set to AUTO_SIZE.
                    For <M>NTextEditElements</M>s, <M>width</M> defaults to 10, but the expectation is that you
                    will explicitly set a more appropriate width.</p>

                <CreateDescriptions>
                    <MethodDescription indexName={
                        [
                            "static NTextEditElement::ptr NTextEditElement::create(const std::string& defaultText)",
                        ]
                    }
                        method={`static NTextEditElement::ptr create(
    const std::string& defaultText = ""
);`} >
                        <div>
                            Return a std::shared_ptr to a newly-created <M>NTextEditElement</M>. Optionally, set the <M>text</M> property to an initial value.
                        </div>
                    </MethodDescription>
                </CreateDescriptions>


                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NTextEditElement::text'>
                        <div>The text to display in the text box.</div>
                    </PropertyEntry>

                    <PropertyEntry type="std::string" propertyName='NTextEditElement::normalized_text'>
                        <div>(read only) The text of the edit box in UTF-8 normalized form (with combining accents composed).</div>
                    </PropertyEntry>

                    <PropertyEntry type="std::string" propertyName='NTextEditElement::decomposed_text'>
                        <div>(read only) The text of the edit box in UTF-8 decomposed form (with accented characters decomposed
                            into combining accent characters).</div>
                    </PropertyEntry>

                    <PropertyEntry type="NTextSelection" propertyName='NTextEditElement::selection'>
                        <div>
                            The current text selection. <M>NTextSelection::start</M> determines the start of the current
                            select. <M>NTextSelect::length</M> determines the length of the selection, and may be negative.
                            The cursor is displayed at . <M>NTextSelect::length + NTextSelect::length</M>.
                        </div>
                    </PropertyEntry>

                    <div>bool</div>
                    <div>password</div>
                    <div>When true, text is displayed as '*'s.</div>

                    <div>bool</div>
                    <div>disabled</div>
                    <div>
                        (Inherited from NElement). When true, editing is disabled, and the control is grayed out.
                    </div>
                </PropertyList>
            </SummaryClassDescription>
            <SummaryClassDescription name="NCheckboxElement">
                <p>Displays a checkbox control.</p>
                <CenteredImage
                    src="/nwindows/image/sample_checkbox.png"
                    alt="Sample checkbox"
                />
                <p>Checkmarks are displayed with Unicode characters on xterm-like devices. <M>NCheckboxElement</M>falls back to
                    using ASCII characters on terminals that do not have full Unicode support.
                </p>

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

                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NCheckboxElement::label'>
                        <div>The label for the checkbox. If a '_' character is found in the label, the character which follows
                            will be treated as a shortcut key. See <M>NButtonElement</M> for a detailed discussion of how
                            shortcut keys are handled. </div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NCheckboxElement::checked'>
                        <div>Whether the control is checked or unchecked.</div>
                    </PropertyEntry>

                    <PropertyEntry type="std::string" propertyName='NCheckboxElement::checked_text'>
                        <div>Allows customization of the control. The utf-8 text to display for the checkmark when the control is checked. Defaults to "",
                            which allows the control to decide for itself whether it wants to use Unicode characters or ASCII text
                            to display the checkmark. <M>checked_text</M> and <M>unchecked_text</M> should both have the same
                            display length.
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="std::string" propertyName='NCheckboxElement::unchecked_text'>
                        <div>Allows customization of the control. The utf-8 text to display for the checkmark when the control is unchecked. Defaults to "",
                            which allows the control to decide for itself whether it wants to use Unicode characters or ASCII text
                            to display the checkmark.
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NCheckboxElement::disabled'>
                        <div>(Inherited from NElement). When true, the checkbox is disabled, and grayed out.</div>
                    </PropertyEntry>



                </PropertyList>

            </SummaryClassDescription>
            <SummaryClassDescription name="NRadioGroupElement">
                <p>Displays a group of radio buttons.</p>
                <CenteredImage
                    src="/nwindows/image/sample_radiogroup.png"
                    alt="Sample NRadioGroupElement"
                />
                <p>Checkmarks are display with Unicode characters on xterm-like devices. <M>NRadioGroupElement</M> falls back to using ASCII characters
                    on terminals that do not have full Unicode support.
                </p>
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
            </SummaryClassDescription>
            <SummaryClassDescription name="NDropdownElement">
                <p>A dropdown control that allows selection of values from a list.</p>
                <CenteredImage src="/nwindows/image/sample_dropdown.png" alt="Sample dropdown" />
                <p><M>NDropdownElement</M> allows users to select from a list items. The list of items
                    is provided to <M>NDropdownElement</M> as a <M>std::vector</M> of <M>NMenuItem</M>s.
                    When an item is selected, the <M>selected</M> property is set to
                    the <M>item_id</M> of the selected menu item, and the <M>on_selection_changed</M> event
                    is fired.
                </p>
                <p>You only need to set a label and an item_id in each menu 
                    item. <M>NDropdownElement</M> will focus the currently selected menu item when the
                    dropdown opens. However, <M>NDropdownElement</M> does support advanced features
                    that <M>NMenuItem</M> provides, such as icons, checkmarks, submenus, and dividers.
                    See the <M>NMenuItem</M> documentation for more information, should you improbably decided
                    that you would like to use these features with an <M>NDropdownElement</M>.
                </p>

                <p><M>NDropdownElement</M> does not support scrolling in the dropdown popup, so the size of the <M>menu_items</M> list
                    should be kept modest.</p>


                    <CreateDescriptions>
                    <MethodDescription indexName={[
                        "static NDropdownElement::ptr NDropdownElement::create(const std::vector<NMenuItem>& menu_items, int selected)",
                        "static NDropdownElement::ptr NDropdownElement::create(std::vector<NMenuItem>&& menu_items, int selected)",
                        "static NDropdownElement::ptr NDropdownElement::create()"
                    ]}
                        method={`static NDropdownElement::ptr create(
    const std::vector<NMenuItem>& menu_items, 
    int selected);

static NDropdownElement::ptr create(
    std::vector<NMenuItem>&& menu_items, 
    int selected;    

static NDropdownElement::ptr create();
    `}
                    >
                        <div>
                            Return an <M>std::shared_ptr</M> to a newly-created <M>NDropdownElement</M>. Optionally set the <M>menu_items</M> and <M>selected</M> properties.
                        </div>
                    </MethodDescription>
                </CreateDescriptions>

                <PropertyList>
                    <PropertyEntry type={`std::vector<
  NMenuItem>`} propertyName='NDropdownElement::menu_items'>
                        <div>The list of items to display in the dropdown.</div>
                    </PropertyEntry>

                    <PropertyEntry type="int" propertyName='NDropdownElement::selected'>
                        <div>The <M>item_id</M> of the selected menu item. Defaults to -1 (no selection).
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NDropdownElement::disabled'>
                        <div>(Inherited from NElement). When true, the dropdown is disabled, and grayed out.</div>
                    </PropertyEntry>
                </PropertyList>
            </SummaryClassDescription>

            <SummaryClassDescription name="NMenuElement" baseClass="NButtonBaseElement">
                <p><M>NMenuElement</M> menu header for a single menu item, displays a popup menu
                    when clicked, or when the hot key is pressed. Submenus are supported, as are menu menu_items
                    with checkmarks, or with icons.
                </p>
                <div style={{ display: "flex", flexFlow: "row nowrap", columnGap: 16, justifyContent: "start", alignItems: "flex-start" }}>
                    <div style={{ flex: "1 1 0px" }} />
                    <img src="/nwindows/image/sample_menuelement.png" style={{ flex: "0 1 auto" }} alt="Menu" />
                    <img src="/nwindows/image/sample_menu_icons.png" style={{ flex: "0 1 auto" }} alt="Menu Icons" />
                    <div style={{ flex: "1 1 0px" }} />
                </div>
                <CreateDescriptions>

                    <MethodDescription indexName={[
                        "static NMenuElement::ptr NMenuElement::create(const std::string& label, std::vector<NMenuItem>&& menu_items)",
                        "static NMenuElement::ptr NMenuElement::create(const std::string& label, const std::vector<NMenuItem>& menu_items)",
                        "static NMenuElement::ptr NMenuElement::create()"
                    ]}
                        method={`static NMenuElement::ptr create(
    const std::string& label,
    std::vector<NMenuItem>&& menu_items);

static NMenuElement::ptr create(
    const std::string& label,
    const std::vector<NMenuItem>& menu_items);    

static NMenuElement::ptr create();
    `}
                    >
                        <div>
                            Return an <M>std::shared_ptr</M> to a newly-created <M>NMenuElement</M>. Optionally set the <M>label</M> and <M>menu_items</M> properties.
                        </div>
                    </MethodDescription>
                </CreateDescriptions>

                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NMenuElement::label'>
                        <div>The text to display for the menu item. If there is a '_' character
                            in the label, the following character is treated as a hot key. See <M>NButtonElement</M> for a detailed discussion of how
                            hot keys are handled.</div>
                    </PropertyEntry>
                    <PropertyEntry type={`std::vector<
    NMenuItem>`} propertyName='NMenuElement::menu_items'>
                            <div>The list of menu items to display in the menu. See <M>NMenuItem</M> for details on how to create menu items.</div> 
                        </PropertyEntry>
                    <PropertyEntry type="bool" propertyName='NMenuElement::disabled'>
                        <div>(Inherited from NElement). When true, the menu item is disabled, and grayed out.</div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NMenuElement::open'>
                        <div>Whether the menu popup is being displayed or not. Setting <M>open</M>
                            to <M>true</M> will display the menu popup, and setting it to <M>false</M> will close the menu popup.
                        </div>
                    </PropertyEntry>
                </PropertyList>
            </SummaryClassDescription>

            <SectionHead text="Building-Block Elements" />

            <p>NWindows provides two addition <M>NElement</M> classes that constitute base classes for
                other elements, and are used when building custom elements. Their proper use will be
                covered in subsequent sections, but they are mentioned here for completeness. Neither
                element is directly useful when composing user interfaces.</p>
            <p><ML name="NButtonBaseElement"/> is a base class for button-like elements that
                can be clicked or focused, and must show clicked, or selected, or focused state when
                rendered.
            </p>
            <p><ML name="NContainerElement" /> is the base class for all <M>NElement</M>s that have
                child elements.
            </p>
        </DocsPage>
    );
}

export default NWindowsElements;
