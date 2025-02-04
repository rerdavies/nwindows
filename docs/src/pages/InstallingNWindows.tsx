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
                <h1>{DocsTitle(route)}</h1> 
                <SectionHead text="Installing Pre-built Packages"/>
                <p>We recommend compiling NWindows rather than installing the pre-built packages. However, the NWindows project 
                    does provide pre-built packages for Debian-based Linux distributions, including Ubuntu. Packages are built on
                    Ubuntu 22.04, using GCC, and and amd64 and arm64 versions of the packages are provided. They should work on most recent Debian-based distributions. If you encounter problems, you will need to
                    build NWindows yourself. (It's a relatively painless build procedure).</p>
                <p>To install NWindows from a Debian package, go to  the <a href="https://github.com/rerdavies/nwindows/releases">NWindows Releases</a> web page, 
                    select the version you would like to install,
                    and click on the <b><i>Assets</i></b> dropdown to view available <b><i>.deb</i></b> packages. Select the package that 
                    is appropriate for your system, and download it.
                    </p>
                    <p>After downloading the package, install it using the following commands:</p>
                    <Code text={`cd ~/Downloads
sudo apt-get install ./yourpackagename`} />
                <p>The package name must be prefixed with './' to indicate that the package is in the current directory.</p>
                <p><M>apt-get</M> will give a message about missing permissions. This is normal. It's complaining about the fact that it 
                cannot download the file in a sandbox, and has to &mdash; instead &mdash; copy the file into staging directories directly.
                Despite the rather ominous warning, the package will have been installed anyway. </p>    
                <p>NWindows headers will be installed in the <M>/usr/include/NWindows</M> directory, 
                and the <M>libnwindows.a</M> static library will be installed in the <M>/usr/lib</M> directory.</p>

                <SectionHead text="Build Prerequisites"/>
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
                    <li>You can optionally build a debian package for NWindows using the following command:
                        <Code style={{ marginTop: 16, marginBottom: 16 }} text={
                            `./makePackage.sh`
                        } />   
                        <p>The Debian package will be placed in the <M>./build</M> directory of the NWindows project.</p> 
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
            <SectionHead text="CMake Cache Variables" />
            <p>The CMake build for NWindows uses the following cache variables: </p>
            <Code text={`set(NWINDOWS_BUILD_DOCUMENTATION ON CACHE BOOL "Build the Vite Documentation website?")
set(NWINDOWS_BUILD_EXAMPLES ON CACHE BOOL "Build the example projects?")
set(NWINDOWS_STRICT_COMPILER_OPTIONS ON CACHE BOOL "Use strict compiler warnings and errors?")
`} />
            <p>By default, NWindows builds with strict compiler options:</p>
            <Code text={`-Wall -Wextra -Wpedantic -Werror`} />

            <p>Setting <M>NWINDOWS_STRICT_COMPILER_OPTIONS</M> to <M>OFF</M> will make Nwindows build without any of these
            options.</p>
            <p>If you are using NWindows as a git submodule, you can set these variables in your 
                top-level <M>CMakeLists.txt</M> file to control the build of NWindows. For example, to disable building the documentation, add the following line to your top-level <M>CMakeLists.txt</M> file 
            before adding the NWindows submodule directory:</p>
            <Code text={`set(NWINDOWS_BUILD_DOCUMENTATION OFF)`} />
            <p>If you are building NWindows as a standalone project, you can set these variables on the command line when 
                running <M>cmake</M>. For example, to disable building the documentation, run the following command:</p>  
            <Code text={`cmake -DNWINDOWS_BUILD_DOCUMENTATION=OFF ...`} />
            <p><M>./init.sh</M> will accept additional command-line arguments that are 
            passed through to CMake, so you can run:</p>
            <Code text={`./init.sh -DNWINDOWS_BUILD_DOCUMENTATION=OFF`} />
            <p>Because settings are cached, you do not need to specify these settings again when you run <M>./build.sh</M>.</p>

        </DocsPage>
    );
}

export default InstallingNWindows;
