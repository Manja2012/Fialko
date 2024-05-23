import Review from '../models/review.model.js'; 
import Course from '../models/course.model.js'; 

export const addReview = async (req, res) => {
    try {
        console.log()
        const review = await Review.create(req.body)
        const course = await Course.findByIdAndUpdate(req.body.course, { $push: { review: review._id } }, { new: true })
        res.status(201).json("Avis add !")
    } catch (error) {
        res.status(500).json({ error: "Erreur lors de la création de l'avis!" })
    }
}

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
        res.status(200).json(reviews)
    } catch (err) {
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

export const getByIdReview = async (req, res) => {
    try {
        const id = req.params.id;
        const review = await Review.findById(id)
        res.status(200).json(review)
    } catch (err) {
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}

export const updateByIdReview = async (req, res) => {
    try {
        const getReview = await Review.findById(req.params.id);

        if (!getReview) {
            return res.status(404).json({ error: "Review not found" });
        }
        if (parseInt(getReview.id) == parseInt(req.user.id)) {
           
            const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true })
            return res.status(200).json(review)
        } else {
            return res.status(403).json({ error: "Seul le créateur peut modifier !" })
        }
    } catch (err) {
        res.status(500).json({ error: "Error lors de la récupération" })
    }
}


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
            return res.status(403).json({ error: "Seul le créateur peut supprimer !" });
        }
    } catch (err) {
        res.status(500).json(err.message);
    }
};

