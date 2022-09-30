import { organization } from 'services/course/pages/components/SiteFunctionalityGroup';

export const PageObject = {
    LessonPlan_MaterialUiVideoComponent: 'LessonPlan_MaterialUiVideoComponent',
    LessonPlan_VideoCallIcon: 'LessonPlan_VideoCallIcon'
};

export let testGroup = [ // refactor create groups, permissions etc in db
    {   page: 'Users',
        operatorBusinessName: [organization.Teach, organization.Boomingllc ],
        pageObject: [ 
            { name: PageObject?.LessonPlan_MaterialUiVideoComponent, allowed: [ organization.Teach ]},
            { name: PageObject?.LessonPlan_VideoCallIcon, allowed: [ organization.Teach, organization.Boomingllc ]},
        ]  
    }
];