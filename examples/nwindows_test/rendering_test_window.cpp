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

#ifndef DISPLAY_MOUSE_AND_KEYBOARD
#define DISPLAY_MOUSE_AND_KEYBOARD 1
#endif


static uint32_t blend(uint32_t color0, uint32_t color1, int i)
{
    int r0 = (color0 >> 16) & 0xFF;
    int g0 = (color0 >> 8) & 0xFF;
    int b0 = color0 & 0xFF;

    int r1 = (color1 >> 16) & 0xFF;
    int g1 = (color1 >> 8) & 0xFF;
    int b1 = color1 & 0xFF;

    int r = r0 + (r1 - r0) * i / 255;
    int g = g0 + (g1 - g0) * i / 255;
    int b = b0 + (b1 - b0) * i / 255;

    return (r << 16) | (g << 8) | b;
}

void dialog_test_window(NWindow::ptr window) {
    NWindow::ptr dialog = NWindow::create(window, 55, AUTO_SIZE) | title("Test Dialog");
    std::weak_ptr<NWindow> dlgRef = dialog;
    NColorPair textColor = dialog->make_color_pair(0x8080A0, 0x202020);
    dialog | add_child(
        NVerticalStackElement::create()
        | margin({ 2,0,2,0 })
        | row_gap(1)
        | add_child(
            NTextElement::create("Remember not only to say the right thing in the right place, but far more difficult still, to leave unsaid the wrong thing at the tempting moment.\n\n"
                "-- Benjamin Franklin (1706 - 1790)")
            | color(textColor)
            | wrap_text()
        )
        | add_child(
            NHorizontalStackElement::create()
            | alignment(NAlignment::End)
            | add_child(
                NButtonElement::create("Cancel")
                | width(10)
                | is_cancel()
                | on_clicked(
                    [dlgRef](NMouseButton button, NClickedEventArgs& event_args) mutable {
                        if (button == NMouseButton::Left)
                        {
                            event_args.handled = true;
                            dlgRef.lock()->close();
                        }
                    }
                )
            )
            | add_child(
                NButtonElement::create("OK")
                | is_default()
                | width(10)
                | on_clicked(
                    [dlgRef](NMouseButton button, NClickedEventArgs& event_args) mutable {
                        if (button == NMouseButton::Left)
                        {
                            event_args.handled = true;
                            dlgRef.lock()->close();
                        }
                    }
                )
            )
        )

    );
}


void rendering_test_window(NWindow::ptr parent_window)
{
    std::weak_ptr<NWindow> wp;

    {
        NWindow::ptr window = NWindow::create(parent_window, 75, AUTO_SIZE);

        wp = window;

        auto palette = window->color_palette();

        auto errorColor = window->make_color_pair(palette.Error, palette.Black);

        auto hoverColor = window->make_color_pair(palette.HoverForeground, palette.HoverBackground);
        auto focusColor = window->make_color_pair(palette.FocusForeground, palette.FocusBackground);
        auto selectColor = window->make_color_pair(palette.SelectedForeground, palette.SelectedBackground);


        window->title("Rendering Test");

        NTextElement::ptr keyIndicator;

        auto verticalStack =
            NVerticalStackElement::create()
            | margin({ 4, 1, 4, 1 })
            | row_gap(1);
        {
            {
                auto horizontalStack = NHorizontalStackElement::create();
                horizontalStack->column_gap(1);
                horizontalStack->add_child(
                    NTextElement::create("Attributes:", NAttribute::Normal));

                horizontalStack->add_child(
                    NTextElement::create("Normal", NAttribute::Normal));
                horizontalStack->add_child(
                    NTextElement::create("Underline", NAttribute::Underline));
                // horizontalStack->add_child(
                //     NTextElement::create("Invisible", NAttribute::Invisible));
                horizontalStack->add_child(
                    NTextElement::create("Protect", NAttribute::Protect));

                horizontalStack->add_child(
                    NTextElement::create("Dim", NAttribute::Dim));
                horizontalStack->add_child(
                    NTextElement::create("Bold", NAttribute::Bold));
                horizontalStack->add_child(
                    NTextElement::create("Reverse", NAttribute::Reverse));
                horizontalStack->add_child(
                    NTextElement::create("Standout", NAttribute::Standout));

                verticalStack->add_child(horizontalStack);
            }
            {
                auto horizontalStack = NHorizontalStackElement::create();
                horizontalStack->column_gap(1);

                horizontalStack->add_child(
                    NTextElement::create("Colors:"));

                horizontalStack->add_child(
                    NTextElement::create("Normal"));

                {
                    NTextElement::ptr el = NTextElement::create("Error");
                    el->color(errorColor);
                    horizontalStack->add_child(el);
                }
                {
                    NTextElement::ptr el = NTextElement::create("Hover");
                    el->color(hoverColor);
                    horizontalStack->add_child(el);
                }
                {
                    NTextElement::ptr el = NTextElement::create("Focus");
                    el->color(focusColor);
                    horizontalStack->add_child(el);
                }
                {
                    NTextElement::ptr el = NTextElement::create("Select");
                    el->color(selectColor);
                    horizontalStack->add_child(el);
                }
                horizontalStack->add_child(
                    NTextElement::create(std::format("{} colors, {} pairs ", COLORS, COLOR_PAIRS)));


                verticalStack->add_child(horizontalStack);
            }
            if (COLORS > 128)
            {
                auto horizontalStack = NHorizontalStackElement::create()
                    | alignment(NAlignment::Center);
                uint32_t color0 = 0xC04000;
                uint32_t color1 = 0x0040FF;

                for (int i = 0; i < 32; ++i)
                {
                    auto el = NTextElement::create(" ");
                    int shade = i * 255 / 31;
                    uint32_t iColor = blend(color0, color1, shade);
                    NColor color = window->make_color(iColor);
                    auto pp = window->make_color_pair(NColor::White, color);
                    el->color(pp);
                    horizontalStack->add_child(el);
                }
                verticalStack->add_child(horizontalStack);
            }
#if DISPLAY_MOUSE_AND_KEYBOARD // useful for debugging key and mouse events.
            {
                auto horizontalStack = NHorizontalStackElement::create();
                horizontalStack->column_gap(1);
                verticalStack->add_child(horizontalStack);

                keyIndicator = NTextElement::create("-", NAttribute::Normal);
                keyIndicator->width(18);
                horizontalStack->add_child(
                    keyIndicator);


                horizontalStack->add_child(
                    NTextElement::create("Mouse:", NAttribute::Normal));

                auto mouseElement = NTextElement::create("-", NAttribute::Normal);
                mouseElement->width(8);
                horizontalStack->add_child(mouseElement);

                window->on_mouse_move.subscribe([mouseElement](NMouseEventArgs& args) mutable
                    { mouseElement->text(
                        std::format("{},{}", args.cursor_position.x, args.cursor_position.y)); });
            }
#endif
            {
                auto container = NHorizontalStackElement::create()
                    | column_gap(1);

                container->add_child(
                    NCheckboxElement::create("_Enabled") | width(15) | checked(true)
                    | on_checked_changed([](NCheckboxElement::ptr source, bool checked) {
                        // do something.
                        })
                );

                container->add_child(
                    NRadioGroupElement::create(NOrientation::Horizontal, { "_Novels", "N_on-fiction" }, 0) | margin({ 2,0,0,0 })
                );
                container->add_child(
                    NRadioGroupElement::create(NOrientation::Vertical, { "_Major", "M_inor" }, 0) | width(20) | margin({ 2,0,0,0 })
                );
                verticalStack->add_child(container);
            }
            {
                verticalStack->add_child(
                    NHorizontalStackElement::create()
                    | add_child(
                        NTextElement::create("User name: ")
                    )
                    | add_child(
                        NTextEditElement::create("Robin Davies")
                        | on_text_changed([](NTextEditElement::ptr source, const std::string& text) {
                            // do something.
                            })
                        | on_selection_changed([](NTextEditElement::ptr source, const NTextSelection& selection) {
                            // do something.
                            })
                        | width(15)
                    )
                    | add_child(
                        NTextElement::create("   Fruit: ")
                    )
                    | add_child(
                        NDropdownElement::create(
                            {
                                NMenuItem("A_pple",0),
                                NMenuItem("_Oatmeal",1),
                                NMenuItem("O_range",2),
                                NMenuItem("Rai_sin",3),
                                NMenuItem::Divider(),
                                NMenuItem("_Åkerö",4),
                            },
                            0
                            )
                        | on_selection_changed([](NDropdownElement::ptr source, int selection) {
                            // do something.
                            })
                    )

                );
            }
        }
        {
            auto container = NHorizontalStackElement::create()
                | column_gap(1)
                | alignment(NAlignment::End);


            auto disabledButton = NButtonElement::create("Apply")
                | width(10)
                | disabled(true)
                ;
            container->add_child(disabledButton);
            auto dialogButton = NButtonElement::create("Test Dialog");
            container->add_child(dialogButton);

            container->add_child(NButtonElement::create("OK")
                | width(10)
                | on_clicked([windowRef = window->weak_ptr()](
                    NMouseButton button,
                    NClickedEventArgs& args) {
                        if (button == NMouseButton::Left)
                        {
                            args.handled = true;
                            auto window = windowRef.lock();
                            if (!window) return;
                            window->close();
                        }
                    }
                )
            );

            std::weak_ptr<NWindow> windowRef = window;
            dialogButton->on_clicked.subscribe(
                [windowRef](NMouseButton button, NClickedEventArgs& args)
                {
                    if (button == NMouseButton::Left)
                    {
                        args.handled = true;
                        dialog_test_window(windowRef.lock());
                    }
                });
            verticalStack->add_child(container);
        }

        window->add_child(verticalStack);

#if DISPLAY_MOUSE_AND_KEYBOARD
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
#endif

        if (!parent_window) {
            window->run();
        }
    }
}
