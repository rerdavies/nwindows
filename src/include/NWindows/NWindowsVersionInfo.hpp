#pragma once

#include <format>
// Uses Semantic Versioning
#define NWINDOWS_MAJOR_VERSION 0
#define NWINDOWS_MINOR_VERSION 0
#define NWINDOWS_BUILD_NUMBER 1  // increments with each release
#define NWINDOWS_RELEASE_QUALIFIER "-beta"



#define NWINDOWS_VERSION_STRING() \
    std::format("NWindows {}.{}.{}{}", \
        NWINDOWS_MAJOR_VERSION,\
        NWINDOWS_MINOR_VERSION,\
        NWINDOWS_BUILD_NUMBER,\
        NWINDOWS_RELEASE_QUALIFIER)


