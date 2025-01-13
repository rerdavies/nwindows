import IndexData, { IndexLink, IndexEntry,IndexReference } from "./IndexData";

const indexData = new IndexData([
    new IndexEntry("actual_height", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::actual_height", 
            "property__NElement_actual_height"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::actual_height", 
            "property__NElement_actual_height"),
    ]),
    new IndexEntry("actual_size", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::actual_size", 
            "property__NElement_actual_size"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::actual_size", 
            "property__NElement_actual_size"),
    ]),
    new IndexEntry("actual_width", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::actual_width", 
            "property__NElement_actual_width"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::actual_width", 
            "property__NElement_actual_width"),
    ]),
    new IndexEntry("add_child", [
        new IndexReference(
            "/apis/classes/NBoxElement", 
            "4.7.1 - NBoxElement", 
            "method void NBoxElement::add_child(const NElement::ptr& child)", 
            "method__NBoxElement_add_child"),
        new IndexReference(
            "/apis/classes/NBoxElement", 
            "4.7.1 - NBoxElement", 
            "method void NBoxElement::add_child(NElement::ptr&& child)", 
            "method__NBoxElement_add_child"),
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method void NContainerElement::add_child(const NElement::ptr& child)", 
            "method__NContainerElement_add_child"),
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method void NContainerElement::add_child(NElement::ptr&& child)", 
            "method__NContainerElement_add_child"),
        new IndexReference(
            "/apis/classes/NVerticalStackElement", 
            "4.7.7 - NVerticalStackElement", 
            "method void NVerticalStackElement::add_child(const NElement::ptr& child)", 
            "method__NVerticalStackElement_add_child"),
        new IndexReference(
            "/apis/classes/NVerticalStackElement", 
            "4.7.7 - NVerticalStackElement", 
            "method void NVerticalStackElement::add_child(NElement::ptr&& child)", 
            "method__NVerticalStackElement_add_child"),
        new IndexReference(
            "/apis/classes/NHorizontalStackElement", 
            "4.7.X - NHorizontalStackElement", 
            "method void NHorizontalStackElement::add_child(const NElement::ptr& child)", 
            "method__NHorizontalStackElement_add_child"),
        new IndexReference(
            "/apis/classes/NHorizontalStackElement", 
            "4.7.X - NHorizontalStackElement", 
            "method void NHorizontalStackElement::add_child(NElement::ptr&& child)", 
            "method__NHorizontalStackElement_add_child"),
    ]),
    new IndexEntry("add_children<T>", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method void NContainerElement::add_children<T>(const std::vector<std::shared_ptr<T>>& children)", 
            "method__NContainerElement_add_children<T>"),
    ]),
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
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "property NTextElement::alignment", 
            "property__NTextElement_alignment"),
        new IndexReference(
            "/apis/classes/NVerticalStackElement", 
            "4.7.7 - NVerticalStackElement", 
            "property NVerticalStackElement::alignment", 
            "property__NVerticalStackElement_alignment"),
        new IndexReference(
            "/apis/classes/NHorizontalStackElement", 
            "4.7.X - NHorizontalStackElement", 
            "property NHorizontalStackElement::alignment", 
            "property__NHorizontalStackElement_alignment"),
    ]),
    new IndexEntry("arrange", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method virtual void NContainerElement::arrange(const NRect& bounds)", 
            "method__NContainerElement_arrange"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method virtual void NElement::arrange(const NRect& bounds)", 
            "method__NElement_arrange"),
    ]),
    new IndexEntry("attribute_off", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::attribute_off(NAttribute attr)", 
            "method__NElement_attribute_off"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::attribute_off(NAttribute attr)", 
            "method__NElement_attribute_off"),
    ]),
    new IndexEntry("attribute_on", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::attribute_on(NAttribute attr)", 
            "method__NElement_attribute_on"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::attribute_on(NAttribute attr)", 
            "method__NElement_attribute_on"),
    ]),
    new IndexEntry("AUTO_SIZE", [
        new IndexReference(
            "/apis/constants", 
            "4.2 - Constants", 
            "constant constexpr int AUTO_SIZE", 
            "constant___AUTO_SIZE"),
    ]),
    new IndexEntry("Black", [
        new IndexReference(
            "/apis/classes/NColor", 
            "4.7.2 - NColor", 
            "method static NColor NColor::Black", 
            "method__NColor_Black"),
    ]),
    new IndexEntry("bottom", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method int NRect::bottom() const", 
            "method__NRect_bottom"),
    ]),
    new IndexEntry("bottom_left", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NPoint NRect::bottom_left() const", 
            "method__NRect_bottom_left"),
    ]),
    new IndexEntry("bottom_right", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NPoint NRect::bottom_right() const", 
            "method__NRect_bottom_right"),
    ]),
    new IndexEntry("bounds", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NRect NRect::bounds(const NRect& other) const", 
            "method__NRect_bounds"),
    ]),
    new IndexEntry("box", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::box(const NRect &rect, const std::optional<NColorPair>&colorPair = std::nullopt)", 
            "method__NElement_box"),
    ]),
    new IndexEntry("cancel_post", [
        new IndexReference(
            "/using/dispatcher", 
            "3.6 - The NWindows Dispatcher", 
            "method bool cancel_post(PostHandle handle)", 
            "method___cancel_post"),
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
    new IndexEntry("children", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "property NContainerElement::children", 
            "property__NContainerElement_children"),
    ]),
    new IndexEntry("clickable", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::clickable", 
            "property__NElement_clickable"),
    ]),
    new IndexEntry("close", [
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "method void NWindow::close()", 
            "method__NWindow_close"),
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
        new IndexReference(
            "/apis/classes/NBoxElement", 
            "4.7.1 - NBoxElement", 
            "property NBoxElement::color", 
            "property__NBoxElement_color"),
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "property NTextElement::color", 
            "property__NTextElement_color"),
    ]),
    new IndexEntry("color_off", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::color_off(NColorPair colorPair)", 
            "method__NElement_color_off"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::color_off(NColorPair colorPair)", 
            "method__NElement_color_off"),
    ]),
    new IndexEntry("color_on", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::color_on(NColorPair colorPair)", 
            "method__NElement_color_on"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::color_on(NColorPair colorPair)", 
            "method__NElement_color_on"),
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
    new IndexEntry("contains", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method bool NRect::contains(const NPoint& point) const", 
            "method__NRect_contains"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method bool NRect::contains(int x, int y) const", 
            "method__NRect_contains"),
    ]),
    new IndexEntry("create", [
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "method static NPopupWindow::ptr create(NWindow::ptr parentWindow, const NRect& anchor, NAttachment attachment);", 
            "method___create"),
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "method static NWindow::ptr NWindow::create(int width, int height, NColorPalette* colorPalette = nullptr)", 
            "method__NWindow_create"),
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "method static NWindow::ptr NWindow::create(int x, int y, int width, int height, NColorPalette* colorPalette = nullptr)", 
            "method__NWindow_create"),
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "method static NWindow::ptr NWindow::create(NWindow::ptr parent_window, int width, int height)", 
            "method__NWindow_create"),
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "method static NWindow::ptr NWindow::create(NWindow::ptr parent_window, int x, int y,int width, int height)", 
            "method__NWindow_create"),
        new IndexReference(
            "/apis/classes/NBoxElement", 
            "4.7.1 - NBoxElement", 
            "method static NBoxElement::ptr NBoxElement::create()", 
            "method__NBoxElement_create"),
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "method static NTextElement::ptr NTextElement::create()", 
            "method__NTextElement_create"),
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "method static NTextElement::ptr NTextElement::create(const std::string& text, NAttribute attribute)", 
            "method__NTextElement_create"),
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "method static NTextElement::ptr NTextElement::create(const std::string& text)", 
            "method__NTextElement_create"),
        new IndexReference(
            "/apis/classes/NVerticalStackElement", 
            "4.7.7 - NVerticalStackElement", 
            "method static NVerticalStackElement::ptr NVerticalStackElement::create()", 
            "method__NVerticalStackElement_create"),
        new IndexReference(
            "/apis/classes/NHorizontalStackElement", 
            "4.7.X - NHorizontalStackElement", 
            "method static NHorizontalStackElement::ptr NHorizontalStackElement::create()", 
            "method__NHorizontalStackElement_create"),
    ]),
    new IndexEntry("DEBUG_NELEMENT_LIFECYCLE", [
        new IndexReference(
            "/apis/defines", 
            "4.1 - Defines", 
            "define DEBUG_NELEMENT_LIFECYCLE", 
            "define___DEBUG_NELEMENT_LIFECYCLE"),
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
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::disabled", 
            "property__NElement_disabled"),
    ]),
    new IndexEntry("display_checkmark", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NMenuItem::display_checkmark(bool checked)", 
            "method__NMenuItem_display_checkmark"),
    ]),
    new IndexEntry("Divider", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method static NMenuItem NMenuItem::Divider()", 
            "method__NMenuItem_Divider"),
    ]),
    new IndexEntry("element_to_screen", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NPoint NElement::element_to_screen(const NPoint& point) const", 
            "method__NElement_element_to_screen"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NRect element_to_screen(const NRect& rect) const", 
            "method___element_to_screen"),
    ]),
    new IndexEntry("element_to_window", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NPoint NElement::element_to_window(const NPoint& point) const", 
            "method__NElement_element_to_window"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NRect element_to_window(const NRect& rect) const", 
            "method___element_to_window"),
    ]),
    new IndexEntry("find_child_element", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method NElement::ptr NContainerElement::find_child_element(const std::function<bool(NElement&)>& predicate);", 
            "method__NContainerElement_find_child_element"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method virtual NElement::ptr find_child_element(const std::function<bool(NElement&)>& predicate);", 
            "method___find_child_element"),
    ]),
    new IndexEntry("focusable", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::focusable", 
            "property__NElement_focusable"),
    ]),
    new IndexEntry("for_each_element", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method virtual void NContainerElement::for_each_element(const std::function<void(NElement&)>& callback);", 
            "method__NContainerElement_for_each_element"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method virtual void NElement::for_each_element(const std::function<void(NElement&)>& callback);", 
            "method__NElement_for_each_element"),
    ]),
    new IndexEntry("get_element_at", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method NElement::ptr NContainerElement::get_element_at(const NPoint&pt)", 
            "method__NContainerElement_get_element_at"),
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method NElement::ptr NContainerElement::get_element_at(int x, int y)", 
            "method__NContainerElement_get_element_at"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NElement::ptr NElement::get_element_at(const NPoint&pt)", 
            "method__NElement_get_element_at"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NElement::ptr NElement::get_element_at(int x, int y)", 
            "method__NElement_get_element_at"),
    ]),
    new IndexEntry("get_element_by_id<T>", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method std::shared_ptr<T> NElement::get_element_by_id<T>(const std::string& id)", 
            "method__NElement_get_element_by_id<T>"),
    ]),
    new IndexEntry("handle_attached", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::handle_attached(NWindow* window)", 
            "method__NElement_handle_attached"),
    ]),
    new IndexEntry("handle_detaching", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::handle_detaching()", 
            "method__NElement_handle_detaching"),
    ]),
    new IndexEntry("height", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::height", 
            "property__NElement_height"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::height", 
            "property__NElement_height"),
    ]),
    new IndexEntry("horizontal_line", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::horizontal_line(int x, int y, int width)", 
            "method__NElement_horizontal_line"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::horizontal_line(int x, int y, int width)", 
            "method__NElement_horizontal_line"),
    ]),
    new IndexEntry("inflate", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NRect NRect::inflate(const NThickness& thickness) const", 
            "method__NRect_inflate"),
    ]),
    new IndexEntry("inset", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NRect NRect::inset(const NThickness& thickness) const", 
            "method__NRect_inset"),
    ]),
    new IndexEntry("intersect", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NRect NRect::intersect(const NRect& other) const", 
            "method__NRect_intersect"),
    ]),
    new IndexEntry("invalidate_layout", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method virtual void NElement::invalidate_layout()", 
            "method__NElement_invalidate_layout"),
    ]),
    new IndexEntry("invalidate_render", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method void NContainerElement::invalidate_render()", 
            "method__NContainerElement_invalidate_render"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method virtual void NElement::invalidate_render()", 
            "method__NElement_invalidate_render"),
    ]),
    new IndexEntry("is_cancel", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::is_cancel", 
            "property__NElement_is_cancel"),
    ]),
    new IndexEntry("is_container", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method bool NContainerElement::is_container() const", 
            "method__NContainerElement_is_container"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::is_container", 
            "property__NElement_is_container"),
    ]),
    new IndexEntry("is_default", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::is_default", 
            "property__NElement_is_default"),
    ]),
    new IndexEntry("is_divider", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method bool NMenuItem::is_divider() const", 
            "method__NMenuItem_is_divider"),
    ]),
    new IndexEntry("is_focused", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::is_focused", 
            "property__NElement_is_focused"),
    ]),
    new IndexEntry("is_menu_item_shortcut_key", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method bool NElement::is_menu_item_shortcut_key(char32_t c, const std::string& text)", 
            "method__NElement_is_menu_item_shortcut_key"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method bool NElement::is_menu_item_shortcut_key(const std::string& utf8key, const std::string& text)", 
            "method__NElement_is_menu_item_shortcut_key"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method bool NElement::is_menu_item_shortcut_key(char32_t c, const std::string& text)", 
            "method__NElement_is_menu_item_shortcut_key"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method bool NElement::is_menu_item_shortcut_key(const std::string& utf8key, const std::string& text)", 
            "method__NElement_is_menu_item_shortcut_key"),
    ]),
    new IndexEntry("keyboard_clicking", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method bool NElement::keyboard_clicking() const", 
            "method__NElement_keyboard_clicking"),
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
    new IndexEntry("left", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method int NRect::left() const", 
            "method__NRect_left"),
    ]),
    new IndexEntry("margin", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::margin", 
            "property__NElement_margin"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::margin", 
            "property__NElement_margin"),
    ]),
    new IndexEntry("measure", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method NSize NElement::measure(const NSize& available)", 
            "method__NElement_measure"),
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method virtual NSize NContainerElement::measure(const NSize& available)", 
            "method__NContainerElement_measure"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method virtual NSize NElement::measure(const NSize& available)", 
            "method__NElement_measure"),
    ]),
    new IndexEntry("measure_child_with_margins", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method NSize NContainerElement::measure_child_with_margins(const NSize& available, NElement::ptr& child);", 
            "method__NContainerElement_measure_child_with_margins"),
    ]),
    new IndexEntry("measure_menu_text", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method int NElement::measure_menu_text(const std::string& text)", 
            "method__NElement_measure_menu_text"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method int NElement::measure_menu_text(const std::string& text)", 
            "method__NElement_measure_menu_text"),
    ]),
    new IndexEntry("measure_text", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method int NElement::measure_text(const std::string&text)", 
            "method__NElement_measure_text"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method int NElement::measure_text(const std::string&text)", 
            "method__NElement_measure_text"),
    ]),
    new IndexEntry("measured", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::measured", 
            "property__NElement_measured"),
    ]),
    new IndexEntry("menu_items", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NDropdownElement::menu_items", 
            "property__NDropdownElement_menu_items"),
    ]),
    new IndexEntry("mouse_entered", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::mouse_entered", 
            "property__NElement_mouse_entered"),
    ]),
    new IndexEntry("move", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::move(int x, int y)", 
            "method__NElement_move"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::move(int x, int y)", 
            "method__NElement_move"),
    ]),
    new IndexEntry("NAlignment", [
        new IndexReference(
            "/apis/enums", 
            "4.4 - Enums", 
            "enum class NAlignment", 
            "enum__NAlignment"),
    ]),
    new IndexEntry("NAttachment", [
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "enum class NAttachment", 
            "enum__NAttachment"),
        new IndexReference(
            "/apis/enums", 
            "4.4 - Enums", 
            "enum class NAttachment", 
            "enum__NAttachment"),
    ]),
    new IndexEntry("NAttribute", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "enum class NAttribute", 
            "enum__NAttribute"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "enum class NAttribute", 
            "enum__NAttribute"),
        new IndexReference(
            "/apis/enums", 
            "4.4 - Enums", 
            "enum class NAttribute", 
            "enum__NAttribute"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "enum class NAttribute", 
            "enum__NAttribute"),
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "enum class NAttribute", 
            "enum__NAttribute"),
    ]),
    new IndexEntry("NBoxElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NBoxElement", 
            "class__NBoxElement"),
        new IndexReference(
            "/apis/classes/NBoxElement", 
            "4.7.1 - NBoxElement", 
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
    new IndexEntry("NClickedEventArgs", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NClickedEventArgs::NClickedEventArgs(NElement* source, NElement* target, const NRect& location, bool is_mouse_click)", 
            "method__NClickedEventArgs_NClickedEventArgs"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "struct NClickedEventArgs", 
            "struct__NClickedEventArgs"),
    ]),
    new IndexEntry("NColor", [
        new IndexReference(
            "/apis/classes/NColor", 
            "4.7.2 - NColor", 
            "class NColor", 
            "class__NColor"),
        new IndexReference(
            "/apis/classes/NColor", 
            "4.7.2 - NColor", 
            "method NColor::NColor()", 
            "method__NColor_NColor"),
    ]),
    new IndexEntry("NColorPair", [
        new IndexReference(
            "/apis/classes/NColorPair", 
            "4.7.3 - NColorPair", 
            "class NColorPair", 
            "class__NColorPair"),
    ]),
    new IndexEntry("NColorPalette", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "struct NColorPalette", 
            "struct__NColorPalette"),
    ]),
    new IndexEntry("NContainerElement", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "class NContainerElement", 
            "class__NContainerElement"),
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method NContainerElement::NContainerElement(const std::string& tag)", 
            "method__NContainerElement_NContainerElement"),
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
            "3.5.4 - Fully-Custom Elements", 
            "class NElement", 
            "class__NElement"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "class NElement", 
            "class__NElement"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NElement::NElement(const std::string&tagName)", 
            "method__NElement_NElement"),
    ]),
    new IndexEntry("NEventArgsBase", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NEventArgsBase::NEventArgsBase(NElement* source)", 
            "method__NEventArgsBase_NEventArgsBase"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "struct NEventArgsBase", 
            "struct__NEventArgsBase"),
    ]),
    new IndexEntry("NHorizontalStackElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NHorizontalStackElement", 
            "class__NHorizontalStackElement"),
        new IndexReference(
            "/apis/classes/NHorizontalStackElement", 
            "4.7.X - NHorizontalStackElement", 
            "class NHorizontalStackElement", 
            "class__NHorizontalStackElement"),
        new IndexReference(
            "/apis/classes/NHorizontalStackElement", 
            "4.7.X - NHorizontalStackElement", 
            "method NHorizontalStackElement::NHorizontalStackElement(const std::string &tag)", 
            "method__NHorizontalStackElement_NHorizontalStackElement"),
    ]),
    new IndexEntry("NKeyEventArgs", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NKeyEventArgs::NKeyEventArgs(NElement* source, char32_t key)", 
            "method__NKeyEventArgs_NKeyEventArgs"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "struct NKeyEventArgs", 
            "struct__NKeyEventArgs"),
    ]),
    new IndexEntry("NMenuElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NMenuElement", 
            "class__NMenuElement"),
    ]),
    new IndexEntry("NMenuItem", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NMenuItem::NMenuItem()", 
            "method__NMenuItem_NMenuItem"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NMenuItem::NMenuItem(const std::string &label, const std::vector<NMenuItem> &submenu, bool enabled)", 
            "method__NMenuItem_NMenuItem"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NMenuItem::NMenuItem(const std::string &label, int item_id, bool enabled)", 
            "method__NMenuItem_NMenuItem"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "struct NMenuItem", 
            "struct__NMenuItem"),
    ]),
    new IndexEntry("NMouseEventArgs", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NMouseEventArgs::NMouseEventArgs()", 
            "method__NMouseEventArgs_NMouseEventArgs"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NMouseEventArgs::NMouseEventArgs(NElement* source)", 
            "method__NMouseEventArgs_NMouseEventArgs"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "struct NMouseEventArgs", 
            "struct__NMouseEventArgs"),
    ]),
    new IndexEntry("NNavDirection", [
        new IndexReference(
            "/apis/enums", 
            "4.4 - Enums", 
            "enum class NNavDirection", 
            "enum__NNavDirection"),
    ]),
    new IndexEntry("NO_ITEM_ID", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "constant const int NMenuItem::NO_ITEM_ID", 
            "constant__NMenuItem_NO_ITEM_ID"),
    ]),
    new IndexEntry("NOrientation", [
        new IndexReference(
            "/apis/enums", 
            "4.4 - Enums", 
            "enum class NOrientation", 
            "enum__NOrientation"),
    ]),
    new IndexEntry("normalized_text", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextEditElement::normalized_text", 
            "property__NTextEditElement_normalized_text"),
    ]),
    new IndexEntry("NPoint", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NPoint::NPoint()", 
            "method__NPoint_NPoint"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NPoint::NPoint(int x, int y)", 
            "method__NPoint_NPoint"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "struct NPoint", 
            "struct__NPoint"),
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
    new IndexEntry("NRect", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NRect::NRect()", 
            "method__NRect_NRect"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NRect::NRect(int x, int y, int width, int height)", 
            "method__NRect_NRect"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "struct NRect", 
            "struct__NRect"),
    ]),
    new IndexEntry("NSize", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NSize::NSize()", 
            "method__NSize_NSize"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NSize::NSize(int width, int height)", 
            "method__NSize_NSize"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "struct NSize", 
            "struct__NSize"),
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
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "class NTextElement", 
            "class__NTextElement"),
    ]),
    new IndexEntry("NThickness", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NThickness::NThickness()", 
            "method__NThickness_NThickness"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NThickness::NThickness(int left, int top, int right, int bottom)", 
            "method__NThickness_NThickness"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NThickness::NThickness(int thickness)", 
            "method__NThickness_NThickness"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "struct NThickness", 
            "struct__NThickness"),
    ]),
    new IndexEntry("NVerticalStackElement", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "class NVerticalStackElement", 
            "class__NVerticalStackElement"),
        new IndexReference(
            "/apis/classes/NVerticalStackElement", 
            "4.7.7 - NVerticalStackElement", 
            "class NVerticalStackElement", 
            "class__NVerticalStackElement"),
        new IndexReference(
            "/apis/classes/NVerticalStackElement", 
            "4.7.7 - NVerticalStackElement", 
            "method NVerticalStackElement::NVerticalStackElement(const std::string &tag)", 
            "method__NVerticalStackElement_NVerticalStackElement"),
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
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "event NEvent<void(NWindow*window)> NElement::on_attached", 
            "event__NElement_on_attached"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "event NEvent<void(NWindow*)> NElement::on_attached", 
            "event__NElement_on_attached"),
    ]),
    new IndexEntry("on_checked_changed", [
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "event NEvent<void (bool checked)> NCheckboxElement::on_checked_changed", 
            "event__NCheckboxElement_on_checked_changed"),
    ]),
    new IndexEntry("on_clicked", [
        new IndexReference(
            "/using/events", 
            "3.4 - NWindows Events", 
            "event NEvent<void (int button,NClickedEventArgs&event_args)>  NElement::on_clicked", 
            "event__NElement_on_clicked"),
        new IndexReference(
            "/using/events/mouse", 
            "3.4.2 - Mouse Events", 
            "event NEvent<void (int button,NClickedEventArgs&event_args)> NElement::on_clicked", 
            "event__NElement_on_clicked"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "event NEvent<void (int button,NClickedEventArgs&event_args)> NElement::on_clicked", 
            "event__NElement_on_clicked"),
    ]),
    new IndexEntry("on_detaching", [
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "event NEvent<void()> NElement::on_detaching", 
            "event__NElement_on_detaching"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "event NEvent<void(void)> void NElement::on_detaching", 
            "event__NElement_on_detaching"),
    ]),
    new IndexEntry("on_focus_changed", [
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "event NEvent<void (NElement::ptr focusElement)> NWindow::on_focus_changed", 
            "event__NWindow_on_focus_changed"),
    ]),
    new IndexEntry("on_focused", [
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "event NEvent<void (bool focused)> NElement::on_focused", 
            "event__NElement_on_focused"),
    ]),
    new IndexEntry("on_key", [
        new IndexReference(
            "/using/events", 
            "3.4 - NWindows Events", 
            "event NEvent<void (NKeyEventArgs&event_args)> NElement::on_key", 
            "event__NElement_on_key"),
        new IndexReference(
            "/using/events/keyboard", 
            "3.4.1 - Keyboard Events", 
            "event NEvent<void (NKeyEventArgs&event_args)> NElement::on_key", 
            "event__NElement_on_key"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "event NEvent<void (NKeyEventArgs&event_args)> NElement::on_key", 
            "event__NElement_on_key"),
    ]),
    new IndexEntry("on_key_code", [
        new IndexReference(
            "/using/events/keyboard", 
            "3.4.1 - Keyboard Events", 
            "event NEvent<void (NKeyCodeEventArgs&event_args)> NElement::on_key_code", 
            "event__NElement_on_key_code"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "event NEvent<void (NKeyCodeEventArgs&event_args)> NElement::on_key_code", 
            "event__NElement_on_key_code"),
    ]),
    new IndexEntry("on_mouse_button_pressed", [
        new IndexReference(
            "/using/events", 
            "3.4 - NWindows Events", 
            "event NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_pressed", 
            "event__NElement_on_mouse_button_pressed"),
        new IndexReference(
            "/using/events/mouse", 
            "3.4.2 - Mouse Events", 
            "event NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_pressed", 
            "event__NElement_on_mouse_button_pressed"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "event NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_pressed", 
            "event__NElement_on_mouse_button_pressed"),
    ]),
    new IndexEntry("on_mouse_button_released", [
        new IndexReference(
            "/using/events", 
            "3.4 - NWindows Events", 
            "event NEvent<void (int button,NMouseEventArgs&event_args)>  NElement::on_mouse_button_released", 
            "event__NElement_on_mouse_button_released"),
        new IndexReference(
            "/using/events/mouse", 
            "3.4.2 - Mouse Events", 
            "event NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_released", 
            "event__NElement_on_mouse_button_released"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "event NEvent<void (int button,NMouseEventArgs&event_args)> NElement::on_mouse_button_released", 
            "event__NElement_on_mouse_button_released"),
    ]),
    new IndexEntry("on_mouse_enter", [
        new IndexReference(
            "/using/events", 
            "3.4 - NWindows Events", 
            "event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_enter", 
            "event__NElement_on_mouse_enter"),
        new IndexReference(
            "/using/events/mouse", 
            "3.4.2 - Mouse Events", 
            "event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_enter", 
            "event__NElement_on_mouse_enter"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_enter", 
            "event__NElement_on_mouse_enter"),
    ]),
    new IndexEntry("on_mouse_leave", [
        new IndexReference(
            "/using/events", 
            "3.4 - NWindows Events", 
            "event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_leave", 
            "event__NElement_on_mouse_leave"),
        new IndexReference(
            "/using/events/mouse", 
            "3.4.2 - Mouse Events", 
            "event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_leave", 
            "event__NElement_on_mouse_leave"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_leave", 
            "event__NElement_on_mouse_leave"),
    ]),
    new IndexEntry("on_mouse_lost_capture", [
        new IndexReference(
            "/using/events", 
            "3.4 - NWindows Events", 
            "event NEvent<void ()>  NElement::on_mouse_lost_capture", 
            "event__NElement_on_mouse_lost_capture"),
        new IndexReference(
            "/using/events/mouse", 
            "3.4.2 - Mouse Events", 
            "event NEvent<void ()>  NElement::on_mouse_lost_capture", 
            "event__NElement_on_mouse_lost_capture"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "event NEvent<void ()>  NElement::on_mouse_lost_capture", 
            "event__NElement_on_mouse_lost_capture"),
    ]),
    new IndexEntry("on_mouse_move", [
        new IndexReference(
            "/using/events", 
            "3.4 - NWindows Events", 
            "event NEvent<void (NMouseEventArgs&event_args)>  NElement::on_mouse_move", 
            "event__NElement_on_mouse_move"),
        new IndexReference(
            "/using/events/mouse", 
            "3.4.2 - Mouse Events", 
            "event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_move", 
            "event__NElement_on_mouse_move"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "event NEvent<void (NMouseEventArgs&event_args)> NElement::on_mouse_move", 
            "event__NElement_on_mouse_move"),
    ]),
    new IndexEntry("on_selection_changed", [
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "event NEvent<void(const NTextSelection&selection)> NTextEditElement::on_selection_changed", 
            "event__NTextEditElement_on_selection_changed"),
    ]),
    new IndexEntry("on_text_changed", [
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "event NEvent<void(const std::string&)> NTextEditElement::on_text_changed", 
            "event__NTextEditElement_on_text_changed"),
    ]),
    new IndexEntry("on_value_changed", [
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "event NEvent<void (int value)> NDropdownElement::on_value_changed", 
            "event__NDropdownElement_on_value_changed"),
        new IndexReference(
            "/using/events/misc", 
            "3.4.3 - Miscellaneous Events", 
            "event NEvent<void (int value)> NRadioGroupElement::on_value_changed", 
            "event__NRadioGroupElement_on_value_changed"),
    ]),
    new IndexEntry("open", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NMenuElement::open", 
            "property__NMenuElement_open"),
    ]),
    new IndexEntry("operator-", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NPoint NPoint::operator-(const NPoint& other) const", 
            "method__NPoint_operator-"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NRect NRect::operator-(const NPoint& point) const", 
            "method__NRect_operator-"),
    ]),
    new IndexEntry("operator+", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NPoint NPoint::operator+(const NPoint& other) const", 
            "method__NPoint_operator+"),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NRect NRect::operator+(const NPoint& point) const", 
            "method__NRect_operator+"),
    ]),
    new IndexEntry("operator==", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method bool NPoint::operator==(const NPoint& other)", 
            "method__NPoint_operator=="),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method bool NRect::operator==(const NRect& other) const", 
            "method__NRect_operator=="),
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method bool NThickness::operator==(const NThickness& other) const", 
            "method__NThickness_operator=="),
    ]),
    new IndexEntry("orientation", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NRadioGroupElement::orientation", 
            "property__NRadioGroupElement_orientation"),
    ]),
    new IndexEntry("parent", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::parent", 
            "property__NElement_parent"),
    ]),
    new IndexEntry("post", [
        new IndexReference(
            "/using/dispatcher", 
            "3.6 - The NWindows Dispatcher", 
            "method PostHandle NWindow::post(NWindows::clock_t::duration delay, std::function<void(void)>&& func)", 
            "method__NWindow_post"),
        new IndexReference(
            "/using/dispatcher", 
            "3.6 - The NWindows Dispatcher", 
            "method PostHandle NWindow::post(NWindows::clock_t::time_point when, std::function<void(void)>&& func)", 
            "method__NWindow_post"),
        new IndexReference(
            "/using/dispatcher", 
            "3.6 - The NWindows Dispatcher", 
            "method PostHandle NWindow::post(std::function<void(void)>&& func)", 
            "method__NWindow_post"),
    ]),
    new IndexEntry("PostHandle", [
        new IndexReference(
            "/apis/typedefs", 
            "4.3 - Type Definitions", 
            "using PostHandle", 
            "using___PostHandle"),
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
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::print(const char* text)", 
            "method__NElement_print"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::print(const std::string& text, int width)", 
            "method__NElement_print"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::print(const std::string& text, NAlignment alignment, int width)", 
            "method__NElement_print"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::print(const std::string& text)", 
            "method__NElement_print"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::print(const char* text)", 
            "method__NElement_print"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::print(const std::string& text, int max_display_width);", 
            "method__NElement_print"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::print(const std::string& text, NAlignment alignment, int display_width);", 
            "method__NElement_print"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::print(const std::string& text)", 
            "method__NElement_print"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::print(const wchar_t* text)", 
            "method__NElement_print"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void print(const std::u32string& text)", 
            "method___print"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void print(const std::wstring& text)", 
            "method___print"),
    ]),
    new IndexEntry("print_acs", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::print_acs(int x, int y, int acs_character)", 
            "method__NElement_print_acs"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::print_acs(int x, int y, const std::string& alternate_character)", 
            "method__NElement_print_acs"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::print_acs(int x, int y, int alternate_character)", 
            "method__NElement_print_acs"),
    ]),
    new IndexEntry("print_menu_item", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::print_menu_item(const std::string& text, int max_display_width, bool show_underline = true)", 
            "method__NElement_print_menu_item"),
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::print_menu_item(const std::string& text, NAlignment alignment, int display_width, bool show_underline = true)", 
            "method__NElement_print_menu_item"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::print_menu_item(const std::string& text, int max_display_width, bool show_underline = true)", 
            "method__NElement_print_menu_item"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::print_menu_item(const std::string& text, NAlignment alignment, int display_width, bool show_underline = true)", 
            "method__NElement_print_menu_item"),
    ]),
    new IndexEntry("ptr", [
        new IndexReference(
            "/apis/classes/NBoxElement", 
            "4.7.1 - NBoxElement", 
            "using NBoxElement::ptr", 
            "using__NBoxElement_ptr"),
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "using NContainerElement::ptr", 
            "using__NContainerElement_ptr"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "using NElement::ptr", 
            "using__NElement_ptr"),
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "using NTextElement::ptr", 
            "using__NTextElement_ptr"),
        new IndexReference(
            "/apis/classes/NVerticalStackElement", 
            "4.7.7 - NVerticalStackElement", 
            "using NVerticalStackElement::ptr", 
            "using__NVerticalStackElement_ptr"),
        new IndexReference(
            "/apis/classes/NHorizontalStackElement", 
            "4.7.X - NHorizontalStackElement", 
            "using NHorizontalStackElement::ptr", 
            "using__NHorizontalStackElement_ptr"),
    ]),
    new IndexEntry("remove_all_children", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method void NContainerElement::remove_all_children()", 
            "method__NContainerElement_remove_all_children"),
    ]),
    new IndexEntry("remove_child", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method void NContainerElement::remove_child(NElement::ptr child)", 
            "method__NContainerElement_remove_child"),
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method void NContainerElement::remove_child(NElement* child)", 
            "method__NContainerElement_remove_child"),
    ]),
    new IndexEntry("render", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method void render()", 
            "method___render"),
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method void NContainerElement::render()", 
            "method__NContainerElement_render"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::render()", 
            "method__NElement_render"),
    ]),
    new IndexEntry("render_outer", [
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "method virtual void NContainerElement::render_outer()", 
            "method__NContainerElement_render_outer"),
    ]),
    new IndexEntry("request_initial_focus", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::request_initial_focus", 
            "property__NElement_request_initial_focus"),
    ]),
    new IndexEntry("right", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method int NRect::right() const", 
            "method__NRect_right"),
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
        new IndexReference(
            "/apis/classes/NVerticalStackElement", 
            "4.7.7 - NVerticalStackElement", 
            "property NVerticalStackElement::row_gap", 
            "property__NVerticalStackElement_row_gap"),
        new IndexReference(
            "/apis/classes/NHorizontalStackElement", 
            "4.7.X - NHorizontalStackElement", 
            "property NHorizontalStackElement::row_gap", 
            "property__NHorizontalStackElement_row_gap"),
    ]),
    new IndexEntry("run", [
        new IndexReference(
            "/using/windows", 
            "3.3 - NWindows Windows", 
            "method void NWindow::run()", 
            "method__NWindow_run"),
    ]),
    new IndexEntry("screen_to_element", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NPoint NElement::screen_to_element(const NPoint& point) const", 
            "method__NElement_screen_to_element"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NRect screen_to_element(const NRect& rect) const", 
            "method___screen_to_element"),
    ]),
    new IndexEntry("screen_to_window", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NPoint NElement::screen_to_window(const NPoint& point) const", 
            "method__NElement_screen_to_window"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NRect screen_to_window(const NRect& rect) const", 
            "method___screen_to_window"),
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
    new IndexEntry("self", [
        new IndexReference(
            "/apis/classes/NBoxElement", 
            "4.7.1 - NBoxElement", 
            "using NBoxElement::self", 
            "using__NBoxElement_self"),
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "using NContainerElement::self", 
            "using__NContainerElement_self"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "using NElement::self", 
            "using__NElement_self"),
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "using NTextElement::self", 
            "using__NTextElement_self"),
        new IndexReference(
            "/apis/classes/NVerticalStackElement", 
            "4.7.7 - NVerticalStackElement", 
            "using NVerticalStackElement::self", 
            "using__NVerticalStackElement_self"),
        new IndexReference(
            "/apis/classes/NHorizontalStackElement", 
            "4.7.X - NHorizontalStackElement", 
            "using NHorizontalStackElement::self", 
            "using__NHorizontalStackElement_self"),
    ]),
    new IndexEntry("shared_from_this", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method std::shared_ptr<T> NElement::shared_from_this()", 
            "method__NElement_shared_from_this"),
    ]),
    new IndexEntry("simulate_keyboard_click", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method virtual bool NElement::simulate_keyboard_click(NElement* source, int button = 0)", 
            "method__NElement_simulate_keyboard_click"),
    ]),
    new IndexEntry("size", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::size", 
            "property__NElement_size"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::size", 
            "property__NElement_size"),
    ]),
    new IndexEntry("suffix", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NButtonElement::suffix", 
            "property__NButtonElement_suffix"),
    ]),
    new IndexEntry("super", [
        new IndexReference(
            "/apis/classes/NBoxElement", 
            "4.7.1 - NBoxElement", 
            "using NBoxElement::super", 
            "using__NBoxElement_super"),
        new IndexReference(
            "/apis/classes/NContainerElement", 
            "4.7.4 - NContainerElement", 
            "using NContainerElement::super", 
            "using__NContainerElement_super"),
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "using NTextElement::super", 
            "using__NTextElement_super"),
        new IndexReference(
            "/apis/classes/NVerticalStackElement", 
            "4.7.7 - NVerticalStackElement", 
            "using NVerticalStackElement::super", 
            "using__NVerticalStackElement_super"),
        new IndexReference(
            "/apis/classes/NHorizontalStackElement", 
            "4.7.X - NHorizontalStackElement", 
            "using NHorizontalStackElement::super", 
            "using__NHorizontalStackElement_super"),
    ]),
    new IndexEntry("take_focus", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method bool NElement::take_focus()", 
            "method__NElement_take_focus"),
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
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "property NTextElement::text", 
            "property__NTextElement_text"),
    ]),
    new IndexEntry("text_attribute", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextElement::text_attribute", 
            "property__NTextElement_text_attribute"),
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "property NTextElement::text_attribute", 
            "property__NTextElement_text_attribute"),
    ]),
    new IndexEntry("title", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NBoxElement::title", 
            "property__NBoxElement_title"),
        new IndexReference(
            "/apis/classes/NBoxElement", 
            "4.7.1 - NBoxElement", 
            "property NBoxElement::title", 
            "property__NBoxElement_title"),
    ]),
    new IndexEntry("top", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method int NRect::top() const", 
            "method__NRect_top"),
    ]),
    new IndexEntry("top_left", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NPoint NRect::top_left() const", 
            "method__NRect_top_left"),
    ]),
    new IndexEntry("top_right", [
        new IndexReference(
            "/apis/structs", 
            "4.5 - Structs", 
            "method NPoint NRect::top_right() const", 
            "method__NRect_top_right"),
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
            "3.5.4 - Fully-Custom Elements", 
            "method void NElement::vertical_line(int x, int y, int height)", 
            "method__NElement_vertical_line"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method void NElement::vertical_line(int x, int y, int height)", 
            "method__NElement_vertical_line"),
    ]),
    new IndexEntry("wants_shortcut_key", [
        new IndexReference(
            "/using/custom/full", 
            "3.5.4 - Fully-Custom Elements", 
            "method virtual bool NElement::wants_shortcut_key(const std::string& key)", 
            "method__NElement_wants_shortcut_key"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method virtual bool NElement::wants_shortcut_key(const std::string& key)", 
            "method__NElement_wants_shortcut_key"),
    ]),
    new IndexEntry("weak_ptr_from_this", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method std::weak_ptr<T> NElement::weak_ptr_from_this()", 
            "method__NElement_weak_ptr_from_this"),
    ]),
    new IndexEntry("White", [
        new IndexReference(
            "/apis/classes/NColor", 
            "4.7.2 - NColor", 
            "method static NColor NColor::White", 
            "method__NColor_White"),
    ]),
    new IndexEntry("width", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NElement::width", 
            "property__NElement_width"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::width", 
            "property__NElement_width"),
    ]),
    new IndexEntry("window", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "property NElement::window", 
            "property__NElement_window"),
    ]),
    new IndexEntry("window_to_element", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NPoint NElement::window_to_element(const NPoint& point) const", 
            "method__NElement_window_to_element"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NRect window_to_element(const NRect& rect) const", 
            "method___window_to_element"),
    ]),
    new IndexEntry("window_to_screen", [
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NPoint NElement::window_to_screen(const NPoint& point) const", 
            "method__NElement_window_to_screen"),
        new IndexReference(
            "/apis/classes/NElement", 
            "4.7.5 - NElement", 
            "method NRect window_to_screen(const NRect& rect) const", 
            "method___window_to_screen"),
    ]),
    new IndexEntry("wrap_text", [
        new IndexReference(
            "/using/elements", 
            "3.2 - NWindows Elements", 
            "property NTextElement::wrap_text", 
            "property__NTextElement_wrap_text"),
        new IndexReference(
            "/apis/classes/NTextElement", 
            "4.7.6 - NTextElement", 
            "property NTextElement::wrap_text", 
            "property__NTextElement_wrap_text"),
    ]),
]);

const SiteIndexData = () => { return indexData; }
export default  SiteIndexData;

let keywordIndexMap = new Map<string,IndexLink>([
    ["NElement::actual_height", {route: "/apis/classes/NElement", id: "property__NElement_actual_height", classRef: false}],
    ["NElement::actual_size", {route: "/apis/classes/NElement", id: "property__NElement_actual_size", classRef: false}],
    ["NElement::actual_width", {route: "/apis/classes/NElement", id: "property__NElement_actual_width", classRef: false}],
    ["NBoxElement::add_child", {route: "/apis/classes/NBoxElement", id: "method__NBoxElement_add_child", classRef: false}],
    ["NContainerElement::add_child", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_add_child", classRef: false}],
    ["NVerticalStackElement::add_child", {route: "/apis/classes/NVerticalStackElement", id: "method__NVerticalStackElement_add_child", classRef: false}],
    ["NHorizontalStackElement::add_child", {route: "/apis/classes/NHorizontalStackElement", id: "method__NHorizontalStackElement_add_child", classRef: false}],
    ["NContainerElement::add_children<T>", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_add_children<T>", classRef: false}],
    ["NTextElement::alignment", {route: "/apis/classes/NTextElement", id: "property__NTextElement_alignment", classRef: false}],
    ["NVerticalStackElement::alignment", {route: "/apis/classes/NVerticalStackElement", id: "property__NVerticalStackElement_alignment", classRef: false}],
    ["NHorizontalStackElement::alignment", {route: "/apis/classes/NHorizontalStackElement", id: "property__NHorizontalStackElement_alignment", classRef: false}],
    ["NContainerElement::arrange", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_arrange", classRef: false}],
    ["NElement::arrange", {route: "/apis/classes/NElement", id: "method__NElement_arrange", classRef: false}],
    ["NElement::attribute_off", {route: "/apis/classes/NElement", id: "method__NElement_attribute_off", classRef: false}],
    ["NElement::attribute_on", {route: "/apis/classes/NElement", id: "method__NElement_attribute_on", classRef: false}],
    ["NColor::Black", {route: "/apis/classes/NColor", id: "method__NColor_Black", classRef: false}],
    ["NRect::bottom", {route: "/apis/structs", id: "method__NRect_bottom", classRef: false}],
    ["NRect::bottom_left", {route: "/apis/structs", id: "method__NRect_bottom_left", classRef: false}],
    ["NRect::bottom_right", {route: "/apis/structs", id: "method__NRect_bottom_right", classRef: false}],
    ["NRect::bounds", {route: "/apis/structs", id: "method__NRect_bounds", classRef: false}],
    ["NElement::box", {route: "/apis/classes/NElement", id: "method__NElement_box", classRef: false}],
    ["NContainerElement::children", {route: "/apis/classes/NContainerElement", id: "property__NContainerElement_children", classRef: false}],
    ["NElement::clickable", {route: "/apis/classes/NElement", id: "property__NElement_clickable", classRef: false}],
    ["NBoxElement::color", {route: "/apis/classes/NBoxElement", id: "property__NBoxElement_color", classRef: false}],
    ["NTextElement::color", {route: "/apis/classes/NTextElement", id: "property__NTextElement_color", classRef: false}],
    ["NElement::color_off", {route: "/apis/classes/NElement", id: "method__NElement_color_off", classRef: false}],
    ["NElement::color_on", {route: "/apis/classes/NElement", id: "method__NElement_color_on", classRef: false}],
    ["NRect::contains", {route: "/apis/structs", id: "method__NRect_contains", classRef: false}],
    ["NBoxElement::create", {route: "/apis/classes/NBoxElement", id: "method__NBoxElement_create", classRef: false}],
    ["NTextElement::create", {route: "/apis/classes/NTextElement", id: "method__NTextElement_create", classRef: false}],
    ["NVerticalStackElement::create", {route: "/apis/classes/NVerticalStackElement", id: "method__NVerticalStackElement_create", classRef: false}],
    ["NHorizontalStackElement::create", {route: "/apis/classes/NHorizontalStackElement", id: "method__NHorizontalStackElement_create", classRef: false}],
    ["NElement::disabled", {route: "/apis/classes/NElement", id: "property__NElement_disabled", classRef: false}],
    ["NMenuItem::display_checkmark", {route: "/apis/structs", id: "method__NMenuItem_display_checkmark", classRef: false}],
    ["NMenuItem::Divider", {route: "/apis/structs", id: "method__NMenuItem_Divider", classRef: false}],
    ["NElement::element_to_screen", {route: "/apis/classes/NElement", id: "method__NElement_element_to_screen", classRef: false}],
    ["NElement::element_to_window", {route: "/apis/classes/NElement", id: "method__NElement_element_to_window", classRef: false}],
    ["NContainerElement::find_child_element", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_find_child_element", classRef: false}],
    ["NElement::focusable", {route: "/apis/classes/NElement", id: "property__NElement_focusable", classRef: false}],
    ["NContainerElement::for_each_element", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_for_each_element", classRef: false}],
    ["NElement::for_each_element", {route: "/apis/classes/NElement", id: "method__NElement_for_each_element", classRef: false}],
    ["NContainerElement::get_element_at", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_get_element_at", classRef: false}],
    ["NElement::get_element_at", {route: "/apis/classes/NElement", id: "method__NElement_get_element_at", classRef: false}],
    ["NElement::get_element_by_id<T>", {route: "/apis/classes/NElement", id: "method__NElement_get_element_by_id<T>", classRef: false}],
    ["NElement::height", {route: "/apis/classes/NElement", id: "property__NElement_height", classRef: false}],
    ["NElement::horizontal_line", {route: "/apis/classes/NElement", id: "method__NElement_horizontal_line", classRef: false}],
    ["NRect::inflate", {route: "/apis/structs", id: "method__NRect_inflate", classRef: false}],
    ["NRect::inset", {route: "/apis/structs", id: "method__NRect_inset", classRef: false}],
    ["NRect::intersect", {route: "/apis/structs", id: "method__NRect_intersect", classRef: false}],
    ["NElement::invalidate_layout", {route: "/apis/classes/NElement", id: "method__NElement_invalidate_layout", classRef: false}],
    ["NContainerElement::invalidate_render", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_invalidate_render", classRef: false}],
    ["NElement::invalidate_render", {route: "/apis/classes/NElement", id: "method__NElement_invalidate_render", classRef: false}],
    ["NElement::is_cancel", {route: "/apis/classes/NElement", id: "property__NElement_is_cancel", classRef: false}],
    ["NContainerElement::is_container", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_is_container", classRef: false}],
    ["NElement::is_container", {route: "/apis/classes/NElement", id: "property__NElement_is_container", classRef: false}],
    ["NElement::is_default", {route: "/apis/classes/NElement", id: "property__NElement_is_default", classRef: false}],
    ["NMenuItem::is_divider", {route: "/apis/structs", id: "method__NMenuItem_is_divider", classRef: false}],
    ["NElement::is_focused", {route: "/apis/classes/NElement", id: "property__NElement_is_focused", classRef: false}],
    ["NElement::is_menu_item_shortcut_key", {route: "/apis/classes/NElement", id: "method__NElement_is_menu_item_shortcut_key", classRef: false}],
    ["NElement::keyboard_clicking", {route: "/apis/classes/NElement", id: "method__NElement_keyboard_clicking", classRef: false}],
    ["NRect::left", {route: "/apis/structs", id: "method__NRect_left", classRef: false}],
    ["NElement::margin", {route: "/apis/classes/NElement", id: "property__NElement_margin", classRef: false}],
    ["NContainerElement::measure", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_measure", classRef: false}],
    ["NElement::measure", {route: "/apis/classes/NElement", id: "method__NElement_measure", classRef: false}],
    ["NContainerElement::measure_child_with_margins", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_measure_child_with_margins", classRef: false}],
    ["NElement::measure_menu_text", {route: "/apis/classes/NElement", id: "method__NElement_measure_menu_text", classRef: false}],
    ["NElement::measure_text", {route: "/apis/classes/NElement", id: "method__NElement_measure_text", classRef: false}],
    ["NElement::measured", {route: "/apis/classes/NElement", id: "property__NElement_measured", classRef: false}],
    ["NElement::mouse_entered", {route: "/apis/classes/NElement", id: "property__NElement_mouse_entered", classRef: false}],
    ["NElement::move", {route: "/apis/classes/NElement", id: "method__NElement_move", classRef: false}],
    ["NAlignment", {route: "/apis/enums", id: "enum__NAlignment", classRef: false}],
    ["NAttachment", {route: "/apis/enums", id: "enum__NAttachment", classRef: false}],
    ["NAttribute", {route: "/apis/classes/NTextElement", id: "enum__NAttribute", classRef: false}],
    ["NBoxElement", {route: "/apis/classes/NBoxElement", id: "class__NBoxElement", classRef: true}],
    ["NClickedEventArgs::NClickedEventArgs", {route: "/apis/structs", id: "method__NClickedEventArgs_NClickedEventArgs", classRef: false}],
    ["NClickedEventArgs", {route: "/apis/structs", id: "struct__NClickedEventArgs", classRef: false}],
    ["NColor", {route: "/apis/classes/NColor", id: "class__NColor", classRef: true}],
    ["NColor::NColor", {route: "/apis/classes/NColor", id: "method__NColor_NColor", classRef: false}],
    ["NColorPair", {route: "/apis/classes/NColorPair", id: "class__NColorPair", classRef: true}],
    ["NColorPalette", {route: "/apis/structs", id: "struct__NColorPalette", classRef: false}],
    ["NContainerElement", {route: "/apis/classes/NContainerElement", id: "class__NContainerElement", classRef: true}],
    ["NContainerElement::NContainerElement", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_NContainerElement", classRef: false}],
    ["NElement", {route: "/apis/classes/NElement", id: "class__NElement", classRef: true}],
    ["NElement::NElement", {route: "/apis/classes/NElement", id: "method__NElement_NElement", classRef: false}],
    ["NEventArgsBase::NEventArgsBase", {route: "/apis/structs", id: "method__NEventArgsBase_NEventArgsBase", classRef: false}],
    ["NEventArgsBase", {route: "/apis/structs", id: "struct__NEventArgsBase", classRef: false}],
    ["NHorizontalStackElement", {route: "/apis/classes/NHorizontalStackElement", id: "class__NHorizontalStackElement", classRef: true}],
    ["NHorizontalStackElement::NHorizontalStackElement", {route: "/apis/classes/NHorizontalStackElement", id: "method__NHorizontalStackElement_NHorizontalStackElement", classRef: false}],
    ["NKeyEventArgs::NKeyEventArgs", {route: "/apis/structs", id: "method__NKeyEventArgs_NKeyEventArgs", classRef: false}],
    ["NKeyEventArgs", {route: "/apis/structs", id: "struct__NKeyEventArgs", classRef: false}],
    ["NMenuItem::NMenuItem", {route: "/apis/structs", id: "method__NMenuItem_NMenuItem", classRef: false}],
    ["NMenuItem", {route: "/apis/structs", id: "struct__NMenuItem", classRef: false}],
    ["NMouseEventArgs::NMouseEventArgs", {route: "/apis/structs", id: "method__NMouseEventArgs_NMouseEventArgs", classRef: false}],
    ["NMouseEventArgs", {route: "/apis/structs", id: "struct__NMouseEventArgs", classRef: false}],
    ["NNavDirection", {route: "/apis/enums", id: "enum__NNavDirection", classRef: false}],
    ["NMenuItem::NO_ITEM_ID", {route: "/apis/structs", id: "constant__NMenuItem_NO_ITEM_ID", classRef: false}],
    ["NOrientation", {route: "/apis/enums", id: "enum__NOrientation", classRef: false}],
    ["NPoint::NPoint", {route: "/apis/structs", id: "method__NPoint_NPoint", classRef: false}],
    ["NPoint", {route: "/apis/structs", id: "struct__NPoint", classRef: false}],
    ["NRect::NRect", {route: "/apis/structs", id: "method__NRect_NRect", classRef: false}],
    ["NRect", {route: "/apis/structs", id: "struct__NRect", classRef: false}],
    ["NSize::NSize", {route: "/apis/structs", id: "method__NSize_NSize", classRef: false}],
    ["NSize", {route: "/apis/structs", id: "struct__NSize", classRef: false}],
    ["NTextElement", {route: "/apis/classes/NTextElement", id: "class__NTextElement", classRef: true}],
    ["NThickness::NThickness", {route: "/apis/structs", id: "method__NThickness_NThickness", classRef: false}],
    ["NThickness", {route: "/apis/structs", id: "struct__NThickness", classRef: false}],
    ["NVerticalStackElement", {route: "/apis/classes/NVerticalStackElement", id: "class__NVerticalStackElement", classRef: true}],
    ["NVerticalStackElement::NVerticalStackElement", {route: "/apis/classes/NVerticalStackElement", id: "method__NVerticalStackElement_NVerticalStackElement", classRef: false}],
    ["NElement::on_clicked", {route: "/apis/classes/NElement", id: "event__NElement_on_clicked", classRef: false}],
    ["NElement::on_key", {route: "/apis/classes/NElement", id: "event__NElement_on_key", classRef: false}],
    ["NElement::on_key_code", {route: "/apis/classes/NElement", id: "event__NElement_on_key_code", classRef: false}],
    ["NElement::on_mouse_button_pressed", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_button_pressed", classRef: false}],
    ["NElement::on_mouse_button_released", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_button_released", classRef: false}],
    ["NElement::on_mouse_enter", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_enter", classRef: false}],
    ["NElement::on_mouse_leave", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_leave", classRef: false}],
    ["NElement::on_mouse_lost_capture", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_lost_capture", classRef: false}],
    ["NElement::on_mouse_move", {route: "/apis/classes/NElement", id: "event__NElement_on_mouse_move", classRef: false}],
    ["NPoint::operator-", {route: "/apis/structs", id: "method__NPoint_operator-", classRef: false}],
    ["NRect::operator-", {route: "/apis/structs", id: "method__NRect_operator-", classRef: false}],
    ["NPoint::operator+", {route: "/apis/structs", id: "method__NPoint_operator+", classRef: false}],
    ["NRect::operator+", {route: "/apis/structs", id: "method__NRect_operator+", classRef: false}],
    ["NPoint::operator==", {route: "/apis/structs", id: "method__NPoint_operator==", classRef: false}],
    ["NRect::operator==", {route: "/apis/structs", id: "method__NRect_operator==", classRef: false}],
    ["NThickness::operator==", {route: "/apis/structs", id: "method__NThickness_operator==", classRef: false}],
    ["NElement::parent", {route: "/apis/classes/NElement", id: "property__NElement_parent", classRef: false}],
    ["NElement::print", {route: "/apis/classes/NElement", id: "method__NElement_print", classRef: false}],
    ["NElement::print_acs", {route: "/apis/classes/NElement", id: "method__NElement_print_acs", classRef: false}],
    ["NElement::print_menu_item", {route: "/apis/classes/NElement", id: "method__NElement_print_menu_item", classRef: false}],
    ["NBoxElement::ptr", {route: "/apis/classes/NBoxElement", id: "using__NBoxElement_ptr", classRef: false}],
    ["NContainerElement::ptr", {route: "/apis/classes/NContainerElement", id: "using__NContainerElement_ptr", classRef: false}],
    ["NElement::ptr", {route: "/apis/classes/NElement", id: "using__NElement_ptr", classRef: false}],
    ["NTextElement::ptr", {route: "/apis/classes/NTextElement", id: "using__NTextElement_ptr", classRef: false}],
    ["NVerticalStackElement::ptr", {route: "/apis/classes/NVerticalStackElement", id: "using__NVerticalStackElement_ptr", classRef: false}],
    ["NHorizontalStackElement::ptr", {route: "/apis/classes/NHorizontalStackElement", id: "using__NHorizontalStackElement_ptr", classRef: false}],
    ["NContainerElement::remove_all_children", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_remove_all_children", classRef: false}],
    ["NContainerElement::remove_child", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_remove_child", classRef: false}],
    ["NContainerElement::render", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_render", classRef: false}],
    ["NElement::render", {route: "/apis/classes/NElement", id: "method__NElement_render", classRef: false}],
    ["NContainerElement::render_outer", {route: "/apis/classes/NContainerElement", id: "method__NContainerElement_render_outer", classRef: false}],
    ["NElement::request_initial_focus", {route: "/apis/classes/NElement", id: "property__NElement_request_initial_focus", classRef: false}],
    ["NRect::right", {route: "/apis/structs", id: "method__NRect_right", classRef: false}],
    ["NVerticalStackElement::row_gap", {route: "/apis/classes/NVerticalStackElement", id: "property__NVerticalStackElement_row_gap", classRef: false}],
    ["NHorizontalStackElement::row_gap", {route: "/apis/classes/NHorizontalStackElement", id: "property__NHorizontalStackElement_row_gap", classRef: false}],
    ["NElement::screen_to_element", {route: "/apis/classes/NElement", id: "method__NElement_screen_to_element", classRef: false}],
    ["NElement::screen_to_window", {route: "/apis/classes/NElement", id: "method__NElement_screen_to_window", classRef: false}],
    ["NBoxElement::self", {route: "/apis/classes/NBoxElement", id: "using__NBoxElement_self", classRef: false}],
    ["NContainerElement::self", {route: "/apis/classes/NContainerElement", id: "using__NContainerElement_self", classRef: false}],
    ["NElement::self", {route: "/apis/classes/NElement", id: "using__NElement_self", classRef: false}],
    ["NTextElement::self", {route: "/apis/classes/NTextElement", id: "using__NTextElement_self", classRef: false}],
    ["NVerticalStackElement::self", {route: "/apis/classes/NVerticalStackElement", id: "using__NVerticalStackElement_self", classRef: false}],
    ["NHorizontalStackElement::self", {route: "/apis/classes/NHorizontalStackElement", id: "using__NHorizontalStackElement_self", classRef: false}],
    ["NElement::shared_from_this", {route: "/apis/classes/NElement", id: "method__NElement_shared_from_this", classRef: false}],
    ["NElement::simulate_keyboard_click", {route: "/apis/classes/NElement", id: "method__NElement_simulate_keyboard_click", classRef: false}],
    ["NElement::size", {route: "/apis/classes/NElement", id: "property__NElement_size", classRef: false}],
    ["NBoxElement::super", {route: "/apis/classes/NBoxElement", id: "using__NBoxElement_super", classRef: false}],
    ["NContainerElement::super", {route: "/apis/classes/NContainerElement", id: "using__NContainerElement_super", classRef: false}],
    ["NTextElement::super", {route: "/apis/classes/NTextElement", id: "using__NTextElement_super", classRef: false}],
    ["NVerticalStackElement::super", {route: "/apis/classes/NVerticalStackElement", id: "using__NVerticalStackElement_super", classRef: false}],
    ["NHorizontalStackElement::super", {route: "/apis/classes/NHorizontalStackElement", id: "using__NHorizontalStackElement_super", classRef: false}],
    ["NElement::take_focus", {route: "/apis/classes/NElement", id: "method__NElement_take_focus", classRef: false}],
    ["NTextElement::text", {route: "/apis/classes/NTextElement", id: "property__NTextElement_text", classRef: false}],
    ["NTextElement::text_attribute", {route: "/apis/classes/NTextElement", id: "property__NTextElement_text_attribute", classRef: false}],
    ["NBoxElement::title", {route: "/apis/classes/NBoxElement", id: "property__NBoxElement_title", classRef: false}],
    ["NRect::top", {route: "/apis/structs", id: "method__NRect_top", classRef: false}],
    ["NRect::top_left", {route: "/apis/structs", id: "method__NRect_top_left", classRef: false}],
    ["NRect::top_right", {route: "/apis/structs", id: "method__NRect_top_right", classRef: false}],
    ["NElement::vertical_line", {route: "/apis/classes/NElement", id: "method__NElement_vertical_line", classRef: false}],
    ["NElement::wants_shortcut_key", {route: "/apis/classes/NElement", id: "method__NElement_wants_shortcut_key", classRef: false}],
    ["NElement::weak_ptr_from_this", {route: "/apis/classes/NElement", id: "method__NElement_weak_ptr_from_this", classRef: false}],
    ["NColor::White", {route: "/apis/classes/NColor", id: "method__NColor_White", classRef: false}],
    ["NElement::width", {route: "/apis/classes/NElement", id: "property__NElement_width", classRef: false}],
    ["NElement::window", {route: "/apis/classes/NElement", id: "property__NElement_window", classRef: false}],
    ["NElement::window_to_element", {route: "/apis/classes/NElement", id: "method__NElement_window_to_element", classRef: false}],
    ["NElement::window_to_screen", {route: "/apis/classes/NElement", id: "method__NElement_window_to_screen", classRef: false}],
    ["NTextElement::wrap_text", {route: "/apis/classes/NTextElement", id: "property__NTextElement_wrap_text", classRef: false}],
]);

export function KeywordIndexMap(): Map<string,IndexLink> {
    return keywordIndexMap; 
}    