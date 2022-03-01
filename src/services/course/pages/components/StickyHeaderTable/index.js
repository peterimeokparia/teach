import * as React from 'react';
import * as Redux from 'react-redux';

import { 
withStyles } from '@material-ui/core/styles';

import { 
Rnd } from 'react-rnd';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Divider from '@mui/material/Divider';
import './style.css';

const StickyHeaderTable = ({ columns, rows, onRowSelectedHandler }) =>  {
    const [ page, setPage ] = React.useState(0);
    const [ rowsPerPage, setRowsPerPage ] = React.useState(10);
    const [ movementData, setMovementData ] = React.useState({ x: 100, y: -4});
    const [ removedColumnInfo, setRemovedColumnInfo ]  = React.useState(null);
    const [ startColumnIndex, setStartColumnIndex ] = React.useState(null);
    const [ destinationColumnIndex, setDestinationColumnIndex ]  = React.useState(null);
    const [ changeLabelClassName, setChangeLabelClassName ]  = React.useState(false);
    const [ selectedColumn, setSelectedColumn ]  = React.useState(null);
    const [ isDragging, setIsDragging ]  = React.useState(false);
    const [ newColumns, setNewColumns ]  = React.useState( columns );

    React.useEffect(() => {
      if ( isDragging ){
        setIsDragging( false );
      }
    });
    
    React.useEffect(() => {
    }, [ changeLabelClassName, startColumnIndex, destinationColumnIndex, removedColumnInfo ]);
    
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

  function handleDragStart( xaxis, yaxis, column, index  ){
    if ( changeLabelClassName ){
      setLabelClassName( false );
    }else{
      setLabelClassName( true );
    }
    setSelectedColumn(column?.id); 
  }

  function handlePostioning( xaxis, yaxis, column, index  ){
    let removed = null, tempColumnsArray = [ ...columns ];

    if ( startColumnIndex === null && destinationColumnIndex === null ) {
      setStartColumnIndex( columns?.findIndex(col => col?.id === column?.id) );
      removed = tempColumnsArray.splice( index, 1);
      setRemovedColumnInfo( removed[0] );
      setMovementData({x: 10, y: 10, column, id: column?.id });
    }

    if ( startColumnIndex !== null && destinationColumnIndex === null ) {
      setDestinationColumnIndex( columns?.findIndex(col => col?.id === column?.id) );  
      setNewColumns([]);
      let lastRemoved = columns.splice(columns?.findIndex(col => col?.id === column?.id), 1, {...removedColumnInfo, x: 100, y:-4 });
    
      columns.splice(startColumnIndex, 1, { ...lastRemoved[0],  x: 100, y:-4 } );
      setNewColumns( columns );
      setIsDragging( true );
      removed=null;
      lastRemoved = null;
      setRemovedColumnInfo(null);
      setStartColumnIndex(null);
      setDestinationColumnIndex(null);
      setMovementData({x: 10, y: 10, column, id: column?.id });
    }     
  };

  function setLabelClassName( value ){
    setChangeLabelClassName( value );
  }
  
  return (
    <>
      <TableContainer sx={{ maxHeight: 540, maxWidth: 9000 }}>
        <Table stickyHeader aria-label="sticky table" sx={{ maxWidth: 9000 }}>
          <TableHead sx={{ maxWidth: 8000, maxHeight: 5540 }}>
            <TableRow sx={{ maxWidth: 8000 }}>
              {newColumns?.map((column, index) => (
              <TableCell
                key={column?.id}
                align={column?.align}
                sx={{ minWidth: column?.minWidth, minHeight: column?.minHeight }}
              >
                <Divider orientation="vertical" flexItem />
            <Rnd
              default={{
                x: column?.x,
                y: column?.y,
                width: (changeLabelClassName && column?.id === selectedColumn ? 50 : 100),
                height: (changeLabelClassName && column?.id === selectedColumn ? 25 : 40),
              }}
                onDragStart={(e, d) => handleDragStart(d.x, d.y, column, index) }
                onDragStop={(e, d) => handlePostioning(d.x, d.y, column, index) }
                bounds="window"
                allowAnyClick={ true }
                disableDragging={ false }
                onResize={true}
            >
            {  
              <div className={ changeLabelClassName && column?.id === selectedColumn ? "hvr-pulse" : "column-label"} > 
              <label>
                { column?.label }
              </label>
              </div>
            }
            </Rnd>
            </TableCell>
          ))}
          </TableRow>
          </TableHead>
          <TableBody>
            { rows?.slice( page * rowsPerPage, page * rowsPerPage + rowsPerPage )
              .map((row) => {
                return (
                  <StyledTableRow hover role="checkbox" 
                    tabIndex={-1} key={row?.code} 
                     sx={{ maxWidth: 5000 }, { cursor: 'pointer' }} onClick={() => onRowSelectedHandler( row )}>
                    {newColumns?.map((column) => {
                      const value = row[column?.id];
                      return (
                        <TableCell key={column?.id} align={column?.align}>
                          {column?.format && typeof value === 'number'
                            ? column?.format(value)
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
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </>
  );
}

export default Redux.connect( null, null )(StickyHeaderTable);