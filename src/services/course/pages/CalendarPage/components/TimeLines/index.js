import { 
  Component } from "react";
  
  import { 
  connect } from 'react-redux';
  
  import {  
  saveTimeLine,
  loadTimeLines } from 'services/course/actions/timelines'; 
  
  import {
  getEventsByOperatorId,    
  getPushNotificationUsersByOperatorId,
  getCalendarByCalendarEventType,     
  getOperatorFromOperatorBusinessName, 
  getUsersByOperatorId,
  getCalendarsByOperatorId,
  getTimeLinesByOperatorId } from 'services/course/selectors';
  
  import { 
  loadAllCalendars } from "services/course/actions/calendar";
  
  import { 
  loadAllEvents } from "services/course/actions/event";

  import { 
  role } from "services/course/helpers/PageHelpers";
  
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
  
  class TimeLines extends Component {
  
    constructor(props){
        super(props);
    
        let timeLineItems = [];

        let user = this.props?.users?.filter(user => user?._id === this.props?.userId)
  
        this.props?.events.map( event => event.timeLineItems )?.forEach(element => {
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

        
        let allStudentsCalendar = this.props?.calendars?.filter( cal => this.props.allStudents.includes( cal?.userId) );
        
        let allTutorsCalendar =  this.props?.calendars?.filter( cal => this.props.allTutors.includes( cal?.userId) ); 
        
        let individualTutorsCalendar = this.props?.calendars?.filter( cal => cal?.userId ===  this.props?.userId );

        let allGroups = ( this.props?.user?.role === role.Student ) ? allStudentsCalendar.map( cal =>  cal.timeLineGroup ) : allTutorsCalendar.map( cal =>  cal.timeLineGroup );

        let individualGroups = individualTutorsCalendar.map( cal =>  cal.timeLineGroup );
  
        const defaultTimeStart = moment().add(-12, 'hour');
        const defaultTimeEnd = moment().add(12, 'hour');
            
        this.state = {
            allGroups,
            individualGroups,
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
            { ...getItemProps({
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
        const { allGroups, individualGroups, items, defaultTimeStart, defaultTimeEnd } = this.state;
  
        return (
          <>
        <Timeline
            groups={individualGroups}
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

        <Timeline
            groups={allGroups}
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
        </>
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
      allStudents: getUsersByOperatorId(state, ownProps)?.filter( user => user?.role === role.Student )?.map( user => user?._id ),
      allTutors: getUsersByOperatorId(state, ownProps)?.filter( user => user?.role === role.Tutor )?.map( user => user?._id ),
      user: state?.users?.user,
      calendar: getCalendarByCalendarEventType(state, ownProps),
      calendars: getCalendarsByOperatorId(state, ownProps),
      events: getEventsByOperatorId(state, ownProps),
      pushNotUsers: state?.notifications?.pushNotificationSubscribers,
      pushNotificationSubscribers: getPushNotificationUsersByOperatorId(state, ownProps),
      timeLines: getTimeLinesByOperatorId(state, ownProps)
  });
  
  export default connect(mapState, mapDispatch)(TimeLines);