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

import {CopyBlock, CodeBlock, dracula,github} from 'react-code-blocks'

const whiteTheme = github;


function  CodeDiv (props: {text: string, language?: string, style?: React.CSSProperties, showLines?: boolean, white?: boolean}) {
  return (
    <div style={props.style}>

      <CopyBlock 
        text={props.text} 
        language={props.language??"cpp" }
        theme={props.white??false ? whiteTheme : dracula} 
        wrapLongLines={false} 
        showLineNumbers={props.showLines??false}
        customStyle={{overflowX: "auto", width: "90% !important", 
          paddingBottom: "12px", paddingTop: "12px",paddingLeft: "16px"
      }}
      codeContainerStyle={{marginLeft: "16px", marginTop: "8px", marginBottom: "8px", background: "red"}}
      />
    </div>
  )
}

export default CodeDiv;

export function CodeFragment(props: { text: string})
{
  return (
    <CodeBlock 
      text={props.text} 
      language="cpp" 
      theme={whiteTheme} 
      showLineNumbers={false} 
      codeContainerStyle={{ padding: "0px", margin: "0px"  }}
      wrapLongLines={false} 

       />
  )
}

export function CodeFragment2 (props: {text: string, style?: React.CSSProperties, showLines?: boolean, white?: boolean}) {
  return (
    <div style={props.style}>

      <CodeBlock
        text={props.text} 
        language={"cpp"}
        
        theme={props.white??false ? whiteTheme : dracula} 
        wrapLongLines={false} 
        showLineNumbers={props.showLines??false}
        customStyle={{overflowX: "auto", width: "90% !important", 
          paddingBottom: "4px", paddingTop: "4px",paddingLeft: "16px"
      }}
      codeContainerStyle={{marginLeft: "16px", marginTop: "1px", marginBottom: "1px" }}
      />
    </div>
  )
}
