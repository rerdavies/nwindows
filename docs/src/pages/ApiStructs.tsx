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
import {
    ClassSectionHead, ConstantDescription, MethodDescription, MethodDescriptions, StructDescription,
    FieldDefinitionList, FieldDescriptions, FieldEntry, OperatorDescriptions, ConstructorDescriptions
} from '../ClassDescription';
import M, { ML } from '../M';

function ApiStructs() {

    return (
        <DocsPage route="/apis/structs">
            <h1>{DocsTitle("/apis/structs")}</h1>

            <StructDescription name="NClickedEventArgs" baseClass="NEventArgsBase">
                <ConstructorDescriptions>
                    <MethodDescription indexName="NClickedEventArgs::NClickedEventArgs(NElement* source, NElement* target, const NRect& location, bool is_mouse_click)"
                        method={`NClickedEventArgs(
    NElement* source, 
    NElement* target, 
    const NRect& location, 
    bool is_mouse_click)`} >
                    </MethodDescription>
                </ConstructorDescriptions>
                <FieldDescriptions>
                    <FieldDefinitionList>
                        <div>{`std::shared_ptr
<NElement>`}
                        </div>
                        <div>target</div>
                        <div>The element that was clicked. May be a child element of the
                            current element if the event is bubbling.
                        </div>
                        <div>bool</div>
                        <div>is_mouse_click</div>
                        <div>Whether the click was generated by a mouse click or a keyboard event.</div>

                        <div>NRect</div>
                        <div>location</div>
                        <div>If the event was generated by a mouse click, a zero-width, zero-height rectangle
                            with the top-left corner at the current mouse position. If generated by a keyboard
                            event, the layout bounds of the target element.
                        </div>

                        <div>bool</div>
                        <div>alt</div>
                        <div>Whether the alt key was pressed when the event was generated.</div>

                        <div>bool</div>
                        <div>ctrl</div>
                        <div>Whether the ctrl key was pressed when the event was generated</div>

                        <div>bool</div>
                        <div>shift</div>
                        <div>Whether the shift key was pressed when the event was generated.</div>

                        <div>{`std::shared_ptr
<NElement>`}</div>
                        <div>source</div>
                        <div>The source of the event. (Inherited from <ML name="NEventArgsBase" />)</div>

                        <div>{`std::shared_ptr
<NWindow>`}</div>
                        <div>window</div>
                        <div>The <M>NWindow</M> to which the source is attached. (Inherited
                            from <ML name="NEventArgsBase" />)</div>

                        <div>bool</div>
                        <div>handled</div>
                        <div>Set <M>handled</M> to true to prevent further processing of the event. (Inherited
                            from <ML name="NEventArgsBase" />.
                        </div>

                    </FieldDefinitionList>
                </FieldDescriptions>
            </StructDescription>


            <StructDescription name="NColorPalette">
                <p>Defines a set of colors used by NWindows elements for rendering. The colors are defined as 24-bit
                    0xRRGGBB values. You can optionally supply a color palette other than the default
                    when constructing a top-level window.</p>
                <FieldDescriptions>
                    <FieldDefinitionList>
                        <div>uint32_t</div>
                        <div>Black</div>
                        <div>Defaults to 0x000000</div>

                        <div>uint32_t</div>
                        <div>White</div>
                        <div>Defaults to 0xC0C0C0</div>

                        <div>uint32_t</div>
                        <div>WindowFrameBackground</div>
                        <div>Defaults to 0x000000</div>

                        <div>uint32_t</div>
                        <div>WindowFrameForeground</div>
                        <div>Defaults to 0xC0C0C0</div>

                        <div>uint32_t</div>
                        <div>BrightWhite</div>
                        <div>Defaults to 0xFFFFFF</div>

                        <div>uint32_t</div>
                        <div>Disabled</div>
                        <div>Defaults to 0x808080</div>

                        <div>uint32_t</div>
                        <div>HoverBackground</div>
                        <div>Defaults to 0x686868</div>

                        <div>uint32_t</div>
                        <div>HoverForeground</div>
                        <div>Defaults to BrightWhite</div>

                        <div>uint32_t</div>
                        <div>FocusBackground</div>
                        <div>Defaults to 0x585858</div>

                        <div>uint32_t</div>
                        <div>FocusForeground</div>
                        <div>Defaults to BrightWhite</div>

                        <div>uint32_t</div>
                        <div>SelectedBackground</div>
                        <div>Defaults to 0x808080</div>

                        <div>uint32_t</div>
                        <div>SelectedForeground</div>
                        <div>Defaults to BrightWhite</div>

                        <div>uint32_t</div>
                        <div>Error</div>
                        <div>Defaults to 0xE00000</div>

                    </FieldDefinitionList>
                </FieldDescriptions>
            </StructDescription>


            <StructDescription name="NEventArgsBase">
                <p>The common base class of NWindows input events.</p>
                <ClassSectionHead text="Protected Constructors" />
                <MethodDescription indexName="NEventArgsBase::NEventArgsBase(NElement* source)"
                    method="NEventArgsBase::NEventArgsBase(NElement* source)"
                ></MethodDescription>
                <FieldDescriptions>
                    <FieldDefinitionList>
                        <FieldEntry type={`NElement::ptr`} name="NEventArgsBase::source" >
                            <div>The source of the event.</div>
                        </FieldEntry>

                        <FieldEntry type={`NWindow::ptr`} name="NEventArgsBase::window" >
                            <div>The window that the source element is attached to.
                            </div>
                        </FieldEntry>

                        <FieldEntry type="bool" name="NEventArgsBase::handled" >
                            <div>Whether the event has been handled. For cancellable events,
                                set <M>handled</M> to true to prevent further processing.
                            </div>
                        </FieldEntry>
                    </FieldDefinitionList>
                </FieldDescriptions>
            </StructDescription>

            <StructDescription name="NKeyEventArgs" baseClass="NEventArgsBase">
                <ConstructorDescriptions>
                    <MethodDescription indexName="NKeyEventArgs::NKeyEventArgs(NElement* source, char32_t key)"
                        method={`NKeyEventArgs( NElement* source, char32_t key)`} >
                    </MethodDescription>
                    <FieldDescriptions>
                        <FieldDefinitionList>
                            <FieldEntry type={`NElement::ptr`} name="NElement::target" >
                                <div>The element that has focus in the current window. May be a child of the current
                                    element if the event is bubbling. May be empty if the event is fired on
                                    an <M>NWindow</M> and no element has focus.
                                </div>
                            </FieldEntry>

                            <FieldEntry type={`char32_t`} name="NKeyEventArgs::key" >
                                <div>The Unicode codepoint of the key that was pressed.</div>
                            </FieldEntry>

                            <FieldEntry type={`NElement::ptr`} name="NKeyEventArgs::source" >
                                <div>The source of the event. (Inherited from <ML name="NEventArgsBase" />)</div>
                            </FieldEntry>

                            <FieldEntry type={`NWindow::ptr`} name="NKeyEventArgs::window" >
                                <div>The <M>NWindow</M> to which the source is attached. (Inherited
                                    from <ML name="NEventArgsBase" />)</div>
                            </FieldEntry>

                            <FieldEntry type="bool" name="NKeyEventArgs::handled" >
                                <div>Set <M>handled</M> to true to prevent further processing of the event. (Inherited
                                    from <ML name="NEventArgsBase" />.
                                </div>
                            </FieldEntry>

                        </FieldDefinitionList>
                    </FieldDescriptions>
                </ConstructorDescriptions>
            </StructDescription>


            <StructDescription name="NMenuItem">
                <p>Represents a menu in a popup or dropdown menu. If the label value of an <M>NMenuItem</M> contains
                    an '_' character, the following character in the label is considered to be a hot key, which
                    will be underlined when displayed. Hot keys are case insensitive and respect the current locale
                    of the computer where NWindows is running.</p>
                <p>There are three primary variants of NMenuItems: regular menu items, submenu items, and separators.
                    An NMenuItem with a label of "-" is considered to be a separator; but NMenuItem provides a
                    static <M>NMEnuItem::Separator()</M> method which returns an NMenuItem with all member variables
                    set to appropriate values.
                </p>
                <p>Menu items can be displayed with a Unicode icon, or with space allocated for a checkmark
                    (but not both). Controls and windows that display menus will indent other menu items in the
                    same menu (or submenu) as required to provide consistent left alignment of labels.
                    Member variables that control checkmarks and icons are not set by constructors; they
                    must be set once the menu item has been created.
                </p>

                <ClassSectionHead text="Constants" />
                <ConstantDescription indexName="const int NO_ITEM_ID"
                    constant={`static constexpr int NO_ITEM_ID = 
    std::numeric_limits<int>::min();`} >
                    The item_id for menu items that can never be selected.
                </ConstantDescription>

                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName={"NMenuItem::NMenuItem()"} method="NMenuItem()" >
                    <p>Default constructor.</p>
                </MethodDescription>
                <MethodDescription indexName={"NMenuItem::NMenuItem()"} method="NMenuItem()" >
                    <p>Default constructor.</p>
                </MethodDescription>
                <MethodDescription indexName="NMenuItem::NMenuItem(const std::string &label, int item_id, bool enabled)"
                    method={`NMenuItem(
    const std::string text, 
    int item_id, 
    bool enabled = true)`} >
                    <p>Constructor for an ordinary menu item with the specified item_id. If a '_' character appears
                        in the label, the following character is used as a hotkey (e.g. "Save _As").
                        If <M>enabled</M> is false, the menu item is grayed out, and cannot be selected. If
                        <M>label</M> is set to "-", the menu item is displayed as a divider.
                    </p>
                </MethodDescription>
                <MethodDescription indexName="NMenuItem::NMenuItem(const std::string &label, const std::vector<NMenuItem> &submenu, bool enabled)"
                    method={`NMenuItem(
    const std::string text,
    const std::vector<NMenuItem>& submenu,
    bool enabled = true)`} >
                    <p>Constructors sub-menu menu item. the <M>submenu</M> argument takes
                        a <M>std::vector</M> of menu items to display in the submenu flyout.  </p>
                </MethodDescription>
                <MethodDescription indexName="NMenuItem::NMenuItem(const std::string&icon, const std::string &label, int item_id, bool enabled)"
                    method={`NMenuItem(
    const std::string icon,
    const std::string text, 
    int item_id, 
    bool enabled = true)`} >
                    <p>Constructors menu item with a Unicode icon. The <M>icon</M> argument should contain a single Unicode character.
                    </p>
                </MethodDescription>
                <MethodDescription indexName="NMenuItem::NMenuItem(bool checked,const std::string &label, int item_id, bool enabled)"
                    method={`NMenuItem(
    bool checked,
    const std::string text, 
    int item_id, 
    bool enabled = true)`} >
                    <p>Constructors menu item with a checkmark. The <M>checked</M> argument determines whether a checkmark is displayed.
                    </p>
                </MethodDescription>

                <MethodDescription indexName="static NMenuItem NMenuItem::Divider()"
                    method={`static NMenuItem Divider()`} >
                    Constructs an NMenuItem with all fields correctly set to display a divider.
                </MethodDescription>
                <FieldDescriptions>
                    <FieldDefinitionList>
                        <div>std::string</div>
                        <div>label</div>
                        <div>Text to display in the menu item. '_' characters are used to indicate hotkeys.</div>

                        <div>int</div>
                        <div>item_id</div>
                        <div>The id used to identify menu selected menu items.</div>

                        <div>bool</div>
                        <div>enabled</div>
                        <div><M>true</M> if the menu item is enabled and can be selected.</div>

                        <div>bool</div>
                        <div>display_check</div>
                        <div>Whether space should be reserved to display a checkmark.</div>

                        <div>bool</div>
                        <div>checked</div>
                        <div>Whether to display a checkmark.</div>

                        <div>std::string</div>
                        <div>icon</div>
                        <div>A single Unicode character to display to the left of the label, encoded in UTF-8.</div>

                        <div></div>

                    </FieldDefinitionList>
                </FieldDescriptions>
                <MethodDescriptions>
                    <MethodDescription
                        indexName="NMenuItem::display_checkmark(bool checked)" method="NMenuItem& display_checkmark(bool checked)" >
                        <p>Set the <M>display_check</M> and <M>checked</M> member variables in one operation.</p>
                    </MethodDescription>
                    <MethodDescription indexName="bool NMenuItem::is_divider() const" method="bool is_divider() const" >
                        <p>Returns <M>true</M> if the menu item is a divider.</p>
                    </MethodDescription>
                </MethodDescriptions>
            </StructDescription>


            <StructDescription name="NMouseEventArgs" baseClass="NEventArgsBase">
                <ConstructorDescriptions>
                    <MethodDescription indexName="NMouseEventArgs::NMouseEventArgs(NElement* source)"
                        method={`NMouseEventArgs(NElement* source)`} >
                    </MethodDescription>
                    <MethodDescription indexName="NMouseEventArgs::NMouseEventArgs()"
                        method={`NMouseEventArgs()`} >
                    </MethodDescription>
                </ConstructorDescriptions>
                <FieldDescriptions>
                    <FieldDefinitionList>
                        <FieldEntry type={`NElement::ptr`} name="MouseEventArgs::target" >
                            <div>If the mouse has been captured, the element which has mouse capture; otherwise, the
                                topmost element at the current mouse position. May be a child element of the
                                the current element if the event is bubbling.
                            </div>
                        </FieldEntry>

                        <FieldEntry type={`NElement::ptr`}
                            name="MouseEventArgs::source" >
                            <div>The source of the event. (Inherited from <ML name="NEventArgsBase" />)</div>
                        </FieldEntry>

                        <FieldEntry type={`NWindow::ptr`}
                            name="MouseEventArgs::window" >
                            <div>The <M>NWindow</M> to which the source is attached. (Inherited
                                from <ML name="NEventArgsBase" />)</div>

                        </FieldEntry>
                        <div>bool</div>
                        <div>handled</div>
                        <div>Set <M>handled</M> to true to prevent further processing of the event. (Inherited
                            from <ML name="NEventArgsBase" />.
                        </div>


                        <FieldEntry type="NPoint" name="MouseEventArgs::cursor_position" >
                            <div>The current position of the mouse cursor in window coordinates. (0,0) is at the top_left
                                corner of the current <M>NWindow</M>. If the mouse position is outside the current <M>NWindow</M>,
                                the position is set to (-1,-1). Convert to element coordinates
                                using <M>NElement::window_to_element</M>.
                            </div>
                        </FieldEntry>
                        <FieldEntry type="bool" name="MouseEventArgs::button0_pressed" >
                            <div>Whether the left mouse button is pressed.</div>
                        </FieldEntry>
                        <FieldEntry type="bool" name="MouseEventArgs::button1_pressed" >
                            <div>Whether the middle mouse button is pressed.</div>
                        </FieldEntry>

                        <FieldEntry type="bool" name="MouseEventArgs::button2_pressed" >
                            <div>Whether the right mouse button is pressed.</div>
                        </FieldEntry>

                        <FieldEntry type="bool" name="MouseEventArgs::button3_pressed" >
                            <div>Whether the fourth mouse button is pressed.</div>
                        </FieldEntry>

                        <FieldEntry type="bool" name="MouseEventArgs::shift" >
                            <div>Whether the shift key was pressed when the event fired.</div>
                        </FieldEntry>
                        <FieldEntry type="bool" name="MouseEventArgs::alt" >
                            <div>Whether the alt key was pressed when the event fired.</div>
                        </FieldEntry>

                        <FieldEntry type="bool" name="MouseEventArgs::ctrl" >
                            <div>Whether the ctrl key was pressed when the event fired.</div>
                        </FieldEntry>


                    </FieldDefinitionList>
                </FieldDescriptions>
            </StructDescription>


            <StructDescription name="NPoint">
                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName="NPoint::NPoint()" method="NPoint()" >
                    <p>Default constructor. Initializes x and y to 0.</p>
                </MethodDescription>
                <MethodDescription indexName="NPoint::NPoint(int x, int y)" method="NPoint(int x, int y)" >
                </MethodDescription>
                <FieldDescriptions>
                    <FieldDefinitionList>
                        <div>int</div>
                        <div>x</div>
                        <div>The x-coordinate of the point.</div>

                        <div>int</div>
                        <div>y</div>
                        <div>The y-coordinate of the point.</div>
                    </FieldDefinitionList>
                </FieldDescriptions>
                <OperatorDescriptions>
                    <MethodDescription indexName="bool NPoint::operator==(const NPoint& other) const" method="bool operator==(const NPoint& other) const" >
                    </MethodDescription>
                    <MethodDescription indexName="NPoint NPoint::operator+(const NPoint& other) const" method="NPoint operator+(const NPoint& other) const" >
                    </MethodDescription>
                    <MethodDescription indexName="NPoint NPoint::operator-(const NPoint& other) const" method="NPoint operator-(const NPoint& other) const" >
                    </MethodDescription>
                    <MethodDescription indexName="NPoint NPoint::operator-() const" method="NPoint operator-() const" >
                        <p>returns <M>NPoint(-this-&gt;x,-this-&gt;y)</M>.</p>
                    </MethodDescription>

                </OperatorDescriptions>
            </StructDescription>


            <StructDescription name="NRect">
                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName="NRect::NRect()" method="NRect()" >
                    <p>Default constructor. Initializes x, y, width, and height to 0.</p>
                </MethodDescription>
                <MethodDescription indexName="NRect::NRect(int x, int y, int width, int height)" method="NRect(int x, int y, int width, int height)" >
                </MethodDescription>
                <FieldDescriptions>
                    <FieldDefinitionList>
                        <div>int</div>
                        <div>x</div>
                        <div>The x-coordinate of the top-left corner of the rectangle.</div>

                        <div>int</div>
                        <div>y</div>
                        <div>The y-coordinate of the top-left corner of the rectangle.</div>

                        <div>int</div>
                        <div>width</div>
                        <div>The width of the rectangle.</div>

                        <div>int</div>
                        <div>height</div>
                        <div>The height of the rectangle.</div>
                    </FieldDefinitionList>
                </FieldDescriptions>
                <MethodDescriptions>
                    <MethodDescription indexName="bool NRect::contains(int x, int y) const" method="bool contains(int x, int y) const" >
                    </MethodDescription>
                    <MethodDescription indexName="bool NRect::contains(const NPoint& point) const" method="bool contains(const NPoint& point) const" >
                    </MethodDescription>
                    <MethodDescription indexName="int NRect::left() const" method="int left() const" >
                    </MethodDescription>
                    <MethodDescription indexName="int NRect::right() const" method="int right() const" >
                    </MethodDescription>
                    <MethodDescription indexName="int NRect::top() const" method="int top() const" >
                    </MethodDescription>
                    <MethodDescription indexName="int NRect::bottom() const" method="int bottom() const" >
                    </MethodDescription>
                    <MethodDescription indexName="NPoint NRect::top_left() const" method="NPoint top_left() const" />
                    <MethodDescription indexName="NPoint NRect::top_right() const" method="NPoint top_right() const" />
                    <MethodDescription indexName="NPoint NRect::bottom_left() const" method="NPoint bottom_left() const" />
                    <MethodDescription indexName="NPoint NRect::bottom_right() const" method="NPoint bottom_right() const" />
                    <MethodDescription indexName="NRect NRect::inset(const NThickness& thickness) const" method="NRect inset(const NThickness& thickness) const" >
                        Moves the rectangle's edges in by the specified thickness. If width or height would become
                        less than zero, they are set to zero.
                    </MethodDescription>
                    <MethodDescription indexName="NRect NRect::inflate(const NThickness& thickness) const" method="NRect inflate(const NThickness& thickness) const" >
                        Moves the rectangle's edges out by the specified thickness. If any of the thicknesses are negative,
                        and width or height would become less than zero, they are set to zero.
                    </MethodDescription>
                    <MethodDescription indexName="NRect NRect::intersect(const NRect& other) const" method="NRect intersect(const NRect& other) const" >
                        Returns the intersection of this rectangle with another rectangle. Returns NRect(0,0,0,0) if the
                        rectangles do not intersect.
                    </MethodDescription>
                    <MethodDescription indexName="NRect NRect::bounds(const NRect& other) const" method="NRect bounds(const NRect& other) const" >
                        Returns the smallest rectangle that contains both this rectangle and another rectangle. If either of
                        the rectangles are empty, the top-left corner is included in the result.
                    </MethodDescription>
                </MethodDescriptions>
                <OperatorDescriptions>
                    <MethodDescription indexName="bool NRect::operator==(const NRect& other) const" method="bool operator==(const NRect& other) const" >
                    </MethodDescription>
                    <MethodDescription indexName="NRect NRect::operator+(const NPoint& point) const" method="NRect operator+(const NPoint& point) const" >
                        Return the current rectangle translated by the specified point.
                    </MethodDescription>
                    <MethodDescription indexName="NRect NRect::operator-(const NPoint& point) const" method="NRect operator-(const NPoint& point) const" >
                        Return the current rectangle translated  by <M>-point</M>.
                    </MethodDescription>

                </OperatorDescriptions>
            </StructDescription>

            <StructDescription name="NSize">

                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName="NSize::NSize()" method="NSize()" >
                    <p>Default constructor. Initializes width and height to 0.</p>
                </MethodDescription>
                <MethodDescription indexName="NSize::NSize(int width, int height)"
                    method="NSize(int width, int height)" >
                </MethodDescription>
                <FieldDescriptions>
                    <FieldDefinitionList>
                        <div>int</div>
                        <div>width</div>
                        <div />
                        <div>int</div>
                        <div>height</div>
                        <div />
                    </FieldDefinitionList>
                </FieldDescriptions>
                <OperatorDescriptions>
                    <MethodDescription indexName="bool NSize::operator==(const NSize& other) const"
                        method="bool operator==(const NSize& other) const;" >
                    </MethodDescription>
                </OperatorDescriptions>
            </StructDescription>

            <StructDescription name="NTextSelection">
                <p>Text selection in an <ML name="NTextEditElement" />. Indices are offsets into a UTF8-encoded <M>std::string</M>. <M>start</M> and <M>start + length</M> must
                    fall on a boundary between UTF-8 sequences.</p>
                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName="NTextSelection::NTextSelection()" method="NTextSelection()" >
                    <p>Default constructor. Initializes start and length to 0.</p>
                </MethodDescription>
                <MethodDescription indexName="NTextSelection::NTextSelection(int start, int length)"
                    method="NTextSelection(int start, int length)" >
                </MethodDescription>
                <FieldDescriptions>
                    <FieldDefinitionList>
                        <div>int</div>
                        <div>start</div>
                        <div>The index of the starting character in the selection.</div>

                        <div>int</div>
                        <div>length</div>
                        <div>The number of characters in the selection. May be negative, indicating a backward selection.</div>
                    </FieldDefinitionList>
                </FieldDescriptions>
                <MethodDescriptions>
                    <MethodDescription indexName="bool NTextSelection::is_empty() const"
                        method="bool is_empty() const;" />
                    <MethodDescription indexName="int NTextSelection::end() const"
                        method={`int end() const;`} />
                    <MethodDescription indexName="void NTextSelection::end(int value)"
                        method={`void end(int value);`} />
                    <MethodDescription indexName="int NTextSelection::min() const"
                        method={`int min() const;`} />
                    <MethodDescription indexName="int NTextSelection::max() const"
                        method={`int max() const;`} />
                    <MethodDescription indexName="int NTextSelection::abs_length() const"
                        method={`int abs_length() const;`} />
                    <MethodDescription indexName="void NTextSelection::delete_character_at(int utf8_index)"
                        method={`void delete_character_at(int utf8_index);`} />

                </MethodDescriptions>
                <OperatorDescriptions>
                    <MethodDescription indexName="bool NTextSelection::operator==(const NTextSelection& other) const"
                        method={`bool operator==(const NTextSelection& other) const;`} />
                </OperatorDescriptions>

            </StructDescription>
            {/*
    struct NTextSelection {
        NTextSelection() : start(0), length(0) {}
        NTextSelection(int start, int length) : start(start), length(length) {}

        int start;
        int length;

        bool is_empty() const { return length == 0; }
        int end() const { return start + length; }
        void end(int value) { length = value - start; }
        int min() const { return std::min(start, end()); }
        int max() const { return std::max(start, end()); }
        int abs_length() const { return std::abs(length); }
        void delete_character_at(int utf8_index);

        bool operator==(const NTextSelection& other) const {
            return start == other.start
                && length == other.length;
        }
    };

            */}

            <StructDescription name="NThickness">
                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName="NThickness::NThickness()" method="NThickness()" >
                    <p>Default constructor. Initializes left, top, right, and bottom to 0.</p>
                </MethodDescription>
                <MethodDescription indexName="NThickness::NThickness(int thickness)" method="NThickness(int thickness)" >
                </MethodDescription>
                <MethodDescription indexName="NThickness::NThickness(int left, int top, int right, int bottom)"
                    method={`NThickness(
    int left,
    int top, 
    int right,
    int bottom)`} >
                </MethodDescription>
                <FieldDescriptions>
                    <FieldDefinitionList>
                        <div>int</div>
                        <div>left</div>
                        <div>Thickness of the left edge.</div>

                        <div>int</div>
                        <div>top</div>
                        <div>Thickness of the top edge.</div>

                        <div>int</div>
                        <div>right</div>
                        <div>Thickness of the right edge.</div>

                        <div>int</div>
                        <div>bottom</div>
                        <div>Thickness of the bottom edge.</div>
                    </FieldDefinitionList>
                </FieldDescriptions>
                <OperatorDescriptions>
                    <MethodDescription indexName="bool NThickness::operator==(const NThickness& other) const"
                        method="bool operator==(const NThickness& other) const" >
                    </MethodDescription>
                </OperatorDescriptions>
            </StructDescription>

            {/*
 struct NMouseEventArgs : public NEventArgsBase {
        NMouseEventArgs(NElement* source) : NEventArgsBase(source) {}
        NMouseEventArgs() : NMouseEventArgs(nullptr) {}
        std::shared_ptr<NElement> target;

        NPoint cursor_position = { -1,-1 };

        bool button0_pressed = false;
        bool button1_pressed = false;
        bool button2_pressed = false;
        bool button3_pressed = false;

        bool shift = false;
        bool alt = false;
        bool ctrl = false;


    };    */}
        </DocsPage >

    );
}
export default ApiStructs;
