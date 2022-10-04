const profilDatamapper = require ('../../Datamapper/profil');

module.exports = {

    async findPersonalspaceById(req, res) {

        const userId = req.params.id;

        const result = await profilDatamapper.getPersonalspaceByPk(userId);

        res.json(result);

    },

    async updatePersonalspace(req, res) {

        const userId = req.params.id;

        const userBody = req.body;

        const result = await profilDatamapper.updatePersonalspace(userId, userBody);

        res.json(result);
    }

}