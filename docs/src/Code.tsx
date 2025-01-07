import {CopyBlock, CodeBlock, dracula,atomOneLight} from 'react-code-blocks'

const whiteTheme = atomOneLight;


function  Code (props: {text: string, style?: React.CSSProperties, showLines?: boolean, white?: boolean}) {
  return (
    <div style={props.style}>

      <CopyBlock 
        text={props.text} 
        language="cpp" 
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

export default Code;

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
