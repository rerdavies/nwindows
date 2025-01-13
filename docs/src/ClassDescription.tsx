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

import React from "react";
import { RegisterIndexEntry } from "./IndexBuilder";
import { Link } from "react-router-dom";
import {IL} from "./M"; 

export default function
    ClassDescription(props: {
        children?: React.ReactNode,
        name: string,
        prefix?: string,
        id_tag?: string,
        baseClass?: string
    }) {

    let id_tag = props.id_tag ?? "class";

    let prefix = props.prefix || "class";
    let id = id_tag + "__" + props.name;
    let indexText = (props.prefix ?? "class") + " " + props.name;

    RegisterIndexEntry(props.name, id, indexText);
    return (
        <div id={id} className="nav_target" >
            <h2 className="class-desc-header" >
                <div>{prefix} {props.name}</div>
                {props.baseClass && <div style={{opacity: 0.6,marginLeft: 32 }}>extends {props.baseClass}</div>}
            </h2>

            <div style={{ marginLeft: 32, marginRight: 16 }}>
                {props.children}
            </div>
        </div>
    );
}
export function
    EnumDescription(props: { children: React.ReactNode, enumName: string, prefix?: string }) {
    return (
        <ClassDescription name={props.enumName} prefix={props.prefix ? props.prefix : "enum class"} id_tag="enum">
            {props.children}
        </ClassDescription>
    );
}
export function
    StructDescription(props: { children: React.ReactNode, name: string, prefix?: string, baseClass?: string }) {
    return (
        <ClassDescription name={props.name}
            prefix={props.prefix ? props.prefix : "struct"}
            id_tag="struct"
            baseClass={props.baseClass} >
            {props.children}
        </ClassDescription>
    );
}



export function PropertyList(props: { children?: React.ReactNode }) {
    return (
        <div>
            <ClassSectionHead text="Properties" />
            <div className="property_grid" >
                <div className="property_grid_title">Type</div>
                <div className="property_grid_title">Property</div>
                <div className="property_grid_title">Description</div>

                {props.children}
            </div>
        </div>
    );
}

export function FieldEntry(props: { name: string, type: string, children?: React.ReactNode }) {
    let pos = props.name.indexOf("::");
    let id = undefined;
    let classNameOnly = "";
    let propertyOnly = props.name;
    if (pos >= 0) {
        classNameOnly = props.name.substring(0, pos);
        propertyOnly = props.name.substring(pos + 2);
        id = "field__" + classNameOnly + "_" + propertyOnly;
    }
    if (id) {
        RegisterIndexEntry(propertyOnly, id, "field " + props.name);
    }
    return (
        <React.Fragment>
            <div className="property_grid_cell_pre"><IL name={props.type}/></div>
            <div className="property_grid_cell_pre" id={id}>{propertyOnly}</div>
            <div className="property_grid_cell">{props.children}</div>
        </React.Fragment>
    );
}

export function PropertyEntry(props: { propertyName: string, type: string, children?: React.ReactNode }) {
    let pos = props.propertyName.indexOf("::");
    let id = undefined;
    let classNameOnly = "";
    let propertyOnly = props.propertyName;
    if (pos >= 0) {
        classNameOnly = props.propertyName.substring(0, pos);
        propertyOnly = props.propertyName.substring(pos + 2);
        id = "property__" + classNameOnly + "_" + propertyOnly;
    }
    if (id) {
        RegisterIndexEntry(propertyOnly, id, "property " + props.propertyName);
    }
    return (
        <React.Fragment>
            <div className="property_grid_cell_pre"><IL name={props.type}/></div>
            <div className="property_grid_cell_pre" id={id}>{propertyOnly}</div>
            <div className="property_grid_cell">{props.children}</div>
        </React.Fragment>
    );
}

function methodId(tag: string, name: string) {
    name = removeParameters(name);
    let pos = name.indexOf("::");
    let classNameOnly = "";
    if (pos >= 0) {
        classNameOnly = name.substring(0, pos);
        name = name.substring(pos + 2);
    }
    return tag + "__" + classNameOnly + "_" + name;
}

function removeParametersAndClass(name: string) {
    name = removeParameters(name);
    let pos = name.indexOf("::");
    if (pos >= 0) {
        name = name.substring(pos + 2);
    }
    return name;

}

let eventRegexp = /\s(\w*\:\:\w*)$/;

let paramRegexp = /(\w+\:\:\w+(?:[+-=!<>T]+)?)(?:\(.*\))(?:\s*const\s*$)?/;
let methodParamRegexp = /(\w+)(?:\(.*\))(?:\s*const\s*$)?/;
let directIndexRegexp = /^(\w+\:\:\w+)$/;
let defineRegexp =  /^(\w+)$/;
let constRegexp =  /\s(\w+)$/;

function removeParameters(name: string) {
    let match = name.match(eventRegexp);
    if (match) {
        return match[1];
    }
    match = name.match(paramRegexp);
    if (match) {
        return match[1];
    }
    match = name.match(methodParamRegexp);
    if (match) {
        return match[1];
    }
    match = name.match(directIndexRegexp);
    if (match) {
        return name;
    }
    match = name.match(defineRegexp);
    if (match) {
        return name;
    }
    match = name.match(constRegexp);
    if (match) {
        return match[1];
    }

    throw new Error("Unable to match name: " + name);
}

export function ClassSectionHead(props: { text: string }) {
    return (
        <div>
            <h3 className="class_section_head">{props.text}</h3>
            <hr style={{ marginTop: 0, marginBottom: 12 }} />
        </div>
    );
}
export function EventDescriptions(props: { children?: React.ReactNode }) {
    return (
        <div>
            <ClassSectionHead text="Events" />
            {props.children}
        </div>
    );
}
export function FieldDescriptions(props: { children?: React.ReactNode }) {
    return (
        <div>
            <ClassSectionHead text="Fields" />
            {props.children}
        </div>
    );
}

export function ConstructorDescriptions(props: { children?: React.ReactNode }) {
    return (
        <div>
            <ClassSectionHead text="Constructors" />
            {props.children}
        </div>
    );
}

export enum LinkType {
    Define,
    ClassMethod,
    Constant,
    Typedef,
    Enum,
    Struct,
    Class
}

export function DocsLink(props: { route: string, directId: string, children?: React.ReactNode }) {
    return (
        <Link to={props.route} state={{ showElement: props.directId }} >{props.children}</Link>
    );
}
export function ApiLink(props: { linkType: LinkType, name: string, children?: React.ReactNode }) {

    let id = "";
    let route = "";


    switch (props.linkType) {
        case LinkType.Define:
            route = "/apis/defines";
            id = "define__" + props.name;
            break;
        case LinkType.Enum:
            route = "/apis/defines";
            id = "define__" + props.name;
            break;
        case LinkType.Struct:
            route = "/apis/structs";
            id = "struct__" + props.name;
            break;
        case LinkType.Class:
            route = "/apis/classes/" + props.name;
            id = "class__" + props.name;
            break;
        default:
            return <span>{props.children}</span>;
    }

    return (
        <Link to={route} id={id} state={{ showElement: id }} >{props.children}<span className="material-icon-inline">api</span></Link>
    );
}


export function MethodDescriptions(props: { children?: React.ReactNode, title?: string }) {
    return (
        <div>
            <ClassSectionHead text={props.title ?? "Methods"} />
            {props.children}
        </div>
    );
}

export function OperatorDescriptions(props: { children?: React.ReactNode }) {
    return (
        <div>
            <ClassSectionHead text="Operators" />
            {props.children}
        </div>
    );
}


export function EventDescription(props: { indexName: string | string[] | undefined, event: string, children?: React.ReactNode }) {
    return MethodDescription(
        {
            indexName: props.indexName,
            method: props.event,
            tag: "event",
            children: props.children
        });
}

export function ConstantDescription(props: { indexName?: string | string[], constant: string, children?: React.ReactNode }) {
    return MethodDescription(
        {
            indexName: props.indexName,
            method: props.constant,
            tag: "constant",
            children: props.children
        }
    )
}
export function TypedefDescription(props: { indexName?: string | string[], declaration: string, children?: React.ReactNode }) {
    return MethodDescription(
        {
            indexName: props.indexName,
            method: props.declaration,
            tag: "typedef",
            children: props.children
        }
    )
}
export function UsingDescription(props: { indexName?: string | string[], declaration: string, children?: React.ReactNode }) {
    return MethodDescription(
        {
            indexName: props.indexName,
            method: props.declaration,
            tag: "using",
            children: props.children
        }
    )
}


// Same presentation as MethodDescription methods, but no indexing, just inline child 
// content.
export function MethodCode(props: { text: string }) {
    return (
        <div className="method_description" >
            <pre className="mono" style={{ paddingLeft: "8px", paddingTop: "12px", paddingBottom: "12px", overflowX: "auto" }}
            >{props.text}</pre>
        </div>
    );

}

export function MethodDescription(
    props: {
        indexName: string | string[] | undefined,
        method: string, tag?: string, children?: React.ReactNode
    },) {
    let tag = props.tag || "method";
    let indexName = props.indexName;
    let id = "";
    let extraTargetLinks: React.ReactNode[] = [];
    if (indexName) {
        let ids = new Set<string>();

        if (indexName instanceof Array) {
            let indexArray = indexName as string[];
            for (let name of indexArray) {
                let thisId = methodId(tag, name);
                ids.add(thisId);
                RegisterIndexEntry(removeParametersAndClass(name), thisId, tag + " " + name);

            }

            let first = true;
            for (let thisId of ids) {
                if (first) 
                {
                    id = thisId;
                    first = false;
                } else {
                    extraTargetLinks.push((
                        <div id={thisId} key={thisId} style={{width: 0, height: 0}} >
                        </div>
                    ));
                }
            }
        } else {
            let name = indexName as string;
            id = methodId(tag, name);
            RegisterIndexEntry(removeParametersAndClass(name), id, tag + " " + name);
        }
    }
    return (
        <div className="method_description" id={id.length > 0 ? id : undefined}>

            {extraTargetLinks}
            <pre className="mono" style={{ paddingLeft: "8px", paddingTop: "12px", paddingBottom: "12px", overflowX: "auto" }}>{props.method}</pre>
            <div style={{ marginLeft: 24 }}>
                {props.children}
            </div>
        </div>
    );
}



export function ParameterList(props: { children: React.ReactNode }) {
    return (
        <div>
            <h3>Parameters</h3>
            <div className="parameter_grid" >
                {props.children}
            </div>
        </div>
    );
}

export function EnumDefinitionList(props: { children: React.ReactNode }) {
    return (
        <div>
            <div className="parameter_grid" >
                {props.children}
            </div>
        </div>
    );
}
export function FieldDefinitionList(props: { children: React.ReactNode }) {
    return (
        <div>
            <div className="property_grid" >
                {props.children}
            </div>
        </div>
    );
}

export function DefinitionList(props: { children: React.ReactNode, style?: React.CSSProperties }) {
    return (
        <div>
            <div className="parameter_grid" style={props.style} >
                {props.children}
            </div>
        </div>
    );
}

export function Returns(props: { children: React.ReactNode }) {
    return (
        <div>
            <h3>Returns</h3>
            <div className="returns" >
                {props.children}
            </div>
        </div>
    );
}