import { relativeTimeRounding } from "moment";

export const columnsQuizz = [
    // { id: '_id', label: 'Id', minWidth: 100, minHeight: 10, align: 'left', position: "absolute", zIndex: 100, x:100, y:-4  },
    { id: 'formDisplayName', label: 'Form Name', minWidth: 250, minHeight: 10, align: 'left', position: "absolute", zIndex: 100, x:100, y:-4  },
    { id: 'formUuId', label: 'Form UuId', minWidth: 100, minHeight: 10,  position: "absolute", zIndex: 100, x:100, y:-4  },
    // { id: 'formName', label: 'Form Name', minWidth: 100, minHeight: 10,  position: "absolute", zIndex: 100, x:100, y:-4  },
    // { id: 'formId', label: 'Form Id', minWidth: 120, minHeight: 10,  align: 'left', position: "absolute", zIndex: 100, x:100, y:-4  },
    // { id: 'createDateTime', label: 'Create Date', minWidth: 100, minHeight: 10,  align: 'left',  format: (value) => value.toLocaleString('en-US'), position: "absolute", zIndex: 100, x:100, y:-4 },
    // { id: 'takingDateTime', label: 'Taking Date', minWidth: 100, minHeight: 10,  align: 'left',  format: (value) => value.toLocaleString('en-US'), position: "absolute", zIndex: 100, x:100, y:-4  },
    // { id: 'createdBy', label: 'Created By', minWidth: 100, minHeight: 10,  position: "absolute", align: 'left', zIndex: 100, x:100, y:-4  },
    { id: 'userId', label: 'userId', minWidth: 100, minHeight: 10,  position: "absolute", align: 'left', zIndex: 100, x:100, y:-4  },
    { id: 'status', label: 'Status', minWidth: 100, minHeight: 10,  position: "absolute", align: 'left',  zIndex: 100, x:100, y:-4  },
    { id: 'state', label: 'State', minWidth: 100, minHeight: 10,  position: "absolute",  align: 'left', zIndex: 100, x:100, y:-4  },
    { id: 'eventId', label: 'EventId', minWidth: 100, minHeight: 10,  position: "absolute",  align: 'left', zIndex: 100, x:100, y:-4  }
];