import mongoose from 'mongoose';
import meetingNotesSchema from '../schema/meetingNotesSchema.js';

const meetingNotesModel = mongoose.model('meetingnotes', meetingNotesSchema);

export default meetingNotesModel;
