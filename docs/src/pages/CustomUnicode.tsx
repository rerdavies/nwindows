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
import M, { ML } from '../M';
import { Link } from 'react-router-dom';

function CustomUnicode() {
    return (
        <DocsPage route="/using/custom/unicode">
            <h1 id="section__unicode_support">{DocsTitle("/using/custom/unicode")}</h1>
            <p>
                When writing custom controls, you need to be aware of a couple of issues related 
                to Unicode support.
            </p>
            <p>Widths of Unicode code points may be zero, one or two columns wide when displayed on the output terminal,
                and the display width may vary by locale, or capabilities of the terminal on which the character is
                being displayed. As a result, you cannot assume that the width of a string when displayed is equal to 
                the number of Unicode codepoints in the string. Instead, you should always 
                use <ML fullName name="NElement::measure_text()"/> to calculate the number of columns a string will occupy
                on the display terminal. The <ML name="NWindow" /> class also provides methods that are are useful for manipulating 
                UTF-8 strings. 
                See <ML fullName name="NWindow::compose_characters()" />,  <ML fullName name="NWindow::collator" />, <ML fullName name="NElement::normalize_utf8()" />.
                The <M>"NWindows/NUtf8.hpp"</M> header also declares low-level non-class methods for manipulating UTF-8 strings, and converting 
                between UTF-8 and wide-character formats. Documentation for these methods can be found 
                in  the <Link to="/apis/methods"><i>NWindows Methods</i></Link> section of this document. 

            </p>
            <p>You should be aware that, on Windows platforms, <M>wchar_t</M> is a 16-bit type, and on Linux, <M>wchar_t</M> is
            a 32-bit type. NWindows therefore prefers to use UTF-8 encoded strings for all text manipulation, 
            and occasionally uses <M>char32_t</M> characters when dealing with individual codepoints.
            </p>
            <p> Support for Unicode characters is limited by the capabilities of the terminal on which NWindows is 
                displaying output. xterm-like terminals will generally support the full Unicode character set, although 
                version support for Unicode tends to lag behind latest versions of Unicode specification. Terminals running 
                in a graphics mode will also provide good Unicode supports. But actual text-mode terminals will have 
                little or no support for Unicode. NWindows will map Unicode characters to display characters on an 
                as-able basis.
            </p>
            <p>If you are writing custom controls that use Unicode glyphs for purposes other than localization, you should 
                check to see whether the terminal on which the output is being displayed supports the Unicode characters you 
                are using, and provide fallback ASCII rendering if able. Use <ML fullName name="NWindow::can_display_character()"/> to 
                check whether the current display terminal can support a particular Unicode character. 
            </p>
        </DocsPage>

    );
}

export default CustomUnicode;
