#### NWindows TUI Library
[![Build Status](https://github.com/reravies/nwindows.svg?branch=master)](https://github.com/rerdavies/nwindows)    [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)    [![Documentation](https://img.shields.io/badge/documentation-Doxygen-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-User%20Guide-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Developer%20Guide-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Examples-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Reference-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-FAQ-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Installation-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Configuration-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Dependencies-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Design-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Testing-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Performance-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Porting-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Contributing-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Authors-blue)](https://reravies.github.io/nwindows/)    [![Documentation](https://img.shields.io/badge/documentation-Release%20Notes-blue)](https://rerav

The *NWindows* library is a C++ text user interface (TUI) library for building console applications on Linux.
The library uses elements to compose user interfaces using an innovative and concise manipulator system. The library provides a rich set of elements with which to build user interfaces.

Built on top of the *ncursesw* library, *NWindows* works on both xterm and raw linux terminal windows, and also works over ssh.

<img src="docs image/screenshot.png" alt="screenshot" style="width: 80%, max-width: max-width: 600, margin-left: 16px/>

Here is a simple example of a <span className="name">NWindows</span> application that demonstrates the use of NWindow's manipulator syntax to create users interfaces. The program creates a window with a button that closes the window when clicked:
        
```
#include "NWindows/NWindows.hpp"

using namespace nwindows;

int main(void) {
    NWindow::ptr window = NWindow::create(AUTO_SIZE, AUTO_SIZE);

    window
        | title("Hello")
        | add_child(
            NButtonElement::create("Hello world!")
            | margin({ 2,1,2,1 })
            | on_click([window](int button, NClickedEventArgs& event)
                {
                    event.handled = true;
                    event.window->close();
                }
            )
        );
    window->run();
}
```

which display the following output when executed.

<img src="docs/image/hello_world.png" alt="hello world" style="maxWidth: 100%, marginLeft: 24" />

See the <Link to="/documentation">documentation</Link> for instructions on installing, and using 
*NWindows*.
