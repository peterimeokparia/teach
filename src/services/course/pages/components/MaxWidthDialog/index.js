import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';

const MaxWidthDialog = ({ modalProps, collection,  children }) => {

    if ( ! collection?.length || collection?.length === 0 ) return null;

    let {
      isOpen, 
      handleClose,
      selectEventChangeHandler,
      dialogTitle,
      InputLabel
    } = modalProps;

    const [fullWidth, setFullWidth] = React.useState(true);
    const selectEventChange = (event) => {
      selectEventChangeHandler(event.target.value);
    };

    const handleFullWidthChange = (event) => {
      setFullWidth(event.target.checked);
    };
    
return (
    <React.Fragment>
    <Dialog
      fullWidth={fullWidth}
      open={isOpen}
      onClose={handleClose}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You can set my maximum width and whether to adapt or not.
        </DialogContentText>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <InputLabel htmlFor="max-width">{InputLabel}</InputLabel>
            <Select
              autoFocus
              //value={selectedValue}
              // value={'sm'}
              value={''}
              onChange={selectEventChange}
              label="maxWidth"
              inputProps={{
                name: 'max-width',
                id: 'max-width',
              }}
            >
              { collection?.map(( item, index) => (
                    children( item )
                ))
              }
            </Select>
          </FormControl>
          <FormControlLabel
            sx={{ mt: 1 }}
            control={
              <Switch checked={fullWidth} onChange={handleFullWidthChange} />
            }
            label="Full width"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
 ); 
};
    
export default MaxWidthDialog;