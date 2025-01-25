// slightly longer code sample on website.
#include "NWindows/NWindows.hpp"

using namespace nwindows;

int main(void) {
    NWindow::ptr window = NWindow::create(22, AUTO_SIZE);

    auto text_color = window->make_color_pair(0x00FF00,0x000000);

    window
        | title("Hello")
        | add_child(
            NVerticalStackElement::create()
            | margin({ 2,1,2,1 })
            | row_gap(1)
            | add_child(
                NTextElement::create("Hello world!")
                | color(text_color)
            )
            | add_child(
                NHorizontalStackElement::create()
                | alignment(NAlignment::End)
                | add_child(
                    NButtonElement::create("OK")
                    | width(10)
                    | on_clicked([](NMouseButton button, NClickedEventArgs& event)
                        {
                            event.handled = true;
                            event.window->close();
                        }
                    )
                )   
            )
        );
    window->run();
}