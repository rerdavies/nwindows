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

// Copyright (c) 2022 Robin Davies
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#pragma once

#include <memory>
#include <string>

namespace nwindows {
    enum class CollatorStrength {
        Uninitialized = -1,
        Primary = 0,
        Secondary = 1,
        Tertiary = 2,
        Quaternary = 3,
        Identical = 15,
        DefaultStrength=Tertiary
    };
    class Collator {
    public:
        using ptr = std::shared_ptr<Collator>;

        virtual const char*GetLocale() const = 0;

        virtual void SetStrength(CollatorStrength strength) = 0;
        virtual CollatorStrength GetStrength() const = 0;
        virtual int Compare(const std::string &left, const std::string&right) = 0;
        virtual int Compare(const std::u16string &left, const std::u16string&right) = 0;
        
        virtual ~Collator();
    };

    class UnicodeNormalizer {
    private:

    public: 
        using self = UnicodeNormalizer;
        using ptr = std::shared_ptr<UnicodeNormalizer>;
        
        virtual char32_t ComposePair(char32_t a, char32_t b) const = 0;
        
        virtual std::string Normalize(const std::string&str) const = 0;
        virtual std::string Decompose(const std::string&str) const = 0;

        virtual std::u16string Normalize(const std::u16string&str) const = 0;
        virtual std::u16string Decompose(const std::u16string&str) const = 0;


        virtual ~UnicodeNormalizer();

    };

    enum class NormalizerType {
        NFC,
        NFKC,
        NFKC_CF,
        NFKC_SCF
    };

    class UnicodeServices {
    protected:
        UnicodeServices() { }
    public:
        virtual ~UnicodeServices();
        // no copy, no move
        UnicodeServices(const UnicodeServices&) = delete;
        UnicodeServices(UnicodeServices&&) = delete;
        UnicodeServices&operator =(const UnicodeServices&) = delete;
        UnicodeServices&operator =(UnicodeServices&&) = delete;
        
        using ptr = std::shared_ptr<UnicodeServices>;

        static ptr GetInstance();
        static ptr GetInstance(const std::string&locale); // testing only. 

        virtual const std::string &CurrentLocale() const = 0;
        virtual Collator::ptr MakeCollator() = 0;

        virtual UnicodeNormalizer::ptr MakeNormalizer(NormalizerType normalizerType = NormalizerType::NFC) = 0;
    private:
        static ptr g_instance;
    };
}
