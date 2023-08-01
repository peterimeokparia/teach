import * as React from 'react';
import { red } from '@mui/material/colors';
import { Link } from '@reach/router';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const LessonDetails = ({
  lessonDetails,
  lessonId,
  expandCardSubContent
}) => {
    const cardMediaStyle = () => {
        return {
        fontSize: 70,
        cursor: 'pointer'
      };
    };

    const iconPlayStyle2 = ( ) => {
      return {
        fontSize: 65,
        cursor: 'pointer'
      };
    };
    // https://codepen.io/dariodev/pen/ARVGNd
    return (
      <Card sx={{ 
        maxWidth: '348.7px', 
        maxHeight: '52%', 
        marginBottom: '50%', 
        boxShadow: 5,  
        borderStyle: 'solid', 
        borderWidth: 1,
        borderColor: '#f44336'   
      }}>
        <div style={{ marginBottom: '1%'}}>
          <Link to={`lessons/${lessonId}/lessondetails/${lessonDetails._id}`} className="lessonMultiColor">
            <CardHeader
              sx={{ 
                bgcolor: 'lightblue', 
                borderRadius: '1px',
                boxShadow: 5  
              }}
              avatar={
                <Avatar sx={{
                  bgcolor: red[500],
                  boxShadow: 5,  
                  borderStyle: 'solid',  
                }} aria-label="recipe">
                  L
                </Avatar>
              }
              title="Shrimp and Chorizo Paella"
              subheader="January 14, 2023"
            />
            </Link>         
        </div>
        <div className="media-position">
          <CardMedia style={cardMediaStyle()}>
              <div className='testVideoBody'>
                  <div className='testVideoBodyPlay'>
                      <div className='animate-border'>
                        <div className='playIcon'>
                          <PlayArrowIcon
                            style={iconPlayStyle2()}
                            sx={{  bgcolor: '#9acd32', position: 'absolute', left: '33%', top: '42%', cursor: 'pointer' }}
                          /> 
                        </div>
                      </div>   
                  </div>
              </div>
          </CardMedia> 
        </div>
        <CardContent sx={{ 
          bgcolor: 'lightblue', 
          position: 'absolute', 
          height: '150px', 
          maxHeight: '180px', 
          width: '90%', 
          maxWidth: '90%', 
          marginTop: '40%', 
          top: '35%',
          // borderStyle: 'solid',
          borderRadius: '1px',
          boxShadow: 5  
        }}>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.
          </Typography>
          </CardContent>
      </Card>
    );
}

export default LessonDetails;