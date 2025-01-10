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
import Name from '../Name';


function PlatformSupport() {
    return (
        <DocsPage route="/support">
            <div>
                <h1>1.0 - Platform Support</h1>
                <p>
                    <span className='name'>NWindows</span> should build and run on any Linux distribution that supports the <M>ncursesw</M> library. 
                    A compiler with relatively complete C++20 support is required. GCC 12.3 is known to work.
                </p>
                <p>
                    <span className='name'>NWindows</span> does not currently build on Windows, but it should be trivial to make it run on Windows 10 
                    or later. The <M>ncurses</M> library is available on Windows platforms. There are a two known portability issue that are
                    marked in sources with a <M>static_assert</M>s because it's uncertain how a particular function call is implemented in
                    Windows. And there's one piece of untested code relating to Windows clipboard handling that will probably work, but has not been 
                    compiled or tested. None of the problems are particularly difficult to fix. Each <M>static_assert</M> has a comment describing the 
                    problem, and possible solutions. If you make fixes, please push a change back into
                    the <Name>NWindows</Name> github repository.
                </p>
                <h2>Unicode Support</h2>
                <p><Name>NWindows</Name> provides partial Unicode support, but you should use it very cautiously.
                </p>
                <p><Name>NWindows</Name> provides the following support for Unicode:</p>
                <ul>
                    <li>All std::strings are assumed to contain UTF-8 characters.</li>
                    <li>On xterm terminals, almost all Unicode characters are correctly displayed. Emoji, double-width characters, and composed characters
                        are all supported.
                    </li>
                    <li>On text-mode terminals, UTF-8 characters are correctly mapped to available characters on the current terminal. Extended Unicode characters
                        are displayed as "missing characters". In practice, this means that Western European characters are likely to display properly on Western European 
                        computers. Whether locale-specific characters display or not in other countries depends on the computer being used and the country 
                        in which the computer was intended to be used.
                    </li>
                    <li>Unicode support works across <M>ssh</M> connections, but will depend on correct handling of Unicode by the terminal on
                        which the application is being viewed.
                    </li>
                    <li>NWindows provides automatic fallback rendering of input controls when running on non-Unicode terminals.</li>
                </ul>
                <p>Unicode support in NWindows has the following limitations:</p>
                <ul>
                    <li>There is no support for bi-direction characters at all.</li>
                    <li>On Ubuntu, xterm, and system libraries are not fully synched with latest Unicode standards. As a result, many
                        new double-width emoji and extended Unicode characters incorrectly display as single-width characters. The same
                        is likely to be true on other Linux distributions as well. You can work around this problem by positioning such
                        unicode characters explicitly.
                    </li>
                    <li>Skin-tone modifiers are not supported by xterm on Ubuntu 22.04, and are likely to be unsupported on other distributions as well.
                    </li>
                </ul>
                <p>If your users will be using text-mode terminals, you should be very cautious about relying on adequate support of non-ASCII characters.</p>
            </div>
        </DocsPage>
    );
}

export default PlatformSupport;
