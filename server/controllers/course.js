const Course = require('../models/Course');
const User = require('../models/User');

const createCourse = async (req, res) => {
    try {
        const { title, description, level, category } = req.body;
        
        // Validation: Check if teacher
        if (req.user.role !== 'teacher') {
            return res.status(403).json({ message: "Only teachers can create courses" });
        }

        const newCourse = new Course({
            title,
            description,
            instructor: req.user.id,
            level,
            category,
            lessons: [],
            studentsEnrolled: [],
            studentsPassed: [],
        });

        await newCourse.save();

        // Optional: Update the User's taughtCourses array if you kept that in the schema
        await User.findByIdAndUpdate(req.user.id, {
            $push: { taughtCourses: newCourse._id }
        });

        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while creating the course" });
    }
};

const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('instructor', 'firstName lastName');
        
        if (courses.length === 0) {
            return res.status(404).json({ message: "No courses found" });
        }
        
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong while fetching courses" });
    }
};

const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
            .populate('instructor', 'firstName lastName')
            .populate('lessons');

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

            // If it's outside, it won't have access to the 'course' variable
        res.json(course);

    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid Course ID format" });
        }
        res.status(500).json({ message: "Something went wrong while fetching the course" });
    }
};

const enrollInCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Check if the student is already enrolled
        if (course.studentsEnrolled.includes(req.user.id)) {
            return res.status(400).json({ message: "Already enrolled in this course" });
        }

        // 1. Update the Course document
        course.studentsEnrolled.push(req.user.id);
        await course.save();

        // This ensures the course shows up in the student's "My Courses" section
        await User.findByIdAndUpdate(req.user.id, {
            $push: { enrolledCourses: course._id }
        });

        res.json({ message: "Enrolled in course successfully" });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: "Invalid Course ID format" });
        }
        res.status(500).json({ message: "Something went wrong while enrolling in the course" });
    }
};
module.exports = { createCourse, getAllCourses, getCourseById, enrollInCourse };