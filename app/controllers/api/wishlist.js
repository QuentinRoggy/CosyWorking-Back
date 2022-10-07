const wishlistDatamapper = require('../../Datamapper/wishlist');

module.exports = {

  async addToWishlist(req, res) {

    const workspaceId = req.body.workspaceId;

    await wishlistDatamapper.create(req.userId, workspaceId);

    res.json({message : "ok"});
  },

  async getWishlist(req, res) {

    const wishlist = await wishlistDatamapper.getOne(req.userId);

    res.json(wishlist);
  }
}