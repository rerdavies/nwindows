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

import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import M from '../M';
import SectionHead from '../SectionHead';
import Code, { CodeFragment2 } from '../Code';
import CenteredImage from '../CenteredImage';



function InheritedCustomControl() {
    return (
        <DocsPage route="/using/custom/inherit">
            <h1>{DocsTitle("/using/custom/inherit")}</h1>
            <p>Stock NWindows elements are not designed to be hugely customizable. Nevertheless, they do provide some
                opportunities for customization.
            </p>
            <SectionHead text="HappyButton" />
            <p>
                Here's a trivial (and rather silly) example, but it shows an approach that has general applicability. Since 
                NWindows doesn't provide style-sheets, you could use trivial overrides like this to set properties to values 
                on input elements in a consistent way if you  find yourself setting the same properties over and over again.
            </p>
            <Code showLines text={`class HappyButtonElement : public NButtonElement { 
private:
    HappyButtonElement(
        const std::std::string& label, 
        int width) 
    : super(label,width) {
        prefix("[ 😀 ");  // set the starting text of the button.
        label_alignment(NAlign::Start);
    }

public:
    using self = HappyButtonElement;
    using super = NButtonElement;
    using ptr = std::shared_ptr<HappyButton>;

    static ptr create(
        const std::string& label, 
        int width=AUTO_SIZE) 
    {
        // we can't use std::make_shared_ptr because the constructor is private.
        return std::shared_ptr<self>(new self(label,width)); 
    }
};
`} />
            <p>Calling <M>HappyButtonElement::Create("OK!",14)</M> would produce a button that displays as </p>
            <CodeFragment2 text=" [ 😀 OK!     ] " />


            <SectionHead text="ContextEditElement" />
            <p>A more ambitious example might be a class that implements a Text Edit field with a context menu.</p>
            <Code showLines text={`#include <NWindows/NWindows.hpp>

using namespace nwindows;

class ContextEditElement : public NTextEditElement {
private:
    ContextEditElement(
        const std::vector<NMenuItem>& context_menu_items,
        const std::string& text)
        : super(text)
        , context_menu_items_(context_menu_items)
    {
    }
public:
    using self = ContextEditElement;
    using super = NTextEditElement;
    using ptr = std::shared_ptr<self>;

    static ptr create(
        const std::vector<NMenuItem>& context_menu_items,
        const std::string& text = ""
    ) {
        return std::shared_ptr<self>(new self(context_menu_items, text));
    }

    NEvent<void(NElement::ptr source, int item_id)> on_context_menu_item_selected;
protected:
    // Translate ctrl+space to a button click.
    virtual bool handle_key(NKeyEventArgs& event_args) override
    {
        if (event_args.key == L'\0') // ctrl+space!
        {
            simulate_keyboard_click(this, 2);
            event_args.handled = true;
            return true;
        }
        return super::handle_key(event_args);
    }

    // Show the context menu on right click.
    virtual bool handle_clicked(int button, NClickedEventArgs& event_args)
    {
        if (button == 2) // Right click!
        {
            NRect anchor;
            if (event_args.is_mouse_click)
            {
                // event_args.location is in windows coordinates.
                // NPoppMenuWindow expects the anchor to be in screen coordinates.
                anchor = window_to_screen(event_args.location);
            }
            else
            {
                // Display the context menu at the display cursor position.
                // This time we need to convert from element coordinates
                // to screen coordinates.
                anchor = element_to_screen(
                    NRect(this->cursor_position(), 0, 0, 0)
                );
            }
            show_context_menu(event_args.window, anchor);
            return event_args.handled = true;
        }
        return super::handle_clicked(button, event_args);
    }
protected:
    void handle__context_menu_item_selected(int item_id)
    {
        on_context_menu_item_selected.fire(
            this->shared_from_this(), 
            item_id);
    }

private:
    void show_context_menu(NWindow::ptr window, const NRect& anchor) {
        auto popup_window = NPopupMenuWindow::create(
            window,
            context_menu_items_,
            anchor,
            NAttachment::ContextMenu
        );
        // relay the popup window event to our own event.
        popup_window->on_item_selected.subscribe(
            [this](NElement::ptr source, int item_id)
            {
                this->handle__context_menu_item_selected(item_id);
            }
        );

    }
    std::vector<NMenuItem> context_menu_items_;

};
`} />
        <p>Calling </p>
        <Code text={`ContextEditElement::Create(
{
    NMenuItem("Cut",1),
    NMenuItem("Copy",2),
    NMenuItem("Paste",3)}
    NMenuItem("Select All",3)}
});`}/>
        <p>would produce a text edit field with a context menu.</p> 
        <CenteredImage src="/nwindows/image/sample_ContextEditElement.png" alt="ContextEditElement example" />
        <p>You can find a working version of this code, along with the code that 
            produced the screenshot above, in the <M>examples/ContextEditElement</M> directory 
            of the NWindows source code. (Yes, the menu items actually work.)
        </p>

        </DocsPage>
    );
}


export default InheritedCustomControl;
