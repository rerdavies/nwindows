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

#include "ConsoleFontManager.hpp"

using namespace nwindows;
using namespace nwindows::internal;

ConsoleFontManager::ConsoleFontManager()
{
}

ConsoleFontManager::~ConsoleFontManager()
{

}

#ifdef WIN32
// Not a windows thing. Nothing to see here.
ConsoleFontManager::ptr ConsoleFontManager::create()
{
    // do absolutely nothing on Windows.
    return std::share_ptr<self >(new ConsoleFontManager());
}

#else

#include "NWindows/ConsoleFont.hpp"
#include "SyntheticCharacters.hpp"


namespace nwindows::internal {
    class ConsoleFontManagerImpl : public ConsoleFontManager
    {
    public:
        ConsoleFontManagerImpl();
        virtual ~ConsoleFontManagerImpl();

    private: 
        ConsoleFont::ptr oldFont;
        ConsoleFont::ptr newFont;

    };

}

using namespace nwindows::internal;

ConsoleFontManager::ptr ConsoleFontManager::create()
{
    return std::shared_ptr<ConsoleFontManagerImpl>(new ConsoleFontManagerImpl());
}

ConsoleFontManagerImpl::ConsoleFontManagerImpl()
{

    this->oldFont = ConsoleFont::create();
    if (this->oldFont->can_get_console_font())
    {
        try {
            this->oldFont->get_console_font();
            this->newFont = oldFont->clone();
            add_synthetic_characters(this->newFont);
            this->newFont->set_console_font();

        } catch (const std::exception&e)
        {
            this->oldFont = nullptr;
            this->newFont = nullptr;
        }
    } else {
        this->oldFont = nullptr;
    }
}

ConsoleFontManagerImpl::~ConsoleFontManagerImpl()
{
    if (oldFont) 
    {
        oldFont->set_console_font(); // restore the EGA/VGA character roms.

    }
}





#endif // WIN32