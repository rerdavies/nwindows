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

#include "NWindows/NUtf8.hpp"


#include <cuchar>
#include <string>
#include <stdexcept>
#include <codecvt>
#include <string>
#include <vector>
#include <wchar.h>
#include <locale>

using namespace nwindows;

std::string nwindows::wstring_to_utf8(const std::wstring& wstr) {
    std::mbstate_t state{};
    std::string result;

    // Calculate required buffer size
    const wchar_t* pwstr = wstr.data();
    std::size_t len = std::wcsrtombs(nullptr, &pwstr, 0, &state);
    if (len == static_cast<std::size_t>(-1)) {
        throw std::runtime_error("Conversion failed");
    }

    // Resize and convert
    result.resize(len);
    state = std::mbstate_t{};
    pwstr = wstr.data();

    std::wcsrtombs(&result[0], &pwstr, len, &state);

    return result;
}

size_t nwindows::utf8_increment(const std::string& utf8_str, size_t position) {
    size_t end = utf8_str.size();
    if (position >= end) {
        return position;
    }
    while (position < end) {
        ++position;
        unsigned char c = (unsigned char)utf8_str[position];
        if ((c & 0xC0) != 0x80) {
            break;
        }
    }
    return position;
}


char32_t nwindows::utf8_char32_at(const std::string& utf8_str, size_t position)
{
    // convert utf8 text at utf8_str[position] to a char32_t
    std::mbstate_t state{};
    char32_t wide_char = 0;
    std::mbrtoc32(&wide_char, &utf8_str[position], utf8_str.size() - position, &state);

    return wide_char;
}
size_t nwindows::utf8_wide_character_width(const std::string& utf8_str, size_t position)
{
    char32_t wide_char = utf8_char32_at(utf8_str, position);

    // It's unclear whether windows terminal will support double-width unicode characters. 
    // If it does, then it is not clear how unicode characters greater than 0x10000 will be handled here.
    // If it does not, then just always return 1. (Try some Korean or Chines characters to test).

    static_assert(sizeof(wchar_t) == sizeof(char32_t)); // True on Linux, not on WIN32! 
    int char_width = wcwidth((wchar_t)wide_char); // ... so this won't work in WIN32.
    if (char_width < 0)
    {
        throw std::runtime_error("Invalid character.");
    }
    return (size_t)char_width;
}


size_t nwindows::utf8_decrement(const std::string& utf8_str, size_t position)
{
    while (position != 0)
    {
        --position;
        unsigned char c = (unsigned char)utf8_str[position];
        if ((c & 0xC0) != 0x80)
        {
            break;
        }
    }
    return position;
}

std::string nwindows::u16string_to_utf8(const std::u16string& s) {
    std::string result;
    for (auto i = s.begin(); i != s.end(); ++i)
    {
        char32_t c = *i;
        if (c >= 0xD800 && c <= 0xDBFF)
        {
            if (i+1 == s.end())
            {
                c = 0xFFFD;
            } else {
                char32_t c2 = *(i + 1);
                if (c2 >= 0xDC00 && c2 <= 0xDFFF)
                {
                    c = 0x10000 + ((c - 0xD800) << 10) + (c2 - 0xDC00);
                    ++i;
                } else {
                    c = 0xFFFD;
                }
            }
        }
        if (c >= 0x100000)
        {
            c = 0xFFFD;
        }
        if (c <= 0x7F) {
            result.push_back(static_cast<char>(c));
        }
        else if (c <= 0x7FF) {
            result.push_back(static_cast<char>(0xC0 | (c >> 6)));
            result.push_back(static_cast<char>(0x80 | (c & 0x3F)));
        }
        else if (c <= 0xFFFF) {
            result.push_back(static_cast<char>(0xE0 | (c >> 12)));
            result.push_back(static_cast<char>(0x80 | ((c >> 6) & 0x3F)));
            result.push_back(static_cast<char>(0x80 | (c & 0x3F)));
        }
        else if (c <= 0x10FFFF) {
            result.push_back(static_cast<char>(0xF0 | (c >> 18)));
            result.push_back(static_cast<char>(0x80 | ((c >> 12) & 0x3F)));
            result.push_back(static_cast<char>(0x80 | ((c >> 6) & 0x3F)));
            result.push_back(static_cast<char>(0x80 | (c & 0x3F)));
        }
    }
    return result;
}


std::string nwindows::u32string_to_utf8(const std::u32string& s) {
    std::string result;
    for (char32_t c : s) {
        if (c <= 0x7F) {
            result.push_back(static_cast<char>(c));
        }
        else if (c <= 0x7FF) {
            result.push_back(static_cast<char>(0xC0 | (c >> 6)));
            result.push_back(static_cast<char>(0x80 | (c & 0x3F)));
        }
        else if (c <= 0xFFFF) {
            result.push_back(static_cast<char>(0xE0 | (c >> 12)));
            result.push_back(static_cast<char>(0x80 | ((c >> 6) & 0x3F)));
            result.push_back(static_cast<char>(0x80 | (c & 0x3F)));
        }
        else if (c <= 0x10FFFF) {
            result.push_back(static_cast<char>(0xF0 | (c >> 18)));
            result.push_back(static_cast<char>(0x80 | ((c >> 12) & 0x3F)));
            result.push_back(static_cast<char>(0x80 | ((c >> 6) & 0x3F)));
            result.push_back(static_cast<char>(0x80 | (c & 0x3F)));
        }
    }
    return result;
}

std::wstring nwindows::utf8_to_wstring(const std::string&s)
{
    
    std::wstring_convert<std::codecvt_utf8<wchar_t>> converter;
    return converter.from_bytes(s);
}

std::u16string nwindows::utf8_to_u16string(const std::string& s) {

    std::u16string result;

    for (size_t i = 0; i < s.size(); ) {
        char32_t codepoint = 0;
        unsigned char c = static_cast<unsigned char>(s[i]);

        if (c <= 0x7F) {  // ASCII character
            codepoint = c;
            i += 1;
        }
        else if ((c & 0xE0) == 0xC0) {  // 2-byte sequence
            if (i + 1 >= s.size()) 
            {
                codepoint = 0xFFFD;
                i = s.size();
                break;  // Invalid sequence
            } else {
                codepoint = ((c & 0x1F) << 6) |
                    (static_cast<unsigned char>(s[i + 1]) & 0x3F);
                i += 2;
            }
        }
        else if ((c & 0xF0) == 0xE0) {  // 3-byte sequence
            if (i + 2 >= s.size()) 
            {
                // invalid sequence.
                codepoint = 0xFFFD;
                i = s.size();

            } else {
                codepoint = ((c & 0x0F) << 12) |
                    ((static_cast<unsigned char>(s[i + 1]) & 0x3F) << 6) |
                    (static_cast<unsigned char>(s[i + 2]) & 0x3F);
                i += 3;
            }
        }
        else if ((c & 0xF8) == 0xF0) {  // 4-byte sequence
            if (i + 3 >= s.size()) {
                codepoint = 0xFFFD;
                i = s.size();
            } else {
                codepoint = ((c & 0x07) << 18) |
                    ((static_cast<unsigned char>(s[i + 1]) & 0x3F) << 12) |
                    ((static_cast<unsigned char>(s[i + 2]) & 0x3F) << 6) |
                    (static_cast<unsigned char>(s[i + 3]) & 0x3F);
            }
            i += 4;
        }
        else {
            // Invalid UTF-8 sequence, skip this byte
            codepoint = 0xFFFD;
            i += 1;
        }

        if (codepoint >= 0x10FFFFLL) {
            codepoint = 0xFFFD;
        }

        // Validate the codepoint
        if (codepoint >= (char32_t)0x010000)
        {
            // convert utf-32 to utf-16 surrogate pair
            codepoint -= 0x010000;
            char16_t c1 = (char16_t)(0xD800 | (codepoint >> 10));
            char16_t c2 = (char16_t)(0xDC00 | (codepoint & 0x3FF));
            result.push_back(c1);
            result.push_back(c2);
            
        }
        else {
            result.push_back((char16_t)codepoint);
        }
    }

    return result;
}


std::u32string nwindows::utf8_to_u32string(const std::string& s) {
    std::u32string result;
    for (size_t i = 0; i < s.size(); ) {
        char32_t codepoint = 0;
        unsigned char c = static_cast<unsigned char>(s[i]);

        if (c <= 0x7F) {  // ASCII character
            codepoint = c;
            i += 1;
        }
        else if ((c & 0xE0) == 0xC0) {  // 2-byte sequence
            if (i + 1 >= s.size()) 
            {
                codepoint = 0xFFFD;
                i = s.size();
                break;  // Invalid sequence
            } else {
                codepoint = ((c & 0x1F) << 6) |
                    (static_cast<unsigned char>(s[i + 1]) & 0x3F);
                i += 2;
            }
        }
        else if ((c & 0xF0) == 0xE0) {  // 3-byte sequence
            if (i + 2 >= s.size()) 
            {
                // invalid sequence.
                codepoint = 0xFFFD;
                i = s.size();

            } else {
                codepoint = ((c & 0x0F) << 12) |
                    ((static_cast<unsigned char>(s[i + 1]) & 0x3F) << 6) |
                    (static_cast<unsigned char>(s[i + 2]) & 0x3F);
                i += 3;
            }
        }
        else if ((c & 0xF8) == 0xF0) {  // 4-byte sequence
            if (i + 3 >= s.size()) {
                codepoint = 0xFFFD;
                i = s.size();
            } else {
                codepoint = ((c & 0x07) << 18) |
                    ((static_cast<unsigned char>(s[i + 1]) & 0x3F) << 12) |
                    ((static_cast<unsigned char>(s[i + 2]) & 0x3F) << 6) |
                    (static_cast<unsigned char>(s[i + 3]) & 0x3F);
            }
            i += 4;
        }
        else {
            // Invalid UTF-8 sequence, skip this byte
            codepoint = 0xFFFD;
            i += 1;
        }

        // Validate the codepoint
        if (codepoint >= 0x10FFFF)
        {
            codepoint = 0xFFFD;
        }

        result.push_back(codepoint);
    }
    return result;
}


static size_t find_word_break(const std::u32string& text, size_t position, size_t length)
{
    size_t word_break = position + length;

    for (size_t i = 0; i < length; /**/) {
        if (position >= text.length()) {
            return position;
        }
        char32_t c = text[position];
        switch (c)
        {
        case '-': word_break = position + 1; break;
        case ' ': word_break = position; break;
        case '\n': return position;
        }
        i += wcwidth((wchar_t)c);
        ++position;
    } 
    return word_break;
}

std::vector<std::string> nwindows::utf8_line_wrap(
    const std::string& text,
    size_t  line_length
) {
    std::vector<std::string> lines;

    std::u32string wide_text = utf8_to_u32string(text); size_t position = 0;
    while (position < wide_text.length()) {
        size_t next_position =
            find_word_break(wide_text, position, line_length);
        std::string line =
            u32string_to_utf8(
                wide_text.substr(position, next_position - position)
            );


        line += std::string((size_t)line_length - utf8_wc_length(line), ' ');
        lines.push_back(line);

        while (next_position < wide_text.length())
        {
            auto c = wide_text[next_position];
            if (c != ' ')
            {
                break;
            }
            ++next_position;
        }
        if (next_position < wide_text.length() && wide_text[next_position] == '\n')
        {
            ++next_position;
        }

        position = next_position;


    }
    return lines;
}

std::string nwindows::utf8_substr(const std::string& text, size_t start, size_t length)
{
    std::u32string wide_text = utf8_to_u32string(text);
    std::u32string result = wide_text.substr(start, length);
    return u32string_to_utf8(result);
}

size_t nwindows::utf8_length(const std::string& utf8_str)
{
    size_t glyph_count = 0;
    for (size_t i = 0; i < utf8_str.length();)
    {
        // Check the first byte to determine the number of bytes in the character
        unsigned char first_byte = static_cast<unsigned char>(utf8_str[i]);

        // Determine character length based on leading bits
        if (first_byte <= 0x7F)
        {
            // Single-byte character (ASCII)
            i += 1;
        }
        else if ((first_byte & 0xE0) == 0xC0)
        {
            // Two-byte character
            i += 2;
        }
        else if ((first_byte & 0xF0) == 0xE0)
        {
            // Three-byte character
            i += 3;
        }
        else if ((first_byte & 0xF8) == 0xF0)
        {
            // Four-byte character
            i += 4;
        }
        else
        {
            // Invalid UTF-8 sequence
            return 0;
        }

        // Count each valid character as a glyph
        glyph_count++;
    }

    return glyph_count;
}


size_t nwindows::utf8_wc_length(const std::string& utf8_str, size_t start, size_t end)
{
    // Bizarre, but don't optimize until we have a performance problem. 
    // Doesn't work on windows.
    // Relies on wchar_t being 4 bytes, which is true on Linux, but not on Windows.
    // Hopefully, there's a convenient substitute for wcwidth, which takes a wchar_t argument on Linux.
    static_assert(sizeof(wchar_t) == sizeof(char32_t));

    int total = 0;
    size_t ix = 0;
    for (size_t i = 0; i < start;++i)
    {
        ix = utf8_increment(utf8_str, ix);
    }
    while (start < end && ix < utf8_str.length()) {
        char32_t c = utf8_char32_at(utf8_str, ix);
        if (c == 0) {
            break;
        }
        int char_width = wcwidth((wchar_t)c); // Note the cast which doesn't work on WIN32!
        if (char_width < 0)
        {
            throw std::runtime_error("Invalid character.");
        }
        total += char_width;
        ix = utf8_increment(utf8_str, ix);
        ++start;
    }
    return total;
}

size_t nwindows::utf8_wc_length(const std::string& utf8_str)
{
    return utf8_wc_length(utf8_str, 0, std::numeric_limits<size_t>::max());
}


std::string nwindows::utf8_wc_substr(
    const std::string& text,
    size_t start,
    int length
)
{
    std::u32string wide_text = utf8_to_u32string(text);
    size_t count = 0;
    int total = 0;
    for (size_t i = start; i < wide_text.length(); ++i)
    {
        char32_t c = wide_text[i];
        int char_width = wcwidth((wchar_t)c);
        total += char_width;
        if (total > length)
        {
            break;
        }
        ++count;
    }
    wide_text = wide_text.substr(start, count);
    return u32string_to_utf8(wide_text);
}

std::wstring nwindows::u32string_to_wstring(const std::u32string& u32str)
{
    // figure out what to do on Windows.
    static_assert(sizeof(wchar_t) == sizeof(char32_t));

    return std::wstring((wchar_t*)u32str.data(), u32str.length());
}
