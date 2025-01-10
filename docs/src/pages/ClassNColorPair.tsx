import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import ClassDescription, {
    
    
} from '../ClassDescription';
import M from '../M';

function ClassNColorPair() {

    return (
        <DocsPage route="/apis/classes/NColorPair">
            <h1>{DocsTitle("/apis/classes/NColorPair")}</h1>

            <ClassDescription name="NColorPair" >
                <p>A opaque wrapper class for indices of color pairs (foreground and background) colors that can
                    be used to control the color of text onscreen. Constructable only via <M>NWindow::make_color_pair</M>.
                    The number of distinctNColorPair indices is limited, and the limit varies depending on the
                    terminal on which output is being displayed. <M>NColorPair</M>s are allocated for the lifetime of the
                    top-level window and are not recycled (although NColorPairs with the same foreground and
                    background color share the same index).
                </p>

            </ClassDescription>

        </DocsPage>

    );
}
export default ClassNColorPair;
