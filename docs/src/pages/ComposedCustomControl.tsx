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
import M from '../M';
import SectionHead from '../SectionHead';
import CodeDiv from '../Code';



function ComposedCustomControl() {
    return (
        <DocsPage route="/using/custom/compose">
            <h1>{DocsTitle("/using/custom/compose")}</h1>
            <p> Another fairly simple way to implement custom elements is to use compound elements.
                Compound elements wrap one or more
                existing controls in a new control that provides additional functionality. This is a good way to implement
                custom controls that don't require a lot of new functionality, or that can be implemented as a combination of
                existing controls.
            </p>
            <SectionHead text='Compound Control Example' />
            <p>There are a few of slightly-awkward issues when implementing compound controls. This example shows how
                to deal with them.
            </p>
            <ul>
                <li><p>NWindows uses <M>std::weak_ptr&lt;&gt;</M>s internally, as well as using <M>shared_from_this()</M> and 
                <M>weak_from_this()</M> calls perhaps more often than it really should. Because of this, you will have to
                    create the compound element's <M>std::shared_ptr&lt;&gt;</M> before you add children to it. To deal with 
                    this situation, use an <M>Init</M> method to attach children to the compound element, and then have 
                    the element's <M>create</M> method call <M>Init</M> before returning the new element.
                </p></li>

                <li><p>
                    Manipulator syntax doesn't work well in member functions of <M>NElements</M> because scope rules find the
                    property declarations for the member function to which the manipulator refers before the manipulator declarations are found.
                    The solution to this is either to provide explicit namespaces for the manipulators, or to fall back direct method calls to
                    assemble child elements. The example uses the latter strategy.
                </p></li>
                <li><p>Compound elements don't have access to an <M>NWindow</M> object, when being constructed. If your compound element 
                needs access to <M>NWindows</M> properties or methods, it should override <M>NElement::handle_attached</M>. The call 
                to <M>handle_attached</M> is the first point in the element's lifecycle at which an <M>NWindow</M> element becomes available
                to a custom element.</p>
                </li>
            </ul>
            <p>The sample creates a compound element that displays a bullet, and then displays its children with a hanging indents.</p>
            <p>A compound control inherits from <M>NContainerElement</M>, and assembles its child elements using <M>NContainerElement</M>
            methods. The default <M>NContainerElement</M> implementation doesn't implement complex layout. However, it deals with one 
            and only one child element perfectly well, wrapping itself tightly around the child control. And you can use 
            NWindows layout elements to provide  more complex layout of your custom element's children.</p>
            <CodeDiv showLines text={`class BulletListElement {
private: 
    BulletListElement(): NContainerElement("BulletList") { }
    void Init(int width) {
        auto horizontal_container = NHorizontalStackElement::create()
        | nwindows::column_gap(3)
        super::add_child(horizontal_container);

        this->bulletText_ = NTextElement::create("*");
        bulletText->width(4);
        horizontal_container->add_child(this->bulletText_);

        auto child_container = NVerticalStackElement::create();
        child_container->row_gap(1);
        // layout all children with the same width
        child_container->alignment(NAlignment::Justify); 
        this->child_container_ = child_container;
        horizontal_container->add_child(child_container);

        this->width(width);

    }
public:
    using self = BulletListElement;
    using super = NContainerElement;
    using ptr = std::shared_ptr<self>;

    static ptr create(int width = AUTO_SIZE) {

        // create the shared_ptr before adding children.
        ptr result = new self{}; 

        result->Init(width);

    virtual void add_child(NElement::ptr child) override {
        child_container_->add_child(child);
    }

    virtual void remove_child(NElement::ptr child) override {
        child_container_->remove_child(child);
    }

    virtual void width(int value) override {
                // For illustration only.
                // Layout actually works fine without this.
                // You might need to do this sort of thing in 
                // elements with more complex layout.
        super::width(value);
        if (width == AUTO_SIZE) {
            child_container_->width(AUTO_SIZE);
        } else {
            child_container_->width(value - 4);
        }
    }
protected:
    virtual void handle_attached(NWindow*window) override {
        super::handle_attached(window);
        // do stuff that requires an NWindow here.
        if (window->can_display_character(U'•'))
        {
            // use a unicode bullet.
            bulletText_->text("•");
        } else {
            // fall back to an ASCII bullet.
            bulletText_->text("*");
        }
    }
private:
    NTextElement::ptr bulletText_;
    NVerticalStackElement::ptr child_container_;
};`} />
            <p>Here's how you might use the <M>BulletListElement</M> class:</p>
            <CodeDiv showLines text={`auto bullet_list = BulletListElement::create(200);

};`} />


        </DocsPage>

    );
}

export default ComposedCustomControl;
