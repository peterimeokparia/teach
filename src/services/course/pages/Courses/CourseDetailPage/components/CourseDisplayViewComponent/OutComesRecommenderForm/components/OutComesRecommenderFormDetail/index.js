

import { role } from 'services/course/helpers/PageHelpers';
import MyEditorTest3 from 'services/course/editor/MyEditorTest3';
import HelpIcon from '@material-ui/icons/Help';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Roles from 'services/course/pages/components/Roles'; 
import useOutComesFormDetailHook from 'services/course/pages/Courses/hooks/useOutComesFormDetailHook';

const OutComesRecommenderFormDetail = ( { link, lessonOutcome, outCome, currentUser, questions, cardItemProps } ) => {

    let { buildFurtherQuestions, goToFurtherQuestions } = cardItemProps;

    let { outcomeFormDetail } = useOutComesFormDetailHook( lessonOutcome );

    let { removeLink } = outcomeFormDetail;

    return <>
            <div className="row">
             <div className='col'>
                 <p>
                     <a href={link?.link}>
                         <label className='link-label'> {link?.title} </label> 
                     </a> 
                 </p>
                 <p className={'linked-articles'}>   
                 <div className='row justify-content-center'>
                 <div>
                 { questions.filter(question => question?.linkId === link?.uniqueId )?.map( (question, index) => {           
                     return (<div className='row'>
                             <div className='col'>
                                 <button className="questions-outcome" onClick={(e) => goToFurtherQuestions(lessonOutcome, question, e)}>{`${(index+1)}`}</button>
                             </div>
                             <div className='col'>
                                <Box sx={{ width: 500, minWidth: 120, marginTop: '20px', marginBottom: '20px' }}>
                                    <FormControl fullWidth>
                                        <MyEditorTest3  
                                            element={ question } 
                                            content={ question?.markDownContent } 
                                            readOnly={ true } 
                                            showMenuButtons={ false } 
                                        /> 
                                    </FormControl>
                                </Box>
                             </div>
                             </div> );
                         })
                    }
                            </div>
                            </div>
                            </p>
                        </div>
                        <Roles role={ currentUser?.role === role.Tutor}>
                            <div className='col links-question'>
                                <HelpIcon 
                                    id="QuizzIcon"
                                    data-cy={`${(link?.concept)?.toLowerCase()}QuizzIcon`}
                                    className="round-button-2"
                                    onClick={() => buildFurtherQuestions( lessonOutcome, link )}
                                />
                            </div>
                            <div className='col links-delete'>
                                <DeleteIcon 
                                    id="QuizzIcon"
                                    data-cy={`${(link?.concept)?.toLowerCase()}QuizzIcon`}
                                    className="round-button-2"
                                    onClick={() => removeLink( link?.uniqueId )}
                                />
                            </div>
                        </Roles>
                        </div>      
                    </>  
 
};

export default OutComesRecommenderFormDetail;