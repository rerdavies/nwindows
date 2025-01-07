import DocsPage from '../DocsPage';
import M from '../M';
import ClassDescription, { MethodDescription, ParameterList, Returns } from '../ClassDescription';
import { CodeFragment2 } from '../Code';
import SectionHead from '../SectionHead';



export default function NEvent() {
    return (
        <DocsPage route="/apis/NEvent">
            <SectionHead text="The NEvent<> Class &mdash; The Foundation" />

            <p>The <M>NEvent&lt;&gt;</M> class is the foundation of event notification in NWindows. All event
                notifications in  NWindows occur through <M>NEvent&lt;&gt;</M></p>

            <ClassDescription prefix="" className="template<typename T> class NEvent<T>" >
                <p>A valid <M>NEvent&lt;T&gt;</M> must match the form:</p>
                <CodeFragment2 text={`template <ARGS...>
class NEvent<void(ARGS...)>;`} />
                <p>i.e. the template argument must be the signature of a function returning void.</p>

                <p>The template argument to NEvent is a function signature that defines what the function
                    signature of event notification handlers should be. Subscribers to the event must add a
                    C++ lambda (a std::function&lt;&gt;) to the event using using the <M>NEvent::subscribe</M>
                    method. Once subscribed, the lambda will be called each time the event fires.
                </p>
                <p>A concrete example helps. Consider the declaration</p>
                <CodeFragment2 text={`NEvent<void(int button, NClickedEvent&event_args)> on_clicked;`} />
                <p>Subscribers must supply a c++ lambda that has the a type of</p>
                <CodeFragment2 text={`std::function<void(int button, NClickedEvent&event_args)>`} />
                <p>which would look like this:</p>
                <CodeFragment2 text={`on_clicked.subscribe(
[] (int button, NClickedEvent&event_args) {
    /*DO SOMETHING*/
}
);`} />
                <p>The lambda will be called each time the event is fired. To fire the event, one would call </p>
                <CodeFragment2 text={`NClickedEventArgs event_args;
on_clicked.fire(0,event_args);
`} />

                <h3>Methods</h3>
                <MethodDescription method={
`EventHandle subscribe(const std::function<void(ARGS...)> &callback);",
EventHandle subscribe(std::function<void(ARGS...)>&& callback;`}
                >
                    <p> Adds a lambda to the event subscription list. The lambda will be called each time the event is fired.</p>
                    <ParameterList>
                        <div>callback</div>
                        <div>The lambda to be called when the event is fired.</div>
                    </ParameterList>
                    <Returns>
                        <div>A handle that can subsequently be used to cancel the event.</div>
                    </Returns>
                </MethodDescription>
                <MethodDescription method={`void unsubscribe(EventHandle handle);`}
                >
                    <p>Unsubscribes a lambda from the event.</p>
                    <ParameterList>
                        <div>handle</div>
                        <div>The event handle returned by the <M>subscribe</M> method.</div>
                    </ParameterList>
                </MethodDescription>

            </ClassDescription>
        </DocsPage>

    );
}