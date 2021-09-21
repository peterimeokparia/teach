import {
updateTimeLineItems } from 'services/course/middleware/events/helpers';

import {
automateEventCreation } from 'services/course/pages/CalendarPage/helpers/events';

import moment from "moment";

let nonRecurringEvent = {
   _id: "61020e9ae2f009c512196bbf",
   event:{
      rrule:{
         freq: "",
         byweekday: [],
         interval: 1,
         dtstart: new Date("2021-07-29T16:00:00.000+00:00"),
         until:  new Date("2021-08-30T00:00:00.000+00:00"),
      },
      classNames: [],
      title: "Timeline Non Recurring Event.",
      recurringEvent: false,
      duration: 3600000,
      color: "#fcb099",
      start: new Date("2021-07-29T01:00:00.000+00:00"),
      end:  new Date("2021-07-29T02:00:00.000+00:00")
   },
      consultation: {},
      schedulingData: [],
      calendarId: "6102055be2f009c512196b5b",
      userId: "60ff3cad4eacd8389b28b76c",
      location: "Timeline Recurring Event.",
      calendarEventType: "sessionscheduling",
      operatorId: "5fcb0e19fd5e0117dc09dcfa",
      color: "#fcb099",
      timeLineItems: [ 
         {
            _id: "61020629e2f009c512196b84",
            id: "61020629e2f009c512196b7e_1",
            group: "6102055be2f009c512196b5b",
            title: "Timeline Non Recurring Event.",
            start_time: new Date("2021-07-29T01:00:00.000+00:00"),
            end_time: new Date("2021-07-29T02:00:00.000+00:00"),
            color: "#fcb099"
         }
      ]
};

let calendarEvent = { calendarEventData : {
   _id: "61020e9ae2f009c512196bbf",
   event:{
      rrule:{
         freq: "weekly",
         byweekday: [],
         interval: 1,
         dtstart: new Date("2021-07-30T16:00:00.000+00:00"), //07/30 - 08/17 - 3
         until: new Date("2021-08-17T00:00:00.000+00:00")
      },
      classNames: [],
      title: "Timeline Recurring Event.",
      recurringEvent: true,
      duration: 3600000,
      color: "#fcb099",
      start: new Date("2021-07-29T02:12:42.421+00:00"),
      end:  new Date("2021-07-29T02:12:42.421+00:00")
   },
   consultation: {},
   schedulingData: [],
   calendarId: "6102055be2f009c512196b5b",
   userId: "60ff3cad4eacd8389b28b76c",
   location: "Timeline Recurring Event.",
   calendarEventType: "sessionscheduling",
   operatorId: "5fcb0e19fd5e0117dc09dcfa",
   color: "#fcb099",
   timeLineItems: [ 
      {
         _id: "61020e9ae2f009c512196bc5",
         id: "61020e9ae2f009c512196bbf_1",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-07-29T16:00:00.000+00:00"),
         end_time: new Date("2021-07-29T17:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc6",
         id: "61020e9ae2f009c512196bbf_2",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-05T16:00:00.000+00:00"),
         end_time: new Date("2021-08-05T17:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc7",
         id: "61020e9ae2f009c512196bbf_3",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-12T16:00:00.000+00:00"),
         end_time: new Date( "2021-08-12T16:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc8",
         id: "61020e9ae2f009c512196bbf_4",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-19T16:00:00.000+00:00"),
         end_time: new Date("2021-08-19T17:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc9",
         id: "61020e9ae2f009c512196bbf_5",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-26T16:00:00.000+00:00"),
         end_time: new Date("2021-08-26T17:00:00.000+00:00"),
         color: "#fcb099"
      }
   ]
} };


let calendarEventSameDateDifferentTitle = { calendarEventData : {
   _id: "61020e9ae2f009c512196bbf",
   event:{
      rrule:{
         freq: "weekly",
         byweekday: [],
         interval: 1,
         dtstart: new Date("2021-07-29T16:00:00.000+00:00"), //07/30 - 08/17 - 3
         until: new Date("2021-08-30T00:00:00.000+00:00")
      },
      classNames: [],
      title: "Timeline Recurring Event.",
      recurringEvent: true,
      duration: 3600000,
      color: "#fcb099",
      start: new Date("2021-07-29T02:12:42.421+00:00"),
      end:  new Date("2021-07-29T02:12:42.421+00:00")
   },
   consultation: {},
   schedulingData: [],
   calendarId: "6102055be2f009c512196b5b",
   userId: "60ff3cad4eacd8389b28b76c",
   location: "Timeline Recurring Event.",
   calendarEventType: "sessionscheduling",
   operatorId: "5fcb0e19fd5e0117dc09dcfa",
   color: "#fcb099",
   timeLineItems: [ 
      {
         _id: "61020e9ae2f009c512196bc5",
         id: "61020e9ae2f009c512196bbf_1",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-07-29T16:00:00.000+00:00"),
         end_time: new Date("2021-07-29T17:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc6",
         id: "61020e9ae2f009c512196bbf_2",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-05T16:00:00.000+00:00"),
         end_time: new Date("2021-08-05T17:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc7",
         id: "61020e9ae2f009c512196bbf_3",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-12T16:00:00.000+00:00"),
         end_time: new Date( "2021-08-12T16:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc8",
         id: "61020e9ae2f009c512196bbf_4",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-19T16:00:00.000+00:00"),
         end_time: new Date("2021-08-19T17:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc9",
         id: "61020e9ae2f009c512196bbf_5",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-26T16:00:00.000+00:00"),
         end_time: new Date("2021-08-26T17:00:00.000+00:00"),
         color: "#fcb099"
      }
   ]
} };


let recurringEventToNonRecurring = { calendarEventData : {
   _id: "61020e9ae2f009c512196bbf",
   event:{
      rrule:{
         freq: "",
         byweekday: [],
         interval: 1,
         dtstart: new Date("2021-07-29T16:00:00.000+00:00"),
         until: new Date("2021-08-30T00:00:00.000+00:00")
      },
      classNames: [],
      title: "Timeline Recurring Event to Non Recurring",
      recurringEvent: false,
      duration: 3600000,
      color: "#fcb099",
      start: new Date("2021-07-29T16:00:00.000+00:00"),
      end:  new Date("2021-08-30T00:00:00.000+00:00")
   },
   consultation: {},
   schedulingData: [],
   calendarId: "6102055be2f009c512196b5b",
   userId: "60ff3cad4eacd8389b28b76c",
   location: "Timeline Recurring Event.",
   calendarEventType: "sessionscheduling",
   operatorId: "5fcb0e19fd5e0117dc09dcfa",
   color: "#fcb099",
   timeLineItems: [ 
      {
         _id: "61020e9ae2f009c512196bc5",
         id: "61020e9ae2f009c512196bbf_1",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-07-29T16:00:00.000+00:00"),
         end_time: new Date("2021-07-29T17:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc6",
         id: "61020e9ae2f009c512196bbf_2",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-05T16:00:00.000+00:00"),
         end_time: new Date("2021-08-05T17:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc7",
         id: "61020e9ae2f009c512196bbf_3",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-12T16:00:00.000+00:00"),
         end_time: new Date( "2021-08-12T16:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc8",
         id: "61020e9ae2f009c512196bbf_4",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-19T16:00:00.000+00:00"),
         end_time: new Date("2021-08-19T17:00:00.000+00:00"),
         color: "#fcb099"
      },
      {
         _id: "61020e9ae2f009c512196bc9",
         id: "61020e9ae2f009c512196bbf_5",
         group: "6102055be2f009c512196b5b",
         title: "Timeline Recurring Event.",
         start_time: new Date("2021-08-26T16:00:00.000+00:00"),
         end_time: new Date("2021-08-26T17:00:00.000+00:00"),
         color: "#fcb099"
      }
   ]
} };

describe('Manage Calendar Events and Time Line Events', () => {
   
   it('should update a recurring time line event on recurring event date update', () => {
   
      let updatedTimeLineItemEventFreq = updateTimeLineItems( calendarEvent );

      expect( updatedTimeLineItemEventFreq?.calendarEvent?.timeLineItems[0]?.start_time ).toEqual( moment( updatedTimeLineItemEventFreq?.calendarEvent?.event.rrule.dtstart )?.local().format('YYYY-MM-DD[T]HH:mm:ss') );
      expect( updatedTimeLineItemEventFreq?.calendarEvent?.timeLineItems.length).toEqual(3);
   });


   it('should update a recurring time line event title on recurring event title update', () => {

      let _calendarEvent =  { ...calendarEventSameDateDifferentTitle };

      _calendarEvent = { calendarEventData: {
         ...calendarEventSameDateDifferentTitle?.calendarEventData,
         event: { ...calendarEventSameDateDifferentTitle?.calendarEventData?.event, title: 'new timeline event title!!!' },
         consultation: calendarEventSameDateDifferentTitle?.calendarEventData?.consultation,
      schedulingData: calendarEventSameDateDifferentTitle?.calendarEventData?.schedulingData,
      calendarId: calendarEventSameDateDifferentTitle?.calendarEventData?.calendarId,
      userId: calendarEventSameDateDifferentTitle?.calendarEventData?.userId,
      location: calendarEventSameDateDifferentTitle?.calendarEventData?.location,
      calendarEventType: calendarEventSameDateDifferentTitle?.calendarEventData?.calendarEventType,
      operatorId: calendarEventSameDateDifferentTitle?.calendarEventData?.operatorId,
      color: calendarEventSameDateDifferentTitle?.calendarEventData?.color,
      timeLineItems:  calendarEventSameDateDifferentTitle?.calendarEventData?.timeLineItems
      }};

      let updatedTimeLineItemEventFreq = updateTimeLineItems( _calendarEvent );

      expect( updatedTimeLineItemEventFreq?.calendarEvent?.timeLineItems[0]?.start_time ).toEqual( moment(calendarEventSameDateDifferentTitle?.calendarEventData?.timeLineItems[0]?.start_time )?.local().format('YYYY-MM-DD[T]HH:mm:ss') );
      expect( updatedTimeLineItemEventFreq?.calendarEvent?.timeLineItems?.length).toEqual( calendarEventSameDateDifferentTitle?.calendarEventData?.timeLineItems?.length );
   });


   it('should change a recurring event to a non recurring event', () => {
   
      let updatedTimeLineItemEventFreq = updateTimeLineItems( recurringEventToNonRecurring );

      expect( updatedTimeLineItemEventFreq?.calendarEvent?.timeLineItems[0].title).toEqual('Timeline Recurring Event to Non Recurring');
      expect( updatedTimeLineItemEventFreq?.calendarEvent?.timeLineItems[0]?.start_time ).toEqual( moment( updatedTimeLineItemEventFreq?.calendarEvent?.event.start )?.local().format('YYYY-MM-DD[T]HH:mm:ss') );
      expect( updatedTimeLineItemEventFreq?.calendarEvent?.timeLineItems.length).toEqual(1);
   });

});


describe('automate event creation', () => {  

   const title = "Session#1";
   const location = "Virtual";
   let startDateTime = moment(new Date());
   const recurringEvent = false;
   const allDay = false; 
   const meetingId = "MEETING0016102055be2f009c512196b5b";
   let durationHrs = 1;
   
   let event = {
       title,
       location,
       startDateTime,
       recurringEvent,
       allDay
   }
   
   it('should add a new event', () => {

      let newEvent = automateEventCreation( event, meetingId, durationHrs);;
      //3600000
      console.log( newEvent?.event );
      expect( newEvent?.event?.title ).toEqual( title );
      expect( newEvent?.event?.duration ).toEqual( 3600000 );
   });
   
});