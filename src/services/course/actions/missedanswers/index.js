export const ADD_MISSED_ANSWERS_SUCCESS = "ADD MISSED ANSWERS SUCCESS";
export const SAVE_MISSED_ANSWERS_SUCCESS = "SAVE MISSED ANSWERS SUCCESS";

export const addMissedAnswers = ( missedAnswerProps ) => ({
    type: ADD_MISSED_ANSWERS_SUCCESS,
    payload: missedAnswerProps
});

export const saveMissedAnswers = ( missedAnswerProps ) => ({
    type: SAVE_MISSED_ANSWERS_SUCCESS,
    payload: missedAnswerProps
});