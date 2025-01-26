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
import { MethodDescription } from '../ClassDescription';
import M from '../M';   
import SectionHead from '../SectionHead';

function ApiMethods() {

    return ( <DocsPage route="/apis/methods">
    <h1>{DocsTitle("/apis/methods")}</h1> 
    <SectionHead  text="Non-class Methods"/>
    <MethodDescription indexName="std::string wstring_to_utf8(const std::wstring& wstr)"
        method={'std::string wstring_to_utf8(const std::wstring& wstr);'}
        >
        <p>Converts a wide string to a UTF-8 string.</p>
    </MethodDescription>
    <MethodDescription indexName="std::string u16string_to_utf8(const std::u16string& u16str)"
        method={'std::string u16string_to_utf8(const std::u16string& u16str);'}
        >
        <p>Converts a UTF-16 string to a UTF-8 string.</p>
    </MethodDescription>
    <MethodDescription indexName="std::string u32string_to_utf8(const std::u32string& u32str)"
        method={'std::string u32string_to_utf8(const std::u32string& u32str);'}
        >
        <p>Converts a UTF-32 string to a UTF-8 string.</p>
    </MethodDescription>
    <MethodDescription indexName="std::wstring u32string_to_wstring(const std::u32string& u32str)"
        method={'std::wstring u32string_to_wstring(const std::u32string& u32str);'}
        >
        <p>Converts a UTF-32 string to a wide string.</p>   
    </MethodDescription>
    <MethodDescription indexName="std::wstring utf8_to_wstring(const std::string& utf8_str)"
        method={'std::wstring utf8_to_wstring(const std::string& utf8_str);'}
        >
        <p>Converts a UTF-8 string to a wide string.</p>
    </MethodDescription>
    <MethodDescription indexName="std::u32string utf8_to_u32string(const std::string& str)"
        method={'std::u32string utf8_to_u32string(const std::string& str);'}
        >
        <p>Converts a UTF-8 string to a UTF-32 string.</p>
    </MethodDescription>
    <MethodDescription indexName="std::u16string utf8_to_u16string(const std::string& str)"
        method={'std::u16string utf8_to_u16string(const std::string& str);'}
        >
        <p>Converts a UTF-8 string to a UTF-16 string.</p>
    </MethodDescription>
    <MethodDescription indexName="std::vector<std::string> utf8_line_wrap(const std::string& text, size_t  line_length)"
        method={'std::vector<std::string> utf8_line_wrap(const std::string& text, size_t  line_length);'}
        >
        <p>Wraps a UTF-8 string into lines of no more than line_length characters.</p>
        <p>Calculations are performed using the number of character cells occupied by each character on the current terminal, 
            accounting for double-width characters and composed accents.</p>
    </MethodDescription>
    <MethodDescription indexName="std::string utf8_substr(const std::string& text, size_t start, size_t length = std::numeric_limits<size_t>::max())"
        method={'std::string utf8_substr(const std::string& text, size_t start, size_t length = std::numeric_limits<size_t>::max());'}
        >
        <p>Returns a substring of a UTF-8 string starting at start and occupying no more than length characters.</p>
        <p>Indices are specified in Unicode codepoints.</p>
    </MethodDescription>
    <MethodDescription indexName="std::string utf8_wc_substr(const std::string& text, size_t start, int length)"
        method={'std::string utf8_wc_substr(const std::string& text, size_t start, int length);'}
        >
        <p>Returns a substring of a UTF-8 string starting at start and occupying no more than length character cells on 
            the current terminal device.</p>
        <p>Indices are specified in character cells, accounting for double-width characters and composing accents.</p>    
    </MethodDescription>
    <MethodDescription indexName="size_t utf8_length(const std::string& utf8_str)"
        method={'size_t utf8_length(const std::string& utf8_str);'}
        >
        <p>Returns the number of Unicode codepoints (char32_t characters) in a UTF-8 string.</p>
    </MethodDescription>
    <MethodDescription indexName="size_t utf8_increment(const std::string& utf8_str, size_t position)"
        method={'size_t utf8_increment(const std::string& utf8_str, size_t position);'}
        >
        <p>Returns the char index of the next Unicode codepoint in a UTF-8 string after position.</p>    
    </MethodDescription>
    <MethodDescription indexName="size_t utf8_decrement(const std::string&utf8_str,size_t position)"
        method={'size_t utf8_decrement(const std::string&utf8_str,size_t position);'}
        >
        <p>Returns the char index of the previous Unicode codepoint in a UTF-8 string before position.</p>
    </MethodDescription>
    <MethodDescription indexName="char32_t utf8_char32_at(const std::string& utf8_str, size_t position)" 
        method={'char32_t utf8_char32_at(const std::string& utf8_str, size_t position);'}
        >
        <p>Returns the char32_t Unicode codepoint at the specified char position in a UTF-8 string.</p>
    </MethodDescription>
    <MethodDescription indexName="size_t utf8_wide_character_width(const std::string&utf8_str,size_t position)"
        method={'size_t utf8_wide_character_width(const std::string&utf8_str,size_t position);'}
        >
        <p>Returns the number of character cells on the current output terminal device that would be occupied by the
             char32_t character at position in a UTF-8 string.</p>
        <p>0 if the character is '\0', 1 if single-width, 2 if double-width.</p>
    </MethodDescription>
    <MethodDescription indexName="size_t utf8_wc_length(const std::string&utf8_str)"
        method={'size_t utf8_wc_length(const std::string&utf8_str);'}
        >
        <p>Returns the number of columns that would be occupied on the current output terminal device were 
            the string to be displayed.</p>
    </MethodDescription>
    <MethodDescription indexName="size_t utf8_wc_length(const std::string&utf8_str, size_t start, size_t end)"
        method={'size_t utf8_wc_length(const std::string&utf8_str, size_t start, size_t end);'}
        >
        <p>Returns the number of columns that would be occupied on the current output terminal device by the 
            substring of the string from start to end.</p>
    </MethodDescription>
    <MethodDescription indexName="std::string char32_to_utf8string(char32_t c)"
        method={'std::string char32_to_utf8string(char32_t c);'}
        >
        <p>Returns a UTF-8 string containing the single Unicode codepoint c.</p>
    </MethodDescription>
    </DocsPage>

        
    );
    /*
   std::string wstring_to_utf8(const std::wstring& wstr);
    std::string u16string_to_utf8(const std::u16string& u16str);
    std::string u32string_to_utf8(const std::u32string& u32str);
    std::wstring u32string_to_wstring(const std::u32string& u32str);

    std::wstring utf8_to_wstring(const std::string& utf8_str);
    std::u32string utf8_to_u32string(const std::string& str);
    std::u16string utf8_to_u16string(const std::string& str);
    
    std::vector<std::string> utf8_line_wrap(
        const std::string& text,
        size_t  line_length
    );

    std::string utf8_substr(
        const std::string& text,
        size_t start,
        size_t length = std::numeric_limits<size_t>::max());

    inline std::string utf8_substr(
        const std::string& text,
        int start,
        int length = std::numeric_limits<int>::max())
    {
        return utf8_substr(text, (size_t)start, (size_t)length);
    }

    // A utf8 substring starting at start, occupying no more than length character cells,
    // accounting for double-width characters.
    std::string utf8_wc_substr(
        const std::string& text,
        size_t start,
        int length);



    size_t utf8_length(const std::string& utf8_str);
    size_t utf8_increment(const std::string& utf8_str, size_t position);
    size_t utf8_decrement(const std::string&utf8_str,size_t position);
    char32_t utf8_char32_at(const std::string& utf8_str, size_t position);

    // Number of character cells occupied by the char32_t character at position. 
    // 0, if '\0', 1 if single-width, 2 if double-width (maybe even more?)
    size_t utf8_wide_character_width(const std::string&utf8_str,size_t position);



    // display length of the string including double-width terminal characters
    size_t utf8_wc_length(const std::string&utf8_str);
    size_t utf8_wc_length(const std::string&utf8_str, size_t start, size_t end);

    inline std::string char32_to_utf8string(char32_t c)
    {
        return u32string_to_utf8(std::u32string(1, c));
    }

    */
}
export default ApiMethods;
