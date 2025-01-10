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

#include "NWindows/NWindows.hpp"
#include "Finally.hpp"
#include <iostream>
#include <ncurses.h>
#include <sstream>
#include <signal.h>
#include <string.h>
#include <cuchar>
#include "NWindows/NUtf8.hpp"
#include <cmath>
#include <panel.h>
#include "NWindows.hpp"
#include <codecvt>
#include <termios.h>
#include <locale>
#include "NWindows/NUnicodeServices.hpp"

using namespace nwindows;

static std::string menu_item_shortcut(const std::string& text)
{
    int ix = 0;
    while (ix < (int)text.length())
    {
        char32_t c = utf8_char32_at(text, ix);
        if (c == L'_')
        {
            ix = utf8_increment(text, ix);
            if (ix >= (int)text.length())
            {
                return "";
            }
            int end = utf8_increment(text, ix);
            return std::string(text.begin() + ix, text.begin() + end);
        }
        ix = utf8_increment(text, ix);
    }
    return "";
}

bool NElement::is_menu_item_shortcut_key(const char32_t c, const std::string& text)
{
    if (text.find('_') == std::string::npos)
    {
        return false;
    }
    std::string shortcut = menu_item_shortcut(text);
    std::string keyText = char32_to_utf8string(c);
    return window()->collator().Compare(shortcut, keyText) == 0;
}

bool NElement::is_menu_item_shortcut_key(const std::string& key, const std::string& text)
{
    if (text.find('_') == std::string::npos)
    {
        return false;
    }
    std::string shortcut = menu_item_shortcut(text);
    return window()->collator().Compare(shortcut, key) == 0;
}

int NElement::measure_menu_text(const std::string& text)
{
    int ix = 0;
    int w = 0;

    while (ix < (int)text.length())
    {
        char32_t c = utf8_char32_at(text, ix);
        if (c != L'_')
        {
            int wcwidth = utf8_wide_character_width(text, ix);
            w += wcwidth;
        }
        ix = utf8_increment(text, ix);
    }
    return w;
}


void NElement::print_menu_text(const std::string& text)
{
    print_menu_text(text, measure_menu_text(text), true);
}

void NElement::print_menu_text(const std::string& text, int width, bool show_underline)
{

    int ix = 0;
    int w = 0;

    bool underline_on = false;

    std::u32string u32Text;

    while (ix < (int)text.length())
    {
        char32_t c = utf8_char32_at(text, ix);
        if (c == L'_')
        {
            print(u32Text);
            u32Text.resize(0);
            if (show_underline) {
                attribute_on(NAttribute::Underline);
                underline_on = true;
            }

        }
        else {
            int wcwidth = utf8_wide_character_width(text, ix);
            if (wcwidth + w > width)
            {
                break;
            }
            u32Text.push_back(c);
            if (underline_on)
            {
                underline_on = false;
                print(u32Text);
                u32Text.resize(0);
                if (show_underline)
                {
                    attribute_off(NAttribute::Underline);
                }

            }

            w += wcwidth;

        }
        ix = utf8_increment(text, ix);
    }
    print(u32Text);
    if (underline_on)
    {
        if (show_underline)
        {
            attribute_off(NAttribute::Underline);
        }
    }
    if (w < width)
    {
        print(std::string(width - w, ' '));
    }
}

void NElement::print(const std::string&text, NAlignment alignment, int display_columns)
{
    int textWidth = measure_text(text);
    int extra = display_columns - textWidth;
    if (extra < 0) {
        print(text,display_columns);
        return;
    }
    int left_extra = 0, right_extra = 0;
    switch (alignment)
    {
    case NAlignment::Justify:
    case NAlignment::Start:
        right_extra = extra;
        break;
    case NAlignment::End:
        left_extra = extra;
        break;
    case NAlignment::Center:
        left_extra = extra / 2;
        right_extra = extra - left_extra;
        break;
    }
    if (left_extra > 0)
    {
        print(std::string(left_extra, ' '));
    }
    print(text);
    if (right_extra > 0)
    {
        print(std::string(right_extra, ' '));
    }
}

void NElement::print_menu_text(
    const std::string& text,
    NAlignment alignment,
    int display_columns,
    bool show_underline)
{
    int textWidth = measure_menu_text(text);
    if (textWidth > display_columns)
    {
        textWidth = display_columns; // text will be truncated by the print_menu_text function.
    }
    int extra = display_columns - textWidth;
    int left_extra = 0, right_extra = 0;
    switch (alignment)
    {
    case NAlignment::Justify:
    case NAlignment::Start:
        right_extra = extra;
        break;
    case NAlignment::End:
        left_extra = extra;
        break;
    case NAlignment::Center:
        left_extra = extra / 2;
        right_extra = extra - left_extra;
        break;
    }
    if (left_extra > 0)
    {
        print(std::string(left_extra, ' '));
    }
    print_menu_text(text, textWidth, show_underline);

    if (right_extra > 0)
    {
        print(std::string(right_extra, ' '));
    }
}




int NElement::measure_text(const std::string& text)
{
    return utf8_wc_length(text);
}


NClickedEventArgs::NClickedEventArgs(
    NElement* source, NElement* target, const NRect& location, bool is_mouse_click)
    : NEventArgsBase(source)
    , target(target ? target->shared_from_this() : nullptr)
    , is_mouse_click(is_mouse_click)
    , location(location)
{
}




NEventArgsBase::NEventArgsBase(NElement* source)
    : source(source ? source->shared_from_this<NElement>() : nullptr)
{
    if (source && source->window())
    {
        window = source->window()->shared_from_this<NWindow>();
    }
}
void NElement::invalidate_layout()
{
    if (!this->window_)
    {
        return;
    }
    if (this->layout_valid_)
    {
        this->layout_valid_ = false;
        auto p = this->parent();
        if (p)
        {
            p->invalidate_layout();
        }
    }
}

void NElement::invalidate_render()
{
    for_each_element([](NElement& element) {
        element.render_valid_ = false;
        });
}

void NElement::margin(const NThickness& margin)
{
    if (this->margin_ != margin)
    {
        this->margin_ = margin;
        invalidate_layout();
    }
}

void NContainerElement::add_child(NElement::ptr& child)
{
    if (child->parent())
    {
        throw std::runtime_error("Child already added to another element.");
    }

    child->parent(this);
    child->set_window(window());
    children_.push_back(child);
    invalidate_layout();
}
void NContainerElement::add_child(NElement::ptr&& child)
{
    if (child->parent())
    {
        throw std::runtime_error("Child already added to another element.");
    }
    child->parent(this);
    child->set_window(window());
    children_.push_back(std::move(child));

    invalidate_layout();
}


void NContainerElement::remove_all_children()
{
    while (!children_.empty())
    {
        NElement::ptr child = children_[0];
        children_.erase(children_.begin());
        child->parent(nullptr);
        child->set_window(nullptr);
    }
    invalidate_layout();
}

void NContainerElement::remove_child(NElement::ptr& child)
{
    for (auto i = children_.begin(); i != children_.end(); ++i)
    {
        if ((*i).get() == child.get())
        {
            children_.erase(i);
            child->parent(nullptr);
            child->set_window(nullptr);
            break;
        }
    }
    invalidate_layout();
}

bool NThickness::operator==(const NThickness& other) const
{
    return this->left == other.left && this->top == other.right && this->right == other.right && this->bottom == other.bottom;
}

bool NRect::operator==(const NRect& other) const
{
    return this->x == other.x && this->y == other.y && this->width == other.width && this->height == other.height;
}

void NElement::size(const NSize& size)
{
    width(size.width);
    height(size.height);
}

bool NWindow::handle_window_key(wchar_t key)
{
    auto focus = this->focus();

    NKeyEventArgs event_args(this, key);

    if (focus)
    {
        event_args.target = focus;

        if (bubble_event(focus, [&](NElement& element) {
            element.handle_key(event_args);
            return event_args.handled;
            })) {
            return true;
        };
    }
    else {
        // if there's no focus, for on self anyway.
        event_args.target = nullptr;
        if (this->handle_key(event_args))
        {
            return true;
        }
    }
    if (!event_args.handled)
    {
        std::string shortcutAsUtf8 = u32string_to_utf8(std::u32string(1, key));
        auto element = find_child_element([&](NElement& element) {
            if (element.clickable() && !element.disabled() && element.wants_shortcut_key(shortcutAsUtf8))
            {
                return true;
            }
            return false;
            });
        if (element)
        {
            event_args.handled = true;
            element->simulate_keyboard_click(this);
            return true;
        }

    }
    if (!event_args.handled)
    {
        switch (key)
        {
#ifdef DEBUG
        case 16: // ctl-p
            invalidate_layout();
            break;
#endif
        case L'\t':
            navigate_focus(NNavDirection::Tab);
            event_args.handled = true;
            break;
        case '\n': // ENTER
            if (this->handle_default_button())
            {
                return true;
            }
            break;
        case 27: // ESC
            if (this->handle_cancel_button())
            {
                return true;
            }
            break;

        }
    }
    return event_args.handled;
}

bool NWindow::handle_window_key_code(int key)
{
    NKeyCodeEventArgs event_args(this, key);
    auto focus = this->focus();
    if (focus)
    {
        event_args.target = focus;
        if (bubble_event(focus, [&](NElement& element) {
            bool result = element.handle_key_code(event_args);
            return event_args.handled | result;
            })) {
            return true;
        };
    }
    else {
        // if there's no focus, fire on self anyway.
        event_args.target = nullptr;
        this->handle_key_code(event_args);
    }

    // First as part of the bubble. Don't do it again.
    // event_args->target = this->shared_from_this<NElement>();
    // if (this->handle_key_code(event_args))
    // {
    //     return true;
    // }


    if (!event_args.handled)
    {
        switch (key) {
        case KEY_ENTER:
            this->handle_default_button();
            break;
        
        case KEY_LEFT:
            navigate_focus(NNavDirection::Left);
            event_args.handled = true;
            break;
        case KEY_RIGHT:
            navigate_focus(NNavDirection::Right);
            event_args.handled = true;
            break;
        case KEY_UP:
            navigate_focus(NNavDirection::Up);
            event_args.handled = true;
            break;
        case KEY_DOWN:
            navigate_focus(NNavDirection::Down);
            event_args.handled = true;
            break;
        case KEY_BTAB:
            navigate_focus(NNavDirection::ReverseTab);
            event_args.handled = true;
            break;
#if DEBUG // test code, shift window positions with ctrl arrow keys.
        case 01053: // ctl-shift-left
        {
            NRect position = this->window_position();
            position.width = std::max(2, actual_window_position().width - 1);
            this->window_position(position);
        }
        break;
        case 01072: // ctl-shift-right
        {
            NRect position = this->window_position();
            position.width = std::min(actual_window_position().width, COLS);
            this->window_position(position);
        }
        break;

        case 01052: // ctl-left
            get_active_window()->move_window(-1, 0);
            break;
        case 01071:
            get_active_window()->move_window(1, 0);
            break;
        case 01077: // ctl-UP
            get_active_window()->move_window(0, -1);
            break;
        case 01026: // ctl-DOWN
            get_active_window()->move_window(0, 1);
            break;
#endif

        case KEY_HOME:
            navigate_focus(NNavDirection::Home);
            event_args.handled = true;
            break;
        case KEY_END:
            navigate_focus(NNavDirection::End);
            event_args.handled = true;
            break;


        }
    }
    return event_args.handled;


}

void NWindow::run()
{
    if (parent_window_ != nullptr)
    {
        throw std::runtime_error("run() can only be called on the root window.");
    }
    try
    {

        {
            // get the default color pair.
            attr_t dummyAttr;
            wattr_get(this->curses_window_, &dummyAttr, &(this->defaultColorPair), nullptr);
        }
        Finally ff([this]()
            { close(); });
        noecho();


        // struct sigaction sa;
        // memset(&sa, 0, sizeof(struct sigaction));
        // sa.sa_handler = handle_winch;
        // sigaction(SIGWINCH, &sa, NULL);

        // pump messages.
        while (true)
        {
            while (run_one())
            {
                if (quit_)
                {
                    break;
                }

            }
            if (quit_)
            {
                break;
            }

            ::refresh();
            ::update_panels();

            int nextPostMs = this->time_to_next_post();
            wtimeout(curses_window_, nextPostMs);

            wint_t wint;
            int rc = wget_wch(curses_window_, &wint);

            switch (rc)
            {
            case ERR:
                break;
            case OK:
                // we have a unicode character.
                if (get_active_window())
                {
                    get_active_window()->handle_window_key((wchar_t)wint);
                }
                break;

            case KEY_CODE_YES:
                // we have a keycode.
            {
                int keycode = (int)wint;
                if (keycode == KEY_MOUSE)
                {
                    MEVENT mouse_event;
                    if (getmouse(&mouse_event) == OK)
                    {
                        handle_mouse_event(mouse_event);
                    }
                }
                else if (keycode == KEY_RESIZE)
                {
                    endwin();
                    refresh();
                    update_panels();
                    redraw_all_windows_ = true;
                    break;
                }
                else
                {
                    if (get_active_window())
                    {
                        get_active_window()->handle_window_key_code(keycode);
                    }
                }
                break;
            }
            }

            switch (rc)
            {
            case KEY_RESIZE:
                endwin();
                refresh();
                update_panels();
                break;
                // case KEY_ERR:
                //     doupdate();
                //     break;
            }
        }
        post_entries.clear();
        NWindow::root_window_exists_ = false;

    }
    catch (const std::exception& e)
    {
        close();
        std::cout << "Error: " << e.what() << std::endl;
    }
}

bool NWindow::handle_default_button() {
    auto element = find_child_element([](NElement& element) {
        return element.is_default() && element.clickable() && !element.disabled();
        });
    if (element)
    {
        NClickedEventArgs event_args(this, element.get(), element->bounds(), false);
        event_args.target = element;
        return element->handle_clicked(0, event_args);
    }
    else {
        auto focus = focus_.lock();
        if (focus)
        {
            focus->simulate_keyboard_click(0);
        }

    }
    return false;
}
bool NWindow::handle_cancel_button() {
    auto element = find_child_element([](NElement& element) {
        return element.is_cancel() && element.clickable() && !element.disabled();
        });
    if (element)
    {
        NClickedEventArgs event_args(this, element.get(), element->bounds(), false);
        event_args.target = element;
        return element->handle_clicked(0, event_args);
    }
    return false;
}

NWindow::~NWindow()
{
    close();
}

void NWindow::close()
{
    if (closed_) {
        return;
    }
    closed_ = true;

    while (this->child_windows_.size() > 0)
    {
        child_windows_[child_windows_.size() - 1]->close();
    }


    this->set_window(nullptr);
    this->children_.clear(); // breaks circular references held by event handlers.

    if (parent_window_)
    {

        parent_window_->remove_child_window(this);
        if (curses_window_)
        {
            del_panel(curses_panel_);
            delwin(curses_window_);
            update_panels();

            curses_window_ = nullptr;
            curses_panel_ = nullptr;
        }
        return;
    }
    else {
        mmask_t dummy;
        mousemask(
            0,       /* The events you want to listen to */
            &dummy); /* The old events mask                */


        // turn off mouse movement reports.
        std::cout << "\033[?1003l" << std::flush;

        if (curses_window_)
        {
            clear_window();
            //q restore_colors();
            del_panel(curses_panel_);
            delwin(curses_window_);

            update_panels();
            werase(root_window_);
            curs_set(1);

            endwin(); /* End curses mode		  */
            curses_window_ = nullptr;
            curses_panel_ = nullptr;
        }
        this->quit_ = true;
    }
}

void NWindow::clear_window()
{
    werase(curses_window_);

    // if (curses_window_)
    // {
    //     int width = this->actual_window_position_.width;
    //     int height = this->actual_window_position_.height;
    //     for (int y = 0; y < height; ++y)
    //     {
    //         for (int x = 0; x < width; ++x)
    //         {
    //             mvwaddch(this->curses_window_, y, x, ' ');
    //         }
    //     }
    // }
}


NRect NWindow::calculate_window_position(int max_width, int max_height)
{

    NRect bounds = window_position_;
    bounds.width = this->width();
    bounds.height = this->height();

    if (this->curses_window_ == nullptr) {
        if (bounds.width < 0 || bounds.height < 0)
        {
            // autosize the window.
            NSize available = { width(),height() };
            if (available.width < 0 || available.height < 0)
            {
                available = measure(available);

            }
            bounds.width = available.width;
            bounds.height = available.height;
        }
        else {
            measured_.width = width();
            measured_.height = height();
        }
    }
    else {
        bounds.width = measured_.width;
        bounds.height = measured_.height;
    }
    if (bounds.x == AUTO_SIZE)
    {
        bounds.x = (max_width - bounds.width) / 2;
    }
    if (bounds.y == AUTO_SIZE)
    {
        bounds.y = (max_height - bounds.height) / 2;
    }

    return bounds;

}


bool NWindow::update_window_size()
{
    bool changed = false;
    int maxX = COLS;
    int maxY = LINES;


    if (!window())
    {
        set_window(this);
    }

    NRect bounds = calculate_window_position(maxX, maxY);


    if (bounds.right() > maxX)
    {
        bounds.x = maxX - bounds.width;
    }
    if (bounds.x < 0)
    {
        bounds.x = 0;
    }
    if (bounds.bottom() > maxY)
    {
        bounds.y = maxY - bounds.height;
    }
    if (bounds.y < 0)
    {
        bounds.y = 0;
    }

    if (this->curses_window_ == nullptr)
    {
        curs_set(0);

        this->actual_window_position_ = bounds;
        this->curses_window_ = newwin(actual_window_position_.height, actual_window_position_.width, actual_window_position_.y, actual_window_position_.x);
        this->curses_panel_ = new_panel(this->curses_window_);

        keypad(curses_window_, TRUE);
        noecho();

        changed = true;

    }
    else if (this->actual_window_position_ != bounds)
    {
        if (this->actual_window_position_.width != bounds.width || this->actual_window_position_.height != bounds.height)
        {
            // resize the window.   
            wclear(this->root_window_);

            auto old_window = this->curses_window_;

            this->actual_window_position_ = bounds;

            this->curses_window_ = newwin(actual_window_position_.height, actual_window_position_.width, actual_window_position_.y, actual_window_position_.x);
            keypad(curses_window_, TRUE);
            replace_panel(curses_panel_, curses_window_);

            if (old_window)
            {
                delwin(old_window);
                this->curses_window_ = nullptr;
            }

            get_root_window()->redraw_all_windows_ = true;
            changed = true;
        }
        else {
            actual_window_position_ = bounds;

            move_panel(curses_panel_, actual_window_position_.y, actual_window_position_.x);
            refresh();
            update_panels();
            redraw_all_windows_ = true;
        }
    }

    for (auto childWindow : child_windows_)
    {
        changed |= childWindow->update_window_size();
    }
    return false;

}

void NWindow::redraw_all_windows() {
    redraw_all_windows_ = false;
    get_root_window()->for_each_child_window_parent_first([](NWindow* child) {
        wclear(child->curses_window_);
        child->invalidate_layout();
        // force panel manager to order windows correctly.
        top_panel(child->curses_panel_);
        ::refresh();
        update_panels();
        });

}


bool NWindow::update_active_window()
{
    NWindow* active_window = compute_active_window();
    if (this->active_window_ != active_window)
    {
        for_each_child_window([active_window](NWindow* child) {
            child->active_window_ = active_window;
            bool isActive = (child == active_window);
            if (child->is_active_window_ != isActive)
            {
                child->is_active_window_ = isActive;
                if (child->is_active_window_)
                {
                    child->actual_focus(child->logical_focus_.lock()); // restore the focus if it's coming back
                    child->handle_is_active_changed(true);

                    // Notify the child of the current mouse position 
                    // so that it can restore hover state.
                    auto rootWindow = child->get_root_window();

                    if (rootWindow->last_mouse_position_.x != -1 && rootWindow->last_mouse_position_.y != -1)
                    {
                        NMouseEventArgs child_event_args(child);

                        int x = rootWindow->last_mouse_position_.x;
                        int y = rootWindow->last_mouse_position_.y;
                        if (!wmouse_trafo(child->curses_window_, &y, &x, FALSE))
                        {
                            x = -1;
                            y = -1;
                        }
                        child_event_args.cursor_position = { x,y };
                        child->handle_window_mouse_move(child_event_args);
                    }

                }
                else {
                    child->handle_is_active_changed(false);
                    child->actual_focus(nullptr);

                }
            }
            });
        return true;
    }
    return false;
}

bool NWindow::run_one()
{

    if (update_window_size())
    {
        return true;
    }

    if (attach_windows())
    {
        return true;
    }

    if (layout()) {
        return true;
    }
    if (update_active_window())
    {
        return true;
    }
    if (execute_posts())
    {
        return true;
    }
    if (redraw_all_windows_)
    {
        redraw_all_windows();
        return true;
    }
    {

        for_each_child_window([](NWindow* child) {
            child->render_outer();
            });

        // update cursors.


        return false;
    }
}


void NWindow::set_initial_focus()
{
    auto requested_focus = this->find_child_element([](NElement& element) {
        if (element.request_initial_focus() && element.focusable() && !element.disabled())
        {
            return true;
        }
        return false;
        });

    if (requested_focus)
    {
        actual_focus(requested_focus);
        return;
    }
    auto logical_focus = logical_focus_.lock();
    if (logical_focus)
    {
        actual_focus(logical_focus);
    }
    else {
        navigate_focus(0, 0, NNavDirection::Home);
    }
}

bool NWindow::layout()
{
    bool layout_updated = false;


    if (!this->layout_valid_)
    {
        for_each_element(
            [](NElement& element) {
                element.render_valid_ = false;
                element.layout_valid_ = true;
            }
        );

        layout_updated = true;
        NSize available = { width(),height() };
        measured_ = measure(available);
        NRect bounds = NRect(0, 0, measured_.width, measured_.height);

        arrange(bounds);
    }
    if (first_layout_)
    {
        first_layout_ = false;
        set_initial_focus();

    }

    for (auto child : child_windows_)
    {
        layout_updated |= child->layout();
    }
    return layout_updated;

}

NTextElement::NTextElement(const std::string& text)
    : super("Text")
{
    this->text_ = text;
}

void NTextElement::text(const std::string& value)
{
    if (this->text_ != value)
    {
        this->text_ = value;
        if (width() == AUTO_SIZE)
        {
            invalidate_layout();
        }
        invalidate_render();
    }
}

void NTextElement::color(const std::optional<NColorPair>& value)
{
    color_ = value;
    invalidate_render();
}


void NWindow::color_palette(const NColorPalette& color_palette)
{
    this->color_palette(std::make_shared<NColorPalette>(color_palette));
}
void NWindow::color_palette(std::shared_ptr<NColorPalette> color_palette)
{
    color_palette_ = color_palette;
    for (auto child : child_windows_)
    {
        child->color_palette(color_palette_);
    }
}


void NWindow::add_child_window(NWindow::ptr child)
{
    this->child_windows_.push_back(child);
    child->parent_window_ = this;
    child->is_unicode_locale_ = this->is_unicode_locale_;
    child->color_palette(this->color_palette_);

}

bool NWindow::remove_child_window(NWindow::ptr child)
{
    return remove_child_window(child.get());
}
bool NWindow::remove_child_window(NWindow* child)
{
    for (auto i = child_windows_.begin(); i != child_windows_.end(); ++i)
    {
        if (i->get() == child)
        {
            child->parent_window_ = nullptr;
            child_windows_.erase(i);
            return true;
        }
    }
    return false;
}

NWindow* NWindow::get_root_window()
{
    NWindow* window = this;
    while (window->parent_window_ != nullptr)
    {
        window = window->parent_window_;
    }
    return window;
}
const NWindow* NWindow::get_root_window() const
{
    const NWindow* window = this;
    while (window->parent_window_ != nullptr)
    {
        window = window->parent_window_;
    }
    return window;
}


std::string NWindow::locale_ = "";


static std::string make_utf8_locale(std::string locale)
{
    auto npos = locale.find(".");
    if (npos != std::string::npos)
    {
        locale = locale.substr(0, npos);
    }
    return locale + ".UTF-8";
}

void NWindow::set_locale_(const std::string& requested_locale)
{
    std::setlocale(LC_ALL, "");
    const char* locale = std::setlocale(LC_ALL, nullptr);
    if (!requested_locale.empty())
    {
        locale = requested_locale.c_str();
    }
    else {
        const std::string utf8Locale = make_utf8_locale(locale);
        char* result = std::setlocale(LC_ALL, utf8Locale.c_str());
        if (!result)
        {
            is_unicode_locale_ = true;
            return;
        }
    }

    if (strcmp(locale, "TEST") == 0) { // test case for non-utf8 display.
        char* result = std::setlocale(LC_ALL, "en-US.UTF-8");
        if (!result)
        {
            throw std::runtime_error("Unable to set locale.");
        }
        is_unicode_locale_ = false;
        return;
    }
    char* result = std::setlocale(LC_ALL, make_utf8_locale(locale).c_str());
    if (!result)
    {
        is_unicode_locale_ = false;
        return;
    }
    result = std::setlocale(LC_ALL, requested_locale.c_str());
    if (!result)
    {
        is_unicode_locale_ = false;
        return;
    }

    throw std::runtime_error("Unable to set locale.");

}

void NWindow::set_locale(const std::string& locale)
{
    NWindow::locale_ = locale;
}
void NWindow::init_root_window()
{
    if (root_window_exists_)
    {
        throw std::runtime_error("A root window already exists. Create a child window instead, by supplying a parent window argument to NWindow::create.");
    }
    std::string old_locale = ::setlocale(LC_ALL, "");
    std::string locale = ::setlocale(LC_ALL, nullptr);

    is_unicode_locale_ = locale.find(".UTF-8") != std::string::npos;

    unicode_services_ = UnicodeServices::GetInstance(locale);
    collator_ = unicode_services_->MakeCollator();
    normalizer_ = unicode_services_->MakeNormalizer();

    if (locale_ == "C") {
        is_unicode_locale_ = false;
    }



    ESCDELAY = 25;
    root_window_ = initscr(); /* Start curses mode 		  */
    if (root_window_ == nullptr)
    {
        throw std::runtime_error("Error initialising ncurses.");
    }
    // turn on unicode.
    std::cout << "\033%%@";
    std::cout.flush();

    this->clipboard = NClipboard::create();

    if (::has_colors())
    {
        has_colors_ = true;
        start_color();
        max_colors_ = COLORS;
        max_color_pairs_ = COLOR_PAIRS;

        init_color(COLOR_BLACK, color_palette_->Black);
        init_color(COLOR_WHITE, color_palette_->White);

        if (color_palette_->DesktopBackground != color_palette_->Black) {
            auto desktopColor = make_color_pair(color_palette_->DesktopBackground, color_palette_->DesktopBackground);
            wbkgd(root_window_, desktopColor.attribute());
        }




    }
    signal(SIGINT, SIG_IGN); // disable ctl-c handling.
    raw();
    if (true) {
        struct termios term;
        tcgetattr(STDIN_FILENO, &term);
        term.c_lflag &= ~(ICANON | ECHO);
        term.c_cc[VMIN] = 1;
        term.c_cc[VTIME] = 0;
        term.c_cc[VINTR] = _POSIX_VDISABLE; // ctrl+c
        term.c_cc[VSTART] = _POSIX_VDISABLE; // ctrl+
        term.c_cc[VSTOP] = _POSIX_VDISABLE; //ctrl+q
        term.c_cc[VEOF] = _POSIX_VDISABLE;  //ctrl+d
        term.c_cc[VSUSP] = _POSIX_VDISABLE; //ctrl+z0
        tcsetattr(STDIN_FILENO, TCSANOW, &term);
    }
    mousemask(
        ALL_MOUSE_EVENTS | REPORT_MOUSE_POSITION, /* The events you want to listen to */
        &oldMouseMask);                           /* The old events mask                */

    mouseinterval(0); // default click handling is meshuginah. We'll handle clicks ourself.

    // mysterious voodoo required to get mouse movement reports.
    std::cout << "\033[?1003h" << std::flush;


}

NWindow::ptr NWindow::create_(NWindow::ptr parentWindow, int x, int y, int width, int height, NColorPalette* colorPalette)
{
    auto result = std::shared_ptr<self>(new NWindow(
        x, y, width, height, colorPalette));
    if (parentWindow)
    {
        parentWindow->add_child_window(result);
    }
    else {
        result->init_root_window();
    }
    return result;
}

NWindow::NWindow(
    int x, int y, int width, int height,
    NColorPalette* colorPalette)
    : super("Window")
{
    this->measured_ = { -1,-1, }; // flag to indicate that we need to measure on window creation.
    if (colorPalette == nullptr)
    {
        this->color_palette_ = std::make_shared<NColorPalette>();
    } else {
        this->color_palette_ = std::make_shared<NColorPalette>(*colorPalette);
    }

    this->window_position_ = NRect(x, y, width, height);
    this->width(width);
    this->height(height);
}

NSize NTextElement::measure(const NSize& available)
{
    if (wrap_text_)
    {
        int width, height;
        if (this->width() == AUTO_SIZE)
        {
            width = available.width;
        }
        else
        {
            width = this->width();
        }
        this->lines_ = utf8_line_wrap(text_, width);
        height = (int)lines_.size();
        if (height > available.height)
        {
            height = available.height;
        }
        return NSize(width, height);
    }
    else {
        NSize result = { measure_text(this->text()), 1 };
        if (width() != AUTO_SIZE)
        {
            result.width = width();
        }
        if (available.width != AUTO_SIZE && result.width > available.width)
        {
            result.width = available.width;
        }
        if (result.width < 0)
        {
            result.width = 0;
        }
        return result;
    }
}

void NVerticalStackElement::alignment(NAlignment value)
{
    if (value != alignment_)
    {
        alignment_ = value;
        invalidate_layout();
    }
}

void NVerticalStackElement::row_gap(int value)
{
    if (row_gap_ != value)
    {
        row_gap_ = value;
        invalidate_layout();
    }
}
void NHorizontalStackElement::column_gap(int value)
{
    if (column_gap_ != value)
    {
        column_gap_ = value;
        invalidate_layout();
    }
}


void NTextEditElement::scroll_adjust()
{
    // position the scroll offset so that the cursor is visible. 
    // Complicated by the fact that some unicode characters occupy two display columns.
    const int WIDOW = 3;
    int width = this->actual_width();


    size_t scroll_x_offset = (size_t)scroll_x_offset_;


    if (selection_.end() < 0) {
       throw std::runtime_error("Invalid selection.");
    }
    size_t selectionEnd = (size_t)selection_.end();

    int cursorPosition = utf8_wc_length(text_, 0, selectionEnd);
    if (scroll_x_offset > selectionEnd)
    {
        scroll_x_offset = selectionEnd;
    }

    if (width < WIDOW)
    {
        throw std::runtime_error("Text Edit controls must be at least 3 characters wide.");
    }


    while (cursorPosition - utf8_wc_length(text_, 0, scroll_x_offset) > (size_t)(width - WIDOW))
    {
        ++scroll_x_offset;
    }
    // maximum scroll places last character +1 at the end of the window.
    int contentLength = utf8_wc_length(text_);
    while (
        scroll_x_offset > 0
        && contentLength - utf8_wc_length(text_, 0, scroll_x_offset - 1) < (size_t)width)
    {
        --scroll_x_offset;
    }
    while (scroll_x_offset > 0 && cursorPosition - utf8_wc_length(text_, 0, scroll_x_offset) < WIDOW)
    {
        --scroll_x_offset;
    }

    this->scroll_x_offset_ = (int)scroll_x_offset;

}


NSize NVerticalStackElement::measure(const NSize& available)
{
    NSize constrainedWidth = { available.width, std::numeric_limits<int>::max() };

    if (this->width() != AUTO_SIZE)
    {
        if (constrainedWidth.width == AUTO_SIZE)
        {
            constrainedWidth.width = this->width();
        }
        else {
            constrainedWidth.width = std::min(this->width(), constrainedWidth.width);
        }
    }
    int height = 0;
    int width = 0;

    for (auto& child : children())
    {
        auto childSize = measure_child_with_margins(constrainedWidth, child);
        child->measured(childSize);
        height += childSize.height;
        width = std::max(width, childSize.width);
    }
    if (children().size() > 1)
    {
        height += (int)(children().size() - 1) * row_gap_;
    }
    if (this->width() != AUTO_SIZE)
    {
        width = this->width();
    }
    if (this->height() != AUTO_SIZE)
    {
        height = this->height();
    }
    return NSize(width, height);
}
NSize NHorizontalStackElement::measure(const NSize& available)
{
    NSize constrainedWidth = { available.width, std::numeric_limits<int>::max() };
    if (this->width() != AUTO_SIZE)
    {
        if (constrainedWidth.width == AUTO_SIZE)
        {
            constrainedWidth.width = width();
        }
        else {
            constrainedWidth.width = std::min(constrainedWidth.width, width());
        }
    }

    int height = 1;
    int width = 0;

    for (auto& child : children())
    {
        auto childSize = measure_child_with_margins(constrainedWidth, child);
        child->measured(childSize);
        width += childSize.width;
        height = std::max(height, childSize.height);
    }
    if (children().size() > 1)
    {
        width += (int)(children().size() - 1) * column_gap_;
    }
    if (this->alignment_ != NAlignment::Start && available.width != AUTO_SIZE)
    {
        width = available.width;
    }
    if (this->width() != AUTO_SIZE)
    {
        width = this->width();
    }
    if (this->height() != AUTO_SIZE)
    {
        height = this->height();
    }
    return NSize(width, height);
}

void NHorizontalStackElement::alignment(NAlignment value)
{
    if (value != alignment_)
    {
        alignment_ = value;
        invalidate_layout();
    }
}

void NHorizontalStackElement::arrange(const NRect& rect)
{
    NElement::arrange(rect);

    int contentWidth = 0;
    for (auto& child : children())
    {
        contentWidth += child->measured().width;
    }
    if (children().size() >= 2)
    {
        contentWidth += (int)((children().size() - 1) * column_gap());
    }
    int extra = rect.width - contentWidth;
    if (extra < 0) extra = 0;


    int y = rect.y;
    int x = rect.x;
    int right = rect.right();
    int bottom = rect.bottom();



    switch (alignment_)
    {
    case NAlignment::End:
        x += extra;
        break;
    case NAlignment::Center:
        x += extra / 2;
        break;
    default:
        break;
    }


    for (auto& child : children())
    {
        NSize measured = child->measured();
        int childBottom = y + measured.height;
        if (childBottom > bottom)
        {
            childBottom = bottom;
        }
        int childRight = x + measured.width;
        if (childRight > right)
        {
            childRight = right;
        }
        NRect childRect = NRect(x, y, childRight - x, childBottom - y);

        childRect = childRect.inset(child->margin());
        childRect = childRect.intersect(rect);
        child->arrange(childRect);
        x += measured.width + column_gap_;
    }
}

void NVerticalStackElement::arrange(const NRect& rect)
{
    NElement::arrange(rect);
    int y = rect.y;

    for (auto& child : children())
    {
        NSize measured = child->measured();
        NRect childRect{ -1,y,measured.width,measured.height };
        switch (alignment_)
        {
        case NAlignment::Start:
            childRect.x = rect.x;
            break;
        case NAlignment::Center:
            childRect.x = rect.x + (rect.width - measured.width) / 2;
            break;
        case NAlignment::Justify:
            childRect.x = rect.x;
            childRect.width = rect.width;
            break;
        case NAlignment::End:
            childRect.x = rect.right() - measured.width;
            break;
        }

        childRect = childRect.inset(child->margin());
        childRect = childRect.intersect(rect);

        child->arrange(childRect);
        y += measured.height + row_gap_;
    }
}

void NContainerElement::arrange(const NRect& rect)
{
    super::arrange(rect);

    for (auto& child : children_)
    {
        NRect childRect = rect.inset(child->margin());
        child->arrange(childRect);
    }
}

NSize NContainerElement::measure_child_with_margins(const NSize& available, NElement::ptr& child)
{
    const NThickness& margin = child->margin();
    NSize childAvailable = {
        std::max(0, available.width - margin.left - margin.right),
        std::max(0, available.height - margin.top - margin.bottom) };
    if (available.width == AUTO_SIZE)
    {
        childAvailable.width = AUTO_SIZE;
    }
    if (available.height == AUTO_SIZE)
    {
        childAvailable.height = AUTO_SIZE;
    }
    NSize childSize = child->measure(childAvailable);
    child->measured(childSize);

    childSize.width += margin.left + margin.right;
    childSize.height += margin.top + margin.bottom;
    return childSize;
}

NSize NContainerElement::measure(const NSize& available)
{
    NSize result;

    for (auto& child : children_)
    {
        auto childSize = measure_child_with_margins(available, child);
        child->measured(childSize);
        result.width = std::max(childSize.width, result.width);
        result.height = std::max(childSize.height, result.height);
    }

    return result;
}

void NContainerElement::render()
{
    super::render();
}
void NContainerElement::render_outer() {
    super::render_outer();
    for (auto& child : children_)
    {
        child->render_outer();
    }
}


void NElement::set_window(NWindow* window)
{
    if (window != this->window_)
    {
        if (this->window_)
        {
            handle_detaching();
        }
        this->window_ = window;
        if (this->window_)
        {
            handle_attached(this->window_);
        }
    }
}

void NContainerElement::set_window(NWindow* window)
{
    for (auto& child : children_)
    {
        child->set_window(window);
    }
    NElement::set_window(window);
}

static std::string pad_utf8(const std::string& utf8_string, size_t count, NAlignment alignment);

void NTextElement::render()
{
    move(0, 0);
    if (text_attribute_)
    {
        this->attribute_on(*text_attribute_);
    }
    if (color_)
    {
        this->color_on(*color_);
    }
    if (this->wrap_text_)
    {
        int line = 0;
        for (auto& text : lines_)
        {
            move(0, line++);
            print(text);
        }
    }
    else
    {
        int actualWidth = this->actual_width();
        std::string text = pad_utf8(this->text_, (size_t)actualWidth, alignment_);

        print(text);
    }

    if (color_)
    {
        this->color_off(*color_);
    }
    if (text_attribute_)
    {
        this->attribute_off(*text_attribute_);
    }
}

void NElement::render_outer()
{
    // window()->clear_attributes();
    if (!render_valid_)
    {
        render_valid_ = true;
        render();
    }
}

void NElement::height(int value)
{
    if (height_ != value)
    {
        height_ = value;
        invalidate_layout();
    }
}
void NElement::width(int value)
{
    if (width_ != value)
    {
        width_ = value;
        invalidate_layout();
    }
}

void NWindow::set_attributes(NAttribute attribute, short colorPair)
{
    if (colorPair == -1)
    {
        attr_t dummyAttr;
        wattr_get(this->curses_window_, &dummyAttr, &colorPair, nullptr);
    }
    wattr_set(this->curses_window_, (attr_t)attribute, colorPair, nullptr);
}



// pads or trims the supplied utf8 string to contain exactly <count> characters;
static std::string pad_utf8(const std::string& utf8_str, size_t count, NAlignment alignment)
{
    std::basic_stringstream<char32_t>  ss;

    size_t length = 0;
    for (size_t i = 0; i < utf8_str.length();)
    {
        char32_t c = utf8_char32_at(utf8_str, i);
        if (c == 0)
        {
            break;
        }
        ssize_t charWidth = (ssize_t)wcwidth(c);
        if (charWidth < 0)
        {
            break;
        }
        if (length + charWidth > count)
        {
            break;
        }
        ss << c;
        length += charWidth;
        i = utf8_increment(utf8_str, i);
    }
    std::string result = u32string_to_utf8(ss.str());
    if (length < count)
    {
        int extra = count - length;
        switch (alignment)
        {
        case NAlignment::Justify:
        case NAlignment::Start:
            result = result + std::string(extra, ' ');
            break;
        case NAlignment::End:
            result = std::string(extra, ' ') + result;
            break;

        case NAlignment::Center:
        {
            int start = extra / 2;
            int end = extra - start;
            result = std::string(start, ' ') + result + std::string(end, ' ');
        }
        break;
        }
    }
    return result;
}


PostHandle NWindow::post(clock_t::duration delay, std::function<void(void)>&& fn)
{
    return post(clock_t::now() + delay, std::move(fn));
}
PostHandle NWindow::post(clock_t::time_point when, std::function<void(void)>&& fn)
{
    if (this != get_root_window())
    {
        return get_root_window()->post(when, std::move(fn));
    }

    std::lock_guard lock(post_entry_mutex);
    PostHandle handle = ++nextPostHandle;
    post_entries.push_back(
        PostEntry{ handle, when, std::move(fn) });
    return handle;
}

PostHandle NWindow::post(std::function<void(void)>&& fn)
{
    return post(clock_t::time_point::min(), std::move(fn));
}

bool NWindow::cancel_post(PostHandle handle)
{
    if (this != get_root_window())
    {
        return get_root_window()->cancel_post(handle);
    }

    std::lock_guard lock(post_entry_mutex);

    for (auto i = post_entries.begin(); i != post_entries.end(); ++i)
    {
        if (i->postHandle == handle)
        {
            post_entries.erase(i);
            return true;
        }
    }
    return false;
}

bool NWindow::execute_posts()
{
    bool executed = false;
    while (true)
    {
        std::function<void(void)> fn;
        {
            std::lock_guard lock(post_entry_mutex);

            if (this->quit_)
            {
                post_entries.clear();
                return true;
            }

            auto now = clock_t::now();

            for (auto i = post_entries.begin(); i != post_entries.end(); ++i)
            {
                if (i->when < now)
                {
                    fn = std::move(i->callback);
                    post_entries.erase(i);
                    break;
                }
            }
        }
        if (fn)
        {
            executed = true;
            fn();
        }
        else
        {
            break;
        }
    }

    return executed;
}

int NWindow::time_to_next_post()
{
    std::lock_guard lock(post_entry_mutex);
    clock_t::time_point nextTime = clock_t::time_point::max();

    for (auto& postEntry : post_entries)
    {
        if (postEntry.when < nextTime)
        {
            nextTime = postEntry.when;
        }
    }
    if (nextTime == clock_t::time_point::max())
    {
        return 250;
    }
    auto duration = nextTime - clock_t::now();
    auto ms = std::chrono::duration_cast<std::chrono::milliseconds>(duration).count();
    if (ms > 250)
    {
        ms = 250;
    }
    return (int)ms + 1;
}

float srgbToLinear(float srgb_value)
{
    // Check if the value is in the valid range
    if (srgb_value <= 0.0f)
        return 0.0f;
    if (srgb_value >= 1.0f)
        return 1.0f;

    // Standard sRGB to linear conversion
    if (srgb_value <= 0.04045f)
    {
        return srgb_value / 12.92f;
    }
    else
    {
        return std::pow((srgb_value + 0.055f) / 1.055f, 2.4f);
    }
}

static short ToNCursesColor(int value)
{
    float fValue = value / 255.0f;
    fValue = srgbToLinear(fValue);
    return (short)(std::round(fValue * 1000.0f));
}

NColor NWindow::make_color(uint32_t rrggbb)
{
    if (this != get_root_window())
    {
        return get_root_window()->make_color(rrggbb);
    }
    if (rrggbb == 0x000000)
    {
        return NColor::Black;
    }
    if (rrggbb == 0xFFFFFF)
    {
        return NColor::White;
    }

    auto ff = allocated_colors_.find(rrggbb);
    if (ff != allocated_colors_.end())
    {
        return ff->second.color;
    }
    short newIndex;

    while (true)
    {
        newIndex = nextColorIndex++;
        if (newIndex == COLOR_WHITE || newIndex == COLOR_BLACK)
        {
            continue;
        }
        break;
    }
    if (newIndex >= COLORS)
    {
        throw std::runtime_error("Maximum number of colors exceeded.");
    }
    AllocatedColorT allocated_color;

    int rc = color_content(newIndex,
        &allocated_color.old_r,
        &allocated_color.old_g,
        &allocated_color.old_b);
    allocated_color.old_color_valid = rc != ERR;

    rc = ::init_color(newIndex,
        ToNCursesColor((rrggbb >> 16) & 0x0FF),
        ToNCursesColor((rrggbb >> 8) & 0x0FF),
        ToNCursesColor((rrggbb >> 0) & 0x0FF));
    if (rc == ERR)
    {
        throw std::runtime_error("failed to create new color.");
    }

    allocated_color.rrggbb = rrggbb;
    allocated_color.color = NColor{ newIndex };
    allocated_color.color_index = newIndex;
    allocated_colors_[rrggbb] = allocated_color;

    return allocated_color.color;
}

NColorPair NWindow::make_color_pair(uint32_t rrggbbFg, uint32_t rrggbbBg)
{
    if (this->get_root_window() != this)
    {
        return get_root_window()->make_color_pair(rrggbbFg, rrggbbBg);
    }
    return make_color_pair(make_color(rrggbbFg), make_color(rrggbbBg));
}

NColorPair NWindow::make_color_pair(NColor foreground, NColor background)
{
    if (this->get_root_window() != this)
    {
        return get_root_window()->make_color_pair(foreground, background);
    }

    for (auto entry : color_pairs_)
    {
        if (entry.foreground == foreground && entry.background == background)
        {
            return entry.color_pair;
        }
    }
    short index = next_color_pair_index++;
    NColorPair newPair = NColorPair(COLOR_PAIR(index));



    short old_foreground = 0, old_background = 0;
    int rc = pair_content(index,
        &old_foreground,
        &old_background);

    bool old_pair_valid = rc != ERR;

    rc = init_pair(index, foreground.color_index(), background.color_index());
    if (rc == ERR)
    {
        throw std::runtime_error("Failed to create color pair.");
    }

    ColorPairEntry new_entry{
        index, newPair,foreground, background,
        old_pair_valid, old_foreground, old_background };


    color_pairs_.push_back(new_entry);
    return newPair;
}

void NWindow::restore_colors()
{
    for (const auto& entry_pair : allocated_colors_)
    {
        const auto& entry = entry_pair.second;
        if (entry.old_color_valid)
        {
            ::init_color(entry.color_index,
                entry.old_r,
                entry.old_g,
                entry.old_b);
        }
    }
    for (auto& entry : color_pairs_)
    {
        if (entry.old_pair_valid)
        {
            init_pair(entry.index, entry.old_foreground, entry.old_background);
        }
    }
}

NElement::ptr NElement::get_element_at(int x, int y)
{
    if (this->bounds_.contains(x, y))
    {
        return this->shared_from_this();
    }
    return nullptr;
}

NElement::ptr NContainerElement::get_element_at(int x, int y)
{
    for (auto i = children().rbegin(); i != children().rend(); ++i)
    {
        auto result = (*i)->get_element_at(x, y);
        if (result)
        {
            return result;
        }
    }
    return super::get_element_at(x, y);
}

bool NWindow::bubble_mouse_event(int x, int y, const std::function<bool(NElement&)>& fn)
{
    auto mouse_capture = this->mouse_capture();
    if (mouse_capture)
    {
        return fn(*mouse_capture);
    }
    return bubble_event(x, y, fn);
}

bool NWindow::bubble_mouse_event(NElement::ptr element, const std::function<bool(NElement&)>& fn)
{
    auto mouse_capture = this->mouse_capture();

    if (mouse_capture)
    {
        auto t = fn;
        return t(*mouse_capture);
    }
    return bubble_event(element, fn);
}

bool NWindow::bubble_event(NElement::ptr element, const std::function<bool(NElement&)>& fn)
{

    while (element)
    {
        auto t = fn;
        if (t(*element))
        {
            return true;
        }
        if (!element->parent())
        {
            break;
        }
        element = element->parent()->shared_from_this<NElement>();
    }
    return false;
}

bool NWindow::bubble_event(int x, int y, const std::function<bool(NElement&)>& fn)
{
    NElement::ptr element = get_element_at(x, y);
    return bubble_event(element, fn);
}


void NWindow::handle_window_mouse_move(NMouseEventArgs& event_args)
{
    if (entered_element_)
    {
        event_args.handled = false;
        while (entered_element_ && !entered_element_->bounds_.contains(event_args.cursor_position))
        {
            auto t = entered_element_;
            if (!entered_element_->parent())
            {
                break;
            }
            entered_element_ = entered_element_->parent()->shared_from_this<NElement>();

            if (t->mouse_entered_)
            {
                t->mouse_entered_ = false;
                t->handle_mouse_leave(event_args);
            }
        }
    }
    NElement::ptr entered_element = get_element_at(event_args.cursor_position);
    this->entered_element_ = entered_element;

    event_args.handled = false;
    while (entered_element)
    {
        if (!entered_element->mouse_entered_)
        {
            entered_element->mouse_entered_ = true;
            entered_element->handle_mouse_enter(event_args);
        }
        if (!entered_element->parent())
        {
            break;
        }
        entered_element = entered_element->parent()->shared_from_this<NElement>();
    }

    event_args.handled = false;

    auto capture = this->mouse_capture();
    if (capture)
    {
        if (capture->handle_mouse_move(event_args))
        {
            return;
        }
        // only the capture gets the event.
        // else {
        //     bubble_mouse_event(event_args.x, event_args.y,
        //         [&](NElement& element)
        //         {
        //             return element.handle_mouse_move(event_args);
        //         });
        // }
    }
    on_mouse_move.fire(event_args);

}

void NWindow::handle_button_released(int x, int y, int button, NMouseEventArgs& event_args_)
{
    // fires on all child windows; but click only happens on the active window.

    NMouseEventArgs event_args(event_args_);
    event_args.window = this->shared_from_this<NWindow>();
    event_args.source = event_args.window;

    if (!wmouse_trafo(curses_window_, &y, &x, FALSE))
    {
        x = -1;
        y = -1;
    }
    event_args.cursor_position = NPoint{ x,y };


    event_args.handled = false;
    NElement::ptr button_down_element = button_down_elements_[button];
    button_down_elements_[button] = nullptr;

    bool handled = false;
    if (button_down_element) {
        event_args.target = button_down_element;

        handled = bubble_mouse_event(button_down_element,
            [&](NElement& element)
            {
                return element.handle_mouse_button_released(button, event_args);
            });
    }
    else {
        event_args.target = this->shared_from_this<NElement>();
        this->handle_mouse_button_released(button, event_args);
    }
    if (button_down_element && is_active_window() && !handled)
    {
        if (button_down_element->mouse_entered() && !button_down_element->disabled())
        {
            button_down_element->handle_mouse_button_clicked(button, event_args);
        }
    }

}

void NWindow::handle_button_pressed(int x, int y, int button, NMouseEventArgs& event_args_)
{
    // only fires on the active window.
    if (this->active_window_ != this)
    {
        active_window_->handle_button_pressed(x, y, button, event_args_);
        return;
    }
    if (!this->active_window_) return;

    NMouseEventArgs event_args(event_args_);
    event_args.window = this->shared_from_this<NWindow>();
    event_args.source = event_args.window;

    bool handled = false;
    if (!wmouse_trafo(curses_window_, &y, &x, FALSE))
    {
        x = -1;
        y = -1;
    }
    event_args.cursor_position = { x,y };

    event_args.handled = false;

    auto element = get_clickable_element_at(event_args.cursor_position);
    if (element)
    {
        event_args.target = element;
        handled = bubble_mouse_event(element,
            [&](NElement& bubbleElement)
            {
                return bubbleElement.handle_mouse_button_pressed(button, event_args);
            });
    }
    else {
        // unconditionally on the window.
        event_args.target = this->shared_from_this<NElement>();
        handled = this->handle_mouse_button_pressed(button, event_args);
    }

    if (!handled)
    {
        if (button >= MAX_BUTTON) {
            throw std::runtime_error("Invalid argument.");
        }
        button_down_elements_[button] = element;
    }
}

bool NWindow::handle_mouse_event(MEVENT& event)
{
    NMouseEventArgs event_args(this);

    event_args.button0_pressed = (event.bstate & BUTTON1_PRESSED) != 0;
    event_args.button1_pressed = (event.bstate & BUTTON2_PRESSED) != 0;
    event_args.button2_pressed = (event.bstate & BUTTON3_PRESSED) != 0;
    event_args.button3_pressed = (event.bstate & BUTTON4_PRESSED) != 0;


    event_args.alt = (event.bstate & BUTTON_ALT) != 0;
    event_args.ctrl = (event.bstate & BUTTON_CTRL) != 0;
    event_args.shift = (event.bstate & BUTTON_SHIFT) != 0;

    if (event.bstate & REPORT_MOUSE_POSITION)
    {
        last_mouse_position_ = { event.x,event.y };

        for_each_child_window([&](NWindow* child) {
            if (child->is_active_window_)
            {
                NMouseEventArgs child_event_args(event_args);
                child_event_args.window = child->shared_from_this<NWindow>();
                child_event_args.source = child_event_args.window;
                int x = event.x;
                int y = event.y;
                if (!wmouse_trafo(child->curses_window_, &y, &x, FALSE))
                {
                    x = -1;
                    y = -1;
                }
                child_event_args.cursor_position = { x,y };
                child->handle_window_mouse_move(child_event_args);

            }
            else {
                NMouseEventArgs child_event_args(event_args);
                child_event_args.window = child->shared_from_this<NWindow>();
                child_event_args.source = child_event_args.window;
                child_event_args.cursor_position = { -1,-1 };
                child->handle_window_mouse_move(child_event_args);
            }
            });
    }

    if (event.bstate & BUTTON1_PRESSED)
    {
        handle_button_pressed(event.x, event.y, 0, event_args);

    }
    if (event.bstate & BUTTON2_PRESSED)
    {
        handle_button_pressed(event.x, event.y, 1, event_args);
    }
    if (event.bstate & BUTTON3_PRESSED)
    {
        handle_button_pressed(event.x, event.y, 2, event_args);
    }
    if (event.bstate & BUTTON3_PRESSED)
    {
        handle_button_pressed(event.x, event.y, 3, event_args);
    }

    if (event.bstate & BUTTON1_RELEASED)
    {
        event_args.button0_pressed = false;

        for_each_child_window([&](NWindow* child) {
            child->handle_button_released(event.x, event.y, 0, event_args);
            });
    }
    if (event.bstate & BUTTON2_RELEASED)
    {
        event_args.button1_pressed = false;

        for_each_child_window([&](NWindow* child) {
            child->handle_button_released(event.x, event.y, 1, event_args);
            });
    }
    if (event.bstate & BUTTON3_RELEASED)
    {
        event_args.button2_pressed = false;

        for_each_child_window([&](NWindow* child) {
            child->handle_button_released(event.x, event.y, 2, event_args);
            });
    }
    if (event.bstate & BUTTON4_RELEASED)
    {
        event_args.button2_pressed = false;

        for_each_child_window([&](NWindow* child) {
            child->handle_button_released(event.x, event.y, 3, event_args);
            });
    }
    return true;
}

void NWindow::init_color(short index, uint32_t rrggbb)
{
    ::init_color(index,
        ToNCursesColor((rrggbb >> 16) & 0xFF),
        ToNCursesColor((rrggbb >> 8) & 0xFF),
        ToNCursesColor((rrggbb >> 0) & 0xFF));
}

const NColor NColor::Black{ COLOR_BLACK };
const NColor NColor::White{ COLOR_WHITE };


void NButtonBaseElement::handle_attached(NWindow* window)
{
    super::handle_attached(window);

    auto& palette = window->color_palette();
    disabled_color_ = window->make_color_pair(palette.Disabled, palette.Black);
    hover_color_ = window->make_color_pair(palette.HoverForeground, palette.HoverBackground);
    focus_color_ = window->make_color_pair(palette.FocusForeground, palette.FocusBackground);
    select_color_ = window->make_color_pair(palette.SelectedForeground, palette.SelectedBackground);
    normal_color_ = window->make_color_pair(palette.White, palette.Black);

    pressed_ = false;
}

void NButtonBaseElement::render_outer()
{
    auto color = get_color();
    color_on(color);
    super::render_outer();
    color_off(color);

}

void NButtonBaseElement::render()
{
    super::render();
}

NButtonBaseElement::NButtonBaseElement()
    : super("ButtonBase")
{
    this->focusable(true);
    this->clickable(true);
}

NButtonBaseElement::NButtonBaseElement(const std::string& tag) : NContainerElement(tag) {
    this->focusable(true);
    this->clickable(true);

}

NColorPair NButtonBaseElement::get_color()
{
    if (disabled())
    {
        return disabled_color_;
    }
    if (!window()->is_active_window())
    {
        return normal_color_;
    }
    if ((pressed_ && this->mouse_entered()) || keyboard_clicking())
    {
        return select_color_;
    }
    if (mouse_entered())
    {
        return hover_color_;
    }
    if (focused())
    {
        return focus_color_;
    }
    return normal_color_;
}
NColorPair NDropdownElement::get_color()
{
    if (disabled())
    {
        return disabled_color();
    }
    if (!window()->is_active_window())
    {
        return focus_color();
    }
    if ((pressed() && this->mouse_entered()) || keyboard_clicking())
    {
        return select_color();
    }
    if (mouse_entered())
    {
        return select_color();
    }
    if (focused())
    {
        return hover_color();
    }
    return focus_color();
}

bool NButtonBaseElement::handle_mouse_leave(NMouseEventArgs& event_args)
{
    invalidate_render();
    return super::handle_mouse_leave(event_args);
}
bool NButtonBaseElement::handle_mouse_enter(NMouseEventArgs& event_args)
{
    invalidate_render();
    return super::handle_mouse_enter(event_args);
}

void NButtonBaseElement::handle_focused(bool value)
{
    super::handle_focused(value);
    invalidate_render();
}

bool NButtonBaseElement::handle_mouse_button_pressed(int button, NMouseEventArgs& event_args)
{
    if (button == 0)
    {
        pressed_ = true;
        invalidate_render();
    }
    return super::handle_mouse_button_pressed(button, event_args);
}
bool NButtonBaseElement::handle_mouse_button_released(int button, NMouseEventArgs& event_args)
{
    if (button == 0)
    {
        pressed_ = false;
        invalidate_render();
    }
    return super::handle_mouse_button_released(button, event_args);
}

NElement::ptr NWindow::get_clickable_element_at(int x, int y)
{
    auto element = get_element_at(x, y);
    while (element)
    {
        if (element->clickable())
        {
            if (element->disabled())
            {
                return nullptr;
            }
            return element;
        }
        if (element->parent())
        {
            element = element->parent()->shared_from_this<NElement>();
        }
        else
        {
            break;
        }
    }
    return nullptr;
}

NButtonElement::NButtonElement(const std::string& label, int width)
    :NButtonBaseElement("Button")
    , label_(label)
{
    this->width(width);
}

void NButtonElement::handle_attached(NWindow* window)
{
    super::handle_attached(window);
}





NSize NButtonElement::measure(const NSize& available)
{
    int leftWidth = utf8_wc_length(prefix_);
    int rightWidth = utf8_wc_length(suffix_);
    int labelWidth = measure_menu_text(label_);

    if (this->width() != AUTO_SIZE)
    {
        labelWidth = this->width() - leftWidth - rightWidth;
    }
    return NSize(leftWidth + rightWidth + labelWidth, 1);
}

void NButtonElement::arrange(const NRect& bounds) {
    NElement::arrange(bounds);
}

void NButtonElement::render()
{
    int leftWidth = measure_text(prefix_);
    int rightWidth = measure_text(suffix_);
    if (actual_width() < leftWidth + rightWidth)
    {
        return;
    }
    move(0, 0);
    print(prefix_);
    int labelWidth = actual_width() - leftWidth - rightWidth;

    print_menu_text(label_, label_alignment_, labelWidth);
    print(suffix_);
}



void NTextElement::alignment(NAlignment value)
{
    if (this->alignment_ != value)
    {
        alignment_ = value;
        invalidate_render();
    }
}

void NElement::disabled(bool value)
{
    if (disabled_ != value)
    {
        disabled_ = value;
        invalidate_render();
    }
}

bool NElement::take_focus()
{
    if (!focusable()) return false;
    if (this->window_)
    {
        return this->window_->focus(this->shared_from_this());
    }
    return false;
}
bool NElement::focused() const
{
    return this->window_ != nullptr && this->window_->focus().get() == this;
}

bool NWindow::focus(NElement::ptr element)
{
    if (!element->focusable())
    {
        return false;
    }
    logical_focus_ = element;

    if (is_active_window_) {
        actual_focus(element);
        return true;
    }
    return false;
}

void NWindow::actual_focus(NElement::ptr element)
{
    auto focus = focus_.lock();
    if (focus.get() != element.get())
    {
        if (focus) {
            focus->handle_focused(false);
        }
        this->focus_ = element;

        on_focus_changed.fire(element);
        if (element)
        {
            element->handle_focused(true);
        }
    }
}

bool NElement::simulate_keyboard_click(NElement* source, int button)
{
    if (!clickable() || disabled()) return false;

    auto thisPointer = this->weak_from_this();

    cancel_keyboard_clicking_timer();
    keyboard_clicking_ = true;
    invalidate_render();

    this->keyboard_clicking_timer_ = this->window()->post(
        std::chrono::milliseconds(150),
        [thisPointer, source, button]()mutable {
            auto element = thisPointer.lock();
            if (!element) return;
            element->keyboard_clicking_timer_ = 0;
            element->keyboard_clicking_ = false;
            element->invalidate_render();
            NClickedEventArgs clicked_args{ element.get(),element.get(), element->bounds(),false };
            clicked_args.target = element;
            if (element->window() && element->window()->is_active_window())
            {
                clicked_args.window->bubble_event(element, [&](NElement& bubble_element) {
                    return bubble_element.handle_clicked(button, clicked_args);
                    });
            }
        }
    );
    return true;
}


bool NButtonBaseElement::handle_key(
    NKeyEventArgs& event_args
) {
    if (super::handle_key(event_args))
    {
        return true;
    }

    if (event_args.key == L' ' || event_args.key == '\n') {
        event_args.handled = simulate_keyboard_click(event_args.source.get());
        return event_args.handled;
    }
    if (event_args.key == L'\0') // ctrl+space
    {
        event_args.handled = simulate_keyboard_click(event_args.source.get(), 2);
        return event_args.handled;

    }
    return false;
}
bool NButtonBaseElement::handle_key_code(
    NKeyCodeEventArgs& event_args
) {
    if (super::handle_key_code(event_args))
    {
        return true;
    }
    if (event_args.key_code == KEY_ENTER) {
        event_args.handled = simulate_keyboard_click(event_args.source.get());
        return event_args.handled;
    }

    return false;
}

void NElement::cancel_keyboard_clicking_timer()
{
    if (this->keyboard_clicking_timer_)
    {
        window()->cancel_post(this->keyboard_clicking_timer_);
        this->keyboard_clicking_timer_ = 0;
        this->keyboard_clicking_ = false;
    }
}

NCheckboxElement::NCheckboxElement(const std::string& text, bool checked)
    : super("Checkbox")
    , label_(text)
    , checked_(checked)
{

}

void NElement::handle_attached(NWindow* window)
{
    on_attached.fire(window);
}

void NElement::handle_detaching()
{
    if (mouse_entered_)
    {
        mouse_entered_ = false;
        NMouseEventArgs event_args{};
        handle_mouse_leave(event_args);
    }
    cancel_keyboard_clicking_timer();
    on_detaching.fire();
}

NSize NCheckboxElement::measure(const NSize& available)
{
    int width;
    int height = 1;

    if (this->width() == AUTO_SIZE)
    {
        width = measure_text(checked_text()) + measure_menu_text(this->label_) + 1;
    }
    else {
        width = this->width();
    }
    if (width > available.width)
    {
        width = available.width;
    }
    if (height > available.height)
    {
        height = available.height;
    }
    return NSize(width, height);
}


void NCheckboxElement::render()
{
    if (actual_height() == 0)
    {
        return;
    }


    auto checked_text = this->checked_text();
    auto unchecked_text = this->unchecked_text();

    int actual_width = this->actual_width();
    if (actual_width < (int)measure_text(checked_text)) {
        return;
    }
    this->move(0, 0);

    auto color = get_color();
    this->color_on(color);

    if (checked_)
    {
        this->print(checked_text);
    }
    else {
        this->print(unchecked_text);
    }
    int display_width = actual_width - measure_text(checked_text);
    if (display_width > 0)
    {

        print_menu_text(label_, display_width, true);
    }
    this->color_off(color);

}

void NCheckboxElement::checked(bool value)
{
    if (value != checked_)
    {
        checked_ = value;
        this->on_checked_changed.fire(shared_from_this(), checked_);
        invalidate_render();
    }
}

bool NCheckboxElement::handle_clicked(int button, NClickedEventArgs& event_args)
{
    if (super::handle_clicked(button, event_args))
    {
        return true;
    }
    checked(!checked());
    event_args.handled = true;
    return true;
}


NRadioGroupElement::NRadioGroupElement(NOrientation orientation, const std::vector<std::string>& labels, int value)
    : NContainerElement("RadioGroup")
    , orientation_(orientation)
    , labels_(labels)
    , value_(value)
{
    update_child_elements();
}



void NRadioGroupElement::orientation(NOrientation value)
{
    if (this->orientation_ != value)
    {
        orientation_ = value;
        update_child_elements();
    }
}

void NRadioGroupElement::width(int value)
{
    if (this->width() != value)
    {
        super::width(value);
        update_child_layout();
    }
}

void NRadioGroupElement::labels(const std::vector<std::string>& value)
{
    this->labels_ = value;
    update_child_elements();
}

void NRadioGroupElement::value(int v)
{
    if (this->value_ != v)
    {
        this->value_ = v;

        for (int i = 0; i < (int)radio_buttons_.size(); ++i)
        {
            radio_buttons_[i]->checked(i == value_);
        }
        on_value_changed.fire(shared_from_this(), v);
    }
}

void NRadioGroupElement::handle_attached(NWindow* window)
{
    super::handle_attached(window);
    update_child_elements();
}

void NRadioGroupElement::handle_detaching() {
    remove_all_children(); // break any reference loops we may have accidentally introduced.
}


void NRadioGroupElement::column_gap(int value)
{
    if (this->column_gap_ != value)
    {
        this->column_gap_ = value;
        update_child_layout();
    }
}


void NRadioGroupElement::row_gap(int value)
{
    if (this->row_gap_ != value)
    {
        this->row_gap_ = value;
        update_child_layout();
    }
}


void NRadioGroupElement::update_child_elements()
{
    auto checked_text = this->checked_text();
    auto unchecked_text = this->unchecked_text();

    this->radio_buttons_.clear();
    remove_all_children();
    horizontal_container_ = nullptr;
    vertical_container_ = nullptr;

    this->radio_buttons_.reserve(labels_.size());

    NContainerElement::ptr container;
    if (orientation() == NOrientation::Horizontal)
    {
        horizontal_container_ = NHorizontalStackElement::create();
        horizontal_container_->column_gap(column_gap());
        container = horizontal_container_;
    }
    else {
        vertical_container_ = NVerticalStackElement::create();
        vertical_container_->row_gap(row_gap());
        container = vertical_container_;
    }
    add_child(container);

    int ix = 0;
    for (const auto& label : labels_)
    {
        auto radioBox = NCheckboxElement::create(label);
        radioBox->checked_text(checked_text);
        radioBox->unchecked_text(unchecked_text);
        radioBox->disabled(disabled());
        radioBox->checked(ix == value_);
        container->add_child(radioBox);

        radio_buttons_.push_back(radioBox);

        radioBox->on_clicked.subscribe(
            [this, ix](int button, NClickedEventArgs& event_args) {
                this->value(ix);
                event_args.handled = true;
                return true;
            }
        );
        ++ix;
    }
    update_child_layout();
}

void NRadioGroupElement::update_child_layout() {

    auto checked_text = this->checked_text();
    auto unchecked_text = this->unchecked_text();


    int totalWidth = 0;
    int checkedTextLength = utf8_wc_length(checked_text);

    int maxWidth = 0;

    for (const auto& label : labels_)
    {
        int w = utf8_wc_length(label) + checkedTextLength + 1;
        if (w > maxWidth)
        {
            maxWidth = w;
        }
        totalWidth += w;
    }

    if (orientation_ == NOrientation::Vertical)
    {
        int width = this->width() == AUTO_SIZE ?
            maxWidth
            : this->width();

        auto container = vertical_container_;
        container->row_gap(row_gap());
        container->width(width);

        for (size_t i = 0; i < labels_.size(); ++i)
        {
            auto radioBox = radio_buttons_[i];
            radioBox->width(width);
            radioBox->checked_text(checked_text);
            radioBox->unchecked_text(unchecked_text);
            radioBox->checked((int)i == value_);
            radioBox->disabled(disabled());
        }
    }
    else {
        int checkboxWidth;
        int containerWidth;
        int gapSize = (int)(labels_.size() == 0 ? 0 : (labels_.size() - 1) * column_gap());
        if (this->width() != AUTO_SIZE)
        {
            // checkboxes are equally sized.
            containerWidth = this->width();
            checkboxWidth = labels_.size() == 0 ? 0 : (containerWidth - gapSize) / labels_.size();
        }
        else {
            // width is the sum of all the checkboxes (plus gaps)
            checkboxWidth = AUTO_SIZE;
            containerWidth = AUTO_SIZE;
        }

        auto container = horizontal_container_;
        container->width(containerWidth);
        container->column_gap(column_gap());


        for (size_t i = 0; i < labels_.size(); ++i)
        {
            auto radioButton = radio_buttons_[i];

            radioButton->width(checkboxWidth);
            radioButton->checked_text(checked_text);
            radioButton->unchecked_text(unchecked_text);
            radioButton->checked((int)i == value_);
            radioButton->disabled(disabled());
        }
    }
}


namespace {
    struct NavSearchContext {
        int x0, y0;
        int xBest, yBest;
        NElement::ptr bestElement;
    };

    using nav_compare_fn = bool(int xCur, int yCur, int xBest, int yBest, int x0, int y0);

    void find_best_nav(NElement::ptr element, std::function<nav_compare_fn>& is_better, NavSearchContext& searchContext)
    {
        if (element->is_container())
        {
            NContainerElement* container = (NContainerElement*)(element.get());
            for (auto& child : container->children())
            {
                find_best_nav(child, is_better, searchContext);
            }
        }
        if (element->focusable() && !element->disabled())
        {
            const auto& bounds = element->bounds();
            if (is_better(
                bounds.x, bounds.y,
                searchContext.xBest, searchContext.yBest,
                searchContext.x0, searchContext.y0))
            {
                searchContext.xBest = bounds.x;
                searchContext.yBest = bounds.y;
                searchContext.bestElement = element;
            }
        }
    }
}

void NWindow::navigate_focus(NNavDirection direction)
{
    int x = 0;
    int y = 0;
    auto focus = this->focus();
    if (focus)
    {
        x = focus->bounds_.x;
        y = focus->bounds_.y;
    }
    navigate_focus(x, y, direction);
}

void NWindow::navigate_focus(int x, int y, NNavDirection direction)
{

    std::function<nav_compare_fn> is_best;

    switch (direction) {
    case NNavDirection::ReverseTab:
    case NNavDirection::Left:
        is_best = [](int xCur, int yCur, int xBest, int yBest, int x0, int y0)
            {
                if (yCur > y0) return false;
                if (yCur == y0) {
                    if (xCur >= x0) return false;
                }
                if (xBest == -1 && yBest == -1) return true;
                if (yCur > yBest) return true;
                if (yCur < yBest) return false;
                if (xCur > xBest) return true;
                return false;
            };
        break;
    case NNavDirection::Tab:
    case NNavDirection::Right:
        is_best = [](int xCur, int yCur, int xBest, int yBest, int x0, int y0)
            {
                if (yCur < y0) return false;
                if (yCur == y0) {
                    if (xCur <= x0) return false;
                }
                if (xBest == -1 && yBest == -1) return true;
                if (yCur < yBest) return true;
                if (yCur > yBest) return false;
                if (xCur < xBest) return true;
                return false;
            };
        break;

    case NNavDirection::Up:
        is_best = [](int xCur, int yCur, int xBest, int yBest, int x0, int y0)
            {
                if (yCur >= y0) return false;
                if (xBest == -1 && yBest == -1) return true;
                if (yCur > yBest) return true;
                if (yCur < yBest) return false;

                return std::abs(xCur - x0) < std::abs(xBest - x0);
            };
        break;
    case NNavDirection::Down:
        is_best = [](int xCur, int yCur, int xBest, int yBest, int x0, int y0)
            {
                if (yCur <= y0) return false;
                if (xBest == -1 && yBest == -1) return true;
                if (yCur < yBest) return true;
                if (yCur > yBest) return false;

                return std::abs(xCur - x0) < std::abs(xBest - x0);
            };
        break;


    case NNavDirection::Home:
        is_best = [](int xCur, int yCur, int xBest, int yBest, int x0, int y0)
            {
                if (xBest == -1 && yBest == -1) return true;
                if (yCur < yBest) return true;
                if (yCur > yBest) return false;
                if (xCur < xBest) return true;
                return false;
            };
        break;
    case NNavDirection::End:
        is_best = [](int xCur, int yCur, int xBest, int yBest, int x0, int y0)
            {
                if (xBest == -1 && yBest == -1) return true;
                if (yCur > yBest) return true;
                if (yCur < yBest) return false;
                if (xCur > xBest) return true;
                return false;
            };
        break;
    default:
        throw std::runtime_error("Invalid argument.");
    }

    NavSearchContext searchContext;

    searchContext.x0 = x;
    searchContext.y0 = y;
    searchContext.xBest = -1;
    searchContext.yBest = -1;

    find_best_nav(this->shared_from_this(), is_best, searchContext);

    if (searchContext.bestElement)
    {
        searchContext.bestElement->take_focus();
    }
    else {
        if (direction == NNavDirection::Tab) {
            navigate_focus(NNavDirection::Home);
        }
        else if (direction == NNavDirection::ReverseTab)
        {
            navigate_focus(NNavDirection::End);
        }
    }
}

void NWindow::title(const std::string& title)
{
    this->title_ = title;
    invalidate_render();
}

void NWindow::arrange(const NRect& bounds_) {
    NRect bounds = bounds_;
    if (title_.length())
    {
        bounds.y += 2;
        bounds.height = std::max(0, bounds.height - 2);
    }
    bounds.x += 1;
    bounds.width = std::max(0, bounds.width - 2);

    bounds.y += 1;
    bounds.height = std::max(0, bounds.height - 2);
    super::arrange(bounds);
    this->bounds_ = bounds_;
}
NSize NWindow::measure(const NSize& available_)
{
    NSize rcMeasure;
    rcMeasure.width = available_.width == AUTO_SIZE ? AUTO_SIZE : available_.width - 2;
    if (available_.height == AUTO_SIZE)
    {
        rcMeasure.height = AUTO_SIZE;
    }
    else {
        rcMeasure.height = available_.height - 2;
        if (title_.length() != 0)
        {
            rcMeasure.height -= 2;
        }
    }
    NSize result = super::measure(rcMeasure);
    result.width += 2;
    result.height += 2;
    if (title_.length() != 0)
    {
        result.height += 2;
    }
    if (width() != AUTO_SIZE)
    {
        result.width = width();
    }
    if (height() != AUTO_SIZE)
    {
        result.height = height();
    }
    return result;
}
void NWindow::render() {
    super::render();
    NColorPair color = this->make_color_pair(color_palette().WindowFrameForeground, color_palette().WindowFrameBackground);
    color_on(color);
    ::box(curses_window_, 0, 0);

    if (title_.length() != 0)
    {
        this->move(1, 1);
        this->print(title_,  NAlignment::Center,std::max(0, this->bounds().width - 2));
        move(0, 2);
        print_acs(0, 2, ACS_LTEE);
        horizontal_line(1, 2, std::max(0, this->bounds().width - 2));
        print_acs(this->bounds().width - 1, 2, ACS_RTEE);

    }
    color_off(color);

}


bool NWindow::attach_windows() {
    bool result = false;
    if (this->window_ != this)
    {
        set_window(this);
        result = true;
    }
    for (auto& child : child_windows_)
    {
        result |= child->attach_windows();
    }
    return result;
}

void NWindow::get_safe_child_windows(std::vector<NWindow::ptr>& child_windows)
{
    for (auto& child : child_windows_)
    {
        child->get_safe_child_windows(child_windows);
    }
    child_windows.push_back(shared_from_this<NWindow>());
}
void NWindow::for_each_child_window(const std::function<void(NWindow*)>& fn)
{
    // avoid violating iterators higher in the call stack
    std::vector<NWindow::ptr> child_windows;
    get_safe_child_windows(child_windows);

    for (auto& child : child_windows)
    {
        NWindow* childPtr = child.get();
        fn(childPtr);
    }
}

void NWindow::for_each_child_window_parent_first(const std::function<void(NWindow*)>& fn)
{
    fn(this);
    for (auto& child : child_windows_)
    {
        NWindow* childPtr = dynamic_cast<NWindow*>(child.get());
        if (childPtr)
        {
            childPtr->for_each_child_window_parent_first(fn);
        }
    }

}

bool NWindow::for_each_child_window(const std::function<bool(NWindow*)>& fn)
{
    for (auto& child : child_windows_)
    {
        if (!fn(child.get()))
        {
            return true;
        }
    }
    return fn(this);
}
NWindow* NWindow::find_child_window(const std::function<bool(NWindow*)>& condition_fn)
{
    if (condition_fn(this))
    {
        return this;
    }

    for (auto& child : child_windows_)
    {
        NWindow* result = child->find_child_window(condition_fn);
        if (result)
        {
            return result;
        }
    }
    return nullptr;
}



NWindow* NWindow::compute_active_window()
{
    if (child_windows_.size() == 0) return this;

    return child_windows_[child_windows_.size() - 1]->compute_active_window();
}


NSize NElement::measure(const NSize& available)
{
    int width = 0;
    int height = 0;
    if (this->width() != AUTO_SIZE)
    {
        width = this->width();
    }
    if (this->height() != AUTO_SIZE)
    {
        height = this->height();
    }
    return NSize(width, height);
}

NElement::ptr NContainerElement::find_child_element(const std::function<bool(NElement&)>& fn)
{
    for (auto& child : children_)
    {
        auto result = child->find_child_element(fn);
        if (result)
        {
            return result;
        }
    }
    return super::find_child_element(fn);

}


NElement::ptr NElement::find_child_element(const std::function<bool(NElement&)>& predicate)
{
    if (predicate(*this))
    {
        return shared_from_this();
    }
    return nullptr;
}


void NTextElement::wrap_text(bool value)
{
    if (wrap_text_ != value)
    {
        wrap_text_ = value;
        invalidate_layout();
    }
}

void NButtonElement::label(const std::string& value) {
    if (value != label_)
    {
        label_ = value;
        invalidate_layout();
    }
}
void NButtonElement::prefix(const std::string& value) {
    if (value != prefix_)
    {
        prefix_ = value;
        invalidate_layout();
    }
}
void NButtonElement::suffix(const std::string& value) {
    if (value != suffix_)
    {
        suffix_ = value;
        invalidate_layout();
    }
}

#if DEBUG_NELEMENT_LIFECYCLE
#include <atomic>
static std::atomic<int64_t> g_allocated_element_count_;

/*static*/ int64_t NEelement::allocated_element_count() { return g_allocated_element_count_; }

#endif


NElement::NElement(const std::string& elementTag)
    : tag_(elementTag)
{
#if DEBUG_NELEMENT_LIFECYCLE
    ++g_allocated_element_count_;
#endif
}
NElement::~NElement() {
#if DEBUG_NELEMENT_LIFECYCLE
    --g_allocated_element_count_;
#endif
}

bool NElement::handle_key(NKeyEventArgs& event_args)
{
    on_key.fire(event_args);
    return event_args.handled;
}
bool NElement::handle_key_code(NKeyCodeEventArgs& event_args)
{
    on_key_code.fire(event_args);
    return event_args.handled;
}
bool NElement::handle_clicked(int button, NClickedEventArgs& event_args)
{
    cancel_keyboard_clicking_timer();
    on_clicked.fire(button, event_args);
    return event_args.handled;
}
bool NElement::handle_mouse_button_clicked(int button, NMouseEventArgs& event_args)
{
    take_focus();
    NClickedEventArgs clicked_event_args(event_args.source.get(), this, NRect(event_args.cursor_position, NSize(0, 0)), true);
    clicked_event_args.target = event_args.target;
    clicked_event_args.alt = event_args.alt;
    clicked_event_args.ctrl = event_args.ctrl;
    clicked_event_args.shift = event_args.shift;

    if (handle_clicked(button, clicked_event_args)) {
        event_args.handled = true;
        return true;
    }
    return event_args.handled;
}
bool NElement::handle_mouse_button_pressed(int button, NMouseEventArgs& event_args)
{
    on_mouse_button_pressed.fire(button, event_args);
    return event_args.handled;
}
bool NElement::handle_mouse_button_released(int button, NMouseEventArgs& event_args)
{
    on_mouse_button_released.fire(button, event_args);
    return event_args.handled;
}



bool NElement::handle_mouse_leave(NMouseEventArgs& event_args)
{
    on_mouse_leave.fire(event_args);
    return event_args.handled;
}

bool NElement::handle_mouse_enter(NMouseEventArgs& event_args)
{
    on_mouse_enter.fire(event_args);
    return event_args.handled;
}



NTextEditElement::NTextEditElement(const std::string& defaultText)
    :NElement("TextEdit")
{
    focusable(true);
    clickable(true);

    text_ = defaultText;
    selection_ = { 0,(int)utf8_length(defaultText) };
}

void NTextEditElement::handle_attached(NWindow* window)
{
    super::handle_attached(window);

    auto& palette = window->color_palette();
    disabled_color_ = window->make_color_pair(palette.Disabled, palette.Black);
    hover_color_ = window->make_color_pair(palette.HoverForeground, palette.HoverBackground);
    focus_color_ = window->make_color_pair(palette.FocusForeground, palette.FocusBackground);
    select_color_ = window->make_color_pair(palette.SelectedForeground, palette.SelectedBackground);
    normal_color_ = window->make_color_pair(palette.White, palette.Black);
    cursor_color_ = window->make_color_pair(palette.Black, palette.White);
}


void NTextEditElement::text(const std::string& value)
{
    if (value != text_)
    {
        text_ = value;
        int length = utf8_length(text_);
        invalidate_render();
        on_text_changed.fire(shared_from_this(), text_);

        NTextSelection selection{ selection_ };
        if (selection.start > length)
        {
            selection.start = length;
        }
        if (selection_.end() > length)
        {
            selection.end(length);
        }
        this->selection(selection);

    }
}
void NTextEditElement::selection(const NTextSelection& value)
{
    if (value != selection_)
    {
        selection_ = value;
        invalidate_render();
        on_selection_changed.fire(shared_from_this(), selection_);
    }
}

void NTextEditElement::select_all()
{
    selection({ 0,(int)utf8_length(text_) });
    invalidate_render();
}

void NTextEditElement::wrap_text(bool value)
{
    if (wrap_text_ != value)
    {
        wrap_text_ = value;
        invalidate_layout();
    }
}

void  NTextEditElement::scroll_x_offset(int value)
{
    if (value != scroll_x_offset_)
    {
        scroll_x_offset_ = value;
        invalidate_render();
    }
}

NSize NTextEditElement::measure(const NSize& available)
{
    int width = available.width;
    int height = 1;
    if (this->width() != AUTO_SIZE)
    {
        width = this->width();
    }
    if (width == AUTO_SIZE)
    {
        throw std::runtime_error("Either width() or available.width must not be AUTO_SIZE");
    }
    if (this->height() != AUTO_SIZE)
    {
        height = this->height();
    }
    return NSize(width, height);
}

int NTextEditElement::cursor_position()
{
    return measure_text(text_.substr(scroll_x_offset_,selection_.end()));
}
void NTextEditElement::render()
{
    scroll_adjust();

    move(0, 0);
    if (wrap_text_)
    {
        throw std::runtime_error("Not implemented.");
    }
    else {

        int width = actual_width();
        std::string scrolledText = utf8_wc_substr(text_, scroll_x_offset_, width);
        if (password_)
        {
            scrolledText = std::string(utf8_length(scrolledText), '*');
        }

        size_t padding_length = width - utf8_wc_length(scrolledText);

        NTextSelection scrolledSelection = selection_;
        scrolledSelection.start -= scroll_x_offset_;
        if (scrolledSelection.start < 0)
        {
            scrolledSelection.length += scrolledSelection.start;
            scrolledSelection.start = 0;
            if (scrolledSelection.length < 0)
            {
                scrolledSelection.length = 0;
            }
        }
        if (scrolledSelection.start > (int)scrolledText.length())
        {
            int adjustment = (int)scrolledText.length() - scrolledSelection.start;
            scrolledSelection.start += adjustment;
            scrolledSelection.length -= adjustment;
        }
        #ifdef DEBUG
        if (scrolledSelection.min() < 0 || scrolledSelection.max() > (int)scrolledText.length())
        {
            throw std::runtime_error("Invalid selection.");
        }
        #endif


        if (focused())
        {
            std::string start = utf8_substr(scrolledText, 0, scrolledSelection.min());
            color_on(focus_color_);
            print(start);
            color_off(focus_color_);

            std::string selected = utf8_substr(scrolledText, scrolledSelection.min(), scrolledSelection.abs_length());
            if (selected.length() != 0)
            {
                if (scrolledSelection.length < 0)
                {
                    // cursor on first character.
                    auto cursorColor = blink() ? this->cursor_color_ : select_color_;
                    color_on(cursorColor);
                    print(utf8_substr(selected, 0, 1));
                    color_off(cursorColor);

                    color_on(select_color_);
                    print(utf8_substr(selected, 1));
                    color_off(select_color_);

                }
                else {
                    color_on(select_color_);
                    print(selected);
                    color_off(select_color_);
                }
            }
            std::string end = utf8_substr(scrolledText, scrolledSelection.max());
            if (scrolledSelection.length < 0)
            {
                color_on(focus_color_);
                print(end);
                print(std::string(padding_length, ' '));
                color_off(focus_color_);
            }
            else if (end.length() > 0)
            {
                // cursor is on first character of post-selection text.
                auto cursorColor = blink() ? this->cursor_color_ : focus_color_;
                color_on(cursorColor);
                print(utf8_substr(end, 0, 1));
                color_off(cursorColor);

                color_on(focus_color_);
                print(utf8_substr(end, 1));
                print(std::string(padding_length, ' '));
                color_off(focus_color_);
            }
            else {
                // cursor is on first character of padding.
                auto cursorColor = blink() ? this->cursor_color_ : focus_color_;
                color_on(cursorColor);
                print(" ");
                color_off(cursorColor);

                if (padding_length > 1)
                {
                    color_on(focus_color_);
                    char c = ' ';
                    print(std::string(padding_length - 1, c));

                    color_off(focus_color_);
                }

            }
        }
        else {
            NColorPair color = this->normal_color_;
            if (disabled())
            {
                color = this->disabled_color_;
            }
            else {
                if (mouse_entered())
                {
                    color = this->select_color_;
                }
                else {
                    color = this->focus_color_;
                }
            }
            color_on(color);
            print(scrolledText);
            print(std::string(padding_length, ' '));
            color_off(color);
        }

    }

}

static std::string sanitize_paste(const std::string& value)
{
    constexpr size_t max_length = 64;
    std::ostringstream s;
    for (auto c : value)
    {
        if (c >= ' ' || c < 0)
        {
            s << c;
            if (s.str().length() >= max_length)
            {
                break;
            }
        }
        else {
            s << ' ';
        }
    }
    return s.str();

}


void NTextEditElement::cut()
{
    if (selection_.length != 0)
    {
        window()->set_clipboard_text(utf8_substr(text_, selection_.min(), selection_.abs_length()));
        std::string text_tmp = utf8_substr(text_, 0, selection_.min()) + utf8_substr(text_, selection_.max());
        this->text(text_tmp);

        NTextSelection selection{ selection_ };
        selection.start = selection_.min();
        selection.length = 0;
        this->selection(selection);
        invalidate_render();
    }

}
void NTextEditElement::copy()
{
    if (selection_.length != 0)
    {
        window()->set_clipboard_text(utf8_substr(text_, selection_.min(), selection_.abs_length()));
    }

}
void NTextEditElement::paste()
{
    std::string text = window()->get_clipboard_text();
    text = sanitize_paste(text);
    std::string text_tmp = utf8_substr(text_, 0, selection_.min()) + text + utf8_substr(text_, selection_.max());

    NTextSelection selection{ selection_ };
    selection.start = selection.min() + utf8_length(text);
    selection.length = 0;

    this->text(text_tmp);
    this->selection(selection);

}

bool NTextEditElement::handle_key(NKeyEventArgs& event_args)
{
    char32_t key = event_args.key;
    // TODO: emoji.
    static_assert(sizeof(wchar_t) == sizeof(char32_t), "Need to handle assembly of utf16 surrogates into char32_t's here.");

    std::string text = u32string_to_utf8(std::u32string(1, key));
    bool handled = false;
    switch (key)
    {
    case 1: // Ctrl-a
    {
        select_all();
        handled = true;
        break;
    }
    case 3: // Ctrl-C
    {
        copy();
        handled = true;
        break;
    }
    case 24: // Ctrl-X
    {
        cut();
        handled = true;
        break;
    }
    case 22: // Ctrl-V
    {
        paste();
        invalidate_render();
        handled = true;
        break;
    }
    default:
        if (key >= ' ')
        {
            if (!character_filter_ || character_filter_(key))
            {
                std::string text_tmp = text_ = utf8_substr(text_, 0, selection_.min()) + text + utf8_substr(text_, selection_.max());
                this->text(text_tmp);

                int insertPosition = selection_.min();
                NTextSelection selection{ selection_ };
                selection.start = selection_.min() + 1;
                selection.length = 0;
                this->selection(selection);
                this->combine_text_characters(insertPosition);

                invalidate_render();
                handled = true;
            }
        }
        break;
    }
    if (handled)
    {
        event_args.handled = true;
        start_blink_timer();
        return true;

    }
    return false;
}
bool NTextEditElement::handle_key_code(NKeyCodeEventArgs& event_args)
{
    bool handled = false;
    switch (event_args.key_code)
    {
    case KEY_LEFT:
    {
        NTextSelection selection{ selection_ };
        selection.start = std::max(selection_.end() - 1, 0);
        selection.length = 0;
        this->selection(selection);
        invalidate_render();
        handled = true;
        break;
    }
    break;
    case KEY_SRIGHT: // extend selection to right.
    {
        if (selection_.end() < (int)utf8_length(text_))
        {
            NTextSelection selection{ selection_ };
            selection.length++;
            this->selection(selection);
            invalidate_render();
        }
        handled = true;
        break;
    }
    break;
    case KEY_SLEFT: // extend selection to left.
    {
        if (selection_.end() > 0)
        {
            NTextSelection selection{ selection_ };
            selection.length--;
            this->selection(selection);
            invalidate_render();
        }
        handled = true;
        break;
    }
    break;
    case KEY_HOME:
    {
        NTextSelection selection{ selection_ };
        selection.start = 0;
        selection.length = 0;
        this->selection(selection);
        invalidate_render();
        handled = true;
        break;
    }
    case KEY_END:
    {
        NTextSelection selection{ selection_ };
        selection.start = utf8_length(text_);
        selection.length = 0;
        this->selection(selection);
        invalidate_render();
        handled = true;
        break;
    }
    case KEY_SHOME:
    {
        NTextSelection selection{ selection_ };
        selection.length = -selection.start;
        this->selection(selection);
        invalidate_render();
        handled = true;
        break;
    }
    case KEY_SEND:
    {
        NTextSelection selection{ selection_ };
        selection.length = utf8_length(text_) - selection_.start;
        this->selection(selection);
        invalidate_render();
        handled = true;
        break;
    }
    case KEY_RIGHT:
    {
        NTextSelection selection{ selection_ };
        selection.start = std::min(selection_.end() + 1, (int)utf8_length(text_));
        selection.length = 0;
        this->selection(selection);
        invalidate_render();

        handled = true;
        break;
    }
    break;
    case KEY_DC:
    {
        if (selection_.length == 0)
        {
            if (selection_.start < (int)utf8_length(text_))
            {
                std::string text = utf8_substr(text_, 0, selection_.start) + utf8_substr(text_, selection_.start + 1);
                this->text(text);
                invalidate_render();
            }
        }
        else {
            std::string text = utf8_substr(text_, 0, selection_.min()) + utf8_substr(text_, selection_.max());

            NTextSelection selection(selection_);
            selection.start = selection.min();
            selection.length = 0;

            this->text(text);
            this->selection(selection);
            invalidate_render();
        }
        handled = true;
        break;
    }
    case KEY_BACKSPACE:
    {
        if (selection_.length == 0)
        {
            if (selection_.start > 0)
            {
                std::string text_tmp = utf8_substr(text_, 0, selection_.start - 1) + utf8_substr(text_, selection_.end());
                this->text(text_tmp);
                NTextSelection selection{ selection_ };
                selection.start--;
                this->selection(selection);
                invalidate_render();
            }
        }
        else {
            std::string text = utf8_substr(text_, 0, selection_.min()) + utf8_substr(text_, selection_.max());

            NTextSelection selection{ selection_ };
            selection.start = selection.min();
            selection.length = 0;

            this->text(text);
            this->selection(selection);
            invalidate_render();
        }

        handled = true;
        break;
    }


    }
    if (handled)
    {
        event_args.handled = true;
        start_blink_timer();
        return true;
    }
    return false;
}

void NElement::handle_focused(bool focused)
{
    on_focused.fire(focused);
}


void NWindow::set_clipboard_text(const std::string& text)
{
    if (this != get_root_window())
    {
        get_root_window()->set_clipboard_text(text);
        return;
    }
    clipboard->set_text(normalize_utf8(text));
}
std::string NWindow::get_clipboard_text()
{
    if (this != get_root_window())
    {
        return get_root_window()->get_clipboard_text();
    }
    return normalize_utf8(clipboard->get_text());
}

void NTextEditElement::password(bool value)
{
    password_ = value;
    invalidate_render();
}

void NElement::for_each_element(const std::function<void(NElement&)>& callback)
{
    callback(*this);
}

void NContainerElement::for_each_element(const std::function<void(NElement&)>& callback)
{
    for (auto& child : children_)
    {
        child->for_each_element(callback);
    }
    NElement::for_each_element(callback);
}



NRect NRect::intersect(const NRect& other) const
{
    int x1 = std::max(x, other.x);
    int y1 = std::max(y, other.y);
    int x2 = std::min(right(), other.right());
    int y2 = std::min(bottom(), other.bottom());
    NRect result = NRect(x1, y1, std::max(0, x2 - x1), std::max(0, y2 - y1));
    if (result.width == 0 || result.height == 0)
    {
        return NRect(0, 0, 0, 0);
    }
    return result;
}

NRect NRect::bounds(const NRect& other) const
{
    int x1 = std::min(x, other.x);
    int y1 = std::min(y, other.y);
    int x2 = std::max(right(), other.right());
    int y2 = std::max(bottom(), other.bottom());
    return NRect(x1, y1, x2 - x1, y2 - y1);
}


bool NTextEditElement::handle_mouse_leave(NMouseEventArgs& event_args) {
    super::handle_mouse_leave(event_args);
    invalidate_render();
    return event_args.handled;
}
bool NTextEditElement::handle_mouse_enter(NMouseEventArgs& event_args)
{
    super::handle_mouse_enter(event_args);
    invalidate_render();
    return event_args.handled;
}
bool NTextEditElement::handle_mouse_button_pressed(int button, NMouseEventArgs& event_args)
{
    super::handle_mouse_button_pressed(button, event_args);
    if (button == 0 && !disabled())
    {
        take_focus();
        window()->mouse_capture(this);

        int x = event_args.cursor_position.x - bounds().x + scroll_x_offset_;
        if (x > (int)utf8_length(text_))
        {
            x = utf8_length(text_);
        }
        NTextSelection selection = { x,0 };
        this->selection(selection);
        invalidate_render();
    }
    return event_args.handled;
}

bool NTextEditElement::handle_mouse_move(NMouseEventArgs& event_args)
{
    super::handle_mouse_move(event_args);
    // only received while we have capture.
    if (window()->mouse_capture().get() == this)
    {
        event_args.handled = true;
        int x = event_args.cursor_position.x - bounds().x + scroll_x_offset_;
        int y = event_args.cursor_position.y - bounds().y;

        bool outside = y < 0 || y >= bounds().height
            || x < 0 || x >= bounds().width;

        if (outside) {
            if (selection_.length != 0)
            {
                NTextSelection selection{ selection_ };
                selection.length = 0;
                this->selection(selection);
                invalidate_render();
            }
        }
        else {
            x += +scroll_x_offset_;
            if (x > (int)utf8_length(text_))
            {
                x = utf8_length(text_);
            }
            NTextSelection selection{ selection_ };
            int length = x - selection.start;
            if (selection.length != length)
            {
                selection.length = length;
                invalidate_render();
            }
            this->selection(selection);
        }
        return true;
    }
    return false;

}

void NTextEditElement::handle_mouse_lost_capture()
{
    super::handle_mouse_lost_capture();
}

bool NTextEditElement::handle_mouse_button_released(int button, NMouseEventArgs& event_args)
{
    window()->mouse_capture_release(this);

    super::handle_mouse_button_released(button, event_args);
    invalidate_render();
    window()->mouse_capture_release(this);;
    return event_args.handled;
}
void NTextEditElement::handle_focused(bool value) {
    super::handle_focused(value);
    invalidate_render();
    if (value)
    {
        start_blink_timer();
    }
    else {
        stop_blink_timer();
    }

}


void NWindow::move_window(int dx, int dy)
{
    this->window_position_ = this->active_window_->actual_window_position_;

    this->window_position_.x += dx;
    this->window_position_.y += dy;

    if (this->window_position_.x < 0)
    {
        this->window_position_.x = 0;
    }
    int maxX = COLS;
    int maxY = LINES;

    if (window_position_.right() > maxX)
    {
        window_position_.x = maxX - window_position_.width;
    }

    if (window_position_.x < 0) {
        window_position_.x = 0;
    }
    if (window_position_.bottom() > maxY)
    {
        window_position_.y = maxY - window_position_.height;
    }
    if (window_position_.y < 0)
    {
        window_position_.y = 0;
    }
}


void NTextEditElement::blink(bool value)
{
    if (this->blink_ != value)
    {
        this->blink_ = value;
        invalidate_render();
    }
}

void NTextEditElement::stop_blink_timer()
{
    if (blink_post_handle_ != 0)
    {
        window()->cancel_post(blink_post_handle_);
        blink_post_handle_ = 0;
    }
}
void NTextEditElement::start_blink_timer()
{
    stop_blink_timer();
    blink(true);

    blink_post_handle_ = window()->post(
        std::chrono::milliseconds(1250),
        [thisPtr = this->weak_from_this<NTextEditElement>()]
        () {
            auto this_ = thisPtr.lock();
            if (this_)
            {
                this_->on_blink_timer();
            }
        }
    );

}

void NTextEditElement::handle_detaching()
{
    stop_blink_timer();
    super::handle_detaching();
}
void NTextEditElement::on_blink_timer()
{
    this->blink(!this->blink());
    invalidate_render();


    blink_post_handle_ = window()->post(
        std::chrono::milliseconds(750),
        [thisPtr = this->weak_from_this<NTextEditElement>()]
        () {
            auto this_ = thisPtr.lock();
            if (this_)
            {
                this_->on_blink_timer();
            }
        }
    );


}


void NRadioGroupElement::checked_text(
    const std::string& value) {
    checked_text_ = value;
    update_child_layout();
}
void NRadioGroupElement::unchecked_text(const std::string& value) {
    checked_text_ = value;
    update_child_layout();
}


std::string NCheckboxElement::checked_text() const {
    if (!checked_text_.empty())
    {
        return checked_text_;
    }
    if (window() && window()->is_unicode_locale())
    {
        return " 🗹  "; // ☑
    }
    else {
        return " [X] ";
    }
    return label_;
}
std::string NCheckboxElement::unchecked_text() const
{
    if (!unchecked_text_.empty())
    {
        return unchecked_text_;
    }
    if (window() && window()->is_unicode_locale())
    {
        return " ☐  ";
    }
    else {
        return " [ ] ";
    }
    return label_;
}

std::string NRadioGroupElement::checked_text() const {
    if (!checked_text_.empty())
    {
        return checked_text_;
    }
    if (window() && window()->is_unicode_locale())
    {
        return " ◉  ";
    }
    else {
        return " (X) ";
    }

    return checked_text_;
}
std::string  NRadioGroupElement::unchecked_text() const {
    if (!unchecked_text_.empty())
    {
        return unchecked_text_;
    }
    if (window() && window()->is_unicode_locale())
    {
        return " ○  ";
    }
    else {
        return " ( ) ";
    }
    return unchecked_text_;
}

void NRadioGroupElement::disabled(bool value)
{
    super::disabled(value);
    for (auto& button : radio_buttons_)
    {
        button->disabled(value);
    }
}


NMenuItemElement::NMenuItemElement(const std::string& text, int item_id)
    :NButtonBaseElement("MenuItem")
    , text_(text)
    , item_id_(item_id)
{
    this->text_ = text;

    this->focusable(true);
    this->clickable(true);
}


void NDropdownElement::open_popup(const NRect& mouseRect)
{
    if (items_.size() == 0)
    {
        return;
    }
    NRect bounds = this->bounds();
    if (dropdown_attachment() == NAttachment::ContextMenu)
    {
        bounds = mouseRect;
    }
    popup_window_ = NPopupMenuWindow::create(
        window()->shared_from_this<NWindow>(),
        items_,
        window_to_screen(bounds),
        dropdown_attachment()
    );
    popup_window_->on_cancelled.subscribe(
        [thisPtr = this->weak_from_this<NDropdownElement>()]
        (NElement::ptr source) {
            auto this_ = thisPtr.lock();
            if (this_)
            {
                this_->popup_window_ = nullptr;
                this_->open(false);
            }
        });
    popup_window_->on_item_selected.subscribe(
        [thisPtr = this->weak_from_this<NDropdownElement>()]
        (NElement::ptr source, int item_id) {
            auto this_ = thisPtr.lock();
            if (this_)
            {
                this_->popup_window_ = nullptr;
                this_->selected(item_id);
                this_->open(false);
            }
        });
}

void NDropdownElement::close_popup()
{
    if (popup_window_)
    {
        popup_window_->close();
        popup_window_ = nullptr;
    }
}
void NDropdownElement::open(bool value, const NRect& anchorRect)
{
    if (this->open_ != value)
    {
        this->open_ = value;
        invalidate_render();
        if (value)
        {
            close_popup();
            open_popup(anchorRect);
            on_opened.fire();
        }
        else {
            close_popup();
            on_closed.fire();

        }


    }
}

void NDropdownElement::open(bool value)
{
    open(value, bounds());
}



NPopupWindow::NPopupWindow(
    NWindow::ptr parentWindow,
    const NRect& anchor,
    NAttachment attachment)
    : NPopupWindow("PopupWindow",
        parentWindow,
        anchor,
        attachment)
{

}
NPopupWindow::NPopupWindow(
    const std::string& tag,
    NWindow::ptr parentWindow,
    const NRect& anchor,
    NAttachment attachment)
    : NWindow(AUTO_SIZE, AUTO_SIZE, AUTO_SIZE, AUTO_SIZE, nullptr)
    , anchor_(anchor)
    , attachment_(attachment)
{
    this->tag(tag);
}

void NDropdownElement::selected(int value)
{
    if (this->selected_ != value)
    {
        this->selected_ = value;
        invalidate_render();
        on_selection_changed.fire(shared_from_this(), value);
    }
}

NDropdownElement::NDropdownElement()
    : NButtonBaseElement("Dropdown")
{
}
NDropdownElement::NDropdownElement(const std::vector<NMenuItem>& items, int selected)
    : NButtonBaseElement("Dropdown")
    , items_(items)
    , selected_(selected)
{

}
NDropdownElement::NDropdownElement(std::vector<NMenuItem>&& items, int selected)
    : NButtonBaseElement("Dropdown")
    , items_(std::move(items))
    , selected_(selected)
{

}

std::string NDropdownElement::end_text() const
{
    if (end_text_.length() != 0)
    {
        return end_text_;
    }
    if (window() && window()->is_unicode_locale())
    {
        return " ⏷ ";
    }
    else {
        return " v ";
    }
}


NSize NDropdownElement::measure(const NSize& available)
{
    int width = 0;
    int height = 1;
    if (this->width() != AUTO_SIZE)
    {
        width = this->width();
    }
    else {
        for (auto& item : items_)
        {
            width = std::max(width, measure_menu_text(item.label));
        }
        width += measure_text(end_text()) + 1;
    }
    if (this->height() != AUTO_SIZE)
    {
        height = this->height();
    }
    else {
        height = 1;
    }
    return NSize(width, height);
}
void NDropdownElement::render()
{
    move(0, 0);
    NColorPair color = get_color();
    color_on(color);
    std::string text;
    for (auto& item : items_)
    {
        if (item.item_id == selected_ && !item.is_divider())
        {
            text = item.label;
            break;
        }
    }
    std::string end_text = this->end_text();
    print(" ");
    print_menu_text(
        text,
        actual_width() - utf8_wc_length(end_text) - 1,
        false
    );
    print(end_text);

    color_off(color);

}


bool NDropdownElement::handle_clicked(int button, NClickedEventArgs& event_args)
{
    if (super::handle_clicked(button, event_args))
    {
        return true;
    }
    if (button == 0)
    {
        open(true, event_args.location);
        event_args.handled = true;
        return true;
    }
    return false;
}


void NPopupWindow::left_pos(NRect& bounds, int max_width)
{
    bounds.x = anchor_.x;
    if (bounds.right() > max_width && anchor_.right() - bounds.width >= 0)
    {
        bounds.x = anchor_.right() - bounds.width;

    }
}
void NPopupWindow::right_pos(NRect& bounds, int max_width)
{
    bounds.x = anchor_.right() - bounds.width;
    if (bounds.x < 0 && anchor_.left() + bounds.width < max_width)
    {
        bounds.x = 0;
    }
}

void NPopupWindow::top_pos(NRect& bounds, int max_height)
{
    bounds.y = anchor_.y - bounds.height;
    if (bounds.y < 0)
    {
        if (anchor_.bottom() + bounds.height < max_height)
        {
            bounds.y = anchor_.bottom();
        }
        else {
            bounds.y = 0;
        }
    }
}
void NPopupWindow::bottom_pos(NRect& bounds, int max_height)
{
    bounds.y = anchor_.bottom();
    if (bounds.bottom() > max_height)
    {
        if (anchor_.y - bounds.height >= 0)
        {
            bounds.y = anchor_.y - bounds.height;
        }
        else {
            bounds.y = max_height - bounds.height;
        }
    }
}



NRect NPopupWindow::calculate_window_position(int max_width, int max_height)
{
    NRect bounds{ 0,0, width(),height() };

    if (bounds.width == AUTO_SIZE || bounds.height == AUTO_SIZE)
    {
        NSize size = measure(NSize(max_width, max_height));
        bounds.width = size.width;
        bounds.height = size.height;
    }
    switch (attachment_)
    {
    case NAttachment::TopStart:
        left_pos(bounds, max_width);
        top_pos(bounds, max_height);
        break;
    case NAttachment::TopEnd:
        right_pos(bounds, max_width);
        top_pos(bounds, max_height);
        break;
    case NAttachment::BottomStart:
        bottom_pos(bounds, max_height);
        left_pos(bounds, max_width);
        break;

    case NAttachment::BottomEnd:
        bottom_pos(bounds, max_height);
        right_pos(bounds, max_width);
        break;
    case NAttachment::CenterOnAnchor:
        bounds.x = (anchor_.right() + anchor_.left() - bounds.width) / 2;
        bounds.y = (anchor_.bottom() + anchor_.top() - bounds.height) / 2;
        break;
    case NAttachment::ContextMenu:
        if (anchor_.width > 3)
        {
            double t = (2.0 * anchor_.right() + 3.0 * anchor_.left()) / 5;
            (void)t;
            bounds.x = (int)((2.0 * anchor_.right() + 3.0 * anchor_.left()) / 5 - 2.0 * bounds.width / 5.0);
            if (bounds.x < anchor_.left())
            {
                bounds.x = anchor_.left();
            }
        }
        else {
            bounds.x = anchor_.left() - 1;
        }
        bounds.y = anchor_.top() - 1;
        if (bounds.bottom() > max_height && anchor_.bottom() + 1 - bounds.height >= 0)
        {
            bounds.y = anchor_.bottom() + 1 - bounds.height;
        }
        break;
    case NAttachment::Submenu:
        bounds.x = anchor_.right();
        if (bounds.right() > max_width && anchor_.left() + 2 - bounds.width >= 0)
        {
            bounds.x = anchor_.left() + 2 - bounds.width;
        }
        bounds.y = anchor_.top() - 1;
        if (bounds.bottom() > max_height && anchor_.bottom() + 1 - bounds.height >= 0)
        {
            bounds.y = anchor_.bottom() + 1 - bounds.height;
        }
    }
    return bounds;
}



NPopupWindow::ptr NPopupWindow::create(
    NWindow::ptr parentWindow,
    const NRect& anchor,
    NAttachment attachment
) {
    ptr result = std::shared_ptr<NPopupWindow>(
        new self(parentWindow, anchor, attachment));
    NWindow::ptr w = result;
    parentWindow->add_child_window(w);
    return result;
}


NPoint NElement::window_to_screen(const NPoint& point) const
{
    return point + window()->window_bounds().top_left();

}
NPoint NElement::screen_to_window(const NPoint& point) const
{
    return point - window()->window_bounds().top_left();
}
NPoint NElement::element_to_screen(const NPoint& point) const
{
    return window_to_screen(point + bounds().top_left());
}
NPoint NElement::screen_to_element(const NPoint& point) const
{
    return point + bounds().top_left() + window()->window_bounds().top_left();

}
NPoint NElement::element_to_window(const NPoint& point) const
{
    return point + bounds().top_left();
}
NPoint NElement::window_to_element(const NPoint& point) const
{
    return point - bounds().top_left();
}

NRect NElement::window_to_screen(const NRect& rect) const
{
    return rect + window()->window_bounds().top_left();

}
NRect NElement::screen_to_window(const NRect& rect) const
{
    return rect - window()->window_bounds().top_left();
}
NRect NElement::element_to_screen(const NRect& rect) const
{
    return rect + bounds().top_left() + window()->window_bounds().top_left();
}
NRect NElement::screen_to_element(const NRect& rect) const
{
    return rect - bounds().top_left() - window()->window_bounds().top_left();

}
NRect NElement::element_to_window(const NRect& rect) const
{
    return rect + bounds().top_left();

}
NRect NElement::window_to_element(const NRect& rect) const
{
    return rect - bounds().top_left();
}


bool NPopupWindow::handle_mouse_button_pressed(int button, NMouseEventArgs& event_args)
{
    if (super::handle_mouse_button_pressed(button, event_args))
    {
        return true;
    }
    if (cancellable() && button == 0 && (event_args.cursor_position.x < 0 || event_args.cursor_position.y < 0))
    {
        close();
        return true;
    }
    return false;
}

void NMenuItemElement::render()
{
    int width = this->actual_width();
    int prefix_width = measure_text(prefix_);
    int suffix_width = measure_text(suffix_);
    auto color = get_color();
    color_on(color);
    move(0, 0);
    if (width < prefix_width + suffix_width)
    {
        print(std::string((size_t)std::max(0, width), ' '));
    }
    else {

        print(prefix_);
        print_menu_text(text(), width - prefix_width - suffix_width, true);
        print(suffix_);
    }

    color_off(color);
}
NSize NMenuItemElement::measure(const NSize& available)
{
    int width = measure_text(prefix_) + measure_menu_text(this->text()) + measure_text(suffix_);
    return NSize(width, 1);
}

UnicodeServices& NWindow::unicode_services() {
    return *(get_root_window()->unicode_services_);
}
Collator& NWindow::collator() {
    return *(get_root_window()->collator_);
}

UnicodeNormalizer& NWindow::unicode_normalizer()
{
    return *(get_root_window()->normalizer_);
}
const UnicodeNormalizer& NWindow::unicode_normalizer() const
{
    return *(get_root_window()->normalizer_);
}

std::string NWindow::normalize_utf8(const std::string& text) const
{
    return unicode_normalizer().Normalize(text);
}
std::string NWindow::decompose_utf8(const std::string& text) const
{
    return unicode_normalizer().Decompose(text);

}


// In utf8 Unicode canonical form (accents composed)
std::string NTextEditElement::normalized_text() const
{
    return window()->normalize_utf8(text_);
}
// In utf8 Unicode de-composed form (accents de-composed)
std::string NTextEditElement::decomposed_text() const
{
    return window()->decompose_utf8(text_);
}

bool NTextEditElement::combine_text_characters(int position)
{
    if (position == 0)
    {
        return false;
    }
    auto& normalizer = window()->unicode_normalizer();

    int iPosition = 0;
    size_t i = 0;
    for (i = 0; iPosition < position && i < text_.length(); i = utf8_increment(text_, i))
    {
        ++iPosition;
    }
    if (i >= text_.length())
    {
        return false;
    }

    size_t iNext = i;
    if (iNext == 0) return false;
    size_t iPrevious = utf8_decrement(text_, i);
    char32_t previousCharacter = utf8_char32_at(text_, iPrevious);
    char32_t nextCharacter = utf8_char32_at(text_, iNext);
    auto newChar = normalizer.ComposePair(previousCharacter, nextCharacter);
    if ((int32_t)newChar < 0)
    {
        return false;
    }
    if (newChar == 0)
    {
        return false;
    }
    // adjust the selection.
    NTextSelection selection = selection_;
    selection.delete_character_at(position - 1);

    size_t iEnd = utf8_increment(text_, iNext);
    std::string text =
        text_.substr(0, iPrevious) +
        char32_to_utf8string(newChar) +
        text_.substr(iEnd);
    this->text(text);
    this->selection(selection);

    return true;

}

void NTextSelection::delete_character_at(int utf8Index)
{
    if (length >= 0)
    {
        if (utf8Index < min()) {
            --start;
        }
        else if (utf8Index < max()) {
            --length;
        }
    }
    else {
        if (utf8Index < min())
        {
            --start;
        }
        else if (utf8Index < max())
        {
            --start;
            --length;
        }
    }
}

void NWindow::add_child(NElement::ptr& child) {
    if (children().size() != 0)
    {
        throw std::runtime_error("An NWindow can only have one child.");
    }
    super::add_child(child);
}
void NWindow::add_child(NElement::ptr&& child)
{
    if (children().size() != 0)
    {
        throw std::runtime_error("An NWindow can only have one child.");
    }

    super::add_child(std::move(child));

}
void NBoxElement::arrange(const NRect& bounds)
{
    super::arrange(bounds);
    NRect clientBounds = bounds.inset({ 1,1,1,1 });

    for (auto& child : children())
    {
        NRect childBounds = clientBounds;
        childBounds.inset(child->margin());
        child->arrange(childBounds);
    }
}

NSize NBoxElement::measure(const NSize& available)
{
    NSize childAvailable = available;
    if (this->height() != AUTO_SIZE)
    {
        childAvailable.height = this->height();
    }
    if (this->width() != AUTO_SIZE)
    {
        childAvailable.width = this->width();
    }
    childAvailable.width -= 2;
    childAvailable.height -= 2;

    int width = 0, height = 0;

    for (auto& child : children())
    {
        NSize size = measure_child_with_margins(childAvailable, child);
        width = std::max(width, size.width);
        height = std::max(height, size.height);
    }
    if (title_.length() != 0) {
        int titleWidth = utf8_wc_length(title_) + 2;
        if (titleWidth > width)
        {
            width = titleWidth;
        }
    }
    width += 2;
    height += 2;
    if (this->width() != AUTO_SIZE)
    {
        width = this->width();
    }
    if (this->height() != AUTO_SIZE)
    {
        height = this->height();
    }
    return NSize(width, height);
}
void NBoxElement::render()
{
    NRect bounds{ 0,0,actual_width(),actual_height() };
    this->box(bounds, color_);
    if (title_.length() != 0 && actual_width() > 4)
    {
        std::string title = title_;
        int width = this->actual_width();
        int wc_length = utf8_wc_length(title);
        if (wc_length > width - 4)
        {
            title = pad_utf8(title_, (size_t)(width - 2), NAlignment::Start); // also truncates.
            wc_length = width - 4;
        }

        move(bounds.left() + 1, bounds.top());
        if (color_)
        {
            color_on(*color_);
        }
        print(" ");
        print(title_);
        print(" ");
        if (color_)
        {
            color_off(*color_);
        }
    }

}


void NWindow::w_box(const NRect& rect, const std::optional<NColorPair>& colorPair)
{
    if (rect.width >= 2 && rect.height >= 2)
    {
        if (colorPair)
        {
            color_on(*colorPair);
        }

        if (rect.width > 2)
        {
            horizontal_line(rect.left() + 1, rect.top(), rect.width - 2);
            horizontal_line(rect.left() + 1, rect.bottom() - 1, rect.width - 2);
        }
        if (rect.height > 2)
        {
            vertical_line(rect.left(), rect.top() + 1, rect.height - 2);
            vertical_line(rect.right() - 1, rect.top() + 1, rect.height - 2);
        }
        print_acs(rect.left(), rect.top(), ACS_ULCORNER);
        print_acs(rect.right() - 1, rect.top(), ACS_URCORNER);
        print_acs(rect.left(), rect.bottom() - 1, ACS_LLCORNER);
        print_acs(rect.right() - 1, rect.bottom() - 1, ACS_LRCORNER);

        if (colorPair)
        {
            color_off(*colorPair);
        }
        // now erase the interior.
        if (rect.width > 2)
        {
            std::string whitespace(rect.width - 2, ' ');
            for (int y = rect.top() + 1; y < rect.bottom() - 1; ++y)
            {
                move(rect.left() + 1, y);
                print(whitespace);
            }
        }
    }
}

void NBoxElement::color(const std::optional<NColorPair>& value)
{
    if (this->color_ != value)
    {
        this->color_ = value;
        invalidate_render();
    }
}


void NContainerElement::invalidate_render()
{
    for (auto& child : children_)
    {
        child->invalidate_render();
    }
    super::invalidate_render();
}


void NBoxElement::title(const std::string& value)
{
    if (value != title_)
    {
        title_ = value;
        invalidate_layout();
    }
}



void NWindow::mouse_capture(NElement* element)
{
    auto mouse_capture = this->mouse_capture();
    if (mouse_capture.get() == element) return;

    if (mouse_capture)
    {
        mouse_capture->handle_mouse_lost_capture();
    }
    if (element) {
        mouse_capture_ = element->shared_from_this();
    }
    else {
        mouse_capture_.reset();
    }

}


void NWindow::mouse_capture_release(NElement* element)
{
    auto mouse_capture = this->mouse_capture();
    if (mouse_capture.get() != element) return;
    this->mouse_capture(nullptr);
}



void NBoxElement::add_child(NElement::ptr& child)
{
    if (children().size() != 0)
    {
        throw std::runtime_error("An NBoxElement can only have one child.");
    }
    super::add_child(child);
}
void NBoxElement::add_child(NElement::ptr&& child)
{
    if (children().size() != 0)
    {
        throw std::runtime_error("An NBoxElement can only have one child.");
    }
    super::add_child(std::move(child));

}



bool NElement::wants_shortcut_key(const std::string& key) {
    return false;
}

bool NMenuItemElement::wants_shortcut_key(const std::string& key)
{
    if (text_.find('_') != std::string::npos)
    {
        std::string shortcut = menu_item_shortcut(text_);
        return window()->collator().Compare(shortcut, key) == 0;
    }
    return false;

}

bool NCheckboxElement::wants_shortcut_key(const std::string& key)
{
    if (label_.find('_') != std::string::npos)
    {
        std::string shortcut = menu_item_shortcut(label_);
        return window()->collator().Compare(shortcut, key) == 0;
    }
    return false;

}

bool NButtonElement::wants_shortcut_key(const std::string& key)
{
    if (label_.find('_') != std::string::npos)
    {
        std::string shortcut = menu_item_shortcut(label_);
        return window()->collator().Compare(shortcut, key) == 0;
    }
    return false;
}


void NButtonElement::label_alignment(NAlignment value)
{
    if (label_alignment_ != value)
    {
        label_alignment_ = value;
        invalidate_render();
    }
}


void NTextEditElement::select_end()
{
    this->selection(NTextSelection{ measure_text(text_),0 });
    invalidate_render();
}


void NDropdownElement::menu_items(const std::vector<NMenuItem>& value)
{
    this->items_ = value;
    invalidate_layout();
}


static std::vector<NMenuItem> makeMenuItems(const std::vector<std::string>& items)
{
    std::vector<NMenuItem> result;
    result.reserve(items.size());
    int i = 0;
    for (auto& item : items)
    {
        result.push_back(NMenuItem(item, i));
        ++i;
    }
    return result;
}

void NDropdownElement::menu_items(const std::vector<std::string>& value)
{
    NDropdownElement::menu_items(makeMenuItems(value));
}


bool NWindow::root_window_exists_ = false;

void NWindow::parent(NElement* value)
{
    throw std::runtime_error("An NWindow cannot be added as a child to another NElement.");
}

void NPopupWindow::anchor(const NRect& anchor)
{
    this->anchor_ = anchor;
    // no need to invalidate, since we are guaranteed to go through window position updates in the message pump.
}

void NDropdownElement::arrange(const NRect& bounds)
{
    super::arrange(bounds);
    if (this->popup_window_)
    {
        // keep the popup window properly attached.
        if (dropdown_attachment_ != NAttachment::ContextMenu)
        {
            this->popup_window_->anchor(this->window_to_screen(this->bounds()));
        }
    }
}

bool NElement::handle_mouse_move(NMouseEventArgs& event_args)
{
    on_mouse_move.fire(event_args);
    return event_args.handled;
}
void NElement::handle_mouse_lost_capture()
{
    on_mouse_lost_capture.fire();
}

void NDividerMenuItemElement::render()
{
    int actualWidth = this->actual_width();
    this->horizontal_line(0, 0, actualWidth);
    // both characters outside the element bounds. :-/
    this->print_acs(-1, 0, ACS_LTEE);
    this->print_acs(actualWidth, 0, ACS_RTEE);

}
NSize NDividerMenuItemElement::measure(const NSize& available)
{
    int width = 3;
    if (this->width() != AUTO_SIZE)
    {
        width = this->width();
    }
    return NSize(width, 1);
}


NDividerMenuItemElement::NDividerMenuItemElement()
    :super("NDividerMenuItemElement")
{
    this->focusable(false);
    this->clickable(false);

}


NMenuItemElement::NMenuItemElement(const std::string& tagName)
    :super(tagName)
    , item_id_(-1)
{

}
NRect NRect::inset(const NThickness& thickness) const
{
    NRect result{
        x + thickness.left,
        y + thickness.top,
        std::max(0, width - thickness.left - thickness.right),

        std::max(0, height - thickness.top - thickness.bottom) };
    return result;
}
NRect NRect::inflate(const NThickness& thickness) const
{
    NRect result{
        x - thickness.left,
        y - thickness.top,
        std::max(0,width + thickness.left + thickness.right),

        std::max(0,height + thickness.top + thickness.bottom) };
    return result;
}


void NElement::print(const std::string& text, int max_display_width)
{
    std::string textToPrint = utf8_wc_substr(text, 0, max_display_width);
    print(textToPrint);
}


void NWindow::w_print_acs(int x, int y, int alternate_character)
{

    attribute_on(NAttribute::AltCharSet);
    mvwaddch(this->curses_window_, y, x, alternate_character);
    attribute_off(NAttribute::AltCharSet);

}

NColorPair NDividerMenuItemElement::get_color()
{
    // don't show hover.
    return this->normal_color();
}


void NPopupMenuWindow::handle_item_selected(int item_id)
{
    was_item_selected_ = true;
    on_item_selected.fire(this->shared_from_this<NElement>(), item_id);
}
void NPopupMenuWindow::handle_cancelled()
{
    if (!was_item_selected_)
    {
        on_cancelled.fire(this->shared_from_this<NElement>());
        was_item_selected_ = true;
    }
}

static const std::string CHECKMARK_PREFIX = " ✓ ";
static const std::string ASCII_CHECKMARK_PREFIX = " X ";

static std::string checkmark_prefix(bool is_unicode) {
    if (is_unicode)
    {
        return CHECKMARK_PREFIX;
    }
    return ASCII_CHECKMARK_PREFIX;
}
int NPopupMenuWindow::measure_prefix(const NMenuItem& item, bool is_unicode_locale)
{
    if (item.display_check)
    {
        return this->measure_text(checkmark_prefix(is_unicode_locale));
    }
    else if (item.icon.length() != 0)
    {
        return this->measure_text(item.icon) + 2;
    }
    else {
        return 1;
    }
}
NPopupMenuWindow::NPopupMenuWindow(
    NWindow::ptr parentWindow,
    const NRect& anchor,
    NAttachment attachment
) : NPopupWindow("PopupMenuWindow", parentWindow, anchor, attachment)
{

}


void NPopupMenuWindow::Init(NWindow::ptr parentWindow, const std::vector<NMenuItem>& menu_items)
{
    cancellable(true);
    auto container = NVerticalStackElement::create();
    container->alignment(NAlignment::Justify);
    this->add_child(container);

    int prefixWidth = 0;
    for (auto& item : menu_items) {
        prefixWidth = std::max(prefixWidth, measure_prefix(item, parentWindow->is_unicode_locale()));
    }

    for (auto& item : menu_items)
    {
        NMenuItemElement::ptr element;
        if (item.label == "-")
        {
            element = NDividerMenuItemElement::create();
        }
        else {
            if (item.submenu.size() != 0)
            {
                element = NSubmenuMenuItemElement::create(item);
                element->on_item_selected.subscribe(
                    [thisPtr = this->weak_from_this<NPopupMenuWindow>()]
                    (NElement::ptr source, int item_id) {
                        auto this_ = thisPtr.lock();
                        if (this_)
                        {
                            this_->on_item_selected.fire(this_, item_id);
                        }
                        this_->close();
                    }
                );
                element->on_cancelled.subscribe(
                    [thisPtr = this->weak_from_this<NPopupMenuWindow>()]
                    (NElement::ptr source) {
                        auto this_ = thisPtr.lock();
                        if (this_)
                        {
                            this_->on_cancelled.fire(this_);
                        }
                        this_->close();
                    }
                );
            }
            else {
                element = NMenuItemElement::create(item.label, item.item_id);
                element->disabled(!item.enabled);
                element->on_clicked.subscribe(
                    [this, item_id = item.item_id]
                    (int button, NClickedEventArgs& event_args) {
                        this->handle_item_selected(item_id);
                        this->close();
                    }
                );
            }
            std::string prefix;

            if (item.display_check) {
                if (item.checked)
                {
                    prefix = checkmark_prefix(parentWindow->is_unicode_locale());
                }
            }
            else if (item.icon.length() != 0)
            {
                prefix = " " + item.icon + " ";
            }
            prefix = pad_utf8(prefix, (size_t)prefixWidth, NAlignment::Start);
            element->prefix(prefix);
        }
        container->add_child(element);
    }
}


bool NPopupMenuWindow::handle_key(NKeyEventArgs& event_args) {
    if (event_args.key == 27)
    {
        close();
        event_args.handled = true;
        return true;
    }
    return false;
}



void NPopupMenuWindow::close()
{
    handle_cancelled();
    super::close();
}

void NPopupMenuWindow::set_initial_focus()
{
    super::set_initial_focus();
}

NContainerElement::~NContainerElement()
{
    for (auto& child : children_)
    {
        child->parent(nullptr);
    }

}


bool NSubmenuMenuItemElement::handle_clicked(int button, NClickedEventArgs& eventArgs)
{
    if (button == 0)
    {
        open(true);
        return eventArgs.handled = true;
    }
    return false;
}


NColorPair NSubmenuMenuItemElement::get_color() {
    if (open_)
    {
        return super::focus_color();
    }
    return super::get_color();
}

NSubmenuMenuItemElement::NSubmenuMenuItemElement(const NMenuItem& submenu)
    : super(submenu.label, NMenuItem::NO_ITEM_ID)
{
    if (submenu.submenu.size() == 0)
    {
        throw std::runtime_error("Submenu must have items. Pass the parent submenu, not the children");
    }
    this->submenu_ = submenu.submenu;
}

void NSubmenuMenuItemElement::open(bool value)
{
    if (open_ != value)
    {
        open_ = value;
        if (open_)
        {
            popup_window_ = NPopupMenuWindow::create(
                window()->shared_from_this<NWindow>(),
                submenu_,
                window_to_screen(bounds()),
                NAttachment::Submenu
            );
            popup_window_->on_item_selected.subscribe(
                [thisPtr = this->weak_from_this<NSubmenuMenuItemElement>()](NElement::ptr source, int item_id) {
                    auto this_ = thisPtr.lock();
                    if (this_)
                    {
                        this_->on_item_selected.fire(this_, item_id);
                    }
                    this_->popup_window_ = nullptr; // don't call close()
                    this_->open(false);
                }
            );
            popup_window_->on_cancelled.subscribe(
                [thisPtr = this->weak_from_this<NSubmenuMenuItemElement>()](NElement::ptr source) {
                    auto this_ = thisPtr.lock();
                    if (this_)
                    {
                        this_->on_cancelled.fire(this_);
                    }
                    this_->popup_window_ = nullptr; // don't call close()
                    this_->open(false);
                }
            );
            on_opened.fire(shared_from_this<NElement>());
        }
        else {
            if (popup_window_)
            {
                popup_window_->close();
                popup_window_ = nullptr;

            }
            on_closed.fire(shared_from_this<NElement>());
        }
    }
}

void NSubmenuMenuItemElement::handle_attached(NWindow* window)
{
    super::handle_attached(window);
    if (window->is_unicode_locale())
    {
        this->suffix(" ⏵ ");
    }
    else {
        this->suffix(" > ");
    }
}

NMenuElement::NMenuElement(const std::string& label, std::vector<NMenuItem>&& items)
    :super("Menu")
    , label_(label)
    , items_(std::move(items)) {
}
NMenuElement::NMenuElement(const std::string& label, const std::vector<NMenuItem>& items)
    :super("Menu")
    , label_(label)
    , items_(items)
{

}


void NMenuElement::open(bool value)
{
    if (open_ != value)
    {
        open_ = value;
        if (open_)
        {
            popup_window_ = NPopupMenuWindow::create(
                window()->shared_from_this<NWindow>(),
                items_,
                window_to_screen(bounds()),
                NAttachment::BottomStart
            );
            popup_window_->on_item_selected.subscribe(
                [thisPtr = this->weak_from_this<NMenuElement>()]
                (NElement::ptr source, int item_id) {
                    auto this_ = thisPtr.lock();
                    if (!this_) return;

                    this_->on_item_selected.fire(this_, item_id);

                    this_->popup_window_ = nullptr; // don't call close()
                    this_->open(false);
                }
            );
            popup_window_->on_cancelled.subscribe(
                [thisPtr = this->weak_from_this<NMenuElement>()]
                (NElement::ptr source) {
                    auto this_ = thisPtr.lock();
                    if (!this_) return;

                    this_->popup_window_ = nullptr; // don't call close()
                    this_->open(false);
                }
            );
            on_opened.fire(shared_from_this());
        }
        else {
            if (popup_window_)
            {
                popup_window_->close();
                popup_window_ = nullptr;
            }
            on_closed.fire(shared_from_this());
        }
    }
}

bool NMenuElement::handle_clicked(int button, NClickedEventArgs& eventArgs)
{
    if (super::handle_clicked(button, eventArgs))
    {
        return true;
    }
    if (button == 0)
    {
        open(true);
        eventArgs.handled = true;
        return true;
    }
    return false;
}

NColorPair NMenuElement::get_color()
{
    if (open_)
    {
        return super::focus_color();
    }
    return super::get_color();
}

NSize NMenuElement::measure(const NSize& available)
{
    int width = 0;
    int height = 1;
    width = measure_menu_text(label_) + 2;

    if (this->width() != AUTO_SIZE)
    {
        width = this->width();
    }
    if (this->height() != AUTO_SIZE)
    {
        height = this->height();
    }
    return NSize(width, height);
}


void NMenuElement::render()
{
    move(0, 0);
    int actual_width = this->actual_width();
    if (actual_width < 2)
    {
        return;
    }
    print(" ");
    print_menu_text(label_, actual_width - 2);
    print(" ");
}

void NMenuElement::label(const std::string& value)
{
    if (label_ != value)
    {
        label_ = value;
        invalidate_layout();
    }
}


void NMenuElement::items(const std::vector<NMenuItem>& value)
{
    items_ = value;
    invalidate_layout();
}
void NMenuElement::items(std::vector<NMenuItem>&& value)
{
    items_ = std::move(value);
    invalidate_layout();
}

bool NMenuElement::wants_shortcut_key(const std::string& key)
{
    return is_menu_item_shortcut_key(key, label_);
}


void NMenuElement::prefix(const std::string& value)
{
    if (prefix_ != value)
    {
        prefix_ = value;
        invalidate_layout();
    }
}

void NMenuElement::suffix(const std::string& value)
{
    if (suffix_ != value)
    {
        suffix_ = value;
        invalidate_layout();
    }
}

void NMenuElement::menu_attachment(NAttachment value)
{
    if (menu_attachment_ != value)
    {
        menu_attachment_ = value;

    }
}


NMessageWindow::NMessageWindow(
    NWindow::ptr parent_window,
    const std::string& title,
    int width
)
    :NWindow(AUTO_SIZE, AUTO_SIZE, AUTO_SIZE, AUTO_SIZE)
{
    tag("MessageWindow");
    this->title(title);
}
NMessageWindow::ptr NMessageWindow::create(
    NWindow::ptr parentWindow,
    NMessageType messageType,
    const std::string& title,
    const std::string& message,
    int text_block_width)
{
    constexpr int DEFAULT_WRAP_WIDTH = 45;

    if (text_block_width == AUTO_SIZE)
    {
        if (message.find('\n') != std::string::npos)
        {
            text_block_width = DEFAULT_WRAP_WIDTH;
        }
        else {
            int measured_width = utf8_wc_length(message);
            if (measured_width + 1 < DEFAULT_WRAP_WIDTH)
            {
                text_block_width = measured_width + 1;
            }
            else {
                text_block_width = DEFAULT_WRAP_WIDTH;
            }
        }

    }
    auto result = std::shared_ptr<self>(
        new NMessageWindow(
            parentWindow,
            title, AUTO_SIZE));
    result->add_to_parent_window(parentWindow);
    result->init(parentWindow, messageType, message, text_block_width);
    return result;
}

void NMessageWindow::init(NWindow::ptr parent_window, NMessageType message_type, const std::string& message, int text_block_width)
{
    if (parent_window->is_unicode_locale())
    {
        // with an icon.
        std::string iconText;

        switch (message_type)
        {
        case NMessageType::Error:
            iconText = "🛑︎\uFE0E"; // (\uFe0E = display b&w variant)
            break;
        case NMessageType::Warning:
            iconText = "⚠️";
            break;
        case NMessageType::Info:
            iconText = "🛈";
            break;
        }

        this->add_child(
            NVerticalStackElement::create()
            | alignment(NAlignment::Justify)
            | nwindows::margin(NThickness{ 2,1,2,1 })
            | nwindows::row_gap(1)
            | nwindows::add_child(
                NHorizontalStackElement::create()
                | column_gap(2)
                | nwindows::add_child(NTextElement::create(iconText))
                | nwindows::add_child(NTextElement::create(message)
                    | nwindows::width(text_block_width)
                    | nwindows::wrap_text()
                )
            )
            | nwindows::add_child(NHorizontalStackElement::create()
                | nwindows::alignment(NAlignment::End)
                | nwindows::add_child(
                    NButtonElement::create("OK")
                    | nwindows::width(10)
                    | nwindows::on_clicked([](int button, NClickedEventArgs& event_args)
                        {
                            event_args.window->close();
                        }
                    )
                )
            )
        );
    }
    else {
        // without an icon.
        this->add_child(
            NVerticalStackElement::create()
            | alignment(NAlignment::Justify)
            | nwindows::margin(NThickness{ 2,1,2,1 })
            | nwindows::row_gap(1)
            | nwindows::add_child(
                NTextElement::create(message)
                | nwindows::width(text_block_width)
                | nwindows::wrap_text()
            )
            | nwindows::add_child(NHorizontalStackElement::create()
                | nwindows::alignment(NAlignment::End)
                | nwindows::add_child(
                    NButtonElement::create("OK")
                    | nwindows::width(10)
                    | nwindows::on_clicked([](int button, NClickedEventArgs& event_args)
                        {
                            event_args.window->close();
                        }
                    )
                )
            )
        );

    }
}


void NWindow::handle_is_active_changed(bool activated)
{
    on_is_active_changed.fire(shared_from_this<NWindow>(), activated);
}



bool NWindow::can_display_character(char32_t c) const
{
    // Figure out whether wcwidth() works on Windows for emoji (and other extended unicode characters)
    // or figure out an alternative.
    static_assert(sizeof(char32_t) == sizeof(wchar_t), "wchar_t must be 32 bits");
    return wcwidth((wchar_t)c) != -1;
}
