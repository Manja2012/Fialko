import Course from '../models/course.model.js';

export const addCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body)
        res.status(201).json(course)
    } catch (err) {
        res.status(500).json({ error: "Error lors de la création !" })
    }
}

export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        res.status(200).json(courses)
    } catch (err) {
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

export const getByIdCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findById(id)
        res.status(200).json(course)
    } catch (err) {
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

export const updateByIdCourse = async (req, res) => {
    try {
        const getCourse = await Course.findById(req.params.id);

        if (!getCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        if (parseInt(getCourse.id) == parseInt(req.user.id)) {
           
            const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return res.status(200).json(course)
        } else {
            return res.status(403).json({ error: "Seul le créateur peut modifier !" })
        }
    } catch (err) {
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}


export const deleteByIdCourse = async (req, res) => {
    try {
        const getCourse = await Course.findById(req.params.id);
        if (!getCourse) {
            return res.status(404).json({ error: "Course not found" });
        }
        if (parseInt(getCourse.id) == parseInt(req.user.id)) {
            const course = await Course.findByIdAndDelete(req.params.id);
            res.status(200).json("Course deleted ! ");
        } else {
            return res.status(403).json({ error: "Seul le créateur peut supprimer !" });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};

export const getReview = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('review')
        res.status(200).json(course.review)
    } catch (error) {
        res.status(500).json(error.message)
    }
}