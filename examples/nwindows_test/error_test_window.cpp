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

void error_test_window(NWindow::ptr parentWindow /*= nullptr*/) {
    NWindow::ptr window = NWindow::create(parentWindow, AUTO_SIZE, AUTO_SIZE);
    NTextElement::ptr keyIndicator;

    window
        | title("Error Handling")
        | add_child(
            NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | add_child(
                NTextElement::create("This window is used to test error handling.")
            )
            | add_child(
                NButtonElement::create("Throw Error")
                | width(20)
                | on_clicked([](NMouseButton button, NClickedEventArgs& args) {
                    args.handled = true;
                    throw std::runtime_error("This is a test of exception handling.");
                    })
            )
            | add_child(
                NButtonElement::create("Fatal Error Message")
                | width(20)
                | on_clicked([](NMouseButton button, NClickedEventArgs& args) {
                    args.handled = true;
                    args.window->fatal_error("Fatal Error: This is a test of a fatal error message.");
                    })
            )


            | add_child(
                NHorizontalStackElement::create()
                | alignment(NAlignment::End)
                | column_gap(1)
                | add_child(
                    NButtonElement::create("OK")
                    | width(10)
                    | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) {
                        args.handled = true;
                        windowRef.lock()->close();
                        })
                )
            )
        );

    if (!parentWindow)
    {
        window->run();
    }
}

