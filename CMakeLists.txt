cmake_minimum_required(VERSION 3.16.0)
project(nwindows
    VERSION 0.0.2
    DESCRIPTION "Modern Text User Interface Library for C++."
    HOMEPAGE_URL "https://rerdavies.github.io/nwindows/"
    LANGUAGES CXX
)
set(NWINDOWS_RELEASE_QUALIFIER "-beta2")



set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(NWINDOWS_BUILD_DOCUMENTATION ON CACHE BOOL "Build the Vite Documentation website?")
set(NWINDOWS_BUILD_EXAMPLES ON CACHE BOOL "Build the example projects?")
set(NWINDOWS_STRICT_COMPILER_OPTIONS ON CACHE BOOL "Use strict compiler warnings and errors?")

# Set version numbers in source files.
configure_file(
    "${CMAKE_CURRENT_SOURCE_DIR}/config/NWindowsVersionInfo.hpp.in"
    "${CMAKE_CURRENT_SOURCE_DIR}/src/include/NWindows/NWindowsVersionInfo.hpp"
)

configure_file(
    "${CMAKE_CURRENT_SOURCE_DIR}/config/NWindowsVersionInfo.tsx.in"
    "${CMAKE_CURRENT_SOURCE_DIR}/docs/src/NWindowsVersionInfo.tsx"
)
configure_file(
    "${CMAKE_CURRENT_SOURCE_DIR}/config/README.md"
    "${CMAKE_CURRENT_SOURCE_DIR}/README.md"
)



if (NWINDOWS_STRICT_COMPILER_OPTIONS)

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

EXECUTE_PROCESS( COMMAND dpkg --print-architecture COMMAND tr -d '\n' OUTPUT_VARIABLE DEBIAN_ARCHITECTURE )


#debian packaging 
set(CPACK_DEBIAN_FILE_NAME "nwindows_${PROJECT_VERSION}${NWINDOWS_RELEASE_QUALIFIER}_${DEBIAN_ARCHITECTURE}.deb")
set(CPACK_DEBIAN_PACKAGE_DESCRIPTION "Modern Text User Interface Library for C++")
set(CPACK_PACKAGE_DESCRIPTION_SUMMARY "Modern Text User Interface Library for C++")
set(CPACK_DEBIAN_PACKAGE_DEPENDS "xclip, libicu-dev")
set(CPACK_DEBIAN_PACKAGE_MAINTAINER "Robin E. R. Davies <rerdavies@gmail.com>")
set(CPACK_DEBIAN_PACKAGE_SECTION "devel")
set(CPACK_DEBIAN_PACKAGE_HOMEPAGE "https://rerdavies.github.io/nwindows/")
set(CPACK_DEBIAN_PACKAGE_SHLIBDEPS ON)

include(CPack)
