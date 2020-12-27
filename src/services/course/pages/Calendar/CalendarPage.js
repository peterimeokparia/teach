import React from 'react';

import {
render} from 'react-dom';

import { 
connect } from 'react-redux';

import { 
togglePreviewMode } from '../../actions';

import { 
Calendar, 
momentLocalizer } from 'react-big-calendar';

import moment from 'moment';

import Modal from "react-modal";

import 'react-big-calendar/lib/css/react-big-calendar.css';

//https://medium.com/@sajclarke/how-to-populate-react-big-calendar-with-data-from-api-b89dc7362d8
//https://codesandbox.io/s/1vq800p8wq?fontsize=14&file=/index.js:285-832
//https://codesandbox.io/s/50j9zx7knn?file=/src/index.js:61-93
//https://github.com/chachora/react-big-calendar#readme
//https://www.npmjs.com/package/react-schedule-calendar#custom-styling
// https://stackoverflow.com/questions/58525314/how-to-get-the-time-of-the-time-slot-with-react-big-calendar
// https://www.google.com/search?sa=X&tbm=vid&q=react+calendar&ved=2ahUKEwijveXfg__sAhUuo1kKHY23CH4Q8ccDKAR6BAgNEBQ&biw=1920&bih=969

//https://github.com/namespace-ee/react-calendar-timeline
//https://github.com/namespace-ee/react-calendar-timeline/tree/master/examples
//https://codesandbox.io/s/6vo2jkov23
//https://codepen.io/mariusandra/pen/ONrQaX

//https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/
//https://engineering.culturehq.com/add-to-calendar/

//https://jasonsalzman.github.io/react-add-to-calendar/
// https://www.google.com/search?ei=nDquX8jxB4md5gLhoIDwDw&q=react-calendar&oq=react-calendar&gs_lcp=CgZwc3ktYWIQAzIHCAAQyQMQQzICCAAyBAgAEEMyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAOgQIABBHOgQIABAeSgUIBBIBMUoFCAUSATFKBQgHEgExSgUICRIBMUoGCAoSAjE3UMBxWKN9YOSGAWgAcAN4AIABbogB3AWSAQM4LjGYAQCgAQGqAQdnd3Mtd2l6yAEIwAEB&sclient=psy-ab&ved=0ahUKEwjIr8OuhP_sAhWJjlkKHWEQAP4Q4dUDCA0&uact=5

// https://onursimsek94.github.io/react-big-calendar/examples/index.html?spm=a2c6h.14275010.0.0.1144658fEmGdH5#intro
// https://onursimsek94.github.io/react-big-calendar/examples/index.html?spm=a2c6h.14275010.0.0.1144658fEmGdH5#api
// https://onursimsek94.github.io/react-big-calendar/examples/index.html?spm=a2c6h.14275010.0.0.1144658fEmGdH5
// https://developer.aliyun.com/mirror/npm/package/react-big-calendar-like-google
// https://dev.to/aumayeung/how-to-make-a-calendar-app-with-react-2alp
// https://vickykedlaya.wordpress.com/2017/07/31/how-to-book-a-meeting-slot-using-react-big-calendar/

//https://ourcodeworld.com/articles/read/445/how-to-use-event-emitters-with-es5-and-es6-in-node-js-easily

// https://ourcodeworld.com/articles/read/445/how-to-use-event-emitters-with-es5-and-es6-in-node-js-easily

moment.locale("en-GB");
const localizer = momentLocalizer(moment)


// const CalendarPage = () => (
//   <div style={{ height: 700 }}>
//     <Calendar
//       localizer={localizer}
//       events={[
//         {
//           title: "My event",
//           allDay: false,
//           start: new Date(2018, 0, 1, 10, 0), // 10.00 AM
//           end: new Date(2018, 0, 1, 14, 0) // 2.00 PM
//         },
//         {
//           title: "My event",
//           allDay: false,
//           start: new Date(2020, 0, 1, 10, 0), // 10.00 AM
//           end: new Date(2020, 0, 1, 14, 0) // 2.00 PM
//         }
//       ]}
//       step={30}
//       timeslots={3}
//       // view="week"
//       views={["month", "week", "day"]}
//       scrollToTime={new Date(1970, 1, 1, 6)}
//       defaultView="month" 
//       defaultDate={new Date()}
//       onSelectEvent={event => alert(event.title)}
//       min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
//       max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
//       date={new Date(2018, 0, 1)}
//     />
//   </div>
// );



class CalendarPage extends React.Component {
  constructor() {
    super();
    this.state = {
      currentMonth: new Date(),
      selectedDate: new Date(),
      dropDownSelection: "Java 1",
      modalIsOpen: false,
      cal_events: [
        {
          title: "My event",
          allDay: false,
          start: new Date(2018, 0, 1, 10, 0), // 10.00 AM
          end: new Date(2018, 0, 1, 14, 0) // 2.00 PM
        },
        {
          title: "My event",
          allDay: false,
          start: new Date(2020, 10, 1, 10, 0), // 10.00 AM
          end: new Date(2020, 10, 1, 14, 0) // 2.00 PM
        }
      ],
      inputValue:'',
      selectSlotObject:{}
    };
  }

  
  componentDidMount() {
    console.log("mounted calander");
    Modal.setAppElement("body");
  }


  onchangeSelectDropdown = e => {
    this.setState({
      dropDownSelection: e
    });
  };


  handleSelect = (slotInfo) => {
    //set model to true
    console.log("here");
    this.setState({
      ...this.state,
      modalIsOpen: true,
      selectSlotObject: slotInfo
    });
  };


  onFormSubmit = e => {
    // e.preventDefault();

    let newEvent = {
      title: this.state.inputValue,
      allDay: false,
      start: new Date(2020, 10, 14, 9, 0), // 10.00 AM
      end: new Date(2020, 10, 14, 14, 0) // 2.00 PM
    }

    let tempEvents = [ ...this.state.cal_events, newEvent];

    let tempState = {...this.state, cal_events: tempEvents};

    this.setState(tempState);
  
  }


  handleFormInputValue = inputText => {

    let tempState = {...this.state, inputValue: inputText};

    this.setState(tempState); 
  }

  renderModal() {
    if (!this.state.modalIsOpen) return;
    console.log("hello there", "general kenobi");
    return (
      <div>
        <h2> Hello </h2>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>
            For admins/ Lectures
          </h2>
          <button onClick={this.closeModal}>close</button>
          <div>Add lecture to calender</div>
          <form onSubmit={this.onFormSubmit}>
            <input
                 name={'calendar-slot'} 
                 type={'text'}
                 onChange={event => this.handleFormInputValue(event.target.value)}
                 value={this.state.inputValue}
            />

            <input type="submit" value="Submit" />
          </form>
        </Modal>
      </div>
    );
  }

  render() {
    return (
      <div style={{ height: 700 }}>
        <Calendar
          selectable={true}
          localizer={localizer}
          events={this.state.cal_events}
          step={5}
          timeslots={3}
          defaultView="month"
          views={["month", "week", "day"]}
          defaultDate={new Date()}
          scrollToTime={new Date(1970, 1, 1, 6)}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.handleSelect}
          onView={() => {}}
          // onNavigate={date => this.setState({ date })}
        />
        <button onClick={this.openModal}>Open Modal</button>
        {this.renderModal()}
      </div>
    );
  }
}











// const CalendarPage = ({ lesson, previewMode, togglePreviewMode  }) => {

//   let test=[{}]

//    const handleSelect = (event) => { console.log("test"); console.log(event)}

//        return (
//               <div style={{height: '100vh', margin: '10px'}}>
//                 <Calendar
//                   localizer={localizer}
//                   events={test}
//                   startAccessor="start"
//                   endAccessor="end"
//                   step={30}
//                   defaultView="month"
//                   views={["month", "week", "day"]}
//                   defaultDate={new Date()}
//                   scrollToTime={new Date(1970, 1, 1, 6)}
//                   onSelectEvent={event => alert(event.title)}
//                   onSelectSlot={handleSelect} 
//                 />
//               </div>  
//        )

  
// }



const mapState = (state, ownProps)   => {
  return {
         previewMode: state.app.previewMode,
         lesson: state.lessons.lessons[ownProps.lessonId]
  };
}


export default connect(mapState, { togglePreviewMode } )(CalendarPage);