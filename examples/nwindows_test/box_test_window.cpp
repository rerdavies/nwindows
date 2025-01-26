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



void box_test_window(NWindow::ptr parentWindow /* = nullptr */)
{

    NWindow::ptr window = NWindow::create(parentWindow, 66, AUTO_SIZE);

    auto border2Color = window->make_color_pair(0x000000, 0xFFFFFF);
    (void)border2Color;

    window
        | title("Box Test")
        | add_child(NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | add_child(NHorizontalStackElement::create()
                | column_gap(1)
                | add_child(
                    NBoxElement::create() | width(10) | height(10)
                    | title("Box 1")
                    | width(12) | height(3)
                    //| add_child(NTextElement::create("Box 1"))
                )
                | add_child(
                    NBoxElement::create() | width(AUTO_SIZE) | height(AUTO_SIZE)
                    | title("Meat")
                    | add_child(
                        NVerticalStackElement::create()
                        | add_child(
                            NRadioGroupElement::create(NOrientation::Vertical, { "Chicken", "Beef", "Pork" }, 0)
                            | on_selection_changed([](NElement::ptr source, int value) {})
                        )

                    )

                )
                | add_child(
                    NBoxElement::create() | width(10) | height(10)
                    | title("Box 3")
                    | color(border2Color)
                    | width(12) | height(4)
                    //| add_child(NTextElement::create("Box 1"))
                )

            )
            | add_child(
                NHorizontalStackElement::create()
                | column_gap(1)
                | alignment(NAlignment::End)
                | add_child(
                    NButtonElement::create("OK")
                    //| is_default()
                    | width(10)
                    | on_clicked([](NMouseButton button, NClickedEventArgs& args) {
                        args.handled = true;
                        args.window->close();
                        })
                )
            )
        );
    if (!parentWindow)
    {
        window->run();
    }


}

