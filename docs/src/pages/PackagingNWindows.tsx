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

import CodeDiv from '../Code';
import DocsPage from '../DocsPage';
import M from '../M';
import Name from '../Name';



function InstallingNWindows() {
    return (
        <DocsPage route="/installing">
            <div>
                <h1>Installing NWindows</h1>
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
                <CodeDiv text={
`sudo apt install libncursesw5-dev xclip libicu-dev
`               }
                />
                <p>NWindows was originally developed using Visual Studio Code. If you are using Visual Studio code, all you 
                    need to do is fetch the project from GitHub, and open the folder contain the project in Visual Studio Code. 
                    VSCode will automatically detect the CMakeLists.txt file and configure the project for you. You can then build the 
                    project using CMake build procedures. 
                </p>
                <p><b>Important note:</b> when creating packages for your project, you should know that NWindows libraries do not have
                    explicit linkage to either <M>xclip</M> or <M>libicu</M>, so automated packaging tools will not pick up these dependencies. 
                    The <b>xclip</b> package is optional, but when installed, it allows NWindows to copy and paste to and from the Linux clipboard. 
                    <M>libicu</M> is almost always installed by default on most Linux distributions. If you find that NWindows complains about
                    not being able to find <M>libicu</M>, you can manually add a dependency to the appropriate libicu package for your platform.</p>
                <p>
                    Unfortunately, the standard system package for libicu is tightly versioned, with version numbers that are guaranteed to be 
                    different from distribution to distribution, and from version to version within each of those distributions. On Ubuntu 10.4, for example,
                    the ICU package is called <M>libicu47</M>; and on Raspberry Pi OS, it is called <M>libicu42</M>. You can follow the lead of the 
                    Mono project, whose package declares that it will be happy wih any one of <M>libicu40</M>, 
                    <M>libicu41</M>, <M>libicu42</M>, ... <M>libicu99</M>. Or you can use a simpler, 
                    and only slightly unfortunate alternative and declare that your package depends on <M>libicu-dev</M> 
                    (which will install the correct version of <M>libicuNN</M> as a dependency). NWindows searches for and dynamically links to the currently installed 
                    <M>libicu.so</M> library at runtime. The ICU development team guarantees that all of the 
                    APIs that NWindows uses are stable and will not change in future versions of ICU, so this appears to be a safe procedure.
                    </p>
            </div>
        </DocsPage>
    );
}

export default InstallingNWindows;
