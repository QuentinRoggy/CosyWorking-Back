const bookingDatamapper = require("../../Datamapper/booking")
const bookingRefDatamaper = require('../../Datamapper/booking_ref');


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

    let bookingToInsert = req.body;

    const { date_list } = bookingToInsert;

    delete bookingToInsert.date_list;
    
    bookingToInsert.booking_ref_id = await bookingRefDatamaper.insertNewBookingRef();
    
    for (const booking of date_list) {
        bookingToInsert.start_date = booking.start_date;
        bookingToInsert.end_date = booking.end_date;

        await bookingDatamapper.PostBookingRequest(bookingToInsert);
    }

    res.json({message: "Booking are created successfully"});
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