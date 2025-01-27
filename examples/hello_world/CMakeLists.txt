cmake_minimum_required(VERSION 3.16.0)

set(CMAKE_CXX_STANDARD 20)

add_executable(hello_world
    hello_world.cpp
)

target_link_libraries(
    hello_world PRIVATE
    nwindows
)


