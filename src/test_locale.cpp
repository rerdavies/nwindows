#include <locale>
#include <locale.h>
#include <iostream>
#include "NWindows/NUnicodeServices.hpp"
#include "NWindows/NUtf8.hpp"
#include <format>

using namespace std;
using namespace nwindows;

void test_composition(UnicodeNormalizer::ptr normalizer, const std::string left, const std::string right)
{
    std::string left_normalized = normalizer->Normalize(left);
    std::string right_normalized = normalizer->Normalize(right);
    std::string sum = normalizer->Normalize(left + right);
    std::string decomposed = normalizer->Decompose(sum);
    std::wcout << L"  "
        << utf8_to_wstring(left) << " + " << utf8_to_wstring(" " + right)
        << " Composed: " << utf8_to_wstring(sum)
        << (utf8_length(sum) == 1 ? "" : " (not composed) ")
        << " Decomposed: " << utf8_to_wstring(decomposed)
        << (utf8_length(decomposed) == 2 ? "" : " (not decomposed) ")

        << endl;


}

void test_composition(UnicodeServices::ptr factory)
{
    auto normalizer = factory->MakeNormalizer();
    test_composition(normalizer, "a", "\u0301");

    test_composition(normalizer, "x", "\u0301");

}

void display_collation(Collator::ptr collator, const std::string left, const std::string& right)
{
    int result = collator->Compare(left, right);
    wcout << L"  " << utf8_to_wstring(left) << " == " << utf8_to_wstring(right) << ": " << result << endl;

}

void test_collation(const char* locale, const std::string& left, const std::string& right, bool expected)
{
    UnicodeServices::ptr collationFactory = UnicodeServices::GetInstance(locale);
    Collator::ptr collator = collationFactory->MakeCollator();
    collator->SetStrength(CollatorStrength::Primary);
    int result = collator->Compare(left, right);
    wcout << L"  " << locale << " " << utf8_to_wstring(left) << " == " << utf8_to_wstring(right) << ": " << (result == 0) << endl;
    if (expected != (result == 0))
    {
        throw std::runtime_error(std::format(
            "Collation test faled: {} {} == {} expected {} got {}",
            locale, left, right, expected, (result == 0)));
    }
}

void test_collation()
{
    test_collation("en_US", "a", "A", true);
    test_collation("en_US", "ß", "ss", true);
    test_collation("de_DE", "ß", "ss", true);
    test_collation("en", "å", "a", true);
    test_collation("da_DK", "å", "a", false);
    test_collation("tr", "i", "I", false);
    test_collation("en_US","🌞","🌈",false);
    test_collation("de_DE","🌞🌞🌞","🌞🌞🌞",true);
}

int main(int argc, char* argv[])
{
    try {

        // Set up locale and UTF-8 encoding
        std::string loc = "en_US.UTF-8";;
        if (argc > 1) {
            loc = argv[1];
        }
        std::setlocale(LC_ALL, "en_US.UTF-8");
        std::locale::global(std::locale("en_US.UTF-8"));
        std::wcout.imbue(std::locale());

        // Ensure proper encoding for cout
        std::cout.imbue(std::locale());
        std::wcout << "Locale: " << utf8_to_wstring(::locale().name()) << std::endl;
        // Unicode output examples
        std::wcout << L"Unicode symbols: ★☀☂☻♠♣♥♦" << std::endl;
        std::wcout << L"Greek: αβγδεζηθ" << std::endl;
        std::wcout << L"Japanese: こんにちは" << std::endl;
        std::wcout << L"Chinese: 你好" << std::endl;
        std::wcout << L"Arabic: مرحبا" << std::endl;
        std::wcout << L"Emoji: 🌍🌞🌈🎉" << std::endl;

        UnicodeServices::ptr collationFactory = UnicodeServices::GetInstance(loc);
        Collator::ptr collator = collationFactory->MakeCollator();

        std::wcout << L"ICU Locale: " << utf8_to_wstring(collator->GetLocale()) << std::endl;

        std::wcout << "Primary" << std::endl;
        collator->SetStrength(CollatorStrength::Primary);
        display_collation(collator, "AA", "BB");

        display_collation(collator, "a", "a");
        display_collation(collator, "A", "a");
        display_collation(collator, "Ă", "a");
        display_collation(collator, "a", "Ă");
        display_collation(collator, "i", "I");
        display_collation(collator, "i", "I");
        display_collation(collator, "ß", "SS");
        display_collation(collator, "ß", "ss");
        display_collation(collator, "ß", "ẞ");
        display_collation(collator, "Ö", "o");
        display_collation(collator, "🌞", "🌞");
        display_collation(collator, "å", "a");

        std::wcout << "Secondary" << std::endl;
        collator->SetStrength(CollatorStrength::Secondary);
        display_collation(collator, "i", "I");
        display_collation(collator, "Ă", "a");
        display_collation(collator, "a", "Ă");
        display_collation(collator, "I", "i");
        display_collation(collator, "ß", "SS");
        display_collation(collator, "ß", "ss");
        display_collation(collator, "Ö", "o");
        display_collation(collator, "å", "a");
        display_collation(collator, "AA", "BB");


        test_composition(collationFactory);

        test_collation();
    }
    catch (const std::exception& e)
    {
        std::wcout << L"ERROR: " << utf8_to_wstring(e.what()) << std::endl;
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}


