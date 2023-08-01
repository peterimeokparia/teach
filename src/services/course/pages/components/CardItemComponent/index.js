import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const CardItemComponent = ({ 
    cardItemCollection, 
    handleClickedCardItem, 
    handleCardItemOnBlur, 
    children, 
    cardItemProps 
}) => { 
    return (( cardItemCollection )?.map((item, index) => ( 
                    <div className='col' onClick={() => handleClickedCardItem( item )}> 
                    {  <div className="cardItem">
                        { <Card sx={{ 
                                minWidth: 275, 
                                maxHeight:305, 
                                backgroundColor: item?.color, 
                                marginBottom: 3.6, 
                                boxShadow: 9 
                            }}  onBlur={() => handleCardItemOnBlur(item)}>
                                <CardContent>
                                    { children( item, index, cardItemProps ) }
                                </CardContent>
                            </Card>  
                        }
                        </div>
                    }
                    </div>
                )
            ));
};

export default CardItemComponent;

 