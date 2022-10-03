const bookingDatamapper = require("../../Datamapper/booking")
const bookingRefDatamaper = require('../../Datamapper/booking_ref');
const stateDatamapper = require('../../Datamapper/state')


module.exports = {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async findBookingByCoworker(req, res) {

        const coworkerId = req.params.id;

        const result = await bookingDatamapper.getCoworkerReservationsById(coworkerId);

        res.json(result)
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async findBookingByHost(req, res) {

        const hostId = req.params.hostid;

        const result = await bookingDatamapper.getBookingByHostId(hostId);
        
        res.json(result);
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async findBookedDate(req, res) {

        const workspaceId = req.params.id;

        const result = await bookingDatamapper.getBookedDateByWorkspace(workspaceId);

        res.json(result);
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async bookingRequest(req, res) {

    const bookingToInsert = req.body;

    bookingToInsert.booking_ref_id = await bookingRefDatamaper.insertNewBookingRef();

    // loop 

    const result = await bookingDatamapper.PostBookingRequest(bookingToInsert);

    res.json(result);
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async stateUpdate(req, res) {

        const bookingId = req.params.id;

        const stateDescription = req.body.stateDescription;
        
        const updatedState= await bookingDatamapper.UpdateBookingState(stateDescription, bookingId );

        res.json({message: `The booking with the id ${bookingId} has been succesfully updated with the state ${stateDescription}`});
    },

}