import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TagFacesIcon from '@mui/icons-material/TagFaces';



import { TabPanel, a11yProps } from 'services/course/pages/components/TabPanelDisplay/helper';
import StickyHeaderTable from 'services/course/pages/components/StickyHeaderTable';
import { columnsQuizz } from 'services/course/pages/components/StickyHeaderTable/helpers'; 

const AntTabs = styled(Tabs)({
  borderBottom: '1px solid #e8e8e8',
  '& .MuiTabs-indicator': {
    backgroundColor: '#1890ff',
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  minWidth: 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  fontWeight: theme.typography.fontWeightRegular,
  marginRight: theme.spacing(1),
  color: 'rgba(0, 0, 0, 0.85)',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  '&.Mui-focusVisible': {
    backgroundColor: '#d1eaff',
  },
}));

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: 'rgba(255, 255, 255, 0.7)',
    '&.Mui-selected': {
      color: '#fff',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
  }),
);

function CustomizedTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ bgcolor: '#fff' }}>
        <AntTabs 
          value={value} 
          onChange={handleChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          // aria-label="ant example"
          >
          <AntTab label="Tab 1" />
          <AntTab label="Tab 2" />
          <AntTab label="Tab 3" />
          <AntTab label="Tab 4" />
          <AntTab label="Tab 5" />
          <AntTab label="Tab 6" />
        </AntTabs>
        <Box sx={{ p: 0 }} />
      </Box>
      <Box sx={{ bgcolor: '#2e1534' }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Recognizing and recalling facts." wrapped/>
          <StyledTab label="Understanding what the facts mean." wrapped/>
          <StyledTab label="Applying the facts, rules, concepts and ideas." wrapped/>
          <StyledTab label="Breaking down information into component parts." wrapped/>
          <StyledTab label="Judging the value of information or ideas." wrapped/>
          <StyledTab label="Combining parts to make a new whole." wrapped/>
        </StyledTabs>
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
    <div className="sticky-header-tab-panel"> 
  <TabPanel value={value} index={value} >
  <div className="sticky-header-table">
    {`${value}`}
   <ChipsArray value={value}/> 
  {/* <StickyHeaderTable columns={columnsQuizz} /> */}
  </div>
  </TabPanel>
  </div>
    </>
  );
}





const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

function ChipsArray({value}) {


  const [chipData, setChipData] = React.useState(
    [
      { key: 0, label: 'Angular' },
      { key: 1, label: 'jQuery' },
      { key: 2, label: 'Polymer' },
      { key: 3, label: 'React' },
      { key: 4, label: 'Vue.js' },
    ]
  
  );

  React.useEffect(() => {
    if ( value === 0 ) {
      setChipData(
        [
          { key: 0, label: 'Angular' },
          { key: 1, label: 'jQuery' },
          { key: 2, label: 'Polymer' },
          { key: 3, label: 'React' },
          { key: 4, label: 'Vue.js' },
        ]
      );
    }
  
    if ( value === 1 ) {
      setChipData(
        [
          { key: 0, label: 'Vue' },
          { key: 1, label: 'React' },
          { key: 2, label: 'Polymer' },
          { key: 3, label: 'C' },
          { key: 4, label: 'Angular.js' },
        ]
      );
    }
  
    if ( value === 2 ) {
      setChipData(
        [
          { key: 0, label: 'Test1' },
          { key: 1, label: 'React' },
          { key: 2, label: 'Test3' },
          { key: 3, label: 'C#' },
          { key: 4, label: 'Test.js' },
        ]
      );
    }

  } , [ value ]);
  

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        listStyle: 'none',
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {chipData.map((data) => {
        let icon;

        if (data.label === 'React') {
          icon = <TagFacesIcon />;
        }

        return (
          <ListItem key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === 'React' ? undefined : handleDelete(data)}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}


const OutcomeBuilderComponent = () => {
    return (<>{<CustomizedTabs />}</>);
}

export default OutcomeBuilderComponent;