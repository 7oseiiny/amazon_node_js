const {
  saveReview,
  getAllReviews,
  getUserReviewById,
  updateReview,
  deleteReview,
  getReviewById,
} = require("../controllers/review");
const express = require("express");
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    var review = req.body;
    let newReview = await saveReview(review);
    res.status(201).json({ data: newReview });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/",async (req, res) => {
  try {
    let reviews = await getAllReviews();
    res.status(201).json({ data: reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id",async(req,res)=>{
    var {id}=req.params
    try{
        var review = await getReviewById(id)
    if(review){
        res.status(200).json({data:review})
    }else{
        res.status(404).json({message:"id not found"})
    }
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

router.get("/user/:id", async (req, res) => {
  var { id } = req.params;
  try {
    var review = await getUserReviewById(id);
    if (review) {
      res.status(200).json({ data: review });
    } else {
      res
        .status(404)
        .json({ message: "review not found for the specified user ID" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let newData = req.body;
    let updatedData = await updateReview(id, newData);
    res.status(201).json({ data: updatedData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let deletedReview = await deleteReview(id);

    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
