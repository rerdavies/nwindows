import IndexData, { IndexLink, IndexEntry,IndexReference } from "./IndexData";

const indexData = new IndexData([
    new IndexEntry("abs_length", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method int NTextSelection::abs_length() const`, 
            `method__NTextSelection_abs_length`),
    ]),
    new IndexEntry("active_window", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::active_window`, 
            `property__NWindow_active_window`),
    ]),
    new IndexEntry("actual_height", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::actual_height`, 
            `property__NElement_actual_height`),
    ]),
    new IndexEntry("actual_size", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::actual_size`, 
            `property__NElement_actual_size`),
    ]),
    new IndexEntry("actual_width", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::actual_width`, 
            `property__NElement_actual_width`),
    ]),
    new IndexEntry("actual_window_position", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::actual_window_position`, 
            `property__NWindow_actual_window_position`),
    ]),
    new IndexEntry("add_child", [
        new IndexReference(
            `/apis/classes/NBoxElement`, 
            `5.7.1 - NBoxElement`, 
            `method void NBoxElement::add_child(const NElement::ptr& child)`, 
            `method__NBoxElement_add_child`),
        new IndexReference(
            `/apis/classes/NBoxElement`, 
            `5.7.1 - NBoxElement`, 
            `method void NBoxElement::add_child(NElement::ptr&& child)`, 
            `method__NBoxElement_add_child`),
        new IndexReference(
            `/apis/classes/NHorizontalStackElement`, 
            `5.7.11 - NHorizontalStackElement`, 
            `method void NHorizontalStackElement::add_child(const NElement::ptr& child)`, 
            `method__NHorizontalStackElement_add_child`),
        new IndexReference(
            `/apis/classes/NHorizontalStackElement`, 
            `5.7.11 - NHorizontalStackElement`, 
            `method void NHorizontalStackElement::add_child(NElement::ptr&& child)`, 
            `method__NHorizontalStackElement_add_child`),
        new IndexReference(
            `/apis/classes/NVerticalStackElement`, 
            `5.7.19 - NVerticalStackElement`, 
            `method void NVerticalStackElement::add_child(const NElement::ptr& child)`, 
            `method__NVerticalStackElement_add_child`),
        new IndexReference(
            `/apis/classes/NVerticalStackElement`, 
            `5.7.19 - NVerticalStackElement`, 
            `method void NVerticalStackElement::add_child(NElement::ptr&& child)`, 
            `method__NVerticalStackElement_add_child`),
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method void NContainerElement::add_child(const NElement::ptr& child)`, 
            `method__NContainerElement_add_child`),
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method void NContainerElement::add_child(NElement::ptr&& child)`, 
            `method__NContainerElement_add_child`),
    ]),
    new IndexEntry("add_children<T>", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method void NContainerElement::add_children<T>(const std::vector<std::shared_ptr<T>>& children)`, 
            `method__NContainerElement___Tadd_children_T`),
    ]),
    new IndexEntry("add_to_parent_window", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::add_to_parent_window(NWindow::ptr parent)`, 
            `method__NWindow_add_to_parent_window`),
    ]),
    new IndexEntry("alignment", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NHorizontalStackElement::alignment`, 
            `property__NHorizontalStackElement_alignment`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NTextElement::alignment`, 
            `property__NTextElement_alignment`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NVerticalStackElement::alignment`, 
            `property__NVerticalStackElement_alignment`),
        new IndexReference(
            `/apis/classes/NHorizontalStackElement`, 
            `5.7.11 - NHorizontalStackElement`, 
            `property NHorizontalStackElement::alignment`, 
            `property__NHorizontalStackElement_alignment`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `property NTextElement::alignment`, 
            `property__NTextElement_alignment`),
        new IndexReference(
            `/apis/classes/NVerticalStackElement`, 
            `5.7.19 - NVerticalStackElement`, 
            `property NVerticalStackElement::alignment`, 
            `property__NVerticalStackElement_alignment`),
    ]),
    new IndexEntry("alt", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::alt`, 
            `field__MouseEventArgs_alt`),
    ]),
    new IndexEntry("arrange", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method virtual void NContainerElement::arrange(const NRect& bounds)`, 
            `method__NContainerElement_arrange`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method virtual void NElement::arrange(const NRect& bounds)`, 
            `method__NElement_arrange`),
    ]),
    new IndexEntry("attribute_off", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::attribute_off(NAttribute attr)`, 
            `method__NElement_attribute_off`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::attribute_off(NAttribute attr)`, 
            `method__NElement_attribute_off`),
    ]),
    new IndexEntry("attribute_on", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::attribute_on(NAttribute attr)`, 
            `method__NElement_attribute_on`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::attribute_on(NAttribute attr)`, 
            `method__NElement_attribute_on`),
    ]),
    new IndexEntry("AUTO_SIZE", [
        new IndexReference(
            `/apis/constants`, 
            `5.2 - Constants`, 
            `constant constexpr int AUTO_SIZE`, 
            `constant___AUTO_SIZE`),
    ]),
    new IndexEntry("Black", [
        new IndexReference(
            `/apis/classes/NColor`, 
            `5.7.5 - NColor`, 
            `method static NColor NColor::Black`, 
            `method__NColor_Black`),
    ]),
    new IndexEntry("bottom", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method int NRect::bottom() const`, 
            `method__NRect_bottom`),
    ]),
    new IndexEntry("bottom_left", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NPoint NRect::bottom_left() const`, 
            `method__NRect_bottom_left`),
    ]),
    new IndexEntry("bottom_right", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NPoint NRect::bottom_right() const`, 
            `method__NRect_bottom_right`),
    ]),
    new IndexEntry("bounds", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NRect NRect::bounds(const NRect& other) const`, 
            `method__NRect_bounds`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::bounds`, 
            `property__NElement_bounds`),
    ]),
    new IndexEntry("box", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::box(const NRect &rect, const std::optional<NColorPair>&colorPair = std::nullopt)`, 
            `method__NElement_box`),
    ]),
    new IndexEntry("bubble_event", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method bool NWindow::bubble_event(int x, int y, const std::function<bool(NElement&)>& fn)`, 
            `method__NWindow_bubble_event`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method bool NWindow::bubble_event(NPoint pt}, const std::function<bool(NElement&)>& fn)`, 
            `method__NWindow_bubble_event`),
    ]),
    new IndexEntry("bubble_mouse_event", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method bool NWindow::bubble_mouse_event(int x, int y, const std::function<bool(NElement&)>& fn)`, 
            `method__NWindow_bubble_mouse_event`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method bool NWindow::bubble_mouse_event(NElement::ptr element, const std::function<bool(NElement&)>& fn)`, 
            `method__NWindow_bubble_mouse_event`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method bool NWindow::bubble_mouse_event(NElement::ptr element}, const std::function<bool(NElement&)>& fn)`, 
            `method__NWindow_bubble_mouse_event`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method bool NWindow::bubble_mouse_event(NPoint pt}, const std::function<bool(NElement&)>& fn)`, 
            `method__NWindow_bubble_mouse_event`),
    ]),
    new IndexEntry("button0_pressed", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::button0_pressed`, 
            `field__MouseEventArgs_button0_pressed`),
    ]),
    new IndexEntry("button1_pressed", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::button1_pressed`, 
            `field__MouseEventArgs_button1_pressed`),
    ]),
    new IndexEntry("button2_pressed", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::button2_pressed`, 
            `field__MouseEventArgs_button2_pressed`),
    ]),
    new IndexEntry("button3_pressed", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::button3_pressed`, 
            `field__MouseEventArgs_button3_pressed`),
    ]),
    new IndexEntry("cancel_post", [
        new IndexReference(
            `/using/dispatcher`, 
            `4.7 - The NWindows Dispatcher`, 
            `method bool cancel_post(PostHandle handle)`, 
            `method___cancel_post`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method bool NWindows::cancel_post(PostHandle handle)`, 
            `method__NWindows_cancel_post`),
    ]),
    new IndexEntry("character_filter", [
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method void NTextEditElement::character_filter(const std::function<bool(char32_t c)>& filter, int position)`, 
            `method__NTextEditElement_character_filter`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method void NTextEditElement::character_filter(std::function<bool(char32_t c)>&& filter,int position)`, 
            `method__NTextEditElement_character_filter`),
    ]),
    new IndexEntry("checked", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NCheckboxElement::checked`, 
            `property__NCheckboxElement_checked`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `property NCheckboxElement::checked`, 
            `property__NCheckboxElement_checked`),
    ]),
    new IndexEntry("checked_text", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NCheckboxElement::checked_text`, 
            `property__NCheckboxElement_checked_text`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NRadioGroupElement::checked_text`, 
            `property__NRadioGroupElement_checked_text`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `property NRadioGroupElement::checked_text`, 
            `property__NRadioGroupElement_checked_text`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `property NCheckboxElement::checked_text`, 
            `property__NCheckboxElement_checked_text`),
    ]),
    new IndexEntry("children", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `property NContainerElement::children`, 
            `property__NContainerElement_children`),
    ]),
    new IndexEntry("clear", [
        new IndexReference(
            `/apis/classes/NEvent`, 
            `5.7.10 - NEvent<T>`, 
            `method NEvent::clear`, 
            `method__NEvent_clear`),
    ]),
    new IndexEntry("clickable", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::clickable`, 
            `property__NElement_clickable`),
    ]),
    new IndexEntry("clock_t", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `using NWindow::clock_t`, 
            `using__NWindow_clock_t`),
    ]),
    new IndexEntry("close", [
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `method void NWindow::close()`, 
            `method__NWindow_close`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::close()`, 
            `method__NWindow_close`),
    ]),
    new IndexEntry("collator", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::collator`, 
            `property__NWindow_collator`),
    ]),
    new IndexEntry("color", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NBoxElement::color`, 
            `property__NBoxElement_color`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NTextElement::color`, 
            `property__NTextElement_color`),
        new IndexReference(
            `/apis/classes/NBoxElement`, 
            `5.7.1 - NBoxElement`, 
            `property NBoxElement::color`, 
            `property__NBoxElement_color`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `property NTextElement::color`, 
            `property__NTextElement_color`),
    ]),
    new IndexEntry("color_off", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::color_off(NColorPair colorPair)`, 
            `method__NElement_color_off`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::color_off(NColorPair colorPair)`, 
            `method__NElement_color_off`),
    ]),
    new IndexEntry("color_on", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::color_on(NColorPair colorPair)`, 
            `method__NElement_color_on`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::color_on(NColorPair colorPair)`, 
            `method__NElement_color_on`),
    ]),
    new IndexEntry("color_palette", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::color_palette`, 
            `property__NWindow_color_palette`),
    ]),
    new IndexEntry("column_gap", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NHorizontalStackElement::column_gap`, 
            `property__NHorizontalStackElement_column_gap`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NRadioGroupElement::column_gap`, 
            `property__NRadioGroupElement_column_gap`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `property NRadioGroupElement::column_gap`, 
            `property__NRadioGroupElement_column_gap`),
    ]),
    new IndexEntry("compose_characters", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method char32_t NWindow::compose_characters(char32_t left, char32_t right)`, 
            `method__NWindow_compose_characters`),
    ]),
    new IndexEntry("contains", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method bool NRect::contains(const NPoint& point) const`, 
            `method__NRect_contains`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method bool NRect::contains(int x, int y) const`, 
            `method__NRect_contains`),
    ]),
    new IndexEntry("copy", [
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method void NTextEditElement::copy()`, 
            `method__NTextEditElement_copy`),
    ]),
    new IndexEntry("create", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NBoxElement::ptr NBoxElement::create()`, 
            `method__NBoxElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NButtonElement::ptr create()`, 
            `method___create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NButtonElement::ptr create(const std::string& label, int width = AUTO_SIZE)`, 
            `method___create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NCheckboxElement::ptr NCheckboxElement::create()`, 
            `method__NCheckboxElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NCheckboxElement::ptr NCheckboxElement::create(const std::string& label, bool checked = false)`, 
            `method__NCheckboxElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NDropdownElement::ptr NDropdownElement::create()`, 
            `method__NDropdownElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NDropdownElement::ptr NDropdownElement::create(const std::vector<NMenuItem>& menu_items, int selected)`, 
            `method__NDropdownElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NDropdownElement::ptr NDropdownElement::create(std::vector<NMenuItem>&& menu_items, int selected)`, 
            `method__NDropdownElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NHorizontalStackElement::ptr NHorizontalStackElement::create()`, 
            `method__NHorizontalStackElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NMenuElement::ptr NMenuElement::create()`, 
            `method__NMenuElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NMenuElement::ptr NMenuElement::create(const std::string& label, const std::vector<NMenuItem>& menu_items)`, 
            `method__NMenuElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NMenuElement::ptr NMenuElement::create(const std::string& label, std::vector<NMenuItem>&& menu_items)`, 
            `method__NMenuElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NRadioGroupElement::ptr NRadioGroupElement::create()`, 
            `method__NRadioGroupElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NRadioGroupElement::ptr NRadioGroupElement::create(NOrientation orientation, const std::vector<std::string>& labels, int selection)`, 
            `method__NRadioGroupElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NTextEditElement::ptr NTextEditElement::create(const std::string& defaultText)`, 
            `method__NTextEditElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NTextElement::ptr NTextElement::create()`, 
            `method__NTextElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NTextElement::ptr NTextElement::create(const std::string& text, NAttribute attribute)`, 
            `method__NTextElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NTextElement::ptr NTextElement::create(const std::string& text)`, 
            `method__NTextElement_create`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `method static NVerticalStackElement::ptr NVerticalStackElement::create()`, 
            `method__NVerticalStackElement_create`),
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `method static NPopupMenuWindow::ptr create(NWindow::ptr parentWindow, const std::vector<NMenuItem>& menu_items, const NRect& anchor, NAttachment attachment);`, 
            `method___create`),
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `method static NPopupWindow::ptr create(NWindow::ptr parentWindow, const NRect& anchor, NAttachment attachment);`, 
            `method___create`),
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `method static NWindow::ptr NWindow::create(int width, int height, NColorPalette* colorPalette = nullptr)`, 
            `method__NWindow_create`),
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `method static NWindow::ptr NWindow::create(int x, int y, int width, int height, NColorPalette* colorPalette = nullptr)`, 
            `method__NWindow_create`),
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `method static NWindow::ptr NWindow::create(NWindow::ptr parent_window, int width, int height)`, 
            `method__NWindow_create`),
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `method static NWindow::ptr NWindow::create(NWindow::ptr parent_window, int x, int y,int width, int height)`, 
            `method__NWindow_create`),
        new IndexReference(
            `/apis/classes/NBoxElement`, 
            `5.7.1 - NBoxElement`, 
            `method static NBoxElement::ptr NBoxElement::create()`, 
            `method__NBoxElement_create`),
        new IndexReference(
            `/apis/classes/NHorizontalStackElement`, 
            `5.7.11 - NHorizontalStackElement`, 
            `method static NHorizontalStackElement::ptr NHorizontalStackElement::create()`, 
            `method__NHorizontalStackElement_create`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `method static NMenuElement::ptr NMenuElement::create()`, 
            `method__NMenuElement_create`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `method static NMenuElement::ptr NMenuElement::create(const std::string& label, const std::vector<NMenuItem>& menu_items)`, 
            `method__NMenuElement_create`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `method static NMenuElement::ptr NMenuElement::create(const std::string& label, std::vector<NMenuItem>&& menu_items)`, 
            `method__NMenuElement_create`),
        new IndexReference(
            `/apis/classes/NMessageWindow`, 
            `5.7.13 - NMessageWindow`, 
            `method static NMessageWindow::ptr NMessageWindow::create(NWindow::ptr parent_window, NMessageType message_type, const std::string& title, const std::string& message, int message_width = AUTO_SIZE)`, 
            `method__NMessageWindow_create`),
        new IndexReference(
            `/apis/classes/NPopupWindow`, 
            `5.7.14 - NPopupWindow`, 
            `method static NPopupWindow::ptr create(NWindow::ptr parentWindow, const NRect& anchor, NAttachment attachment);`, 
            `method___create`),
        new IndexReference(
            `/apis/classes/NPopupMenuWindow`, 
            `5.7.15 - NPopupMenuWindow`, 
            `method static NPopupMenuWindow::ptr create(NWindow::ptr parentWindow, const std::vector<NMenuItem>& menu_items, const NRect& anchor, NAttachment attachment);`, 
            `method___create`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `method static NRadioGroupElement::ptr NRadioGroupElement::create()`, 
            `method__NRadioGroupElement_create`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `method static NRadioGroupElement::ptr NRadioGroupElement::create(NOrientation orientation, const std::vector<std::string>& labels, int selection)`, 
            `method__NRadioGroupElement_create`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `method static NTextElement::ptr NTextElement::create()`, 
            `method__NTextElement_create`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `method static NTextElement::ptr NTextElement::create(const std::string& text, NAttribute attribute)`, 
            `method__NTextElement_create`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `method static NTextElement::ptr NTextElement::create(const std::string& text)`, 
            `method__NTextElement_create`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method static NTextEditElement::ptr NTextEditElement::create(const std::string& defaultText)`, 
            `method__NTextEditElement_create`),
        new IndexReference(
            `/apis/classes/NVerticalStackElement`, 
            `5.7.19 - NVerticalStackElement`, 
            `method static NVerticalStackElement::ptr NVerticalStackElement::create()`, 
            `method__NVerticalStackElement_create`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `method static NButtonElement::ptr create()`, 
            `method___create`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `method static NButtonElement::ptr create(const std::string& label, int width = AUTO_SIZE)`, 
            `method___create`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method static NWindow::ptr NWindow::create(int width, int height, NColorPalette* color_palette = nullptr)`, 
            `method__NWindow_create`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method static NWindow::ptr NWindow::create(int x, int y, int width, int height, NColorPalette* color_palette = nullptr)`, 
            `method__NWindow_create`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method static NWindow::ptr NWindow::create(NWindow::ptr parent_window, int width, int height)`, 
            `method__NWindow_create`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method static NWindow::ptr NWindow::create(NWindow::ptr parent_window, int x, int y,int width, int height)`, 
            `method__NWindow_create`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `method static NCheckboxElement::ptr NCheckboxElement::create()`, 
            `method__NCheckboxElement_create`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `method static NCheckboxElement::ptr NCheckboxElement::create(const std::string& label, bool checked = false)`, 
            `method__NCheckboxElement_create`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `method static NDropdownElement::ptr NDropdownElement::create()`, 
            `method__NDropdownElement_create`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `method static NDropdownElement::ptr NDropdownElement::create(const std::vector<NMenuItem>& menu_items, int selected)`, 
            `method__NDropdownElement_create`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `method static NDropdownElement::ptr NDropdownElement::create(std::vector<NMenuItem>&& menu_items, int selected)`, 
            `method__NDropdownElement_create`),
    ]),
    new IndexEntry("ctrl", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::ctrl`, 
            `field__MouseEventArgs_ctrl`),
    ]),
    new IndexEntry("cursor_position", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::cursor_position`, 
            `field__MouseEventArgs_cursor_position`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `property NTextEditElement::cursor_position`, 
            `property__NTextEditElement_cursor_position`),
    ]),
    new IndexEntry("cut", [
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method void NTextEditElement::cut()`, 
            `method__NTextEditElement_cut`),
    ]),
    new IndexEntry("DEBUG_NELEMENT_LIFECYCLE", [
        new IndexReference(
            `/apis/defines`, 
            `5.1 - Defines`, 
            `define DEBUG_NELEMENT_LIFECYCLE`, 
            `define___DEBUG_NELEMENT_LIFECYCLE`),
    ]),
    new IndexEntry("decompose_utf8", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method const std::string & NWindow::decompose_utf8(const std::string & text) const`, 
            `method__NWindow_decompose_utf8`),
    ]),
    new IndexEntry("decomposed_text", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NTextEditElement::decomposed_text`, 
            `property__NTextEditElement_decomposed_text`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `property NTextEditElement::decomposed_text`, 
            `property__NTextEditElement_decomposed_text`),
    ]),
    new IndexEntry("delete_character_at", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method void NTextSelection::delete_character_at(int utf8_index)`, 
            `method__NTextSelection_delete_character_at`),
    ]),
    new IndexEntry("delete_selection", [
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method void NTextEditElement::delete_selection()`, 
            `method__NTextEditElement_delete_selection`),
    ]),
    new IndexEntry("disabled", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NButtonElement::disabled`, 
            `property__NButtonElement_disabled`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NCheckboxElement::disabled`, 
            `property__NCheckboxElement_disabled`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NDropdownElement::disabled`, 
            `property__NDropdownElement_disabled`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NElement::disabled`, 
            `property__NElement_disabled`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NMenuElement::disabled`, 
            `property__NMenuElement_disabled`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NRadioGroupElement::disabled`, 
            `property__NRadioGroupElement_disabled`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `property NRadioGroupElement::disabled`, 
            `property__NRadioGroupElement_disabled`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `property NButtonElement::disabled`, 
            `property__NButtonElement_disabled`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `property NCheckboxElement::disabled`, 
            `property__NCheckboxElement_disabled`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::disabled`, 
            `property__NElement_disabled`),
    ]),
    new IndexEntry("disabled_color", [
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `property NButtonBaseElement::disabled_color`, 
            `property__NButtonBaseElement_disabled_color`),
    ]),
    new IndexEntry("display_checkmark", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NMenuItem::display_checkmark(bool checked)`, 
            `method__NMenuItem_display_checkmark`),
    ]),
    new IndexEntry("Divider", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method static NMenuItem NMenuItem::Divider()`, 
            `method__NMenuItem_Divider`),
    ]),
    new IndexEntry("dropdown_attachment", [
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `property NDropdownElement::dropdown_attachment`, 
            `property__NDropdownElement_dropdown_attachment`),
    ]),
    new IndexEntry("element_to_screen", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NPoint NElement::element_to_screen(const NPoint& point) const`, 
            `method__NElement_element_to_screen`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NRect element_to_screen(const NRect& rect) const`, 
            `method___element_to_screen`),
    ]),
    new IndexEntry("element_to_window", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NPoint NElement::element_to_window(const NPoint& point) const`, 
            `method__NElement_element_to_window`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NRect element_to_window(const NRect& rect) const`, 
            `method___element_to_window`),
    ]),
    new IndexEntry("end", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method int NTextSelection::end() const`, 
            `method__NTextSelection_end`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method void NTextSelection::end(int value)`, 
            `method__NTextSelection_end`),
    ]),
    new IndexEntry("EventHandler", [
        new IndexReference(
            `/apis/classes/NEvent`, 
            `5.7.10 - NEvent<T>`, 
            `using NEvent::EventHandler`, 
            `using__NEvent_EventHandler`),
    ]),
    new IndexEntry("fatal_error", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::fatal_error(const std::string&message)`, 
            `method__NWindow_fatal_error`),
    ]),
    new IndexEntry("find_child_element", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method NElement::ptr NContainerElement::find_child_element(const std::function<bool(NElement&)>& predicate);`, 
            `method__NContainerElement_find_child_element`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method virtual NElement::ptr find_child_element(const std::function<bool(NElement&)>& predicate);`, 
            `method___find_child_element`),
    ]),
    new IndexEntry("fire", [
        new IndexReference(
            `/apis/classes/NEvent`, 
            `5.7.10 - NEvent<T>`, 
            `method NEvent::fire`, 
            `method__NEvent_fire`),
    ]),
    new IndexEntry("focus", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::focus`, 
            `property__NWindow_focus`),
    ]),
    new IndexEntry("focus_color", [
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `property NButtonBaseElement::focus_color`, 
            `property__NButtonBaseElement_focus_color`),
    ]),
    new IndexEntry("focusable", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::focusable`, 
            `property__NElement_focusable`),
    ]),
    new IndexEntry("for_each_element", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method virtual void NContainerElement::for_each_element(const std::function<void(NElement&)>& callback);`, 
            `method__NContainerElement_for_each_element`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method virtual void NElement::for_each_element(const std::function<void(NElement&)>& callback);`, 
            `method__NElement_for_each_element`),
    ]),
    new IndexEntry("get_clipboard_text", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method std::string NWindow::get_clipboard_text()`, 
            `method__NWindow_get_clipboard_text`),
    ]),
    new IndexEntry("get_color", [
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `method NColorPair NButtonBaseElement::get_color()`, 
            `method__NButtonBaseElement_get_color`),
    ]),
    new IndexEntry("get_element_at", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method NElement::ptr NContainerElement::get_element_at(const NPoint&pt)`, 
            `method__NContainerElement_get_element_at`),
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method NElement::ptr NContainerElement::get_element_at(int x, int y)`, 
            `method__NContainerElement_get_element_at`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NElement::ptr NElement::get_element_at(const NPoint&pt)`, 
            `method__NElement_get_element_at`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NElement::ptr NElement::get_element_at(int x, int y)`, 
            `method__NElement_get_element_at`),
    ]),
    new IndexEntry("get_element_by_id<T>", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method std::shared_ptr<T> NElement::get_element_by_id<T>(const std::string& id)`, 
            `method__NElement___Tget_element_by_id_T`),
    ]),
    new IndexEntry("handle_attached", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::handle_attached(NWindow* window)`, 
            `method__NElement_handle_attached`),
    ]),
    new IndexEntry("handle_detaching", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::handle_detaching()`, 
            `method__NElement_handle_detaching`),
    ]),
    new IndexEntry("handled", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field NEventArgsBase::handled`, 
            `field__NEventArgsBase_handled`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field NKeyEventArgs::handled`, 
            `field__NKeyEventArgs_handled`),
    ]),
    new IndexEntry("has_colors", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::has_colors`, 
            `property__NWindow_has_colors`),
    ]),
    new IndexEntry("height", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NElement::height`, 
            `property__NElement_height`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::height`, 
            `property__NElement_height`),
    ]),
    new IndexEntry("horizontal_line", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::horizontal_line(int x, int y, int width)`, 
            `method__NElement_horizontal_line`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::horizontal_line(int x, int y, int width)`, 
            `method__NElement_horizontal_line`),
    ]),
    new IndexEntry("hover_color", [
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `property NButtonBaseElement::hover_color`, 
            `property__NButtonBaseElement_hover_color`),
    ]),
    new IndexEntry("inflate", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NRect NRect::inflate(const NThickness& thickness) const`, 
            `method__NRect_inflate`),
    ]),
    new IndexEntry("init_root_window", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::init_root_window()`, 
            `method__NWindow_init_root_window`),
    ]),
    new IndexEntry("inset", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NRect NRect::inset(const NThickness& thickness) const`, 
            `method__NRect_inset`),
    ]),
    new IndexEntry("intersect", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NRect NRect::intersect(const NRect& other) const`, 
            `method__NRect_intersect`),
    ]),
    new IndexEntry("invalidate_layout", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method virtual void NElement::invalidate_layout()`, 
            `method__NElement_invalidate_layout`),
    ]),
    new IndexEntry("invalidate_render", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method void NContainerElement::invalidate_render()`, 
            `method__NContainerElement_invalidate_render`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method virtual void NElement::invalidate_render()`, 
            `method__NElement_invalidate_render`),
    ]),
    new IndexEntry("is_active_window", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::is_active_window`, 
            `property__NWindow_is_active_window`),
    ]),
    new IndexEntry("is_cancel", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::is_cancel`, 
            `property__NElement_is_cancel`),
    ]),
    new IndexEntry("is_container", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method bool NContainerElement::is_container() const`, 
            `method__NContainerElement_is_container`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::is_container`, 
            `property__NElement_is_container`),
    ]),
    new IndexEntry("is_default", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::is_default`, 
            `property__NElement_is_default`),
    ]),
    new IndexEntry("is_divider", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method bool NMenuItem::is_divider() const`, 
            `method__NMenuItem_is_divider`),
    ]),
    new IndexEntry("is_empty", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method bool NTextSelection::is_empty() const`, 
            `method__NTextSelection_is_empty`),
    ]),
    new IndexEntry("is_focused", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::is_focused`, 
            `property__NElement_is_focused`),
    ]),
    new IndexEntry("is_menu_item_shortcut_key", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method bool NElement::is_menu_item_shortcut_key(char32_t c, const std::string& text)`, 
            `method__NElement_is_menu_item_shortcut_key`),
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method bool NElement::is_menu_item_shortcut_key(const std::string& utf8key, const std::string& text)`, 
            `method__NElement_is_menu_item_shortcut_key`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method bool NElement::is_menu_item_shortcut_key(char32_t c, const std::string& text)`, 
            `method__NElement_is_menu_item_shortcut_key`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method bool NElement::is_menu_item_shortcut_key(const std::string& utf8key, const std::string& text)`, 
            `method__NElement_is_menu_item_shortcut_key`),
    ]),
    new IndexEntry("key", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field NKeyEventArgs::key`, 
            `field__NKeyEventArgs_key`),
    ]),
    new IndexEntry("keyboard_clicking", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method bool NElement::keyboard_clicking() const`, 
            `method__NElement_keyboard_clicking`),
    ]),
    new IndexEntry("label", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NButtonElement::label`, 
            `property__NButtonElement_label`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NCheckboxElement::label`, 
            `property__NCheckboxElement_label`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NMenuElement::label`, 
            `property__NMenuElement_label`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `property NMenuElement::label`, 
            `property__NMenuElement_label`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `property NButtonElement::label`, 
            `property__NButtonElement_label`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `property NCheckboxElement::label`, 
            `property__NCheckboxElement_label`),
    ]),
    new IndexEntry("label_alignment", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NButtonElement::label_alignment`, 
            `property__NButtonElement_label_alignment`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `property NButtonElement::label_alignment`, 
            `property__NButtonElement_label_alignment`),
    ]),
    new IndexEntry("left", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method int NRect::left() const`, 
            `method__NRect_left`),
    ]),
    new IndexEntry("make_color", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method NColor NWindow::make_color(uint32_t rrggbb)`, 
            `method__NWindow_make_color`),
    ]),
    new IndexEntry("make_color_pair", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method NColorPair NWindow::make_color_pair(NColor foreground, NColor background)`, 
            `method__NWindow_make_color_pair`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method NColorPair NWindow::make_color_pair(uint32_t rrggbbFg, uint32_t rrggbbBg)`, 
            `method__NWindow_make_color_pair`),
    ]),
    new IndexEntry("margin", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NElement::margin`, 
            `property__NElement_margin`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::margin`, 
            `property__NElement_margin`),
    ]),
    new IndexEntry("max", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method int NTextSelection::max() const`, 
            `method__NTextSelection_max`),
    ]),
    new IndexEntry("max_color_pairs", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::max_color_pairs`, 
            `property__NWindow_max_color_pairs`),
    ]),
    new IndexEntry("max_colors", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::max_colors`, 
            `property__NWindow_max_colors`),
    ]),
    new IndexEntry("measure", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method NSize NElement::measure(const NSize& available)`, 
            `method__NElement_measure`),
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method virtual NSize NContainerElement::measure(const NSize& available)`, 
            `method__NContainerElement_measure`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method virtual NSize NElement::measure(const NSize& available)`, 
            `method__NElement_measure`),
    ]),
    new IndexEntry("measure_child_with_margins", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method NSize NContainerElement::measure_child_with_margins(const NSize& available, NElement::ptr& child);`, 
            `method__NContainerElement_measure_child_with_margins`),
    ]),
    new IndexEntry("measure_menu_text", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method int NElement::measure_menu_text(const std::string& text)`, 
            `method__NElement_measure_menu_text`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method int NElement::measure_menu_text(const std::string& text)`, 
            `method__NElement_measure_menu_text`),
    ]),
    new IndexEntry("measure_text", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method int NElement::measure_text(const std::string&text)`, 
            `method__NElement_measure_text`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method int NElement::measure_text(const std::string&text)`, 
            `method__NElement_measure_text`),
    ]),
    new IndexEntry("measured", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::measured`, 
            `property__NElement_measured`),
    ]),
    new IndexEntry("menu_attachment", [
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `property NMenuElement::menu_attachment`, 
            `property__NMenuElement_menu_attachment`),
    ]),
    new IndexEntry("menu_items", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NDropdownElement::menu_items`, 
            `property__NDropdownElement_menu_items`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NMenuElement::menu_items`, 
            `property__NMenuElement_menu_items`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `property NMenuElement::menu_items`, 
            `property__NMenuElement_menu_items`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `property NDropdownElement::menu_items`, 
            `property__NDropdownElement_menu_items`),
    ]),
    new IndexEntry("min", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method int NTextSelection::min() const`, 
            `method__NTextSelection_min`),
    ]),
    new IndexEntry("mouse_capture", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::mouse_capture(NElement::ptr element)`, 
            `method__NWindow_mouse_capture`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::mouse_capture(NElement* element)`, 
            `method__NWindow_mouse_capture`),
    ]),
    new IndexEntry("mouse_capture_release", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::mouse_capture_release()`, 
            `method__NWindow_mouse_capture_release`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::mouse_capture_release(NElement* element)`, 
            `method__NWindow_mouse_capture_release`),
    ]),
    new IndexEntry("mouse_entered", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::mouse_entered`, 
            `property__NElement_mouse_entered`),
    ]),
    new IndexEntry("move", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::move(int x, int y)`, 
            `method__NElement_move`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::move(int x, int y)`, 
            `method__NElement_move`),
    ]),
    new IndexEntry("move_window", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::move_window(int dx, int dy);`, 
            `method__NWindow_move_window`),
    ]),
    new IndexEntry("NAlignment", [
        new IndexReference(
            `/apis/enums`, 
            `5.4 - Enums`, 
            `enum class NAlignment`, 
            `enum__NAlignment`),
    ]),
    new IndexEntry("NAttachment", [
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `enum class NAttachment`, 
            `enum__NAttachment`),
        new IndexReference(
            `/apis/enums`, 
            `5.4 - Enums`, 
            `enum class NAttachment`, 
            `enum__NAttachment`),
    ]),
    new IndexEntry("NAttribute", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `enum class NAttribute`, 
            `enum__NAttribute`),
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `enum class NAttribute`, 
            `enum__NAttribute`),
        new IndexReference(
            `/apis/enums`, 
            `5.4 - Enums`, 
            `enum class NAttribute`, 
            `enum__NAttribute`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `enum class NAttribute`, 
            `enum__NAttribute`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `enum class NAttribute`, 
            `enum__NAttribute`),
    ]),
    new IndexEntry("navigate_focus", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::navigate_focus(int x, int y, NNavDirection direction)`, 
            `method__NWindow_navigate_focus`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::navigate_focus(NNavDirection direction)`, 
            `method__NWindow_navigate_focus`),
    ]),
    new IndexEntry("NBoxElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NBoxElement`, 
            `class__NBoxElement`),
        new IndexReference(
            `/apis/classes/NBoxElement`, 
            `5.7.1 - NBoxElement`, 
            `class NBoxElement`, 
            `class__NBoxElement`),
    ]),
    new IndexEntry("NButtonBaseElement", [
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `class NButtonBaseElement`, 
            `class__NButtonBaseElement`),
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `method NButtonBaseElement::NButtonBaseElement(const std::string &tagName)`, 
            `method__NButtonBaseElement_NButtonBaseElement`),
    ]),
    new IndexEntry("NButtonElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NButtonElement`, 
            `class__NButtonElement`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `class NButtonElement`, 
            `class__NButtonElement`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `method NButtonElement::NButtonElement(const std::string& label, int width, const std::string &tagName="Button")`, 
            `method__NButtonElement_NButtonElement`),
    ]),
    new IndexEntry("NCheckboxElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NCheckboxElement`, 
            `class__NCheckboxElement`),
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `class NCheckboxElement`, 
            `class__NCheckboxElement`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `class NCheckboxElement`, 
            `class__NCheckboxElement`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `method NCheckboxElement::NCheckboxElement(const std::string& text, bool checked,const std::string&tagName)`, 
            `method__NCheckboxElement_NCheckboxElement`),
    ]),
    new IndexEntry("NClickedEventArgs", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NClickedEventArgs::NClickedEventArgs(NElement* source, NElement* target, const NRect& location, bool is_mouse_click)`, 
            `method__NClickedEventArgs_NClickedEventArgs`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NClickedEventArgs`, 
            `struct__NClickedEventArgs`),
    ]),
    new IndexEntry("NColor", [
        new IndexReference(
            `/apis/classes/NColor`, 
            `5.7.5 - NColor`, 
            `class NColor`, 
            `class__NColor`),
        new IndexReference(
            `/apis/classes/NColor`, 
            `5.7.5 - NColor`, 
            `method NColor::NColor()`, 
            `method__NColor_NColor`),
    ]),
    new IndexEntry("NColorPair", [
        new IndexReference(
            `/apis/classes/NColorPair`, 
            `5.7.6 - NColorPair`, 
            `class NColorPair`, 
            `class__NColorPair`),
    ]),
    new IndexEntry("NColorPalette", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NColorPalette`, 
            `struct__NColorPalette`),
    ]),
    new IndexEntry("NContainerElement", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `class NContainerElement`, 
            `class__NContainerElement`),
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method NContainerElement::NContainerElement(const std::string& tag)`, 
            `method__NContainerElement_NContainerElement`),
    ]),
    new IndexEntry("NDropdownElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NDropdownElement`, 
            `class__NDropdownElement`),
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `class NDropdownElement`, 
            `class__NDropdownElement`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `class NDropdownElement`, 
            `class__NDropdownElement`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `method NDropdownElement::NDropdownElement(const std::string tagName="Menu")`, 
            `method__NDropdownElement_NDropdownElement`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `method NDropdownElement::NDropdownElement(const std::vector<NMenuItem>& menu_items, int selected, const std::string&tagName="Dropdown")`, 
            `method__NDropdownElement_NDropdownElement`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `method NDropdownElement::NDropdownElement(std::vector<NMenuItem>&& menu_items, int selected, const std::string&tagName="Dropdown")`, 
            `method__NDropdownElement_NDropdownElement`),
    ]),
    new IndexEntry("NElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NElement`, 
            `class__NElement`),
        new IndexReference(
            `/using/events`, 
            `4.5 - NWindows Events`, 
            `class NElement`, 
            `class__NElement`),
        new IndexReference(
            `/using/events/keyboard`, 
            `4.5.1 - Keyboard Events`, 
            `class NElement`, 
            `class__NElement`),
        new IndexReference(
            `/using/events/mouse`, 
            `4.5.2 - Mouse Events`, 
            `class NElement`, 
            `class__NElement`),
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `class NElement`, 
            `class__NElement`),
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `class NElement`, 
            `class__NElement`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `class NElement`, 
            `class__NElement`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NElement::NElement(const std::string&tagName)`, 
            `method__NElement_NElement`),
    ]),
    new IndexEntry("NEvent", [
        new IndexReference(
            `/apis/classes/NEvent`, 
            `5.7.10 - NEvent<T>`, 
            `class NEvent`, 
            `class__NEvent`),
        new IndexReference(
            `/apis/classes/NEvent`, 
            `5.7.10 - NEvent<T>`, 
            `method NEvent::NEvent()`, 
            `method__NEvent_NEvent`),
    ]),
    new IndexEntry("NEventArgsBase", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NEventArgsBase::NEventArgsBase(NElement* source)`, 
            `method__NEventArgsBase_NEventArgsBase`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NEventArgsBase`, 
            `struct__NEventArgsBase`),
    ]),
    new IndexEntry("NHorizontalStackElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NHorizontalStackElement`, 
            `class__NHorizontalStackElement`),
        new IndexReference(
            `/apis/classes/NHorizontalStackElement`, 
            `5.7.11 - NHorizontalStackElement`, 
            `class NHorizontalStackElement`, 
            `class__NHorizontalStackElement`),
        new IndexReference(
            `/apis/classes/NHorizontalStackElement`, 
            `5.7.11 - NHorizontalStackElement`, 
            `method NHorizontalStackElement::NHorizontalStackElement(const std::string &tag)`, 
            `method__NHorizontalStackElement_NHorizontalStackElement`),
    ]),
    new IndexEntry("NKeyEventArgs", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NKeyEventArgs::NKeyEventArgs(NElement* source, char32_t key)`, 
            `method__NKeyEventArgs_NKeyEventArgs`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NKeyEventArgs`, 
            `struct__NKeyEventArgs`),
    ]),
    new IndexEntry("NMenuElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NMenuElement`, 
            `class__NMenuElement`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `class NMenuElement`, 
            `class__NMenuElement`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `method NMenuElement::NMenuElement(const std::string &label, const std::vector<NMenuItem>& menu_items)`, 
            `method__NMenuElement_NMenuElement`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `method NMenuElement::NMenuElement(const std::string &label, std::vector<NMenuItem>&& menu_items)`, 
            `method__NMenuElement_NMenuElement`),
    ]),
    new IndexEntry("NMenuItem", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NMenuItem::NMenuItem()`, 
            `method__NMenuItem_NMenuItem`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NMenuItem::NMenuItem(bool checked,const std::string &label, int item_id, bool enabled)`, 
            `method__NMenuItem_NMenuItem`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NMenuItem::NMenuItem(const std::string &label, const std::vector<NMenuItem> &submenu, bool enabled)`, 
            `method__NMenuItem_NMenuItem`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NMenuItem::NMenuItem(const std::string &label, int item_id, bool enabled)`, 
            `method__NMenuItem_NMenuItem`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NMenuItem::NMenuItem(const std::string&icon, const std::string &label, int item_id, bool enabled)`, 
            `method__NMenuItem_NMenuItem`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NMenuItem`, 
            `struct__NMenuItem`),
    ]),
    new IndexEntry("NMessageType", [
        new IndexReference(
            `/apis/enums`, 
            `5.4 - Enums`, 
            `enum class NMessageType`, 
            `enum__NMessageType`),
    ]),
    new IndexEntry("NMessageWindow", [
        new IndexReference(
            `/apis/classes/NMessageWindow`, 
            `5.7.13 - NMessageWindow`, 
            `class NMessageWindow`, 
            `class__NMessageWindow`),
    ]),
    new IndexEntry("NMouseEventArgs", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NMouseEventArgs::NMouseEventArgs()`, 
            `method__NMouseEventArgs_NMouseEventArgs`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NMouseEventArgs::NMouseEventArgs(NElement* source)`, 
            `method__NMouseEventArgs_NMouseEventArgs`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NMouseEventArgs`, 
            `struct__NMouseEventArgs`),
    ]),
    new IndexEntry("NNavDirection", [
        new IndexReference(
            `/apis/enums`, 
            `5.4 - Enums`, 
            `enum class NNavDirection`, 
            `enum__NNavDirection`),
    ]),
    new IndexEntry("NO_ITEM_ID", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `constant const int NO_ITEM_ID`, 
            `constant___NO_ITEM_ID`),
    ]),
    new IndexEntry("NO_MENU_ITEM", [
        new IndexReference(
            `/apis/constants`, 
            `5.2 - Constants`, 
            `constant constexpr int NO_MENU_ITEM`, 
            `constant___NO_MENU_ITEM`),
    ]),
    new IndexEntry("NOrientation", [
        new IndexReference(
            `/apis/enums`, 
            `5.4 - Enums`, 
            `enum class NOrientation`, 
            `enum__NOrientation`),
    ]),
    new IndexEntry("normal_color", [
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `property NButtonBaseElement::normal_color`, 
            `property__NButtonBaseElement_normal_color`),
    ]),
    new IndexEntry("normalize_utf8", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method const std::string & NWindow::normalize_utf8(const std::string & text) const`, 
            `method__NWindow_normalize_utf8`),
    ]),
    new IndexEntry("normalized_text", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NTextEditElement::normalized_text`, 
            `property__NTextEditElement_normalized_text`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `property NTextEditElement::normalized_text`, 
            `property__NTextEditElement_normalized_text`),
    ]),
    new IndexEntry("NPoint", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NPoint::NPoint()`, 
            `method__NPoint_NPoint`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NPoint::NPoint(int x, int y)`, 
            `method__NPoint_NPoint`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NPoint`, 
            `struct__NPoint`),
    ]),
    new IndexEntry("NPopupMenuWindow", [
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `class NPopupMenuWindow`, 
            `class__NPopupMenuWindow`),
        new IndexReference(
            `/apis/classes/NPopupMenuWindow`, 
            `5.7.15 - NPopupMenuWindow`, 
            `class NPopupMenuWindow`, 
            `class__NPopupMenuWindow`),
    ]),
    new IndexEntry("NPopupWindow", [
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `class NPopupWindow`, 
            `class__NPopupWindow`),
        new IndexReference(
            `/apis/classes/NPopupWindow`, 
            `5.7.14 - NPopupWindow`, 
            `class NPopupWindow`, 
            `class__NPopupWindow`),
    ]),
    new IndexEntry("NRadioGroupElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NRadioGroupElement`, 
            `class__NRadioGroupElement`),
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `class NRadioGroupElement`, 
            `class__NRadioGroupElement`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `class NRadioGroupElement`, 
            `class__NRadioGroupElement`),
    ]),
    new IndexEntry("NRect", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NRect::NRect()`, 
            `method__NRect_NRect`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NRect::NRect(int x, int y, int width, int height)`, 
            `method__NRect_NRect`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NRect`, 
            `struct__NRect`),
    ]),
    new IndexEntry("NSize", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NSize::NSize()`, 
            `method__NSize_NSize`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NSize::NSize(int width, int height)`, 
            `method__NSize_NSize`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NSize`, 
            `struct__NSize`),
    ]),
    new IndexEntry("NTextEditElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NTextEditElement`, 
            `class__NTextEditElement`),
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `class NTextEditElement`, 
            `class__NTextEditElement`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `class NTextEditElement`, 
            `class__NTextEditElement`),
    ]),
    new IndexEntry("NTextElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NTextElement`, 
            `class__NTextElement`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `class NTextElement`, 
            `class__NTextElement`),
    ]),
    new IndexEntry("NTextSelection", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NTextSelection::NTextSelection()`, 
            `method__NTextSelection_NTextSelection`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NTextSelection::NTextSelection(int start, int length)`, 
            `method__NTextSelection_NTextSelection`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NTextSelection`, 
            `struct__NTextSelection`),
    ]),
    new IndexEntry("NThickness", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NThickness::NThickness()`, 
            `method__NThickness_NThickness`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NThickness::NThickness(int left, int top, int right, int bottom)`, 
            `method__NThickness_NThickness`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NThickness::NThickness(int thickness)`, 
            `method__NThickness_NThickness`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `struct NThickness`, 
            `struct__NThickness`),
    ]),
    new IndexEntry("NVerticalStackElement", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `class NVerticalStackElement`, 
            `class__NVerticalStackElement`),
        new IndexReference(
            `/apis/classes/NVerticalStackElement`, 
            `5.7.19 - NVerticalStackElement`, 
            `class NVerticalStackElement`, 
            `class__NVerticalStackElement`),
        new IndexReference(
            `/apis/classes/NVerticalStackElement`, 
            `5.7.19 - NVerticalStackElement`, 
            `method NVerticalStackElement::NVerticalStackElement(const std::string &tag)`, 
            `method__NVerticalStackElement_NVerticalStackElement`),
    ]),
    new IndexEntry("NWindow", [
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `class NWindow`, 
            `class__NWindow`),
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `class NWindow`, 
            `class__NWindow`),
        new IndexReference(
            `/using/dispatcher`, 
            `4.7 - The NWindows Dispatcher`, 
            `class NWindow`, 
            `class__NWindow`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `class NWindow`, 
            `class__NWindow`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method NWindow::NWindow(int x, int y, int width, int height, NColorPalette* color_palette = nullptr)`, 
            `method__NWindow_NWindow`),
    ]),
    new IndexEntry("on_attached", [
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `event NEvent<void(NWindow*window)> NElement::on_attached`, 
            `event__NElement_on_attached`),
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `event NEvent<void(NWindow*)> NElement::on_attached`, 
            `event__NElement_on_attached`),
    ]),
    new IndexEntry("on_cancelled", [
        new IndexReference(
            `/apis/classes/NPopupMenuWindow`, 
            `5.7.15 - NPopupMenuWindow`, 
            `event NEvent<void(NPopupMenuWindow::ptr source)> NPopupMenuWindow::on_cancelled`, 
            `event__NPopupMenuWindow_on_cancelled`),
    ]),
    new IndexEntry("on_checked_changed", [
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `event NEvent<void (bool checked)> NCheckboxElement::on_checked_changed`, 
            `event__NCheckboxElement_on_checked_changed`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `event NCheckboxElement::on_checked_changed`, 
            `event__NCheckboxElement_on_checked_changed`),
    ]),
    new IndexEntry("on_clicked", [
        new IndexReference(
            `/using/events`, 
            `4.5 - NWindows Events`, 
            `event NEvent<void (int button,NClickedEventArgs&event_args)>  NElement::on_clicked`, 
            `event__NElement_on_clicked`),
        new IndexReference(
            `/using/events/mouse`, 
            `4.5.2 - Mouse Events`, 
            `event NEvent<void (int button,NClickedEventArgs&event_args)> NElement::on_clicked`, 
            `event__NElement_on_clicked`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `event NEvent<void (int button,NClickedEventArgs&event_args)> NElement::on_clicked`, 
            `event__NElement_on_clicked`),
    ]),
    new IndexEntry("on_closed", [
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `event NEvent<void(NMenuElement::ptr source)> NMenuElement::on_closed`, 
            `event__NMenuElement_on_closed`),
        new IndexReference(
            `/apis/classes/NMessageWindow`, 
            `5.7.13 - NMessageWindow`, 
            `event NEvent<void(NMessageWindow::ptr source)> NMessageWindow::on_closed`, 
            `event__NMessageWindow_on_closed`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `event NEvent<void(NDropdownElement::ptr source)> NDropdownElement::on_closed`, 
            `event__NDropdownElement_on_closed`),
    ]),
    new IndexEntry("on_detaching", [
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `event NEvent<void()> NElement::on_detaching`, 
            `event__NElement_on_detaching`),
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `event NEvent<void(void)> void NElement::on_detaching`, 
            `event__NElement_on_detaching`),
    ]),
    new IndexEntry("on_focus_changed", [
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `event NEvent<void (NElement::ptr focusElement)> NWindow::on_focus_changed`, 
            `event__NWindow_on_focus_changed`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `event NEvent<void(NElement::ptr focusElement)> NWindow::on_focus_changed`, 
            `event__NWindow_on_focus_changed`),
    ]),
    new IndexEntry("on_focused", [
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `event NEvent<void (bool focused)> NElement::on_focused`, 
            `event__NElement_on_focused`),
    ]),
    new IndexEntry("on_is_active_changed", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `event NEvent<void(NWindow::ptr source, bool activated)> NWindow::on_is_active_changed`, 
            `event__NWindow_on_is_active_changed`),
    ]),
    new IndexEntry("on_item_selected", [
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `event NEvent<void(NMenuElement::ptr source, int selection)> NMenuElement::on_item_selected`, 
            `event__NMenuElement_on_item_selected`),
        new IndexReference(
            `/apis/classes/NPopupMenuWindow`, 
            `5.7.15 - NPopupMenuWindow`, 
            `event NEvent<void(NPopupMenuWindow::ptr source, int item_id)> NPopupMenuWindow::on_item_selected`, 
            `event__NPopupMenuWindow_on_item_selected`),
    ]),
    new IndexEntry("on_key", [
        new IndexReference(
            `/using/events`, 
            `4.5 - NWindows Events`, 
            `event NEvent<void (NKeyEventArgs&event_args)> NElement::on_key`, 
            `event__NElement_on_key`),
        new IndexReference(
            `/using/events/keyboard`, 
            `4.5.1 - Keyboard Events`, 
            `event NEvent<void (NKeyEventArgs&event_args)> NElement::on_key`, 
            `event__NElement_on_key`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `event NEvent<void (NKeyEventArgs&event_args)> NElement::on_key`, 
            `event__NElement_on_key`),
    ]),
    new IndexEntry("on_key_code", [
        new IndexReference(
            `/using/events/keyboard`, 
            `4.5.1 - Keyboard Events`, 
            `event NEvent<void (NKeyCodeEventArgs&event_args)> NElement::on_key_code`, 
            `event__NElement_on_key_code`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `event NEvent<void (NKeyCodeEventArgs&event_args)> NElement::on_key_code`, 
            `event__NElement_on_key_code`),
    ]),
    new IndexEntry("on_mouse_button_pressed", [
        new IndexReference(
            `/using/events`, 
            `4.5 - NWindows Events`, 
            `event NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_pressed`, 
            `event__NElement_on_mouse_button_pressed`),
        new IndexReference(
            `/using/events/mouse`, 
            `4.5.2 - Mouse Events`, 
            `event NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_pressed`, 
            `event__NElement_on_mouse_button_pressed`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `event NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_pressed`, 
            `event__NElement_on_mouse_button_pressed`),
    ]),
    new IndexEntry("on_mouse_button_released", [
        new IndexReference(
            `/using/events`, 
            `4.5 - NWindows Events`, 
            `event NEvent<void (int button,NMouseEventArgs&event_args)>  NElement::on_mouse_button_released`, 
            `event__NElement_on_mouse_button_released`),
        new IndexReference(
            `/using/events/mouse`, 
            `4.5.2 - Mouse Events`, 
            `event NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_released`, 
            `event__NElement_on_mouse_button_released`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `event NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_released`, 
            `event__NElement_on_mouse_button_released`),
    ]),
    new IndexEntry("on_mouse_enter", [
        new IndexReference(
            `/using/events`, 
            `4.5 - NWindows Events`, 
            `event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_enter`, 
            `event__NElement_on_mouse_enter`),
        new IndexReference(
            `/using/events/mouse`, 
            `4.5.2 - Mouse Events`, 
            `event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_enter`, 
            `event__NElement_on_mouse_enter`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_enter`, 
            `event__NElement_on_mouse_enter`),
    ]),
    new IndexEntry("on_mouse_leave", [
        new IndexReference(
            `/using/events`, 
            `4.5 - NWindows Events`, 
            `event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_leave`, 
            `event__NElement_on_mouse_leave`),
        new IndexReference(
            `/using/events/mouse`, 
            `4.5.2 - Mouse Events`, 
            `event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_leave`, 
            `event__NElement_on_mouse_leave`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_leave`, 
            `event__NElement_on_mouse_leave`),
    ]),
    new IndexEntry("on_mouse_lost_capture", [
        new IndexReference(
            `/using/events`, 
            `4.5 - NWindows Events`, 
            `event NEvent<void ()>  NElement::on_mouse_lost_capture`, 
            `event__NElement_on_mouse_lost_capture`),
        new IndexReference(
            `/using/events/mouse`, 
            `4.5.2 - Mouse Events`, 
            `event NEvent<void ()>  NElement::on_mouse_lost_capture`, 
            `event__NElement_on_mouse_lost_capture`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `event NEvent<void ()>  NElement::on_mouse_lost_capture`, 
            `event__NElement_on_mouse_lost_capture`),
    ]),
    new IndexEntry("on_mouse_move", [
        new IndexReference(
            `/using/events`, 
            `4.5 - NWindows Events`, 
            `event NEvent<void (NMouseEventArgs&event_args)>  NElement::on_mouse_move`, 
            `event__NElement_on_mouse_move`),
        new IndexReference(
            `/using/events/mouse`, 
            `4.5.2 - Mouse Events`, 
            `event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_move`, 
            `event__NElement_on_mouse_move`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_move`, 
            `event__NElement_on_mouse_move`),
    ]),
    new IndexEntry("on_opening", [
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `event NEvent<void(NMenuElement::ptr source)> NMenuElement::on_opening`, 
            `event__NMenuElement_on_opening`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `event NEvent<void(NDropdownElement::ptr source)> NDropdownElement::on_opening`, 
            `event__NDropdownElement_on_opening`),
    ]),
    new IndexEntry("on_selection_changed", [
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `event NEvent<void(const NTextSelection&selection)> NTextEditElement::on_selection_changed`, 
            `event__NTextEditElement_on_selection_changed`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `event NEvent<void(NRadioButtonGroupElement::ptr source, int selection)> NRadioGroupElement::on_selection_changed`, 
            `event__NRadioGroupElement_on_selection_changed`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `event NTextEditElement::on_selection_changed`, 
            `event__NTextEditElement_on_selection_changed`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `event NEvent<void(NButtonElement::ptr source, int selection)> NButtonElement::on_selection_changed`, 
            `event__NButtonElement_on_selection_changed`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `event NEvent<void(NDropdownElement::ptr source, int selection)> NDropdownElement::on_selection_changed`, 
            `event__NDropdownElement_on_selection_changed`),
    ]),
    new IndexEntry("on_text_changed", [
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `event NEvent<void(const std::string&)> NTextEditElement::on_text_changed`, 
            `event__NTextEditElement_on_text_changed`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `event NTextEditElement::on_text_changed`, 
            `event__NTextEditElement_on_text_changed`),
    ]),
    new IndexEntry("on_value_changed", [
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `event NEvent<void (int value)> NDropdownElement::on_value_changed`, 
            `event__NDropdownElement_on_value_changed`),
        new IndexReference(
            `/using/events/misc`, 
            `4.5.3 - Miscellaneous Events`, 
            `event NEvent<void (int value)> NRadioGroupElement::on_value_changed`, 
            `event__NRadioGroupElement_on_value_changed`),
    ]),
    new IndexEntry("open", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NMenuElement::open`, 
            `property__NMenuElement_open`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `property NMenuElement::open`, 
            `property__NMenuElement_open`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `property NDropdownElement::open`, 
            `property__NDropdownElement_open`),
    ]),
    new IndexEntry("operator-", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NPoint NPoint::operator-() const`, 
            `method__NPoint_operator_minus`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NPoint NPoint::operator-(const NPoint& other) const`, 
            `method__NPoint_operator_minus`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NRect NRect::operator-(const NPoint& point) const`, 
            `method__NRect_operator_minus`),
    ]),
    new IndexEntry("operator+", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NPoint NPoint::operator+(const NPoint& other) const`, 
            `method__NPoint_operator_plus`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NRect NRect::operator+(const NPoint& point) const`, 
            `method__NRect_operator_plus`),
    ]),
    new IndexEntry("operator==", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method bool NPoint::operator==(const NPoint& other) const`, 
            `method__NPoint_operator_assignassign`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method bool NRect::operator==(const NRect& other) const`, 
            `method__NRect_operator_assignassign`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method bool NSize::operator==(const NSize& other) const`, 
            `method__NSize_operator_assignassign`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method bool NTextSelection::operator==(const NTextSelection& other) const`, 
            `method__NTextSelection_operator_assignassign`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method bool NThickness::operator==(const NThickness& other) const`, 
            `method__NThickness_operator_assignassign`),
        new IndexReference(
            `/apis/classes/NColorPair`, 
            `5.7.6 - NColorPair`, 
            `method bool NColorPair::operator==(const NColorPair &other) const`, 
            `method__NColorPair_operator_assignassign`),
    ]),
    new IndexEntry("orientation", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NRadioGroupElement::orientation`, 
            `property__NRadioGroupElement_orientation`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `property NRadioGroupElement::orientation`, 
            `property__NRadioGroupElement_orientation`),
    ]),
    new IndexEntry("parent", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::parent`, 
            `property__NElement_parent`),
    ]),
    new IndexEntry("password", [
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `property NTextEditElement::password`, 
            `property__NTextEditElement_password`),
    ]),
    new IndexEntry("paste", [
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method void NTextEditElement::paste()`, 
            `method__NTextEditElement_paste`),
    ]),
    new IndexEntry("post", [
        new IndexReference(
            `/using/dispatcher`, 
            `4.7 - The NWindows Dispatcher`, 
            `method PostHandle NWindow::post(NWindows::clock_t::duration delay, std::function<void(void)>&& func)`, 
            `method__NWindow_post`),
        new IndexReference(
            `/using/dispatcher`, 
            `4.7 - The NWindows Dispatcher`, 
            `method PostHandle NWindow::post(NWindows::clock_t::time_point when, std::function<void(void)>&& func)`, 
            `method__NWindow_post`),
        new IndexReference(
            `/using/dispatcher`, 
            `4.7 - The NWindows Dispatcher`, 
            `method PostHandle NWindow::post(std::function<void(void)>&& func)`, 
            `method__NWindow_post`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method PostHandle NWindow::post(NWindow::clock_t::duration delay, std::function<void(void)>&& fn)`, 
            `method__NWindow_post`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method PostHandle NWindow::post(NWindow::clock_t::time_point when, std::function<void(void)>&& fn)`, 
            `method__NWindow_post`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method PostHandle NWindow::post(std::function<void(void)>&& fn)`, 
            `method__NWindow_post`),
    ]),
    new IndexEntry("PostHandle", [
        new IndexReference(
            `/apis/typedefs`, 
            `5.3 - Type Definitions`, 
            `using PostHandle`, 
            `using___PostHandle`),
    ]),
    new IndexEntry("prefix", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NButtonElement::prefix`, 
            `property__NButtonElement_prefix`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `property NMenuElement::prefix`, 
            `property__NMenuElement_prefix`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `property NButtonElement::prefix`, 
            `property__NButtonElement_prefix`),
    ]),
    new IndexEntry("pressed", [
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `property NButtonBaseElement::pressed`, 
            `property__NButtonBaseElement_pressed`),
    ]),
    new IndexEntry("print", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::print(const char* text)`, 
            `method__NElement_print`),
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::print(const std::string& text, int width)`, 
            `method__NElement_print`),
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::print(const std::string& text, NAlignment alignment, int width)`, 
            `method__NElement_print`),
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::print(const std::string& text)`, 
            `method__NElement_print`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::print(const char* text)`, 
            `method__NElement_print`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::print(const std::string& text, int max_display_width);`, 
            `method__NElement_print`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::print(const std::string& text, NAlignment alignment, int display_width);`, 
            `method__NElement_print`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::print(const std::string& text)`, 
            `method__NElement_print`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::print(const wchar_t* text)`, 
            `method__NElement_print`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void print(const std::u32string& text)`, 
            `method___print`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void print(const std::wstring& text)`, 
            `method___print`),
    ]),
    new IndexEntry("print_acs", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::print_acs(int x, int y, int acs_character)`, 
            `method__NElement_print_acs`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::print_acs(int x, int y, const std::string& alternate_character)`, 
            `method__NElement_print_acs`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::print_acs(int x, int y, int alternate_character)`, 
            `method__NElement_print_acs`),
    ]),
    new IndexEntry("print_menu_item", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::print_menu_item(const std::string& text, int max_display_width, bool show_underline = true)`, 
            `method__NElement_print_menu_item`),
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::print_menu_item(const std::string& text, NAlignment alignment, int display_width, bool show_underline = true)`, 
            `method__NElement_print_menu_item`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::print_menu_item(const std::string& text, int max_display_width, bool show_underline = true)`, 
            `method__NElement_print_menu_item`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::print_menu_item(const std::string& text, NAlignment alignment, int display_width, bool show_underline = true)`, 
            `method__NElement_print_menu_item`),
    ]),
    new IndexEntry("ptr", [
        new IndexReference(
            `/apis/classes/NBoxElement`, 
            `5.7.1 - NBoxElement`, 
            `using NBoxElement::ptr`, 
            `using__NBoxElement_ptr`),
        new IndexReference(
            `/apis/classes/NHorizontalStackElement`, 
            `5.7.11 - NHorizontalStackElement`, 
            `using NHorizontalStackElement::ptr`, 
            `using__NHorizontalStackElement_ptr`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `using NMenuElement::ptr`, 
            `using__NMenuElement_ptr`),
        new IndexReference(
            `/apis/classes/NMessageWindow`, 
            `5.7.13 - NMessageWindow`, 
            `using NMessageWindow::ptr`, 
            `using__NMessageWindow_ptr`),
        new IndexReference(
            `/apis/classes/NPopupWindow`, 
            `5.7.14 - NPopupWindow`, 
            `using NPopupWindow::ptr`, 
            `using__NPopupWindow_ptr`),
        new IndexReference(
            `/apis/classes/NPopupMenuWindow`, 
            `5.7.15 - NPopupMenuWindow`, 
            `using NPopupMenuWindow::ptr`, 
            `using__NPopupMenuWindow_ptr`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `using NRadioGroupElement::ptr`, 
            `using__NRadioGroupElement_ptr`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `using NTextElement::ptr`, 
            `using__NTextElement_ptr`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `using NTextEditElement::ptr`, 
            `using__NTextEditElement_ptr`),
        new IndexReference(
            `/apis/classes/NVerticalStackElement`, 
            `5.7.19 - NVerticalStackElement`, 
            `using NVerticalStackElement::ptr`, 
            `using__NVerticalStackElement_ptr`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `using NButtonElement::ptr`, 
            `using__NButtonElement_ptr`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `using NWindow::ptr`, 
            `using__NWindow_ptr`),
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `using NButtonBaseElement::ptr`, 
            `using__NButtonBaseElement_ptr`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `using NCheckboxElement::ptr`, 
            `using__NCheckboxElement_ptr`),
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `using NContainerElement::ptr`, 
            `using__NContainerElement_ptr`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `using NDropdownElement::ptr`, 
            `using__NDropdownElement_ptr`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `using NElement::ptr`, 
            `using__NElement_ptr`),
    ]),
    new IndexEntry("quit", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::quit()`, 
            `method__NWindow_quit`),
    ]),
    new IndexEntry("remove_all_children", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method void NContainerElement::remove_all_children()`, 
            `method__NContainerElement_remove_all_children`),
    ]),
    new IndexEntry("remove_child", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method void NContainerElement::remove_child(NElement::ptr child)`, 
            `method__NContainerElement_remove_child`),
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method void NContainerElement::remove_child(NElement* child)`, 
            `method__NContainerElement_remove_child`),
    ]),
    new IndexEntry("render", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void render()`, 
            `method___render`),
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method void NContainerElement::render()`, 
            `method__NContainerElement_render`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::render()`, 
            `method__NElement_render`),
    ]),
    new IndexEntry("render_outer", [
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `method virtual void NContainerElement::render_outer()`, 
            `method__NContainerElement_render_outer`),
    ]),
    new IndexEntry("replace_selection", [
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method void NTextEditElement::replace_selection(const std::string&text)`, 
            `method__NTextEditElement_replace_selection`),
    ]),
    new IndexEntry("request_initial_focus", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NElement::request_initial_focus`, 
            `property__NElement_request_initial_focus`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::request_initial_focus`, 
            `property__NElement_request_initial_focus`),
    ]),
    new IndexEntry("right", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method int NRect::right() const`, 
            `method__NRect_right`),
    ]),
    new IndexEntry("row_gap", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NRadioGroupElement::row_gap`, 
            `property__NRadioGroupElement_row_gap`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NVerticalStackElement::row_gap`, 
            `property__NVerticalStackElement_row_gap`),
        new IndexReference(
            `/apis/classes/NHorizontalStackElement`, 
            `5.7.11 - NHorizontalStackElement`, 
            `property NHorizontalStackElement::row_gap`, 
            `property__NHorizontalStackElement_row_gap`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `property NRadioGroupElement::row_gap`, 
            `property__NRadioGroupElement_row_gap`),
        new IndexReference(
            `/apis/classes/NVerticalStackElement`, 
            `5.7.19 - NVerticalStackElement`, 
            `property NVerticalStackElement::row_gap`, 
            `property__NVerticalStackElement_row_gap`),
    ]),
    new IndexEntry("run", [
        new IndexReference(
            `/using/windows`, 
            `4.4 - NWindows Windows`, 
            `method void NWindow::run()`, 
            `method__NWindow_run`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::run()`, 
            `method__NWindow_run`),
    ]),
    new IndexEntry("screen_to_element", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NPoint NElement::screen_to_element(const NPoint& point) const`, 
            `method__NElement_screen_to_element`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NRect screen_to_element(const NRect& rect) const`, 
            `method___screen_to_element`),
    ]),
    new IndexEntry("screen_to_window", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NPoint NElement::screen_to_window(const NPoint& point) const`, 
            `method__NElement_screen_to_window`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NRect screen_to_window(const NRect& rect) const`, 
            `method___screen_to_window`),
    ]),
    new IndexEntry("select_all", [
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method void NTextEditElement::select_all()`, 
            `method__NTextEditElement_select_all`),
    ]),
    new IndexEntry("select_color", [
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `property NButtonBaseElement::select_color`, 
            `property__NButtonBaseElement_select_color`),
    ]),
    new IndexEntry("select_end", [
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method void NTextEditElement::select_end()`, 
            `method__NTextEditElement_select_end`),
    ]),
    new IndexEntry("select_start", [
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `method void NTextEditElement::select_start()`, 
            `method__NTextEditElement_select_start`),
    ]),
    new IndexEntry("selected", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NDropdownElement::selected`, 
            `property__NDropdownElement_selected`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `property NDropdownElement::selected`, 
            `property__NDropdownElement_selected`),
    ]),
    new IndexEntry("selection", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NRadioGroupElement::selection`, 
            `property__NRadioGroupElement_selection`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NTextEditElement::selection`, 
            `property__NTextEditElement_selection`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `property NRadioGroupElement::selection`, 
            `property__NRadioGroupElement_selection`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `property NTextEditElement::selection`, 
            `property__NTextEditElement_selection`),
    ]),
    new IndexEntry("self", [
        new IndexReference(
            `/apis/classes/NBoxElement`, 
            `5.7.1 - NBoxElement`, 
            `using NBoxElement::self`, 
            `using__NBoxElement_self`),
        new IndexReference(
            `/apis/classes/NHorizontalStackElement`, 
            `5.7.11 - NHorizontalStackElement`, 
            `using NHorizontalStackElement::self`, 
            `using__NHorizontalStackElement_self`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `using NMenuElement::self`, 
            `using__NMenuElement_self`),
        new IndexReference(
            `/apis/classes/NMessageWindow`, 
            `5.7.13 - NMessageWindow`, 
            `using NMessageWindow::self`, 
            `using__NMessageWindow_self`),
        new IndexReference(
            `/apis/classes/NPopupWindow`, 
            `5.7.14 - NPopupWindow`, 
            `using NPopupWindow::self`, 
            `using__NPopupWindow_self`),
        new IndexReference(
            `/apis/classes/NPopupMenuWindow`, 
            `5.7.15 - NPopupMenuWindow`, 
            `using NPopupMenuWindow::self`, 
            `using__NPopupMenuWindow_self`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `using NRadioGroupElement::self`, 
            `using__NRadioGroupElement_self`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `using NTextElement::self`, 
            `using__NTextElement_self`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `using NTextEditElement::self`, 
            `using__NTextEditElement_self`),
        new IndexReference(
            `/apis/classes/NVerticalStackElement`, 
            `5.7.19 - NVerticalStackElement`, 
            `using NVerticalStackElement::self`, 
            `using__NVerticalStackElement_self`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `using NButtonElement::self`, 
            `using__NButtonElement_self`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `using NWindow::self`, 
            `using__NWindow_self`),
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `using NButtonBaseElement::self`, 
            `using__NButtonBaseElement_self`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `using NCheckboxElement::self`, 
            `using__NCheckboxElement_self`),
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `using NContainerElement::self`, 
            `using__NContainerElement_self`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `using NDropdownElement::self`, 
            `using__NDropdownElement_self`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `using NElement::self`, 
            `using__NElement_self`),
    ]),
    new IndexEntry("set_clipboard_text", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::set_clipboard_text(const std::string& text)`, 
            `method__NWindow_set_clipboard_text`),
    ]),
    new IndexEntry("set_locale", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `method void NWindow::set_locale(const std::string& locale)`, 
            `method__NWindow_set_locale`),
    ]),
    new IndexEntry("shared_from_this", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method std::shared_ptr<T> NElement::shared_from_this()`, 
            `method__NElement_shared_from_this`),
    ]),
    new IndexEntry("shift", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::shift`, 
            `field__MouseEventArgs_shift`),
    ]),
    new IndexEntry("simulate_keyboard_click", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method virtual bool NElement::simulate_keyboard_click(NElement* source, int button = 0)`, 
            `method__NElement_simulate_keyboard_click`),
    ]),
    new IndexEntry("size", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NElement::size`, 
            `property__NElement_size`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::size`, 
            `property__NElement_size`),
    ]),
    new IndexEntry("source", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::source`, 
            `field__MouseEventArgs_source`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field NEventArgsBase::source`, 
            `field__NEventArgsBase_source`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field NKeyEventArgs::source`, 
            `field__NKeyEventArgs_source`),
    ]),
    new IndexEntry("subscribe", [
        new IndexReference(
            `/apis/classes/NEvent`, 
            `5.7.10 - NEvent<T>`, 
            `method NEvent::subscribe`, 
            `method__NEvent_subscribe`),
    ]),
    new IndexEntry("subscriber_count", [
        new IndexReference(
            `/apis/classes/NEvent`, 
            `5.7.10 - NEvent<T>`, 
            `method NEvent::subscriber_count`, 
            `method__NEvent_subscriber_count`),
    ]),
    new IndexEntry("suffix", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NButtonElement::suffix`, 
            `property__NButtonElement_suffix`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `property NMenuElement::suffix`, 
            `property__NMenuElement_suffix`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `property NButtonElement::suffix`, 
            `property__NButtonElement_suffix`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `property NDropdownElement::suffix`, 
            `property__NDropdownElement_suffix`),
    ]),
    new IndexEntry("super", [
        new IndexReference(
            `/apis/classes/NBoxElement`, 
            `5.7.1 - NBoxElement`, 
            `using NBoxElement::super`, 
            `using__NBoxElement_super`),
        new IndexReference(
            `/apis/classes/NHorizontalStackElement`, 
            `5.7.11 - NHorizontalStackElement`, 
            `using NHorizontalStackElement::super`, 
            `using__NHorizontalStackElement_super`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `using NMenuElement::super`, 
            `using__NMenuElement_super`),
        new IndexReference(
            `/apis/classes/NMessageWindow`, 
            `5.7.13 - NMessageWindow`, 
            `using NMessageWindow::super`, 
            `using__NMessageWindow_super`),
        new IndexReference(
            `/apis/classes/NPopupWindow`, 
            `5.7.14 - NPopupWindow`, 
            `using NPopupWindow::super`, 
            `using__NPopupWindow_super`),
        new IndexReference(
            `/apis/classes/NPopupMenuWindow`, 
            `5.7.15 - NPopupMenuWindow`, 
            `using NPopupMenuWindow::super`, 
            `using__NPopupMenuWindow_super`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `using NRadioGroupElement::super`, 
            `using__NRadioGroupElement_super`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `using NTextElement::super`, 
            `using__NTextElement_super`),
        new IndexReference(
            `/apis/classes/NTextEditElement`, 
            `5.7.18 - NTextEditElement`, 
            `using NTextEditElement::super`, 
            `using__NTextEditElement_super`),
        new IndexReference(
            `/apis/classes/NVerticalStackElement`, 
            `5.7.19 - NVerticalStackElement`, 
            `using NVerticalStackElement::super`, 
            `using__NVerticalStackElement_super`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `using NButtonElement::super`, 
            `using__NButtonElement_super`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `using NWindow::super`, 
            `using__NWindow_super`),
        new IndexReference(
            `/apis/classes/NButtonBaseElement`, 
            `5.7.3 - NButtonBaseElement`, 
            `using NButtonBaseElement::super`, 
            `using__NButtonBaseElement_super`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `using NCheckboxElement::super`, 
            `using__NCheckboxElement_super`),
        new IndexReference(
            `/apis/classes/NContainerElement`, 
            `5.7.7 - NContainerElement`, 
            `using NContainerElement::super`, 
            `using__NContainerElement_super`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `using NDropdownElement::super`, 
            `using__NDropdownElement_super`),
    ]),
    new IndexEntry("take_focus", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method bool NElement::take_focus()`, 
            `method__NElement_take_focus`),
    ]),
    new IndexEntry("target", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::target`, 
            `field__MouseEventArgs_target`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field NElement::target`, 
            `field__NElement_target`),
    ]),
    new IndexEntry("text", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NTextEditElement::text`, 
            `property__NTextEditElement_text`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NTextElement::text`, 
            `property__NTextElement_text`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `property NTextElement::text`, 
            `property__NTextElement_text`),
    ]),
    new IndexEntry("text_attribute", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NTextElement::text_attribute`, 
            `property__NTextElement_text_attribute`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `property NTextElement::text_attribute`, 
            `property__NTextElement_text_attribute`),
    ]),
    new IndexEntry("title", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NBoxElement::title`, 
            `property__NBoxElement_title`),
        new IndexReference(
            `/apis/classes/NBoxElement`, 
            `5.7.1 - NBoxElement`, 
            `property NBoxElement::title`, 
            `property__NBoxElement_title`),
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::title`, 
            `property__NWindow_title`),
    ]),
    new IndexEntry("top", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method int NRect::top() const`, 
            `method__NRect_top`),
    ]),
    new IndexEntry("top_left", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NPoint NRect::top_left() const`, 
            `method__NRect_top_left`),
    ]),
    new IndexEntry("top_level_window", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::top_level_window`, 
            `property__NWindow_top_level_window`),
    ]),
    new IndexEntry("top_right", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `method NPoint NRect::top_right() const`, 
            `method__NRect_top_right`),
    ]),
    new IndexEntry("unchecked_text", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NCheckboxElement::unchecked_text`, 
            `property__NCheckboxElement_unchecked_text`),
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NRadioGroupElement::unchecked_text`, 
            `property__NRadioGroupElement_unchecked_text`),
        new IndexReference(
            `/apis/classes/NRadioGroupElement`, 
            `5.7.16 - NRadioGroupElement`, 
            `property NRadioGroupElement::unchecked_text`, 
            `property__NRadioGroupElement_unchecked_text`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `property NCheckboxElement::unchecked_text`, 
            `property__NCheckboxElement_unchecked_text`),
    ]),
    new IndexEntry("UNCOMPOSABLE", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `constexpr static constexpr char32_t NWindow::UNCOMPOSABLE`, 
            `constexpr__NWindow_UNCOMPOSABLE`),
    ]),
    new IndexEntry("unsubscribe", [
        new IndexReference(
            `/apis/classes/NEvent`, 
            `5.7.10 - NEvent<T>`, 
            `method NEvent::unsubscribe`, 
            `method__NEvent_unsubscribe`),
    ]),
    new IndexEntry("user_data", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::user_data`, 
            `property__NElement_user_data`),
    ]),
    new IndexEntry("vertical_line", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method void NElement::vertical_line(int x, int y, int height)`, 
            `method__NElement_vertical_line`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method void NElement::vertical_line(int x, int y, int height)`, 
            `method__NElement_vertical_line`),
    ]),
    new IndexEntry("wants_shortcut_key", [
        new IndexReference(
            `/using/custom/full`, 
            `4.6.4 - Fully-Custom Elements`, 
            `method virtual bool NElement::wants_shortcut_key(const std::string& key)`, 
            `method__NElement_wants_shortcut_key`),
        new IndexReference(
            `/apis/classes/NMenuElement`, 
            `5.7.12 - NMenuElement`, 
            `method virtual bool NMenuItem::wants_shortcut_key(const std::string& key) override`, 
            `method__NMenuItem_wants_shortcut_key`),
        new IndexReference(
            `/apis/classes/NButtonElement`, 
            `5.7.2 - NButtonElement`, 
            `method virtual bool NButtonElement::wants_shortcut_key(const std::string& key) override`, 
            `method__NButtonElement_wants_shortcut_key`),
        new IndexReference(
            `/apis/classes/NCheckboxElement`, 
            `5.7.4 - NCheckboxElement`, 
            `method virtual bool NCheckboxElement::wants_shortcut_key(const std::string& key) override`, 
            `method__NCheckboxElement_wants_shortcut_key`),
        new IndexReference(
            `/apis/classes/NDropdownElement`, 
            `5.7.8 - NDropdownElement`, 
            `method virtual bool NDropdownElement::wants_shortcut_key(const std::string& key) override`, 
            `method__NDropdownElement_wants_shortcut_key`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method virtual bool NElement::wants_shortcut_key(const std::string& key)`, 
            `method__NElement_wants_shortcut_key`),
    ]),
    new IndexEntry("weak_ptr_from_this", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method std::weak_ptr<T> NElement::weak_ptr_from_this()`, 
            `method__NElement_weak_ptr_from_this`),
    ]),
    new IndexEntry("White", [
        new IndexReference(
            `/apis/classes/NColor`, 
            `5.7.5 - NColor`, 
            `method static NColor NColor::White`, 
            `method__NColor_White`),
    ]),
    new IndexEntry("width", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NElement::width`, 
            `property__NElement_width`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::width`, 
            `property__NElement_width`),
    ]),
    new IndexEntry("window", [
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field MouseEventArgs::window`, 
            `field__MouseEventArgs_window`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field NEventArgsBase::window`, 
            `field__NEventArgsBase_window`),
        new IndexReference(
            `/apis/structs`, 
            `5.5 - Structs`, 
            `field NKeyEventArgs::window`, 
            `field__NKeyEventArgs_window`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `property NElement::window`, 
            `property__NElement_window`),
    ]),
    new IndexEntry("window_position", [
        new IndexReference(
            `/apis/classes/NWindow`, 
            `5.7.20 - NWindow`, 
            `property NWindow::window_position`, 
            `property__NWindow_window_position`),
    ]),
    new IndexEntry("window_to_element", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NPoint NElement::window_to_element(const NPoint& point) const`, 
            `method__NElement_window_to_element`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NRect window_to_element(const NRect& rect) const`, 
            `method___window_to_element`),
    ]),
    new IndexEntry("window_to_screen", [
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NPoint NElement::window_to_screen(const NPoint& point) const`, 
            `method__NElement_window_to_screen`),
        new IndexReference(
            `/apis/classes/NElement`, 
            `5.7.9 - NElement`, 
            `method NRect window_to_screen(const NRect& rect) const`, 
            `method___window_to_screen`),
    ]),
    new IndexEntry("wrap_text", [
        new IndexReference(
            `/using/elements`, 
            `4.3 - NWindows Elements`, 
            `property NTextElement::wrap_text`, 
            `property__NTextElement_wrap_text`),
        new IndexReference(
            `/apis/classes/NTextElement`, 
            `5.7.17 - NTextElement`, 
            `property NTextElement::wrap_text`, 
            `property__NTextElement_wrap_text`),
    ]),
]);

const SiteIndexData = () => { return indexData; }
export default  SiteIndexData;

let keywordIndexMap = new Map<string,IndexLink>([
    ["NTextSelection::abs_length", {route: "/apis/structs", id: "method__NTextSelection_abs_length", classRef: false}],
    ["NWindow::active_window", {route: "/apis/classes/NWindow", id: "property__NWindow_active_window", classRef: false}],
    ["NElement::actual_height", {route: "/apis/classes/NElement", id: "property__NElement_actual_height", classRef: false}],
    ["NElement::actual_size", {route: "/apis/classes/NElement", id: "property__NElement_actual_size", classRef: false}],
    ["NElement::actual_width", {route: "/apis/classes/NElement", id: "property__NElement_actual_width", classRef: false}],
    ["NWindow::actual_window_position", {route: "/apis/classes/NWindow", id: "property__NWindow_actual_window_position", classRef: false}],
    ["NBoxElement::add_child", {route: "/apis/classes/NBoxElement", id: "method__NBoxElement_add_child", classRef: false}],
    ["NHorizontalStackElement::add_child", {route: "/apis/classes/NHorizontalStackElement", id: "method__NHorizontalStackElement_add_child", classRef: false}],
    ["NVerticalStackElement::add_child", {route: "/apis/classes/NVerticalStackElement", id: "method__NVerticalStackElement_add_child", classRef: false}],
    ["NContainerElement::add_child", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_add_child", classRef: false}],
    ["NContainerElement::__Tadd_children_T", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement___Tadd_children_T", classRef: false}],
    ["NWindow::add_to_parent_window", {route: "/apis/classes/NWindow", id: "method__NWindow_add_to_parent_window", classRef: false}],
    ["NHorizontalStackElement::alignment", {route: "/apis/classes/NHorizontalStackElement", id: "property__NHorizontalStackElement_alignment", classRef: false}],
    ["NTextElement::alignment", {route: "/apis/classes/NTextElement", id: "property__NTextElement_alignment", classRef: false}],
    ["NVerticalStackElement::alignment", {route: "/apis/classes/NVerticalStackElement", id: "property__NVerticalStackElement_alignment", classRef: false}],
    ["MouseEventArgs::alt", {route: "/apis/structs", id: "field__MouseEventArgs_alt", classRef: false}],
    ["NContainerElement::arrange", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_arrange", classRef: false}],
    ["NElement::arrange", {route: "/apis/classes/NElement", id: "method__NElement_arrange", classRef: false}],
    ["NElement::attribute_off", {route: "/apis/classes/NElement", id: "method__NElement_attribute_off", classRef: false}],
    ["NElement::attribute_on", {route: "/apis/classes/NElement", id: "method__NElement_attribute_on", classRef: false}],
    ["NColor::Black", {route: "/apis/classes/NColor", id: "method__NColor_Black", classRef: false}],
    ["NRect::bottom", {route: "/apis/structs", id: "method__NRect_bottom", classRef: false}],
    ["NRect::bottom_left", {route: "/apis/structs", id: "method__NRect_bottom_left", classRef: false}],
    ["NRect::bottom_right", {route: "/apis/structs", id: "method__NRect_bottom_right", classRef: false}],
    ["NRect::bounds", {route: "/apis/structs", id: "method__NRect_bounds", classRef: false}],
    ["NElement::bounds", {route: "/apis/classes/NElement", id: "property__NElement_bounds", classRef: false}],
    ["NElement::box", {route: "/apis/classes/NElement", id: "method__NElement_box", classRef: false}],
    ["NWindow::bubble_event", {route: "/apis/classes/NWindow", id: "method__NWindow_bubble_event", classRef: false}],
    ["NWindow::bubble_mouse_event", {route: "/apis/classes/NWindow", id: "method__NWindow_bubble_mouse_event", classRef: false}],
    ["MouseEventArgs::button0_pressed", {route: "/apis/structs", id: "field__MouseEventArgs_button0_pressed", classRef: false}],
    ["MouseEventArgs::button1_pressed", {route: "/apis/structs", id: "field__MouseEventArgs_button1_pressed", classRef: false}],
    ["MouseEventArgs::button2_pressed", {route: "/apis/structs", id: "field__MouseEventArgs_button2_pressed", classRef: false}],
    ["MouseEventArgs::button3_pressed", {route: "/apis/structs", id: "field__MouseEventArgs_button3_pressed", classRef: false}],
    ["NWindows::cancel_post", {route: "/apis/classes/NWindow", id: "method__NWindows_cancel_post", classRef: false}],
    ["NTextEditElement::character_filter", {route: "/apis/classes/NTextEditElement", id: "method__NTextEditElement_character_filter", classRef: false}],
    ["NCheckboxElement::checked", {route: "/apis/classes/NCheckboxElement", id: "property__NCheckboxElement_checked", classRef: false}],
    ["NRadioGroupElement::checked_text", {route: "/apis/classes/NRadioGroupElement", id: "property__NRadioGroupElement_checked_text", classRef: false}],
    ["NCheckboxElement::checked_text", {route: "/apis/classes/NCheckboxElement", id: "property__NCheckboxElement_checked_text", classRef: false}],
    ["NContainerElement::children", {route: "/apis/classes/NContainerElement", id: "property__NContainerElement_children", classRef: false}],
    ["NEvent::clear", {route: "/apis/classes/NEvent", id: "method__NEvent_clear", classRef: false}],
    ["NElement::clickable", {route: "/apis/classes/NElement", id: "property__NElement_clickable", classRef: false}],
    ["NWindow::clock_t", {route: "/apis/classes/NWindow", id: "using__NWindow_clock_t", classRef: false}],
    ["NWindow::close", {route: "/apis/classes/NWindow", id: "method__NWindow_close", classRef: false}],
    ["NWindow::collator", {route: "/apis/classes/NWindow", id: "property__NWindow_collator", classRef: false}],
    ["NBoxElement::color", {route: "/apis/classes/NBoxElement", id: "property__NBoxElement_color", classRef: false}],
    ["NTextElement::color", {route: "/apis/classes/NTextElement", id: "property__NTextElement_color", classRef: false}],
    ["NElement::color_off", {route: "/apis/classes/NElement", id: "method__NElement_color_off", classRef: false}],
    ["NElement::color_on", {route: "/apis/classes/NElement", id: "method__NElement_color_on", classRef: false}],
    ["NWindow::color_palette", {route: "/apis/classes/NWindow", id: "property__NWindow_color_palette", classRef: false}],
    ["NRadioGroupElement::column_gap", {route: "/apis/classes/NRadioGroupElement", id: "property__NRadioGroupElement_column_gap", classRef: false}],
    ["NWindow::compose_characters", {route: "/apis/classes/NWindow", id: "method__NWindow_compose_characters", classRef: false}],
    ["NRect::contains", {route: "/apis/structs", id: "method__NRect_contains", classRef: false}],
    ["NTextEditElement::copy", {route: "/apis/classes/NTextEditElement", id: "method__NTextEditElement_copy", classRef: false}],
    ["NBoxElement::create", {route: "/apis/classes/NBoxElement", id: "method__NBoxElement_create", classRef: false}],
    ["NHorizontalStackElement::create", {route: "/apis/classes/NHorizontalStackElement", id: "method__NHorizontalStackElement_create", classRef: false}],
    ["NMenuElement::create", {route: "/apis/classes/NMenuElement", id: "method__NMenuElement_create", classRef: false}],
    ["NMessageWindow::create", {route: "/apis/classes/NMessageWindow", id: "method__NMessageWindow_create", classRef: false}],
    ["NRadioGroupElement::create", {route: "/apis/classes/NRadioGroupElement", id: "method__NRadioGroupElement_create", classRef: false}],
    ["NTextElement::create", {route: "/apis/classes/NTextElement", id: "method__NTextElement_create", classRef: false}],
    ["NTextEditElement::create", {route: "/apis/classes/NTextEditElement", id: "method__NTextEditElement_create", classRef: false}],
    ["NVerticalStackElement::create", {route: "/apis/classes/NVerticalStackElement", id: "method__NVerticalStackElement_create", classRef: false}],
    ["NWindow::create", {route: "/apis/classes/NWindow", id: "method__NWindow_create", classRef: false}],
    ["NCheckboxElement::create", {route: "/apis/classes/NCheckboxElement", id: "method__NCheckboxElement_create", classRef: false}],
    ["NDropdownElement::create", {route: "/apis/classes/NDropdownElement", id: "method__NDropdownElement_create", classRef: false}],
    ["MouseEventArgs::ctrl", {route: "/apis/structs", id: "field__MouseEventArgs_ctrl", classRef: false}],
    ["MouseEventArgs::cursor_position", {route: "/apis/structs", id: "field__MouseEventArgs_cursor_position", classRef: false}],
    ["NTextEditElement::cursor_position", {route: "/apis/classes/NTextEditElement", id: "property__NTextEditElement_cursor_position", classRef: false}],
    ["NTextEditElement::cut", {route: "/apis/classes/NTextEditElement", id: "method__NTextEditElement_cut", classRef: false}],
    ["NWindow::decompose_utf8", {route: "/apis/classes/NWindow", id: "method__NWindow_decompose_utf8", classRef: false}],
    ["NTextEditElement::decomposed_text", {route: "/apis/classes/NTextEditElement", id: "property__NTextEditElement_decomposed_text", classRef: false}],
    ["NTextSelection::delete_character_at", {route: "/apis/structs", id: "method__NTextSelection_delete_character_at", classRef: false}],
    ["NTextEditElement::delete_selection", {route: "/apis/classes/NTextEditElement", id: "method__NTextEditElement_delete_selection", classRef: false}],
    ["NRadioGroupElement::disabled", {route: "/apis/classes/NRadioGroupElement", id: "property__NRadioGroupElement_disabled", classRef: false}],
    ["NButtonElement::disabled", {route: "/apis/classes/NButtonElement", id: "property__NButtonElement_disabled", classRef: false}],
    ["NCheckboxElement::disabled", {route: "/apis/classes/NCheckboxElement", id: "property__NCheckboxElement_disabled", classRef: false}],
    ["NElement::disabled", {route: "/apis/classes/NElement", id: "property__NElement_disabled", classRef: false}],
    ["NButtonBaseElement::disabled_color", {route: "/apis/classes/NButtonBaseElement", id: "property__NButtonBaseElement_disabled_color", classRef: false}],
    ["NMenuItem::display_checkmark", {route: "/apis/structs", id: "method__NMenuItem_display_checkmark", classRef: false}],
    ["NMenuItem::Divider", {route: "/apis/structs", id: "method__NMenuItem_Divider", classRef: false}],
    ["NDropdownElement::dropdown_attachment", {route: "/apis/classes/NDropdownElement", id: "property__NDropdownElement_dropdown_attachment", classRef: false}],
    ["NElement::element_to_screen", {route: "/apis/classes/NElement", id: "method__NElement_element_to_screen", classRef: false}],
    ["NElement::element_to_window", {route: "/apis/classes/NElement", id: "method__NElement_element_to_window", classRef: false}],
    ["NTextSelection::end", {route: "/apis/structs", id: "method__NTextSelection_end", classRef: false}],
    ["NEvent::EventHandler", {route: "/apis/classes/NEvent", id: "using__NEvent_EventHandler", classRef: false}],
    ["NWindow::fatal_error", {route: "/apis/classes/NWindow", id: "method__NWindow_fatal_error", classRef: false}],
    ["NContainerElement::find_child_element", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_find_child_element", classRef: false}],
    ["NEvent::fire", {route: "/apis/classes/NEvent", id: "method__NEvent_fire", classRef: false}],
    ["NWindow::focus", {route: "/apis/classes/NWindow", id: "property__NWindow_focus", classRef: false}],
    ["NButtonBaseElement::focus_color", {route: "/apis/classes/NButtonBaseElement", id: "property__NButtonBaseElement_focus_color", classRef: false}],
    ["NElement::focusable", {route: "/apis/classes/NElement", id: "property__NElement_focusable", classRef: false}],
    ["NContainerElement::for_each_element", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_for_each_element", classRef: false}],
    ["NElement::for_each_element", {route: "/apis/classes/NElement", id: "method__NElement_for_each_element", classRef: false}],
    ["NWindow::get_clipboard_text", {route: "/apis/classes/NWindow", id: "method__NWindow_get_clipboard_text", classRef: false}],
    ["NButtonBaseElement::get_color", {route: "/apis/classes/NButtonBaseElement", id: "method__NButtonBaseElement_get_color", classRef: false}],
    ["NContainerElement::get_element_at", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_get_element_at", classRef: false}],
    ["NElement::get_element_at", {route: "/apis/classes/NElement", id: "method__NElement_get_element_at", classRef: false}],
    ["NElement::__Tget_element_by_id_T", {route: "/apis/classes/NElement", id: "method__NElement___Tget_element_by_id_T", classRef: false}],
    ["NEventArgsBase::handled", {route: "/apis/structs", id: "field__NEventArgsBase_handled", classRef: false}],
    ["NKeyEventArgs::handled", {route: "/apis/structs", id: "field__NKeyEventArgs_handled", classRef: false}],
    ["NWindow::has_colors", {route: "/apis/classes/NWindow", id: "property__NWindow_has_colors", classRef: false}],
    ["NElement::height", {route: "/apis/classes/NElement", id: "property__NElement_height", classRef: false}],
    ["NElement::horizontal_line", {route: "/apis/classes/NElement", id: "method__NElement_horizontal_line", classRef: false}],
    ["NButtonBaseElement::hover_color", {route: "/apis/classes/NButtonBaseElement", id: "property__NButtonBaseElement_hover_color", classRef: false}],
    ["NRect::inflate", {route: "/apis/structs", id: "method__NRect_inflate", classRef: false}],
    ["NWindow::init_root_window", {route: "/apis/classes/NWindow", id: "method__NWindow_init_root_window", classRef: false}],
    ["NRect::inset", {route: "/apis/structs", id: "method__NRect_inset", classRef: false}],
    ["NRect::intersect", {route: "/apis/structs", id: "method__NRect_intersect", classRef: false}],
    ["NElement::invalidate_layout", {route: "/apis/classes/NElement", id: "method__NElement_invalidate_layout", classRef: false}],
    ["NContainerElement::invalidate_render", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_invalidate_render", classRef: false}],
    ["NElement::invalidate_render", {route: "/apis/classes/NElement", id: "method__NElement_invalidate_render", classRef: false}],
    ["NWindow::is_active_window", {route: "/apis/classes/NWindow", id: "property__NWindow_is_active_window", classRef: false}],
    ["NElement::is_cancel", {route: "/apis/classes/NElement", id: "property__NElement_is_cancel", classRef: false}],
    ["NContainerElement::is_container", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_is_container", classRef: false}],
    ["NElement::is_container", {route: "/apis/classes/NElement", id: "property__NElement_is_container", classRef: false}],
    ["NElement::is_default", {route: "/apis/classes/NElement", id: "property__NElement_is_default", classRef: false}],
    ["NMenuItem::is_divider", {route: "/apis/structs", id: "method__NMenuItem_is_divider", classRef: false}],
    ["NTextSelection::is_empty", {route: "/apis/structs", id: "method__NTextSelection_is_empty", classRef: false}],
    ["NElement::is_focused", {route: "/apis/classes/NElement", id: "property__NElement_is_focused", classRef: false}],
    ["NElement::is_menu_item_shortcut_key", {route: "/apis/classes/NElement", id: "method__NElement_is_menu_item_shortcut_key", classRef: false}],
    ["NKeyEventArgs::key", {route: "/apis/structs", id: "field__NKeyEventArgs_key", classRef: false}],
    ["NElement::keyboard_clicking", {route: "/apis/classes/NElement", id: "method__NElement_keyboard_clicking", classRef: false}],
    ["NMenuElement::label", {route: "/apis/classes/NMenuElement", id: "property__NMenuElement_label", classRef: false}],
    ["NButtonElement::label", {route: "/apis/classes/NButtonElement", id: "property__NButtonElement_label", classRef: false}],
    ["NCheckboxElement::label", {route: "/apis/classes/NCheckboxElement", id: "property__NCheckboxElement_label", classRef: false}],
    ["NButtonElement::label_alignment", {route: "/apis/classes/NButtonElement", id: "property__NButtonElement_label_alignment", classRef: false}],
    ["NRect::left", {route: "/apis/structs", id: "method__NRect_left", classRef: false}],
    ["NWindow::make_color", {route: "/apis/classes/NWindow", id: "method__NWindow_make_color", classRef: false}],
    ["NWindow::make_color_pair", {route: "/apis/classes/NWindow", id: "method__NWindow_make_color_pair", classRef: false}],
    ["NElement::margin", {route: "/apis/classes/NElement", id: "property__NElement_margin", classRef: false}],
    ["NTextSelection::max", {route: "/apis/structs", id: "method__NTextSelection_max", classRef: false}],
    ["NWindow::max_color_pairs", {route: "/apis/classes/NWindow", id: "property__NWindow_max_color_pairs", classRef: false}],
    ["NWindow::max_colors", {route: "/apis/classes/NWindow", id: "property__NWindow_max_colors", classRef: false}],
    ["NContainerElement::measure", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_measure", classRef: false}],
    ["NElement::measure", {route: "/apis/classes/NElement", id: "method__NElement_measure", classRef: false}],
    ["NContainerElement::measure_child_with_margins", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_measure_child_with_margins", classRef: false}],
    ["NElement::measure_menu_text", {route: "/apis/classes/NElement", id: "method__NElement_measure_menu_text", classRef: false}],
    ["NElement::measure_text", {route: "/apis/classes/NElement", id: "method__NElement_measure_text", classRef: false}],
    ["NElement::measured", {route: "/apis/classes/NElement", id: "property__NElement_measured", classRef: false}],
    ["NMenuElement::menu_attachment", {route: "/apis/classes/NMenuElement", id: "property__NMenuElement_menu_attachment", classRef: false}],
    ["NMenuElement::menu_items", {route: "/apis/classes/NMenuElement", id: "property__NMenuElement_menu_items", classRef: false}],
    ["NDropdownElement::menu_items", {route: "/apis/classes/NDropdownElement", id: "property__NDropdownElement_menu_items", classRef: false}],
    ["NTextSelection::min", {route: "/apis/structs", id: "method__NTextSelection_min", classRef: false}],
    ["NWindow::mouse_capture", {route: "/apis/classes/NWindow", id: "method__NWindow_mouse_capture", classRef: false}],
    ["NWindow::mouse_capture_release", {route: "/apis/classes/NWindow", id: "method__NWindow_mouse_capture_release", classRef: false}],
    ["NElement::mouse_entered", {route: "/apis/classes/NElement", id: "property__NElement_mouse_entered", classRef: false}],
    ["NElement::move", {route: "/apis/classes/NElement", id: "method__NElement_move", classRef: false}],
    ["NWindow::move_window", {route: "/apis/classes/NWindow", id: "method__NWindow_move_window", classRef: false}],
    ["NAlignment", {route: "/apis/enums", id: "enum__NAlignment", classRef: false}],
    ["NAttachment", {route: "/apis/enums", id: "enum__NAttachment", classRef: false}],
    ["NAttribute", {route: "/apis/classes/NElement", id: "enum__NAttribute", classRef: false}],
    ["NWindow::navigate_focus", {route: "/apis/classes/NWindow", id: "method__NWindow_navigate_focus", classRef: false}],
    ["NBoxElement", {route: "/apis/classes/NBoxElement", id: "class__NBoxElement", classRef: true}],
    ["NButtonBaseElement", {route: "/apis/classes/NButtonBaseElement", id: "class__NButtonBaseElement", classRef: true}],
    ["NButtonBaseElement::NButtonBaseElement", {route: "/apis/classes/NButtonBaseElement", id: "method__NButtonBaseElement_NButtonBaseElement", classRef: false}],
    ["NButtonElement", {route: "/apis/classes/NButtonElement", id: "class__NButtonElement", classRef: true}],
    ["NButtonElement::NButtonElement", {route: "/apis/classes/NButtonElement", id: "method__NButtonElement_NButtonElement", classRef: false}],
    ["NCheckboxElement", {route: "/apis/classes/NCheckboxElement", id: "class__NCheckboxElement", classRef: true}],
    ["NCheckboxElement::NCheckboxElement", {route: "/apis/classes/NCheckboxElement", id: "method__NCheckboxElement_NCheckboxElement", classRef: false}],
    ["NClickedEventArgs::NClickedEventArgs", {route: "/apis/structs", id: "method__NClickedEventArgs_NClickedEventArgs", classRef: false}],
    ["NClickedEventArgs", {route: "/apis/structs", id: "struct__NClickedEventArgs", classRef: false}],
    ["NColor", {route: "/apis/classes/NColor", id: "class__NColor", classRef: true}],
    ["NColor::NColor", {route: "/apis/classes/NColor", id: "method__NColor_NColor", classRef: false}],
    ["NColorPair", {route: "/apis/classes/NColorPair", id: "class__NColorPair", classRef: true}],
    ["NColorPalette", {route: "/apis/structs", id: "struct__NColorPalette", classRef: false}],
    ["NContainerElement", {route: "/apis/classes/NContainerElement", id: "class__NContainerElement", classRef: true}],
    ["NContainerElement::NContainerElement", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_NContainerElement", classRef: false}],
    ["NDropdownElement", {route: "/apis/classes/NDropdownElement", id: "class__NDropdownElement", classRef: true}],
    ["NDropdownElement::NDropdownElement", {route: "/apis/classes/NDropdownElement", id: "method__NDropdownElement_NDropdownElement", classRef: false}],
    ["NElement", {route: "/apis/classes/NElement", id: "class__NElement", classRef: true}],
    ["NElement::NElement", {route: "/apis/classes/NElement", id: "method__NElement_NElement", classRef: false}],
    ["NEvent", {route: "/apis/classes/NEvent", id: "class__NEvent", classRef: true}],
    ["NEvent::NEvent", {route: "/apis/classes/NEvent", id: "method__NEvent_NEvent", classRef: false}],
    ["NEventArgsBase::NEventArgsBase", {route: "/apis/structs", id: "method__NEventArgsBase_NEventArgsBase", classRef: false}],
    ["NEventArgsBase", {route: "/apis/structs", id: "struct__NEventArgsBase", classRef: false}],
    ["NHorizontalStackElement", {route: "/apis/classes/NHorizontalStackElement", id: "class__NHorizontalStackElement", classRef: true}],
    ["NHorizontalStackElement::NHorizontalStackElement", {route: "/apis/classes/NHorizontalStackElement", id: "method__NHorizontalStackElement_NHorizontalStackElement", classRef: false}],
    ["NKeyEventArgs::NKeyEventArgs", {route: "/apis/structs", id: "method__NKeyEventArgs_NKeyEventArgs", classRef: false}],
    ["NKeyEventArgs", {route: "/apis/structs", id: "struct__NKeyEventArgs", classRef: false}],
    ["NMenuElement", {route: "/apis/classes/NMenuElement", id: "class__NMenuElement", classRef: true}],
    ["NMenuElement::NMenuElement", {route: "/apis/classes/NMenuElement", id: "method__NMenuElement_NMenuElement", classRef: false}],
    ["NMenuItem::NMenuItem", {route: "/apis/structs", id: "method__NMenuItem_NMenuItem", classRef: false}],
    ["NMenuItem", {route: "/apis/structs", id: "struct__NMenuItem", classRef: false}],
    ["NMessageType", {route: "/apis/enums", id: "enum__NMessageType", classRef: false}],
    ["NMessageWindow", {route: "/apis/classes/NMessageWindow", id: "class__NMessageWindow", classRef: true}],
    ["NMouseEventArgs::NMouseEventArgs", {route: "/apis/structs", id: "method__NMouseEventArgs_NMouseEventArgs", classRef: false}],
    ["NMouseEventArgs", {route: "/apis/structs", id: "struct__NMouseEventArgs", classRef: false}],
    ["NNavDirection", {route: "/apis/enums", id: "enum__NNavDirection", classRef: false}],
    ["NOrientation", {route: "/apis/enums", id: "enum__NOrientation", classRef: false}],
    ["NButtonBaseElement::normal_color", {route: "/apis/classes/NButtonBaseElement", id: "property__NButtonBaseElement_normal_color", classRef: false}],
    ["NWindow::normalize_utf8", {route: "/apis/classes/NWindow", id: "method__NWindow_normalize_utf8", classRef: false}],
    ["NTextEditElement::normalized_text", {route: "/apis/classes/NTextEditElement", id: "property__NTextEditElement_normalized_text", classRef: false}],
    ["NPoint::NPoint", {route: "/apis/structs", id: "method__NPoint_NPoint", classRef: false}],
    ["NPoint", {route: "/apis/structs", id: "struct__NPoint", classRef: false}],
    ["NPopupMenuWindow", {route: "/apis/classes/NPopupMenuWindow", id: "class__NPopupMenuWindow", classRef: true}],
    ["NPopupWindow", {route: "/apis/classes/NPopupWindow", id: "class__NPopupWindow", classRef: true}],
    ["NRadioGroupElement", {route: "/apis/classes/NRadioGroupElement", id: "class__NRadioGroupElement", classRef: true}],
    ["NRect::NRect", {route: "/apis/structs", id: "method__NRect_NRect", classRef: false}],
    ["NRect", {route: "/apis/structs", id: "struct__NRect", classRef: false}],
    ["NSize::NSize", {route: "/apis/structs", id: "method__NSize_NSize", classRef: false}],
    ["NSize", {route: "/apis/structs", id: "struct__NSize", classRef: false}],
    ["NTextEditElement", {route: "/apis/classes/NTextEditElement", id: "class__NTextEditElement", classRef: true}],
    ["NTextElement", {route: "/apis/classes/NTextElement", id: "class__NTextElement", classRef: true}],
    ["NTextSelection::NTextSelection", {route: "/apis/structs", id: "method__NTextSelection_NTextSelection", classRef: false}],
    ["NTextSelection", {route: "/apis/structs", id: "struct__NTextSelection", classRef: false}],
    ["NThickness::NThickness", {route: "/apis/structs", id: "method__NThickness_NThickness", classRef: false}],
    ["NThickness", {route: "/apis/structs", id: "struct__NThickness", classRef: false}],
    ["NVerticalStackElement", {route: "/apis/classes/NVerticalStackElement", id: "class__NVerticalStackElement", classRef: true}],
    ["NVerticalStackElement::NVerticalStackElement", {route: "/apis/classes/NVerticalStackElement", id: "method__NVerticalStackElement_NVerticalStackElement", classRef: false}],
    ["NWindow", {route: "/apis/classes/NWindow", id: "class__NWindow", classRef: true}],
    ["NWindow::NWindow", {route: "/apis/classes/NWindow", id: "method__NWindow_NWindow", classRef: false}],
    ["NPopupMenuWindow::on_cancelled", {route: "/apis/classes/NPopupMenuWindow", id: "event__NPopupMenuWindow_on_cancelled", classRef: false}],
    ["NCheckboxElement::on_checked_changed", {route: "/apis/classes/NCheckboxElement", id: "event__NCheckboxElement_on_checked_changed", classRef: false}],
    ["NElement::on_clicked", {route: "/apis/classes/NElement", id: "event__NElement_on_clicked", classRef: false}],
    ["NMenuElement::on_closed", {route: "/apis/classes/NMenuElement", id: "event__NMenuElement_on_closed", classRef: false}],
    ["NMessageWindow::on_closed", {route: "/apis/classes/NMessageWindow", id: "event__NMessageWindow_on_closed", classRef: false}],
    ["NDropdownElement::on_closed", {route: "/apis/classes/NDropdownElement", id: "event__NDropdownElement_on_closed", classRef: false}],
    ["NWindow::on_focus_changed", {route: "/apis/classes/NWindow", id: "event__NWindow_on_focus_changed", classRef: false}],
    ["NWindow::on_is_active_changed", {route: "/apis/classes/NWindow", id: "event__NWindow_on_is_active_changed", classRef: false}],
    ["NMenuElement::on_item_selected", {route: "/apis/classes/NMenuElement", id: "event__NMenuElement_on_item_selected", classRef: false}],
    ["NPopupMenuWindow::on_item_selected", {route: "/apis/classes/NPopupMenuWindow", id: "event__NPopupMenuWindow_on_item_selected", classRef: false}],
    ["NElement::on_key", {route: "/apis/classes/NElement", id: "event__NElement_on_key", classRef: false}],
    ["NElement::on_key_code", {route: "/apis/classes/NElement", id: "event__NElement_on_key_code", classRef: false}],
    ["NElement::on_mouse_button_pressed", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_button_pressed", classRef: false}],
    ["NElement::on_mouse_button_released", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_button_released", classRef: false}],
    ["NElement::on_mouse_enter", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_enter", classRef: false}],
    ["NElement::on_mouse_leave", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_leave", classRef: false}],
    ["NElement::on_mouse_lost_capture", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_lost_capture", classRef: false}],
    ["NElement::on_mouse_move", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_move", classRef: false}],
    ["NMenuElement::on_opening", {route: "/apis/classes/NMenuElement", id: "event__NMenuElement_on_opening", classRef: false}],
    ["NDropdownElement::on_opening", {route: "/apis/classes/NDropdownElement", id: "event__NDropdownElement_on_opening", classRef: false}],
    ["NRadioGroupElement::on_selection_changed", {route: "/apis/classes/NRadioGroupElement", id: "event__NRadioGroupElement_on_selection_changed", classRef: false}],
    ["NTextEditElement::on_selection_changed", {route: "/apis/classes/NTextEditElement", id: "event__NTextEditElement_on_selection_changed", classRef: false}],
    ["NButtonElement::on_selection_changed", {route: "/apis/classes/NButtonElement", id: "event__NButtonElement_on_selection_changed", classRef: false}],
    ["NDropdownElement::on_selection_changed", {route: "/apis/classes/NDropdownElement", id: "event__NDropdownElement_on_selection_changed", classRef: false}],
    ["NTextEditElement::on_text_changed", {route: "/apis/classes/NTextEditElement", id: "event__NTextEditElement_on_text_changed", classRef: false}],
    ["NMenuElement::open", {route: "/apis/classes/NMenuElement", id: "property__NMenuElement_open", classRef: false}],
    ["NDropdownElement::open", {route: "/apis/classes/NDropdownElement", id: "property__NDropdownElement_open", classRef: false}],
    ["NPoint::operator_minus", {route: "/apis/structs", id: "method__NPoint_operator_minus", classRef: false}],
    ["NRect::operator_minus", {route: "/apis/structs", id: "method__NRect_operator_minus", classRef: false}],
    ["NPoint::operator_plus", {route: "/apis/structs", id: "method__NPoint_operator_plus", classRef: false}],
    ["NRect::operator_plus", {route: "/apis/structs", id: "method__NRect_operator_plus", classRef: false}],
    ["NPoint::operator_assignassign", {route: "/apis/structs", id: "method__NPoint_operator_assignassign", classRef: false}],
    ["NRect::operator_assignassign", {route: "/apis/structs", id: "method__NRect_operator_assignassign", classRef: false}],
    ["NSize::operator_assignassign", {route: "/apis/structs", id: "method__NSize_operator_assignassign", classRef: false}],
    ["NTextSelection::operator_assignassign", {route: "/apis/structs", id: "method__NTextSelection_operator_assignassign", classRef: false}],
    ["NThickness::operator_assignassign", {route: "/apis/structs", id: "method__NThickness_operator_assignassign", classRef: false}],
    ["NColorPair::operator_assignassign", {route: "/apis/classes/NColorPair", id: "method__NColorPair_operator_assignassign", classRef: false}],
    ["NRadioGroupElement::orientation", {route: "/apis/classes/NRadioGroupElement", id: "property__NRadioGroupElement_orientation", classRef: false}],
    ["NElement::parent", {route: "/apis/classes/NElement", id: "property__NElement_parent", classRef: false}],
    ["NTextEditElement::password", {route: "/apis/classes/NTextEditElement", id: "property__NTextEditElement_password", classRef: false}],
    ["NTextEditElement::paste", {route: "/apis/classes/NTextEditElement", id: "method__NTextEditElement_paste", classRef: false}],
    ["NWindow::post", {route: "/apis/classes/NWindow", id: "method__NWindow_post", classRef: false}],
    ["NMenuElement::prefix", {route: "/apis/classes/NMenuElement", id: "property__NMenuElement_prefix", classRef: false}],
    ["NButtonElement::prefix", {route: "/apis/classes/NButtonElement", id: "property__NButtonElement_prefix", classRef: false}],
    ["NButtonBaseElement::pressed", {route: "/apis/classes/NButtonBaseElement", id: "property__NButtonBaseElement_pressed", classRef: false}],
    ["NElement::print", {route: "/apis/classes/NElement", id: "method__NElement_print", classRef: false}],
    ["NElement::print_acs", {route: "/apis/classes/NElement", id: "method__NElement_print_acs", classRef: false}],
    ["NElement::print_menu_item", {route: "/apis/classes/NElement", id: "method__NElement_print_menu_item", classRef: false}],
    ["NBoxElement::ptr", {route: "/apis/classes/NBoxElement", id: "using__NBoxElement_ptr", classRef: false}],
    ["NHorizontalStackElement::ptr", {route: "/apis/classes/NHorizontalStackElement", id: "using__NHorizontalStackElement_ptr", classRef: false}],
    ["NMenuElement::ptr", {route: "/apis/classes/NMenuElement", id: "using__NMenuElement_ptr", classRef: false}],
    ["NMessageWindow::ptr", {route: "/apis/classes/NMessageWindow", id: "using__NMessageWindow_ptr", classRef: false}],
    ["NPopupWindow::ptr", {route: "/apis/classes/NPopupWindow", id: "using__NPopupWindow_ptr", classRef: false}],
    ["NPopupMenuWindow::ptr", {route: "/apis/classes/NPopupMenuWindow", id: "using__NPopupMenuWindow_ptr", classRef: false}],
    ["NRadioGroupElement::ptr", {route: "/apis/classes/NRadioGroupElement", id: "using__NRadioGroupElement_ptr", classRef: false}],
    ["NTextElement::ptr", {route: "/apis/classes/NTextElement", id: "using__NTextElement_ptr", classRef: false}],
    ["NTextEditElement::ptr", {route: "/apis/classes/NTextEditElement", id: "using__NTextEditElement_ptr", classRef: false}],
    ["NVerticalStackElement::ptr", {route: "/apis/classes/NVerticalStackElement", id: "using__NVerticalStackElement_ptr", classRef: false}],
    ["NButtonElement::ptr", {route: "/apis/classes/NButtonElement", id: "using__NButtonElement_ptr", classRef: false}],
    ["NWindow::ptr", {route: "/apis/classes/NWindow", id: "using__NWindow_ptr", classRef: false}],
    ["NButtonBaseElement::ptr", {route: "/apis/classes/NButtonBaseElement", id: "using__NButtonBaseElement_ptr", classRef: false}],
    ["NCheckboxElement::ptr", {route: "/apis/classes/NCheckboxElement", id: "using__NCheckboxElement_ptr", classRef: false}],
    ["NContainerElement::ptr", {route: "/apis/classes/NContainerElement", id: "using__NContainerElement_ptr", classRef: false}],
    ["NDropdownElement::ptr", {route: "/apis/classes/NDropdownElement", id: "using__NDropdownElement_ptr", classRef: false}],
    ["NElement::ptr", {route: "/apis/classes/NElement", id: "using__NElement_ptr", classRef: false}],
    ["NWindow::quit", {route: "/apis/classes/NWindow", id: "method__NWindow_quit", classRef: false}],
    ["NContainerElement::remove_all_children", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_remove_all_children", classRef: false}],
    ["NContainerElement::remove_child", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_remove_child", classRef: false}],
    ["NContainerElement::render", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_render", classRef: false}],
    ["NElement::render", {route: "/apis/classes/NElement", id: "method__NElement_render", classRef: false}],
    ["NContainerElement::render_outer", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_render_outer", classRef: false}],
    ["NTextEditElement::replace_selection", {route: "/apis/classes/NTextEditElement", id: "method__NTextEditElement_replace_selection", classRef: false}],
    ["NElement::request_initial_focus", {route: "/apis/classes/NElement", id: "property__NElement_request_initial_focus", classRef: false}],
    ["NRect::right", {route: "/apis/structs", id: "method__NRect_right", classRef: false}],
    ["NHorizontalStackElement::row_gap", {route: "/apis/classes/NHorizontalStackElement", id: "property__NHorizontalStackElement_row_gap", classRef: false}],
    ["NRadioGroupElement::row_gap", {route: "/apis/classes/NRadioGroupElement", id: "property__NRadioGroupElement_row_gap", classRef: false}],
    ["NVerticalStackElement::row_gap", {route: "/apis/classes/NVerticalStackElement", id: "property__NVerticalStackElement_row_gap", classRef: false}],
    ["NWindow::run", {route: "/apis/classes/NWindow", id: "method__NWindow_run", classRef: false}],
    ["NElement::screen_to_element", {route: "/apis/classes/NElement", id: "method__NElement_screen_to_element", classRef: false}],
    ["NElement::screen_to_window", {route: "/apis/classes/NElement", id: "method__NElement_screen_to_window", classRef: false}],
    ["NTextEditElement::select_all", {route: "/apis/classes/NTextEditElement", id: "method__NTextEditElement_select_all", classRef: false}],
    ["NButtonBaseElement::select_color", {route: "/apis/classes/NButtonBaseElement", id: "property__NButtonBaseElement_select_color", classRef: false}],
    ["NTextEditElement::select_end", {route: "/apis/classes/NTextEditElement", id: "method__NTextEditElement_select_end", classRef: false}],
    ["NTextEditElement::select_start", {route: "/apis/classes/NTextEditElement", id: "method__NTextEditElement_select_start", classRef: false}],
    ["NDropdownElement::selected", {route: "/apis/classes/NDropdownElement", id: "property__NDropdownElement_selected", classRef: false}],
    ["NRadioGroupElement::selection", {route: "/apis/classes/NRadioGroupElement", id: "property__NRadioGroupElement_selection", classRef: false}],
    ["NTextEditElement::selection", {route: "/apis/classes/NTextEditElement", id: "property__NTextEditElement_selection", classRef: false}],
    ["NBoxElement::self", {route: "/apis/classes/NBoxElement", id: "using__NBoxElement_self", classRef: false}],
    ["NHorizontalStackElement::self", {route: "/apis/classes/NHorizontalStackElement", id: "using__NHorizontalStackElement_self", classRef: false}],
    ["NMenuElement::self", {route: "/apis/classes/NMenuElement", id: "using__NMenuElement_self", classRef: false}],
    ["NMessageWindow::self", {route: "/apis/classes/NMessageWindow", id: "using__NMessageWindow_self", classRef: false}],
    ["NPopupWindow::self", {route: "/apis/classes/NPopupWindow", id: "using__NPopupWindow_self", classRef: false}],
    ["NPopupMenuWindow::self", {route: "/apis/classes/NPopupMenuWindow", id: "using__NPopupMenuWindow_self", classRef: false}],
    ["NRadioGroupElement::self", {route: "/apis/classes/NRadioGroupElement", id: "using__NRadioGroupElement_self", classRef: false}],
    ["NTextElement::self", {route: "/apis/classes/NTextElement", id: "using__NTextElement_self", classRef: false}],
    ["NTextEditElement::self", {route: "/apis/classes/NTextEditElement", id: "using__NTextEditElement_self", classRef: false}],
    ["NVerticalStackElement::self", {route: "/apis/classes/NVerticalStackElement", id: "using__NVerticalStackElement_self", classRef: false}],
    ["NButtonElement::self", {route: "/apis/classes/NButtonElement", id: "using__NButtonElement_self", classRef: false}],
    ["NWindow::self", {route: "/apis/classes/NWindow", id: "using__NWindow_self", classRef: false}],
    ["NButtonBaseElement::self", {route: "/apis/classes/NButtonBaseElement", id: "using__NButtonBaseElement_self", classRef: false}],
    ["NCheckboxElement::self", {route: "/apis/classes/NCheckboxElement", id: "using__NCheckboxElement_self", classRef: false}],
    ["NContainerElement::self", {route: "/apis/classes/NContainerElement", id: "using__NContainerElement_self", classRef: false}],
    ["NDropdownElement::self", {route: "/apis/classes/NDropdownElement", id: "using__NDropdownElement_self", classRef: false}],
    ["NElement::self", {route: "/apis/classes/NElement", id: "using__NElement_self", classRef: false}],
    ["NWindow::set_clipboard_text", {route: "/apis/classes/NWindow", id: "method__NWindow_set_clipboard_text", classRef: false}],
    ["NWindow::set_locale", {route: "/apis/classes/NWindow", id: "method__NWindow_set_locale", classRef: false}],
    ["NElement::shared_from_this", {route: "/apis/classes/NElement", id: "method__NElement_shared_from_this", classRef: false}],
    ["MouseEventArgs::shift", {route: "/apis/structs", id: "field__MouseEventArgs_shift", classRef: false}],
    ["NElement::simulate_keyboard_click", {route: "/apis/classes/NElement", id: "method__NElement_simulate_keyboard_click", classRef: false}],
    ["NElement::size", {route: "/apis/classes/NElement", id: "property__NElement_size", classRef: false}],
    ["MouseEventArgs::source", {route: "/apis/structs", id: "field__MouseEventArgs_source", classRef: false}],
    ["NEventArgsBase::source", {route: "/apis/structs", id: "field__NEventArgsBase_source", classRef: false}],
    ["NKeyEventArgs::source", {route: "/apis/structs", id: "field__NKeyEventArgs_source", classRef: false}],
    ["NEvent::subscribe", {route: "/apis/classes/NEvent", id: "method__NEvent_subscribe", classRef: false}],
    ["NEvent::subscriber_count", {route: "/apis/classes/NEvent", id: "method__NEvent_subscriber_count", classRef: false}],
    ["NMenuElement::suffix", {route: "/apis/classes/NMenuElement", id: "property__NMenuElement_suffix", classRef: false}],
    ["NButtonElement::suffix", {route: "/apis/classes/NButtonElement", id: "property__NButtonElement_suffix", classRef: false}],
    ["NDropdownElement::suffix", {route: "/apis/classes/NDropdownElement", id: "property__NDropdownElement_suffix", classRef: false}],
    ["NBoxElement::super", {route: "/apis/classes/NBoxElement", id: "using__NBoxElement_super", classRef: false}],
    ["NHorizontalStackElement::super", {route: "/apis/classes/NHorizontalStackElement", id: "using__NHorizontalStackElement_super", classRef: false}],
    ["NMenuElement::super", {route: "/apis/classes/NMenuElement", id: "using__NMenuElement_super", classRef: false}],
    ["NMessageWindow::super", {route: "/apis/classes/NMessageWindow", id: "using__NMessageWindow_super", classRef: false}],
    ["NPopupWindow::super", {route: "/apis/classes/NPopupWindow", id: "using__NPopupWindow_super", classRef: false}],
    ["NPopupMenuWindow::super", {route: "/apis/classes/NPopupMenuWindow", id: "using__NPopupMenuWindow_super", classRef: false}],
    ["NRadioGroupElement::super", {route: "/apis/classes/NRadioGroupElement", id: "using__NRadioGroupElement_super", classRef: false}],
    ["NTextElement::super", {route: "/apis/classes/NTextElement", id: "using__NTextElement_super", classRef: false}],
    ["NTextEditElement::super", {route: "/apis/classes/NTextEditElement", id: "using__NTextEditElement_super", classRef: false}],
    ["NVerticalStackElement::super", {route: "/apis/classes/NVerticalStackElement", id: "using__NVerticalStackElement_super", classRef: false}],
    ["NButtonElement::super", {route: "/apis/classes/NButtonElement", id: "using__NButtonElement_super", classRef: false}],
    ["NWindow::super", {route: "/apis/classes/NWindow", id: "using__NWindow_super", classRef: false}],
    ["NButtonBaseElement::super", {route: "/apis/classes/NButtonBaseElement", id: "using__NButtonBaseElement_super", classRef: false}],
    ["NCheckboxElement::super", {route: "/apis/classes/NCheckboxElement", id: "using__NCheckboxElement_super", classRef: false}],
    ["NContainerElement::super", {route: "/apis/classes/NContainerElement", id: "using__NContainerElement_super", classRef: false}],
    ["NDropdownElement::super", {route: "/apis/classes/NDropdownElement", id: "using__NDropdownElement_super", classRef: false}],
    ["NElement::take_focus", {route: "/apis/classes/NElement", id: "method__NElement_take_focus", classRef: false}],
    ["MouseEventArgs::target", {route: "/apis/structs", id: "field__MouseEventArgs_target", classRef: false}],
    ["NElement::target", {route: "/apis/structs", id: "field__NElement_target", classRef: false}],
    ["NTextElement::text", {route: "/apis/classes/NTextElement", id: "property__NTextElement_text", classRef: false}],
    ["NTextElement::text_attribute", {route: "/apis/classes/NTextElement", id: "property__NTextElement_text_attribute", classRef: false}],
    ["NBoxElement::title", {route: "/apis/classes/NBoxElement", id: "property__NBoxElement_title", classRef: false}],
    ["NWindow::title", {route: "/apis/classes/NWindow", id: "property__NWindow_title", classRef: false}],
    ["NRect::top", {route: "/apis/structs", id: "method__NRect_top", classRef: false}],
    ["NRect::top_left", {route: "/apis/structs", id: "method__NRect_top_left", classRef: false}],
    ["NWindow::top_level_window", {route: "/apis/classes/NWindow", id: "property__NWindow_top_level_window", classRef: false}],
    ["NRect::top_right", {route: "/apis/structs", id: "method__NRect_top_right", classRef: false}],
    ["NRadioGroupElement::unchecked_text", {route: "/apis/classes/NRadioGroupElement", id: "property__NRadioGroupElement_unchecked_text", classRef: false}],
    ["NCheckboxElement::unchecked_text", {route: "/apis/classes/NCheckboxElement", id: "property__NCheckboxElement_unchecked_text", classRef: false}],
    ["NWindow::UNCOMPOSABLE", {route: "/apis/classes/NWindow", id: "constexpr__NWindow_UNCOMPOSABLE", classRef: false}],
    ["NEvent::unsubscribe", {route: "/apis/classes/NEvent", id: "method__NEvent_unsubscribe", classRef: false}],
    ["NElement::user_data", {route: "/apis/classes/NElement", id: "property__NElement_user_data", classRef: false}],
    ["NElement::vertical_line", {route: "/apis/classes/NElement", id: "method__NElement_vertical_line", classRef: false}],
    ["NMenuItem::wants_shortcut_key", {route: "/apis/classes/NMenuElement", id: "method__NMenuItem_wants_shortcut_key", classRef: false}],
    ["NButtonElement::wants_shortcut_key", {route: "/apis/classes/NButtonElement", id: "method__NButtonElement_wants_shortcut_key", classRef: false}],
    ["NCheckboxElement::wants_shortcut_key", {route: "/apis/classes/NCheckboxElement", id: "method__NCheckboxElement_wants_shortcut_key", classRef: false}],
    ["NDropdownElement::wants_shortcut_key", {route: "/apis/classes/NDropdownElement", id: "method__NDropdownElement_wants_shortcut_key", classRef: false}],
    ["NElement::wants_shortcut_key", {route: "/apis/classes/NElement", id: "method__NElement_wants_shortcut_key", classRef: false}],
    ["NElement::weak_ptr_from_this", {route: "/apis/classes/NElement", id: "method__NElement_weak_ptr_from_this", classRef: false}],
    ["NColor::White", {route: "/apis/classes/NColor", id: "method__NColor_White", classRef: false}],
    ["NElement::width", {route: "/apis/classes/NElement", id: "property__NElement_width", classRef: false}],
    ["MouseEventArgs::window", {route: "/apis/structs", id: "field__MouseEventArgs_window", classRef: false}],
    ["NEventArgsBase::window", {route: "/apis/structs", id: "field__NEventArgsBase_window", classRef: false}],
    ["NKeyEventArgs::window", {route: "/apis/structs", id: "field__NKeyEventArgs_window", classRef: false}],
    ["NElement::window", {route: "/apis/classes/NElement", id: "property__NElement_window", classRef: false}],
    ["NWindow::window_position", {route: "/apis/classes/NWindow", id: "property__NWindow_window_position", classRef: false}],
    ["NElement::window_to_element", {route: "/apis/classes/NElement", id: "method__NElement_window_to_element", classRef: false}],
    ["NElement::window_to_screen", {route: "/apis/classes/NElement", id: "method__NElement_window_to_screen", classRef: false}],
    ["NTextElement::wrap_text", {route: "/apis/classes/NTextElement", id: "property__NTextElement_wrap_text", classRef: false}],
]);

export function KeywordIndexMap(): Map<string,IndexLink> {
    return keywordIndexMap; 
}    
