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

#include <string>
#include <vector>
#include <limits>

namespace nwindows {

    std::string wstring_to_utf8(const std::wstring& wstr);
    std::string u16string_to_utf8(const std::u16string& u16str);
    std::string u32string_to_utf8(const std::u32string& u32str);
    std::wstring u32string_to_wstring(const std::u32string& u32str);

    std::wstring utf8_to_wstring(const std::string& utf8_str);
    std::u32string utf8_to_u32string(const std::string& str);
    std::u16string utf8_to_u16string(const std::string& str);
    
    std::vector<std::string> utf8_line_wrap(
        const std::string& text,
        size_t  line_length
    );

    std::string utf8_substr(
        const std::string& text,
        size_t start,
        size_t length = std::numeric_limits<size_t>::max());

    inline std::string utf8_substr(
        const std::string& text,
        int start,
        int length = std::numeric_limits<int>::max())
    {
        return utf8_substr(text, (size_t)start, (size_t)length);
    }

    // A utf8 substring starting at start, occupying no more than length character cells,
    // accounting for double-width characters.
    std::string utf8_wc_substr(
        const std::string& text,
        size_t start,
        int length);



    size_t utf8_length(const std::string& utf8_str);
    size_t utf8_increment(const std::string& utf8_str, size_t position);
    size_t utf8_decrement(const std::string&utf8_str,size_t position);
    char32_t utf8_char32_at(const std::string& utf8_str, size_t position);

    // Number of character cells occupied by the char32_t character at position. 
    // 0, if '\0', 1 if single-width, 2 if double-width (maybe even more?)
    size_t utf8_wide_character_width(const std::string&utf8_str,size_t position);



    // display length of the string including double-width terminal characters
    size_t utf8_wc_length(const std::string&utf8_str);
    size_t utf8_wc_length(const std::string&utf8_str, size_t start, size_t end);

    inline std::string char32_to_utf8string(char32_t c)
    {
        return u32string_to_utf8(std::u32string(1, c));
    }
}