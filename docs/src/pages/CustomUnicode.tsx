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
import { DocsTitle } from '../DocsNav';


function CustomUnicode() {
    return (
        <DocsPage route="/using/custom/unicode">
            <h1 id="section__unicode_support">{DocsTitle("/using/custom/unicode")}</h1>

            <p>TBD  generic  unicode discussion.
            </p>
            <p>widths of Unicode code points may be zero, one or two columns wide when displayed on the output terminal,
                and the display width may vary by locale, or capabilities of the terminal on which the character is
                being displayed. The string is assumed to use UTF-8 encoding. Unicode characters will be mapped onto
                available characters in the terminal's character set.</p>
            <p> xterm-like terminals will mostly support the full
                Unicode character set; however, the version of Unicode that is supported may vary, depending on both the
                operating system on which NWindows is running, and the operating system of the terminal device on which
                the output is being displayed. Actual text-mode terminals will usually have more limited character sets
                which may vary depending on the locale of hardware devices being used to display terminal output.
            </p>
        </DocsPage>

    );
}

export default CustomUnicode;
