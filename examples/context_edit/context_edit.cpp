#include <NWindows/NWindows.hpp>

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
            simulate_keyboard_click(this, NMouseButton::Right);
            event_args.handled = true;
            return true;
        }
        return super::handle_key(event_args);
    }

    // Show the context menu on right click.
    virtual bool handle_clicked(NMouseButton button, NClickedEventArgs& event_args) override
    {
        if (button == NMouseButton::Right) // Right click!
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

// Provide a manipulator that subscribes to the on_context_menu_item_selected event.
class on_context_menu_item_selected : public NElementManipulator {
public:
    using CallbackT = void(NElement::ptr source, int selected_id);
    on_context_menu_item_selected(
        std::function<CallbackT>&&
        function
    )
        : function_(std::move(function))
    {
    }
    template<typename T>
    std::shared_ptr<T> apply(std::shared_ptr<T> element) const {
        element->on_context_menu_item_selected.subscribe(this->function_);
        return element;
    }
private:
    std::function<CallbackT> function_;
};

int main(void)
{
 
    auto window = NWindow::create(AUTO_SIZE, AUTO_SIZE)
        | add_child(
            NVerticalStackElement::create()
            | alignment(NAlignment::Justify)
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | add_child(
                NTextElement::create("Right click on the text box or press Ctrl+space to show the context menu.")
                | width(25)
                | wrap_text()
            )
            | add_child(
                NHorizontalStackElement::create()
                | add_child(
                    NTextElement::create("Address: ")
                )
                | add_child(
                    ContextEditElement::create(
                        {
                            NMenuItem{"Cut",1},
                            NMenuItem{"Copy",2},
                            NMenuItem{"Paste",3},
                            NMenuItem{"Select All",4}
                        }
                    )
                    | width(15)
                    | on_context_menu_item_selected(
                        [](NElement::ptr source, int item_id)
                        {
                            auto this_ = std::dynamic_pointer_cast<ContextEditElement>(source);

                            switch (item_id)
                            {
                            case 1: // Cut
                                this_->cut();
                                break;
                            case 2: // Copy
                                this_->copy();
                                break;
                            case 3: // Paste
                                this_->paste();
                                break;
                            case 4: // Select All
                                this_->select_all();
                                break;
                            }
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
                    | on_clicked(
                        [](NMouseButton button, NClickedEventArgs& event_args)
                        {
                            if (button == NMouseButton::Left)
                            {
                                event_args.window->close();
                                event_args.handled = true;
                            }
                        }
                    )
                )
            )
        );

    window->run();
}