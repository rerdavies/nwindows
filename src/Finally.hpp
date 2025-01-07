#pragma once

#include <functional>
#include <memory>


class Finally {
public:
    using callback_t = std::function<void(void)>;
    Finally() = delete;
    Finally(const Finally*other) = delete;
    Finally operator=(const Finally&other) = delete;

    Finally(callback_t &&fn)
    :fn(std::move(fn))
    {

    }
    ~Finally() {
        fn();
    }
private:
    callback_t fn;
};