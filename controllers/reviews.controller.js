import Review from "../models/review.model.js";
import Course from "../models/course.model.js";
import Reservation from "../models/reservation.model.js";

//new
export const addReview = async (req, res) => {
  const userId = req.user.id;
  const courseId = req.params.idcourse;
  const { comment, rating } = req.body;

  try {
    const reservation = await Reservation.findOne({
      user: userId,
      course: courseId,
    });
    if (!reservation) {
      return res
        .status(403)
        .json({ message: "User has not reserved this course" });
    }

    console.log("marianna ", courseId);
    //   await review.save();
    const review = await Review.create({
      user: userId,
      course: courseId,
      comment: comment,
      rating: rating,
    });
    await Course.findByIdAndUpdate(
      courseId,
      { $push: { review: review._id } },
      { new: true }
    );
    console.log("lancement save termine");
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getAllReviewsByOneCourse = async (req, res) => {
    const id = req.params.id;
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId).populate("review");
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Error lors de la récupération" });
  }
};

export const getByIdReview = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findById(id);
    res.status(200).json(review);
  } catch (err) {
    res.status(500).json({ error: "Error lors de la récupération" });
  }
};

export const updateByIdReview = async (req, res) => {
  try {
    const getReview = await Review.findById(req.params.id);

    if (!getReview) {
      return res.status(404).json({ error: "Review not found" });
    }
    if (parseInt(getReview.id) == parseInt(req.user.id)) {
      const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(200).json(review);
    } else {
      return res
        .status(403)
        .json({ error: "Seul le créateur peut modifier !" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error lors de la récupération" });
  }
};

export const deleteByIdReview = async (req, res) => {
  try {
    const getReview = await Review.findById(req.params.id);

    if (!getReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (parseInt(getReview.id) == parseInt(req.user.id)) {
      const review = await Review.findByIdAndDelete(req.params.id);
      res.status(200).json("Review deleted ! ");
    } else {
      return res
        .status(403)
        .json({ error: "Seul le créateur peut supprimer !" });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
