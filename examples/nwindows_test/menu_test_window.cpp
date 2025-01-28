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


void menu_test_window(NWindow::ptr parentWindow /* = nullptr */)
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
                                NSS("Item selected: " << item_id)
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
                                NSS("Item selected:" << item_id)
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

