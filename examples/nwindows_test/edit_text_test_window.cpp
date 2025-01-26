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

void edit_text_test_window(NWindow::ptr parentWindow /*= nullptr */)
{
    NWindow::ptr window = NWindow::create(parentWindow, 4, 2, 55, AUTO_SIZE);
    NTextElement::ptr keyIndicator;

    window
        | title("EditText Test")
        | add_child(
            NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | add_child(NHorizontalStackElement::create()
                | add_child(
                    NTextElement::create("Basic Text")
                    | width(20)
                )
                | add_child(
                    NTextEditElement::create("")
                    | width(20)
                )
            )
            | add_child(NHorizontalStackElement::create()
                | add_child(
                    NTextElement::create("Password")
                    | width(20)
                )
                | add_child(
                    NTextEditElement::create("")
                    | password()
                    | width(20)
                )
            )
            | add_child(NHorizontalStackElement::create()
                | add_child(
                    NTextElement::create("Numeric")
                    | width(20)
                )
                | add_child(
                    NTextEditElement::create("")
                    | character_filter([](char32_t c, int position) { return iswdigit(c); })
                    | width(20)
                )
            )
            | add_child(
                NHorizontalStackElement::create()
                | column_gap(1)
                | alignment(NAlignment::End)
                | add_child(
                    keyIndicator = NTextElement::create("-")
                    | width(20)
                )
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
        );

    window->on_key.subscribe(
        [keyIndicator](NKeyEventArgs& args) mutable
        {
            std::string utf8Text = wstring_to_utf8(std::wstring(1, args.key));
            if (args.key < 32) {
                utf8Text = " ";
            }
            keyIndicator->text(std::format("Key: '{}' {}", utf8Text, (int64_t)args.key));
        }
    );

    window->on_key_code.subscribe(
        [keyIndicator](NKeyCodeEventArgs& args) mutable
        {
            keyIndicator->text(std::format("Keycode: 0{:o}", args.key_code));
        }
    );


    if (!parentWindow)
    {
        window->run();
    }
}

