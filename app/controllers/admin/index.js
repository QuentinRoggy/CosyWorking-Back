
const adminController = {
    /**
     * Default API controller to show documention url.
     * ExpressMiddleware signature
     * @param {object} req Express request object (not used)
     * @param {object} res Express response object
     * @returns Route API JSON response
     */
    home(req, res) {
        const fullUrl = `${req.protocol}://${req.get('host')}`;
        return res.json({
            admin_url: `${fullUrl}/admin`,
        });
    },
};

module.exports = { adminController };