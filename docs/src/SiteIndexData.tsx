import { IndexData, IndexEntry,IndexReference } from "./IndexBuilder";

const indexData = new IndexData([
    new IndexEntry("alignment", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NHorizontalStackElement::alignment", 
            "property__NHorizontalStackElement_alignment"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextElement::alignment", 
            "property__NTextElement_alignment"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NVerticalStackElement::alignment", 
            "property__NVerticalStackElement_alignment"),
    ]),
    new IndexEntry("attribute_off", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::attribute_off(NAttribute attr)", 
            "method__NElement_attribute_on_method__NElement_attribute_off"),
    ]),
    new IndexEntry("attribute_on", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::attribute_on(NAttribute attr)", 
            "method__NElement_attribute_on_method__NElement_attribute_off"),
    ]),
    new IndexEntry("checked", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NCheckboxElement::checked", 
            "property__NCheckboxElement_checked"),
    ]),
    new IndexEntry("checked_text", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NCheckboxElement::checked_text", 
            "property__NCheckboxElement_checked_text"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NRadioGroupElement::checked_text", 
            "property__NRadioGroupElement_checked_text"),
    ]),
    new IndexEntry("color", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NBoxElement::color", 
            "property__NBoxElement_color"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextElement::color", 
            "property__NTextElement_color"),
    ]),
    new IndexEntry("color_off", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::color_off(NColorPair colorPair)", 
            "method__NElement_color_on_method__NElement_color_off"),
    ]),
    new IndexEntry("color_on", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::color_on(NColorPair colorPair)", 
            "method__NElement_color_on_method__NElement_color_off"),
    ]),
    new IndexEntry("column_gap", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NHorizontalStackElement::column_gap", 
            "property__NHorizontalStackElement_column_gap"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NRadioGroupElement::column_gap", 
            "property__NRadioGroupElement_column_gap"),
    ]),
    new IndexEntry("decomposed_text", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextEditElement::decomposed_text", 
            "property__NTextEditElement_decomposed_text"),
    ]),
    new IndexEntry("disabled", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NButtonElement::disabled", 
            "property__NButtonElement_disabled"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NCheckboxElement::disabled", 
            "property__NCheckboxElement_disabled"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NDropdownElement::disabled", 
            "property__NDropdownElement_disabled"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::disabled", 
            "property__NElement_disabled"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NMenuElement::disabled", 
            "property__NMenuElement_disabled"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NRadioGroupElement::disabled", 
            "property__NRadioGroupElement_disabled"),
    ]),
    new IndexEntry("handle_attached", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::handle_attached(NWindow* window)", 
            "method__NElement_handle_attached_method__NElement_handle_detaching"),
    ]),
    new IndexEntry("handle_detaching", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::handle_detaching()", 
            "method__NElement_handle_attached_method__NElement_handle_detaching"),
    ]),
    new IndexEntry("height", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::height", 
            "property__NElement_height"),
    ]),
    new IndexEntry("horizontal_line", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::horizontal_line(int x, int y, int width)", 
            "method__NElement_horizontal_line_method__NElement_vertical_line"),
    ]),
    new IndexEntry("is_menu_item_shortcut_key", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method bool NElement::is_menu_item_shortcut_key(char32_t c, const std::string& text)", 
            "method__NElement_is_menu_item_shortcut_key_method__NElement_is_menu_item_shortcut_key"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method bool NElement::is_menu_item_shortcut_key(const std::string& utf8key, const std::string& text)", 
            "method__NElement_is_menu_item_shortcut_key_method__NElement_is_menu_item_shortcut_key"),
    ]),
    new IndexEntry("label", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NButtonElement::label", 
            "property__NButtonElement_label"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NCheckboxElement::label", 
            "property__NCheckboxElement_label"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NMenuElement::label", 
            "property__NMenuElement_label"),
    ]),
    new IndexEntry("label_alignment", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NButtonElement::label_alignment", 
            "property__NButtonElement_label_alignment"),
    ]),
    new IndexEntry("labels", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NRadioGroupElement::labels", 
            "property__NRadioGroupElement_labels"),
    ]),
    new IndexEntry("margin", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::margin", 
            "property__NElement_margin"),
    ]),
    new IndexEntry("measure_menu_item", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method int NElement::measure_menu_item(const std::string& text)", 
            "method__NElement_measure_menu_item"),
    ]),
    new IndexEntry("measure_text", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method int NElement::measure_text(const std::string&text)", 
            "method__NElement_measure_text"),
    ]),
    new IndexEntry("menu_items", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NDropdownElement::menu_items", 
            "property__NDropdownElement_menu_items"),
    ]),
    new IndexEntry("move", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::move(int x, int y)", 
            "method__NElement_move"),
    ]),
    new IndexEntry("NAttachment", [
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "enum class NAttachment", 
            "class__NAttachment"),
    ]),
    new IndexEntry("NAttribute", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "enum class NAttribute", 
            "class__NAttribute"),
    ]),
    new IndexEntry("NBoxElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NBoxElement", 
            "class__NBoxElement"),
    ]),
    new IndexEntry("NButtonElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NButtonElement", 
            "class__NButtonElement"),
    ]),
    new IndexEntry("NCheckboxElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NCheckboxElement", 
            "class__NCheckboxElement"),
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "class NCheckboxElement", 
            "class__NCheckboxElement"),
    ]),
    new IndexEntry("NDropdownElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NDropdownElement", 
            "class__NDropdownElement"),
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "class NDropdownElement", 
            "class__NDropdownElement"),
    ]),
    new IndexEntry("NElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NElement", 
            "class__NElement"),
        new IndexReference(
            "/using/events", 
            "3.4 - NWindows Events", 
            "class NElement", 
            "class__NElement"),
        new IndexReference(
            "/using/events/keyboard", 
            "3.4.1 - Keyboard Events", 
            "class NElement", 
            "class__NElement"),
        new IndexReference(
            "/using/events/mouse", 
            "3.4.2 - Mouse Events", 
            "class NElement", 
            "class__NElement"),
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "class NElement", 
            "class__NElement"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "class NElement", 
            "class__NElement"),
    ]),
    new IndexEntry("NHorizontalStackElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NHorizontalStackElement", 
            "class__NHorizontalStackElement"),
    ]),
    new IndexEntry("NMenuElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NMenuElement", 
            "class__NMenuElement"),
    ]),
    new IndexEntry("normalized_text", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextEditElement::normalized_text", 
            "property__NTextEditElement_normalized_text"),
    ]),
    new IndexEntry("NPopupMenuWindow", [
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "class NPopupMenuWindow", 
            "class__NPopupMenuWindow"),
    ]),
    new IndexEntry("NPopupWindow", [
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "class NPopupWindow", 
            "class__NPopupWindow"),
    ]),
    new IndexEntry("NRadioGroupElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NRadioGroupElement", 
            "class__NRadioGroupElement"),
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "class NRadioGroupElement", 
            "class__NRadioGroupElement"),
    ]),
    new IndexEntry("NTextEditElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NTextEditElement", 
            "class__NTextEditElement"),
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "class NTextEditElement", 
            "class__NTextEditElement"),
    ]),
    new IndexEntry("NTextElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NTextElement", 
            "class__NTextElement"),
    ]),
    new IndexEntry("NVerticalStackElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NVerticalStackElement", 
            "class__NVerticalStackElement"),
    ]),
    new IndexEntry("NWindow", [
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "class NWindow", 
            "class__NWindow"),
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "class NWindow", 
            "class__NWindow"),
        new IndexReference(
            "/using/dispatcher", 
            "3.6 - The NWindows Dispatcher", 
            "class NWindow", 
            "class__NWindow"),
    ]),
    new IndexEntry("on_attached", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "event NEvent<void(NWindow*)> NElement::on_attached", 
            "event__NElement_on_attached_event__void NElement_on_detaching"),
    ]),
    new IndexEntry("on_detaching", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "event NEvent<void(void)> void NElement::on_detaching", 
            "event__NElement_on_attached_event__void NElement_on_detaching"),
    ]),
    new IndexEntry("open", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NMenuElement::open", 
            "property__NMenuElement_open"),
    ]),
    new IndexEntry("orientation", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NRadioGroupElement::orientation", 
            "property__NRadioGroupElement_orientation"),
    ]),
    new IndexEntry("prefix", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NButtonElement::prefix", 
            "property__NButtonElement_prefix"),
    ]),
    new IndexEntry("print", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::print(const char* text)", 
            "method__NElement_print_method__NElement_print"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::print(const std::string& text, int width)", 
            "method__NElement_print"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::print(const std::string& text, NAlignment alignment, int width)", 
            "method__NElement_print"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::print(const std::string& text)", 
            "method__NElement_print_method__NElement_print"),
    ]),
    new IndexEntry("print_acs", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::print_acs(int x, int y, int acs_character)", 
            "method__NElement_print_acs"),
    ]),
    new IndexEntry("print_menu_item", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::print_menu_item(const std::string& text, int width, bool show_underline = true)", 
            "method__NElement_print_menu_item_method__NElement_print_menu_item"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::print_menu_item(const std::string& text, NAlignment alignment, int width, bool show_underline = true)", 
            "method__NElement_print_menu_item_method__NElement_print_menu_item"),
    ]),
    new IndexEntry("row_gap", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NRadioGroupElement::row_gap", 
            "property__NRadioGroupElement_row_gap"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NVerticalStackElement::row_gap", 
            "property__NVerticalStackElement_row_gap"),
    ]),
    new IndexEntry("selected", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NDropdownElement::selected", 
            "property__NDropdownElement_selected"),
    ]),
    new IndexEntry("selection", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextEditElement::selection", 
            "property__NTextEditElement_selection"),
    ]),
    new IndexEntry("suffix", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NButtonElement::suffix", 
            "property__NButtonElement_suffix"),
    ]),
    new IndexEntry("text", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextEditElement::text", 
            "property__NTextEditElement_text"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextElement::text", 
            "property__NTextElement_text"),
    ]),
    new IndexEntry("text_attribute", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextElement::text_attribute", 
            "property__NTextElement_text_attribute"),
    ]),
    new IndexEntry("title", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NBoxElement::title", 
            "property__NBoxElement_title"),
    ]),
    new IndexEntry("unchecked_text", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NCheckboxElement::unchecked_text", 
            "property__NCheckboxElement_unchecked_text"),
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NRadioGroupElement::unchecked_text", 
            "property__NRadioGroupElement_unchecked_text"),
    ]),
    new IndexEntry("value", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NRadioGroupElement::value", 
            "property__NRadioGroupElement_value"),
    ]),
    new IndexEntry("vertical_line", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.3 - Fully-Custom Elements", 
            "method void NElement::vertical_line(int x, int y, int height)", 
            "method__NElement_horizontal_line_method__NElement_vertical_line"),
    ]),
    new IndexEntry("width", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::width", 
            "property__NElement_width"),
    ]),
    new IndexEntry("wrap_text", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextElement::wrap_text", 
            "property__NTextElement_wrap_text"),
    ]),
]);

const SiteIndexData = () => { return indexData; }
export default  SiteIndexData;