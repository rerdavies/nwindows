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

/* Elements used internally by NWindows.
   Not intended for direct consumption by 
   end users. 
*/

#pragma once 
#include "NWindows/NWindows.hpp"

namespace nwindows::private_elements
{
    class NMenuItemElement : public NButtonBaseElement {

    protected:
        NMenuItemElement(const std::string& text, int item_id);
        NMenuItemElement(const std::string& tagName);
    public:
        virtual ~NMenuItemElement() {}
        using self = NMenuItemElement;
        using super = NButtonBaseElement;
        using ptr = std::shared_ptr<self>;

        static ptr create(const std::string& text, int id) {
            return std::shared_ptr<self>(new self(text, id));
        }


        NEvent<void(NElement::ptr source, int item_id)> on_item_selected;
        NEvent<void(NElement::ptr source)> on_cancelled;
        std::string text() const { return text_; }
        void text(const std::string& value) { text_ = value; invalidate_layout(); }

        // the icon area, typically.
        std::string prefix() const { return prefix_; }
        void prefix(const std::string& value) { prefix_ = value; invalidate_layout(); }

        // the flyout icon, typically.
        std::string suffix() const { return suffix_; }
        void suffix(const std::string& value) { suffix_ = value; invalidate_layout(); }

        int item_id() const { return item_id_; }

        virtual bool wants_shortcut_key(const std::string& key) override;

    protected:
        virtual void render() override;
        virtual NSize measure(const NSize& available) override;
    private:
        std::string prefix_ = " ";
        std::string text_ = " ";
        std::string suffix_;
        int item_id_;
    };
    class NSubmenuMenuItemElement : public NMenuItemElement {
    private:
        NSubmenuMenuItemElement(const NMenuItem& submenuItem);
    public:
        static ptr create(const NMenuItem& submenu) { return std::shared_ptr<self>(new self(submenu)); }

        using self = NSubmenuMenuItemElement;
        using super = NMenuItemElement;
        using ptr = std::shared_ptr<self>;

        NEvent<void(NElement::ptr source)> on_opened;
        NEvent<void(NElement::ptr source)> on_closed;

        bool open() const { return open_; }
        void open(bool value);

    protected:
        virtual bool handle_clicked(int button, NClickedEventArgs& eventArgs) override;
        virtual void handle_attached(NWindow* window) override;
    private:
        std::shared_ptr<NPopupMenuWindow> popup_window_;
        std::vector<NMenuItem> submenu_;
        bool open_ = false;
        virtual NColorPair get_color() override;

    };

    class NDividerMenuItemElement : public NMenuItemElement {
    private:
        NDividerMenuItemElement();
    public:
        using self = NDividerMenuItemElement;
        using super = NMenuItemElement;
        using ptr = std::shared_ptr<self>;

        static ptr create() { return std::shared_ptr<self>(new self()); }
    protected:
        virtual NColorPair get_color();

        virtual void render() override;
        virtual NSize measure(const NSize& available) override;
    };


}