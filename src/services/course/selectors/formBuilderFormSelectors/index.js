import { createSelector}  from 'reselect';
import { elementMeta } from "services/course/pages/QuestionsPage/helpers";
import { getSortedRecordsByDate } from 'services/course/selectors';

const getCurrentUser = state => state.users.user;
const getLessonId = ( state, props ) => props?.lessonId;
const getFormType = ( state, props ) => props?.formType;
const getOutcomeId = ( state, props ) => props?.outcomeId;
const getFormBuilders = state =>  state?.formBuilders?.formBuilders;

export const getPublishedForms = createSelector(
    getCurrentUser,
    getFormBuilders,
    (user, formBuilders) => 
    getSortedRecordsByDate(Object.values( formBuilders ).filter(form => form?.state === elementMeta.state.Manage && 
            (form?.status === elementMeta.status.Published || form?.status === elementMeta.status.Pending) && 
                (form?.role === "" || form?.role === user?.role) ), 'createDateTime')    
);

export const getSubmittedFormsInCreatorsReviewBucket = createSelector(
    getCurrentUser,
    getFormType,
    getLessonId,
    getFormBuilders,
    (user, formType, lessonId, formBuilders) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Taking && 
            (form?.status === elementMeta.status.Review ) && 
                (form?.createdBy === user?._id )), 'createDateTime')     
);

export const getSubmittedFormsInCreatorsReviewingBucket = createSelector(
    getCurrentUser,
    getFormType,
    getLessonId,
    getFormBuilders,
    (user, formType, lessonId, formBuilders) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Manage && 
            (form?.status === elementMeta.status.Reviewing ) && 
                (form?.createdBy === user?._id )), 'createDateTime')     
);

export const getSubmittedFormsInCreatorsReviewedBucket = createSelector(
    getCurrentUser,
    getFormType,
    getLessonId,
    getFormBuilders,
    (user, formType, lessonId, formBuilders) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Taking && 
            (form?.status === elementMeta.status.Reviewed ) && 
                (form?.createdBy === user?._id )), 'createDateTime')     
);

export const getFormsInCreatorsPendingBucket = createSelector(
    getCurrentUser,
    getFormType,
    getLessonId,
    getFormBuilders,
    (user, formType,  lessonId, formBuilders) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Manage && 
            (form?.status === elementMeta.status.Pending ) && 
                (form?.createdBy === user?._id )), 'createDateTime')     
);

export const getFormsInCreatorsPendingBucketWithOutcomeId = createSelector(
    getCurrentUser,
    getFormType,
    getLessonId,
    getFormBuilders,
    getOutcomeId,
    (user, formType,  lessonId, formBuilders, outcomeId) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Manage && 
            (form?.status === elementMeta.status.Pending ) && 
             (form?.outcomeId === outcomeId ) && 
                (form?.createdBy === user?._id )), 'createDateTime')     
);

export const getFormsInCreatorsPublishedBucket = createSelector(
    getCurrentUser,
    getFormType,
    getLessonId,
    getFormBuilders,
    (user, formType, lessonId, formBuilders) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Manage && 
            (form?.status === elementMeta.status.Published ) && 
                (form?.createdBy === user?._id )), 'createDateTime')     
);

export const getFormsInCreatorsPublishedBucketWithOutcomeId = createSelector(
    getCurrentUser,
    getFormType,
    getLessonId,
    getFormBuilders,
    getOutcomeId,
    (user, formType, lessonId, formBuilders, outcomeId) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Manage && 
            (form?.status === elementMeta.status.Published ) && 
              (form?.outcomeId === outcomeId ) &&
                (form?.createdBy === user?._id )), 'createDateTime')     
);

export const getFormsInUsersPublishedBucket = createSelector(
    getFormType,
    getLessonId,
    getFormBuilders,
    (formType, lessonId, formBuilders) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Manage && 
            (form?.status === elementMeta.status.Published ) ), 'createDateTime')     
);

export const getSubmittedFormsInUsersReviewBucket = createSelector(
    getCurrentUser,
    getFormType,
    getLessonId,
    getFormBuilders,
    (user, formType,  lessonId, formBuilders) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Taking && 
            (form?.status === elementMeta.status.Review ) && 
                (form?.userId === user?._id )), 'createDateTime')     
);

export const getSubmittedFormsInUsersReviewedBucket = createSelector(
    getCurrentUser,
    getFormType,
    getLessonId,
    getFormBuilders,
    (user, formType,  lessonId, formBuilders) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Taking && 
            (form?.status === elementMeta.status.Reviewed ) && 
                (form?.userId === user?._id )), 'createDateTime')     
);

export const getFormsInUsersInProgressBucket = createSelector(
    getCurrentUser,
    getFormType,
    getLessonId,
    getFormBuilders,
    (user, formType, lessonId, formBuilders) => 
    getSortedRecordsByDate(Object.values(formBuilders).filter(form => form.formType === formType && form.lessonId === lessonId && form?.state === elementMeta.state.Taking && 
            (form?.status === elementMeta.status.InProgress ) && 
                (form?.userId === user?._id )), 'createDateTime')     
);


