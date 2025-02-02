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



#include <curses.h>
#include <locale>
#include "Finally.hpp"
#include <string>
#include <NWindows/nss.hpp>
#include <NWindows/NUtf8.hpp>
#include <iostream>

#include "NWindows/NWindows.hpp"

#include "tests.hpp"


using namespace nwindows;




void test_window()
{

    NColorPalette palette;
    palette.DesktopBackground = 0x600060;

    NWindow::ptr window = NWindow::create(60, AUTO_SIZE, &palette);


    window
        | title("NWindows Test")
        | add_child(
            NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | add_child(
                NTextElement::create("Tests")
            )
            | add_child(
                NHorizontalStackElement::create()
                | margin({ 4, 0, 0, 0 })
                | column_gap(3)
                | add_child(NVerticalStackElement::create()
                    | add_child(

                        NButtonElement::create("_Rendering")
                        | label_alignment(NAlignment::Start)
                        | width(24)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            rendering_test_window(windowRef.lock());
                            })
                    )
                    | add_child(

                        NButtonElement::create("_EditText Test")
                        | label_alignment(NAlignment::Start)
                        | width(24)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            edit_text_test_window(windowRef.lock());
                            })
                    )
                    | add_child(

                        NButtonElement::create("_Unicode Test")
                        | label_alignment(NAlignment::Start)
                        | width(24)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            unicode_test_window(windowRef.lock());
                            })
                    )
                    | add_child(

                        NButtonElement::create("ASCII Fallback Test")
                        | label_alignment(NAlignment::Start)
                        | width(24)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            ascii_fallback_test_window(windowRef.lock());
                            })
                    )
                )
                | add_child(NVerticalStackElement::create()
                    | add_child(

                        NButtonElement::create("_Menu Test")
                        | label_alignment(NAlignment::Start)
                        | width(24)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            menu_test_window(windowRef.lock());
                            })
                    )
                    | add_child(

                        NButtonElement::create("_Box Test")
                        | label_alignment(NAlignment::Start)
                        | width(24)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            box_test_window(windowRef.lock());
                            })
                    )
                    | add_child(

                        NButtonElement::create("Error Handling")
                        | label_alignment(NAlignment::Start)
                        | width(24)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            error_test_window(windowRef.lock());
                            })
                    )
                    | add_child(

                        NButtonElement::create("Console Font Test")
                        | label_alignment(NAlignment::Start)
                        | width(24)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            console_font_test_window(windowRef.lock());
                            })
                    )

                )
            )
            | add_child(
                NHorizontalStackElement::create()
                | column_gap(1)
                | alignment(NAlignment::End)
                | add_child(
                    NButtonElement::create("OK")
                    //| is_default()
                    | width(15)
                    | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) {
                        args.handled = true;
                        windowRef.lock()->close();
                        })

                )
            )
        )
        ;

    window->run();
}

int main(void)
{
    test_window();

#if DEBUG_NELEMENT_LIFECYCLE
    // Make sure that all elements have been deleted.
    if (NElement::allocated_element_count() != 0)
    {
        std::cerr << "Allocated NElements: " << NElement::allocated_element_count() << std::endl;
        throw std::runtime_error(NSS(NElement::allocated_element_count() << " Nelements not deleted."));
    }
#endif

    return EXIT_SUCCESS;
}
