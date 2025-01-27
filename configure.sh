#!/usr/bin/bash

# Configure cmake build.
echo Configuring cmake build...
mkdir -p build
cd build
cmake ..  "$@"
cd ..

