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
import DocsPage from '../DocsPage';
import M from '../M';
import Name from '../Name';



function InstallingNWindows() {
    return (
        <DocsPage route="/installing">
            <div>
                <h1>2.0 - Installing NWindows</h1>
                <h2>Prerequisites</h2>
                <p>
                    <Name>NWindows</Name> requires the following development libraries to be installed.
                </p>
                <p>
                    <ul>
                        <li>ncursesw development headers and libraries.</li>
                        <li>Optionally, <M>xclip</M></li>. NWindows uses <M>xclip</M> to copy and paste text to and from the Linux clipboard.
                        <li>Headers and binaries for the ICU unicode libraries.</li>
                    </ul>
                </p>
                <p>On Debian-based systems (including Ubuntu), you can install the dependencies using the following commands:</p>
                <Code text={
                    `sudo apt install libncursesw5-dev xclip libicu-dev
`               }
                />
                <h2>Linking with NWindows</h2>
                <p>
                    To incorporate NWindows in your project, you have two alternatives: you can either install NWindows as a github submodule in
                    your project and use CMake to build NWindows, and configure your project to use NWindows headers and libraries; or you can build and install
                    the NWindows project, which will add NWindows headers into the <M>/usr/local/include</M> directory, and add the
                    <M>libnwindows.a</M> static library to <M>/usr/local/lib</M>.
                </p>
                <p>
                    Because NWindows is a C++ library, you will ned to statically link with <M>libnwindows.a</M>. Compile-time
                    C++ APIs should remain fairly stable; but any extension to NWindows would break a <M>libnwindows.so</M> shared library.</p>
                <p>
                    To add NWindows as a git submodule of your own project, follow this procedure:
                </p>
                <ul>
                    <li>
                        First create your own Github (or git) project.
                    </li>
                    <li>
                        Change to the root directory of your project.
                    </li>
                    <li>
                        Issue the following command to install NWindows as a submodule of your project:
                        <Code style={{ marginTop: 16,marginBottom: 16 }} text={
                            `git submodule add https:://github.com/rerdavies/nwindows.git`
                        }
                        />
                    </li>
                    <li>If you are using a <M>CMake</M> build system, you can neatly incorporate NWindows into your project by adding the following
                        line to the <M>CMakeList.txt</M> file in the root of your project, before you include your own build steps:
                        <Code style={{ marginTop: 16, marginBottom: 16 }} text={
                            `add(nwindows)`
                        }
                        />
                        Then, in the <M>CMakeList.txt</M> for your project sources, add the following lines.
                        The <M>target_link_libraries</M> statement adds all necessary  compiler flags, include
                        directories, and linker commands to your project compile commands in a single step.

                        <Code style={{ marginTop: 16, marginBottom: 16 }} text={
                            `project(your_project your_files.cpp)
        
target_link_libraries(your_project PRIVATE nwindows)

`
                        } />
                    </li>
                </ul>

                <p>To, instead, build and install NWindows as a development component, follow these steps:</p>
                <ul>
                    <li>Clone the NWindows project from Github:
                        <Code style={{ marginTop: 16, marginBottom: 16 }} text={
                            `mkdir ~/src
cd ~/src     #or wherever you want to put the project
git clone https://github.com/rerdavies/nwindows.git`
                        } />
                    </li>
                    <li>Change to the root directory of cloned project and issue the following commands:
                        <Code style={{ marginTop: 16, marginBottom: 16 }} text={
                            `./configure.sh   # Configures the CMake build system
./build.sh       # Builds NWindows
./install.sh     # Installs NWindows in /usr/local/include and /usr/local/lib`
                        } />
                    </li>
                </ul>
            </div>

        </DocsPage>
    );
}

export default InstallingNWindows;
