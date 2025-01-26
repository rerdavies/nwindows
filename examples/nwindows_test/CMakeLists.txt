cmake_minimum_required(VERSION 3.16.0)

set(CMAKE_CXX_STANDARD 20)

add_compile_options(
    "-Werror" "-Wall" "-Wpedantic" "-Wuninitialized"
)

add_executable(nwindows_test
    test_main.cpp
    tests.hpp
    box_test_window.cpp
    menu_test_window.cpp
    unicode_test_window.cpp
    edit_text_test_window.cpp
    error_test_window.cpp
    rendering_test_window.cpp
)

target_link_libraries(
    nwindows_test PRIVATE
    nwindows
)


