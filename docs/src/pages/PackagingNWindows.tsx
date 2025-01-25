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
import M from '../M';
import { DocsTitle } from '../DocsNav';



function PackagingNWindows() {
    let route = "/packaging"
    return (
        <DocsPage route={route}>
            <div>
                <h1>{DocsTitle(route)}</h1>
                <p>This section describes issues relating to building of Debian packages for NWindows applications.</p>
                <p>
                    The core NWindows libraries need to be statically linked, so there are no direct packaging for NWindows libraries. However, NWindows 
                    has implicit dependencies on two additional packages that package-builder utilities will not detect automatically.
                </p>
                <ul>
                    <li><M>xclip</M> - a command-line utility that NWindows uses to transfer content to and from the X11 clipboard
                    when performing clipboard operations.</li>
                    <li>The <a href="https://icu.unicode.org/">ICU Unicode library</a>, which NWindows uses to perform locale-aware case-insensitive 
                    comparison of menu shortcuts and to perform composition of Unicode accent characters when editing text.
                    </li>
                </ul>
                <p>When you package an NWindows application, you should, therefore, declare explicit dependencies on the following two packages in 
                    your package control file:</p>
                <ul>
                    <li><M>xclip</M></li>
                    <li><M>libicu-dev</M> (a discussion of alternatives can be found later in this section)</li>
                </ul>
                <p>The <M>xclip</M> dependency is optional. If the <M>xclip</M> utility is not installed, NWindows clipboard operations will continue to work, but 
                clipboard content will not be shared with other applications. <M>xclip</M> is not typically pre-installed 
                on most Linux distributions.</p>
                <p>The <M>libicu-dev</M> dependency is also probably optional. If you are unhappy with including additional files 
                and headers that the <M>-dev</M> package installs, a discussion of why this is done, and alternatives to including 
                the <M>-dev</M> package follows.</p>
                <p>NWindows dynamically loads the ICU library at runtime, instead of linking directly to it, in order to avoid 
                    challenging versioning problems with the ICU package. Direct linking to the ICU library would require you 
                    to build separate packages for pretty much every version of every Linux distribution you plan to target, which seems 
                    untenable. Static linking of the ICU packages would add an additional 30MB of data to a package file, 
                    so this is also not a practical option. Because the ICU libraries are dynamically loaded, package builders will 
                    not detect a dependency on  the ICU libraries.</p>
                <p> NWindows uses a very small subset of the ICU APIs, all of which are marked as <i>stable</i> in 
                    official ICU documentation, and are therefore guaranteed to be present in current and future versions of ICU,
                    so ignoring the version of the ICU libraries seems reasonable.
                </p>
                <p>The ICU libraries are pre-installed on most Linux distributions, so you can probably safely ignore the 
                    implicit dependency that NWindows has on the ICU libraries. If you want to be cautious, you can add an 
                    a manual dependency to your package control files. However, doing so runs into the same versioning problems that 
                    direct linking to the ICU libraries has. The package name for libicu takes the form of <M>libicuNN</M> where 
                    NN is a version number that increases at an alarming rate. You can reasonably expect to find versions of libicu 
                    with a version number that varies from 60 to 85 in the field, and should reasonably expect that you will find packages 
                    of the ICU libraries with higher versions in the near future. The version number varies from distribution to distribution, 
                    and varies between different versions of the same distribution. 
                </p>
                <p>One possible solution is to have your package declare dependencies on any one of the possible ICU library 
                    versions that you may reasonably expect to see in the field. Authors of the Mono project have taken this 
                    approach, and declare a package dependency on any one of the <M>libicu60</M> through <M>libicu100</M> packages. They use a script to 
                    generate their package control files.
                </p>
                <p>Thus the pragmatic approach:  to declare a dependency on <M>libicu-dev</M> instead. This package installs 
                additional headers and libraries that are not required, but will also install the correct platform version of <M>libicu</M> as 
                a side-effect, without having to declare a version-specific dependency, on all reasonably recent versions of 
                Debian-derived Linux distributions. This is the approach that the author 
                of NWindows takes when building packages for his own NWindows applications.
                </p>
            </div>
        </DocsPage>
    );
}

export default PackagingNWindows;
