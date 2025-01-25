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

//import {SyntaxHigh} from 'react-syntax-highlighter';
// import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
// import tsx from 'react-syntax-highlighter/dist/esm/languages/hljs/tsx';
// import docco from 'react-syntax-highlighter/dist/esm/styles/hljs/docco';
import {Light as SyntaxHighlighter} from 'react-syntax-highlighter'
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import dracula from 'react-syntax-highlighter/dist/esm/styles/hljs/dracula';
import IconButton from '@mui/material/IconButton';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

SyntaxHighlighter.registerLanguage('cpp', cpp);


function Code(props: { 
  text: string, 
  language?: string, 
  style?: React.CSSProperties, 
  showLines?: boolean,
  startingLineNumber?: number,
  maxHeight?: number,
   white?: boolean, 
   show_copy?: boolean }) {
  return (
    <div style={{position: "relative", marginLeft: 16, ...props.style}}>
      { (props.show_copy??true) && (
        <div style={{ position: "absolute", padding: 4, right: 0, top: 0, opacity: 0.6, color: props.white? 'black': 'white' }}>
          <IconButton onClick={() => navigator.clipboard.writeText(props.text)} color="inherit"    >
            <ContentCopyIcon htmlColor={ props.white? 'black': 'white'} fontSize={'small'}/>
          </IconButton>
        </div>
      )}

      <SyntaxHighlighter language={props.language ?? "cpp"} showLineNumbers={props.showLines ?? false}
        style={props.white? docco: dracula}
        startingLineNumber={props.startingLineNumber}
        customStyle={{
          overflowX: "auto", width: "90% !important",
          paddingBottom: "12px", paddingTop: "12px", paddingLeft: "16px", borderRadius: 6, maxHeight: props.maxHeight
        }}
      >
        {props.text}
      </SyntaxHighlighter>
    </div>
  )
}

export default Code;


export function CodeFragment2(props: { text: string, style?: React.CSSProperties, showLines?: boolean, white?: boolean }) {
  return (
    <Code text={props.text} language="cpp" style={props.style} showLines={props.showLines} white={props.white??true} show_copy={false}/>

  )
}
