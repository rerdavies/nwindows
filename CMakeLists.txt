cmake_minimum_required(VERSION 3.16.0)
project(monitor_gpu 
    VERSION 0.0.1
    DESCRIPTION "Monitor CPU and GPU clock speeds."
)

set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_subdirectory("src")


add_subdirectory("examples/hello_world")
add_subdirectory("examples/hello_world2")
add_subdirectory("examples/context_edit")

add_subdirectory("docs")
