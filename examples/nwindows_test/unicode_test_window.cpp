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


void unicode_test_window(NWindow::ptr parentWindow /* = nullptr */)
{
    NWindow::ptr window = NWindow::create(parentWindow, 66, AUTO_SIZE);
    NTextElement::ptr keyIndicator;

    std::string oGrave = u32string_to_utf8(U"o\u0300");
    NColorPair boundsColor;
    if (parentWindow && parentWindow->max_color_pairs() > 8) {
        boundsColor = window->make_color_pair(0xC0C0C0, 0x4040C0);
    } else {
        boundsColor = window->make_color_pair(0xE00000, 0x000000);
    }
    window
        | title("Unicode Tests")
        | add_child(
            NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | add_child(
                NTextElement::create("Test rendering of Unicode characters, and layout of double-width Unicode characters.")
                | wrap_text()
            )
            | add_child(
                NHorizontalStackElement::create()
                | column_gap(2)
                | add_child(
                    NVerticalStackElement::create()
                    | add_child(NTextElement::create(oGrave) | color(boundsColor) | width(3))
                    | add_child(NTextElement::create(oGrave + oGrave) | color(boundsColor) | width(3))
                    | add_child(NTextElement::create(oGrave + oGrave + oGrave) | color(boundsColor) | width(3))
                    | add_child(NTextElement::create(oGrave + oGrave + oGrave + oGrave) | color(boundsColor) | width(3))
                    | add_child(NTextElement::create("") | color(boundsColor))
                    | add_child(NTextElement::create("©Ößæñ") | color(boundsColor))
                )
                | add_child(
                    NVerticalStackElement::create()
                    | add_child(NTextElement::create("🛟") | color(boundsColor))
                    | add_child(NTextElement::create("🛟🛟") | color(boundsColor))
                    | add_child(NTextElement::create("🛟🛟🛟") | color(boundsColor))
                    | add_child(
                        NTextElement::create("세계를 향한 대화, 유니코드로 하십시오.")
                        | color(boundsColor)
                        | wrap_text()
                        | width(18)
                    )
                )
                | add_child(
                    NVerticalStackElement::create()
                    | add_child(NTextElement::create("🦋🦋🦋") | color(boundsColor) | width(2))
                    | add_child(NTextElement::create("🦋🦋🦋") | color(boundsColor) | width(3))
                    | add_child(NTextElement::create("🦋🦋🦋") | color(boundsColor) | width(4))
                    | add_child(NTextElement::create("🩷💛") | color(boundsColor) | width(AUTO_SIZE) | alignment(NAlignment::Center))
                    | add_child(NTextElement::create("👋🏽👋👋🏿") | color(boundsColor) | width(AUTO_SIZE) | alignment(NAlignment::Center))
                )
                | add_child(
                    NRadioGroupElement::create(
                        NOrientation::Vertical,
                        { "세계를","향한","대화", "유니코드로","하십시오" }, 2
                    )
                )
            )
            | add_child(
                NRadioGroupElement::create(
                    NOrientation::Horizontal,
                    { "세계를","향한","대화", "유니코드로","하십시오" }, 1
                )
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

