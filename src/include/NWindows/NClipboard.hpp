#pragma once

#include <string>
#include <memory>

namespace nwindows {
    class NClipboard {
    public:
        using self = NClipboard;
        using ptr = std::shared_ptr<self>;

        virtual ~NClipboard() = default;

        static ptr create();

        virtual bool available() const = 0;

        virtual bool set_text(const std::string& text) = 0;
        virtual std::string get_text() = 0;
    };

}
