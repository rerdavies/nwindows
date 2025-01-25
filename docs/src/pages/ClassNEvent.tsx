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

import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import ClassDescription, {
    ClassSectionHead, MethodDescription,
    MethodDescriptions,
    TypeDefinitions,
    UsingDescription

} from '../ClassDescription';
import Code from '../Code';
import M, { ML } from '../M';

function ClassNEvent() {

    return (
        <DocsPage route="/apis/classes/NEvent">
            <h1>{DocsTitle("/apis/classes/NEvent")}</h1>

            <ClassDescription name="NEvent" text={`template<typename... Args>
class NEvent<void(Args...)>`} >
                <p><M>NEvent</M> implements subscribable events. It takes a single template argument which must be the signature of a function with a void return type.</p>
                <p><M>NEvent</M> is used as follows:</p>
                <Code text={`NEvent<int i, float f> my_event;

NEventHandle handle = my_event.subscribe(
    [](int i, float f) {
         /* Do something */ 
    }
);

my_event.fire(42, 3.14f);

my_event.unsubscribe(handle);`} />
                <p>When an event is fired, all subscribed handlers are called with the arguments passed to <M>fire</M>. Handlers are called in the order they were subscribed.</p>
                <p>Handlers can be lambdas, function pointers, or any other callable object that matches the event signature.</p>
                <p>Each handler is assigned a unique ID when it is subscribed. This ID can be used to unsubscribe from the event.</p>
                <p>NEvents are not thread-safe, and can only be used from one thread at a time.</p>
                <TypeDefinitions>
                    <UsingDescription indexName={"NEvent::EventHandler"} declaration={`using EventHandler = std::function<void(Args...)>;`} >
                    </UsingDescription>
                </TypeDefinitions>
                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName={"NEvent::NEvent()"} method="NEvent()" >
                </MethodDescription>
                <MethodDescriptions>
                    <MethodDescription indexName={"NEvent::subscribe"} method={
                        `NEventHandle subscribe(
    std::function<void(Args...)> &&handler
);`} >
                        Subscribe to the event. The handler will be called whenever the event fires. Returns an <ML name="NEventHandle" /> that can be used to unsubscribe from the event.
                    </MethodDescription>
                    <MethodDescription indexName={"NEvent::unsubscribe"} method={
                        `bool unsubscribe(
    NEventHandle id
);`} >
                        Unsubscribe from the event. Returns <M>true</M> if the handler was successfully removed, <M>false</M> otherwise.
                    </MethodDescription>
                    <MethodDescription indexName={"NEvent::fire"} method={
                        `void fire(
    Args... args
);`} >
                        Fire the event. Calls all subscribed handlers with the given arguments.
                    </MethodDescription>
                    <MethodDescription indexName={"NEvent::clear"} method={
                        `void clear();`} >
                        Clear all subscribers.
                    </MethodDescription>
                    <MethodDescription indexName={"NEvent::subscriber_count"} method={
                        `size_t subscriber_count() const;`} >
                        Get the number of current subscribers.
                    </MethodDescription>
                </MethodDescriptions>
            </ClassDescription>

        </DocsPage>

    );

    /* 
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

*/    
}
export default ClassNEvent;
