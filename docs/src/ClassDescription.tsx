import React from "react";
import { RegisterIndexEntry } from "./IndexBuilder";

export default function 
ClassDescription(props: { 
    children: React.ReactNode, 
    className: string, 
    prefix?: string, 
    baseClass?: string}) {

    let prefix = props.prefix || "class";
    let id = "class__" + props.className;
    let indexText = (props.prefix??"class") +" " + props.className;

    RegisterIndexEntry(props.className, id,indexText );
    return (
        <div id={id} className="nav_target" >
            <h3 style={{display: "flex", flexFlow: "row wrap", gap: 1,justifyContent: "space-between", 
                borderBottom: "1px solid #ccc", borderTop: "1px solid #ccc", marginBottom: 8, paddingRight: 16}}>
                <div>{prefix} {props.className}</div>
                {props.baseClass && <div>extends {props.baseClass}</div>}
            </h3>
            
            <div style={{ marginLeft: 32, marginRight: 16 }}>
                {props.children}
            </div>
        </div>
    );
}
export function 
EnumDescription(props: { children: React.ReactNode, name: string, prefix?: string }) {
    return (
        <ClassDescription className={props.name} prefix={props.prefix? props.prefix: "enum class"} >
            {props.children}
            </ClassDescription>
    );
}


export function PropertyList(props: { children?: React.ReactNode }) {
    return (
        <div>
            <h4 className="property_list_title">Properties</h4>
            <div className="property_grid" >
                <div className="property_grid_title">Type</div>
                <div className="property_grid_title">Property</div>
                <div className="property_grid_title">Description</div>
                
                {props.children}
            </div>
        </div>
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
            <div className="property_grid_cell_pre">{props.type}</div>
            <div className="property_grid_cell_pre" id={id}>{propertyOnly}</div>
            <div className="property_grid_cell">{props.children}</div>
        </React.Fragment>
    );
}


export function MethodDescription(props: { method: string, children?: React.ReactNode }) 
{
    let methods: React.ReactNode[];
    if (Array.isArray(props.method)) {
        methods = props.method;
    } else {
        methods = [props.method];
    }
    
    return (
        <div className="method_description">

            <pre className="mono" style={{paddingLeft: "8px",paddingTop: "12px", paddingBottom: "12px", overflowX: "auto"}}>{props.method}</pre>
            <div style={{marginLeft: 24}}>
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

export function DefinitionList(props: { children: React.ReactNode }) {
    return (
        <div>
            <div className="parameter_grid" >
                {props.children}
            </div>
        </div>
    );
}

export function Returns(props: {children: React.ReactNode}) {
    return (
        <div>
            <h3>Returns</h3>
            <div className="returns" >
                {props.children}
            </div>
        </div>
    );  
}