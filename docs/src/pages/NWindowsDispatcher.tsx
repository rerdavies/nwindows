import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import M from '../M';
import ClassDescription, { MethodDescription } from '../ClassDescription';
import Code from '../Code';



function NWindowsDispatcher() {
    return (
        <DocsPage route="/using/dispatcher">
            <h1>{DocsTitle("/using/dispatcher")}</h1>
            <p>NWindows is single-threaded. It doesn't have to run on the main thread; but all NWindows
                methods, with the exception of dispatcher methods, must be called from a single thread.
            </p>
            <p>The NWindows dispatcher maintains a  queue of functions (C++ lambdas) that will be executed 
                in order they are added to the queue. The dispatcher executes in the NWindows main event loop,
                and can be used to 
            </p>
            <ul>
                <li>Post a function to be executed on the main NWindows thread from another thread that
                    is external to NWindows.
                </li>
                <li>Post a function that will be executed after a delay.
                </li>
                <li>Post a function that will later be executed in the event loop after control returns 
                    to the event loop and after all previously posted functions and message loop 
                    processes have completed.
                </li>
            </ul>
            <p>Applications can call <M>post</M> methods on any <M>NWindow</M>, but functions are
                relayed to the top-level window's dispatcher. There is only one message loop,
                which is executed by <M>NWindow::run()</M> on the top-level window. And there is
                only one dispatch queue, which is owned by the top-level window, so posted functions
                can and will still execute if they are posted to a child window that is subsequently closed.</p>
            <p>Each <M>post</M> method returns a <M>PostHandle</M> which can be used to
                cancel execution of a posted function, using <M>NWindow::cancel_post</M>.</p>
            <p>Any context that a posted lambda carries must be provided through
                lambda capture variables. Great care should be taken when capturing
                variables to make sure that captured variables are still valid when
                the lambda executes. And posts with delays should either
                use <M>std::weak_ptr</M> to capture <M>shared_ptr</M> references, or
                should should be cancelled in the <M>on_detach</M> methods of elements
                that post them. Capturing <M>shared_ptr</M> references in lambdas that
                have been posted with a delay may prevent elements or <M>NWindow</M>s from
                ever being deleted. All NWindows elements and <M>NWindow</M>s provide
                a <M>weak_from_this&lt;T&gt;</M> method which make it easy to capture
                a weak reference. For example:
            </p>
            <Code text={`PostHandle postHandle = window()->post(
    std::chrono::milliseconds(1250),
    [elementRef = textElement->weak_from_this<NTextElement>()](
    {
        auto textElement = elementRef.lock();
        if (!textElement) return;

        textElement->text("Message delivered.");
    }
);`} />

            <ClassDescription className="NWindow" baseClass="NElement">
                <MethodDescription method={
                    `PostHandle post(
    NWindows::clock_t::duration delay, 
    std::function<void(void)>&& func);`} >
                    <p>Post a function to be executed after a delay. The function will be executed
                        on the main NWindows thread. This method is thread-safe.
                    </p>
                </MethodDescription>
                <MethodDescription method={
                    `PostHandle post(
    NWindows::clock_t::time_point when, 
    std::function<void(void)>&& func);`} >
                    <p>Post a function to be executed at the specified time. The function will be executed
                        on the main NWindows thread. This method is thread-safe.
                    </p>
                </MethodDescription>
                <MethodDescription method={
                    `PostHandle post(
    std::function<void(void)>&& func);`} >
                    <p>Post a function to be executed as soon as possible. The function will be executed
                        on the main NWindows thread. If posted from the main thread, the 
                        function will execute after control has been returned to 
                        the message loop, and after all other event-loop processes
                        have completed.
                    </p>
                    <p>This method can be called from any thread.</p>
                </MethodDescription>
                <MethodDescription method={
                    `bool cancel_post(PostHandle handle);`} >
                    <p>Cancel a previous post, whether immediate or delayed. If posted from a 
                        thread other than the main NWindows thread, the function is guaranteed not to 
                        execute after <M>cancel_post</M> returns, although it may execute while <M>cancel_post</M> 
                        is executing. If the function has already executed, <M>cancel_post</M> will return <M>false</M>.
                        If the function was successfully prevented from executing, <M>cancel_post</M> returns true.
                    </p>
                    <p><M>cancel_post</M> can be safely called from any thread.</p>
                </MethodDescription>

                

            </ClassDescription>

        </DocsPage >

    );
}

export default NWindowsDispatcher;