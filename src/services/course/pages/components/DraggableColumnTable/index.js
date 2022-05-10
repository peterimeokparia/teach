// https://codesandbox.io/s/1o02rxrvoj?file=/demo.js:5149-5156
// https://newbedev.com/use-material-ui-table-with-react-beautiful-dnd
// https://stackoverflow.com/questions/51839298/use-material-ui-table-with-react-beautiful-dnd/53890249

import * as React from 'react';
import * as Redux from 'react-redux';

import { 
withStyles, 
makeStyles } from '@material-ui/core/styles';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
// https://ramblings.mcpher.com/reactreduxredisfirebase/maintaining-the-selected-row-in-a-material-ui-table/

const DraggableColumnTable = ({ columns,  rows, onRowSelectedHandler }) =>  {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    const StyledTableRow = withStyles((theme) => ({
    
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: "skyblue !important"
    }
  },
}))(TableRow);
  
    return (
      <>
        <TableContainer sx={{ maxHeight: 540, maxWidth: 5000 }}>
          <Table stickyHeader aria-label="sticky table" sx={{ maxWidth: 5000 }}>
            <TableHead>
              <TableRow sx={{ maxWidth: 5000 }}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow hover role="checkbox" 
                      tabIndex={-1} key={row.code} 
                      sx={{ maxWidth: 1900 }, { cursor: 'pointer' }} onClick={() => onRowSelectedHandler( row )}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} >
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </>
    );
  }

  const mapDispatch = {
  };

  const mapState = ( state, ownProps ) => {
    return{
    }
  };
  
  export default Redux.connect( mapState, mapDispatch )(DraggableColumnTable);