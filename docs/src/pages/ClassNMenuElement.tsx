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

function ClassNMenuElement() {

    let className = "NMenuElement";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name={className} baseClass="NContainerElement">
                <p>
                    Displays a single menu item header. Menu items can be regular menu items, that optionally have Unicode icons,
                    or checkmarks, or they can be submenus, or they can be dividers.
                </p>
                <div style={{ display: "flex", flexFlow: "row nowrap", columnGap: 16, justifyContent: "start", alignItems: "flex-start" }}>
                    <div style={{ flex: "1 1 0px" }} />
                    <img src="/nwindows/image/sample_menuelement.png" style={{ flex: "0 1 auto" }} alt="Menu" />
                    <img src="/nwindows/image/sample_menu_icons.png" style={{ flex: "0 1 auto" }} alt="Menu Icons" />
                    <div style={{ flex: "1 1 0px" }} />
                </div>
                <p><M>MenuItem</M> is very basic implementation, although it is perfectly serviceable as is. <M>MenuItem</M>s currently participate
                    in focus navigation like any other control. A more sophisticated implementation might provide a menu bar element as
                    well, that manages focus trapping (maintaining a separate focus for
                    non-menubar elements) and might add F10-keys support; but NWindows does
                    not currently provide anything like that. It's not entirely clear that a menu bar is even supportable in a TUI application, to be honest.
                    But if you decide that you really want one, and decide to implement one for your own use, and are brave enough to wade through
                    some fairly complex UI issues, we'd be happy to consider a pull request for a workable
                    TUI menu bar if you'd be willing to contribute one. </p>

                <TypeDefinitions>
                    <UsingDescription indexName={"NMenuElement::super"} declaration="using super = NContainerElement;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NMenuElement::self"} declaration="using self = NMenuElement;" >
                    </UsingDescription>
                    <UsingDescription indexName="NMenuElement::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>


                <CreateDescriptions>

                    <MethodDescription indexName={[
                        "static NMenuElement::ptr NMenuElement::create(const std::string& label, std::vector<NMenuItem>&& menu_items)",
                        "static NMenuElement::ptr NMenuElement::create(const std::string& label, const std::vector<NMenuItem>& menu_items)",
                        "static NMenuElement::ptr NMenuElement::create()"
                    ]}
                        method={`static NMenuElement::ptr create(
    const std::string& label,
    std::vector<NMenuItem>&& menu_items);

static NMenuElement::ptr create(
    const std::string& label,
    const std::vector<NMenuItem>& menu_items);    

static NMenuElement::ptr create();
    `}
                    >
                        <div>
                            Return an <M>std::shared_ptr</M> to a newly-created <M>NMenuElement</M>. Optionally set the <M>label</M> and <M>menu_items</M> properties.
                        </div>
                    </MethodDescription>
                </CreateDescriptions>
                <ClassSectionHead text="Protected Constructors" />
                <MethodDescription indexName={[
                    "NMenuElement::NMenuElement(const std::string &label, std::vector<NMenuItem>&& menu_items)",
                    "NMenuElement::NMenuElement(const std::string &label, const std::vector<NMenuItem>& menu_items)"
                ]}
                    method={`NMenuElement(
    const std::string& label,
    std::vector<NMenuItem>&& menu_items, 
    const std::string tagName="Menu");
    
NMenuElement(
    const std::string& label,
    const std::vector<NMenuItem>& menu_items, 
    const std::string tagName="Menu");
`}>
                    <div>
                        Constructs a <M>NMenuElement</M> with a label and a vector of menu items.
                    </div>
                </MethodDescription>

                <PropertyList>
                    <PropertyEntry type="std::string" propertyName='NMenuElement::label'>
                        <div>The label to display in the header of the menu item. If the '_' character is found
                            in the label, the following character will be underlined and will be the shortcut key for the menu item.
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type={`std::vector<
NMenuItem>`} propertyName='NMenuElement::menu_items'>
                        <div><p>The list of menu items that are displayed in the menu element's dropdown.
                            See <ML name="NMenuItem" /> for details on how to specify icons, checkmarks, submenus, and dividers in
                            the dropdown menu.
                        </p>
                            <p>If you need to update checkmarks, or enable or disable individual menu items, you will have to set
                                all of the items to new values. NMenuElement does not provide a way to update individual menu items.
                                And once the menu is open, there's no way to update values.
                                However, you can update the item list in a handler for the <M>on_opening</M> event, which fires before the
                                popup window is created.
                            </p>
                        </div>
                    </PropertyEntry>
                    <PropertyEntry type="bool" propertyName='NMenuElement::open'>
                        <div>Whether the menu is open or closed. If set to <M>true</M>, the menu will open; if set to <M>false</M>,
                            the menu will close.</div>
                    </PropertyEntry>
                    <PropertyEntry type={`enum class
NAttachment`} propertyName='NMenuElement::menu_attachment'>
                        <div>Specifies where the menu will be attached to the parent window. This is used to determine the position of the
                            menu dropdown. The default is <M>NAttachment::BottomStart</M>. See <ML name="NAttachment" /> for a description
                            of choices for window positioning.</div>
                    </PropertyEntry>
                    <PropertyEntry type="std::string" propertyName='NMenuElement::prefix'>
                        <div>Text to display before the label. Defaults to " ". </div>
                    </PropertyEntry>
                    <PropertyEntry type="std::string" propertyName='NMenuElement::suffix'>
                        <div>Text to display after the label. Defaults to " ". </div>
                    </PropertyEntry>
                </PropertyList>


                <EventDescriptions>
                    <EventDescription indexName={`NEvent<void(NMenuElement::ptr source)> NMenuElement::on_opening`}
                        event={`NEvent<
    void(NMenuElement::ptr source)
> on_opening;`}>
                        <div>Fired before the menu dropdown opens. If you need to update menu items, you can set
                            the <M>menu_items</M> property in the handler for this event.
                        </div>
                    </EventDescription>
                    <EventDescription indexName={`NEvent<void(NMenuElement::ptr source)> NMenuElement::on_closed`}
                        event={`NEvent<
    void(NMenuElement::ptr source)
> on_closed;`}>
                        <div>Fired after the menu dropdown closes.</div>
                    </EventDescription>
                    <EventDescription indexName={`NEvent<void(NMenuElement::ptr source, int selection)> NMenuElement::on_item_selected`}
                        event={`NEvent<
    void(NMenuElement::ptr source, int selection)
> on_item_selected;`}>
                        <div>Fired when a menu item is selected. The <M>selection</M> parameter is the index of the selected menu item.
                        </div>
                    </EventDescription>

                </EventDescriptions>
                <MethodDescriptions>
                    <MethodDescription
                        indexName={`virtual bool NMenuItem::wants_shortcut_key(const std::string& key) override`}
                        method={`virtual bool wants_shortcut_key(
    const std::string& key
) override;`}>
                        <div>Overrides <ML name="NElement::wants_shortcut_key" />. The default implementation
                            returns <M>true</M> if the key is the shortcut key for <M>label</M>. {

                            }.</div>
                    </MethodDescription>
                </MethodDescriptions>

            </ClassDescription>
        </DocsPage>
    );
}
export default ClassNMenuElement;
