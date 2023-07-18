import React, { Component } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { orange } from '@material-ui/core/colors';
import Fab from '@mui/material/Fab';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import styles from "./styles.css";

export default class VideoAdd extends Component {

  state = {
    url: "https://youtu.be/HtjoJhPiXx8",
    open: false
  };

  componentDidMount() {
    document.addEventListener("click", this.closePopover);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.closePopover);
  }

  // Note: make sure whenever a click happens within the popover it is not closed
  onPopoverClick = () => {
    this.preventNextClose = true;
  };

  openPopover = () => {
    if (!this.state.open) {
      this.preventNextClose = true;
      this.setState({
        open: true
      });
    }
  };

  closePopover = () => {
    if (!this.preventNextClose && this.state.open) {
      this.setState({
        open: false
      });
    }

    this.preventNextClose = false;
  };

  addVideo = () => {
    const { editorState, onChange } = this.props;

    onChange(this.props.modifier(editorState, { src: this.state.url }));
  };

  changeUrl = evt => {
    this.setState({ url: evt.target.value });
  };

  render() {
    const fabOrangeStyle = {
      color: 'common.white',
      bgcolor: orange[100],
      '&:hover': {
        bgcolor: orange[100]
      },
    };
  
    return (
      <div className={`row ${styles.addVideo}`}>
        <div  className='col add-video'>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField sx={{...fabOrangeStyle}} id="standard-basic" variant="standard" value={this.state.url} onChange={this.changeUrl} placeholder="Paste the video url …"  focused/>
        </Box>
        <div className={'videoIcon'}>
         <VideoFileIcon className="mui-headerStyleDropdownButtons" onClick={this.addVideo} />
        </div>
        </div>
      </div>
    );
  }
}