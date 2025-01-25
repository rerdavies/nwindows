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
    EventDescriptions, EventDescription, MethodDescription,
    MethodDescriptions, TypeDefinitions, UsingDescription,
    ParameterList
} from '../ClassDescription';
import CenteredImage from '../CenteredImage';
import M, { ML } from '../M';

function ClassNMessageWindow() {

    let className = "NMessageWindow";

    let classRoute = "/apis/classes/" + className;
    return (
        <DocsPage route={classRoute}>
            <h1>{DocsTitle(classRoute)}</h1>
            <ClassDescription name="NMessageWindow" baseClass="NWindow">
                <p>
                    <M>NMessageWindow</M> is an simple message dialog for showing error, warning and information messages.
                </p>
                <CenteredImage src="/nwindows/image/sample_NMessageWindow.png" alt="NMessageWindow" />
                <p>If the output terminal supports Unicode, an icon appropriate to the message type is displayed; if Unicode is not
                    supported, NWindows falls back to displaying the message window without an icon.
                </p>

                <TypeDefinitions>
                    <UsingDescription indexName={"NMessageWindow::super"} declaration="using super = NWindow;" >
                    </UsingDescription>
                    <UsingDescription indexName={"NMessageWindow::self"} declaration="using self = NMessageWindow;" >
                    </UsingDescription>
                    <UsingDescription indexName="NMessageWindow::ptr" declaration={`using ptr = std::shared_ptr<self>;`} >
                    </UsingDescription>
                </TypeDefinitions>

                <MethodDescriptions title="Create Methods">
                    <MethodDescription indexName={`static NMessageWindow::ptr NMessageWindow::create(NWindow::ptr parent_window, NMessageType message_type, const std::string& title, const std::string& message, int message_width = AUTO_SIZE)`}
                        method={`static NMessageWindow::ptr create(
    NWindow::ptr parent_window,
    NMessageType message_type,
    const std::string& title,
    const std::string& message,
    int message_width = AUTO_SIZE);`}
                    >
                        <ParameterList>
                            <div>parentWindow</div>
                            <div>The parent window of the message dialog.</div>

                            <div>message_type</div>
                            <div>The type of message being displayed. See <ML name="NMessageType" /></div>

                            <div>title</div>
                            <div>The title of the message dialog.</div>

                            <div>message</div>
                            <div>The message to display.</div>

                            <div>width</div>
                            <div>The width of the message-text portion of the dialog only, excluding padding and window decorations.</div>
                        </ParameterList>
                        <p>Returns a pointer to a newly-created <M>NMessageWindow</M>. The <M>NMessageWindow</M> shows itself
                            automatically, and takes care of closing the window when the OK button is pressed. Subscribe to the
                            window's <ML name="NMessageWindow::on_closed" /> event if you need to know when the dialog is dismissed.</p>
                    </MethodDescription>
                </MethodDescriptions>
                <EventDescriptions>
                    <EventDescription indexName={`NEvent<void(NMessageWindow::ptr source)> NMessageWindow::on_closed`}
                        event={`NEvent<
    void(NMessageWindow::ptr source)
> on_closed`}
                    >
                        <div>Fired when the dialog's OK button is clicked..</div>
                    </EventDescription>

                </EventDescriptions>
            </ClassDescription>

        </DocsPage>

    );
    /*
class NMessageWindow : public NWindow {
    protected:
        NMessageWindow(
            NWindow::ptr parent_window,
            const std::string& title,
            int width
        );
        void init(NWindow::ptr parent_window, NMessageType message_type, const std::string& message, int message_width);
    public:
        using self = NMessageWindow;
        using super = NWindow;
        using ptr = std::shared_ptr<NMessageWindow>;

        static ptr create(
            NWindow::ptr parent_window,
            NMessageType message_type,
            const std::string& title,
            const std::string& message,
            int width = AUTO_SIZE);


    */

}
export default ClassNMessageWindow;
