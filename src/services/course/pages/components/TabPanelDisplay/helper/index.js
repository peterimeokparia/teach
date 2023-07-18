import { 
green, 
deepOrange, } from '@mui/material/colors';

import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Swal from 'sweetalert2';

export function TabPanel(props) {
    const { 
        children, 
        value, 
        index, 
        ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
export function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
}
  
export const fabStyle = {
    position: 'absolute',
    bottom: 16,
    right: 16,
};
  
export const fabGreenStyle = {
    color: 'common.white',
    bgcolor: green[500],
    '&:hover': {
      bgcolor: green[600],
    },
};
  
export const fabDeepOrangeStyle = {
      color: 'common.white',
      bgcolor: deepOrange[500],
      '&:hover': {
        bgcolor: deepOrange[600],
      },
};

export async function addNewFormBuilderDialog( addNewFormBuilderAction, newBuilder ){
  const { value: formDisplayName } = await Swal.fire({
    title: "Please enter a form display name.",
    input: 'text',
    inputPlaceholder: 'Enter form name.',
    showCancelButton: false,
    showConfirmButton: ( true ),
    confirmButtonText: 'Enter',
    confirmButtonColor:  '#1976d2',
  });

  if ( formDisplayName ) {
    addNewFormBuilderAction( { ...newBuilder, formDisplayName } );
  }
};
