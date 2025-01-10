/*
 *   Copyright (c) 2025 Robin E. R. Davies
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

interface FunctionDeclaration {
    returnType: string;
    name: string;
    parameters: Array<{
        modifiers: string;
        type: string;
        name: string;
        isPointer: boolean;
        isReference: boolean;
        isConst: boolean;
    }>;
    isConst: boolean;
}

function parseCppFunction(declaration: string): FunctionDeclaration {
    // Remove extra whitespace and split into parts
    declaration = declaration.trim().replace(/\s+/g, ' ');

    // Remove semicolon if present
    declaration = declaration.replace(/;$/, '');



    // Check if function is const
    const isConst = declaration.endsWith(' const');
    if (isConst) {
        declaration = declaration.slice(0, -6);
    }

    // remove virtual, and static keywords.

    let modifiers = "";
    const virtualRegex = /^(((virtual\s+)|(static\s+))+)/;
    const matchesVirtual = declaration.match(virtualRegex);
    if (matchesVirtual) {
        modifiers = matchesVirtual[0];
        declaration = declaration.slice(modifiers.length);
    }

    // Split the declaration into parts before and after the parameter list
    const funcRegex = /^(.*?)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*)\)$/;
    const matches = declaration.match(funcRegex);

    if (!matches) {
        throw new Error('Invalid function declaration');
    }

    const [       
        , returnType, name, paramString] = matches;

    // Parse parameters
    const parameters = paramString.split(',').map(param => {
        param = param.trim();
        if (!param) return null;

        const paramParts = param.split(/\s+/);
        const paramName = paramParts.pop() || '';

        // Handle pointers and references in name
        let isPointer = false;
        let isReference = false;

        if (paramName.startsWith('*')) {
            isPointer = true;
        } else if (paramName.startsWith('&')) {
            isReference = true;
        }

        const cleanName = paramName.replace(/^[*&]/, '');

        // Check for const
        const isConst = paramParts.includes('const');
        const type = paramParts
            .filter(part => part !== 'const')
            .join(' ');

        return {
            type,
            name: cleanName,
            isPointer,
            isReference,
            isConst
        };
    }).filter((param): param is NonNullable<typeof param> => param !== null);

    return {
        modifiers: modifiers,
        returnType: returnType.trim(),
        name,
        parameters,
        isConst
    };
}

// Example usage
const testCases = [
    'virtual int fool(int a, int b) const;',
    'void hello()',
    'int add(int a, int b)',
    'const string& getName() const',
    'void process(const vector<int>& data, int* count)',
    'MyClass* createInstance(const string& name, int id = 0)'
];

function testParse(test: string)
{
    try {
        return JSON.stringify(parseCppFunction(test), null, 2);
    } catch (error: any) {
        return error.toString();
    }
}

export function CppFunctionParserTest() {
    return (
        <div>
            {
                testCases.map((test, index) => {
                    return (<div key={index}>
                        <h3>{test}</h3>
                        <pre>{testParse(test)}</pre>
                    </div>
                    );
                })

            }
        </div >
    )

}