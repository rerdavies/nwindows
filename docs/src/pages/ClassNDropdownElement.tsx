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
import ClassDescription, { MethodDescription, ClassSectionHead, UsingDescription, PropertyList, PropertyEntry, EventDescriptions, EventDescription, MethodDescriptions, TypeDefinitions, CreateDescriptions } from '../ClassDescription';
import M, { ML } from '../M';
import CenteredImage from '../CenteredImage';

function ClassNDropdownElement() {

    let className = "NDropdownElement";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name={className} baseClass="NContainerElement">
                <p>
                    Displays a dropdown control. Menu items can be regular menu items, that optionally have Unicode icons,
                    or checkmarks, or they can be dividers. Submenus are not supported.
                </p>
                <p>Scrolling of the dropdown is not currently supported, so the number of menu items should be
                    limited to a modest amount.
                </p>
                <CenteredImage src="/nwindows/image/sample_dropdown.png" alt="Menu Element" />

                <TypeDefinitions>
                    <UsingDescription indexName={"NDropdownElement::super"} declaration="using super = NContainerElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NDropdownElement::self"} declaration="using self = NDropdownElement;" >
                    </UsingDescription>
                    <UsingDescription indexName="NDropdownElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>


                <CreateDescriptions>
                    <MethodDescription indexName={[
                        "static NDropdownElement::ptr NDropdownElement::create(const std::vector<NMenuItem>& menu_items, int selected)",
                        "static NDropdownElement::ptr NDropdownElement::create(std::vector<NMenuItem>&& menu_items, int selected)",
                        "static NDropdownElement::ptr NDropdownElement::create()"
                    ]}
                        method={`static NDropdownElement::ptr create(
    const std::vector<NMenuItem>& menu_items, 
    int selected);

static NDropdownElement::ptr create(
    std::vector<NMenuItem>&& menu_items, 
    int selected;    

static NDropdownElement::ptr create();
    `}
                    >
                        <div>
                            Return an <M>std::shared_ptr</M> to a newly-created <M>NDropdownElement</M>. Optionally set the <M>menu_items</M> and <M>selected</M> properties.
                        </div>
                    </MethodDescription>
                </CreateDescriptions>
                <ClassSectionHead text="Protected Constructors" />
                <MethodDescription indexName={[
                    `NDropdownElement::NDropdownElement(const std::vector<NMenuItem>& menu_items, int selected, const std::string&tagName="Dropdown")`,
                    `NDropdownElement::NDropdownElement(std::vector<NMenuItem>&& menu_items, int selected, const std::string&tagName="Dropdown")`,
                    `NDropdownElement::NDropdownElement(const std::string tagName="Menu")`,
                ]}
                    method={`NDropdownElement(
    const std::vector<NMenuItem>& menu_items,
    int selected, 
    const std::string&tagName="Dropdown");

NDropdownElement(
    std::vector<NMenuItem>&& menu_items, 
    int selected, 
    const std::string&tagName="Dropdown");

NDropdownElement(const std::string&tagName="Dropdown");    
`}>
                </MethodDescription>

                <PropertyList>
                    <PropertyEntry type={`std::vector<
NMenuItem>`} propertyName='NDropdownElement::menu_items'>
                        <div>The menu items in the dropdown. See <ML name="NMenuItem" /> for information on how to
                            add dividers, and Unicode menu items. If the <M>label</M> of the menu item contains
                            a '_' character, the character which follows in the label will be underlined, and treated as a
                            short-cut key for the menu item. <M>NDropdownElement</M> displays the currently-selected
                            item when showing the popup by setting focus to the selected item, so checkmarks are
                            not required, or really appropriate; however, <M>NDropdownElement</M> will display checkmarks
                            if <M>NMenuItems</M> have been configured to do so. </div>
                    </PropertyEntry>
                    <PropertyEntry type="bool" propertyName='NDropdownElement::open'>
                        <div>True if the dropdown menu is open. Set to <M>true</M> to open the menu, or <M>false</M> to close it.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="int" propertyName='NDropdownElement::selected'>
                        <div>The <ML target="NMenuItem::item_id" name="item_id" />  of the selected menu item.
                            Set to <ML name="NO_MENU_ITEM" /> if no item is selected. Set the value of the property to
                            control which item is selected when the dropdown is opened.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="NAttachment" propertyName='NDropdownElement::dropdown_attachment'>
                        <div>The attachment point of the dropdown menu. Defaults to <M>NAttachment::BottomEnd</M>. The actual position of
                            the dropdown may be adjusted to keep it onscreen.</div>
                    </PropertyEntry>
                    <PropertyEntry type="std::string" propertyName='NDropdownElement::suffix'>
                        <div>Allows customization. The decorator text used to display the dropdown icon. Defaults to "", which allows <M>NDropdownElement</M>
                            to display <M>" ⏷ "</M> if the current terminal supports that character, or <M>" v "</M> if not.</div>
                    </PropertyEntry>
                </PropertyList>


                <EventDescriptions>
                    <EventDescription indexName={`NEvent<void(NDropdownElement::ptr source, int selection)> NDropdownElement::on_selection_changed`}
                        event={`NEvent<
    void(NDropdownElement::ptr source, int selection)
> on_selection_changed;`}>
                        <div>Fired when the selected menu item changes. The <M>selection</M> parameter is the <M>item_id</M> of the selected menu item.
                        </div>
                    </EventDescription>
                    <EventDescription indexName={`NEvent<void(NDropdownElement::ptr source)> NDropdownElement::on_opening`}
                        event={`NEvent< 
    void(NDropdownElement::ptr source)
> on_opening;`}>
                        <div>Fired just before the dropdown menu is opened. Event handlers for this event can
                            set the <M>menu_item</M> property in order to change the menu items displayed if needed.
                        </div>
                    </EventDescription>
                    <EventDescription indexName={`NEvent<void(NDropdownElement::ptr source)> NDropdownElement::on_closed`}
                        event={`NEvent<
    void(NDropdownElement::ptr source)
> on_closed;`}>
                        <div>Fired just after the dropdown menu is closed.</div>
                    </EventDescription>

                </EventDescriptions>
                <MethodDescriptions>
                    <MethodDescription
                        indexName={`virtual bool NDropdownElement::wants_shortcut_key(const std::string& key) override`}
                        method={`virtual bool wants_shortcut_key(
    const std::string& key
) override;`}>
                        <div>Overrides <ML fullName name="NElement::wants_shortcut_key" />. The default implementation
                            returns <M>true</M> if the key is the shortcut key for <M>label</M>. {

                            }.</div>
                    </MethodDescription>
                </MethodDescriptions>

            </ClassDescription>
        </DocsPage>
    );
}
export default ClassNDropdownElement;
