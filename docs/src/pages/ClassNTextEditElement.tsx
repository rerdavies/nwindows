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
    CreateDescriptions,
    MethodDescriptions, MethodDescription, UsingDescription, PropertyList, PropertyEntry,
    EventDescription, TypeDefinitions, EventDescriptions
} from '../ClassDescription';
import M, { ML } from '../M';
import CenteredImage from '../CenteredImage';
import Code from '../Code';

function ClassNTextEditElement() {

    return (
        <DocsPage route="/apis/classes/NTextEditElement">
            <h1>{DocsTitle("/apis/classes/NTextEditElement")}</h1>

            <ClassDescription name="NTextEditElement" baseClass="NElement">
                <p>
                    <M>NTextEditElement</M> is an input control that allows editing of text.
                </p>
                <CenteredImage src="/nwindows/image/sample_textedit.png" alt="TextEdit Element" />

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



                <TypeDefinitions>
                    <UsingDescription indexName={"NTextEditElement::super"} declaration="using super = NElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NTextEditElement::self"} declaration="using self = NTextEditElement;" >
                    </UsingDescription>
                    <UsingDescription indexName="NTextEditElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>

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
                    <PropertyEntry type="std::string" 
                        propertyName="NTextEditElement::text" 
                    >
                        <div>The current value of the text being edited.</div>
                    </PropertyEntry>

                    <PropertyEntry type="std::string" propertyName='NTextEditElement::normalized_text'>
                        <div>(read only) The text of the edit box in UTF-8 NFC normalized form (with combining accents composed). Should be
                            identical to the text property.
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="std::string" propertyName='NTextEditElement::decomposed_text'>
                        <div>(read only) The text of the edit box in UTF-8 NFD decomposed form (with accented characters decomposed
                            into combining accent characters). NWindows prefers NFD form, so this property should only be
                            used if you need to pass text in NFD canonical form to an external library or application.</div>
                    </PropertyEntry>

                    <PropertyEntry type="NTextSelection" propertyName='NTextEditElement::selection'>
                        <div>
                            The current text selection. <M>NTextSelection::start</M> determines the start of the current
                            select. <M>NTextSelect::length</M> determines the length of the selection, and may be negative.
                            The cursor is displayed at . <M>NTextSelect::length + NTextSelect::length</M>.
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NTextEditElement::password'>
                        <div>When set to true, text in the control will be masked on the display.</div>
                    </PropertyEntry>

                    <PropertyEntry type="int" propertyName='NTextEditElement::cursor_position'>
                        <div>The column of the current cursor position on the display terminal in element coordinates (relative to the left-side
                            of the control).
                        </div>
                    </PropertyEntry>

                    <PropertyEntry propertyName="selection" type="NTextSelection" >
                        <div>The current selection of text. See <ML name="NTextSelection" />.</div>
                    </PropertyEntry>
                </PropertyList>
                <EventDescriptions>
                    <EventDescription indexName="NTextEditElement::on_text_changed"
                        event={`NEvent<
    void(NTextEditElement::ptr source, const std::string&)
> on_text_changed;`} >
                        <div>Called when <ML name="NTextEditElement::text" /> property changes.</div>
                    </EventDescription>
                    <EventDescription indexName="NTextEditElement::on_selection_changed"
                        event={`NEvent<
    void(NTextEditElement::ptr source, NTextSelection selection)
> on_selection_changed;`} >
                        <div>Called when selection of text in the control changes.</div>
                    </EventDescription>
                </EventDescriptions>
                <MethodDescriptions>
                    <MethodDescription indexName="void NTextEditElement::select_all()"
                        method={`void select_all();`} >
                        <div>Selects all text in the control.</div>
                    </MethodDescription>
                    <MethodDescription indexName="void NTextEditElement::select_start()"
                        method={`void select_start();`} >
                        <div>Sets the selection to the start of text in the control.</div>
                    </MethodDescription>
                    <MethodDescription indexName="void NTextEditElement::select_end()"
                        method={`void select_end();`} >
                        <div>Sets the selection to the end of text in the control.</div>
                    </MethodDescription>
                    <MethodDescription indexName="void NTextEditElement::cut()"
                        method={`void cut();`} >
                        <div>Cuts the current selection to the clipboard.</div>
                    </MethodDescription>
                    <MethodDescription indexName="void NTextEditElement::copy()"
                        method={`void copy();`} >
                        <div>Copies the current selection to the clipboard.</div>
                    </MethodDescription>
                    <MethodDescription indexName="void NTextEditElement::paste()"
                        method={`void paste();`} >
                        <div>Pastes the contents of the clipboard into the <M>NTextEditControl</M>.</div>
                    </MethodDescription>
                    <MethodDescription indexName="void NTextEditElement::replace_selection(const std::string&text)"
                        method={`void NTextEditElement::replace_selection(const std::string&text);`} >
                        <div>Replace the currently selected text with the supplied text.</div>
                    </MethodDescription>
                    <MethodDescription indexName="void NTextEditElement::delete_selection()"
                        method={`void NTextEditElement::delete_selection();`} >
                        <div>Delete the contents of the current selection.</div>
                    </MethodDescription>
                    <MethodDescription indexName={[
                        "void NTextEditElement::character_filter(const std::function<bool(char32_t c)>& filter, int position)",
                        "void NTextEditElement::character_filter(std::function<bool(char32_t c)>&& filter,int position)"
                    ]}
                        method={`void character_filter(
    const std::function<bool(char32_t c, int position)>
        & filter);

void character_filter(
    std::function<bool(char32_t c, int position)>
        && filter);`} >
                        <div>
                            Sets a filter on the characters that can be entered into the control. The filter function should return
                            true if the character is allowed, and false if it is not. <M>position</M> is the measured in display
                            columns. i.e. The position of the first character in the current text is zero; and the position increments
                            by 0, 1 or 2 columns depending whether the character is a composing accent, a normal-width character,
                            or a double-width character.
                        </div>
                    </MethodDescription>

                </MethodDescriptions>
            </ClassDescription>

        </DocsPage>

    );
    }
export default ClassNTextEditElement;
