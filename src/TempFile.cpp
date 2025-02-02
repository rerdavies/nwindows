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

#include "TempFile.hpp"

#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>

using namespace nwindows;

#include <random>
#include <sstream>
#include <iomanip>
#include <fstream>



static std::random_device rd;
static std::uniform_int_distribution<uint64_t> dist;



std::filesystem::path TempFile::make_path(const std::string &extension)
{


    
    std::filesystem::path tempDir = std::filesystem::temp_directory_path();
    while (true)
    {
        uint64_t high = dist(rd);
        uint64_t low = dist(rd);

        std::stringstream ss;
        ss.imbue(std::locale("C"));
        ss << std::hex << high << std::hex << low << extension;

        std::filesystem::path tempFile = tempDir / ss.str();
        int f = open(tempFile.c_str(), O_CREAT | O_EXCL | O_RDWR, 0600);

        if (f != -1)
        {
            close(f);
            return tempFile;
        }
    }
}
