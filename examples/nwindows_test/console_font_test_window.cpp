/*
 *   Copyright (c) 2025 Robin E. R. Davies
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

#include "tests.hpp"
#include <term.h>
#include <memory.h>
#include <NWindows/ConsoleFont.hpp>
#include <NWindows/nss.hpp>

namespace {
    class NNativeTextElement : public NElement {
    private:
        NNativeTextElement(char32_t  c)
            :NElement("NativeText"), c(c)
        {
        }
    public:
        using self = NNativeTextElement;
        using super = NElement;
        using ptr = std::shared_ptr<self>;

        static ptr create(char32_t c) {
            return std::shared_ptr<self>(new self(c));
        }

    protected:
        virtual NSize measure(const NSize& constraints) override {
            return { 1,1 };
        }
        virtual void render() override {
            move(0, 0);
            print(std::u32string(1, c));
        }
    private:
        char32_t c;

    };
}

NElement::ptr unicode_map_display(NWindow::ptr parentWindow)
{
    auto font = parentWindow->console_font();

    std::stringstream ss;
    if (font)
    {
        const auto& map = font->get_unicode_map();

        char32_t glyph = 0xF000;
        for (const auto& mapEntry : map)
        {
            ss << mapEntry.unicode_chars;
            for (const auto& sequence : mapEntry.unicode_sequences)
            {
                ss << "=" << sequence;
            }
            ss << "; ";
            ++glyph;
        }
    }
    std::string maptext = ss.str();
    return NTextElement::create(maptext) | margin({3,0,0,0}) | width(24) | height(16) | wrap_text(true);
}

static NElement::ptr native_character_grid(NWindow::ptr parentWindow)
{
    NVerticalStackElement::ptr grid = NVerticalStackElement::create() | row_gap(0);

    for (char32_t c = 0x00; c < 0x100; c += 16)
    {
        NHorizontalStackElement::ptr row = NHorizontalStackElement::create();
        for (int i = 0; i < 16; i++)
        {
            char32_t cc = 0xF000 + c + i;
            row->add_child(NNativeTextElement::create((int)cc));
        }
        if (parentWindow->console_font())
        {
            int nChars = parentWindow->console_font()->character_count();
            if (nChars > 256)
            {
                row->add_child(NTextElement::create("   "));
                for (int i = 0; i < 16; i++)
                {
                    char32_t cc = 0xF100 + c + i;
                    row->add_child(NNativeTextElement::create((int)cc));
                }
            }
        }
        grid->add_child(row);
    }
    return grid;
}


void console_font_test_window(NWindow::ptr parentWindow /* = nullptr */)
{
    auto console_font = parentWindow->console_font();

    NWindow::ptr window = NWindow::create(parentWindow, AUTO_SIZE, AUTO_SIZE);
    NTextElement::ptr keyIndicator;

    if (!console_font)
    {
        NMessageWindow::create(parentWindow,NMessageType::Error,"","Not running on an EGA/VGA console.");
        return;
    }

    window
        | title("Console Font Test")
        | add_child(NVerticalStackElement::create()
            |margin({ 2,0,2,0 }) | row_gap(1)
            | add_child(

                NTextElement::create(
                    NSS(
                        "pfs" << console_font->file_type()
                        << " " << console_font->char_height() << "x" << console_font->char_width()
                        << " glyphs: " << console_font->glyph_count() << " chars: " << console_font->character_count()
                    )
                )
            )
            | add_child(
                NHorizontalStackElement::create()
                | add_child(
                    native_character_grid(parentWindow)
                )
                // | add_child(
                //     unicode_map_display(parentWindow)
                // )
            )
            | add_child(
                NHorizontalStackElement::create()
                | alignment(NAlignment::End)
                | add_child(
                    NButtonElement::create("OK")
                    //| is_default()
                    | width(15)
                    | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                        args.handled = true;
                        windowRef.lock()->close();
                        }
                    )
                )
            )
        )
        ;

}

void console_font_test_window()
{
    console_font_test_window(nullptr);
}   