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


#ifdef __linux__

#include <NWindows/ConsoleFont.hpp>
#include "TempFile.hpp"
#include <cstdint>
#include <stdexcept>
#include "Finally.hpp"
#include "NWindows/nss.hpp"
#include <map>
#include <set>
#include <vector>
#include "NWindows/NUtf8.hpp"

#include <unistd.h>
#include <sys/ioctl.h>
#include <linux/vt.h>
#include <linux/kd.h>
#include <fcntl.h>


using namespace nwindows;

ConsoleFont::ConsoleFont()
{
}

ConsoleFont::~ConsoleFont()
{

}

namespace nwindows::internal {

    struct ComposedCharacter {
        ComposedCharacter(std::u32string&&characters,size_t glyph) 
        :characters(std::move(characters)),glyph(glyph)
        {

        }
        std::u32string characters;
        size_t glyph;
    };

    class ConsoleFontImpl : public ConsoleFont {
    public:
        ConsoleFontImpl()
        {
        }
        virtual ~ConsoleFontImpl()
        {
        }
        virtual void load(const std::filesystem::path& fontPath) override;
        virtual void save(const std::filesystem::path& fontPath) override;

        virtual bool can_get_console_font() override;
        virtual void get_console_font() override;

        virtual void set_console_font() override;

        virtual ConsoleFont::ptr clone() override;


        virtual bool is_valid_character(char32_t c) override
        {
            return valid_unicode_characters.find(c) != valid_unicode_characters.end();
        }
        virtual std::optional<size_t> get_glyph_position(const std::string &character) override;
        virtual std::optional<size_t> get_glyph_position(char32_t character) override;
        virtual int file_type() const override
        {
            return file_type_;
        }


        virtual size_t char_width() const override
        {
            return char_width_;
        }
        virtual size_t char_height() const override
        {
            return char_height_;
        }
        virtual size_t glyph_count() const override
        {
            return char_count_;
        }
        virtual size_t character_count() const override
        {
            return valid_unicode_characters.size();
        }
        virtual bool has_unicode_map() const override
        {
            return has_unicode_map_;
        }   
        virtual size_t extra_bytes() const override {
            return data.size()-this->map_data_end_;
        }

        virtual std::vector<uint8_t> get_glyph_data(size_t glyph) override;
        virtual void set_glyph_data(
            size_t glyph_position,
            char32_t unicode_character, 
            std::vector<uint8_t> bits) override;

        virtual const std::vector<ConsoleMapEntry> &get_unicode_map() override 
        {
            return unicode_map_;
        }
        virtual void set_unicode_map(const std::vector<ConsoleMapEntry> &map) override
        {
            this->unicode_map_ = map;
        }

    private:
        void reset_unicode_map();

        void process_psf1_unicode_table(size_t start, size_t end);
        void process_psf2_unicode_table(size_t start, size_t end);

        std::vector<uint8_t> generate_pfs2_unicode_table();
        std::vector<uint8_t> generate_pfs1_unicode_table();
    private:
        std::vector<ConsoleMapEntry> unicode_map_;

        std::vector<uint8_t> data;
        int file_type_ = -1;
        size_t char_data_offset_ = 0L;
        size_t char_data_end_ = 0L;
        size_t map_data_end_ = 0L;
        size_t char_size_ = 0L;
        size_t char_height_ = 0L;
        size_t char_width_ = 0L;
        size_t char_count_ = 0L;
        bool has_unicode_map_ = false;

        std::set<char32_t> valid_unicode_characters;
        std::map<char32_t, size_t> unicode_to_glyph;
        std::vector<ComposedCharacter> composedCharacters;

    };
}
using namespace nwindows::internal;


// source: https://en.wikipedia.org/wiki/PC_Screen_Font
constexpr uint8_t PSF1_MAGIC_0 = 0x36;
constexpr uint8_t PSF1_MAGIC_1 = 0x04;

constexpr uint8_t PSF1_MODE512 = 0x01;
constexpr uint8_t PSF1_MODEHASTAB = 0x02;
constexpr uint8_t PSF1_MODESEQ = 0x04;
constexpr uint8_t PSF1_MAXMODE = 0x05;

constexpr uint16_t PSF1_END_GLYPH_ENTRY = 0xFFFF;
constexpr uint16_t PSF1_START_SEQUENCE = 0xFFFE;

struct psf1_header {
    uint8_t magic[2];
    uint8_t font_mode;
    uint8_t char_size;
};


constexpr uint8_t PSF2_MAGIC_0 = 0x72;
constexpr uint8_t PSF2_MAGIC_1 = 0xb5;
constexpr uint8_t PSF2_MAGIC_2 = 0x4a;
constexpr uint8_t PSF2_MAGIC_3 = 0x86;

struct psf2_header {
    unsigned char magic[4];
    unsigned int version;
    unsigned int header_size;    
    unsigned int flags;
    unsigned int number_of_glyphs;	    
    unsigned int char_size;	    
    unsigned int height;
    unsigned int width; 
};

constexpr uint16_t PSF2_HAS_UNICODE_TABLE = 0x0001;

// constexpr uint16_t PSF2_MAXVERSION = 0;


/* UTF8 separators */
constexpr char PSF2_END_GLYPH_ENTRY = (char)0xFF;
constexpr char PSF2_START_SEQUENCE = (char)0xFE;

void ConsoleFontImpl::save(const std::filesystem::path& fontPath)
{
    if (file_type_ == 1)
    {
        if (this->has_unicode_map())
        {
            std::vector<uint8_t> map = generate_pfs1_unicode_table();

            this->data.resize(this->char_data_end_ + map.size());
            for (size_t i = 0; i < map.size(); ++i)
            {
                this->data[this->char_data_end_ + i] = map[i];
            }
        }

        FILE* file = fopen(fontPath.c_str(), "wb");
        if (!file)
        {
            throw std::runtime_error("Could not open font file");
        }
        Finally closeFile(
            [file]() {
                fclose(file);
            }
        );

        fwrite(data.data(), sizeof(uint8_t), data.size(), file);
    }
    else if (file_type_ == 2)
    {
        if (this->has_unicode_map())
        {
            std::vector<uint8_t> map = generate_pfs2_unicode_table();

            this->data.resize(this->char_data_end_ + map.size());
            for (size_t i = 0; i < map.size(); ++i)
            {
                this->data[this->char_data_end_ + i] = map[i];
            }
        }

        FILE* file = fopen(fontPath.c_str(), "wb");
        if (!file)
        {
            throw std::runtime_error("Could not open font file");
        }
        Finally closeFile(
            [file]() {
                fclose(file);
            }
        );

        fwrite(data.data(), sizeof(uint8_t), data.size(), file);
    }
    else
    {
        throw std::runtime_error("Invalid font file");
    }
}


void ConsoleFontImpl::load(const std::filesystem::path& fontPath)
{
    if (fontPath.extension() == ".gz")
    {
        TempFile tempFile(".psf");
        int rc = system(("gunzip -c " + fontPath.string() + " > " + tempFile.path().string()).c_str());
        if (rc < 0) {
            throw std::runtime_error("Could not unzip font file");
        }
        if (!WIFEXITED(rc) || WEXITSTATUS(rc) != EXIT_SUCCESS)
        {
            throw std::runtime_error("gunzip returned an error while unzipping font file.");
        }
        load(tempFile.path());
        return;
    }

    unicode_map_.resize(0);

    FILE* file = fopen(fontPath.c_str(), "rb");
    if (!file)
    {
        throw std::runtime_error("Could not open font file");
    }
    Finally closeFile(
        [file]() {
            fclose(file);
        }
    );

    fseek(file, 0, SEEK_END);
    size_t size = ftell(file);

    fseek(file, 0, SEEK_SET);

    data.resize(size);
    size_t nRead = fread(data.data(), sizeof(uint8_t),size,  file);
    if (nRead != size) {
        throw std::runtime_error("Could not read font file");
    }

    if (size < sizeof(psf1_header)) {
        throw std::runtime_error("Font file is too small");
    }
    if (data[0] == PSF1_MAGIC_0 && data[1] == PSF1_MAGIC_1)
    {
        file_type_ = 1;
        psf1_header* header = (psf1_header*)data.data();
        if (header->font_mode > PSF1_MAXMODE) {
            throw std::runtime_error("Invalid font file");
        }
        if ((header->font_mode & PSF1_MODE512) == 0)
        {
            this->char_count_ = 256;
            this->char_width_ = 8;
            this->char_size_ = header->char_size;
            this->char_height_ = 16;
            this->char_height_ = this->char_size_;
            this->char_data_offset_ = sizeof(psf1_header);
            this->char_data_end_ = size;
        }
        else // if ((header->mode & PSF1_MODE512) != 0) 
        {
            this->char_count_ = 512;
            this->char_width_ = 8;
            this->char_size_ = header->char_size;
            this->char_height_ = this->char_size_;
            this->char_data_offset_ = sizeof(psf1_header);
            this->char_data_end_ = size;
        }
        this->char_data_end_ = this->char_data_offset_ + this->char_count_ * this->char_size_; 
        this->map_data_end_ = char_data_end_; 
        
        if ((header->font_mode & PSF1_MODEHASTAB) != 0
            || (header->font_mode & PSF1_MODESEQ) != 0 // same thing.
            ) {
            has_unicode_map_ = true;
            process_psf1_unicode_table(this->char_data_end_, size);
        }
    }
    else if (data.size() > sizeof(psf2_header) && data[0] == PSF2_MAGIC_0 && data[1] == PSF2_MAGIC_1 && data[2] == PSF2_MAGIC_2 && data[3] == PSF2_MAGIC_3)
    {
        file_type_ = 2;
        psf2_header* header = (psf2_header*)data.data();
        if (header->header_size > size) {
            throw std::runtime_error("Invalid font file.");
        }
        if (header->number_of_glyphs * header->char_size + header->header_size > size) {
            throw std::runtime_error("Invalid font file.");
        }
        this->char_count_ = header->number_of_glyphs;
        this->char_size_ = header->char_size;
        this->char_height_ = header->height;
        this->char_width_ = header->width;

        this->char_data_offset_ = header->header_size;
        this->char_data_end_ = header->header_size + header->number_of_glyphs * header->char_size;
        this->map_data_end_ = char_data_end_; 
        if (header->flags & PSF2_HAS_UNICODE_TABLE) {
            has_unicode_map_ = true;
            process_psf2_unicode_table(this->char_data_end_, size);
        }
    }
    else {
        throw std::runtime_error("Invalid font file");
    }
}

void ConsoleFontImpl::process_psf1_unicode_table(size_t start, size_t end)
{
    reset_unicode_map();

    uint16_t *pTable = (uint16_t*)(data.data() + start);
    uint16_t *pEnd = (uint16_t*)(data.data() + end); 

    size_t glyph = 0;
    this->map_data_end_ = end;
    while (pTable < pEnd) {
        ConsoleMapEntry mapEntry;
        mapEntry.glyph_index = glyph;

        while (pTable < pEnd && *pTable != PSF1_END_GLYPH_ENTRY && *pTable != PSF1_START_SEQUENCE)
        {
            auto unicode = *pTable++;
            char32_t c32 = (char32_t)(uint32_t)unicode;

            valid_unicode_characters.insert(c32);
            unicode_to_glyph[c32] = glyph;
            std::u16string t (1,unicode);
            mapEntry.unicode_chars += u16string_to_utf8(t);

        }
        while (pTable < pEnd && *pTable == PSF1_START_SEQUENCE)
        {
            ++pTable;

            std::u16string sequence;
            while (pTable < pEnd && *pTable == PSF1_START_SEQUENCE && *pTable != PSF1_END_GLYPH_ENTRY)
            {
                char32_t c = (char32_t)(uint32_t)*pTable++;
                sequence.push_back((char16_t)(c));
            }
            std::u32string sequence32 = utf8_to_u32string(u16string_to_utf8(sequence));
            mapEntry.unicode_sequences.push_back(u32string_to_utf8(sequence32));
            if (sequence32.length() == 1) {
                valid_unicode_characters.insert(sequence32[0]);
                unicode_to_glyph[sequence32[0]] = glyph; 
            } else {
                for (auto c: sequence32) {
                    valid_unicode_characters.insert(c);
                } 
                composedCharacters.push_back(ComposedCharacter(std::move(sequence32),glyph));
            }
        }
        if (pTable < pEnd && *pTable == PSF1_END_GLYPH_ENTRY)
        {
            pTable++;
        }
        unicode_map_.push_back(mapEntry);
        ++glyph; 
        if (glyph >= char_count_) {
            break;
        }
    }
    this->map_data_end_ = (uint8_t*)pTable- data.data();

 }

static inline void push_char16_t(std::vector<uint8_t>&data, char16_t c)
{
    data.push_back((uint8_t)(c & 0xFF));
    data.push_back((uint8_t)(c >> 8));
}   

std::vector<uint8_t> ConsoleFontImpl::ConsoleFontImpl::generate_pfs1_unicode_table()
{
    std::vector<uint8_t> result;
    for (auto& entry: unicode_map_) {

        std::u16string sequence = utf8_to_u16string(entry.unicode_chars);
        for (auto c: sequence) {
            push_char16_t(result,c);
        }

        for (auto& sequence: entry.unicode_sequences) {
            push_char16_t(result,(char16_t)PSF1_START_SEQUENCE);

            std::u16string sequence16 = utf8_to_u16string(sequence);

            for (auto c: sequence16) {
                result.push_back((uint8_t)(c));
            }
        }
        push_char16_t(result,(char16_t)PSF1_END_GLYPH_ENTRY);
    }   
    return result;
}

std::vector<uint8_t> ConsoleFontImpl::ConsoleFontImpl::generate_pfs2_unicode_table()
{
    std::vector<uint8_t> result;
    for (auto& entry: unicode_map_) {
        for (auto c: entry.unicode_chars) {
            result.push_back((uint8_t)(c));
        }

        for (auto& sequence: entry.unicode_sequences) {
            result.push_back((uint8_t)PSF2_START_SEQUENCE);

            for (auto c: sequence) {
                result.push_back((uint8_t)(c));
            }
        }
        result.push_back(PSF2_END_GLYPH_ENTRY);
    }
    return result;
}

void ConsoleFontImpl::reset_unicode_map()
{

    unicode_map_.resize(0);
    valid_unicode_characters.clear();
    unicode_to_glyph.clear();

}

void ConsoleFontImpl::process_psf2_unicode_table(size_t start_, size_t end_)
{
    reset_unicode_map();
    std::string data = std::string(
        (char*)(this->data.data() + start_),
        (char*)(this->data.data() + end_)        
    );

    size_t ix = 0;
    size_t end = data.length();

    size_t glyph = 0;
    while (ix < end) {
        ConsoleMapEntry map_entry;
        map_entry.glyph_index = glyph;

        size_t start = ix;
        while (ix < end && data[ix] != PSF2_END_GLYPH_ENTRY && data[ix] != PSF2_START_SEQUENCE)
        {
            ix = utf8_increment(data,ix);
        }
        if (ix != start) {
            std::string sequence = std::string(data,start,ix-start);
            std::u32string sequence32 = utf8_to_u32string(sequence);
            for (auto c : sequence32) {
                valid_unicode_characters.insert(c);
                unicode_to_glyph[c] = glyph; 
            }
            map_entry.unicode_chars = sequence;
        }
        while (ix < end && data[ix] == PSF2_START_SEQUENCE)
        {
            ++ix;
            size_t start = ix;
            while (ix < end && data[ix] == PSF2_START_SEQUENCE && data[ix] != PSF2_END_GLYPH_ENTRY)
            {
                ix = utf8_increment(data,ix);
            }
            std::string sequence = std::string(data,start,ix-start);
            std::u32string sequence32 = utf8_to_u32string(sequence);
            if (sequence32.length() == 0) {
                throw std::runtime_error("Invalid font file.");
            }

            map_entry.unicode_sequences.push_back(sequence);
            
            if (sequence32.length() == 1) {
                valid_unicode_characters.insert(sequence32[0]);
                unicode_to_glyph[sequence32[0]] = glyph; 
            } else {
                for (auto c: sequence32) {
                    valid_unicode_characters.insert(c);
                }
                composedCharacters.push_back(ComposedCharacter(std::move(sequence32),glyph));
            }
        }
        if (ix < end && data[ix] == PSF2_END_GLYPH_ENTRY)
        {
            ++ix;
        }
        unicode_map_.push_back(map_entry);
        ++glyph; 
        if (glyph >= char_count_) {
            break;
        }
    }
    this->map_data_end_ = start_ + ix;

}

std::optional<size_t> ConsoleFontImpl::get_glyph_position(const std::string &character) 
{
    std::u32string c32 = utf8_to_u32string(character);
    if (c32.length() == 1) {
        return get_glyph_position(c32[0]);
    } else {
        for (auto& composed: composedCharacters) {
            if (composed.characters == c32) {
                return composed.glyph;
            }
        }
    }
    return std::nullopt;
}

std::optional<size_t> ConsoleFontImpl::get_glyph_position(char32_t character) 
{
    auto it = unicode_to_glyph.find(character);
    if (it != unicode_to_glyph.end()) {
        return it->second;
    }
    return std::nullopt;
}



bool ConsoleFontImpl::can_get_console_font() 
{

    int console_fd = open("/dev/tty", O_RDWR);
    if (console_fd < 0) return false;

    int console_type;
    if (ioctl(console_fd, KDGETMODE, &console_type) == 0) {
        close(console_fd);
        return console_type == KD_TEXT;
    }
    close(console_fd);
    return false;
}

void ConsoleFontImpl::get_console_font() {
    TempFile tempFile(".psf");

    std::stringstream ss;
    ss << "setfont -O " << tempFile.path().string() ;
    std::cout << ss.str() << std::endl;
    int result = system(ss.str().c_str());
    if (result < 0) 
    {
        throw std::runtime_error("Failed to get console font. (system call failed)");
    }
    if (!WIFEXITED(result) || WEXITSTATUS(result) != EXIT_SUCCESS)
    {
       throw std::runtime_error(NSS("Failed to get console font (res: " << result << " status = "<< WEXITSTATUS(result) << ")."));
    }
    load(tempFile.path());
}


void ConsoleFontImpl::set_console_font() {
    TempFile tempFile(".psf");
    this->save(tempFile.path());

    std::stringstream ss;
    ss << "setfont  " << tempFile.path().string() ;
    std::cout << ss.str() << std::endl;
    int result = system(ss.str().c_str());
    \
    if (result < 0) 
    {
        throw std::runtime_error("Failed to get console font. (system call failed)");
    }

    if (!WIFEXITED(result) || WEXITSTATUS(result) != EXIT_SUCCESS)
    {
       throw std::runtime_error(NSS("Failed to get console font (res: " << result << " status = "<< WEXITSTATUS(result) << ")."));
    }

    
}



ConsoleFont::ptr ConsoleFont::create()
{
    return std::shared_ptr<self>(new ConsoleFontImpl());
}


std::vector<uint8_t> ConsoleFontImpl::get_glyph_data(size_t glyph)
{
    size_t start = char_data_offset_ + glyph * char_size_;
    size_t end = start+char_size_;
    if (end > this->char_data_end_) {
        throw std::runtime_error("Invalid index.");
    }
    return std::vector<uint8_t>(data.begin() + start, data.begin() + end);
}

void ConsoleFontImpl::set_glyph_data(
    size_t glyph_position,
    char32_t unicode_character, 
    std::vector<uint8_t> bits)  {
    if (bits.size() != this->char_size_) 
    {
        throw std::runtime_error("Invalid data.");
    }
    
    size_t start = char_data_offset_ + glyph_position * char_size_;
    size_t end = start+char_size_;
    if (end > this->char_data_end_) {
        throw std::runtime_error("Invalid index.");
    }
    for (size_t i = 0; i < char_size_; ++i) {
        data[start+i] = bits[i];
    }
    if (has_unicode_map_)
    {
        std::string strChar = u32string_to_utf8(std::u32string(1,unicode_character));

        // remove any existing entry for the new character.
        for (auto& entry: unicode_map_) {
            auto pos = entry.unicode_chars.find(strChar);
            if (pos != std::string::npos) {
                        entry.unicode_chars.erase(pos,strChar.length());
            }
        }   

        if (glyph_position >= unicode_map_.size())
        {
            throw std::runtime_error("Invalid glyph position.");
        }
        ConsoleMapEntry& entry = unicode_map_[glyph_position];
        std::u32string oldChars = utf8_to_u32string(entry.unicode_chars);
        for (auto c: oldChars) {
            unicode_to_glyph.erase(c);
            this->valid_unicode_characters.erase(c);
        }
        entry.unicode_chars = strChar;
        entry.unicode_sequences.resize(0);
        this->valid_unicode_characters.insert(unicode_character);
        this->unicode_to_glyph[unicode_character] = glyph_position;
    }

}

ConsoleFont::ptr ConsoleFontImpl::clone()
{
    return std::shared_ptr<ConsoleFontImpl>(new ConsoleFontImpl(*this));    
}


#endif


