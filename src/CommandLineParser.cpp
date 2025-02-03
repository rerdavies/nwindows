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

#include "CommandLineParser.hpp"
#include <getopt.h>
#include <stdexcept>
#include <sstream>
#include <iostream>

#undef SS

 // usage:   SS("xyz" << 123 << 45.6) returning a std::string rvalue.
#define SS(x) ( ((std::stringstream&)(std::stringstream() << x )).str())



using namespace rerdavies;

CommandLineOptionBase::CommandLineOptionBase(char shortName, const std::string& longName)
    :shortName(shortName), longName(longName)
{

}
CommandLineOptionBase::~CommandLineOptionBase() {
}

char CommandLineOptionBase::ShortName() const {
    return shortName;
}
const std::string& CommandLineOptionBase::LongName() const {
    return  longName;
}


CommandLineOptionBase* CommandLineParser::FindLongOption(const std::string& longName)
{
    CommandLineOptionBase* result = nullptr;

    for (auto option : options)
    {
        if (option->LongName().starts_with(longName))
        {
            if (result != nullptr)
            {
                throw std::runtime_error(SS("Ambiguous option: " << longName));
            }
            result = option.get();
        }
    }
    return result;
}
CommandLineOptionBase* CommandLineParser::FindShortOption(char shortName)
{
    for (auto option : options)
    {
        if (option->ShortName() == shortName)
        {
            return option.get();
        }
    }
    return nullptr;

}


void CommandLineParser::Parse(int argc, char** argv)
{
    ++argv; --argc;

    while (argc)
    {
        std::string arg = *argv++;
        --argc;

        if (arg.starts_with("--"))
        {
            if (arg == "--") {
                break;
            }
            auto argPos = arg.find_first_of(":=+-",2);
            if (argPos != std::string::npos)
            {
                auto* longOption = FindLongOption(arg.substr(2, argPos - 2));
                if (longOption == nullptr)
                {
                    throw std::runtime_error(SS("Unknown option: " << arg.substr(0, argPos)));
                }
                std::string value;
                switch (arg[argPos])
                {
                case '+':
                    value = "+";
                    break;
                case '-':
                    value = "-";
                    break;
                default:
                    value = arg.substr(argPos + 1);
                    break;
                }

                try {
                    longOption->Parse(value);
                }
                catch (const std::exception& e) {
                    throw std::runtime_error(SS(value << " is not a valid value for  option " << arg.substr(0, argPos)));
                }
            }
            else {
                auto* longOption = FindLongOption(arg.substr(2));
                if (longOption == nullptr)
                {
                    throw std::runtime_error(SS("Unknown option: " << arg));
                }
                if (longOption->TakesValue()) {
                    if (argc == 0) {
                        throw std::runtime_error(SS("Missing value for option " << arg));
                    }
                    longOption->Parse(*argv++);
                    --argc;
                }
                else {
                    longOption->Parse("");
                }
            }
        }
        else if (arg.starts_with("-"))
        {
            if (arg == "-")
            {
                break;
            }
            size_t ix = 1;
            while (ix < arg.length())
            {
                char c = arg[ix++];
                auto* shortOption = FindShortOption(c);
                if (shortOption == nullptr)
                {
                    throw std::runtime_error(SS("Unknown option: " << c));
                }
                if (ix < arg.length() && (arg[ix] == ':' || arg[ix] == '=')) {
                    try {
                        shortOption->Parse(arg.substr(ix + 1));
                    }
                    catch (const std::exception&)
                    {
                        throw std::runtime_error(SS("Invalid value for option -" << c));
                    }
                    break;
                }
                else if (ix < arg.length() && (arg[ix] == '-' || arg[ix] == '+')) {

                    std::string value = arg.substr(ix, 1);
                    ++ix;
                    try {
                        shortOption->Parse(value);
                    }
                    catch (const std::exception&)
                    {
                        throw std::runtime_error(SS(value << " is not valid for option -" << c));
                    }
                }
                else {
                    if (shortOption->TakesValue()) {
                        if (ix != arg.length()) {
                            throw std::runtime_error(SS("Missing value for option -" << c));
                        }
                        if (argc == 0) {
                            throw std::runtime_error(SS("Missing value for option -" << c));
                        }
                        try {
                            shortOption->Parse(*argv);
                        }
                        catch (const std::exception&)
                        {
                            throw std::runtime_error(SS(*argv << " is not valid for option -" << c));

                        }
                        ++argv;
                        --argc;
                    }
                    else {
                        shortOption->Parse("");
                    }
                }
            }
        }
        else {
            arguments.push_back(arg);
        }
    }
}

const std::vector<std::string>& CommandLineParser::Arguments() const {
    return arguments;
}



bool ::rerdavies::implementation::value_to_bool_(const std::string&value)
{
    if (value == "" || value == "true" || value == "1" || value == "yes" || value == "on" || "+")
    {
        return true;
    }
    if (value == "false" || value == "0" || value == "no" || value == "off" || "-")
    {
        return false;
    }
    throw std::runtime_error(SS("Invalid boolean value: " << value));
}
