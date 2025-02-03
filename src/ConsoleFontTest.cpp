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


#include <NWindows/ConsoleFont.hpp>
#include "SyntheticCharacters.hpp"


#include <filesystem>
#include "TempFile.hpp"
#include <iostream>
#include "string.h"
#include <stdexcept>
#include "CommandLineParser.hpp"
#include <NWindows/NUtf8.hpp>
#include <NWindows/NWindows.hpp>
#include "SyntheticCharacters.hpp"

using namespace nwindows;
using namespace rerdavies;

void test_font(
    const std::filesystem::path& originalPath,
    const std::filesystem::path& fontPath
)
{
    try {
        ConsoleFont::ptr font = ConsoleFont::create();
        font->load(fontPath);

        std::cout << originalPath.filename() << std::endl;
        std::cout << "   pfs" << font->file_type()
            << " " << font->char_width()
            << "x" << font->char_height()
            << " glyphs: " << font->glyph_count()
            << " characters: " << font->character_count()
            << " map: " << (font->has_unicode_map() ? "yes" : "no")
            << " extra: " << (font->extra_bytes());
        std::u32string sacrificialCharacters = ::nwindows::internal::get_sacrificial_characters(font, 6);
        std::cout << " sac: " << u32string_to_utf8(sacrificialCharacters) << std::endl; 

        std::cout << std::endl;
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error loading font: "  " " << e.what() << " (" << originalPath << ")" << std::endl;
    }
}

void print_font_info(ConsoleFont::ptr font)
{
    std::cout << "Current font:   pfs" << font->file_type()
        << " " << font->char_width()
        << "x" << font->char_height()
        << " glyphs: " << font->glyph_count()
        << " characters: " << font->character_count()
        << " map: " << (font->has_unicode_map() ? "yes" : "no")
        << " extra: " << (font->extra_bytes())
        << std::endl;

}
void load_console_font() {
    ConsoleFont::ptr font = ConsoleFont::create();
    if (font->can_get_console_font())
    {
        font->get_console_font();
        print_font_info(font);
    }
}


#include <unistd.h>
#include <sys/ioctl.h>
#include <linux/vt.h>
#include <linux/kd.h>
#include <fcntl.h>
#include <linux/kd.h>
#include <vector>
#include "Finally.hpp"

void dump_unicode_ioctl()
{
    int console_fd = open("/dev/tty", O_RDWR);
    if (console_fd < 0)
    {
        std::cout << "Can't open /dev/tty." << std::endl;
        return;
    }
    Finally closeConsoleFd([console_fd]() { close(console_fd); });


    std::vector<uint8_t> font_data;
    font_data.resize(512 * 32);

    struct consolefontdesc font_desc;
    font_desc.charcount = 512;
    font_desc.chardata = (char*)font_data.data();
    font_desc.charheight = 32;

    errno = 0;
    int rc = ioctl(console_fd, GIO_FONTX, &font_desc);

    if (rc != 0)
    {
        std::string msg = strerror(errno);
        std::cout << "FontX not supported. " << msg << std::endl;
    }
    else {
        std::cout << "Fontx supported: " << font_desc.charcount << " characters, height: " << font_desc.charheight << std::endl;
    }





    std::vector<unipair> unidata;
    unidata.resize(10240);
    struct unimapdesc unimap;
    unimap.entry_ct = 0;
    unimap.entries = nullptr;
    ioctl(console_fd, GIO_UNIMAP, &unimap);
    if (unimap.entry_ct == 0)
    {
        std::cout << "Unicode mapping not supported. count = 0." << std::endl;
        return;
    }
    std::cout << "# Entries: " << unimap.entry_ct << std::endl;


    unimap.entries = unidata.data();
    unimap.entry_ct = 512;

    if (ioctl(console_fd, GIO_UNIMAP, &unimap) == 0) {
        std::cout << "Unicode mapping supported. entries: " << unimap.entry_ct << std::endl;
        if (unimap.entry_ct != 0) {
            for (size_t i = 0; i < unimap.entry_ct; i++) {
                std::cout << "  " << i << ": " << std::hex << unimap.entries[i].unicode << " -> " << unimap.entries[i].fontpos << std::dec << std::endl;
            }
        }
        return;
    }
    std::cout << "Unicode mapping not supported." << std::endl;
}

void invert_character_a()
{
    ConsoleFont::ptr font = ConsoleFont::create();

    font->get_console_font();

    auto a_position_opt = font->get_glyph_position(U'a');
    if (!a_position_opt) {
        throw std::runtime_error("Can't find character 'a' in font.");
    }

    size_t a_position = *a_position_opt;

    auto a_data = font->get_glyph_data(a_position);
    for (size_t i = 0; i < a_data.size(); i++)
    {
        a_data[i] = ~a_data[i];
    }
    font->set_glyph_data(a_position,U'a', a_data);
    font->set_console_font();

}

std::string codepage437 = 
" ☺☻♥♦♣♠•◘○◙♂♀♪♫☼"
"►◄↕‼¶§▬↨↑↓→←∟↔▲▼"
" !\"#$%&'()*+,-./"
"0123456789:;<=>?"
"@ABCDEFGHIJKLMNO"
"PQRSTUVWXYZ[\\]^_"
"`abcdefghijklmno"
"pqrstuvwxyz{|}~⌂"
"ÇüéâäàåçêëèïîìÄÅ"
"ÉæÆôöòûùÿÖÜ¢£¥₧ƒ"
"áíóúñÑªº¿⌐¬½¼¡«»"
"░▒▓│┤╡╢╖╕╣║╗╝╜╛┐"
"└┴┬├─┼╞╟╚╔╩╦╠═╬╧"
"╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀"
"αßΓπΣσµτΦΘΩδ∞φε∩"
"≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ";


static void print_cset() {
    ConsoleFont::ptr font = ConsoleFont::create();
    font->get_console_font();

    auto n = font->glyph_count();

    for (char32_t c = 0xF000; c < 0xF100; c += 0x10)
    {
        for (int i = 0; i < 0x10; i++)
        {
            char32_t cc = c + i;
            if (cc < 0xF020) {
                std::cout << '.';
            }
            else {
                std::cout << u32string_to_utf8(std::u32string(1, cc));
            }
        }
        if (n > 256) {
            std::cout << "   " << std::hex << c + 0x100 << std::dec << " ";
            for (int i = 0; i < 0x10; i++)
            {
                char32_t cc = c + 0x100 + i;

                std::cout << u32string_to_utf8(std::u32string(1, cc));
            }
        }
        std::wcout << std::endl;
    }

    std::wcout << std::endl;

    for (size_t y = 0; y < 256; y += 16)
    {
        for (size_t x = 0; x < 16; ++x)
        {
            std::cout << u32string_to_utf8(std::u32string(1, codepage437[y + x]));
        }
        std::cout.flush();
        std::cout << "   ";
        for (size_t x = 0; x < 16; ++x)
        {
            std::cout << (char)(y + x);
        }
        std::cout.flush();
        std::wcout << std::endl;
    }

}





int main(int argc, char** argv)
{
    //std::setlocale(LC_ALL, "en_US.UTF-8");
    // std::locale::global(std::locale("en_US.UTF-8"));

    auto utf8Locale = std::locale("C.UTF-8"); 
    std::wcout.imbue(utf8Locale);
    std::cout.imbue(utf8Locale);
    std::cerr.imbue(utf8Locale);




    try {
        bool help = false;
        bool list = false;
        bool flip_a = false;
        bool get_display = false;
        bool print_cset_opt = false;
        bool extra_chars_opt = false;
        std::string input_filename;
        std::string output_filename;

        CommandLineParser parser;

        parser.AddOption('h', "help", &help);
        parser.AddOption('l', "list", &list);
        parser.AddOption('d', "get-display", &get_display);
        parser.AddOption('i', "input", &input_filename);
        parser.AddOption('o', "out", &output_filename);
        parser.AddOption(0, "flip_a", &flip_a);
        parser.AddOption('c', "cset", &print_cset_opt);
        parser.AddOption('x', "extra-chars", &extra_chars_opt);


        parser.Parse(argc, argv);

        auto font = ConsoleFont::create();

        if (get_display)
        {
            font->get_console_font();
        }

        if (extra_chars_opt)
        {
            auto font = ConsoleFont::create();
            if (input_filename.length() > 0)
            {
                font->load(input_filename);
            } else {
                 font->get_console_font();
            }
            ::nwindows::internal::add_synthetic_characters(font);
            if (output_filename.length() > 0)
            {
                font->save(output_filename);
            } else {
                font->set_console_font();
            }
            return EXIT_SUCCESS;
        }

        if (input_filename.length() > 0)
        {
            font->load(input_filename);
            print_font_info(font);
            return EXIT_SUCCESS;
        }


        if (print_cset_opt) {
            print_cset();
        }

        // dump_unicode_ioctl();

        if (flip_a) {
            invert_character_a();
            return EXIT_SUCCESS;
        }
        if (list)
        {

            for (auto& direntry : std::filesystem::directory_iterator("/usr/share/consolefonts"))
            {
                auto path = direntry.path();
                if (path.string().ends_with(".psf.gz"))
                {
                    TempFile tempFile(".psf");
                    auto _ = system(("gunzip -c " + path.string() + " > " + tempFile.path().string()).c_str());
                    (void)_; // unuszed.

                    test_font(path, tempFile.path());

                }
                else if (path.extension() == ".psf")
                {
                    test_font(path, path);
                }
            }
            return EXIT_SUCCESS;
        }

        for (auto& argument : parser.Arguments())
        {
            test_font(argument, argument);
        }
    }
    catch (const std::exception& e)
    {
        std::cerr << "Error: " << e.what() << std::endl;
        return EXIT_FAILURE;
    }
    return EXIT_SUCCESS;

}