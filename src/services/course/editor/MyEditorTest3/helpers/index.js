import Modal from 'react-modal';
import LatexEditor from 'services/course/pages/LatexEditor';

export const displayLatexEditorModal = ( props, insertChemicalEquation, setShowMenu ) => { 
    
    let {
        mathLatexExpression, 
        mathLatexEditor, 
        setLatexExpression, 
        setMathLatexEditor } = props;
 
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
    </Modal>  
}

export function setElementContentFromEditorState( func, markDownContent, element ){ 
    let timeOutHandle = null;
        if ( timeOutHandle ) {

          clearTimeout( timeOutHandle );
        }
        timeOutHandle = setTimeout(func, interVal, element, markDownContent );
  }
