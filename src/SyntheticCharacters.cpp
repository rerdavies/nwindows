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

#include "SyntheticCharacters.hpp"
#include <vector>
#include <cstdint>
#include <stdexcept>
#include <NWindows/NWindows.hpp>

using namespace nwindows;
using namespace nwindows::internal;


// ▼  \u25BC for dropdown!

// characters we are willing to knock out of an EGA/VGA font in order to get
// checkboxes and radio buttons, in decreasing order of priority.
// Please log a defect if a critical character is a candidate for removal in your locale.
static const std::string sacrificialCharacters =
"⌠⌡☺☻♀" // ridiculous cp437 junk
"╱╲╳┅┆┊┋" // odd line drawing characters."
"√÷≠≥≤‰≈‡♥♣♠" // dubiously useful; No font makes it past here in Ubuntu.
"░▒▓" // not that useful really.
"╟╞╧╨╤╥╙╘╒╓╫╪╫" // mixed linedrawing characters, if we really have to (we don't)
"╭╮╯╰" // round corners.
"╚╔╩╦╠═╬" // double linedrawing characters.

;


std::u32string nwindows::internal::get_sacrificial_characters(ConsoleFont::ptr font, size_t nCharacters)
{
    std::u32string result;

    std::u32string candidates = utf8_to_u32string(sacrificialCharacters);
    const auto& map = font->get_unicode_map();

    for (char32_t cc : candidates)
    {
        if (font->is_valid_character(cc))
        {
            const std::string cc_utf8 = u32string_to_utf8(std::u32string(1, cc));

            for (const auto& mapEntry : map)
            {
                if (mapEntry.unicode_chars == cc_utf8)
                {
                    if (mapEntry.unicode_sequences.size() == 0)
                    {
                        result.push_back(cc);
                        break;
                    }

                }
            }
            if (result.length() == nCharacters)
            {
                break;
            }
        }
    }
    if (result.length() == nCharacters) {
        return result;
    }
    throw std::runtime_error("Unable to find enough sacrificial charcters in current font.");
}





namespace {

    class MonoBitmap {
    public:
        MonoBitmap(size_t width, size_t height)
            : width_(width), height_(height), span((width + 7) / 8)
        {
            data_.resize(span * height);
        }
        MonoBitmap(
            const std::vector<uint8_t>& data,
            size_t width,
            size_t height)
            :data_(data), width_(width), height_(height), span((width + 7) / 8)
        {
            if (data.size() != span * height)
            {
                throw std::runtime_error("Invalid data size.");
            }
        }
        int width() const { return width_; }
        int height() const { return height_; }
        bool get(int x, int y);
        void set(int x, int y, bool value);

        void rect(int x, int y, int width, int height, bool value);
        void rect(const NRect& rect, bool value);
        const std::vector<uint8_t>& data() const { return data_; }
        void clear();

    private:
        std::vector<uint8_t> data_;
        size_t width_;
        size_t height_;
        size_t span;
    };

    void MonoBitmap::clear()
    {
        for (size_t i = 0; i < data_.size(); ++i)
        {
            data_[i] = 0;
        }
    }

    void MonoBitmap::rect(int x, int y, int width, int height, bool value)
    {
        for (int iy = y; iy < y + height; ++iy)
        {
            for (int ix = x; ix < x + width; ++ix)
            {
                set(ix, iy, value);
            }
        }
    }

    void MonoBitmap::rect(const NRect& rc, bool value)
    {
        this->rect(rc.left(), rc.top(), rc.width, rc.height, value);
    }


    bool MonoBitmap::get(int x, int y) {
        if (x < 0 || (size_t)x >= width_ || y < 0 || (size_t)y >= height_)
        {
            throw std::runtime_error("Invalid coordinates.");
        }
        size_t ix = y * span + x / 8;
        size_t bit = 7 - (x % 8);
        return (data_[ix] & (1 << bit)) != 0;
    }
    void MonoBitmap::set(int x, int y, bool value)
    {
        if (x < 0 || (size_t)x >= width_ || y < 0 || (size_t)y >= height_)
        {
            throw std::runtime_error("Invalid coordinates.");
        }
        size_t ix = y * span + x / 8;
        size_t bit = 7 - (x % 8);
        if (value) {
            data_[ix] |= (1 << bit);
        }
        else {
            data_[ix] &= ~(1 << bit);
        }
    }

}

struct CopyrightDimensions {
    NRect outer;
    NRect inner;
    int center_x;
    int center_y;
    int stroke_width;
};

static int get_inner_left(MonoBitmap& bitmap, int y)
{
    int x = 0;
    int mid = bitmap.width() / 2;

    while (x < mid && !bitmap.get(x, y))
    {
        ++x;
    }
    if (x == mid)
    {
        return -1;
    }
    while (x < mid && bitmap.get(x, y))
    {
        ++x;
    }
    if (x == mid)
    {
        return -1;
    }
    while (x < mid && !bitmap.get(x, y))
    {
        ++x;
    }
    if (x == mid)
    {
        return -1;
    }
    return x;
}
int get_stroke_width(MonoBitmap& bitmap, int y)
{
    int x = 0;
    int mid = bitmap.width() / 2;

    while (x < mid && !bitmap.get(x, y))
    {
        ++x;
    }
    if (x == mid)
    {
        return 0;
    }
    int start = x;
    while (x < mid && bitmap.get(x, y))
    {
        ++x;
    }

    if (x == mid)
    {
        return 0;
    }
    return x - start;
}

static CopyrightDimensions get_copyright_dimensions(MonoBitmap& bitmap)
{
    CopyrightDimensions result;
    result.outer = NRect(0, 0, bitmap.width(), bitmap.height());
    result.stroke_width = bitmap.width();
    int width = 0;

    for (int y = 0; y < bitmap.height(); ++y) {
        int left = 0;
        int right = bitmap.width() - 1;

        while (left < right && !bitmap.get(left, y))
        {
            ++left;
        }
        if (left == right)
        {
            // xxx;
            if (width == 0)
            {
                // trim the top.
                if (y > result.outer.top())
                {
                    result.outer.top(y);
                }
            }
            else {
                // trim the bottom.
                if (y < result.outer.bottom())
                {
                    result.outer.bottom(y);
                }
            }
        }
        else {
            while (right > left && !bitmap.get(right - 1, y))
            {
                --right;
            }
            if (width < right - left)
            {
                width = right - left;
                result.center_y = y;
                result.outer.left(left);
                result.outer.right(right);
            }
        }

    }
    // locate the left edge of the "c")

    result.center_x = (result.outer.left() + result.outer.right()) / 2;
    result.center_y = (result.outer.top() + result.outer.bottom()) / 2;
    bool seenInner = false;
    result.inner.left(bitmap.width());
    result.inner.y = 0;
    result.inner.height = bitmap.height();
    result.inner.width = 0;
    for (int y = result.outer.top(); y < result.outer.bottom(); ++y)
    {
        int innerX = get_inner_left(bitmap, y);
        if (innerX == -1)
        {
            if (!seenInner)
            {
                if (y > result.inner.top())
                {
                    result.inner.top(y);
                }
            }
            else {
                if (y < result.inner.bottom())
                {
                    result.inner.bottom(y);
                }
            }

        }
        else {
            seenInner = true;
            if (innerX < result.inner.left())
            {
                result.inner.left(innerX);
                result.center_y = y;
                result.inner.right(result.outer.right() - (innerX - result.outer.left()));
            }
        }
    }
    result.stroke_width = get_stroke_width(bitmap, result.center_y);
    return result;
}


void mirror_bitmap(MonoBitmap& bitmap, const NRect& rect)
{
    for (int y = rect.top(); y < rect.bottom(); ++y)
    {
        int left = rect.left();
        int right = rect.right() - 1;
        while (left < right)
        {
            bool value = bitmap.get(left, y);
            bitmap.set(right, y, value);
            ++left;
            --right;
        }
    }
}

static std::vector<uint8_t> make_radio_button_checked(
    const std::vector<uint8_t>& copyrData,
    size_t char_width,
    size_t char_height)
{
    MonoBitmap bitmap(copyrData, char_width, char_height);
    CopyrightDimensions info = get_copyright_dimensions(bitmap);

    if (true) {
        // Fill the inner circle with a gap.
        for (int y = info.inner.top(); y < info.inner.bottom(); ++y)
        {
            int xLeft = get_inner_left(bitmap, y);
            if (xLeft != -1)
            {
                int xRight = info.outer.right() - (xLeft - info.outer.left());
                for (int x = xLeft; x < xRight; ++x)
                {
                    bitmap.set(x, y, true);
                }
            }
        }
        mirror_bitmap(bitmap, info.outer);
    }
    else {
        // small copyright, fill entirely.
        for (int y = info.outer.top(); y < info.outer.bottom(); ++y)
        {
            int left = info.outer.left();
            int right = info.outer.right();
            while (left < right && !bitmap.get(left, y))
            {
                ++left;
            }
            while (right > left && !bitmap.get(right - 1, y))
            {
                --right;
            }
            for (int ix = left; ix < right; ++ix)
            {
                bitmap.set(ix, y, true);
            }
        }
    }
    return bitmap.data();
}

static std::vector<uint8_t> make_checkbox_checked(
    const std::vector<uint8_t>& copyrData,
    size_t char_width,
    size_t char_height)
{
    MonoBitmap bitmap(copyrData, char_width, char_height);
    CopyrightDimensions info = get_copyright_dimensions(bitmap);

    bitmap.clear();
    int strokeWidth = info.stroke_width;
    if (info.outer.width >= strokeWidth * 5) {
        bitmap.rect(info.outer, true);
        NRect border = info.outer.inset(strokeWidth);
        bitmap.rect(border, false);
        NRect check = border.inset(strokeWidth);
        bitmap.rect(check, true);
    }
    else {
        bitmap.rect(info.outer, true);
    }

    return bitmap.data();
}
static std::vector<uint8_t> make_checkbox_unchecked(
    const std::vector<uint8_t>& copyrData,
    size_t char_width,
    size_t char_height)
{
    MonoBitmap bitmap(copyrData, char_width, char_height);
    CopyrightDimensions info = get_copyright_dimensions(bitmap);

    bitmap.clear();
    bitmap.rect(info.outer, true);
    NRect border = info.outer.inset(info.stroke_width);
    bitmap.rect(border, false);

    return bitmap.data();

}

static std::vector<uint8_t> make_dropdown(
    const std::vector<uint8_t>& copyrData,
    size_t char_width,
    size_t char_height)
{
    MonoBitmap bitmap(copyrData, char_width, char_height);
    CopyrightDimensions info = get_copyright_dimensions(bitmap);

    bitmap.clear();

    int cy = (info.outer.top() + info.outer.bottom())/2;
    for (int iy = 0; iy < (int)char_height; ++iy)
    {
        if (iy >= cy) 
        {
            int left0 = iy-cy;
            int right0 = info.outer.width-left0;
            if (right0 > left0) {
                for (int ix = left0; ix < right0; ++ix)
                {
                    bitmap.set(ix+info.outer.left(),iy,true);
                }
            }
        }
    }
    return bitmap.data();
}
static std::vector<uint8_t> make_radio_button_unchecked(
    const std::vector<uint8_t>& copyrData,
    size_t char_width,
    size_t char_height)
{
    MonoBitmap bitmap(copyrData, char_width, char_height);
    CopyrightDimensions info = get_copyright_dimensions(bitmap);

    // Fill the inner circle.
    for (int y = info.inner.top(); y < info.inner.bottom(); ++y)
    {
        int xLeft = get_inner_left(bitmap, y);
        if (xLeft != -1)
        {
            int xRight = bitmap.width() - xLeft;
            for (int x = xLeft; x < xRight; ++x)
            {
                bitmap.set(x, y, false);
            }
        }
    }
    mirror_bitmap(bitmap, info.outer);
    return bitmap.data();
}


static void replace_character(
    ConsoleFont::ptr font,
    char32_t oldCharacter,
    char32_t newCharacter,
    const std::vector<uint8_t>& data)
{

    // if the new character exists, and if it is the ONLY character in the map entry, 
    // then use the existing entry (avoids leaving a map entry with zero characters, which the 
    // kernel doesn't seem to like).
    auto existing_position = font->get_glyph_position(newCharacter);
    if (existing_position.has_value())
    {
        auto& map = font->get_unicode_map();
        auto& entry = map[existing_position.value()];
        if (entry.unicode_chars == char32_to_utf8string(newCharacter))
        {
            font->set_glyph_data(existing_position.value(), newCharacter, data);
            return;
        }
    }
    auto position = font->get_glyph_position(oldCharacter);
    if (!position.has_value())
    {
        throw std::runtime_error("Character not found in font.");
    }
    font->set_glyph_data(position.value(), newCharacter, data);
}

void ::nwindows::internal::add_synthetic_characters(ConsoleFont::ptr font)
{
    char32_t RADIO_BUTTON_CHECKED_CHAR = L'\u25CF';  //●●
    char32_t RADIO_BUTTON_UNCHECKED_CHAR = L'\u25CB'; // ○
    char32_t CHECKBOX_CHECKED_CHAR = L'\u2611'; // ☑
    char32_t CHECKBOX_UNCHECKED_CHAR = L'\u2610'; //☐
    char32_t DROPDOWN_CHAR = L'⏷'; // ⏷


    auto sacrificial_characters = get_sacrificial_characters(font, 5);

    // use copyright symbol as a template for constructing the new characters.
    size_t copyrIndex = font->get_glyph_position(U'\u00A9').value();
    auto copyrData = font->get_glyph_data(copyrIndex);

    auto radioButtonChecked = make_radio_button_checked(copyrData, font->char_width(), font->char_height());
    auto radioButtonUnchecked = make_radio_button_unchecked(copyrData, font->char_width(), font->char_height());
    auto checkboxChecked = make_checkbox_checked(copyrData, font->char_width(), font->char_height());
    auto checkboxUnchecked = make_checkbox_unchecked(copyrData, font->char_width(), font->char_height());
    auto dropdown = make_dropdown(copyrData, font->char_width(), font->char_height());

    replace_character(font, sacrificial_characters[0], RADIO_BUTTON_CHECKED_CHAR, radioButtonChecked);
    replace_character(font, sacrificial_characters[1], RADIO_BUTTON_UNCHECKED_CHAR, radioButtonUnchecked);
    replace_character(font, sacrificial_characters[2], CHECKBOX_CHECKED_CHAR, checkboxChecked);
    replace_character(font, sacrificial_characters[3], CHECKBOX_UNCHECKED_CHAR, checkboxUnchecked);
    replace_character(font, sacrificial_characters[4], DROPDOWN_CHAR, dropdown);
}


