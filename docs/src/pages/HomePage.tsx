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


import Code from '../Code';
import { Link } from 'react-router-dom';
import PageColumn from '../PageColumn';
import Banner from '../Banner';
import CenteredImage from '../CenteredImage';
import { ApiLink,LinkType } from '../ClassDescription';

function HomePage() {

    return (
        <PageColumn>
            <div>
                <Banner subtitle="TUI Library"/>
                <p>INITIAL DEPLOYMENT IN PROGRESS. NOT YET READY FOR USE!!!</p>
                <p>
                    The <span className="name">NWindows</span> library is a C++ text user interface (TUI) library for building console applications.
                    The library uses elements to compose user interfaces using an innovative and concise manipulator system. The library provides a
                    rich set of elements with which to build user interfaces.
                </p>
                <p>
                    Built on top of the <span className="mono">ncursesw</span> library, <span className="name">NWindows</span> works on both xterm and raw linux terminal windows, and also works over ssh.
                </p>

                <CenteredImage src="/nwindows/image/screenshot.png" alt="screenshot" width="80%" maxWidth="600px" 
                         />

                <p>Here is a simple example of a <span className="name">NWindows</span> application that demonstrates the use of manipulators to
                    create users interfaces. The program creates a window
                    with a button that closes the window when clicked:</p>
                {true &&
                    <Code text=
                        {

                            `
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
`} />}

                <p>which displays the following output when executed.</p>
                <CenteredImage src="/nwindows/image/hello_world.png" alt="hello world" 
                   />
                <p>See the <Link to="/documentation">documentation</Link> for instructions on installing, and using <span className="name">NWindows</span>.</p>

                <ApiLink linkType={LinkType.Struct} name="NMouseEventArgs">NMouseEventArgs</ApiLink>
            </div>
        </PageColumn>
    )
}

export default HomePage
