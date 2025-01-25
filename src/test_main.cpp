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
#include <format>
#include "NWindows/NUtf8.hpp"
#include <iostream>

#include "NWindows/NWindows.hpp"

#ifndef DISPLAY_MOUSE_AND_KEYBOARD
#define DISPLAY_MOUSE_AND_KEYBOARD 1
#endif

using namespace nwindows;


void Dialog(NWindow::ptr window) {
    NWindow::ptr dialog = NWindow::create(window, 55, AUTO_SIZE) | title("_Test Dialog");
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
                        event_args.handled = true;
                        dlgRef.lock()->close();
                    }
                )
            )
        )

    );
}

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


        window->title("Hello world!");

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
                horizontalStack->add_child(
                    NTextElement::create("Invisible", NAttribute::Invisible));
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
                        auto window = windowRef.lock();
                        if (!window) return;
                        window->close();
                    }
                )
            );

            std::weak_ptr<NWindow> windowRef = window;
            dialogButton->on_clicked.subscribe(
                [windowRef](NMouseButton button, NClickedEventArgs& args)
                {
                    Dialog(windowRef.lock());
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

static void box_test_window(NWindow::ptr parentWindow = nullptr)
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
static void menu_test_window(NWindow::ptr parentWindow = nullptr)
{
    NWindow::ptr window = NWindow::create(parentWindow, 66, AUTO_SIZE);
    NTextElement::ptr keyIndicator;

    window
        | title("Menu")
        | add_child(
            NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | add_child(NHorizontalStackElement::create()
                | column_gap(1)
                | add_child(
                    NMenuElement::create(
                        "_File",
                        {
                            NMenuItem("New", 1),
                            NMenuItem("Open", 2),
                            NMenuItem("Save", 3),
                            NMenuItem("Save As", 4),
                            NMenuItem::Divider(),
                            NMenuItem("Recent",
                                {
                                NMenuItem("Files",
                                    {
                                        NMenuItem("File 1", 5),
                                        NMenuItem("File 2", 6),
                                        NMenuItem("File 3", 7)
                                    }
                                ),
                                NMenuItem("Projects",
                                    {
                                        NMenuItem("Project 1", 8),
                                        NMenuItem("Project 2", 9),
                                        NMenuItem("Project 3", 10)
                                    }
                                )

                                }
                            ),
                            NMenuItem::Divider(),
                            NMenuItem("Exit", 11),
                        }
                    )
                    | on_closed([](NMenuElement::ptr) {})
                    | on_opening([](NMenuElement::ptr) {})
                    | on_item_selected([](NMenuElement::ptr source, int item_id)
                        {
                            NMessageWindow::create(
                                source->window()->shared_from_this<NWindow>(),
                                NMessageType::Info,
                                "Menu Test",
                                std::format("Item selected: {}", item_id)
                            );
                        })

                )
                | add_child(
                    NMenuElement::create(
                        "_Edit",
                        {
                            NMenuItem("✂","_Cut", 20),
                            NMenuItem("⿻","C_opy", 21),
                            NMenuItem("\U0001F4CB\uFE0E","_Paste", 22),
                            NMenuItem::Divider(),
                            NMenuItem("Delete", 23),
                            NMenuItem::Divider(),
                            NMenuItem(true,"Disable", 23,false),
                        }
                        )
                    | on_item_selected([](NMenuElement::ptr source, int item_id)
                        {
                            NMessageWindow::create(
                                source->window()->shared_from_this<NWindow>(),
                                NMessageType::Info,
                                "Menu Test",
                                std::format("Item selected: {}", item_id)
                            );
                        })

                )
                | add_child(
                    NMenuElement::create(
                        "_Help",
                        {
                            NMenuItem("_Sponsor", 30),
                            NMenuItem("_About", 31),
                        }
                        )
                    | on_item_selected([](NMenuElement::ptr source, int item_id)
                        {
                            switch (item_id) {
                            case 30:
                                NMessageWindow::create(
                                    source->window()->shared_from_this<NWindow>(),
                                    NMessageType::Info,
                                    "NWindows",
                                    "NWindows is created by an independent developer who receives no funding except "
                                    "through sponsorships.\n\n"
                                    "Your support means more than you think."
                                );
                                break;
                            case 31:
                                NMessageWindow::create(
                                    source->window()->shared_from_this<NWindow>(),
                                    NMessageType::Info,
                                    "NWindows",
                                    NWINDOWS_VERSION_STRING()
                                );
                                break;

                                break;
                            }
                        })

                )


            )
            | add_child(
                NHorizontalStackElement::create()
                | column_gap(1)
                | add_child(
                    NDropdownElement::create(
                        {
                            NMenuItem("A_pple",0),
                            NMenuItem("_Oatmeal",1),
                            NMenuItem("O_range",2),
                            NMenuItem("Rai_sin",3),
                            NMenuItem("_Åkerö",4),
                        },
                        1
                        )
                    | request_initial_focus()
                    | on_opening([](NDropdownElement::ptr) {})
                    | on_closed([](NDropdownElement::ptr) {})
                    | on_selection_changed([](NDropdownElement::ptr source, int value) {})
                )
                | add_child(NTextElement::create("  Attachment: "))
                | add_child(
                    NDropdownElement::create(
                        std::vector<NMenuItem>{
        NMenuItem{ "BottomEnd", (int)NAttachment::BottomEnd }.display_checkmark(true),
    }
    , (int)NAttachment::BottomEnd)
                    | width(25)
                    | on_clicked(
                        [](NMouseButton button, NClickedEventArgs& args) {
                            if (button == NMouseButton::Left)
                            {
                                NDropdownElement::ptr dropdown = std::dynamic_pointer_cast<NDropdownElement>(args.target);
                                dropdown->menu_items(
                                    std::vector<NMenuItem>{
                                    NMenuItem{ "TopStart", (int)NAttachment::TopStart }.display_checkmark(dropdown->selected() == (int)NAttachment::TopStart),
                                        NMenuItem{ "TopEnd", (int)NAttachment::TopEnd }.display_checkmark(dropdown->selected() == (int)NAttachment::TopEnd),
                                        NMenuItem{ "BottomStart", (int)NAttachment::BottomStart }.display_checkmark(dropdown->selected() == (int)NAttachment::BottomStart),
                                        NMenuItem{ "BottomEnd", (int)NAttachment::BottomEnd }.display_checkmark(dropdown->selected() == (int)NAttachment::BottomEnd),
                                        NMenuItem{ "CenterOnAnchor", (int)NAttachment::CenterOnAnchor }.display_checkmark(dropdown->selected() == (int)NAttachment::CenterOnAnchor),
                                        NMenuItem{ "Submenu", (int)NAttachment::Submenu }.display_checkmark(dropdown->selected() == (int)NAttachment::Submenu),
                                        NMenuItem{ "ContextMenu", (int)NAttachment::ContextMenu }.display_checkmark(dropdown->selected() == (int)NAttachment::ContextMenu),
                                }
                                );
                            }
                        }
                    )
                    | on_selection_changed([](NElement::ptr source, int value) {
                        NDropdownElement::ptr dropdown = std::dynamic_pointer_cast<NDropdownElement>(source);
                        dropdown->dropdown_attachment((NAttachment)value);
                        }
                    )
                )
            )
            | add_child(
                NHorizontalStackElement::create()
                | alignment(NAlignment::End)
                | add_child(
                    NButtonElement::create("OK")
                    | width(10)
                    | on_clicked([w = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) {
                        args.handled = true;
                        w.lock()->close();
                        }
                    )
                )
            )
        );

    if (!parentWindow)
    {
        window->run();
    }
}

static void unicode_test_window(NWindow::ptr parentWindow = nullptr)
{
    NWindow::ptr window = NWindow::create(parentWindow, 66, AUTO_SIZE);
    NTextElement::ptr keyIndicator;

    std::string oGrave = u32string_to_utf8(U"o\u0300");
    auto boundsColor = window->make_color_pair(0xC0C0C0, 0x4040C0);
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

static void edit_text_test_window(NWindow::ptr parentWindow = nullptr)
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

void error_test_window(NWindow::ptr parentWindow = nullptr) {
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
                        | width(20)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            rendering_test_window(windowRef.lock());
                            })
                    )
                    | add_child(

                        NButtonElement::create("_EditText Test")
                        | label_alignment(NAlignment::Start)
                        | width(20)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            edit_text_test_window(windowRef.lock());
                            })
                    )
                    | add_child(

                        NButtonElement::create("_Unicode Test")
                        | label_alignment(NAlignment::Start)
                        | width(20)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            unicode_test_window(windowRef.lock());
                            })
                    )
                )
                | add_child(NVerticalStackElement::create()
                    | add_child(

                        NButtonElement::create("_Menu Test")
                        | label_alignment(NAlignment::Start)
                        | width(20)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            menu_test_window(windowRef.lock());
                            })
                    )
                    | add_child(

                        NButtonElement::create("_Box Test")
                        | label_alignment(NAlignment::Start)
                        | width(20)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            box_test_window(windowRef.lock());
                            })
                    )
                    | add_child(

                        NButtonElement::create("Error Handling")
                        | label_alignment(NAlignment::Start)
                        | width(20)
                        | on_clicked([windowRef = window->weak_ptr()](NMouseButton button, NClickedEventArgs& args) mutable {
                            args.handled = true;
                            error_test_window(windowRef.lock());
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
        throw std::runtime_error(std::format("{} Nelements not deleted.", NElement::allocated_element_count()));
    }
#endif

    return EXIT_SUCCESS;
}
