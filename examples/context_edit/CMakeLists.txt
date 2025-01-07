cmake_minimum_required(VERSION 3.16.0)

set(CMAKE_CXX_STANDARD 20)

add_compile_options(
    "-Werror" "-Wall" "-Wpedantic" "-Wuninitialized"
)

add_executable(context_edit
    context_edit.cpp
)

target_link_libraries(
    context_edit PRIVATE
    nwindows
)


