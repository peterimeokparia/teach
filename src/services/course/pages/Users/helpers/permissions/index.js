import {
Organization }from 'services/course/pages/components/SiteFunctionalityGroup';

export const PageObject = {
    Users_Course_Count: 'Users_Course_Count',
    Users_SchoolIcon: 'Users_SchoolIcon',
    Users_BookIcon: 'Users_BookIcon',
    Users_ScheduleIcon: 'Users_ScheduleIcon',
    Users_CalendarTodayIcon: 'Users_CalendarTodayIcon',
    Users_ForumIcon: 'Users_ForumIcon',
    Users_TimelineIcon: 'Users_TimelineIcon',
    Users_VideoCallIcon: 'Users_VideoCallIcon',
    Users_SideBarNavigation: 'Users_SideBarNavigation',
    Users_PollIcon: 'Users_PollIcon'
};

export let group = [
    {   page: 'Users',
        operatorBusinessName: [ Organization.Teach, Organization.Boomingllc ],
        pageObject: [ 
            { name: PageObject.Users_SideBarNavigation, allowed:[ Organization.Teach ] }, 
            { name: PageObject.Users_Course_Count, allowed:[ Organization.Teach ] },
            { name: PageObject.Users_SchoolIcon, allowed:[ Organization.Teach ]},
            { name: PageObject.Users_BookIcon, allowed:[ Organization.Teach ] },
            { name: PageObject.Users_ScheduleIcon, allowed:[ Organization.Teach, Organization.Boomingllc ] },
            { name: PageObject.Users_CalendarTodayIcon, allowed:[ Organization.Teach, Organization.Boomingllc ] },
            { name: PageObject.Users_ForumIcon, allowed:[ Organization.Teach ]},
            { name: PageObject.Users_TimelineIcon, allowed:[ Organization.Teach, Organization.Boomingllc ]}, 
            { name: PageObject.Users_VideoCallIcon, allowed:[ Organization.Teach, Organization.Boomingllc ]}, 
            { name: PageObject.Users_PollIcon, allowed:[ Organization.Teach, Organization.Boomingllc ]}, 
        ]  
    }
];