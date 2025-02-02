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

class NAltTextElement: public NElement {
private:
    NAltTextElement(int  acs) 
    :NElement("AltText"), acs(acs)
    {
    }
public:
    using self = NAltTextElement;
    using super = NElement;
    using ptr = std::shared_ptr<self>;

    static ptr create(int acs) {
        return std::shared_ptr<self>(new NAltTextElement(acs));
    }

protected:
    virtual NSize measure(const NSize& constraints) override {
        return { 1,1 };
    }
    virtual void render() override {
        move(0,0);
        print_acs(0,0,this->acs);
    }
private:
    int acs;

};

class NCharacterTestWindow: public NElement {
private:
    NCharacterTestWindow(wchar_t  c) 
    :NElement("CharacterTest"), c(c)
    {
    }
public:
    using self = NCharacterTestWindow;
    using super = NElement;
    using ptr = std::shared_ptr<self>;

    static ptr create(wchar_t c) {
        return std::shared_ptr<self>(new NCharacterTestWindow(c));
    }

protected:
    virtual NSize measure(const NSize& constraints) override {
        return { 2,1 };
    }
    virtual void render() override {
        cchar_t ch;
        memset(&ch,0,sizeof(ch));
        ch.chars[0] = this->c;
        ch.chars[1] = 0;

        bool valid = wadd_wch(stdscr,&ch) != ERR;
        move(0,0);
        wchar_t str[2] = {this->c,0};
        if (!valid) {
            str[0] = L'X';
        }
        if (ch.chars[0] != this->c) {
            str[0] = L'?';
        }
        print(str);
    }
private:
    wchar_t c;

};


static NElement::ptr character_test(NWindow::ptr parentWindow, const std::string& label, char32_t c)
{
    bool supported = parentWindow->can_display_character(c);
    return NHorizontalStackElement::create()
        | column_gap(1)
        | add_child(NTextElement::create(label))
        | add_child(NTextElement::create(u32string_to_utf8(std::u32string(1, c))))
        | add_child(NCharacterTestWindow::create(c))
        | add_child(NTextElement::create(supported ? "Supported" : "Not supported"));
}

static NElement::ptr acs_grid(NWindow::ptr parentWindow)
{
    NVerticalStackElement::ptr grid = NVerticalStackElement::create();
    for (char32_t c = 0x20; c < 0x80; c += 16)
    {
        NHorizontalStackElement::ptr row = NHorizontalStackElement::create();
        for (int i = 0; i < 16; i++)
        {
            char32_t cc = c+i;
            row->add_child(NAltTextElement::create((int)cc));
        }
        grid->add_child(row);
    }
    return grid;    
}

static NElement::ptr character_grid(NWindow::ptr parentWindow)
{
    NVerticalStackElement::ptr grid = NVerticalStackElement::create();
    for (char32_t c = 0x20; c < 0x100; c += 16)
    {
        NHorizontalStackElement::ptr row = NHorizontalStackElement::create();
        for (int i = 0; i < 16; i++)
        {
            char32_t cc = c+i;
            if (cc == 0x7F) cc = 0xFFFD;
            if (wcwidth(cc) == -1)
            {   
                cc = 0xFFFD;
            }
            row->add_child(NTextElement::create(u32string_to_utf8(std::u32string(1, cc))));
        }
        grid->add_child(row);
    }
    return grid;    
}

static NElement::ptr device_grid(NWindow::ptr parentWindow)
{
    NVerticalStackElement::ptr grid = NVerticalStackElement::create();
    for (char32_t c = 0xF000; c < 0xF100; c += 16) // special range for device characters on EGA/VGA devices.
    {
        NHorizontalStackElement::ptr row = NHorizontalStackElement::create();
        for (int i = 0; i < 16; i++)
        {
            char32_t cc = c+i;
            if (cc == 0x7F) cc = 0xFFFD;
            if (wcwidth(cc) == -1)
            {   
                cc = 0xFFFD;
            }
            row->add_child(NTextElement::create(u32string_to_utf8(std::u32string(1, cc))));
        }
        grid->add_child(row);
    }
    return grid;    
}

void ascii_fallback_test_window(NWindow::ptr parentWindow /* = nullptr */)
{
    NWindow::ptr window = NWindow::create(parentWindow, 66, AUTO_SIZE);
    NTextElement::ptr keyIndicator;

    std::string oGrave = u32string_to_utf8(U"o\u0300");
    NColorPair boundsColor;
    if (parentWindow && parentWindow->max_color_pairs() > 8) {
        boundsColor = window->make_color_pair(0xC0C0C0, 0x4040C0);
    }
    else {
        boundsColor = window->make_color_pair(0xE00000, 0x000000);
    }
    window
        | title("ASCII Fallback Test")
        | add_child(
            NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | add_child(
                NTextElement::create("Fallbacks only occur on non-Unicode terminals. ◉●○🗹□☑☐")
                | wrap_text()
            )
            | add_child(
                NHorizontalStackElement::create()
                | column_gap(2)
                | add_child(    
                    NVerticalStackElement::create()
                    | add_child(
                        character_test(parentWindow,
                            "O with Grave: ",



                            0xF2)
                    )
                    | add_child(
                        character_test(parentWindow,
                            "Composing accent: ",
                            0x301)
                    )
                    | add_child(
                        character_test(parentWindow,
                            "Smile Emjoi: ",
                            0x1F60A
                        )
                    )
                    | add_child(
                        character_test(parentWindow,
                            "Checkbox: ",
                            U'☑')
                    )
                    | add_child(
                        character_test(parentWindow,
                            "Checkbox: ",
                            U'☐')
                    )
                    | add_child(
                        character_test(parentWindow,
                            "RadioButton: ",
                            U'●')
                    )
                )
                | add_child(
                    NVerticalStackElement::create()
                    | alignment(NAlignment::Start)
                    | add_child(NCheckboxElement::create("Checkbox", true))
                    | add_child(NCheckboxElement::create("Checkbox", false))
                    | add_child(NRadioGroupElement::create(
                        NOrientation::Vertical,
                        { "Radio 1", "Radio 2", "Radio 3" }, 1))
                )
            )
            | add_child(
                NHorizontalStackElement::create()
                | column_gap(3)
                | add_child(character_grid(parentWindow))
                | add_child(acs_grid(parentWindow))
                | add_child(device_grid(parentWindow))
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
                        })
                )
            )
        )
        ;

}

