const reviewDatamapper = require('../../Datamapper/review');

module.exports = {
  async addReview(req, res) {
    const review = req.body;

    review.user_id = req.userId;
    review.workspace_id = req.params.id;

    const result = await reviewDatamapper.add(review);

    res.json(result)

  }
}