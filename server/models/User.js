import mongoose from "mongoose";

const {schema} = mongoose;

const userSchema = new schema({

    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role:{ ['student', 'teacher', 'admin'],default: 'student' },
    enrolledCourses: [{type: mongoose.Types.ObjectId, ref: 'Course'}],
    teachingCourses: [{type: mongoose.Types.ObjectId, ref: 'Course'}],
    isVerified: {type: Boolean, default: false},
    bio: { type: String, maxlength: 250 },

});


export default mongoose.model('User', userSchema);