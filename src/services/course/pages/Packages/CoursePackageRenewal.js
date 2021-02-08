import { 
handleAutoRenewPackageSessions, 
checkIfPackageIsSetToAutoRenew } from  './coursePackageRenewalHelpers';



export const CoursePackageRenewal = ( currentUser, sessions, autoRenewSessionPackagesAction, refreshSessions, refreshUsers ) => {

    if ( currentUser?.role === "Tutor" ) return;    
    
    let expiredPackages = checkIfPackageIsSetToAutoRenew( currentUser, sessions );

    handleAutoRenewPackageSessions( currentUser,  expiredPackages, autoRenewSessionPackagesAction );

    refreshSessions();

    refreshUsers();
            
}




export default CoursePackageRenewal;