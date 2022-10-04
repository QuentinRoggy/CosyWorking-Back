const profilDatamapper = require ('../../Datamapper/profil');

module.exports = {

    async findPersonalspaceById(req, res) {

        const userId = req.params.id;

        const result = await profilDatamapper.getPersonalspaceByPk(userId);

        res.json(result);

    }

}