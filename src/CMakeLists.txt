cmake_minimum_required(VERSION 3.16.0)

set(CMAKE_CXX_STANDARD 20)


# add_compile_definitions(_GLIBCXX_DEBUG)


add_compile_options(
    "-Werror" "-Wall" "-Wpedantic" "-Wuninitialized"
)


add_library(nwindows 
    include/NWindows/NClipboard.hpp
    include/NWindows/NWindows.hpp
    include/NWindows/NUtf8.hpp
    include/NWindows/NEvent.hpp
    include/NWindows/NUnicodeServices.hpp
    PrivateElements.hpp
    NWindows.cpp
    NUnicodeServices.cpp
    NUnicodeServices.cpp
    NUtf8.cpp
    NClipboard.cpp
)

set_property(TARGET nwindows PROPERTY POSITION_INDEPENDENT_CODE ON) # -fPic on GCC.

target_include_directories(
    nwindows PUBLIC include

)
target_compile_features(nwindows PUBLIC cxx_std_20)

target_link_libraries(
    nwindows PUBLIC
    panelw ncursesw 
)

if(CMAKE_BUILD_TYPE STREQUAL "Debug")
    target_compile_definitions(nwindows PUBLIC DEBUG DEBUG_NELEMENT_LIFECYCLE)

    add_compile_definitions(_GLIBCXX_DEBUG)


    if(CMAKE_CXX_COMPILER_ID STREQUAL "GNU")
        target_compile_definitions(nwindows PUBLIC  _GLIBCXX_DEBUG)
    endif()

endif()

target_include_directories(nwindows PUBLIC
    include/NWindows
)

add_executable(locale_test
    test_locale.cpp
)

target_link_libraries(
    locale_test PRIVATE
    nwindows
)



