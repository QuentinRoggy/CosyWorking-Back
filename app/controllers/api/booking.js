const bookingDatamapper = require("../../Datamapper/booking")
const bookingRefDatamaper = require('../../Datamapper/booking_ref');
const stateDatamapper = require('../../Datamapper/state')


module.exports = {

    async getBookingByCoworker(req, res) {

        const coworkerId = req.params.id;

        const result = await bookingDatamapper.getCoworkerReservationsById(coworkerId);

        res.json(result)

    },

    // async getBookingByHost(req, res) {

    // },

    // async getBookedDate(req, res) {

    // },

    async bookingRequest(req, res) {

    const bookingToInsert = req.body;

    bookingToInsert.booking_ref_id = await bookingRefDatamaper.insertNewBookingRef();

    bookingToInsert.state_id = await stateDatamapper.getFromStateDescription();

    // loop 

    const result = await bookingDatamapper.PostBookingRequest(bookingToInsert);

    res.json(result);

    },

    // async stateUpdate(req, res) {

    // },

}