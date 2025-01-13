/*
 *   Copyright (c) 2024-2025 Robin E. R. Davies
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

#pragma once
#include <vector>
#include <functional>
#include <algorithm>
#include <cstdint>


namespace nwindows {
    using NEventHandle = uint64_t;

    template <typename T> 
    class NEvent 
    {
        static_assert(
        false && sizeof(T), // sizeof(T) dependent on T to make assertion dependent
        "T is only valid for function signatures with a void return type."
        " Usage: NEvent<void(Args...)>"
        );
    };

    template<typename... Args>
    class NEvent<void(Args...)> {
    public:
        // Unique identifier for each subscription

        // Type alias for the lambda function type
        using EventHandler = std::function<void(Args...)>;

        // Subscribe method to add a new event handler and return its unique ID
        NEventHandle subscribe(EventHandler handler) {
            NEventHandle id = next_id++;
            subscribers.emplace_back(id, handler);
            return id;
        }

        // Unsubscribe method to remove a specific handler by its ID
        bool unsubscribe(NEventHandle id) {
            auto it = std::remove_if(subscribers.begin(), subscribers.end(),
                [id](const auto& entry) {
                    return entry.first == id;
                });

            bool was_removed = (it != subscribers.end());
            subscribers.erase(it, subscribers.end());
            return was_removed;
        }

        // Fire method to invoke all subscribed handlers with given arguments
        void fire(Args... args) {
            // Create a copy of subscribers to allow safe modification during iteration
            auto current_subscribers = subscribers;
            for (auto& [id, handler] : current_subscribers) {
                handler(args...);
            }
        }

        // Optional: method to clear all subscribers
        void clear() {
            subscribers.clear();
            next_id = 0;  // Reset ID counter
        }

        // Optional: get the number of current subscribers
        size_t subscriber_count() const {
            return subscribers.size();
        }

    private:
        // Vector to store event handlers with their unique IDs
        std::vector<std::pair<NEventHandle, EventHandler>> subscribers;

        // Static counter to generate unique IDs
        inline static NEventHandle next_id = 1;
    };


    // Template class for a simple event system with multiple arguments

    template<typename... Args>
    class NEventX {
    public:
        // Unique identifier for each subscription

        // Type alias for the lambda function type
        using EventHandler = std::function<void(Args...)>;

        // Subscribe method to add a new event handler and return its unique ID
        NEventHandle subscribe(EventHandler handler) {
            NEventHandle id = next_id++;
            subscribers.emplace_back(id, handler);
            return id;
        }

        // Unsubscribe method to remove a specific handler by its ID
        bool unsubscribe(NEventHandle id) {
            auto it = std::remove_if(subscribers.begin(), subscribers.end(),
                [id](const auto& entry) {
                    return entry.first == id;
                });

            bool was_removed = (it != subscribers.end());
            subscribers.erase(it, subscribers.end());
            return was_removed;
        }

        // Fire method to invoke all subscribed handlers with given arguments
        void fire(Args... args) {
            // Create a copy of subscribers to allow safe modification during iteration
            auto current_subscribers = subscribers;
            for (auto& [id, handler] : current_subscribers) {
                handler(args...);
            }
        }

        // Optional: method to clear all subscribers
        void clear() {
            subscribers.clear();
            next_id = 0;  // Reset ID counter
        }

        // Optional: get the number of current subscribers
        size_t subscriber_count() const {
            return subscribers.size();
        }

    private:
        // Vector to store event handlers with their unique IDs
        std::vector<std::pair<NEventHandle, EventHandler>> subscribers;

        // Static counter to generate unique IDs
        inline static NEventHandle next_id = 1;
    };

    // // Example usage demonstrating the NEventT template class with unsubscribe
    // int main() {
    //     // Create an event that takes an int and a string
    //     NEvent<int, std::string> numberEvent;

    //     // Subscribe and store subscription IDs
    //     auto handler1Id = numberEvent.subscribe([](int num, std::string msg) {
    //         std::cout << "Handler 1 - Number: " << num 
    //                   << ", Message: " << msg << std::endl;
    //     });

    //     auto handler2Id = numberEvent.subscribe([](int num, std::string msg) {
    //         std::cout << "Handler 2 - Doubled Number: " << (num * 2) 
    //                   << ", Uppercase Message: " << msg << std::endl;
    //     });

    //     // Fire the event - both handlers will be called
    //     std::cout << "Initial event fire:" << std::endl;
    //     numberEvent.fire(42, "Hello, Event!");

    //     // Unsubscribe one handler
    //     std::cout << "\nAfter unsubscribing handler 2:" << std::endl;
    //     numberEvent.unsubscribe(handler2Id);

    //     // Fire the event again - only first handler will be called
    //     numberEvent.fire(42, "Hello, Event!");

    //     // Unsubscribe a non-existent handler
    //     bool removed = numberEvent.unsubscribe(999);
    //     std::cout << "\nAttempted to remove non-existent handler: " 
    //               << (removed ? "Removed" : "Not found") << std::endl;

    //     return 0;
    // }
}