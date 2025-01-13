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

#pragma once

#include "ncurses.h" 
#include "panel.h"
#include <memory> 
#include <string>
#include <vector> 
#include <limits> 
#include <optional> 
#include <chrono> 
#include <mutex> 
#include <list> 
#include <map> 
#include <concepts> 
#include <array>
#include "NEvent.hpp"
#include "NClipboard.hpp"
#include "NUtf8.hpp"

#include "NWindowsVersionInfo.hpp"


#ifndef DEBUG_NELEMENT_LIFECYCLE
#define DEBUG_NELEMENT_LIFECYCLE 0
#endif

namespace nwindows
{
    class NWindow;
    class NPopupWindow;
    class NPopupMenuWindow;
    class UnicodeServices;
    class Collator;
    class UnicodeNormalizer;
    class NContainerElement;

    constexpr int AUTO_SIZE = std::numeric_limits<int>::min();

    class NContainerElement;
    class NWindow;
    class NElement;


    using PostHandle = uint64_t;

    enum class NAttribute : attr_t
    {
        Normal = A_NORMAL,         // Normal display (no highlight)
        Underline = A_UNDERLINE,   //    Underlining
        Bold = A_BOLD,             //          Extra bright or bold

        Standout = A_STANDOUT,     // Best highlighting mode of the terminal.
        Reverse = A_REVERSE,       // Reverse video
        Blink = A_BLINK,           //         Blinking
        Dim = A_DIM,               //          Half bright
        Protect = A_PROTECT,       //       Protected mode
        Invisible = A_INVIS,       // Invisible or blank mode
        AltCharSet = A_ALTCHARSET, // //A_ALTCHARSET    Alternate character set
        CharText = A_CHARTEXT,     // A_CHARTEXT      Bit-mask to extract a character
        // COLOR_PAIR(n)   Color-pair number n
    };

    enum class NAttachment {
        TopStart,
        TopEnd,
        BottomStart,
        BottomEnd,
        CenterOnAnchor,
        ContextMenu,
        Submenu,

        // anticipating future implementation of bi-directional layout.
        TopLeft = TopStart,
        TopRight = TopEnd,
        BottomLeft = BottomStart,
        BottomRight = BottomEnd

    };

    enum class NNavDirection {
        Left,
        Right,
        Up,
        Down,
        Tab,  // same as left, but cycles.
        ReverseTab, // same as right, but cycles.
        Home,
        End
    };

    enum class NAlignment {
        Start,
        Center,
        End,
        Justify
    };

    struct NMenuItem {
        static constexpr int NO_ITEM_ID = std::numeric_limits<int>::min();
        NMenuItem() {}
        NMenuItem(const std::string &label, int item_id, bool enabled = true)
            : label(label), item_id(item_id), enabled(enabled) {
        }
        NMenuItem(const std::string& label, const std::vector<NMenuItem>& submenu, bool enabled = true)
            : label(label), item_id(NO_ITEM_ID), enabled(enabled), submenu(submenu) {
        }
        NMenuItem(const std::string&& label, std::vector<NMenuItem>&& submenu, bool enabled = true)
            : label(label), item_id(NO_ITEM_ID), enabled(enabled), submenu(std::move(submenu)) {
        }

        static NMenuItem Divider() { return NMenuItem{ "-",NO_ITEM_ID,false }; }

        std::string label;
        int item_id = NO_ITEM_ID;
        bool enabled = true;
        bool display_check = false;
        bool checked = false;
        std::string icon;
        std::vector<NMenuItem> submenu;

        NMenuItem& display_checkmark(bool checked) {
            this->display_check = true;
            this->checked = checked;
            return *this;
        }
        bool is_divider() const { return label == "-"; }
    };

    enum class NOrientation { Horizontal, Vertical };

    class NColor
    {
    private:
        // only NWindow can create colors.
        friend class NWindow;
        NColor(short color_index) : color_index_(color_index) {}

    public:
        NColor() : color_index_(0) {}

        short color_index() const { return color_index_; }

        static const NColor Black;
        static const NColor White;
        bool operator==(const NColor& other) const { return color_index_ == other.color_index_; }
    private:
        short color_index_;
    };

    class NColorPair {
    public:
        bool operator==(const NColorPair& other) const {
            return attr == other.attr;
        }
        NColorPair() { attr = COLOR_PAIR(0); }
        attr_t attribute() const { return attr; }
    private:
        friend class NWindow;
        explicit NColorPair(attr_t attr) : attr(attr) {}
        attr_t attr;
    };


    struct NColorPalette {

        uint32_t Black = 0x000000;
        uint32_t White = 0xC0C0C0;
        uint32_t DesktopBackground = 0x000000;
        uint32_t WindowFrameBackground = 0x000000;
        uint32_t WindowFrameForeground = 0xC0C0C0;
        uint32_t BrightWhite = 0xFFFFFF;
        uint32_t Disabled = 0x808080;
        uint32_t HoverBackground = 0x686868;
        uint32_t HoverForeground = BrightWhite;
        uint32_t FocusBackground = 0x585858;
        uint32_t FocusForeground = BrightWhite;
        uint32_t SelectedBackground = 0x808080;
        uint32_t SelectedForeground = BrightWhite;
        uint32_t Error = 0xE00000;
    };

    struct NPoint {

        NPoint() : x(0), y(0) {}
        NPoint(int x, int y) : x(x), y(y) {}
        int x, y;

        bool operator==(const NPoint& other) const {
            return x == other.x && y == other.y;
        }
        NPoint operator+(const NPoint& other) const {
            return NPoint(x + other.x, y + other.y);
        }
        NPoint operator-(const NPoint& other) const {
            return NPoint(x - other.x, y - other.y);
        }
        NPoint operator-() const { return NPoint(-x,-y); }
    };
    struct NThickness
    {
        NThickness() : left(0), top(0), right(0), bottom(0) {}
        NThickness(int thickness) : left(thickness), top(thickness), right(thickness), bottom(thickness) {}
        NThickness(int left, int top, int right, int bottom) : left(left), top(top), right(right), bottom(bottom) {}

        int left, top, right, bottom;

        bool operator==(const NThickness& other) const;
    };

    struct NSize
    {
        NSize() : width(0), height(0) {}
        NSize(int width, int height) : width(width), height(height) {}

        bool operator==(const NSize& other) const
        {
            return this->width == other.width && this->height == other.height;
        }

        int width, height;
    };


    struct NRect
    {
        NRect()
            : x(0), y(0), width(0), height(0)
        {
        }
        NRect(int x, int y, int width, int height)
            : x(x), y(y), width(width), height(height)
        {
        }
        NRect(const NPoint& pt, const NSize& size)
            : x(pt.x), y(pt.y), width(size.width), height(size.height)
        {
        }

        bool operator==(const NRect& other) const;

        bool contains(int x, int y) const {
            return x >= this->x && x < this->right() && y >= this->y && y < this->bottom();
        }
        bool contains(const NPoint& point) const {
            return point.x >= this->x && point.x < this->right() && point.y >= this->y && point.y < this->bottom();
        }

        int x = 0, y = 0, width, height;

        int left() const { return x; }
        int right() const { return x + width; }
        int top() const { return y; }
        int bottom() const { return y + height; }

        NPoint top_left() const { return NPoint(left(), top()); }
        NPoint top_right() const { return NPoint(right(), top()); }
        NPoint bottom_left() const { return NPoint(left(), bottom()); }
        NPoint bottom_right() const { return NPoint(right(), bottom()); }


        NRect inset(const NThickness& thickness) const;
        NRect inflate(const NThickness&thickness) const;

        NRect intersect(const NRect& other) const;
        NRect bounds(const NRect& other) const;

        NRect operator+(const NPoint& point) const {
            return NRect(x + point.x, y + point.y, width, height);
        }
        NRect operator-(const NPoint& point) const {
            return NRect(x - point.x, y - point.y, width, height);
        }
    };


    struct NEventArgsBase {
        NEventArgsBase(NElement* source);
        std::shared_ptr<NElement> source;
        std::shared_ptr<NWindow> window;
        bool handled = false;
    };
    struct NKeyEventArgs : public NEventArgsBase {
        NKeyEventArgs(NElement* source, char32_t key) : NEventArgsBase(source), key(key) {}
        std::shared_ptr<NElement> target;
        char32_t key = 0;
    };
    struct NKeyCodeEventArgs : public NEventArgsBase {
        NKeyCodeEventArgs(NElement* source, int key_code) : NEventArgsBase(source), key_code(key_code) {}
        std::shared_ptr<NElement> target;
        int key_code;
    };

    struct NClickedEventArgs : public NEventArgsBase {
        NClickedEventArgs(
            NElement* source, NElement* target, const NRect& location, bool is_mouse_click);

        std::shared_ptr<NElement> target = nullptr;
        bool is_mouse_click = false;
        NRect location;
        bool alt = false;
        bool ctrl = false;
        bool shift = false;
    };

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


    };

    class NElement : public std::enable_shared_from_this<NElement>
    {
    private:
        NElement() : NElement("Element") {}
    protected:
        NElement(const std::string& elementTag);

        NElement(const NElement& other) = delete;
        NElement(NElement&& other) = delete;
        NElement& operator=(const NElement& other) = delete;
        NElement& operator=(NElement&& other) = delete;

        void tag(const std::string& tag) { tag_ = tag; }


    public:
        template <typename T = NElement>
        std::shared_ptr<T> shared_from_this() {
            return std::dynamic_pointer_cast<T>(
                this->std::enable_shared_from_this<NElement>::shared_from_this()
            );
        }
        template <typename T = NElement>
        std::weak_ptr<T> weak_from_this() {
            return shared_from_this<T>();
        }

        using self = NElement;
        using ptr = std::shared_ptr<self>;
        static ptr create() { return std::shared_ptr<self>(new NElement()); }
        virtual ~NElement();

        const std::string& tag() { return tag_; }

        const std::string& id() { return id_; }
        void id(const std::string& value) { id_ = value; }

        int width() const { return width_; }
        virtual void width(int value);

        int height() const { return height_; }
        virtual void height(int value);


        const NSize size() { return NSize(width_,height_); }
        void size(const NSize& size);

        virtual bool is_container() const { return false; }



        const NThickness& margin() const { return margin_; }
        void margin(const NThickness& margin);

        const NRect& bounds() const { return bounds_; }

        int actual_width() const { return bounds_.width; }
        int actual_height() const { return bounds_.height; }
        NSize actual_size() const { return NSize(bounds_.width,bounds_.height); }


        bool focusable() const { return focusable_; }
        virtual void focusable(bool value) { focusable_ = value; }

        bool mouse_entered() const { return mouse_entered_; }

        bool take_focus();
        bool focused() const;


        bool clickable() const { return clickable_; }
        virtual void clickable(bool value) { clickable_ = value; }

        bool disabled() const { return disabled_; }
        virtual void disabled(bool value);

        bool request_initial_focus() { return request_initial_focus_; }
        virtual void request_initial_focus(bool value) { request_initial_focus_ = value; }


        bool is_default() const { return is_default_; }
        virtual void is_default(bool value) { is_default_ = value; }
        bool is_cancel() const { return is_cancel_; }
        virtual void is_cancel(bool value) { is_cancel_ = value; }


        virtual NElement::ptr get_element_at(int x, int y);
        NElement::ptr get_element_at(const NPoint& pt) { return get_element_at(pt.x, pt.y); }

        template<typename T = NElement>
        T::ptr get_element_by_id(const std::string& id)
        {
            return std::dynamic_pointer_cast<T>(
                find_child_element([id](NElement& element) { return element.id() == id; }));
        }

        NEvent<void(NWindow* window)> on_attached;
        NEvent<void()> on_detaching;
        NEvent<void(bool focused)> on_focused;
        NEvent<void(int button, NClickedEventArgs& event_args)>  on_clicked;
        NEvent<void(int button, NMouseEventArgs& event_args)> on_mouse_button_pressed;
        NEvent<void(int button, NMouseEventArgs& event_args)>  on_mouse_button_released;
        NEvent<void(NMouseEventArgs& event_args)>  on_mouse_move;
        NEvent<void()>  on_mouse_lost_capture;
        NEvent<void(NMouseEventArgs& event_args)> on_mouse_enter;
        NEvent<void(NMouseEventArgs& event_args)> on_mouse_leave;

        NEvent<void(NKeyEventArgs& event_args)> on_key;
        NEvent<void(NKeyCodeEventArgs& event_args)> on_key_code;

#ifdef DEBUG_NELEMENT_LIFECYCLE
        static int64_t allocated_element_count();
#endif
        NWindow* window() { return window_; }
        const NWindow* window() const { return window_; }

        virtual bool wants_shortcut_key(const std::string& key);

        virtual NSize measure(const NSize& available);
        virtual void arrange(const NRect& bounds) { this->bounds_ = bounds; }

        NPoint window_to_screen(const NPoint& point) const;
        NPoint screen_to_window(const NPoint& point) const;
        NPoint element_to_screen(const NPoint& point) const;
        NPoint screen_to_element(const NPoint& point) const;
        NPoint element_to_window(const NPoint& point) const;
        NPoint window_to_element(const NPoint& point) const;

        NRect window_to_screen(const NRect& rect) const;
        NRect screen_to_window(const NRect& rect) const;
        NRect element_to_screen(const NRect& rect) const;
        NRect screen_to_element(const NRect& rect) const;
        NRect element_to_window(const NRect& rect) const;
        NRect window_to_element(const NRect& rect) const;


    public:
        NSize measured() const { return measured_; }
        void measured(const NSize& value) { this->measured_ = value; }



    protected:
        virtual void render() {}

        void move(int x, int y);

        int measure_text(const std::string& text);

        void print(const char* text);
        void print(const std::string& text);
        void print(const std::string& text, int max_display_width);
        void print(const std::string&text, NAlignment alignment, int display_width);
        void print_acs(int x, int y, int alternate_character);

        void box(const NRect& rect, const std::optional<NColorPair>& colorPair = std::nullopt);
        void horizontal_line(int x, int y, int width);
        void vertical_line(int x, int y, int height);

        int measure_menu_text(const std::string& text);
        void print_menu_text(const std::string& text);
        void print_menu_text(const std::string& text, int max_display_width, bool show_underline = true);
        void print_menu_text(
            const std::string& text,
            NAlignment alignment,
            int display_width,
            bool show_underline = true);
        bool is_menu_item_shortcut_key(const char32_t c, const std::string& text);
        bool is_menu_item_shortcut_key(const std::string& utf8key, const std::string& text);



        void attribute_on(NAttribute attr);
        void attribute_off(NAttribute attr);

        void color_on(NColorPair colorPair);
        void color_off(NColorPair colorPair);


        void print(const wchar_t* text);
        void print(const std::wstring& text);
        void print(const std::u32string& text);


    protected:
        virtual bool handle_key(NKeyEventArgs& event_args);
        virtual bool handle_key_code(NKeyCodeEventArgs& event_args);
        virtual bool handle_clicked(int button, NClickedEventArgs& eventArgs);
        virtual bool handle_mouse_button_clicked(int button, NMouseEventArgs& event_args);
        virtual bool handle_mouse_button_pressed(int button, NMouseEventArgs& event_args);
        virtual bool handle_mouse_button_released(int button, NMouseEventArgs& event_args);
        // only received after NWindow::mouse_capture() is called.
        virtual bool handle_mouse_move(NMouseEventArgs& event_args);
        virtual void handle_mouse_lost_capture();
        virtual bool handle_mouse_enter(NMouseEventArgs& event_args);
        virtual bool handle_mouse_leave(NMouseEventArgs& event_args);
        virtual void handle_focused(bool);


        NElement* parent()
        {
            return this->parent_;
        }

        void invalidate_layout();
        virtual void invalidate_render();

        virtual void handle_attached(NWindow* window);
        virtual void handle_detaching();


        virtual NElement::ptr find_child_element(const std::function<bool(NElement&)>& predicate);

        virtual void for_each_element(const std::function<void(NElement&)>& callback);

        virtual bool simulate_keyboard_click(NElement* source, int button = 0);
        bool keyboard_clicking() const { return keyboard_clicking_; }


    private:
        bool request_initial_focus_ = false;
        friend class NContainerElement;
        virtual void parent(NElement* value) {
            this->parent_ = value;
        }

        virtual void parent(NElement::ptr value) {
            parent(value.get());
        }

        std::string id_;
        bool render_valid_ = false;
        PostHandle keyboard_clicking_timer_ = 0;
        void cancel_keyboard_clicking_timer();

        bool keyboard_clicking_ = false;
        bool is_default_ = false;
        bool is_cancel_ = false;

        std::string tag_;
        bool mouse_entered_ = false;

        int width_ = AUTO_SIZE;
        int height_ = AUTO_SIZE;

        friend class NContainerElement;
        friend class NWindow;


        virtual void render_outer();
        virtual void set_window(NWindow* window);

        NElement* parent_ = nullptr;
        NWindow* window_ = nullptr;

        bool layout_valid_ = false;
        NRect bounds_;
        NThickness margin_;
        NSize measured_;
        bool focusable_ = false;
        bool clickable_ = false;
        bool disabled_ = false;
    };

    class NTextElement : public NElement
    {
    protected:
        NTextElement(const std::string& text);

    public:
        using super = NElement;
        using self = NTextElement;
        using ptr = std::shared_ptr<NTextElement>;

        static ptr create(const std::string& text) { return std::shared_ptr<NTextElement>(new self(text)); }
        static ptr create(const std::string& text, NAttribute attribute)
        {
            ptr result = create(text);
            result->text_attribute(attribute);
            return result;
        }
        static ptr create() { return create(""); }


        virtual ~NTextElement() {}

        const std::string& text() const { return text_; }
        void text(const std::string& value);

        void color(const std::optional<NColorPair>& value);
        const std::optional<NColorPair>& color() const { return color_; }


        void alignment(NAlignment value);
        NAlignment alignment() const { return alignment_; }

        void wrap_text(bool value);
        bool wrap_text() const { return wrap_text_; }

        virtual NSize measure(const NSize& available) override;
        virtual void render() override;

        void text_attribute(std::optional<NAttribute> value) { text_attribute_ = value; }
        std::optional<NAttribute> text_attribute() const { return text_attribute_; }



    private:
        NAlignment alignment_ = NAlignment::Start;
        bool wrap_text_ = false;
        std::string text_;
        std::optional<NAttribute> text_attribute_;
        std::optional<NColorPair> color_;
        std::vector<std::string> lines_;
    };


    class NContainerElement : public NElement
    {
    protected:
        NContainerElement(const std::string& tag) : NElement(tag) {}
    public:
        ~NContainerElement();
        using ptr = std::shared_ptr<NContainerElement>;
        using self = NContainerElement;
        using super = NElement;

        virtual bool is_container() const { return true; }

        // Do not add or remove children directly.  Use add_child and remove_child.
        std::vector<NElement::ptr>& children() { return children_; }
        const std::vector<NElement::ptr>& children() const { return children_; }

        virtual void add_child(const NElement::ptr& child);
        virtual void add_child(NElement::ptr&& child);

        template <typename T>
        void add_children(const std::vector<std::shared_ptr<T>>& children) {
            for (auto& child : children) {
                add_child(child);
            }
        }
        void remove_child(NElement::ptr child);
        void remove_child(NElement* child);
        void remove_all_children();

        virtual NSize measure(const NSize& available) override;
        virtual void arrange(const NRect& rect) override;
        virtual void render();

        virtual NElement::ptr get_element_at(int x, int y) override;
        NElement::ptr get_element_at(const NPoint& pt) { return get_element_at(pt.x, pt.y); }

        virtual NElement::ptr find_child_element(const std::function<bool(NElement&)>& predicate) override;
        virtual void for_each_element(const std::function<void(NElement&)>& callback) override;

        virtual void invalidate_render() override;
 
    protected:
        virtual void render_outer() override;

        NSize measure_child_with_margins(const NSize& available, NElement::ptr& child);

    private:
        friend class NWindow;
        virtual void set_window(NWindow* window) override;


        std::vector<NElement::ptr> children_;
    };

    class NBoxElement : public NContainerElement {
    private:
        NBoxElement() : NContainerElement("BoxElement") {}
    public:
        using super = NContainerElement;
        using self = NBoxElement;
        using ptr = std::shared_ptr<self>;

        static ptr create() { return std::shared_ptr<self>(new self()); }

        void color(const std::optional<NColorPair>& value);
        const std::optional<NColorPair>& color() const { return color_; }

        const std::string title() { return title_; }
        void title(const std::string& value);

        virtual void add_child(const NElement::ptr& child) override;
        virtual void add_child(NElement::ptr&& child) override;

    public:
        virtual void arrange(const NRect& bounds) override;
        virtual NSize measure(const NSize& available) override;
        virtual void render() override;
    private:
        std::string title_;
        std::optional<NColorPair> color_;

    };

    class NVerticalStackElement : public NContainerElement
    {
    protected:
        NVerticalStackElement(const std::string& tag = "VerticalStack") : NContainerElement(tag) {}

    public:
        using super = NContainerElement;
        using ptr = std::shared_ptr<NVerticalStackElement>;
        using self = NVerticalStackElement;

        static ptr create() { return std::shared_ptr<self>(new NVerticalStackElement()); }

        virtual ~NVerticalStackElement() {}
        int row_gap() { return row_gap_; }
        void row_gap(int value);
        NAlignment alignment() const { return alignment_; }
        void alignment(NAlignment value);

    public:
        virtual NSize measure(const NSize& available) override;
        virtual void arrange(const NRect& rect) override;

    private:
        NAlignment alignment_ = NAlignment::Start;
        int row_gap_ = 0;
    };

    class NButtonBaseElement : public NContainerElement {
    private:
        NButtonBaseElement();
    protected:
        NButtonBaseElement(const std::string& tag);

    public:
        virtual ~NButtonBaseElement() {}

        using super = NContainerElement;
        using self = NButtonBaseElement;
        using ptr = std::shared_ptr<self>;

        static ptr create() { return std::shared_ptr<self>(new self()); }



    protected:
        virtual void handle_attached(NWindow* window) override;

        virtual void render() override;

        virtual void render_outer() override;

        virtual bool handle_key(NKeyEventArgs& event_args) override;
        virtual bool handle_key_code(NKeyCodeEventArgs& event_args) override;

        virtual NColorPair get_color();

        virtual bool handle_mouse_leave(NMouseEventArgs& event_args) override;
        virtual bool handle_mouse_enter(NMouseEventArgs& event_args) override;
        virtual bool handle_mouse_button_pressed(int button, NMouseEventArgs& event_args) override;
        virtual bool handle_mouse_button_released(int button, NMouseEventArgs& event_args) override;
        virtual void handle_focused(bool);
        bool pressed() { return pressed_; }
    protected:
        NColorPair disabled_color() const { return disabled_color_; }
        NColorPair hover_color() const { return hover_color_; }
        NColorPair focus_color() const { return focus_color_; }
        NColorPair select_color() const { return select_color_; }
        NColorPair normal_color() const { return normal_color_; }


    private:
        NColorPair disabled_color_;
        NColorPair hover_color_;
        NColorPair focus_color_;
        NColorPair select_color_;
        NColorPair normal_color_;


        bool pressed_ = false;


    };

    struct NTextSelection {
        NTextSelection() : start(0), length(0) {}
        NTextSelection(int start, int length) : start(start), length(length) {}

        int start;
        int length;

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

    class NTextEditElement : public NElement
    {
    protected:
        NTextEditElement(const std::string& defaultText);

    public:
        using super = NElement;
        using self = NTextEditElement;
        using ptr = std::shared_ptr<self>;

        static ptr create(const std::string& defaultText = "") { return std::shared_ptr<self>(new self(defaultText)); }


        virtual ~NTextEditElement() {}

        const std::string& text() const { return text_; }
        void text(const std::string& value);

        NEvent<void(NElement::ptr source, const std::string&)> on_text_changed;

        // In utf8 Unicode canonical form (accents composed)
        std::string normalized_text() const;
        // In utf8 Unicode de-composed form (accents de-composed)
        std::string decomposed_text() const;

        const NTextSelection& selection() const { return selection_; }
        void selection(const NTextSelection& value);

        // returns the x-coordinate of the cursor in element coordinates -- 
        // (0,0) is the top-left corner of the element.
        int cursor_position();

        NEvent<void(NElement::ptr source, const NTextSelection& selection)> on_selection_changed;

        void select_all();
        void select_start() { selection({ 0, 0 }); }
        void select_end();

        void cut();
        void copy();
        void paste();

        int scroll_x_offset() const { return scroll_x_offset_; }
        void  scroll_x_offset(int value);

        void password(bool value);
        bool password() const { return password_; }

        void character_filter(const std::function<bool(char32_t c)>& filter) { character_filter_ = filter; }
        void character_filter(std::function<bool(char32_t c)>&& filter) { character_filter_ = std::move(filter); }

    protected:
        virtual NSize measure(const NSize& available) override;
        virtual void render() override;


    protected:
        void handle_attached(NWindow* window) override;
        void handle_detaching() override;
        virtual bool handle_key(NKeyEventArgs& event_args) override;
        virtual bool handle_key_code(NKeyCodeEventArgs& event_args) override;

        virtual bool handle_mouse_leave(NMouseEventArgs& event_args) override;
        virtual bool handle_mouse_enter(NMouseEventArgs& event_args) override;
        virtual bool handle_mouse_button_pressed(int button, NMouseEventArgs& event_args) override;
        virtual bool handle_mouse_button_released(int button, NMouseEventArgs& event_args) override;
        virtual void handle_focused(bool) override;

        virtual bool handle_mouse_move(NMouseEventArgs& event_args) override;
        virtual void handle_mouse_lost_capture() override;


    private:
        bool combine_text_characters(int position);
        PostHandle blink_post_handle_ = 0;
        bool blink_ = false;
        bool blink() const { return blink_; }
        void blink(bool value);

        using clock_t = std::chrono::steady_clock;
        using time_point = clock_t::time_point;


        void stop_blink_timer();
        void start_blink_timer();
        void on_blink_timer();

    private:
        std::function<bool(char32_t c)> character_filter_;
        void wrap_text(bool value); // not implemented.
        bool wrap_text() const { return wrap_text_; }


        bool password_;

        void scroll_adjust();
        NTextSelection selection_;
        bool wrap_text_ = false;
        std::string text_;
        int scroll_x_offset_ = 0;

        NColorPair disabled_color_;
        NColorPair hover_color_;
        NColorPair focus_color_;
        NColorPair select_color_;
        NColorPair normal_color_;
        NColorPair cursor_color_;

    };




    class NCheckboxElement : public NButtonBaseElement {
    protected:
        NCheckboxElement(const std::string& text, bool checked);
    public:
        using super = NButtonBaseElement;
        using self = NCheckboxElement;
        using ptr = std::shared_ptr<self>;

        static ptr create(const std::string& label, bool checked = false) {
            return std::shared_ptr<NCheckboxElement>(new self(label, checked));
        }


        void checked(bool value);
        bool checked() const { return checked_; }

        void label(const std::string& value) { label_ = value; invalidate_layout(); }
        std::string label() const { return label_; }

        void checked_text(const std::string& value) { checked_text_ = value; invalidate_layout(); }
        std::string checked_text() const;

        void unchecked_text(const std::string& value) { unchecked_text_ = value; invalidate_layout(); }
        std::string unchecked_text() const;

        NEvent<void(NElement::ptr source, bool checked)> on_checked_changed;

        virtual bool wants_shortcut_key(const std::string& key) override;
    protected:
        virtual bool handle_clicked(int button, NClickedEventArgs& eventArgs) override;

        void render() override;
        NSize measure(const NSize& available) override;
    private:
        std::string label_;
        std::string checked_text_ = ""; // ◉ 
        std::string unchecked_text_ = ""; // ○
        bool checked_;
    };
    class NButtonElement :public NButtonBaseElement {
    private:
        NButtonElement(const std::string& label, int width);
    public:
        virtual ~NButtonElement() {}

        using super = NButtonBaseElement;
        using self = NButtonElement;
        using ptr = std::shared_ptr<self>;

        static ptr create(const std::string& title, int width = AUTO_SIZE) {
            return std::shared_ptr<self>(new self(title, width));
        }
        static ptr create() {
            return std::shared_ptr<self>(new self("", AUTO_SIZE));
        }


        std::string label() const { return label_; }
        void label(const std::string& value);

        std::string prefix() const;
        void prefix(const std::string& value);

        std::string suffix() const;
        void suffix(const std::string& value);

        NAlignment label_alignment() const { return label_alignment_; }
        void label_alignment(NAlignment value);
        virtual bool wants_shortcut_key(const std::string& key) override;

    protected:
        virtual void handle_attached(NWindow* window) override;
        virtual NSize measure(const NSize& available) override;
        virtual void arrange(const NRect& bounds) override;
        virtual void render() override;

    private:
        NAlignment label_alignment_ = NAlignment::Center;
        std::string prefix_ = "[ ";
        std::string suffix_ = " ]";
        std::string label_;
    };

    class NHorizontalStackElement : public NContainerElement
    {
    protected:
        NHorizontalStackElement() : NContainerElement("HorizontalStack") {}
    public:
        using super = NContainerElement;
        using ptr = std::shared_ptr<NHorizontalStackElement>;
        using self = NHorizontalStackElement;

        static ptr create() { return std::shared_ptr<self>(new self()); }

        virtual ~NHorizontalStackElement() {}

        int column_gap() { return column_gap_; }
        void column_gap(int value);

        void alignment(NAlignment value);
        NAlignment alignment() const { return alignment_; }

    public:
        virtual NSize measure(const NSize& available) override;
        virtual void arrange(const NRect& rect) override;

    private:
        NAlignment alignment_ = NAlignment::Start;
        int column_gap_ = 0;
    };

    class NRadioGroupElement : public NContainerElement {
    protected:
        NRadioGroupElement(
            NOrientation orientation, 
            const std::vector<std::string>& labels, 
            int value,
            const std::string&tagName="RadioGroup"
            );

    public:

        using super = NContainerElement;
        using self = NRadioGroupElement;
        using ptr = std::shared_ptr<self>;

        static ptr create(
            NOrientation orientation,
            const std::vector<std::string>& labels,
            int value)
        {
            return std::shared_ptr<self>(new NRadioGroupElement(orientation, labels, value));
        }
        static ptr create() {
            return std::shared_ptr<self>(new NRadioGroupElement(
                NOrientation::Vertical,
                std::vector<std::string>(),
                0));
        }
        // Properties
        void orientation(NOrientation value);
        NOrientation orientation() const { return orientation_; }

        const std::vector<std::string>& labels() const { return labels_; };
        void labels(const std::vector<std::string>& value);

        void column_gap(int column_gap_);
        int column_gap() const { return column_gap_; }

        void row_gap(int row_gap_);
        int row_gap() const { return row_gap_; }

        int value() const { return value_; }
        virtual void value(int v);

        virtual void disabled(bool value) override;
        virtual bool disabled() const { return super::disabled(); }

        // Events

        NEvent<void(NRadioGroupElement::ptr source, int value)> on_value_changed;

        // Customizability.
        std::string checked_text() const;
        void checked_text(const std::string& value);
        std::string unchecked_text() const;
        void unchecked_text(const std::string& value);

        // implementation.
        virtual void width(int value) override;
        int width() const { return super::width(); }

    protected:
        virtual void handle_attached(NWindow* window) override;
        virtual void handle_detaching() override;

    private:
        void update_child_elements();
        void update_child_layout();

        int column_gap_ = 0;
        int row_gap_ = 0;
        std::string checked_text_ = ""; // ◉ 
        std::string unchecked_text_ = ""; // ○

        NContainerElement::ptr container_;
        std::vector<NCheckboxElement::ptr> radio_buttons_;
        NVerticalStackElement::ptr vertical_container_;
        NHorizontalStackElement::ptr horizontal_container_;
        NOrientation orientation_;
        std::vector<std::string> labels_;
        int value_ = 0;

    };

    class NMenuElement : public NButtonBaseElement {
    private:
        NMenuElement(const std::string& label, std::vector<NMenuItem>&& items);
        NMenuElement(const std::string& label, const std::vector<NMenuItem>& items);
    public:
        using self = NMenuElement;
        using super = NButtonBaseElement;
        using ptr = std::shared_ptr<self>;

        static ptr create(const std::string& label, std::vector<NMenuItem>&& items) { return std::shared_ptr<self>(new self(label, std::move(items))); }
        static ptr create(const std::string& label, const std::vector<NMenuItem>& items) { return std::shared_ptr<self>(new self(label, items)); }

        NEvent<void(NElement::ptr source)> on_opened;
        NEvent<void(NElement::ptr source)> on_closed;
        NEvent<void(NElement::ptr source, int selection)> on_item_selected;

        bool open() const { return open_; }
        void open(bool value);

        const std::vector<NMenuItem>& items() const { return items_; }
        void items(const std::vector<NMenuItem>& value);
        void items(std::vector<NMenuItem>&& value);

        const std::string& label() { return label_; }
        void label(const std::string& value);

        const std::string& prefix() { return prefix_; }
        void prefix(const std::string& value);

        const std::string& suffix() { return suffix_; }
        void suffix(const std::string& value);

        NAttachment menu_attachment() const { return menu_attachment_; }
        void menu_attachment(NAttachment value);

        virtual bool wants_shortcut_key(const std::string& key) override;


    protected:
        virtual bool handle_clicked(int button, NClickedEventArgs& eventArgs) override;
        virtual NColorPair get_color() override;

        virtual void render() override;
        virtual NSize measure(const NSize& available) override;
    private:
        std::shared_ptr<NPopupMenuWindow> popup_window_;
        std::string label_;
        std::string prefix_ = " ";
        std::string suffix_ = " ";
        NAttachment menu_attachment_ = NAttachment::BottomStart;
        bool open_ = false;
        std::vector<NMenuItem> items_;
    };

    class NDropdownElement : public NButtonBaseElement {
    private:
        NDropdownElement();
        NDropdownElement(const std::vector<NMenuItem>& items, int selected);
        NDropdownElement(std::vector<NMenuItem>&& items, int selected);
    public:
        using self = NDropdownElement;
        using NButtonBaseElement = NButtonBaseElement;
        using ptr = std::shared_ptr<self>;

        static ptr create() { return std::shared_ptr<self>(new self()); }
        static ptr create(
            const std::vector<NMenuItem>& menu_items,
            int selected
        ) {
            return std::shared_ptr<self>(new self(menu_items, selected));
        }
        static ptr create(
            std::vector<NMenuItem>&& menu_items,
            int selected
        ) {
            return std::shared_ptr<self>(new self(menu_items, selected));
        }


        bool open() const { return open_; }
        void open(bool value);
        void open(bool value, const NRect& anchorRect);


        const std::vector<NMenuItem>& items() const { return items_; }
        void menu_items(const std::vector<NMenuItem>& value);
        void menu_items(const std::vector<std::string>& value);

        int selected() const { return selected_; }
        void selected(int value);

        NAttachment dropdown_attachment() const { return dropdown_attachment_; }
        void dropdown_attachment(NAttachment value) { dropdown_attachment_ = value; }

        NEvent<void(NElement::ptr source, int selection)> on_selection_changed;
        NEvent<void(void)> on_opened;
        NEvent<void(void)> on_closed;

    protected:
        virtual bool handle_clicked(int button, NClickedEventArgs& eventArgs) override;
        virtual NColorPair get_color() override;

        void end_text(const std::string& value) { end_text_ = value; }
        std::string end_text() const;
        virtual NSize measure(const NSize& available) override;
        virtual void render() override;
        virtual void arrange(const NRect& bounds) override;
    private:
        void open_popup(const NRect& mouseRect);
        void close_popup();

        NAttachment dropdown_attachment_ = NAttachment::BottomEnd;
        std::shared_ptr<NPopupMenuWindow> popup_window_;
        std::string end_text_;
        bool open_ = false;
        std::vector<NMenuItem> items_;
        int selected_ = -1;
    };

    class NWindow : public NContainerElement
    {
    public:
        using ptr = std::shared_ptr<NWindow>;
    protected:

        friend class NPopupWindow;
        friend class NPopupWindow;

        NWindow(
            int x, int y, int width, int height,
            NColorPalette* colorPalette = nullptr);


        void add_child_window(NWindow::ptr child);
        void add_to_parent_window(NWindow::ptr parent)
        {
            parent->add_child_window(shared_from_this<NWindow>());
        }

        static ptr create_(
            NWindow::ptr parentWindow,
            int x,
            int y,
            int width,
            int height,
            NColorPalette* colorPalette = nullptr);


    public:
        using super = NContainerElement;
        using self = NWindow;

        std::weak_ptr<NWindow> weak_ptr() {
            return shared_from_this<self>();
        }

        // same locale string as std::setlocale
        static void set_locale(const std::string& locale);
        bool is_unicode_locale() const { return is_unicode_locale_; }
        bool can_display_character(char32_t c) const;


        static ptr create(int width, int height, NColorPalette* colorPalette = nullptr)
        {
            return create_(nullptr,
                AUTO_SIZE, AUTO_SIZE, width, height, colorPalette);

        }

        static ptr create(
            NWindow::ptr parentWindow,
            int width,
            int height
        )
        {
            return create_(parentWindow, AUTO_SIZE, AUTO_SIZE, width, height, nullptr);
        }
        static ptr create(
            NWindow::ptr parentWindow,
            int x, int y, int width, int height
        )
        {
            return create_(parentWindow, x, y, width, height, nullptr);
        }


        static ptr create(int x, int y, int width, int height, NColorPalette* colorPalette = nullptr)
        {
            return create_(nullptr, x, y, width, height, colorPalette);
        }

        virtual ~NWindow();


        virtual void add_child(const NElement::ptr& child) override;
        virtual void add_child(NElement::ptr&& child) override;


        std::string title() const { return title_; }
        void title(const std::string& title);

        const NRect& actual_window_position() const { return actual_window_position_; }


        const NRect& window_position() const { return window_position_; }
        void window_position(const NRect& value) {
            window_position_ = value;
            width(value.width);
            height(value.height);
        }

        void refresh()
        {
            wrefresh(curses_window_);
        }

        bool has_colors() const { return has_colors_; }
        int max_colors() const { return max_colors_; }
        int max_color_pairs() const { return max_color_pairs_; }

        // color is 0xRRGGBB
        NColor make_color(uint32_t rrggbb);


        NColorPair make_color_pair(uint32_t rrggbbFg, uint32_t rrggbbBg);
        NColorPair make_color_pair(NColor foreground, NColor background);


        void set_attributes(NAttribute attribute, short colorPair = -1);

        void clear_attributes()
        {
            //set_attributes(AttributeT::Normal, defaultColorPair);
        }


        bool bubble_event(int x, int y, const std::function<bool(NElement&)>& fn);
        bool bubble_event(const NPoint& pt, const std::function<bool(NElement&)>& fn)
        {
            return bubble_event(pt.x, pt.y, fn);
        }

        bool bubble_mouse_event(int x, int y, const std::function<bool(NElement&)>& fn);
        bool bubble_mouse_event(const NPoint& pt, const std::function<bool(NElement&)>& fn)
        {
            return bubble_mouse_event(pt.x, pt.y, fn);
        }

        bool bubble_mouse_event(NElement::ptr element, const std::function<bool(NElement&)>& fn);

        bool bubble_event(NElement::ptr element, const std::function<bool(NElement&)>& fn);

        void handle_window_mouse_move(NMouseEventArgs& event_args);
        void handle_button_pressed(int x, int y, int button, NMouseEventArgs& event_args);
        void handle_button_released(int x, int y, int button, NMouseEventArgs& event_args);


        NEvent<void(NElement::ptr focusElement)> on_focus_changed;

        bool focus(NElement::ptr element);
        NElement::ptr focus() { return focus_.lock(); };

        void navigate_focus(NNavDirection direction);
        void navigate_focus(int x, int y, NNavDirection direction);


        using clock_t = std::chrono::steady_clock;


        PostHandle post(
            NWindow::clock_t::duration delay,
            std::function<void(void)>&& fn);

        PostHandle post(
            NWindow::clock_t::time_point when,
            std::function<void(void)>&& fn);

        PostHandle post(std::function<void(void)>&& fn);


        bool cancel_post(PostHandle handle);

        void quit()
        {
            get_root_window()->close();
        }

        void run();

        void mouse_capture(NElement* element);
        NElement::ptr mouse_capture() const { return mouse_capture_.lock(); }
        void mouse_capture_release() { mouse_capture(nullptr); }
        // release mouse capture if the specified element is the current mouse capture.
        void mouse_capture_release(NElement* element);

        const NColorPalette& color_palette() const { return *color_palette_; }
        void color_palette(const NColorPalette& color_palette);
        void color_palette(std::shared_ptr<NColorPalette> color_palette);

        virtual void close();
        bool is_active_window() { return active_window_ == this; }
        NWindow* get_active_window() { return active_window_; }

        NEvent<void(NWindow::ptr source, bool activated)> on_is_active_changed;


        bool for_each_child_window(const std::function<bool(NWindow*)>& fn);
        void for_each_child_window(const std::function<void(NWindow*)>& fn);

        void for_each_child_window_parent_first(const std::function<void(NWindow*)>& fn);

        NWindow* find_child_window(const std::function<bool(NWindow*)>& condition_fn);

        void set_clipboard_text(const std::string& text);
        std::string get_clipboard_text();

        void move_window(int dx, int dy);

        const NRect& window_bounds() const { return actual_window_position_; }

        UnicodeServices& unicode_services();
        Collator& collator();
        UnicodeNormalizer& unicode_normalizer();
        const UnicodeNormalizer& unicode_normalizer() const;

        std::string normalize_utf8(const std::string& text) const;
        std::string decompose_utf8(const std::string& text) const;
    protected:
        virtual void handle_is_active_changed(bool activated);

        virtual void set_initial_focus();

        virtual bool handle_default_button();
        virtual bool handle_cancel_button();
        virtual bool handle_window_key(wchar_t key);
        virtual bool handle_window_key_code(int key);
        virtual bool handle_mouse_event(MEVENT& event);


        virtual void arrange(const NRect& bounds);
        virtual NSize measure(const NSize& available) override;
        virtual void render() override;

    private:
        NPoint last_mouse_position_{ -1,-1 };
        friend class NElement;
        void w_box(const NRect& rect, const std::optional<NColorPair>& colorPair = std::nullopt);

        void w_move(int x, int y)
        {
            this->x = x; this->y = y;
            wmove(curses_window_, y, x);
        }

        void w_color_pair_on(NColorPair colorPair);
        void w_color_pair_off(NColorPair colorPair);

        void w_print(const char* text)
        {
            if (y >= bounds_.bottom() - 1) return;
            waddstr(curses_window_, text);

        }
        void w_print(const std::string& text)
        {
            if (y >= bounds_.bottom() - 1) return;
            waddstr(curses_window_, text.c_str());
        }
        void w_print(const wchar_t* text)
        {
            if (y >= bounds_.bottom() - 1) return;
            waddwstr(curses_window_, text);
        }


        void w_print(wchar_t c)
        {
            if (y >= bounds_.bottom() - 1) return;
            std::wstring str(1, c);
            print(str.c_str());
        }

        void w_print_acs(int x, int y, int alternate_character);

        void w_horizontal_line(int x, int y, int width) {
            mvwhline(curses_window_, y, x, ACS_HLINE, width);
        }

        void w_vertical_line(int x, int y, int width) {
            mvwvline(curses_window_, y, x, ACS_VLINE, width);
        }


        void w_attribute_on(NAttribute attribute)
        {
            wattr_on(curses_window_, (attr_t)attribute, nullptr);
        }
        void w_attribute_off(NAttribute attribute)
        {
            wattr_off(curses_window_, (attr_t)attribute, nullptr);
        }

    private:
        virtual void parent(NElement* value) override;

        static bool root_window_exists_;

        std::shared_ptr<UnicodeServices> unicode_services_;
        std::shared_ptr<Collator> collator_;
        std::shared_ptr<UnicodeNormalizer> normalizer_;
        static std::string locale_;
        bool is_unicode_locale_ = false;

        void set_locale_(const std::string& locale);

        bool redraw_all_windows_ = false;
        void redraw_all_windows();
        void actual_focus(NElement::ptr element);

        NClipboard::ptr clipboard;

        bool remove_child_window(NWindow::ptr child);
        bool remove_child_window(NWindow* child);
        void init_root_window();


        int x = 0; int y = 0;
        bool first_layout_ = true;

        void get_safe_child_windows(std::vector<NWindow::ptr>& child_windows);

        bool is_active_window_ = false;
        NWindow* active_window_ = nullptr;

        NWindow* compute_active_window();

        bool update_active_window();

        bool attach_windows();
        bool closed_ = false;
        WINDOW* curses_window_ = nullptr;
        WINDOW* root_window_ = nullptr;
        PANEL* curses_panel_ = nullptr;

        std::vector<PANEL*> panel_stack_; // root level window only.

        NWindow* parent_window_ = nullptr;
        std::vector<NWindow::ptr> child_windows_; // for ownership.
        NWindow* get_root_window();
        const NWindow* get_root_window() const;

        std::string title_;


        std::weak_ptr<NElement> focus_;
        std::weak_ptr<NElement> logical_focus_;

        void init_color(short index, uint32_t rrggbb);
        std::shared_ptr<NColorPalette> color_palette_ = nullptr;
        short nextColorIndex = 1;
        struct AllocatedColorT {
            uint32_t rrggbb;
            NColor color;
            short color_index;
            bool old_color_valid;
            short old_r;
            short old_g;
            short old_b;
        };
        std::map<uint32_t, AllocatedColorT> allocated_colors_;
        struct ColorPairEntry {
            short index;
            NColorPair color_pair;
            NColor foreground;
            NColor background;
            bool old_pair_valid;
            short old_foreground;
            short old_background;
        };
        short next_color_pair_index = 1;
        std::vector<ColorPairEntry> color_pairs_;

        void restore_colors();

        NElement::ptr get_clickable_element_at(int x, int y);
        NElement::ptr get_clickable_element_at(const NPoint& pt) { return get_clickable_element_at(pt.x, pt.y); }

        static constexpr int MAX_BUTTON = 4;
        std::array<NElement::ptr, (size_t)MAX_BUTTON> button_down_elements_;

        NElement::ptr button1_down_element = nullptr;
        NElement::ptr button2_down_element = nullptr;
        NElement::ptr button3_down_element = nullptr;

        std::weak_ptr<NElement> mouse_capture_;
        NElement::ptr entered_element_ = nullptr;
        NMouseEventArgs current_mouse_event_args_;
        void clear_window();
        mmask_t oldMouseMask = 0;
        PostHandle nextPostHandle = 1;
        struct PostEntry {
            PostHandle postHandle;
            clock_t::time_point when;
            std::function<void(void)> callback;
        };

        NRect window_position_;
        std::mutex post_entry_mutex;
        std::list<PostEntry> post_entries;

        int time_to_next_post();

        bool execute_posts();


        bool quit_ = false;
        bool has_colors_ = false;
        int max_colors_ = -1;
        int max_color_pairs_ = -1;
        short defaultColorPair = -1;

        bool layout();

        bool update_window_size();
        virtual NRect calculate_window_position(int max_width, int max_height);

        bool run_one();
        NRect actual_window_position_;
        NRect last_window_bounds_; //(-1,-1,-1,-1);


        int current_mouse_x_ = -1;
        int current_mouse_y_ = -1;

    };

    enum class NMessageType { Info, Warning, Error };

    class NMessageWindow : public NWindow {
    protected:
        NMessageWindow(
            NWindow::ptr parent_window,
            const std::string& title,
            int width
        );
        void init(NWindow::ptr parent_window, NMessageType message_type, const std::string& message, int message_width);
    public:
        using self = NMessageWindow;
        using super = NWindow;
        using ptr = std::shared_ptr<NMessageWindow>;

        static ptr create(
            NWindow::ptr parent_window,
            NMessageType message_type,
            const std::string& title,
            const std::string& message,
            int width = AUTO_SIZE);


    };
    class NPopupWindow : public NWindow {
    private:
        NPopupWindow(
            NWindow::ptr parentWindow,
            const NRect& anchor,
            NAttachment attachment
        );
    protected:
        NPopupWindow(
            const std::string& tag,
            NWindow::ptr parentWindow,
            const NRect& anchor,
            NAttachment attachment
        );

    public:
        using self = NPopupWindow;
        using super = NWindow;
        using ptr = std::shared_ptr<self>;

        static ptr create(
            NWindow::ptr parentWindow,
            const NRect& anchor,
            NAttachment attachment
        );

        const NRect& anchor() const { return anchor_; }
        void anchor(const NRect& anchor);

        // whether clicking outside the popup window will close it.
        void cancellable(bool value) { cancellable_ = value; }
        bool cancellable() const { return cancellable_; }
    protected:
        virtual NRect calculate_window_position(int max_width, int max_height) override;
        virtual bool handle_mouse_button_pressed(int button, NMouseEventArgs& event_args) override;

    private:
        bool cancellable_ = false;
        void left_pos(NRect& bounds, int max_width);
        void right_pos(NRect& bounds, int max_width);
        void top_pos(NRect& bounds, int max_width);
        void bottom_pos(NRect& bounds, int max_width);

        NRect anchor_;
        NAttachment attachment_;
    };

    class NPopupMenuWindow : public NPopupWindow {
    protected:
        NPopupMenuWindow(
            NWindow::ptr parentWindow,
            const NRect& anchor,
            NAttachment attachment
        );
        virtual void Init(NWindow::ptr parentWindow, const std::vector<NMenuItem>& menu_items);
    public:
        using self = NPopupMenuWindow;
        using super = NPopupWindow;
        using ptr = std::shared_ptr<self>;

        static ptr create(
            NWindow::ptr parentWindow,
            const std::vector<NMenuItem>& menu_items,
            const NRect& anchor,
            NAttachment attachment
        );

        NEvent<void(NElement::ptr source, int item_id)> on_item_selected;
        NEvent<void(NElement::ptr source)> on_cancelled;

        virtual void close() override;
    protected:
        virtual void set_initial_focus() override;

        virtual bool handle_key(NKeyEventArgs& event_args) override;

        virtual void handle_item_selected(int item_id);
        virtual void handle_cancelled();

    private:
        int measure_prefix(const NMenuItem&menuItem, bool isUnicodeLocale);
        bool was_item_selected_ = false;

    };


    /////////////// Manipulators ///////////////////

    // marker class for manipulators.
    class NElementManipulator {

    };
    class margin : public NElementManipulator {
    public:
        margin(const NThickness& value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->margin(this->value);
            return element;
        }
    private:
        NThickness value;

    };

    class is_default : public NElementManipulator {
    public:
        is_default(bool value = true) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->is_default(this->value);
            return element;
        }
    private:
        bool value;

    };
    class is_cancel : public NElementManipulator {
    public:
        is_cancel(bool value = true) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->is_cancel(this->value);
            return element;
        }
    private:
        bool value;

    };




    class text_attribute : public NElementManipulator {
    public:
        text_attribute(std::optional<NAttribute> value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->text_attribute(this->value);
            return element;
        }
    private:
        std::optional<NAttribute> value;

    };


    class title : public NElementManipulator {
    public:
        title(const std::string& value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->title(this->value);
            return element;
        }
    private:
        std::string value;

    };
    class position : public NElementManipulator {
    public:
        position(const NRect& value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->position(this->value);
            return element;
        }
    private:
        NRect value;

    };


    class on_clicked : public NElementManipulator {
    public:
        using CallbackT = void(int button, NClickedEventArgs& event_args);

        on_clicked(std::function<CallbackT>&& function) : function_(std::move(function)) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->on_clicked.subscribe(this->function_);
            return element;
        }
    private:
        std::function<CallbackT> function_;

    };

    class on_item_selected : public NElementManipulator {
    public:
        using CallbackT = void(NElement::ptr source, int item_id);

        on_item_selected(std::function<CallbackT>&& function) : function_(std::move(function)) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->on_item_selected.subscribe(
                this->function_);
            return element;
        }
    private:
        std::function<CallbackT> function_;

    };

    class on_cancelled : public NElementManipulator {
    public:
        using CallbackT = void(NElement::ptr source);

        on_cancelled(std::function<CallbackT>&& function) : function_(std::move(function)) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->on_cancelled.subscribe(
                this->function_);
            return element;
        }
    private:
        std::function<CallbackT> function_;

    };


    class color : public NElementManipulator {
    public:
        color(const std::optional<NColorPair>& value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->color(this->value);
            return element;
        }
    private:
        std::optional<NColorPair> value;

    };


    class row_gap : public NElementManipulator {
    public:
        row_gap(int value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->row_gap(this->value);
            return element;
        }
    private:
        int value;

    };
    class column_gap : public NElementManipulator {
    public:
        column_gap(int value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->column_gap(this->value);
            return element;
        }
    private:
        int value;

    };
    class alignment : public NElementManipulator {
    public:
        alignment(NAlignment value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->alignment(this->value);
            return element;
        }
    private:
        NAlignment value;

    };

    class checked_text : public NElementManipulator {
    public:
        checked_text(const std::string& value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->checked_text(this->value);
            return element;
        }
    private:
        std::string value;

    };
    class unchecked_text : public NElementManipulator {
    public:
        unchecked_text(const std::string& value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->unchecked_text(this->value);
            return element;
        }
    private:
        std::string value;

    };

    class text : public NElementManipulator {
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


    class label_alignment : public NElementManipulator {
    public:
        label_alignment(NAlignment value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->label_alignment(this->value);
            return element;
        }
    private:
        NAlignment value;

    };

    class menu_attachment : public NElementManipulator {
    public:
        menu_attachment(NAttachment value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->menu_attachment(this->value);
            return element;
        }
    private:
        NAttachment value;

    };



    class label : public NElementManipulator {
    public:
        label(const std::string& value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->label(this->value);
            return element;
        }
    private:
        std::string value;

    };

    class prefix : public NElementManipulator {
    public:
        prefix(const std::string& value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->prefix(this->value);
            return element;
        }
    private:
        std::string value;

    };

    class suffix : public NElementManipulator {
    public:
        suffix(const std::string& value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->suffix(this->value);
            return element;
        }
    private:
        std::string value;

    };

    class checked : public NElementManipulator {
    public:
        checked(bool value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->checked(this->value);
            return element;
        }
    private:
        bool value;

    };

    class cancellable : public NElementManipulator {
    public:
        cancellable(bool value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->cancellable(this->value);
            return element;
        }
    private:
        bool value;

    };


    class height : public NElementManipulator {
    public:
        height(int value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->height(this->value);
            return element;
        }
    private:
        int value;

    };

    class width : public NElementManipulator {
    public:
        width(int value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->width(this->value);
            return element;
        }
    private:
        int value;

    };
    class focusable : public NElementManipulator {
    public:
        focusable(bool value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->focusable(this->value);
            return element;
        }
    private:
        bool value;

    };
    class clickable : public NElementManipulator {
    public:
        clickable(bool value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->clickable(this->value);
            return element;
        }
    private:
        bool value;

    };

    class disabled : public NElementManipulator {
    public:
        disabled(bool value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
            element->disabled(this->value);
            return element;
        }
    private:
        bool value;

    };


    class add_child : public NElementManipulator {
    public:
        add_child(std::shared_ptr<NElement> value) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) {
            element->add_child(this->value);
            return element;
        }
    private:
        std::shared_ptr<NElement> value;

    };


    template <class T = NElement::ptr>
    class add_children : public NElementManipulator {
    public:
        add_children(const std::vector<T>& value) : value(value) {
        }
        template<typename U>
        std::shared_ptr<U> apply(std::shared_ptr<U> element) {
            for (auto& child : this->value) {
                element->add_child(child);
            }
            return element;
        }
    private:
        std::vector<T> value;

    };


    class wrap_text : public NElementManipulator {
    public:
        wrap_text(bool value = true) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) {
            element->wrap_text(this->value);
            return element;
        }
    private:
        bool value;
    };

    class password : public NElementManipulator {
    public:
        password(bool value = true) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) {
            element->password(this->value);
            return element;
        }
    private:
        bool value;
    };

    class character_filter : public NElementManipulator {
    public:
        character_filter(const std::function<bool(char32_t c)>& filter) : value(filter) {}
        character_filter(std::function<bool(char32_t c)>&& filter) : value(std::move(filter)) {}

        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) {
            element->character_filter(this->value);
            return element;
        }
    private:
        const std::function<bool(char32_t c)> value;
    };


    class menu_items : public NElementManipulator {
    public:
        menu_items(const std::vector<NMenuItem>& value) : value(value) {}
        menu_items(std::vector<NMenuItem>&& value) : value(std::move(value)) {}

        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) {
            element->menu_items(this->value);
            return element;
        }
    private:
        std::vector<NMenuItem> value;
    };


    class on_opened : public NElementManipulator {
    public:
        on_opened(const std::function<void(void)>& callback) : value(callback) {}
        on_opened(std::function<void(void)>&& callback) : value(std::move(callback)) {}

        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) {
            element->on_opened.subscribe(value);
            return element;
        }
    private:
        const std::function<void(void)> value;
    };

    class on_closed : public NElementManipulator {
    public:
        on_closed(const std::function<void(void)>& callback) : value(callback) {}
        on_closed(std::function<void(void)>&& callback) : value(std::move(callback)) {}

        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) {
            element->on_closed.subscribe(value);
            return element;
        }
    private:
        const std::function<void(void)> value;
    };

    class on_selection_changed : public NElementManipulator {
    public:
        using CallbackT = void(NElement::ptr source, int value);
        on_selection_changed(const std::function<CallbackT>& callback) : value(callback) {}
        on_selection_changed(std::function<CallbackT>&& callback) : value(std::move(callback)) {}

        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) {
            element->on_selection_changed.subscribe(value);
            return element;
        }
    private:
        const std::function<CallbackT> value;
    };

    class request_initial_focus : public NElementManipulator {
    public:
        request_initial_focus(bool value = true) : value(value) {
        }
        template<typename T>
        std::shared_ptr<T> apply(std::shared_ptr<T> element) {
            element->request_initial_focus(this->value);
            return element;
        }
    private:
        bool value;

    };

    template<typename ELEMENT, typename MANIPULATOR>
        requires std::derived_from<ELEMENT, NElement>
    && std::derived_from<MANIPULATOR, NElementManipulator>
        std::shared_ptr<ELEMENT> operator |(std::shared_ptr<ELEMENT> element, MANIPULATOR value)
    {
        value.apply(element);
        return element;
    }
    ////////////////////////////////////////////////

    inline void NElement::move(int x, int y)
    {
        window()->w_move(x + bounds_.x, y + bounds_.y);
    }

    inline void NElement::horizontal_line(int x, int y, int width)
    {
        window()->w_horizontal_line(x + bounds_.x, y + bounds_.y, width);
    }
    inline void NElement::vertical_line(int x, int y, int height)
    {
        window()->w_vertical_line(x + bounds_.x, y + bounds_.y, height);
    }


    inline void NElement::box(const NRect& rect, const std::optional<NColorPair>& colorPair)
    {
        NRect wRect = rect + bounds_.top_left();
        window()->w_box(wRect, colorPair);
    }

    inline void NElement::print(const char* text)
    {
        window()->w_print(text);
    }

    inline void NElement::print(const std::string& text)
    {
        window()->w_print(text.c_str());
    }

    inline void NElement::print(const wchar_t* text)
    {
        window()->w_print(text);
    }
    inline void NElement::print(const std::wstring& text)
    {
        window()->w_print(text.c_str());

    }
    inline void NElement::print(const std::u32string& text)
    {
        window()->w_print(u32string_to_wstring(text).c_str());

    }

    inline void NElement::print_acs(int x, int y, int alternate_character)
    {
        window()->w_print_acs(x + bounds_.x, y + bounds_.y, alternate_character);
    }


    inline void NElement::attribute_on(NAttribute attr)
    {
        window()->w_attribute_on(attr);
    }
    inline void NElement::attribute_off(NAttribute attr)
    {
        window()->w_attribute_off(attr);
    }

    inline void NElement::color_on(NColorPair colorPair) {
        window()->w_color_pair_on(colorPair);
    }
    inline void NElement::color_off(NColorPair colorPair) {
        window()->w_color_pair_off(colorPair);
    }

    inline void NWindow::w_color_pair_on(NColorPair colorPair) {
        wattr_on(curses_window_, colorPair.attr, nullptr);
    }
    inline void NWindow::w_color_pair_off(NColorPair colorPair) {
        wattr_off(curses_window_, colorPair.attr, nullptr);
    }

    inline NPopupMenuWindow::ptr NPopupMenuWindow::create(
        NWindow::ptr parentWindow,
        const std::vector<NMenuItem>& menu_items,
        const NRect& anchor,
        NAttachment attachment
    ) {
        ptr result = ptr(new self(parentWindow, anchor, attachment));
        result->Init(parentWindow, menu_items);
        result->add_to_parent_window(parentWindow);
        return result;
    }





}

