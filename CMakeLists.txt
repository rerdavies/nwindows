cmake_minimum_required(VERSION 3.16.0)
project(monitor_gpu 
    VERSION 0.0.1
    DESCRIPTION "Monitor CPU and GPU clock speeds."
)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

set(NWINDOWS_BUILD_DOCUMENTATION ON CACHE BOOL "Build the Vite Documentation website?")

add_subdirectory("src")


add_subdirectory("examples/hello_world")
add_subdirectory("examples/hello_world2")
add_subdirectory("examples/context_edit")

# Docs are built by seperate CI step on github. The main CI build doesn't have NPM/Node JS installed.
if(NOT DEFINED ENV{GITHUB_ACTIONS})
    add_subdirectory("docs")
endif()
