import { organization }from 'services/course/pages/components/SiteFunctionalityGroup';

export const pageObject = {
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
        operatorBusinessName: [ organization.Teach, organization.Boomingllc ],
        pageObject: [ 
            { name: pageObject.Users_SideBarNavigation, allowed:[ organization.Teach ] }, 
            { name: pageObject.Users_Course_Count, allowed:[ organization.Teach ] },
            { name: pageObject.Users_SchoolIcon, allowed:[ organization.Teach ]},
            { name: pageObject.Users_BookIcon, allowed:[ organization.Teach ] },
            { name: pageObject.Users_ScheduleIcon, allowed:[ organization.Teach, organization.Boomingllc ] },
            { name: pageObject.Users_CalendarTodayIcon, allowed:[ organization.Teach, organization.Boomingllc ] },
            { name: pageObject.Users_ForumIcon, allowed:[ organization.Teach ]},
            { name: pageObject.Users_TimelineIcon, allowed:[ organization.Teach, organization.Boomingllc ]}, 
            { name: pageObject.Users_VideoCallIcon, allowed:[ organization.Teach, organization.Boomingllc ]}, 
            { name: pageObject.Users_PollIcon, allowed:[ organization.Teach, organization.Boomingllc ]}, 
        ]  
    }
];