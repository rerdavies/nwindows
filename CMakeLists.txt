cmake_minimum_required(VERSION 3.16.0)
project(nwindows
    VERSION 0.0.1
    DESCRIPTION "Modern Text User Interface Library for C++."
    HOMEPAGE_URL "https://rerdavies.github.io/nwindows/"
    LANGUAGES CXX
)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(NWINDOWS_BUILD_DOCUMENTATION ON CACHE BOOL "Build the Vite Documentation website?")
set(NWINDOWS_BUILD_EXAMPLES ON CACHE BOOL "Build the exmaple projects?")
# Set to ON if you wish to set compler options froma parent CMakeList.txt file.
set(NWINDOWS_DEFAULT_COMPILER_OPTIONS OFF CACHE BOOL "Use default compiler options?")



if (NOT NWINDOWS_DEFAULT_COMPILER_OPTIONS)

    set(CMAKE_CXX_STANDARD 20)

    #if CLANG Compiler
    if(CMAKE_CXX_COMPILER_ID STREQUAL "Clang")
        add_compile_options(
            "-Werror" "-Wall" "-Wpedantic" "-Wuninitialized"
        )
    endif()
    # if GNU compiler   
    if(CMAKE_CXX_COMPILER_ID STREQUAL "GNU")
        add_compile_options(
            "-Werror" "-Wall" "-Wpedantic" "-Wuninitialized"
        )
    endif()
endif()


add_subdirectory("src")


if (NWINDOWS_BUILD_EXAMPLES)
    add_subdirectory("examples")
endif()

# Docs are built by seperate CI step on github. The main CI build doesn't have NPM/Node JS installed.
if(NOT DEFINED ENV{GITHUB_ACTIONS})
    add_subdirectory("docs")
endif()

#debian packaging 
set(CPACK_DEBIAN_PACKAGE_MAINTAINER "Robin E. R. Davies <rerdavies@gmail.com>")
set(CPACK_DEBIAN_FILE_NAME 'nwindows$CMAKE_PACKAGE_MAJOR-$ARCH.deb')
set(CPACK_DEBIAN_PACKAGE_DESCRIPTION "Modern Text User Interface Library for C++")
set(CPACK_DEBIAN_PACKAGE_DEPENDS "xclip, libicu-dev")
include(CPack)
