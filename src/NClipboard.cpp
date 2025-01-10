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

#include "NWindows/NClipboard.hpp"
#include <thread>



#ifdef WIN32
#include <Windows.h>
namespace nwindows
{

    class WindowsClipboardImpl : public NClipboard
    {
    public:
        void set_text(const std::string& text) override;
        std::string get_text() override;
    };


    void WindowsClipboardImpl::set_text(const std::string& text)
    {
        if (!OpenClipboard(nullptr))
        {
            return;
        }

        EmptyClipboard();

        auto hglbCopy = GlobalAlloc(GMEM_MOVEABLE, text.size() + 1);
        if (hglbCopy == nullptr)
        {
            CloseClipboard();
            return;
        }

        auto lptstrCopy = static_cast<char*>(GlobalLock(hglbCopy));
        if (lptstrCopy == nullptr)
        {
            GlobalFree(hglbCopy);
            CloseClipboard();
            return;
        }

        memcpy(lptstrCopy, text.c_str(), text.size() + 1);
        GlobalUnlock(hglbCopy);

        SetClipboardData(CF_TEXT, hglbCopy);

        CloseClipboard();
    }

    std::string WindowsClipboardImpl::get_text()
    {
        if (!OpenClipboard(nullptr))
        {
            return "";
        }

        auto hglb = GetClipboardData(CF_TEXT);
        if (hglb == nullptr)
        {
            CloseClipboard();
            return "";
        }

        auto lptstr = static_cast<char*>(GlobalLock(hglb));
        if (lptstr == nullptr)
        {
            CloseClipboard();
            return "";
        }

        std::string text(lptstr);
        GlobalUnlock(hglb);

        CloseClipboard();

        return text;
    }

    static NClipboard::ptr create()
    {
        return std::make_shared<WindowsClipboardImpl>();
    }
}

#else

#include "Finally.hpp"
#include "unistd.h"
#include <filesystem>
#include <string>
#include <format>

namespace nwindows
{
    using namespace std;
    namespace fs = std::filesystem;

    static std::filesystem::path findOnSystemPath(const std::string& command)
    {
        if (command.length() != 0 && command[0] == '/')
        {
            return command;
        }
        std::string path = "/usr/bin:/usr/sbin";
        std::vector<std::string> paths;
        size_t t = 0;
        while (t < path.length())
        {
            size_t pos = path.find(':', t);
            if (pos == string::npos)
            {
                pos = path.length();
            }
            std::string thisPath = path.substr(t, pos - t);
            std::filesystem::path path = std::filesystem::path(thisPath) / command;
            if (std::filesystem::exists(path))
            {
                return path;
            }
            t = pos + 1;
        }
        std::stringstream s;
        s << "'" << command << "' is not installed.";
        throw std::runtime_error(s.str());
    }

    struct SysExecOutput
    {
        int exitCode;
        std::string output;
    };

    SysExecOutput sysExecForOutput(const std::string& program, const std::string& args)
    {
        namespace fs = std::filesystem;
        fs::path fullPath = findOnSystemPath(program);
        if (!fs::exists(fullPath))
        {
            throw std::runtime_error(std::format("Path does not exist. {}",fullPath.string()));
        }
        std::stringstream s;
        s << fullPath.c_str() << " " << args << " 2>&1";

        std::string fullCommand = s.str();
        FILE* output = popen(fullCommand.c_str(), "r");
        if (output)
        {
            char buffer[512];
            std::stringstream ssOutput;

            while (!feof(output))
            {
                size_t nRead = fread(buffer, sizeof(char), sizeof(buffer), output);
                ssOutput.write(buffer, nRead);
                if (nRead == 0)
                    break;

            }
            int rc = pclose(output);
            SysExecOutput result
            {
                .exitCode = rc,
                .output = ssOutput.str()
            };
            return result;
        }
        else {
            throw std::runtime_error(std::format("Failed to execute command. {}",fullCommand));
        }

    }



    class LinuxClipboard : public NClipboard {
    private:
        std::string text_;

    public:
        LinuxClipboard() {

        }
        ~LinuxClipboard() {
        }


        bool available() const override {
            return true;
        }


        // Write text to clipboard
        bool set_text(const std::string& text) override {

            text_ = text; // incase xclip isn't installed.
            // Unix/Linux implementation using xclip
            FILE* pipe = popen("xclip -selection clipboard 2> /dev/null", "w");
            if (!pipe) return false;

            fputs(text.c_str(), pipe);
            pclose(pipe);
            return true;
        }
        std::string get_text() {
            try {
                auto output = sysExecForOutput("xclip", "-selection clipboard -o");
                if (output.exitCode != EXIT_SUCCESS)
                {
                    return text_;
                }
                return output.output;
            } catch (const std::exception&e)
            {
                return text_;
            }
        }
    private:
        std::string clipboard_text;
    };

    NClipboard::ptr NClipboard::create()
    {
        return std::make_shared<LinuxClipboard>();
    }



} // namespace nwindows
#endif
