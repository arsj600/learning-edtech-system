import Review from "../models/reviewModel.js";
import Course from "../models/courseModel.js";

export const addReview = async (req, res) => {
  try {
    
    const { rating, comment ,courseId} = req.body;
    const userId = req.userId; 
    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // prevent duplicate review by same user
    const alreadyReviewed = await Review.findOne({ course: courseId, user: userId });
    if (alreadyReviewed) return res.status(400).json({ message: "You have already reviewed this course" });

    const review = new Review({
      course: courseId,
      user: userId,
      rating,
      comment
    });

    await review.save();

    course.reviews.push(review._id);
    await course.save();

    return res.status(201).json(review);
  } catch (error) {
    console.error("Add Review Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};



export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user", "name photoUrl role") 
      .sort({ reviewedAt: -1 }); // latest first

    return res.status(200).json(
      reviews
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return res.status(500).json({ message: "Failed to fetch reviews" });
  }
};
