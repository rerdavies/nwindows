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
     "/licenses"\
     "/support"\
     "/installing"\
     "/packaging"\
     "/using"\
     "/using/fundamentals"\
     "/using/hello"\
     "/using/elements"\
     "/using/windows"\
     "/using/events"\
     "/using/events/keyboard"\
     "/using/events/mouse"\
     "/using/events/other"\
     "/using/custom"\
     "/using/custom/unicode"\
     "/using/custom/inherit"\
     "/using/custom/compose"\
     "/using/custom/full"\
     "/using/dispatcher"\
     "/apis"\
     "/apis/defines"\
     "/apis/constants"\
     "/apis/typedefs"\
     "/apis/enums"\
     "/apis/structs"\
     "/apis/methods"\
     "/apis/classes"\
     "/apis/classes/NBoxElement"\
     "/apis/classes/NButtonElement"\
     "/apis/classes/NButtonBaseElement"\
     "/apis/classes/NCheckboxElement"\
     "/apis/classes/NColor"\
     "/apis/classes/NColorPair"\
     "/apis/classes/NContainerElement"\
     "/apis/classes/NDropdownElement"\
     "/apis/classes/NElement"\
     "/apis/classes/NHorizontalStackElement"\
     "/apis/classes/NMenuElement"\
     "/apis/classes/NMessageWindow"\
     "/apis/classes/NPopupWindow"\
     "/apis/classes/NPopupMenuWindow"\
     "/apis/classes/NRadioGroupElement"\
     "/apis/classes/NTextElement"\
     "/apis/classes/NTextEditElement"\
     "/apis/classes/NVerticalStackElement"\
     "/apis/classes/NWindow"\
     "/index_builder"\
     "/index"\
     "/search"\
)

for str in "${strings[@]}"; do
    echo "Processing $str"
    mkdir -p $1$str
    cp $1/index.html $1$str/index.html
done
