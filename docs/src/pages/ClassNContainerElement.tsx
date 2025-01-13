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
import ClassDescription, { MethodDescription, ClassSectionHead, UsingDescription, PropertyList, PropertyEntry, MethodDescriptions } from '../ClassDescription';
import M from '../M';
import { Link } from 'react-router-dom';
import { DocsLink } from '../ClassDescription';
import Code from '../Code';

function ClassNContainerElement() {

    return (
        <DocsPage route="/apis/classes/NContainerElement">
            <h1>{DocsTitle("/apis/classes/NContainerElement")}</h1>

            <ClassDescription name="NContainerElement" baseClass="NElement">
                <p>
                    <M>NContainerElement</M> is the base class for all elements that have child elements.
                </p>
                <p>Custom classes that derive from NContainerElement must measure
                    override <M>handle_measure</M> and <M>handle_arrange</M> in order
                    to provide layout for their child elements. See
                    the <DocsLink route="/using/custom/full#section__layout" directId='section__Layout'>Layout</DocsLink> section
                    of the <i><Link to="/using/custom/full">Fully-Custom Elements</Link></i> page for details how to implement custom layout.</p>

                <ClassSectionHead text="Type Definitions" />
                <UsingDescription indexName={"NContainerElement::super"} declaration="using super = NElement;" >
                </UsingDescription>
                <UsingDescription indexName={"NContainerElement::self"} declaration="using self = NContainerElement;" >
                </UsingDescription>
                <UsingDescription indexName="NContainerElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                </UsingDescription>

                <ClassSectionHead text="Protected Constructors" />
                <MethodDescription indexName={["NContainerElement::NContainerElement(const std::string& tag)"]}
                    method='NContainerElement::NContainerElement(const std::string& tag)' >
                    Protected constructor. Initializes the tag property, which uniquely identifies the
                    type of the element.
                </MethodDescription>

                <PropertyList>
                    <PropertyEntry propertyName="NContainerElement::children"
                        type={`std::vector<
NElement::ptr>&`}>
                        The child elements of this container. Do not add or remove elements directly;
                        use the <M>add_child</M> and <M>remove_child</M> methods instead.
                    </PropertyEntry>
                </PropertyList>
                <MethodDescriptions>
                    <MethodDescription indexName={`bool NContainerElement::is_container() const`}
                        method={`virtual bool is_container() const override;`} >
                        Overridden to return <M>true</M>, indicating that this element can be
                        cast to type <M>NContainerElement</M>.
                    </MethodDescription>
                    <MethodDescription indexName={[
                        "void NContainerElement::add_child(const NElement::ptr& child)",
                        "void NContainerElement::add_child(NElement::ptr&& child)"]}
                        method={`void add_child(NElement::ptr&& child);
void add_child(const NElement::ptr& child);`}>
                        Adds a child element to the container.
                    </MethodDescription>
                    <MethodDescription indexName={`void NContainerElement::add_children<T>(const std::vector<std::shared_ptr<T>>& children)`}
                        method={`template <typename T>
void add_children(
    const std::vector<
        std::shared_ptr<T>
    >& children
);`} >
                        Add multiple child elements to the container.
                    </MethodDescription>
                    <MethodDescription indexName={
                        [`void NContainerElement::remove_child(NElement::ptr child)`,
                            `void NContainerElement::remove_child(NElement* child)`]}
                        method={`void remove_child(NElement::ptr child);
void remove_child(NElement* child);`} >
                        Removes a child element from the container. The child element may be deleted
                        before the method returns if the container holds the last <M>shared_ptr</M> reference
                        to the child.
                    </MethodDescription>
                    <MethodDescription indexName={`void NContainerElement::remove_all_children()`}
                        method={`void remove_all_children();`} >
                        Removes all child elements from the container.
                    </MethodDescription>

                    <MethodDescription indexName={["NElement::ptr NContainerElement::get_element_at(int x, int y)",
                        "NElement::ptr NContainerElement::get_element_at(const NPoint&pt)"]}
                        method={`NElement::ptr get_element_at(int x, int y);
NElement::ptr get_element_at(const NPoint&pt);`}>
                        <p>
                            Get the topmost child element of the current element whose bounds contains the point (x,y). Returns an empty pointer
                            if no element is found at the point. The point is specified in window coordinates. To search the entire visual
                            tree call</p>
                        <Code text={'window()->get_element_at(x,y)'} />
                    </MethodDescription>

                    <MethodDescription indexName="NElement::ptr NContainerElement::find_child_element(const std::function<bool(NElement&)>& predicate);"
                        method={`virtual NElement::ptr 
find_child_element(
    const std::function<bool(NElement&)>& predicate
);
`} >
                        <p>Search the children of the current element for an element that satisfies the predicate. Returns a shared pointer to the element
                            if found, otherwise returns an empty pointer. The search is performed in
                            depth-first order.</p>
                    </MethodDescription>
                    <MethodDescription indexName="virtual void NContainerElement::for_each_element(const std::function<void(NElement&)>& callback);"
                        method={`virtual void for_each_element(
    const std::function<void(NElement&)>& callback
);`} >
                        <p>Recursively enumerate the element and all its child elements, executing the <M>callback</M> function for each. Elements are enumerated
                            in depth-first order.</p>
                    </MethodDescription>
                    <MethodDescription indexName={[
                        "virtual NSize NContainerElement::measure(const NSize& available)",
                        "virtual void NContainerElement::arrange(const NRect& bounds)"
                    ]} method={`virtual NSize measure(const NSize& available);
virtual void arrange(const NRect& bounds);`}>
                        <p>The  <DocsLink route="/using/custom/full" directId="section__Layout">Layout</DocsLink> section
                            of the <i>Fully-Custom Elements</i> page provides a
                            full discussion of layout, along with example code, and details on handling of margins in implementations of <M>measure</M> and <M>arrange</M>.</p>
                        <p>These methods are called during the layout pass of the element tree.</p><p>The <M>measure</M> method is called
                            on each element in the tree, starting at the root, and working down to the leaves. <M>NContainerElement</M>s
                            are responsible for measuring their own children and must call <M>measure</M> on each of their children whether
                            they need the measure of  their children or not. The <M>measure</M> method
                            is called with the available space for the element, and returns the desired size of the element.</p>
                        <p>The <M>arrange</M>
                            method is called on each element in the tree, starting at the leaves and working up to the root. <M>NContainerElement</M>s
                            are responsible for calling <M>arrange</M> on each of their children.
                            method is called with the bounds of the element. Container elements are expected to lay out their children within those bounds as
                            it sees fit. Implementations of <M>arrange</M> must call the <M>arrange</M> method of their superclass, since <M>NElement::arrange</M> sets
                            the actual layout bounds of the element that will be used during rendering.
                        </p>
                        <p>The default implementation of <M>measure</M> and <M>arrange</M> in <M>NContainerElement</M> wraps itself
                            around a single child element. If you are writing a compound control, this is actually useful behavior.
                            The default behavior when there is more than one child is not specified, and should not be relied upon.</p>
                    </MethodDescription>
                    <MethodDescription indexName="void NContainerElement::render()" method="virtual void render()" >
                        <p>Called to render the element. The render method should render the element's own content only,
                            and not the content of its children. NWindows takes care of calling the render method for each child in
                            appropriate order. Custom elements that inherit from <M>NContainerElement</M> that are concerned
                            solely with performing layout of child elements don't need to implement this method at all.
                        </p>
                        <p> If the element does render, the element should render itself entirely within the
                            confines of its layout bounds.  The space in which an element should render its contents
                            (in element coordinates) is  determined by the rectangle which encloses (0,0),
                            actual_width() and actual_height().
                        </p>
                    </MethodDescription>
                    <MethodDescription indexName="void NContainerElement::invalidate_render()"
                        method="virtual void invalidate_render() override" >
                        <p>Invalidates the rendering of the element. The element will be redrawn during the next rendering pass.</p>
                        <p>The <M>NContainerElement::invalidate_render</M> also recursively calls <M>invalidate_render</M> on
                            all of its child elements.</p>
                    </MethodDescription>
                </MethodDescriptions>
                
                <MethodDescriptions title='Protected Methods'>
                    <MethodDescription indexName="NSize NContainerElement::measure_child_with_margins(const NSize& available, NElement::ptr& child);"   
                        method={`NSize measure_child_with_margins(
    const NSize& available,
    NElement::ptr& child
);`} >
                        <p>A utility function for measuring a child element, taking into account the value of the child's margins property.
                            Custom elements that override <M>NContainerElement::measure</M> should use this method to measure their children.</p>
                        <p>The method subtracts the child's margins from the provided <M>available</M> space, calls the 
                        child's measure method, and then adds margins back onto the size the child's measure method returns.</p>
                        <p>The method correctly handles <M>AUTO_SIZE</M> values in the supplied <M>available</M> argument, if required,
                        and deals with cases where the applied margins are larger than the available space. 
                        </p>
                    </MethodDescription>
                    <MethodDescription indexName="virtual void NContainerElement::render_outer()" 
                        method="virtual void render_outer() override;" >
                            <p>The method which implements distribution of <M>render</M> calls through the visual 
                            tree. The default implementation calls <M>render</M> on the current element, and 
                            then <M>render_outer()</M> on each child element.</p>
                            <p>Custom elements should not under any imaginable circumstance need to override this method.</p>
                    </MethodDescription>
                </MethodDescriptions>

            </ClassDescription>

        </DocsPage>

    );
}
export default ClassNContainerElement;
