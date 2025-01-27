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
import { DocsTitle } from '../DocsNav';
import DocsPage from '../DocsPage';
import M from '../M';
import Name from '../Name';
import SectionHead from '../SectionHead';



function InstallingNWindows() {
    let route = "/installing";
    return (
        <DocsPage route={route}>
            <div>
                <h1>{DocsTitle(route)}</h1> <h2>Prerequisites</h2> 
                <p>NWindows requires the following development tools to be installed.</p>
                <ul>
                    <li>A reasonably modern compiler with support for C++20.</li>
                    <li>CMake</li>
                    <li>nodejs, and npm (required if you plan to build the documentation).</li>
                </ul>
                <p>On Debian-based systems (including Ubuntu), you can install the required development tools using the following command:</p>
                <Code text={`sudo apt install g++ cmake nodejs npm`} />
                <p>
                    <Name>NWindows</Name> requires the following
                    development libraries to be installed. </p> 
                    <ul> <li>ncursesw development headers and
                        libraries.</li>
                        <li>Optionally, <M>xclip</M>.
                            NWindows uses the <M>xclip</M> program to copy
                            and paste text to and from the Linux clipboard.
                            If not installed, clipboard operations will work,
                            but will not be able to copy and paste text to
                            and from other applications. </li>
                        <li>Headers
                            and binaries for the ICU unicode libraries.</li>
                    </ul>
                <p>On Debian-based systems (including
                    Ubuntu), you can install the dependencies using
                    the following commands:</p>
                <Code text={`sudo apt install libncursesw5-dev xclip libicu-dev`} />

                <p>Although you do not need to use Visual Studio Code, NWindows was developed using Visual Studio Code. 
                    VS Code integrates particularly well with NWindow's CMake build system. Install the following extension in 
                    Visual Studio Code to get the best experience:
                </p>
                <ul>
                    <li>
                        C++ Extension Pack (by Microsoft) - This extension pack also includes the CMake and CMake Tools extensions.
                    </li>
                </ul>

                <SectionHead text="Using NWindows as a git Submodule" />
                <p>
                    To incorporate NWindows in your project, you have two alternatives: you can either install NWindows as a github 
                    submodule in your project and use CMake to build NWindows, and configure your project to use NWindows headers and libraries; or you can build and install
                    the NWindows project, which will add NWindows headers into the <M>/usr/local/include</M> directory, and add the
                    <M>libnwindows.a</M> static library to <M>/usr/local/lib</M>.
                </p>
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
                        <Code style={{ marginTop: 16, marginBottom: 16 }} text={
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
                            `cmake_minimum_required(VERSION 3.16.0)

set(CMAKE_CXX_STANDARD 20)

add_executable(hello_world
    hello_world.cpp
)

target_link_libraries(
    hello_world PRIVATE
    nwindows
)`
                        } />
                    </li>
                </ul>
                <SectionHead text="Building and Installing NWindows" />
                <p>If you are not using git, you can, instead, build the NWindows project and install it. Doing so 
                    will copy NWindows headers into the <M>/usr/local/include/NWindows</M> directory, and the <M>libnwindows.a</M> static 
                    library into <M>/usr/local/lib</M>. NWindows does not provide a dynamic library, because versioning 
                    C++ library .so files is not practical or sustainable.</p>
                <ul>
                    <li>Clone the NWindows project from Github:
                        <Code style={{ marginTop: 16, marginBottom: 16 }} text={
                            `mkdir ~/src
cd ~/src     #or wherever you want to put the project
git clone https://github.com/rerdavies/nwindows.git`
                        } />
                    </li>
                    <li>Make sure you have installed the pre-requisite packages listed above.</li>
                    <li>Change to the root directory of cloned project and issue the following commands:
                        <Code style={{ marginTop: 16, marginBottom: 16 }} text={
                            `./configure.sh   # Configures the CMake build system
./build.sh       # Builds NWindows
./install.sh     # Installs NWindows in /usr/local/include and /usr/local/lib`
                        } />
                    </li>
                </ul>
                <SectionHead text="Building the Documentation" />
                <p>
                    NWindows uses Typescript, React, and Vite to build its documentation set. The documentation is built in the <M>docs</M> directory of the NWindows
                    project. The documentation build procedure is run when performing release builds, but not during debug builds.
                </p>
                <p>To build the documentation manually, follow these steps:</p>
                <Code text={`cd docs
./build.sh`} />
                <p>To debug the documentation, and run a development web server, </p>
                <Code text={`cd docs
./debug.sh`} />
                <p>You will want to install React developer tools in your browser. Debug the documentation using Chrome developer tools within the browser.</p>
                <p>If you are using CMake, and building NWindows as a submodule, you can disable the documentation build by setting the <M>NWINDOWS_BUILD_DOCUMENTATION</M> variable to <M>OFF</M> in your top-level <M>CMakeLists.txt</M> file.</p>
                <Code text={`set(NWINDOWS_BUILD_DOCUMENTATION OFF)`} />
            </div>


        </DocsPage>
    );
}

export default InstallingNWindows;
