class SiteUser {

  constructor(){
    this.firstname = ""; 
    this.email = "";
    this.password = "";
    this.token = null;
    this.role = null;
    this.courses = [];
    this.numberOfCourseSessions = [];
    this.cart = [];
    this.cartTotal = 0;
    this.paymentStatus = "";
    this.userId = null;
    this.purchaseHistoryTimeStamp = null;
    this.inviteeSessionUrl = "";
    this.lessonInProgress = false;
    this.userIsValidated = false;
    this.userIsVerified = false;
    this.nameOfLessonInProgress = "";
    this.lesson = "";
    this.loginCount = 0;
    this.meetingId = "";
    this.meetings = [];
    this.sessions = [];
    this.markDownContent = "";
    this.avatarUrl = "";
    this.files = [];
    this.classRooms = [];
    this.operatorId = "";
    this.timeMeetingStarted = null;
    this.timeMeetingEnded = null;
    this.assignments = [];
    this.exams = [];
    this.calendarEvents = [];
    this.assignedStudents = [];
    this.assignedTutors = []; 
  }
  
};

export default SiteUser;