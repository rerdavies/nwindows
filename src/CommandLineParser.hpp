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

#include <memory>
#include <vector>
#include <sstream>
#include <iostream>


namespace rerdavies {
    class CommandLineOptionBase {
    protected:
        CommandLineOptionBase(char shortName, const std::string& longName);
    public:
        virtual ~CommandLineOptionBase();
        char ShortName() const;
        const std::string& LongName() const;

        virtual void Parse(const std::string& value) = 0;
        virtual bool TakesValue() const = 0;
    private:
        char shortName = 0;
        const std::string longName;

    };

    template<typename T>
    class CommandLineOption : public CommandLineOptionBase {
    public:
        using ArgumentType = T;

        CommandLineOption(char shortName, const std::string& longName, T* output)
        :CommandLineOptionBase(shortName,longName), output(output)
        {
        }

        virtual void Parse(const std::string& value) override
        {
            std::stringstream ss(value);
            ss >> *this->output;
            if (!ss) {
                throw std::runtime_error("Invalid value.");
            }
        }
        virtual bool TakesValue() const override {
            return true;
        }

    private:
        T* output;
    };
    class CommandLineParser
    {
    public:
        void Parse(int argc, char** argv);
        const std::vector<std::string>&Arguments() const;

        template <typename T>
        void AddOption(char shortName, const std::string& longName, T* output) {
            options.push_back(std::make_shared<CommandLineOption<T>>(shortName, longName, output));
        }
    private:
        CommandLineOptionBase* FindLongOption(const std::string& longName);
        CommandLineOptionBase* FindShortOption(char shortName);

        std::vector<std::shared_ptr<CommandLineOptionBase>> options;
        std::vector<std::string> arguments;


    };


    ////////////////////////////////////////////////

    namespace implementation {
        bool value_to_bool_(const std::string&value);
    }
    template <> 
    inline void CommandLineOption<bool>::Parse(const std::string& value)
    {
        *this->output = implementation::value_to_bool_(value);
    }
    template <> 
    inline bool CommandLineOption<bool>::TakesValue() const 
    {
         return false;
    }

}