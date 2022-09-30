import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const QuestionOutcomeComponent = ({ outcome, index, outcomes, children, handleOnBlur }) => {  
    return <div className='col'> 
    {  <div className="cardItem">
        { <Card sx={{ boxShadow: 24, minWidth: 275, maxHeight:305, marginLeft:-3, marginTop:2, marginBottom:5, backgroundColor: outcome?.color }}  onBlur={() => handleOnBlur(false)}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {
                        `learning outcome # ${(index+1)}`
                    }
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                <br></br>
                </Typography>
                <Typography variant="h5" component="div"> Measurable </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary"> outcome </Typography>
                <Typography sx={{ minWidth: 275, maxHeight:305, backgroundColor: outcome?.color }}variant="body2">
                { 
                        <b>{outcome?.title}</b>
                }
                </Typography>
            </CardContent>
                {
                    children(outcome) 
                }
            <CardActions>
            </CardActions>
        </Card>  
        }
        </div>
    }
    </div>
};

export default QuestionOutcomeComponent;

 