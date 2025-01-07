#!/bin/bash

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <directory>"
    exit 1
fi

if [ ! -d "$1" ]; then
    echo "The argument is not a valid directory."
    exit 1
fi

strings=(\
     "/documentation"\
     "/support"\
     "/installing"\
     "/using"\
     "/using/hello"\
     "/using/elements"\
     "/using/windows"\
     "/using/events"\
     "/using/events/keyboard"\
     "/using/events/mouse"\
     "/using/events/misc"\
     "/using/custom"\
     "/using/custom/inherit"\
     "/using/custom/compose"\
     "/using/custom/full"\
     "/using/dispatcher"\
     "/index"\
     "/search"\
     "/index_builder"\
     "/apis"\
)

for str in "${strings[@]}"; do
    mkdir -p $1$str
    cp $1/index.html $1$str/index.html
done