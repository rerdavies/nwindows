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

// Copyright (c) 2024 Robin E. R. Davies
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

/*
    libicu does major version bumps without regard to whether api changes are major or minor. Documentation
    does, in fact, guarantee binary compatibility for the APIs that we are using. The major version bump
    creates absolute havoc with .deb packaging, because the major version bumps on roughly a monthly basis.
    This makes it impossible to generate .deb packages that are plausible portable between debian-derived distros.

    The alternative: dynamically link to the APIs that we are using, referencing non-major-versioned references
    to the libicu dlls (e.g. libicuuc.lib instead of libicuuc.lib.74). Given how few APIs we are actually using,
    this seems perfectly reasonable. fwiw, .net runtime uses a similar approach.

*/

#include "NWindows/NUnicodeServices.hpp"
#include <memory.h>
#include "NWindows/NUtf8.hpp"
#include <mutex>
#include <filesystem>
#include <format>

#define U_SHOW_CPLUSPLUS_API 0

#include <stdlib.h>
#include <unicode/utypes.h>
#include <unicode/ucol.h>
#include <unicode/unistr.h>
#include <unicode/uvernum.h>
#include <stdexcept>
#include <mutex>
#include <dlfcn.h>

using namespace nwindows;
using namespace std;
namespace fs = std::filesystem;

static const char* FALLBACK_LOCALE_NAME = "C";

static inline bool isDigit(char c)
{
    return c >= '0' && c <= '9';
}
static bool getSoVersionNumber(const std::string& fileName, int* version)
{
    auto fnamePos = fileName.find_last_of('/');
    if (fnamePos == std::string::npos)
    {
        fnamePos = 0;
    }
    auto extensionPos = fileName.find(".so.", fnamePos);
    if (extensionPos == std::string::npos)
    {
        return false;
    }


    const char* p = fileName.c_str() + extensionPos + 4;

    if (!isDigit(*p)) {
        return false;
    }
    int n = 0;
    while (isDigit(*p))
    {
        n = n * 10 + *p - '0';
        ++p;
    }
    if (*p != '\0' && *p != '.')
    {
        return false;
    }
    *version = n;
    return true;
}
// Function to get ICU version dynamically
static int getICUVersion(void* libHandle) {

    // pares the dlerror to get the version number. :-/
    dlerror(); // clear the error.
    /*ignore return*/ dlsym(libHandle, "nonExistentFunction");

    std::string error = dlerror();
    // "/lib/aarch64-linux-gnu/libicui18n.so.74: undefined symbol: nonExistentFunction"

    auto nPos = error.find(":");
    if (nPos == std::string::npos)
    {
        return false;
    }
    std::string fileName = error.substr(0, nPos);

    int version = -1;

    if (!getSoVersionNumber(fileName, &version))
    {
        fs::path basePath = fileName;
        fs::path parentDirectory = basePath.parent_path();
        auto fileName = basePath.filename().string();
        for (auto& entry : fs::directory_iterator(parentDirectory))
        {
            if (entry.path().filename().string().starts_with(fileName))
            {
                if (getSoVersionNumber(entry.path().string(), &version))
                {
                    break;
                }

            }
        }
        if (version == -1)
        {
            throw std::runtime_error(std::format("Unable to determine libicui18n.so version: {}", error));
        }
    }
    return version;
}


class DynamicIcuLoader
{
public:
    using ptr = std::shared_ptr<DynamicIcuLoader>;
    // Function pointer types
    using ucol_open_t = typeof(&ucol_open);
    using ucol_close_t = typeof(&ucol_close);
    using ucol_strcoll_t = typeof(&ucol_strcoll);
    using ucol_strcollUTF8_t = typeof(&ucol_strcollUTF8);
    using ucol_setStrength_t = typeof(&ucol_setStrength);
    using ucol_getLocaleByType_t = typeof(&ucol_getLocaleByType);
    using u_errorName_t = typeof(&u_errorName);
    using unorm2_composePair_t = typeof(&unorm2_composePair);
    using unorm2_getInstance_t = typeof(&unorm2_getInstance);
    using unorm2_normalize_t = typeof(&unorm2_normalize);




    static ptr icuLoader;
    static std::mutex icuLoaderMutex;

    static DynamicIcuLoader::ptr get_instance()
    {
        std::lock_guard lock{ icuLoaderMutex };

        if (!icuLoader)
        {
            icuLoader = std::make_shared<DynamicIcuLoader>();
        }
        return icuLoader;
    }

    ~DynamicIcuLoader()
    {
        // Close the library if it was opened
        if (library_handle)
        {
            dlclose(library_handle);
            library_handle = nullptr;
        }
        if (uc_library_handle)
        {
            dlclose(uc_library_handle);
            uc_library_handle = nullptr;
        }
    }

    ucol_open_t ucol_open_fn = nullptr;
    ucol_close_t ucol_close_fn = nullptr;
    ucol_strcoll_t ucol_strcoll_fn = nullptr;
    ucol_strcollUTF8_t ucol_strcollUTF8_fn = nullptr;
    ucol_setStrength_t ucol_setStrength_fn = nullptr;
    ucol_getLocaleByType_t  ucol_getLocaleByType_fn = nullptr;
    u_errorName_t u_errorName_fn = nullptr;
    unorm2_composePair_t unorm2_composePair_fn = nullptr;
    unorm2_getInstance_t unorm2_getInstance_fn = nullptr;
    unorm2_normalize_t unorm2_normalize_fn = nullptr;

    DynamicIcuLoader()
    {
#ifndef DISABLE_DYNAMIC_ICU
        load();
#else
        set_default_fns();
#endif
    }

private:
    void* library_handle = nullptr;
    void* uc_library_handle = nullptr;
    // Function pointers
    static std::string VersionedName(const char* name, int version)
    {
        std::stringstream ss;
        ss << name << "_" << version;
        return ss.str();
    }
    void load()
    {
        try
        {
            // Open the library
            library_handle = dlopen("libicui18n.so", RTLD_LAZY);
            if (!library_handle)
            {
                throw std::runtime_error(std::format("Error loading libicui18n.so: {}", dlerror()));
            }
            uc_library_handle = dlopen("libicuuc.so", RTLD_LAZY);
            if (!uc_library_handle)
            {
                throw std::runtime_error(std::format("Error loading libicuuc.so: {}", dlerror()));
            }



            int version = getICUVersion(library_handle);

            // Clear any existing errors
            dlerror();

            // Load ucol_open
            ucol_open_fn = reinterpret_cast<ucol_open_t>(dlsym(library_handle, VersionedName("ucol_open", version).c_str()));
            if (!ucol_open_fn)
            {

                throw std::runtime_error(std::format("Error loading ucol_open: {}", dlerror()));
            }

            // Load ucol_close
            ucol_close_fn = reinterpret_cast<ucol_close_t>(dlsym(library_handle, VersionedName("ucol_close", version).c_str()));
            if (!ucol_close_fn)
            {
                throw std::runtime_error(std::format("Error loading ucol_close: {}", dlerror()));
            }

            // Load ucol_strcoll
            ucol_strcoll_fn = reinterpret_cast<ucol_strcoll_t>(dlsym(library_handle, VersionedName("ucol_strcoll", version).c_str()));
            if (!ucol_strcoll_fn)
            {
                throw std::runtime_error(std::format("Error loading ucol_strcoll: ", dlerror()));
            }
            ucol_strcollUTF8_fn = reinterpret_cast<ucol_strcollUTF8_t>(dlsym(library_handle, VersionedName("ucol_strcollUTF8", version).c_str()));
            if (!ucol_strcoll_fn)
            {
                throw std::runtime_error(std::format("Error loading ucol_strcoll: ", dlerror()));
            }
            this->ucol_setStrength_fn = reinterpret_cast<ucol_setStrength_t>(dlsym(library_handle, VersionedName("ucol_setStrength", version).c_str()));
            if (!ucol_setStrength_fn)
            {
                throw std::runtime_error(std::format("Error loading ucol_setStrength: ", dlerror()));
            }
            this->ucol_getLocaleByType_fn = reinterpret_cast<ucol_getLocaleByType_t>(dlsym(library_handle, VersionedName("ucol_getLocaleByType", version).c_str()));
            if (!ucol_getLocaleByType_fn)
            {
                throw std::runtime_error(std::format("Error loading ucol_getLocaleByType: ", dlerror()));
            }

            this->u_errorName_fn = reinterpret_cast<u_errorName_t>(dlsym(uc_library_handle, VersionedName("u_errorName", version).c_str()));
            if (!u_errorName_fn)
            {
                throw std::runtime_error(std::format("Error loading u_errorName: ", dlerror()));
            }
            this->unorm2_composePair_fn = reinterpret_cast<unorm2_composePair_t>(dlsym(uc_library_handle, VersionedName("unorm2_composePair", version).c_str()));
            if (!unorm2_composePair_fn)
            {
                throw std::runtime_error(std::format("Error loading unorm2_composePair: ", dlerror()));
            }
            this->unorm2_getInstance_fn = reinterpret_cast<unorm2_getInstance_t>(dlsym(uc_library_handle, VersionedName("unorm2_getInstance", version).c_str()));
            if (!u_errorName_fn)
            {
                throw std::runtime_error(std::format("Error loading unorm2_getInstance: ", dlerror()));
            }
            this->unorm2_normalize_fn = reinterpret_cast<unorm2_normalize_t>(
                dlsym(
                    uc_library_handle, 
                    VersionedName("unorm2_normalize", version).c_str()
                )
            );
            if (!unorm2_normalize_fn)
            {
                throw std::runtime_error(std::format("Error loading unorm2_getInstance: ", dlerror()));
            }

        }
        catch (const std::exception& e)
        {
            //Lv2Log::warning(e.what());
            set_default_fns();
        }
    }

    void set_default_fns()
    {
        this->ucol_open_fn = fallback_ucol_open_func;
        this->ucol_close_fn = fallback_ucol_close_func;
        this->ucol_strcoll_fn = fallback_ucol_strcoll_func;
        this->ucol_setStrength_fn = fallback_ucol_setStrength_func;
        this->ucol_getLocaleByType_fn = fallbacK_ucol_getLocaleByType_func;
        this->u_errorName_fn = fallback_u_errorName_func;
        this->unorm2_composePair_fn = fallback_unorm2_composePair_func;
        this->unorm2_getInstance_fn = fallback_unorm2_getInstance_func;
        this->unorm2_normalize_fn = fallback_unorm2_normalize_func;
    }

    static int32_t fallback_unorm2_normalize_func(
        const UNormalizer2 *norm2, 
        const UChar *src, int32_t length, 
        UChar *dest, int32_t capacity, 
        UErrorCode *pErrorCode)
    {
        if (U_FAILURE(*pErrorCode)) return 0;

        if (dest != 0)
        {
            return length;
        }
        if (length > capacity) {
            *pErrorCode = U_BUFFER_OVERFLOW_ERROR;
            return length;
        }
        if (dest != nullptr)
        {
            memcpy(dest, src, length * sizeof(UChar));
            if (length+1 < capacity)
            {
                dest[length] = 0;
            }   
        }
        return length;
    }
    
    static UChar32 fallback_unorm2_composePair_func(const UNormalizer2 *norm2, UChar32 a, UChar32 b)
    {
        return 0;
    }

    static const UNormalizer2*fallback_unorm2_getInstance_func(const char *packageName, const char *name, UNormalization2Mode mode, UErrorCode *pErrorCode)
    {
        return nullptr;
    }

    static const char* fallback_u_errorName_func(UErrorCode code)
    {
        return "Not implemented.";
    }
    static const char* fallbacK_ucol_getLocaleByType_func(const UCollator* coll, ULocDataLocaleType type, UErrorCode* status)
    {
        return FALLBACK_LOCALE_NAME;
    }
    static void fallback_ucol_setStrength_func(UCollator* coll,
        UCollationStrength strength)
    {

    }


    static UCollator* fallback_ucol_open_func(const char* locale, UErrorCode* ec)
    {
        *ec = UErrorCode::U_ZERO_ERROR;
        return (UCollator*)(void*)-1;
    }
    static void fallback_ucol_close_func(UCollator*)
    {
    }
    static UCollationResult fallback_ucol_strcoll_func(const UCollator*, const UChar* left, int32_t nLeft, const UChar* right, int32_t nRight)
    {
        auto c = std::min(nLeft, nRight);

        for (int32_t i = 0; i < c; ++i)
        {
            UChar cl = *left++;
            UChar cr = *right++;
            if (cl != cr)
            {
                if (cl >= 'A' && cl <= 'Z')
                {
                    cl += 'A' - 'a';
                }
                if (cr >= 'A' && cr <= 'Z')
                {
                    cr += 'A' - 'a';
                }
                if (cl != cr)
                {
                    if (cl < cr)
                    {
                        return UCollationResult::UCOL_LESS;
                    }
                    else
                    {
                        return UCollationResult::UCOL_GREATER;
                    }
                }
            }
        }
        return UCollationResult::UCOL_EQUAL;
    }
};

DynamicIcuLoader::ptr DynamicIcuLoader::icuLoader;
std::mutex DynamicIcuLoader::icuLoaderMutex;

std::string getCurrentLocale()
{
    std::string locale = setlocale(LC_ALL, nullptr);
    if (locale.empty() || locale == "C")
    {
        // If setlocale fails, try getting it from environment variables
        const char* lang = getenv("LC_ALL");
        if (lang)
        {
            locale = lang;
        }
        else
        {
            // If LANG is not set, fall back to a default
            lang = getenv("LC_COLLATE");
            if (lang)
            {
                locale = lang;
            }
            else
            {
                lang = getenv("LANG");
                if (lang)
                {
                    locale = lang;
                }
                else
                {
                    locale = "en_US";
                }
            }
        }
    }
    // Extract just the language and country code
    size_t dot_pos = locale.find('.');
    if (dot_pos != std::string::npos)
    {
        locale = locale.substr(0, dot_pos);
    }
    return locale;
}

Collator::~Collator()
{
}

class LocaleImpl;

namespace {
    class NormalizerImpl : public UnicodeNormalizer
    {
    public:
        NormalizerImpl(std::shared_ptr<LocaleImpl> localeImpl, NormalizerType normalizerType);
        virtual ~NormalizerImpl();

        char32_t ComposePair(char32_t a, char32_t b) const override;

        virtual std::string Normalize(const std::string&str) const override;
        virtual std::string Decompose(const std::string&str) const override;
        virtual std::u16string Normalize(const std::u16string&str) const override;
        virtual std::u16string Decompose(const std::u16string&str) const override;

    private:
        std::shared_ptr<LocaleImpl> localeImpl;
        NormalizerType normalizerType;
        const UNormalizer2* normalizer = nullptr;
        const UNormalizer2* denormalizer = nullptr;
        DynamicIcuLoader::ptr icuLoader;
    };

    NormalizerImpl::~NormalizerImpl()
    {
    }


    NormalizerImpl::NormalizerImpl(std::shared_ptr<LocaleImpl> localeImpl, NormalizerType normalizerType)
        : localeImpl(localeImpl), normalizerType(normalizerType)
    {
        icuLoader = DynamicIcuLoader::get_instance();

        UErrorCode status = U_ZERO_ERROR;
        std::string mode;

        switch (normalizerType)
        {
        case NormalizerType::NFC:
            mode = "nfc";
            break;
        case NormalizerType::NFKC:
            mode = "nfkc";
            break;
        case NormalizerType::NFKC_CF:
            mode = "nfkc_cf";
            break;
        case NormalizerType::NFKC_SCF:
            mode = "nfkc_scf";
            break;

        default:
            throw std::runtime_error("Invalid argument.");
        }
        normalizer = icuLoader->unorm2_getInstance_fn(nullptr, mode.c_str(), UNORM2_COMPOSE, &status);
        if (U_FAILURE(status))
        {
            throw std::runtime_error(std::format("Failed to create normalizer: {}", icuLoader->u_errorName_fn(status)));
        }
        denormalizer = icuLoader->unorm2_getInstance_fn(nullptr, mode.c_str(), UNORM2_DECOMPOSE, &status);
        if (U_FAILURE(status))
        {
            throw std::runtime_error(std::format("Failed to create normalizer: {}", icuLoader->u_errorName_fn(status)));
        }
    }

    char32_t NormalizerImpl::ComposePair(char32_t a, char32_t b) const
    {
        return icuLoader->unorm2_composePair_fn(normalizer,a,b);
    }

    std::string NormalizerImpl::Decompose(const std::string&str) const {
        std::u16string u16str = utf8_to_u16string(str);

        UErrorCode status = U_ZERO_ERROR;
        int32_t count = icuLoader->unorm2_normalize_fn(
            denormalizer, 
            u16str.c_str(),(int32_t)u16str.length(),
             nullptr,0, &status);

        if (U_FAILURE(status) && status != U_BUFFER_OVERFLOW_ERROR)
        {
            throw std::runtime_error(std::format("Failed to decompose string: {}", icuLoader->u_errorName_fn(status)));
        }
        std::u16string result;
        result.resize(count);
        status = U_ZERO_ERROR;

        count = icuLoader->unorm2_normalize_fn(
            denormalizer, 
            u16str.c_str(),(int32_t)u16str.length(),
             result.data(),result.length(), &status);

        if (U_FAILURE(status))
        {
            throw std::runtime_error(std::format("Failed to decompose string: {}", icuLoader->u_errorName_fn(status)));
        }
        return u16string_to_utf8(result);

    }
    std::u16string NormalizerImpl::Decompose(const std::u16string&u16str) const {

        UErrorCode status = U_ZERO_ERROR;
        int32_t count = icuLoader->unorm2_normalize_fn(
            denormalizer, 
            u16str.c_str(),(int32_t)u16str.length(),
             nullptr,0, &status);

        if (U_FAILURE(status) && status != U_BUFFER_OVERFLOW_ERROR)
        {
            throw std::runtime_error(std::format("Failed to decompose string: {}", icuLoader->u_errorName_fn(status)));
        }
        std::u16string result;
        result.resize(count);
        status = U_ZERO_ERROR;

        count = icuLoader->unorm2_normalize_fn(
            denormalizer, 
            u16str.c_str(),(int32_t)u16str.length(),
             result.data(),result.length(), &status);

        if (U_FAILURE(status))
        {
            throw std::runtime_error(std::format("Failed to decompose string: {}", icuLoader->u_errorName_fn(status)));
        }
        return result;

    }

    std::string NormalizerImpl::Normalize(const std::string&str) const 
    {
        std::u16string u16str = utf8_to_u16string(str);

        UErrorCode status = U_ZERO_ERROR;
        int32_t count = icuLoader->unorm2_normalize_fn(normalizer, 
            u16str.c_str(),(int32_t)u16str.length(),
             nullptr,0, &status);

        if (U_FAILURE(status) && status != U_BUFFER_OVERFLOW_ERROR)
        {
            throw std::runtime_error(std::format("Failed to normalize string: {}", icuLoader->u_errorName_fn(status)));
        }
        std::u16string result;
        result.resize(count);
        status = U_ZERO_ERROR;

        count = icuLoader->unorm2_normalize_fn(normalizer, 
            u16str.c_str(),(int32_t)u16str.length(),
             result.data(),result.length(), &status);

        if (U_FAILURE(status))
        {
            throw std::runtime_error(std::format("Failed to normalize string: {}", icuLoader->u_errorName_fn(status)));
        }


        return u16string_to_utf8(result);
    }


    std::u16string NormalizerImpl::Normalize(const std::u16string&u16str) const 
    {
        UErrorCode status = U_ZERO_ERROR;
        int32_t count = icuLoader->unorm2_normalize_fn(normalizer, 
            u16str.c_str(),(int32_t)u16str.length(),
             nullptr,0, &status);

        if (U_FAILURE(status) && status != U_BUFFER_OVERFLOW_ERROR)
        {
            throw std::runtime_error(std::format("Failed to normalize string: {}", icuLoader->u_errorName_fn(status)));
        }
        std::u16string result;
        result.resize(count);
        status = U_ZERO_ERROR;

        count = icuLoader->unorm2_normalize_fn(normalizer, 
            u16str.c_str(),(int32_t)u16str.length(),
             result.data(),result.length(), &status);

        if (U_FAILURE(status))
        {
            throw std::runtime_error(std::format("Failed to normalize string: {}", icuLoader->u_errorName_fn(status)));
        }


        return result;
    }




    class CollatorImpl : public Collator
    {
    public:
        CollatorImpl(std::shared_ptr<LocaleImpl> localeImpl, const char* localeStr);
        ~CollatorImpl();

        virtual const char* GetLocale() const override;

        virtual CollatorStrength GetStrength() const override;
        virtual void SetStrength(CollatorStrength strength) override;

        virtual int Compare(const std::string& left, const std::string& right) override;
        virtual int Compare(const std::u16string& left, const std::u16string& right) override;

    private:
        CollatorStrength strength = CollatorStrength::Uninitialized;
        UCollator* collator = nullptr;
        std::shared_ptr<LocaleImpl> localeImpl;

        DynamicIcuLoader::ptr icuLoader;
    };
}

CollatorImpl::~CollatorImpl()
{
    if (collator)
    {
        icuLoader->ucol_close_fn(collator);
        collator = nullptr;
    }
    localeImpl = nullptr;
}

CollatorImpl::CollatorImpl(std::shared_ptr<LocaleImpl> localeImpl, const char* localeStr)
    : localeImpl(localeImpl)
{
    icuLoader = DynamicIcuLoader::get_instance();
    UErrorCode status = U_ZERO_ERROR;
    collator = icuLoader->ucol_open_fn(localeStr, &status);

    if (U_FAILURE(status))
    {
        throw std::runtime_error(std::format("Failed to create collator: {}", (int64_t)status));
    }
    SetStrength(CollatorStrength::Primary);
}

int CollatorImpl::Compare(const std::u16string& left, const std::u16string& right)
{
    return icuLoader->ucol_strcoll_fn(collator,
        reinterpret_cast<const UChar*>(left.c_str()), left.length(),
        reinterpret_cast<const UChar*>(right.c_str()), right.length());

}


const char* CollatorImpl::GetLocale() const
{
    UErrorCode err = U_ZERO_ERROR;
    const char* result;

    result = icuLoader->ucol_getLocaleByType_fn(this->collator, ULocDataLocaleType::ULOC_ACTUAL_LOCALE, &err);
    if (U_FAILURE(err))
    {
        throw std::runtime_error(std::format("Failed to get locale: {}", icuLoader->u_errorName_fn(err)));
    }
    return result;
}


CollatorStrength CollatorImpl::GetStrength() const {
    return strength;
}
void CollatorImpl::SetStrength(CollatorStrength strength) {
    static_assert((int)UCollationStrength::UCOL_PRIMARY == (int)CollatorStrength::Primary);
    static_assert((int)UCollationStrength::UCOL_SECONDARY == (int)CollatorStrength::Secondary);
    static_assert((int)UCollationStrength::UCOL_TERTIARY == (int)CollatorStrength::Tertiary);
    static_assert((int)UCollationStrength::UCOL_QUATERNARY == (int)CollatorStrength::Quaternary);
    static_assert((int)UCollationStrength::UCOL_DEFAULT_STRENGTH == (int)CollatorStrength::DefaultStrength);

    this->strength = strength;
    icuLoader->ucol_setStrength_fn(collator, static_cast<UCollationStrength>(strength));
}

int CollatorImpl::Compare(const std::string& left_, const std::string& right_)
{

    std::u16string left = utf8_to_u16string(left_);
    std::u16string right = utf8_to_u16string(right_);

    return icuLoader->ucol_strcoll_fn(collator,
        reinterpret_cast<const UChar*>(left.c_str()), left.length(),
        reinterpret_cast<const UChar*>(right.c_str()), right.length());
}

UnicodeServices::ptr g_instance;

class LocaleImpl : public UnicodeServices, public std::enable_shared_from_this<LocaleImpl>
{
public:
    LocaleImpl();
    LocaleImpl(const std::string& locale);
    virtual const std::string& CurrentLocale() const;
    virtual Collator::ptr MakeCollator() override;
    virtual UnicodeNormalizer::ptr MakeNormalizer(NormalizerType normalizerType)  override;


private:
    std::string currentLocale;
};

LocaleImpl::LocaleImpl()
{
    currentLocale = getCurrentLocale();
}
LocaleImpl::LocaleImpl(const std::string& locale)
{
    currentLocale = locale;
}


const std::string& LocaleImpl::CurrentLocale() const
{
    return currentLocale;
}


UnicodeNormalizer::ptr LocaleImpl::MakeNormalizer(NormalizerType normalizerType)
{
    auto pThis = shared_from_this();
    return std::shared_ptr<UnicodeNormalizer>(new NormalizerImpl(pThis, normalizerType));


}

Collator::ptr LocaleImpl::MakeCollator()
{
    auto pThis = shared_from_this();
    return std::shared_ptr<Collator>(new CollatorImpl(pThis, currentLocale.c_str()));
}

static std::mutex createMutex;

UnicodeServices::~UnicodeServices()
{
}

UnicodeServices::ptr UnicodeServices::g_instance;

UnicodeServices::ptr UnicodeServices::GetInstance()
{
    std::lock_guard lock{ createMutex };

    if (g_instance)
    {
        return g_instance;
    }
    g_instance = std::make_shared<LocaleImpl>();
    return g_instance;
}

UnicodeServices::ptr UnicodeServices::GetInstance(const std::string& locale)
{
    return std::make_shared<LocaleImpl>(locale);
}

UnicodeNormalizer::~UnicodeNormalizer()
{
}
