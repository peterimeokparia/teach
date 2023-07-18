import { connect } from 'react-redux';
import { useState } from 'react';
import { buildBoxPlotLegendData } from 'services/course/pages/Charts/components/BoxPlot/helpers'; 
import { Box, ThemeProvider, createTheme } from '@mui/system'; 
import { boxPlotOrientation } from 'services/course/pages/Charts/components/BoxPlot/helpers';
import { CardHeader } from '@mui/material';
import BoxPlot from 'services/course/pages/Charts/components/BoxPlot';
import BoxPlotLegend from 'services/course/pages/Charts/components/BoxPlotLegend';
import BoxPlotCardLegend from 'services/course/pages/Charts/components/BoxPlotCardLegend';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import './style.css';

 const test222 = [
    4.4,
    4.9,
    3,
    9,11,15,
    7,13,  26,
    6,13.2,14,12,
    2,
    8,
    1,
    4,
    3,
    3,
    7,
    6,
    2,
    8,
    4,
    4.3,
    3,
    7,
    4,
    2.8,
    1.9,
    6,
    1,
    3.1,
    9.2,
    7
];

const test2223333 = [
    4.4,
    4.9,
    3,
    9,11,15,
    7,13,  26,
    1,
    2,
    8,
    2,
    4,
    3,
    3,
    7,
    6,
    2,
    8,
    4,
    4.3,
    3,
    7,
    4,
    2.8,
    1.9,
    6,
    2,
    7
];

function toggleLessonOutcome(){} // refactor

const OutcomeBoxPlotLanding = () => {
   const { legend } =  buildBoxPlotLegendData( test222, test2223333 );
   const exclude = [  'Min', 'Max' ];
   const boxPlotPosition = boxPlotOrientation.VERTICAL;
   const avatarProps = {
    horizontal: [ 
        { avatar: { bgcolor: 'red', left: '81%', top: '270%', width: 20, height: 20 }}, 
        { avatar: { bgcolor: 'blue', right: '31%', top: '270%', width: 20, height: 20 }} , 
        { legendAvatar: { bgcolor: 'blue', width: 20, height: 20, marginBottom:0.3, left: '12%'}},
        { legendAvatar: { bgcolor: 'red', width: 20, height: 20, left: '11%'}},
        { legendBox:{ color: 'text.primary', fontSize: 15, fontWeight: 'medium', labelName: `Class`  }},
        { legendBox: { color: 'text.primary', fontSize: 15, fontWeight: 'medium', labelName: `You`   }},
    ],
    vertical: [ 
        { avatar: { bgcolor: 'red', left: '122%', top: '11.6em', width: 20, height: 20 }}, 
        { avatar: { bgcolor: 'blue', left: '15.5%', top: '13.2em', width: 20, height: 20 }} , 
        { legendAvatar: { bgcolor: 'blue', width: 20, height: 20, marginBottom:0.3, left: '12%'}},
        { legendAvatar: { bgcolor: 'red', width: 20, height: 20, left: '11%'}},
        { legendBox:{ color: 'text.primary', fontSize: 15, fontWeight: 'medium', labelName: `Class`  }},
        { legendBox: { color: 'text.primary', fontSize: 15, fontWeight: 'medium', labelName: `You`  }},
    ],
   };

   let boxPlotAvatars, legendAvatar, legendBox;

   if ( boxPlotPosition === boxPlotOrientation.HORIZONTAL ) {
        boxPlotAvatars = avatarProps?.horizontal?.map( avatarProps => avatarProps.avatar );
        legendAvatar = avatarProps?.horizontal?.map( avatarProps => avatarProps.legendAvatar );
        legendBox = avatarProps?.horizontal?.map( avatarProps => avatarProps.legendBox );
   } else {
        boxPlotAvatars = avatarProps?.vertical?.map( avatarProps => avatarProps.avatar );
        legendAvatar = avatarProps?.vertical?.map( avatarProps => avatarProps.legendAvatar );
        legendBox = avatarProps?.vertical?.map( avatarProps => avatarProps.legendBox );
   }

   const someTestLessonTitle = `Lorem ipsum dolor sit amet`;


    return <div className='main_box'> 
        <div className='row main_box-visible'>
            <div className='col box_primary'> 
                <div className='row .box_primary-row'>
                {
                <Card sx={{width: 875, height:boxPlotPosition === boxPlotOrientation.HORIZONTAL ? 405 : 605, marginLeft:50, backgroundColor: '', marginTop:5, boxShadow: 9 }}>
                     <CardHeader
                        title={`${someTestLessonTitle }`}
                        sx={{ bgcolor: '#dcdcdc', marginLeft: '', }}
                    />
                    <BoxPlot 
                        axisLabelValue={`Score`}
                        boxPlotPosition={boxPlotPosition}
                        data={ test222?.map(d => { return d; }) } 
                        compData={ test2223333?.map(d => { return d; }) }
                    />
                     <Box
                        sx={{
                        bgcolor: 'background.paper',
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 1,
                        minWidth: 1,
                        width: 0.5,
                        }}
                    >
                    <Stack direction="row" spacing={2} sx={{ bgcolor: '#dcdcdc', marginLeft: '79%', marginTop: '10%' }}> 
                       <div className={''}>
                         { legendAvatar?.map( props => {
                                if ( props ) {
                                     return <div className='col'>
                                            <Avatar sx={{ ...props }}>{``}</Avatar>
                                          </div>
                                }
                                
                              })
                            }
                       </div>
                       <div className={''}> 
                            {  legendBox?.map( props => {
                                if ( props ) {
                                     return <div className='col'>
                                             <Box sx={{ ...props  }}>{ `${props?.labelName}` }</Box>
                                        </div>
                                }
                                
                              })
                            } 
                            </div>
                     </Stack>
                    </Box>
                  </Card>         
                }
                </div>
            </div>
            <button className='toggleButtonBox' onClick={ toggleLessonOutcome }>{''}</button>
            <div className='row box_tertiary-sidepanel'> 
            <p className={'box_insights-data'}>   
            <div className='row justify-content-center'>
            <div>
                <div className='box_row-data'> 
                <div className={'row row-cols-2 row-cols-md-3 g-4'}>
                { legend && legend.map( item => {
                    return <div>
                        { <Card sx={{ marginRight:2, marginBottom:1, marginTop:5 }}> 
                            <BoxPlotCardLegend 
                                avatarText={exclude.includes( item?.name ) ? `M`: `%`}
                                header={`${item?.name}`}
                                title={``}
                                rate={item?.value} 
                                passFailRate={``} 
                                width={160} 
                                minWidth={5}
                                iconColor={item?.color2}
                            /> 
                            </Card>
                        }
                        </div> })  
                }
                </div>
                </div>
            </div> 
            </div>
            </p>
            </div>
        </div>
    </div>
};

const mapState = ( state )   => {
    return {
        currentUser: state.users.user
    };
};

export default connect(mapState)(OutcomeBoxPlotLanding);