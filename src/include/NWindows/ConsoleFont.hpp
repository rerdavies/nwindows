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

#ifdef __linux__ // Linux only

#include "NWindows/NoCopyNoMove.hpp"
#include <memory>
#include <filesystem>
#include <optional>
#include <string>
#include <vector>

namespace nwindows {

    struct ConsoleMapEntry {
        std::string unicode_chars;
        std::vector<std::string> unicode_sequences;
        int glyph_index;
    };
    // EGA/VGA Console Font Info.
    class ConsoleFont 
    {
    protected:
        ConsoleFont();

    public:
        virtual ~ConsoleFont();
        using self = ConsoleFont;
        using ptr = std::shared_ptr<self>;
        static ptr create();

        virtual void load(const std::filesystem::path &fontPath) = 0;
        virtual void save(const std::filesystem::path &fontPath) = 0;

        virtual bool can_get_console_font()  = 0;
        virtual void get_console_font() = 0;
        virtual void set_console_font() = 0;


        virtual ConsoleFont::ptr clone() = 0;

        virtual bool is_valid_character(char32_t c) = 0;
        virtual std::optional<size_t> get_glyph_position(char32_t character) = 0;
        virtual std::optional<size_t> get_glyph_position(const std::string &character) = 0;

        virtual std::vector<uint8_t> get_glyph_data(size_t glyph_position) = 0;
        virtual void set_glyph_data(size_t glyph_position,char32_t unicode_character, std::vector<uint8_t> bits) = 0;

        virtual const std::vector<ConsoleMapEntry> &get_unicode_map() = 0;
        virtual void set_unicode_map(const std::vector<ConsoleMapEntry> &map) = 0;


        virtual int file_type() const  = 0;
        virtual size_t char_width() const  = 0;
        virtual size_t char_height() const = 0;
        virtual size_t glyph_count() const = 0;
        virtual size_t character_count() const = 0;
        virtual bool has_unicode_map() const = 0;
        virtual size_t extra_bytes() const = 0;

    };
}
#endif