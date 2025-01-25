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
import ClassDescription, { MethodDescription, ClassSectionHead, UsingDescription, PropertyList, PropertyEntry, EventDescriptions, MethodDescriptions, TypeDefinitions } from '../ClassDescription';
import M, { ML } from '../M';

function ClassNButtonBaseElement() {

    let className = "NButtonBaseElement";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name={className} baseClass="NContainerElement">
                <p>
                    <M>NButtonBaseElement</M> provides a base class for  control elements that need to display
                    focus, hover, and pressed states.
                </p>
                <p>Classes that derive from <M>NButtonBaseElement</M> will need to 
                    override <ML fullName name="NElement::measure"/>, and <ML fullName name="NElement::render"/>. <M>NButtonBaseElement</M> overrides <M>NElement</M> methods
                    in order to track state 
                    (<ML name="NButtonBaseElement::pressed"/>, <ML name="NElement::is_focused"/>, <ML name="NElement::mouse_entered" />), and invalidates 
                    the rendering of the element whenever state changes. 
                </p>
                <p>By default, <M>NButtonBaseElement</M> sets the <ML fullName name="NElement::focusable"/> and <ML fullName name="NElement::clickable" /> properties 
                to <M>true</M>. <M>NButtonBaseElement</M> also provides keyboard handling of the space key which simulates a mouse button press and subsequently fires
                an <ML fullName name="NElement::on_clicked"/> event.
                </p>

                <TypeDefinitions>
                    <UsingDescription indexName={"NButtonBaseElement::super"} declaration="using super = NContainerElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NButtonBaseElement::self"} declaration="using self = NButtonBaseElement;" >
                    </UsingDescription>
                    <UsingDescription indexName="NButtonBaseElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>


                <ClassSectionHead text="Protected Constructors" />
                <MethodDescription indexName={[
                    `NButtonBaseElement::NButtonBaseElement(const std::string &tagName)`
                ]}
                    method={`NButtonBaseElement(
    const std::string &tagName="Button");`}>
                </MethodDescription>
                <PropertyList title="Protected Properties">
                    <PropertyEntry type="bool" propertyName='NButtonBaseElement::pressed'>
                        <div>Read only. True if the element is in pressed state.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="NColorPair" propertyName='NButtonBaseElement::disabled_color'>
                        <div>Read only. Uses <ML fullName name="NWindow::color_palette" /></div> values.
                    </PropertyEntry>
                    <PropertyEntry type="NColorPair" propertyName='NButtonBaseElement::hover_color'>
                        <div>Read only. Uses <ML fullName name="NWindow::color_palette" /></div> values.

                    </PropertyEntry>
                    <PropertyEntry type="NColorPair" propertyName='NButtonBaseElement::focus_color'>
                        <div>Read only. Uses <ML fullName name="NWindow::color_palette" /></div> values.

                    </PropertyEntry>
                    <PropertyEntry type="NColorPair" propertyName='NButtonBaseElement::select_color'>
                        <div>Read only. Uses <ML fullName name="NWindow::color_palette" /></div> values.

                    </PropertyEntry>
                    <PropertyEntry type="NColorPair" propertyName='NButtonBaseElement::normal_color'>
                        <div>Read only. Uses <ML fullName name="NWindow::color_palette" /></div> values.

                    </PropertyEntry>

                </PropertyList>
                <EventDescriptions>
                    <p><M>NButtonBaseElement</M> fires the <ML fullName name="NElement::on_click"/> event in response to mouse and keyboard events.</p>
                </EventDescriptions>
                <MethodDescriptions title="Protected Methods">
                    <p><M>NButtonBaseElement</M> overrides numerous <M>NElement</M> methods as part of its implementation. These overrides are not documented 
                    here. Refer to <M>NWindows/NWindows.hpp</M> for a completed list of overridden methods.</p>
                    <MethodDescription indexName="NColorPair NButtonBaseElement::get_color()"
                        method={`virtual NColorPair get_color);`}>
                        <div>
                            Returns an <ML fullName name="NColorPair" /> that reflects the current state of the element (pressed, hovering, focused). The 
                            default implementation returns a value appropriate for a button. Derived classes can override this 
                            if they need to customize the appearance of the state of the element.
                        </div>
                    </MethodDescription>
                </MethodDescriptions>

            </ClassDescription>
        </DocsPage>
    );
    /*
    class NButtonBaseElement : public NContainerElement {
    private:
        NButtonBaseElement();
    protected:
        NButtonBaseElement(const std::string& tagName);

    public:
        virtual ~NButtonBaseElement() {}

        using super = NContainerElement;
        using self = NButtonBaseElement;
        using ptr = std::shared_ptr<self>;

        static ptr create() { return std::shared_ptr<self>(new self()); }



    protected:
        virtual void handle_attached(NWindow* window) override;

        virtual void render() override;

        virtual void render_outer() override;

        virtual bool handle_key(NKeyEventArgs& event_args) override;
        virtual bool handle_key_code(NKeyCodeEventArgs& event_args) override;

        virtual NColorPair get_color();

        virtual bool handle_mouse_leave(NMouseEventArgs& event_args) override;
        virtual bool handle_mouse_enter(NMouseEventArgs& event_args) override;
        virtual bool handle_mouse_button_pressed(NMouseButton button, NMouseEventArgs& event_args) override;
        virtual bool handle_mouse_button_released(NMouseButton button, NMouseEventArgs& event_args) override;
        virtual void handle_focused(bool);
        bool pressed() { return pressed_; }
    protected:
        NColorPair disabled_color() const { return disabled_color_; }
        NColorPair hover_color() const { return hover_color_; }
        NColorPair focus_color() const { return focus_color_; }
        NColorPair select_color() const { return select_color_; }
        NColorPair normal_color() const { return normal_color_; }


    private:
        NColorPair disabled_color_;
        NColorPair hover_color_;
        NColorPair focus_color_;
        NColorPair select_color_;
        NColorPair normal_color_;


        bool pressed_ = false;


    };
    */
}
export default ClassNButtonBaseElement;
