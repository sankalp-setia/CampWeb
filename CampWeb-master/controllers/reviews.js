let Campground=require('../models');
let Review=require('../Review');

module.exports.createReview = async (req,res,next)=>{

    let campground=await Campground.findById(req.params.id);
  let review=new Review(req.body.review);
  review.author=req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success','created new review')
  res.redirect(`/campground/${campground._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','deleted  review')
    res.redirect(`/campground/${id}`);
}