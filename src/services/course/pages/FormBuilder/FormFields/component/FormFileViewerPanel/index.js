import { 
useState } from 'react';

import PlusOneIcon from '@material-ui/icons/PlusOne';
import DeleteIcon from '@material-ui/icons/Delete';
import Modal from 'react-modal';
import './style.css';

const FormFileViewerPanel = ({ props }) => {

    let {
        fileCollection, 
        getFileName,
        openFile,
        deleteFile
    } = props;
    const [ menuVisible, setMenuVisibility ] = useState(false);

    const handleMouseDown = ( event ) => {
        setMenuVisibility( !menuVisible );
        event.stopPropagation();
    };

    function handleTogglingModal(e, requestCloseFunc){
        requestCloseFunc( e );
    }

return(
    <div className="file-viewer">
    <button className="open-file-viewer" onClick={setMenuVisibility}> { 'files'} </button>
        <Modal isOpen={menuVisible} onRequestClose={ ( e ) => handleTogglingModal(e,  handleMouseDown) }
        style={{
            overlay: {
            backgroundColor: 'skyblue',
            opacity: 0.95 
        },
            content: {
            width: '25%',
            height: '25%',
            "marginTop": "20%",
            "marginLeft": "37%",
        }}}
        > 
        {  <div className="modal-content">
            {
                <div>
                  {fileCollection?.files?.length > 0 && (
                      <div >
                          {fileCollection?.files?.map( (file, index)  =>  ( 
                              <> 
                              <div className="testR" onClick={() => openFile(file)}>
                                {}
                              </div>
                                <DeleteIcon 
                                    className="comment-round-button-3"
                                    onClick={() => deleteFile(file)}
                                />
                            </>
                          ))}
                      </div> 
                      )}
              </div> 
            }
         </div>
        }
        </Modal>
    </div>
    )
};

export default FormFileViewerPanel;