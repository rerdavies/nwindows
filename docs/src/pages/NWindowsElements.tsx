import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import M from '../M';
import ClassDescription, { PropertyEntry, PropertyList, EnumDefinitionList } from '../ClassDescription';
import Code from '../Code';
import SectionHead from '../SectionHead';


function NWindowsElements() {
    return (
        <DocsPage route="/using/elements">
            <h1>{DocsTitle("/using/elements")}</h1>
            <p>This section describes elements used for UI composition, and only those properties
                used in layout and rendering of elements.
            </p><p>
                Discussion of other properties, such as those involved with events are
                deferred to a later section.
            </p>

            <SectionHead text="Properties and Manipulators" />
            <p>Each property on an NWindows element has a getter and (usually) a setter method. Getters and setters use the
                following convention:
            </p>
            <Code white text={`const std::string&text() const; // the getter for the the text property
void text(const std::string&value); // the setter.`} />

            <p>Each property has a corresponding <i>manipulator</i> which can be used to set the property using <i>manipulator</i> syntax.</p>
            <Code white text={`NTextElement element = NTextElement::create()
    | text("Hello world.");`} />
            <p>Manipulators are actually classes, which use a scheme similar to (but better than) <M>iomanip</M> manipulators. They capture
                values, and then apply them to an object pointer on the left-hand side of an "|" operator.
                The <M>operator|</M> overload for manipulators then returns an object pointer of the exact same type as the
                object on its left-hand side. This allows one or more <i>manipulator</i> operations to be chained together
                into a single expression.</p>
            <Code white text={`NTextElement element = NTextElement::create()
    | width(15)
    | alignment(NAlignment::End)
    | margin({2,1,2,1})
    | text("Hello world.");`} />

            <p>Here's a sample implementation of a manipulator, in order to help give you a sense of what's happening under the covers.</p>
            <Code white text={`    class text : public NElementManipulator {
    public:
        text(const std::string& value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->text(this->value);
            return element;
        }
    private:
        std::string value;

    };
`} />

            <p>And then this dense little piece of code provides the <M>operator</M> | overload:</p>
            <Code white text={
                `template<typename ELEMENT, typename MANIPULATOR>
    requires std::derived_from<ELEMENT, NElement>
    && std::derived_from<MANIPULATOR, NElementManipulator>
std::shared_ptr<ELEMENT> operator |(std::shared_ptr<ELEMENT> element, MANIPULATOR value)
{
    value.apply(element);
    return element;
}
`} />
            <p>You don't need to completely understand the implementation details. Just know that the implementation is relative
                efficient and safe, and that applying a manipulator using <M>operator |</M> returns a shared pointer of the exact
                same type as the left-hand object, which can then be used to chain another manipulator operation if
                required.
            </p>

            <SectionHead text="General Layout" />
            <p>All NWindows elements have a <M>width</M>, a <M>height</M>, and a <M>margin</M> property. <M>width</M>,
                and <M>height</M> properties default to a value of <M>AUTO_SIZE</M>, which generally means that the element
                will be sized to fit its content. The <M>margin</M> property is of type  <M>NThickness</M>
            </p>
            <Code white text={`
            struct NThickness
    {
        NThickness() : left(0), top(0), right(0), bottom(0) {}
        NThickness(int thickness) : left(thickness), top(thickness), right(thickness), bottom(thickness) {}
        NThickness(int left, int top, int right, int bottom) : left(left), top(top), right(right), bottom(bottom) {}

        int left, top, right, bottom;

        bool operator==(const NThickness& other) const;
    };
`} />
            <p> and defaults to <M>NThickness(0,0,0,0)</M>. Setting <M>margin</M> to a non-zero value will add blank space around the
                element. <M>width</M> and <M>height</M> properties, if specified, are exclusive of margin space.
            </p>

            <SectionHead text="Properties Shared by All Elements" />

            <p>All NWindows elements inherit from the <M>NElement</M> class. <M>NElement</M> provides a number of important properties,
                which are available on all NWindows elements.</p>


            <ClassDescription className="NElement">
                <p>The common base class for all NWindows elements.</p>
                <PropertyList>

                    <PropertyEntry type="int" propertyName='NElement::width'>
                        <div>Controls the width of the element. If set to <M>AUTO_SIZE</M>, the width of the element
                            will adjust to fit the width of its content at layout time.</div>
                    </PropertyEntry>

                    <PropertyEntry type="int" propertyName='NElement::height'>
                        <div>Controls the height of the element. If set to <M>AUTO_SIZE</M>, the height of the
                            element will adjust to fit the height of its content at layout time.</div>
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
                </PropertyList>
            </ClassDescription>


            <SectionHead text="Layout Elements" />

            <ClassDescription className="NVerticalStackElement">
                <p>
                    The <M>NVerticalStackElement</M> stacks child elements vertically.
                </p>
                <PropertyList>
                    <PropertyEntry type="NAlignment" propertyName='NVerticalStackElement::alignment'>
                        <div>
                            Controls how child elements are aligned within the <M>NVerticalStackElement</M>. The <M>alignment</M> property
                            is of type
                            <Code white text={`enum class NAlignment {
    Start,
    Center,
    End,
    Justify
};
`}
                            />
                            <p>
                                <M>Start</M> alignment aligns child elements to the start of the <M>NVerticalStackElement</M>. <M>Center</M> alignment
                                centers child elements within the <M>NVerticalStackElement</M>. <M>End</M> alignment aligns child elements to the end of the
                                <M>NVerticalStackElement</M>. <M>Justify</M> alignment calculates the maximum width of all child elements, and then
                                arranges child elements with the same width as the widest element. <M>Justify</M> alignment is useful for
                                case like radio button groups, lists, and menu items, where you want all child elements to have the same width.
                            </p>
                            <p>
                                If the <M>width</M> property of the <M>NVerticalStackElement</M> is set to <M>AUTO_SIZE</M>, the <M>NVerticalStackElement</M> will
                                automatically resize to fit the width of the widest child element, if the alignment is set to <M>Start</M> or <M>Justify</M>,
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

            </ClassDescription>
            <ClassDescription className="NHorizontalStackElement">
                <p>
                    The <M>NHorizontalStackElement</M> stacks child elements horizontally.
                </p>
                <PropertyList>
                    <PropertyEntry type="NAlignment" propertyName='NHorizontalStackElement::alignment'>
                        <div>
                            <p>
                                Controls how child elements are aligned within the <M>NHorizontalStackElement</M>. The <M>alignment</M> property is of type
                            </p>
                            <Code white text={`enum class NAlignment {
    Start,  
    Center,
    End,
    Justify
};
`}
                            />
                            <p>
                                <M>Start</M> alignment aligns child elements to the start of the <M>NHorizontalStackElement</M>. <M>Center</M> alignment
                                centers child elements within the <M>NHorizontalStackElement</M>. <M>End</M> alignment aligns child elements to the end of the
                                <M>NHorizontalStackElement</M>. <M>Justify</M> alignment is not supported by <M>NHorizontalStackElement</M>, and the behavior
                                is undefined.
                            </p>
                            <p>
                                If the <M>width</M> property of the <M>NHorizontalStackElement</M> is set to <M>AUTO_SIZE</M>, the <M>NHorizontalStackElement</M> will
                                automatically resize to fit the sum of the widths of child elements, if the alignment is set to <M>Start</M> or <M>Justify</M>,
                                and will expand to fill available width if the alignment is set to <M>Center</M> or <M>End</M>. For expansion to take effect,
                                the width of the <M>NHorizontalStackElement</M> must be constrained by a parent element.
                            </p>

                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="int" propertyName='NHorizontalStackElement::column_gap'>
                        <div>
                            Controls how many blank columns to put between each child element. Defaults to 0.
                        </div>
                    </PropertyEntry>
                </PropertyList>
            </ClassDescription>

            <SectionHead text="Rendering Elements" />

            <ClassDescription className="NTextElement">
                <p>
                    The <M>NTextElement</M> displays text.
                </p>
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
                            <p>
                                <img src="image/sample_attributes.png" alt="Sample attributes" className="sample_control" />
                            </p>
                            <p>The <M>text_attribute</M> property can take the following values:</p>

                            <ClassDescription className="NAttribute" prefix="enum class">
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

                            </ClassDescription>
                            <p>
                                Support
                                for each of these attributes varies by terminal type, and depends entirely on the capabilities
                                of the underlying <M>ncursesw</M> library. Support is provided as-is. Defaults to unset.</p>

                        </div>
                    </PropertyEntry>
                </PropertyList>
            </ClassDescription>

            <ClassDescription className="NBoxElement">
                <p>Displays a box border around its child element. <M>NBoxElement</M> can have only
                    one child element.</p>
                <p>
                    <img
                        src="image/sample_box.png"
                        alt="Sample box"
                        className="sample_control"
                    />
                </p>
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
            </ClassDescription>

            <SectionHead text="Input Elements" />

            <ClassDescription className="NButtonElement">
                <p>Displays a button that can be clicked.</p>
                <p>
                    <img
                        src="image/sample_button.png"
                        alt="Sample button"
                        className="sample_control"
                    />
                </p>
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
            </ClassDescription>

            <ClassDescription className="NTextEditElement">
                <p>Displays a text box that allows editing of text.</p>
                <p>
                    <img
                        src="image/sample_textedit.png"
                        alt="Sample NTextEditElement"
                        className="sample_control" />
                </p>
                <p>
                    The <M>text</M> property of
                    the <M>NTextEditElement</M> is the text displayed in the text box. While editing,
                    text is maintained in canonical form (combining accents are combined with the
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
                    `void character_filter(const std::function&lt;bool(char32_t c)&gt;& filter);
        void character_filter(std::function&lt;bool(char32_t c)&gt;&& filter);
`} />
                <p>So you could, for example, restrict the text of an edit box to (European) digits only using the following code:</p>
                <Code white text={
                    `NTextEditElement::create()
    | character_filter(
        [](char32_t c) {
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
                    will explicitly set an appropriate width.</p>
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
            </ClassDescription>
            <ClassDescription className="NCheckboxElement">
                <p>Displays a checkbox control.</p>
                <p>
                    <img
                        src="image/sample_checkbox.png"
                        alt="Sample checkbox"
                        className="sample_control"
                    />
                </p>
                <p>Checkmarks are displayed with Unicode characters on xterm-like devices. <M>NCheckboxElement</M>falls back to
                    using ASCII characters on terminals that do not have full Unicode support.
                </p>

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

            </ClassDescription>
            <ClassDescription className="NRadioGroupElement">
                <p>Displays a group of radio buttons.</p>
                <p>
                    <img
                        src="image/sample_radiogroup.png"
                        alt="Sample NRadioGroupElement"
                        className="sample_control"
                    />
                </p>
                <p>Checkmarks are display with Unicode characters on xterm-like devices. <M>NRadioGroupElement</M> falls back to using ASCII characters
                    on terminals that do not have full Unicode support.
                </p>
                <PropertyList>
                    <PropertyEntry type="NOrientation" propertyName='NRadioGroupElement::orientation'>
                        <div>Controls the stacking of radio buttons in the group. Either <M>NOrientation::Horizontal</M>, or <M>NOrientation::Vertical</M>.</div>
                    </PropertyEntry>

                    <PropertyEntry type={`std::vector<
  std::string>`} propertyName='NRadioGroupElement::labels'>
                        <div>The labels for the radio buttons in the group. If a label contains a '_' character, the following character
                            is treated as a shortcut key. See <M>NButtonElement</M> for a detailed discussion of how
                            shortcut keys are handled.</div>
                    </PropertyEntry>

                    <PropertyEntry type="int" propertyName='NRadioGroupElement::value'>
                        <div>The index of the selected radio button. Defaults to 0 (the first item selected).
                            Set to -1 to select none of the radio buttons.
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="int" propertyName='NRadioGroupElement::column_gap'>
                        <div>The number of spaces to put between radio buttons in the group when oriented horizontally. Defaults to 1.</div>
                    </PropertyEntry>

                    <PropertyEntry type="int" propertyName='NRadioGroupElement::row_gap'>
                        <div>The number of blank lines to put between radio buttons in the group when oriented vertically. Defaults to 0.</div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NRadioGroupElement::disabled'>
                        <div>(Inherited from NElement). When true, the entire radio group is disabled, and grayed out.</div>
                    </PropertyEntry>

                    <PropertyEntry type="std::string" propertyName='NRadioGroupElement::checked_text'>
                        <div>Allows customization of the control. The utf-8 text to display for the checkmark when the control is checked. Defaults to "",
                            which allows the control to decide for itself whether it wants to use Unicode characters or ASCII text
                            to display the checkmark. <M>checked_text</M> and <M>unchecked_text</M> should both have the same
                            display length.
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="std::string" propertyName='NRadioGroupElement::unchecked_text'>
                        <div>Allows customization of the control. The utf-8 text to display for the checkmark when the control is unchecked. Defaults to "",
                            which allows the control to decide for itself whether it wants to use Unicode characters or ASCII text
                            to display the checkmark.
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NRadioGroupElement::disabled'>
                        <div>(Inherited from NElement). When true, the radio group is disabled, and grayed out.</div>
                    </PropertyEntry>


                </PropertyList>
            </ClassDescription>
            <ClassDescription className="NDropdownElement">
                <p>A dropdown control that allows selection of values from a list.</p>
                <p>
                    <img src="image/sample_dropdown.png" alt="Sample dropdown" className="sample_control" />
                </p>
                <p>Native items in the dropdown list are <M>NMenuItemElement</M>s. However, the constructor,
                    the <M>menu_items</M>  property and
                    the <M>menu_items</M> manipulator all support convenience overloads that allow you to pass in
                    a <M>std::vector&lt;std::string&gt;</M> instead. These overloads create
                    an <M>std::vector&lt;NMenuItemElement&gt;</M> with id's that range from 0 to N, corresponding to the position
                    in the passed in vector.
                </p>
                <p>
                    The reason <M>menu_items</M> is a <M>std::vector&lt;NMenuItemElement&gt;</M> is that it anticipates
                    customizations (and perhaps future features) in which the dropdown list contains more than just text (submenus,
                    for example).
                </p>
                <p><M>NDropdownElement</M> does not support scrolling in the dropdown popup, so the size of the <M>menu_items</M> list
                    should be kept modest..</p>
                <PropertyList>
                    <PropertyEntry type={`std::vector<
  NMenuItem>`} propertyName='NDropdownElement::menu_items'>
                        <div>The list of items to display in the dropdown.</div>
                    </PropertyEntry>

                    <PropertyEntry type="int" propertyName='NDropdownElement::selected'>
                        <div>The <M>item_id</M> of the selected menu item. Defaults to -1 (no selection). In the case
                            where <M>menu_items</M> was set using a <M>std::vector&lt;std::string&gt;</M>, <M>selected</M> contains the index of the selected item.
                        </div>
                    </PropertyEntry>

                    <PropertyEntry type="bool" propertyName='NDropdownElement::disabled'>
                        <div>(Inherited from NElement). When true, the dropdown is disabled, and grayed out.</div>
                    </PropertyEntry>
                </PropertyList>
            </ClassDescription>

            <ClassDescription className="NMenuElement" baseClass="NButtonBaseElement">
                <p><M>NMenuElement</M> menu header for a single menu item, displays a popup menu 
                when clicked, or when the hot key is pressed. Submenus are supported, as are menu items 
                with checkmarks, or with icons. 
                </p>
            <PropertyList>
                <PropertyEntry type="std::string" propertyName='NMenuElement::label'>
                    <div>The text to display for the menu item. If there is a '_' character 
                        in the label, the following character is treated as a hot key. See <M>NButtonElement</M> for a detailed discussion of how   
                        hot keys are handled.</div>
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
            </ClassDescription>

            <SectionHead text="Building-Block Elements" />

            <p>NWindows provides two addition <M>NElement</M> classes that constitute base classes for
                other elements, and are used when building custom elements. Their proper use will be
                covered in subsequent sections, but they are mentioned here for completeness. Neither
                element is directly useful when composing user interfaces.</p>
            <p><M>NButtonBaseElement</M> is a base class for button-like elements that
                can be clicked or focused, and must show clicked, or selected, or focused state when
                rendered.
            </p>
            <p><M>NContainerElement</M> is the base class for all <M>NElement</M>s that have
                child elements.
            </p>
        </DocsPage>
    );
}

export default NWindowsElements;