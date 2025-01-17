/*
 *   Copyright (c) 2025 Robin E. R. Davies
 *   All rights reserved.

 *   Permission is hereby granted, free of charge, to any person obtaining a copy
 *   of this software and associated documentation files (the "Software"), to deal
 *   in the Software without restriction, including without limitation the rights
 *   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *   copies of the Software, and to permit persons to whom the Software is
 *   furnished to do so, subject to the following conditions:

 *   The above copyright notice and this permission notice shall be included in all
 *   copies or substantial portions of the Software.

 *   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *   SOFTWARE.
 */

#include <functional>
#include <concepts>
#include "NWindows/NWindows.hpp"
#include <memory>

using namespace nwindows;

template <typename MANIPULATOR, typename ELEMENT> 
concept Manipulator = requires(MANIPULATOR manipulator, std::shared_ptr<ELEMENT> element) {
    { manipulator.apply(element) } -> std::same_as<std::shared_ptr<ELEMENT>>;
}; 

template <class P> 
class on_test_ : public NElementManipulator {
public:
    on_test_(P value): value(value) { }

    template <typename T> void apply(std::shared_ptr<T> element) const {
        element->on_test.subscribe(value);
    }
private:
    P value;
};

template <class P>
inline on_test_<P> on_test(P value)  {
    return on_test_<P>(value);
}

class TestClass: public NElement {
public:
    TestClass() : NElement("test") { }
    NEvent<void(std::shared_ptr<TestClass>)> on_test;
};

template <typename T, Manipulator<T> P> 
requires std::derived_from<T, NElement> && std::derived_from<P, NElementManipulator>
inline std::shared_ptr<T> operator |(std::shared_ptr<T> element, const on_test_<P>& manipulator) {
    manipulator.apply(element);
    return element;
}


int TestFunction()
{
    std::shared_ptr<TestClass> test = std::make_shared<TestClass>();

    test | on_test([] (std::shared_ptr<TestClass> source) {
        // do something.
    });

    return 0;
}
