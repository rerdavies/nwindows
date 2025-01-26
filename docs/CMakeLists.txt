cmake_minimum_required(VERSION 3.14)


# Only add the custom target for release builds

set(DOCS_BUILD_DIR "${CMAKE_CURRENT_SOURCE_DIR}/dist")

if (NWINDOWS_BUILD_DOCUMENTATION)
    if(CMAKE_BUILD_TYPE STREQUAL "Release" 
        OR CMAKE_BUILD_TYPE STREQUAL "MinSizeRel" 
        OR CMAKE_BUILD_TYPE STREQUAL "RelWithDebInfo")

        add_custom_command( 
            OUTPUT ${DOCS_BUILD_DIR}/index.html
                
            COMMAND npm run build
            COMMAND ./make_route_pages.sh ${DOCS_BUILD_DIR}
            WORKING_DIRECTORY ${CMAKE_CURRENT_SOURCE_DIR}
            COMMENT "Building Vite React website"

            DEPENDS 
            # find src/* public/* index.html -type f 
            src/api/NEvent.tsx
            src/App.css
            src/App.tsx
            src/assets/react.svg
            src/assets/logo-white.svg
            src/assets/volunteer_love_24_white.svg
            src/assets/volunteer_love_24.svg
            src/Banner.tsx
            src/CenteredImage.tsx
            src/ClassDescription.tsx
            src/Code.tsx
            src/DocsNav.tsx
            src/DocsPage.tsx
            src/ErrorBoundary.tsx
            src/index.bak.css
            src/IndexBuilder.tsx
            src/index.css
            src/IndexData.tsx
            src/Loading.tsx
            src/MainPageSearchBox.tsx
            src/main.tsx
            src/M.tsx
            src/Name.tsx
            src/NavigationType.tsx
            src/NotFound.tsx
            src/PageColumn.tsx
            src/pages/NWindowsWindows.tsx
            src/pages/HomePage.tsx
            src/pages/ClassNButtonBaseElement.tsx
            src/pages/InstallingNWindows.tsx
            src/pages/ClassNRadioGroupElement.tsx
            src/pages/ClassNPopupMenuWindow.tsx
            src/pages/ApiTypedefs.tsx
            src/pages/ClassNEvent.tsx
            src/pages/ClassNHorizontalStackElement.tsx
            src/pages/ApiConstants.tsx
            src/pages/ClassNCheckboxElement.tsx
            src/pages/ClassNMenuElement.tsx
            src/pages/PlatformSupport.tsx
            src/pages/ApiMethods.tsx
            src/pages/ClassNTextElement.tsx
            src/pages/KeyboardEvents.tsx
            src/pages/ClassNObject.tsx
            src/pages/FullCustomControl.tsx
            src/pages/ClassNColor.tsx
            src/pages/IndexPage.tsx
            src/pages/NWindowsApis.tsx
            src/pages/ClassNVerticalStackElement.tsx
            src/pages/CustomControls.tsx
            src/pages/ClassNPopupWindow.tsx
            src/pages/HelloNWindows.tsx
            src/pages/ApiStructs.tsx
            src/pages/InheritingCustomControl.tsx
            src/pages/NWindowsEvents.tsx
            src/pages/ClassNColorPair.tsx
            src/pages/ApiDefines.tsx
            src/pages/ClassNWindow.tsx
            src/pages/ClassNTextEditElement.tsx
            src/pages/UsingNWindows.tsx
            src/pages/NWindowsFundamentals.tsx
            src/pages/Documentation.tsx
            src/pages/ClassNMessageWindow.tsx
            src/pages/ClassNElement.tsx
            src/pages/ComposedCustomControl.tsx
            src/pages/Licenses.tsx
            src/pages/NWindowsElements.tsx
            src/pages/MouseEvents.tsx
            src/pages/ClassNButtonElement.tsx
            src/pages/ClassNContainerElement.tsx
            src/pages/OtherEvents.tsx
            src/pages/NWindowsDispatcher.tsx
            src/pages/ApiEnums.tsx
            src/pages/ApiClasses.tsx
            src/pages/ClassNBoxElement.tsx
            src/pages/ScratchPage.tsx
            src/pages/ClassNDropdownElement.tsx
            src/pages/CustomUnicode.tsx
            src/pages/PackagingNWindows.tsx
            src/PersistentScrollDiv.tsx
            src/SearchBox.tsx
            src/SearchPage.tsx
            src/SectionHead.tsx
            src/SiteIndexData.tsx
            src/UseWindowSize.tsx
            src/vite-env.d.ts
            public/image/sample_attributes.png
            public/image/screenshot.png
            public/image/sample_checkbox.png
            public/image/sample_menuelement.png
            public/image/sample_radiogroup.png
            public/image/sample_textedit.png
            public/image/hello_world2.png
            public/image/sample_ContextEditElement.png
            public/image/sample_box.png
            public/image/sample_button.png
            public/image/sample_NMessageWindow.png
            public/image/sample_dropdown.png
            public/image/sample_buttons.png
            public/image/hello_world.png
            public/image/sample_menu_icons.png
            public/logo.png
            public/logo.svg
            public/logo-white.png
            public/logo-white.svg
            index.html
        )

    add_custom_target(build_docs ALL
        DEPENDS ${DOCS_BUILD_DIR}/index.html
    )

    endif()

endif()


