const bookingDatamapper = require("../../Datamapper/booking")
const bookingRefDatamaper = require('../../Datamapper/booking_ref');


module.exports = {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     */
    async findBookingByCoworker(req, res) {

        if (req.userId !== parseInt(req.params.id) ) {
            return res.json({message : "nope"});
          }

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

        if (req.userId !== parseInt(req.params.hostid) ) {
            return res.json({message : "nope"});
          }

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

    bookingToInsert.user_id = parseInt(req.userId);

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

        const bookingRefId = req.params.id;
        
        await bookingDatamapper.UpdateBookingState(req.body, bookingRefId );

        res.json({message: `The booking with the id ${bookingRefId} has been succesfully updated with the state ${req.body.state}`});
    },

}