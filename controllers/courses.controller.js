import Course from "../models/course.model.js";

export const addCourse = async (req, res) => {
  try {
    console.log(req.file);

    const course = await Course.create({
      ...req.body,
      picture: req.file.filename,
    });
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ error: "Error lors de la création !" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("review");
    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error lors de la récupération" });
  }
};

export const getByIdCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id).populate("review");
    res.status(200).json(course);
  } catch (err) {
    res.status(500).json({ error: "Error lors de la récupération" });
  }
};

export const updateByIdCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    console.log("req.file", req.file);
    console.log("req.picture", req.picture);
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body, picture: req.file.filename },
      {
        new: true,
      }
    );
    return res.status(200).json(updatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error lors de la récupération" });
  }
};

export const deleteByIdCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    console.log(course);

    if (req.user.isAdmin) {
      const deletedCourse = await Course.findByIdAndDelete(req.params.id);
      res.status(200).json("Course deleted !");
    } else {
      return res
        .status(403)
        .json({ error: "Seul le créateur peut supprimer !" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err.message);
  }
};

export const getReview = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("review");
    res.status(200).json(course.review);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
