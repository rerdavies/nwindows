cmake_minimum_required(VERSION 3.16.0)
project(monitor_gpu 
    VERSION 0.0.1
    DESCRIPTION "Monitor CPU and GPU clock speeds."
)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(NWINDOWS_BUILD_DOCUMENTATION ON CACHE BOOL "Build the Vite Documentation website?")
set(NWINDOWS_BUILD_EXAMPLES ON CACHE BOOL "Build the exmaple projects?")

add_subdirectory("src")


if (NWINDOWS_BUILD_EXAMPLES)
    add_subdirectory("examples")
endif()

# Docs are built by seperate CI step on github. The main CI build doesn't have NPM/Node JS installed.
if(NOT DEFINED ENV{GITHUB_ACTIONS})
    add_subdirectory("docs")
endif()
