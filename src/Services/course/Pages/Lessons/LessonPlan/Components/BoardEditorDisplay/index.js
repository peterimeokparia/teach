import LessonPlanIframeComponent  from 'Services/course/Pages/Components/LessonPlanIframeComponent';

const BoardEditorDisplay = ( { boardOrEditor, fullMeetingStage, hideMeetingStage, fullScreenSize, urls } ) => {
    const editorUrl = urls.editor.dev;
    const canvasUrl = urls.canvas.dev;   

    return (
      <div className={ fullMeetingStage ? `tools-hide` : `tools`    }> 
      {boardOrEditor ? <div className={`editor${hideMeetingStage}-show`}> 
                              < LessonPlanIframeComponent 
                                name="embed_readwrite" 
                                source={editorUrl}
                                width={fullScreenSize}
                                height="900px"
                                allow="camera;microphone"
                                scrolling="yes"
                                frameBorder="0" 
                              /> 
                        </div>
                    :   <div className={`canvas${hideMeetingStage}-show`}> 
                              < LessonPlanIframeComponent 
                                name="embed_readwrite" 
                                source={canvasUrl}
                                width={fullScreenSize}
                                height="900px"
                                allow="camera;microphone"
                                scrolling="yes"
                                frameBorder="0"
                                allowFullScreen
                              />
                        </div>                             
      } 
    </div>
)};

export default BoardEditorDisplay;