import DocsPage from '../DocsPage';
import { DocsTitle } from '../DocsNav';
import ClassDescription, {
    ClassSectionHead, MethodDescription
    
} from '../ClassDescription';
import M from '../M';

function ClassNColor() {

    return (
        <DocsPage route="/apis/classes/NColor">
            <h1>{DocsTitle("/apis/classes/NColor")}</h1>

            <ClassDescription name="NColor" >
                <p>Wrapper class for a color index allocated by <M>NWindow::make_color</M>. <M>NColor::Black</M> and <M>NColor::White</M>  are
                    pre-reserved color indexes. Only really useful for making <M>NColorPairs</M>s.</p>
                <ClassSectionHead text="Constructors" />
                <MethodDescription indexName={"NColor::NColor()"} method="NColor()" >
                    <p>Default constructor. Set to black.</p>
                </MethodDescription>
                <ClassSectionHead text="Constants" />
                <MethodDescription indexName={"static NColor NColor::Black"} method="static NColor Black" >
                </MethodDescription>
                <MethodDescription indexName={"static NColor NColor::White"} method="static NColor White" >
                </MethodDescription>
            </ClassDescription>

        </DocsPage>

    );
}
export default ClassNColor;
