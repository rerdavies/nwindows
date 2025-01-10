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
