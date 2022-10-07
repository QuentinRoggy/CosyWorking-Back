const reviewDatamapper = require('../../Datamapper/review');
const securityDatamapper = require ('../../Datamapper/security');

module.exports = {
  async addReview(req, res) {

    const isAuthorizedToUpdate = await securityDatamapper.checkReview(req.userId, req.params.id);

        if (!isAuthorizedToUpdate) {
            return res.status(403).send({
            message: "Not authorized to leave review ! "
        });
      }

    const review = req.body;

    review.user_id = req.userId;
    review.workspace_id = req.params.id;

    const result = await reviewDatamapper.add(review);

    res.json(result)

  }
}