import Modal from 'react-modal';
import LatexEditor from 'services/course/pages/LatexEditor';
import ImageAdd from 'services/course/editor/components/ImageAdd';
import VideoAdd from 'services/course/editor/components/VideoAdd';
import { SET_FORMFIELDS_MARKDOWN } from 'services/course/actions/formfields';

export const displayLatexEditorModal = ( props, insertChemicalEquation, setShowMenu ) => { 
    let { mathLatexExpression, mathLatexEditor, setLatexExpression, setMathLatexEditor } = props;
 
    const handleLatexModalClose = () => {
        if ( mathLatexExpression ) {
            insertChemicalEquation( mathLatexExpression );
        }
        setMathLatexEditor( !mathLatexEditor );
        setShowMenu( false );
    };

    return  <Modal isOpen={ mathLatexEditor } onRequestClose={ () => handleLatexModalClose( !mathLatexEditor ) }
    style={{
        overlay: {
        backgroundColor: 'skyblue',
        opacity: 0.95
        },
        content: {
        width: '50%',
        height: '35%',
        "marginTop": "5%",
        "marginLeft": "20%",
        }
        }}
    > 
    { <div className="modal-content">
        <div className="">
            <div>
            {   
                <div> 
                 <LatexEditor setLatexExpression={ setLatexExpression }/> 
                </div>
            }
            </div>
        </div>
        </div>
    }
    </Modal>;  
}; 

export function setElementContentFromEditorState( func, markDownContent, element ){ 
   func( element, markDownContent );
}

export function handleEditor(  markDownContent, dispatch, formFieldElement ){
    let payload = { ...formFieldElement, markDownContent };
    dispatch({ type: SET_FORMFIELDS_MARKDOWN, payload });
}

export function mediaSection( contentState, image, video, handleContentState, mediaTypeDisplayIndex ) {
  switch ( mediaTypeDisplayIndex ) {
      case 1: 
      return (
        <div className={'col media-col-image'}> 
            <ImageAdd 
                editorState={ contentState }
                setEditorState={ editorState => handleContentState( editorState ) } 
                modifier={image.addImage }
            /> 
        </div>
      );
      case 2: 
      return (
        <div className={'col media-col'}> 
            <VideoAdd
                editorState={ contentState }
                onChange={ editorState => handleContentState( editorState ) }
                modifier={ video.addVideo }
            />
        </div>
      );   
      default:
        return (
            <div className={'col media-col'}> 
            </div>
          );   
  }
}