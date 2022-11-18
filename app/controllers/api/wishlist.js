const wishlistDatamapper = require('../../Datamapper/wishlist');

module.exports = {

  async addToWishlist(req, res) {

    const workspaceId = req.body.workspaceId;

    await wishlistDatamapper.create(req.userId, workspaceId);
    const wishlist = await wishlistDatamapper.getOne(req.userId);


    res.json(wishlist);
  },

  async deleteFromWishlist (req, res) {
    const workspaceId = parseInt(req.params.id);
    await wishlistDatamapper.deleteOne(workspaceId, req.userId);

    res.json({message: "ok"})
  },

  async getWishlist(req, res) {

    const wishlist = await wishlistDatamapper.getOne(req.userId);

    res.json(wishlist);
  }
}