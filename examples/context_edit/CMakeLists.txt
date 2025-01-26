cmake_minimum_required(VERSION 3.16.0)


add_compile_options(
    "-Werror" "-Wall" "-Wpedantic" "-Wuninitialized"
)

add_executable(context_edit
    context_edit.cpp
)

target_compile_features(context_edit PUBLIC cxx_std_20)

target_link_libraries(
    context_edit PRIVATE
    nwindows
)


