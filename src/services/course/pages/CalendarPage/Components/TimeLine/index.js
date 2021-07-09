import { Component } from "react";

import { 
connect } from 'react-redux';

import {  
saveTimeLine,
loadTimeLines } from 'Services/course/Actions/TimeLines'; 

import {
getEventsByOperatorId,    
getPushNotificationUsersByOperatorId,
getCalendarEventsByUserIdSelector,     
getOperatorFromOperatorBusinessName, 
getUsersByOperatorId,
getCalendarsByOperatorId,
getTimeLinesByOperatorId } from 'Services/course/Selectors';

import { 
loadAllCalendars } from "Services/course/Actions/Calendar";

import { 
loadAllEvents } from "Services/course/Actions/Event";

import Timeline from 'react-calendar-timeline';
import moment from 'moment';
import 'react-calendar-timeline/lib/Timeline.css';
import './style.css';

let keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    groupRightTitleKey: "rightTitle",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemDivTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start",
    itemTimeEndKey: "end",
    groupLabelKey: "title"
  };

  // https://codesandbox.io/s/w6xvqzno4w?file=/generate-fake-data.js:416-474
 class TimeLine extends Component {

    constructor(props){
        super(props);
    
        let timeLineItems = [];

        this.props.events.map( event => event.timeLineItems ).forEach(element => {
            if ( element.length > 0 ) {
                timeLineItems = [ ...timeLineItems, ...element ];
            };
        });

        let items = timeLineItems?.map( tevent => ( { 
            id: tevent?.id,
            group: tevent?.group,
            title: tevent?.title,
            start: moment( tevent?.start_time ),
            end: moment( tevent?.end_time),
            canMove: moment( tevent?.start_time ) > new Date().getTime(),
            canResize: moment( tevent?.start_time ) > new Date().getTime()
            ? moment( tevent?.end_time) > new Date().getTime()
                ? "both"
                : "left"
            : moment( tevent?.end_time) > new Date().getTime()
                ? "right"
                : false,
            color: tevent?.color
        } ));

        let groups = this.props.calendars.map( cal =>  cal.timeLineGroup );

        // const defaultTimeStart = moment()
        //     .startOf('day')
        //     .toDate();
        // const defaultTimeEnd = moment()
        //     .startOf('day')
        //     .add(1, 'day')
        //     .toDate();

        const defaultTimeStart = moment().add(-12, 'hour');
        const defaultTimeEnd = moment().add(12, 'hour');
            
        this.state = {
            groups,
            items,
            defaultTimeStart,
            defaultTimeEnd
        };
    }

    componentDidMount(){
        this.props.loadAllCalendars();
        this.props.loadAllEvents();
        this.props.loadTimeLines();
    }

    itemRenderer = ({ item, timelineContext, itemContext, getItemProps, getResizeProps }) => {
        const { left: leftResizeProps, right: rightResizeProps } = getResizeProps();
        const backgroundColor = itemContext.selected ? (itemContext.dragging ? "red" : item?.color) : item?.color;
        const borderColor = itemContext.resizing ? "red" : item?.color;

        return (
          <div
            {...getItemProps({
              style: {
                backgroundColor,
                color: 'black',
                borderColor,
                borderStyle: "solid",
                borderWidth: 1,
                borderRadius: 4,
                borderLeftWidth: itemContext.selected ? 3 : 1,
                borderRightWidth: itemContext.selected ? 3 : 1
              },
              onMouseDown: () => {
                console.log("on item click", item);
              }
            })}
          >
            {itemContext.useResizeHandle ? <div {...leftResizeProps} /> : null}
            <div
              style={{
                height: itemContext.dimensions.height,
                overflow: "hidden",
                paddingLeft: 3,
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              {itemContext.title}
            </div>
            {itemContext.useResizeHandle ? <div {...rightResizeProps} /> : null}
          </div>
        );
      };
    
      handleItemMove = (itemId, dragTime, newGroupOrder) => {
        const { items, groups } = this.state;
        const group = groups[newGroupOrder];

        this.setState({
          items: items.map(item =>
            item.id === itemId
              ? Object.assign({}, item, {
                    start: dragTime,
                    end: dragTime + (item.end - item.start),
                    group: group.id
                })
              : item
          )
        });
    
        console.log("Moved", itemId, dragTime, newGroupOrder);
      };
    
      handleItemResize = (itemId, time, edge) => {
        const { items } = this.state;

        this.setState({
          items: items.map(item =>
            item.id === itemId
              ? Object.assign({}, item, {
                  start: edge === "left" ? time : item.start,
                  end: edge === "left" ? item.end : time
                })
              : item
          )
        });
        console.log("Resized", itemId, time, edge);
      };

      render() {
        const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;

        return (
        <Timeline
            groups={groups}
            items={items}
            keys={keys}
            itemTouchSendsClick={true}
            stackItems
            itemHeightRatio={0.75}
            showCursorLine
            canMove={true}
            canResize={true}
            defaultTimeStart={defaultTimeStart}
            defaultTimeEnd={defaultTimeEnd}
            itemRenderer={this.itemRenderer}
            onItemMove={this.handleItemMove}
            onItemResize={this.handleItemResize}
        />
        );
    };
    
};

const mapDispatch = {
    loadAllCalendars,
    loadAllEvents,
    loadTimeLines,
    saveTimeLine
};

const mapState = ( state, ownProps )  => ({
    operator: getOperatorFromOperatorBusinessName(state, ownProps),
    users: getUsersByOperatorId(state, ownProps),
    user: state?.users?.user,
    calendar: getCalendarEventsByUserIdSelector(state, ownProps),
    calendars: getCalendarsByOperatorId(state, ownProps),
    events: getEventsByOperatorId(state, ownProps),
    pushNotUsers: state?.notifications?.pushNotificationSubscribers,
    pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
    timeLines: getTimeLinesByOperatorId(state, ownProps)
});

export default connect(mapState, mapDispatch)(TimeLine);